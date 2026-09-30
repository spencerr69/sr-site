"use client";
import { useEffect } from "react";

// replaces the root layout when it renders, so globals.css and the font may be missing: everything is inline
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          padding: "3.75rem",
          boxSizing: "border-box",
          background: "#010106",
          color: "#8d8a88",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        }}
      >
        <h1
          style={{ margin: "0 0 1rem", fontSize: "1.875rem", fontWeight: 700 }}
        >
          spencer raymond
        </h1>
        <p style={{ margin: 0, fontSize: "0.875rem" }}>something broke.</p>
        <button
          type="button"
          onClick={() => {
            retry();
          }}
          style={{
            marginTop: "1.5rem",
            padding: 0,
            border: 0,
            background: "none",
            color: "inherit",
            font: "inherit",
            fontSize: "0.875rem",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          try again
        </button>
      </body>
    </html>
  );
}
