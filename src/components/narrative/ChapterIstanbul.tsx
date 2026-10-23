import React, { useState } from "react";
import ImageFrame from "../common/ImageFrame";
import { Compass, BookOpen, ChevronRight, ChevronLeft } from "lucide-react";

const REFLECTION_EXCERPTS = [
  {
    topic: "Hospitality & The Stranger",
    verse: "Do good to parents, kinsfolk, orphans, the poor, the neighbor who is near of kin, the neighbor who is a stranger, the companion by your side, the wayfarer...",
    reflection: "In the Islamic tradition, the wayfarer is not an outsider to be guarded against, but a soul sent by the divine to test your capacity for generous love.",
  },
  {
    topic: "Peace & Shared Humanity",
    verse: "O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another.",
    reflection: "Diversity is intentional. The purpose of distinct cultures is not collision or conquest, but mutual recognition and learning.",
  },
  {
    topic: "Patience & Compassion",
    verse: "And the servants of the Most Merciful are those who walk upon the earth easily, and when the ignorant address them, they say words of peace.",
    reflection: "Stepping beyond personal biases demands walking with gentleness upon the earth, seeking common ground across sacred courtyards.",
  },
];

/**
 * Chapter 3: The Courtyards of Istanbul & Hagia Sophia (Turkey)
 * Features mosque visits, the encounter inside Hagia Sophia, and the interactive Pages of Reflection reader.
 */
export const ChapterIstanbul: React.FC = () => {
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  const activePage = REFLECTION_EXCERPTS[activePageIndex];

  return (
    <article
      id="chapter-3"
      className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto"
    >
      {/* Chapter Marker Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-azure-dome/20 border border-azure-dome/40 font-mono text-xs text-azure-mist uppercase tracking-wider">
            Chapter 03
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-monochrome-slateMuted">
            <Compass className="w-3.5 h-3.5 text-azure-dome" />
            <span>HAGIA SOPHIA • 41.0086° N, 28.9802° E</span>
          </div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-monochrome-vellum leading-tight mb-3">
          The Courtyards of Istanbul & Hagia Sophia
        </h2>
        <p className="font-sans text-lg text-azure-mist">
          Sacred Thresholds, Shared Brotherhood, and The First Quran
        </p>
      </div>

      {/* Main Chapter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Narrative Copy */}
        <div className="lg:col-span-6 space-y-6 font-sans text-base sm:text-lg text-monochrome-vellum/80 leading-relaxed">
          <p className="font-serif italic text-xl text-monochrome-vellum leading-snug border-l-2 border-azure-dome pl-4">
            "Faith, hospitality, and patience transcend every border."
          </p>

          <p>
            I traveled to Istanbul alongside a close Turkish-Dutch companion. Though his ancestry ran deep through
            Anatolian soil, he had never once set foot in his family's homeland. We experienced the city together: a
            son returning to ancestral ground, and a Dutch friend walking beside him.
          </p>

          <p>
            We removed our shoes before every courtyard. We stepped onto soft wool carpets, inhaled the scent of rose water,
            and listened to the Azan echo across the Bosphorus strait. I was not there as a critical spectator;
            I was welcomed with open arms as an honored brother.
          </p>

          <p>
            At Hagia Sophia, we navigated through three strict security layers and customs gates ordinarily closed
            to outside visitors. Inside, beneath monumental Byzantine golden mosaics and Arabic calligraphy shields,
            I met a female Islamic scholar.
          </p>

          <p>
            We sat together on the floor for hours, discussing faith, morality, and our shared human kinship.
            Before parting ways, she gifted me my first Quran. That book remains on my desk in the Netherlands,
            and I continue to read and meditate upon its wisdom to this day.
          </p>
        </div>

        {/* Right Column: Image Frame & Pages of Reflection */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <ImageFrame
            label="[PHOTO ARCHIVE: UNDER THE DOMES OF ISTANBUL • RECEIVING THE SACRED TEXT]"
            coordinates="41.0086° N, 28.9802° E"
            caption="Hagia Sophia, Istanbul: The meeting that broke religious prejudice"
            aspectRatio="video"
            className="w-full max-w-lg mb-6"
          />

          {/* Interactive Pages of Reflection Widget */}
          <div className="w-full max-w-lg p-6 rounded-2xl bg-dusk-surface/90 border border-azure-dome/40 backdrop-blur-md shadow-elevation-card relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-monochrome-hairline">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-azure-mist" />
                <span className="font-mono text-xs uppercase tracking-wider text-azure-mist">
                  Pages of Reflection
                </span>
              </div>
              <span className="font-mono text-xs text-monochrome-slateMuted">
                {activePageIndex + 1} of {REFLECTION_EXCERPTS.length}
              </span>
            </div>

            <p className="font-serif font-semibold text-lg text-gold-shimmer mb-2">
              {activePage.topic}
            </p>

            <blockquote className="p-3.5 rounded-xl bg-dusk-void/70 border border-monochrome-hairline font-serif italic text-sm text-monochrome-vellum leading-relaxed mb-3">
              "{activePage.verse}"
            </blockquote>

            <p className="font-sans text-xs text-monochrome-slateMuted leading-relaxed mb-4">
              {activePage.reflection}
            </p>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() =>
                  setActivePageIndex((prev) => (prev > 0 ? prev - 1 : REFLECTION_EXCERPTS.length - 1))
                }
                className="p-1.5 rounded-lg bg-dusk-elevated text-monochrome-vellum hover:text-azure-mist hover:bg-dusk-surface transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5">
                {REFLECTION_EXCERPTS.map((_, i) => (
                  <span
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === activePageIndex ? "bg-azure-dome" : "bg-monochrome-slateMuted/30"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setActivePageIndex((prev) => (prev < REFLECTION_EXCERPTS.length - 1 ? prev + 1 : 0))
                }
                className="p-1.5 rounded-lg bg-dusk-elevated text-monochrome-vellum hover:text-azure-mist hover:bg-dusk-surface transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ChapterIstanbul;
