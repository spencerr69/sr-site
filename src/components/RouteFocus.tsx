"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * set focus on the first heading in the main element, for every render except the initial render
 */
export function RouteFocus() {
  const pathname = usePathname();
  // using a ref so we don't cause a re-render
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const heading = document.querySelector<HTMLElement>("main h1");
    if (!heading) return;
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
