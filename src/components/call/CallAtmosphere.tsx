type CallAtmosphereProps = {
  night: number;
  sleep: number;
  morning: number;
};

export function CallAtmosphere({ night, sleep, morning }: CallAtmosphereProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 50% 48%, var(--paper-fill), transparent 70%)",
          opacity: 0.35 + morning * 0.55 - night * 0.2,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent, var(--night-wash))",
          opacity: night * 0.7 + sleep * 0.9,
        }}
      />
      <div
        className="absolute inset-y-0 left-0 w-1/2"
        style={{
          background:
            "linear-gradient(90deg, var(--paper-fill), transparent)",
          opacity: morning,
        }}
      />
    </div>
  );
}
