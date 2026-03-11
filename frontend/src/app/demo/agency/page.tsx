"use client";

import { motion } from "framer-motion";
import { ArrowRight, MoveRight, Instagram, Twitter, Linkedin, Menu, X } from "lucide-react";
import { useState } from "react";

export default function AgencyDemo() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#ecebe8] text-[#1c1c1c] font-sans selection:bg-[#ff4e00]/20 selection:text-[#ff4e00] overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference text-[#ecebe8] px-6 md:px-12 py-8 flex justify-between items-center">
        <div className="font-serif text-2xl tracking-tighter italic">Studio/Avant</div>
        <div className="hidden md:flex gap-12 text-sm font-medium tracking-wide uppercase">
          <a href="#work" className="hover:text-[#ff4e00] transition-colors relative group">
            Work <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ff4e00] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#about" className="hover:text-[#ff4e00] transition-colors relative group">
            About <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ff4e00] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="hover:text-[#ff4e00] transition-colors relative group">
            Connect <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#ff4e00] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
        <button 
          className="md:hidden text-[#ecebe8] z-50"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Flyout Nav for Mobile */}
      {navOpen && (
        <div className="fixed inset-0 z-40 bg-[#1c1c1c] text-[#ecebe8] flex flex-col items-center justify-center gap-10 text-4xl font-serif italic">
          <a href="#work" onClick={() => setNavOpen(false)}>Work</a>
          <a href="#about" onClick={() => setNavOpen(false)}>About</a>
          <a href="#contact" onClick={() => setNavOpen(false)}>Connect</a>
        </div>
      )}

      {/* Hero */}
      <section className="pt-40 px-6 md:px-12 lg:px-24 flex flex-col justify-center min-h-[90vh]">
        <div className="max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] tracking-tighter font-medium mb-12 uppercase">
              Shaping <br />
              <span className="font-serif italic lowercase text-[#ff4e00]">digital</span> futures.
            </h1>
          </motion.div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mt-24">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-md text-lg leading-relaxed font-light"
            >
              We are a multidisciplinary design studio partnering with ambitious brands to create experiences that defy convention.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#1c1c1c] text-[#ecebe8] hover:bg-[#ff4e00] transition-colors duration-500 group">
                <span className="flex items-center gap-2 font-medium uppercase tracking-widest text-xs group-hover:scale-110 transition-transform duration-500">
                  Scroll <ArrowRight size={14} className="group-hover:translate-x-1 group-hover:rotate-90 transition-all duration-500" />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-32 px-6 md:px-12 lg:px-24 bg-[#1c1c1c] text-[#ecebe8]">
        <div className="flex justify-between items-end mb-24 border-b border-[#ecebe8]/20 pb-8">
          <h2 className="text-4xl md:text-6xl uppercase tracking-tighter">Selected <span className="font-serif italic text-gray-400 lowercase">Work</span></h2>
          <span className="text-sm uppercase tracking-widest font-medium">[ 2024 — 2026 ]</span>
        </div>

        <div className="space-y-32">
          {/* Project 1 */}
          <div className="group relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer">
              <div className="lg:col-span-8 overflow-hidden bg-zinc-900 border border-white/5 h-[50vh] md:h-[70vh]">
                <img 
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2600&auto=format&fit=crop" 
                  alt="Architecture Project" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <div className="lg:col-span-4 lg:pl-12 flex flex-col justify-center">
                <span className="text-[#ff4e00] text-sm uppercase tracking-widest mb-4 font-bold block">01 — Identity</span>
                <h3 className="text-4xl md:text-5xl uppercase tracking-tighter mb-6 group-hover:text-[#ff4e00] transition-colors">Voltaic Architecture</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8">
                  Comprehensive brand identity and digital presence for a forward-thinking architectural firm based in Copenhagen.
                </p>
                <div className="flex gap-4 uppercase text-xs tracking-widest border-t border-[#ecebe8]/10 pt-6">
                  <span className="px-4 py-2 rounded-full border border-white/20">Branding</span>
                  <span className="px-4 py-2 rounded-full border border-white/20">Web Design</span>
                </div>
              </div>
            </div>
            {/* View Project Cursor / Button */}
            <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#ff4e00] text-white rounded-full flex gap-2 items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 pointer-events-none z-10 font-bold uppercase text-[10px] tracking-widest">
              View <MoveRight size={14} />
            </div>
          </div>

          {/* Project 2 */}
          <div className="group relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer">
              <div className="lg:col-span-4 lg:pr-12 lg:order-1 order-2 flex flex-col justify-center">
                <span className="text-[#ff4e00] text-sm uppercase tracking-widest mb-4 font-bold block">02 — Digital</span>
                <h3 className="text-4xl md:text-5xl uppercase tracking-tighter mb-6 group-hover:text-[#ff4e00] transition-colors">Aura Skincare</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-8">
                  E-commerce platform and 3D product visualization for a premium botanical skincare line focusing on sustainability.
                </p>
                <div className="flex gap-4 uppercase text-xs tracking-widest border-t border-[#ecebe8]/10 pt-6">
                  <span className="px-4 py-2 rounded-full border border-white/20">E-Commerce</span>
                  <span className="px-4 py-2 rounded-full border border-white/20">3D</span>
                </div>
              </div>
              <div className="lg:col-span-8 overflow-hidden bg-zinc-900 border border-white/5 h-[50vh] md:h-[70vh] lg:order-2 order-1">
                <img 
                  src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2600&auto=format&fit=crop" 
                  alt="Aura Skincare" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
            </div>
            <div className="absolute top-1/2 right-[40%] translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#ff4e00] text-white rounded-full flex gap-2 items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 pointer-events-none z-10 font-bold uppercase text-[10px] tracking-widest">
              View <MoveRight size={14} />
            </div>
          </div>
        </div>

        <div className="mt-32 flex justify-center">
          <button className="px-12 py-6 border border-[#ecebe8] rounded-full uppercase tracking-widest text-xs font-bold hover:bg-[#ecebe8] hover:text-[#1c1c1c] transition-colors duration-300">
            View All Projects
          </button>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="py-12 bg-[#ff4e00] text-[#ecebe8] overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-[marquee_20s_linear_infinite]">
          {Array(8).fill("Creative Strategy / Art Direction / Web3 / Interactive / ").map((text, i) => (
            <span key={i} className="text-2xl md:text-4xl uppercase font-bold tracking-tight mx-4">{text}</span>
          ))}
        </div>
      </div>

      {/* Manifesto */}
      <section id="about" className="py-32 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 text-xs font-bold uppercase tracking-widest border-t border-[#1c1c1c] pt-4">
            Our Manifesto
          </div>
          <div className="md:col-span-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1] mb-12">
              We believe in design that demands <span className="font-serif italic text-gray-500 lowercase">attention</span>. We strip away the unnecessary until only pure function and undeniable aesthetics remain. No noise. No compromises.
            </h2>
            <p className="text-lg max-w-xl text-gray-600 font-light mb-16">
              Founded in 2018, Avant represents a collective of designers, engineers, and strategists working out of London and New York. We intentionally take on fewer projects to guarantee the highest level of execution for every partner we work with.
            </p>

            <div className="grid grid-cols-2 gap-8 border-t border-gray-300 pt-12">
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-4">Capabilities</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Art Direction</li>
                  <li>Digital Product Design</li>
                  <li>Creative Development</li>
                  <li>Brand Strategy</li>
                  <li>3D Motion</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-xs mb-4">Awards</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Awwwards Site of the Month</li>
                  <li>FWA of the Day</li>
                  <li>Webby Nominee '25</li>
                  <li>CSS Design Awards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#1c1c1c] text-[#ecebe8] pt-32 pb-12 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="text-[10vw] md:text-[6vw] uppercase tracking-tighter leading-none mb-4 hover:italic transition-all cursor-pointer">
              Have an <br/>
              idea?
            </h2>
            <a href="mailto:hello@studioavant.com" className="inline-block mt-8 text-xl font-light border-b border-[#ff4e00] pb-1 text-[#ff4e00] hover:text-white transition-colors">
              hello@studioavant.com
            </a>
          </div>
          <div className="flex flex-col md:items-end justify-end gap-12 text-sm uppercase tracking-widest">
            <div className="space-y-2 text-gray-400">
              <p>London</p>
              <p className="font-light">72 Redchurch St.</p>
              <p className="font-light">E2 7DP, United Kingdom</p>
            </div>
            <div className="space-y-2 text-gray-400">
              <p>New York</p>
              <p className="font-light">195 Broadway</p>
              <p className="font-light">Brooklyn, NY 11211</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-6">
          <div className="font-serif italic text-2xl">Avant</div>
          <div className="flex gap-6">
            <a href="#" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"><Instagram size={18} /></a>
            <a href="#" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"><Twitter size={18} /></a>
            <a href="#" className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"><Linkedin size={18} /></a>
          </div>
          <div className="text-xs uppercase tracking-widest text-gray-500">© 2026 Studio Avant</div>
        </div>
      </footer>
    </div>
  );
}
