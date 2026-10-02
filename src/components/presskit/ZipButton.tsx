"use client";
import { downloadZip } from "client-zip";
import { useState } from "react";

type Status = "idle" | "working" | "failed";

export function ZipButton({
  files,
  text,
}: {
  files: { name: string; url: string }[];
  text: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  const build = async () => {
    setStatus("working");
    try {
      const entries = await Promise.all(
        files.map(async ({ name, url }) => {
          const res = await fetch(url);
          if (!res.ok) throw new Error(`${res.status} ${url}`);
          return { name, input: res };
        }),
      );
      const blob = await downloadZip([
        ...entries,
        { name: "bio-and-credits.txt", input: text },
      ]).blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "spencer-raymond-press-kit.zip";
      a.click();
      URL.revokeObjectURL(a.href);
      setStatus("idle");
    } catch {
      setStatus("failed");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={build}
        disabled={status === "working"}
        className="inline-flex min-h-11 cursor-pointer items-center underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:no-underline"
      >
        {status === "working" ? "zipping…" : "download everything (.zip)"}
      </button>
      {status === "failed" && (
        <p role="alert" className="text-sm">
          couldn&apos;t build the zip, use the single downloads
        </p>
      )}
    </div>
  );
}
