"use client";

import { useJourney } from "@/engine/journey/JourneyContext";

export function ProgressTrack() {
  const { definition, snapshot, goToScene } = useJourney();
  const { progress, currentScene } = snapshot;

  return (
    <nav aria-label="Journey scenes" className="relative w-full max-w-sm px-1">
      <div className="absolute inset-x-2 top-1/2 h-px bg-ink/15" aria-hidden="true" />
      <div
        className="absolute left-2 top-1/2 h-px bg-gold/70"
        style={{ width: `calc(${progress * 100}% - 8px)` }}
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between">
        {definition.scenes.map((scene) => {
          const isCurrent = scene.id === currentScene?.id;
          const isReached = progress >= scene.progressStart;

          return (
            <button
              key={scene.id}
              type="button"
              onClick={() => goToScene(scene.id, "programmatic")}
              aria-label={`Go to ${scene.title}`}
              aria-current={isCurrent ? "true" : undefined}
              className="size-2.5 rounded-full border border-gold-muted/70 bg-background"
              style={{
                background: isCurrent || isReached ? "#D4AF37" : "#0B0B0D",
              }}
            />
          );
        })}
      </div>
    </nav>
  );
}
