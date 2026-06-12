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
        graphite: {
          50: "#f6f7f8",
          100: "#e7e9ed",
          200: "#d0d5dc",
          500: "#68717d",
          700: "#323a45",
          800: "#222934",
          900: "#151a22"
        },
        industrial: {
          500: "#285d8f",
          600: "#1f4f7c",
          700: "#183d61",
          800: "#122f4b"
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
      boxShadow: {
        panel: "0 18px 45px rgba(21, 26, 34, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
