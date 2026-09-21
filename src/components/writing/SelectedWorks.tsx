import { selectedWorks } from "@/content/writing";

type SelectedWorksProps = {
  intensity: number;
  revealed: number;
};

export function SelectedWorks({ intensity, revealed }: SelectedWorksProps) {
  if (intensity <= 0.02) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-[12%] top-[36%] flex flex-col items-center gap-5"
      style={{ opacity: intensity }}
      aria-hidden={intensity < 0.2}
    >
      {selectedWorks.map((work, index) => (
        <p
          key={work}
          className="font-heading text-[clamp(1.35rem,2.8vw,2rem)] text-ink"
          style={{ opacity: index < revealed ? 0.9 : 0.06 }}
        >
          {work}
        </p>
      ))}
    </div>
  );
}
