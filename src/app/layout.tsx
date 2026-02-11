import { getRecentRelease } from "@/actions/discog";
import cloudflareLoader from "@/lib/imageLoader";
import type { Metadata } from "next";
import { Chivo_Mono } from "next/font/google";
import "./globals.css";

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const title = "Spencer Raymond";
  const description =
    "The official website of Spencer Raymond, from Naarm, Australia.";

  const release = await getRecentRelease();

  const socialImage = `https://spencerraymon.de/${cloudflareLoader({
    src: release.artwork || "",
    width: 500,
    quality: 80,
  })}`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: "https://spencerraymon.de/",
    },
    openGraph: {
      title: title,
      description: description,
      images: {
        url: socialImage,
        alt: "Spencer Raymond",
        width: 500,
        height: 500,
      },
      siteName: "spencer raymond",
      url: "https://spencerraymon.de/",
      locale: "en-US",
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
      title: title,
      description: description,
      images: [{ url: socialImage }],
    },

    icons: {
      icon: "/icon.png",
    },
  };
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${chivoMono.variable}  antialiased`}>{children}</body>
    </html>
  );
}
