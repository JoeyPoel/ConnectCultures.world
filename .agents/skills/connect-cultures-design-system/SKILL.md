---
name: connect-cultures-design-system
description: >-
  Visual design system, editorial typography, performance clamping, and scroll-pinned
  narrative mechanics synthesized from Section 1 (Cosmic Starfield & Seamless 3D Earth)
  and Section 2 (IntellifAI High-Contrast Editorial Canvas with Stepped Sticky Bullet Reveal).
---

# Connect Cultures Design System & Aesthetic Specification

This skill documents the definitive visual, architectural, and interaction patterns for the **Connect Cultures** interactive platform (`Beyond The Bubble`), synthesized from the cosmic hero experience and the editorial interaction model of `intellifai.nl`.

---

## 1. Aesthetic Duality & Visual Philosophy

The platform balances two complementary visual worlds:
1. **The Cosmic Infinite (Section 00 — Hero)**:
   - Deep space void (`space-void: #030712`), sparkling starlight field, and a photorealistic 3D Earth floating unboxed with living atmospheric Rayleigh scattering.
   - Monolithic editorial serif typography (`ONE SKY. BEYOND THE BUBBLE.`) paired with aerospace telemetry badges and minimalist copy.
2. **The Human Editorial Canvas (Section 01 — The Philosophy / IntellifAI Inspiration)**:
   - Ultra-clean, luminous vellum/sandstone canvas (`monochrome-editorialCanvas: #f4f4f0`, `monochrome-ink: #0c0d0e`).
   - Monumental editorial typography with huge line-height and generous breathing room.
   - Left vertical accent bar quotes (`| Hospitality is the ultimate luxury.`).
   - Stepped, scroll-pinned interactive narrative where bullets smoothly expand one by one on scroll.

### Core Rule: "Say A Lot With Few Words"
Never write long, wandering paragraphs. Every statement must be poetic, punchy, and monumental (e.g., *"Every prejudice dies at a kitchen table."*, *"Hospitality is the ultimate luxury."*, *"Culture shouldn’t feel like a foreign barrier. It should feel like an open door."*).

---

## 2. Color System & Zero-Hardcoded-Hex Rule

Every color MUST use semantic Tailwind classes defined in `tailwind.config.ts`. No raw hex codes (`#xxxxxx`) are allowed in `src/components/**/*.tsx` (verified by `test/invariants.test.mjs`).

### Semantic Color Palette:
- **Space & Atmosphere**:
  - `space-void`: `#030712` (deepest black-blue space background)
  - `space-surface`: `#0b1528` (glass HUD containers and buttons)
  - `space-elevated`: `#111f38` (elevated control pills)
- **Earth & Aurora**:
  - `earth-ocean`: `#0066cc` (deep Atlantic blue)
  - `earth-atmosphere`: `#4fa8ff` (Rayleigh scattering rim bloom)
  - `earth-cyan`: `#38bdf8` (vibrant starlight aurora and active indicators)
  - `earth-sun`: `#f59e0b` (golden solar rim highlights)
- **Starlight**:
  - `stars-starlight`: `#f8fafc` (crisp white text on cosmic surfaces)
  - `stars-nebula`: `#94a3b8` (muted starlight captions and telemetry)
  - `stars-hairline`: `rgba(255, 255, 255, 0.09)` (subtle cosmic borders)
- **IntellifAI Editorial (Light Canvas)**:
  - `monochrome-editorialCanvas`: `#f4f4f0` (clean sandstone/vellum surface)
  - `monochrome-ink`: `#0c0d0e` (high-contrast editorial typography and accent bars)
  - `monochrome-inkMuted`: `#4a5568` (subtitles, secondary text, collapsed bullets)
  - `monochrome-sandstone`: `#e2e8f0` (subtle dividers and borders)

---

## 3. Section 00: Cosmic Starfield & 3D Earth Globe

### 3.1 Unboxed Architecture
- The Earth globe must NEVER be enclosed inside a card, border, or container frame.
- It sits directly on the right side on desktop (`lg:col-span-7`), floating in deep space with its atmospheric halo bleeding smoothly into the starfield.
- On mobile/tablet, it stacks centered below the editorial text.
- No personal journey waypoint chips or teaser cards in the hero; the globe remains clean, majestic, and pure.

