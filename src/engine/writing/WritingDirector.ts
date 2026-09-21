import { BEYOND_END } from "@/content/beyond";
import { WRITING_END, selectedWorks, writingCopy, writingKinds } from "@/content/writing";
import { clamp, clamp01, envelope, smoothstep } from "@/engine/math";
import type { WritingBeat, WritingFrame } from "@/engine/writing/types";

export function toWritingLocal(progress: number): number {
  return clamp01((progress - BEYOND_END) / (WRITING_END - BEYOND_END));
}

export function resolveWritingFrame(progress: number): WritingFrame {
  const p = toWritingLocal(progress);
  const title = envelope(p, 0.12, 0.16, 0.26, 0.32);
  const subtitle = envelope(p, 0.18, 0.22, 0.28, 0.34);
  const between = envelope(p, 0.42, 0.46, 0.54, 0.6);
  const mother = envelope(p, 0.5, 0.54, 0.6, 0.66);
  const library = envelope(p, 0.72, 0.78, 0.92, 1.02);
  const professional = smoothstep(0.86, 1, p);

  return {
    beat: resolveBeat(p),
    warmth: envelope(p, 0, 0.04, 0.78, 0.92),
    desk: envelope(p, 0, 0.05, 0.22, 0.34),
    fragments: envelope(p, 0.04, 0.1, 0.24, 0.36),
    title,
    subtitle,
    kinds: envelope(p, 0.28, 0.34, 0.46, 0.54),
    kindCount: clamp(Math.round(smoothstep(0.3, 0.48, p) * writingKinds.length), 0, writingKinds.length),
    between,
    mother,
    works: envelope(p, 0.56, 0.6, 0.72, 0.8),
    workCount: clamp(Math.round(smoothstep(0.58, 0.72, p) * selectedWorks.length), 0, selectedWorks.length),
    library,
    unwritten: envelope(p, 0.76, 0.8, 0.94, 1.02),
    professional,
    liveText: liveAnnouncement({ title, subtitle, between, mother }),
  };
}

function resolveBeat(progress: number): WritingBeat {
  if (progress < 0.14) return "desk";
  if (progress < 0.3) return "alfaz";
  if (progress < 0.46) return "kinds";
  if (progress < 0.58) return "between";
  if (progress < 0.74) return "works";
  if (progress < 0.9) return "library";
  return "threshold";
}

function liveAnnouncement(input: {
  title: number;
  subtitle: number;
  between: number;
  mother: number;
}): string {
  if (input.mother > 0.55) return writingCopy.mother;
  if (input.between > 0.55) return writingCopy.between;
  if (input.subtitle > 0.55) return `${writingCopy.title}. ${writingCopy.subtitle}`;
  if (input.title > 0.55) return writingCopy.title;
  return "";
}
