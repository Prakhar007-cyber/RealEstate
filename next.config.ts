import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All project imagery is served from Unsplash's image CDN.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
