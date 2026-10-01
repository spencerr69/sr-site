import { CopyButton } from "@/components/CopyButton";
import { ExternalLink } from "@/components/ExternalLink";
import { BIOS, EMAIL, QUOTE, SOCIALS } from "@/lib/presskit";
import type { Metadata } from "next";
import Link from "next/link";

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

export default function PressKitPage() {
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
            His second album, <em>Stuck in the stream</em>, arrived on 21 August
            2026. His debut album, <em>A Moment To Pivot On</em> (2024), was
            rooted in guitar and organic sounds; <em>Stuck in the stream</em>{" "}
            was built with the production at its core. Julie Ragbeer, Velaspace,
            and Ima each feature on one of the eleven tracks, which range from
            synthetic dance music to textured, intricate ballads. The singles{" "}
            <em>In your sight</em>, <em>Did to me</em> (feat. Julie Ragbeer),
            and <em>Get around to it</em> came in the months leading up to
            release, and <em>Lifetime</em>, the six-and-a-half minute
            penultimate power ballad was featured on Happy Mag&apos;s New Music
            Radar. The stems for the entire album are available to download for
            free.
          </p>
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
        <section aria-labelledby="full-bio" className="lg:col-start-2">
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
    </>
  );
}
