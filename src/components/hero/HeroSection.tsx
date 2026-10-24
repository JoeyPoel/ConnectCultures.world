import React from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import InteractiveGlobe from "../globe/InteractiveGlobe";
import GlowPill from "../common/GlowPill";
import Starfield from "../common/Starfield";
import TerraDusk from "../originkit/TerraDusk";
import GrainOverlay from "../common/GrainOverlay";
import { HERO_STRINGS } from "../../constants/string";

interface HeroSectionProps {
  onExploreChapter: (chapterId: string) => void;
}

/**
 * Chapter 0: Hero Section: "Connect Cultures"
 * Integrated 3D Earth floating seamlessly against a deep cosmic starfield.
 * Self-contained deep space experience with zero dark background leakage into subsequent sections.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreChapter,
}) => {
  return (
    <section
      id="vision"
      className="relative min-h-[100dvh] w-full pt-20 pb-16 px-6 lg:px-12 flex flex-col justify-center items-center overflow-hidden bg-space-void text-monochrome-vellum"
    >
      {/* Living Atmospheric Canvas Layers Scoped Exclusively to Hero */}
      <TerraDusk intensity="high" />
      <Starfield />
      <GrainOverlay />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10 my-auto">
        {/* Left Column: Monolithic Editorial Headline & Mission Directives */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Monolithic Editorial Serif Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-stars-starlight leading-[1.04] mb-3 sm:mb-6">
            {HERO_STRINGS.brandFirst}
            <br />
            <span className="text-earth-cyan italic">{HERO_STRINGS.brandSecond}</span>
          </h1>

          {/* Mobile Globe Presentation (Prominently visible on mobile/tablet) */}
          <div className="lg:hidden w-full flex items-center justify-center my-3">
            <InteractiveGlobe className="w-full" />
          </div>

          {/* Minimalist Inspiring Cultural Manifesto */}
          <p className="font-sans text-base sm:text-lg lg:text-xl text-stars-starlight/90 max-w-lg font-light leading-relaxed mb-6 sm:mb-8">
            {HERO_STRINGS.tagline}
            <span className="block mt-2 text-stars-nebula text-sm sm:text-base">
              {HERO_STRINGS.subTagline}
            </span>
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-4">
            <GlowPill
              variant="terracotta"
              size="lg"
              onClick={() => onExploreChapter("community-hub")}
              icon={<Sparkles className="w-4 h-4 text-earth-cyan" />}
            >
              {HERO_STRINGS.ctaStepIn}
            </GlowPill>

            <GlowPill
              variant="ghost"
              size="lg"
              onClick={() => onExploreChapter("philosophy")}
              icon={<ArrowDown className="w-4 h-4 text-earth-cyan" />}
            >
              {HERO_STRINGS.ctaPhilosophy}
            </GlowPill>
          </div>
        </div>

        {/* Right Column: Seamless 3D Earth Globe on Desktop */}
        <div className="hidden lg:flex lg:col-span-7 w-full items-center justify-center relative min-h-[500px] lg:min-h-[580px]">
          <InteractiveGlobe className="w-full h-full" />
        </div>
      </div>

      {/* Ambient Scroll Down Indicator */}
      <button
        type="button"
        onClick={() => onExploreChapter("philosophy")}
        className="mt-6 lg:mt-0 lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-space-surface/80 border border-stars-hairline/60 text-stars-starlight/80 hover:text-earth-cyan hover:border-earth-cyan/60 backdrop-blur-md transition-all text-xs font-mono shadow-sm group pointer-events-auto z-20"
        aria-label={HERO_STRINGS.scrollAriaLabel}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-earth-cyan animate-pulse" />
        <span className="tracking-widest uppercase text-[10px]">{HERO_STRINGS.scrollIndicator}</span>
        <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-earth-cyan" />
      </button>
    </section>
  );
};

export default HeroSection;
