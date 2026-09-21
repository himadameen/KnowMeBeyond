export type WritingBeat =
  | "desk"
  | "alfaz"
  | "kinds"
  | "between"
  | "works"
  | "library"
  | "threshold";

export type WritingFrame = {
  beat: WritingBeat;
  warmth: number;
  desk: number;
  fragments: number;
  title: number;
  subtitle: number;
  kinds: number;
  kindCount: number;
  between: number;
  mother: number;
  works: number;
  workCount: number;
  library: number;
  unwritten: number;
  professional: number;
  liveText: string;
};
