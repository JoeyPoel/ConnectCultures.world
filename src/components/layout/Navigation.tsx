import React, { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";

interface NavigationProps {
  activeChapterId: string;
  onNavigate: (chapterId: string) => void;
}

const NAV_ITEMS = [
  { id: "vision", label: "Vision", num: "00" },
  { id: "philosophy", label: "Philosophy", num: "01" },
  { id: "founding-story", label: "The Spark", num: "02" },
  { id: "community-hub", label: "Connect Hub", num: "03" },
  { id: "community-stories", label: "Global Voices", num: "04" },
  { id: "community-portal", label: "Join Collective", num: "05" },
];

/**
 * Floating adaptive header component with Connect Cultures branding.
 * Dynamically switches between the Cosmic Dark theme for Section 00 (Vision)
 * and the Luminous White Editorial theme for Section 01 (Philosophy) through Section 05.
 */
export const Navigation: React.FC<NavigationProps> = ({ activeChapterId, onNavigate }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isPastHero, setIsPastHero] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const philEl = document.getElementById("philosophy");
      if (philEl) {
        const rect = philEl.getBoundingClientRect();
        setIsPastHero(rect.top <= 80);
      } else {
        setIsPastHero(window.scrollY >= window.innerHeight - 80);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeChapterId]);

  // Is the current view in the dark hero section (Vision) or the subsequent white sections?
  const isDarkSection = !isPastHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled ? "py-3" : "py-5"
      } ${
        !isDarkSection
          ? "bg-monochrome-editorialCanvas/95 backdrop-blur-md border-b border-monochrome-sandstone shadow-sm"
          : scrolled
          ? "bg-space-void/70 backdrop-blur-md border-b border-transparent shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          type="button"
          onClick={() => onNavigate("vision")}
          className="flex items-center gap-3 group text-left outline-none"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isDarkSection
                ? "bg-space-surface border border-earth-cyan/40 text-earth-cyan group-hover:scale-105 group-hover:border-earth-cyan shadow-glow-cyan"
                : "bg-monochrome-ink text-monochrome-pureWhite border border-monochrome-ink group-hover:scale-105 shadow-sm"
            }`}
          >
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <span
              className={`font-serif font-bold text-base tracking-wide block leading-none transition-colors ${
                isDarkSection ? "text-monochrome-vellum" : "text-monochrome-ink"
              }`}
            >
              Connect Cultures
            </span>
            <span
              className={`font-mono text-[10px] tracking-widest uppercase block mt-0.5 transition-colors ${
                isDarkSection ? "text-earth-cyan" : "text-monochrome-inkMuted"
              }`}
            >
              Global Cultural Collective
            </span>
          </div>
        </button>

        {/* Desktop Chapter Navigation Links */}
        <nav
          className={`hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full transition-all duration-500 ${
            isDarkSection
              ? "bg-space-surface/70 border border-earth-cyan/25 backdrop-blur-md shadow-glow-cyan/10"
              : "bg-monochrome-pureWhite border border-monochrome-sandstone backdrop-blur-md shadow-sm"
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeChapterId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? isDarkSection
                      ? "bg-earth-ocean text-stars-pureWhite font-semibold shadow-glow-cyan"
                      : "bg-monochrome-ink text-monochrome-pureWhite font-semibold shadow-sm"
                    : isDarkSection
                    ? "text-stars-nebula hover:text-stars-starlight hover:bg-space-elevated"
                    : "text-monochrome-inkMuted hover:text-monochrome-ink hover:bg-monochrome-sandstone/60"
                }`}
              >
                <span className="text-[10px] opacity-60">{item.num}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors ${
              isDarkSection
                ? "bg-space-surface border border-stars-hairline text-stars-starlight"
                : "bg-monochrome-pureWhite border border-monochrome-sandstone text-monochrome-ink shadow-sm"
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pt-3 pb-6 max-w-7xl mx-auto">
          <div
            className={`p-4 rounded-2xl backdrop-blur-xl flex flex-col gap-2 transition-all ${
              isDarkSection
                ? "bg-space-abyss/95 border border-stars-hairline shadow-elevation-card"
                : "bg-monochrome-pureWhite border border-monochrome-sandstone shadow-xl"
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeChapterId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs text-left flex items-center justify-between transition-all ${
                    isActive
                      ? isDarkSection
                        ? "bg-earth-ocean text-stars-pureWhite font-semibold"
                        : "bg-monochrome-ink text-monochrome-pureWhite font-semibold"
                      : isDarkSection
                      ? "text-stars-nebula hover:text-stars-starlight bg-space-surface/40"
                      : "text-monochrome-inkMuted hover:text-monochrome-ink bg-monochrome-sandstone/30"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="opacity-60">{item.num}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
