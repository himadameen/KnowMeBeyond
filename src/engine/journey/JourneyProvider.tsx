"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ContentManager, LocalContentSource } from "@/engine/content/ContentManager";
import { createJourneyEngine } from "@/engine/journey/createJourneyEngine";
import { JourneyContext } from "@/engine/journey/JourneyContext";
import { createProgressDriver } from "@/engine/scroll/createProgressDriver";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { JourneyDefinition, JourneyInputSource } from "@/engine/types";

type JourneyProviderProps = {
  definition: JourneyDefinition;
  children: ReactNode;
};

export function JourneyProvider({ definition, children }: JourneyProviderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const reducedMotionRef = useRef(reducedMotion);
  const journey = useMemo(() => {
    const content = new ContentManager(new LocalContentSource(definition));
    return createJourneyEngine(content.getJourney());
  }, [definition]);
  const driver = useMemo(() => createProgressDriver(definition), [definition]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
    driver.setReducedMotion?.(reducedMotion);
  }, [driver, reducedMotion]);
  const [snapshot, setSnapshot] = useState(journey.getSnapshot());
  const [gateReleased, setGateReleased] = useState(false);

  useEffect(() => {
    const unsubscribeEngine = journey.subscribe(setSnapshot);
    const unsubscribeDriver = driver.subscribe((state) => {
      journey.update({
        progress: state.progress,
        direction: state.direction,
        velocity: state.velocity,
        source: state.source,
        reducedMotion: reducedMotionRef.current,
      });
    });
    const detach = driver.attach();
    const onResize = () => driver.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      unsubscribeDriver();
      unsubscribeEngine();
      detach();
    };
  }, [driver, journey]);

  useEffect(() => {
    return () => journey.dispose();
  }, [journey]);

  const hasAppliedMotion = useRef(false);
  useEffect(() => {
    if (!hasAppliedMotion.current) {
      hasAppliedMotion.current = true;
      return;
    }

    const current = journey.getSnapshot();
    journey.update({
      progress: current.progress,
      direction: current.direction,
      velocity: current.velocity,
      source: current.inputSource,
      reducedMotion,
    });
  }, [journey, reducedMotion]);

  const goToProgress = useCallback(
    (progress: number, source: JourneyInputSource) => {
      driver.setProgress(progress, source, reducedMotion);
    },
    [driver, reducedMotion],
  );

  const goToScene = useCallback(
    (id: string, source: JourneyInputSource = "programmatic") => {
      const progress = journey.progressForScene(id);
      if (progress === null) return;
      goToProgress(progress, source);
    },
    [goToProgress, journey],
  );

  const releaseProgressGate = useCallback(() => {
    driver.releaseGate?.();
    setGateReleased(true);
    const next = (definition.gateProgress ?? snapshot.progress) + 0.014;
    driver.setProgress(next, "programmatic", reducedMotion);
  }, [definition.gateProgress, driver, reducedMotion, snapshot.progress]);

  const isProgressGated = Boolean(
    definition.gateProgress !== undefined &&
      !gateReleased &&
      snapshot.progress >= definition.gateProgress - 0.008,
  );

  const value = useMemo(
    () => ({
      definition,
      snapshot,
      goToProgress,
      goToScene,
      releaseProgressGate,
      isProgressGated,
      gateReleased,
    }),
    [
      definition,
      gateReleased,
      goToProgress,
      goToScene,
      isProgressGated,
      releaseProgressGate,
      snapshot,
    ],
  );

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}
