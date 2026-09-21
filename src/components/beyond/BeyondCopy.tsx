import { beyondCopy } from "@/content/beyond";
import type { ReactNode } from "react";

type BeyondCopyProps = {
  meaning: number;
  inside: number;
  imagine: number;
};

export function BeyondCopy({ meaning, inside, imagine }: BeyondCopyProps) {
  return (
    <div className="pointer-events-none absolute inset-0 text-center">
      <AtmosphericLine
        opacity={meaning}
        className="absolute left-1/2 top-[42%] w-[min(90vw,40rem)] -translate-x-1/2 font-heading text-[clamp(1.25rem,2.7vw,1.85rem)] leading-snug text-ink"
      >
        {beyondCopy.meaning}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={inside}
        className="absolute left-1/2 top-[40%] w-[min(90vw,36rem)] -translate-x-1/2 font-heading text-[clamp(1.3rem,2.8vw,1.95rem)] text-ink"
      >
        {beyondCopy.inside}
      </AtmosphericLine>
      <AtmosphericLine
        opacity={imagine}
        className="absolute left-1/2 top-[50%] w-[min(90vw,36rem)] -translate-x-1/2 font-heading text-[clamp(1.3rem,2.8vw,1.95rem)] text-ink"
      >
        {beyondCopy.imagine}
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
