type QuietWorshipProps = {
  wudu: number;
  salah: number;
  dua: number;
};

export function QuietWorship({ wudu, salah, dua }: QuietWorshipProps) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-x-[22%] top-[48%] h-px"
        style={{
          opacity: wudu,
          background: "linear-gradient(90deg, transparent, rgba(111,169,216,0.35), transparent)",
        }}
      />
      <div
        className="absolute left-[42%] top-[46%] h-16 w-px bg-ink/20"
        style={{ opacity: salah }}
      />
      <div
        className="absolute left-[58%] top-[46%] h-16 w-px bg-ink/20"
        style={{ opacity: salah * 0.85 }}
      />
      <div
        className="absolute inset-0"
        style={{
          opacity: dua * 0.35,
          background: "radial-gradient(ellipse at center, rgba(245,239,230,0.06), transparent 55%)",
        }}
      />
    </div>
  );
}
