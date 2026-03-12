"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Download } from "lucide-react";

import AboutSection from "@/features/about/components/AboutSection";
import ProjectSection from "@/features/projects/components/ProjectSection";
import AcademicSection from "@/features/academic/components/AcademicSection";
import TemplateSection from "@/features/templates/components/TemplateSection";
import ContactSection from "@/features/contact/components/ContactSection";

const sectionLabel = (num: string, title: string) => (
  <div className="flex items-center gap-4 mb-16 overflow-hidden">
    <span className="text-accent/80 font-mono text-sm tracking-widest shrink-0">{num}</span>
    <div className="h-px flex-1 min-w-0 bg-gradient-to-r from-accent/30 to-transparent" />
    <h2 className="font-jakarta text-2xl md:text-3xl font-bold tracking-tight text-white/90 shrink-0 text-center">{title}</h2>
    <div className="h-px flex-1 min-w-0 bg-gradient-to-l from-accent/30 to-transparent" />
  </div>
);

export default function Home() {
  return (
    <div className="flex flex-col gap-32">
      {/* Hero Section */}
      <section className="relative -mx-6 md:-mx-12 lg:-mx-24 -mt-24 min-h-[100vh] flex flex-col items-center justify-center pt-56 pb-20 overflow-hidden px-6 md:px-12 lg:px-24">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop")' }}
        />

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 z-0 bg-[#0a0a0b]/80 backdrop-blur-md" />

        {/* Dot grid background (kept for texture) */}
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none z-0" />

        {/* Gradient glow orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hero-glow rounded-full blur-[120px] opacity-20 pointer-events-none" />

        {/* Seamless Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#080810] via-[#080810]/80 to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="z-10 w-full max-w-3xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-primary-muted font-medium tracking-[0.2em] text-xs uppercase mb-6 block"
          >
            Enterprise System Professional
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-jakarta text-4xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            Building systems that <br className="hidden md:block" />
            <span className="gradient-text">
              scale effortlessly.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-primary-muted text-lg md:text-xl mb-12 max-w-xl leading-relaxed mx-auto"
          >
            Specializing in production-grade Java Spring Boot architectures and high-performance modern frontends. Clean code, strict security, and total observability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <a
              href="#projects"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] hover:-translate-y-1 transition-all duration-300 group"
            >
              View Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-medium bg-black/40 border border-white/10 text-white hover:border-accent/80 hover:bg-accent/10 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:-translate-y-1 transition-all duration-300"
            >
              Resume
              <Download size={18} />
            </a>
            <a
              href="#contact"
              className="px-6 py-4 rounded-full font-medium text-primary-muted hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              Let&apos;s Talk
            </a>
          </motion.div>
        </motion.div>



        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary-muted/50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </section>

      {/* Domain Modules */}
      <section id="projects" className="min-h-screen pt-32 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-40 -left-[20%] w-[500px] h-[500px] bg-hero-glow rounded-full blur-[120px] opacity-[0.05] pointer-events-none" />
        {sectionLabel("01", "Enterprise Projects")}
        <ProjectSection />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-primary-muted/70 text-lg italic max-w-2xl mx-auto leading-relaxed">
            Need a robust, scalable system for your business?{" "}
            <a href="#contact" className="text-accent hover:text-accent/80 font-semibold not-italic transition-colors">
              Let&apos;s build your enterprise solution →
            </a>
          </p>
        </motion.div>
      </section>

      <section id="templates" className="min-h-screen pt-32 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-40 -right-[20%] w-[500px] h-[500px] bg-hero-glow rounded-full blur-[120px] opacity-[0.05] pointer-events-none" />
        {sectionLabel("02", "Business Templates")}
        <TemplateSection />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-primary-muted/70 text-lg italic max-w-2xl mx-auto leading-relaxed">
            Looking for a ready-made website for your business?{" "}
            <a href="#contact" className="text-accent hover:text-accent/80 font-semibold not-italic transition-colors">
              Request a customized template today →
            </a>
          </p>
        </motion.div>
      </section>

      <section id="academic" className="min-h-screen pt-32 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-40 -left-[20%] w-[500px] h-[500px] bg-hero-glow rounded-full blur-[120px] opacity-[0.05] pointer-events-none" />
        {sectionLabel("03", "Academic Writing")}
        <AcademicSection />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-primary-muted/70 text-lg italic max-w-2xl mx-auto leading-relaxed">
            Struggling with your seminar, project, or manuscript?{" "}
            <a href="#contact" className="text-accent hover:text-accent/80 font-semibold not-italic transition-colors">
              Let&apos;s help you write it right →
            </a>
          </p>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen pt-32 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-40 -right-[20%] w-[500px] h-[500px] bg-hero-glow rounded-full blur-[120px] opacity-[0.05] pointer-events-none" />
        {sectionLabel("04", "About Me")}
        <AboutSection />
      </section>

      <section id="contact" className="min-h-screen pt-32 scroll-mt-24 relative">
        <ContactSection />
      </section>
    </div>
  );
}