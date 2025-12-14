import App from "@/components/App";
import {client} from "@/sanity/lib/client";
import {RELEASES_QUERY} from "@/sanity/lib/queries";

export default async function Home() {
  const discogResults = await client.fetch(RELEASES_QUERY);

  return (
    <>
      <App discogResults={discogResults} />
    </>
  );
}
