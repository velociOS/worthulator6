#!/usr/bin/env tsx
// ─── Cost Benchmark Refresh Script ───────────────────────────────────────────
//
// PURPOSE:
//   Scrapes real-world consumer prices from Expatistan via Apify and updates
//   lib/datasets/costs/costBenchmarks.ts in-place.
//
// USAGE:
//   npx tsx scripts/updateCostBenchmarks.ts
//
// ENVIRONMENT:
//   APIFY_TOKEN=<token>      # Required — Expatistan scrape via Apify
//
// STACK:
//   Apify (cheerio-scraper) → Expatistan → transform → normalize → local dataset
//
//   Macroeconomic assumptions (inflation, rates) → FRED (separate script)
//   Investment assumptions                        → Yahoo Finance (separate script)
//
// WHAT THIS UPDATES:
//   coffeePerCupUs, cigarettesPerPackUs, utilitiesMonthlyUs, restaurantMealUs,
//   gymMonthlyUs, rentNormalMonthlyUs, rentExpensiveMonthlyUs, businessLunchUs,
//   publicTransitMonthlyUs, fuelPerGallonUs (liters→gallons conversion applied),
//   coffeeAnnualIfDaily, cigarettesAnnualIfDaily (derived — recalculated)
//
// CITIES SCRAPED:
//   Nashville, Atlanta, Dallas, Denver, Chicago, Seattle, Boston, Los Angeles
//   (8 cities — no NYC/SF outliers — averaged to a realistic national benchmark)
//
// SAFETY:
//   - Does nothing if APIFY_TOKEN is absent — exits with clear message
//   - Never writes non-finite numbers
//   - Derived fields recalculated from updated base values
//   - All writes are idempotent — safe to run repeatedly

import * as fs from "fs";
import * as path from "path";
import {
  type RawExpatistanCityPage,
  transformExpatistanToBenchmarks,
  summarizeTransformation,
} from "../lib/datasets/costs/costTransformers";

// ─── Config ──────────────────────────────────────────────────────────────────

const BENCHMARKS_FILE = path.resolve(
  __dirname,
  "../lib/datasets/costs/costBenchmarks.ts",
);

const APIFY_TOKEN = process.env.APIFY_TOKEN ?? undefined;

/**
 * Representative US cities for Expatistan averaging.
 * Deliberately excludes NYC and San Francisco (extreme-cost outliers).
 * 2 low-cost, 2 medium, 2 medium-high, 2 high — weighted distribution.
 */
const EXPATISTAN_CITIES: { display: string; slug: string }[] = [
  { display: "Nashville",   slug: "nashville"   },
  { display: "Atlanta",     slug: "atlanta"     },
  { display: "Dallas",      slug: "dallas"      },
  { display: "Denver",      slug: "denver"      },
  { display: "Chicago",     slug: "chicago"     },
  { display: "Seattle",     slug: "seattle"     },
  { display: "Boston",      slug: "boston"      },
  { display: "Los Angeles", slug: "los-angeles" },
];

// ─── Apify Cheerio Scraper Page Function ─────────────────────────────────────
//
// This JS string runs inside Apify's cloud Cheerio environment. It extracts
// all price items from Expatistan's server-rendered HTML table.
//
// HTML structure:
//   <table class="item_list">
//     <tr class="category"><th>Food</th></tr>
//     <tr class="odd" id="item_...">
//       <td class="item_name">Cappuccino in expat area...</td>
//       <td class="price">$6</td>
//     </tr>

const EXPATISTAN_PAGE_FUNCTION = `
async function pageFunction(context) {
  const { $, request, log } = context;
  const slug = request.url.replace(/.*\\/cost-of-living\\//, '').replace(/[?#].*/, '');
  const items = [];
  let currentCategory = '';

  $('tr').each(function(_, row) {
    const $row = $(row);

    if ($row.hasClass('category') || $row.find('th').length > 0) {
      const heading = $row.find('th').first().text().trim();
      if (heading) currentCategory = heading.toLowerCase();
      return;
    }

    const nameCell  = $row.find('td.item_name').first();
    const priceCell = $row.find('td.price').last();
    if (!nameCell.length || !priceCell.length) return;

    const itemName = nameCell.text().trim().toLowerCase();
    if (!itemName) return;

    const rawPrice = priceCell.text().trim().replace(/[$,\\s]/g, '').replace(/[^0-9.]/g, '');
    const priceUsd = parseFloat(rawPrice);
    if (!isFinite(priceUsd) || priceUsd <= 0) return;

    items.push({ itemName, priceUsd, category: currentCategory });
  });

  log.info(slug + ': extracted ' + items.length + ' items');
  return { slug, items };
}
`;

// ─── Types ───────────────────────────────────────────────────────────────────

interface ApifyDatasetItem {
  slug:  string;
  items: { itemName: string; priceUsd: number }[];
}

// ─── Apify Fetcher ────────────────────────────────────────────────────────────

