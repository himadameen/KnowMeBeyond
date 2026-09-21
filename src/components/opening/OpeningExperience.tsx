"use client";

import { useMemo } from "react";
import { BeginControl } from "@/components/opening/BeginControl";
import { CloudField } from "@/components/opening/CloudField";
import { NameFragment } from "@/components/opening/NameFragment";
import { OpeningAtmosphere } from "@/components/opening/OpeningAtmosphere";
import { OpeningCopy } from "@/components/opening/OpeningCopy";
import { OriginThreshold } from "@/components/opening/OriginThreshold";
import { OPENING_END, toOpeningLocal } from "@/content/opening";
import { cameraToCss } from "@/engine/camera/CameraController";
import { useJourney } from "@/engine/journey/JourneyContext";
import { clamp01, smoothstep } from "@/engine/math";
import { resolveOpeningFrame } from "@/engine/opening/OpeningDirector";

export function OpeningExperience() {
  const { snapshot, releaseProgressGate, gateReleased } = useJourney();
  const openingLocal = clamp01(toOpeningLocal(snapshot.progress));
  const frame = useMemo(
    () => resolveOpeningFrame(openingLocal, gateReleased),
    [gateReleased, openingLocal],
  );
  const presence = 1 - smoothstep(OPENING_END - 0.02, OPENING_END + 0.06, snapshot.progress);
  const showA11y = snapshot.progress < OPENING_END;

  if (presence <= 0.01) {
    return null;
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      data-opening-beat={frame.beat}
      style={{ opacity: presence }}
    >
      <OpeningAtmosphere light={frame.light} stillness={frame.stillness} />
      <CloudField
        density={frame.cloudDensity}
        separation={frame.separation}
        reducedMotion={snapshot.reducedMotion}
      />

      {showA11y ? (
        <>
          <h2 id="scene-title" className="sr-only">
            {frame.liveText || "KNOWBEYONDME opening"}
          </h2>
          <div aria-live="polite" className="sr-only">
            {frame.liveText}
          </div>
        </>
      ) : null}

      <div
        className="absolute inset-0"
        style={{ transform: cameraToCss(snapshot.camera) }}
      >
        <NameFragment
          name={frame.name}
          opacity={frame.nameOpacity}
          layout={frame.nameLayout}
          accent={frame.nameAccent}
        />
        <OpeningCopy frame={frame} />
        <BeginControl
          visible={frame.beginVisible}
          reducedMotion={snapshot.reducedMotion}
          onBegin={releaseProgressGate}
        />
        <OriginThreshold active={frame.beat === "completed"} />
      </div>
    </div>
  );
}
