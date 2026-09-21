import { callCopy } from "@/content/the-call";
import { CALL_END } from "@/content/the-call";
import { UNCERTAINTY_END } from "@/content/uncertainty";
import { clamp01, envelope, smoothstep } from "@/engine/math";
import type { CallBeat, CallFrame } from "@/engine/call/types";

export function toCallLocal(progress: number): number {
  return clamp01((progress - UNCERTAINTY_END) / (CALL_END - UNCERTAINTY_END));
}

export function resolveCallFrame(progress: number): CallFrame {
  const p = toCallLocal(progress);

  const twoOptions = envelope(p, 0.08, 0.11, 0.16, 0.2);
  const optionOne = envelope(p, 0.16, 0.19, 0.27, 0.32);
  const optionTwo = envelope(p, 0.28, 0.31, 0.4, 0.45);
  const whatever = envelope(p, 0.42, 0.45, 0.49, 0.53);
  const completely = envelope(p, 0.5, 0.53, 0.57, 0.61);
  const twoRoads = envelope(p, 0.58, 0.61, 0.66, 0.71);
  const verse = envelope(p, 0.7, 0.73, 0.8, 0.84);
  const wudu = envelope(p, 0.78, 0.8, 0.83, 0.86);
  const salah = envelope(p, 0.83, 0.85, 0.88, 0.9);
  const dua = envelope(p, 0.87, 0.885, 0.905, 0.92);
  const decision = envelope(p, 0.93, 0.95, 0.97, 0.985);
  const welcome = envelope(p, 0.97, 0.98, 1, 1.03);

  return {
    beat: resolveBeat(p),
    fivePm: envelope(p, 0, 0.03, 0.1, 0.16),
    ring: envelope(p, 0, 0.02, 0.08, 0.14),
    silhouette: envelope(p, 0.04, 0.08, 0.42, 0.5),
    phone: clamp01(1 - smoothstep(0.62, 0.72, p)),
    twoOptions,
    optionOne,
    optionTwo,
    whatever,
    completely,
    twoRoads,
    night: envelope(p, 0.62, 0.66, 0.72, 0.76),
    nightHour: envelope(p, 0.63, 0.66, 0.7, 0.74),
    scrolling: envelope(p, 0.64, 0.67, 0.71, 0.75),
    verse,
    wudu,
    salah,
    dua,
    sleep: envelope(p, 0.9, 0.91, 0.925, 0.94),
    morning: smoothstep(0.92, 0.96, p),
    decision,
    welcome,
    digitalSeed: smoothstep(0.985, 1, p),
    liveText: liveAnnouncement({
      twoOptions,
      optionOne,
      optionTwo,
      whatever,
      completely,
      twoRoads,
      verse,
      salah,
      decision,
      welcome,
    }),
  };
}

function resolveBeat(progress: number): CallBeat {
  if (progress < 0.1) return "ring";
  if (progress < 0.42) return "options";
  if (progress < 0.62) return "counsel";
  if (progress < 0.7) return "night";
  if (progress < 0.78) return "verse";
  if (progress < 0.92) return "quiet";
  if (progress < 0.95) return "morning";
  return "decision";
}

function liveAnnouncement(input: {
  twoOptions: number;
  optionOne: number;
  optionTwo: number;
  whatever: number;
  completely: number;
  twoRoads: number;
  verse: number;
  salah: number;
  decision: number;
  welcome: number;
}): string {
  if (input.welcome > 0.55) return callCopy.welcome;
  if (input.decision > 0.55) return callCopy.decision;
  if (input.salah > 0.55) return "Two rak'ah.";
  if (input.verse > 0.55) return `${callCopy.surah}. ${callCopy.verse}`;
  if (input.twoRoads > 0.55) return callCopy.twoRoads;
  if (input.completely > 0.55) return callCopy.completely;
  if (input.whatever > 0.55) return callCopy.whatever;
  if (input.optionTwo > 0.55) return `${callCopy.optionTwoLabel}. ${callCopy.optionTwoBody}`;
  if (input.optionOne > 0.55) return `${callCopy.optionOneLabel}. ${callCopy.optionOneBody}`;
  if (input.twoOptions > 0.55) return callCopy.twoOptions;
  return "";
}
