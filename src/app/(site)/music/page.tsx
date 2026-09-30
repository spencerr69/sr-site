import { Discog } from "@/components/Discog";
import { Heading } from "@/components/Heading";
import { getReleases } from "@/lib/api";
import Link from "next/link";

export default async function MusicPage() {
  const releases = await getReleases();

  return (
    <>
      <Link className={"cursor-pointer nav-link font-mono"} href={"/"}>
        spencer raymond
      </Link>
      <Heading>music</Heading>
      <Discog releases={releases} />
    </>
  );
}
