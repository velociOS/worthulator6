// ─── WorthCore Update Layer (Layer 2) ────────────────────────────────────────
//
// PURPOSE:
//   Fetch live economic data from FRED + Yahoo Finance and safely refresh
//   the centralized WorthCore assumptions in lib/dataStore.ts.
//
// ARCHITECTURE RULES:
//   ✅ Server-side only — never runs in the browser
//   ✅ Isolated — zero contact with calculator engines or render flow
//   ✅ Fallback-safe — validation failures preserve existing dataStore values
//   ✅ Optional — calculators work identically whether this runs or not
//   ❌ Does NOT modify CalculatorEngine, useCalculator, or any component
//   ❌ Does NOT affect SSR paths or hydration
//
// CALLING PATTERN:
//   Vercel Cron:  GET /api/update-data  (with Authorization header)
//   Manual test:  GET /api/update-data?secret=<UPDATE_DATA_SECRET>
//
// ENVIRONMENT VARIABLES (in .env.local):
//   FRED_API_KEY         — stlouisfed.org API key
//   RAPIDAPI_KEY         — RapidAPI key (Yahoo Finance)
//   UPDATE_DATA_SECRET   — optional; protects this endpoint from public calls
//
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/dataStore";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FetchResult {
  value: number | null;
  source: string;
  error?: string;
}

interface FieldReport {
  old: number;
  new: number;
  source: string;
}

interface SkipReport {
  reason: string;
  kept: number;
  source: string;
}

interface UpdateReport {
  timestamp: string;
  fetched: Record<string, FetchResult>;
  updated: Record<string, FieldReport>;
  skipped: Record<string, SkipReport>;
  errors: string[];
}

// ─── Validation ranges ────────────────────────────────────────────────────────
// If a fetched value falls outside these bounds it is discarded and the
// existing dataStore value is preserved unchanged.

const VALID_RANGES: Record<string, [min: number, max: number]> = {
  inflationRate:     [-5,  25],
  mortgageRate:      [0,   20],
  mortgageRate15yr:  [0,   20],
  stockMarketReturn: [0,   30],
};

function validate(
  key: string,
  value: number,
): { ok: true } | { ok: false; reason: string } {
  if (!isFinite(value)) return { ok: false, reason: "Value is not finite" };
  const range = VALID_RANGES[key];
  if (!range) return { ok: false, reason: `No range defined for key "${key}"` };
  if (value < range[0] || value > range[1]) {
    return {
      ok: false,
      reason: `${value} is outside acceptable range [${range[0]}, ${range[1]}]`,
    };
  }
  return { ok: true };
}

// ─── FRED helpers ─────────────────────────────────────────────────────────────
// FRED (Federal Reserve Economic Data) — stlouisfed.org
// Series used:
//   CPIAUCSL    — Consumer Price Index, seasonally adjusted (YoY % = inflation)
//   MORTGAGE30US — 30-year fixed mortgage rate (weekly, %)
//   MORTGAGE15US — 15-year fixed mortgage rate (weekly, %)

const FRED_BASE = "https://api.stlouisfed.org/fred/series/observations";

interface FredObservation {
  date: string;
  value: string; // FRED returns values as strings; "." = missing
}

interface FredResponse {
  observations?: FredObservation[];
}

async function fetchFredObservations(
  seriesId: string,
  apiKey: string,
  limit: number,
): Promise<FredObservation[] | null> {
  const url =
    `${FRED_BASE}?series_id=${encodeURIComponent(seriesId)}` +
    `&api_key=${encodeURIComponent(apiKey)}` +
    `&sort_order=desc&limit=${limit}&file_type=json`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
  });

  if (!res.ok) return null;

  const data: FredResponse = await res.json();
  const obs = data?.observations;
  if (!Array.isArray(obs) || obs.length === 0) return null;

  // Filter out missing-value entries (FRED marks them as ".")
  return obs.filter((o) => o.value !== ".");
}

