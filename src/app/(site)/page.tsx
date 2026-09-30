import { Links } from "@/components/Links";
import { getArtist, getRecentRelease } from "@/lib/api";

export default async function Home() {
  const [artist, latest] = await Promise.all([getArtist(), getRecentRelease()]);

  return <Links artist={artist} latest={latest} />;
}
