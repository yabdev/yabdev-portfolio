"use client";

import { useState } from "react";
import { ArrowUpRight, Menu, X, Camera, Palette, Layers, Sparkles, MoveRight } from "lucide-react";

const projects = [
    {
        title: "Ethereal Landscapes",
        category: "Photography",
        year: "2026",
        gradient: "from-rose-400/20 to-violet-600/30",
        accent: "rose-400",
    },
    {
        title: "Urban Geometry",
        category: "Architecture",
        year: "2025",
        gradient: "from-amber-400/20 to-orange-600/30",
        accent: "amber-400",
    },
    {
        title: "Chromatic Identity",
        category: "Brand Design",
        year: "2025",
        gradient: "from-cyan-400/20 to-blue-600/30",
        accent: "cyan-400",
    },
    {
        title: "Kinetic Typography",
        category: "Motion Design",
        year: "2024",
        gradient: "from-emerald-400/20 to-teal-600/30",
        accent: "emerald-400",
    },
];

const services = [
    { icon: Camera, title: "Photography", desc: "Capturing moments with an artistic eye for detail and mood." },
    { icon: Palette, title: "Brand Identity", desc: "Building visual languages that resonate with your audience." },
    { icon: Layers, title: "UI/UX Design", desc: "Creating intuitive, beautiful digital experiences." },
    { icon: Sparkles, title: "Motion Design", desc: "Adding life and energy to your brand through animation." },
];

