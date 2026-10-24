import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OrbGyro from "../originkit/OrbGyro";

interface SiteLoaderProps {
  onLoaded?: () => void;
  minDurationMs?: number;
}

/**
 * Opening cinematic site loader featuring the Originkit Particle Gimbal (OrbGyro).
 * Displayed at the beginning of the experience while Earth textures, 3D assets,
 * and page coordinates are calibrated.
 */
export const SiteLoader: React.FC<SiteLoaderProps> = ({
  onLoaded,
  minDurationMs = 2000,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, minDurationMs);

    return () => clearTimeout(timer);
  }, [minDurationMs]);

  return (
    <AnimatePresence onExitComplete={onLoaded}>
      {isVisible && (
        <motion.div
          key="site-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-space-void text-monochrome-vellum select-none cursor-pointer"
          onClick={() => setIsVisible(false)}
          role="status"
          aria-live="polite"
          aria-label="Loading Connect Cultures"
        >
          {/* Ambient Cosmic Background Scattering Glow */}
          <div className="absolute w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] rounded-full blur-[120px] bg-earth-atmosphere/20 animate-horizon-breathe pointer-events-none" />

          {/* Particle Gimbal (OrbGyro) Core Loader */}
          <div className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] flex items-center justify-center">
            <OrbGyro
              width={300}
              height={300}
              dotColor="rgb(244, 241, 234)"
              accentColor="rgb(0, 205, 255)"
              density={240}
              dotSize={120}
              speed={55}
            />
          </div>

          {/* Brand Heading */}
          <div className="relative z-10 flex flex-col items-center text-center mt-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-stars-starlight">
              Connect Cultures
            </h2>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteLoader;
