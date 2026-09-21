import { openingCopy } from "@/content/opening";
import type { OpeningFrame } from "@/engine/opening/types";
import type { ReactNode } from "react";

type OpeningCopyProps = {
  frame: OpeningFrame;
};

export function OpeningCopy({ frame }: OpeningCopyProps) {
  return (
    <div className="pointer-events-none absolute inset-0 text-center">
      <div className="absolute left-1/2 top-[44%] w-[min(90vw,42rem)] -translate-x-1/2 -translate-y-1/2">
        <AtmosphericLine
          opacity={frame.questionLead}
          className="font-heading text-[clamp(1.7rem,4.2vw,3rem)] leading-tight text-ink"
        >
          {openingCopy.questionLead}
        </AtmosphericLine>
        <AtmosphericLine
          opacity={frame.questionEnd}
          className="mt-3 font-heading text-[clamp(1.7rem,4.2vw,3rem)] leading-tight text-ink"
        >
          {openingCopy.questionEnd}
        </AtmosphericLine>
      </div>

      <AtmosphericLine
        opacity={frame.invitationRead}
        className="absolute left-1/2 top-[46%] w-[min(90vw,36rem)] -translate-x-1/2 -translate-y-1/2 font-heading text-[clamp(1.4rem,2.8vw,2.05rem)] text-ink"
      >
        {openingCopy.invitationRead}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={frame.invitationCome}
        className="absolute left-1/2 top-[54%] w-[min(90vw,36rem)] -translate-x-1/2 -translate-y-1/2 font-heading text-[clamp(1.4rem,2.8vw,2.05rem)] text-ink"
      >
        {openingCopy.invitationCome}
      </AtmosphericLine>

      <div className="absolute left-1/2 top-[46%] w-[min(94vw,48rem)] -translate-x-1/2 -translate-y-1/2">
        <AtmosphericLine
          opacity={frame.brand}
          className="font-heading text-[clamp(2.3rem,6vw,5rem)] tracking-[0.18em] text-gold"
        >
          {openingCopy.brand}
        </AtmosphericLine>
        <AtmosphericLine
          opacity={frame.subtitle}
          className="mt-5 font-heading text-subhead text-ink/75"
        >
          {openingCopy.subtitle}
        </AtmosphericLine>
      </div>

      <AtmosphericLine
        opacity={frame.youKnow}
        className="absolute left-1/2 top-[47%] w-[min(90vw,36rem)] -translate-x-1/2 -translate-y-1/2 font-heading text-[clamp(1.45rem,3vw,2.15rem)] text-ink"
      >
        {openingCopy.youKnow}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={frame.knowJourney}
        className="absolute left-1/2 top-[47%] w-[min(90vw,40rem)] -translate-x-1/2 -translate-y-1/2 font-heading text-[clamp(1.45rem,3vw,2.15rem)] text-ink"
      >
        {openingCopy.knowJourney}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={frame.beginning}
        className="absolute left-1/2 top-[47%] w-[min(90vw,40rem)] -translate-x-1/2 -translate-y-1/2 font-heading text-[clamp(1.45rem,3vw,2.15rem)] text-ink"
      >
        {openingCopy.beginning}
      </AtmosphericLine>
    </div>
  );
}

function AtmosphericLine({
  opacity,
  className,
  children,
}: {
  opacity: number;
  className: string;
  children: ReactNode;
}) {
  if (opacity <= 0.02) {
    return null;
  }

  return (
    <p className={className} style={{ opacity }} aria-hidden={opacity < 0.2}>
      {children}
    </p>
  );
}
