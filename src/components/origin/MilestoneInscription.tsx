type MilestoneInscriptionProps = {
  year: string;
  title: string;
  place: string;
  opacity: number;
  align?: "left" | "center" | "right";
};

export function MilestoneInscription({
  year,
  title,
  place,
  opacity,
  align = "left",
}: MilestoneInscriptionProps) {
  if (opacity <= 0.02) {
    return null;
  }

  const alignment =
    align === "right" ? "items-end text-right" : align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div
      className={`flex max-w-[20rem] flex-col ${alignment}`}
      style={{ opacity }}
      aria-hidden={opacity < 0.2}
    >
      <p className="font-heading text-caption tracking-[0.28em] text-gold-muted">{year}</p>
      <p className="mt-2 font-heading text-[clamp(1.5rem,3vw,2.15rem)] leading-tight text-ink">{title}</p>
      <p className="mt-2 text-small text-ink/60">{place}</p>
    </div>
  );
}
