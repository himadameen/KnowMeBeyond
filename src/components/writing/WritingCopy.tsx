import { writingCopy } from "@/content/writing";
import type { ReactNode } from "react";

type WritingCopyProps = {
  between: number;
  mother: number;
};

export function WritingCopy({ between, mother }: WritingCopyProps) {
  return (
    <div className="pointer-events-none absolute inset-0 text-center">
      <AtmosphericLine
        opacity={between}
        className="absolute left-1/2 top-[42%] w-[min(90vw,40rem)] -translate-x-1/2 font-heading text-[clamp(1.25rem,2.7vw,1.85rem)] leading-snug text-ink"
      >
        {writingCopy.between}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={mother}
        className="absolute left-1/2 top-[56%] w-[min(90vw,32rem)] -translate-x-1/2 font-heading text-[clamp(1.05rem,2vw,1.4rem)] text-ink/65"
      >
        {writingCopy.mother}
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
