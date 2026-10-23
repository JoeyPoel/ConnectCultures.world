import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Search,
} from "lucide-react";

interface TabItem {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  location: string;
  highlight: string;
  imageUrl: string;
  offerings: string[];
}

const TABS_DATA: TabItem[] = [
  {
    id: "homestays",
    num: "01",
    title: "Living Room Homestays",
    category: "Overnight Sanctuary",
    description:
      "Stay in authentic family homes without commercial tourist insulation. Sleep in guest rooms overlooking historic alleys, wake up to grandmother's coffee, and live alongside local hosts who open their doors in genuine hospitality.",
    location: "Warsaw, Benidorm, Varna",
    highlight: "Free cultural exchange & private room access in authentic local homes.",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    offerings: ["Private Guest Room", "Language Exchange", "Home Breakfast"],
  },
  {
    id: "dinners",
    num: "02",
    title: "Communal Kitchen Dinners",
    category: "Table Fellowship",
    description:
      "Every prejudice dissolves at the kitchen table. Gather with 6 to 10 travelers and local residents for multi-course meals prepared together from ancestral recipes, from Moroccan tagines to Dutch apple pie.",
    location: "Cairo, Amsterdam, Oaxaca",
    highlight: "Home-cooked dishes, storytelling circles, and unfiltered dialogue.",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    offerings: ["Cooking Together", "Ancestral Recipes", "Shared Wine & Tea"],
  },
  {
    id: "salons",
    num: "03",
    title: "Story Salons & Open Circles",
    category: "Dialogue & Roots",
    description:
      "Intimate evening gatherings hosted in rooftop gardens, historic courtyards, and local living rooms. Members unpack family lore, cultural identity, and honest perspectives over hot tea and music.",
    location: "Istanbul, Ronda, Kyoto",
    highlight: "Deep listening, sacred respect, and no tourist platitudes.",
    imageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
    offerings: ["Acoustic Music", "Cay & Sweets", "Intimate Reflection"],
  },
  {
    id: "craft",
    num: "04",
    title: "Artisanal & Culinary Swaps",
    category: "Hands-On Tradition",
    description:
      "Learn regional traditions directly from master elders. Carve cedarwood in the medina, knead festive breads, or hand-throw terracotta vessels while trading idioms and understanding the generational patience behind the craft.",
    location: "Fes, Seville, Zakopane",
    highlight: "Tactile heritage passed down through generations.",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    offerings: ["Master Mentorship", "Ancestral Tools", "Take-Home Creation"],
  },
];

interface HubListing {
  id: string;
  type: "host" | "salon" | "dinner";
  title: string;
  host: string;
  location: string;
  country: string;
  dateOrAvailability: string;
  description: string;
  capacityOrVibe: string;
  offerings: string[];
  imageUrl: string;
}

const HUB_LISTINGS: HubListing[] = [
  {
    id: "hub-1",
    type: "host",
    title: "Old Town Guest Room Blueprint",
    host: "Seeking Warsaw Host",
    location: "Warsaw",
    country: "Poland",
    dateOrAvailability: "Day Zero Horizon",
    description: "Our blueprint for historic pre-war living rooms. Making pierogi from scratch and learning conversational Polish around the family kitchen table.",
    capacityOrVibe: "Host Blueprint • Kitchen Table",
    offerings: ["Pierogi Workshop", "Old Town Walk", "Family Dinner"],
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hub-2",
    type: "host",
    title: "Mediterranean Terrace Blueprint",
    host: "Seeking Costa Blanca Host",
    location: "Benidorm",
    country: "Spain",
    dateOrAvailability: "Day Zero Horizon",
    description: "Our blueprint for coastal home living. Midnight paella, local wine, and multi-generational storytelling under Iberian stars.",
    capacityOrVibe: "Host Blueprint • Family Hearth",
    offerings: ["Midnight Paella", "Terrace Sunset", "Village Stories"],
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hub-3",
    type: "dinner",
    title: "Nile Courtyard Drums Blueprint",
    host: "Seeking Cairo Host",
    location: "Cairo",
    country: "Egypt",
    dateOrAvailability: "Day Zero Horizon",
    description: "Our blueprint for communal street and courtyard hospitality. Steaming koshari, fresh mint tea, and live darbuka hand-drum rhythms.",
    capacityOrVibe: "Dinner Blueprint • Percussion",
    offerings: ["Live Darbuka", "Fresh Mint Tea", "Courtyard Circle"],
    imageUrl: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hub-4",
    type: "salon",
    title: "Bosphorus Crossroads Blueprint",
    host: "Seeking Istanbul Host",
    location: "Istanbul",
    country: "Turkey",
    dateOrAvailability: "Day Zero Horizon",
    description: "Our blueprint for intimate Kadikoy evening circles discussing faith, family traditions, and stepping past stereotypes over Turkish tea.",
    capacityOrVibe: "Salon Blueprint • Open Circle",
    offerings: ["Cay Ritual", "Philosophical Dialogue", "Chestnut Roasting"],
    imageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=800&q=80",
  },
];

