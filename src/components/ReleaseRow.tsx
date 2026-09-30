import { ExitLink } from "@/components/ExitLink";
import type { Release } from "@/lib/definitions";
import { formatReleaseDate, releaseType } from "@/lib/releases";
import Image from "next/image";

export function ReleaseRow({ release }: { release: Release }) {
  const body = (
    <div
      className={
        "release bg-background p-2 border-dotted border-2 flex h-full justify-between"
      }
    >
      <div>
        <h2 className={"font-bold lg:text-xl"}>{release.title}</h2>
        <p className={" text-sm "}>{formatReleaseDate(release.release_date)}</p>
        <p className={"text-sm"}>{releaseType(release)}</p>
      </div>

      <div className={"h-full flex flex-col justify-end items-end"}>
        <div className={"lg:hidden"}>
          <Image
            src={release.artwork ?? ""}
            height={96}
            width={96}
            alt={`artwork for ${release.title}`}
          />
        </div>
        <p className={"align-bottom text-right"}>{release.upc}</p>
      </div>
    </div>
  );

  return release.self_url ? (
    <ExitLink href={release.self_url} className={" cursor-pointer nav-link"}>
      {body}
    </ExitLink>
  ) : (
    <span className={" cursor-pointer nav-link"}>{body}</span>
  );
}
