import { clamp01 } from "@/engine/math";
import type { JourneyScene } from "@/engine/types";

export type SceneResolution = {
  currentScene: JourneyScene | null;
  sceneProgress: number;
  previousSceneId: string | null;
  nextSceneId: string | null;
  justEntered: boolean;
  justExitedSceneId: string | null;
};

export class SceneManager {
  private readonly scenes: JourneyScene[];

  constructor(scenes: JourneyScene[]) {
    this.scenes = [...scenes].sort((a, b) => a.progressStart - b.progressStart);
  }

  getScenes(): JourneyScene[] {
    return this.scenes;
  }

  getById(id: string): JourneyScene | null {
    return this.scenes.find((scene) => scene.id === id) ?? null;
  }

  resolve(progress: number, previousSceneId: string | null = null): SceneResolution {
    const clamped = clamp01(progress);
    const currentScene = this.findScene(clamped);
    const empty: SceneResolution = {
      currentScene: null,
      sceneProgress: 0,
      previousSceneId: null,
      nextSceneId: null,
      justEntered: false,
      justExitedSceneId: null,
    };

    if (!currentScene) {
      return empty;
    }

    const index = this.scenes.findIndex((scene) => scene.id === currentScene.id);
    const span = currentScene.progressEnd - currentScene.progressStart;
    const sceneProgress =
      span <= 0 ? 1 : clamp01((clamped - currentScene.progressStart) / span);

    return {
      currentScene,
      sceneProgress,
      previousSceneId: this.scenes[index - 1]?.id ?? null,
      nextSceneId: this.scenes[index + 1]?.id ?? null,
      justEntered: previousSceneId !== null && previousSceneId !== currentScene.id,
      justExitedSceneId:
        previousSceneId !== null && previousSceneId !== currentScene.id
          ? previousSceneId
          : null,
    };
  }

  private findScene(progress: number): JourneyScene | null {
    const match = this.scenes.find(
      (scene) => progress >= scene.progressStart && progress < scene.progressEnd,
    );

    if (match) {
      return match;
    }

    return this.scenes[this.scenes.length - 1] ?? null;
  }
}
