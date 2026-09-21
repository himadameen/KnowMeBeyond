"use client";

import { useEffect } from "react";
import { useJourney } from "@/engine/journey/JourneyContext";

export function useJourneyKeyboard(): void {
  const { definition, snapshot, goToProgress, goToScene } = useJourney();

  useEffect(() => {
    if (definition.progressMode === "cinematic") {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        goToProgress(0, "keyboard");
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        goToProgress(1, "keyboard");
        return;
      }

      const sceneId = snapshot.currentScene?.id;
      if (!sceneId) return;

      if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown") {
        if (snapshot.nextSceneId) {
          event.preventDefault();
          goToScene(snapshot.nextSceneId, "keyboard");
        }
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp") {
        if (snapshot.previousSceneId) {
          event.preventDefault();
          goToScene(snapshot.previousSceneId, "keyboard");
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    definition.progressMode,
    goToProgress,
    goToScene,
    snapshot.currentScene?.id,
    snapshot.nextSceneId,
    snapshot.previousSceneId,
  ]);
}
