"use client";

import { environmentStyles } from "@/design/tokens";
import type { JourneyScene } from "@/engine/types";

type SceneLayerProps = {
  scene: JourneyScene;
  active: boolean;
  reducedMotion: boolean;
};

export function SceneLayer({ scene, active, reducedMotion }: SceneLayerProps) {
  const palette = environmentStyles[scene.environment];
  const duration = reducedMotion ? 0 : (scene.transition?.durationMs ?? 400);

  return (
    <div
      aria-hidden={!active}
      className="absolute inset-0"
      style={{
        background: palette.background,
        opacity: active ? 1 : 0,
        transition: `opacity ${duration}ms ease`,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div
        className="absolute inset-x-[12%] top-1/2 h-px -translate-y-24 opacity-30"
        style={{ background: palette.accent }}
      />
    </div>
  );
}
