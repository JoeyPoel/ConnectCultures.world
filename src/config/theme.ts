/**
 * Centralized Space & Earth Theme Specification
 * Grounded in deep cosmic space, starlight, and the luminous blue Earth atmosphere.
 */
export const THEME = {
  colors: {
    space: {
      void: "#030712",        // Deepest cosmic space
      abyss: "#060c1a",       // Deep space navy
      surface: "#0b1528",     // Translucent space glass container
      elevated: "#111f38",    // Elevated card and hover states
    },
    earth: {
      ocean: "#0066cc",        // Deep blue Earth oceans
      atmosphere: "#4fa8ff",   // Luminous Earth rim glow & atmospheric Rayleigh scattering
      cyan: "#38bdf8",         // Bright cyan atmospheric edge
      glow: "#60a5fa",         // Soft blue aura
      sun: "#f59e0b",          // Golden sunrise on the planetary horizon
      cloud: "#e2e8f0",        // Soft swirling cloud white
    },
    stars: {
      pureWhite: "#ffffff",
      starlight: "#f8fafc",    // Bright crisp starlight typography
      nebula: "#94a3b8",       // Distant nebula metadata
      hairline: "rgba(255, 255, 255, 0.09)", // Sub-pixel glass card border
    },
  },
  typography: {
    editorialSerif: '"Playfair Display", "Cinzel", Georgia, serif',
    humanistSans: '"Plus Jakarta Sans", "Inter", sans-serif',
    coordinatesMono: '"JetBrains Mono", monospace',
  },
} as const;

export type ThemeColors = typeof THEME.colors;
