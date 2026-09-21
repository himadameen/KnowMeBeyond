"use client";

import { useMemo } from "react";
import { Auditorium } from "@/components/beyond/Auditorium";
import { BeyondAtmosphere } from "@/components/beyond/BeyondAtmosphere";
import { BeyondCopy } from "@/components/beyond/BeyondCopy";
import { CreatorExperiments } from "@/components/beyond/CreatorExperiments";
import { ExpandingField } from "@/components/beyond/ExpandingField";
import { NotebookSeed } from "@/components/beyond/NotebookSeed";
import { WorkshopMoments } from "@/components/beyond/WorkshopMoments";
import { BEYOND_END } from "@/content/beyond";
import { ENGINEER_END } from "@/content/engineer";
import { cameraToCss } from "@/engine/camera/CameraController";
import { resolveBeyondFrame } from "@/engine/beyond/BeyondDirector";
import { useJourney } from "@/engine/journey/JourneyContext";
import { clamp01, smoothstep } from "@/engine/math";

export function BeyondExperience() {
  const { snapshot } = useJourney();
  const frame = useMemo(() => resolveBeyondFrame(snapshot.progress), [snapshot.progress]);
  const presence = clamp01(
    smoothstep(ENGINEER_END - 0.02, ENGINEER_END + 0.04, snapshot.progress) *
      (1 - smoothstep(BEYOND_END - 0.015, BEYOND_END + 0.035, snapshot.progress)),
  );

  if (presence <= 0.01) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      data-beyond-beat={frame.beat}
      data-phase9-ready={frame.notebook > 0.5 ? "true" : "false"}
      style={{ opacity: presence }}
    >
      <BeyondAtmosphere expand={frame.expand} hall={frame.hall} warmth={frame.warmth} />
      <div className="absolute inset-0" style={{ transform: cameraToCss(snapshot.camera) }}>
        <ExpandingField intensity={frame.expand} />
        <Auditorium hall={frame.hall} reach={frame.reach} />
        <WorkshopMoments intensity={frame.workshops} />
        <CreatorExperiments intensity={frame.create} />
        <BeyondCopy meaning={frame.meaning} inside={frame.inside} imagine={frame.imagine} />
        <NotebookSeed warmth={frame.warmth} notebook={frame.notebook} />
      </div>

      {snapshot.progress >= ENGINEER_END && snapshot.progress < BEYOND_END ? (
        <>
          <h2 id="scene-title" className="sr-only">
            {frame.liveText || "Beyond the code"}
          </h2>
          <div aria-live="polite" className="sr-only">
            {frame.liveText}
          </div>
        </>
      ) : null}
    </div>
  );
}
