import { Links } from "@/components/Links";
import { getArtist } from "@/lib/api";

export default async function Home() {
  const [artist] = await Promise.all([getArtist()]);

  return (
    <>
      <Links artist={artist} />
    </>
  );
}
