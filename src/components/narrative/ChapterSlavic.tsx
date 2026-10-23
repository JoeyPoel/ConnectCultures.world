import React, { useState } from "react";
import ImageFrame from "../common/ImageFrame";
import { POLISH_PHRASES } from "../../constants/chapters";
import { Compass, Sparkles, Volume2 } from "lucide-react";

/**
 * Chapter 4: The Slavic Heart & The Warsaw Home (Poland & Bulgaria)
 * Features the Studniówka prom in Warsaw, the Black Sea reunion in Varna, and the interactive Polish phrase cards.
 */
export const ChapterSlavic: React.FC = () => {
  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState<number>(2); // Default to "Czuć się jak w domu"

  return (
    <article
      id="chapter-4"
      className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto"
    >
      {/* Chapter Marker Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-amber-flame/20 border border-amber-flame/40 font-mono text-xs text-amber-flame uppercase tracking-wider">
            Chapter 04 • Kinship & Family
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-monochrome-slateMuted">
            <Compass className="w-3.5 h-3.5 text-amber-flame" />
            <span>WARSAW & VARNA • 52.2297° N, 21.0122° E</span>
          </div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-monochrome-vellum leading-tight mb-3">
          The Slavic Heart & The Warsaw Home
        </h2>
        <p className="font-sans text-lg text-amber-flame">
          Studniówka in Warsaw, The Black Sea Reunion, and Bloodless Family
        </p>
      </div>

      {/* Main Chapter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative Copy */}
        <div className="lg:col-span-6 space-y-6 font-sans text-base sm:text-lg text-monochrome-vellum/80 leading-relaxed">
          <p className="font-serif italic text-xl text-monochrome-vellum leading-snug border-l-2 border-amber-flame pl-4">
            "When a cultural bridge is built with genuine love, it never collapses."
          </p>

          <p>
            A five-month romance with a Polish partner opened a rich doorway into Warsaw life that changed my worldview forever.
            I was invited to her traditional <em>Studniówka</em>, the historic hundred-day graduation ball.
          </p>

          <p>
            Dancing the formal Polonaise in a suit alongside Warsaw families, I witnessed firsthand the deep Slavic pride,
            history, and fierce loyalty to family. I fell in love with the language, practicing phrases every day.
          </p>

          <p>
            When that romance concluded, the bridge did not fall. Months later in Varna, Bulgaria on the Black Sea coast,
            I heard a group speaking Polish. I approached with an open smile: <em>"Dzień dobry! Jak się macie?"</em>
          </p>

          <p>
            Their eyes illuminated with pure joy. An immediate bond formed. Weeks later, they invited me to Warsaw.
            I slept on their living room couch, ate at their kitchen table, and was treated not as a guest,
            but as their own son and brother.
          </p>
        </div>

        {/* Right Column: Dual Archival Photos */}
        <div className="lg:col-span-6 space-y-6">
          <ImageFrame
            label="[PHOTO ARCHIVE: THE STUDNIÓWKA FORMAL • EMBRACING POLISH TRADITIONS]"
            coordinates="52.2297° N, 21.0122° E"
            caption="Warsaw, Poland: Dancing the classical Polonaise at the Studniówka"
            aspectRatio="video"
          />

          <ImageFrame
            label="[PHOTO ARCHIVE: ONE WEEK IN A WARSAW APARTMENT • FAMILY OUTSIDE OF BLOOD]"
            coordinates="52.2297° N, 21.0122° E"
            caption="Warsaw living room: Welcomed across foreign borders as family"
            aspectRatio="video"
          />
        </div>
      </div>

      {/* Interactive Polish Phrase Explorer */}
      <div className="mt-16 p-8 rounded-3xl bg-dusk-abyss/85 border border-amber-flame/30 backdrop-blur-xl shadow-elevation-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-monochrome-hairline">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-flame" />
              <h3 className="font-serif text-2xl font-bold text-monochrome-vellum">
                Tactile Polish Phrase Explorer
              </h3>
            </div>
            <p className="font-sans text-sm text-monochrome-slateMuted">
              Click any card to explore the phonetic cadence and cultural weight behind each phrase learned in Warsaw.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {POLISH_PHRASES.map((item, idx) => {
            const isSelected = selectedPhraseIndex === idx;
            return (
              <button
                key={item.phrase}
                type="button"
                onClick={() => setSelectedPhraseIndex(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? "bg-amber-flame/15 border-2 border-amber-flame shadow-glow-amber scale-[1.02]"
                    : "bg-dusk-surface/80 border border-monochrome-hairline hover:border-amber-flame/40 hover:bg-dusk-elevated"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-lg text-monochrome-vellum">
                      {item.phrase}
                    </span>
                    <Volume2
                      className={`w-4 h-4 ${
                        isSelected ? "text-amber-flame" : "text-monochrome-slateMuted"
                      }`}
                    />
                  </div>
                  <p className="font-mono text-xs text-gold-sand italic mb-3">
                    /{item.phonetic}/
                  </p>
                  <p className="font-sans font-medium text-xs text-monochrome-vellum/90 mb-2">
                    "{item.meaning}"
                  </p>
                </div>
                <p className="font-sans text-[11px] text-monochrome-slateMuted leading-snug mt-2 pt-2 border-t border-monochrome-hairline">
                  {item.culturalNote}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default ChapterSlavic;
