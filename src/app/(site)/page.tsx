import { JsonLd } from "@/components/JsonLd";
import { Links } from "@/components/Links";
import { getArtist, getRecentRelease } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default async function Home() {
  const [artist, latest] = await Promise.all([getArtist(), getRecentRelease()]);

  return (
    <>
      <Links artist={artist} latest={latest} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: artist.master_artist_name,
          url: SITE_URL,
          sameAs: artist.links.map((link) => link.url),
          image: latest.artwork ?? undefined,
        }}
      />
    </>
  );
}
