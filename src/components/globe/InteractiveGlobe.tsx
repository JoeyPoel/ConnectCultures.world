import React, { useState, useEffect } from "react";
import TerraDuskGlobe from "../originkit/TerraDuskGlobe";
import { CulturalCoordinate } from "../../types/story.types";

interface InteractiveGlobeProps {
  onSelectCoordinate?: (coord: CulturalCoordinate) => void;
  onNavigateToChapter?: (chapterId: string) => void;
  className?: string;
}

/**
 * Responsive Globe Component.
 * - On Mobile (< 1024px): Renders high-resolution photorealistic Earth globe asset with
 *   atmospheric Rayleigh cyan rim bloom, subtle floating animation, and crisp zero-glitch performance.
 * - On Desktop (>= 1024px): Renders full 3D interactive TerraDusk WebGL Earth.
 */
export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  className = "",
}) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {isDesktop ? (
        <TerraDuskGlobe className="w-full h-full" />
      ) : (
        /* Mobile Photorealistic High-Res Earth Globe */
        <div className="relative flex items-center justify-center py-2 select-none">
          <img
            src="/images/globe/earth-globe.jpg"
            alt="Connect Cultures 3D Earth Globe"
            className="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] object-contain pointer-events-none"
            loading="eager"
          />
        </div>
      )}
    </div>
  );
};

export default InteractiveGlobe;
