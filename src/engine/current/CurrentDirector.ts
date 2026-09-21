import { becomingIdentities, currentCopy, returningNames } from "@/content/current";
import { WRITING_END } from "@/content/writing";
import { clamp, clamp01, envelope, smoothstep } from "@/engine/math";
import type { CurrentBeat, CurrentFrame } from "@/engine/current/types";

export function toCurrentLocal(progress: number): number {
  return clamp01((progress - WRITING_END) / (1 - WRITING_END));
}

export function resolveCurrentFrame(progress: number): CurrentFrame {
  const p = toCurrentLocal(progress);
  const place = envelope(p, 0, 0.04, 0.14, 0.2);
  const becoming = envelope(p, 0.16, 0.2, 0.3, 0.36);
  const came = envelope(p, 0.32, 0.36, 0.4, 0.44);
  const became = envelope(p, 0.46, 0.5, 0.54, 0.58);
  const next = envelope(p, 0.6, 0.64, 0.68, 0.72);
  const unknown = envelope(p, 0.7, 0.74, 0.78, 0.82);
  const beautiful = envelope(p, 0.8, 0.84, 0.88, 0.91);
  const brand = envelope(p, 0.9, 0.93, 1.02, 1.08);
  const subtitle = envelope(p, 0.92, 0.94, 1.02, 1.08);
  const person = envelope(p, 0.94, 0.96, 1.02, 1.08);
  const roles = envelope(p, 0.95, 0.97, 1.02, 1.08);

  return {
    beat: resolveBeat(p),
    place,
    becoming,
    nodeCount: clamp(
      Math.round(smoothstep(0.18, 0.32, p) * becomingIdentities.length),
      0,
      becomingIdentities.length,
    ),
    came,
    became,
    next,
    unknown,
    beautiful,
    names: envelope(p, 0.84, 0.87, 0.91, 0.94),
    nameCount: clamp(Math.round(smoothstep(0.85, 0.92, p) * returningNames.length), 0, returningNames.length),
    brand,
    subtitle,
    person,
    roles,
    actions: smoothstep(0.95, 1, p),
    liveText: liveAnnouncement({
      place,
      came,
      became,
      next,
      unknown,
      beautiful,
      brand,
      person,
    }),
  };
}

function resolveBeat(progress: number): CurrentBeat {
  if (progress < 0.18) return "doyensys";
  if (progress < 0.32) return "becoming";
  if (progress < 0.7) return "reflection";
  if (progress < 0.84) return "unknown";
  if (progress < 0.91) return "names";
  if (progress < 0.96) return "brand";
  return "close";
}

function liveAnnouncement(input: {
  place: number;
  came: number;
  became: number;
  next: number;
  unknown: number;
  beautiful: number;
  brand: number;
  person: number;
}): string {
  if (input.person > 0.55) return `${currentCopy.name}. ${currentCopy.roles}`;
  if (input.brand > 0.55) return `${currentCopy.brand}. ${currentCopy.subtitle}`;
  if (input.beautiful > 0.55) return currentCopy.beautiful;
  if (input.unknown > 0.55) return currentCopy.unknown;
  if (input.next > 0.55) return currentCopy.next;
  if (input.became > 0.55) return currentCopy.became;
  if (input.came > 0.55) return currentCopy.came;
  if (input.place > 0.55) return currentCopy.place;
  return "";
}
