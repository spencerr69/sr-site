import { ExitLink } from "@/components/ExitLink";
import { Heading } from "@/components/Heading";
import type { Artist, Release } from "@/lib/definitions";
import NextLink from "next/link";

// block + py-3 makes each row 44px tall on phones (20px line + 24px padding); lg:py-0 keeps desktop tight
const ROW = "nav-link block py-3 lg:py-0";

export function Links({ artist, latest }: { artist: Artist; latest: Release }) {
  const socials = artist.links
    .map((link) => ({ ...link, name: link.name.toLowerCase() }))
    .filter(({ name }) => name !== "website");

  return (
    <>
      <Heading>spencer raymond</Heading>
      <nav className=" font-mono text-sm font-light">
        <ul>
          <li>
            {latest.self_url ? (
              <ExitLink href={latest.self_url} className={ROW}>
                new: {latest.title} &gt;
              </ExitLink>
            ) : (
              <span className="block py-3 lg:py-0">new: {latest.title} →</span>
            )}
          </li>
          <li>
            <NextLink href="/music" className={ROW}>
              music
            </NextLink>
          </li>
        </ul>
        <ul className="mt-6">
          <li>
            <NextLink href="/presskit" className={ROW}>
              press kit
            </NextLink>
          </li>
        </ul>
        {socials.length > 0 && (
          <ul className="mt-6">
            {socials.map((link) => (
              <li key={link.url}>
                <a href={link.url} className={ROW}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </>
  );
}
