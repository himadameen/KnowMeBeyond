"use client";

import { useEffect, useId, useRef } from "react";
import { useTheme } from "@/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const uid = useId().replace(/:/g, "");
  const halo = `moon-halo-${uid}`;
  const core = `moon-core-${uid}`;
  const shade = `moon-shade-${uid}`;

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    const light = theme === "light";
    button.setAttribute("aria-pressed", light ? "true" : "false");
    button.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
  }, [theme]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggleTheme}
      aria-label="Switch color theme"
      className="theme-toggle pointer-events-auto absolute right-4 top-4 z-40 size-12 rounded-full"
    >
      <span className="sr-only">Color theme</span>
      <svg viewBox="0 0 64 64" className="size-full" aria-hidden="true">
        <defs>
          <radialGradient id={halo} cx="50%" cy="50%" r="50%">
            <stop offset="0%" className="theme-moon-halo-0" />
            <stop offset="62%" className="theme-moon-halo-1" />
            <stop offset="100%" stopColor="rgba(210,220,255,0)" />
          </radialGradient>
          <radialGradient id={core} cx="34%" cy="30%" r="70%">
            <stop offset="0%" className="theme-moon-core-0" />
            <stop offset="42%" className="theme-moon-core-1" />
            <stop offset="78%" className="theme-moon-core-2" />
            <stop offset="100%" className="theme-moon-core-3" />
          </radialGradient>
          <radialGradient id={shade} cx="72%" cy="68%" r="58%">
            <stop offset="0%" stopColor="rgba(18,22,36,0)" />
            <stop offset="100%" className="theme-moon-shade" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="31" fill={`url(#${halo})`} />
        <circle cx="32" cy="32" r="13.4" fill={`url(#${core})`} />
        <circle cx="32" cy="32" r="13.4" fill={`url(#${shade})`} />
        <ellipse className="theme-moon-crater" cx="26" cy="27" rx="2.6" ry="2.1" />
        <ellipse className="theme-moon-crater" cx="36.5" cy="24.5" rx="1.5" ry="1.2" />
        <ellipse className="theme-moon-crater" cx="34" cy="34.8" rx="3.1" ry="2.4" />
        <ellipse className="theme-moon-crater-soft" cx="24.5" cy="35" rx="1.8" ry="1.3" />
        <ellipse cx="27.2" cy="25.6" rx="2.1" ry="1.2" fill="rgba(255,255,255,0.22)" />
      </svg>
    </button>
  );
}
