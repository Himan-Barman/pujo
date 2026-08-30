import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
