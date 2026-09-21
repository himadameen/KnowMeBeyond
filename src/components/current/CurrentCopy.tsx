import { currentCopy } from "@/content/current";
import type { ReactNode } from "react";

type CurrentCopyProps = {
  came: number;
  became: number;
  next: number;
  unknown: number;
  beautiful: number;
};

export function CurrentCopy({ came, became, next, unknown, beautiful }: CurrentCopyProps) {
  return (
    <div className="pointer-events-none absolute inset-0 text-center">
      <AtmosphericLine
        opacity={came}
        className="absolute left-1/2 top-[44%] w-[min(90vw,36rem)] -translate-x-1/2 font-heading text-[clamp(1.35rem,2.9vw,2rem)] text-ink"
      >
        {currentCopy.came}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={became}
        className="absolute left-1/2 top-[44%] w-[min(90vw,36rem)] -translate-x-1/2 font-heading text-[clamp(1.35rem,2.9vw,2rem)] text-ink"
      >
        {currentCopy.became}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={next}
        className="absolute left-1/2 top-[44%] w-[min(90vw,36rem)] -translate-x-1/2 font-heading text-[clamp(1.35rem,2.9vw,2rem)] text-ink"
      >
        {currentCopy.next}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={unknown}
        className="absolute left-1/2 top-[44%] w-[min(90vw,36rem)] -translate-x-1/2 font-heading text-[clamp(1.8rem,4vw,2.8rem)] tracking-[0.04em] text-ink"
      >
        {currentCopy.unknown}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={beautiful}
        className="absolute left-1/2 top-[44%] w-[min(90vw,36rem)] -translate-x-1/2 font-heading text-[clamp(1.3rem,2.8vw,1.95rem)] text-ink"
      >
        {currentCopy.beautiful}
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
