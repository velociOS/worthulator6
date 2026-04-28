export function getDisclaimer(stateName?: string): string {
  const stateNote = stateName
    ? ` Laws, damage caps, and jury award tendencies vary significantly in ${stateName} and across all US jurisdictions.`
    : " Laws, damage caps, and jury award tendencies vary significantly across all US jurisdictions.";

  return (
    `This estimate is based on publicly available personal injury case data, general legal principles, and statistical settlement ranges.` +
    ` It does not constitute legal advice and should not be relied upon as a prediction of any specific case outcome.` +
    stateNote +
    ` Results are for educational and informational purposes only.` +
    ` Always consult a qualified personal injury attorney before making any legal decisions.`
  );
}

export const SHORT_DISCLAIMER =
  "Estimates only · Not legal advice · For educational purposes · Consult a qualified attorney";
