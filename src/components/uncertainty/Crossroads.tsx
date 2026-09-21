import { uncertaintyCopy } from "@/content/uncertainty";

type CrossroadsProps = {
  sap: number;
  core: number;
  alternative: number;
};

export function Crossroads({ sap, core, alternative }: CrossroadsProps) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute left-[14%] top-[38%] max-w-[12rem]"
        style={{ opacity: sap }}
        aria-hidden={sap < 0.2}
      >
        <p className="font-heading text-[clamp(1.4rem,3vw,2rem)] text-ink">{uncertaintyCopy.sap}</p>
        <p className="mt-2 text-small text-ink/50">{uncertaintyCopy.sapAside}</p>
      </div>

      <div className="absolute inset-x-[12%] top-[36%] flex justify-between">
        <p
          className="font-heading text-caption tracking-[0.28em] text-ink/55"
          style={{ opacity: core }}
          aria-hidden={core < 0.2}
        >
          {uncertaintyCopy.core}
        </p>
        <p
          className="font-heading text-caption tracking-[0.28em] text-ink/55"
          style={{ opacity: alternative }}
          aria-hidden={alternative < 0.2}
        >
          {uncertaintyCopy.alternative}
        </p>
      </div>
    </div>
  );
}
