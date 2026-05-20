# WORTHULATOR — DATA STRUCTURE & CUSTOM CALCULATOR BLUEPRINT

---

## PART 1 — CURRENT ARCHITECTURE ANALYSIS

### 1. Logic Engine — Centralised or Duplicated?

Partially centralised, partially distributed — two coexisting tracks.

**Track 1 — Config Engine (centralised):**
All simple calculators live in a single file: `components/calculator-engine/calculatorConfigs.ts`. A config object contains the `calculate()` function inline or delegates to a pure function from `calculations/`. The engine itself is split across:

- `components/calculator-engine/useCalculator.ts` — state + `useMemo` reactive calculation
- `components/calculator-engine/CalculatorEngine.tsx` — render layer
- `components/calculator-engine/CalculatorEngineLoader.tsx` — lazy `dynamic()` wrapper with `ssr: false`

**Track 2 — Dedicated domain engines (distributed):**
Complex calculators have their own engine files in `lib/calculators/`:

- `investmentEngine.ts`, `debtPayoffEngine.ts`, `retirementEngine.ts`, `roiCalculatorEngine.ts`, `inflationEngine.ts`, `salaryIncreaseEngine.ts`

These are called directly inside custom components (Mortgage, Loan, Investment, etc.) in `components/calculators/`. There is **no shared coordinator** between these and the config engine — each custom component wires up its own inputs, calls its engine, and manages its own state.

Pure calculation functions live in `calculations/` (e.g. `concrete.ts`) and accept injected data objects — fully decoupled from the UI.

---

### 2. How Calculators Are Structured

Two shells, not one:

| Shell | File | Used by |
|---|---|---|
| `CalculatorEngine` (generic) | `CalculatorEngine.tsx` | All config-based tools |
| `SimpleCalculatorShell` / `GuidedCalculatorShell` | `components/calculators/` | Mortgage, Loan, Investment, PI wizard |

**Input → Result flow for config-based tools:**

1. `CalculatorEngineLoader` lazy-loads `CalculatorEngine` on the client
2. `useCalculator` hook holds `useState` for each input
3. On every input change, `useMemo` calls the `calculate()` function synchronously
4. `OutputCard` components render formatted results with count-up animation

**Input → Result flow for custom components:**
Each is self-contained — `useState` for inputs, direct call to domain engine, bespoke chart and table rendering.

**How they receive inputs:** All inputs are local `useState` — no props drilling from pages. Pages mount the component and it self-manages.

**How they return results:** Results are local state, rendered within the same component — nothing is bubbled up. The only external output is the `/api/leads` POST when a user submits a lead.

---

### 3. Safest Place to Introduce a New Layer

**Recommendation: a new API route at `app/api/`.**

The one existing API route — `app/api/leads/route.ts` — is isolated, POST-only, and has no impact on page rendering. Adding a second route (`app/api/ai-parse/route.ts`) follows the same pattern with zero risk to existing calculators.

**Why NOT middleware:** Next.js middleware runs on every request in the Edge Runtime. Placing AI parsing there would add latency to every page load, including SSR paths, and is incompatible with heavy Node.js AI SDKs.

**Why NOT utility services injected into existing engines:** The `calculate()` functions are synchronous and run inside `useMemo`. Making them async would break both the engine and every config that uses it — a wide blast radius.

**Safest integration points, ranked:**

| Location | Risk | Notes |
|---|---|---|
| New `app/api/` route | Very low | Isolated, no existing code touched |
| New hook in `hooks/enhancements/` | Low | Called optionally by components; existing flow untouched |
| New util in `lib/` | Low | Alongside `leads.ts`, `utils.ts` — no coupling |
| Existing `CalculatorEngine.tsx` | Medium | Affects all config-based calculators at once |
| Existing domain engines in `lib/calculators/` | Medium | Breaks async contract of useMemo |
| Middleware | High | Affects every page, every request |

---

### 4. Shared State / Global Store

**None.** There is no Zustand, Redux, React Context store, or server cache in use.

State is fully local to each calculator component via React `useState`. The only cross-component data flow is:

- The **tool registry** (`src/config/tools.ts`) — static compile-time data, not runtime state
- The **region** — passed as a prop (`region="UK"`) from page to `CalculatorEngineLoader`, not stored globally
- **Vercel Analytics** — fire-and-forget, no state

This is good news: introducing a new data layer cannot conflict with an existing store.

---

### 5. Where Calculations Happen

**100% client-side.**

- All `calculate()` functions are synchronous pure TypeScript
- Executed via `useMemo` inside React hooks on the client
- `CalculatorEngineLoader` uses `dynamic(..., { ssr: false })` — explicitly opts out of SSR
- No calculation runs during server rendering — pages SSR with static HTML/layout, calculators hydrate on the client
- The only server-side logic is the `/api/leads` POST handler (validation + Supabase write)

**Performance envelope per calculation:**

- Simple (concrete, cost) — < 1ms
- Mortgage amortization (30-year) — 5–10ms
- Investment projection (40-year) — 15–30ms

---

### 6. Performance-Sensitive Areas — Do Not Touch

**Three areas to treat as read-only:**

**① `CalculatorEngineLoader` — the `ssr: false` boundary**
`CalculatorEngineLoader.tsx` is the deliberate SSR firewall. It uses Next.js `dynamic()` with `{ ssr: false }` to keep calculators out of the server render. If you add blocking async operations (AI API calls) inside or above this boundary, you will stall the entire page hydration. Any AI call must stay behind this boundary or in a separate route.

