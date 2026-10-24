import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Compass,
  Calendar,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Award,
  BookOpen,
} from "lucide-react";
import { FOUNDING_STORY_STRINGS } from "../../constants/string";

const MILESTONES = FOUNDING_STORY_STRINGS.milestones;

/**
 * Props for FoundingStorySection.
 */
interface FoundingStorySectionProps {
  /** Optional callback to navigate smoothly to the Connect Hub chapter. */
  onExploreCommunity?: () => void;
}

/**
 * Section 02: The Spark: Framer-grade Flowing Timeline & Archival Expedition.
 * Features:
 * - Flowing interactive progress rail with connected timeline nodes
 * - Archival photographic memory card with dynamic 3D perspective mouse tilt
 * - Synchronized field dispatches and Joey's personal travel narrative
 * - Smooth crossfade transitions with Framer Motion spring physics
 */
export const FoundingStorySection: React.FC<FoundingStorySectionProps> = ({ onExploreCommunity }) => {
  const [activeIdx, setActiveIdx] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);

  const activeMilestone = MILESTONES[activeIdx];

  const handleNext = () => {
    if (activeIdx < MILESTONES.length - 1) {
      setDirection(1);
      setActiveIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      setDirection(-1);
      setActiveIdx((prev) => prev - 1);
    }
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };

  // 3D Tilt for photographic memory card
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Keyboard navigation for timeline
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const el = document.getElementById("founding-story");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx]);

  return (
    <section id="founding-story" className="scroll-mt-0 py-20 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Editorial Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone font-mono text-xs text-monochrome-ink uppercase tracking-wider mb-4 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-monochrome-ink" />
          <span>{FOUNDING_STORY_STRINGS.kickerBadge}</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-monochrome-ink mb-4 leading-[1.08]">
          {FOUNDING_STORY_STRINGS.headline}
        </h2>

        <p className="font-sans text-base sm:text-xl text-monochrome-inkMuted font-light leading-relaxed max-w-2xl">
          {FOUNDING_STORY_STRINGS.leadParagraph}
        </p>
      </div>

      {/* =========================================================================
          1. FRAMER FLOWING TIMELINE SCRUBBER RAIL
         ========================================================================= */}
      <div className="relative mb-14 max-w-4xl mx-auto">
        {/* Milestone Nodes & Connecting Segments */}
        <div className="grid grid-cols-5 relative py-2">
          {MILESTONES.map((m, idx) => {
            const isSelected = activeIdx === idx;
            return (
              <div key={m.id} className="relative flex flex-col items-center">
                {/* Connecting Rail Segment to next ball (stops cleanly at next ball, never passes it) */}
                {idx < MILESTONES.length - 1 && (
                  <div className="absolute top-[20px] -translate-y-1/2 left-1/2 w-full h-[2px] bg-monochrome-sandstone pointer-events-none z-0">
                    <motion.div
                      className="h-full bg-monochrome-ink origin-left"
                      initial={false}
                      animate={{ scaleX: idx < activeIdx ? 1 : 0 }}
                      transition={{ type: "spring", stiffness: 240, damping: 26 }}
                    />
                  </div>
                )}

                {/* Milestone Node Button */}
                <button
                  type="button"
                  onClick={() => handleSelect(idx)}
                  className="group relative z-10 flex flex-col items-center focus:outline-none cursor-pointer w-full px-1"
                  aria-label={`Jump to ${m.location}`}
                >
                  {/* Milestone Node Circle */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-300 relative z-10 ${
                      isSelected
                        ? "bg-monochrome-ink text-monochrome-pureWhite ring-4 ring-monochrome-sandstone scale-110 shadow-md font-bold"
                        : "bg-monochrome-pureWhite border-2 border-monochrome-sandstone text-monochrome-inkMuted group-hover:border-monochrome-ink group-hover:text-monochrome-ink"
                    }`}
                  >
                    {m.num}
                  </div>

                  {/* Milestone Year & City Subtitle */}
                  <div className="mt-2.5 text-center transition-colors">
                    <span
                      className={`block font-mono text-[11px] uppercase tracking-wider ${
                        isSelected
                          ? "text-monochrome-ink font-bold"
                          : "text-monochrome-inkMuted group-hover:text-monochrome-ink"
                      }`}
                    >
                      {m.location.split(",")[0]}
                    </span>
                    <span className="block font-mono text-[9px] text-monochrome-inkMuted/70">
                      {m.year}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          2. DUAL-PANEL ARCHIVAL EXPEDITION DISPATCH & 3D MEMORY CARD
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center bg-monochrome-pureWhite border-2 border-monochrome-sandstone rounded-[36px] p-8 sm:p-14 shadow-xl text-monochrome-ink overflow-hidden">
        {/* Left Column: Archival Field Dispatch & Relic Widgets */}
        <div className="lg:col-span-6 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeMilestone.id}
              custom={direction}
              variants={{
                enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 32 : -32 }),
                center: { opacity: 1, x: 0 },
                exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -32 : 32 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
            {/* Header Telemetry Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-monochrome-editorialCanvas border border-monochrome-sandstone font-mono text-xs text-monochrome-ink font-semibold shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-monochrome-ink" />
                <span>{activeMilestone.location}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-monochrome-editorialCanvas border border-monochrome-sandstone font-mono text-xs text-monochrome-inkMuted">
                <Compass className="w-3.5 h-3.5" />
                <span>{activeMilestone.coordinates}</span>
              </div>
            </div>

            {/* Chapter Headline */}
            <div>
              <span className="font-mono text-xs tracking-widest uppercase text-monochrome-inkMuted block mb-1">
                {FOUNDING_STORY_STRINGS.milestonePrefix} {activeMilestone.num} • {activeMilestone.tagline}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-monochrome-ink tracking-tight leading-tight">
                {activeMilestone.title}
              </h3>
            </div>

            {/* Personal Pull-Quote */}
            <p className="font-serif italic text-lg sm:text-xl text-monochrome-ink border-l-2 border-monochrome-ink pl-4 py-1">
              "{activeMilestone.quote}"
            </p>

            {/* Joey's Narrative Story */}
            <p className="font-sans text-base sm:text-lg text-monochrome-inkMuted leading-relaxed font-light">
              {activeMilestone.story}
            </p>

            {/* Cultural Lesson Pill */}
            <div className="p-4 rounded-2xl bg-monochrome-editorialCanvas border border-monochrome-sandstone font-mono text-xs text-monochrome-ink flex items-start gap-3 shadow-inner">
              <Award className="w-4 h-4 text-monochrome-ink shrink-0 mt-0.5" />
              <div>
                <span className="font-bold mr-2 uppercase tracking-wide">{FOUNDING_STORY_STRINGS.coreLessonLabel}</span>
                <span className="text-monochrome-inkMuted">{activeMilestone.lesson}</span>
              </div>
            </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Physical Archival Memory Card with Horizontal Slide */}
        <div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="lg:col-span-6 flex flex-col items-center select-none w-full"
          style={{ perspective: 1200 }}
        >
          {/* Card Horizontal Slide Viewport */}
          <div className="relative w-full max-w-[460px] min-h-[440px] sm:min-h-[480px] overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={activeMilestone.id}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? "110%" : "-110%",
                    opacity: 0,
                    scale: 0.94,
                    rotateZ: dir > 0 ? 3 : -3,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    rotateZ: 0,
                    transition: {
                      x: { type: "spring", stiffness: 280, damping: 28 },
                      opacity: { duration: 0.28 },
                      scale: { duration: 0.3 },
                      rotateZ: { duration: 0.3 },
                    },
                  },
                  exit: (dir: number) => ({
                    x: dir > 0 ? "-110%" : "110%",
                    opacity: 0,
                    scale: 0.94,
                    rotateZ: dir > 0 ? -3 : 3,
                    transition: {
                      x: { type: "spring", stiffness: 280, damping: 28 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.24 },
                      rotateZ: { duration: 0.24 },
                    },
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="w-full rounded-[32px] overflow-hidden bg-monochrome-pureWhite border-2 border-monochrome-sandstone shadow-2xl p-4 will-change-transform group cursor-pointer"
              >
                {/* Photo Area with Film Grain Aspect */}
                <div className="relative aspect-[4/3] w-full rounded-[24px] overflow-hidden bg-monochrome-editorialCanvas">
                  <img
                    src={activeMilestone.imageUrl}
                    alt={activeMilestone.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Subtle Archival Film Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-monochrome-ink/80 via-monochrome-ink/20 to-transparent pointer-events-none" />

                  {/* Location Badge on Image */}
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none text-monochrome-pureWhite">
                    <span className="font-mono text-[10px] tracking-widest uppercase bg-monochrome-pureWhite/20 backdrop-blur-md px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {activeMilestone.year}
                    </span>
                    <p className="font-serif text-lg sm:text-xl font-bold leading-snug">
                      {activeMilestone.photoCaption}
                    </p>
                  </div>
                </div>

                {/* Physical Photo Card Footer */}
                <div className="pt-4 px-2 flex items-center justify-between font-mono text-xs text-monochrome-inkMuted">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-monochrome-ink" />
                    <span>{FOUNDING_STORY_STRINGS.card.archiveLabel} {activeMilestone.year}</span>
                  </div>
                  <span>{activeMilestone.num} / 05</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Timeline Stepper Controls */}
          <div className="flex items-center justify-between w-full max-w-[460px] mt-6">
            <button
              type="button"
              disabled={activeIdx === 0}
              onClick={handlePrev}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone text-xs font-mono font-semibold text-monochrome-ink disabled:opacity-30 hover:border-monochrome-ink transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{FOUNDING_STORY_STRINGS.card.prevButton}</span>
            </button>

            <span className="font-mono text-xs font-semibold text-monochrome-ink">
              {FOUNDING_STORY_STRINGS.card.stopCounter(activeIdx + 1, MILESTONES.length)}
            </span>

            <button
              type="button"
              disabled={activeIdx === MILESTONES.length - 1}
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-monochrome-ink text-monochrome-pureWhite text-xs font-mono font-semibold disabled:opacity-30 hover:bg-monochrome-ink/90 transition-all shadow-sm active:scale-95"
            >
              <span>{FOUNDING_STORY_STRINGS.card.nextButton}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Onward Progression to Connect Hub */}
          {onExploreCommunity && (
            <div className="mt-10 flex flex-col items-center text-center">
              <button
                type="button"
                onClick={onExploreCommunity}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone hover:border-monochrome-ink text-xs font-mono font-semibold text-monochrome-ink uppercase tracking-wider transition-all shadow-sm active:scale-95 group"
              >
                <span>{FOUNDING_STORY_STRINGS.card.continueToHub}</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FoundingStorySection;
