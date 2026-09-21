"use client";

import { useEffect, useRef } from "react";
import { CinematicWorld } from "@/components/journey/CinematicWorld";
import { SceneLayer } from "@/components/journey/SceneLayer";
import { AnimationManager } from "@/engine/animation/AnimationManager";
import { cameraToCss } from "@/engine/camera/CameraController";
import { useJourney } from "@/engine/journey/JourneyContext";

const animation = new AnimationManager();

export function JourneyWorld() {
  const { definition } = useJourney();

  if (definition.progressMode === "cinematic" || definition.id === "knowbeyondme-opening") {
    return <CinematicWorld />;
  }

  return <EngineTestWorld />;
}

function EngineTestWorld() {
  const { definition, snapshot } = useJourney();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { currentScene, camera, reducedMotion } = snapshot;
  const sceneId = currentScene?.id;

  useEffect(() => {
    const node = titleRef.current;
    if (!node || !sceneId) {
      return;
    }

    const tween = animation.play(
      node,
      { opacity: 1, y: 0 },
      {
        purpose: "reveal",
        category: "scene",
        reducedMotion,
        from: { opacity: 0, y: reducedMotion ? 0 : 14 },
      },
    );

    return () => {
      animation.kill(node);
      if (tween && "kill" in tween) {
        tween.kill();
      }
    };
  }, [sceneId, reducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: "1200px" }}>
      {definition.scenes.map((scene) => (
        <SceneLayer
          key={scene.id}
          scene={scene}
          active={scene.id === currentScene?.id}
          reducedMotion={reducedMotion}
        />
      ))}

      <div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{
          transform: cameraToCss(camera),
        }}
      >
        <p className="font-heading text-caption tracking-[0.28em] text-gold-muted">
          JOURNEY ENGINE
        </p>
        <h2
          ref={titleRef}
          id="scene-title"
          className="mt-4 font-heading text-hero text-ink"
        >
          {currentScene?.title ?? "Unavailable"}
        </h2>
        <p className="mt-3 text-small text-ink/55">
          {currentScene
            ? `${currentScene.environment} environment`
            : "No scene is registered."}
        </p>
      </div>
    </div>
  );
}
