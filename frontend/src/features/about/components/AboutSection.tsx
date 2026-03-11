import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass-panel border-gradient overflow-hidden relative"
      >
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-0">

          {/* Left Column: Image Area */}
          <div className="relative aspect-[4/5] md:aspect-auto h-full min-h-[400px] border-b md:border-b-0 md:border-r border-white/5 overflow-hidden bg-[#080810] group">
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-orange-500/10 opacity-60 z-10 pointer-events-none" />

            <Image
              src="/profile-about.jpg"
              alt="Professional Portrait"
              fill
              className="object-cover object-center translate-y-4 md:translate-y-0 scale-105 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out"
            />
            {/* Heavy Dark Overlay to blend with the dark mode */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-[#080810]/40 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(8,8,16,1)] z-10 pointer-events-none" />
          </div>

          {/* Right Column: Bio Content */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center h-full relative z-20">
            {/* Glow orb behind text */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <h3 className="text-3xl lg:text-5xl font-jakarta font-bold text-white mb-8 tracking-tight">
              The Architecture <br /><span className="gradient-text">Behind the Code</span>
            </h3>

            <div className="space-y-6 text-primary-muted/90 leading-relaxed text-lg mb-12">
              <p>
                Hi, I'm YabbyDev. I'm a Lagos-based tech professional with a strong foundation in application support and software development. With a Master of Information Technology and hands-on experience managing and optimizing enterprise systems, I specialize in bridging the gap between robust infrastructure and efficient software.
              </p>
              <p>
                My technical background spans Java, Spring Boot, Python, and complex database environments. Recently, my focus has shifted toward the future of tech: I am actively expanding my expertise into Cloud Computing, DevOps, and Agentic AI. Whether I'm modernizing legacy applications or exploring the capabilities of Large Language Models, I'm driven by a passion for building scalable, intelligent solutions.
              </p>
            </div>

            <div>
              <h4 className="text-sm uppercase tracking-widest text-white/40 mb-5 font-bold">Core Technical Stack</h4>
              <div className="flex flex-wrap gap-3">
                {["Java", "Spring Boot", "Next.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Tailwind CSS", "Framer Motion"].map((skill) => (
                  <span
                    key={skill}
                    className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.03] text-sm font-semibold text-gray-300 hover:bg-white/10 hover:border-accent/40 hover:text-white transition-all duration-300 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
