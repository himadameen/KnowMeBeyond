import { engineerCopy } from "@/content/engineer";

type EngineerCopyProps = {
  threshold: number;
};

export function EngineerCopy({ threshold }: EngineerCopyProps) {
  if (threshold <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0 text-center">
      <p
        className="absolute left-1/2 top-[42%] w-[min(90vw,40rem)] -translate-x-1/2 font-heading text-[clamp(1.5rem,3.4vw,2.4rem)] tracking-[0.16em] text-ink"
        style={{ opacity: threshold }}
        aria-hidden={threshold < 0.2}
      >
        {engineerCopy.beyond}
      </p>
      <div
        aria-hidden="true"
        className="absolute inset-x-[18%] bottom-[22%] h-px"
        style={{
          opacity: threshold * 0.35,
          background: "linear-gradient(90deg, transparent, #A88935, transparent)",
        }}
      />
    </div>
  );
}
