"use client";

import { useState } from "react";
import { ChevronRight, LayoutTemplate, Zap, Shield, BarChart3, Menu, X, Check } from "lucide-react";
import Image from "next/image";

export default function SaasDemo() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white font-sans overflow-x-hidden selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap size={18} className="text-white fill-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">NexusAI</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#resources" className="hover:text-white transition-colors">Resources</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Log in</button>
            <button className="px-5 py-2.5 text-sm font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors">
              Start Building
            </button>
          </div>

          <button className="md:hidden text-gray-400" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 flex flex-col items-center text-center">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Introducing NexusAI v2.0
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-8 leading-[1.1]">
          The intelligence layer for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">entire infrastructure</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-light">
          Automate workflows, detect anomalies, and scale operations with our enterprise-grade AI engine. Deploys in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors">
            Start free trial <ChevronRight size={18} />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full font-medium text-white hover:bg-white/10 transition-colors">
            Book a demo
          </button>
        </div>

        {/* Dashboard Preview */}
        <div className="relative w-full max-w-5xl mt-20 relative z-10">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a0b] to-transparent z-10"></div>
          <div className="rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(79,70,229,0.15)] bg-[#121214] p-2">
            <div className="relative w-full aspect-[16/9] bg-zinc-900 rounded-xl overflow-hidden border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop" 
                alt="Dashboard Preview" 
                className="w-full h-full object-cover opacity-80 mix-blend-screen"
              />
              {/* Overlay realistic UI elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-black/60 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-50 grayscale">
            <div className="text-2xl font-bold font-serif italic">Acme Corp</div>
            <div className="text-xl font-black uppercase tracking-tighter">GLOBAL</div>
            <div className="text-2xl font-light tracking-widest">QUANTUM</div>
            <div className="text-xl font-bold">Lumina</div>
            <div className="text-2xl font-medium tracking-tight">Vortex</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Built for scale. Designed for speed.</h2>
          <p className="text-gray-400 text-lg">Everything you need to manage complex distributed systems without the operational overhead.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-[#121214] border border-white/5 rounded-2xl p-8 hover:bg-[#151518] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 text-indigo-400">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Process millions of events per second with sub-millisecond latency. Instant insights into your data streams.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#121214] border border-white/5 rounded-2xl p-8 hover:bg-[#151518] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-400">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              SOC2 Type II certified. AES-256 encryption at rest, TLS 1.3 in transit. Bring your own keys (BYOK) supported.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#121214] border border-white/5 rounded-2xl p-8 hover:bg-[#151518] transition-colors relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 text-pink-400">
              <LayoutTemplate size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-3">API-First Design</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Everything you can do in the UI, you can do via our comprehensively documented REST and GraphQL APIs.
            </p>
          </div>
        </div>
      </section>

      {/* Split Section */}
      <section className="py-24 overflow-hidden border-t border-white/5 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-indigo-900/10 blur-[100px] pointer-events-none rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-indigo-400 font-semibold tracking-wide text-sm uppercase mb-4 block">Infrastructure Graph</span>
            <h2 className="text-4xl rounded-2xl md:text-5xl font-bold mb-6 tracking-tight">Visualize your entire stack instantly.</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              NexusAI automatically maps your microservices, databases, and third-party APIs. Detect bottlenecks and single points of failure before they impact your users.
            </p>
            <ul className="space-y-4 mb-10">
              {['Auto-discovery for Kubernetes clusters', 'eBPF-powered distributed tracing', 'AI-assisted root cause analysis'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="text-white font-medium flex items-center gap-2 hover:text-indigo-400 transition-colors group">
              Explore the platform <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
          <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop"
              alt="Code and visualization"
              className="w-full h-full object-cover mix-blend-luminosity opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-[#121214] border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-20 px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Simple, transparent pricing.</h2>
          <p className="text-gray-400 text-lg">Start for free, scale when you need to.</p>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Starter Plan */}
          <div className="bg-[#0a0a0b] border border-white/10 rounded-3xl p-10 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <p className="text-gray-400 text-sm mb-6">Perfect for side projects and small teams.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold tracking-tight">$0</span>
              <span className="text-gray-500 font-medium">/month</span>
            </div>
            <button className="w-full py-3 px-6 rounded-full bg-white/5 border border-white/10 font-medium hover:bg-white/10 transition-colors mb-8">
              Get Started
            </button>
            <div className="space-y-4 flex-1">
              {['Up to 5 team members', '10GB data ingestion/month', '1-day data retention', 'Community support'].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <Check size={18} className="text-gray-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-b from-indigo-900/40 to-[#0a0a0b] border border-indigo-500/30 rounded-3xl p-10 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="absolute top-6 right-8 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
            <p className="text-indigo-200/60 text-sm mb-6">For scaling applications and larger teams.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold tracking-tight text-white">$49</span>
              <span className="text-gray-400 font-medium">/month</span>
            </div>
            <button className="w-full py-3 px-6 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors mb-8 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              Start 14-day trial
            </button>
            <div className="space-y-4 flex-1">
              {['Unlimited team members', '500GB data ingestion/month', '30-day data retention', 'Priority email & chat support', 'SSO/SAML integration', 'Custom dashboards'].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-200">
                  <Check size={18} className="text-indigo-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0b] border-t border-white/5 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap size={14} className="text-white fill-white" />
              </div>
              <span className="font-bold tracking-tight">NexusAI</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm leading-relaxed">
              Building the future of artificial intelligence for distributed infrastructure. Designed with precision in San Francisco.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-6 text-sm">Product</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-6 text-sm">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-6 text-sm">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 NexusAI Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
