export function getUKDisclaimer(jurisdiction?: string): string {
  const jurisdictionNote = jurisdiction
    ? ` Compensation amounts, court procedures and applicable rules may vary between ${jurisdiction} and other parts of the United Kingdom.`
    : " Compensation amounts, court procedures and applicable rules may vary between different parts of the United Kingdom.";

  return (
    "This calculator provides general estimates based on publicly available data and user inputs." +
    " It does not constitute legal advice and does not replace guidance from a qualified solicitor regulated by the Solicitors Regulation Authority (SRA)." +
    jurisdictionNote +
    " Figures are approximate and are based on publicly available Judicial College Guidelines ranges." +
    " Results are for educational and informational purposes only." +
    " Always consult a qualified personal injury solicitor before taking any legal action."
  );
}

export const UK_SHORT_DISCLAIMER =
  "Estimates only · Not legal advice · Consult a solicitor regulated by the SRA";
