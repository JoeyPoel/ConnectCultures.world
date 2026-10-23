import React, { useState } from "react";
import ImageFrame from "../common/ImageFrame";
import { Compass, Sliders, Sun, CloudRain } from "lucide-react";

/**
 * Chapter 1: The Iberian Spark (Spain)
 * Features the foundational childhood journey to Benidorm with grandparents and the interactive reality dial.
 */
export const ChapterSpain: React.FC = () => {
  const [dialValue, setDialValue] = useState<number>(80); // 0 = Dutch Polder, 100 = Benidorm Warmth

  return (
    <article
      id="chapter-1"
      className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto transition-colors duration-700"
    >
      {/* Chapter Marker Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-terracotta-base/20 border border-terracotta-base/40 font-mono text-xs text-terracotta-glow uppercase tracking-wider">
            Chapter 01 • The Awakening
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-monochrome-slateMuted">
            <Compass className="w-3.5 h-3.5 text-terracotta-base" />
            <span>BENIDORM & COSTA BLANCA • 38.5411° N, 0.1225° W</span>
          </div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-monochrome-vellum leading-tight mb-3">
          The Iberian Spark
        </h2>
        <p className="font-sans text-lg text-gold-sand">
          Childhood Wonder in Benidorm and the First Glimpse Outside the Dutch Border
        </p>
      </div>

      {/* Main Chapter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative Copy */}
        <div className="lg:col-span-6 space-y-6 font-sans text-base sm:text-lg text-monochrome-vellum/80 leading-relaxed">
          <p className="font-serif italic text-xl text-monochrome-vellum leading-snug border-l-2 border-terracotta-base pl-4">
            "Our native culture is merely the first chapter in a vast world book."
          </p>

          <p>
            The earliest cultural memory of stepping beyond the Dutch bubble belongs to the sun-warmed streets of Benidorm,
            holding my grandparents' hands. Back home in North Holland, life ran on clockwork: dinner ended promptly at 6:00 PM,
            curtains were drawn shut against the evening chill, and the world was orderly.
          </p>

          <p>
            Arriving in Benidorm was a profound sensory shock. As twilight draped across the Costa Blanca, the city came alive.
            Three generations of families filled communal outdoor tables, laughing over tapas, animated conversations carrying
            far past midnight. Children played freely by the fountains while elders enjoyed the Mediterranean air.
          </p>

          <p>
            For a young boy, that contrast was a revelation: home is safe, but the world is vibrant with different tempos of joy,
            community, and togetherness waiting to be understood.
          </p>

          {/* Interactive Scrub Dial Widget */}
          <div className="mt-8 p-6 rounded-2xl bg-dusk-abyss/80 border border-monochrome-hairline backdrop-blur-md shadow-elevation-card">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase tracking-wider text-monochrome-slateMuted flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-terracotta-glow" />
                Cultural Tempo Dial
              </span>
              <span className="font-mono text-xs text-gold-sand">
                {dialValue < 50 ? "North Holland Order (52°N)" : "Benidorm Evening (38°N)"}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <CloudRain
                className={`w-4 h-4 transition-colors ${
                  dialValue < 50 ? "text-azure-mist" : "text-monochrome-slateMuted/50"
                }`}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={dialValue}
                onChange={(e) => setDialValue(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-dusk-surface rounded-lg appearance-none cursor-pointer accent-terracotta-base"
                aria-label="Scrub between North Holland and Benidorm atmosphere"
              />
              <Sun
                className={`w-4 h-4 transition-colors ${
                  dialValue >= 50 ? "text-amber-flame" : "text-monochrome-slateMuted/50"
                }`}
              />
            </div>

            <p className="font-sans text-xs text-monochrome-slateMuted italic">
              {dialValue < 50
                ? "Structured dikes, quiet streets, 18:00 dinner bells, and predictable domestic routines."
                : "Warm Mediterranean breeze, lively midnight dinners, open doors, and spontaneous communal warmth."}
            </p>
          </div>
        </div>

        {/* Right Column: Archival Photo Frame */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <ImageFrame
            label="[PHOTO ARCHIVE: CHILDHOOD JOURNEY TO BENIDORM WITH GRANDPARENTS]"
            coordinates="38.5411° N, 0.1225° W"
            caption="Benidorm, Spain: The first encounter with Mediterranean midnight life"
            aspectRatio="video"
            className="w-full max-w-lg"
          />

          <div className="mt-6 p-4 rounded-xl bg-dusk-surface/60 border border-monochrome-hairline font-mono text-xs text-gold-muted text-center max-w-md">
            "The spark of curiosity was planted here: the realization that stepping into another culture expands your soul."
          </div>
        </div>
      </div>
    </article>
  );
};

export default ChapterSpain;
