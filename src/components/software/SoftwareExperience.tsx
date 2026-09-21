"use client";

import { useMemo } from "react";
import { BuildCycle } from "@/components/software/BuildCycle";
import { CollegeSession } from "@/components/software/CollegeSession";
import { LeadershipNodes } from "@/components/software/LeadershipNodes";
import { LearningPlaces } from "@/components/software/LearningPlaces";
import { PatternSpace } from "@/components/software/PatternSpace";
import { SoftwareAtmosphere } from "@/components/software/SoftwareAtmosphere";
import { SoftwareCopy } from "@/components/software/SoftwareCopy";
import { TransformLine } from "@/components/software/TransformLine";
import { UnknownField } from "@/components/software/UnknownField";
import { SOFTWARE_END } from "@/content/software";
import { CALL_END } from "@/content/the-call";
import { cameraToCss } from "@/engine/camera/CameraController";
import { useJourney } from "@/engine/journey/JourneyContext";
import { clamp01, smoothstep } from "@/engine/math";
import { resolveSoftwareFrame } from "@/engine/software/SoftwareDirector";

export function SoftwareExperience() {
  const { snapshot } = useJourney();
  const frame = useMemo(() => resolveSoftwareFrame(snapshot.progress), [snapshot.progress]);
  const presence = clamp01(
    smoothstep(CALL_END - 0.02, CALL_END + 0.04, snapshot.progress) *
      (1 - smoothstep(SOFTWARE_END - 0.015, SOFTWARE_END + 0.035, snapshot.progress)),
  );

  if (presence <= 0.01) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      data-software-beat={frame.beat}
      data-phase7-ready={frame.threshold > 0.5 ? "true" : "false"}
      style={{ opacity: presence }}
    >
      <SoftwareAtmosphere chaos={frame.chaos} pattern={frame.pattern} threshold={frame.threshold} />
      <div className="absolute inset-0" style={{ transform: cameraToCss(snapshot.camera) }}>
        <TransformLine intensity={frame.transform} index={frame.transformIndex} />
        <UnknownField
          intensity={frame.unknown}
          chaos={frame.chaos}
          reducedMotion={snapshot.reducedMotion}
        />
        <PatternSpace intensity={frame.pattern} />
        <LearningPlaces newton={frame.newton} aspirasys={frame.aspirasys} />
        <BuildCycle intensity={frame.building} />
        <CollegeSession intensity={frame.helping} />
        <LeadershipNodes intensity={frame.nodes} nodeCount={frame.nodeCount} />
        <SoftwareCopy
          destination={frame.destination}
          habit={frame.habit}
          walking={frame.walking}
          leadBegin={frame.leadBegin}
          leadTrust={frame.leadTrust}
        />
      </div>

      {snapshot.progress >= CALL_END && snapshot.progress < SOFTWARE_END ? (
        <>
          <h2 id="scene-title" className="sr-only">
            {frame.liveText || "Entering software"}
          </h2>
          <div aria-live="polite" className="sr-only">
            {frame.liveText}
          </div>
        </>
      ) : null}
    </div>
  );
}
