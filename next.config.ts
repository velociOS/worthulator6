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

      // ── Concrete slab URLs → correct nested path (301) ───────────────────
      {
        source: "/construction-calculators/concrete-slab-calculator",
        destination: "/tools/cost-calculators/home-improvement/concrete-slab-calculator",
        permanent: true,
      },
      {
        source: "/construction-calculators/concrete-slab-calculator-uk",
        destination: "/tools/cost-calculators/home-improvement/concrete-slab-calculator-uk",
        permanent: true,
      },
      {
        source: "/tools/concrete-slab-calculator",
        destination: "/tools/cost-calculators/home-improvement/concrete-slab-calculator",
        permanent: true,
      },
      {
        source: "/tools/concrete-slab-calculator-uk",
        destination: "/tools/cost-calculators/home-improvement/concrete-slab-calculator-uk",
        permanent: true,
      },
      {
        source: "/construction-calculators/concrete",
        destination: "/tools/cost-calculators/home-improvement/concrete-slab-calculator",
        permanent: true,
      },
      {
        source: "/tools/cost",
        destination: "/tools/cost-calculators",
        permanent: true,
      },
      // ── Dental implant moved to cost-calculators hierarchy (301) ──────────
      {
        source: "/tools/dental-implant-cost-calculator",
        destination: "/tools/cost-calculators/health/dental-implant-cost-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;



