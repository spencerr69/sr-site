"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Component, type ReactNode } from "react";

export type SceneView = "home" | "music" | "presskit";
export const viewForPath = (pathname: string): SceneView =>
  pathname === "/presskit"
    ? "presskit"
    : pathname === "/music" || pathname.startsWith("/music/")
      ? "music"
      : "home";

const FiberScene = dynamic(() => import("@/components/scene/FiberScene"), {
  ssr: false,
});

class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  static getDerivedStateFromError() {
    return { failed: true };
  }

  override render() {
    return this.state.failed ? null : this.props.children;
  }

  override state = { failed: false };
}

export function Scene() {
  const view = viewForPath(usePathname());
  return (
    <SceneErrorBoundary>
      <FiberScene view={view} />
    </SceneErrorBoundary>
  );
}
