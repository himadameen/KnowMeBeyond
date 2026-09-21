"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "knowbeyondme:debug";

function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

function readDebugFlag(): boolean {
  if (!isDevelopment()) {
    return false;
  }

  if (process.env.NEXT_PUBLIC_JOURNEY_DEBUG === "true") {
    return true;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("debug") === "1") {
    return true;
  }

  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

export function useDebugMode(): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    if (!isDevelopment()) {
      return () => undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "j") {
        event.preventDefault();
        const next = window.localStorage.getItem(STORAGE_KEY) !== "1";
        window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
        onStoreChange();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("storage", onStoreChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("storage", onStoreChange);
    };
  }, []);

  return useSyncExternalStore(subscribe, readDebugFlag, () => false);
}
