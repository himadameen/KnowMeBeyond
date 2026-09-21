type BeyondAtmosphereProps = {
  expand: number;
  hall: number;
  warmth: number;
};

export function BeyondAtmosphere({ expand, hall, warmth }: BeyondAtmosphereProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-[10%] border border-ink/[0.05]"
        style={{ opacity: expand * 0.45 + hall * 0.2 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 44% at 50% 42%, var(--glow-tech), transparent 64%)",
          opacity: expand * 0.7 + hall * 0.35,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 58%, var(--glow-warm), transparent 62%)",
          opacity: warmth,
        }}
      />
    </div>
  );
}
