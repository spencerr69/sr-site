"use client";
import { Artwork } from "@/components/Artwork";
import { ReleaseRow } from "@/components/ReleaseRow";
import type { Release } from "@/lib/definitions";
import { useState } from "react";

export function Discog({ releases }: { releases: Release[] }) {
  const [activeUpc, setActiveUpc] = useState<string | null>(null);
  const active = releases.find((r) => r.upc === activeUpc) ?? releases[0];
  return (
    <div className="flex justify-between">
      <ul className="max-w-xl grid grid-cols-1 gap-4 lg:gap-10">
        {releases.map((release) => (
          <li
            key={release.upc}
            onMouseEnter={() => {
              setActiveUpc(release.upc);
            }}
            onFocus={() => {
              setActiveUpc(release.upc);
            }}
          >
            <ReleaseRow release={release} />
          </li>
        ))}
      </ul>
      <div className="hidden lg:block w-96">
        {active && <Artwork release={active} size={750} />}
      </div>
    </div>
  );
}
