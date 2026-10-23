import React from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import InteractiveGlobe from "../globe/InteractiveGlobe";
import GlowPill from "../common/GlowPill";
import Starfield from "../common/Starfield";

interface HeroSectionProps {
  onExploreChapter: (chapterId: string) => void;
}

/**
 * Chapter 0: Hero Section: "Connect Cultures"
 * Integrated 3D Earth floating seamlessly against a deep cosmic starfield.
 * Fills 100vh viewport completely with zero overflow.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreChapter,
}) => {
  return (
    <section
      id="vision"
      className="relative h-screen min-h-screen w-full pt-16 pb-8 px-6 lg:px-12 flex items-center justify-center overflow-hidden"
    >
      {/* Living Cosmic Starfield Background across the entire first section */}
      <Starfield />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 my-auto">
        {/* Left Column: Monolithic Editorial Headline & Mission Directives */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">

          {/* Monolithic Editorial Serif Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-stars-starlight leading-[1.04] mb-6">
            CONNECT
            <br />
            <span className="text-earth-cyan italic">CULTURES.</span>
          </h1>

          {/* Minimalist Inspiring Cultural Manifesto */}
          <p className="font-sans text-lg sm:text-xl text-stars-starlight/90 max-w-lg font-light leading-relaxed mb-8">
            A stranger across any border is simply a friend you have not sat with yet.
            <span className="block mt-2 text-stars-nebula text-base">
              Opening living rooms and sharing tables across borders.
            </span>
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4">
            <GlowPill
              variant="terracotta"
              size="lg"
              onClick={() => onExploreChapter("community-hub")}
              icon={<Sparkles className="w-4 h-4 text-earth-cyan" />}
            >
              Step In
            </GlowPill>

            <GlowPill
              variant="ghost"
              size="lg"
              onClick={() => onExploreChapter("philosophy")}
              icon={<ArrowDown className="w-4 h-4 text-earth-cyan" />}
            >
              The Philosophy
            </GlowPill>
          </div>
        </div>

        {/* Right Column: Seamless 3D Earth Globe floating organically in space */}
        <div className="lg:col-span-7 w-full flex items-center justify-center relative min-h-[440px] sm:min-h-[500px] lg:min-h-[580px]">
          <InteractiveGlobe className="w-full h-full" />
        </div>
      </div>

      {/* Ambient Scroll Down Indicator */}
      <button
        type="button"
        onClick={() => onExploreChapter("philosophy")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-space-surface/80 border border-stars-hairline/60 text-stars-starlight/80 hover:text-earth-cyan hover:border-earth-cyan/60 backdrop-blur-md transition-all text-xs font-mono shadow-sm group pointer-events-auto z-20"
        aria-label="Scroll to enter the philosophy section"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-earth-cyan animate-pulse" />
        <span className="tracking-widest uppercase text-[10px]">Scroll To Enter</span>
        <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-earth-cyan" />
      </button>
    </section>
  );
};

export default HeroSection;
