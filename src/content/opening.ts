export const identityFragments = [
  "HIMMAD",
  "AMEEN",
  "NUHAIM",
  "MUSTAFA",
  "BILAL",
  "ZACK",
] as const;

export type IdentityFragment = (typeof identityFragments)[number];

export const openingCopy = {
  questionFull: "Do you really want to know who I am?",
  questionLead: "Do you really want to know",
  questionEnd: "who I am?",
  invitationRead: "Then don't just read.",
  invitationCome: "Come with me.",
  begin: "BEGIN",
  brand: "KNOWBEYONDME",
  subtitle: "Journey Still Being Written",
  youKnow: "You know the name.",
  knowJourney: "But do you know the journey?",
  beginning: "Let's go back to the beginning.",
} as const;

export const OPENING_GATE_PROGRESS = 0.76;
export const OPENING_END = 0.46;

export function toOpeningLocal(progress: number): number {
  return progress / OPENING_END;
}

export function openingGateGlobal(): number {
  return OPENING_GATE_PROGRESS * OPENING_END;
}
