export type UncertaintyBeat =
  | "expected"
  | "time"
  | "search"
  | "sap"
  | "crossroads"
  | "call";

export type UncertaintyFrame = {
  beat: UncertaintyBeat;
  roadClarity: number;
  roadScale: number;
  daylight: number;
  evening: number;
  night: number;
  mist: number;
  year: number;
  days: number;
  weeks: number;
  months: number;
  search: number;
  sap: number;
  core: number;
  alternative: number;
  fork: number;
  phone: number;
  vibration: number;
  theCall: number;
  liveText: string;
};
