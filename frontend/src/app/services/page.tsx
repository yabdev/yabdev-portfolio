"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Code2, Layout, ShoppingCart, Server, GraduationCap, FileText, BookOpen,
    Sparkles, ArrowRight, X, Loader2, CreditCard, Shield, CheckCircle
} from "lucide-react";
import { initializePayment } from "@/lib/api";
import { getServicePrices } from "@/lib/pricing";

interface Service {
    name: string;
    description: string;
    price: number;
    category: string;
    icon: React.ElementType;
    features: string[];
    gradient: string;
    popular?: boolean;
}

const serviceDefinitions: Omit<Service, 'price'>[] = [
    {
        name: "Business Website Template",
        description: "Professional, responsive website built to showcase your brand and attract customers.",
        category: "Templates",
        icon: Layout,
        features: ["Responsive design", "SEO optimized", "Contact form", "5 pages", "1 month support"],
        gradient: "from-blue-600 to-indigo-700",
    },
    {
        name: "E-Commerce Platform",
        description: "Full-featured online store with product management, cart, and checkout system.",
        category: "Templates",
        icon: ShoppingCart,
        features: ["Product catalog", "Shopping cart", "Payment integration", "Admin dashboard", "3 months support"],
        gradient: "from-emerald-600 to-teal-700",
        popular: true,
    },
    {
        name: "Enterprise Web Application",
        description: "Custom-built, scalable enterprise solution tailored to your business logic and workflows.",
        category: "Projects",
        icon: Code2,
        features: ["Custom architecture", "API development", "Database design", "Authentication", "6 months support"],
        gradient: "from-violet-600 to-purple-700",
    },
    {
        name: "API & Backend Development",
        description: "Robust REST API and backend systems built with Java Spring Boot for performance at scale.",
        category: "Projects",
        icon: Server,
        features: ["RESTful API", "Database integration", "Authentication & security", "Documentation", "3 months support"],
        gradient: "from-orange-500 to-red-600",
    },
    {
        name: "Seminar Paper",
        description: "Well-researched and structured seminar paper with proper citations and formatting.",
        category: "Academic",
        icon: GraduationCap,
        features: ["Topic research", "Structured writing", "Proper citations", "Formatting", "1 revision"],
        gradient: "from-cyan-600 to-blue-700",
    },
    {
        name: "Project Writing",
        description: "Comprehensive final year project documentation including literature review and methodology.",
        category: "Academic",
        icon: FileText,
        features: ["Chapter 1-5", "Literature review", "Methodology", "Data analysis", "2 revisions"],
        gradient: "from-amber-500 to-orange-600",
    },
    {
        name: "Manuscript / Thesis",
        description: "Publication-ready manuscript or thesis with thorough research and professional formatting.",
        category: "Academic",
        icon: BookOpen,
        features: ["Deep research", "Academic writing", "Journal formatting", "Plagiarism check", "3 revisions"],
        gradient: "from-pink-600 to-rose-700",
    },
];

