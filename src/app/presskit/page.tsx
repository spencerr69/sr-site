import { getRecentRelease } from "@/actions/discog";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const PressKit: React.FC = async () => {
  const recentRelease = await getRecentRelease();

  return (
    <div className={"presskit-container bg-gray-950 h-screen w-screen p-15"}>
      <h1 className={"text-white font-mono font-bold text-3xl "}>
        spencer raymond
      </h1>
      <Link
        href={"../"}
        className={"cursor-pointer social-link mb-24 text-white font-mono"}
      >
        back
      </Link>
      <div
        className={"text-white font-mono text-sm font-light break-after mt-4"}
      >
        {" "}
        <blockquote>
          &#39;Spencer Raymond is going to ruin me&#39; -Velaspace, 2024
        </blockquote>
        <p>
          Based in Naarm (Melbourne), Spencer Raymond is an indie-electronic
          artist who prides himself on his intricate, cutting songwriting, as
          well as his textured, dreamy production. His debut album, A Moment To
          Pivot On, featured years of life lessons and heartaches condensed into
          a raw, yet homely mix of all things folk, rock, and electronic. <br />
          He is in the process of writing his second album, _____ __ ___ ______,
          which will lean heavily into electronic pop, while still featuring his
          textured production and songwriting.
        </p>
        <blockquote>
          &#39;Spencer Raymond you&#39;re a gay boy&#39; - Ima, 2025{" "}
        </blockquote>
      </div>
      <Image
        src={recentRelease.artwork || "https://linkr.audio/images?image=test"}
        className={"mt-4"}
        alt={"Spencer Raymond"}
        width={750}
        height={750}
      />
    </div>
  );
};

export default PressKit;
