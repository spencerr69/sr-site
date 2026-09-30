import { RouteFocus } from "@/components/RouteFocus";
import { Scene } from "@/components/Scene";
import type { PropsWithChildren } from "react";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Scene />
      <RouteFocus />
      <main className={"m-15"}>{children}</main>
    </>
  );
}
