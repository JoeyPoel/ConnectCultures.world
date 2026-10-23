import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          void: "#030712",
          abyss: "#060c1a",
          surface: "#0b1528",
          elevated: "#111f38",
        },
        earth: {
          ocean: "#0066cc",
          atmosphere: "#4fa8ff",
          cyan: "#38bdf8",
          glow: "#60a5fa",
          sun: "#f59e0b",
          cloud: "#e2e8f0",
        },
        stars: {
          pureWhite: "#ffffff",
          starlight: "#f8fafc",
          nebula: "#94a3b8",
          hairline: "rgba(255, 255, 255, 0.09)",
        },
        // Backwards-compatible aliases mapping to space & earth palette
        dusk: {
          void: "#030712",
          abyss: "#060c1a",
          surface: "#0b1528",
          elevated: "#111f38",
        },
        terracotta: {
          base: "#0066cc",
          glow: "#38bdf8",
          deep: "#034080",
        },
        gold: {
          sand: "#38bdf8",
          shimmer: "#f8fafc",
          muted: "#94a3b8",
        },
        azure: {
          bosphorus: "#060c1a",
          dome: "#4fa8ff",
          mist: "#93c5fd",
        },
        amber: {
          flame: "#38bdf8",
          subtle: "rgba(56, 189, 248, 0.12)",
        },
        monochrome: {
          pureWhite: "#ffffff",
          vellum: "#f8fafc",
          sandstone: "#e2e8f0",
          editorialCanvas: "#f4f4f0",
          ink: "#0c0d0e",
          inkMuted: "#4a5568",
          slateMuted: "#94a3b8",
          hairline: "rgba(255, 255, 255, 0.09)",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cinzel"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', '"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        "glow-earth": "0 0 45px -5px rgba(79, 168, 255, 0.45)",
        "glow-cyan": "0 0 35px -5px rgba(56, 189, 248, 0.4)",
        "glow-sun": "0 0 35px -5px rgba(245, 158, 11, 0.35)",
        "elevation-card": "0 25px 50px -12px rgba(3, 7, 18, 0.85)",
      },
      animation: {
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "horizon-breathe": "horizonBreathe 8s ease-in-out infinite",
        "float-gentle": "floatGentle 6s ease-in-out infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.04)" },
        },
        horizonBreathe: {
          "0%, 100%": { transform: "scale(1)", filter: "blur(60px) brightness(1)" },
          "50%": { transform: "scale(1.1)", filter: "blur(75px) brightness(1.25)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
