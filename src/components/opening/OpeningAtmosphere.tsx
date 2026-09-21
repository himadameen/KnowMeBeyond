type OpeningAtmosphereProps = {
  light: number;
  stillness: number;
};

export function OpeningAtmosphere({ light, stillness }: OpeningAtmosphereProps) {
  return (
    <div className="absolute inset-0 bg-background" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 42%, var(--color-surface), transparent 70%)",
          opacity: 0.7 + stillness * 0.2,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, var(--paper-fill), transparent 34%)",
          opacity: light,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, var(--vignette) 100%)",
        }}
      />
    </div>
  );
}