const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(amount);

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [isCustom, setIsCustom] = useState(false);
    const [customAmount, setCustomAmount] = useState("");
    const [customDescription, setCustomDescription] = useState("");
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    // Load prices from shared config (admin-adjustable via localStorage)
    useEffect(() => {
        const prices = getServicePrices();
        const merged = serviceDefinitions.map(def => ({
            ...def,
            price: prices.find(p => p.name === def.name)?.price ?? 0,
        }));
        setServices(merged);
    }, []);

    const categories = ["All", "Templates", "Projects", "Academic"];

    const filteredServices = activeCategory === "All"
        ? services
        : services.filter(s => s.category === activeCategory);

    const handlePayment = async () => {
        if (!formData.name || !formData.email) {
            setError("Please fill in your name and email.");
            return;
        }

        const amount = isCustom ? parseInt(customAmount) : selectedService?.price;
        const serviceName = isCustom ? (customDescription || "Custom Quote") : selectedService?.name;

        if (!amount || amount < 100) {
            setError("Please enter a valid amount (minimum ₦100).");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await initializePayment({
                email: formData.email,
                customerName: formData.name,
                serviceName: serviceName || "Service",
                amount,
            });

            if (response.authorizationUrl) {
                window.location.href = response.authorizationUrl;
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Payment initialization failed. Please try again.");
            setLoading(false);
        }
    };

    const openModal = (service: Service | null, custom = false) => {
        setSelectedService(service);
        setIsCustom(custom);
        setError("");
        setFormData({ name: "", email: "" });
    };

    const closeModal = () => {
        setSelectedService(null);
        setIsCustom(false);
        setError("");
    };

    return (
        <div className="min-h-screen pb-32">
            {/* Hero */}
            <section className="relative pt-16 pb-24 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-hero-glow rounded-full blur-[150px] opacity-10 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-medium mb-8">
                        <CreditCard size={16} />
                        Secure Payments via Paystack
                    </div>
                    <h1 className="font-jakarta text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Our <span className="gradient-text">Services</span>
                    </h1>
                    <p className="text-primary-muted text-lg max-w-2xl mx-auto leading-relaxed">
                        From enterprise applications to academic writing — select a service, make a payment, and let&apos;s get started.
                    </p>
                </motion.div>
            </section>

            {/* Category Filter */}
            <div className="flex justify-center gap-3 mb-16 flex-wrap px-4">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                            ? "bg-accent text-white shadow-lg shadow-accent/20"
                            : "bg-white/5 text-primary-muted hover:text-white hover:bg-white/10 border border-white/5"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <AnimatePresence mode="popLayout">
                    {filteredServices.map((service, i) => (
                        <motion.div
                            key={service.name}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="relative group glass-panel p-0 overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                        >
                            {service.popular && (
                                <div className="absolute top-4 right-4 px-3 py-1 bg-accent rounded-full text-[10px] font-bold uppercase tracking-wider text-white z-10">
                                    Popular
                                </div>
                            )}

                            {/* Gradient header */}
                            <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />

                            <div className="p-8">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                    <service.icon size={24} className="text-white" strokeWidth={1.5} />
                                </div>

                                <span className="text-xs font-mono text-accent/70 uppercase tracking-widest">{service.category}</span>
                                <h3 className="font-jakarta text-xl font-bold text-white mt-2 mb-3">{service.name}</h3>
                                <p className="text-primary-muted text-sm leading-relaxed mb-6">{service.description}</p>

                                <ul className="space-y-2 mb-8">
                                    {service.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-primary-muted/80">
                                            <CheckCircle size={14} className="text-accent shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-end justify-between pt-6 border-t border-white/5">
                                    <div>
                                        <span className="text-xs text-primary-muted/60">Starting from</span>
                                        <p className="text-2xl font-bold text-white">{formatPrice(service.price)}</p>
                                    </div>
                                    <button
                                        onClick={() => openModal(service)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-accent hover:shadow-lg hover:shadow-accent/20 text-white rounded-xl text-sm font-semibold transition-all duration-300 group/btn"
                                    >
                                        Pay Now
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Custom Quote Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="glass-panel p-8 md:p-12 text-center max-w-2xl mx-auto"
            >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-accent to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                    <Sparkles size={28} className="text-white" />
                </div>
                <h3 className="font-jakarta text-2xl font-bold text-white mb-3">Custom Quote</h3>
                <p className="text-primary-muted mb-8 max-w-md mx-auto">
                    Have a unique project or need? Enter your quoted amount and proceed with payment.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-4">
                    <input
                        type="text"
                        placeholder="Describe the service..."
                        value={customDescription}
                        onChange={(e) => setCustomDescription(e.target.value)}
                        className="flex-1 bg-black/50 border border-border rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₦</span>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            min="100"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            className="w-full pl-8 pr-4 py-3.5 bg-black/50 border border-border rounded-xl text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                        />
                    </div>
                    <button
                        onClick={() => {
                            if (!customAmount || parseInt(customAmount) < 100) {
                                setError("Please enter a valid amount (minimum ₦100).");
                                return;
                            }
                            openModal(null, true);
                        }}
                        className="px-8 py-3.5 bg-gradient-to-r from-accent to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-accent/20 transition-all"
                    >
                        Proceed
                    </button>
                </div>
                {error && !selectedService && !isCustom && (
                    <p className="text-red-400 text-sm mt-3">{error}</p>
                )}
            </motion.div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 text-primary-muted/50 text-xs uppercase tracking-widest">
                <div className="flex items-center gap-2"><Shield size={16} /> Secure Payment</div>
                <div className="flex items-center gap-2"><CreditCard size={16} /> Card & Bank Transfer</div>
                <div className="flex items-center gap-2"><CheckCircle size={16} /> Instant Confirmation</div>
            </div>

            {/* Payment Modal */}
            <AnimatePresence>
                {(selectedService || isCustom) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md bg-[#13141b] border border-white/10 rounded-2xl p-8 relative"
                        >
                            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>

                            <div className="text-center mb-8">
                                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center shadow-lg ${isCustom
                                    ? "bg-gradient-to-br from-accent to-orange-500"
                                    : `bg-gradient-to-br ${selectedService?.gradient}`
                                    }`}>
                                    {isCustom
                                        ? <Sparkles size={22} className="text-white" />
                                        : selectedService && <selectedService.icon size={22} className="text-white" />
                                    }
                                </div>
                                <h3 className="font-jakarta text-xl font-bold text-white">
                                    {isCustom ? (customDescription || "Custom Quote") : selectedService?.name}
                                </h3>
                                <p className="text-2xl font-bold text-accent mt-2">
                                    {isCustom ? formatPrice(parseInt(customAmount) || 0) : formatPrice(selectedService?.price || 0)}
                                </p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="Your full name"
                                        className="w-full bg-black/50 border border-border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder="you@email.com"
                                        className="w-full bg-black/50 border border-border rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                                    />
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-400 text-sm text-center mb-4 bg-red-400/10 py-2 rounded-lg border border-red-400/20">{error}</p>
                            )}

                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-orange-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-accent/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 size={18} className="animate-spin" />
                                        Processing...
                                    </span>
                                ) : (
                                    <>
                                        <CreditCard size={18} />
                                        Pay {isCustom ? formatPrice(parseInt(customAmount) || 0) : formatPrice(selectedService?.price || 0)}
                                    </>
                                )}
                            </button>

                            <p className="text-center text-gray-600 text-xs mt-4 flex items-center justify-center gap-1">
                                <Shield size={12} /> Secured by Paystack
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
