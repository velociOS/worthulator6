"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { liveTools, categories, pageTitle } from "../../config/tools";

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-white/15 text-white not-italic">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return liveTools.filter((t) => t.popular).slice(0, 8);
    return liveTools
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          pageTitle(t).toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q) ||
          t.keywords?.some((k) => k.toLowerCase().includes(q)) ||
          t.category.toLowerCase().includes(q),
      )
      .slice(0, 10);
  }, [query]);

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, results.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && results[activeIndex]) {
        const tool = results[activeIndex];
        router.push(tool.href ?? `/tools/${tool.slug}`);
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, activeIndex, router, onClose]);

  // Reset active index when results change
  useEffect(() => { setActiveIndex(0); }, [results]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-start justify-center px-4 pt-[15vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3.5">
          <svg className="h-4 w-4 shrink-0 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search calculators & tools…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-white/25 hover:text-white/50 text-xs">
              Clear
            </button>
          )}
          <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/20">Esc</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {results.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-white/30">No results for &ldquo;{query}&rdquo;</p>
          ) : (
            <>
              {!query.trim() && (
                <p className="px-5 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-widest text-white/20">
                  Popular
                </p>
              )}
              {results.map((tool, i) => {
                const cat = categories.find((c) => c.slug === tool.category);
                return (
                  <Link
                    key={tool.slug}
                    href={tool.href ?? `/tools/${tool.slug}`}
                    onClick={onClose}
                    className={`flex items-center gap-3.5 px-4 py-3 transition-colors ${
                      i === activeIndex ? "bg-white/8" : "hover:bg-white/5"
                    }`}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-base leading-none">
                      {cat?.emoji ?? "🔧"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white/80">
                        {highlight(pageTitle(tool), query.trim())}
                      </p>
                      {tool.description && (
                        <p className="mt-0.5 truncate text-xs text-white/30">
                          {tool.description}
                        </p>
                      )}
                    </div>
                    {i === activeIndex && (
                      <kbd className="shrink-0 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-white/25">↵</kbd>
                    )}
                  </Link>
                );
              })}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-white/8 px-5 py-2.5 text-[11px] text-white/20">
          <span><kbd className="rounded border border-white/10 px-1 py-0.5 text-[10px]">↑↓</kbd> navigate</span>
          <span><kbd className="rounded border border-white/10 px-1 py-0.5 text-[10px]">↵</kbd> open</span>
          <span><kbd className="rounded border border-white/10 px-1 py-0.5 text-[10px]">Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
