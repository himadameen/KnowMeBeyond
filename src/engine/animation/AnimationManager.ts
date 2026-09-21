import { gsap } from "gsap";
import type { AnimationCategory, AnimationPurpose } from "@/engine/types";

export const animationDefaults: Record<
  AnimationCategory,
  { duration: number; ease: string }
> = {
  micro: { duration: 0.22, ease: "power2.out" },
  ui: { duration: 0.32, ease: "power2.out" },
  scene: { duration: 0.7, ease: "power1.out" },
  cinematic: { duration: 1.2, ease: "power2.inOut" },
  major: { duration: 2, ease: "power3.inOut" },
};

type PlayOptions = {
  purpose: AnimationPurpose;
  category: AnimationCategory;
  reducedMotion: boolean;
  from?: gsap.TweenVars;
};

export class AnimationManager {
  play(
    target: gsap.TweenTarget,
    vars: gsap.TweenVars,
    options: PlayOptions,
  ): gsap.core.Tween | gsap.core.Tween[] | null {
    if (!options.purpose) {
      return null;
    }

    const preset = animationDefaults[options.category];

    try {
      if (options.from) {
        gsap.set(target, options.from);
      }

      if (options.reducedMotion) {
        const immediate = { ...vars };
        delete immediate.duration;
        delete immediate.ease;
        delete immediate.delay;
        return gsap.set(target, immediate);
      }

      return gsap.to(target, {
        duration: preset.duration,
        ease: preset.ease,
        ...vars,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[AnimationManager] animation failed", error);
      }
      try {
        gsap.set(target, { opacity: 1, y: 0 });
      } catch {
        // Content stays in the document even if GSAP cannot recover.
      }
      return null;
    }
  }

  kill(target: gsap.TweenTarget): void {
    gsap.killTweensOf(target);
  }
}
