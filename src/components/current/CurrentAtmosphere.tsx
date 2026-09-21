type CurrentAtmosphereProps = {
  becoming: number;
  unknown: number;
  brand: number;
};

export function CurrentAtmosphere({ becoming, unknown, brand }: CurrentAtmosphereProps) {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 44% at 50% 46%, var(--glow-tech), transparent 62%)",
          opacity: becoming * 0.8 + brand * 0.25,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, var(--paper-fill), transparent 36%)",
          opacity: unknown * 0.45 + brand * 0.2,
        }}
      />
    </div>
  );
}
