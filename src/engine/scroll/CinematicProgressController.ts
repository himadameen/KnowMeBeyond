import { clamp, clamp01 } from "@/engine/math";
import type { ProgressDriver, ProgressSnapshot } from "@/engine/input/ProgressDriver";
import type { JourneyDirection, JourneyInputSource } from "@/engine/types";

type Options = {
  gateAt: number;
  autoUntil?: number;
  lingerFrom?: number;
  openingEnd?: number;
};

const IDLE_MS = 160;
const USER_PAUSE_MS = 1400;

export class CinematicProgressController implements ProgressDriver {
  private progress = 0;
  private gateReleased = false;
  private reducedMotion = false;
  private lastSource: JourneyInputSource = "programmatic";
  private lastProgress = 0;
  private lastEmitted = -1;
  private lastTime = 0;
  private userPauseUntil = 0;
  private frame = 0;
  private idleTimer: number | null = null;
  private attached = false;
  private readonly listeners = new Set<(state: ProgressSnapshot) => void>();
  private readonly gateAt: number;
  private readonly autoUntil: number;
  private readonly lingerFrom: number;
  private readonly openingEnd: number;
  private touchStartY = 0;
  private touchStartProgress = 0;

  constructor(options: Options) {
    this.gateAt = options.gateAt;
    this.autoUntil = options.autoUntil ?? 1;
    this.lingerFrom = options.lingerFrom ?? 1;
    this.openingEnd = options.openingEnd ?? this.autoUntil;
  }

  attach(): () => void {
    if (typeof window === "undefined") {
      return () => undefined;
    }

    this.attached = true;
    document.documentElement.classList.add("journey-lock");
    this.lastTime = performance.now();

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      this.nudge(event.deltaY / this.sensitivity(), "scroll");
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      this.touchStartY = touch.clientY;
      this.touchStartProgress = this.progress;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      event.preventDefault();
      const delta = (this.touchStartY - touch.clientY) / window.innerHeight;
      this.setAbsolute(this.touchStartProgress + delta * this.swipeGain(), "swipe");
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditable(event.target)) return;
      if (event.target instanceof HTMLButtonElement) return;

      if (event.key === "Home") {
        event.preventDefault();
        this.setAbsolute(0, "keyboard");
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        this.setAbsolute(this.maxAllowed(), "keyboard");
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        this.nudge(this.keyStep(), "keyboard");
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        this.nudge(-this.keyStep(), "keyboard");
      }
    };

    const onVisibility = () => {
      this.lastTime = performance.now();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("visibilitychange", onVisibility);

    this.frame = window.requestAnimationFrame(this.tick);

    return () => {
      this.attached = false;
      document.documentElement.classList.remove("journey-lock");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("visibilitychange", onVisibility);
      window.cancelAnimationFrame(this.frame);
      if (this.idleTimer !== null) {
        window.clearTimeout(this.idleTimer);
        this.idleTimer = null;
      }
    };
  }

  subscribe(listener: (state: ProgressSnapshot) => void): () => void {
    this.listeners.add(listener);
    listener(this.snapshot("idle", 0, this.lastSource));
    return () => {
      this.listeners.delete(listener);
    };
  }

  setProgress(progress: number, source: JourneyInputSource, reducedMotion: boolean): void {
    this.reducedMotion = reducedMotion;
    this.setAbsolute(progress, source);
  }

  refresh(): void {}

  releaseGate(): void {
    this.gateReleased = true;
  }

  setReducedMotion(reducedMotion: boolean): void {
    this.reducedMotion = reducedMotion;
  }

  private tick = (now: number): void => {
    if (!this.attached) return;

    const dt = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;

    const paused = now < this.userPauseUntil || document.hidden;
    if (!paused) {
      const cap = Math.min(this.maxAllowed(), this.autoUntil);
      const rate = this.autoRate();
      if (this.progress < cap - 0.0005) {
        this.progress = clamp(this.progress + dt * rate, 0, cap);
        if (Math.abs(this.progress - this.lastEmitted) >= 0.0012) {
          this.lastEmitted = this.progress;
          this.emit(this.snapshot("forward", rate, "programmatic"));
        }
      }
    }

    this.frame = window.requestAnimationFrame(this.tick);
  };

  private nudge(delta: number, source: JourneyInputSource): void {
    this.setAbsolute(this.progress + delta, source);
  }

  private setAbsolute(progress: number, source: JourneyInputSource): void {
    const next = clamp(progress, 0, this.maxAllowed());
    const direction = this.directionFromDelta(next - this.progress);
    this.progress = next;
    this.lastSource = source;
    this.userPauseUntil = performance.now() + USER_PAUSE_MS;
    this.emit(this.snapshot(direction, next - this.lastProgress, source));
  }

  private maxAllowed(): number {
    return this.gateReleased ? 1 : this.gateAt;
  }

  private autoRate(): number {
    const still = this.reducedMotion;
    if (!this.gateReleased) {
      return this.gateAt / (still ? 16 : 34);
    }
    if (this.lateChapter()) return still ? 0.007 : 0.0038;
    if (this.lingering()) return still ? 0.009 : 0.0052;
    if (this.afterOpening()) return still ? 0.012 : 0.0075;
    return still ? 0.018 : 0.012;
  }

  private afterOpening(): boolean {
    return this.progress >= this.openingEnd - 0.012;
  }

  private lingering(): boolean {
    return this.progress >= this.lingerFrom - 0.01;
  }

  private lateChapter(): boolean {
    return this.progress >= 0.88;
  }

  private sensitivity(): number {
    if (this.lateChapter()) return 5600;
    if (this.lingering()) return 4200;
    if (this.afterOpening()) return 3200;
    return 2200;
  }

  private swipeGain(): number {
    if (this.lateChapter()) return 0.12;
    if (this.lingering()) return 0.18;
    if (this.afterOpening()) return 0.26;
    return 0.42;
  }

  private keyStep(): number {
    if (this.lateChapter()) return 0.008;
    if (this.lingering()) return 0.012;
    if (this.afterOpening()) return 0.016;
    return 0.035;
  }

  private snapshot(
    direction: JourneyDirection,
    velocity: number,
    source: JourneyInputSource,
  ): ProgressSnapshot {
    return {
      progress: clamp01(this.progress),
      direction,
      velocity,
      source,
    };
  }

  private emit(state: ProgressSnapshot): void {
    this.lastProgress = state.progress;
    this.listeners.forEach((listener) => listener(state));
    this.scheduleIdle(state);
  }

  private scheduleIdle(state: ProgressSnapshot): void {
    if (typeof window === "undefined") return;
    if (this.idleTimer !== null) window.clearTimeout(this.idleTimer);
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
}

function isEditable(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT")
  );
}
