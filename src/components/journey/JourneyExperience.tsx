"use client";

import { SkipLink } from "@/components/a11y/SkipLink";
import { JourneyViewport } from "@/components/journey/JourneyViewport";
import { JourneyErrorBoundary } from "@/engine/errors/JourneyErrorBoundary";
import { JourneyProvider } from "@/engine/journey/JourneyProvider";
import type { JourneyDefinition } from "@/engine/types";

type JourneyExperienceProps = {
  definition: JourneyDefinition;
};

export function JourneyExperience({ definition }: JourneyExperienceProps) {
  return (
    <JourneyErrorBoundary>
      <SkipLink />
      <JourneyProvider key={definition.id} definition={definition}>
        <JourneyViewport />
      </JourneyProvider>
    </JourneyErrorBoundary>
  );
}
