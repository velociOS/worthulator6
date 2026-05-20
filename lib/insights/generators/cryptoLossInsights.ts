import type { Insight } from "../index";

interface CryptoLossInputs {
  invested:     number;
  currentValue: number;
  yearsHeld:    number;
}

interface CryptoLossOutputs {
  pnl?:               number;
  pnlPercent?:        number;
  indexAlternative?:  number;
  opportunityGap?:    number;
  breakEvenMultiple?: number;
  indexGainPercent?:  number;
}

export function cryptoLossInsights(
  inputs: CryptoLossInputs,
  outputs: CryptoLossOutputs
): Insight[] {
  const results: Insight[] = [];

  const invested  = Number(inputs.invested);
  const current   = Number(inputs.currentValue);
  const years     = Number(inputs.yearsHeld);
  const pnl       = outputs.pnl               ?? 0;
  const pnlPct    = outputs.pnlPercent         ?? 0;
  const index     = outputs.indexAlternative   ?? 0;
  const gap       = outputs.opportunityGap     ?? 0;
  const multiple  = outputs.breakEvenMultiple  ?? 1;
  const indexPct  = outputs.indexGainPercent   ?? 0;

  // 1. Core P&L framing
  if (pnl < 0) {
    results.push({
      id: "crypto.loss-framing",
      type: "warning",
      message: `You've lost $${Math.abs(pnl).toLocaleString()} (${Math.abs(pnlPct)}%) over ${years} years in crypto.`,
      detail: `To break even, your portfolio needs to ${multiple > 1 ? `${multiple}x from here` : "recover its losses"} — a significant move from current levels.`,
    });
  } else {
    results.push({
      id: "crypto.gain-framing",
      type: "positive",
      message: `You're up $${pnl.toLocaleString()} (${pnlPct}%) over ${years} years in crypto.`,
      detail: `Crypto gains can be volatile — locking in gains through diversification or rebalancing protects against drawdowns.`,
    });
  }

  // 2. Index comparison — always shown
  results.push({
    id: "crypto.index-comparison",
    type: "info",
    message: `The same $${invested.toLocaleString()} in an S&P 500 index fund at 7%/year would be $${index.toLocaleString()} today — a ${indexPct}% gain.`,
    detail: `The index doesn't make headlines. It just compounds, reliably, over decades. It's the baseline any alternative investment should beat.`,
  });

  // 3. Opportunity gap (if losing vs index)
  if (gap > 5_000) {
    results.push({
      id: "crypto.opportunity-gap",
      type: "warning",
      message: `Your crypto portfolio is $${gap.toLocaleString()} behind where index investing would have put you.`,
      detail: `This is the opportunity cost of the bet — not just what you lost, but the compound growth you didn't get.`,
    });
  } else if (gap < 0) {
    // Crypto outperformed the index
    results.push({
      id: "crypto.beat-index",
      type: "positive",
      message: `Your crypto portfolio outperformed the S&P 500 by $${Math.abs(gap).toLocaleString()} over ${years} years — a genuine beat.`,
      detail: `Crypto can outperform in bull cycles. The challenge is sustaining that edge over full market cycles, which few investors achieve.`,
    });
  }

  // 4. Break-even framing (if in loss)
  if (pnl < 0 && multiple > 1.2) {
    results.push({
      id: "crypto.break-even",
      type: "warning",
      message: `To break even, your portfolio needs to grow ${multiple}x from its current value of $${current.toLocaleString()}.`,
      detail: `A 50% loss requires a 100% gain to recover. The mathematics of recovery are asymmetric — that's the hidden danger of large drawdowns.`,
    });
  }

  // 5. Reframe toward strategy
  if (pnl < 0) {
    results.push({
      id: "crypto.strategy-reframe",
      type: "opportunity",
      message: `Redirecting $${Math.round(invested / years / 12).toLocaleString()}/month from speculative crypto into index funds would compound to $${Math.round((invested / years / 12) * ((Math.pow(1.07, 10) - 1) / 0.07)).toLocaleString()} in 10 years.`,
      detail: `The lesson of crypto losses isn't to avoid risk — it's to ensure the risk you take is commensurate with expected return.`,
    });
  }

  // 6. Tax-loss harvesting nudge
  if (pnl < -1000) {
    results.push({
      id: "crypto.tax-loss",
      type: "opportunity",
      message: `A loss of $${Math.abs(pnl).toLocaleString()} may be eligible for tax-loss harvesting — potentially offsetting capital gains elsewhere.`,
      detail: `Consult a tax professional. In the US, crypto losses can offset capital gains and up to $3,000/year of ordinary income.`,
    });
  }

  return results;
}
