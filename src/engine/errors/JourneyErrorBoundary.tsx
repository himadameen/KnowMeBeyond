"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  failed: boolean;
};

export class JourneyErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (process.env.NODE_ENV === "development") {
      console.error("[JourneyErrorBoundary]", error, info);
    }
  }

  render(): ReactNode {
    if (this.state.failed) {
      return (
        <main
          id="journey"
          className="flex min-h-dvh items-center justify-center bg-background px-6 text-ink"
        >
          <div className="max-w-md text-center">
            <p className="font-heading text-section">Journey Engine</p>
            <p className="mt-3 text-body text-ink/70">
              The cinematic layer could not start. The page remains available.
            </p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
