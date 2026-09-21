import { currentCopy } from "@/content/current";

type DoyensysPlaceProps = {
  intensity: number;
};

export function DoyensysPlace({ intensity }: DoyensysPlaceProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0 text-center">
      <p
        className="absolute left-1/2 top-[44%] w-[min(90vw,40rem)] -translate-x-1/2 font-heading text-[clamp(2rem,5.5vw,4rem)] tracking-[0.16em] text-ink"
        style={{ opacity: intensity }}
        aria-hidden={intensity < 0.2}
      >
        {currentCopy.place}
      </p>
    </div>
  );
}
