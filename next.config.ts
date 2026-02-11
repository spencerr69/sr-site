import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
    ],
  },
};

export default nextConfig;
