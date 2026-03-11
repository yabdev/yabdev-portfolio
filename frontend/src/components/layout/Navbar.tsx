"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Templates", href: "#templates" },
    { name: "Services", href: "/services" },
    { name: "Publications", href: "#academic" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 pointer-events-none ${scrolled ? "mt-4 md:mt-6 px-4" : "mt-0 px-0"}`}>
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`pointer-events-auto transition-all duration-500 flex items-center ${scrolled
              ? "px-5 md:px-6 py-3 gap-6 md:gap-8 shadow-2xl rounded-full bg-background/80 backdrop-blur-xl border border-white/10"
              : "w-full justify-between px-6 md:px-12 lg:px-24 py-6 rounded-none bg-transparent border-transparent"
            }`}
        >
          <Link href="/" className="flex items-center gap-3 group">
            {/* Hexagon Logo */}
            <div
              className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a10] shadow-xl border border-white/10 group-hover:border-accent/50 transition-colors overflow-hidden"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            >
              <span className="font-serif text-2xl flex items-center z-10 mt-1 tracking-tighter mix-blend-screen">
                <span className="text-white drop-shadow-md relative z-10">A</span>
                <span className="text-accent -ml-1.5 drop-shadow-xl z-0">Z</span>
              </span>
              <div className="absolute inset-0 bg-accent/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {/* Full Name */}
            <span className="font-jakarta font-bold tracking-[0.2em] text-white/90 text-xs md:text-sm uppercase group-hover:text-white transition-colors mt-0.5">
              Abdullahi Zubair
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-primary-muted hover:text-primary transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className={`hidden md:inline-flex text-sm font-medium px-6 py-2.5 rounded-full transition-colors ${scrolled
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md"
                }`}
            >
              Get Started
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-primary-muted hover:text-white transition-colors p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.08 }}
                className="text-2xl font-jakarta font-semibold text-white hover:text-accent transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.35 }}
              className="mt-4 bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
              Get Started
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}