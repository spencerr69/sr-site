import { ExternalLink } from "@/components/ExternalLink";
import { CardLink } from "@/components/presskit/PressCard";
import type { CardData } from "@/lib/presskitReleases";
import Image from "next/image";

const tileClass =
  "group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
export function Tile({
  image,
  alt,
  caption,
  href,
  ratio = "square",
  card,
}: {
  image: string;
  alt: string;
  caption: string;
  href: string;
  ratio?: "square" | "poster";
  card?: CardData | undefined;
}) {
  const body = (
    <>
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
    </>
  );
  return card ? (
    <CardLink card={card} className={tileClass}>
      {body}
    </CardLink>
  ) : (
    <ExternalLink href={href} className={tileClass}>
      {body}
    </ExternalLink>
  );
}
