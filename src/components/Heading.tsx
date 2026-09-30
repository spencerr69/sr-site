import type { PropsWithChildren } from "react";

export function Heading({ children }: PropsWithChildren) {
  return (
    <h1
      className={
        "text-white font-mono font-bold text-3xl focus:outline-none mb-4"
      }
    >
      {children}
    </h1>
  );
}
