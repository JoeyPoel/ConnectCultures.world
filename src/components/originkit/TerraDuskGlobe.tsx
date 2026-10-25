import React, { useState, useEffect } from "react";
import OriginkitTerraDusk from "./TerraDuskCore";

interface TerraDuskGlobeProps {
  className?: string;
}

/**
 * Photorealistic OriginKit Terra Dusk Earth Globe component.
 * Pure cinematic 3D globe presentation with zero toolbar or settings clutter:
 * - Dynamic Rayleigh atmospheric scattering rim glow
 * - Pure, unencumbered 3D Earth
 * - Never unmounts to save memory on laptop/desktop
 * - Only displays fallback image if WebGL fails to load/initialize
 */
export const TerraDuskGlobe: React.FC<TerraDuskGlobeProps> = ({
  className = "",
}) => {
  const [loadFailed, setLoadFailed] = useState<boolean>(false);

  // Check WebGL availability on mount
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const hasGl = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      if (!hasGl) {
        setLoadFailed(true);
      }
    } catch {
      setLoadFailed(true);
    }
  }, []);

  return (
    <div
      className={`relative w-full h-[450px] sm:h-[540px] lg:h-[620px] flex items-center justify-center select-none ${className}`}
    >
      {/* Dynamic Earth Atmospheric Scattering Rim Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[450px] sm:w-[560px] h-[450px] sm:h-[560px] rounded-full blur-[110px] bg-earth-atmosphere/25 animate-horizon-breathe will-change-transform" />
      </div>

      {/* OriginKit WebGL Photorealistic Earth Canvas (Always mounted and active; never unmounts for memory saving) */}
      {!loadFailed ? (
        <div className="w-full h-full flex items-center justify-center">
          <OriginkitTerraDusk
            size={520}
            background="transparent"
            stars={6}
            drag={true}
            hover={6.5}
            sun="cursor"
            daylight={88}
            speed={6.0}
            look={{
              clouds: 5.5,
              lights: 6.0,
              atmosphere: "rgba(79, 168, 255, 0.98)",
            }}
            style={{
              width: "100%",
              height: "100%",
              background: "transparent",
            }}
            onError={() => setLoadFailed(true)}
          />
        </div>
      ) : (
        /* High-Resolution Photorealistic Earth Fallback (Only displayed if WebGL is unable to load) */
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-5">
          <img
            src="/images/globe/earth-globe.jpg"
            alt="Earth Globe Fallback"
            className="w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] object-cover rounded-full shadow-[0_0_80px_rgba(79,168,255,0.35)] opacity-95"
          />
        </div>
      )}
    </div>
  );
};

export default TerraDuskGlobe;
