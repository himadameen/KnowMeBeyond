import { originMilestones } from "@/content/origin";
import { MilestoneInscription } from "@/components/origin/MilestoneInscription";

type EngineeringPlaceProps = {
  readable: number;
};

export function EngineeringPlace({ readable }: EngineeringPlaceProps) {
  const milestone = originMilestones.find((item) => item.id === "degree");
  if (!milestone) return null;

  return (
    <section className="relative h-full w-screen shrink-0 overflow-hidden" aria-label="2021">
      <div className="absolute left-[8%] top-[12%] h-40 w-48 border border-tech/18" />
      <div className="absolute left-[10%] top-[15%] h-16 w-20 border border-tech/16" />
      <div className="absolute left-[26%] top-[15%] h-16 w-20 border border-tech/16" />
      <div className="absolute left-[10%] top-[30%] h-16 w-[11.5rem] border border-tech/14" />
      <div className="absolute bottom-[20%] left-[8%] right-[48%] h-px bg-ink/10" />

      <div className="absolute bottom-[18%] left-[8%] z-10 max-w-[min(42vw,22rem)] px-4">
        <MilestoneInscription
          year={milestone.year}
          title={milestone.title}
          place={milestone.place}
          opacity={readable}
          align="left"
        />
      </div>
    </section>
  );
}
