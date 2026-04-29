import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old salary breakdown slug (no "-calculator" suffix)
      {
        source: "/tools/salary-breakdown",
        destination: "/tools/salary-breakdown-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
