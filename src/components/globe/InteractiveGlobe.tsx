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
 * - On Laptop / Desktop: Renders full 3D interactive TerraDusk WebGL Earth.
 * - Never turns into an image to save memory; only falls back if unable to load WebGL.
 * - On small mobile touch devices: Renders crisp photorealistic asset.
 */
export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  className = "",
}) => {
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.innerWidth >= 768 || window.matchMedia("(pointer: fine)").matches;
  });

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktopOrLaptop(
        window.innerWidth >= 768 || window.matchMedia("(pointer: fine)").matches
      );
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {isDesktopOrLaptop ? (
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
