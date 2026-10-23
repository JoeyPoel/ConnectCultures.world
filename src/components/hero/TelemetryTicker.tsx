import React, { useState, useEffect } from "react";
import { Compass, Clock, Radio } from "lucide-react";

interface TelemetryTickerProps {
  currentLocation?: string;
  coordinates?: string;
}

/**
 * Geographic telemetry ticker displaying real-time coordinate tracking and UTC/local timestamp.
 */
export const TelemetryTicker: React.FC<TelemetryTickerProps> = ({
  currentLocation = "NETHERLANDS",
  coordinates = "52.6800° N, 5.0300° E",
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2 rounded-full bg-dusk-surface/80 border border-monochrome-hairline backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-1.5 font-mono text-xs text-terracotta-glow font-medium">
        <Radio className="w-3.5 h-3.5 animate-pulse" />
        <span>{currentLocation}</span>
      </div>

      <span className="w-1 h-1 rounded-full bg-monochrome-hairline" />

      <div className="flex items-center gap-1.5 font-mono text-xs text-gold-sand">
        <Compass className="w-3.5 h-3.5 text-gold-sand/70" />
        <span>{coordinates}</span>
      </div>

      <span className="w-1 h-1 rounded-full bg-monochrome-hairline hidden sm:inline-block" />

      <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-monochrome-slateMuted">
        <Clock className="w-3 h-3" />
        <span>{currentTime}</span>
      </div>
    </div>
  );
};

export default TelemetryTicker;
