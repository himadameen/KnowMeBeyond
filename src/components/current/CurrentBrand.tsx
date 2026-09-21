import { currentCopy } from "@/content/current";

type CurrentBrandProps = {
  brand: number;
  subtitle: number;
  person: number;
  roles: number;
};

export function CurrentBrand({ brand, subtitle, person, roles }: CurrentBrandProps) {
  if (brand <= 0.02 && subtitle <= 0.02 && person <= 0.02 && roles <= 0.02) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-x-[8%] top-[22%] bottom-[22%] flex flex-col items-center justify-center text-center">
      {brand > 0.02 ? (
        <p
          className="font-heading text-[clamp(1.8rem,4.8vw,3.6rem)] tracking-[0.16em] text-gold"
          style={{ opacity: brand }}
          aria-hidden={brand < 0.2}
        >
          {currentCopy.brand}
        </p>
      ) : null}
      {subtitle > 0.02 ? (
        <p
          className="mt-4 font-heading text-subhead text-ink/75"
          style={{ opacity: subtitle }}
          aria-hidden={subtitle < 0.2}
        >
          {currentCopy.subtitle}
        </p>
      ) : null}
      {person > 0.02 ? (
        <p
          className="mt-8 font-heading text-[clamp(1.3rem,2.8vw,1.9rem)] text-ink"
          style={{ opacity: person }}
          aria-hidden={person < 0.2}
        >
          {currentCopy.name}
        </p>
      ) : null}
      {roles > 0.02 ? (
        <p
          className="mt-3 max-w-[40rem] font-heading text-[clamp(0.9rem,1.7vw,1.15rem)] tracking-[0.04em] text-ink/70"
          style={{ opacity: roles }}
          aria-hidden={roles < 0.2}
        >
          {currentCopy.roles}
        </p>
      ) : null}
    </div>
  );
}
