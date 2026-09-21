"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

export type ThemeName = "dark" | "light";

const STORAGE_KEY = "knowbeyondme-theme";
const listeners = new Set<() => void>();
let clientReady = false;

type ThemeContextValue = {
  theme: ThemeName;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  if (!clientReady) {
    queueMicrotask(() => {
      clientReady = true;
      onStoreChange();
    });
  }
  return () => {
    listeners.delete(onStoreChange);
  };
}

function readThemeSnapshot(): ThemeName {
  return clientReady ? readTheme() : "dark";
}

function readTheme(): ThemeName {
  if (typeof document === "undefined") return "dark";
  const fromDom = document.documentElement.dataset.theme;
  if (fromDom === "light" || fromDom === "dark") return fromDom;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* keep default */
  }
  return "dark";
}

function writeTheme(theme: ThemeName) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
  emit();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readThemeSnapshot, (): ThemeName => "dark");

  const toggleTheme = useCallback(() => {
    writeTheme(readTheme() === "light" ? "dark" : "light");
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return value;
}
