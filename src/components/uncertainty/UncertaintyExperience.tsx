"use client";

import { useMemo } from "react";
import { Crossroads } from "@/components/uncertainty/Crossroads";
import { ExpectedRoad } from "@/components/uncertainty/ExpectedRoad";
import { SearchFragments } from "@/components/uncertainty/SearchFragments";
import { TheCall } from "@/components/uncertainty/TheCall";
import { TimeMarks } from "@/components/uncertainty/TimeMarks";
import { UncertaintyAtmosphere } from "@/components/uncertainty/UncertaintyAtmosphere";
import { ORIGIN_END } from "@/content/origin";
import { UNCERTAINTY_END } from "@/content/uncertainty";
import { cameraToCss } from "@/engine/camera/CameraController";
import { useJourney } from "@/engine/journey/JourneyContext";
import { clamp01, smoothstep } from "@/engine/math";
import { resolveUncertaintyFrame } from "@/engine/uncertainty/UncertaintyDirector";

export function UncertaintyExperience() {
  const { snapshot } = useJourney();
  const frame = useMemo(
    () => resolveUncertaintyFrame(snapshot.progress),
    [snapshot.progress],
  );
  const presence = clamp01(
    smoothstep(ORIGIN_END - 0.03, ORIGIN_END + 0.04, snapshot.progress) *
      (1 - smoothstep(UNCERTAINTY_END - 0.02, UNCERTAINTY_END + 0.04, snapshot.progress)),
  );

  if (presence <= 0.01) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      data-uncertainty-beat={frame.beat}
      data-phase5-ready={snapshot.progress >= UNCERTAINTY_END - 0.02 ? "true" : "false"}
      style={{ opacity: presence }}
    >
      <UncertaintyAtmosphere
        daylight={frame.daylight}
        evening={frame.evening}
        night={frame.night}
        mist={frame.mist}
      />
      <div className="absolute inset-0" style={{ transform: cameraToCss(snapshot.camera) }}>
        <ExpectedRoad clarity={frame.roadClarity} scale={frame.roadScale} fork={frame.fork} />
        <TimeMarks
          year={frame.year}
          days={frame.days}
          weeks={frame.weeks}
          months={frame.months}
        />
        <SearchFragments intensity={frame.search} />
        <Crossroads sap={frame.sap} core={frame.core} alternative={frame.alternative} />
        <TheCall
          phone={frame.phone}
          vibration={frame.vibration}
          title={frame.theCall}
          reducedMotion={snapshot.reducedMotion}
        />
      </div>

      {snapshot.progress >= ORIGIN_END && snapshot.progress < UNCERTAINTY_END ? (
        <>
          <h2 id="scene-title" className="sr-only">
            {frame.liveText || "After graduation"}
          </h2>
          <div aria-live="polite" className="sr-only">
            {frame.liveText}
          </div>
        </>
      ) : null}
    </div>
  );
}
