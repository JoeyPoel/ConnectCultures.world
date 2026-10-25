import React, { useCallback } from "react";
import SiteLoader from "./components/common/SiteLoader";
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
    <div className="relative min-h-screen bg-monochrome-editorialCanvas text-monochrome-ink font-sans selection:bg-terracotta-base/35 selection:text-monochrome-vellum overflow-x-clip">
      {/* Cinematic Earth Particle Gimbal Opening Loader */}
      <SiteLoader />

      {/* Floating Glass Navigation Header - Fully synchronized with page load */}
      <Navigation
        activeChapterId={activeChapterId}
        onNavigate={handleNavigateToChapter}
      />

      {/* Main Experience Stream */}
      <main className="relative">
        {/* 00. Hero Section: Self-contained Deep Space & Earth Globe (Vision) */}
        <HeroSection
          onExploreChapter={handleNavigateToChapter}
        />

        {/* 01-05. The Human Editorial Canvas (Editorial Stream) */}
        <div className="relative z-10 bg-monochrome-editorialCanvas text-monochrome-ink rounded-t-[36px] sm:rounded-t-[60px] border-t border-monochrome-sandstone shadow-[0_-30px_70px_rgba(0,0,0,0.4)]">
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
