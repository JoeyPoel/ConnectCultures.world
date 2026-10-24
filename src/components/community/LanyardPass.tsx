import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Globe, Plane, ShieldCheck } from "lucide-react";
import { LANYARD_STRINGS } from "../../constants/string";

interface LanyardPassProps {
  attendeeName?: string;
  country?: string;
  dreamCulture?: string;
  isHost?: boolean;
  passNumber?: string;
}

/**
 * Authentic Cultural Expedition Boarding Pass on physical lanyard.
 * Styled with classic airline boarding pass architecture:
 * - Header with flight code (CC-0054), Gate 01, and priority boarding status
 * - Main passenger pass with origin (home domicile) and cultural destination
 * - Perforated tear-off stub with edge notch punch-outs and matrix barcode
 * - Dynamic flexible woven cord that moves and flexes with the pass
 * - Holographic security foil reflection
 */
export const LanyardPass: React.FC<LanyardPassProps> = ({
  attendeeName = "",
  country = "",
  dreamCulture = "",
  isHost = false,
  passNumber = "CC-FOUNDING-PASS",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Position motion values for drag and swing
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  // Spring physics for responsive swing and rebound
  const springConfig = { stiffness: 220, damping: 18, mass: 1 };
  const smoothX = useSpring(cardX, springConfig);
  const smoothY = useSpring(cardY, springConfig);

  // 3D tilts and rotations relative to swing position
  const rotateZ = useTransform(smoothX, [-140, 140], [-16, 16]);
  const rotateY = useTransform(smoothX, [-140, 140], [-20, 20]);
  const rotateX = useTransform(smoothY, [-80, 80], [14, -14]);

  // Holographic sheen position shifting with movement
  const holoX = useTransform(smoothX, [-140, 140], ["0%", "100%"]);
  const holoY = useTransform(smoothY, [-80, 80], ["0%", "100%"]);

  // Dynamic SVG path for left and right lanyard straps meeting at the clasp
  const leftStrapPath = useTransform([smoothX, smoothY], ([x, y]) => {
    const targetX = 180 + Number(x);
    const targetY = 60 + Number(y);
    const cpY = Math.max(15, targetY * 0.45);
    return `M 166 0 C 166 ${cpY}, ${targetX - 7} ${targetY * 0.75}, ${targetX - 5} ${targetY}`;
  });

  const rightStrapPath = useTransform([smoothX, smoothY], ([x, y]) => {
    const targetX = 180 + Number(x);
    const targetY = 60 + Number(y);
    const cpY = Math.max(15, targetY * 0.45);
    return `M 194 0 C 194 ${cpY}, ${targetX + 7} ${targetY * 0.75}, ${targetX + 5} ${targetY}`;
  });

  const displayName = attendeeName.trim() ? attendeeName.toUpperCase() : LANYARD_STRINGS.defaultName;
  const displayCountry = country.trim() ? country.toUpperCase() : LANYARD_STRINGS.defaultCountry;
  const displayCulture = dreamCulture.trim()
    ? dreamCulture.toUpperCase()
    : LANYARD_STRINGS.defaultCulture;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[390px] mx-auto flex flex-col items-center select-none pt-2 pb-6 overflow-visible"
      style={{ perspective: 1200 }}
    >
      {/* =========================================================================
          1. DYNAMIC FLEXIBLE LANYARD CORD (Tracks Card Movement Live)
         ========================================================================= */}
      <div className="absolute top-0 left-0 right-0 h-[140px] pointer-events-none z-10 overflow-visible">
        <svg
          viewBox="0 0 360 140"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Drop shadow behind cords */}
          <motion.path
            d={leftStrapPath}
            stroke="rgba(0, 0, 0, 0.15)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <motion.path
            d={rightStrapPath}
            stroke="rgba(0, 0, 0, 0.15)"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Left Main Woven Strap */}
          <motion.path
            d={leftStrapPath}
            stroke="currentColor"
            className="text-monochrome-ink"
            strokeWidth="14"
            strokeLinecap="butt"
          />
          <motion.path
            d={leftStrapPath}
            stroke="currentColor"
            className="text-monochrome-sandstone opacity-40"
            strokeWidth="2"
            strokeDasharray="4 3"
          />

          {/* Right Main Woven Strap */}
          <motion.path
            d={rightStrapPath}
            stroke="currentColor"
            className="text-monochrome-ink"
            strokeWidth="14"
            strokeLinecap="butt"
          />
          <motion.path
            d={rightStrapPath}
            stroke="currentColor"
            className="text-monochrome-sandstone opacity-40"
            strokeWidth="2"
            strokeDasharray="4 3"
          />
        </svg>
      </div>

      {/* Top Ceiling Fixed Lanyard Mount */}
      <div className="w-16 h-3 rounded-b-md bg-monochrome-ink shadow-sm z-20 flex items-center justify-center">
        <div className="w-8 h-1 bg-monochrome-sandstone/40 rounded-full" />
      </div>

      {/* =========================================================================
          2. UNIFIED DRAGGABLE PASS & CLASP ASSEMBLY (Cannot detach or get loose)
         ========================================================================= */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -35, bottom: 80 }}
        dragElastic={0.2}
        dragSnapToOrigin
        onDrag={(_, info) => {
          cardX.set(info.offset.x);
          cardY.set(info.offset.y);
        }}
        onDragEnd={() => {
          cardX.set(0);
          cardY.set(0);
        }}
        style={{
          x: smoothX,
          y: smoothY,
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: "preserve-3d",
        }}
        whileDrag={{ scale: 1.02, cursor: "grabbing" }}
        className="relative w-full cursor-grab active:cursor-grabbing will-change-transform z-30 select-none flex flex-col items-center mt-12"
      >
        {/* Hardware Metal Clasp physically anchored to top of card */}
        <div className="flex flex-col items-center pointer-events-none z-40">
          <div className="w-10 h-3 rounded-sm bg-gradient-to-r from-monochrome-sandstone via-monochrome-pureWhite to-monochrome-sandstone border border-monochrome-ink/30 shadow-sm" />
          <div className="w-4 h-4 rounded-full border-2 border-monochrome-ink/80 bg-transparent -mt-0.5" />
          <div className="w-3.5 h-6 rounded-b-md bg-gradient-to-r from-monochrome-ink/80 via-monochrome-ink to-monochrome-ink -mt-1 shadow-md flex items-center justify-center">
            <div className="w-1 h-3 bg-monochrome-pureWhite/40 rounded-full" />
          </div>
        </div>

        {/* Boarding Pass Badge */}
        <div className="relative w-full rounded-[24px] bg-monochrome-pureWhite border-2 border-monochrome-sandstone shadow-2xl text-monochrome-ink -mt-3 overflow-hidden font-sans">
          {/* Holographic Security Sheen Overlay */}
          <motion.div
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(200,230,255,0.2) 35%, rgba(255,215,240,0.25) 50%, rgba(220,255,230,0.2) 65%, rgba(255,255,255,0) 100%)",
              backgroundPosition: `${holoX} ${holoY}`,
            }}
            className="absolute inset-0 pointer-events-none rounded-[24px] z-20 mix-blend-color-dodge opacity-60"
          />

          {/* Punch-Hole Slot at Top Center where Clasp Hook Enters */}
          <div className="w-8 h-2.5 rounded-full bg-monochrome-editorialCanvas border border-monochrome-sandstone mx-auto mt-4 mb-2 shadow-inner" />

          {/* Boarding Pass Header Banner */}
          <div className="bg-monochrome-ink text-monochrome-pureWhite px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-monochrome-vellum" />
              <span className="font-mono text-xs font-bold tracking-widest uppercase">
                {LANYARD_STRINGS.headerBrand}
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-wider uppercase bg-monochrome-pureWhite/20 px-2 py-0.5 rounded font-semibold">
              {LANYARD_STRINGS.headerType}
            </span>
          </div>

        {/* Main Boarding Pass Content */}
        <div className="p-6 space-y-4">
          {/* Flight, Gate & Seat Row */}
          <div className="grid grid-cols-3 gap-2 pb-3 border-b border-monochrome-sandstone text-center font-mono text-xs">
            <div>
              <span className="text-[9px] text-monochrome-inkMuted uppercase block">{LANYARD_STRINGS.journeyLabel}</span>
              <span className="font-bold text-monochrome-ink">{LANYARD_STRINGS.journeyValue}</span>
            </div>
            <div>
              <span className="text-[9px] text-monochrome-inkMuted uppercase block">{LANYARD_STRINGS.portalLabel}</span>
              <span className="font-bold text-monochrome-ink">{LANYARD_STRINGS.portalValue}</span>
            </div>
            <div>
              <span className="text-[9px] text-monochrome-inkMuted uppercase block">{LANYARD_STRINGS.seatLabel}</span>
              <span className="font-bold text-monochrome-ink">{LANYARD_STRINGS.seatValue}</span>
            </div>
          </div>

          {/* Passenger Name */}
          <div>
            <span className="font-mono text-[10px] text-monochrome-inkMuted uppercase tracking-wider block mb-0.5">
              {LANYARD_STRINGS.passengerLabel}
            </span>
            <h3 className="font-serif text-2xl font-bold tracking-tight text-monochrome-ink break-words leading-tight">
              {displayName}
            </h3>
          </div>

          {/* Origin & Destination Route */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-monochrome-editorialCanvas border border-monochrome-sandstone">
            <div className="min-w-0 flex-1 pr-1">
              <span className="font-mono text-[9px] text-monochrome-inkMuted uppercase block">
                {LANYARD_STRINGS.originLabel}
              </span>
              <span className="font-mono text-[11px] font-bold text-monochrome-ink block break-words leading-tight">
                {displayCountry}
              </span>
            </div>

            <div className="flex flex-col items-center text-monochrome-inkMuted px-2 flex-shrink-0">
              <Plane className="w-3.5 h-3.5 rotate-90 text-monochrome-ink" />
              <span className="font-mono text-[8px] uppercase tracking-widest mt-0.5 text-monochrome-inkMuted">{LANYARD_STRINGS.globalTag}</span>
            </div>

            <div className="min-w-0 flex-1 pl-1 text-right">
              <span className="font-mono text-[9px] text-monochrome-inkMuted uppercase block">
                {LANYARD_STRINGS.destinationLabel}
              </span>
              <span className="font-mono text-[11px] font-bold text-monochrome-ink block break-words leading-tight">
                {displayCulture}
              </span>
            </div>
          </div>

          {/* Class & Boarding Time */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <span className="font-mono text-[9px] text-monochrome-inkMuted uppercase block">
                {LANYARD_STRINGS.statusLabel}
              </span>
              <span className="font-mono text-xs font-semibold text-green-700 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isHost ? LANYARD_STRINGS.statusHost : LANYARD_STRINGS.statusFellow}</span>
              </span>
            </div>
            <div>
              <span className="font-mono text-[9px] text-monochrome-inkMuted uppercase block">
                {LANYARD_STRINGS.boardingLabel}
              </span>
              <span className="font-mono text-xs font-bold text-monochrome-ink mt-0.5 block">
                {LANYARD_STRINGS.boardingValue}
              </span>
            </div>
          </div>
        </div>

        {/* Perforation Line with Edge Notches */}
        <div className="relative flex items-center justify-center my-1">
          {/* Left Edge Perforation Notch Cutout */}
          <div className="w-5 h-5 rounded-full bg-monochrome-editorialCanvas border-r-2 border-monochrome-sandstone absolute -left-3 shadow-inner" />
          {/* Dashed Tear Line */}
          <div className="w-full border-t-2 border-dashed border-monochrome-sandstone/80 mx-3" />
          {/* Right Edge Perforation Notch Cutout */}
          <div className="w-5 h-5 rounded-full bg-monochrome-editorialCanvas border-l-2 border-monochrome-sandstone absolute -right-3 shadow-inner" />
        </div>

        {/* Boarding Pass Tear-off Stub */}
        <div className="p-5 bg-monochrome-editorialCanvas/50 flex items-center justify-between">
          <div>
            <span className="font-mono text-[9px] text-monochrome-inkMuted uppercase block">
              {LANYARD_STRINGS.stubPassLabel}
            </span>
            <span className="font-mono text-xs font-bold text-monochrome-ink">
              {passNumber}
            </span>
            <span className="font-mono text-[8px] text-monochrome-inkMuted block mt-0.5">
              {LANYARD_STRINGS.stubNotice}
            </span>
          </div>

          {/* Aztec / Flight Barcode */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-0.5 h-7">
              {[3, 1, 4, 2, 1, 3, 4, 1, 2, 4, 1, 3, 2, 1, 4, 2].map((w, idx) => (
                <span
                  key={idx}
                  className="bg-monochrome-ink opacity-85 inline-block h-full"
                  style={{ width: `${w * 1.3}px` }}
                />
              ))}
            </div>
            <span className="font-mono text-[8px] text-monochrome-inkMuted tracking-widest mt-1">
              {LANYARD_STRINGS.stubBarcodeText}
            </span>
          </div>
        </div>
        </div>
      </motion.div>

      {/* Tactile Drag Hint */}
      <p className="font-mono text-[10px] text-monochrome-inkMuted text-center mt-4 tracking-wider uppercase">
        {LANYARD_STRINGS.dragHint}
      </p>
    </div>
  );
};

export default LanyardPass;
