"use client";

import { useState } from "react";
import { ShoppingCart, Menu, Search, ArrowRight, Star } from "lucide-react";

export default function EcommerceDemo() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans overflow-x-hidden">
      {/* Top Banner */}
      <div className="bg-[#1a1a1a] text-white text-xs md:text-sm text-center py-2 font-medium tracking-wide">
        FREE SHIPPING ON ALL ORDERS OVER $150
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          <div className="flex items-center gap-6">
            <button className="md:hidden">
              <Menu size={24} />
            </button>
            <span className="font-bold text-2xl tracking-tighter">AURA.</span>
            <div className="hidden md:flex items-center gap-8 ml-8 text-sm font-medium text-gray-600">
              <a href="#" className="text-black">New Arrivals</a>
              <a href="#" className="hover:text-black transition-colors">Essentials</a>
              <a href="#" className="hover:text-black transition-colors">Collections</a>
              <a href="#" className="hover:text-black transition-colors">Journal</a>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="text-gray-600 hover:text-black transition-colors hidden md:block">
              <Search size={20} />
            </button>
            <button className="text-gray-600 hover:text-black transition-colors">
              <span className="hidden md:inline-block mr-2 text-sm font-medium">Account</span>
            </button>
            <button 
              onClick={() => setCartOpen(!cartOpen)}
              className="text-gray-600 hover:text-black transition-colors relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-gray-200 overflow-hidden">
        {/* Abstract dark shape background to look premium */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black z-0"></div>
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1618090584126-129cd1d3f017?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay z-0"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
          <span className="uppercase tracking-[0.3em] text-xs font-semibold mb-6 block text-gray-300">Spring Collection 2026</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Minimalism <br className="hidden md:block" /> Perfected.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Discover our new arrival of carefully crafted essentials designed for the modern aesthetic.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold text-sm tracking-wide rounded-sm hover:bg-gray-100 transition-colors">
              SHOP COLLECTION
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-semibold text-sm tracking-wide rounded-sm hover:bg-white/10 transition-colors">
              EXPLORE BRAND
            </button>
          </div>
        </div>
      </header>

      {/* Featured Products */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 bg-white">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Trending Now</h2>
            <p className="text-gray-500">Carefully selected pieces for your everyday wardrobe.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-semibold uppercase tracking-wider hover:text-gray-600 transition-colors">
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {/* Product 1 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4 rounded-sm">
              <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 z-10">New</div>
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <div className="w-full h-full bg-zinc-200">
                 {/* Mock image placeholder using CSS gradient since we don't have external images guaranteed */}
                 <div className="w-full h-full bg-gradient-to-tr from-zinc-300 to-zinc-100 flex items-center justify-center text-zinc-400">
                    <span className="text-sm font-medium">Product Image</span>
                 </div>
              </div>
            </div>
            <h3 className="font-semibold text-base mb-1 group-hover:text-gray-600 transition-colors">Essential Oversized Tee</h3>
            <p className="text-gray-500 text-sm mb-2">Heavyweight Cotton</p>
            <div className="flex items-center justify-between">
              <span className="font-bold">$45.00</span>
              <div className="flex items-center text-black">
                <Star size={12} className="fill-current" />
                <span className="text-xs font-medium ml-1">4.9</span>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4 rounded-sm">
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <div className="w-full h-full bg-zinc-200">
                 <div className="w-full h-full bg-gradient-to-tr from-stone-300 to-stone-100 flex items-center justify-center text-stone-400">
                    <span className="text-sm font-medium">Product Image</span>
                 </div>
              </div>
            </div>
            <h3 className="font-semibold text-base mb-1 group-hover:text-gray-600 transition-colors">Pleated Wide Trousers</h3>
            <p className="text-gray-500 text-sm mb-2">Japanese Twill</p>
            <div className="flex items-center justify-between">
              <span className="font-bold">$120.00</span>
              <div className="flex items-center text-black">
                <Star size={12} className="fill-current" />
                <span className="text-xs font-medium ml-1">4.7</span>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4 rounded-sm">
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <div className="w-full h-full bg-zinc-200">
                 <div className="w-full h-full bg-gradient-to-tr from-slate-300 to-slate-100 flex items-center justify-center text-slate-400">
                    <span className="text-sm font-medium">Product Image</span>
                 </div>
              </div>
            </div>
            <h3 className="font-semibold text-base mb-1 group-hover:text-gray-600 transition-colors">Ribbed Knit Sweater</h3>
            <p className="text-gray-500 text-sm mb-2">Merino Wool Blend</p>
            <div className="flex items-center justify-between">
              <span className="font-bold">$85.00</span>
              <div className="flex items-center text-black">
                <Star size={12} className="fill-current" />
                <span className="text-xs font-medium ml-1">5.0</span>
              </div>
            </div>
          </div>

          {/* Product 4 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden mb-4 rounded-sm">
               <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 z-10">Sale</div>
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <div className="w-full h-full bg-zinc-200">
                 <div className="w-full h-full bg-gradient-to-tr from-gray-300 to-gray-100 flex items-center justify-center text-gray-400">
                    <span className="text-sm font-medium">Product Image</span>
                 </div>
              </div>
            </div>
            <h3 className="font-semibold text-base mb-1 group-hover:text-gray-600 transition-colors">Minimalist Leather Tote</h3>
            <p className="text-gray-500 text-sm mb-2">Full Grain Leather</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span className="font-bold text-red-600">$180.00</span>
                <span className="text-gray-400 line-through text-sm">$220.00</span>
              </div>
              <div className="flex items-center text-black">
                <Star size={12} className="fill-current" />
                <span className="text-xs font-medium ml-1">4.8</span>
              </div>
            </div>
          </div>
        </div>

        <button className="md:hidden mt-10 w-full flex items-center justify-center gap-2 border border-black py-4 text-sm font-semibold uppercase tracking-wider">
          View All <ArrowRight size={16} />
        </button>
      </section>

      {/* Featured Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="bg-zinc-900 rounded-sm overflow-hidden flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-12 md:p-20 text-white">
            <span className="uppercase tracking-[0.2em] text-xs font-semibold mb-4 block text-zinc-400">The Comfort Zone</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">Elevate your daily uniform.</h2>
            <p className="text-zinc-400 mb-8 max-w-md leading-relaxed">
              Premium fabrics met with architectural silhouettes. Designed and manufactured with obsessive attention to detail.
            </p>
            <button className="px-6 py-3 bg-white text-black font-semibold text-sm tracking-wide rounded-sm hover:bg-zinc-200 transition-colors">
              SHOP MENSWEAR
            </button>
          </div>
          <div className="w-full md:w-1/2 h-[400px] md:h-[600px] bg-zinc-800 relative">
             <div className="absolute inset-0 bg-gradient-to-bl from-zinc-700 to-zinc-900 flex flex-col items-center justify-center text-zinc-500">
                <span className="text-lg font-medium opacity-50">Lifestyle Image</span>
             </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-zinc-100 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-200">
          <div className="pt-6 md:pt-0 pb-6 md:pb-0 px-6">
            <h4 className="font-bold mb-2">Free Shipping</h4>
            <p className="text-sm text-gray-500">On all orders over $150. Automatically applied at checkout.</p>
          </div>
          <div className="pt-6 md:pt-0 pb-6 md:pb-0 px-6">
            <h4 className="font-bold mb-2">Sustainable Materials</h4>
            <p className="text-sm text-gray-500">Committed to using 100% organic or recycled materials by 2028.</p>
          </div>
          <div className="pt-6 md:pt-0 pb-6 md:pb-0 px-6">
            <h4 className="font-bold mb-2">Easy Returns</h4>
            <p className="text-sm text-gray-500">Not quite right? Return it within 30 days for a full refund.</p>
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-100 text-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div>
            <span className="font-bold text-2xl tracking-tighter block mb-6">AURA.</span>
            <p className="text-gray-500 leading-relaxed mb-6">
              Modern essentials crafted for longevity. Designed in Stockholm, manufactured responsibly globally.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6 text-xs text-gray-400">Shop</h4>
            <ul className="space-y-4 text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Menswear</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Womenswear</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6 text-xs text-gray-400">Help</h4>
            <ul className="space-y-4 text-gray-600">
              <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6 text-xs text-gray-400">Newsletter</h4>
            <p className="text-gray-500 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex border-b border-gray-300 focus-within:border-black transition-colors">
              <input type="email" placeholder="Enter your email" className="w-full py-2 outline-none bg-transparent" />
              <button className="uppercase font-semibold tracking-wider text-xs px-2 hover:text-gray-500">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center text-gray-400 pt-8 border-t border-gray-100">
          <p>© 2026 Aura Ltd. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-black transition-colors">Instagram</a>
            <a href="#" className="hover:text-black transition-colors">Twitter</a>
            <a href="#" className="hover:text-black transition-colors">Pinterest</a>
          </div>
        </div>
      </footer>

      {/* Flyout Cart (Simplified) */}
      {cartOpen && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]" onClick={() => setCartOpen(false)}></div>
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">Your Cart (2)</h3>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-black">Close</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Cart Item 1 */}
              <div className="flex gap-4">
                <div className="w-20 h-24 bg-zinc-200 rounded-sm"></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">Essential Oversized Tee</h4>
                    <span className="font-bold">$45.00</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">Color: Black | Size: M</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button className="px-2 py-1 hover:bg-gray-50">-</button>
                      <span className="px-2 py-1 font-medium">1</span>
                      <button className="px-2 py-1 hover:bg-gray-50">+</button>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 underline decoration-gray-300 text-xs">Remove</button>
                  </div>
                </div>
              </div>
              {/* Cart Item 2 */}
              <div className="flex gap-4">
                <div className="w-20 h-24 bg-zinc-200 rounded-sm"></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">Minimalist Leather Tote</h4>
                    <span className="font-bold">$180.00</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">Color: Tan</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button className="px-2 py-1 hover:bg-gray-50">-</button>
                      <span className="px-2 py-1 font-medium">1</span>
                      <button className="px-2 py-1 hover:bg-gray-50">+</button>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 underline decoration-gray-300 text-xs">Remove</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between mb-4 text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold">$225.00</span>
              </div>
              <p className="text-xs text-gray-500 mb-6">Taxes and shipping calculated at checkout.</p>
              <button className="w-full bg-black text-white font-semibold py-4 rounded-sm hover:bg-gray-800 transition-colors">
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
