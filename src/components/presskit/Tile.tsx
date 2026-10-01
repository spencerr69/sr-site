import { ExternalLink } from "@/components/ExternalLink";
import Image from "next/image";

export function Tile({
  image,
  alt,
  caption,
  href,
  ratio = "square",
}: {
  image: string;
  alt: string;
  caption: string;
  href: string;
  ratio?: "square" | "poster";
}) {
  return (
    <ExternalLink
      href={href}
      className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Image
        src={image}
        alt={alt}
        width={320}
        height={ratio === "poster" ? 427 : 320}
        sizes="(min-width: 1024px) 15vw, 40vw"
        className={`w-full border-2 border-dotted border-foreground/40 object-cover group-hover:border-accent ${
          ratio === "poster" ? "aspect-3/4" : "aspect-square"
        }`}
      />
      <span className="mt-1 block text-sm group-hover:text-accent">
        {caption}
      </span>
    </ExternalLink>
  );
}
