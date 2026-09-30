import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/music", "/presskit"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
  }));
}
