import { CinematicProgressController } from "@/engine/scroll/CinematicProgressController";
import { ScrollController } from "@/engine/scroll/ScrollController";
import type { ProgressDriver } from "@/engine/input/ProgressDriver";
import type { JourneyDefinition } from "@/engine/types";

export function createProgressDriver(definition: JourneyDefinition): ProgressDriver {
  if (definition.progressMode === "cinematic") {
    return new CinematicProgressController({
      gateAt: definition.gateProgress ?? 1,
      autoUntil: definition.autoUntilProgress ?? 1,
      lingerFrom: definition.lingerFromProgress ?? 1,
      openingEnd: definition.openingEndProgress ?? definition.autoUntilProgress ?? 1,
    });
  }

  return new ScrollController();
}
