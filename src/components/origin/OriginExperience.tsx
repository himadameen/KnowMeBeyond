"use client";

import { useMemo } from "react";
import { BlueprintField } from "@/components/origin/BlueprintField";
import { EngineeringPlace } from "@/components/origin/EngineeringPlace";
import { MechanicalCar } from "@/components/origin/MechanicalCar";
import { OriginAtmosphere } from "@/components/origin/OriginAtmosphere";
import { RoadPlace } from "@/components/origin/RoadPlace";
import { SchoolPlace } from "@/components/origin/SchoolPlace";
import { WorkshopPlace } from "@/components/origin/WorkshopPlace";
import { OPENING_END } from "@/content/opening";
import { ORIGIN_END } from "@/content/origin";
import { cameraToCss } from "@/engine/camera/CameraController";
import { useJourney } from "@/engine/journey/JourneyContext";
import { resolveOriginFrame } from "@/engine/origin/OriginDirector";
import { clamp01, smoothstep } from "@/engine/math";

export function OriginExperience() {
  const { snapshot } = useJourney();
  const frame = useMemo(() => resolveOriginFrame(snapshot.progress), [snapshot.progress]);
  const presence = clamp01(
    smoothstep(OPENING_END - 0.03, OPENING_END + 0.05, snapshot.progress) *
      (1 - smoothstep(ORIGIN_END - 0.02, ORIGIN_END + 0.04, snapshot.progress)),
  );

  if (presence <= 0.01) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      data-origin-beat={frame.beat}
      data-phase4-ready={snapshot.progress >= ORIGIN_END - 0.02 ? "true" : "false"}
      style={{ opacity: presence }}
    >
      <OriginAtmosphere warmth={frame.warmth} light={frame.light} />
      <MechanicalCar
        intensity={frame.workshop * 0.28 + frame.engineering * 0.92 * (1 - frame.road * 0.82)}
      />
      <BlueprintField
        intensity={frame.blueprint}
        complexity={frame.complexity}
        travel={frame.travel}
        reducedMotion={snapshot.reducedMotion}
      />

      {snapshot.progress >= OPENING_END && snapshot.progress < ORIGIN_END ? (
        <>
          <h2 id="scene-title" className="sr-only">
            {frame.liveText || "The origin"}
          </h2>
          <div aria-live="polite" className="sr-only">
            {frame.liveText}
          </div>
        </>
      ) : null}

      <div className="absolute inset-0" style={{ transform: cameraToCss(snapshot.camera) }}>
        {snapshot.reducedMotion ? (
          <div className="absolute inset-0">
            <div className="absolute inset-0" style={{ opacity: frame.school }}>
              <SchoolPlace readable={frame.schoolReadable} />
            </div>
            <div className="absolute inset-0" style={{ opacity: frame.workshop }}>
              <WorkshopPlace readable={frame.diplomaReadable} />
            </div>
            <div className="absolute inset-0" style={{ opacity: frame.engineering }}>
              <EngineeringPlace readable={frame.degreeReadable} />
            </div>
            <div className="absolute inset-0" style={{ opacity: frame.road }}>
              <RoadPlace readable={frame.roadReadable} />
            </div>
          </div>
        ) : (
          <div
            className="flex h-full"
            style={{
              width: "400vw",
              transform: `translate3d(${-frame.travel * 100}vw, 0, 0)`,
            }}
          >
            <SchoolPlace readable={frame.schoolReadable} />
            <WorkshopPlace readable={frame.diplomaReadable} />
            <EngineeringPlace readable={frame.degreeReadable} />
            <RoadPlace readable={frame.roadReadable} />
          </div>
        )}
      </div>
    </div>
  );
}
