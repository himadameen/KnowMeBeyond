import { expandingConcepts } from "@/content/beyond";

type ExpandingFieldProps = {
  intensity: number;
};

const placements = [
  { top: "12%", left: "8%" },
  { top: "14%", right: "8%" },
  { top: "22%", left: "10%" },
  { top: "20%", right: "12%" },
  { top: "68%", left: "8%" },
  { top: "66%", right: "10%" },
  { top: "76%", left: "16%" },
  { top: "74%", right: "16%" },
  { top: "84%", left: "12%" },
  { top: "82%", right: "12%" },
] as const;

export function ExpandingField({ intensity }: ExpandingFieldProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={intensity < 0.2}>
      {expandingConcepts.map((concept, index) => {
        const place = placements[index];
        if (!place) return null;
        return (
          <p
            key={concept}
            className="absolute font-heading text-[clamp(0.95rem,1.8vw,1.25rem)] tracking-[0.06em] text-ink/55"
            style={{
              ...place,
              opacity: intensity * (0.4 + (index % 3) * 0.14),
            }}
          >
            {concept}
          </p>
        );
      })}
    </div>
  );
}