export default function CreativePortfolioDemo() {
    const [navOpen, setNavOpen] = useState(false);
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-[#0e0e10] text-white font-sans overflow-x-hidden selection:bg-fuchsia-500/30">
            {/* Grain overlay */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}></div>

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-8 md:px-16 py-8 flex justify-between items-center">
                <div className="text-2xl font-light tracking-[0.3em] uppercase">
                    <span className="text-fuchsia-400">●</span> Nova
                </div>
                <div className="hidden md:flex items-center gap-12 text-sm tracking-widest uppercase text-gray-400">
                    <a href="#work" className="hover:text-white transition-colors duration-300">Work</a>
                    <a href="#services" className="hover:text-white transition-colors duration-300">Services</a>
                    <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
                    <a href="#contact" className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                        Contact
                    </a>
                </div>
                <button className="md:hidden text-white" onClick={() => setNavOpen(!navOpen)}>
                    {navOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Nav */}
            {navOpen && (
                <div className="fixed inset-0 z-40 bg-[#0e0e10] flex flex-col items-center justify-center gap-10 text-3xl font-light tracking-widest uppercase">
                    <a href="#work" onClick={() => setNavOpen(false)} className="hover:text-fuchsia-400 transition-colors">Work</a>
                    <a href="#services" onClick={() => setNavOpen(false)} className="hover:text-fuchsia-400 transition-colors">Services</a>
                    <a href="#about" onClick={() => setNavOpen(false)} className="hover:text-fuchsia-400 transition-colors">About</a>
                    <a href="#contact" onClick={() => setNavOpen(false)} className="hover:text-fuchsia-400 transition-colors">Contact</a>
                </div>
            )}

            {/* Hero */}
            <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-32 pt-32">
                {/* Gradient orbs */}
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="relative z-10 max-w-5xl">
                    <p className="text-sm tracking-[0.4em] uppercase text-fuchsia-400 mb-8 font-medium">Creative Designer & Photographer</p>
                    <h1 className="text-6xl md:text-[8vw] leading-[0.95] font-extralight tracking-tight mb-12">
                        Crafting visual
                        <br />
                        <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent font-normal italic">
                            narratives
                        </span>{" "}
                        that
                        <br />
                        captivate.
                    </h1>
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <a href="#work" className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-fuchsia-400 hover:text-white transition-all duration-300">
                            View Portfolio <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                        <p className="text-gray-400 max-w-sm text-sm leading-relaxed pt-3">
                            Based in Amsterdam. Available for freelance projects and creative collaborations worldwide.
                        </p>
                    </div>
                </div>
            </section>

            {/* Selected Work */}
            <section id="work" className="py-32 px-8 md:px-16 lg:px-32">
                <div className="flex justify-between items-end mb-20">
                    <div>
                        <p className="text-sm tracking-[0.4em] uppercase text-gray-500 mb-4">Portfolio</p>
                        <h2 className="text-5xl md:text-7xl font-extralight tracking-tight">
                            Selected <span className="italic text-gray-500">Work</span>
                        </h2>
                    </div>
                    <span className="hidden md:block text-sm text-gray-500 tracking-widest">2024 — 2026</span>
                </div>

                <div className="space-y-1">
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            className="group relative border-t border-white/10 py-8 md:py-12 cursor-pointer"
                            onMouseEnter={() => setHoveredProject(i)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -mx-8 md:-mx-16 lg:-mx-32 px-8 md:px-16 lg:px-32`}></div>
                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-8 md:gap-16">
                                    <span className="text-sm text-gray-500 font-mono w-8">{String(i + 1).padStart(2, "0")}</span>
                                    <h3 className="text-2xl md:text-5xl font-extralight tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                                        {project.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-8">
                                    <span className="hidden md:block text-sm text-gray-500 uppercase tracking-widest">{project.category}</span>
                                    <span className="hidden md:block text-sm text-gray-600">{project.year}</span>
                                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white group-hover:text-black">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="border-t border-white/10"></div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="py-32 px-8 md:px-16 lg:px-32 bg-[#121215]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-24">
                        <div>
                            <p className="text-sm tracking-[0.4em] uppercase text-gray-500 mb-4">What I Do</p>
                            <h2 className="text-5xl md:text-6xl font-extralight tracking-tight leading-tight">
                                Services built around <span className="italic text-fuchsia-400">your vision</span>.
                            </h2>
                        </div>
                        <div className="flex items-end">
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                Every project is approached with meticulous attention to detail, combining technical expertise with creative intuition to deliver work that stands out.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, i) => (
                            <div key={i} className="group p-8 border border-white/5 rounded-2xl hover:border-fuchsia-500/30 hover:bg-white/[0.02] transition-all duration-500">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500/10 to-violet-500/10 flex items-center justify-center mb-8 text-fuchsia-400 group-hover:scale-110 transition-transform duration-500">
                                    <service.icon size={24} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-xl font-medium mb-3">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About / Stats */}
            <section id="about" className="py-32 px-8 md:px-16 lg:px-32">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <p className="text-sm tracking-[0.4em] uppercase text-gray-500 mb-4">About</p>
                        <h2 className="text-4xl md:text-5xl font-extralight tracking-tight leading-tight mb-8">
                            Merging art with <span className="italic text-fuchsia-400">purpose</span>.
                        </h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            With over 8 years of experience across photography, branding, and digital design, I bring a multidisciplinary perspective to every project. I believe the best design work comes from deep understanding — of the craft, the audience, and the story that needs to be told.
                        </p>
                        <p className="text-gray-500 leading-relaxed">
                            Currently available for select freelance projects and creative direction roles.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        {[
                            { num: "120+", label: "Projects Completed" },
                            { num: "8", label: "Years Experience" },
                            { num: "40+", label: "Clients Worldwide" },
                            { num: "12", label: "Awards Won" },
                        ].map((stat, i) => (
                            <div key={i} className="border border-white/5 rounded-2xl p-8 text-center hover:border-fuchsia-500/20 transition-colors duration-300">
                                <div className="text-4xl font-extralight tracking-tight mb-2 bg-gradient-to-r from-fuchsia-400 to-violet-400 bg-clip-text text-transparent">{stat.num}</div>
                                <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact / CTA */}
            <section id="contact" className="py-32 px-8 md:px-16 lg:px-32 bg-gradient-to-b from-[#0e0e10] to-[#15151a]">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-sm tracking-[0.4em] uppercase text-fuchsia-400 mb-6">Get In Touch</p>
                    <h2 className="text-5xl md:text-7xl font-extralight tracking-tight mb-8">
                        Let&apos;s create something <span className="italic">extraordinary</span>.
                    </h2>
                    <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
                        Whether you have a clear vision or just a spark of an idea, I&apos;d love to hear from you. Let&apos;s turn your concept into reality.
                    </p>
                    <a href="mailto:hello@nova.design" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-medium text-lg hover:bg-fuchsia-400 hover:text-white transition-all duration-300 group">
                        hello@nova.design <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-8 md:px-16 lg:px-32">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm tracking-[0.3em] uppercase text-gray-600">
                        <span className="text-fuchsia-400">●</span> Nova — 2026
                    </div>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">Dribbble</a>
                        <a href="#" className="hover:text-white transition-colors">Behance</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
