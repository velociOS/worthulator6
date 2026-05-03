"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";

export default function ConcreteCostPerYardCalculator() {
  const [yards,    setYards]    = useState(3);
  const [yardsI,   setYardsI]   = useState("3");
  const [priceI,   setPriceI]   = useState("150");
  const [price,    setPrice]    = useState(150);
  const [delivI,   setDelivI]   = useState("150");
  const [deliv,    setDeliv]    = useState(150);
  const [wasteI,   setWasteI]   = useState("10");
  const [waste,    setWaste]    = useState(10);
  const [flash,    setFlash]    = useState(false);

  useEffect(() => {
    setFlash(true);
    const t = setTimeout(() => setFlash(false), 400);
    return () => clearTimeout(t);
  }, [yards, price, deliv, waste]);

  const yardsW        = yards * (1 + waste / 100);
  const materialCost  = Math.round(yardsW * price);
  const totalCost     = materialCost + deliv;
  const effectivePpY  = yards > 0 ? Math.round(totalCost / yards) : 0;

  const fmt = (n: number) => "$" + n.toLocaleString("en-US");

  const inputCls =
    "w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-3 pr-10 text-right text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100";
  const cardCls =
    "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg";

  return (
    <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-10">

      {/* ── INPUTS ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5">

        {/* Cubic yards needed */}
        <div className={cardCls}>
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="ccy-yards" className="block text-sm font-semibold text-gray-700">Cubic yards needed</label>
              <p className="mt-0.5 text-xs text-gray-400">How much concrete you need to order</p>
            </div>
            <div className="relative">
              <input
                id="ccy-yards"
                type="number" min={0.5} max={100} step={0.5}
                value={yardsI}
                onChange={(e) => { setYardsI(e.target.value); const v = Math.max(0.5, Math.min(100, Number(e.target.value))); if (!isNaN(v)) setYards(v); }}
                onBlur={() => setYardsI(String(yards))}
                className={inputCls}
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">yd³</span>
            </div>
          </div>
          <div className="mt-5 **:[[role=slider]]:h-5 **:[[role=slider]]:w-5 **:[[role=slider]]:bg-emerald-500 **:[[role=slider]]:border-emerald-400 **:[[role=slider]]:shadow-md **:[[role=slider]]:transition-all **:[[role=slider]]:duration-150 **:[[role=slider]]:cursor-grab **:[[role=slider]]:hover:scale-[1.1] **:[[role=slider]]:active:scale-[1.15] **:[[role=slider]]:active:cursor-grabbing">
            <Slider
              min={0.5} max={20} step={0.5}
              value={[Math.min(yards, 20)]}
              onValueChange={([v]) => { setYards(v); setYardsI(String(v)); }}
              className="h-3"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>0.5 yd³</span><span>10 yd³</span><span>20 yd³</span>
            </div>
          </div>
        </div>

        {/* Price per yard */}
        <div className={cardCls}>
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="ccy-price" className="block text-sm font-semibold text-gray-700">Ready-mix price per yard</label>
              <p className="mt-0.5 text-xs text-gray-400">US average $120–$200/yd³ — adjust for your area</p>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-bold text-gray-400">$</span>
              <input
                id="ccy-price"
                type="number" min={50} max={500} step={5}
                value={priceI}
                onChange={(e) => { setPriceI(e.target.value); const v = Math.max(0, Number(e.target.value)); if (!isNaN(v)) setPrice(v); }}
                onBlur={() => { const v = Math.max(0, Number(priceI)); if (isNaN(v) || priceI === "") { setPrice(150); setPriceI("150"); } else setPriceI(String(v)); }}
                className="w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-7 pr-3 text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>
          <div className="mt-5 **:[[role=slider]]:h-5 **:[[role=slider]]:w-5 **:[[role=slider]]:bg-emerald-500 **:[[role=slider]]:border-emerald-400 **:[[role=slider]]:shadow-md **:[[role=slider]]:transition-all **:[[role=slider]]:duration-150 **:[[role=slider]]:cursor-grab **:[[role=slider]]:hover:scale-[1.1] **:[[role=slider]]:active:scale-[1.15] **:[[role=slider]]:active:cursor-grabbing">
            <Slider
              min={80} max={300} step={5}
              value={[Math.min(price, 300)]}
              onValueChange={([v]) => { setPrice(v); setPriceI(String(v)); }}
              className="h-3"
            />
            <div className="mt-2 flex justify-between text-xs text-gray-400">
              <span>$80</span><span>$190</span><span>$300</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[120, 150, 175, 200].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => { setPrice(p); setPriceI(String(p)); }}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 active:scale-[0.96] ${
                  price === p
                    ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                ${p}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery charge */}
        <div className={cardCls}>
          <div className="flex items-start justify-between">
            <div>
              <label htmlFor="ccy-deliv" className="block text-sm font-semibold text-gray-700">Delivery charge</label>
              <p className="mt-0.5 text-xs text-gray-400">Typically $100–$200 flat fee per truck</p>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-bold text-gray-400">$</span>
              <input
                id="ccy-deliv"
                type="number" min={0} max={600} step={10}
                value={delivI}
                onChange={(e) => { setDelivI(e.target.value); const v = Math.max(0, Number(e.target.value)); if (!isNaN(v)) setDeliv(v); }}
                onBlur={() => { const v = Math.max(0, Number(delivI)); if (isNaN(v) || delivI === "") { setDeliv(150); setDelivI("150"); } else setDelivI(String(v)); }}
                className="w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-7 pr-3 text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {[0, 100, 150, 200].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => { setDeliv(d); setDelivI(String(d)); }}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-150 active:scale-[0.96] ${
                  deliv === d
                    ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                    : "border-gray-200 bg-gray-50 text-gray-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                {d === 0 ? "No delivery" : `$${d}`}
              </button>
            ))}
          </div>
        </div>

        {/* Waste factor */}
        <div className={cardCls}>
          <div className="flex items-center justify-between gap-4">
            <div>
              <label htmlFor="ccy-waste" className="block text-sm font-semibold text-gray-700">Waste factor</label>
              <p className="mt-0.5 text-xs text-gray-400">Add 10% for typical pours; 15% for complex forms</p>
            </div>
            <div className="relative shrink-0">
              <input
                id="ccy-waste"
                type="number" min={0} max={50} step={1}
                value={wasteI}
                onChange={(e) => { setWasteI(e.target.value); const v = Math.max(0, Math.min(50, Number(e.target.value))); if (!isNaN(v)) setWaste(v); }}
                onBlur={() => { const v = Math.max(0, Math.min(50, Number(wasteI))); if (isNaN(v) || wasteI === "") { setWaste(10); setWasteI("10"); } else setWasteI(String(v)); }}
                className="w-28 rounded-xl border border-gray-200 bg-gray-50 py-2 pl-3 pr-8 text-right text-sm font-bold text-gray-900 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-semibold text-gray-400">%</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── RESULT ─────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 lg:sticky lg:top-6 lg:self-start">

        {/* Total cost card */}
        <div
          className={`rounded-2xl border p-6 shadow-sm transition-all duration-300 ${
            flash ? "border-emerald-200 bg-emerald-50" : "border-gray-200 bg-white"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Total Material Cost</p>
          <p className={`mt-2 text-5xl font-bold tracking-tight transition-colors duration-300 ${flash ? "text-emerald-600" : "text-gray-950"}`}>
            {fmt(totalCost)}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            incl. delivery &amp; {waste}% waste
          </p>

          {/* Breakdown bar */}
          <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full bg-emerald-400 transition-all duration-500"
              style={{ width: totalCost > 0 ? `${(materialCost / totalCost) * 100}%` : "0%" }}
            />
          </div>
          <div className="mt-2 flex gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-400" />Concrete ({fmt(materialCost)})</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gray-200" />Delivery ({fmt(deliv)})</span>
          </div>

          {/* Stats grid */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 border-t border-gray-100 pt-4">
            <div className="rounded-xl bg-gray-50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">You need</p>
              <p className="mt-0.5 text-base font-bold text-gray-900">{yards} <span className="text-xs font-semibold text-gray-400">yd³</span></p>
            </div>
            <div className="rounded-xl bg-gray-50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Order (incl. waste)</p>
              <p className="mt-0.5 text-base font-bold text-gray-900">{yardsW.toFixed(2)} <span className="text-xs font-semibold text-gray-400">yd³</span></p>
            </div>
            <div className="rounded-xl bg-emerald-50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Concrete cost</p>
              <p className="mt-0.5 text-base font-bold text-gray-900">{fmt(materialCost)}</p>
            </div>
            <div className="rounded-xl bg-orange-50 px-3 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-orange-600">Effective per yard</p>
              <p className="mt-0.5 text-base font-bold text-gray-900">{fmt(effectivePpY)}</p>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-snug text-gray-400">
            Material costs only. Does not include labour, forming, or finishing.
          </p>
        </div>

        {/* Cost breakdown rows */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Breakdown</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Concrete ({yardsW.toFixed(2)} yd³ × {fmt(price)}/yd³)</span>
              <span className="font-semibold text-gray-800">{fmt(materialCost)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery charge</span>
              <span className="font-semibold text-gray-800">{fmt(deliv)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2 text-sm font-bold">
              <span className="text-gray-700">Total</span>
              <span className="text-orange-600">{fmt(totalCost)}</span>
            </div>
          </div>
        </div>

        {/* Formula */}
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">How it&apos;s calculated</p>
          <p className="text-xs leading-relaxed text-gray-500">
            Order quantity = yards needed &times; (1 + waste&nbsp;%)<br /><br />
            Concrete cost = order quantity &times; price per yd³<br /><br />
            Total = concrete cost + delivery charge
          </p>
        </div>

      </div>
    </div>
  );
}
