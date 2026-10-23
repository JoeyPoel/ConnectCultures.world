import React, { useCallback } from "react";
import TerraDusk from "./components/originkit/TerraDusk";
import GrainOverlay from "./components/common/GrainOverlay";
import SoftDivider from "./components/common/SoftDivider";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/hero/HeroSection";
import PhilosophySection from "./components/company/PhilosophySection";
import CommunityHub from "./components/community/CommunityHub";
import CulturalStoryStream from "./components/community/CulturalStoryStream";
import FoundingStorySection from "./components/story/FoundingStorySection";
import CommunityPortal from "./components/community/CommunityPortal";
import { useScrollSpy } from "./hooks/useScrollSpy";

const SECTION_IDS = [
  "vision",
  "philosophy",
  "founding-story",
  "community-hub",
  "community-stories",
  "community-portal",
];

/**
 * Connect Cultures master application layout.
 * Dedicated to company vision, global community connections, and 1 consolidated founding journey section.
 */
export const App: React.FC = () => {
  const activeChapterId = useScrollSpy(SECTION_IDS, 0.3);

  const handleNavigateToChapter = useCallback((sectionId: string) => {
    if (sectionId === "vision") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-dusk-void text-monochrome-vellum font-sans selection:bg-terracotta-base/35 selection:text-monochrome-vellum overflow-x-clip">
      {/* Living Atmospheric Canvas Layers */}
      <TerraDusk intensity="high" />
      <GrainOverlay />

      {/* Floating Glass Navigation Header */}
      <Navigation
        activeChapterId={activeChapterId}
        onNavigate={handleNavigateToChapter}
      />

      {/* Main Experience Stream */}
      <main className="relative z-10">
        {/* 00. Hero Section: Sticky Full-Screen Viewport in Deep Space & 3D Earth Globe */}
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
          <HeroSection
            onExploreChapter={handleNavigateToChapter}
          />
        </div>

        {/* 01-05. The Human Editorial Canvas (Full-Screen Curtain Takeover from Dark Universe) */}
        <div className="relative z-20 bg-monochrome-editorialCanvas text-monochrome-ink rounded-t-[48px] sm:rounded-t-[72px] border-t border-monochrome-sandstone shadow-[0_-50px_100px_rgba(0,0,0,0.95)]">
          {/* 01. The Philosophy: Culture Shouldn't Feel Like A Foreign Barrier */}
          <PhilosophySection
            onExploreStory={() => handleNavigateToChapter("founding-story")}
            onExploreCommunity={() => handleNavigateToChapter("community-hub")}
          />

          <SoftDivider />

          {/* 02. The Spark: Joey's Personal Journey in 1 Interactive Section */}
          <FoundingStorySection
            onExploreCommunity={() => handleNavigateToChapter("community-hub")}
          />

          <SoftDivider />

          {/* 03. Community Hub: Connect with Hosts, Dinners, and Salons */}
          <CommunityHub />

          <SoftDivider />

          {/* 04. Global Community Voices: Real Stories Across Borders */}
          <CulturalStoryStream />

          <SoftDivider />

          {/* 05. The Gateway: Join The Global Collective */}
          <CommunityPortal />

          {/* Colophon & Signoff */}
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default App;
