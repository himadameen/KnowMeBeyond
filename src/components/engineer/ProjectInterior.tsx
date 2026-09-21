import { ArchitectureInspect } from "@/components/engineer/ArchitectureInspect";
import {
  engineerCopy,
  projectPath,
  type ArchitectureNode,
  type ProjectWorld,
} from "@/content/engineer";

type ProjectInteriorProps = {
  world: ProjectWorld;
  revealed: number;
  archNode: ArchitectureNode | null;
  depth: number;
  onSelectArch: (node: ArchitectureNode) => void;
  onDeepen: () => void;
  onContinue: () => void;
  onLeave: () => void;
};

export function ProjectInterior({
  world,
  revealed,
  archNode,
  depth,
  onSelectArch,
  onDeepen,
  onContinue,
  onLeave,
}: ProjectInteriorProps) {
  const canContinue = revealed < projectPath.length;

  return (
    <div
      className="absolute inset-0 z-20 overflow-hidden bg-background/92"
      onWheel={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
    >
      <p className="absolute left-1/2 top-[14%] -translate-x-1/2 font-heading text-[clamp(1.6rem,3.4vw,2.4rem)] text-ink">
        {world}
      </p>

      <ol className="absolute inset-x-[12%] top-[26%] flex flex-col items-center gap-2">
        {projectPath.map((step, index) => (
          <li
            key={step}
            className="font-heading text-[clamp(1.05rem,2vw,1.45rem)] text-ink/80"
            style={{ opacity: index < revealed ? 0.9 : 0.08 }}
          >
            {step}
          </li>
        ))}
      </ol>

      {revealed >= 3 ? (
        <div className="absolute inset-x-[8%] top-[58%]">
          <ArchitectureInspect
            intensity={1}
            selected={archNode}
            depth={depth}
            embedded
            onSelect={onSelectArch}
            onDeepen={onDeepen}
          />
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-[6%] flex justify-center gap-8">
        {canContinue ? (
          <button
            type="button"
            onClick={onContinue}
            className="font-heading text-caption tracking-[0.22em] text-ink/70"
          >
            {engineerCopy.continue}
          </button>
        ) : null}
        <button
          type="button"
          onClick={onLeave}
          className="font-heading text-caption tracking-[0.22em] text-ink/55"
        >
          {engineerCopy.leave}
        </button>
      </div>
    </div>
  );
}
