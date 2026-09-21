import { workshopMoments } from "@/content/beyond";

type WorkshopMomentsProps = {
  intensity: number;
};

const placements = [
  { top: "18%", left: "10%" },
  { top: "22%", right: "10%" },
  { top: "70%", left: "12%" },
  { top: "74%", right: "12%" },
] as const;

export function WorkshopMoments({ intensity }: WorkshopMomentsProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={intensity < 0.2}>
      {workshopMoments.map((moment, index) => {
        const place = placements[index];
        if (!place) return null;
        return (
          <p
            key={moment}
            className="absolute font-heading text-[clamp(1.15rem,2.3vw,1.6rem)] text-ink/75"
            style={{
              ...place,
              opacity: intensity * (0.45 + index * 0.12),
            }}
          >
            {moment}
          </p>
        );
      })}
    </div>
  );
}
