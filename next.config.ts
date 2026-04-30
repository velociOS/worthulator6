import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Old slug aliases (301) ────────────────────────────────────────────
      // Salary breakdown — old slug without "-calculator" suffix
      {
        source: "/tools/salary-breakdown",
        destination: "/tools/salary-breakdown-calculator",
        statusCode: 301,
      },

      // ── Construction tools accessed via /tools/:slug (301) ────────────────
      // These live under /construction-calculators/, not /tools/
      {
        source: "/tools/concrete-calculator",
        destination: "/construction-calculators/concrete-calculator",
        statusCode: 301,
      },
      {
        source: "/tools/concrete-bag-calculator",
        destination: "/construction-calculators/concrete/concrete-bag-calculator",
        statusCode: 301,
      },
      {
        source: "/tools/concrete-block-calculator",
        destination: "/construction-calculators/concrete/concrete-block-calculator",
        statusCode: 301,
      },

      // ── Old /construction-calculators/ URLs moved to /tools/ (301) ────────
      {
        source: "/construction-calculators/concrete-slab-calculator",
        destination: "/tools/concrete-slab-calculator",
        statusCode: 301,
      },
      {
        source: "/construction-calculators/concrete-slab-calculator-uk",
        destination: "/tools/concrete-slab-calculator-uk",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;



