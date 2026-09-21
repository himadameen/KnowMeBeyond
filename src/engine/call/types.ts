export type CallBeat =
  | "ring"
  | "options"
  | "counsel"
  | "night"
  | "verse"
  | "quiet"
  | "morning"
  | "decision";

export type CallFrame = {
  beat: CallBeat;
  fivePm: number;
  ring: number;
  silhouette: number;
  phone: number;
  twoOptions: number;
  optionOne: number;
  optionTwo: number;
  whatever: number;
  completely: number;
  twoRoads: number;
  night: number;
  nightHour: number;
  scrolling: number;
  verse: number;
  wudu: number;
  salah: number;
  dua: number;
  sleep: number;
  morning: number;
  decision: number;
  welcome: number;
  digitalSeed: number;
  liveText: string;
};
