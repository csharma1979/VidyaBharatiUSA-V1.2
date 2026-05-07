import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Auto-convert to WebP/AVIF for modern browsers
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Viewport breakpoints for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  // Enable compression
  compress: true,
};

export default nextConfig;
