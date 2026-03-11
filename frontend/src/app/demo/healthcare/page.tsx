"use client";

import { useState } from "react";
import {
    Heart, Calendar, Clock, Phone, Mail, MapPin, Menu, X, ChevronRight,
    Stethoscope, Shield, Users, Activity, Star, ArrowRight,
    CheckCircle, FileText, Video, Pill, UserCheck, Building2
} from "lucide-react";

const departments = [
    { icon: Heart, name: "Cardiology", desc: "Expert heart care and cardiovascular diagnostics.", color: "from-red-500/20 to-rose-500/10", text: "text-red-500" },
    { icon: Activity, name: "Neurology", desc: "Advanced treatments for brain and nervous system.", color: "from-violet-500/20 to-purple-500/10", text: "text-violet-500" },
    { icon: UserCheck, name: "Orthopedics", desc: "Comprehensive bone and joint care solutions.", color: "from-blue-500/20 to-indigo-500/10", text: "text-blue-500" },
    { icon: Shield, name: "Pediatrics", desc: "Compassionate care for infants and children.", color: "from-emerald-500/20 to-teal-500/10", text: "text-emerald-500" },
    { icon: Stethoscope, name: "General Medicine", desc: "Routine checkups and preventive health services.", color: "from-amber-500/20 to-orange-500/10", text: "text-amber-500" },
    { icon: Pill, name: "Dermatology", desc: "Skin health treatments and cosmetic dermatology.", color: "from-pink-500/20 to-rose-500/10", text: "text-pink-500" },
];

const doctors = [
    { name: "Dr. Sarah Mitchell", specialty: "Cardiologist", experience: "15 years", rating: "4.9", patients: "2,400+" },
    { name: "Dr. James Park", specialty: "Neurologist", experience: "12 years", rating: "4.8", patients: "1,800+" },
    { name: "Dr. Emily Chen", specialty: "Pediatrician", experience: "10 years", rating: "4.9", patients: "3,200+" },
    { name: "Dr. Michael Adams", specialty: "Orthopedic Surgeon", experience: "18 years", rating: "4.7", patients: "1,500+" },
];

const features = [
    { icon: Calendar, title: "Online Booking", desc: "Schedule appointments 24/7 from any device." },
    { icon: Video, title: "Telehealth", desc: "Virtual consultations with your doctor from home." },
    { icon: FileText, title: "Digital Records", desc: "Secure access to your complete health history." },
    { icon: Clock, title: "Minimal Wait", desc: "Average wait time under 10 minutes." },
];

