import { roadSigns } from "@/content/origin";

type RoadPlaceProps = {
  readable: number;
};

export function RoadPlace({ readable }: RoadPlaceProps) {
  return (
    <section className="relative h-full w-screen shrink-0 overflow-hidden" aria-label="The road">
      <div className="absolute inset-x-0 top-[46%] h-px bg-ink/15" />
      <div
        className="absolute left-1/2 top-[46%] h-[54%] w-[78%] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(to top, var(--road-fill), transparent)",
          clipPath: "polygon(32% 0, 68% 0, 100% 100%, 0 100%)",
        }}
      />
      <div className="absolute left-1/2 top-[52%] h-[42%] w-px -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,var(--dash-line)_0_10px,transparent_10px_22px)]" />

      <ol className="absolute inset-x-[8%] top-[14%] flex flex-wrap justify-center gap-x-5 gap-y-3 text-caption tracking-[0.18em] text-ink/45">
        {roadSigns.map((sign, index) => (
          <li
            key={sign}
            className="max-w-[7.5rem] text-center"
            style={{
              opacity: readable * (0.35 + (index % 3) * 0.2),
              transform: `translateY(${index % 2 === 0 ? 0 : 12}px)`,
            }}
          >
            {sign}
          </li>
        ))}
      </ol>
    </section>
  );
}
