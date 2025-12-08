import type { Metadata } from "next";
import { Chivo_Mono } from "next/font/google";
import "./globals.css";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import { SETTINGS_QUERYResult } from "@/sanity/sanity.types";

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
});

const getGlobalSettings = async (): Promise<SETTINGS_QUERYResult> => {
  return await client.fetch(SETTINGS_QUERY);
};

export const generateMetadata = async (): Promise<Metadata> => {
  const settings = await getGlobalSettings();

  if (!settings) {
    return {};
  }

  return {
    title: settings.title,
    description: settings.description,
    openGraph: {
      title: settings.title,
      description: settings.description,
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
