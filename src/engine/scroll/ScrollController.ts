import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clamp01 } from "@/engine/math";
import type { ProgressDriver, ProgressSnapshot } from "@/engine/input/ProgressDriver";
import type { JourneyDirection, JourneyInputSource } from "@/engine/types";

export type ScrollState = ProgressSnapshot;

type ScrollListener = (state: ScrollState) => void;

const IDLE_MS = 140;

export class ScrollController implements ProgressDriver {
  private trigger: ScrollTrigger | null = null;
  private usingFallback = false;
  private idleTimer: number | null = null;
  private lastProgress = 0;
  private lastSource: JourneyInputSource = "scroll";
  private readonly listeners = new Set<ScrollListener>();
  private fallbackHandler: (() => void) | null = null;

  attach(): () => void {
    if (typeof window === "undefined") {
      return () => undefined;
    }

    try {
      gsap.registerPlugin(ScrollTrigger);
      const trigger = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          this.emit({
            progress: clamp01(self.progress),
            direction: self.direction === -1 ? "backward" : "forward",
            velocity: self.getVelocity(),
            source: this.lastSource,
          });
        },
      });
      this.trigger = trigger;
      ScrollTrigger.refresh();
      this.emit({
        progress: clamp01(trigger.progress),
        direction: "idle",
        velocity: 0,
        source: this.lastSource,
      });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("[ScrollController] ScrollTrigger unavailable, using fallback", error);
      }
      this.usingFallback = true;
      this.fallbackHandler = () => {
        this.emit({
          progress: readDocumentProgress(),
          direction: this.directionFromDelta(readDocumentProgress() - this.lastProgress),
          velocity: 0,
          source: this.lastSource,
        });
      };
      window.addEventListener("scroll", this.fallbackHandler, { passive: true });
      this.fallbackHandler();
    }

    return () => this.detach();
  }

  subscribe(listener: ScrollListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  setProgress(progress: number, source: JourneyInputSource, reducedMotion: boolean): void {
    if (typeof window === "undefined") {
      return;
    }

    this.lastSource = source;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const top = clamp01(progress) * Math.max(max, 0);

    window.scrollTo({
      top,
      behavior: reducedMotion || source === "programmatic" ? "auto" : "smooth",
    });
  }

  refresh(): void {
    if (!this.usingFallback) {
      ScrollTrigger.refresh();
    }
  }

  releaseGate(): void {}

  setReducedMotion(reducedMotion: boolean): void {
    void reducedMotion;
  }

  private emit(state: ScrollState): void {
    this.lastProgress = state.progress;
    this.listeners.forEach((listener) => listener(state));
    this.scheduleIdle(state);
  }

  private scheduleIdle(state: ScrollState): void {
    if (typeof window === "undefined") {
      return;
    }

    if (this.idleTimer !== null) {
      window.clearTimeout(this.idleTimer);
    }

    this.idleTimer = window.setTimeout(() => {
      this.listeners.forEach((listener) =>
        listener({
          ...state,
          direction: "idle",
          velocity: 0,
        }),
      );
    }, IDLE_MS);
  }

  private directionFromDelta(delta: number): JourneyDirection {
    if (delta > 0.0001) return "forward";
    if (delta < -0.0001) return "backward";
    return "idle";
  }

  private detach(): void {
    this.trigger?.kill();
    this.trigger = null;

    if (this.fallbackHandler) {
      window.removeEventListener("scroll", this.fallbackHandler);
      this.fallbackHandler = null;
    }

    if (this.idleTimer !== null) {
      window.clearTimeout(this.idleTimer);
      this.idleTimer = null;
    }

    this.listeners.clear();
  }
}

function readDocumentProgress(): number {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return clamp01(window.scrollY / max);
}
