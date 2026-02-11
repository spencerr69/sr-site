"use server";

import { Release } from "@/lib/definitions";
import { cache } from "react";

export const getDiscog = cache(async (): Promise<Release[]> => {
  "use server";
  const req = await fetch("https://api.linkr.audio/releases/sr", {
    next: { revalidate: 6000 },
  });

  if (!req.ok) {
    throw new Error("Failed to fetch releases");
  }

  return await req.json();
});

export const getRecentRelease = cache(async (): Promise<Release> => {
  "use server";
  const req = await fetch("https://api.linkr.audio/releases/sr?limit=1", {
    next: { revalidate: 1000 },
  });

  if (!req.ok) {
    throw new Error("Failed to fetch release");
  }

  const json = await req.json();

  return json[0];
});
