import { transformWords } from "@/content/software";

type TransformLineProps = {
  intensity: number;
  index: number;
};

export function TransformLine({ intensity, index }: TransformLineProps) {
  if (intensity <= 0.02) return null;
  const word = transformWords[index] ?? transformWords[0];

  return (
    <div className="pointer-events-none absolute inset-x-0 top-[28%] text-center" aria-hidden={intensity < 0.2}>
      <svg className="mx-auto mb-8 h-6 w-[min(70vw,28rem)]" viewBox="0 0 480 24" aria-hidden="true">
        <line x1="0" y1="12" x2="200" y2="12" stroke="rgba(111,169,216,0.35)" strokeWidth="1" />
        <line
          x1="200"
          y1="12"
          x2="480"
          y2="12"
          stroke="rgba(245,239,230,0.5)"
          strokeWidth="1"
          strokeDasharray={index > 3 ? "5 7" : undefined}
        />
      </svg>
      <p
        className="font-heading text-[clamp(1.6rem,4vw,2.6rem)] text-ink"
        style={{ opacity: intensity }}
      >
        {word}
      </p>
    </div>
  );
}
