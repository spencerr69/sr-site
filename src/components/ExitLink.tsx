"use client";
import { exitSwoop } from "@/lib/exitSwoop";
import { type ComponentProps, type MouseEvent, useState } from "react";

// a plain anchor that starts the camera dive on a plain click and never blocks the browser's own navigation
export function ExitLink({
  href,
  onClick,
  onMouseEnter,
  onFocus,
  children,
  ...rest
}: ComponentProps<"a">) {
  const [warm, setWarm] = useState(false);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const plain =
      e.button === 0 &&
      rest.target !== "_blank" &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey &&
      !e.defaultPrevented;
    if (plain) exitSwoop.start();
  };

  return (
    <>
      {warm && href && <link rel="prefetch" href={href} />}
      <a
        {...rest}
        href={href}
        onClick={handleClick}
        onMouseEnter={(e) => {
          onMouseEnter?.(e);
          setWarm(true);
        }}
        onFocus={(e) => {
          onFocus?.(e);
          setWarm(true);
        }}
      >
        {children}
      </a>
    </>
  );
}
