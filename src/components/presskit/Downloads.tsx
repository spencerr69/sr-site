import { ZipButton } from "@/components/presskit/ZipButton";
import cloudflareLoader from "@/lib/imageLoader";
import { BIOS, EMAIL, LOGO, media, PHOTOS } from "@/lib/presskit";
import type { PresskitRelease } from "@/lib/presskitReleases";

const button =
  "inline-flex min-h-11 items-center underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const zipText = () =>
  [
    "SPENCER RAYMOND: PRESS KIT",
    "",
    "one-liner",
    BIOS.oneLiner,
    "",
    "short bio",
    BIOS.short,
    "",
    "full bio",
    ...BIOS.full.flatMap((paragraph) => [paragraph, ""]),
    "photo credits",
    ...PHOTOS.map((photo) => `${photo.file}: ${photo.credit}`),
    "",
    `contact: ${EMAIL}`,
  ].join("\n");

export function Downloads({ releases }: { releases: PresskitRelease[] }) {
  const files = [
    ...PHOTOS.map((photo) => ({
      name: `photos/${photo.file}`,
      url: media(`presskit/photos/${photo.file}`),
    })),
    ...releases.flatMap((release) =>
      release.artwork
        ? [
            {
              name: `artwork/${release.slug}.jpg`,
              url: cloudflareLoader({
                src: release.artwork,
                width: release.downloadWidth,
              }),
            },
          ]
        : [],
    ),
    { name: `logo/${LOGO.file}`, url: media(`presskit/logo/${LOGO.file}`) },
  ];

  return (
    <section aria-labelledby="downloads">
      <h2 id="downloads" className="mb-2 font-mono text-xl font-bold">
        downloads
      </h2>
      <ul>
        {releases.flatMap((release) =>
          release.artwork
            ? [
                <li
                  key={release.slug}
                  className="flex flex-wrap items-center gap-x-3"
                >
                  <span>{release.title}</span>
                  <span className="text-sm">
                    {release.downloadWidth} × {release.downloadWidth} px
                  </span>
                  <a
                    className={button}
                    href={cloudflareLoader({
                      src: release.artwork,
                      width: release.downloadWidth,
                    })}
                    download={`spencer-raymond-${release.slug}.jpg`}
                  >
                    download
                  </a>
                </li>,
              ]
            : [],
        )}
        <li className="flex flex-wrap items-center gap-x-3">
          <span>logo</span>
          <a
            className={button}
            href={media(`presskit/logo/${LOGO.file}`)}
            download
          >
            download
          </a>
        </li>
        <li>
          <ZipButton files={files} text={zipText()} />
        </li>
      </ul>
    </section>
  );
}
