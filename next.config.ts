import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.worthulator.com" }],
        destination: "https://worthulator.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
