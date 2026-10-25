import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Search,
} from "lucide-react";
import {
  COMMUNITY_HUB_STRINGS,
  HubListingString,
} from "../../constants/string";

const TABS_DATA = COMMUNITY_HUB_STRINGS.tabs;
const HUB_LISTINGS = COMMUNITY_HUB_STRINGS.listings;
type HubListing = HubListingString;

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

  // Eagerly preload all tab images into browser memory to eliminate switching flash/decode latency
  useEffect(() => {
    TABS_DATA.forEach((tab) => {
      const img = new Image();
      img.src = tab.imageUrl;
    });
  }, []);

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
          <span>{COMMUNITY_HUB_STRINGS.kicker}</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-monochrome-ink mb-3 leading-[1.12]">
          {COMMUNITY_HUB_STRINGS.headline}
        </h2>

        <p className="font-sans text-base sm:text-lg text-monochrome-inkMuted font-light italic leading-relaxed max-w-2xl">
          {COMMUNITY_HUB_STRINGS.subtitle}
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
                          <span>{COMMUNITY_HUB_STRINGS.targetCitiesPrefix} {tab.location}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-7 h-[380px] sm:h-[440px] relative rounded-2xl overflow-hidden border border-monochrome-sandstone shadow-inner bg-monochrome-ink">
            {TABS_DATA.map((tab, idx) => {
              const isSelected = activeTabIdx === idx;
              return (
                <motion.div
                  key={tab.id}
                  initial={false}
                  animate={{
                    opacity: isSelected ? 1 : 0,
                    scale: isSelected ? 1 : 1.025,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute inset-0 w-full h-full ${
                    isSelected ? "pointer-events-auto z-10" : "pointer-events-none z-0"
                  }`}
                  aria-hidden={!isSelected}
                >
                  {/* Background Image */}
                  <img
                    src={tab.imageUrl}
                    alt={tab.title}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />

                  {/* Dark Vignette Overlay for Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-monochrome-ink via-monochrome-ink/30 to-transparent" />

                  {/* Floating Top Tag */}
                  <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-monochrome-pureWhite/90 backdrop-blur-md text-monochrome-ink font-mono text-xs font-semibold shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-monochrome-ink" />
                    <span>{COMMUNITY_HUB_STRINGS.tabBadge}</span>
                  </div>

                  {/* Bottom Content Badge */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-monochrome-pureWhite">
                    <span className="font-mono text-xs text-monochrome-sandstone uppercase tracking-wider block mb-1">
                      {tab.category}
                    </span>
                    <h4 className="font-serif text-2xl sm:text-3xl font-bold mb-2 leading-tight">
                      {tab.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-monochrome-vellum/90 max-w-xl line-clamp-2 leading-relaxed mb-4">
                      {tab.highlight}
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      {tab.offerings.map((tag) => (
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
              );
            })}
          </div>
        </div>
      </div>

      {/* Directory Grid Header & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-serif text-2xl font-bold text-monochrome-ink">
            {COMMUNITY_HUB_STRINGS.directoryHeadline}
          </h3>
          <p className="font-sans text-xs text-monochrome-inkMuted">
            {COMMUNITY_HUB_STRINGS.directorySubtitle}
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-monochrome-inkMuted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={COMMUNITY_HUB_STRINGS.searchPlaceholder}
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
                <span>{COMMUNITY_HUB_STRINGS.cardBadge}</span>
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
                  <span>{COMMUNITY_HUB_STRINGS.applyButton}</span>
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
              <span>{COMMUNITY_HUB_STRINGS.modal.kicker}</span>
            </div>

            <h4 className="font-serif text-2xl font-bold text-monochrome-ink">
              {COMMUNITY_HUB_STRINGS.modal.titlePrefix}{contactModal.location}
            </h4>
            <p className="font-mono text-xs text-monochrome-inkMuted">
              {contactModal.title} • {contactModal.location}, {contactModal.country}
            </p>
            <p className="font-sans text-sm text-monochrome-inkMuted leading-relaxed">
              {COMMUNITY_HUB_STRINGS.modal.description(contactModal.location)}
            </p>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-monochrome-sandstone">
              <button
                type="button"
                onClick={() => setContactModal(null)}
                className="px-4 py-2 rounded-full font-mono text-xs text-monochrome-inkMuted hover:text-monochrome-ink"
              >
                {COMMUNITY_HUB_STRINGS.modal.closeButton}
              </button>
              <a
                href="#community-portal"
                onClick={() => setContactModal(null)}
                className="px-5 py-2 rounded-full bg-monochrome-ink hover:bg-monochrome-ink/90 text-monochrome-pureWhite font-sans text-xs font-semibold transition-all shadow-sm"
              >
                {COMMUNITY_HUB_STRINGS.modal.applyButton}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CommunityHub;
