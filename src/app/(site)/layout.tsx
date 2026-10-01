import { RouteFocus } from "@/components/RouteFocus";
import { Scene } from "@/components/scene/Scene";
import { getArtist } from "@/lib/api";
import { FALLBACK_PALETTE, paletteFrom } from "@/lib/palette";
import type { CSSProperties, PropsWithChildren } from "react";

export default async function SiteLayout({ children }: PropsWithChildren) {
  const palette = await getArtist().then(paletteFrom, () => FALLBACK_PALETTE);
  const vars = {
    "--background": palette.background,
    "--foreground": palette.foreground,
    "--accent": palette.accent,
  } as CSSProperties;

  return (
    <div style={vars} className="text-foreground">
      <link rel="preconnect" href="https://sr.linkr.audio" />
      <Scene />
      <RouteFocus />
      <main className={"m-4 sm:m-15"}>{children}</main>
    </div>
  );
}
