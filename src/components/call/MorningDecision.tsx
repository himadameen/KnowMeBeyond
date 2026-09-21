import { callCopy } from "@/content/the-call";

type MorningDecisionProps = {
  decision: number;
  welcome: number;
};

export function MorningDecision({ decision, welcome }: MorningDecisionProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      {decision > 0.02 ? (
        <p
          className="font-heading text-[clamp(1.45rem,3vw,2.2rem)] text-ink"
          style={{ opacity: decision }}
          aria-hidden={decision < 0.2}
        >
          {callCopy.decision}
        </p>
      ) : null}
      {welcome > 0.02 ? (
        <p
          className="mt-6 font-heading text-[clamp(1.25rem,2.5vw,1.85rem)] text-ink/80"
          style={{ opacity: welcome }}
          aria-hidden={welcome < 0.2}
        >
          {callCopy.welcome}
        </p>
      ) : null}
    </div>
  );
}
