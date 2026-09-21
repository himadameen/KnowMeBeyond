import { writingKinds } from "@/content/writing";

type WritingKindsProps = {
  intensity: number;
  revealed: number;
};

const placements = [
  { top: "16%", left: "10%" },
  { top: "20%", right: "10%" },
  { top: "68%", left: "12%" },
  { top: "72%", right: "12%" },
  { top: "80%", left: "40%" },
] as const;

export function WritingKinds({ intensity, revealed }: WritingKindsProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={intensity < 0.2}>
      {writingKinds.map((kind, index) => {
        const place = placements[index];
        if (!place) return null;
        return (
          <p
            key={kind}
            className="absolute font-heading text-[clamp(1.15rem,2.3vw,1.6rem)] text-ink/75"
            style={{
              ...place,
              opacity: intensity * (index < revealed ? 0.9 : 0.06),
            }}
          >
            {kind}
          </p>
        );
      })}
    </div>
  );
}
