import {
  architectureNodes,
  depthQuestions,
  engineerCopy,
  type ArchitectureNode,
} from "@/content/engineer";

type ArchitectureInspectProps = {
  intensity: number;
  selected: ArchitectureNode | null;
  depth: number;
  embedded?: boolean;
  onSelect: (node: ArchitectureNode) => void;
  onDeepen: () => void;
};

export function ArchitectureInspect({
  intensity,
  selected,
  depth,
  embedded = false,
  onSelect,
  onDeepen,
}: ArchitectureInspectProps) {
  if (intensity <= 0.02) return null;

  return (
    <div
      className={embedded ? "relative mt-6" : "absolute inset-x-[8%] bottom-[8%] z-10"}
      style={{ opacity: intensity }}
      aria-hidden={intensity < 0.2}
    >
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
        {architectureNodes.map((node) => {
          const active = selected === node;
          return (
            <button
              key={node}
              type="button"
              onClick={() => onSelect(node)}
              className="font-heading text-caption tracking-[0.14em] text-ink/70"
              style={{ opacity: active ? 1 : 0.55 }}
              aria-pressed={active}
              aria-label={`${engineerCopy.inspect} ${node}`}
            >
              {node}
            </button>
          );
        })}
      </div>

      {selected ? (
        <div className="mt-5 flex justify-center gap-6">
          {depthQuestions.map((question, index) => {
            const visible = depth > index;
            const next = depth === index;
            if (!visible && !next) return null;
            if (next) {
              return (
                <button
                  key={question}
                  type="button"
                  onClick={onDeepen}
                  className="font-heading text-small tracking-[0.12em] text-ink/80"
                >
                  {question}
                </button>
              );
            }
            return (
              <p key={question} className="font-heading text-small tracking-[0.12em] text-ink/55">
                {question}
              </p>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
