type OriginAtmosphereProps = {
  warmth: number;
  light: number;
};

export function OriginAtmosphere({ warmth, light }: OriginAtmosphereProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 30% 35%, var(--glow-warm), transparent 62%)",
          opacity: warmth * light,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 70% 30%, var(--glow-tech), transparent 60%)",
          opacity: (1 - warmth) * 0.7,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 46%, var(--vignette) 100%)",
        }}
      />
    </div>
  );
}
