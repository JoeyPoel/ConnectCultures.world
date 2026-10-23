import React from "react";
import { ShieldCheck, HeartHandshake, Home, Compass, MessageCircle, Utensils } from "lucide-react";

/**
 * Company Mission & Vision Section.
 * Crisp, punchy presentation of what Connect Cultures builds.
 */
export const MissionSection: React.FC = () => {
  const pillars = [
    {
      title: "Open Living Rooms",
      tagline: "Sleep in local homes, not hotel corridors.",
      icon: <Home className="w-5 h-5 text-earth-cyan" />,
      tag: "Homestay Network",
    },
    {
      title: "Immersive Journeys",
      tagline: "Travel to understand, not to take photos.",
      icon: <Compass className="w-5 h-5 text-earth-atmosphere" />,
      tag: "Deep Travel",
    },
    {
      title: "Unfiltered Archives",
      tagline: "Raw accounts where strangers became family.",
      icon: <MessageCircle className="w-5 h-5 text-earth-cyan" />,
      tag: "True Stories",
    },
    {
      title: "Communal Kitchens",
      tagline: "Trade mother tongues over homemade bread.",
      icon: <Utensils className="w-5 h-5 text-earth-sun" />,
      tag: "Food & Language",
    },
  ];

  return (
    <section id="mission" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-earth-ocean/20 border border-earth-cyan/40 font-mono text-xs text-earth-cyan uppercase tracking-wider mb-3">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>The Mission</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stars-starlight mb-3">
          What We Do.
        </h2>

        <p className="font-sans text-base sm:text-lg text-stars-nebula">
          Prejudice cannot survive a shared meal.
        </p>
      </div>

      {/* The 4 Core Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="p-7 rounded-3xl bg-space-surface/80 border border-stars-hairline hover:border-earth-cyan/50 backdrop-blur-md transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-space-elevated border border-stars-hairline group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>
                <span className="font-mono text-[10px] text-earth-cyan uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-space-void border border-stars-hairline">
                  {pillar.tag}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-stars-starlight mb-2">
                {pillar.title}
              </h3>

              <p className="font-sans text-sm text-stars-nebula leading-relaxed">
                {pillar.tagline}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-stars-hairline flex items-center gap-1.5 font-mono text-[11px] text-earth-cyan">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Worldwide</span>
            </div>
          </div>
        ))}
      </div>

      {/* Accomplishment Targets */}
      <div className="p-8 sm:p-10 rounded-3xl bg-space-surface/60 border border-stars-hairline shadow-elevation-card grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <p className="font-serif text-3xl sm:text-4xl font-bold text-earth-cyan mb-1">GLOBAL</p>
          <p className="font-sans text-sm text-stars-starlight font-medium">Open Homes</p>
          <p className="font-mono text-xs text-stars-nebula">Across the globe</p>
        </div>

        <div className="border-y md:border-y-0 md:border-x border-stars-hairline py-4 md:py-0">
          <p className="font-serif text-3xl sm:text-4xl font-bold text-stars-starlight mb-1">HUMAN</p>
          <p className="font-sans text-sm text-stars-starlight font-medium">Independent Fellowship</p>
          <p className="font-mono text-xs text-stars-nebula">No tourist traps</p>
        </div>

        <div>
          <p className="font-serif text-3xl sm:text-4xl font-bold text-earth-atmosphere mb-1">WORLDWIDE</p>
          <p className="font-sans text-sm text-stars-starlight font-medium">Cultural Kinship</p>
          <p className="font-mono text-xs text-stars-nebula">One living room at a time</p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
