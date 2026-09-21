import { originMilestones } from "@/content/origin";
import { MilestoneInscription } from "@/components/origin/MilestoneInscription";

type SchoolPlaceProps = {
  readable: number;
};

export function SchoolPlace({ readable }: SchoolPlaceProps) {
  const milestone = originMilestones.find((item) => item.id === "sslc");
  if (!milestone) return null;

  return (
    <section className="relative h-full w-screen shrink-0 overflow-hidden" aria-label="2015">
      <div className="absolute inset-y-[14%] left-[8%] w-[22%] bg-[radial-gradient(ellipse_at_center,var(--glow-warm),transparent_70%)]" />
      <div className="absolute bottom-[18%] left-[10%] right-[42%] h-px bg-ink/10" />
      <div className="absolute bottom-[18%] left-[18%] h-[18%] w-[22%] border-t border-ink/15" style={{ background: "var(--desk-fill)" }} />
      <div className="absolute bottom-[36%] left-[22%] h-16 w-24 border border-ink/12" style={{ background: "var(--paper-fill)" }} />
      <div className="absolute bottom-[38%] left-[24%] h-8 w-16 bg-[repeating-linear-gradient(transparent,transparent_5px,var(--paper-fill)_6px)]" />
      <div className="absolute inset-y-[12%] left-[6%] w-px bg-ink/8" />
      <div className="absolute inset-y-[16%] left-[38%] w-px bg-ink/6" />

      <div className="absolute bottom-[18%] left-[8%] max-w-[min(42vw,22rem)] px-4">
        <MilestoneInscription
          year={milestone.year}
          title={milestone.title}
          place={milestone.place}
          opacity={readable}
        />
      </div>
    </section>
  );
}
