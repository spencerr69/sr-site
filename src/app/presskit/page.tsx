import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import { SETTINGS_QUERYResult } from "@/sanity/sanity.types";
import React from "react";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

const PressKit: React.FC = async () => {
  const settings: SETTINGS_QUERYResult = await client.fetch(SETTINGS_QUERY);

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
      <div className={"text-white font-mono text-sm font-light break-after"}>
        {settings && settings.bio && <PortableText value={settings.bio} />}
      </div>
    </div>
  );
};

export default PressKit;
