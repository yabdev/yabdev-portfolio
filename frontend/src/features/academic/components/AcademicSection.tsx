"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAcademicPapers } from "@/lib/api";
import { AcademicPaper } from "@/types";
import Modal from "@/components/ui/Modal";
import { BookOpen, Download } from "lucide-react";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function AcademicSection() {
  const { data: papers, isLoading } = useQuery({
    queryKey: ["academicPapers"],
    queryFn: fetchAcademicPapers,
  });

  const [selectedPaper, setSelectedPaper] = useState<AcademicPaper | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse glass-panel h-32 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!papers?.length) {
    return (
      <div className="glass-panel p-16 text-center">
        <BookOpen className="mx-auto text-primary-muted/30 mb-4" size={48} strokeWidth={1} />
        <p className="text-primary-muted">Publications will appear here once added.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {papers.map((paper, i) => (
          <motion.div
            key={paper.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={itemVariants}
            onClick={() => setSelectedPaper(paper)}
            className="group glass-panel border-gradient p-6 sm:p-8 cursor-pointer hover:border-white/20 hover:shadow-[0_0_40px_rgba(249,115,22,0.1)] transition-all duration-500 flex flex-col sm:flex-row gap-6 items-start hover:-translate-y-2"
          >
            {/* Index number */}
            <div className="flex items-center gap-4 sm:flex-col sm:gap-2">
              <span className="font-mono text-2xl font-bold text-white/10 group-hover:text-accent/30 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="p-3 bg-white/5 rounded-xl text-primary-muted group-hover:text-accent transition-colors">
                <BookOpen size={28} strokeWidth={1.5} />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-jakarta text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                {paper.title}
              </h3>
              <p className="text-primary-muted line-clamp-2 leading-relaxed mb-4">
                {paper.abstractText}
              </p>
              <div className="flex flex-wrap gap-2">
                {paper.tags?.map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full border border-border text-gray-400 bg-white/[0.02]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={!!selectedPaper} onClose={() => setSelectedPaper(null)}>
        {selectedPaper && (
          <div className="space-y-8">
            <h2 className="font-jakarta text-3xl font-bold text-white leading-tight">
              {selectedPaper.title}
            </h2>
            
            <div className="flex flex-wrap gap-2 pb-6 border-b border-border">
              {selectedPaper.tags?.map(tag => (
                <span key={tag} className="text-sm font-medium px-3 py-1 rounded-full bg-white/5 text-gray-300">
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Abstract</h4>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {selectedPaper.abstractText}
              </p>
            </div>

            {selectedPaper.pdfUrl && (
              <div className="pt-6">
                <a
                  href={selectedPaper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-white hover:bg-white/5 transition-colors"
                >
                  <Download size={18} />
                  Download Full PDF
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}