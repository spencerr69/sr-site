import { Heading } from "@/components/Heading";
import { type Artist, type Link } from "@/lib/definitions";
import NextLink from "next/link";

export function Links({ artist }: { artist: Artist }) {
  const links: Link[] = [
    { name: "music", url: "/music" },
    { name: "press kit", url: "/presskit" },
    ...artist.links
      .map((link) => {
        return { ...link, name: link.name.toLowerCase() };
      })
      .filter(({ name }) => name !== "website"),
  ];

  const liItems = links.map((link, i) => {
    return (
      <li key={i}>
        <NextLink href={link.url || "#"} className={"nav-link "}>
          {link.name}
        </NextLink>
      </li>
    );
  });

  return (
    <>
      <Heading>spencer raymond</Heading>
      <div className="text-white font-mono text-sm font-light">
        <ul>{liItems}</ul>
      </div>
    </>
  );
}
