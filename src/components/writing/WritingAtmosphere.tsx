type WritingAtmosphereProps = {
  warmth: number;
  library: number;
  professional: number;
};

export function WritingAtmosphere({ warmth, library, professional }: WritingAtmosphereProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 58%, var(--glow-warm), transparent 64%)",
          opacity: warmth,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 36%, var(--paper-fill), transparent 60%)",
          opacity: library * 0.7,
        }}
      />
      <div
        className="absolute inset-[12%] border border-ink/[0.05]"
        style={{ opacity: professional * 0.55 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 42% at 50% 46%, var(--glow-tech), transparent 62%)",
          opacity: professional,
        }}
      />
    </div>
  );
}
