"use client";

import { useState } from "react";
import {
    BookOpen, Play, Users, Award, Star, Menu, X, ChevronRight,
    GraduationCap, Clock, BarChart3, Globe, CheckCircle, ArrowRight,
    Laptop, Brain, Lightbulb, Target
} from "lucide-react";

const courses = [
    {
        title: "Full-Stack Web Development",
        instructor: "Dr. Sarah Mitchell",
        level: "Intermediate",
        duration: "12 weeks",
        students: "2,340",
        rating: "4.9",
        price: "$89",
        tag: "Bestseller",
        gradient: "from-blue-600/40 to-indigo-900/60",
        accent: "blue",
    },
    {
        title: "Data Science & Machine Learning",
        instructor: "Prof. James Chen",
        level: "Advanced",
        duration: "16 weeks",
        students: "1,890",
        rating: "4.8",
        price: "$99",
        tag: "New",
        gradient: "from-violet-600/40 to-purple-900/60",
        accent: "violet",
    },
    {
        title: "UI/UX Design Masterclass",
        instructor: "Lisa Rodriguez",
        level: "Beginner",
        duration: "8 weeks",
        students: "3,120",
        rating: "4.9",
        price: "$69",
        tag: null,
        gradient: "from-rose-600/40 to-pink-900/60",
        accent: "rose",
    },
    {
        title: "Cloud Architecture & DevOps",
        instructor: "Michael Park",
        level: "Advanced",
        duration: "14 weeks",
        students: "1,560",
        rating: "4.7",
        price: "$109",
        tag: "Popular",
        gradient: "from-emerald-600/40 to-teal-900/60",
        accent: "emerald",
    },
    {
        title: "Mobile App Development",
        instructor: "Emma Watson",
        level: "Intermediate",
        duration: "10 weeks",
        students: "2,080",
        rating: "4.8",
        price: "$79",
        tag: null,
        gradient: "from-amber-600/40 to-orange-900/60",
        accent: "amber",
    },
    {
        title: "Cybersecurity Fundamentals",
        instructor: "David Kumar",
        level: "Beginner",
        duration: "6 weeks",
        students: "4,200",
        rating: "4.9",
        price: "$59",
        tag: "Trending",
        gradient: "from-cyan-600/40 to-sky-900/60",
        accent: "cyan",
    },
];

const features = [
    { icon: Laptop, title: "Interactive Learning", desc: "Hands-on projects and coding exercises integrated directly into every lesson." },
    { icon: Brain, title: "AI-Powered Paths", desc: "Personalized learning journeys adapted to your pace and goals." },
    { icon: Users, title: "Community & Mentors", desc: "Connect with peers and industry mentors in real-time discussions." },
    { icon: Award, title: "Certified Programs", desc: "Earn industry-recognized certificates upon completion." },
];

const testimonials = [
    { name: "Alex Turner", role: "Software Engineer at Google", quote: "LearnHub transformed my career. The structured curriculum and mentorship are unmatched.", rating: 5 },
    { name: "Priya Sharma", role: "Data Analyst at Meta", quote: "The AI-suggested learning path saved me months. Highly recommend the Data Science track.", rating: 5 },
    { name: "Marcus Johnson", role: "Freelance Designer", quote: "The UI/UX course gave me the portfolio that landed my first 6-figure client.", rating: 5 },
];

