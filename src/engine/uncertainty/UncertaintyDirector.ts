import { ORIGIN_END } from "@/content/origin";
import { UNCERTAINTY_END, uncertaintyCopy } from "@/content/uncertainty";
import { clamp01, envelope, smoothstep } from "@/engine/math";
import type { UncertaintyBeat, UncertaintyFrame } from "@/engine/uncertainty/types";

export function toUncertaintyLocal(progress: number): number {
  return clamp01((progress - ORIGIN_END) / (UNCERTAINTY_END - ORIGIN_END));
}

export function resolveUncertaintyFrame(progress: number): UncertaintyFrame {
  const p = toUncertaintyLocal(progress);

  const year = envelope(p, 0, 0.04, 0.2, 0.28);
  const days = envelope(p, 0.18, 0.22, 0.3, 0.36);
  const weeks = envelope(p, 0.28, 0.32, 0.38, 0.44);
  const months = envelope(p, 0.36, 0.4, 0.48, 0.54);
  const search = envelope(p, 0.38, 0.44, 0.56, 0.64);
  const sap = envelope(p, 0.52, 0.58, 0.66, 0.74);
  const core = envelope(p, 0.64, 0.7, 0.8, 0.86);
  const alternative = envelope(p, 0.66, 0.72, 0.8, 0.86);
  const theCall = envelope(p, 0.9, 0.94, 1, 1.04);

  return {
    beat: resolveBeat(p),
    roadClarity: clamp01(1 - smoothstep(0.1, 0.42, p) * 0.82),
    roadScale: 1 + smoothstep(0.08, 0.36, p) * 0.18,
    daylight: clamp01(1 - smoothstep(0.16, 0.34, p)),
    evening: envelope(p, 0.2, 0.28, 0.36, 0.46),
    night: smoothstep(0.36, 0.52, p),
    mist: clamp01(smoothstep(0.14, 0.5, p) * 0.55 + smoothstep(0.78, 0.9, p) * 0.35),
    year,
    days,
    weeks,
    months,
    search,
    sap,
    core,
    alternative,
    fork: envelope(p, 0.62, 0.68, 0.8, 0.88),
    phone: envelope(p, 0.82, 0.88, 1, 1.05),
    vibration: envelope(p, 0.86, 0.88, 0.93, 0.96),
    theCall,
    liveText: liveAnnouncement({
      year,
      days,
      weeks,
      months,
      search,
      sap,
      core,
      theCall,
    }),
  };
}

function resolveBeat(progress: number): UncertaintyBeat {
  if (progress < 0.16) return "expected";
  if (progress < 0.38) return "time";
  if (progress < 0.54) return "search";
  if (progress < 0.66) return "sap";
  if (progress < 0.84) return "crossroads";
  return "call";
}

function liveAnnouncement(input: {
  year: number;
  days: number;
  weeks: number;
  months: number;
  search: number;
  sap: number;
  core: number;
  theCall: number;
}): string {
  if (input.theCall > 0.55) return uncertaintyCopy.theCall;
  if (input.core > 0.55) return "CORE. ALTERNATIVE.";
  if (input.sap > 0.55) return `${uncertaintyCopy.sap}. ${uncertaintyCopy.sapAside}`;
  if (input.search > 0.55) return "Searching. Waiting.";
  if (input.months > 0.55) return "Months.";
  if (input.weeks > 0.55) return "Weeks.";
  if (input.days > 0.55) return "Days.";
  if (input.year > 0.55) return "2021.";
  return "";
}
