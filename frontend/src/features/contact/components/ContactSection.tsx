"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/api";
import { Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitInquiry(formData);
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Failed to submit inquiry", error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses = "w-full bg-black/50 border border-border rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all duration-300";

  return (
    <div className="relative max-w-2xl mx-auto overflow-x-hidden">
      {/* Decorative orb */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[85vw] max-w-[400px] aspect-square bg-hero-glow rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative glass-panel p-8 md:p-12"
      >
        <div className="mb-12 text-center">
          <h3 className="font-jakarta text-3xl font-bold text-white mb-4">Let&apos;s Build <span className="gradient-text">Something Great</span></h3>
          <p className="text-primary-muted text-lg max-w-md mx-auto">Whether it&apos;s a system build or a template request, I usually respond within 24 hours.</p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle2 size={64} className="mx-auto text-green-400 mb-6" strokeWidth={1.5} />
              </motion.div>
              <h4 className="font-jakarta text-xl font-semibold text-white mb-2">Message Received</h4>
              <p className="text-primary-muted">I will be in touch shortly.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-400 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-400 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="jane@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-400 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className={inputClasses}
                  placeholder="System Architecture Consultation"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400 uppercase tracking-wider">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell me about your project requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-orange-500 text-white py-4 rounded-xl font-semibold hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Transmitting...
                  </span>
                ) : (
                  <>
                    Send Inquiry <Send size={18} />
                  </>
                )}
              </button>

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-400 text-center mt-4 bg-red-400/10 py-2 rounded-lg border border-red-400/20"
                >
                  Transmission failed. Please verify your backend connection.
                </motion.p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
