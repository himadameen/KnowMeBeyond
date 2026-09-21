import { searchFragments } from "@/content/uncertainty";

type SearchFragmentsProps = {
  intensity: number;
};

const placements = [
  { top: "14%", left: "8%" },
  { top: "18%", right: "8%" },
  { top: "68%", left: "10%" },
  { top: "72%", right: "12%" },
  { top: "16%", left: "42%" },
  { top: "80%", left: "38%" },
] as const;

export function SearchFragments({ intensity }: SearchFragmentsProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden={intensity < 0.2}>
      {searchFragments.map((fragment, index) => {
        const place = placements[index];
        if (!place) return null;
        const phase = (index % 3) * 0.18;
        return (
          <p
            key={fragment}
            className="absolute font-heading text-small tracking-[0.08em] text-ink/40"
            style={{
              ...place,
              opacity: intensity * (0.35 + phase),
            }}
          >
            {fragment}
          </p>
        );
      })}
      <div
        className="absolute left-[10%] top-[70%] h-16 w-24 border border-ink/10"
        style={{ opacity: intensity * 0.4 }}
      />
      <div
        className="absolute right-[12%] top-[72%] h-12 w-20 border border-ink/10"
        style={{ opacity: intensity * 0.28 }}
      />
    </div>
  );
}
