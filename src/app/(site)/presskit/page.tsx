import { CopyButton } from "@/components/CopyButton";
import { ExternalLink } from "@/components/ExternalLink";
import { Downloads } from "@/components/presskit/Downloads";
import { CardHost, CardLink } from "@/components/presskit/PressCard";
import { Tile } from "@/components/presskit/Tile";
import {
  BIOS,
  EMAIL,
  FEATURES,
  FESTS,
  media,
  PHOTOS,
  QUOTE,
  SOCIALS,
} from "@/lib/presskit";
import { getPresskitReleases, resolveCards } from "@/lib/presskitReleases";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: { absolute: "Spencer Raymond: press kit" },
  description: BIOS.oneLiner,
  alternates: { canonical: "/presskit" },
};

const panel =
  "bg-background/85 border-2 border-dotted border-foreground/40 p-4";
const heading = "mb-2 font-mono text-xl font-bold";
const link =
  "underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default async function PressKitPage() {
  const releases = await getPresskitReleases();

  const cards = resolveCards(releases);
  const named = (id: string, children: ReactNode) => {
    const card = cards[id];
    return card ? <CardLink card={card}>{children}</CardLink> : children;
  };

  return (
    <>
      <section id="top" className="flex min-h-svh flex-col gap-4">
        <div className={`${panel} max-w-xl`}>
          <h1 className="font-mono text-3xl font-bold">spencer raymond</h1>
          <Link href="/" className="nav-link cursor-pointer font-mono">
            back
          </Link>
          <p className="mt-2">{BIOS.oneLiner}</p>
        </div>
      </section>

      <div className="grid gap-x-12 gap-y-16 lg:grid-cols-2">
        <section aria-labelledby="about">
          <h2 id="about" className={heading}>
            about
          </h2>
          <p className="mb-4">
            Spencer Raymond is a musician, songwriter, and producer from
            Naarm/Melbourne, Australia. His music ebbs and flows between
            soft-edged electronic and indie rock.
          </p>
          <p>
            His second album, {named("sits", <em>Stuck in the stream</em>)},
            arrived on 21 August 2026. His debut album,{" "}
            {named("amtpod", <em>A Moment To Pivot On</em>)} (2024), was rooted
            in guitar and organic sounds; <em>Stuck in the stream</em> was built
            with the production at its core. {named("julie", "Julie Ragbeer")},{" "}
            {named("velaspace", "Velaspace")}, and {named("ima", "Ima")} each
            feature on one of the eleven tracks, which range from synthetic
            dance music to textured, intricate ballads. The singles{" "}
            {named("iys", <em>In your sight</em>)},{" "}
            {named("d2m", <em>Did to me</em>)} (feat. Julie Ragbeer), and{" "}
            {named("ga2i", <em>Get around to it</em>)} came in the months
            leading up to release, and {named("lifetime", <em>Lifetime</em>)},
            the six-and-a-half minute penultimate power ballad was featured on{" "}
            {named("happymag", "Happy Mag's New Music Radar")}.{" "}
            {named("stems", "The stems")} for the entire album are available to
            download for free.
          </p>
        </section>
        <section aria-labelledby="releases">
          <h2 id="releases" className={heading}>
            releases
          </h2>
          <ul className="grid grid-cols-3 gap-3">
            {releases.flatMap((release) =>
              release.artwork && release.url
                ? [
                    <li key={release.slug}>
                      <Tile
                        image={release.artwork}
                        alt={`artwork for ${release.title}`}
                        caption={release.title}
                        href={release.url}
                        card={cards[release.slug]}
                      />
                    </li>,
                  ]
                : [],
            )}
          </ul>
        </section>
      </div>

      <figure className="my-24 text-center">
        <blockquote className="text-2xl lg:text-4xl">“{QUOTE.text}”</blockquote>
        <figcaption className="mt-4">
          <ExternalLink href={QUOTE.href} className={link}>
            {QUOTE.source}
          </ExternalLink>
        </figcaption>
      </figure>

      <div className="grid gap-x-12 gap-y-16 lg:grid-cols-2">
        <ul className="grid grid-cols-2 gap-3">
          {FESTS.map((fest) => (
            <li key={fest.id}>
              <Tile
                image={fest.poster}
                alt={`${fest.name} lineup poster`}
                caption={fest.name}
                href={fest.href}
                ratio="poster"
                card={cards[fest.id]}
              />
            </li>
          ))}
        </ul>
        <section aria-labelledby="live">
          <h2 id="live" className={heading}>
            live
          </h2>
          <p>
            He plays URL fests (online festivals), sometimes doing
            stripped-back, acoustic performances of his music, and sometimes pop
            DJ sets.
          </p>
        </section>
      </div>
      <section aria-labelledby="features" className="mt-16">
        <h2 id="features" className={heading}>
          features
        </h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {FEATURES.map((feature) => (
            <li key={feature.id}>
              <Tile
                image={feature.image}
                alt={`${feature.title} by ${feature.artist}`}
                caption={`${feature.artist}: ${feature.title} (${feature.year})`}
                href={feature.href}
                card={cards[feature.id]}
              />
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="photos" className="mt-16">
        <h2 id="photos" className={heading}>
          photos
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {PHOTOS.map((photo, i) => (
            <li key={photo.file}>
              <Image
                src={media(`presskit/photos/${photo.file}`)}
                alt={`Spencer Raymond, press photo ${i + 1}`}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="h-auto w-full"
              />
              <p className="mt-1 flex flex-wrap items-center gap-x-3 text-sm">
                <span>photo: {photo.credit}</span>
                <a
                  href={media(`presskit/photos/${photo.file}`)}
                  download
                  className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-accent"
                >
                  download
                </a>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-16 grid gap-x-12 gap-y-16 lg:grid-cols-2">
        <Downloads releases={releases} />
        <section aria-labelledby="full-bio">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="full-bio" className={heading}>
              full bio
            </h2>
            <CopyButton text={BIOS.full.join("\n\n")} />
          </div>
          {BIOS.full.map((paragraph) => (
            <p key={paragraph} className="mb-3">
              {paragraph}
            </p>
          ))}
        </section>
      </div>

      <section
        id="contact"
        className="mt-24 flex min-h-[50svh] items-end pb-24"
      >
        <div className={`${panel} max-w-xl`}>
          <h2 className={heading}>contact</h2>
          <p>for bookings, releases or anything else:</p>
          <p className="flex flex-wrap items-center gap-x-2">
            <a href={`mailto:${EMAIL}`} className={link}>
              {EMAIL}
            </a>
            <CopyButton text={EMAIL} />
          </p>
          <p className="mt-3">or message me:</p>
          <ul className="flex flex-wrap gap-x-4">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <ExternalLink
                  href={social.href}
                  className={`${link} inline-flex min-h-11 items-center`}
                >
                  {social.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
          <p className="mt-3 flex gap-4">
            <Link href="/music" className="nav-link cursor-pointer">
              music
            </Link>
            <Link href="/" className="nav-link cursor-pointer">
              home
            </Link>
          </p>
        </div>
      </section>
      <CardHost />
    </>
  );
}
