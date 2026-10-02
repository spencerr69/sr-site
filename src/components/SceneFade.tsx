"use client";
import { sceneFade } from "@/lib/sceneFade";
import { useEffect } from "react";

export function SceneFade({ top, bottom }: { top: string; bottom: string }) {
  useEffect(() => {
    const topEl = document.getElementById(top);
    const bottomEl = document.getElementById(bottom);
    if (!topEl || !bottomEl) return;
    let topShown = true;
    let bottomShown = false;
    const apply = () => {
      if (bottomShown) sceneFade.show("bottom");
      else if (topShown) sceneFade.show("top");
      else sceneFade.dim();
    };
    const topIo = new IntersectionObserver(
      ([entry]) => {
        topShown = entry?.isIntersecting ?? false;
        apply();
      },
      { rootMargin: "-50% 0px 0px 0px" },
    );
    const bottomIo = new IntersectionObserver(
      ([entry]) => {
        bottomShown = entry?.isIntersecting ?? false;
        apply();
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    topIo.observe(topEl);
    bottomIo.observe(bottomEl);
    return () => {
      topIo.disconnect();
      bottomIo.disconnect();
      sceneFade.show("top");
    };
  }, [top, bottom]);

  return null;
}
