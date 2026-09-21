import { emergingPatterns } from "@/content/software";

type PatternSpaceProps = {
  intensity: number;
};

const orbits = [
  { top: "16%", left: "10%" },
  { top: "14%", right: "10%" },
  { top: "70%", left: "12%" },
  { top: "68%", right: "12%" },
  { top: "80%", left: "50%", transform: "translateX(-50%)" },
] as const;

export function PatternSpace({ intensity }: PatternSpaceProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={intensity < 0.2}>
      {emergingPatterns.map((item, index) => {
        const orbit = orbits[index];
        if (!orbit) return null;
        return (
          <p
            key={item}
            className="absolute font-heading text-caption tracking-[0.18em] text-ink/75"
            style={{
              ...orbit,
              opacity: intensity,
            }}
          >
            {item}
          </p>
        );
      })}
    </div>
  );
}
