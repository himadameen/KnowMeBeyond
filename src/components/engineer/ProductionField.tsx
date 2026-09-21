import { productionConcepts } from "@/content/engineer";

type ProductionFieldProps = {
  intensity: number;
};

const placements = [
  { top: "12%", left: "8%" },
  { top: "16%", right: "8%" },
  { top: "22%", left: "12%" },
  { top: "26%", right: "12%" },
  { top: "68%", left: "8%" },
  { top: "72%", right: "8%" },
  { top: "14%", left: "42%" },
  { top: "76%", left: "16%" },
  { top: "80%", right: "16%" },
  { top: "84%", left: "28%" },
  { top: "86%", right: "12%" },
  { top: "88%", left: "42%" },
] as const;

export function ProductionField({ intensity }: ProductionFieldProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={intensity < 0.2}>
      {productionConcepts.map((concept, index) => {
        const place = placements[index];
        if (!place) return null;
        return (
          <p
            key={concept}
            className="absolute font-heading text-small tracking-[0.08em] text-ink/40"
            style={{
              ...place,
              opacity: intensity * (0.32 + (index % 4) * 0.12),
            }}
          >
            {concept}
          </p>
        );
      })}
      <div
        className="absolute left-[14%] top-[76%] h-12 w-24 border border-ink/10"
        style={{ opacity: intensity * 0.3 }}
      />
      <div
        className="absolute right-[16%] top-[78%] h-9 w-16 border border-ink/10"
        style={{ opacity: intensity * 0.2 }}
      />
    </div>
  );
}
