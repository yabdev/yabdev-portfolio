"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import { Project } from "@/types";
import Modal from "@/components/ui/Modal";
import { ArrowUpRight, FolderKanban, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function ProjectSection() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Card width + gap for scroll calculations
  const getScrollAmount = useCallback(() => {
    if (!scrollRef.current) return 400;
    const firstCard = scrollRef.current.querySelector("[data-card]") as HTMLElement | null;
    if (!firstCard) return 400;
    return firstCard.offsetWidth + 24; // card width + gap (gap-6 = 24px)
  }, []);

  const scrollTo = useCallback((direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = getScrollAmount();
    const container = scrollRef.current;

    if (direction === "right") {
      // If near the end, loop back to start
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: amount, behavior: "smooth" });
      }
    } else {
      // If at the start, loop to end
      if (container.scrollLeft <= 10) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -amount, behavior: "smooth" });
      }
    }
  }, [getScrollAmount]);

  // Pause auto-scroll on hover (removed auto-scroll per user request, keeping handlers empty for now or removing them)
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  if (isLoading) {
    return (
      <div className="flex gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse glass-panel h-80 min-w-[420px] rounded-2xl flex-none" />
        ))}
      </div>
    );
  }

  if (!projects?.length) {
    return (
      <div className="glass-panel p-16 text-center">
        <FolderKanban className="mx-auto text-primary-muted/30 mb-4" size={48} strokeWidth={1} />
        <p className="text-primary-muted">Projects will appear here once added.</p>
      </div>
    );
  }

  return (
    <>
      {/* Carousel Container — breaks out of max-w parent */}
      <div className="-mx-6 md:-mx-12 lg:-mx-24" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-4 px-6 md:px-12 lg:px-24"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              data-card
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              onClick={() => setSelectedProject(project)}
              className="group glass-panel border-gradient overflow-hidden cursor-pointer hover:border-white/20 transition-all duration-300 hover:-translate-y-1 w-[85vw] md:w-[500px] shrink-0 flex-none flex flex-col rounded-2xl"
            >
              {/* Image */}
              {project.imageUrl ? (
                <div className="relative h-80 w-full overflow-hidden bg-[#0c0c14]">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Transparent overlay */}
                  <div className="absolute inset-0 bg-[#080810]/40 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                  {/* Bottom vignette for blending */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080810] to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="h-80 w-full bg-white/5 flex items-center justify-center">
                  <FolderKanban className="text-primary-muted/20" size={48} strokeWidth={1} />
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col justify-between">
                <h3 className="font-jakarta text-xl font-semibold text-white group-hover:text-accent transition-colors line-clamp-2">
                  {project.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-accent/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View details</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Always-visible arrow buttons */}
      <div className="flex justify-end items-center gap-3 mt-6">
        <button
          onClick={() => scrollTo("left")}
          className="w-11 h-11 rounded-full border border-border bg-white/5 flex items-center justify-center text-primary-muted hover:text-white hover:border-accent hover:bg-accent/10 transition-all"
          aria-label="Previous projects"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => scrollTo("right")}
          className="w-11 h-11 rounded-full border border-border bg-white/5 flex items-center justify-center text-primary-muted hover:text-white hover:border-accent hover:bg-accent/10 transition-all"
          aria-label="Next projects"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="space-y-8">
            <h2 className="font-jakarta text-3xl font-bold text-white">{selectedProject.title}</h2>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">The Challenge</h4>
                <p className="text-gray-300 leading-relaxed">{selectedProject.problemStatement}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">The Solution</h4>
                <p className="text-gray-300 leading-relaxed">{selectedProject.solution}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Impact</h4>
                  <p className="text-gray-200">{selectedProject.impact}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-2">Business Results</h4>
                  <p className="text-gray-200">{selectedProject.businessResults}</p>
                </div>
              </div>
            </div>

            {selectedProject.projectUrl && (
              <div className="pt-6">
                <a
                  href={selectedProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
                >
                  View Live Project
                  <ArrowUpRight size={16} />
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}