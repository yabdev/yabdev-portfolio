"use client";

import { useState } from "react";
import { MapPin, BedDouble, Bath, Maximize, Search, Menu, X, Phone, ArrowRight, Star, Heart, SlidersHorizontal } from "lucide-react";

const listings = [
    {
        title: "Skyline Penthouse",
        location: "Upper East Side, Manhattan",
        price: "$4,250,000",
        beds: 4,
        baths: 3,
        sqft: "3,200",
        tag: "Featured",
        gradient: "from-amber-900/60 to-stone-900/80",
    },
    {
        title: "Modern Loft Residence",
        location: "Tribeca, New York",
        price: "$2,780,000",
        beds: 3,
        baths: 2,
        sqft: "2,100",
        tag: "New",
        gradient: "from-slate-800/70 to-zinc-900/80",
    },
    {
        title: "Coastal Villa",
        location: "Malibu, California",
        price: "$6,500,000",
        beds: 5,
        baths: 4,
        sqft: "4,800",
        tag: null,
        gradient: "from-sky-900/50 to-slate-900/80",
    },
    {
        title: "Minimalist Townhouse",
        location: "Chelsea, London",
        price: "£3,100,000",
        beds: 3,
        baths: 3,
        sqft: "2,600",
        tag: "Exclusive",
        gradient: "from-stone-700/50 to-neutral-900/80",
    },
    {
        title: "Garden Estate",
        location: "Beverly Hills, CA",
        price: "$8,900,000",
        beds: 6,
        baths: 5,
        sqft: "6,200",
        tag: null,
        gradient: "from-emerald-900/40 to-stone-900/80",
    },
    {
        title: "Art Deco Apartment",
        location: "South Beach, Miami",
        price: "$1,950,000",
        beds: 2,
        baths: 2,
        sqft: "1,800",
        tag: "Hot",
        gradient: "from-rose-900/40 to-stone-900/70",
    },
];

