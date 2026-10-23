import React from "react";
import JoinForm from "./JoinForm";
import { Users, Globe2, Home, Sparkles } from "lucide-react";

/**
 * Chapter 5: "Take The Step" Community Gateway.
 * Concise, high-impact presentation of the worldwide fellowship.
 */
export const CommunityPortal: React.FC = () => {

  return (
    <section
      id="community-portal"
      className="py-24 px-6 lg:px-12 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col items-center mb-14 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone font-mono text-xs text-monochrome-ink uppercase tracking-wider mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-monochrome-ink" />
          <span>THE GATEWAY • DAY ZERO HORIZON</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-monochrome-ink mb-3 tracking-tight">
          Take The Step.
        </h2>
        <p className="font-sans text-base sm:text-lg text-monochrome-inkMuted font-light italic max-w-2xl leading-relaxed">
          We don't have active events running yet. We are recruiting our pioneer hosts and founding fellows to turn this living blueprint into reality. Claim your pass and step forward.
        </p>
      </div>

      {/* Day Zero Founding Horizon Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        <div className="p-6 rounded-3xl bg-monochrome-pureWhite border border-monochrome-sandstone text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center text-monochrome-ink mb-2">
            <Users className="w-5 h-5" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-monochrome-ink mb-1">
            DAY ZERO
          </p>
          <p className="font-mono text-xs text-monochrome-inkMuted uppercase">Launch Phase</p>
        </div>

        <div className="p-6 rounded-3xl bg-monochrome-pureWhite border border-monochrome-sandstone text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center text-monochrome-ink mb-2">
            <Globe2 className="w-5 h-5" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-monochrome-ink mb-1">
            WORLDWIDE
          </p>
          <p className="font-mono text-xs text-monochrome-inkMuted uppercase">Global Horizon</p>
        </div>

        <div className="p-6 rounded-3xl bg-monochrome-pureWhite border border-monochrome-sandstone text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center text-monochrome-ink mb-2">
            <Home className="w-5 h-5" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-monochrome-ink mb-1">
            PIONEER
          </p>
          <p className="font-mono text-xs text-monochrome-inkMuted uppercase">Founding Hosts Call</p>
        </div>

        <div className="p-6 rounded-3xl bg-monochrome-pureWhite border border-monochrome-sandstone text-center shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-center text-monochrome-ink mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-bold text-monochrome-ink mb-1">
            AUTHENTIC
          </p>
          <p className="font-mono text-xs text-monochrome-inkMuted uppercase">Lived Truth</p>
        </div>
      </div>

      {/* Main Form & Live Fellowship Pass Layout */}
      <div className="max-w-5xl mx-auto">
        <JoinForm />
      </div>
    </section>
  );
};

export default CommunityPortal;
