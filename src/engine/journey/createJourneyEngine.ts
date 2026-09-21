import { CameraController, identityCamera } from "@/engine/camera/CameraController";
import { SceneManager } from "@/engine/scene/SceneManager";
import { TriggerManager } from "@/engine/trigger/TriggerManager";
import { clamp01 } from "@/engine/math";
import type {
  JourneyDefinition,
  JourneyDirection,
  JourneyInputSource,
  JourneySnapshot,
  JourneyTrigger,
} from "@/engine/types";

export type JourneyEngineUpdate = {
  progress: number;
  direction: JourneyDirection;
  velocity: number;
  source: JourneyInputSource;
  reducedMotion: boolean;
};

export class JourneyEngine {
  readonly scenes: SceneManager;
  readonly camera: CameraController;
  readonly triggers: TriggerManager;

  private snapshot: JourneySnapshot;
  private readonly listeners = new Set<(snapshot: JourneySnapshot) => void>();

  constructor(definition: JourneyDefinition) {
    this.scenes = new SceneManager(definition.scenes);
    this.camera = new CameraController();
    this.triggers = new TriggerManager();
    this.snapshot = {
      progress: 0,
      sceneProgress: 0,
      currentScene: definition.scenes[0] ?? null,
      previousSceneId: null,
      nextSceneId: definition.scenes[1]?.id ?? null,
      justEntered: false,
      justExitedSceneId: null,
      direction: "idle",
      velocity: 0,
      camera: identityCamera,
      inputSource: "scroll",
      reducedMotion: false,
    };
  }

  getSnapshot(): JourneySnapshot {
    return this.snapshot;
  }

  subscribe(listener: (snapshot: JourneySnapshot) => void): () => void {
    this.listeners.add(listener);
    listener(this.snapshot);
    return () => {
      this.listeners.delete(listener);
    };
  }

  update(next: JourneyEngineUpdate): JourneySnapshot {
    const progress = clamp01(next.progress);
    const resolved = this.scenes.resolve(progress, this.snapshot.currentScene?.id ?? null);
    const camera = this.camera.fromScene(
      resolved.currentScene,
      resolved.sceneProgress,
      next.reducedMotion,
    );

    this.snapshot = {
      progress,
      sceneProgress: resolved.sceneProgress,
      currentScene: resolved.currentScene,
      previousSceneId: resolved.previousSceneId,
      nextSceneId: resolved.nextSceneId,
      justEntered: resolved.justEntered,
      justExitedSceneId: resolved.justExitedSceneId,
      direction: next.direction,
      velocity: next.velocity,
      camera,
      inputSource: next.source,
      reducedMotion: next.reducedMotion,
    };

    this.triggers.evaluate(resolved.sceneProgress, resolved.currentScene?.triggers);
    this.listeners.forEach((listener) => listener(this.snapshot));
    return this.snapshot;
  }

  evaluateTriggers(): JourneyTrigger[] {
    const scene = this.snapshot.currentScene;
    if (!scene) return [];
    return this.triggers.evaluate(this.snapshot.sceneProgress, scene.triggers);
  }

  progressForScene(id: string): number | null {
    const scene = this.scenes.getById(id);
    if (!scene) return null;
    return scene.progressStart + (scene.progressEnd - scene.progressStart) * 0.02;
  }

  dispose(): void {
    this.listeners.clear();
    this.triggers.reset();
  }
}

export function createJourneyEngine(definition: JourneyDefinition): JourneyEngine {
  return new JourneyEngine(definition);
}
