export type EngineerBeat =
  | "arrive"
  | "colan"
  | "worlds"
  | "entry"
  | "inspect"
  | "merge"
  | "threshold";

export type EngineerFrame = {
  beat: EngineerBeat;
  production: number;
  colan: number;
  duration: number;
  worlds: number;
  entry: number;
  pathCount: number;
  inspect: number;
  merge: number;
  threshold: number;
  liveText: string;
};
