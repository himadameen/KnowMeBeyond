import { writingCopy } from "@/content/writing";

type AlfazRevealProps = {
  title: number;
  subtitle: number;
};

export function AlfazReveal({ title, subtitle }: AlfazRevealProps) {
  return (
    <div className="pointer-events-none absolute inset-0 text-center">
      {title > 0.02 ? (
        <p
          className="absolute left-1/2 top-[40%] w-[min(92vw,42rem)] -translate-x-1/2 font-heading text-[clamp(1.7rem,4.2vw,3rem)] tracking-[0.12em] text-ink"
          style={{ opacity: title }}
          aria-hidden={title < 0.2}
        >
          {writingCopy.title}
        </p>
      ) : null}
      {subtitle > 0.02 ? (
        <p
          className="absolute left-1/2 top-[52%] w-[min(90vw,34rem)] -translate-x-1/2 font-heading text-[clamp(1.15rem,2.3vw,1.65rem)] text-ink/75"
          style={{ opacity: subtitle }}
          aria-hidden={subtitle < 0.2}
        >
          {writingCopy.subtitle}
        </p>
      ) : null}
    </div>
  );
}
