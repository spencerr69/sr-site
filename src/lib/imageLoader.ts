import { SITE_URL } from "@/lib/site";
import type { ImageLoaderProps } from "next/image";

const normalizeSrc = (src: string) => {
  return src.startsWith("/") ? src.slice(1) : src;
};

export default function cloudflareLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const params = [`width=${width}`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  if (process.env.NODE_ENV === "development") {
    return `${SITE_URL}/cdn-cgi/image/${params.join(",")}/${normalizeSrc(src)}`;
  }
  return `/cdn-cgi/image/${params.join(",")}/${normalizeSrc(src)}`;
}
