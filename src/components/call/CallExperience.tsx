"use client";

import { useMemo } from "react";
import { CallAtmosphere } from "@/components/call/CallAtmosphere";
import { DigitalSeed } from "@/components/call/DigitalSeed";
import { MentorCall } from "@/components/call/MentorCall";
import { MorningDecision } from "@/components/call/MorningDecision";
import { NightThoughts } from "@/components/call/NightThoughts";
import { QuietWorship } from "@/components/call/QuietWorship";
import { TwoOptions } from "@/components/call/TwoOptions";
import { VerseMoment } from "@/components/call/VerseMoment";
import { CALL_END } from "@/content/the-call";
import { UNCERTAINTY_END } from "@/content/uncertainty";
import { cameraToCss } from "@/engine/camera/CameraController";
import { resolveCallFrame } from "@/engine/call/CallDirector";
import { useJourney } from "@/engine/journey/JourneyContext";
import { clamp01, smoothstep } from "@/engine/math";

export function CallExperience() {
  const { snapshot } = useJourney();
  const frame = useMemo(() => resolveCallFrame(snapshot.progress), [snapshot.progress]);
  const presence = clamp01(
    smoothstep(UNCERTAINTY_END - 0.025, UNCERTAINTY_END + 0.03, snapshot.progress) *
      (1 - smoothstep(CALL_END - 0.015, CALL_END + 0.035, snapshot.progress)),
  );

  if (presence <= 0.01) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      data-call-beat={frame.beat}
      data-phase6-ready={frame.digitalSeed > 0.5 ? "true" : "false"}
      style={{ opacity: presence }}
    >
      <CallAtmosphere night={frame.night} sleep={frame.sleep} morning={frame.morning} />
      <div className="absolute inset-0" style={{ transform: cameraToCss(snapshot.camera) }}>
        <MentorCall
          fivePm={frame.fivePm}
          ring={frame.ring}
          silhouette={frame.silhouette}
          phone={frame.phone}
          reducedMotion={snapshot.reducedMotion}
        />
        <TwoOptions
          twoOptions={frame.twoOptions}
          optionOne={frame.optionOne}
          optionTwo={frame.optionTwo}
          whatever={frame.whatever}
          completely={frame.completely}
          twoRoads={frame.twoRoads}
        />
        <NightThoughts
          night={frame.night}
          nightHour={frame.nightHour}
          scrolling={frame.scrolling}
          reducedMotion={snapshot.reducedMotion}
        />
        <VerseMoment opacity={frame.verse} />
        <QuietWorship wudu={frame.wudu} salah={frame.salah} dua={frame.dua} />
        <MorningDecision decision={frame.decision} welcome={frame.welcome} />
        <DigitalSeed opacity={frame.digitalSeed} />
      </div>

      {snapshot.progress >= UNCERTAINTY_END && snapshot.progress < CALL_END ? (
        <>
          <h2 id="scene-title" className="sr-only">
            {frame.liveText || "The call"}
          </h2>
          <div aria-live="polite" className="sr-only">
            {frame.liveText}
          </div>
        </>
      ) : null}
    </div>
  );
}
