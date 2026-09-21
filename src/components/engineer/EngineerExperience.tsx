"use client";

import { useEffect, useMemo, useState } from "react";
import { AmbientPath } from "@/components/engineer/AmbientPath";
import { ArchitectureInspect } from "@/components/engineer/ArchitectureInspect";
import { ColanPlace } from "@/components/engineer/ColanPlace";
import { EngineerAtmosphere } from "@/components/engineer/EngineerAtmosphere";
import { EngineerCopy } from "@/components/engineer/EngineerCopy";
import { ProductionField } from "@/components/engineer/ProductionField";
import { ProjectConstellation } from "@/components/engineer/ProjectConstellation";
import { ProjectInterior } from "@/components/engineer/ProjectInterior";
import {
  ENGINEER_END,
  projectPath,
  type ArchitectureNode,
  type ProjectWorld,
} from "@/content/engineer";
import { SOFTWARE_END } from "@/content/software";
import { cameraToCss } from "@/engine/camera/CameraController";
import { resolveEngineerFrame } from "@/engine/engineer/EngineerDirector";
import { useJourney } from "@/engine/journey/JourneyContext";
import { clamp, clamp01, smoothstep } from "@/engine/math";

export function EngineerExperience() {
  const { snapshot } = useJourney();
  const frame = useMemo(() => resolveEngineerFrame(snapshot.progress), [snapshot.progress]);
  const presence = clamp01(
    smoothstep(SOFTWARE_END - 0.02, SOFTWARE_END + 0.04, snapshot.progress) *
      (1 - smoothstep(ENGINEER_END - 0.015, ENGINEER_END + 0.035, snapshot.progress)),
  );
  const [world, setWorld] = useState<ProjectWorld | null>(null);
  const [localSteps, setLocalSteps] = useState(1);
  const [archNode, setArchNode] = useState<ArchitectureNode | null>(null);
  const [depth, setDepth] = useState(0);
  const activeWorld = frame.merge > 0.82 ? null : world;

  useEffect(() => {
    if (!activeWorld) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setWorld(null);
        setLocalSteps(1);
        setArchNode(null);
        setDepth(0);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeWorld]);

  if (presence <= 0.01) {
    return null;
  }

  const revealed = activeWorld
    ? clamp(localSteps, 1, projectPath.length)
    : frame.pathCount;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      data-engineer-beat={frame.beat}
      data-phase8-ready={frame.threshold > 0.5 ? "true" : "false"}
      style={{ opacity: presence }}
    >
      <EngineerAtmosphere
        production={frame.production}
        merge={frame.merge}
        threshold={frame.threshold}
      />
      <div className="absolute inset-0" style={{ transform: cameraToCss(snapshot.camera) }}>
        <ProductionField intensity={frame.production} />
        <ColanPlace place={frame.colan} duration={frame.duration} />
        <ProjectConstellation
          intensity={frame.worlds * (activeWorld ? 0.18 : 1 - frame.entry * 0.72)}
          merge={frame.merge}
          selected={activeWorld}
          onEnter={(next) => {
            setWorld(next);
            setLocalSteps(1);
            setArchNode(null);
            setDepth(0);
          }}
        />
        {activeWorld ? (
          <ProjectInterior
            world={activeWorld}
            revealed={revealed}
            archNode={archNode}
            depth={depth}
            onSelectArch={(node) => {
              setArchNode(node);
              setDepth(0);
            }}
            onDeepen={() => setDepth((value) => clamp(value + 1, 0, 3))}
            onContinue={() => setLocalSteps((value) => clamp(value + 1, 1, projectPath.length))}
            onLeave={() => {
              setWorld(null);
              setLocalSteps(1);
              setArchNode(null);
              setDepth(0);
            }}
          />
        ) : (
          <>
            <AmbientPath intensity={frame.entry} revealed={frame.pathCount} />
            <ArchitectureInspect
              intensity={frame.inspect}
              selected={archNode}
              depth={depth}
              onSelect={(node) => {
                setArchNode(node);
                setDepth(0);
              }}
              onDeepen={() => setDepth((value) => clamp(value + 1, 0, 3))}
            />
          </>
        )}
        <EngineerCopy threshold={frame.threshold} />
      </div>

      {snapshot.progress >= SOFTWARE_END && snapshot.progress < ENGINEER_END ? (
        <>
          <h2 id="scene-title" className="sr-only">
            {activeWorld ? `${activeWorld}. ${frame.liveText}` : frame.liveText || "The engineer"}
          </h2>
          <div aria-live="polite" className="sr-only">
            {activeWorld ? `${activeWorld}. ${frame.liveText}` : frame.liveText}
          </div>
        </>
      ) : null}
    </div>
  );
}
