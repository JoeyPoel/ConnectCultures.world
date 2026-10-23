import React from "react";

interface TerraDuskLayerProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
}

/**
 * Cosmic Space & Earth Atmospheric Horizon layer.
 * Creates deep space with glowing stars, nebula dust, and radiant Earth atmospheric lighting.
 */
export const TerraDusk: React.FC<TerraDuskLayerProps> = ({
  className = "",
  intensity = "high",
}) => {
  const intensityMap = {
    low: "opacity-40",
    medium: "opacity-60",
    high: "opacity-80",
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 overflow-hidden -z-10 ${className}`}
    >
      {/* Deep Cosmic Void */}
      <div className="absolute inset-0 bg-space-void" />

      {/* Earth Rayleigh Atmospheric Scattering Horizon Glow - Top Bloom */}
      <div
        className={`absolute -top-48 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] rounded-full blur-[140px] bg-gradient-to-b from-earth-ocean/30 via-earth-atmosphere/25 to-transparent ${intensityMap[intensity]} animate-horizon-breathe`}
      />

      {/* Radiant Cyan Atmospheric Aurora - Center Right */}
      <div
        className="absolute top-1/4 -right-48 w-[850px] h-[850px] rounded-full blur-[160px] bg-gradient-to-bl from-earth-cyan/20 via-earth-atmosphere/15 to-transparent opacity-65"
      />

      {/* Deep Space Nebula Haze - Bottom Left */}
      <div
        className="absolute -bottom-48 -left-48 w-[800px] h-[800px] rounded-full blur-[150px] bg-gradient-to-tr from-earth-ocean/25 via-earth-glow/15 to-transparent opacity-55"
      />

      {/* Golden Solar Rim Glow - Top Left Corner */}
      <div
        className="absolute top-10 -left-36 w-[550px] h-[550px] rounded-full blur-[120px] bg-gradient-to-br from-earth-sun/15 to-transparent opacity-40"
      />

      {/* Subtle Star Parallax Vignette that preserves the top atmospheric blue hue */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_50%,rgba(3,7,18,0.5)_100%)]" />
    </div>
  );
};

export default TerraDusk;
