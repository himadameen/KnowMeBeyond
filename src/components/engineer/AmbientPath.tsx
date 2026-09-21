import { projectPath } from "@/content/engineer";

type AmbientPathProps = {
  intensity: number;
  revealed: number;
};

export function AmbientPath({ intensity, revealed }: AmbientPathProps) {
  if (intensity <= 0.02) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-[12%] top-[30%] flex flex-col items-center gap-3"
      style={{ opacity: intensity }}
      aria-hidden={intensity < 0.2}
    >
      {projectPath.map((step, index) => (
        <p
          key={step}
          className="font-heading text-[clamp(1.05rem,2vw,1.45rem)] text-ink/75"
          style={{ opacity: index < revealed ? 0.85 : 0.08 }}
        >
          {step}
        </p>
      ))}
    </div>
  );
}
