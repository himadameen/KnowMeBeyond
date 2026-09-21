import { callCopy } from "@/content/the-call";

type MentorCallProps = {
  fivePm: number;
  ring: number;
  silhouette: number;
  phone: number;
  reducedMotion: boolean;
};

export function MentorCall({
  fivePm,
  ring,
  silhouette,
  phone,
  reducedMotion,
}: MentorCallProps) {
  if (phone <= 0.02 && fivePm <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0">
      <p
        className="absolute left-1/2 top-[16%] -translate-x-1/2 font-heading text-caption tracking-[0.28em] text-gold-muted"
        style={{ opacity: fivePm }}
      >
        {callCopy.fivePm}
      </p>

      <div
        className="absolute left-1/2 top-[28%] h-24 w-20 -translate-x-1/2"
        style={{ opacity: silhouette * 0.35 }}
        aria-hidden="true"
      >
        <div className="mx-auto h-10 w-10 rounded-full bg-ink/20" />
        <div className="mx-auto mt-1 h-12 w-16 rounded-t-[2rem] bg-ink/15" />
      </div>

      <div
        className="absolute left-1/2 top-[46%] h-28 w-16 -translate-x-1/2 rounded-[1.1rem] border border-ink/30"
        style={{
          background: "var(--phone-fill)",
          opacity: phone,
          boxShadow: ring > 0.2 ? "0 0 24px rgba(212,175,55,0.12)" : undefined,
          animation:
            !reducedMotion && ring > 0.15
              ? "uncertainty-pulse 0.55s ease-in-out infinite"
              : undefined,
        }}
        aria-hidden={phone < 0.2}
      >
        <div className="absolute inset-x-5 top-3 h-1 rounded-full bg-ink/20" />
        <div className="absolute inset-x-3 top-7 bottom-4 rounded-md bg-ink/5" />
      </div>
    </div>
  );
}
