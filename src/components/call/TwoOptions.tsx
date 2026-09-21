import { callCopy } from "@/content/the-call";

type TwoOptionsProps = {
  twoOptions: number;
  optionOne: number;
  optionTwo: number;
  whatever: number;
  completely: number;
  twoRoads: number;
};

export function TwoOptions({
  twoOptions,
  optionOne,
  optionTwo,
  whatever,
  completely,
  twoRoads,
}: TwoOptionsProps) {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <Line opacity={twoOptions} className="font-heading text-[clamp(1.4rem,3vw,2.1rem)] text-ink">
        {callCopy.twoOptions}
      </Line>

      {optionOne > 0.02 ? (
      <div className="absolute left-[10%] top-[38%] max-w-[16rem] text-left" style={{ opacity: optionOne }} aria-hidden={optionOne < 0.2}>
        <p className="font-heading text-caption tracking-[0.22em] text-gold-muted">
          {callCopy.optionOneLabel}
        </p>
        <p className="mt-3 font-heading text-subhead text-ink">{callCopy.optionOneBody}</p>
        <p className="mt-2 text-small text-ink/55">{callCopy.optionOneAside}</p>
      </div>
      ) : null}

      {optionTwo > 0.02 ? (
      <div className="absolute right-[10%] top-[38%] max-w-[16rem] text-right" style={{ opacity: optionTwo }} aria-hidden={optionTwo < 0.2}>
        <p className="font-heading text-caption tracking-[0.22em] text-gold-muted">
          {callCopy.optionTwoLabel}
        </p>
        <p className="mt-3 font-heading text-subhead text-ink">{callCopy.optionTwoBody}</p>
        <p className="mt-2 text-small text-ink/55">{callCopy.optionTwoAside}</p>
        <p className="mt-1 text-small text-ink/45">{callCopy.optionTwoEffort}</p>
        <p className="mt-1 text-small text-ink/45">{callCopy.optionTwoGrowth}</p>
      </div>
      ) : null}

      <Line opacity={whatever} className="font-heading text-[clamp(1.3rem,2.6vw,1.9rem)] text-ink">
        {callCopy.whatever}
      </Line>
      <Line opacity={completely} className="font-heading text-[clamp(1.3rem,2.6vw,1.9rem)] text-ink">
        {callCopy.completely}
      </Line>
      <Line opacity={twoRoads} className="font-heading text-[clamp(1.35rem,2.8vw,2rem)] text-ink">
        {callCopy.twoRoads}
      </Line>
    </div>
  );
}

function Line({
  opacity,
  className,
  children,
}: {
  opacity: number;
  className: string;
  children: string;
}) {
  if (opacity <= 0.02) return null;
  return (
    <p className={className} style={{ opacity }} aria-hidden={opacity < 0.2}>
      {children}
    </p>
  );
}
