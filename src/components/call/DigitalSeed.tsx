type DigitalSeedProps = {
  opacity: number;
};

export function DigitalSeed({ opacity }: DigitalSeedProps) {
  if (opacity <= 0.02) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-x-[18%] bottom-[22%] h-8 w-[64%]"
      viewBox="0 0 640 32"
      aria-hidden="true"
      style={{ opacity }}
    >
      <line x1="0" y1="16" x2="300" y2="16" stroke="rgba(111,169,216,0.35)" strokeWidth="1" />
      <line
        x1="300"
        y1="16"
        x2="640"
        y2="16"
        stroke="rgba(245,239,230,0.55)"
        strokeWidth="1"
        strokeDasharray="6 8"
      />
    </svg>
  );
}
