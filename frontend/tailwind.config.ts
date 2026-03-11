import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080810", // Deep purple-tinted black
        foreground: "#fafafa",
        card: "rgba(139, 92, 246, 0.04)", // Glassmorphic purple tint
        border: "rgba(139, 92, 246, 0.12)",
        primary: {
          DEFAULT: "#ffffff",
          muted: "#a1a1aa", // zinc-400 for secondary text
        },
        accent: {
          DEFAULT: "#8b5cf6", // Violet-purple — main accent
          glow: "rgba(139, 92, 246, 0.2)",
        },
        spark: {
          DEFAULT: "#f97316", // Amber-orange — energetic highlight
          glow: "rgba(249, 115, 22, 0.2)",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #8b5cf633 0deg, #f9731633 120deg, #a855f733 240deg, #8b5cf633 360deg)',
      },
    },
  },
  plugins: [],
};
export default config;