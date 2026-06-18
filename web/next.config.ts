import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/news",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/news",
        permanent: false,
        basePath: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
