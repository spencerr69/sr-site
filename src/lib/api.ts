import "server-only";
import type { Artist, Release } from "@/lib/definitions";

export const REVALIDATE_SECONDS = 3500;
const BASE_URL = "https://api.linkr.audio";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`linkr ${path} responded: ${res.status}`);
  }
  return await res.json();
}

export async function getArtist(): Promise<Artist> {
  return get<Artist>("/artists/sr");
}

export async function getReleases(): Promise<Release[]> {
  const res = await get<Release[]>("/releases/sr");
  if (res.length < 1) {
    throw new Error("No releases found in linkr for artist sr");
  }
  return res;
}

export async function getRecentRelease(): Promise<Release> {
  const [first] = await getReleases();
  if (!first) throw new Error("No releases found in linkr for artist sr");
  return first;
}
