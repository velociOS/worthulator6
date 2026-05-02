"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { liveTools, categories } from "@/src/config/tools";

const TOOL_TYPE_LABELS: Record<string, string> = {
  calculator: "Calculator",
  estimator:  "Estimator",
  planner:    "Planner",
  tool:       "Tool",
  tracker:    "Tracker",
  guide:      "Guide",
};

function ToolCard({ tool }: { tool: (typeof liveTools)[number] }) {
  return (
    <Link
      href={tool.href ?? `/tools/${tool.slug}`}
      className="group flex items-start justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md"
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-800 group-hover:text-emerald-700">
          {tool.name}
        </p>
        {tool.description && (
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-gray-400">
            {tool.description}
          </p>
        )}
      </div>
      <span className="mt-0.5 shrink-0 rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
        {TOOL_TYPE_LABELS[tool.toolType] ?? tool.toolType}
      </span>
    </Link>
  );
}

export default function ToolsClient() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return liveTools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.keywords?.some((k) => k.toLowerCase().includes(q)),
    );
  }, [query]);

  const byCategory = useMemo(
    () =>
      categories
        .map((cat) => ({
          ...cat,
          tools: liveTools.filter((t) => t.category === cat.slug),
        }))
        .filter((cat) => cat.tools.length > 0),
    [],
  );

  const popularTools = useMemo(() => liveTools.filter((t) => t.popular), []);

  return (
    <main className="bg-white text-gray-900">

      {/* ── HERO + SEARCH ────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gray-50 px-5 py-14 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gray-400">
            Worthulator
          </p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.04em] text-gray-950">
            All Free Calculators
            <span className="mt-1 block font-semibold text-gray-400">& Tools</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-500">
            Instant results across salary, costs, investments, lifestyle, and more.
          </p>

          {/* Search */}
          <div className="relative mt-7 max-w-lg">
            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search calculators…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-800 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 placeholder:text-gray-400"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── SEARCH RESULTS ───────────────────────────────────────── */}
      {filtered !== null && (
        <section className="border-b border-gray-100 px-5 py-12 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-sm text-gray-500">
              {filtered.length === 0
                ? `No results for "${query}"`
                : `${filtered.length} result${filtered.length === 1 ? "" : "s"} for "${query}"`}
            </p>
            {filtered.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── POPULAR TOOLS (hidden while searching) ───────────────── */}
      {filtered === null && popularTools.length > 0 && (
        <section className="border-b border-gray-100 px-5 py-12 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              Most Popular
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-gray-950">
              Popular Tools
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {popularTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BY CATEGORY (hidden while searching) ─────────────────── */}
      {filtered === null && (
        <section className="px-5 py-14 sm:px-8 lg:px-16">
          <div className="mx-auto max-w-5xl space-y-14">
            {byCategory.map((cat) => (
              <div key={cat.slug}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.emoji}</span>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight text-gray-950">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-gray-400">{cat.tagline}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}