async function fetchExpatistanViaApify(
  token: string,
): Promise<RawExpatistanCityPage[]> {
  const startUrls = EXPATISTAN_CITIES.map((c) => ({
    url: `https://www.expatistan.com/cost-of-living/${c.slug}`,
  }));

  const input = {
    startUrls,
    pageFunction: EXPATISTAN_PAGE_FUNCTION,
    pseudoUrls:   [],
  };

  console.log(
    `  Starting Apify cheerio-scraper for ${startUrls.length} cities...`,
  );
  console.log(`  Cities: ${EXPATISTAN_CITIES.map((c) => c.display).join(", ")}`);

  // run-sync-get-dataset-items: starts run, waits for completion, returns items directly
  const res = await fetch(
    `https://api.apify.com/v2/acts/apify~cheerio-scraper/run-sync-get-dataset-items?token=${token}&memory=512&timeout=180`,
    {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(input),
    },
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Apify HTTP ${res.status}: ${body.slice(0, 200)}`);
  }

  const items = (await res.json()) as ApifyDatasetItem[];
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Apify returned empty dataset");
  }

  console.log(`  ✓ Apify returned ${items.length} city pages`);

  const pages: RawExpatistanCityPage[] = items
    .filter(
      (item): item is ApifyDatasetItem =>
        typeof item.slug === "string" &&
        Array.isArray(item.items) &&
        item.items.length > 0,
    )
    .map((item) => ({
      slug:  item.slug,
      items: item.items.filter(
        (i) =>
          typeof i.itemName === "string" &&
          Number.isFinite(i.priceUsd) &&
          i.priceUsd > 0,
      ),
    }));

  console.log(`  ✓ Valid pages with items: ${pages.length} / ${items.length}`);
  return pages;
}

// ─── File Patcher ─────────────────────────────────────────────────────────────

function patchField(
  src:     string,
  field:   string,
  newVal:  string,
  comment: string,
): string {
  // Try with inline comment first
  const withComment = new RegExp(`([ \\t]+${field}:\\s*)[\\d.]+,([ \\t]*\\/\\/[^\\n]*)`, "g");
  if (withComment.test(src)) {
    return src.replace(
      new RegExp(`([ \\t]+${field}:\\s*)[\\d.]+,([ \\t]*\\/\\/[^\\n]*)`, "g"),
      `$1${newVal},   // ${comment}`,
    );
  }
  // Without inline comment
  return src.replace(
    new RegExp(`([ \\t]+${field}:\\s*)[\\d.]+,`, "g"),
    `$1${newVal},   // ${comment}`,
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("WorthCore Cost Benchmark Refresh");
  console.log("─────────────────────────────────");

  if (!APIFY_TOKEN) {
    console.error("Error: APIFY_TOKEN is not set.");
    console.error("  Set it in .env.local: APIFY_TOKEN=your_token");
    console.error("  Obtain a token at: https://console.apify.com/account/integrations");
    process.exit(1);
  }

  const updates: Record<string, { value: number; comment: string }> = {};
  const label = new Date().toLocaleString("en-US", { month: "long", year: "numeric" });
  const iso   = new Date().toISOString();

  // ── Apify + Expatistan ────────────────────────────────────────────────────
  console.log("\nApify + Expatistan scrape...");
  try {
    const pages      = await fetchExpatistanViaApify(APIFY_TOKEN);
    const benchmarks = transformExpatistanToBenchmarks(pages, 3);

    console.log("\n" + summarizeTransformation(pages, benchmarks));

    for (const [key, value] of Object.entries(benchmarks) as [string, number][]) {
      if (Number.isFinite(value) && value > 0) {
        updates[key] = { value, comment: `Expatistan 8-city US avg — ${label}` };
      }
    }
  } catch (err) {
    console.error(`\nApify scrape failed: ${(err as Error).message}`);
    console.error("costBenchmarks.ts was NOT modified.");
    process.exit(1);
  }

  // ── Apply ──────────────────────────────────────────────────────────────────

  if (Object.keys(updates).length === 0) {
    console.log("\n⚠️  No benchmarks extracted. costBenchmarks.ts was NOT modified.");
    process.exit(1);
  }

  let source = fs.readFileSync(BENCHMARKS_FILE, "utf-8");
  console.log("\nPatching costBenchmarks.ts...");

  for (const [field, { value, comment }] of Object.entries(updates)) {
    source = patchField(source, field, String(value), comment);
    console.log(`  ✓ ${field} = ${value}`);
  }

  // Recalculate volatile derived fields from updated base values
  const coffeeVal = source.match(/coffeePerCupUs:\s*([\d.]+)/)?.[1];
  const cigsVal   = source.match(/cigarettesPerPackUs:\s*([\d.]+)/)?.[1];
  if (coffeeVal) {
    const v = parseFloat(coffeeVal);
    source = patchField(source, "coffeeAnnualIfDaily", String(Math.round(v * 365)), `derived: ${v} × 365`);
  }
  if (cigsVal) {
    const v = parseFloat(cigsVal);
    source = patchField(source, "cigarettesAnnualIfDaily", String(Math.round(v * 365)), `derived: ${v} × 365`);
  }
  const inexpensiveVal = source.match(/inexpensiveRestaurantMealUs:\s*([\d.]+)/)?.[1];
  if (inexpensiveVal) {
    const v = parseFloat(inexpensiveVal);
    const delivery = Math.round(v * 1.38 * 100) / 100;
    source = patchField(source, "deliveryAppMealUs", String(delivery), `derived: inexpensive restaurant × 1.38 delivery markup`);
  }

  // Metadata
  source = source.replace(/lastUpdated:\s*"[^"]*"/, `lastUpdated:        "${iso}"`);
  source = source.replace(/currentPeriodLabel:\s*"[^"]*"/, `currentPeriodLabel: "${label}"`);
  source = source.replace(
    /\/\/ LAST UPDATED:\n\/\/\s+[^\n]+/,
    `// LAST UPDATED:\n//   ${iso.slice(0, 10)} — Apify/Expatistan`,
  );

  fs.writeFileSync(BENCHMARKS_FILE, source, "utf-8");

  console.log(`\n✅ costBenchmarks.ts updated — ${Object.keys(updates).length} fields refreshed.`);
  console.log(`   Path:   ${BENCHMARKS_FILE}`);
  console.log(`   Period: ${label}`);
}

main().catch((err) => {
  console.error("Unhandled error:", err);
  process.exit(1);
});
