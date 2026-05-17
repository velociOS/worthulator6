import { INSIGHT_CONFIGS } from "./insightConfigs";
import { type FaqItem, INSIGHT_SEO_DATA } from "./insightSeoData";

export default function InsightTable({ slug }: { slug: string }) {
  const config = INSIGHT_CONFIGS[slug];
  if (!config) return null;

  const { table } = config;
  const seo = INSIGHT_SEO_DATA[slug];

  return (
    <section className="border-t border-gray-100 bg-white px-5 py-10 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-white/8 bg-gray-900 p-6 sm:p-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
            {table.caption}
          </p>
          {seo?.intro && (
            <p className="mt-3 mb-6 text-sm leading-relaxed text-gray-400">{seo.intro}</p>
          )}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {table.headers.map((h, i) => (
                    <th
                      key={i}
                      className="whitespace-nowrap pb-3 pr-6 text-xs font-semibold uppercase tracking-wide text-gray-500"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={i} className="border-t border-white/5">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`whitespace-nowrap py-3 pr-6 ${
                          j === 0 ? "font-semibold text-white" : "text-gray-400"
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
          {seo?.faq && seo.faq.length > 0 && (
            <div className="space-y-2 border-t border-white/8 pt-5">
              {seo.faq.map((item: FaqItem, i: number) => (
                <details key={i}>
                  <summary className="cursor-pointer text-sm text-emerald-400 hover:text-emerald-300">
                    {item.q}
                  </summary>
                  <p className="mt-2 border-l border-white/10 pl-3 text-sm leading-relaxed text-gray-500">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
