import { collegeSession } from "@/content/software";

type CollegeSessionProps = {
  intensity: number;
};

export function CollegeSession({ intensity }: CollegeSessionProps) {
  if (intensity <= 0.02) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-[16%] flex flex-col items-center text-center"
      style={{ opacity: intensity }}
      aria-hidden={intensity < 0.2}
    >
      <div className="absolute top-3 h-[calc(100%-1.5rem)] w-px bg-ink/15" aria-hidden="true" />
      {collegeSession.map((item) => (
        <p
          key={item}
          className="relative z-[1] mb-3 font-heading text-[clamp(1.15rem,2.4vw,1.65rem)] text-ink/80 last:mb-0"
        >
          {item}
        </p>
      ))}
    </div>
  );
}
