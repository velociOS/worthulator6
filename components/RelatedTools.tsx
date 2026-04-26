import Link from "next/link";
import { liveTools, categories } from "@/src/config/tools";
import type { Tool } from "@/src/config/tools";

// ── Emoji per slug (presentation only — not stored in config) ──────────────
const toolEmojis: Record<string, string> = {
  "salary-breakdown":            "💼",
  "take-home-pay-calculator":    "💵",
  "overtime-pay-calculator":     "⏱️",
  "hourly-to-salary-calculator": "🕐",
  "passive-income":              "📈",
  "compound-interest":           "📊",
  "screen-time-impact":          "📱",
  "subscription-cost":           "💳",
  "coffee-cost-over-lifetime":   "☕",
  "smoking-cost":                "🚬",
  "percentage-calculator":       "🔢",
};

// ── CTA overrides for tools where auto-derivation would read poorly ─────────
const ctaOverrides: Record<string, string> = {
  "hourly-to-salary-calculator": "Convert hourly to annual salary",
  "passive-income":              "Estimate your passive income",
  "compound-interest":           "Calculate compound interest growth",
  "screen-time-impact":          "See the cost of screen time",
  "subscription-cost":           "Calculate subscription spend",
  "smoking-cost":                "Calculate smoking cost over time",
  "percentage-calculator":       "Calculate percentages instantly",
};

function getEmoji(tool: Tool): string {
  return (
    toolEmojis[tool.slug] ??
    categories.find((c) => c.slug === tool.category)?.emoji ??
    "🔧"
  );
}

function buildCta(tool: Tool): string {
  if (ctaOverrides[tool.slug]) return ctaOverrides[tool.slug];

  const base = tool.name
    .replace(/ Calculator$/i, "")
    .replace(/ Estimator$/i, "")
    .replace(/ Planner$/i, "")
    .replace(/ Tracker$/i, "")
    .replace(/ Tool$/i, "")
    .toLowerCase();

  switch (tool.toolType) {
    case "calculator": return `Calculate ${base}`;
    case "estimator":  return `Estimate ${base}`;
    case "planner":    return `Plan your ${base}`;
    case "tracker":    return `Track your ${base}`;
    default:           return `Explore ${base}`;
  }
}

interface Props {
  /** Slug of the page this component is rendered on (excluded from results). */
  currentTool: string;
  heading?: string;
  /** Tailwind bg class for the outer section, e.g. "bg-gray-50". Defaults to "bg-white". */
  bg?: string;
}

/**
 * Renders 2–3 links to tools in the same subcategory (falling back to same
 * category when there aren't enough). Only live tools are included.
 */
export default function RelatedTools({
  currentTool,
  heading = "Related tools",
  bg = "bg-white",
}: Props) {
  const current = liveTools.find((t) => t.slug === currentTool);
  if (!current) return null;

  // Prefer same subcategory, fill up from broader category
  const sameSubcat = liveTools.filter(
    (t) => t.slug !== currentTool && t.subcategory === current.subcategory,
  );
  const sameCategory = liveTools.filter(
    (t) =>
      t.slug !== currentTool &&
      t.category === current.category &&
      t.subcategory !== current.subcategory,
  );

  const related = [...sameSubcat, ...sameCategory].slice(0, 3);
  if (related.length === 0) return null;

  return (
    <section className={`border-t border-gray-100 ${bg} px-5 py-14 sm:px-8 lg:px-16`}>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold tracking-tight text-gray-950">{heading}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-2xl">{getEmoji(tool)}</span>
              <div>
                <h3 className="text-sm font-semibold tracking-tight text-gray-900 group-hover:text-emerald-700">
                  {tool.name}
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">{tool.description}</p>
              </div>
              <span className="mt-auto text-xs font-semibold text-gray-400 transition-colors group-hover:text-emerald-600">
                {buildCta(tool)} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
