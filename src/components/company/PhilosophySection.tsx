import React, { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, MapPin, CheckCircle } from "lucide-react";

interface PhilosophyItem {
  id: string;
  num: string;
  tenet: string;
  title: string;
  subtitle: string;
  quote: string;
  location: string;
  imageUrl: string;
}

const PHILOSOPHY_ITEMS: PhilosophyItem[] = [
  {
    id: "tenet-1",
    num: "01",
    tenet: "HOSPITALITY IS THE ULTIMATE LUXURY",
    title: "Every prejudice dies at a kitchen table.",
    subtitle:
      "We believe isolation is an illusion, not human nature. When you share bread with a stranger in their kitchen, you stop seeing an abstract country on a map. You see a family, a soul, a friend.",
    quote: "No passports are required to share laughter.",
    location: "Ronda & Warsaw",
    imageUrl: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "tenet-2",
    num: "02",
    tenet: "LIVING ROOMS OVER HOTEL CORRIDORS",
    title: "Hotels insulate you. Homes transform you.",
    subtitle:
      "Hotels keep you insulated inside a sanitized tourist bubble. Connect Cultures unlocks authentic local homes, where you hear the language spoken by elders, eat recipes handed down across generations, and touch real ground.",
    quote: "Travel to understand, not to capture photos.",
    location: "Cairo & Amsterdam",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "tenet-3",
    num: "03",
    tenet: "SHARED HEARTHS, OPEN DOORS",
    title: "Culture is not a barrier. It is an open door.",
    subtitle:
      "Across the globe, living rooms sit with empty chairs while travelers wander lonely streets. We build the bridge that brings curious souls into authentic homes worldwide.",
    quote: "A stranger across any border is simply a friend you have not sat with yet.",
    location: "Istanbul & Oaxaca",
    imageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1000&q=80",
  },
];

const SPREAD = [0, -5, 4, -3];

interface PhilosophySectionProps {
  onExploreCommunity?: () => void;
}

/**
 * Section 01: The Philosophy: Powered by the Framer StackSlider (StackDeck) Architecture.
 * Features:
 * - 3D physics-driven card stack with organic spread angles, depth scaling, and hover tilt
 * - Swipe / drag throw gesture with spring rebound and re-ordering
 * - Synchronized animated text reveal with typography matching intellifai.nl
 * - Controls with previous/next triggers and progress bars
 */
