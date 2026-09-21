type OriginThresholdProps = {
  active: boolean;
};

/**
 * Quiet hold at the edge of the journey.
 * Phase 3 (The Origin) begins after this point.
 */
export function OriginThreshold({ active }: OriginThresholdProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-[18%] bottom-[22%] h-px"
      style={{
        opacity: active ? 0.18 : 0,
        background: "linear-gradient(90deg, transparent, #A88935, transparent)",
      }}
    />
  );
}
