import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Cloudflare R2 public bucket URLs (*.r2.dev)
      // Enable when NEXT_PUBLIC_MEDIA_BASE_URL points to R2
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
      // Add your custom R2 domain here if you use one:
      // { protocol: "https", hostname: "media.your-domain.com" },
    ],
  },
};

export default nextConfig;
