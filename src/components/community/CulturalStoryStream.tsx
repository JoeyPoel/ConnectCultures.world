import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, MapPin, Sparkles, MoveHorizontal } from "lucide-react";

interface CulturalStory {
  id: string;
  author: string;
  originCountry: string;
  experiencedCulture: string;
  location: string;
  oneLiner: string;
  reflection: string;
  category: string;
  imageUrl: string;
}

const COMMUNITY_STORIES: CulturalStory[] = [
  {
    id: "story-1",
    author: "Elena Rostova",
    originCountry: "Poland",
    experiencedCulture: "Andalusia",
    location: "Ronda, Spain",
    oneLiner: "I spoke ten words of Spanish. They fed me fresh figs and laughed with their hands.",
    reflection: "When you stop trying to be perfect, strangers become grandmothers. In the hills of Ronda, silence wasn't awkward; it was peaceful.",
    category: "Homestay",
    imageUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "story-2",
    author: "Tariq Mansour",
    originCountry: "Egypt",
    experiencedCulture: "North Holland",
    location: "Alkmaar, Netherlands",
    oneLiner: "Cairo noise dissolved into quiet apple pie. Stillness became home.",
    reflection: "Every home in the world has a warm kitchen if you dare to knock. The rain against the Dutch windows felt like music after years of sand.",
    category: "Table Fellowship",
    imageUrl: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "story-3",
    author: "Mateusz Kowalski",
    originCountry: "Poland",
    experiencedCulture: "Istanbul",
    location: "Kadikoy, Turkey",
    oneLiner: "Tea on the Bosphorus with strangers sharing roasted chestnuts.",
    reflection: "Tea in Turkey is not a beverage; it is a solemn covenant of respect. Sitting by the ferry docks, we solved the world's problems in broken English.",
    category: "Street Dialogue",
    imageUrl: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "story-4",
    author: "Sofia Hernandez",
    originCountry: "Spain",
    experiencedCulture: "Warsaw",
    location: "Warsaw, Poland",
    oneLiner: "They shared the Christmas wafer and called me their daughter.",
    reflection: "Bloodlines do not make family; open doors and shared bread do. Snow was falling outside, but inside that old apartment was pure light.",
    category: "Kinship",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "story-5",
    author: "Kenji & Amina",
    originCountry: "Japan",
    experiencedCulture: "Morocco",
    location: "Fes Medina, Morocco",
    oneLiner: "Three hours carving cedar without a shared word, only rhythmic nods.",
    reflection: "Craft is the original human language that predates borders. When hands work together on wood, words are entirely secondary.",
    category: "Artisanal Craft",
    imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "story-6",
    author: "Lukas Lindqvist",
    originCountry: "Sweden",
    experiencedCulture: "Oaxaca",
    location: "Oaxaca, Mexico",
    oneLiner: "Grinding roasted cacao with Doña Carmen before dawn over stone.",
    reflection: "Taste memory anchors you to a land deeper than any photograph ever could. The aroma of smoked chili and cinnamon will stay forever.",
    category: "Culinary Roots",
    imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
  },
];

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

interface CoverFlowCardProps {
  story: CulturalStory;
  index: number;
  activeFloat: any;
  cardWidth: number;
  cardHeight: number;
  gap: number;
  onSelect: (index: number) => void;
}

/**
 * 3D Cover Flow Card with perspective transformation and spring glide.
 */
