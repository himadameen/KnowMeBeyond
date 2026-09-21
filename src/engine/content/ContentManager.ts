import type { JourneyDefinition } from "@/engine/types";

export interface ContentSource {
  getJourney(): JourneyDefinition;
}

/**
 * Local typed source. Later this can be replaced by a Strapi source
 * that still returns JourneyDefinition.
 */
export class LocalContentSource implements ContentSource {
  constructor(private readonly journey: JourneyDefinition) {}

  getJourney(): JourneyDefinition {
    return this.journey;
  }
}

export class ContentManager {
  constructor(private readonly source: ContentSource) {}

  getJourney(): JourneyDefinition {
    try {
      return this.source.getJourney();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[ContentManager] failed to load journey", error);
      }
      return {
        id: "fallback",
        title: "Journey Engine",
        mode: "journey",
        scrollLengthVh: 100,
        scenes: [],
      };
    }
  }
}