### 3.2 GPU Performance Clamping Invariants
To prevent high-DPI GPU overload and eliminate all scroll stuttering:
1. **DPR Clamping**:
   ```ts
   // Clamp DPR to 1.0 max in WebGL resize handler (prevents >2M pixel raymarching overdraw)
   dpr = Math.min(1.0, window.devicePixelRatio || 1);
   ```
2. **Tab Visibility Check**:
   ```ts
   // Skip requestAnimationFrame rendering when tab is hidden
   if (document.hidden) return;
   ```
3. **Viewport Intersection Observer**:
   - The 3D canvas is conditionally rendered or pauses RAF loops via `IntersectionObserver` when scrolled out of view.
4. **Dimensions**:
   - Keep globe render size at `size={500-520}` with responsive CSS container heights (`h-[450px] sm:h-[540px] lg:h-[620px]`).

### 3.3 Starfield Component (`Starfield.tsx`)
- Render 90 deterministic stars using mathematical seeds (zero re-render jumps).
- Staggered CSS pulse animations (`pulseSubtle 3s-7s`) for gentle twinkling.
- Subtle atmospheric radial blur backdrops (`bg-earth-atmosphere/20 blur-[150px]`).

---

## 4. Section 01: IntellifAI Editorial Sticky Scroll Narrative

### 4.1 Scroll-Pinned Stage Architecture
- Container: Outer scroll track of `h-[280vh]` or `h-[300vh]`.
- Sticky Stage: `sticky top-0 h-screen w-full flex flex-col justify-center pt-24 pb-10 px-6 lg:px-16 overflow-hidden`.
- **CRITICAL CSS INVARIANT**:
  - Never use `overflow-x: hidden` on `body` or root containers (`#root`, `<div className="overflow-x-hidden">`), as this breaks CSS `position: sticky`.
  - Always use `overflow-x: clip` in `src/styles/globals.css` and `src/App.tsx`.
- **Top Navigation Clearance**:
  - Because the navigation header is `fixed top-0` (~75px height), the sticky stage must have `pt-24` padding to prevent headlines from clipping under the navbar.

### 4.2 Stepped Bullet Point Expansion Mechanics
- As the user scrolls through the 280vh track, progress is computed via `rect.top`:
  ```ts
  const scrolled = -rect.top;
  const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
  // 0.00 - 0.33: Step 0 active
  // 0.33 - 0.68: Step 1 active
  // 0.68 - 1.00: Step 2 active
  ```
- **Active Step Component**:
  - Renders a left vertical accent bar: `border-l-2 border-monochrome-ink pl-6 sm:pl-8 py-2 my-2`.
  - Active dot with outer ring: `w-2.5 h-2.5 rounded-full bg-monochrome-ink ring-4 ring-monochrome-ink/15`.
  - Expanded title (`font-sans text-xl sm:text-2xl font-semibold text-monochrome-ink`).
  - Deep descriptive statement (`font-sans text-base sm:text-lg text-monochrome-inkMuted`).
  - Monospace uppercase kicker quote (`font-mono text-xs tracking-wider uppercase text-monochrome-ink/75 italic`).
  - Wrapped in `<AnimatePresence mode="wait">` with Framer Motion `layout` and `initial={{ opacity: 0, y: 8 }}` for seamless crossfades.
- **Collapsed Steps**:
  - Render as subtle, clickable rows: `w-2 h-2 rounded-full bg-monochrome-ink/35` + `text-monochrome-inkMuted`.
  - Clicking any bullet smoothly scrolls the page to that step's target offset.
- **Progress Counter**:
  - Shows `0X / 03` counter with animated progress pill bars indicating the active step.

---

## 5. Technology Stack & Quality Standards

- **Core**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Three.js / WebGL.
- **Design Invariants**:
  - Zero hardcoded hex codes in components.
  - No `overflow-x: hidden` on sticky ancestor containers (use `overflow-x: clip`).
  - Full TypeScript safety with 0 compiler warnings or errors (`tsc && vite build`).
  - Verified 60–120fps performance on all viewport widths.
