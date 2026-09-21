import { callCopy } from "@/content/the-call";

type VerseMomentProps = {
  opacity: number;
};

export function VerseMoment({ opacity }: VerseMomentProps) {
  if (opacity <= 0.02) return null;

  return (
    <figure
      className="pointer-events-none absolute inset-x-[8%] top-[32%] mx-auto max-w-2xl text-center"
      style={{ opacity }}
      aria-hidden={opacity < 0.2}
    >
      <figcaption className="font-heading text-caption tracking-[0.16em] text-ink/50">
        {callCopy.surah}
      </figcaption>
      <blockquote className="mt-6 font-heading text-[clamp(1.15rem,2.4vw,1.7rem)] leading-relaxed text-ink">
        {callCopy.verse}
      </blockquote>
    </figure>
  );
}