const CoverFlowCard: React.FC<CoverFlowCardProps> = ({
  story,
  index,
  activeFloat,
  cardWidth,
  cardHeight,
  gap,
  onSelect,
}) => {
  const step = cardWidth + gap;

  // Horizontal position offset
  const x = useTransform(activeFloat, (a: number) => (index - a) * step);

  // Slight arc drop away from center
  const y = useTransform(activeFloat, (a: number) => Math.abs(index - a) * 6);

  // 3D Y-axis rotation (folded cards on sides)
  const rotateY = useTransform(activeFloat, (a: number) => {
    const d = index - a;
    return clamp(-d * 42, -75, 75);
  });

  // Scale falloff away from center
  const scale = useTransform(activeFloat, (a: number) => {
    const d = Math.abs(index - a);
    return lerp(1, 0.72, d / 3.5);
  });

  // Opacity falloff
  const opacity = useTransform(activeFloat, (a: number) => {
    const d = Math.abs(index - a);
    return lerp(1, 0.35, d / 4);
  });

  // Depth layering
  const zIndex = useTransform(activeFloat, (a: number) => Math.round(100 - Math.abs(index - a) * 10));

  // Subtle brightness falloff
  const brightness = useTransform(activeFloat, (a: number) => {
    const d = Math.abs(index - a);
    return clamp(1 - d * 0.12, 0.45, 1);
  });

  return (
    <motion.div
      onClick={() => onSelect(index)}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: cardWidth,
        height: cardHeight,
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        x,
        y,
        rotateY,
        scale,
        opacity,
        zIndex,
        filter: useTransform(brightness, (b: number) => `brightness(${b})`),
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
      className="cursor-pointer select-none rounded-3xl overflow-hidden border border-monochrome-sandstone shadow-xl bg-monochrome-ink will-change-transform group"
    >
      {/* Background Image with Ambient Zoom on Hover */}
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url(${story.imageUrl})` }}
      />

      {/* Atmospheric Contrast Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-monochrome-ink via-monochrome-ink/30 to-transparent" />

      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <span className="font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-monochrome-pureWhite/90 backdrop-blur-md text-monochrome-ink font-semibold shadow-sm">
          Archetype • {story.category}
        </span>
        <div className="flex items-center gap-1 text-monochrome-pureWhite/90 font-mono text-[10px] bg-monochrome-ink/50 backdrop-blur-md px-2.5 py-1 rounded-full">
          <MapPin className="w-3 h-3 text-monochrome-sandstone" />
          <span>{story.location}</span>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
        <p className="font-mono text-[10px] uppercase text-monochrome-sandstone/90 mb-1">
          {story.originCountry} → {story.experiencedCulture}
        </p>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-monochrome-pureWhite leading-tight mb-2">
          {story.author}
        </h3>
        <p className="font-sans text-xs sm:text-sm text-monochrome-vellum/90 italic line-clamp-3 leading-relaxed">
          "{story.oneLiner}"
        </p>
      </div>
    </motion.div>
  );
};

/**
 * Section 03: Global Voices: 3D Cover Flow Gallery of People's Stories.
 * Faithful implementation of the Framer Cover Flow interactive gallery:
 * - 3D card perspectives with rotational fold (`rotateY`) and scale falloff
 * - Fluid pointer drag with spring physics and inertia
 * - Click-to-center selection and chevron navigation controls
 * - Live synchronized story quote inspection card
 */
export const CulturalStoryStream: React.FC = () => {
  const total = COMMUNITY_STORIES.length;
  const initialIndex = 2; // Center card (Mateusz Kowalski / Istanbul)

  const cardWidth = 300;
  const cardHeight = 420;
  const gap = 60;
  const dragSensitivity = 1.1;

  const target = useMotionValue(initialIndex);
  const activeFloat = useSpring(target, { stiffness: 220, damping: 22, mass: 1 });
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartTargetRef = useRef(0);

  const selectCard = useCallback(
    (index: number) => {
      const clamped = clamp(index, 0, total - 1);
      target.set(clamped);
      setActiveIndex(clamped);
    },
    [target, total]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      dragStartXRef.current = e.clientX;
      dragStartTargetRef.current = target.get();
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [target]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const step = Math.max(cardWidth + gap, 40);
      const deltaX = e.clientX - dragStartXRef.current;
      const deltaIndex = (-deltaX / step) * dragSensitivity;
      const next = clamp(dragStartTargetRef.current + deltaIndex, 0, total - 1);
      target.set(next);
      setActiveIndex(Math.round(next));
    },
    [cardWidth, gap, dragSensitivity, total, target]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      // Snap to nearest integer card
      const snapped = clamp(Math.round(target.get()), 0, total - 1);
      target.set(snapped);
      setActiveIndex(snapped);
    },
    [target, total]
  );

  const handlePrev = () => {
    selectCard(activeIndex - 1);
  };

  const handleNext = () => {
    selectCard(activeIndex + 1);
  };

  const activeStory = COMMUNITY_STORIES[activeIndex] || COMMUNITY_STORIES[0];

  return (
    <section id="community-stories" className="scroll-mt-0 py-20 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-monochrome-inkMuted mb-4">
          <span className="w-8 h-[1.5px] bg-monochrome-ink inline-block" />
          <span>THE ASPIRATION • STORIES WE ARE GATHERING</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-monochrome-ink mb-3 leading-[1.12]">
          Voices Across Borders.
        </h2>

        <p className="font-sans text-base sm:text-lg text-monochrome-inkMuted font-light italic leading-relaxed max-w-2xl">
          These narratives capture the exact spirit, depth, and vulnerability of the human encounters we are setting out to accomplish. We don't have live community voices published yet; these are the story archetypes of what we are building. If you have lived a moment like this, help us ignite the movement.
        </p>

        {/* Drag Hint Pill */}
        <div className="inline-flex items-center gap-2 mt-5 px-3.5 py-1 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone text-[11px] font-mono text-monochrome-inkMuted shadow-sm">
          <MoveHorizontal className="w-3.5 h-3.5 text-monochrome-ink" />
          <span>Drag or click to explore story archetypes</span>
        </div>
      </div>

      {/* 3D Cover Flow Stage */}
      <div
        className="relative w-full h-[470px] sm:h-[510px] touch-none cursor-grab active:cursor-grabbing flex items-center justify-center"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          style={{
            perspective: 1200,
            transformStyle: "preserve-3d",
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {COMMUNITY_STORIES.map((story, i) => (
            <CoverFlowCard
              key={story.id}
              story={story}
              index={i}
              activeFloat={activeFloat}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              gap={gap}
              onSelect={selectCard}
            />
          ))}
        </div>
      </div>

      {/* Navigation Controls & Dot Indicators */}
      <div className="flex items-center justify-center gap-4 mt-6 mb-12">
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="w-10 h-10 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone flex items-center justify-center text-monochrome-ink hover:border-monochrome-ink disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
          aria-label="Previous story"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2">
          {COMMUNITY_STORIES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => selectCard(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-monochrome-ink"
                  : "w-2 bg-monochrome-sandstone hover:bg-monochrome-inkMuted"
              }`}
              aria-label={`Jump to story ${i + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === total - 1}
          className="w-10 h-10 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone flex items-center justify-center text-monochrome-ink hover:border-monochrome-ink disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
          aria-label="Next story"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Synchronized Expanded Story Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStory.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="p-8 sm:p-10 rounded-3xl bg-monochrome-pureWhite border border-monochrome-sandstone shadow-sm max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-monochrome-editorialCanvas border border-monochrome-sandstone flex items-center justify-center text-monochrome-ink shrink-0 shadow-sm">
              <Quote className="w-6 h-6 opacity-60" />
            </div>

            <div>
              <p className="font-serif text-xl sm:text-2xl font-normal text-monochrome-ink leading-snug mb-3">
                "{activeStory.reflection}"
              </p>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-monochrome-inkMuted">
                <span className="font-semibold text-monochrome-ink">{activeStory.author}</span>
                <span>•</span>
                <span>{activeStory.originCountry} in {activeStory.location}</span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded-full bg-monochrome-editorialCanvas border border-monochrome-sandstone text-[10px] text-monochrome-ink font-semibold">
                  Archetype • {activeStory.category}
                </span>
              </div>
            </div>
          </div>

          <a
            href="#community-portal"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-monochrome-ink hover:bg-monochrome-ink/90 text-monochrome-pureWhite font-sans text-xs font-semibold tracking-wide transition-all shadow-sm shrink-0 self-start md:self-center"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Submit Your Real Story</span>
          </a>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default CulturalStoryStream;
