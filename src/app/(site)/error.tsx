"use client";
import { Heading } from "@/components/Heading";
import { FALLBACK_LINKS } from "@/lib/fallbackLinks";
import NextLink from "next/link";
import { useEffect } from "react";

const ROW = "nav-link block py-3 lg:py-0";

export default function SiteError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Heading>spencer raymond</Heading>
      <div className="text-white font-mono text-sm font-light">
        <p>something broke on the way here.</p>
        <ul className="mt-6">
          <li>
            <button
              type="button"
              onClick={() => {
                retry();
              }}
              className={`${ROW} cursor-pointer`}
            >
              try again
            </button>
          </li>
        </ul>
        <ul className="mt-6">
          {FALLBACK_LINKS.map((link) => (
            <li key={link.url}>
              <NextLink href={link.url} className={ROW}>
                {link.name}
              </NextLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
