# Beyond The Bubble — Code & Style Guidelines

## 1. Zero Hardcoded Hex Invariant
- Never use raw hex color codes (e.g., `#c85a32`) inside `src/components/`.
- All visual elements must consume tokens declared in `src/config/theme.ts` via Tailwind utility classes (e.g. `bg-dusk-void`, `text-terracotta-base`, `border-monochrome-hairline`) or CSS variables.
- Automated tests in `test/invariants.test.mjs` enforce this rule.

## 2. Visual & Emotional Principles ("Terra Dusk")
- **Palette**: Obsidian dusk void, terracotta bricks & glow, desert sand gold, Bosphorus twilight azure, firelight amber, and warm vellum typography.
- **Glass & Atmosphere**: Soft translucent surfaces (`bg-dusk-abyss/70 backdrop-blur-md`), hairline borders (`border-monochrome-hairline`), atmospheric gradients, and subtle noise grain.
- **Typography**: Editorial serif (`Playfair Display`, `Cinzel`) for headlines, humanist sans (`Plus Jakarta Sans`) for narratives, monospace (`JetBrains Mono`) for geographic coordinates.

## 3. Engineering Invariants
- TypeScript with strict type checking.
- JSDoc/TSDoc on all functions and components.
- Graceful fallbacks for serverless API endpoints when database or email credentials are not set.
- Accessible, responsive layouts supporting mobile viewports.
