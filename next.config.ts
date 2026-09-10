import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Vercel serves /public with max-age=0, must-revalidate, which makes some
        // link scrapers treat the card as non-cacheable. Give it a real lifetime.
        source: "/:file(og-image\.(?:png|jpg))",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '150mb',
    },
  },
};

export default nextConfig;
