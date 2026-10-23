import { useState, useCallback } from "react";
import { CulturalCoordinate } from "../types/story.types";
import { CULTURAL_COORDINATES } from "../constants/coordinates";

/**
 * Controller hook for globe rotation focus and active coordinate selection.
 */
export function useGlobeRotation() {
  const [selectedCoord, setSelectedCoord] = useState<CulturalCoordinate>(CULTURAL_COORDINATES[0]);
  const [targetAngles, setTargetAngles] = useState<{ yaw: number; pitch: number }>({
    yaw: 0,
    pitch: 0,
  });

  const focusCoordinate = useCallback((coord: CulturalCoordinate) => {
    setSelectedCoord(coord);
    // Convert lat/lng to target yaw and pitch
    const radLat = (coord.lat * Math.PI) / 180;
    const radLng = (coord.lng * Math.PI) / 180;

    setTargetAngles({
      yaw: -radLng - Math.PI / 2,
      pitch: radLat,
    });
  }, []);

  return {
    selectedCoord,
    targetAngles,
    focusCoordinate,
    coordinates: CULTURAL_COORDINATES,
  };
}
