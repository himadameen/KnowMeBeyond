import type { ReactNode } from "react";

type VisuallyHiddenProps = {
  children: ReactNode;
  as?: "span" | "h1" | "p";
};

export function VisuallyHidden({ children, as: Tag = "span" }: VisuallyHiddenProps) {
  return <Tag className="sr-only">{children}</Tag>;
}
