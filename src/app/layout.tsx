import { getRecentRelease } from "@/lib/api";
import cloudflareLoader from "@/lib/imageLoader";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { Chivo_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const description =
    "The official website of Spencer Raymond, from Naarm, Australia.";

  const release = await getRecentRelease();

  // relative in prod (/cdn-cgi/image/...), so metadataBase turns it into an absolute url
  const socialImage = release.artwork
    ? cloudflareLoader({ src: release.artwork, width: 500, quality: 80 })
    : null;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: "Spencer Raymond", template: "%s | Spencer Raymond" },
    description,
    openGraph: {
      description,
      ...(socialImage && {
        images: {
          url: socialImage,
          alt: "Spencer Raymond",
          width: 500,
          height: 500,
        },
      }),
      siteName: "spencer raymond",
      locale: "en_AU",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      description,
      ...(socialImage && { images: [{ url: socialImage }] }),
    },
    icons: {
      icon: "/icon.png",
    },
  };
};

// eslint-disable-next-line @typescript-eslint/require-await
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${chivoMono.variable}  antialiased font-mono`}>
        {children}
      </body>
    </html>
  );
}
