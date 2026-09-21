"use client";

import { useEffect, useRef } from "react";

type CloudFieldProps = {
  density: number;
  separation: number;
  reducedMotion: boolean;
};

type Blob = {
  x: number;
  y: number;
  r: number;
  a: number;
  vx: number;
  vy: number;
};

type Layer = {
  blobs: Blob[];
  color: string;
  depth: number;
};

export function CloudField({ density, separation, reducedMotion }: CloudFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ density, separation, reducedMotion });
  const paintRef = useRef<(advance: boolean) => void>(() => undefined);

  useEffect(() => {
    stateRef.current = { density, separation, reducedMotion };
    paintRef.current(false);
  }, [density, reducedMotion, separation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const layers = createLayers(window.innerWidth < 768);
    let frame = 0;
    let running = true;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const paint = (advance: boolean) => {
      const now = performance.now();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dt = advance ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      context.clearRect(0, 0, width, height);

      const { density: fog, separation: part, reducedMotion: still } = stateRef.current;

      layers.forEach((layer, index) => {
        const split = (index - (layers.length - 1) / 2) * part * width * 0.42;

        layer.blobs.forEach((blob) => {
          if (advance && !still) {
            blob.x += blob.vx * dt;
            blob.y += blob.vy * dt;
            if (blob.x < -0.25) blob.x = 1.25;
            if (blob.x > 1.25) blob.x = -0.25;
            if (blob.y < -0.2) blob.y = 1.15;
            if (blob.y > 1.2) blob.y = -0.15;
          }

          const cx = blob.x * width + split;
          const cy = blob.y * height + part * layer.depth * 18;
          const radius = blob.r * Math.min(width, height) * (1 + part * 0.18);
          const gradient = context.createRadialGradient(cx, cy, radius * 0.12, cx, cy, radius);
          const alpha = blob.a * (0.45 + fog * 0.7) * (1 - part * 0.6);
          gradient.addColorStop(0, rgba(layer.color, alpha));
          gradient.addColorStop(1, rgba(layer.color, 0));
          context.fillStyle = gradient;
          context.beginPath();
          context.arc(cx, cy, radius, 0, Math.PI * 2);
          context.fill();
        });
      });
    };

    paintRef.current = paint;

    const loop = () => {
      if (!running) return;
      paint(true);
      if (!stateRef.current.reducedMotion) {
        frame = window.requestAnimationFrame(loop);
      }
    };

    resize();
    loop();
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      paintRef.current = () => undefined;
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  );
}

function createLayers(compact: boolean): Layer[] {
  const layerCount = compact ? 3 : 5;
  return Array.from({ length: layerCount }, (_, index) => {
    const count = compact ? 3 : 4;
    const depth = 0.45 + index * 0.12;
    return {
      depth,
      color: index % 2 === 0 ? "28,24,22" : "16,20,26",
      blobs: Array.from({ length: count }, (__, blobIndex) => ({
        x: (index * 0.17 + blobIndex * 0.28) % 1,
        y: 0.18 + ((index + blobIndex) % 4) * 0.18,
        r: 0.42 + ((index + blobIndex) % 3) * 0.12,
        a: 0.4 + depth * 0.28,
        vx: (index % 2 === 0 ? 0.012 : -0.008) * (0.6 + blobIndex * 0.15),
        vy: (blobIndex % 2 === 0 ? 0.003 : -0.0025) * (0.5 + index * 0.1),
      })),
    };
  });
}

function rgba(color: string, alpha: number): string {
  return `rgba(${color},${Math.max(0, alpha)})`;
}
