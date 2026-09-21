"use client";

import Link from "next/link";
import { ProgressTrack } from "@/components/hud/ProgressTrack";
import { useJourney } from "@/engine/journey/JourneyContext";

export function JourneyHud() {
  const { definition, snapshot } = useJourney();
  if (definition.hud === "hidden") {
    return null;
  }

  const chapter = snapshot.currentScene?.chapter ?? "Test";

  return (
    <header className="pointer-events-none absolute inset-0 z-20">
      <div className="pointer-events-auto flex items-start justify-between px-5 pt-5 text-caption text-ink/40">
        <p>{chapter}</p>
        <nav aria-label="Experience modes" className="flex gap-4">
          <span aria-current="page">Journey</span>
          <Link href="/professional" className="hover:text-ink/70">
            Professional
          </Link>
        </nav>
      </div>

      <div className="pointer-events-auto absolute inset-x-0 bottom-7 flex flex-col items-center gap-3">
        <ProgressTrack />
        <p className="text-caption text-ink/35">
          {Math.round(snapshot.progress * 100)}%
        </p>
      </div>
    </header>
  );
}
