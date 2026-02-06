import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary accent: Orange (for CTAs and key emphasis)
        accent: {
          DEFAULT: "#d48a27",
          hover: "#b8751f",
          light: "#e9a84a",
        },
        // Secondary accent: Slate (for metadata, dates, subtle info)
        secondary: {
          DEFAULT: "#64748b", // slate-500
          light: "#94a3b8", // slate-400
          dark: "#475569", // slate-600
        },
        // Semantic surfaces
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          subtle: "rgb(var(--bg-subtle) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        // Refined type scale
        "display": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "headline": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "title": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body": ["1rem", { lineHeight: "1.7" }],
        "caption": ["0.875rem", { lineHeight: "1.5" }],
        "small": ["0.75rem", { lineHeight: "1.5" }],
      },
      spacing: {
        // Extended spacing for better rhythm
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        "soft": "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "soft-md": "0 4px 6px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 10px 15px rgba(0, 0, 0, 0.04), 0 4px 6px rgba(0, 0, 0, 0.05)",
        "accent": "0 10px 30px -10px rgba(212, 138, 39, 0.4)",
        "accent-lg": "0 15px 40px -10px rgba(212, 138, 39, 0.5)",
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
