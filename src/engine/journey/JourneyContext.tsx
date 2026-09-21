"use client";

import { createContext, useContext } from "react";
import type { JourneyDefinition, JourneyInputSource, JourneySnapshot } from "@/engine/types";

export type JourneyContextValue = {
  definition: JourneyDefinition;
  snapshot: JourneySnapshot;
  goToProgress: (progress: number, source: JourneyInputSource) => void;
  goToScene: (id: string, source?: JourneyInputSource) => void;
  releaseProgressGate: () => void;
  isProgressGated: boolean;
  gateReleased: boolean;
};

export const JourneyContext = createContext<JourneyContextValue | null>(null);

export function useJourney(): JourneyContextValue {
  const value = useContext(JourneyContext);
  if (!value) {
    throw new Error("useJourney must be used within JourneyProvider");
  }
  return value;
}
