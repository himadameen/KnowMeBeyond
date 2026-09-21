import Link from "next/link";
import { ThemeToggle } from "@/theme/ThemeToggle";

export default function ProfessionalPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center text-ink">
      <ThemeToggle />
      <p className="font-heading text-caption tracking-[0.24em] text-gold-muted">
        KNOWBEYONDME
      </p>
      <h1 className="mt-4 font-heading text-major">Professional Mode</h1>
      <p className="mt-4 max-w-md text-body text-ink/65">
        This route is reserved for a later phase. The cinematic journey remains
        the primary experience.
      </p>
      <Link href="/" className="mt-8 text-small text-gold hover:text-gold-muted">
        Return to journey
      </Link>
    </main>
  );
}
