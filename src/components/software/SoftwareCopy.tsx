import { softwareCopy } from "@/content/software";
import type { ReactNode } from "react";

type SoftwareCopyProps = {
  destination: number;
  habit: number;
  walking: number;
  leadBegin: number;
  leadTrust: number;
};

export function SoftwareCopy({
  destination,
  habit,
  walking,
  leadBegin,
  leadTrust,
}: SoftwareCopyProps) {
  return (
    <div className="pointer-events-none absolute inset-0 text-center">
      <AtmosphericLine
        opacity={destination}
        className="absolute left-1/2 top-[58%] w-[min(90vw,36rem)] -translate-x-1/2 font-heading text-[clamp(1.45rem,3vw,2.15rem)] text-ink"
      >
        {softwareCopy.destination}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={habit}
        className="absolute left-1/2 top-[58%] w-[min(90vw,36rem)] -translate-x-1/2 font-heading text-[clamp(1.45rem,3vw,2.15rem)] text-ink"
      >
        {softwareCopy.habit}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={walking}
        className="absolute left-1/2 top-[48%] w-[min(90vw,40rem)] -translate-x-1/2 font-heading text-[clamp(1.35rem,2.8vw,2rem)] leading-snug text-ink"
      >
        {softwareCopy.walking}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={leadBegin}
        className="absolute left-1/2 top-[32%] w-[min(90vw,40rem)] -translate-x-1/2 font-heading text-[clamp(1.25rem,2.6vw,1.85rem)] leading-snug text-ink"
      >
        {softwareCopy.leadBegin}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={leadTrust}
        className="absolute left-1/2 top-[32%] w-[min(90vw,40rem)] -translate-x-1/2 font-heading text-[clamp(1.25rem,2.6vw,1.85rem)] leading-snug text-ink"
      >
        {softwareCopy.leadTrust}
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
