import type { Release } from "@/lib/definitions";

export type ReleaseType = "single" | "ep" | "album";
export function releaseType(release: Release): ReleaseType {
  if (release.track_count === 1) return "single";
  return release.track_count < 7 ? "ep" : "album";
}
const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

/**
 * if we use an actual date function next js will get mad cause ssr + client have to be the same
 */
export function formatReleaseDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}
