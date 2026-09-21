export type ExperienceMode = "journey" | "professional";

export type JourneyInputSource = "scroll" | "swipe" | "keyboard" | "programmatic";

export type JourneyDirection = "forward" | "backward" | "idle";

export type AnimationPurpose =
  | "progression"
  | "reveal"
  | "emotion"
  | "attention"
  | "discovery"
  | "atmosphere"
  | "transition";

export type AnimationCategory = "micro" | "ui" | "scene" | "cinematic" | "major";

export type SceneEnvironment = "dark" | "technical" | "warm";

export type CameraState = {
  x: number;
  y: number;
  z: number;
  rotation: number;
  scale: number;
};

export type CameraKeyframe = {
  at: number;
  state: Partial<CameraState>;
};

export type SceneTransition = {
  type: "fade" | "cut" | "hold";
  durationMs: number;
};

export type JourneyTrigger = {
  id: string;
  at: number;
  once?: boolean;
};

export type JourneyScene = {
  id: string;
  slug: string;
  title: string;
  chapter?: string;
  environment: SceneEnvironment;
  progressStart: number;
  progressEnd: number;
  camera?: CameraKeyframe[];
  triggers?: JourneyTrigger[];
  transition?: SceneTransition;
};

export type JourneyProgressMode = "document-scroll" | "cinematic";

export type JourneyHudMode = "hidden" | "minimal";

export type JourneyDefinition = {
  id: string;
  title: string;
  mode: ExperienceMode;
  scrollLengthVh: number;
  progressMode?: JourneyProgressMode;
  hud?: JourneyHudMode;
  gateProgress?: number;
  autoUntilProgress?: number;
  lingerFromProgress?: number;
  openingEndProgress?: number;
  scenes: JourneyScene[];
};

export type JourneySnapshot = {
  progress: number;
  sceneProgress: number;
  currentScene: JourneyScene | null;
  previousSceneId: string | null;
  nextSceneId: string | null;
  justEntered: boolean;
  justExitedSceneId: string | null;
  direction: JourneyDirection;
  velocity: number;
  camera: CameraState;
  inputSource: JourneyInputSource;
  reducedMotion: boolean;
};
