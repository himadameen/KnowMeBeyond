import { BEYOND_END, beyondCopy } from "@/content/beyond";
import { ENGINEER_END } from "@/content/engineer";
import { clamp01, envelope, smoothstep } from "@/engine/math";
import type { BeyondBeat, BeyondFrame } from "@/engine/beyond/types";

export function toBeyondLocal(progress: number): number {
  return clamp01((progress - ENGINEER_END) / (BEYOND_END - ENGINEER_END));
}

export function resolveBeyondFrame(progress: number): BeyondFrame {
  const p = toBeyondLocal(progress);
  const meaning = envelope(p, 0.16, 0.2, 0.3, 0.36);
  const reach = envelope(p, 0.36, 0.4, 0.52, 0.58);
  const inside = envelope(p, 0.72, 0.76, 0.82, 0.86);
  const imagine = envelope(p, 0.8, 0.84, 0.9, 0.94);
  const notebook = smoothstep(0.92, 1, p);

  return {
    beat: resolveBeat(p),
    expand: envelope(p, 0, 0.04, 0.2, 0.3),
    meaning,
    hall: envelope(p, 0.3, 0.36, 0.56, 0.64),
    reach,
    workshops: envelope(p, 0.52, 0.56, 0.68, 0.74),
    create: envelope(p, 0.66, 0.7, 0.8, 0.86),
    inside,
    imagine,
    warmth: smoothstep(0.88, 1, p),
    notebook,
    liveText: liveAnnouncement({ meaning, reach, inside, imagine, notebook }),
  };
}

function resolveBeat(progress: number): BeyondBeat {
  if (progress < 0.2) return "expand";
  if (progress < 0.34) return "meaning";
  if (progress < 0.54) return "auditorium";
  if (progress < 0.68) return "workshops";
  if (progress < 0.8) return "create";
  if (progress < 0.92) return "imagine";
  return "notebook";
}

function liveAnnouncement(input: {
  meaning: number;
  reach: number;
  inside: number;
  imagine: number;
  notebook: number;
}): string {
  if (input.notebook > 0.55) return "";
  if (input.imagine > 0.55) return beyondCopy.imagine;
  if (input.inside > 0.55) return beyondCopy.inside;
  if (input.reach > 0.55) return `${beyondCopy.reach}. ${beyondCopy.reachAside}`;
  if (input.meaning > 0.55) return beyondCopy.meaning;
  return "";
}
