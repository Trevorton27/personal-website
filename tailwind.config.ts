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
        // Dark theme: "Beauty of a storm"
        storm: {
          50: "#e6eef9",
          100: "#b8d0ed",
          200: "#8ab2e1",
          300: "#5c94d5",
          400: "#2e76c9",
          500: "#1a5aa8",
          600: "#154682",
          700: "#0f335c",
          800: "#0a2036",
          900: "#050d10",
          950: "#020408",
        },
        lightning: {
          DEFAULT: "#7dd3fc",
          bright: "#38bdf8",
          glow: "#0ea5e9",
        },
        // Light theme: "Summer field"
        field: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
        meadow: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
      },
      backgroundImage: {
        "storm-gradient": "linear-gradient(135deg, #0a2036 0%, #050d10 100%)",
        "lightning-glow": "radial-gradient(circle, rgba(125,211,252,0.1) 0%, transparent 70%)",
        "field-gradient": "linear-gradient(135deg, #fefce8 0%, #f0fdf4 100%)",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(125, 211, 252, 0.3)",
        "glow-md": "0 0 20px rgba(125, 211, 252, 0.4)",
        "glow-lg": "0 0 30px rgba(125, 211, 252, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
