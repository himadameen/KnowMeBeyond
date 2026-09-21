export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function clamp01(value: number): number {
  return clamp(value, 0, 1);
}

export function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge1 === edge0) return x >= edge1 ? 1 : 0;
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function envelope(
  progress: number,
  fadeIn: number,
  fullStart: number,
  fullEnd: number,
  fadeOut: number,
): number {
  if (progress <= fadeIn || progress >= fadeOut) return 0;
  if (progress >= fullStart && progress <= fullEnd) return 1;
  if (progress < fullStart) return smoothstep(fadeIn, fullStart, progress);
  return 1 - smoothstep(fullEnd, fadeOut, progress);
}
