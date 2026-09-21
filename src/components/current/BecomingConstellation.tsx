import { becomingIdentities } from "@/content/current";

type BecomingConstellationProps = {
  intensity: number;
  nodeCount: number;
};

const placements = [
  { top: "16%", left: "10%" },
  { top: "14%", right: "10%" },
  { top: "34%", left: "8%" },
  { top: "32%", right: "8%" },
  { top: "68%", left: "12%" },
  { top: "66%", right: "12%" },
  { top: "80%", left: "42%" },
] as const;

export function BecomingConstellation({ intensity, nodeCount }: BecomingConstellationProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={intensity < 0.2}>
      {becomingIdentities.map((identity, index) => {
        const place = placements[index];
        if (!place) return null;
        return (
          <p
            key={identity}
            className="absolute font-heading text-[clamp(1.2rem,2.5vw,1.75rem)] text-ink/80"
            style={{
              ...place,
              opacity: intensity * (index < nodeCount ? 0.9 : 0.08),
            }}
          >
            {identity}
          </p>
        );
      })}
    </div>
  );
}
