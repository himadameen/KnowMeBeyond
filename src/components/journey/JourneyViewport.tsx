"use client";

import { DebugOverlay } from "@/components/hud/DebugOverlay";
import { JourneyHud } from "@/components/hud/JourneyHud";
import { JourneyWorld } from "@/components/journey/JourneyWorld";
import { useJourneyKeyboard } from "@/components/journey/useJourneyKeyboard";
import { VisuallyHidden } from "@/components/a11y/VisuallyHidden";
import { useJourney } from "@/engine/journey/JourneyContext";
import { ThemeToggle } from "@/theme/ThemeToggle";

export function JourneyViewport() {
  const { definition, snapshot } = useJourney();
  const cinematic = definition.progressMode === "cinematic";
  useJourneyKeyboard();

  if (definition.scenes.length === 0) {
    return (
      <main
        id="journey"
        className="flex min-h-dvh items-center justify-center bg-background px-6 text-center text-ink"
      >
        <div>
          <h1 className="font-heading text-section">Journey Engine</h1>
          <p className="mt-3 text-body text-ink/70">No scenes are available.</p>
        </div>
      </main>
    );
  }

  return (
    <div
      className="relative bg-background"
      style={{ height: cinematic ? "100dvh" : `${definition.scrollLengthVh}vh` }}
    >
      <div className="journey-stage sticky top-0 overflow-hidden">
        <main
          id="journey"
          tabIndex={-1}
          className="relative h-full w-full"
          aria-labelledby="scene-title"
        >
          <VisuallyHidden as="h1">
            {cinematic
              ? "KNOWBEYONDME. A cinematic opening."
              : `KNOWBEYONDME journey engine test. ${snapshot.currentScene?.title ?? "No scene"}.`}
          </VisuallyHidden>
          {cinematic ? null : (
            <div aria-live="polite" className="sr-only">
              {snapshot.currentScene?.title}. Journey progress{" "}
              {Math.round(snapshot.progress * 100)} percent.
            </div>
          )}
          <JourneyWorld />
          <JourneyHud />
          <ThemeToggle />
          <DebugOverlay />
        </main>
      </div>
    </div>
  );
}
