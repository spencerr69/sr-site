"use server";

import { Artist } from "@/lib/definitions";
import { cache } from "react";

export const getArtist = cache(async (): Promise<Artist> => {
  const res = await fetch("https://api.linkr.audio/artists/sr", {});

  if (!res.ok) {
    throw new Error("Error fetching artist");
  }

  return await res.json();
});
