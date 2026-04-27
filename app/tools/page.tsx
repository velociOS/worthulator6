import Link from "next/link";
import { liveTools } from "@/src/config/tools";

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="text-3xl font-bold text-slate-950">All Tools</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {liveTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
