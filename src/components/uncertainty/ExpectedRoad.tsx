import { roadSigns } from "@/content/origin";

type ExpectedRoadProps = {
  clarity: number;
  scale: number;
  fork: number;
};

export function ExpectedRoad({ clarity, scale, fork }: ExpectedRoadProps) {
  const definition = 0.22 + clarity * 0.78;
  const recede = (1 - clarity) * 36;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-x-0 top-[46%] h-px bg-ink/15"
        style={{ opacity: definition * (1 - fork * 0.4) }}
      />
      <div
        className="absolute left-1/2 top-[46%] h-[54%] w-[78%] -translate-x-1/2"
        style={{
          opacity: definition,
          transform: `translateX(-50%) scale(${scale})`,
          background:
            "linear-gradient(to top, var(--road-fill), transparent)",
          clipPath: "polygon(32% 0, 68% 0, 100% 100%, 0 100%)",
        }}
      />
      <div
        className="absolute left-1/2 top-[52%] h-[42%] w-px -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,var(--dash-line)_0_10px,transparent_10px_22px)]"
        style={{ opacity: definition * 0.85 }}
      />

      <div
        className="absolute left-[22%] top-[46%] h-[48%] w-[38%]"
        style={{
          opacity: fork * 0.55,
          background:
            "linear-gradient(to top, var(--road-fill), transparent)",
          clipPath: "polygon(55% 0, 78% 0, 40% 100%, 0 100%)",
        }}
      />
      <div
        className="absolute right-[22%] top-[46%] h-[48%] w-[38%]"
        style={{
          opacity: fork * 0.55,
          background:
            "linear-gradient(to top, var(--road-fill), transparent)",
          clipPath: "polygon(22% 0, 45% 0, 100% 100%, 60% 100%)",
        }}
      />

      <ol className="absolute inset-x-[8%] top-[16%] flex justify-between text-caption tracking-[0.18em] text-ink/45">
        {roadSigns.map((sign, index) => (
          <li
            key={sign}
            className="max-w-[7.5rem] text-center"
            style={{
              opacity: clarity * (0.3 + (index % 3) * 0.18),
              transform: `translateY(${recede + (index % 2 === 0 ? 0 : 10)}px) scale(${0.92 + clarity * 0.08})`,
            }}
          >
            {sign}
          </li>
        ))}
      </ol>
    </div>
  );
}
