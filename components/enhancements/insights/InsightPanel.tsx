"use client";

import { generateInsights, generateRecommendations } from "@/lib/enhancements/insightEngine";
import type { InsightRecord, RecommendationRecord } from "@/lib/enhancements/insightEngine";

interface InsightPanelProps {
  data: Record<string, number | string>;
  showRecommendations?: boolean;
  title?: string;
}

const typeStyles: Record<InsightRecord["type"], string> = {
  positive: "bg-emerald-50 border-emerald-200 text-emerald-700",
  neutral: "bg-blue-50 border-blue-200 text-blue-700",
  warning: "bg-amber-50 border-amber-200 text-amber-700",
};

const dotStyles: Record<InsightRecord["type"], string> = {
  positive: "bg-emerald-500",
  neutral: "bg-blue-500",
  warning: "bg-amber-500",
};

const priorityBadge: Record<RecommendationRecord["priority"], string> = {
  high: "bg-red-100 text-red-600",
  medium: "bg-amber-100 text-amber-600",
  low: "bg-gray-100 text-gray-500",
};

export default function InsightPanel({
  data,
  showRecommendations = true,
  title = "Key Insights",
}: InsightPanelProps) {
  const insights = generateInsights(data);
  const recommendations = showRecommendations ? generateRecommendations(data) : [];

  return (
    <div className="space-y-6">
      {/* ── Insights ── */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        <div className="mt-3 space-y-2">
          {insights.map((insight, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 rounded-xl border p-4 ${typeStyles[insight.type]}`}
            >
              <span
                className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotStyles[insight.type]}`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide opacity-60">
                  {insight.label}
                </p>
                <p className="mt-0.5 text-sm">{insight.message}</p>
              </div>
              {insight.value && (
                <span className="shrink-0 text-sm font-bold">{insight.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Recommendations ── */}
      {showRecommendations && recommendations.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Recommendations</h3>
          <div className="mt-3 space-y-3">
            {recommendations.map((rec, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-800">{rec.title}</p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${priorityBadge[rec.priority]}`}
                  >
                    {rec.priority}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                  {rec.description}
                </p>
                {rec.actionLabel && (
                  <p className="mt-2 text-xs font-semibold text-emerald-600">
                    → {rec.actionLabel}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
