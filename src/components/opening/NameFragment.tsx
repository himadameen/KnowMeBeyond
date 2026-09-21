import type { IdentityFragment } from "@/content/opening";
import type { NameLayout } from "@/engine/opening/types";

type NameFragmentProps = {
  name: IdentityFragment | null;
  opacity: number;
  layout: NameLayout;
  accent: boolean;
};

export function NameFragment({ name, opacity, layout, accent }: NameFragmentProps) {
  if (!name || opacity <= 0.01) {
    return null;
  }

  return (
    <p
      className="pointer-events-none absolute left-1/2 top-[46%] font-heading text-[clamp(2.75rem,8vw,6.25rem)] tracking-[0.12em]"
      style={{
        opacity,
        color: accent ? "#D4AF37" : "#F5EFE6",
        transform: `translate(calc(-50% + ${layout.x}), calc(-50% + ${layout.y}))`,
      }}
    >
      {name}
    </p>
  );
}
