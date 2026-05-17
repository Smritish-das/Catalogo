import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix for Next.js 16 Turbopack root detection
  // @ts-ignore - Next.js 16 types might not be fully updated
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.freepik.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
