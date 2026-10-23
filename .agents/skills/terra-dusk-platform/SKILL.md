---
name: terra-dusk-platform
description: >-
  Architectural blueprint, visual design system, narrative rules, and engineering invariants
  for the "Beyond The Bubble" interactive cultural platform and Terra Dusk twilight aesthetic.
---

# Terra Dusk Cultural Platform Skill

This skill defines the architectural standards, visual aesthetic, narrative chapters, and engineering invariants for the **Beyond The Bubble** interactive digital platform chronicling Joey van der Poel's cross-cultural journey and launching the international community.

---

## 1. Emotional & Visual Design System ("Terra Dusk")

All styling is grounded in a warm, organic, luminous twilight aesthetic. Cold industrial styles, harsh grids, or terminal aesthetics are strictly forbidden.

### 1.1 Color Tokens (`src/config/theme.ts`)
Always reference colors via centralized theme tokens:
- **Dusk**: `void` (`#080706`), `abyss` (`#120e0c`), `surface` (`#1c1613`), `elevated` (`#2a211c`)
- **Terracotta**: `base` (`#c85a32`), `glow` (`#e26d42`), `deep` (`#8a3617`)
- **Gold**: `sand` (`#d4a373`), `shimmer` (`#faedcd`), `muted` (`#997b58`)
- **Azure**: `bosphorus` (`#1d3557`), `dome` (`#457b9d`), `mist` (`#a8dadc`)
- **Amber**: `flame` (`#f4a261`), `subtle` (`rgba(244, 162, 97, 0.12)`)
- **Monochrome**: `pureWhite` (`#ffffff`), `vellum` (`#fefae0`), `sandstone` (`#ccd5ae`), `slateMuted` (`#8d99ae`), `hairline` (`rgba(254, 250, 224, 0.08)`)

### 1.2 Zero Hardcoded Hex Rule
No component under `src/components/` may contain raw hex codes (`#xxxxxx`). Colors must be applied through Tailwind theme classes (e.g. `text-terracotta-base`, `bg-dusk-void`, `border-monochrome-hairline`). Validate with `node test/invariants.test.mjs`.

---

## 2. Episodic Narrative Structure

1. **Chapter 0: Hero Section — "The Shared Horizon"**
   - Origin coordinate: Netherlands • 52.6800° N, 5.0300° E
   - Monolithic headline: *"WE ARE ONE SKY. STEP BEYOND THE BUBBLE."*
   - Interactive 3D Earth Globe with Great-Circle Bezier flight arcs to key journey nodes.
2. **Chapter 1: The Iberian Spark (Spain)**
   - Childhood memory with grandparents; first shock of Andalusian warmth and late dinners.
   - Interactive scrub dial: North Holland polders vs. Andalusian warmth.
3. **Chapter 2: The Sacred Chaos of Cairo (Egypt)**
   - Solo flight at 20; crashing a local wedding party; language-less rhythm.
   - Interactive rhythm audio wave visualizer.
4. **Chapter 3: The Courtyards of Istanbul & Hagia Sophia (Turkey)**
   - Turkish-Dutch friendship; navigating security into Hagia Sophia; female Islamic scholar dialogue; receiving first Quran.
   - Interactive "Pages of Reflection" parchment reader.
5. **Chapter 4: The Slavic Heart & Prom Night (Poland & Bulgaria)**
   - Polish relationship; dancing the Polonaise at Studniówka; Bulgaria reunion; sleeping on couch treated like family.
   - Interactive Polish Phrase Explorer cards.
6. **Chapter 5: The Movement — "Beyond The Bubble" Community Portal**
   - Manifesto against cultural echo chambers.
   - Validated waitlist registration (`/api/community/join.ts`), Resend welcome email, and exchange matrix.

---

## 3. Technology Stack & Directory Conventions

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Three.js, Lucide Icons.
- **Backend**: Vercel Serverless Functions (`/api/*`), Prisma ORM (PostgreSQL), Resend email integration.
- **Audio**: Web Audio procedural synthesis and ambient audio controls with smooth volume fading.
