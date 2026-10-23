import React, { useState, useEffect, useRef } from "react";
import OriginkitTerraDusk from "./TerraDuskCore";

interface TerraDuskGlobeProps {
  className?: string;
}

/**
 * Photorealistic OriginKit Terra Dusk Earth Globe component.
 * Pure cinematic 3D globe presentation with zero toolbar or settings clutter:
 * - Dynamic Rayleigh atmospheric scattering rim glow
 * - Automatic pause when scrolled out of viewport
 * - Pure, unencumbered 3D Earth
 */
export const TerraDuskGlobe: React.FC<TerraDuskGlobeProps> = ({
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(true);

  // Performance Optimization: Pause rendering when out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[450px] sm:h-[540px] lg:h-[620px] flex items-center justify-center select-none ${className}`}
    >
      {/* Dynamic Earth Atmospheric Scattering Rim Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="w-[450px] sm:w-[560px] h-[450px] sm:h-[560px] rounded-full blur-[110px] bg-earth-atmosphere/25 animate-horizon-breathe will-change-transform" />
      </div>

      {/* OriginKit WebGL Photorealistic Earth Canvas (Only active when in viewport) */}
      <div className="w-full h-full flex items-center justify-center">
        {isInView && (
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
          />
        )}
      </div>
    </div>
  );
};

export default TerraDuskGlobe;
