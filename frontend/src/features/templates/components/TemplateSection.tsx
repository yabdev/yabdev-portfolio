"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTemplates } from "@/lib/api";
import { BusinessTemplate } from "@/types";
import Modal from "@/components/ui/Modal";
import { LayoutTemplate, CheckCircle2 } from "lucide-react";
import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function TemplateSection() {
  const { data: templates, isLoading } = useQuery({
    queryKey: ["templates"],
    queryFn: fetchTemplates,
  });

  const [selectedTemplate, setSelectedTemplate] = useState<BusinessTemplate | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse glass-panel h-72 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!templates?.length) {
    return (
      <div className="glass-panel p-16 text-center">
        <LayoutTemplate className="mx-auto text-primary-muted/30 mb-4" size={48} strokeWidth={1} />
        <p className="text-primary-muted">Templates will appear here once added.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((template, i) => (
          <motion.div
            key={template.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
            onClick={() => setSelectedTemplate(template)}
            className="group glass-panel border-gradient p-8 cursor-pointer hover:border-white/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-500 flex flex-col h-full hover:-translate-y-2"
          >
            {/* Image preview area */}
            <div className="mb-6 rounded-xl overflow-hidden bg-white/[0.03] border border-white/5">
              {template.imageUrl ? (
                <div className="w-full h-40 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={template.imageUrl} alt={template.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#080810] to-transparent" />
                </div>
              ) : (
                <div className="w-full h-40 flex items-center justify-center bg-gradient-to-br from-accent/5 to-orange-500/5">
                  <LayoutTemplate size={40} strokeWidth={1} className="text-primary-muted/30 group-hover:text-accent/50 transition-colors duration-500" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-accent/10 text-accent rounded-full border border-accent/20">
                {template.category}
              </span>
            </div>
            
            <h3 className="font-jakarta text-2xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
              {template.title}
            </h3>
            
            <p className="text-primary-muted line-clamp-2 leading-relaxed mb-6 flex-grow text-sm">
              {template.description}
            </p>

            <div className="text-sm font-medium text-gray-400 border-t border-border pt-4 mt-auto flex items-center justify-between">
              <span>{template.features?.length || 0} Core Features</span>
              <span className="text-accent/60 opacity-0 group-hover:opacity-100 transition-opacity">Explore →</span>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={!!selectedTemplate} onClose={() => setSelectedTemplate(null)}>
        {selectedTemplate && (
          <div className="space-y-8">
            <div className="space-y-4 border-b border-border pb-6">
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                {selectedTemplate.category}
              </span>
              <h2 className="font-jakarta text-3xl font-bold text-white leading-tight">
                {selectedTemplate.title}
              </h2>
              {selectedTemplate.imageUrl && (
                <div className="w-full h-64 rounded-xl overflow-hidden mt-4 border border-border bg-white/5 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={selectedTemplate.imageUrl} alt={selectedTemplate.title} className="max-w-full max-h-full object-contain" />
                </div>
              )}
              <p className="text-gray-300 leading-relaxed text-lg pt-4">
                {selectedTemplate.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">Included Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedTemplate.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-200">
                    <CheckCircle2 size={20} className="text-accent shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className="text-sm text-gray-400">
                Previously inquired about {selectedTemplate.inquiryCount} times.
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {selectedTemplate.liveUrl && (
                  <a
                    href={selectedTemplate.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
                  >
                    View Live Demo
                  </a>
                )}
                <a
                  href="#contact"
                  onClick={() => setSelectedTemplate(null)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors"
                >
                  Request Template
                </a>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}