import { Discog } from "@/components/Discog";
import { Heading } from "@/components/Heading";
import { JsonLd } from "@/components/JsonLd";
import { getReleases } from "@/lib/api";
import type { Release } from "@/lib/definitions";
import { releaseType } from "@/lib/releases";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "music",
  alternates: { canonical: "/music" },
};

const SCHEMA_TYPE = {
  single: "SingleRelease",
  ep: "EPRelease",
  album: "AlbumRelease",
} as const;

const listItem = (release: Release, i: number) => ({
  "@type": "ListItem",
  position: i + 1,
  item: {
    "@type": "MusicAlbum",
    name: release.title,
    url: release.self_url ?? undefined,
    image: release.artwork ?? undefined,
    datePublished: release.release_date,
    albumReleaseType: `https://schema.org/${SCHEMA_TYPE[releaseType(release)]}`,
    byArtist: { "@type": "MusicGroup", name: release.artist_name },
  },
});
export default async function MusicPage() {
  const releases = await getReleases();

  return (
    <>
      <Link className={"cursor-pointer nav-link font-mono"} href={"/"}>
        spencer raymond
      </Link>
      <Heading>music</Heading>
      <Discog releases={releases} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: releases.map(listItem),
        }}
      />
    </>
  );
}