/** Fetch most-recent observation for a FRED series and return as number. */
async function fetchFredLatest(
  seriesId: string,
  apiKey: string,
): Promise<FetchResult> {
  try {
    const obs = await fetchFredObservations(seriesId, apiKey, 5);
    if (!obs || obs.length === 0) {
      return { value: null, source: `FRED:${seriesId}`, error: "No observations returned" };
    }
    const value = parseFloat(obs[0].value);
    if (!isFinite(value)) {
      return { value: null, source: `FRED:${seriesId}`, error: "Parsed value is not finite" };
    }
    return {
      value: Math.round(value * 100) / 100,
      source: `FRED:${seriesId} (${obs[0].date})`,
    };
  } catch (err) {
    return { value: null, source: `FRED:${seriesId}`, error: String(err) };
  }
}

/**
 * Compute year-over-year CPI inflation rate from FRED CPIAUCSL.
 * Needs at least 13 observations (latest month + same month a year ago).
 */
async function fetchInflationFromFred(apiKey: string): Promise<FetchResult> {
  const seriesId = "CPIAUCSL";
  try {
    const obs = await fetchFredObservations(seriesId, apiKey, 14);
    if (!obs || obs.length < 13) {
      return {
        value: null,
        source: `FRED:${seriesId}`,
        error: `Only ${obs?.length ?? 0} valid observations — need 13 for YoY`,
      };
    }

    const latest   = parseFloat(obs[0].value);
    const yearAgo  = parseFloat(obs[12].value);

    if (!isFinite(latest) || !isFinite(yearAgo) || yearAgo === 0) {
      return { value: null, source: `FRED:${seriesId}`, error: "Invalid CPI values" };
    }

    const inflation = ((latest / yearAgo) - 1) * 100;
    return {
      value: Math.round(inflation * 10) / 10,
      source: `FRED:${seriesId} YoY (${obs[12].date} → ${obs[0].date})`,
    };
  } catch (err) {
    return { value: null, source: `FRED:${seriesId}`, error: String(err) };
  }
}

// ─── Yahoo Finance helper ─────────────────────────────────────────────────────
// Uses RapidAPI Yahoo Finance to fetch SPY monthly history and compute a
// rolling 5-year annualized return as the stockMarketReturn assumption.
//
// API: yahoo-finance15.p.rapidapi.com
// Endpoint: GET /api/v1/markets/stock/history
// Params: symbol=SPY, interval=1mo

interface YahooHistoryEntry {
  date?: string;
  date_utc?: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  adjclose?: number;
  volume?: number;
}

