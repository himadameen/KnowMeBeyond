"use client";

import { BEYOND_END } from "@/content/beyond";
import { ENGINEER_END } from "@/content/engineer";
import { OPENING_END, toOpeningLocal } from "@/content/opening";
import { ORIGIN_END } from "@/content/origin";
import { SOFTWARE_END } from "@/content/software";
import { CALL_END } from "@/content/the-call";
import { UNCERTAINTY_END } from "@/content/uncertainty";
import { WRITING_END } from "@/content/writing";
import { resolveBeyondFrame } from "@/engine/beyond/BeyondDirector";
import { resolveCallFrame } from "@/engine/call/CallDirector";
import { resolveCurrentFrame } from "@/engine/current/CurrentDirector";
import { resolveEngineerFrame } from "@/engine/engineer/EngineerDirector";
import { useJourney } from "@/engine/journey/JourneyContext";
import { clamp01 } from "@/engine/math";
import { resolveOpeningFrame } from "@/engine/opening/OpeningDirector";
import { resolveOriginFrame } from "@/engine/origin/OriginDirector";
import { resolveSoftwareFrame } from "@/engine/software/SoftwareDirector";
import { resolveUncertaintyFrame } from "@/engine/uncertainty/UncertaintyDirector";
import { resolveWritingFrame } from "@/engine/writing/WritingDirector";
import { useDebugMode } from "@/hooks/useDebugMode";

export function DebugOverlay() {
  const enabled = useDebugMode();
  const { snapshot, gateReleased, isProgressGated } = useJourney();
  const opening = resolveOpeningFrame(clamp01(toOpeningLocal(snapshot.progress)), gateReleased);
  const origin = resolveOriginFrame(snapshot.progress);
  const uncertainty = resolveUncertaintyFrame(snapshot.progress);
  const call = resolveCallFrame(snapshot.progress);
  const software = resolveSoftwareFrame(snapshot.progress);
  const engineer = resolveEngineerFrame(snapshot.progress);
  const beyond = resolveBeyondFrame(snapshot.progress);
  const writing = resolveWritingFrame(snapshot.progress);
  const current = resolveCurrentFrame(snapshot.progress);
  const beat =
    snapshot.progress >= WRITING_END
      ? current.beat
      : snapshot.progress >= BEYOND_END
        ? writing.beat
        : snapshot.progress >= ENGINEER_END
          ? beyond.beat
          : snapshot.progress >= SOFTWARE_END
            ? engineer.beat
            : snapshot.progress >= CALL_END
              ? software.beat
              : snapshot.progress >= UNCERTAINTY_END
                ? call.beat
                : snapshot.progress >= ORIGIN_END
                  ? uncertainty.beat
                  : snapshot.progress >= OPENING_END
                    ? origin.beat
                    : opening.beat;

  if (!enabled || process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <aside
      aria-label="Journey debug"
      className="pointer-events-none absolute bottom-20 right-4 z-30 w-56 bg-surface/90 p-3 font-mono text-[11px] leading-5 text-ink/80"
    >
      <p className="mb-1 text-gold-muted">DEBUG</p>
      <p>Scene: {snapshot.currentScene?.id ?? "none"}</p>
      <p>Beat: {beat}</p>
      <p>Gated: {isProgressGated ? "yes" : "no"}</p>
      <p>Journey: {snapshot.progress.toFixed(3)}</p>
      <p>Scene progress: {snapshot.sceneProgress.toFixed(3)}</p>
      <p>Direction: {snapshot.direction}</p>
      <p>Velocity: {snapshot.velocity.toFixed(1)}</p>
      <p>Reduced motion: {snapshot.reducedMotion ? "yes" : "no"}</p>
      <p>Input: {snapshot.inputSource}</p>
      <p className="mt-2 text-ink/40">Ctrl+Shift+J to hide</p>
    </aside>
  );
}
