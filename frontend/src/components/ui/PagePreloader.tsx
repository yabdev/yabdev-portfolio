"use client";

import { motion } from "framer-motion";

export default function PagePreloader() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            onAnimationComplete={(def: { opacity?: number }) => {
                if (def.opacity === 0) {
                    const el = document.getElementById("page-preloader");
                    if (el) el.style.display = "none";
                }
            }}
            id="page-preloader"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
            <div className="flex flex-col items-center gap-6">
                {/* Animated Hexagon Logo */}
                <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative"
                >
                    <div
                        className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1a1a2e] to-[#0a0a10] shadow-2xl border border-white/10"
                        style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                    >
                        <span className="font-serif text-3xl flex items-center tracking-tighter">
                            <span className="text-white drop-shadow-md">A</span>
                            <span className="text-accent -ml-2 drop-shadow-xl">Z</span>
                        </span>
                    </div>

                    {/* Pulsing glow ring */}
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
                    />
                </motion.div>

                {/* Shimmer loading bar */}
                <div className="w-32 h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 0.8, repeat: 1, ease: "easeInOut" }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-accent to-transparent"
                    />
                </div>
            </div>
        </motion.div>
    );
}
