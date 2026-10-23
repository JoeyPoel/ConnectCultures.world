import React from "react";
import TerraDuskGlobe from "../originkit/TerraDuskGlobe";
import { CulturalCoordinate } from "../../types/story.types";

interface InteractiveGlobeProps {
  onSelectCoordinate?: (coord: CulturalCoordinate) => void;
  onNavigateToChapter?: (chapterId: string) => void;
  className?: string;
}

/**
 * Interactive Globe component powered by OriginKit Terra Dusk.
 * Features photorealistic Earth textures, dynamic daylight, clouds, and cultural waypoint markers.
 */
export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  className = "",
}) => {
  return <TerraDuskGlobe className={className} />;
};

export default InteractiveGlobe;
