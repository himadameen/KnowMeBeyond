import type { JourneyDirection, JourneyInputSource } from "@/engine/types";

/**
 * Input-agnostic progress contract.
 * Desktop uses scroll. Keyboard and HUD already call setProgress.
 * A later mobile swipe driver can implement this same interface.
 */
export type ProgressSnapshot = {
  progress: number;
  direction: JourneyDirection;
  velocity: number;
  source: JourneyInputSource;
};

export interface ProgressDriver {
  attach(): () => void;
  subscribe(listener: (state: ProgressSnapshot) => void): () => void;
  setProgress(progress: number, source: JourneyInputSource, reducedMotion: boolean): void;
  refresh(): void;
  releaseGate?(): void;
  setReducedMotion?(reducedMotion: boolean): void;
}
