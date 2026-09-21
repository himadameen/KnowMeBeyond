type BlueprintFieldProps = {
  intensity: number;
  complexity: number;
  travel: number;
  reducedMotion: boolean;
};

export function BlueprintField({
  intensity,
  complexity,
  travel,
  reducedMotion,
}: BlueprintFieldProps) {
  const shift = reducedMotion ? 0 : travel * 28;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ opacity: intensity }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(111,169,216,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(111,169,216,0.07) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: `translate3d(${-shift}px, 0, 0)`,
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g
          fill="none"
          stroke="rgba(111,169,216,0.22)"
          strokeWidth="1"
          style={{ opacity: 0.35 + complexity * 0.45 }}
        >
          <circle cx="1180" cy="220" r="92" />
          <line x1="1080" y1="220" x2="1280" y2="220" />
          <line x1="1180" y1="120" x2="1180" y2="320" />
          <path d="M220 640 L420 640 L420 780 L220 780 Z" />
          <path d="M260 640 L260 610 M380 640 L380 610" />
          <path d="M980 620 C1040 560, 1140 560, 1200 620" />
          <path
            d="M140 180 L280 180 L320 240 L240 310 L160 240 Z"
            style={{ opacity: complexity }}
          />
          <path d="M720 140 L890 140 L890 290 L720 290 Z" style={{ opacity: complexity }} />
          <path d="M740 160 L870 160 L870 230 L740 230 Z" style={{ opacity: complexity }} />
          <line x1="0" y1="780" x2="1600" y2="780" style={{ opacity: 0.4 }} />
        </g>
      </svg>
    </div>
  );
}
