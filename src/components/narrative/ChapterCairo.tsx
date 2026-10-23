import React, { useState, useRef } from "react";
import ImageFrame from "../common/ImageFrame";
import { Compass, Music, Play, Pause, Navigation } from "lucide-react";

/**
 * Chapter 2: The Leap & The Sacred Chaos (Barcelona & Cairo)
 * Features the first solo expedition to Barcelona at 20, the spontaneous Cairo wedding,
 * and the interactive darbuka rhythm wave visualizer.
 */
export const ChapterCairo: React.FC = () => {
  const [isPlayingRhythm, setIsPlayingRhythm] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rhythmIntervalRef = useRef<number | null>(null);

  /**
   * Generates a rhythmic Egyptian darbuka / tabla beat pattern using Web Audio synthesis.
   */
  const toggleEgyptianRhythm = () => {
    if (isPlayingRhythm) {
      if (rhythmIntervalRef.current) {
        clearInterval(rhythmIntervalRef.current);
        rhythmIntervalRef.current = null;
      }
      setIsPlayingRhythm(false);
      return;
    }

    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = audioCtxRef.current || new AudioCtx();
    audioCtxRef.current = ctx;
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    setIsPlayingRhythm(true);

    let step = 0;
    // Maqsum rhythm pattern
    const pattern = [true, false, true, false, false, true, false, true];

    const playDrumHit = (isDum: boolean) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.frequency.setValueAtTime(isDum ? 110 : 380, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isDum ? 45 : 120, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(isDum ? 0.28 : 0.16, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    };

    rhythmIntervalRef.current = window.setInterval(() => {
      const isHit = pattern[step % pattern.length];
      if (isHit) {
        playDrumHit(step % 4 === 0);
      }
      step++;
    }, 180);
  };

  return (
    <article
      id="chapter-2"
      className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto"
    >
      {/* Chapter Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-gold-sand/20 border border-gold-sand/40 font-mono text-xs text-gold-shimmer uppercase tracking-wider">
            Chapter 02 • Solo Immersion
          </span>
          <div className="flex items-center gap-1.5 font-mono text-xs text-monochrome-slateMuted">
            <Compass className="w-3.5 h-3.5 text-gold-sand" />
            <span>BARCELONA & CAIRO • 41.3879° N → 30.0444° N</span>
          </div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-monochrome-vellum leading-tight mb-3">
          The Leap & The Sacred Chaos
        </h2>
        <p className="font-sans text-lg text-gold-sand">
          First Solo Flight to Barcelona at 20, Desert Heat, and The Cairo Wedding Circle
        </p>
      </div>

      {/* Chapter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Image Frame & Rhythm Trigger */}
        <div className="lg:col-span-6 flex flex-col items-center order-2 lg:order-1">
          <ImageFrame
            label="[PHOTO ARCHIVE: SOLO IN BARCELONA & THE CAIRO WEDDING CIRCLE]"
            coordinates="41.3879° N, 2.1699° E & 30.0444° N, 31.2357° E"
            caption="Cairo courtyard: Where language dissolved into rhythm and hospitality"
            aspectRatio="video"
            className="w-full max-w-lg"
          />

          {/* Interactive Rhythm Audio Visualizer Widget */}
          <div className="mt-6 w-full max-w-lg p-5 rounded-2xl bg-dusk-abyss/80 border border-gold-sand/30 backdrop-blur-md shadow-elevation-card flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleEgyptianRhythm}
                aria-label={isPlayingRhythm ? "Pause Cairo rhythm" : "Play Cairo rhythm"}
                className="w-12 h-12 rounded-full bg-gold-sand/20 hover:bg-gold-sand/30 border border-gold-sand/60 flex items-center justify-center text-gold-shimmer transition-transform active:scale-95 shadow-glow-gold"
              >
                {isPlayingRhythm ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-gold-sand font-medium">
                  Cairo Courtyard Darbuka
                </p>
                <p className="font-sans text-xs text-monochrome-slateMuted">
                  {isPlayingRhythm ? "Rhythmic darbuka cadence playing" : "Click to experience the wedding pulse"}
                </p>
              </div>
            </div>

            {/* Live Waveform Bars */}
            <div className="flex items-end gap-1 h-8">
              {[40, 75, 55, 90, 60, 85, 45].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-200 ${
                    isPlayingRhythm
                      ? "bg-gold-sand animate-wave-bar"
                      : "bg-monochrome-slateMuted/30"
                  }`}
                  style={{
                    height: isPlayingRhythm ? `${h}%` : "30%",
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Body & Quote Card */}
        <div className="lg:col-span-6 space-y-6 font-sans text-base sm:text-lg text-monochrome-vellum/80 leading-relaxed order-1 lg:order-2">
          {/* Cultural Lesson Quote Card */}
          <div className="p-6 rounded-2xl bg-dusk-surface/90 border border-gold-sand/30 shadow-elevation-card">
            <div className="flex items-center gap-2 mb-2">
              <Music className="w-4 h-4 text-gold-sand" />
              <span className="font-mono text-xs text-gold-sand uppercase tracking-wider">
                Universal Frequency
              </span>
            </div>
            <p className="font-serif italic text-2xl text-monochrome-vellum font-semibold">
              "Language is the smallest part of human understanding."
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dusk-surface/70 border border-monochrome-hairline flex items-center gap-3 font-mono text-xs text-gold-sand">
            <Navigation className="w-4 h-4 text-terracotta-glow" />
            <span>Age 20 Solo Milestone: Barcelona, Catalonia (First independent voyage)</span>
          </div>

          <p>
            At age twenty, I bought a solo ticket to Barcelona. Navigating the streets of Catalonia alone,
            ordering meals with broken phrases, and getting lost down Gothic alleys proved that independence
            is born the moment you shed familiarity.
          </p>

          <p>
            That solo confidence propelled me deeper into the unknown: boarding a flight to Cairo.
            Cairo was electricity, heat, and antiquity. Wandering through a residential neighborhood far from the museum
            circuits, the percussive thunder of a darbuka drum led me into a brightly lit courtyard.
          </p>

          <p>
            An authentic Egyptian local wedding was underway. I expected to be turned away as an outsider.
            Instead, two young Egyptian men locked eyes with me, smiled widely, grabbed my hands, and pulled me directly
            into the center of the ring.
          </p>

          <p>
            We danced for hours under strings of bulbs. Tea and sweets were pressed into my hands.
            Without a single shared spoken language, we understood each other completely.
          </p>
        </div>
      </div>
    </article>
  );
};

export default ChapterCairo;
