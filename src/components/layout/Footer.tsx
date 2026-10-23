import React from "react";
import { Globe, ArrowUp } from "lucide-react";

/**
 * Platform colophon and philosophical signoff footer.
 */
export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-monochrome-sandstone bg-monochrome-editorialCanvas py-16 px-6 lg:px-12 text-monochrome-ink relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Column */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <div className="w-8 h-8 rounded-full bg-monochrome-ink text-monochrome-pureWhite flex items-center justify-center shadow-sm">
              <Globe className="w-4 h-4" />
            </div>
            <span className="font-serif font-bold text-lg text-monochrome-ink">
              Connect Cultures
            </span>
          </div>

          <p className="font-sans text-xs text-monochrome-inkMuted font-light italic">
            Opening living rooms and sharing tables across borders.
          </p>
        </div>

        {/* Right Column */}
        <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-monochrome-pureWhite border border-monochrome-sandstone hover:border-monochrome-ink text-xs font-mono text-monochrome-ink shadow-sm transition-all"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 text-monochrome-ink" />
          </button>

          <p className="font-mono text-[10px] text-monochrome-inkMuted">
            © {new Date().getFullYear()} ConnectCultures.world • Global Cultural Collective
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
