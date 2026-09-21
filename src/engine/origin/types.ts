export type OriginBeat = "arrive" | "school" | "diploma" | "degree" | "road";

export type OriginFrame = {
  beat: OriginBeat;
  travel: number;
  school: number;
  workshop: number;
  engineering: number;
  road: number;
  schoolReadable: number;
  diplomaReadable: number;
  degreeReadable: number;
  roadReadable: number;
  blueprint: number;
  complexity: number;
  warmth: number;
  light: number;
  liveText: string;
};
