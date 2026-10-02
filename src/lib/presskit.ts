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
export const LOGO = { file: "sr-textlogo.png" };
export const TRACKS: Track[] = [
  {
    id: "lifetime",
    title: "Lifetime",
    from: "Stuck in the stream",
    src: media("presskit/audio/lifetime.mp3"),
    artwork: "https://linkr.audio/images?image=sr--20260819054852257.jpg",
    hook: 214,
    links: [
      {
        href: "https://open.spotify.com/track/5mSCBfOtOHqC0QJsN2COgy",
        label: "spotify",
      },
      {
        href: "https://music.apple.com/au/album/lifetime/6794241979?i=6794242241",
        label: "apple music",
      },
      {
        href: "https://spencerr69.bandcamp.com/track/lifetime",
        label: "bandcamp",
      },
    ],
  },
  {
    id: "lucid",
    title: "Lucid (feat. Velaspace)",
    from: "Stuck in the stream",
    src: media("presskit/audio/lucid.mp3"),
    artwork: "https://linkr.audio/images?image=sr--20260819054852257.jpg",
    hook: 43,
    links: [
      {
        href: "https://open.spotify.com/track/3GJ7Q5DJ1BUbWBGRJr3HYq",
        label: "spotify",
      },
      {
        href: "https://music.apple.com/au/album/lucid-feat-velaspace/6794241979?i=6794241989",
        label: "apple music",
      },
      {
        href: "https://spencerr69.bandcamp.com/track/lucid-feat-velaspace",
        label: "bandcamp",
      },
    ],
  },
  {
    id: "wing",
    title: "Wing (feat. Ima)",
    from: "Stuck in the stream",
    src: media("presskit/audio/wing.mp3"),
    artwork: "https://linkr.audio/images?image=sr--20260819054852257.jpg",
    hook: 54,
    links: [
      {
        href: "https://open.spotify.com/track/4sn3PCJXq9S2dX5zL1WfWY",
        label: "spotify",
      },
      {
        href: "https://music.apple.com/au/album/wing-feat-ima/6794241979?i=6794242236",
        label: "apple music",
      },
      {
        href: "https://spencerr69.bandcamp.com/track/wing-feat-ima",
        label: "bandcamp",
      },
    ],
  },
  {
    id: "in-your-sight-live",
    title: "In your sight (live)",
    from: "live at Featherfest",
    src: media("presskit/audio/in-your-sight-live.mp3"),
    artwork: "https://i.scdn.co/image/ab67616d0000b2731c196784ffa305e14b9d1594",
    hook: 180,
    links: [
      {
        href: "https://open.spotify.com/track/7kmjilfOQUpd06sLPXnwAY",
        label: "spotify",
      },
      {
        href: "https://music.apple.com/au/album/in-your-sight/6794241979?i=6794241986",
        label: "apple music",
      },
      {
        href: "https://spencerr69.bandcamp.com/track/in-your-sight",
        label: "bandcamp",
      },
    ],
  },
];
export const CARDS: Record<string, Card> = {
  sits: {
    description: "2026 electronic album",
  },
  amtpod: {
    title: "A Moment To Pivot On",
    description: "2024 indie debut album",
  },
  iys: {
    description: "lead single of Stuck in the stream",
  },
  d2m: {
    description:
      "second single of Stuck in the stream featuring the one and only Julie Ragbeer",
  },
  ga2i: {
    description: "third single of Stuck in the stream",
  },
  lifetime: {
    title: "Lifetime",
    description: "official real spencer raymond love song not clickbait",
    href: "https://sr.linkr.audio/sits",
    image: media("presskit/tiles/sits.jpg"),
  },
  velaspace: {
    title: "Velaspace",
    description: "one of my friends and an awesome electronic musician",
    href: "https://soundcloud.com/velaspace",
    image: media("presskit/tiles/velaspace.jpg"),
    quote: JOKE_QUOTES.velaspace,
  },
  ima: {
    title: "Ima",
    description: "one of my friends and an epic electronic musician",
    href: "https://imacreatesart.carrd.co",
    image: media("presskit/tiles/ima.jpg"),
    quote: JOKE_QUOTES.ima,
  },
  julie: {
    title: "Julie Ragbeer",
    description: "an awesome pop musician",
    href: "https://julieragbeer.com",
    image: media("presskit/tiles/julie.jpg"),
  },
  stems: {
    title: "Stuck in the stream Stems",
    description: "all of the stems from Stuck in the stream, available free",
    href: "https://drive.google.com/drive/folders/1NrrCSFSMcHUa3LIU6e4KWzuce0xIBxmH?usp=sharing",
    image: media("presskit/tiles/sits.jpg"),
  },
  featherfest: {
    title: "Featherfest",
    description:
      "a URL festival hosted by my friend Ima !! always a diverse mix of genres on display here",
    href: "https://featherfest.carrd.co",
    image: media("presskit/tiles/featherfest.jpg"),
  },
};
export const FEATURES: Feature[] = [
  {
    id: "wander",
    artist: "m-key, adri",
    title: "wander",
    year: 2025,
    image: media("presskit/tiles/wander.jpg"),
    href: "https://m-key.bandcamp.com/track/wander-with-spencer-raymond-and-adri",
  },
  {
    id: "cry",
    artist: "Ima",
    title: "Cry",
    year: 2024,
    image: media("presskit/tiles/cry.jpg"),
    href: "https://imacreatesart.bandcamp.com/track/cry",
  },
  {
    id: "let-you-go",
    artist: "Blue Laze",
    title: "let you go",
    year: 2026,
    image: media("presskit/tiles/let-you-go.jpg"),
    href: "https://bluelaze.bandcamp.com/track/let-you-go",
  },
  {
    id: "thats-as-far-as-you-can-go",
    artist: "Astro",
    title: "That's As Far As You Can Go",
    year: 2025,
    image: media("presskit/tiles/staring-straight-at-the-sun.jpg"),
    href: "https://astronomy487.com/thats-as-far-as-you-can-go-feat-spencer-raymond/",
  },
  {
    id: "last-dance",
    artist: "Possums at Twilight",
    title: "Last Dance",
    year: 2024,
    image: media("presskit/tiles/last-dance.jpg"),
    href: "https://twilightpossum.bandcamp.com/track/last-dance-feat-spencer-raymond",
  },
];
export const FESTS: Fest[] = [
  {
    id: "featherfest",
    name: "Featherfest",
    poster: media("presskit/tiles/featherfest.jpg"),
    href: "https://featherfest.carrd.co",
  },
  {
    id: "cloudfall",
    name: "Cloudfall",
    poster: media("presskit/tiles/cloudfall.jpg"),
    href: "https://linktr.ee/cloudfallfest",
  },
  {
    id: "lifeline",
    name: "Lifeline",
    poster: media("presskit/tiles/lifeline.jpg"),
    href: "https://linktr.ee/lvmf",
  },
  {
    id: "gayjazz",
    name: "Gay Jazz",
    poster: media("presskit/tiles/gayjazz.jpg"),
    href: "https://soundcloud.com/gay-jazz",
  },
];
export const PHOTOS: Photo[] = [];