async function fetchStockReturnFromYahoo(rapidApiKey: string): Promise<FetchResult> {
  const source = "Yahoo Finance (RapidAPI):SPY 5yr annualized";

  try {
    const url =
      "https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/history" +
      "?symbol=SPY&interval=1mo&diffandsplits=false";

    const res = await fetch(url, {
      headers: {
        "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        "x-rapidapi-key":  rapidApiKey,
        Accept: "application/json",
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return { value: null, source, error: `HTTP ${res.status}: ${res.statusText}` };
    }

    const data = await res.json();

    // Response shape: { meta: {...}, body: { "<unix_ts>": { close, adjclose, ... } } }
    const body = data?.body;
    if (!body || typeof body !== "object") {
      return { value: null, source, error: "Unexpected response shape — missing 'body'" };
    }

    const fiveYearsAgoTs = Date.now() / 1000 - 5 * 365.25 * 24 * 3600;

    // Collect and sort valid monthly close entries from the last 5 years
    const entries = Object.entries(body as Record<string, YahooHistoryEntry>)
      .map(([ts, bar]) => ({
        ts:    parseInt(ts, 10),
        close: bar?.adjclose ?? bar?.close ?? 0,
      }))
      .filter((e) => isFinite(e.ts) && e.close > 0 && e.ts >= fiveYearsAgoTs)
      .sort((a, b) => a.ts - b.ts);

    if (entries.length < 24) {
      return {
        value: null,
        source,
        error: `Only ${entries.length} usable monthly bars — need ≥24 for a reliable return`,
      };
    }

    const first  = entries[0];
    const last   = entries[entries.length - 1];
    const years  = (last.ts - first.ts) / (365.25 * 24 * 3600);

    if (years < 2 || first.close <= 0) {
      return { value: null, source, error: "Time span too short" };
    }

    const annualizedReturn = (Math.pow(last.close / first.close, 1 / years) - 1) * 100;

    return {
      value: Math.round(annualizedReturn * 10) / 10,
      source: `${source} (${years.toFixed(1)}yr: ${first.close.toFixed(2)} → ${last.close.toFixed(2)})`,
    };
  } catch (err) {
    return { value: null, source, error: String(err) };
  }
}

// ─── Authorization helper ─────────────────────────────────────────────────────
// Protects the endpoint against unauthorized calls.
// Set UPDATE_DATA_SECRET in .env.local to enable.
// Vercel Cron: pass as Authorization: Bearer <secret>
// Manual:      pass as ?secret=<secret>

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.UPDATE_DATA_SECRET;
  if (!secret) return true; // No secret set → allow all (development mode)

  // Check Authorization header (Vercel Cron style)
  const authHeader = req.headers.get("authorization");
  if (authHeader === `Bearer ${secret}`) return true;

  // Check query param (manual testing)
  const querySecret = req.nextUrl.searchParams.get("secret");
  if (querySecret === secret) return true;

  return false;
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // ── Authorization ────────────────────────────────────────────────────────
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fredKey    = process.env.FRED_API_KEY;
  const rapidKey   = process.env.RAPIDAPI_KEY;

  const report: UpdateReport = {
    timestamp: new Date().toISOString(),
    fetched:   {},
    updated:   {},
    skipped:   {},
    errors:    [],
  };

  // ── FRED fetches ─────────────────────────────────────────────────────────
  if (!fredKey) {
    report.errors.push("FRED_API_KEY not set — skipping FRED fetches");
  } else {
    const [inflation, mortgage30, mortgage15] = await Promise.allSettled([
      fetchInflationFromFred(fredKey),
      fetchFredLatest("MORTGAGE30US", fredKey),
      fetchFredLatest("MORTGAGE15US", fredKey),
    ]);

    report.fetched.inflationRate    = inflation.status    === "fulfilled" ? inflation.value    : { value: null, source: "FRED:CPIAUCSL",     error: String(inflation.reason)    };
    report.fetched.mortgageRate     = mortgage30.status   === "fulfilled" ? mortgage30.value   : { value: null, source: "FRED:MORTGAGE30US", error: String(mortgage30.reason)   };
    report.fetched.mortgageRate15yr = mortgage15.status   === "fulfilled" ? mortgage15.value   : { value: null, source: "FRED:MORTGAGE15US", error: String(mortgage15.reason)   };
  }

  // ── Yahoo Finance fetch ───────────────────────────────────────────────────
  if (!rapidKey) {
    report.errors.push("RAPIDAPI_KEY not set — skipping Yahoo Finance fetch");
  } else {
    const stockResult = await fetchStockReturnFromYahoo(rapidKey).catch((err) => ({
      value: null as null,
      source: "Yahoo Finance (RapidAPI):SPY",
      error: String(err),
    }));
    report.fetched.stockMarketReturn = stockResult;
  }

  // ── Validate & apply ──────────────────────────────────────────────────────
  for (const [key, result] of Object.entries(report.fetched)) {
    const typedKey = key as keyof typeof dataStore.finance;

    if (result.value === null) {
      report.skipped[key] = {
        reason: result.error ?? "Fetch returned null",
        kept:   dataStore.finance[typedKey] as number,
        source: result.source,
      };
      continue;
    }

    const check = validate(key, result.value);
    if (!check.ok) {
      report.skipped[key] = {
        reason: check.reason,
        kept:   dataStore.finance[typedKey] as number,
        source: result.source,
      };
      continue;
    }

    // Safe to apply
    const oldValue = dataStore.finance[typedKey] as number;
    (dataStore.finance as unknown as Record<string, number>)[key] = result.value;

    report.updated[key] = {
      old:    oldValue,
      new:    result.value,
      source: result.source,
    };
  }

  // ── Update timestamp if anything changed ──────────────────────────────────
  if (Object.keys(report.updated).length > 0) {
    dataStore.lastUpdated = new Date().toISOString().split("T")[0];
  }

  return NextResponse.json(report, { status: 200 });
}
