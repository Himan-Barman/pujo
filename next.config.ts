import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [50, 60, 70, 75, 80, 85, 90, 95, 100],
    minimumCacheTTL: 31536000,
  },
  async redirects() {
    return [
      {
        source: '/mantras',
        destination: '/anjali',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
