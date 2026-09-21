import { SOFTWARE_END, softwareCopy, transformWords } from "@/content/software";
import { CALL_END } from "@/content/the-call";
import { clamp, clamp01, envelope, smoothstep } from "@/engine/math";
import type { SoftwareBeat, SoftwareFrame } from "@/engine/software/types";

export function toSoftwareLocal(progress: number): number {
  return clamp01((progress - CALL_END) / (SOFTWARE_END - CALL_END));
}

export function resolveSoftwareFrame(progress: number): SoftwareFrame {
  const p = toSoftwareLocal(progress);
  const destination = envelope(p, 0.08, 0.1, 0.14, 0.18);
  const habit = envelope(p, 0.13, 0.15, 0.2, 0.24);
  const newton = envelope(p, 0.44, 0.47, 0.53, 0.57);
  const aspirasys = envelope(p, 0.54, 0.57, 0.62, 0.66);
  const pattern = envelope(p, 0.32, 0.36, 0.44, 0.5);
  const building = envelope(p, 0.62, 0.65, 0.74, 0.78);
  const helping = envelope(p, 0.74, 0.77, 0.84, 0.87);
  const walking = envelope(p, 0.82, 0.845, 0.88, 0.91);
  const leadBegin = envelope(p, 0.9, 0.92, 0.95, 0.97);
  const leadTrust = envelope(p, 0.945, 0.96, 0.985, 1);

  return {
    beat: resolveBeat(p),
    transform: envelope(p, 0, 0.03, 0.16, 0.22),
    transformIndex: Math.round(smoothstep(0.01, 0.16, p) * (transformWords.length - 1)),
    destination,
    habit,
    chaos: envelope(p, 0.18, 0.22, 0.3, 0.38),
    unknown: envelope(p, 0.18, 0.22, 0.34, 0.42),
    pattern,
    newton,
    aspirasys,
    building,
    helping,
    walking,
    nodes: envelope(p, 0.88, 0.9, 0.98, 1.02),
    nodeCount: clamp(Math.round(smoothstep(0.88, 0.97, p) * 6), 0, 6),
    leadBegin,
    leadTrust,
    threshold: smoothstep(0.97, 1, p),
    liveText: liveAnnouncement({
      destination,
      habit,
      newton,
      aspirasys,
      walking,
      leadBegin,
      leadTrust,
      pattern,
      building,
      helping,
    }),
  };
}

function resolveBeat(progress: number): SoftwareBeat {
  if (progress < 0.18) return "transform";
  if (progress < 0.32) return "unknown";
  if (progress < 0.44) return "pattern";
  if (progress < 0.62) return "learning";
  if (progress < 0.74) return "building";
  if (progress < 0.88) return "helping";
  if (progress < 0.97) return "leading";
  return "threshold";
}

function liveAnnouncement(input: {
  destination: number;
  habit: number;
  newton: number;
  aspirasys: number;
  walking: number;
  leadBegin: number;
  leadTrust: number;
  pattern: number;
  building: number;
  helping: number;
}): string {
  if (input.leadTrust > 0.55) return softwareCopy.leadTrust;
  if (input.leadBegin > 0.55) return softwareCopy.leadBegin;
  if (input.walking > 0.55) return softwareCopy.walking;
  if (input.helping > 0.55) return "72 students. 5 attended. 2–4 showed interest.";
  if (input.building > 0.55) return "Learn. Build. Break. Fix. Understand. Build Again.";
  if (input.aspirasys > 0.55) return softwareCopy.aspirasys;
  if (input.newton > 0.55) return softwareCopy.newton;
  if (input.pattern > 0.55) return "Frontend. Backend. Database. API. Architecture.";
  if (input.habit > 0.55) return softwareCopy.habit;
  if (input.destination > 0.55) return softwareCopy.destination;
  return "";
}