export default function HealthcareDemo() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white text-[#1a2332] font-sans overflow-x-hidden selection:bg-teal-200">
            {/* Top Info Bar */}
            <div className="bg-[#0d6e6e] text-white text-sm py-2.5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap justify-between items-center gap-2">
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5"><Phone size={14} /> (555) 123-4567</span>
                        <span className="hidden md:flex items-center gap-1.5"><Mail size={14} /> info@medcare.com</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} /> Mon - Sat: 8:00 AM - 8:00 PM
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                            <Heart size={20} className="text-white fill-white" />
                        </div>
                        <div>
                            <span className="font-extrabold text-xl tracking-tight">Med<span className="text-teal-600">Care</span></span>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest -mt-0.5">Health & Wellness</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <a href="#departments" className="hover:text-teal-600 transition-colors">Departments</a>
                        <a href="#doctors" className="hover:text-teal-600 transition-colors">Doctors</a>
                        <a href="#services" className="hover:text-teal-600 transition-colors">Services</a>
                        <a href="#contact" className="hover:text-teal-600 transition-colors">Contact</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-teal-600">
                            <Building2 size={16} /> Patient Portal
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-teal-500/25 transition-all">
                            <Calendar size={16} /> Book Appointment
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
                    <a href="#departments" onClick={() => setMobileMenuOpen(false)}>Departments</a>
                    <a href="#doctors" onClick={() => setMobileMenuOpen(false)}>Doctors</a>
                    <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                </div>
            )}

            {/* Hero */}
            <header className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-emerald-50"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-100 rounded-full blur-[120px] opacity-40 translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full text-teal-700 text-sm font-medium mb-8">
                            <Shield size={16} /> Trusted by 50,000+ patients
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-8">
                            Your health, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">our priority</span>.
                        </h1>
                        <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
                            Comprehensive healthcare services with compassionate, patient-centered care. Book online, consult virtually, or visit us in person.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-teal-500/25 transition-all text-lg">
                                <Calendar size={20} /> Book Appointment
                            </button>
                            <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-all text-lg shadow-sm">
                                <Phone size={20} className="text-teal-600" /> Emergency Call
                            </button>
                        </div>

                        {/* Quick stats */}
                        <div className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-100">
                            {[
                                { val: "50+", label: "Specialists" },
                                { val: "15K", label: "Surgeries" },
                                { val: "4.9", label: "Rating" },
                            ].map((s, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-2xl font-bold text-teal-600">{s.val}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side illustration */}
                    <div className="hidden lg:block relative">
                        <div className="aspect-[4/5] max-w-md mx-auto bg-gradient-to-br from-teal-100/50 to-emerald-50 rounded-3xl border border-teal-100/50 relative overflow-hidden p-8">
                            <div className="absolute top-8 right-8 w-24 h-24 bg-teal-200/40 rounded-full blur-2xl"></div>

                            {/* Appointment card */}
                            <div className="relative z-10 space-y-5">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                                            <Stethoscope size={22} />
                                        </div>
                                        <div>
                                            <p className="font-bold">Dr. Sarah Mitchell</p>
                                            <p className="text-xs text-gray-500">Cardiologist</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> Mar 15, 2026</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> 10:30 AM</span>
                                    </div>
                                    <button className="w-full mt-4 py-2.5 bg-teal-50 text-teal-700 rounded-xl text-sm font-semibold hover:bg-teal-100 transition-colors">
                                        Confirmed ✓
                                    </button>
                                </div>

                                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                                    <p className="text-sm font-semibold mb-3">Quick Actions</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { icon: Video, label: "Telehealth" },
                                            { icon: FileText, label: "Records" },
                                            { icon: Pill, label: "Pharmacy" },
                                            { icon: Calendar, label: "Schedule" },
                                        ].map((a, i) => (
                                            <button key={i} className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-teal-50 transition-colors text-xs font-medium text-gray-600">
                                                <a.icon size={18} className="text-teal-600" />
                                                {a.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Health Score: Excellent</p>
                                        <p className="text-xs text-gray-400">Last checkup: Feb 28, 2026</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Departments */}
            <section id="departments" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">Specialties</p>
                        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Our Departments</h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">World-class specialists across multiple disciplines, delivering comprehensive care.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.map((dept, i) => (
                            <div key={i} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:shadow-teal-50 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center ${dept.text} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <dept.icon size={26} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-xl mb-2 group-hover:text-teal-600 transition-colors">{dept.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4">{dept.desc}</p>
                                <span className="flex items-center gap-1 text-sm font-semibold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Learn More <ChevronRight size={16} />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Doctors */}
            <section id="doctors" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">Medical Team</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Meet Our Doctors</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Experienced, compassionate physicians committed to your well-being.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {doctors.map((doc, i) => (
                        <div key={i} className="group text-center">
                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-teal-100 to-emerald-50 border border-teal-100/50">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Stethoscope size={48} className="text-teal-300/50" strokeWidth={1} />
                                </div>
                                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-white/80 to-transparent">
                                    <div className="flex items-center justify-center gap-1">
                                        <Star size={14} className="text-amber-400 fill-amber-400" />
                                        <span className="text-sm font-bold">{doc.rating}</span>
                                        <span className="text-xs text-gray-500">({doc.patients} patients)</span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg group-hover:text-teal-600 transition-colors">{doc.name}</h3>
                            <p className="text-teal-600 text-sm font-medium">{doc.specialty}</p>
                            <p className="text-gray-500 text-xs mt-1">{doc.experience} experience</p>
                            <button className="mt-4 px-6 py-2.5 border border-teal-200 rounded-xl text-sm font-semibold text-teal-700 hover:bg-teal-50 transition-colors">
                                Book Appointment
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services / Features */}
            <section id="services" className="py-24 bg-[#0d6e6e] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <p className="text-sm font-semibold text-teal-200 uppercase tracking-wider mb-4">Why MedCare</p>
                            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">
                                Healthcare designed around <span className="text-emerald-300">you</span>.
                            </h2>
                            <p className="text-teal-100/70 text-lg leading-relaxed mb-10">
                                We combine modern technology with compassionate care to make your healthcare experience seamless, convenient, and effective.
                            </p>
                            <button className="flex items-center gap-2 px-8 py-4 bg-white text-teal-700 rounded-2xl font-semibold hover:bg-teal-50 transition-colors group">
                                Explore All Services <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {features.map((feature, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-colors">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5 text-emerald-300">
                                        <feature.icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-teal-100/60 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="contact" className="py-24 bg-gradient-to-br from-teal-50 to-emerald-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-4">Get Started</p>
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        Your health journey starts here.
                    </h2>
                    <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
                        Schedule your appointment today and experience healthcare that puts you first.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="flex items-center justify-center gap-2 px-10 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-teal-500/25 transition-all text-lg">
                            <Calendar size={20} /> Book Appointment
                        </button>
                        <button className="flex items-center justify-center gap-2 px-10 py-4 bg-white border border-gray-200 rounded-2xl font-semibold text-gray-700 hover:bg-gray-50 transition-all text-lg shadow-sm">
                            <Phone size={20} /> Call Us
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1a2332] text-white pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
                                <Heart size={16} className="text-white fill-white" />
                            </div>
                            <span className="font-extrabold text-lg">Med<span className="text-teal-400">Care</span></span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Providing compassionate, patient-centered healthcare with cutting-edge medical technology since 2011.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-6">Departments</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-white transition-colors">Cardiology</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Neurology</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Orthopedics</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pediatrics</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-6">Services</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-white transition-colors">Telehealth</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Lab Tests</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pharmacy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Emergency</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-6">Contact</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li className="flex items-center gap-2"><Phone size={14} /> (555) 123-4567</li>
                            <li className="flex items-center gap-2"><Mail size={14} /> info@medcare.com</li>
                            <li className="flex items-center gap-2"><MapPin size={14} /> 200 Health Ave</li>
                            <li className="flex items-center gap-2"><Clock size={14} /> Mon-Sat: 8AM-8PM</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                    <p>© 2026 MedCare Health & Wellness. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">HIPAA Notice</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
