type TimeMarksProps = {
  year: number;
  days: number;
  weeks: number;
  months: number;
};

export function TimeMarks({ year, days, weeks, months }: TimeMarksProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[30%] text-center">
      <Mark opacity={year} className="font-heading text-caption tracking-[0.3em] text-gold-muted">
        2021
      </Mark>
      <Mark opacity={days} className="font-heading text-subhead text-ink/55">
        Days
      </Mark>
      <Mark opacity={weeks} className="font-heading text-subhead text-ink/50">
        Weeks
      </Mark>
      <Mark opacity={months} className="font-heading text-subhead text-ink/45">
        Months
      </Mark>
    </div>
  );
}

function Mark({
  opacity,
  className,
  children,
}: {
  opacity: number;
  className: string;
  children: string;
}) {
  if (opacity <= 0.02) return null;
  return (
    <p
      className={`absolute inset-x-0 ${className}`}
      style={{ opacity }}
      aria-hidden={opacity < 0.2}
    >
      {children}
    </p>
  );
}
