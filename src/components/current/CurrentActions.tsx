import Link from "next/link";
import { currentActions } from "@/content/current";

type CurrentActionsProps = {
  intensity: number;
  reducedMotion: boolean;
  onWork: () => void;
  onWriting: () => void;
  onAgain: () => void;
};

export function CurrentActions({
  intensity,
  reducedMotion,
  onWork,
  onWriting,
  onAgain,
}: CurrentActionsProps) {
  if (intensity <= 0.02) return null;

  return (
    <nav
      aria-label="Continue the journey"
      className="absolute inset-x-[6%] bottom-[5%] z-20 flex flex-wrap justify-center gap-x-6 gap-y-3 px-2"
      style={{ opacity: intensity }}
    >
      <JourneyAction reducedMotion={reducedMotion} onClick={onWork}>
        {currentActions.work}
      </JourneyAction>
      <JourneyAction reducedMotion={reducedMotion} onClick={onWriting}>
        {currentActions.writing}
      </JourneyAction>
      <Link
        href="/professional"
        className="group relative font-heading text-[clamp(0.95rem,1.8vw,1.2rem)] tracking-[0.1em] text-ink/80"
      >
        {currentActions.professional}
        <span
          aria-hidden="true"
          className={`absolute inset-x-1 -bottom-1 h-px origin-center bg-gold/60 ${
            reducedMotion ? "scale-x-100" : "scale-x-[0.4] transition-transform duration-500 group-hover:scale-x-100"
          }`}
        />
      </Link>
      <JourneyAction reducedMotion={reducedMotion}>
        {currentActions.connect}
      </JourneyAction>
      <JourneyAction reducedMotion={reducedMotion} onClick={onAgain}>
        {currentActions.again}
      </JourneyAction>
    </nav>
  );
}

function JourneyAction({
  children,
  reducedMotion,
  onClick,
}: {
  children: string;
  reducedMotion: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative font-heading text-[clamp(0.95rem,1.8vw,1.2rem)] tracking-[0.1em] text-ink/80"
    >
      {children}
      <span
        aria-hidden="true"
        className={`absolute inset-x-1 -bottom-1 h-px origin-center bg-gold/60 ${
          reducedMotion ? "scale-x-100" : "scale-x-[0.4] transition-transform duration-500 group-hover:scale-x-100"
        }`}
      />
    </button>
  );
}
