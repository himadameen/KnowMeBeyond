import type { JourneyDefinition } from "@/engine/types";

/**
 * Internal engine-validation scenes only.
 * Not part of the KNOWBEYONDME story.
 */
export const testJourney: JourneyDefinition = {
  id: "phase-1-engine-test",
  title: "Journey Engine",
  mode: "journey",
  scrollLengthVh: 360,
  scenes: [
    {
      id: "scene-a",
      slug: "scene-a",
      title: "Scene A",
      chapter: "Engine Test",
      environment: "dark",
      progressStart: 0,
      progressEnd: 1 / 3,
      camera: [
        { at: 0, state: { y: 0, scale: 1 } },
        { at: 1, state: { y: -18, scale: 1.04 } },
      ],
      transition: { type: "fade", durationMs: 420 },
    },
    {
      id: "scene-b",
      slug: "scene-b",
      title: "Scene B",
      chapter: "Engine Test",
      environment: "technical",
      progressStart: 1 / 3,
      progressEnd: 2 / 3,
      camera: [
        { at: 0, state: { x: 28, scale: 1 } },
        { at: 1, state: { x: -28, scale: 1 } },
      ],
      transition: { type: "fade", durationMs: 420 },
    },
    {
      id: "scene-c",
      slug: "scene-c",
      title: "Scene C",
      chapter: "Engine Test",
      environment: "warm",
      progressStart: 2 / 3,
      progressEnd: 1,
      camera: [
        { at: 0, state: { y: 14, scale: 1 } },
        { at: 1, state: { y: -14, scale: 1.03 } },
      ],
      transition: { type: "fade", durationMs: 420 },
    },
  ],
};
