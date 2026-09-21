import { leadershipCounts } from "@/content/software";

type LeadershipNodesProps = {
  intensity: number;
  nodeCount: number;
};

export function LeadershipNodes({ intensity, nodeCount }: LeadershipNodesProps) {
  if (intensity <= 0.02) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-[10%] top-[68%] flex items-end justify-between"
      style={{ opacity: intensity }}
      aria-hidden={intensity < 0.2}
    >
      {leadershipCounts.map((count, index) => {
        const visible = index < nodeCount;
        return (
          <div key={count} className="flex flex-col items-center gap-3">
            <span
              className="block rounded-full bg-ink"
              style={{
                width: `${10 + index * 3}px`,
                height: `${10 + index * 3}px`,
                opacity: visible ? 0.72 : 0.1,
              }}
            />
            <p
              className="font-heading text-[clamp(1.1rem,2.2vw,1.65rem)] text-ink"
              style={{ opacity: visible ? 0.9 : 0.12 }}
            >
              {count}
            </p>
          </div>
        );
      })}
    </div>
  );
}
