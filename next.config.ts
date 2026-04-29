import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Old slug aliases (301) ────────────────────────────────────────────
      // Salary breakdown — old slug without "-calculator" suffix
      {
        source: "/tools/salary-breakdown",
        destination: "/tools/salary-breakdown-calculator",
        permanent: true,
      },

      // ── Construction tools accessed via /tools/:slug (301) ────────────────
      // These live under /construction-calculators/, not /tools/
      {
        source: "/tools/concrete-calculator",
        destination: "/construction-calculators/concrete-calculator",
        permanent: true,
      },
      {
        source: "/tools/concrete-bag-calculator",
        destination: "/construction-calculators/concrete/concrete-bag-calculator",
        permanent: true,
      },
      {
        source: "/tools/concrete-block-calculator",
        destination: "/construction-calculators/concrete/concrete-block-calculator",
        permanent: true,
      },

      // ── Old /construction-calculators/ URLs moved to /tools/ (301) ────────
      {
        source: "/construction-calculators/concrete-slab-calculator",
        destination: "/tools/concrete-slab-calculator",
        permanent: true,
      },
      {
        source: "/construction-calculators/concrete-slab-calculator-uk",
        destination: "/tools/concrete-slab-calculator-uk",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;


