import { INSIGHT_CONFIGS } from "./insightConfigs";

export default function InsightTable({ slug }: { slug: string }) {
  const config = INSIGHT_CONFIGS[slug];
  if (!config) return null;

  const { table } = config;

  return (
    <section className="border-t border-gray-100 bg-white px-5 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
        {table.caption}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {table.headers.map((h, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap pb-3 pr-6 text-xs font-semibold uppercase tracking-wide text-gray-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-gray-50/60" : ""}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`whitespace-nowrap py-2.5 pr-6 ${
                      j === 0 ? "font-semibold text-gray-800" : "text-gray-600"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
      </div>
    </section>
  );
}
