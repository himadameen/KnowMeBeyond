"use client";

import { useMemo } from "react";
import { BecomingConstellation } from "@/components/current/BecomingConstellation";
import { CurrentActions } from "@/components/current/CurrentActions";
import { CurrentAtmosphere } from "@/components/current/CurrentAtmosphere";
import { CurrentBrand } from "@/components/current/CurrentBrand";
import { CurrentCopy } from "@/components/current/CurrentCopy";
import { DoyensysPlace } from "@/components/current/DoyensysPlace";
import { ReturningNames } from "@/components/current/ReturningNames";
import { WRITING_END } from "@/content/writing";
import { cameraToCss } from "@/engine/camera/CameraController";
import { resolveCurrentFrame } from "@/engine/current/CurrentDirector";
import { useJourney } from "@/engine/journey/JourneyContext";
import { clamp01, smoothstep } from "@/engine/math";

export function CurrentExperience() {
  const { snapshot, goToProgress, goToScene } = useJourney();
  const frame = useMemo(() => resolveCurrentFrame(snapshot.progress), [snapshot.progress]);
  const presence = clamp01(smoothstep(WRITING_END - 0.02, WRITING_END + 0.04, snapshot.progress));

  if (presence <= 0.01) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      data-current-beat={frame.beat}
      data-journey-complete={frame.actions > 0.7 ? "true" : "false"}
      style={{ opacity: presence }}
    >
      <CurrentAtmosphere becoming={frame.becoming} unknown={frame.unknown} brand={frame.brand} />
      <div className="absolute inset-0" style={{ transform: cameraToCss(snapshot.camera) }}>
        <DoyensysPlace intensity={frame.place} />
        <BecomingConstellation intensity={frame.becoming} nodeCount={frame.nodeCount} />
        <CurrentCopy
          came={frame.came}
          became={frame.became}
          next={frame.next}
          unknown={frame.unknown}
          beautiful={frame.beautiful}
        />
        <ReturningNames intensity={frame.names} nameCount={frame.nameCount} />
        <CurrentBrand
          brand={frame.brand}
          subtitle={frame.subtitle}
          person={frame.person}
          roles={frame.roles}
        />
      </div>
      <CurrentActions
        intensity={frame.actions}
        reducedMotion={snapshot.reducedMotion}
        onWork={() => goToScene("engineer-worlds", "programmatic")}
        onWriting={() => goToScene("writing-works", "programmatic")}
        onAgain={() => goToProgress(0, "programmatic")}
      />

      {snapshot.progress >= WRITING_END ? (
        <>
          <h2 id="scene-title" className="sr-only">
            {frame.liveText || "The journey continues"}
          </h2>
          <div aria-live="polite" className="sr-only">
            {frame.liveText}
          </div>
        </>
      ) : null}
    </div>
  );
}
