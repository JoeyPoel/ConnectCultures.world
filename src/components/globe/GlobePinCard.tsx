import React from "react";
import { CulturalCoordinate } from "../../types/story.types";
import { Compass, Sparkles, ArrowRight } from "lucide-react";
import { GLOBE_PIN_STRINGS } from "../../constants/string";

interface GlobePinCardProps {
  coordinate: CulturalCoordinate;
  onNavigateToChapter?: (chapterId: string) => void;
  className?: string;
}

/**
 * Teaser card for interactive globe markers.
 * Displays waypoint details, coordinates, and link to narrative chapter.
 */
export const GlobePinCard: React.FC<GlobePinCardProps> = ({
  coordinate,
  onNavigateToChapter,
  className = "",
}) => {
  return (
    <div
      className={`p-5 rounded-2xl bg-dusk-abyss/85 border border-terracotta-base/30 backdrop-blur-xl shadow-elevation-card max-w-sm transition-all duration-300 ${className}`}
    >
      {/* Header Badge */}
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-terracotta-base/20 border border-terracotta-base/40 font-mono text-[11px] font-medium text-terracotta-glow uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          {coordinate.badge}
        </span>
        <div className="flex items-center gap-1 font-mono text-[11px] text-monochrome-slateMuted">
          <Compass className="w-3 h-3 text-gold-sand" />
          <span>
            {coordinate.lat > 0 ? `${coordinate.lat.toFixed(2)}°N` : `${Math.abs(coordinate.lat).toFixed(2)}°S`},{" "}
            {coordinate.lng > 0 ? `${coordinate.lng.toFixed(2)}°E` : `${Math.abs(coordinate.lng).toFixed(2)}°W`}
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 className="font-serif text-lg font-semibold text-monochrome-vellum mb-1">
        {coordinate.name}
      </h4>
      <p className="font-sans text-xs text-gold-sand/90 font-medium mb-2">
        {coordinate.country}
      </p>

      {/* Snippet */}
      <p className="font-sans text-xs text-monochrome-vellum/75 leading-relaxed mb-4">
        {coordinate.previewSnippet}
      </p>

      {/* Action */}
      {onNavigateToChapter && (
        <button
          type="button"
          onClick={() => onNavigateToChapter(coordinate.chapterId)}
          className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-terracotta-glow hover:text-amber-flame transition-colors group"
        >
          <span>{GLOBE_PIN_STRINGS.exploreChapter}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      )}
    </div>
  );
};

export default GlobePinCard;
