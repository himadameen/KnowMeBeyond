import { identityFragments, OPENING_GATE_PROGRESS } from "@/content/opening";
import { clamp01, envelope, smoothstep } from "@/engine/math";
import type { IdentityFragment } from "@/content/opening";
import type { OpeningBeat, OpeningFrame, NameLayout } from "@/engine/opening/types";

const NAME_LAYOUTS: Record<IdentityFragment, NameLayout> = {
  HIMMAD: { x: "0%", y: "0%" },
  AMEEN: { x: "-7%", y: "5%" },
  NUHAIM: { x: "9%", y: "-7%" },
  MUSTAFA: { x: "-3%", y: "9%" },
  BILAL: { x: "-11%", y: "-3%" },
  ZACK: { x: "0%", y: "3%" },
};

function band(progress: number, start: number, end: number): number {
  return envelope(progress, start, start + 0.012, end - 0.01, end);
}

export function resolveOpeningFrame(progress: number, gateReleased: boolean): OpeningFrame {
  const p = clamp01(progress);

  const names: Record<IdentityFragment, number> = {
    HIMMAD: envelope(p, 0.075, 0.095, 0.132, 0.158),
    AMEEN: envelope(p, 0.172, 0.188, 0.218, 0.242),
    NUHAIM: envelope(p, 0.252, 0.264, 0.288, 0.308),
    MUSTAFA: envelope(p, 0.322, 0.34, 0.372, 0.398),
    BILAL: envelope(p, 0.41, 0.422, 0.444, 0.462),
    ZACK: envelope(p, 0.478, 0.492, 0.538, 0.562),
  };

  const visibleName =
    identityFragments.find((name) => (names[name] ?? 0) > 0.04) ?? null;

  const beat = resolveBeat(p);
  const questionLead = envelope(p, 0.575, 0.595, 0.648, 0.668);
  const questionEnd = envelope(p, 0.608, 0.628, 0.648, 0.668);
  const invitationRead = envelope(p, 0.678, 0.694, 0.718, 0.736);
  const invitationCome = envelope(p, 0.708, 0.724, 0.748, 0.76);
  const beginVisible = p >= 0.742 && !gateReleased;
  const brand = envelope(p, 0.768, 0.79, 0.86, 0.888);
  const subtitle = envelope(p, 0.808, 0.824, 0.86, 0.888);
  const youKnow = envelope(p, 0.888, 0.9, 0.922, 0.936);
  const knowJourney = envelope(p, 0.93, 0.942, 0.96, 0.974);
  const beginning = envelope(p, 0.968, 0.978, 1, 1.02);
  const separation = gateReleased ? smoothstep(OPENING_GATE_PROGRESS, 0.84, p) : 0;

  const cloudDensity =
    0.42 +
    envelope(p, 0, 0.02, 0.07, 0.1) * 0.18 +
    envelope(p, 0.54, 0.555, 0.572, 0.59) * 0.38 +
    (1 - separation) * 0.12 -
    separation * 0.28;

  const light =
    envelope(p, 0.57, 0.6, 0.72, 0.75) * 0.16 +
    envelope(p, 0.768, 0.8, 0.88, 0.94) * 0.38 +
    envelope(p, 0.94, 0.97, 1, 1.05) * 0.1;

  return {
    beat,
    name: visibleName,
    nameOpacity: visibleName ? (names[visibleName] ?? 0) : 0,
    nameLayout: visibleName ? NAME_LAYOUTS[visibleName] : NAME_LAYOUTS.HIMMAD,
    nameAccent: visibleName === "ZACK",
    questionLead,
    questionEnd,
    invitationRead,
    invitationCome,
    beginVisible,
    brand,
    subtitle,
    youKnow,
    knowJourney,
    beginning,
    cloudDensity: clamp01(cloudDensity),
    stillness: band(p, 0.548, 0.575),
    light: clamp01(light),
    separation,
    liveText: liveAnnouncement({
      name: visibleName,
      nameOpacity: visibleName ? (names[visibleName] ?? 0) : 0,
      questionLead,
      questionEnd,
      invitationRead,
      invitationCome,
      beginVisible,
      brand,
      subtitle,
      youKnow,
      knowJourney,
      beginning,
    }),
  };
}

function resolveBeat(progress: number): OpeningBeat {
  if (progress < 0.075) return "opening";
  if (progress < 0.565) return "nameReveal";
  if (progress < 0.668) return "question";
  if (progress < 0.742) return "invitation";
  if (progress < OPENING_GATE_PROGRESS + 0.004) return "beginReady";
  if (progress < 0.888) return "brandReveal";
  if (progress < 0.968) return "journeyIntro";
  return "completed";
}

function liveAnnouncement(input: {
  name: IdentityFragment | null;
  nameOpacity: number;
  questionLead: number;
  questionEnd: number;
  invitationRead: number;
  invitationCome: number;
  beginVisible: boolean;
  brand: number;
  subtitle: number;
  youKnow: number;
  knowJourney: number;
  beginning: number;
}): string {
  if (input.beginning > 0.55) return "Let's go back to the beginning.";
  if (input.knowJourney > 0.55) return "But do you know the journey?";
  if (input.youKnow > 0.55) return "You know the name.";
  if (input.subtitle > 0.55) return "KNOWBEYONDME. Journey Still Being Written.";
  if (input.brand > 0.55) return "KNOWBEYONDME";
  if (input.beginVisible) return "BEGIN";
  if (input.invitationCome > 0.55) return "Come with me.";
  if (input.invitationRead > 0.55) return "Then don't just read.";
  if (input.questionEnd > 0.55) return "Do you really want to know who I am?";
  if (input.questionLead > 0.55) return "Do you really want to know";
  if (input.name && input.nameOpacity > 0.55) return input.name;
  return "";
}
