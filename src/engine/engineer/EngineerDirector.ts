import { ENGINEER_END, engineerCopy, projectPath } from "@/content/engineer";
import { SOFTWARE_END } from "@/content/software";
import { clamp, clamp01, envelope, smoothstep } from "@/engine/math";
import type { EngineerBeat, EngineerFrame } from "@/engine/engineer/types";

export function toEngineerLocal(progress: number): number {
  return clamp01((progress - SOFTWARE_END) / (ENGINEER_END - SOFTWARE_END));
}

export function resolveEngineerFrame(progress: number): EngineerFrame {
  const p = toEngineerLocal(progress);
  const production = envelope(p, 0, 0.04, 0.22, 0.32);
  const colan = envelope(p, 0.1, 0.14, 0.26, 0.34);
  const duration = envelope(p, 0.18, 0.22, 0.3, 0.36);
  const worlds = envelope(p, 0.3, 0.36, 0.78, 0.9);
  const entry = envelope(p, 0.42, 0.48, 0.68, 0.76);
  const inspect = envelope(p, 0.58, 0.64, 0.78, 0.86);
  const merge = smoothstep(0.78, 0.92, p);
  const threshold = smoothstep(0.9, 1, p);

  return {
    beat: resolveBeat(p),
    production,
    colan,
    duration,
    worlds,
    entry,
    pathCount: clamp(Math.round(smoothstep(0.42, 0.7, p) * projectPath.length), 0, projectPath.length),
    inspect,
    merge,
    threshold,
    liveText: liveAnnouncement({ colan, duration, entry, threshold }),
  };
}

function resolveBeat(progress: number): EngineerBeat {
  if (progress < 0.14) return "arrive";
  if (progress < 0.32) return "colan";
  if (progress < 0.46) return "worlds";
  if (progress < 0.64) return "entry";
  if (progress < 0.8) return "inspect";
  if (progress < 0.92) return "merge";
  return "threshold";
}

function liveAnnouncement(input: {
  colan: number;
  duration: number;
  entry: number;
  threshold: number;
}): string {
  if (input.threshold > 0.55) return engineerCopy.beyond;
  if (input.entry > 0.55) return "Problem. My Role. Architecture. Build. Challenge. Solution. Result. Lesson.";
  if (input.duration > 0.55) return `${engineerCopy.place}. ${engineerCopy.duration}`;
  if (input.colan > 0.55) return engineerCopy.place;
  return "";
}
