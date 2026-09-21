import { buildCycle } from "@/content/software";

type BuildCycleProps = {
  intensity: number;
};

const steps = [
  { top: "36%", left: "18%" },
  { top: "32%", left: "42%" },
  { top: "36%", right: "18%" },
  { top: "56%", right: "20%" },
  { top: "60%", left: "42%" },
  { top: "56%", left: "16%" },
] as const;

export function BuildCycle({ intensity }: BuildCycleProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={intensity < 0.2}>
      <div
        className="absolute left-1/2 top-[46%] size-[38vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/10"
        style={{ opacity: intensity * 0.45 }}
      />
      {buildCycle.map((step, index) => {
        const place = steps[index];
        if (!place) return null;
        return (
          <p
            key={step}
            className="absolute font-heading text-[clamp(1.1rem,2.1vw,1.55rem)] text-ink/80"
            style={{ ...place, opacity: intensity }}
          >
            {step}
          </p>
        );
      })}
    </div>
  );
}
