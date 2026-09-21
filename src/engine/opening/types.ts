import type { IdentityFragment } from "@/content/opening";

export type OpeningBeat =
  | "opening"
  | "nameReveal"
  | "question"
  | "invitation"
  | "beginReady"
  | "brandReveal"
  | "journeyIntro"
  | "completed";

export type NameLayout = {
  x: string;
  y: string;
};

export type OpeningFrame = {
  beat: OpeningBeat;
  name: IdentityFragment | null;
  nameOpacity: number;
  nameLayout: NameLayout;
  nameAccent: boolean;
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
  cloudDensity: number;
  stillness: number;
  light: number;
  separation: number;
  liveText: string;
};
