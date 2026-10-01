export const MEDIA_BASE_URL = "https://media.spencerraymon.de";
export const media = (path: string) => `${MEDIA_BASE_URL}/${path}`;

export type PressLink = { label: string; href: string };

export type Track = {
  id: string;
  title: string;
  from: string;
  src: string;
  artwork: string;
  hook?: number;
  links: PressLink[];
};

export type Card = {
  title?: string;
  description: string;
  href?: string;
  image?: string;
  quote?: string;
};

export type Feature = {
  id: string;
  artist: string;
  title: string;
  year: number;
  image: string;
  href: string;
};

export type Fest = { id: string; name: string; poster: string; href: string };

export type Photo = {
  file: string;
  credit: string;
  width: number;
  height: number;
};

export const BIOS = {
  oneLiner:
    "Spencer Raymond makes soft-edged electronic and indie rock in Naarm/Melbourne, Australia. His second" +
    " album, Stuck in the stream, is out now.",
  short:
    "Spencer Raymond is a musician, songwriter, and producer from Naarm/Melbourne, Australia. His music ebbs" +
    " and flows between soft-edged electronic and indie rock. His second album, Stuck in the stream (2026), features Julie Ragbeer, Velaspace, and Ima, and landed on Happy Mag's New Music Radar.",
  full: [
    "Spencer Raymond is a musician, songwriter, and producer from Naarm/Melbourne, Australia. His music ebbs and" +
      " flows between soft-edged electronic and indie rock.",
    "His second album, Stuck in the stream, arrived on 21 August 2026. His debut album, A Moment To Pivot On" +
      " (2024), was rooted in guitar and organic sounds; Stuck in the stream was built with the production at its" +
      " core. Julie Ragbeer, Velaspace, and Ima each feature on one of the eleven tracks, which range from synthetic dance music to textured, intricate ballads. The singles In your sight, Did to me (feat. Julie Ragbeer), and Get around to it came in the months leading up to release, and Lifetime, the six-and-a-half minute penultimate power ballad was featured on Happy Mag's New Music Radar: \"a dreamy dive into calming waters of indie pop, electronic and folk … it's worth the journey.\" The stems for the entire album are available to download for free.",
    "He plays URL fests (online festivals), sometimes doing stripped-back, acoustic performances of his music, and sometimes pop DJ sets. He's appeared at Featherfest, Cloudfall, Lifeline, and Gay Jazz, among others. Earlier releases include A Moment To Pivot On (2024), and features for m-key's wander (2025), Ima's Cry (2024), Blue Laze's let you go (2026), Astro's Staring Straight at the Sun (2025), and Possums at Twilight's Last Dance (2024).",
  ],
};
export const QUOTE = {
  text: "a dreamy dive into calming waters of indie pop, electronic and folk … it's worth the journey.",
  source: "happy mag, new music radar",
  href: "https://happymag.tv/new-music-radar-the-dead-regulars/",
};
export const EMAIL = "contact@spencerraymon.de";
export const SOCIALS: PressLink[] = [
  { label: "instagram", href: "https://instagram.com/spencerr69420" },
  { label: "bluesky", href: "https://bsky.app/profile/spencerraymon.de" },
  { label: "twitter", href: "https://twitter.com/spencerr69" },
];
export const STEMS_URL =
  "https://drive.google.com/drive/folders/1NrrCSFSMcHUa3LIU6e4KWzuce0xIBxmH";
export const JOKE_QUOTES = {
  velaspace: "'Spencer Raymond is going to ruin me' — Velaspace, 2024",
  ima: "'Spencer Raymond you're a gay boy' — Ima, 2025",
};
export const RELEASE_SLUGS = [
  "sits",
  "ga2i",
  "d2m",
  "iys",
  "amtlo",
  "rfv",
  "amtpod",
];
export const LOGO = { file: "logo.svg" };
export const TRACKS: Track[] = [];
export const CARDS: Record<string, Card> = {};
export const FEATURES: Feature[] = [];
export const FESTS: Fest[] = [];
export const PHOTOS: Photo[] = [];
