"use client";

import { useEffect, useMemo, useState } from "react";
import { AlfazReveal } from "@/components/writing/AlfazReveal";
import { DeskPlace } from "@/components/writing/DeskPlace";
import { SelectedWorks } from "@/components/writing/SelectedWorks";
import { UnwrittenLibrary } from "@/components/writing/UnwrittenLibrary";
import { WritingAtmosphere } from "@/components/writing/WritingAtmosphere";
import { WritingCopy } from "@/components/writing/WritingCopy";
import { WritingKinds } from "@/components/writing/WritingKinds";
import { BEYOND_END } from "@/content/beyond";
import { WRITING_END, writingCopy, type UnwrittenBook } from "@/content/writing";
import { cameraToCss } from "@/engine/camera/CameraController";
import { useJourney } from "@/engine/journey/JourneyContext";
import { clamp01, smoothstep } from "@/engine/math";
import { resolveWritingFrame } from "@/engine/writing/WritingDirector";

export function WritingExperience() {
  const { snapshot } = useJourney();
  const frame = useMemo(() => resolveWritingFrame(snapshot.progress), [snapshot.progress]);
  const presence = clamp01(
    smoothstep(BEYOND_END - 0.02, BEYOND_END + 0.04, snapshot.progress) *
      (1 - smoothstep(WRITING_END - 0.015, WRITING_END + 0.035, snapshot.progress)),
  );
  const [book, setBook] = useState<UnwrittenBook | null>(null);
  const inspected = frame.professional > 0.55 ? null : book;

  useEffect(() => {
    if (!inspected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setBook(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inspected]);

  if (presence <= 0.01) {
    return null;
  }

  const liveText = inspected
    ? `${inspected}. ${writingCopy.unwritten} ${writingCopy.return}`
    : frame.liveText;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      data-writing-beat={frame.beat}
      data-phase10-ready={frame.professional > 0.5 ? "true" : "false"}
      style={{ opacity: presence }}
    >
      <WritingAtmosphere
        warmth={frame.warmth}
        library={frame.library}
        professional={frame.professional}
      />
      <div className="absolute inset-0" style={{ transform: cameraToCss(snapshot.camera) }}>
        <DeskPlace desk={frame.desk} fragments={frame.fragments} />
        <AlfazReveal title={frame.title} subtitle={frame.subtitle} />
        <WritingKinds intensity={frame.kinds} revealed={frame.kindCount} />
        <WritingCopy between={frame.between} mother={frame.mother} />
        <SelectedWorks intensity={frame.works} revealed={frame.workCount} />
        <UnwrittenLibrary
          intensity={frame.unwritten}
          selected={inspected}
          onInspect={setBook}
          onLeave={() => setBook(null)}
        />
      </div>

      {snapshot.progress >= BEYOND_END && snapshot.progress < WRITING_END ? (
        <>
          <h2 id="scene-title" className="sr-only">
            {liveText || "The other side"}
          </h2>
          <div aria-live="polite" className="sr-only">
            {liveText}
          </div>
        </>
      ) : null}
    </div>
  );
}
