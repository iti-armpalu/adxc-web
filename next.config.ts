import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },

  async redirects() {
    return [
      { source: "/for/brands", destination: "/brands", permanent: true },
      { source: "/for/agencies", destination: "/agencies", permanent: true },
      { source: "/for/data-providers", destination: "/data-providers", permanent: true },
      { source: "/for/ai-platforms", destination: "/ai-platforms", permanent: true },
    ];
  },
};

export default nextConfig;