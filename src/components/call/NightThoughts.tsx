import { callCopy } from "@/content/the-call";

type NightThoughtsProps = {
  night: number;
  nightHour: number;
  scrolling: number;
  reducedMotion: boolean;
};

export function NightThoughts({
  night,
  nightHour,
  scrolling,
  reducedMotion,
}: NightThoughtsProps) {
  if (night <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={night < 0.2}>
      <p
        className="absolute left-1/2 top-[18%] -translate-x-1/2 font-heading text-caption tracking-[0.24em] text-ink/40"
        style={{ opacity: nightHour }}
      >
        {callCopy.nightHour}
      </p>
      <div
        className="absolute left-1/2 top-[28%] h-[46%] w-px -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,var(--dash-line)_0_8px,transparent_8px_18px)]"
        style={{
          opacity: scrolling,
          transform: reducedMotion ? "translateX(-50%)" : undefined,
        }}
      />
      <p
        className="absolute left-[16%] top-[42%] font-heading text-small text-ink/30"
        style={{ opacity: night * 0.7 }}
      >
        …
      </p>
      <p
        className="absolute right-[18%] top-[52%] font-heading text-small text-ink/25"
        style={{ opacity: night * 0.5 }}
      >
        …
      </p>
    </div>
  );
}
