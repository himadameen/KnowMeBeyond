import { softwareCopy } from "@/content/software";

type LearningPlacesProps = {
  newton: number;
  aspirasys: number;
};

export function LearningPlaces({ newton, aspirasys }: LearningPlacesProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {newton > 0.02 ? (
        <p
          className="absolute left-[12%] top-[42%] font-heading text-[clamp(1.6rem,3.4vw,2.4rem)] text-ink"
          style={{ opacity: newton }}
          aria-hidden={newton < 0.2}
        >
          {softwareCopy.newton}
        </p>
      ) : null}
      {aspirasys > 0.02 ? (
        <p
          className="absolute right-[12%] top-[48%] font-heading text-[clamp(1.6rem,3.4vw,2.4rem)] text-ink"
          style={{ opacity: aspirasys }}
          aria-hidden={aspirasys < 0.2}
        >
          {softwareCopy.aspirasys}
        </p>
      ) : null}
    </div>
  );
}
