import React from "react";
import { Compass, Camera } from "lucide-react";
import { IMAGE_FRAME_STRINGS } from "../../constants/string";

interface ImageFrameProps {
  label: string;
  coordinates?: string;
  caption?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
  className?: string;
}

/**
 * Editorial Photo Archive Frame component.
 * Displays an archival container with deep space glass styling, metadata badges, and coordinate telemetry.
 */
export const ImageFrame: React.FC<ImageFrameProps> = ({
  label,
  coordinates,
  caption,
  aspectRatio = "video",
  className = "",
}) => {
  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-[16/10]",
    portrait: "aspect-[4/5]",
    wide: "aspect-[21/9]",
  };

  return (
    <figure
      className={`group relative overflow-hidden rounded-3xl bg-monochrome-editorialCanvas border border-monochrome-sandstone hover:border-monochrome-ink/30 transition-all duration-500 shadow-sm ${className}`}
    >
      {/* Archival Canvas Container */}
      <div
        className={`relative w-full ${aspectClasses[aspectRatio]} flex flex-col items-center justify-center p-8 bg-gradient-to-b from-monochrome-pureWhite to-monochrome-editorialCanvas`}
      >
        {/* Framing Corner Markers */}
        <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-monochrome-ink/30" />
        <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-monochrome-ink/30" />
        <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-monochrome-ink/30" />
        <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-monochrome-ink/30" />

        {/* Center Emblem */}
        <div className="flex flex-col items-center gap-3 text-center z-10">
          <div className="p-3.5 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone text-monochrome-ink shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Camera className="w-6 h-6 stroke-[1.5]" />
          </div>

          <p className="font-mono text-xs uppercase tracking-widest text-monochrome-ink max-w-sm px-4">
            {label}
          </p>

          {coordinates && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone font-mono text-[11px] text-monochrome-inkMuted shadow-sm">
              <Compass className="w-3 h-3 text-monochrome-ink" />
              <span>{coordinates}</span>
            </div>
          )}
        </div>
      </div>

      {caption && (
        <figcaption className="px-5 py-3.5 bg-monochrome-pureWhite border-t border-monochrome-sandstone font-sans text-xs text-monochrome-inkMuted flex items-center justify-between">
          <span>{caption}</span>
          <span className="font-mono text-[10px] text-monochrome-ink tracking-wider uppercase font-semibold">{IMAGE_FRAME_STRINGS.verifiedBadge}</span>
        </figcaption>
      )}
    </figure>
  );
};

export default ImageFrame;
