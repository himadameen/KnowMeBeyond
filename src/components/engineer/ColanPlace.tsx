import { engineerCopy } from "@/content/engineer";

type ColanPlaceProps = {
  place: number;
  duration: number;
};

export function ColanPlace({ place, duration }: ColanPlaceProps) {
  return (
    <div className="pointer-events-none absolute inset-0 text-center">
      {place > 0.02 ? (
        <p
          className="absolute left-1/2 top-[40%] w-[min(90vw,36rem)] -translate-x-1/2 font-heading text-[clamp(1.8rem,4vw,2.8rem)] text-ink"
          style={{ opacity: place }}
          aria-hidden={place < 0.2}
        >
          {engineerCopy.place}
        </p>
      ) : null}
      {duration > 0.02 ? (
        <p
          className="absolute left-1/2 top-[50%] w-[min(90vw,32rem)] -translate-x-1/2 font-heading text-[clamp(1.15rem,2.2vw,1.6rem)] text-ink/70"
          style={{ opacity: duration }}
          aria-hidden={duration < 0.2}
        >
          {engineerCopy.duration}
        </p>
      ) : null}
    </div>
  );
}
