type UncertaintyAtmosphereProps = {
  daylight: number;
  evening: number;
  night: number;
  mist: number;
};

export function UncertaintyAtmosphere({
  daylight,
  evening,
  night,
  mist,
}: UncertaintyAtmosphereProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 45% at 50% 38%, var(--glow-warm), transparent 70%)",
          opacity: daylight * 0.7,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 42%, var(--glow-warm), transparent 68%)",
          opacity: evening,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 50% 40%, var(--glow-tech), transparent 60%)",
          opacity: night,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent, var(--mist-wash))",
          opacity: 0.35 + mist * 0.5,
        }}
      />
    </div>
  );
}
