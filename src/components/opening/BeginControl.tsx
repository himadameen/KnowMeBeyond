"use client";

import { useEffect, useRef } from "react";
import { openingCopy } from "@/content/opening";

type BeginControlProps = {
  visible: boolean;
  reducedMotion: boolean;
  onBegin: () => void;
};

export function BeginControl({ visible, onBegin }: BeginControlProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!visible) return;
    const active = document.activeElement;
    if (active === document.body || active === document.getElementById("journey")) {
      buttonRef.current?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLButtonElement) return;
      if (event.target instanceof HTMLElement && event.target.isContentEditable) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onBegin();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onBegin, visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className="absolute inset-x-0 bottom-[18%] z-20 flex justify-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={onBegin}
        className="group relative px-4 py-3 font-heading text-[clamp(1.2rem,2.4vw,1.7rem)] tracking-[0.38em] text-ink"
      >
        {openingCopy.begin}
        <span
          aria-hidden="true"
          className="absolute inset-x-5 -bottom-1 h-px origin-center scale-x-[0.55] bg-gold/75 transition-transform duration-500 group-hover:scale-x-100 group-active:opacity-70 motion-reduce:scale-x-100"
        />
      </button>
    </div>
  );
}
