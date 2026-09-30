import type { Link } from "@/lib/definitions";

// what a visitor can still reach when linkr is down: the press kit plus the artist's socials as of 2026-09-29
export const FALLBACK_LINKS: Link[] = [
  { name: "twitter", url: "https://twitter.com/spencerr69" },
  { name: "instagram", url: "https://instagram.com/spencerr69420" },
  { name: "tiktok", url: "https://tiktok.com/@spencerr69420" },
  { name: "bluesky", url: "https://bsky.app/profile/spencerraymon.de" },
];
