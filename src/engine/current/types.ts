export type CurrentBeat =
  | "doyensys"
  | "becoming"
  | "reflection"
  | "unknown"
  | "names"
  | "brand"
  | "close";

export type CurrentFrame = {
  beat: CurrentBeat;
  place: number;
  becoming: number;
  nodeCount: number;
  came: number;
  became: number;
  next: number;
  unknown: number;
  beautiful: number;
  names: number;
  nameCount: number;
  brand: number;
  subtitle: number;
  person: number;
  roles: number;
  actions: number;
  liveText: string;
};
