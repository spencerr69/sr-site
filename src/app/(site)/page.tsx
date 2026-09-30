import App from "@/components/App";
import { getArtist, getReleases } from "@/lib/api";

export default async function Home() {
  const releases = getReleases();
  const artist = getArtist();
  const [discogResults, artistResults] = await Promise.all([releases, artist]);

  return (
    <>
      <App discogResults={discogResults} artistResults={artistResults} />
    </>
  );
}
