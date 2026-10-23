import React, { useState, useEffect, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AmbientAudioProps {
  className?: string;
}

/**
 * Ambient Audio system controller.
 * Generates an organic twilight drone (Dusk drone in D Minor with warm nylon guitar overtone resonance)
 * using Web Audio API with smooth ramp-in/ramp-out volume transitions.
 */
export const AmbientAudio: React.FC<AmbientAudioProps> = ({ className = "" }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.35);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // Initialize or resume AudioContext
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const master = ctx.createGain();
      master.gain.setValueAtTime(0, ctx.currentTime);
      master.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = master;

      // Base warm drones (D2 = 73.42Hz, A2 = 110Hz, D3 = 146.83Hz, F3 = 174.61Hz)
      const frequencies = [73.42, 110.0, 146.83, 174.61];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Lowpass filter to ensure deep warmth without harshness
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320 + idx * 80, ctx.currentTime);

        // Gentle volume distribution
        oscGain.gain.setValueAtTime(0.08 / (idx + 1), ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(master);

        osc.start();
        oscillatorsRef.current.push(osc);
      });
    }

    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);

  const togglePlayback = () => {
    initAudio();

    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const gain = masterGainRef.current;

    if (isPlaying) {
      // Smooth fade out
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
      setIsPlaying(false);
    } else {
      // Smooth fade in
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);
      setIsPlaying(true);
      playGuitarResonance();
    }
  };

  /**
   * Triggers a warm acoustic nylon guitar chord pluck.
   */
  const playGuitarResonance = () => {
    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;
    const chord = [146.83, 220.0, 261.63, 329.63]; // Dm9 voicing

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);
      filter.Q.setValueAtTime(2.5, ctx.currentTime);

      const startTime = ctx.currentTime + i * 0.04;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.09, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current!);

      osc.start(startTime);
      osc.stop(startTime + 2.6);
    });
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Mute ambient audio" : "Play ambient audio"}
        className="group relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-dusk-surface/80 border border-monochrome-hairline hover:border-terracotta-base/60 backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-glow-terracotta"
      >
        <span className="relative flex h-2 w-2">
          {isPlaying && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terracotta-glow opacity-75" />
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isPlaying ? "bg-terracotta-glow" : "bg-monochrome-slateMuted/50"
            }`}
          />
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-terracotta-glow transition-colors" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-monochrome-slateMuted group-hover:text-monochrome-vellum transition-colors" />
        )}

        <span className="text-xs font-mono tracking-wider uppercase text-monochrome-vellum/80 group-hover:text-monochrome-vellum">
          {isPlaying ? "Dusk Soundscape" : "Audio Muted"}
        </span>
      </button>

      {isPlaying && (
        <input
          type="range"
          min="0"
          max="0.8"
          step="0.05"
          value={volume}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            setVolume(val);
            if (audioCtxRef.current && masterGainRef.current) {
              masterGainRef.current.gain.setValueAtTime(val, audioCtxRef.current.currentTime);
            }
          }}
          aria-label="Audio volume"
          className="w-16 h-1 accent-terracotta-base bg-dusk-surface rounded-lg appearance-none cursor-pointer"
        />
      )}
    </div>
  );
};

export default AmbientAudio;
