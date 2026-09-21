type EngineerAtmosphereProps = {
  production: number;
  merge: number;
  threshold: number;
};

export function EngineerAtmosphere({ production, merge, threshold }: EngineerAtmosphereProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-[10%] border border-ink/[0.06]"
        style={{ opacity: 0.25 + production * 0.55 + threshold * 0.2 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 48% at 50% 46%, var(--glow-tech), transparent 62%)",
          opacity: production * 0.8 + merge * 0.25,
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-px w-[58%] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: merge * 0.35 + threshold * 0.2,
          background: "linear-gradient(90deg, transparent, var(--paper-fill), transparent)",
        }}
      />
    </div>
  );
}
