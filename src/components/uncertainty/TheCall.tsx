import { uncertaintyCopy } from "@/content/uncertainty";

type TheCallProps = {
  phone: number;
  vibration: number;
  title: number;
  reducedMotion: boolean;
};

export function TheCall({ phone, vibration, title, reducedMotion }: TheCallProps) {
  if (phone <= 0.02 && title <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
      <div
        className="relative h-28 w-16 rounded-[1.1rem] border border-ink/25"
        style={{
          background: "var(--phone-fill)",
          opacity: phone,
          animation:
            !reducedMotion && vibration > 0.15
              ? "uncertainty-pulse 0.7s ease-in-out infinite"
              : undefined,
        }}
        aria-hidden={phone < 0.2}
      >
        <div className="absolute inset-x-5 top-3 h-1 rounded-full bg-ink/20" />
        <div className="absolute inset-x-3 top-7 bottom-4 rounded-md bg-ink/5" />
      </div>
      <p
        className="mt-10 font-heading text-[clamp(1.8rem,4vw,2.8rem)] tracking-[0.2em] text-ink"
        style={{ opacity: title }}
        aria-hidden={title < 0.2}
      >
        {uncertaintyCopy.theCall}
      </p>
    </div>
  );
}
