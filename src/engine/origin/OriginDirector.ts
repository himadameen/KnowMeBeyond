import { OPENING_END } from "@/content/opening";
import { ORIGIN_END } from "@/content/origin";
import { clamp01, envelope, smoothstep } from "@/engine/math";
import type { OriginBeat, OriginFrame } from "@/engine/origin/types";

export function toOriginLocal(progress: number): number {
  return clamp01((progress - OPENING_END) / (ORIGIN_END - OPENING_END));
}

export function resolveOriginFrame(progress: number): OriginFrame {
  const p = toOriginLocal(progress);

  const schoolReadable = envelope(p, 0.1, 0.14, 0.26, 0.32);
  const diplomaReadable = envelope(p, 0.34, 0.38, 0.5, 0.56);
  const degreeReadable = envelope(p, 0.56, 0.6, 0.7, 0.76);
  const roadReadable = envelope(p, 0.78, 0.84, 1, 1.05);

  const school = 1 - smoothstep(0.28, 0.4, p);
  const workshop = envelope(p, 0.24, 0.34, 0.5, 0.62);
  const engineering = envelope(p, 0.48, 0.56, 0.7, 0.82);
  const road = smoothstep(0.68, 0.8, p);

  return {
    beat: resolveBeat(p),
    travel: travelFromOrigin(p),
    school,
    workshop,
    engineering,
    road,
    schoolReadable,
    diplomaReadable,
    degreeReadable,
    roadReadable,
    blueprint: clamp01(smoothstep(0, 0.16, p) * 0.55 + smoothstep(0.3, 0.62, p) * 0.45),
    complexity: clamp01(smoothstep(0.22, 0.7, p)),
    warmth: 1 - smoothstep(0.18, 0.72, p),
    light: 0.16 + envelope(p, 0.08, 0.14, 0.24, 0.34) * 0.22 + road * 0.08,
    liveText: liveAnnouncement(schoolReadable, diplomaReadable, degreeReadable, roadReadable),
  };
}

function resolveBeat(progress: number): OriginBeat {
  if (progress < 0.1) return "arrive";
  if (progress < 0.32) return "school";
  if (progress < 0.54) return "diploma";
  if (progress < 0.74) return "degree";
  return "road";
}

function travelFromOrigin(progress: number): number {
  if (progress < 0.1) return smoothstep(0, 0.1, progress) * 0.08;
  if (progress < 0.32) return 0.08 + smoothstep(0.1, 0.32, progress) * 0.92;
  if (progress < 0.54) return 1 + smoothstep(0.32, 0.54, progress);
  if (progress < 0.74) return 2 + smoothstep(0.54, 0.74, progress);
  return 3;
}

function liveAnnouncement(
  school: number,
  diploma: number,
  degree: number,
  road: number,
): string {
  if (road > 0.55) return "The road ahead.";
  if (degree > 0.55) return "2021. B.E. Mechanical Engineering. Dhaanish Ahmed College.";
  if (diploma > 0.55) return "2018. Diploma in Mechanical Engineering. Rajagopal Polytechnic College.";
  if (school > 0.55) return "2015. SSLC. Gracious Matriculation School.";
  return "";
}