**② `useCalculator` → `useMemo` pipeline**
The `useMemo` in `useCalculator.ts` is synchronous by design — it fires on every slider tick for instant feedback. Making this async (e.g. awaiting an AI endpoint) would break the live-feedback UX and likely cause React state update conflicts.

**③ Page SSR paths (metadata + static params)**
`app/tools/[slug]/page.tsx` uses `generateStaticParams()` and `generateMetadata()` — both run at build time / server-side and are what Google indexes. These must remain pure, fast, and dependency-free. Do not import AI clients or async data fetchers into the page-level server components.

**Risk Summary for Planned Additions:**

| Addition | Primary Risk | Mitigation |
|---|---|---|
| AI parsing endpoint | Cold-start latency on first request | Use a dedicated `app/api/ai-parse/route.ts`; never inline into calculation path |
| Centralised data/API layer | Async breaking `useMemo` | Keep as a separate hook (`useFetch`, `useAI`) called in parallel, not inside the calculation chain |
| Either, if added to SSR paths | Breaks SEO rendering, increases TTFB | Always keep behind the `ssr: false` boundary or in client-only hooks |
| Either, if added to middleware | Slows every request globally | Do not use middleware |

The cleanest, safest architecture: AI parsing lives at `app/api/ai-parse/route.ts`, a new client hook calls it in parallel with the existing synchronous engine, and results are layered on top of the existing output — never replacing the synchronous core.

---

---

## PART 2 — ENGINE + DATA SYSTEM MASTER PLAN

### CORE PRINCIPLE (read this first)

> "Update data, not calculators"
> "Add layers, don't break core"

---

### CURRENT SYSTEM (DO NOT CHANGE)

**What exists:**
- CalculatorEngine (config-based)
- Custom calculators (mortgage, loan, etc.)
- Logic engines (pure functions)
- Client-side `useMemo` calculations
- SSR-safe pages

**RULE: DO NOT modify this system.**

---

### WHAT WE ARE BUILDING — THREE NEW LAYERS (completely separate)

---

#### LAYER 1 — DATA STORE (NEW)

**Purpose:** Provide up-to-date default values to all calculators

**File:** `lib/dataStore.ts`

**Structure:**
```ts
export const dataStore = {
  mortgageRate: 6.7,
  fuelPrice: 3.85,
  inflationRate: 3.2,
  lastUpdated: "2026-05-19"
}
```

**Rules:**
- NO API calls here
- READ ONLY from calculators
- Always fallback safe

---

#### LAYER 2 — DATA UPDATER (NEW)

**Purpose:** Fetch real-world data and update `dataStore`

**File:** `app/api/update-data/route.ts`

**Flow:**
```
API fetch → transform → store → overwrite dataStore
```

**Example:**
```ts
const rate = await fetchMortgageRate();
dataStore.mortgageRate = rate;
dataStore.lastUpdated = new Date();
```

**Execution:**
- Cron job (Vercel / external)
- Runs every 6–24 hours

---

#### LAYER 3 — ENGINE API (NEW)

**Purpose:** Centralise ALL calculations (future-proof)

**File:** `app/api/engine/route.ts`

**Input:**
```json
{
  "type": "salary",
  "inputs": {
    "hourly": 22,
    "hours": 40,
    "weeks": 48
  }
}
```

**Output:**
```json
{
  "annual": 42240,
  "monthly": 3520,
  "weekly": 880
}
```

**Internal logic:**
```ts
switch(type) {
  case "salary":
    return calculateSalary(inputs)
  case "mortgage":
    return mortgageEngine(inputs)
}
```

**RULE: This does NOT replace calculators (yet).**

---

#### LAYER 4 — AI PARSER (NEW)

**Purpose:** Convert user text → structured inputs

**File:** `app/api/ai-parse/route.ts`

**Input:**
```
"22/hour 40 hours 48 weeks"
```

**Output:**
```json
{
  "type": "salary",
  "inputs": {
    "hourly": 22,
    "hours": 40,
    "weeks": 48
  }
}
```

**RULE: AI NEVER calculates. It only parses.**

---

### HOW EVERYTHING CONNECTS

**Master flow (new system):**
```
User input
   ↓
AI Parser (optional)
   ↓
Engine API
   ↓
Result
```

**Existing calculators flow (unchanged):**
```
User input
   ↓
useMemo (existing)
   ↓
calculate()
   ↓
Result
```

**IMPORTANT: These flows are SEPARATE.**

**How default data updates work:**
```ts
// Calculator example
const rate = userInputRate || dataStore.mortgageRate;
```
- API updates `dataStore`
- Calculators automatically use latest values

---

### CRITICAL RULES — DO NOT BREAK

**NEVER:**
- Call API inside a calculator
- Make `useMemo` async
- Modify `CalculatorEngine.tsx` globally
- Inject AI into calculation logic
- Touch SSR pages

**ALWAYS:**
- Keep calculations synchronous
- Use cached data
- Isolate new layers

---

### IMPLEMENTATION ORDER

| Step | Action | File |
|---|---|---|
| 1 | Create dataStore | `lib/dataStore.ts` |
| 2 | Create update API | `app/api/update-data/route.ts` |
| 3 | Use data in ONE calculator (test safely) | — |
| 4 | Create engine API | `app/api/engine/route.ts` |
| 5 | Create AI parser | `app/api/ai-parse/route.ts` |
| 6 | Add custom calculator UI (small feature only) | — |

---

### FUTURE (NOT NOW)

- Unify engines
- Expand AI usage
- Full system integration

---

### ONE-LINE SUMMARY

> "Stable UI + Central engine + Cached data + Optional AI"