const stats = [
    { value: "2,400+", label: "Properties Sold" },
    { value: "$3.2B", label: "Total Sales Volume" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Years of Excellence" },
];

export default function RealEstateDemo() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#faf9f7] text-[#1a1917] font-sans overflow-x-hidden selection:bg-amber-200">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-md flex items-center justify-center">
                            <MapPin size={16} className="text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">Prestige<span className="text-amber-700">.</span></span>
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-sm font-medium text-stone-600">
                        <a href="#listings" className="hover:text-amber-700 transition-colors">Properties</a>
                        <a href="#about" className="hover:text-amber-700 transition-colors">About</a>
                        <a href="#services" className="hover:text-amber-700 transition-colors">Services</a>
                        <a href="#contact" className="hover:text-amber-700 transition-colors">Contact</a>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <button className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors">
                            <Phone size={16} /> +1 (555) 234-5678
                        </button>
                        <button className="px-5 py-2.5 text-sm font-semibold bg-[#1a1917] text-white rounded-lg hover:bg-stone-800 transition-colors">
                            List Property
                        </button>
                    </div>

                    <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-2xl font-medium">
                    <a href="#listings" onClick={() => setMobileMenuOpen(false)}>Properties</a>
                    <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
                    <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                </div>
            )}

            {/* Hero */}
            <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900/80"></div>
                <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2800&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-stone-900/40"></div>

                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-8 border border-white/10">
                        <Star size={14} className="text-amber-400 fill-amber-400" /> Luxury Real Estate Since 2011
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.05]">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Dream</span> Home
                    </h1>
                    <p className="text-lg md:text-xl text-stone-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                        Discover exceptional properties worldwide. From penthouses to estates, we curate luxury living tailored to your lifestyle.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-3 shadow-2xl shadow-black/20 flex flex-col md:flex-row gap-2">
                        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-stone-50 rounded-xl">
                            <Search size={18} className="text-stone-400" />
                            <input
                                type="text"
                                placeholder="City, neighborhood, or address..."
                                className="w-full bg-transparent outline-none text-stone-800 placeholder-stone-400"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-3 bg-stone-100 rounded-xl text-stone-500 hover:bg-stone-200 transition-colors">
                                <SlidersHorizontal size={18} />
                            </button>
                            <button className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all shadow-lg shadow-amber-600/20">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats */}
            <section className="py-16 border-b border-stone-200/50">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-amber-700 mb-2">{stat.value}</div>
                            <div className="text-sm text-stone-500 uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Listings */}
            <section id="listings" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wider mb-2">Curated Selection</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Featured Properties</h2>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-sm font-semibold text-stone-600 hover:text-amber-700 transition-colors uppercase tracking-wider">
                        View All <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {listings.map((listing, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative h-72 rounded-2xl overflow-hidden mb-5">
                                <div className={`absolute inset-0 bg-gradient-to-br ${listing.gradient}`}></div>
                                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                                    <MapPin size={60} strokeWidth={0.5} />
                                </div>
                                {listing.tag && (
                                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-stone-900 text-xs font-bold uppercase tracking-wider rounded-full">
                                        {listing.tag}
                                    </div>
                                )}
                                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                                    <Heart size={16} className="text-stone-400 hover:text-red-500 transition-colors" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                    <p className="text-white text-2xl font-bold">{listing.price}</p>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold mb-1 group-hover:text-amber-700 transition-colors">{listing.title}</h3>
                            <p className="text-stone-500 text-sm flex items-center gap-1 mb-3">
                                <MapPin size={14} /> {listing.location}
                            </p>

                            <div className="flex items-center gap-5 text-sm text-stone-500">
                                <span className="flex items-center gap-1.5"><BedDouble size={16} /> {listing.beds} Beds</span>
                                <span className="flex items-center gap-1.5"><Bath size={16} /> {listing.baths} Baths</span>
                                <span className="flex items-center gap-1.5"><Maximize size={16} /> {listing.sqft} sqft</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About / Services */}
            <section id="about" className="py-24 bg-[#1a1917] text-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                    <div>
                        <p className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4">Why Prestige</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
                            Redefining luxury real estate.
                        </h2>
                        <p className="text-stone-400 leading-relaxed mb-6 text-lg">
                            For over 15 years, Prestige has been the trusted name in luxury property. Our team of dedicated specialists combines deep market knowledge with a personalized approach to help you find not just a house, but a home.
                        </p>
                        <p className="text-stone-500 leading-relaxed mb-10">
                            From initial consultation to final closing, we handle every detail with the discretion and expertise our clients expect.
                        </p>
                        <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all group">
                            Our Story <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div id="services" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { title: "Buying", desc: "Expert guidance through the entire purchase process." },
                            { title: "Selling", desc: "Strategic marketing to maximize your property's value." },
                            { title: "Investment", desc: "Portfolio management for high-value real estate assets." },
                            { title: "Consultation", desc: "Market analysis and property valuation services." },
                        ].map((service, i) => (
                            <div key={i} className="p-8 border border-white/10 rounded-2xl hover:border-amber-500/30 hover:bg-white/[0.03] transition-all duration-300">
                                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6 text-amber-400 text-lg font-bold">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                                <p className="text-stone-500 text-sm leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="contact" className="py-24 bg-gradient-to-br from-amber-50 to-stone-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-sm font-semibold text-amber-700 uppercase tracking-wider mb-4">Start Your Journey</p>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                        Your dream property awaits.
                    </h2>
                    <p className="text-stone-500 text-lg mb-12 max-w-2xl mx-auto">
                        Schedule a private consultation with one of our luxury property specialists. Experience the Prestige difference.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-10 py-4 bg-[#1a1917] text-white rounded-xl font-semibold hover:bg-stone-800 transition-colors">
                            Schedule Viewing
                        </button>
                        <button className="px-10 py-4 bg-white border border-stone-300 rounded-xl font-semibold text-stone-700 hover:bg-stone-50 transition-colors">
                            Browse Properties
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#1a1917] text-white pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-7 h-7 bg-gradient-to-br from-amber-500 to-amber-700 rounded-md flex items-center justify-center">
                                <MapPin size={14} className="text-white" />
                            </div>
                            <span className="font-bold text-lg">Prestige<span className="text-amber-400">.</span></span>
                        </div>
                        <p className="text-stone-500 text-sm leading-relaxed">
                            Luxury real estate brokerage serving discerning clients in the world&apos;s most desirable locations.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-stone-400 mb-6">Properties</h4>
                        <ul className="space-y-3 text-sm text-stone-500">
                            <li><a href="#" className="hover:text-white transition-colors">Buy</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Sell</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Rent</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">New Developments</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-stone-400 mb-6">Company</h4>
                        <ul className="space-y-3 text-sm text-stone-500">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider text-stone-400 mb-6">Contact</h4>
                        <ul className="space-y-3 text-sm text-stone-500">
                            <li>+1 (555) 234-5678</li>
                            <li>info@prestige.com</li>
                            <li>432 Park Avenue</li>
                            <li>New York, NY 10022</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600">
                    <p>© 2026 Prestige Real Estate. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
