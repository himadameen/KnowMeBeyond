export type BeyondBeat =
  | "expand"
  | "meaning"
  | "auditorium"
  | "workshops"
  | "create"
  | "imagine"
  | "notebook";

export type BeyondFrame = {
  beat: BeyondBeat;
  expand: number;
  meaning: number;
  hall: number;
  reach: number;
  workshops: number;
  create: number;
  inside: number;
  imagine: number;
  warmth: number;
  notebook: number;
  liveText: string;
};
