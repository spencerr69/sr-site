"use client";
import { useState } from "react";

type State = "idle" | "copied" | "failed";

export function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<State>("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => {
      setState("idle");
    }, 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="min-h-11 min-w-11 cursor-pointer px-2 underline underline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {state === "copied"
        ? "copied"
        : state === "failed"
          ? "couldn't copy, select the text"
          : "copy"}
    </button>
  );
}
