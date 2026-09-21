import { unwrittenBooks, writingCopy, type UnwrittenBook } from "@/content/writing";

type UnwrittenLibraryProps = {
  intensity: number;
  selected: UnwrittenBook | null;
  onInspect: (book: UnwrittenBook) => void;
  onLeave: () => void;
};

export function UnwrittenLibrary({
  intensity,
  selected,
  onInspect,
  onLeave,
}: UnwrittenLibraryProps) {
  if (intensity <= 0.02) return null;

  return (
    <div className="absolute inset-0" aria-hidden={intensity < 0.2}>
      <div
        className="absolute inset-x-[16%] top-[28%] flex items-end justify-center gap-10"
        style={{ opacity: intensity }}
      >
        {unwrittenBooks.map((book, index) => (
          <button
            key={book}
            type="button"
            onClick={() => onInspect(book)}
            className="flex flex-col items-center"
            aria-pressed={selected === book}
            aria-label={book}
          >
            <span
              className="block w-[3.2rem] bg-ink/25"
              style={{
                height: `${9 + index * 1.4}rem`,
                opacity: selected === book ? 0.95 : 0.55,
              }}
            />
            <span className="mt-4 max-w-[8rem] text-center font-heading text-caption leading-snug text-ink/75">
              {book}
            </span>
          </button>
        ))}
      </div>

      {selected ? (
        <div
          className="absolute inset-0 z-20 bg-background/80"
          onWheel={(event) => event.stopPropagation()}
          onTouchMove={(event) => event.stopPropagation()}
        >
          <p className="absolute left-1/2 top-[34%] w-[min(90vw,28rem)] -translate-x-1/2 text-center font-heading text-[clamp(1.4rem,3vw,2.1rem)] text-ink">
            {selected}
          </p>
          <p className="absolute left-1/2 top-[48%] w-[min(90vw,32rem)] -translate-x-1/2 text-center font-heading text-[clamp(1.2rem,2.5vw,1.7rem)] text-ink/80">
            {writingCopy.unwritten}
          </p>
          <p className="absolute left-1/2 top-[58%] w-[min(90vw,28rem)] -translate-x-1/2 text-center font-heading text-[clamp(1.05rem,2.1vw,1.45rem)] text-ink/60">
            {writingCopy.return}
          </p>
          <button
            type="button"
            onClick={onLeave}
            className="absolute left-1/2 top-[72%] -translate-x-1/2 font-heading text-caption tracking-[0.18em] text-ink/50"
          >
            Leave
          </button>
        </div>
      ) : null}
    </div>
  );
}
