import { getArtist } from "@/actions/artist";
import { getDiscog } from "@/actions/discog";
import App from "@/components/App";

export default async function Home() {
  const discogResults = await getDiscog();
  const artistResults = await getArtist();

  return (
    <>
      <App discogResults={discogResults} artistResults={artistResults} />
    </>
  );
}
