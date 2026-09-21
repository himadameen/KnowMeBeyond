export type SoftwareBeat =
  | "transform"
  | "unknown"
  | "pattern"
  | "learning"
  | "building"
  | "helping"
  | "leading"
  | "threshold";

export type SoftwareFrame = {
  beat: SoftwareBeat;
  transform: number;
  transformIndex: number;
  destination: number;
  habit: number;
  chaos: number;
  unknown: number;
  pattern: number;
  newton: number;
  aspirasys: number;
  building: number;
  helping: number;
  walking: number;
  nodes: number;
  nodeCount: number;
  leadBegin: number;
  leadTrust: number;
  threshold: number;
  liveText: string;
};
