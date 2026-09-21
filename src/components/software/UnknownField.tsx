import { unknownFragments } from "@/content/software";

type UnknownFieldProps = {
  intensity: number;
  chaos: number;
  reducedMotion: boolean;
};

const placements = [
  { top: "12%", left: "8%" },
  { top: "16%", right: "8%" },
  { top: "24%", left: "10%" },
  { top: "28%", right: "10%" },
  { top: "68%", left: "8%" },
  { top: "72%", right: "8%" },
  { top: "14%", left: "42%" },
  { top: "76%", left: "18%" },
  { top: "80%", right: "16%" },
  { top: "84%", left: "12%" },
  { top: "20%", right: "36%" },
  { top: "86%", right: "10%" },
  { top: "70%", left: "40%" },
  { top: "88%", left: "38%" },
] as const;

export function UnknownField({ intensity, chaos, reducedMotion }: UnknownFieldProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={intensity < 0.2}>
      {unknownFragments.map((fragment, index) => {
        const place = placements[index];
        if (!place) return null;
        const drift = reducedMotion ? 0 : (index % 4) * 10 * chaos;
        return (
          <p
            key={fragment}
            className="absolute font-heading text-small tracking-[0.06em] text-ink/35"
            style={{
              ...place,
              opacity: intensity * (0.22 + (index % 5) * 0.1) * (0.45 + chaos * 0.55),
              transform: `translate(${drift}px, ${-drift * 0.35}px)`,
            }}
          >
            {fragment}
          </p>
        );
      })}
      <div
        className="absolute left-[18%] top-[78%] h-14 w-28 border border-ink/10"
        style={{ opacity: intensity * 0.35 * chaos }}
      />
      <div
        className="absolute right-[16%] top-[80%] h-10 w-20 border border-ink/10"
        style={{ opacity: intensity * 0.22 * chaos }}
      />
    </div>
  );
}
