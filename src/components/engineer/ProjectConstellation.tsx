import { engineerCopy, projectWorlds, type ProjectWorld } from "@/content/engineer";

type ProjectConstellationProps = {
  intensity: number;
  merge: number;
  selected: ProjectWorld | null;
  onEnter: (world: ProjectWorld) => void;
};

const placements = [
  { top: "14%", left: "8%" },
  { top: "12%", left: "44%" },
  { top: "16%", right: "8%" },
  { top: "28%", left: "10%" },
  { top: "26%", right: "10%" },
  { top: "64%", left: "8%" },
  { top: "62%", right: "8%" },
  { top: "72%", left: "22%" },
  { top: "70%", right: "20%" },
  { top: "82%", left: "12%" },
  { top: "80%", right: "12%" },
] as const;

export function ProjectConstellation({
  intensity,
  merge,
  selected,
  onEnter,
}: ProjectConstellationProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="absolute inset-0" aria-hidden={intensity < 0.2}>
      {projectWorlds.map((world, index) => {
        const place = placements[index];
        if (!place) return null;
        const towardX = index % 2 === 0 ? 18 : -18;
        const towardY = index < 6 ? 10 : -8;
        const active = selected === world;

        return (
          <button
            key={world}
            type="button"
            onClick={() => onEnter(world)}
            className="absolute font-heading text-[clamp(1rem,2vw,1.35rem)] text-ink/80"
            style={{
              ...place,
              opacity: intensity * (active ? 1 : 0.55 + (index % 3) * 0.1),
              transform: `translate(${merge * towardX}px, ${merge * towardY}px)`,
            }}
            aria-pressed={active}
            aria-label={`${engineerCopy.enter} ${world}`}
          >
            {world}
          </button>
        );
      })}
    </div>
  );
}
