import type { JourneyTrigger } from "@/engine/types";

export class TriggerManager {
  private readonly fired = new Set<string>();

  evaluate(sceneProgress: number, triggers: JourneyTrigger[] = []): JourneyTrigger[] {
    const activated: JourneyTrigger[] = [];

    for (const trigger of triggers) {
      if (sceneProgress < trigger.at) {
        continue;
      }

      if (trigger.once !== false && this.fired.has(trigger.id)) {
        continue;
      }

      this.fired.add(trigger.id);
      activated.push(trigger);
    }

    return activated;
  }

  reset(): void {
    this.fired.clear();
  }
}
