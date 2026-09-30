import { RouteFocus } from "@/components/RouteFocus";
import { Scene } from "@/components/scene/Scene";
import type { PropsWithChildren } from "react";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <>
      <link rel={"preconnect"} href={"https://sr.linkr.audio"} />
      <Scene />
      <RouteFocus />
      <main className={"m-15"}>{children}</main>
    </>
  );
}
