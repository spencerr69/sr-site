import type { ComponentProps } from "react";

export function ExternalLink({
  children,
  ...rest
}: Omit<ComponentProps<"a">, "target" | "rel">) {
  return (
    <a {...rest} target="_blank" rel="noopener noreferrer">
      {children}
      <span aria-hidden> ↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
