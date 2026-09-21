import { JourneyExperience } from "@/components/journey/JourneyExperience";
import { openingJourney } from "@/content/opening-journey";
import { testJourney } from "@/content/test-journey";

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = searchParams ? await searchParams : {};
  const engine = typeof params.engine === "string" ? params.engine : undefined;
  const definition = engine === "test" ? testJourney : openingJourney;

  return <JourneyExperience definition={definition} />;
}
