import { beyondCopy } from "@/content/beyond";

type AuditoriumProps = {
  hall: number;
  reach: number;
};

export function Auditorium({ hall, reach }: AuditoriumProps) {
  if (hall <= 0.02 && reach <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={hall < 0.2 && reach < 0.2}>
      <div
        className="absolute left-1/2 top-[58%] h-[28vmin] w-[58vmin] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-ink/10"
        style={{ opacity: hall * 0.55 }}
      />
      <div
        className="absolute left-1/2 top-[62%] h-[18vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-ink/10"
        style={{ opacity: hall * 0.4 }}
      />
      <div
        className="absolute left-1/2 top-[28%] h-px w-[22vmin] -translate-x-1/2 bg-ink/15"
        style={{ opacity: hall * 0.5 }}
      />
      {reach > 0.02 ? (
        <div className="absolute left-1/2 top-[38%] w-[min(90vw,28rem)] -translate-x-1/2 text-center">
          <p
            className="font-heading text-[clamp(2.4rem,6vw,4.2rem)] text-ink"
            style={{ opacity: reach }}
          >
            {beyondCopy.reach}
          </p>
          <p
            className="mt-3 font-heading text-[clamp(1.05rem,2vw,1.4rem)] text-ink/70"
            style={{ opacity: reach }}
          >
            {beyondCopy.reachAside}
          </p>
        </div>
      ) : null}
    </div>
  );
}