export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onExploreCommunity }) => {
  const items = PHILOSOPHY_ITEMS;
  const n = items.length;

  const [order, setOrder] = useState<number[]>([0, 1, 2]);
  const orderRef = useRef(order);
  orderRef.current = order;
  const activeIdx = order[0] ?? 0;
  const activeItem = items[activeIdx];

  const x0 = useMotionValue(0);
  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const xs = useMemo(() => [x0, x1, x2], [x0, x1, x2]);
  const busyRef = useRef(false);

  // Mouse tilt on the whole stack
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });
  const rotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 20 });

  // Throw top card off the stack and smoothly glide it into the back of the deck
  const throwTop = useCallback(
    async (dir: number, velocity: number = 0) => {
      if (busyRef.current || n < 2) return;
      busyRef.current = true;

      const topCardIdx = orderRef.current[0];
      const xVal = xs[topCardIdx];

      // 1. Card flies outward off the stack
      await animate(xVal, dir * 460, {
        type: "spring",
        stiffness: 260,
        damping: 28,
        velocity,
        restDelta: 10,
      });

      // 2. Card becomes back of the deck
      setOrder((prev) => [...prev.slice(1), prev[0]]);

      // 3. Smoothly animate card returning from offset to 0 behind the stack!
      animate(xVal, 0, {
        type: "spring",
        stiffness: 140,
        damping: 20,
        delay: 0.05,
      });

      setTimeout(() => {
        busyRef.current = false;
      }, 300);
    },
    [xs, n]
  );

  // Bring back previous card from back to top
  const bringBack = useCallback(() => {
    if (busyRef.current || n < 2) return;
    busyRef.current = true;

    const lastCardIdx = orderRef.current[n - 1];
    const xVal = xs[lastCardIdx];

    // Card starts from side, moves to top of order, and glides smoothly into place
    xVal.set(460);
    setOrder((prev) => [prev[n - 1], ...prev.slice(0, n - 1)]);

    animate(xVal, 0, { type: "spring", stiffness: 220, damping: 24 });

    setTimeout(() => {
      busyRef.current = false;
    }, 280);
  }, [xs, n]);

  const handleNext = () => throwTop(1);
  const handlePrev = () => bringBack();

  const handleCardRelease = (cardIdx: number, info: any) => {
    const xVal = xs[cardIdx];
    const dx = info.offset.x;
    const vx = info.velocity.x;

    if (Math.abs(dx) > 80 || Math.abs(vx) > 300) {
      throwTop(dx + vx * 0.1 > 0 ? 1 : -1, vx);
    } else {
      animate(xVal, 0, { type: "spring", stiffness: 300, damping: 25 });
    }
  };

  const jumpTo = (targetIdx: number) => {
    if (targetIdx === activeIdx || busyRef.current) return;
    setOrder((prev) => {
      const at = prev.indexOf(targetIdx);
      return [...prev.slice(at), ...prev.slice(0, at)];
    });
  };

  return (
    <div
      id="philosophy"
      className="scroll-mt-0 relative w-full min-h-screen py-24 px-6 lg:px-16 bg-monochrome-editorialCanvas text-monochrome-ink flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto my-auto">
        {/* Section Headline Kicker */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-monochrome-inkMuted mb-6">
          <span className="w-8 h-[1.5px] bg-monochrome-ink inline-block" />
          <span>HOW WE CONNECT • THE PHILOSOPHY</span>
        </div>

        {/* Monolithic Serif Headline */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-monochrome-ink leading-[1.12] mb-8 max-w-4xl">
          Culture shouldn’t feel like a foreign barrier.
          <br />
          <span className="font-serif italic font-normal text-monochrome-ink">
            It should feel like an open door.
          </span>
        </h2>

        {/* Transparent Founding Manifesto Disclosure */}
        <div className="mb-14 p-6 sm:p-8 rounded-[28px] bg-monochrome-pureWhite border-2 border-monochrome-sandstone shadow-md text-monochrome-ink">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-monochrome-sandstone pb-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-monochrome-ink font-bold">
              <span className="w-2 h-2 rounded-full bg-monochrome-ink animate-pulse" />
              <span>A NOTE OF COMPLETE TRANSPARENCY FROM FOUNDER JOEY</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-monochrome-inkMuted bg-monochrome-editorialCanvas px-3 py-1 rounded-full border border-monochrome-sandstone">
              THE LIVING BLUEPRINT • DAY ZERO
            </span>
          </div>

          <p className="font-sans text-base sm:text-lg text-monochrome-ink leading-relaxed font-light mb-3">
            Every cultural movement begins with an authentic story and an unapologetic vision. To be open: <strong>we do not have active events, registered hosts, or live voices yet</strong>. Everything you explore across this platform is the living blueprint of what we want to accomplish and build together across the globe. We are putting this feeling forward to spark the flame.
          </p>
          <p className="font-sans text-sm sm:text-base text-monochrome-inkMuted leading-relaxed">
            <strong className="text-monochrome-ink">My founding journey chronicled below is completely the truth.</strong> Every meal shared, every foreign doorstep, and every friendship forged was real. We are inviting the brave, curious few to be our founding hosts and fellows to bring this vision into reality.
          </p>
        </div>

        {/* 2-Column StackSlider Layout: Left Narrative & Controls, Right 3D Card Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Synchronized Dynamic Copy & Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone font-mono text-xs text-monochrome-ink font-semibold shadow-sm">
                  <span>TENET {activeItem.num}</span>
                  <span>•</span>
                  <span className="uppercase text-monochrome-inkMuted">{activeItem.tenet}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-monochrome-ink tracking-tight leading-snug">
                  {activeItem.title}
                </h3>

                <p className="font-sans text-base sm:text-lg text-monochrome-inkMuted font-light leading-relaxed max-w-xl">
                  {activeItem.subtitle}
                </p>

                <p className="font-serif italic text-base sm:text-lg text-monochrome-ink border-l-2 border-monochrome-ink pl-4 py-1">
                  "{activeItem.quote}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* StackSlider Controls & Progress */}
            <div className="pt-6 border-t border-monochrome-sandstone flex flex-wrap items-center justify-between gap-6">
              {/* Stepper Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone flex items-center justify-center text-monochrome-ink hover:border-monochrome-ink active:scale-95 transition-all shadow-sm"
                  aria-label="Previous card in stack"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-monochrome-ink text-monochrome-pureWhite flex items-center justify-center hover:bg-monochrome-ink/90 active:scale-95 transition-all shadow-sm"
                  aria-label="Next card in stack"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar Indicators */}
              <div className="flex items-center gap-2">
                {items.map((it, idx) => (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => jumpTo(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIdx
                        ? "w-10 bg-monochrome-ink"
                        : "w-3 bg-monochrome-sandstone hover:bg-monochrome-inkMuted"
                    }`}
                    aria-label={`Jump to tenet ${idx + 1}`}
                  />
                ))}
              </div>

              {/* CTA Action */}
              {onExploreCommunity && (
                <button
                  type="button"
                  onClick={onExploreCommunity}
                  className="px-6 py-2.5 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone hover:border-monochrome-ink text-xs font-mono font-semibold text-monochrome-ink transition-all shadow-sm"
                >
                  Explore Community →
                </button>
              )}
            </div>
          </div>

          {/* Right Column: 3D StackSlider Card Deck */}
          <div
            className="lg:col-span-6 relative h-[440px] sm:h-[500px] flex items-center justify-center"
            onPointerMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
              mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
            }}
            onPointerLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
          >
            <motion.div
              style={{
                rotateX: rotX,
                rotateY: rotY,
                transformPerspective: 1200,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[300px] sm:w-[350px] h-[390px] sm:h-[450px]"
            >
              {items.map((item, idx) => {
                const depth = order.indexOf(idx);
                const isTop = depth === 0;
                const k = Math.min(depth, 3);

                const cardTarget = {
                  y: -k * 18,
                  scale: 1 - k * 0.05,
                  rotate: SPREAD[depth % SPREAD.length],
                  opacity: depth <= 3 ? 1 : 0,
                };

                return (
                  <motion.div
                    key={item.id}
                    animate={cardTarget}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 100 - depth,
                      pointerEvents: isTop ? "auto" : "none",
                    }}
                  >
                    <motion.div
                      drag={isTop ? "x" : false}
                      dragElastic={0.4}
                      onDragEnd={(_, info) => handleCardRelease(idx, info)}
                      style={{
                        x: xs[idx],
                        position: "absolute",
                        inset: 0,
                        cursor: isTop ? "grab" : "default",
                      }}
                      whileTap={isTop ? { cursor: "grabbing" } : undefined}
                      className="rounded-[28px] overflow-hidden bg-monochrome-pureWhite border-2 border-monochrome-sandstone shadow-2xl relative select-none will-change-transform group"
                    >
                      {/* Full-Bleed Card Artwork */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover pointer-events-none"
                      />

                      {/* Vignette Overlay for Depth */}
                      <div className="absolute inset-0 bg-gradient-to-t from-monochrome-ink via-monochrome-ink/30 to-transparent pointer-events-none" />

                      {/* Card Top Pill Badge */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-monochrome-pureWhite/90 backdrop-blur-md text-monochrome-ink font-semibold shadow-sm">
                          {item.tenet}
                        </span>
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-monochrome-ink/60 backdrop-blur-md text-monochrome-pureWhite font-mono text-[10px]">
                          <MapPin className="w-3 h-3 text-monochrome-sandstone" />
                          <span>{item.location}</span>
                        </div>
                      </div>

                      {/* Card Bottom Floating Title */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none text-monochrome-pureWhite">
                        <p className="font-serif text-xl sm:text-2xl font-bold mb-1 leading-snug">
                          {item.title}
                        </p>
                        <p className="font-sans text-xs text-monochrome-sandstone italic">
                          "{item.quote}"
                        </p>
                      </div>

                      {/* Drag Hint on Hover */}
                      {isTop && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-full bg-monochrome-ink/80 backdrop-blur-md text-monochrome-pureWhite font-mono text-xs flex items-center gap-1.5 shadow-lg">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Swipe or Drag</span>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom Core Principles Bar */}
        <div className="mt-16 pt-8 border-t border-monochrome-sandstone flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-8 sm:gap-14">
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-monochrome-ink">GENUINE</p>
              <p className="font-mono text-xs uppercase tracking-wider text-monochrome-inkMuted mt-0.5">
                Living Room Hospitality
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-monochrome-ink">HUMAN</p>
              <p className="font-mono text-xs uppercase tracking-wider text-monochrome-inkMuted mt-0.5">
                Direct Cultural Kinship
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-monochrome-ink">BORDERLESS</p>
              <p className="font-mono text-xs uppercase tracking-wider text-monochrome-inkMuted mt-0.5">
                Open Table Living
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-monochrome-inkMuted">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>Curated Fellowship Standards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhilosophySection;
