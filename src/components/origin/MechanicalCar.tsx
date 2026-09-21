import Image from "next/image";

type MechanicalCarProps = {
  intensity: number;
};

export function MechanicalCar({ intensity }: MechanicalCarProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-y-[16%] right-0 w-[min(48vw,34rem)]"
        style={{ opacity: intensity }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/assets/images/mechanical-sports-car.png"
            alt=""
            fill
            sizes="(max-width: 768px) 55vw, 34rem"
            className="object-contain object-right-bottom"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-background)_0%,var(--color-background)_16%,transparent_48%)]" />
          <div className="absolute inset-x-0 top-0 h-[18%] bg-[linear-gradient(to_bottom,var(--color-background),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(to_top,var(--color-background),transparent)]" />
        </div>
      </div>
    </div>
  );
}
