import type { Release } from "@/lib/definitions";
import Image from "next/image";

export function Artwork({
  release,
  size,
}: {
  release: Release;
  size?: number;
}) {
  return (
    <div
      className={
        "aspect-square max-h-128 artwork p-3 border-foreground/40 border-dotted border-2 hidden lg:block bg-background"
      }
    >
      <Image
        className={" p-3 object-fit h-full max-h-128"}
        src={release.artwork ?? ""}
        alt={`Album artwork for ${release.title}`}
        width={size ?? 500}
        height={size ?? 500}
        loading={"lazy"}
      />
    </div>
  );
}
