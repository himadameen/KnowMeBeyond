type SoftwareAtmosphereProps = {
  chaos: number;
  pattern: number;
  threshold: number;
};

export function SoftwareAtmosphere({ chaos, pattern, threshold }: SoftwareAtmosphereProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute left-1/2 top-1/2 size-[56vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          opacity: 0.22 + chaos * 0.4 + threshold * 0.15,
          background:
            "radial-gradient(circle, var(--color-background) 0%, var(--color-surface) 42%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 42% at 50% 48%, var(--glow-tech), transparent 62%)",
          opacity: pattern * 0.85 + threshold * 0.35,
        }}
      />
      <div
        className="absolute inset-[12%] border border-ink/[0.04]"
        style={{ opacity: threshold }}
      />
    </div>
  );
}
