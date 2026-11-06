import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: "var(--surface-paper)",
          100: "var(--surface-wall)"
        },
        graphite: {
          50: "#f6f7f8",
          100: "#e7e9ed",
          200: "#d0d5dc",
          300: "#b0b8c2",
          400: "#8993a0",
          500: "#68717d",
          600: "#4d5764",
          700: "#323a45",
          800: "#222934",
          900: "#151a22"
        },
        industrial: {
          // CSE blue, sampled from the supplied brand reference.
          50: "#f0f4ff",
          100: "#e1e9ff",
          200: "#c5d4fa",
          300: "#9fb7f2",
          400: "#6d8ce8",
          500: "#365fd7",
          600: "#264fc7",
          700: "#2043a9",
          800: "#1c3787",
          900: "#16275d"
        },
        signal: {
          500: "#bf2f2f",
          600: "#a82727"
        },
        cse: {
          500: "#da3e3e"
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "Helvetica", "sans-serif"]
      },
      borderRadius: {
        brand: "var(--radius-brand)"
      },
      boxShadow: {
        panel: "0 4px 16px rgba(21, 26, 34, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
