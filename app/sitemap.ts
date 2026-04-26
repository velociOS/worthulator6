import type { MetadataRoute } from "next";
import { tools, categories } from "@/src/config/tools";
import { stateTaxRates, type StateCode } from "@/src/lib/stateTax";

const BASE_URL = "https://worthulator.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const statics: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/tools?category=${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Only live tool pages
  const toolPages: MetadataRoute.Sitemap = tools
    .filter((t) => t.status === "live")
    .map((t) => ({
      url: `${BASE_URL}/tools/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // State-specific take-home pay calculator pages
  const statePages: MetadataRoute.Sitemap = (Object.keys(stateTaxRates) as StateCode[]).map((code) => ({
    url: `${BASE_URL}/tools/take-home-pay-calculator/${code.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...statics, ...categoryPages, ...toolPages, ...statePages];
}
