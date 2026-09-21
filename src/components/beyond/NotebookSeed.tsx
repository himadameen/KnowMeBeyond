type NotebookSeedProps = {
  warmth: number;
  notebook: number;
};

export function NotebookSeed({ warmth, notebook }: NotebookSeedProps) {
  if (notebook <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={notebook < 0.2}>
      <div
        className="absolute left-1/2 top-[46%] h-[28vmin] w-[38vmin] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: notebook,
          background: "linear-gradient(180deg, var(--paper-fill), var(--glow-warm))",
          boxShadow: `0 0 80px rgba(216,184,140,${0.08 + warmth * 0.12})`,
        }}
      />
      <div
        className="absolute left-1/2 top-[46%] h-[22vmin] w-[30vmin] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: notebook * 0.7,
          background:
            "repeating-linear-gradient(to bottom, transparent 0 14px, rgba(61,48,45,0.12) 14px 15px)",
        }}
      />
      <div
        className="absolute left-[58%] top-[58%] h-px w-[12vmin] origin-left rotate-[-18deg] bg-ink/40"
        style={{ opacity: notebook * 0.8 }}
      />
    </div>
  );
}
