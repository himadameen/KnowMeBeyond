import { originMilestones } from "@/content/origin";
import { MilestoneInscription } from "@/components/origin/MilestoneInscription";

type WorkshopPlaceProps = {
  readable: number;
};

export function WorkshopPlace({ readable }: WorkshopPlaceProps) {
  const milestone = originMilestones.find((item) => item.id === "diploma");
  if (!milestone) return null;

  return (
    <section className="relative h-full w-screen shrink-0 overflow-hidden" aria-label="2018">
      <div className="absolute inset-x-[12%] top-[18%] h-px bg-tech/20" />
      <div className="absolute left-[14%] top-[16%] size-36 rounded-full border border-tech/25" />
      <div className="absolute left-[14%] top-[16%] size-36">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-tech/20" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-tech/20" />
      </div>
      <div className="absolute bottom-[16%] left-[8%] right-[46%] h-12 border-t border-ink/12" style={{ background: "var(--desk-fill)" }} />
      <div className="absolute bottom-[28%] left-[28%] h-20 w-2 bg-ink/15" />
      <div className="absolute bottom-[36%] left-[24%] h-2 w-16 bg-ink/20" />
      <div className="absolute left-[22%] top-[22%] h-40 w-28 border border-tech/20" />

      <div className="absolute bottom-[18%] left-[8%] z-10 max-w-[min(42vw,22rem)] px-4">
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
