import { returningNames } from "@/content/current";

type ReturningNamesProps = {
  intensity: number;
  nameCount: number;
};

const placements = [
  { top: "16%", left: "8%" },
  { top: "14%", right: "8%" },
  { top: "28%", left: "6%" },
  { top: "26%", right: "6%" },
  { top: "70%", left: "10%" },
  { top: "68%", right: "10%" },
] as const;

export function ReturningNames({ intensity, nameCount }: ReturningNamesProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={intensity < 0.2}>
      {returningNames.map((name, index) => {
        const place = placements[index];
        if (!place) return null;
        return (
          <p
            key={name}
            className="absolute font-heading text-[clamp(1.15rem,2.4vw,1.7rem)] tracking-[0.08em] text-ink/70"
            style={{
              ...place,
              opacity: intensity * (index < nameCount ? 0.85 : 0.08),
            }}
          >
            {name}
          </p>
        );
      })}
    </div>
  );
}
