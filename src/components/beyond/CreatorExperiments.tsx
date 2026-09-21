import { creatorExperiments } from "@/content/beyond";

type CreatorExperimentsProps = {
  intensity: number;
};

const placements = [
  { top: "22%", left: "10%" },
  { top: "20%", right: "10%" },
  { top: "74%", left: "50%", transform: "translateX(-50%)" },
] as const;

export function CreatorExperiments({ intensity }: CreatorExperimentsProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={intensity < 0.2}>
      {creatorExperiments.map((name, index) => {
        const place = placements[index];
        if (!place) return null;
        return (
          <p
            key={name}
            className="absolute font-heading text-[clamp(1.4rem,3vw,2.1rem)] text-ink"
            style={{
              ...place,
              opacity: intensity,
            }}
          >
            {name}
          </p>
        );
      })}
    </div>
  );
}