/**
 * Section 02: Connect Hub featuring the Framer Tabs-Card architecture.
 * - Interactive 4-tab card with smooth spring animated height, description expansion, and image crossfades
 * - Responsive layout transitioning from desktop 2-column showcase to mobile stack
 * - Full zero-hex compliance
 */
export const CommunityHub: React.FC = () => {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [contactModal, setContactModal] = useState<HubListing | null>(null);

  const activeTab = TABS_DATA[activeTabIdx];

  const filteredListings = HUB_LISTINGS.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.country.toLowerCase().includes(q) ||
      item.host.toLowerCase().includes(q)
    );
  });

  return (
    <section id="community-hub" className="scroll-mt-0 py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-monochrome-inkMuted mb-4">
          <span className="w-8 h-[1.5px] bg-monochrome-ink inline-block" />
          <span>THE ARCHITECTURAL BLUEPRINT • CONNECT HUB</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-monochrome-ink mb-3 leading-[1.12]">
          What We Are Building.
        </h2>

        <p className="font-sans text-base sm:text-lg text-monochrome-inkMuted font-light italic leading-relaxed max-w-2xl">
          Four intimate pathways into authentic local living we are setting out to accomplish. We are actively searching for our founding hosts across the globe to ignite these rooms.
        </p>
      </div>

      {/* =========================================================================
          THE FRAMER TABS-CARD COMPONENT (Inspired by Tabs-card-f58s7K)
         ========================================================================= */}
      <div className="p-4 sm:p-6 lg:p-8 rounded-[32px] bg-monochrome-pureWhite border border-monochrome-sandstone shadow-md mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
          {/* Left Column: Interactive Vertical Tabs */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-2">
            {TABS_DATA.map((tab, idx) => {
              const isActive = activeTabIdx === idx;

              return (
                <div
                  key={tab.id}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 relative ${
                    isActive
                      ? "bg-monochrome-editorialCanvas/80 border border-monochrome-sandstone shadow-sm"
                      : "hover:bg-monochrome-editorialCanvas/40 border border-transparent"
                  }`}
                >
                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute left-0 top-3 bottom-3 w-1 bg-monochrome-ink rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-monochrome-inkMuted font-semibold">
                        {tab.num}
                      </span>
                      <h3
                        className={`font-serif text-lg sm:text-xl transition-colors ${
                          isActive
                            ? "font-bold text-monochrome-ink"
                            : "font-normal text-monochrome-inkMuted hover:text-monochrome-ink"
                        }`}
                      >
                        {tab.title}
                      </h3>
                    </div>

                    <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone text-monochrome-inkMuted shrink-0">
                      {tab.category}
                    </span>
                  </div>

                  {/* Expanded Description Accordion for Active Tab */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-xs sm:text-sm text-monochrome-inkMuted leading-relaxed pt-3 pr-2">
                          {tab.description}
                        </p>

                        <div className="flex items-center gap-2 pt-3 text-[11px] font-mono text-monochrome-ink">
                          <MapPin className="w-3.5 h-3.5 text-monochrome-ink" />
                          <span>Target Cities: {tab.location}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-7 h-[380px] sm:h-[440px] relative rounded-2xl overflow-hidden border border-monochrome-sandstone shadow-inner bg-monochrome-sandstone">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Background Image */}
                <img
                  src={activeTab.imageUrl}
                  alt={activeTab.title}
                  className="w-full h-full object-cover"
                />

                {/* Dark Vignette Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-monochrome-ink via-monochrome-ink/25 to-transparent" />

                {/* Floating Top Tag */}
                <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-monochrome-pureWhite/90 backdrop-blur-md text-monochrome-ink font-mono text-xs font-semibold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-monochrome-ink" />
                  <span>Format Blueprint • Seeking Founding Hosts</span>
                </div>

                {/* Bottom Content Badge */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-monochrome-pureWhite">
                  <span className="font-mono text-xs text-monochrome-sandstone uppercase tracking-wider block mb-1">
                    {activeTab.category} • Blueprint Horizon
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold mb-2 leading-tight">
                    {activeTab.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-monochrome-vellum/90 max-w-xl line-clamp-2 leading-relaxed mb-4">
                    {activeTab.highlight}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {activeTab.offerings.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-monochrome-pureWhite/20 backdrop-blur-md text-[11px] font-mono text-monochrome-pureWhite"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Directory Grid Header & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-serif text-2xl font-bold text-monochrome-ink">
            Pioneer Host Blueprints
          </h3>
          <p className="font-sans text-xs text-monochrome-inkMuted">
            The inaugural experiences we are architecting. We are recruiting our pioneer hosts to ignite these cities.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-monochrome-inkMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city, format, or country..."
            className="w-full pl-9 pr-3 py-2 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone text-monochrome-ink placeholder:text-monochrome-inkMuted/50 text-xs font-sans focus:border-monochrome-ink outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredListings.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl bg-monochrome-pureWhite border border-monochrome-sandstone hover:border-monochrome-ink/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
          >
            <div className="relative h-40 w-full overflow-hidden bg-monochrome-sandstone">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-monochrome-pureWhite/95 backdrop-blur-md border border-monochrome-sandstone font-mono text-[9px] uppercase font-semibold text-monochrome-ink shadow-sm">
                <Sparkles className="w-2.5 h-2.5 text-monochrome-ink" />
                <span>Pioneer Blueprint</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-mono text-[11px] text-monochrome-inkMuted mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-monochrome-ink" />
                  <span>{item.location}, {item.country}</span>
                </p>

                <h4 className="font-serif font-bold text-base text-monochrome-ink mb-1 group-hover:text-monochrome-ink/80 transition-colors">
                  {item.title}
                </h4>

                <p className="font-sans text-xs text-monochrome-inkMuted leading-relaxed mb-3 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-monochrome-sandstone flex items-center justify-between">
                <span className="font-mono text-[10px] text-monochrome-inkMuted">
                  {item.host}
                </span>

                <button
                  type="button"
                  onClick={() => setContactModal(item)}
                  className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-monochrome-ink hover:opacity-75 transition-opacity"
                >
                  <span>Apply to Host</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Connect Modal Prompt */}
      {contactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-monochrome-ink/50 backdrop-blur-md">
          <div className="p-8 rounded-3xl bg-monochrome-pureWhite border border-monochrome-sandstone max-w-md w-full shadow-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-monochrome-editorialCanvas border border-monochrome-sandstone font-mono text-[10px] uppercase text-monochrome-ink font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Founding Pioneer Host Callout</span>
            </div>

            <h4 className="font-serif text-2xl font-bold text-monochrome-ink">
              Bring This to {contactModal.location}
            </h4>
            <p className="font-mono text-xs text-monochrome-inkMuted">
              {contactModal.title} • {contactModal.location}, {contactModal.country}
            </p>
            <p className="font-sans text-sm text-monochrome-inkMuted leading-relaxed">
              This experience is our blueprint for {contactModal.location}. We are searching for our founding host in this city to welcome travelers and open this hearth. If you want to open your home, kitchen, or salon, register your interest below.
            </p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-monochrome-sandstone">
              <button
                type="button"
                onClick={() => setContactModal(null)}
                className="px-4 py-2 rounded-full font-mono text-xs text-monochrome-inkMuted hover:text-monochrome-ink"
              >
                Close
              </button>
              <a
                href="#community-portal"
                onClick={() => setContactModal(null)}
                className="px-5 py-2 rounded-full bg-monochrome-ink hover:bg-monochrome-ink/90 text-monochrome-pureWhite font-sans text-xs font-semibold transition-all shadow-sm"
              >
                Apply as Founding Host
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunityHub;
