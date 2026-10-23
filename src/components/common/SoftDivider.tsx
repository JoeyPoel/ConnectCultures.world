import React from "react";

interface SoftDividerProps {
  className?: string;
}

/**
 * Fading hairline gradient divider.
 * Provides soft, organic transitions between narrative chapters.
 */
export const SoftDivider: React.FC<SoftDividerProps> = ({ className = "" }) => {
  return (
    <div
      aria-hidden="true"
      className={`w-full py-12 flex items-center justify-center ${className}`}
    >
      <div className="w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-monochrome-sandstone to-transparent" />
    </div>
  );
};

export default SoftDivider;
