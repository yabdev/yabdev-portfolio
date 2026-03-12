"use client";

import { Github, Linkedin, Twitter, ArrowUpRight, MessageCircle } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/yabdev", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/abdullahi-zubair-a7a2a3149", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/ZZUBAIR50", label: "X / Twitter" },
  { icon: MessageCircle, href: "https://wa.me/2349067523963?text=Hello%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/[0.06] overflow-x-hidden">
      {/* Gradient accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-hero-glow rounded-full blur-[120px] opacity-[0.04] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 relative">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-jakarta font-bold text-2xl text-white tracking-tight">
              YABBY<span className="gradient-text">DEV</span>
            </span>
            <p className="text-primary-muted text-sm max-w-xs text-center md:text-left">
              Building production-grade architectures and modern frontends for ambitious teams.
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex items-center gap-2 text-primary-muted hover:text-white transition-all duration-300 px-4 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] hover:border-accent/30 hover:bg-accent/5"
                >
                  <Icon size={16} strokeWidth={1.5} />
                  <span className="text-sm font-medium hidden sm:inline">{link.label}</span>
                  <ArrowUpRight size={12} className="hidden sm:block opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-muted">
          <span>© {new Date().getFullYear()} Abdullahi Zubair. All rights reserved.</span>
          <span className="text-xs text-white/20">Crafted with Next.js, Spring Boot & Passion</span>
        </div>
      </div>
    </footer>
  );
}
