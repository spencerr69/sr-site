import "server-only";
import { getReleases } from "@/lib/api";
import { CARDS, RELEASE_SLUGS } from "@/lib/presskit";

export type PresskitRelease = {
  slug: string;
  title: string;
  artwork: string | undefined;
  url: string | undefined;
  downloadWidth: 3000 | 640;
};

export type CardData = {
  title: string;
  description: string;
  href: string;
  image?: string | undefined;
  quote?: string | undefined;
};

export async function getPresskitReleases(): Promise<PresskitRelease[]> {
  const all = await getReleases();
  return RELEASE_SLUGS.flatMap((slug) => {
    const release = all.find((r) => r.slug === slug);
    if (!release) return [];
    const artwork = release.artwork ?? undefined;
    return [
      {
        slug,
        title: release.title,
        artwork,
        url: release.self_url ?? undefined,
        downloadWidth: artwork?.startsWith("https://linkr.audio/") ? 3000 : 640,
      },
    ];
  });
}

export function resolveCards(
  releases: PresskitRelease[],
): Record<string, CardData> {
  const out: Record<string, CardData> = {};
  for (const [id, card] of Object.entries(CARDS)) {
    const release = releases.find((r) => r.slug === id);
    const title = card.title ?? release?.title;
    const href = card.href ?? release?.url;
    if (!title || !href) continue;
    out[id] = {
      title,
      description: card.description,
      href,
      image: card.image ?? release?.artwork,
      quote: card.quote,
    };
  }
  return out;
}
