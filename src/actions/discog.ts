"use server";

import { Release } from "@/lib/definitions";

export const getDiscog = async (): Promise<Release[]> => {
  "use server";
  const req = await fetch("https://api.linkr.audio/releases/sr", {
    next: { revalidate: 6000 },
  });

  if (!req.ok) {
    throw new Error("Failed to fetch releases");
  }

  return await req.json();
};
