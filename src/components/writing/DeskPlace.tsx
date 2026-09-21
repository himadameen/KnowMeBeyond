type DeskPlaceProps = {
  desk: number;
  fragments: number;
};

const marks = [
  { top: "16%", left: "10%", text: "—" },
  { top: "22%", right: "12%", text: "…" },
  { top: "72%", left: "14%", text: "و" },
  { top: "78%", right: "16%", text: "—" },
] as const;

export function DeskPlace({ desk, fragments }: DeskPlaceProps) {
  if (desk <= 0.02 && fragments <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={desk < 0.2}>
      <div
        className="absolute inset-x-[18%] bottom-[10%] h-[16%]"
        style={{ opacity: desk * 0.7, background: "var(--desk-fill)" }}
      />
      <div
        className="absolute left-1/2 top-[72%] h-[18vmin] w-[28vmin] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: desk,
          background: "linear-gradient(180deg, var(--paper-fill), var(--glow-warm))",
        }}
      />
      <div
        className="absolute left-1/2 top-[72%] h-[13vmin] w-[20vmin] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: desk * 0.65,
          background:
            "repeating-linear-gradient(to bottom, transparent 0 13px, rgba(61,48,45,0.14) 13px 14px)",
        }}
      />
      <div
        className="absolute left-[58%] top-[78%] h-px w-[11vmin] origin-left rotate-[-16deg] bg-ink/45"
        style={{ opacity: desk * 0.85 }}
      />
      {marks.map((mark) => (
        <p
          key={`${mark.top}-${mark.text}`}
          className="absolute font-heading text-[clamp(1.1rem,2vw,1.5rem)] text-ink/35"
          style={{
            top: mark.top,
            left: "left" in mark ? mark.left : undefined,
            right: "right" in mark ? mark.right : undefined,
            opacity: fragments * 0.7,
          }}
        >
          {mark.text}
        </p>
      ))}
    </div>
  );
}