export default function ELearningDemo() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#fafbfc] text-[#1a1a2e] font-sans overflow-x-hidden selection:bg-blue-200">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-[72px]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <GraduationCap size={20} className="text-white" />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight">Learn<span className="text-blue-600">Hub</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <a href="#courses" className="hover:text-blue-600 transition-colors">Courses</a>
                        <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
                        <a href="#testimonials" className="hover:text-blue-600 transition-colors">Reviews</a>
                        <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <button className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Log in</button>
                        <button className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                            Start Free Trial
                        </button>
                    </div>

                    <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-2xl font-semibold">
                    <a href="#courses" onClick={() => setMobileMenuOpen(false)}>Courses</a>
                    <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
                    <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                </div>
            )}

            {/* Hero */}
            <header className="relative pt-36 pb-24 md:pt-44 md:pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-50 pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[100px] opacity-40 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-8">
                            <Lightbulb size={16} /> 50,000+ students learning right now
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-8">
                            Learn without <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">limits</span>.
                        </h1>
                        <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
                            Expert-led courses in tech, design, and data. Build real skills with hands-on projects, AI-powered paths, and a global learning community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all text-lg">
                                Explore Courses <ChevronRight size={20} />
                            </button>
                            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-all text-lg shadow-sm">
                                <Play size={20} className="text-blue-600" /> Watch Demo
                            </button>
                        </div>

                        <div className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-100">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">200+</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Courses</div>
                            </div>
                            <div className="w-px h-10 bg-gray-200"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">50K+</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Students</div>
                            </div>
                            <div className="w-px h-10 bg-gray-200"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">4.9</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Rating</div>
                            </div>
                        </div>
                    </div>

                    {/* Illustration area */}
                    <div className="hidden lg:block relative">
                        <div className="aspect-square max-w-lg mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl border border-blue-100/50 p-8 relative overflow-hidden">
                            <div className="absolute top-6 right-6 w-20 h-20 bg-blue-200/50 rounded-full blur-xl"></div>
                            <div className="absolute bottom-10 left-10 w-16 h-16 bg-indigo-200/60 rounded-full blur-lg"></div>

                            {/* Fake course cards */}
                            <div className="relative z-10 space-y-4">
                                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600"><BookOpen size={18} /></div>
                                        <div>
                                            <p className="font-bold text-sm">React Mastery</p>
                                            <p className="text-xs text-gray-400">12 modules</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: "72%" }}></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">72% completed</p>
                                </div>

                                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600"><BarChart3 size={18} /></div>
                                        <div>
                                            <p className="font-bold text-sm">Data Visualization</p>
                                            <p className="text-xs text-gray-400">8 modules</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div className="bg-gradient-to-r from-violet-500 to-purple-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">45% completed</p>
                                </div>

                                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600"><Award size={18} /></div>
                                    <div>
                                        <p className="font-bold text-sm">Certificate Earned! 🎉</p>
                                        <p className="text-xs text-gray-400">Python Fundamentals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Courses */}
            <section id="courses" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Browse Catalog</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Popular Courses</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Explore our most popular programs, designed and taught by industry professionals.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, i) => (
                        <div key={i} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            <div className={`relative h-44 bg-gradient-to-br ${course.gradient}`}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BookOpen size={48} className="text-white/20" strokeWidth={1} />
                                </div>
                                {course.tag && (
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full">
                                        {course.tag}
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg">{course.level}</span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {course.duration}</span>
                                </div>
                                <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{course.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">by {course.instructor}</p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><Star size={14} className="text-amber-400 fill-amber-400" /> {course.rating}</span>
                                        <span className="flex items-center gap-1"><Users size={14} /> {course.students}</span>
                                    </div>
                                    <span className="text-xl font-bold text-blue-600">{course.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-semibold hover:bg-gray-800 transition-colors">
                        View All Courses <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 bg-gradient-to-b from-blue-50/50 to-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Why LearnHub</p>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">A smarter way to learn</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Our platform combines cutting-edge technology with proven pedagogy.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 group text-center">
                                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Student Reviews</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Loved by learners</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex gap-1 mb-6">
                                {Array(t.rating).fill(0).map((_, j) => (
                                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                                ))}
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-8 italic">&ldquo;{t.quote}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {t.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{t.name}</p>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-24 bg-[#1a1a2e] text-white">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Pricing</p>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Choose your plan</h2>
                        <p className="text-gray-400 text-lg">Start free, upgrade when you&apos;re ready.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Free */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col">
                            <h3 className="text-xl font-bold mb-2">Free</h3>
                            <p className="text-gray-400 text-sm mb-6">Explore and learn at your pace.</p>
                            <div className="text-4xl font-bold mb-8">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                            <button className="w-full py-3 rounded-xl bg-white/10 font-medium hover:bg-white/20 transition-colors mb-8">Get Started</button>
                            <ul className="space-y-3 text-sm text-gray-400">
                                {["Access to 10 free courses", "Community forum", "Basic progress tracking", "Mobile access"].map((f, i) => (
                                    <li key={i} className="flex items-center gap-2"><CheckCircle size={16} className="text-gray-500 shrink-0" /> {f}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Pro */}
                        <div className="bg-gradient-to-b from-blue-600/20 to-transparent border border-blue-500/30 rounded-3xl p-8 flex flex-col relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                            <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">Most Popular</div>
                            <h3 className="text-xl font-bold mb-2">Pro</h3>
                            <p className="text-blue-200/60 text-sm mb-6">Unlock your full potential.</p>
                            <div className="text-4xl font-bold mb-8">$19<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                            <button className="w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-colors mb-8 shadow-lg shadow-white/10">Start 7-Day Trial</button>
                            <ul className="space-y-3 text-sm text-gray-300">
                                {["All 200+ courses", "AI learning paths", "Certificates", "Mentor sessions", "Priority support", "Offline access"].map((f, i) => (
                                    <li key={i} className="flex items-center gap-2"><CheckCircle size={16} className="text-blue-400 shrink-0" /> {f}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Team */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col">
                            <h3 className="text-xl font-bold mb-2">Team</h3>
                            <p className="text-gray-400 text-sm mb-6">Upskill your entire team.</p>
                            <div className="text-4xl font-bold mb-8">$49<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                            <button className="w-full py-3 rounded-xl bg-white/10 font-medium hover:bg-white/20 transition-colors mb-8">Contact Sales</button>
                            <ul className="space-y-3 text-sm text-gray-400">
                                {["Everything in Pro", "Team analytics dashboard", "Custom learning paths", "SSO integration", "Dedicated account manager"].map((f, i) => (
                                    <li key={i} className="flex items-center gap-2"><CheckCircle size={16} className="text-gray-500 shrink-0" /> {f}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Start learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">today</span>.
                    </h2>
                    <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
                        Join 50,000+ learners building their future with LearnHub. Your first course is free.
                    </p>
                    <button className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all">
                        Create Free Account
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1a1a2e] text-white pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <GraduationCap size={16} className="text-white" />
                            </div>
                            <span className="font-extrabold text-lg">Learn<span className="text-blue-400">Hub</span></span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Empowering learners worldwide with expert-led, accessible education in technology and design.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-6">Platform</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-white transition-colors">All Courses</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Learning Paths</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Certifications</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">For Business</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-6">Community</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-white transition-colors">Forum</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Become a Mentor</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>© 2026 LearnHub Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-white transition-colors">YouTube</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
