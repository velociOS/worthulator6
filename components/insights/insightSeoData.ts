/**
 * ─── Insight SEO Data ─────────────────────────────────────────────────────────
 * Per-calculator intro text + FAQ pairs rendered by InsightTable (server component).
 * This content is fully indexed by Google — write it as if it's the only thing
 * Googlebot sees on the page (because for the calculator area, it is).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface FaqItem {
  q: string;
  a: string;
}

export interface InsightSeoData {
  intro: string;
  faq: FaqItem[];
}

export const INSIGHT_SEO_DATA: Record<string, InsightSeoData> = {

  "401k-calculator": {
    intro:
      "A 401k is the most tax-efficient savings vehicle most employees have access to. Every dollar contributed reduces your taxable income today (traditional) or grows tax-free forever (Roth). The table below shows projected balances at different contribution levels — the difference between $200/month and $1,000/month at 7% over 30 years is not 5x, it's closer to 5.3x thanks to compounding.",
    faq: [
      {
        q: "What is the 401k contribution limit for 2025?",
        a: "The IRS limit for 2025 is $23,500 for employees under 50. Workers aged 50 and over can add a $7,500 catch-up contribution for a total of $31,000. If your employer matches, those contributions are on top of your limit — a 50% match on $23,500 means up to $35,250 going into your account annually.",
      },
      {
        q: "How does 401k employer match work?",
        a: "The most common structure is a 50% match on up to 6% of salary — so on a $70,000 salary, contributing 6% ($4,200/year) earns you $2,100 in free employer money. Some companies offer dollar-for-dollar matching. Always contribute at least enough to capture the full match — not doing so is leaving part of your compensation on the table.",
      },
      {
        q: "Traditional 401k vs Roth 401k — which is better?",
        a: "Traditional reduces your tax bill now; Roth lets the money grow and withdraw tax-free. If you expect to be in a higher tax bracket in retirement than you are today, Roth wins. If you're in a peak earning year and expect lower income in retirement, traditional likely wins. Many advisors suggest splitting contributions between both to hedge against future tax rate uncertainty.",
      },
    ],
  },

  "airbnb-profit": {
    intro:
      "Airbnb hosts in the US earn an average of $14,000 per year, but that figure hides enormous variance. A private room in a mid-tier city might net $600/month; an entire home in a coastal tourist market can clear $5,000+. The table below models realistic net profit after Airbnb's host fee (3%), cleaning costs, and basic maintenance — the numbers that actually hit your bank account.",
    faq: [
      {
        q: "What percentage does Airbnb take from hosts?",
        a: "Most hosts pay a 3% service fee on the booking subtotal (nightly rate + cleaning fee, before taxes). Hosts who use Airbnb's strict cancellation policy may pay a slightly higher rate. Guests pay a separate service fee of 14–20% on top. For a $200/night booking, you'd net roughly $194 before your own costs.",
      },
      {
        q: "What occupancy rate should I assume for Airbnb projections?",
        a: "National average occupancy for Airbnb listings sits around 48%, but well-optimised listings in high-demand markets achieve 65–75%. New listings typically start below 40% and climb as reviews accumulate. For conservative planning, use 50–55%; for a best-case scenario, use 65–70%.",
      },
      {
        q: "What costs should I subtract from Airbnb revenue?",
        a: "Beyond Airbnb's 3% fee, account for: cleaning ($50–$150 per turnover), consumables ($10–$20/stay), utilities (typically 20–30% higher than residential use), minor maintenance (budget 1% of property value annually), and income tax on all rental profits. Many hosts also forget property management software, higher insurance premiums, and furnishing amortisation.",
      },
    ],
  },

  "alcohol-cost-calculator": {
    intro:
      "The average American spends around $600 per year on alcohol — but that average masks heavy drinkers spending $4,000–$8,000+ annually. At a bar, a single drink costs 4–6x what the same drink costs at home. The true cost compounds when you factor in impaired productivity, health costs, and the opportunity cost of those dollars not invested.",
    faq: [
      {
        q: "How much does the average person spend on alcohol per month?",
        a: "US Bureau of Labor Statistics data puts average alcohol spending at about $50/month household-wide. However, self-reported surveys consistently undercount by 40–60% because people forget casual purchases. A person drinking 2–3 nights per week at bars ($12–$15/drink) can easily spend $300–$500/month without noticing.",
      },
      {
        q: "How much cheaper is drinking at home vs at a bar?",
        a: "A standard pour of spirits costs $0.50–$1.50 at home; $9–$15 at a bar. A 750ml bottle of mid-range wine costs $12–$20 retail and yields 5 glasses — that's $2.50–$4/glass vs $10–$14 at a restaurant. On average, home drinking is 5–7x cheaper per unit of alcohol.",
      },
      {
        q: "What is the investment opportunity cost of drinking?",
        a: "Someone spending $300/month on alcohol who instead invested that in an index fund at 7% annual return would have $151,000 after 20 years and $375,000 after 30. This isn't about abstinence — it's about understanding the real price of a habit. Even cutting $100/month adds $50,000+ over 20 years.",
      },
    ],
  },

  "appliance-energy-cost": {
    intro:
      "The average US household spends $1,500–$2,200 per year on electricity. Your five biggest consumers are almost always heating/cooling (46%), water heating (14%), appliances (13%), lighting (9%), and electronics (4%). The table below applies the standard formula — Watts ÷ 1,000 × hours used × kWh rate — to the most common household appliances using the 2025 national average rate of 16.2¢/kWh.",
    faq: [
      {
        q: "How do I calculate how much an appliance costs to run?",
        a: "The formula is: (Watts ÷ 1,000) × hours of daily use × 365 × your kWh rate = annual cost. Example: a 1,200W hair dryer used 10 minutes daily = (1200 ÷ 1000) × 0.167hr × 365 × $0.162 = $11.87/year. For monthly cost, divide by 12. Find your exact kWh rate on your electricity bill — it varies from 10¢ (Louisiana) to 28¢+ (California, Hawaii).",
      },
      {
        q: "Which home appliances use the most electricity?",
        a: "Electric water heaters (4,000W), central air conditioning (3,500W), electric clothes dryers (5,000W), and electric ovens (2,400W) are the biggest consumers. A central AC unit running 8 hours/day at 16¢/kWh costs about $164/month. Switching to a heat pump water heater can cut water heating costs by 70%.",
      },
      {
        q: "Does leaving appliances on standby waste significant electricity?",
        a: "Standby power ('vampire draw') accounts for 5–10% of household electricity use — roughly $100–$150/year for the average home. The worst offenders are cable boxes (17W continuous), gaming consoles (1–15W standby), and older TVs. Smart power strips and unplugging unused chargers can meaningfully reduce this.",
      },
    ],
  },

  "bill-split-calculator": {
    intro:
      "Splitting a restaurant bill sounds simple until you add tip, tax, and the fact that three people had cocktails and two didn't. An equal split on a $200 table can create $30–$50 swings between the lightest and heaviest eaters. The most friction-free method: agree on split style before ordering, not after the bill arrives.",
    faq: [
      {
        q: "How do you calculate splitting a bill with tip included?",
        a: "Add the tip to the subtotal first, then divide. For a $150 bill with 20% tip: $150 × 1.20 = $180 total ÷ 4 people = $45 each. If you're splitting tax separately: add 8.5% tax to get $162.75, then add 20% tip on the pre-tax subtotal ($30), giving $192.75 ÷ 4 = $48.19 each. Most people just tip on the post-tax total for simplicity.",
      },
      {
        q: "Should you split a restaurant bill evenly or by what you ordered?",
        a: "Equal splits work well when orders are roughly similar in price (within 20–25%). When there's a wide price range — some people had $8 pasta, others had $35 steak — splitting by order is fairer and prevents resentment. The social cost of asking to split by item is lower than the financial imbalance of always subsidising others' meals.",
      },
      {
        q: "What is the standard tip percentage in the US?",
        a: "15% is the minimum for acceptable service; 18–20% is standard; 22–25% is generous. Tip is calculated on the pre-tax subtotal in most etiquette guides, though many people tip on the total. For large groups (6+), many restaurants automatically add 18–20% gratuity — check your bill before adding more.",
      },
    ],
  },

  "biological-age-calculator": {
    intro:
      "Chronological age tells you how long you've been alive; biological age tells you how fast your body is aging. Research from the Karolinska Institute and Levine's PhenoAge study shows biological age can diverge from birth year by 10–15 years depending on lifestyle. The good news: unlike your birth certificate, biological age can be reversed through measurable interventions.",
    faq: [
      {
        q: "What is the difference between biological and chronological age?",
        a: "Chronological age is simply the number of years since birth. Biological age reflects the actual wear on your cells, organs, and tissues — measured through biomarkers like telomere length, DNA methylation patterns (epigenetic clocks), inflammatory markers (CRP, IL-6), and functional tests like VO2 max and grip strength. A 45-year-old who exercises regularly, sleeps well, and doesn't smoke may have a biological age of 38.",
      },
      {
        q: "What lifestyle factors have the biggest impact on biological age?",
        a: "The five highest-impact modifiable factors are: (1) smoking — adds 2–5 biological years per decade; (2) physical inactivity — sedentary adults age biologically 8–10 years faster than active peers; (3) sleep quality — chronic under-sleep accelerates epigenetic aging; (4) diet quality — Mediterranean-style diets are consistently linked to lower biological age; (5) chronic stress — elevates cortisol, accelerating cellular aging.",
      },
      {
        q: "Can you actually reverse your biological age?",
        a: "Yes, within limits. The Horvath and DunedinPACE epigenetic clocks show that sustained lifestyle changes — exercise, diet improvement, stress reduction, quality sleep — can reduce biological age by 1–3 years over 12–18 months. A landmark 2021 trial (Fahy et al.) showed an average 2.5-year biological age reduction with a diet + exercise + supplementation protocol over 8 weeks.",
      },
    ],
  },

  "bmr-calculator": {
    intro:
      "Your Basal Metabolic Rate is the number of calories your body burns at complete rest just to keep you alive — powering your heart, brain, liver, kidneys, and temperature regulation. It accounts for 60–75% of total daily calorie burn, which is why cutting calories aggressively and slashing activity isn't as effective as it seems — your BMR adapts downward. The table below uses the Mifflin-St Jeor equation, the most clinically validated formula for non-athletes.",
    faq: [
      {
        q: "What is a normal BMR for men and women?",
        a: "For a 35-year-old at average height and weight: men average 1,700–1,900 kcal/day BMR; women average 1,400–1,600 kcal/day. BMR peaks in your 20s and declines roughly 1–2% per decade thereafter, partly due to muscle mass loss. Two people of identical age, height, and weight can have BMRs that differ by 200–300 kcal/day based on body composition.",
      },
      {
        q: "What is the difference between BMR and TDEE?",
        a: "BMR is calories burned at total rest. TDEE (Total Daily Energy Expenditure) is BMR multiplied by an activity factor: sedentary (×1.2), lightly active (×1.375), moderately active (×1.55), very active (×1.725), extremely active (×1.9). A woman with a BMR of 1,450 who exercises 3–4 days/week has a TDEE of roughly 2,250 — the calories she needs to maintain weight.",
      },
      {
        q: "Which BMR formula is most accurate — Mifflin-St Jeor or Harris-Benedict?",
        a: "Mifflin-St Jeor (1990) is more accurate for modern populations — studies show it predicts measured BMR within 10% for about 82% of people. The original Harris-Benedict (1919) tends to overestimate by 5–15%, particularly for overweight individuals. For athletes with high muscle mass, the Katch-McArdle formula (which uses lean body mass) is most precise.",
      },
    ],
  },

  "body-fat-calculator": {
    intro:
      "BMI tells you if your weight is proportionate to your height — it says nothing about body composition. Two people with identical BMIs can have body fat percentages that differ by 15%. Body fat percentage separates fat mass from lean muscle, bone, and organs, making it far more useful for tracking fitness progress, health risk, and athletic performance.",
    faq: [
      {
        q: "What is a healthy body fat percentage for men and women?",
        a: "For men: essential fat is 2–5%; athlete range is 6–13%; fitness range is 14–17%; acceptable is 18–24%; obese is 25%+. For women: essential fat is 10–13%; athlete range is 14–20%; fitness range is 21–24%; acceptable is 25–31%; obese is 32%+. Women naturally carry more fat due to reproductive hormones — comparing male and female body fat targets directly is misleading.",
      },
      {
        q: "How accurate is the Navy body fat formula?",
        a: "The US Navy circumference method (using neck, waist, and hip measurements) has a margin of error of ±3–4% compared to DEXA scans for most people. It's less accurate at extremes — very lean (<8% men / <15% women) or very obese (>40%). DEXA scans are the gold standard at ±1–2%, but cost $50–$150. For tracking trends over time, any consistent method works well.",
      },
      {
        q: "How do I lower my body fat percentage without losing muscle?",
        a: "The most effective strategy combines a moderate calorie deficit (300–500 kcal/day, not more) with resistance training 3–4 days/week and high protein intake (0.7–1g per pound of body weight). This combination preserves lean mass while burning fat. Losing more than 1% of body weight per week significantly increases the risk of muscle loss alongside fat loss.",
      },
    ],
  },

  "budget-calculator": {
    intro:
      "The 50/30/20 rule — 50% on needs, 30% on wants, 20% on savings and debt — is the most widely taught budgeting framework, but most American households miss it significantly: average spending is closer to 56% needs, 36% wants, and only 8% savings. The table below shows what each category should look like at different income levels, and where most households actually land.",
    faq: [
      {
        q: "What counts as a 'need' vs a 'want' in the 50/30/20 rule?",
        a: "Needs are non-negotiable essentials: rent/mortgage, minimum debt payments, utilities, groceries, basic transportation, and health insurance. Wants are everything that improves quality of life but isn't essential: dining out, subscriptions, gym memberships, clothing beyond basics, and entertainment. The grey area is where most budget debates happen — a smartphone is a need; a $1,200 iPhone is partly a want.",
      },
      {
        q: "How much of my income should go to rent?",
        a: "The traditional rule is no more than 30% of gross income on housing — a figure set by the US Department of Housing and Urban Development. In high-cost cities (NYC, SF, LA), 35–40% is often unavoidable without long commutes. The more actionable metric: housing above 40% of take-home pay leaves too little margin for savings and emergencies.",
      },
      {
        q: "How much should I have in savings before budgeting for investments?",
        a: "Financial advisors recommend building a 3–6 month emergency fund first — the specific amount depends on job stability and monthly expenses. Someone with $3,000/month in expenses needs $9,000–$18,000 liquid. Only after this buffer is funded does investing make sense, because selling investments in a downturn to cover an emergency locks in losses.",
      },
    ],
  },

  "burnout-calculator": {
    intro:
      "Burnout is not just stress — it's a state of chronic depletion across three dimensions: emotional exhaustion, depersonalisation (cynicism toward your work and people), and a reduced sense of accomplishment. The World Health Organisation classifies it as an occupational phenomenon. Studies show 77% of workers experience burnout symptoms at some point, costing US employers an estimated $125–$190 billion in healthcare spending annually.",
    faq: [
      {
        q: "What are the main signs of burnout vs normal work stress?",
        a: "Stress typically feels like too much — overwhelm, pressure, high engagement with a feeling of urgency. Burnout feels like too little — emptiness, detachment, chronic fatigue that sleep doesn't fix, and a sense that nothing you do matters. Physical symptoms of burnout include recurring headaches, frequent illness (immune suppression), insomnia or hypersomnia, and appetite changes. If you feel dread before work most days for weeks, that's burnout, not stress.",
      },
      {
        q: "How long does it take to recover from burnout?",
        a: "Mild burnout with immediate changes to workload and lifestyle: 4–12 weeks. Moderate burnout requiring significant life changes: 3–6 months. Severe burnout (full inability to work, physical symptoms): 6–24 months, often requiring professional support. The key variable is how quickly you reduce the chronic stressors — returning to the same environment without structural changes almost always leads to relapse.",
      },
      {
        q: "What are the most effective burnout recovery strategies?",
        a: "Evidence-based interventions include: (1) workload reduction — the only permanent fix if overwork is the cause; (2) regular sleep schedule and 7–9 hours of sleep; (3) physical exercise — shown to reduce emotional exhaustion scores by 20–30% in clinical studies; (4) setting clear work/personal time boundaries; (5) CBT-based therapy or coaching for cognitive reframing. Quick fixes like holidays help temporarily but rarely resolve structural causes.",
      },
    ],
  },

  "caffeine-half-life": {
    intro:
      "Caffeine has a half-life of 5–6 hours in healthy adults — meaning a 200mg coffee at 2pm leaves roughly 100mg active at 7pm and 50mg at midnight. That's equivalent to half a cup of coffee when you're trying to sleep. The table below maps how much caffeine remains in your system at different times post-consumption, using a 5.5-hour average half-life.",
    faq: [
      {
        q: "What is the half-life of caffeine and what affects it?",
        a: "The average half-life is 5–6 hours, but this varies significantly: pregnant women (18–20 hours due to reduced liver enzyme activity), newborns (65–130 hours — their livers can't metabolise it), smokers (3–4 hours — smoking induces CYP1A2 enzymes), people taking oral contraceptives (9–11 hours), and people with liver disease (up to 96 hours). Genetics also play a major role — CYP1A2 'fast metabolisers' may process caffeine in 3–4 hours.",
      },
      {
        q: "How many hours before bed should I stop drinking coffee?",
        a: "A landmark 2013 study (Drake et al.) found caffeine consumed 6 hours before bed reduced total sleep time by more than 1 hour, even when participants didn't feel more alert. The researchers recommend a caffeine curfew of at least 6 hours before your target sleep time — for most people, that means nothing after 2–3pm. Those sensitive to caffeine or with slow metabolism (see above) should cut off by noon.",
      },
      {
        q: "How much caffeine is in common drinks?",
        a: "Approximate caffeine content: drip coffee (12oz) = 140–200mg; espresso (1 shot) = 63mg; Red Bull (8.4oz) = 80mg; Monster Energy (16oz) = 160mg; black tea (8oz) = 40–70mg; green tea (8oz) = 25–45mg; Coca-Cola (12oz) = 34mg; decaf coffee (8oz) = 2–15mg (not zero). The FDA recommends no more than 400mg per day for healthy adults — roughly 3–4 standard coffees.",
      },
    ],
  },

  "calorie-deficit-calculator": {
    intro:
      "The often-cited rule is 3,500 calories = 1 pound of fat — meaning a 500 calorie/day deficit produces 1lb/week of weight loss. This is a useful approximation, but reality is more complex: as you lose weight, your TDEE drops, metabolic adaptation kicks in, and the same deficit produces less loss over time. The table below shows realistic expected fat loss at different deficit sizes, accounting for the fact that the body isn't a simple math equation.",
    faq: [
      {
        q: "What is a safe calorie deficit for weight loss without losing muscle?",
        a: "A deficit of 300–500 kcal/day (0.5–1lb/week loss rate) is the evidence-based sweet spot for preserving muscle mass. Deficits above 750–1,000 kcal/day accelerate muscle breakdown, lower testosterone and thyroid hormone levels, and trigger stronger metabolic adaptation — meaning you regain weight faster when you return to normal eating. Very-low-calorie diets (<800 kcal/day) should only be medically supervised.",
      },
      {
        q: "Why has my weight loss stopped even though I'm in a calorie deficit?",
        a: "Several mechanisms are at play: (1) metabolic adaptation — your BMR drops 10–15% after sustained deficits; (2) NEAT reduction — unconsciously moving less when under-fuelled; (3) measurement error — people underestimate food intake by 30–50% on average; (4) water retention masking fat loss — especially around menstruation or when starting resistance training. True plateaus (no loss for 3+ weeks at the same intake) usually require either a further 100–200 kcal reduction or a diet break to reset hormones.",
      },
      {
        q: "Is it better to create a calorie deficit through diet, exercise, or both?",
        a: "Both, but with different emphases: diet is more efficient for creating the deficit (exercise can be offset by hunger); exercise is essential for preserving muscle mass and improving metabolic rate long-term. Studies consistently show the most successful long-term weight loss involves both. A common split: aim for 70–80% of the deficit through dietary changes and 20–30% through added activity.",
      },
    ],
  },

  "car-affordability-calculator": {
    intro:
      "Car ownership is one of the most under-estimated budget items. The sticker price is just the beginning — finance charges, insurance, fuel, maintenance, and depreciation can push the true annual cost of an average new car to $12,000–$16,000. The table below shows total monthly cost of ownership (payment + insurance + fuel + maintenance) at different vehicle prices, because the payment is not the cost.",
    faq: [
      {
        q: "How much car can I afford based on my income?",
        a: "Two common rules: (1) The 20/4/10 rule — put 20% down, finance for no more than 4 years, keep total monthly vehicle costs under 10% of gross income. (2) The simpler 'car value = 35% of annual gross income' cap — so on a $60,000 salary, $21,000 is your ceiling. With the average new car price now exceeding $48,000, these rules push most buyers firmly into the used market.",
      },
      {
        q: "What is the 20/4/10 car buying rule?",
        a: "20% minimum down payment (reduces your loan balance and avoids being underwater immediately); 4-year maximum loan term (5–6 year loans are common but dramatically increase total interest paid and keep you in debt while the car depreciates); 10% of gross monthly income maximum on all vehicle costs combined — payment, insurance, fuel, and maintenance. This rule was designed when car prices were lower; many advisors now suggest using 15% as the ceiling.",
      },
      {
        q: "New car vs used car — which is the smarter financial choice?",
        a: "New cars depreciate 15–25% in the first year and 50–60% over five years. Buying a 2–3 year old certified pre-owned vehicle lets you avoid the steepest depreciation while still getting a recent model with warranty coverage. The financial break-even: a 3-year-old car of the same model typically costs 35–45% less than new, with the bulk of its reliable life ahead. Unless you value the latest tech highly, used is almost always the better financial decision.",
      },
    ],
  },

  "car-loan-calculator": {
    intro:
      "The average new car loan in the US is now $40,000+ at 7–9% APR over 69 months — meaning buyers pay $13,000–$16,000 in interest on top of the vehicle price. Longer loan terms lower monthly payments but dramatically increase total cost. The table below shows how total interest paid explodes as loan term extends, even on the same vehicle at the same rate.",
    faq: [
      {
        q: "How is a monthly car loan payment calculated?",
        a: "The formula is: M = P × [r(1+r)^n] ÷ [(1+r)^n − 1], where P = principal (loan amount), r = monthly interest rate (annual APR ÷ 12), n = number of monthly payments. Example: $30,000 at 7% APR over 60 months → r = 0.5833%, n = 60 → monthly payment = $594. Over 60 payments that's $35,640 total — $5,640 in interest.",
      },
      {
        q: "What APR should I expect on a car loan in 2025?",
        a: "With credit scores: 781+ (super prime) — 5.0–6.5%; 661–780 (prime) — 6.5–9.0%; 601–660 (near prime) — 10–14%; 501–600 (subprime) — 14–20%; 300–500 (deep subprime) — 20–29%. Getting pre-approved through a credit union or bank before visiting a dealership typically yields 1–2% lower rates than dealer financing. On a $35,000 loan, a 2% APR difference saves roughly $1,800 over 5 years.",
      },
      {
        q: "Does paying extra on a car loan save significant money?",
        a: "Yes, particularly in early months when more of each payment is interest. On a $35,000 loan at 7% over 60 months, paying an extra $100/month cuts the loan from 60 to 48 months and saves approximately $1,200 in interest. The highest-impact extra payments are in the first 12–18 months of the loan when the outstanding principal (and therefore interest accruing daily) is highest.",
      },
    ],
  },

  "child-support-calculator": {
    intro:
      "Child support in the US is calculated by state formula — not national law — and the amounts vary significantly between states. All states use one of three models: the Income Shares model (most common, 40 states), which splits costs proportionally to both parents' incomes; the Percentage of Income model (11 states), applied only to the non-custodial parent's income; or the Melson formula (3 states), which sets a self-support reserve before calculating support.",
    faq: [
      {
        q: "How is child support calculated in most US states?",
        a: "Under the Income Shares model: both parents' gross incomes are combined; the state's schedule determines the total child support obligation for that income level and number of children; each parent's share is proportional to their income contribution. Additional costs (health insurance, childcare, extraordinary medical expenses) are typically added on top and split the same way. Custody time often adjusts the base calculation — more parenting time for the paying parent usually reduces the obligation.",
      },
      {
        q: "What percentage of income goes to child support?",
        a: "Under percentage-of-income states (like Wisconsin and Texas), the standard guidelines are: 1 child = 20% of net income; 2 children = 25%; 3 children = 30%; 4 children = 35%; 5+ children = 40%. Under income shares states, the percentage varies by combined income — higher-income families pay a lower percentage of income but a higher absolute dollar amount. These are guidelines; courts can deviate based on specific circumstances.",
      },
      {
        q: "When can child support be modified?",
        a: "Child support can be reviewed and modified when there is a 'substantial change in circumstances' — typically defined as a change of 15–25% in the child support amount (varies by state). Triggering events include: significant income change for either parent, change in custody arrangement, child's changed needs (medical, educational), a parent becoming incapacitated, or the paying parent's unemployment. Orders should always be modified formally through the court — informal agreements are not enforceable.",
      },
    ],
  },

  "closing-cost-calculator": {
    intro:
      "Closing costs are the fees paid at the final stage of a real estate transaction — they cover the dozens of services required to legally transfer property ownership and fund your mortgage. For buyers, total closing costs run 2–5% of the loan amount. On a $400,000 purchase with 10% down ($360,000 loan), that's $7,200–$18,000 in cash required at the table, separate from your down payment.",
    faq: [
      {
        q: "What are the main closing costs for a home buyer?",
        a: "Lender fees: origination fee (0–1% of loan), underwriting fee ($500–$900), discount points (optional, 1 point = 1% of loan to lower rate). Third-party fees: appraisal ($400–$700), home inspection ($300–$600), title search and title insurance ($1,000–$3,000 depending on state), attorney fees where required ($500–$1,500). Prepaid items: homeowners insurance (1 year upfront), property tax escrow (2–6 months), prepaid interest (prorated from closing to month-end). Government fees: recording fees ($50–$200), transfer taxes (0–2% depending on state).",
      },
      {
        q: "Can closing costs be rolled into the mortgage?",
        a: "Not directly — lenders can't add closing costs to a purchase mortgage. However, a 'no-closing-cost mortgage' is an option: the lender covers upfront costs in exchange for a higher interest rate (typically 0.25–0.5% higher). This makes sense if you plan to sell or refinance within 3–5 years before the rate premium costs more than the upfront savings. Over a full 30-year loan, the higher rate will cost significantly more than paying closing costs upfront.",
      },
      {
        q: "Who pays closing costs — the buyer or the seller?",
        a: "Buyers typically pay 2–5% of the purchase price in closing costs. Sellers typically pay 6–10%, which includes real estate agent commissions (5–6%), transfer taxes, and any agreed seller concessions. In a buyer's market, it's common to negotiate 'seller concessions' — the seller credits 2–3% toward the buyer's closing costs, reducing the cash you need at closing without changing the purchase price.",
      },
    ],
  },

  "coast-fire-calculator": {
    intro:
      "Coast FIRE (Financial Independence, Retire Early) is the point at which your invested savings are large enough that compound growth alone — with no further contributions — will reach your full retirement target by your chosen retirement age. Once you hit your coast number, you only need to cover current living expenses, not save for the future. This unlocks career flexibility: lower-stress jobs, part-time work, or purpose-driven work become viable.",
    faq: [
      {
        q: "How do you calculate your Coast FIRE number?",
        a: "Your coast number = Target retirement portfolio ÷ (1 + real return rate)^years until retirement. If you need $1.5M at age 65 and you're 35 (30 years away) using 7% real returns: Coast number = $1,500,000 ÷ (1.07)^30 = $1,500,000 ÷ 7.61 = $197,108. Once you have $197k invested and never touch it, it will grow to ~$1.5M by age 65. Everything you earn after that only needs to cover current expenses.",
      },
      {
        q: "What is the difference between Coast FIRE and regular FIRE?",
        a: "Traditional FIRE requires accumulating 25× your annual expenses (the 4% rule) and then living off investment withdrawals indefinitely — this typically requires 10–20 years of aggressive saving at 50–70% savings rates. Coast FIRE requires a much smaller portfolio much sooner, after which you can significantly reduce your savings rate. The trade-off: you still need to earn income to cover living expenses until full retirement age, you just don't need to save aggressively.",
      },
      {
        q: "What investment return rate should I use for Coast FIRE calculations?",
        a: "Use 7% real (after-inflation) for long-term projections — this reflects the US stock market's historical average inflation-adjusted return. For more conservative planning, use 5–6% real. Avoid using nominal returns (10% historical S&P 500) for multi-decade projections because inflation erodes purchasing power significantly — $1.5M in 30 years buys less than $1.5M today. The 7% real figure already accounts for roughly 3% average inflation.",
      },
    ],
  },

  "commute-cost-calculator": {
    intro:
      "Commuting is one of the most significant hidden costs of employment — yet most salary negotiations ignore it entirely. The average American commuter drives 27 miles each way and spends $8,000–$12,000 per year on commuting costs once you factor in fuel, vehicle depreciation, insurance, parking, and tolls. In some metro areas, a low-salary job close to home pays more in real terms than a high-salary job with a long commute.",
    faq: [
      {
        q: "How do I calculate my true commuting cost per mile?",
        a: "The IRS standard mileage rate for 2025 is 70 cents per mile — this is designed to cover the all-in cost of driving (fuel, oil, tires, maintenance, depreciation, and insurance). A 30-mile round-trip commute × 250 working days = 7,500 miles/year × $0.70 = $5,250. Add parking ($1,200–$4,800/year in major cities), bridge/road tolls, and transit passes for total commuting cost. Many people pay $10,000–$15,000 annually without ever adding it up.",
      },
      {
        q: "How does commute time translate into a salary equivalent?",
        a: "Take your hourly wage, multiply by 50% (economists' standard value of leisure time), and multiply by your daily commute hours. A $50,000 salaried employee earns roughly $24/hr. A 1-hour daily commute costs: $24 × 0.5 × 2 hours × 250 days = $6,000/year in lost time value. Combined with the dollar cost, a long commute can represent 15–25% of gross salary — making a $5,000 raise at a closer job genuinely more valuable than a $10,000 raise at the distant one.",
      },
      {
        q: "Is working from home financially worth it compared to commuting?",
        a: "Studies consistently show remote workers save $4,000–$10,000+ annually. Stanford research found remote employees save an average of $11/day on transport and food alone. Additional savings: work clothing ($1,000–$2,000/year less), lunches out ($40–$80/week less), vehicle wear, and reduced need for a second car in two-income households. The financial case for remote work is compelling — employers offering it effectively offer a significant tax-free pay raise.",
      },
    ],
  },

  "commute-time-value": {
    intro:
      "Time is the only truly non-renewable resource. A 45-minute one-way commute consumes 375 hours per year — nearly 10 standard working weeks — that you will never get back. Economists value commute time at 50–75% of the traveller's wage rate. The table below converts daily commute lengths into annual time loss and its salary equivalent, to make the true cost visible before you accept a job or choose where to live.",
    faq: [
      {
        q: "How do economists calculate the value of commute time?",
        a: "Transport economists use a 'value of travel time savings' (VTTS) figure that typically ranges from 35–75% of the wage rate. The UK Department for Transport uses 53% of wage rate for commuting. In practice: if you earn $35/hr and commute 1 hour daily, economists value that time at $17.50/hr. Over 250 working days: $8,750/year in time value lost. This is not actual money paid — it's the economic cost of foregone leisure or productive time.",
      },
      {
        q: "How much time does the average American spend commuting per year?",
        a: "The US Census Bureau reports an average one-way commute of 27.6 minutes in 2023, meaning 55 minutes of daily commuting. Over 250 working days, that's 229 hours per year — nearly 9.5 full 24-hour days, or 5.7 standard 40-hour work weeks. New York City commuters average 42 minutes each way (350 hours/year). In heavily congested metros like LA, Atlanta, and Houston, the average easily exceeds 30–35 minutes.",
      },
      {
        q: "At what commute length does moving closer to work make financial sense?",
        a: "A useful rule of thumb: if your annual commuting costs (transport + time value) exceed the rent/mortgage premium to live closer, moving pays. Example: commuting costs $9,000/year from a suburb with $1,400/month rent. An apartment near work costs $1,900/month ($6,000/year more). The commute costs $9,000/year — moving saves $3,000 net plus the intangible benefit of 200+ hours of your life annually. Model your specific numbers; the answer often surprises people.",
      },
    ],
  },

  "credit-card-interest": {
    intro:
      "Credit card interest is calculated daily using the Daily Periodic Rate (DPR = APR ÷ 365). On a $5,000 balance at 22% APR, interest accrues at $3.01 every single day you carry a balance. Monthly interest isn't deducted once — it compounds continuously, which is why carrying a balance long-term is so costly. The table below shows monthly interest charges at common balances and APR ranges.",
    faq: [
      {
        q: "How is credit card interest calculated?",
        a: "Your lender calculates interest daily: Daily Periodic Rate (DPR) = APR ÷ 365. Each day, your average daily balance is multiplied by the DPR. These daily charges are summed across the billing cycle. On a $6,000 balance at 24% APR: DPR = 0.0657%; daily charge = $3.94; monthly charge ≈ $118–$120. Paying the full statement balance by the due date eliminates all interest — most cards have a 21–25 day grace period.",
      },
      {
        q: "What is the average credit card APR in 2025?",
        a: "The Federal Reserve reports the average credit card interest rate at 21.5–22.8% APR in 2025 — near historical highs. Rewards cards average 24–29%; store cards average 26–30%; secured cards 28–29.99%. Credit unions typically offer 10–18% APR. Balance transfer cards often offer 0% introductory APR for 12–21 months, with a 3–5% transfer fee. For comparison, mortgage rates are 6–7% and auto loan rates are 7–9%.",
      },
      {
        q: "What happens if I only make minimum payments?",
        a: "Minimum payments are typically 1–2% of the balance or $25–35, whichever is greater. On a $5,000 balance at 22% APR with a $100 minimum payment: it takes over 7 years to pay off and costs $3,800+ in interest — nearly doubling the original debt. Federal law requires credit card statements to show the 'minimum payment warning' — the payoff time and total cost assuming only minimums are paid. That box is worth reading.",
      },
    ],
  },

  "credit-card-payoff-calculator": {
    intro:
      "The math of credit card payoff is ruthless: minimum payments are engineered to maximise interest income for the lender, not to help you get out of debt quickly. On a $7,500 balance at 22% APR, the minimum payment barely outpaces monthly interest charges — you could be paying for 10+ years. The table below shows how dramatically increasing your payment changes the outcome.",
    faq: [
      {
        q: "What is the fastest strategy to pay off multiple credit cards?",
        a: "The avalanche method: list all balances by APR (highest first), pay minimums on all, and throw every extra dollar at the highest-rate card. Mathematically optimal — minimises total interest. The snowball method: list balances by amount (smallest first), eliminates cards faster for psychological wins. Research shows snowball produces better real-world compliance for people who struggle with motivation, even if it costs slightly more in interest. Choose based on your psychology, not just the math.",
      },
      {
        q: "Is a balance transfer worth it for credit card debt?",
        a: "Often yes — if you can pay off the transferred balance within the 0% promotional period (typically 12–21 months). A $6,000 balance at 22% APR costs $1,320/year in interest. A 0% balance transfer with a 3% fee ($180) and 15-month window saves over $1,100 net — but only if you don't add new charges to the old card and don't carry a balance past the promo period when rates typically jump to 25–29%.",
      },
      {
        q: "Should I pay off credit card debt before investing?",
        a: "If your credit card APR is above 10–12%, pay it off first — guaranteed 20%+ 'return' by eliminating that interest beats expected market returns. Exception: always capture your full employer 401k match first (it's an instant 50–100% return). After the match, redirect everything to high-interest debt before returning to broader investing. Once credit cards are clear, redirect that payment amount to investments.",
      },
    ],
  },

  "crypto-loss-calculator": {
    intro:
      "Cryptocurrency is treated as property by the IRS — every sale, trade, or exchange is a taxable event. A loss occurs when you sell for less than your cost basis (purchase price + fees). These losses aren't just painful — they're valuable: capital losses offset capital gains dollar-for-dollar, and up to $3,000 of net capital losses can offset ordinary income per year, with any excess carrying forward indefinitely.",
    faq: [
      {
        q: "How are cryptocurrency losses taxed in the US?",
        a: "Crypto losses are capital losses. Short-term losses (assets held under 1 year) offset short-term gains first, then long-term gains, then up to $3,000 of ordinary income. Long-term losses (assets held 1+ year) offset long-term gains first, then short-term gains, then up to $3,000 of ordinary income. If you have a $20,000 net capital loss in one year: $3,000 offsets income this year; $17,000 carries forward to future years with no expiration.",
      },
      {
        q: "What is crypto tax-loss harvesting and is it legal?",
        a: "Tax-loss harvesting means selling a crypto asset at a loss to realise the tax deduction, then potentially rebuying the same asset. Critically: the IRS wash-sale rule (which prevents repurchasing the same stock within 30 days to claim a loss) does not currently apply to cryptocurrency — crypto is classified as property, not a security. This means you can sell Bitcoin at a loss and immediately rebuy it, locking in the tax benefit while maintaining your position. This may change with future legislation.",
      },
      {
        q: "How do I calculate cost basis for crypto?",
        a: "Cost basis = purchase price + transaction fees for each unit acquired. When selling partial holdings, you must choose an accounting method: FIFO (first in, first out — often results in higher gains), LIFO (last in, first out), HIFO (highest in, first out — minimises gains, usually most tax-efficient in a down market), or Specific Identification (choose which lots to sell). You must consistently apply your chosen method and maintain records. Crypto tax software (Koinly, CoinTracker, TaxBit) automates this tracking.",
      },
    ],
  },

  "data-worth-calculator": {
    intro:
      "Your personal data is a commodity worth roughly $200–$400 per year to data brokers — more if you're in a high-income, high-purchasing-power demographic. Google generates approximately $250 per US user annually from advertising; Meta generates about $70 per US user. The total US personal data economy is valued at over $200 billion per year, and the consumer receives none of it directly.",
    faq: [
      {
        q: "How much is personal data worth to companies?",
        a: "It depends on the data type. Location data: $0.50–$1.50 per user per month to brokers. Purchase history: $3–$8/month. Health and financial data: $10–$40/month due to its value for insurance and lending decisions. Combined behavioural profiles (what you search, click, buy, and where you go) are worth $30–$80/month to targeted advertisers. In aggregate, these small per-user values create enormous revenue — Facebook made $116 per US user in 2024.",
      },
      {
        q: "What types of personal data are the most valuable?",
        a: "In descending value: (1) Financial data — income, assets, credit behaviour; (2) Health data — conditions, medications, insurance status; (3) Location data — home, work, routines, travel; (4) Purchase history — brand preferences, spending patterns; (5) Browsing and search history — intent signals; (6) Social graph — who you know and interact with; (7) Demographic data — age, gender, education. Marketers pay significant premiums for 'intent data' — signals that you're actively shopping for something.",
      },
      {
        q: "Can I actually sell my own data or opt out of data collection?",
        a: "You can sell data through platforms like Datacoup or Nielsen's Digital Voice panel (typically $5–$50/month for active participation). California residents have CCPA rights to opt out of data sales. GDPR gives EU residents the right to access, correct, and delete their data. Practically, opt-out requests must be submitted individually to each data broker — over 4,000 exist in the US. Services like DeleteMe ($129/year) automate removal requests, though coverage is incomplete.",
      },
    ],
  },

  "discount-calculator": {
    intro:
      "Discount calculations catch shoppers out in two ways: comparing across different original prices ('40% off $100 vs 30% off $120') and stacked discounts ('extra 20% off sale price'). Two sequential discounts do not add — a 30% off then 20% off is not 50% off; it's 44% off. The table below shows common discount percentages applied to typical retail price points so you can instantly evaluate any sale claim.",
    faq: [
      {
        q: "How do you calculate the price after a discount?",
        a: "Final price = original price × (1 − discount%). To save $45 on a $150 item with 30% off: $150 × (1 − 0.30) = $150 × 0.70 = $105. To find the savings amount alone: $150 × 0.30 = $45. Mental shortcut: for 25% off, divide by 4 and subtract. For 20% off, divide by 5 and subtract. For 10% off, move the decimal point one place left and subtract.",
      },
      {
        q: "How do you calculate the original price from a sale price?",
        a: "Original price = sale price ÷ (1 − discount%). If you paid $63 after 30% off: $63 ÷ 0.70 = $90 original price. This is useful when a store shows only the sale price. It's also how to fact-check inflated 'original prices' — if a $50 item is listed as '75% off original $200', that's suspicious; check whether the item was ever actually sold at $200 before the 'sale'.",
      },
      {
        q: "How do stacked or sequential discounts work?",
        a: "Stacked discounts multiply, they don't add. A 40% off sale with an extra 25% off coupon: you don't get 65% off. You get: 1 − (0.60 × 0.75) = 1 − 0.45 = 55% off total. On a $200 item: first 40% discount = $120; then 25% off $120 = $90. Total discount = $110 (55%), not $130 (65%). Retailers advertise 'extra off sale price' specifically because shoppers assume the discounts are additive.",
      },
    ],
  },

  "down-payment-countdown": {
    intro:
      "Saving for a down payment is the biggest single financial milestone for most first-time homebuyers — and the math is unforgiving. The median US home price is around $420,000. A 20% down payment is $84,000 — not counting $10,000–$20,000 in closing costs. At $1,500/month saved, that's nearly 5 years of saving before you can buy, assuming prices don't rise further. The table below shows how your monthly savings rate changes your timeline.",
    faq: [
      {
        q: "How much down payment do I actually need?",
        a: "Minimum requirements: FHA loan — 3.5% (credit score 580+) or 10% (score 500–579); Conventional loan — 3–5% for qualified buyers; VA and USDA loans — 0% down for eligible buyers. However, putting less than 20% down on a conventional loan triggers PMI (private mortgage insurance) at 0.5–1.5% of the loan amount annually — roughly $200–$500/month on a $350,000 loan. PMI is dropped once you reach 20% equity, but it can take years and adds significantly to total cost.",
      },
      {
        q: "Where is the best place to save a down payment?",
        a: "A high-yield savings account (HYSA) is optimal: paying 4–5% APY in 2025, FDIC insured, and fully accessible without penalty. Money market accounts offer similar rates with cheque-writing privileges. I-Bonds (inflation-adjusted, 4–5% current rate) work for timelines of 2+ years but have a 1-year lockup period and $10,000/year purchase limit. Avoid the stock market for money you need within 1–3 years — a 30% market drop at the wrong time could set your timeline back by years.",
      },
      {
        q: "Can I use my 401k or IRA for a down payment?",
        a: "IRA first-time homebuyer exception: withdraw up to $10,000 lifetime penalty-free (you still pay income tax on traditional IRA withdrawals). Roth IRA: withdraw contributions (not earnings) any time, tax and penalty-free. 401k hardship withdrawal: allowed but taxed as ordinary income plus 10% penalty if under 59½. 401k loan: borrow up to 50% of vested balance (max $50,000) and repay yourself with interest over 5 years — often the best option if 401k access is needed, as you avoid taxes and penalties.",
      },
    ],
  },

  "dream-salary-calculator": {
    intro:
      "Most people set income targets based on round numbers ($100k, $150k) rather than their actual cost structure. Your 'dream salary' should be the income that covers your genuine needs, funds your financial goals, and provides meaningful discretionary spending — without defaulting to lifestyle inflation. Research by Killingsworth (2021) found wellbeing continues rising with income past $75k, but the marginal benefit diminishes sharply above $100k–$120k depending on baseline happiness.",
    faq: [
      {
        q: "How much salary do I need to live comfortably in the US?",
        a: "It depends almost entirely on location. In rural Midwest states: $45,000–$55,000 covers a comfortable lifestyle. In mid-tier cities (Austin, Denver, Nashville): $65,000–$85,000. In high-cost metros (NYC, SF, LA, Seattle, Boston): $110,000–$150,000 for a modest comfortable life. The MIT Living Wage Calculator puts the living wage for a single adult in Manhattan at ~$75,000 and a family of 4 at ~$170,000. 'Comfortable' means housing under 30% of gross, no high-interest debt, and some discretionary spending.",
      },
      {
        q: "What salary do I need to qualify for a mortgage?",
        a: "Lenders use the 28/36 rule: housing costs ≤28% of gross monthly income; all monthly debt (housing + car + student loans + credit cards) ≤36%. For a $400,000 home purchase with 10% down on a 30-year mortgage at 7%: monthly P&I payment ≈ $2,393. Add taxes + insurance ≈ $700/month = $3,093 total. To stay within 28%, you need $3,093 ÷ 0.28 = $11,046/month gross = $132,500 salary minimum.",
      },
      {
        q: "What is the salary needed to max a 401k and still live well?",
        a: "The 2025 401k limit is $23,500/year. If you follow the 15% retirement savings recommendation, you need $23,500 ÷ 0.15 = $156,667 gross salary to max your 401k while keeping retirement savings at exactly 15% of income. At $80,000 salary: $23,500 is 29% of gross — aggressive but doable. At $60,000: 39% — too high to sustain alongside living expenses in most cities. A more practical approach: contribute enough for the full employer match, then increase by 1% each year.",
      },
    ],
  },

  "drip-calculator": {
    intro:
      "DRIP investing (Dividend Reinvestment Plan) uses dividend payments to automatically purchase additional shares instead of paying cash. It accelerates compounding by putting every dividend to work immediately — and most brokers offer DRIP at zero cost. A $10,000 investment in a stock with a 3% yield growing at 8%/year becomes roughly $74,000 in 20 years with dividends reinvested vs $46,000 without — an extra $28,000 from doing nothing beyond ticking a reinvestment box.",
    faq: [
      {
        q: "What is a DRIP and how does it work?",
        a: "A Dividend Reinvestment Plan automatically uses dividend payments to buy additional shares (often fractional shares) of the same stock or fund. When a company declares a dividend — say $0.50/share — instead of receiving cash, you receive additional shares at market price. Over time, this compounds your share count even without contributing more money. Most major brokers (Fidelity, Schwab, Vanguard) offer automatic DRIP at no fee for ETFs and individual stocks.",
      },
      {
        q: "What dividend yield is sustainable and which is a warning sign?",
        a: "2–4% dividend yield is typically sustainable for quality companies. 4–6% is achievable for REITs, utilities, and high-quality income stocks. Yields above 7–8% are often a 'dividend trap' — the high yield reflects a falling stock price (the denominator shrinks), and the dividend may be cut. Check the payout ratio (dividends ÷ earnings): sustainable is under 60% for most sectors; REITs can sustain higher ratios due to depreciation accounting. A 70%+ payout ratio with a 9% yield is a warning sign.",
      },
      {
        q: "Is it better to reinvest dividends or take the cash in retirement?",
        a: "During accumulation years: reinvest always — the compounding benefit is substantial (see intro). In retirement drawdown: taking dividends as cash is a simple, low-volatility withdrawal strategy — you spend income without selling shares. The optimal transition is gradual: shift from 100% reinvestment to partial reinvestment as you near retirement, then to full cash withdrawal when you need the income. Many retirees build a portfolio with enough dividend yield to cover living expenses without selling principal.",
      },
    ],
  },

  "emergency-fund-calculator": {
    intro:
      "An emergency fund is the foundation of every financial plan — not because it earns returns, but because its absence destroys them. Without one, a job loss, medical bill, or car repair forces you to sell investments at possibly the worst time or take on high-interest debt. The Federal Reserve reports 37% of Americans can't cover a $400 emergency with cash. The right emergency fund size depends on income stability, dependants, and how long your industry takes to find new work.",
    faq: [
      {
        q: "How many months of expenses should my emergency fund cover?",
        a: "3 months is the minimum baseline for people with stable salaried employment, dual income, and few dependants. 6 months is recommended for single-income households, people with dependants, or anyone in a volatile industry. 9–12 months is appropriate for self-employed individuals, freelancers, commissioned salespeople, or anyone whose skills are highly specialised and whose job market is thin. The months should be based on actual monthly expenses, not income — calculate your real spending, not your take-home pay.",
      },
      {
        q: "Where should I keep my emergency fund?",
        a: "A high-yield savings account (HYSA) at an online bank is the ideal vehicle in 2025: rates of 4–5% APY, FDIC insured up to $250,000, and accessible within 1–3 business days. Money market accounts offer similar rates with more liquidity. Avoid: regular checking accounts (too low yield), CDs with early withdrawal penalties (defeats the purpose), and stocks or ETFs (a 30–40% market drop in a recession is exactly when you'll need emergency funds most — after losing your job).",
      },
      {
        q: "Should I build my emergency fund before paying off debt?",
        a: "Yes — build at least $1,000–$2,000 as a starter emergency fund before aggressively attacking debt. Without any buffer, one unexpected expense sends you straight back to borrowing. The sequence: (1) $1,000 starter fund; (2) capture full 401k match; (3) pay off high-interest debt (>7% APR); (4) build full 3–6 month fund; (5) invest for long-term goals. This ordering optimises both psychological safety and mathematical return.",
      },
    ],
  },

  "ev-vs-gas": {
    intro:
      "Electric vehicles cost 2–4x less to fuel per mile than gasoline cars. The average US driver covers 15,000 miles/year and spends $2,000–$2,500 on gas. The equivalent EV costs $550–$900 in electricity at national average rates — a savings of $1,200–$1,800/year. But the total cost comparison includes purchase price premium, insurance, maintenance, depreciation, and the federal tax credit. The table below models total 5-year ownership cost across vehicle classes.",
    faq: [
      {
        q: "How much does it cost to charge an electric vehicle at home?",
        a: "Home charging cost per mile = (kWh per mile) × electricity rate. Most EVs use 3–4 miles per kWh. At the 2025 US average rate of 16.2¢/kWh: $0.04–$0.054 per mile. On 15,000 miles/year: $600–$810/year to 'fill up' — vs $2,000–$2,500 for a 30 MPG gas car at $3.50/gallon. Level 2 home charger installation costs $500–$1,500 but charges at 20–30 miles per hour (vs 3–5 mph for a standard outlet). DC fast charging at public stations runs 25–50¢/kWh — significantly higher.",
      },
      {
        q: "How long does it take for an EV to pay back its price premium?",
        a: "Most EVs carry a $3,000–$8,000 premium over comparable gas models. With fuel savings of $1,500/year and maintenance savings of $400–$800/year: annual cost advantage is $1,900–$2,300. Breakeven without incentives: 1.5–4 years. With the $7,500 federal tax credit (for qualifying vehicles and buyers under income thresholds): immediate reduction to the premium that can produce Day 1 savings. EVs also depreciate more predictably now that the market has matured.",
      },
      {
        q: "Are electric cars really cheaper to maintain?",
        a: "Yes, significantly. EVs eliminate: oil changes ($100–$200/year), spark plugs, timing belts, exhaust system repairs, and transmission service. Regenerative braking dramatically extends brake pad life — EV brake pads often last 100,000–150,000 miles vs 30,000–70,000 for gas cars. Consumer Reports data shows EVs cost an average of $0.031/mile to maintain vs $0.061/mile for gas vehicles — roughly half. Over 200,000 miles, this represents $6,000 in maintenance savings.",
      },
    ],
  },

  "expense-split-calculator": {
    intro:
      "Shared expenses are one of the most common sources of financial tension in roommate and partnership situations. The problem isn't the money — it's the ambiguity. Whether you split equally or by income, consistency and transparency prevent resentment better than any particular formula. The table shows what a proportional-by-income split looks like vs an equal split for a $3,000/month shared expense budget at different income ratios.",
    faq: [
      {
        q: "Should roommates split expenses equally or by income?",
        a: "Equal splitting is simpler and works when incomes are within 20–30% of each other. Proportional-by-income splitting is fairer when one person earns significantly more. Formula for proportional split: your share % = your income ÷ combined income. For a couple earning $60,000 and $90,000 ($150,000 combined): lower earner pays 40% ($1,200 of $3,000), higher earner pays 60% ($1,800). Either method works — the key is agreeing upfront and sticking to it consistently.",
      },
      {
        q: "Which shared expenses should always be split, and which kept separate?",
        a: "Always split: rent/mortgage, utilities (electric, gas, water, internet), shared household supplies (toilet paper, cleaning products, common area items), and recurring shared services (streaming, shared subscriptions). Keep separate: individual groceries unless you truly share all meals, personal care items, individual clothing, personal subscriptions, and individual transportation. The cleaner the boundary between shared and personal expenses, the less friction arises.",
      },
      {
        q: "What is the best way to track and settle shared expenses?",
        a: "Splitwise is the most popular free option — tracks who paid what, calculates net balances, and sends reminders. Honeydue is designed for couples and integrates with bank accounts. For simplicity, a shared Google Sheet updated after every expense works well for organised people. Settlement method matters too: settling monthly in a single transfer is cleaner than settling every transaction — it reduces friction and makes the financial relationship predictable.",
      },
    ],
  },

  "fire-calculator": {
    intro:
      "The FIRE number is simple: annual expenses × 25. This comes from the 4% safe withdrawal rate — the annual percentage you can withdraw from a diversified portfolio indefinitely, based on the Trinity Study's analysis of every historical 30-year market window since 1926. The challenging part isn't the formula — it's accurately knowing your real annual expenses, and building a savings rate high enough to reach the number in a reasonable timeframe.",
    faq: [
      {
        q: "What is the 4% rule and is it still valid?",
        a: "The 4% rule states you can withdraw 4% of your portfolio in year 1 of retirement and adjust for inflation each subsequent year, with a high probability of not running out of money over a 30-year period. The original Trinity Study showed 96% success across all historical 30-year windows. For early retirees with 40–50 year timelines, many FIRE practitioners use 3–3.5% to increase safety margins. Some argue current valuations and lower expected returns justify 3.5% as the new baseline.",
      },
      {
        q: "How do you calculate your FIRE number?",
        a: "Step 1: Calculate your true annual expenses (track actual spending for 3–6 months — include irregular costs like car replacement, home repairs, and healthcare averaged annually). Step 2: Multiply by 25 (for 4% withdrawal rate) or 33 (for 3% rate). Step 3: Add a buffer for pre-Medicare healthcare, which costs $400–$800/month until age 65 for a healthy adult without employer coverage. Commonly missed expenses: long-term care, car replacement, home major repairs, and the fact that healthcare costs accelerate in later retirement years.",
      },
      {
        q: "What is the difference between lean FIRE, regular FIRE, and fat FIRE?",
        a: "Lean FIRE: retire on $25,000–$40,000/year — requires $625k–$1M. Usually involves frugal living, geographic arbitrage (lower cost-of-living location), or both. Regular FIRE: $40,000–$80,000/year — $1M–$2M portfolio. The most common target for median earners. Fat FIRE: $100,000+/year in retirement — requires $2.5M+. Barista FIRE: a hybrid — retire from full-time work but do part-time or enjoyable work to cover basic expenses, letting investments grow. Coast FIRE: save enough early that compound growth alone reaches the FIRE number — no further contributions needed.",
      },
    ],
  },

  "flooring-cost-calculator": {
    intro:
      "Flooring costs have three components most people underestimate: materials (what you see quoted online), installation labour ($1.50–$5/sq ft depending on material and subfloor), and subfloor preparation ($0.50–$3/sq ft for levelling, patching, or moisture barriers). The total installed cost is typically 40–80% higher than the material price alone. The table below shows all-in costs per square foot for the most common flooring types installed by a professional.",
    faq: [
      {
        q: "What is the cheapest flooring option that still looks good?",
        a: "Luxury Vinyl Plank (LVP) offers the best value — $2–$5/sq ft installed, waterproof, scratch-resistant, and available in highly realistic wood and stone appearances. For a 500 sq ft room: $1,000–$2,500 all-in vs $6,000–$10,000 for solid hardwood. LVP suits kitchens, bathrooms, basements, and households with pets and children. Laminate is similar ($1.50–$4/sq ft installed) but not waterproof. Sheet vinyl is the cheapest at $1–$3/sq ft but shows seams and dents more easily.",
      },
      {
        q: "How much does hardwood flooring cost to install?",
        a: "Solid hardwood: $6–$14/sq ft for materials; $3–$6/sq ft for installation; $1–$3/sq ft subfloor prep = $10–$23/sq ft total installed. A 500 sq ft living room: $5,000–$11,500. Engineered hardwood (real wood veneer over plywood core) costs $4–$9/sq ft for materials; $2–$5 installation = $6–$14/sq ft total. Engineered is more dimensionally stable (resists moisture warping) and can be installed over radiant heat — solid hardwood cannot. Both options add resale value; real estate studies show hardwood returns 70–80% of cost at sale.",
      },
      {
        q: "How do I calculate how much flooring I need?",
        a: "Measure each room's length × width in feet to get square footage. Add rooms together for total square footage. Add overage for waste: 10% for straight-lay rectangular rooms; 15% for diagonal or herringbone installation; 15–20% for rooms with lots of angles, cut-outs, or obstructions. Buy all material from the same dye lot — flooring batches vary slightly in colour and texture. Order 5–10% extra beyond the waste calculation to have matching material for future repairs.",
      },
    ],
  },

  "freelance-rate-calculator": {
    intro:
      "Most new freelancers set their rate by looking at what others charge — and immediately underprice. The correct starting point is your own cost structure: what do you need to earn to cover taxes, benefits, business expenses, non-billable time, and income gaps between projects? Your freelance rate must cover everything an employer normally handles invisibly. A freelancer billing $75/hr is often netting less than a salaried employee at $55k/year.",
    faq: [
      {
        q: "How do I calculate my minimum viable freelance hourly rate?",
        a: "Formula: (Annual income target + business expenses + benefits + taxes) ÷ annual billable hours. Example: target $70,000 net; self-employment tax 15.3% = $10,710; health insurance $5,400/year; business expenses $3,000; total needed = $89,110. Billable hours: 1,760 work hours minus 30% non-billable time (admin, marketing, unbilled) = 1,232 billable hours. Minimum rate = $89,110 ÷ 1,232 = $72/hr just to break even. Most freelancers underestimate both non-billable time and taxes.",
      },
      {
        q: "Should I charge by the hour or by the project?",
        a: "Project pricing is generally better for experienced freelancers: clients focus on value rather than clock-watching; you're rewarded for efficiency (completing work faster doesn't reduce your income); scope is clearer; and you can set milestone payments. Hourly pricing works for open-ended retainer work, consulting where scope changes frequently, or for new client relationships where you're still learning their requirements. Never price a new project type hourly until you've completed it once and know the true time involved.",
      },
      {
        q: "How do self-employment taxes work for freelancers?",
        a: "Freelancers pay self-employment tax of 15.3% on net self-employment income (up to $176,100 in 2025) — this covers both the employee AND employer portions of Social Security and Medicare. On top of this, you pay regular income tax. Mitigation: you can deduct half of SE tax from gross income. Establish a pass-through S-Corp when annual profit exceeds $40,000–$50,000 to reduce SE tax by paying yourself a reasonable salary and taking additional profit as distributions (not subject to SE tax).",
      },
    ],
  },

  "future-value-calculator": {
    intro:
      "Future value answers 'what will my money be worth later?' — and it works in two directions. For investments, it shows how wealth grows through compound returns. For purchasing power, it shows how inflation erodes it. $10,000 invested at 7% for 30 years becomes $76,123. That same $10,000 with 3% inflation has the purchasing power of only $4,120 in 30 years. The two calculations together tell the complete story of real (inflation-adjusted) growth.",
    faq: [
      {
        q: "What is the future value formula for a lump sum and regular contributions?",
        a: "Lump sum: FV = PV × (1 + r)^n, where r = periodic rate, n = periods. Regular contributions (annuity): FV = PMT × [(1+r)^n − 1] ÷ r. Combined: add both results. Example — $5,000 lump sum + $200/month at 7% annual (0.583%/mo) for 20 years: lump sum FV = $5,000 × (1.07)^20 = $19,348; annuity FV = $200 × [(1.00583)^240 − 1] ÷ 0.00583 = $52,397; total = $71,745.",
      },
      {
        q: "What is the difference between nominal and real future value?",
        a: "Nominal future value uses the stated interest rate without adjusting for inflation. Real future value adjusts for inflation using the Fisher equation: real rate = (1 + nominal rate) ÷ (1 + inflation rate) − 1. At 7% nominal return and 3% inflation: real rate = (1.07 ÷ 1.03) − 1 = 3.88%. Always use real rates when comparing future dollars to today's purchasing power — a nominal $500,000 in 30 years only buys what $206,000 buys today at 3% inflation.",
      },
      {
        q: "How does compounding frequency affect future value?",
        a: "More frequent compounding slightly increases future value. At 7% annual rate on $10,000 over 20 years: annually = $38,697; quarterly = $39,281; monthly = $40,064; daily = $40,103. The difference between annual and daily compounding is about $1,400 on $10,000 over 20 years — meaningful but smaller than most people expect. Far more impactful: the rate of return (difference between 5% and 7% on $10,000 over 20 years is $11,700) and time horizon.",
      },
    ],
  },

  "gambling-loss-calculator": {
    intro:
      "Every casino game has a mathematical house edge that guarantees the house profits over large numbers of bets. Blackjack with basic strategy (0.5% edge) is the best odds; American roulette (5.26%), slots (2–15%), and keno (20–29%) are the worst. The table below shows expected loss per hour at common bet sizes across different house edge levels — understanding expected value turns 'luck' into a calculable cost.",
    faq: [
      {
        q: "How does the house edge work mathematically?",
        a: "The house edge is the average percentage of each bet the casino keeps over time. On American roulette with 38 pockets (1–36, 0, 00): a $1 bet on red has 18/38 probability of winning $1 and 20/38 of losing $1. Expected value = (18/38 × $1) − (20/38 × $1) = −$0.053 per bet. The house keeps 5.26 cents on every dollar wagered, on average. Over 500 spins at $5/spin: expected loss = 500 × $5 × 0.0526 = $131.50. Actual results vary — expected loss is a long-run average.",
      },
      {
        q: "Are gambling losses tax deductible in the US?",
        a: "Yes, but only to the extent of gambling winnings and only if you itemize deductions. If you won $4,000 and lost $7,000 in a year: you can deduct $4,000 in losses (offsetting your $4,000 in winnings, resulting in $0 net gambling income). The remaining $3,000 in losses cannot be deducted against ordinary income. You must keep a detailed log of wins and losses (date, location, type of game, amounts) — the IRS can audit gambling records. W-2G forms are issued for wins over $1,200 (slots), $1,500 (keno), and $5,000 (poker tournaments).",
      },
      {
        q: "What games have the best and worst odds in a casino?",
        a: "Best odds (lowest house edge): Blackjack with basic strategy (0.5%); Baccarat on banker bet (1.06%); Craps on pass line (1.41%); Video poker with optimal strategy (0.5–3%). Worst odds: Keno (20–29%); Wheel of Fortune / Big Six (11–24%); Slot machines (2–15%, averaging around 8%); Scratch cards (30–40% of revenue goes to state/operator). Even the best table games have a negative expected value for the player — the casino is not a wealth-building tool.",
      },
    ],
  },

  "global-wealth-percentile": {
    intro:
      "Global wealth is distributed with extreme inequality. The richest 1% of adults globally hold 47% of total world wealth; the top 10% hold 85%. The entry threshold to the global top 10% is approximately $93,000 in net worth — a number many middle-class Americans and Europeans reach without considering themselves wealthy. Understanding where you stand globally reframes financial perspective: median US household net worth (~$192,700) is within the global top 5%.",
    faq: [
      {
        q: "How much net worth puts you in the global top 1%?",
        a: "According to the Credit Suisse Global Wealth Report (2024), the threshold for the global top 1% is approximately $1.1 million in net worth. Top 10%: ~$93,000. Top 50% (above global median): ~$8,600. These figures represent total net assets — assets minus liabilities. A US homeowner with $300,000 in home equity, $150,000 in retirement accounts, and $50,000 in debts has a net worth of $500,000 — placing them in approximately the global top 2%.",
      },
      {
        q: "Why is there such extreme global wealth inequality?",
        a: "Wealth inequality compounds itself: returns on capital (stocks, real estate, businesses) outpace wage growth, as documented by Thomas Piketty's r > g framework. Other factors: unequal access to education and credit; inheritance and intergenerational transfer (30–40% of wealth in wealthy nations is inherited); geographic wage differences (a software engineer earns 50x more in the US than in many developing countries for equivalent skills); and the absence of formal property rights and functioning capital markets in lower-income countries.",
      },
      {
        q: "Does living in a wealthy country mean you're globally wealthy?",
        a: "Partially — it depends on local cost of living. A person with $100,000 net worth in the US is globally wealthy by asset measure, but US living costs mean that $100,000 provides less security than the same amount in Vietnam or Colombia. Purchasing power parity (PPP) adjustments change the picture: $50,000 in rural India buys what $200,000+ buys in Manhattan. For financial planning purposes, your local cost structure matters — global rankings are most useful for perspective, not planning.",
      },
    ],
  },

  "gpa-calculator": {
    intro:
      "GPA (Grade Point Average) converts letter grades to a numeric scale and averages them weighted by credit hours. A single failing grade has an asymmetric negative impact early in your academic career — when you have fewer total credits, each grade carries more weight. The table below shows how much a single grade in a 3-credit course changes your cumulative GPA from different starting points.",
    faq: [
      {
        q: "How is GPA calculated step by step?",
        a: "1. Convert each grade to grade points (standard scale: A=4.0, A−=3.7, B+=3.3, B=3.0, B−=2.7, C+=2.3, C=2.0, D=1.0, F=0). 2. Multiply each course's grade points by its credit hours to get 'quality points'. 3. Sum all quality points across all courses. 4. Divide by total credit hours attempted. Example: English (3cr, B=3.0) = 9 quality points; Chemistry (4cr, A=4.0) = 16 quality points; History (3cr, C=2.0) = 6 quality points. Total: 31 quality points ÷ 10 credits = 3.10 GPA.",
      },
      {
        q: "What is the difference between weighted and unweighted GPA?",
        a: "Unweighted GPA uses a standard 4.0 scale regardless of course difficulty. Weighted GPA gives bonus points for advanced courses: Honors +0.5, AP/IB +1.0 in many systems (so an A in AP = 5.0). Weighted GPA can exceed 4.0. Most colleges recalculate applicant GPAs on their own scale when reviewing applications, so the weighted vs unweighted distinction primarily affects class rank and scholarship eligibility at the high school level. For college applications, admissions offices focus on course rigor alongside grades.",
      },
      {
        q: "How much does one bad grade affect your GPA?",
        a: "It depends heavily on how many total credits you've completed. With only 12 credits completed, one F in a 3-credit course drops a 3.5 GPA to approximately 2.9 — a 0.6 drop. With 60 credits completed, the same F drops a 3.5 GPA to approximately 3.35 — only a 0.15 drop. This is why grade recovery is more impactful early: replacing a D with an A in a 3-credit course adds 9 quality points, which has larger leverage on a smaller credit base. Grade forgiveness or repeat policies vary by institution.",
      },
    ],
  },

  "grocery-unit-price": {
    intro:
      "Unit price comparison is the most reliable tool for identifying genuine grocery value — and most shoppers skip it. The bulk size isn't always cheaper per unit; store brands are almost always cheaper than name brands for identical products; and sale prices on smaller sizes sometimes beat the per-unit cost of the larger 'value' size. The table below applies unit price math to common grocery categories so you can immediately spot the better buy.",
    faq: [
      {
        q: "How do you calculate unit price?",
        a: "Unit price = total price ÷ quantity (weight, volume, or count). A 32oz jar of peanut butter for $5.12 = $0.16/oz. A 16oz jar for $2.72 = $0.17/oz — the larger jar is cheaper per ounce. A 48oz jar for $7.20 = $0.15/oz — even better. Most US states require retailers to display shelf unit prices (usually per oz, per lb, or per count). Look for the small text below the retail price tag. Bring a phone calculator for items without unit price labels.",
      },
      {
        q: "When is buying in bulk NOT the better deal?",
        a: "Bulk is a poor value when: (1) you won't use it before it expires — spoilage erases the savings; (2) the smaller size is on sale and temporarily cheaper per unit; (3) storage space is limited and costs real money (Manhattan apartments); (4) the item is perishable and you live alone (buying bulk salad greens or berries often leads to waste). The rule: only buy in bulk what you reliably consume. Track how often you throw away bulk purchases — the true cost may surprise you.",
      },
      {
        q: "Are store brands really the same quality as name brands?",
        a: "For most shelf-stable grocery items, yes. Store brands are often made by the same manufacturers as name brands on the same production lines — only the label changes. Consumer Reports found store brands equivalent in quality to national brands in over 80% of product categories tested. Categories where the gap is real: OTC medications (same active ingredients, always buy generic), cleaning supplies (same chemistry, often identical formulas), and pantry staples. Categories where brand quality varies more: fresh produce and meat (supply chain differs), specialty items, and products where a proprietary process matters.",
      },
    ],
  },

  "heart-rate-zone-calculator": {
    intro:
      "Heart rate zones divide exercise intensity into five bands based on a percentage of your maximum heart rate. Each zone produces distinct physiological adaptations: Zone 2 builds aerobic base and fat oxidation; Zone 4–5 improves VO2 max and lactate threshold. Most recreational athletes train at Zone 3 (the 'moderate muddle') — hard enough to feel tired, not hard enough to produce the adaptations of Zone 2 or Zone 4–5. Knowing your zones makes training purposeful.",
    faq: [
      {
        q: "How do you calculate your five heart rate training zones?",
        a: "First, estimate maximum heart rate. The standard formula is 220 − age (e.g., 35-year-old: 185 bpm). Then apply zone percentages: Zone 1 (recovery): 50–60% = 93–111 bpm; Zone 2 (aerobic base/fat burn): 60–70% = 111–130 bpm; Zone 3 (aerobic endurance): 70–80% = 130–148 bpm; Zone 4 (lactate threshold): 80–90% = 148–167 bpm; Zone 5 (VO2 max): 90–100% = 167–185 bpm. For precision, use a field test (e.g., 20-minute all-out effort, take 95% of average heart rate as lactate threshold) rather than the age formula.",
      },
      {
        q: "How accurate is the '220 minus age' max heart rate formula?",
        a: "The formula has a standard deviation of ±10–12 bpm — meaning for any given person, their true max HR is within ±10–12 bpm of the estimate roughly 68% of the time. It was derived from a small dataset and was never intended as a precise individual predictor. The Tanaka formula (208 − 0.7 × age) is slightly more accurate for adults over 40. For serious training, do a field test: after a 15-minute warm-up, run or cycle at maximum effort for 3–5 minutes — peak HR during this effort is your functional max.",
      },
      {
        q: "What heart rate zone is best for weight loss?",
        a: "Zone 2 burns the highest percentage of calories from fat (~65% fat vs 35% carbohydrate). At higher zones, the proportion of fat burned drops but total calorie burn per minute rises. In practice, total calories burned per session matters most for weight loss — not fat-to-carb ratio. Zone 2 enables longer sessions (60–90+ minutes) that burn more total calories. Zone 4–5 intervals create excess post-exercise oxygen consumption (EPOC), elevating calorie burn for hours after exercise. For weight loss, combining Zone 2 long sessions with 1–2 Zone 4–5 interval sessions per week is most effective.",
      },
    ],
  },

  "compound-interest-calculator": {
    intro:
      "Compound interest is the process of earning returns on your returns — not just on your original principal. Einstein allegedly called it 'the eighth wonder of the world,' and while the attribution is disputed, the mathematics are not: $10,000 growing at 7% for 40 years becomes $149,745 without a single additional contribution. The table below shows how dramatically time horizon and rate changes compound outcomes, which is why starting 10 years earlier matters more than the rate you earn.",
    faq: [
      {
        q: "What is the compound interest formula?",
        a: "A = P(1 + r/n)^(nt), where A = final amount, P = principal, r = annual interest rate (decimal), n = compounding periods per year, t = time in years. For daily compounding at 7% over 20 years on $5,000: A = 5000 × (1 + 0.07/365)^(365×20) = $20,096. For annual compounding: A = 5000 × (1.07)^20 = $19,348. Daily compounding adds about $748 over 20 years compared to annual — the difference is real but smaller than many expect.",
      },
      {
        q: "How long does it take money to double with compound interest?",
        a: "The Rule of 72: divide 72 by the annual interest rate to get approximate doubling time in years. At 6%: 72 ÷ 6 = 12 years. At 7%: ~10.3 years. At 10%: 7.2 years. At 1% (savings account): 72 years. This is why keeping $20,000 in a 1% savings account instead of a 7% index fund costs you one full doubling cycle — roughly $20,000 in opportunity cost over 10 years.",
      },
      {
        q: "How often does compound interest compound — and does it matter?",
        a: "Common compounding frequencies: daily (365x/year), monthly (12x), quarterly (4x), semi-annually (2x), annually (1x). The difference between annual and daily compounding on a $10,000 investment at 7% over 30 years is $10,248 ($76,123 vs $86,371). For most long-term investments, the compounding frequency matters less than: (1) the rate of return and (2) how long you stay invested. Picking a fund with 0.1% lower fees matters more than compounding frequency.",
      },
    ],
  },


  "home-equity-calculator": {
    intro:
      "Home equity is the portion of your home you actually own: current market value minus your outstanding mortgage balance. The average US homeowner held $311,000 in equity as of 2025 — a record high driven by post-pandemic price appreciation. Equity is illiquid until you access it through a sale, cash-out refinance, HELOC, or home equity loan, so knowing your number matters for financial planning and major decisions.",
    faq: [
      {
        q: "How do I calculate my home equity?",
        a: "Home equity = current market value − outstanding mortgage balance(s). If your home is worth $420,000 and you owe $280,000, your equity is $140,000 (33%). Equity percentage = equity ÷ market value × 100. You need at least 20% equity (80% LTV) to avoid PMI on a refinance, and at least 15–20% remaining after borrowing to qualify for a HELOC. Your lender will order an appraisal — online estimates (Zillow, Redfin) are useful starting points but can be off by 5–10%.",
      },
      {
        q: "What can I use home equity for, and which uses are smart?",
        a: "Common uses: home improvements (ROI-positive — kitchens, bathrooms, and energy upgrades return 60–80% at sale); debt consolidation (credit card debt at 22% APR → HELOC at 8–10% APR saves thousands); education funding; down payment on investment property. Poor uses: vacations, consumer purchases, or anything that adds liability without building assets. Using a HELOC for discretionary spending converts unsecured debt into debt secured by your home — defaulting means foreclosure.",
      },
      {
        q: "How much equity do I need to get a HELOC?",
        a: "Most HELOC lenders require your combined loan-to-value ratio (CLTV = all loans ÷ home value) to stay at or below 80–85% after borrowing. With a $420,000 home and $280,000 mortgage (67% LTV), you could borrow up to $76,000 on a HELOC (to reach 85% CLTV). Minimum credit score: 620 for most lenders; 700+ for the best rates. HELOCs have variable rates (prime + margin) — currently 8–10.5% in 2025. A home equity loan offers a fixed rate but less flexibility.",
      },
    ],
  },

  "hourly-to-salary-calculator": {
    intro:
      "The standard conversion is hourly rate × 2,080 hours (40hrs/week × 52 weeks) = annual salary. But the true comparison between hourly and salaried work requires factoring in overtime eligibility, benefits value, PTO, and job security. A $25/hour hourly worker working 10 hours/week overtime at 1.5x earns $75,400/year — significantly more than the $52,000 base conversion implies.",
    faq: [
      {
        q: "How do you convert an hourly wage to annual salary?",
        a: "Full-time (40hr/week): hourly × 2,080 = annual. Part-time variants: 20hr/week × 52 = 1,040 hours; 30hr/week = 1,560 hours. Quick mental math: double the hourly rate and add three zeros — $28/hr ≈ $56,000/year. More precisely: $28 × 2,080 = $58,240. For biweekly payroll: hourly × 80 hours = gross pay per pay period. Note these are pre-tax gross figures — take-home pay is typically 70–80% of gross depending on tax bracket and deductions.",
      },
      {
        q: "Is it better to be paid hourly or salaried?",
        a: "Hourly: you're entitled to 1.5× overtime for hours over 40/week under FLSA (if non-exempt). Better for variable schedules. Salaried exempt: no overtime regardless of hours worked — common in corporate and professional roles. Better for stable hours. If you regularly work 45+ hours/week, hourly often pays more. If you work under 40 hours in a slow week, salary guarantees full pay. Salaried roles typically offer better benefits and advancement opportunities, but this isn't universal.",
      },
      {
        q: "How do you account for unpaid time when comparing hourly vs salary?",
        a: "Salaried employees typically receive 10–15 PTO days + 10 federal holidays = 20–25 paid days off/year. Hourly workers are only paid for hours actually worked in most cases (except where company policy includes paid leave). To compare fairly: effective hourly rate for salaried = annual salary ÷ actual hours worked including unpaid overtime. A $60,000/year salaried employee working 50hr/week: effective rate = $60,000 ÷ 2,600hrs = $23.08/hr — lower than their nominal $28.85/hr equivalent.",
      },
    ],
  },

  "hourly-to-salary-calculator-uk": {
    intro:
      "The standard UK full-time week is 37.5–40 hours. Annual salary = hourly rate × weekly hours × 52. The National Living Wage rose to £12.21/hour for workers aged 21+ from April 2025, equating to £23,810/year at 37.5 hours — a 6.7% increase from 2024. National Insurance and income tax then reduce this: a £24,000 gross salary takes home approximately £20,100 after tax (2025/26 tax year).",
    faq: [
      {
        q: "How do you convert hourly to annual salary in the UK?",
        a: "Annual salary = hourly rate × weekly hours × 52. For 37.5-hour week: £15/hr × 37.5 × 52 = £29,250. For 40-hour week: £15 × 40 × 52 = £31,200. Monthly gross = annual ÷ 12. To estimate take-home pay: subtract income tax (20% on earnings above the £12,570 personal allowance) and employee National Insurance (8% between £12,570 and £50,270 from 2024/25). A £29,250 gross salary takes home approximately £23,400/year (£1,950/month) in 2025/26.",
      },
      {
        q: "What is the UK National Living Wage and National Minimum Wage in 2025?",
        a: "From April 2025: National Living Wage (21+): £12.21/hour. National Minimum Wage (18–20): £10.00/hour. Apprentice/under 18: £7.55/hour. The NLW of £12.21 × 37.5hr × 52 = £23,810 gross/year. After income tax and National Insurance: approximately £19,900 take-home. London's high cost of living means even NLW full-time workers struggle — London Living Wage (voluntary) is set at £13.85/hour for 2024/25.",
      },
      {
        q: "How does UK National Insurance affect take-home pay?",
        a: "Employee NI contributions (Class 1) in 2025/26: 8% on earnings between £12,570 and £50,270/year (reduced from 12% in 2023 after successive NI cuts). 2% above £50,270. Employer NI: 15% on earnings above £96/week (from April 2025 — increased from 13.8%). Example at £35,000 gross: NI = 8% × (£35,000 − £12,570) = 8% × £22,430 = £1,794/year. Income tax = 20% × £22,430 = £4,486. Total deductions = £6,280. Take-home = £28,720.",
      },
    ],
  },

  "house-affordability-calculator": {
    intro:
      "Lenders use two key ratios to decide how much house you can afford: the front-end ratio (housing costs ≤28% of gross monthly income) and the back-end ratio (all debts ≤36–43% of gross). At today's 7% mortgage rates, every $100,000 of loan costs approximately $665/month in principal and interest — meaning a $350,000 loan requires $2,328/month before taxes and insurance. The table shows required income at different home prices and down payment levels.",
    faq: [
      {
        q: "How much house can I afford on my income?",
        a: "Quick estimate: multiply gross annual income by 3–4x for a conservative purchase price, or up to 5x with strong credit and low debt. At $80,000/year: $240,000–$400,000 purchase range. More precisely: maximum monthly housing payment = gross monthly income × 0.28. At $80,000/year ($6,667/month): max housing = $1,867/month. At 7% for 30 years with $800/month in taxes and insurance: that supports approximately a $240,000 mortgage — or $267,000 home with 10% down.",
      },
      {
        q: "How does existing debt reduce how much mortgage I qualify for?",
        a: "Lenders use the back-end DTI (all monthly debts ÷ gross income ≤43%). Every $500/month in existing debt (car payment, student loans, credit cards) reduces your maximum mortgage by approximately $70,000–$80,000. Example: $80,000/year income, $400 car payment, $200 student loan = $600/month in existing debt. Remaining DTI headroom: ($6,667 × 0.43) − $600 = $2,267/month for housing. At 7% 30-year: supports approximately $285,000 mortgage.",
      },
      {
        q: "What hidden costs should I budget for beyond the mortgage payment?",
        a: "PITI is the full payment: Principal + Interest + Taxes + Insurance. But homeownership adds more: PMI (if less than 20% down): $100–$300/month until 80% LTV. HOA fees: $200–$800/month in managed communities. Maintenance: budget 1% of home value annually ($3,500/year on a $350,000 home) — this is conservative; older homes often require 1.5–2%. Utilities typically increase vs renting (larger space, no landlord subsidies). Furnishing: first-time buyers often spend $10,000–$30,000 furnishing a new home.",
      },
    ],
  },

  "inflation-calculator": {
    intro:
      "Inflation is the gradual loss of purchasing power — the same number of dollars buys fewer goods and services over time. At the Fed's 2% target rate, prices double every 36 years. The US experienced its highest inflation since 1982 in June 2022 (9.1% CPI), meaning $1,000 at the start of 2020 had the purchasing power of only $861 by mid-2022. The table below maps how different inflation rates erode a fixed sum across time horizons.",
    faq: [
      {
        q: "How do you calculate the inflation-adjusted value of money?",
        a: "Future purchasing power = present amount ÷ (1 + annual inflation rate)^years. At 3% inflation, $10,000 today is worth $7,441 in 10 years and $5,537 in 20 years in real terms. Alternatively: today's cost in future dollars = current cost × (1 + inflation)^years. A $50,000 car today at 3% inflation will cost $67,196 in 10 years. The BLS CPI Inflation Calculator lets you compare specific historical periods — useful for contextualizing wages and savings across decades.",
      },
      {
        q: "What was the average inflation rate in the US historically?",
        a: "Long-run average (1913–2025): ~3.1% per year. Fed's target (established 2012): 2%. Recent history: 1.2% in 2020; 7.0% in 2021; 6.5% in 2022; 3.4% in 2023; ~2.7% in 2024. The most inflation-damaging decade was the 1970s (averaging 7.1%). Since 1990, US inflation has averaged about 2.7%. The compounding effect is why a dollar in 1990 buys only about $0.47 of goods today.",
      },
      {
        q: "How does inflation affect different types of assets?",
        a: "Hurt by inflation: cash (purchasing power erodes directly), fixed-rate bonds (real return = nominal rate − inflation), savings accounts below the inflation rate. Protected by inflation: equities (companies raise prices, maintaining real earnings); real estate (property values and rents tend to track inflation long-term); TIPS and I-Bonds (principal adjusts with CPI); commodities. The key insight: any asset earning a nominal return below the inflation rate is losing real value even as the number grows.",
      },
    ],
  },

  "inflation-impact-calculator": {
    intro:
      "Inflation erodes wages silently. A worker who receives a 2% raise in a year with 4% inflation has effectively taken a 1.9% pay cut in real purchasing power. Compounded over three years of below-inflation raises, real wages can decline by 8–12% while nominal pay appears to rise. The table below shows real wage change when different raise percentages are applied against various inflation rates.",
    faq: [
      {
        q: "How do I calculate my real wage increase after accounting for inflation?",
        a: "Real raise = [(1 + nominal raise%) ÷ (1 + inflation%)] − 1. If you received a 3% raise and inflation was 4.5%: real change = (1.03 ÷ 1.045) − 1 = −1.44%. Your salary number went up, but your purchasing power fell by 1.44%. Over three years with the same dynamic: cumulative real loss ≈ 4.3%. This is why negotiating raises explicitly above the inflation rate matters — maintaining real wages requires beating inflation by a margin, not just matching it.",
      },
      {
        q: "What was average wage growth vs inflation in recent years?",
        a: "2021: average wage growth 4.7%, CPI 7.0% — real wage loss of −2.1%. 2022: wage growth 5.1%, CPI 6.5% — real loss −1.3%. 2023: wage growth 4.4%, CPI 3.4% — real gain +0.97%. 2024: wage growth 4.1%, CPI ~2.7% — real gain +1.36%. After two years of real wage losses in 2021–2022, workers began recovering purchasing power in 2023–2024 — but those who didn't negotiate during the high-inflation years compounded their real income losses.",
      },
      {
        q: "How do fixed incomes (pensions, bonds, savings) fare against inflation?",
        a: "Fixed nominal incomes lose real value proportionally to inflation. A $2,000/month fixed pension at 4% inflation loses ~$80/month in purchasing power per year — after 10 years, it buys what $1,351/month bought at inception. Social Security includes a COLA (cost-of-living adjustment) tied to CPI, providing partial inflation protection. TIPS (Treasury Inflation-Protected Securities) and Series I Bonds automatically adjust principal/interest with CPI — they're the cleanest fixed-income inflation hedge available to retail investors.",
      },
    ],
  },

  "investment-calculator": {
    intro:
      "Investment growth is driven by three variables: rate of return, time horizon, and contribution consistency. Of these, time is the most powerful due to compounding. $500/month invested at 7% for 40 years = $1.3M. The same $500/month for only 30 years = $567,000 — less than half the balance, from waiting just 10 years longer. The table below isolates these variables to show how each affects the outcome independently.",
    faq: [
      {
        q: "What is a realistic long-term investment return rate to use?",
        a: "US stock market (S&P 500) historical average: ~10% nominal, ~7% real (inflation-adjusted), based on data from 1928–2025. A globally diversified portfolio (US + international): ~8% nominal, ~5–6% real. Bonds: 3–5% nominal. For long-term financial planning, most financial advisors recommend 6–7% real as the conservative assumption — it accounts for inflation without extrapolating the exact past. Use 5% for highly conservative scenarios, 8% for optimistic.",
      },
      {
        q: "How much should I invest each month to reach a specific goal?",
        a: "Rearranging the future value of annuity formula: PMT = FV × r ÷ [(1+r)^n − 1], where FV = target, r = monthly rate, n = months. To reach $1,000,000 in 30 years at 7%: monthly rate = 0.5833%; PMT = $1,000,000 × 0.005833 ÷ [(1.005833)^360 − 1] = $1,000,000 × 0.005833 ÷ 9.26 = $630/month. A simple rule of thumb: for each $100,000 target at 7% over 30 years, you need to invest ~$63/month.",
      },
      {
        q: "What is dollar-cost averaging and does it outperform lump sum investing?",
        a: "Dollar-cost averaging (DCA) means investing a fixed amount at regular intervals regardless of market price — automatically buying more shares when prices are low. Studies (Vanguard, 2012) show lump-sum investing outperforms DCA approximately 66% of the time over 10-year periods, because markets trend upward and time in market beats timing the market. However, DCA dramatically outperforms doing nothing and produces better behavioral outcomes — investors who DCA are less likely to panic-sell during downturns. For regular savers, DCA through automatic payroll deductions is the optimal approach.",
      },
    ],
  },

  "job-offer-comparison": {
    intro:
      "Comparing two job offers on base salary misses 30–50% of the total compensation picture. Benefits, equity, flexibility, career trajectory, and commute can collectively be worth more than a $20,000 salary gap. A lower-paying job with remote work, full health insurance, strong 401k matching, and more PTO can easily be worth $15,000–$25,000 more annually once all components are valued properly.",
    faq: [
      {
        q: "How do you calculate the total compensation value of a job offer?",
        a: "Add these to base salary: employer 401k match (e.g., 50% on 6% of $100k = $3,000); health insurance premium savings (employer-sponsored vs self-purchased can differ by $6,000–$12,000/year for family coverage); equity/RSU value (shares × current price × vesting schedule); commute cost difference (use $0.70/mile IRS rate + time value); PTO difference (salary ÷ 260 × additional days); remote work value (~$6,000–$10,000 for full-remote vs full-office, per studies). The total compensation picture often differs from salary by $15,000–$40,000.",
      },
      {
        q: "How do you value equity and stock options in a job offer?",
        a: "Public company RSUs: current share price × number of shares granted × vesting period. A grant of 500 shares at $50/share vesting over 4 years = $25,000 total, $6,250/year. Factor in lock-up periods and tax: RSUs are taxed as ordinary income when they vest. Stock options: value = (current price − strike price) × shares. For private company equity: apply a significant discount (70–90%) for illiquidity and uncertainty unless the company is late-stage with a credible IPO/exit path. Don't let equity speculation drive decisions — treat anything above Series B as speculative.",
      },
      {
        q: "What questions should I ask before accepting a job offer?",
        a: "Beyond compensation: (1) What is the promotion timeline and criteria? (2) What does the on-call / after-hours expectation look like? (3) What is the health insurance plan and employee premium? (4) What percentage of employees are still here after 3 years? (5) How does the company handle performance reviews and raises — are they inflation-adjusted? (6) What is the company's financial runway (for startups) or growth trajectory? (7) Is the role remote/hybrid permanent or subject to return-to-office mandates? The answers to these determine the real long-term value of the offer.",
      },
    ],
  },

  "latte-factor": {
    intro:
      "The 'Latte Factor' — coined by David Bach — illustrates how small daily purchases compound into significant sums over time. A $6/day coffee × 365 days = $2,190/year. Invested at 7% for 30 years, that's $219,000 in foregone wealth. The concept is not specifically about coffee — it's about identifying habitual, unconscious spending and evaluating whether each purchase reflects your actual values and priorities.",
    faq: [
      {
        q: "Does eliminating small purchases really make a meaningful difference to wealth?",
        a: "Mathematically: yes. Behaviorally: it depends on how you deploy the savings. $2,190/year invested consistently for 30 years at 7% = $219,000 — genuinely significant. The critique (popularized by Helaine Olen's 'Pound Foolish') is that focusing on lattes while ignoring housing costs, salary negotiations, and healthcare can be counterproductive. The real lesson isn't 'stop buying coffee' — it's 'be intentional about spending at all levels, but especially the large fixed costs that are harder to scrutinize.'",
      },
      {
        q: "What are the most common 'latte factor' expenses people underestimate?",
        a: "Subscriptions rarely reviewed: the average American pays for 3.4 subscriptions they've forgotten about (Waterstone, 2022), averaging $219/year in unused services. Convenience fees: delivery app markup + fees + tip on a $15 meal can reach $28–$35 — making home cooking 2–3x cheaper. Gym memberships not used: average unused gym member pays $600/year. Bottled water: $1,500/year for daily purchased water vs $50/year filtered tap. These aren't lifestyle attacks — they're budget leaks for services you're not actually enjoying.",
      },
      {
        q: "What is the most impactful small financial habit for building wealth?",
        a: "Automating investments immediately after each paycheck — before you can spend the money. Setting up auto-transfer of $200–$500/month to a Roth IRA or brokerage account on payday removes the decision friction entirely. Research shows automation produces far better wealth outcomes than relying on willpower-based saving. Combined with automatic 401k contributions: someone who automates 15% of income to retirement from age 25 typically reaches financial independence 5–10 years faster than someone who manually saves a higher percentage but inconsistently.",
      },
    ],
  },

  "laundry-cost-calculator": {
    intro:
      "The average household does 8–10 laundry loads per week, spending $500–$900 per year on electricity, water, detergent, and dryer sheets. The dryer is the biggest cost — it uses 10–15x more electricity than the washing machine per cycle. Switching to cold water washing, running full loads, and air-drying when possible can cut annual laundry costs by 40–60%.",
    faq: [
      {
        q: "How much electricity does a washer and dryer use per load?",
        a: "Washing machine: a standard top-loader uses 400–1,100W per cycle; a modern front-loader uses 150–500W. At 45 minutes per cycle and 16¢/kWh: top-loader ≈ $0.10/load; front-loader ≈ $0.04/load. Electric dryer: 4,000–6,000W per 45-minute cycle = 3–4.5 kWh = $0.48–$0.72/load at 16¢/kWh. The dryer costs 5–15x more electricity than the washer. Heat pump dryers use 50–60% less energy ($0.20–$0.30/load) and are the most efficient option.",
      },
      {
        q: "Does washing clothes in cold water really save money?",
        a: "Yes, significantly. Heating water accounts for approximately 75–90% of a washing machine's energy use. Switching an entire household from hot/warm to cold water can reduce per-load washing energy costs by 75% — from $0.10/load to $0.025/load. Annual savings at 8 loads/week: roughly $30–$60/year in electricity. Modern cold-water detergents (Tide Coldwater, Persil) are formulated to activate at low temperatures and perform equivalently to warm-water detergents for most stains. Only hot water is needed for bedding, towels, and heavily soiled items.",
      },
      {
        q: "Is it cheaper to do laundry at home or at a laundromat?",
        a: "Home laundry costs approximately $0.75–$1.50 per full load (electricity, water, detergent, and machine amortization). Commercial laundromat: $3.00–$5.00 to wash + $1.50–$3.00 to dry = $4.50–$8.00 per full load. Home laundry is 4–7x cheaper per load. A household doing 400 loads/year saves $1,200–$2,600 annually by doing laundry at home. The laundromat convenience premium is significant — the financial case for home machines is strong for families doing 6+ loads/week.",
      },
    ],
  },

  "life-expectancy-calculator": {
    intro:
      "Average US life expectancy is 78.4 years (2023 CDC data) — 76.0 for men and 81.1 for women. But this average conceals massive lifestyle variation: non-smokers who exercise regularly, maintain a healthy weight, and eat well can reasonably expect to live 10–15 years longer than someone with the opposite habits. Accurate life expectancy estimates are critical for retirement planning — the single largest financial risk for most retirees is outliving their savings.",
    faq: [
      {
        q: "What lifestyle factors have the biggest impact on life expectancy?",
        a: "Factors that reduce life expectancy most: smoking (−10 to −15 years), physical inactivity (−3 to −5 years), obesity (−5 to −7 years), heavy alcohol use (−2 to −4 years), chronic stress/social isolation (−2 to −3 years). Factors that extend it: regular aerobic exercise (+3 to +5 years), Mediterranean-style diet (+2 to −4 years), not smoking (+10 years if lifelong non-smoker), strong social connections (+2 to +3 years), purpose/meaning (+2 years per studies of volunteering and purposeful engagement). Combined lifestyle advantage: up to 15–20 years between best and worst profiles.",
      },
      {
        q: "How long should I plan for in retirement?",
        a: "Social Security actuarial tables: a 65-year-old man has a 50% probability of living to 85; a 65-year-old woman to 87. A couple (both 65) has a 50% probability of at least one spouse living to 92. Financial planners generally recommend planning for retirement income to age 90–95 to avoid outliving assets. With healthcare costs accelerating in late retirement, the final 5–10 years are often the most expensive — factor in long-term care costs ($50,000–$100,000+/year for memory care).",
      },
      {
        q: "Does family history or personal lifestyle matter more for longevity?",
        a: "Studies of identical twins separated at birth show that genetics explains approximately 25–30% of lifespan variation; environment and lifestyle explain 70–75%. This is important: most determinants of how long you'll live are within your control. The strongest genetic predictors are: parental longevity (if both parents lived past 85, your risk of early death is significantly lower), absence of hereditary conditions (heart disease, certain cancers), and APOE genotype (related to Alzheimer's risk). Regular health screenings catch genetic risks early enough to mitigate them in most cases.",
      },
    ],
  },

  "life-in-weeks-calculator": {
    intro:
      "A human life of 90 years contains 4,680 weeks. Plotted as a grid of boxes — filled for weeks already lived, empty for weeks remaining — life becomes visible in a way that years alone don't convey. At 35, approximately 1,820 weeks are spent. Around 2,860 remain on average. The tool was popularised by Tim Urban's essay 'Your Life in Weeks' and is designed not to cause anxiety, but to create intentionality about how the remaining boxes are spent.",
    faq: [
      {
        q: "How many weeks does the average person live?",
        a: "US average life expectancy of 78.4 years = approximately 4,077 weeks. A more optimistic assumption of 85 years = 4,420 weeks; 90 years = 4,680 weeks. At age 40: roughly 2,080 weeks remain to the average US life expectancy, or 2,340 to age 85. These numbers feel both large and small simultaneously — large enough that change is possible; small enough that procrastination has a real cost. The exercise is most useful when tied to specific life priorities, not abstract time.",
      },
      {
        q: "Why is visualising life in weeks psychologically powerful?",
        a: "Humans systematically underweight future time due to 'present bias' — we prioritise immediate rewards over future benefits. Abstract year-count projections don't counteract this bias effectively. Visual grids of finite boxes do. Psychologists note that vivid, concrete representations of time scarcity activate loss aversion (which is stronger than equivalent positive framing). Seeing 2,800 remaining boxes is more motivating for behaviour change than knowing 'I have 54 years left.' Urban's original post has been viewed over 10 million times, suggesting the visualisation resonates unusually strongly.",
      },
      {
        q: "How should I use this information productively?",
        a: "The productive output is an honest audit of time allocation — not a crisis. Identify your 3–5 highest-priority activities or relationships. Estimate how many weeks you currently spend meaningfully engaged in each. Map how your actual time allocation compares to your stated priorities. The gap between the two is where the tool creates value. Common insights: people routinely discover they're in the 'medium urgency, low importance' quadrant (scrolling, passive entertainment, low-value meetings) while consistently deferring 'low urgency, high importance' activities (health, relationships, creative work, learning).",
      },
    ],
  },

  "loan-calculator": {
    intro:
      "All fixed-rate instalment loans — personal loans, auto loans, mortgages, student loans — use the same amortisation formula. The monthly payment is constant, but the split between interest and principal shifts over time: early payments are mostly interest; later payments are mostly principal. On a $20,000 personal loan at 10% APR over 5 years, you pay $425/month = $25,500 total — with $5,500 going to the lender as interest.",
    faq: [
      {
        q: "How is a monthly loan payment calculated?",
        a: "M = P × [r(1+r)^n] ÷ [(1+r)^n − 1], where P = principal, r = monthly interest rate (APR ÷ 12), n = total months. Example: $15,000 at 9% APR for 48 months → r = 0.75%; n = 48 → M = $15,000 × [0.0075 × (1.0075)^48] ÷ [(1.0075)^48 − 1] = $373/month. Total paid = $17,904; interest = $2,904. This formula applies to any fixed-rate amortising loan regardless of loan type.",
      },
      {
        q: "What is a loan amortisation schedule?",
        a: "An amortisation schedule shows every payment broken down into interest and principal portions, plus the remaining balance after each payment. In month 1 of a $15,000 loan at 9%: interest = $15,000 × 0.75% = $112.50; principal = $373 − $112.50 = $260.50; balance = $14,739.50. By month 48: interest < $3; almost the entire payment is principal. Requesting an amortisation schedule from any lender before signing reveals the true cost and helps evaluate whether extra payments (particularly early) are worth making.",
      },
      {
        q: "Does making extra loan payments save significant money?",
        a: "Yes — and the savings are front-loaded. Extra payments reduce the principal balance, which directly reduces the interest that accrues in every subsequent period. On a $20,000 loan at 10% over 60 months ($425/month), paying an extra $100/month reduces the loan to 48 months and saves approximately $800 in interest. The highest-impact extra payments are in months 1–12 when the outstanding principal is highest. Even a single large additional payment in year 1 can save hundreds in interest over a multi-year loan.",
      },
    ],
  },

  "lottery-vs-investing": {
    intro:
      "The expected value of a lottery ticket is always negative — lotteries return approximately 50 cents in prizes for every dollar spent. Your odds of winning the Powerball jackpot are 1 in 292 million: buying a ticket every second for 9.3 years would give you roughly a 50% chance of winning. Meanwhile, $10/week consistently invested in an index fund at 7% for 30 years produces $52,000 in real money — no luck required.",
    faq: [
      {
        q: "What are the actual odds of winning the lottery?",
        a: "Powerball jackpot: 1 in 292,201,338. Mega Millions jackpot: 1 in 302,575,350. State lottery top prize: varies, typically 1 in 2–10 million. To contextualise: you are roughly 65 times more likely to be struck by lightning this year (1 in 1.2 million annual odds) than to win Powerball. Each draw is mathematically independent — no ticket is 'due' and previous results carry no predictive weight for future draws. Lottery tickets are a form of entertainment spending, not financial planning.",
      },
      {
        q: "Why does the lottery advertise much larger jackpots than you actually receive?",
        a: "The advertised jackpot is the annuity value — the total of 30 annual payments over 29 years. Taking the cash lump sum immediately typically yields 60% of the advertised amount. On a $500M jackpot: cash option ≈ $300M. Federal income tax (37% top rate): −$111M. State tax (varies, 0–13%): −$10–$39M. Net after-tax jackpot: approximately $150–$180M. Still life-changing — but about 30–36% of the headline number. The gap is not a secret; it's in the fine print.",
      },
      {
        q: "What would lottery ticket spending look like if invested instead?",
        a: "$5/week invested at 7% for 20 years = $27,200; for 30 years = $65,200; for 40 years = $131,000. $20/week: $108,800 (20yr); $261,000 (30yr); $524,000 (40yr). The lottery buyer spends the same dollars and statistically receives ~50% back as small prizes and 1-in-292-million chance at a jackpot. The investor receives a statistically near-certain compound return over decades. The comparison isn't about being anti-fun — it's about distinguishing entertainment spending from financial strategy.",
      },
    ],
  },

  "macro-calculator": {
    intro:
      "Macronutrients — protein, carbohydrates, and fat — are the three calorie-containing nutrient categories. Protein and carbohydrates provide 4 calories per gram; fat provides 9 calories per gram. Tracking macros rather than just total calories is more effective for body composition goals because the ratio determines how much of your weight change comes from fat vs muscle mass. The table below shows recommended macro targets for the most common fitness goals.",
    faq: [
      {
        q: "What macro ratio is best for fat loss?",
        a: "For fat loss while preserving muscle: protein 30–35% of total calories, carbohydrates 35–40%, fat 25–30%. High protein is the most important lever for three reasons: (1) muscle preservation — at 0.7–1.0g per pound of body weight; (2) satiety — protein is the most filling macronutrient per calorie; (3) thermic effect — 20–30% of protein calories are burned in digestion itself. At 1,800 kcal/day with 30% protein: 135g protein (540 cal), 180g carbs (720 cal), 60g fat (540 cal).",
      },
      {
        q: "How much protein do I actually need per day?",
        a: "For muscle preservation or building: 0.7–1.0g per pound of body weight (1.6–2.2g/kg). A 160lb person needs 112–160g of protein daily. For sedentary adults: the RDA minimum is 0.36g/lb (0.8g/kg) — considered by most exercise researchers as adequate for health but insufficient for optimal muscle maintenance. Protein sources: chicken breast (31g/100g), Greek yogurt (10g/100g), eggs (6g each), canned tuna (25g/85g), lentils (9g/100g cooked). Spreading intake across 3–4 meals maximises muscle protein synthesis vs eating it all at once.",
      },
      {
        q: "What macros should I target for muscle building (bulking)?",
        a: "Calorie surplus of 200–400 kcal/day above TDEE (lean bulk minimises fat gain). Protein: 0.8–1.0g per lb body weight — non-negotiable for maximising muscle protein synthesis. Carbohydrates: 45–55% of total calories — primary fuel for resistance training; higher carb intake supports more training volume and intensity. Fat: 20–30%. Prioritise pre-workout carbohydrates (1–2 hours before) and post-workout protein + carbohydrates (within 60 minutes). Sleep is equally critical — growth hormone peaks during deep sleep, making 7–9 hours a legitimate performance variable.",
      },
    ],
  },

  "margin-calculator": {
    intro:
      "Gross profit margin measures what percentage of revenue remains after the cost of goods sold (COGS) — before operating expenses, taxes, and interest. A 40% margin on $100 in revenue means $40 in gross profit and $60 in direct costs. Margin is the single most important indicator of business health and pricing power. Confusing margin with markup is one of the most common — and costly — pricing errors in small business.",
    faq: [
      {
        q: "What is the difference between profit margin and markup?",
        a: "Margin uses selling price as the base: Margin = (Selling price − Cost) ÷ Selling price × 100. Markup uses cost as the base: Markup = (Selling price − Cost) ÷ Cost × 100. On the same transaction: cost = $60, selling price = $100. Margin = ($100 − $60) ÷ $100 = 40%. Markup = ($100 − $60) ÷ $60 = 66.7%. A 50% markup = 33.3% margin. A 100% markup = 50% margin. Accountants and investors speak in margin; manufacturers and retailers often speak in markup — always clarify which is being used.",
      },
      {
        q: "What is a good profit margin by industry?",
        a: "Gross margins vary enormously by sector: software/SaaS (70–85%); pharmaceuticals (60–70%); financial services (50–65%); consulting (55–70%); e-commerce (40–55%); manufacturing (30–45%); grocery retail (22–30%); restaurants (65–75% gross, 3–9% net after labour and overhead). Net profit margins (after all expenses) are far lower — 10–20% net is considered strong for most businesses. Amazon's retail operation runs at ~1–3% net; its AWS cloud business at ~35% net, demonstrating how dramatically business model affects margin.",
      },
      {
        q: "How do I calculate the selling price needed to achieve a target margin?",
        a: "Selling price = COGS ÷ (1 − target margin). For a 45% gross margin on an item costing $55: selling price = $55 ÷ (1 − 0.45) = $55 ÷ 0.55 = $100. This formula is essential for pricing correctly — the common error is calculating markup percentage and mistaking it for margin. Adding 45% to cost ($55 × 1.45 = $79.75) gives only a 31% margin, not 45%. Always verify: ($100 − $55) ÷ $100 = 45% ✓. This check takes 5 seconds and prevents systematic under-pricing.",
      },
    ],
  },

  "markup-calculator": {
    intro:
      "Markup is the percentage added to the cost of a product to arrive at its selling price. A 50% markup on a $40 product gives a $60 selling price. It's the natural pricing method for product businesses — you know your cost, you apply a markup, you have your price. The essential caveat: markup percentage and margin percentage are not the same number. A 50% markup produces a 33.3% margin — and confusing the two systematically underprices your products.",
    faq: [
      {
        q: "How do you calculate markup percentage?",
        a: "Markup % = (Selling price − Cost) ÷ Cost × 100. A $75 item that cost $50 to produce: ($75 − $50) ÷ $50 × 100 = 50% markup. To find selling price from a target markup: Selling price = Cost × (1 + Markup%). $50 × (1 + 0.50) = $75. To find cost from selling price and markup: Cost = Selling price ÷ (1 + Markup%). $75 ÷ 1.50 = $50. These three rearrangements of the same formula cover all markup calculation scenarios.",
      },
      {
        q: "What markup percentage is typical for different industries?",
        a: "Retail clothing: 100–300% (doubling to tripling the wholesale price). Restaurant food: 200–400% over food cost (a $5 plate costs $1.25–$1.67 in ingredients). Electronics: 10–25% (low margin, high volume). Jewellery: 100–300%. Pharmaceuticals: 200–500% over manufacturing cost. Contractors/trades: 20–50% on materials. 'Keystone markup' (100% — doubling the cost) is a traditional retail benchmark but has largely been superseded by data-driven pricing. For online retail competing on price, margins are compressed: 15–35% markup is common.",
      },
      {
        q: "How do you convert between markup and margin?",
        a: "Convert markup to margin: Margin = Markup ÷ (1 + Markup). 50% markup → 50 ÷ 150 = 33.3% margin. 100% markup → 100 ÷ 200 = 50% margin. 200% markup → 200 ÷ 300 = 66.7% margin. Convert margin to markup: Markup = Margin ÷ (1 − Margin). 33.3% margin → 0.333 ÷ 0.667 = 50% markup. 50% margin → 0.50 ÷ 0.50 = 100% markup. Memorise the markup-margin pairs: 25%/20%, 50%/33.3%, 100%/50%, 200%/66.7% — they come up constantly in pricing discussions.",
      },
    ],
  },

  "meal-prep-calculator": {
    intro:
      "Meal prepping 4–5 days of lunches and dinners can save the average household $200–$500/month compared to buying lunch and ordering takeout. A homemade lunch costs $2–$5 vs $12–$18 bought. Done consistently across a year, that's $2,400–$6,000 in savings — plus better nutrition, fewer decisions, and less food waste. The table below compares weekly cost of common meal prep strategies against equivalent bought-out spending.",
    faq: [
      {
        q: "How much does meal prepping actually save per month?",
        a: "The savings depend on your current baseline. If you buy lunch every workday ($14 average): 5 × 14 = $70/week. Meal prepped equivalent: $3.50 × 5 = $17.50/week. Lunch savings alone: $52.50/week = $210/month. Adding 3 takeout dinners per week replaced by prepped meals ($25 takeout vs $5 homemade): $60/week additional savings = $240/month. Combined: $450/month in savings, $5,400/year. Even replacing half your eating out saves $2,000–$3,000/year for most households.",
      },
      {
        q: "What are the cheapest high-protein foods for meal prep?",
        a: "Best protein per dollar (approximate, US 2025 prices): eggs ($0.20/egg, 6g protein = $0.033/g protein); canned tuna ($1.20/can, 20g protein = $0.06/g); chicken thighs ($1.50/serving, 25g protein = $0.06/g); dried lentils ($0.40/serving cooked, 18g protein = $0.022/g); canned chickpeas ($0.60/serving, 15g protein = $0.04/g); cottage cheese ($0.60/serving, 14g protein = $0.043/g). Lentils and eggs are the lowest cost per gram of protein among whole foods — building meal prep around these dramatically reduces food costs.",
      },
      {
        q: "How do I calculate cost per serving for a meal prep recipe?",
        a: "1. Price every ingredient used in the recipe (including pro-rated pantry items like oil, spices — typically $0.10–$0.30 per recipe). 2. Sum the costs. 3. Divide by servings. Example: chicken thighs ($6 for 4 servings) + rice ($0.50) + frozen vegetables ($1.50) + sauce ($0.50) = $8.50 total ÷ 4 servings = $2.13/serving. Tracking this a few times builds intuition — most batch recipes land between $1.50 and $4.00 per serving, making cost-per-serving a reliable benchmark for grocery decisions.",
      },
    ],
  },

  "meeting-cost-calculator": {
    intro:
      "Meetings are one of the largest under-tracked business expenses. A 60-minute meeting with 8 employees averaging $80,000/year costs approximately $308 in salary alone — not counting preparation time, lost productivity context-switching, or opportunity cost. US organisations lose an estimated $37 billion annually in unproductive meetings. The table below shows direct salary cost of common meeting configurations to make the invisible cost visible.",
    faq: [
      {
        q: "How do you calculate the true cost of a meeting?",
        a: "Direct salary cost = (average annual salary ÷ 2,080) × number of attendees × duration hours. Loaded labour cost (including benefits and overhead) = direct salary × 1.3–1.4. Example: 10-person meeting, average salary $75,000, 90 minutes: direct = ($75,000 ÷ 2,080) × 10 × 1.5 = $541; loaded ≈ $730. Add: 30 minutes average preparation time per person ($270 loaded) + post-meeting follow-up time. True cost of a 90-minute 10-person meeting: approximately $1,000–$1,500.",
      },
      {
        q: "How much time do employees actually spend in meetings?",
        a: "Atlassian research: knowledge workers average 31 hours/month in meetings, 50% of which they consider unproductive (15.5 wasted hours/month). Managers: 40–50% of working time in meetings. Senior executives: up to 72% of working time. McKinsey: 65% of senior managers say meetings prevent them from completing their own work; 67% say meetings are a failure. The proliferation of video meetings post-pandemic increased meeting hours by 24% (Microsoft Workplace Trends, 2023). Meeting load is one of the most consistently cited factors in knowledge worker burnout.",
      },
      {
        q: "What is the most effective way to reduce unproductive meeting costs?",
        a: "(1) Async-first default: replace weekly status updates with recorded Loom videos or written updates — this category alone represents 30–40% of most meeting load. (2) Mandatory agendas: meetings without agendas average 33% longer and produce less actionable output. (3) Reduce attendee lists: the most common meeting error is over-invitation; aim for decision-makers only. (4) Default to 25/50-minute slots: creates transition time and forces efficiency. (5) Meeting audit: for 2 weeks, track every meeting attended — categorise as 'decision', 'information', or 'relationship'. Eliminate all information-only meetings you can replace with async communication.",
      },
    ],
  },

  "millionaire-calculator": {
    intro:
      "Reaching $1 million is a concrete, calculable goal — not a matter of luck. The inputs are starting balance, monthly contribution, and rate of return. Time does most of the work: $500/month at 7% for 40 years grows to $1.3 million. The same $500/month for 30 years reaches only $567,000. Starting a decade earlier is mathematically equivalent to doubling your monthly contribution — which is why this is the single most important financial decision available to young earners.",
    faq: [
      {
        q: "How long does it take to save $1 million from $0?",
        a: "At 7% annual return (real, inflation-adjusted): $200/month → 48 years; $500/month → 35.5 years; $1,000/month → 26 years; $2,000/month → 20 years; $3,000/month → 16.5 years. With a $50,000 head start, subtract approximately 4–5 years from each timeline. At 10% nominal (closer to S&P 500 historical): $500/month → 29 years; $1,000/month → 22 years. The message: $1 million is achievable for a middle-income earner who starts by 30, contributes $500–$1,000/month consistently, and doesn't interrupt compounding.",
      },
      {
        q: "What is the most realistic path to $1 million for a median-income earner?",
        a: "Median US household income: ~$80,000 (2024). Recommended savings rate: 15% = $12,000/year = $1,000/month. Vehicle: (1) Capture full 401k employer match (free money first); (2) Max Roth IRA ($7,000/year limit in 2025); (3) Return to 401k up to annual limit; (4) Taxable brokerage thereafter. At $1,000/month starting at 35, 7% real return: $1,000,000 by age 62 — just before traditional retirement age. Every year you delay costs you approximately $100,000 in final balance at this contribution level.",
      },
      {
        q: "How much does investment expense ratio affect reaching $1 million?",
        a: "Dramatically. A 1.0% annual expense ratio vs 0.04% (typical index ETF) on a $1,000/month, 30-year investment at 7% gross return: the high-fee portfolio reaches approximately $1,040,000 (net 6% return); the low-fee portfolio reaches $1,191,000 (net 6.96% return). The 0.96% fee difference costs $151,000 — equal to 12.6 years of contributions lost to fees. Vanguard, Fidelity, and Schwab all offer total market index funds at 0.03–0.04% expense ratios. There is no financial justification for paying 1% annual management fees on index-fund-equivalent exposure.",
      },
    ],
  },


  "missed-investment": {
    intro:
      "Every dollar spent on a depreciating purchase is also a dollar not invested — the opportunity cost compounds invisibly over time. A $30,000 luxury car purchase at age 30, if invested instead at 7% for 35 years, becomes $320,000 by retirement. This calculator makes the hidden cost of spending decisions visible, converting a purchase amount into its equivalent future investment value at any return rate and time horizon.",
    faq: [
      {
        q: "How do you calculate the opportunity cost of a purchase?",
        a: "Opportunity cost = purchase amount × (1 + annual return)^years. A $5,000 purchase today foregoes $5,000 × (1.07)^30 = $38,061 in 30 years at 7% annual return. For recurring spending (e.g., $200/month subscription): use the future value of an annuity formula. $200/month at 7% for 30 years = $243,994. The calculation isn't about guilt — it's about making trade-offs explicit so you can deliberately choose between consumption now and wealth later.",
      },
      {
        q: "What return rate should I use for opportunity cost calculations?",
        a: "Use your expected investment return for the asset class you'd actually invest in. A conservative investor in a 60/40 portfolio: 5–6% real. An equity-heavy investor in index funds: 7% real (S&P 500 historical average, inflation-adjusted). Using nominal returns (10%) is appropriate if you want nominal future dollars; use real returns (7%) if you want inflation-adjusted purchasing power. For short time horizons (under 10 years), use a more conservative 4–5% return to account for sequence risk.",
      },
      {
        q: "Does this mean I should never make large purchases?",
        a: "No — the goal is intentionality, not austerity. Some purchases produce returns of their own: a reliable car enables higher earnings; a home gym saves gym fees; professional development tools increase income. The calculator is most valuable for pure consumption decisions — lifestyle upgrades, luxury goods, depreciating assets — where the opportunity cost is genuinely foregone. The productive question is: 'If I saw this as a $320,000 decision (future value), would I still make it?' For purchases that pass that test, spend without guilt.",
      },
    ],
  },

  "mortgage-calculator": {
    intro:
      "A mortgage is an amortising loan where monthly payments remain constant but the split between interest and principal shifts each month. At today's 7% 30-year rate, a $400,000 mortgage carries a $2,661/month P&I payment — and you'll pay $558,036 total, including $158,036 in interest. In the first year, nearly 75% of each payment goes to interest. The table below shows monthly payments and total interest for common loan amounts and terms.",
    faq: [
      {
        q: "How is a mortgage monthly payment calculated?",
        a: "M = P × [r(1+r)^n] ÷ [(1+r)^n − 1] where P = loan principal, r = monthly rate (APR ÷ 12), n = total payments (years × 12). Example: $350,000 at 7% APR for 30 years → r = 0.5833%, n = 360. M = $350,000 × [0.005833 × (1.005833)^360] ÷ [(1.005833)^360 − 1] = $2,329/month. Over 30 years, total paid = $838,535 — $488,535 in principal and $350,000 in interest. The lender effectively doubles the original loan cost in interest.",
      },
      {
        q: "How much does making extra mortgage payments save?",
        a: "Prepayments are most powerful early in the loan when the outstanding balance is highest. On a $350,000 30-year loan at 7%: paying an extra $200/month shortens the loan to 24 years and 8 months, saving $71,000 in interest. Paying an extra $500/month saves $120,000 and cuts 9+ years. A single lump-sum extra payment of $10,000 in year 1 saves approximately $25,000 in interest over the life of the loan. These savings are tax-advantaged for non-itemisers (you don't owe tax on interest you never pay).",
      },
      {
        q: "What is included in a full monthly mortgage payment (PITI)?",
        a: "Your actual monthly housing cost exceeds the P&I calculation: Principal + Interest (from formula above). Property taxes (typically 1–2% of home value annually ÷ 12 — on a $400,000 home: $400–$800/month). Homeowner's insurance ($100–$200/month for most homes). PMI — Private Mortgage Insurance if LTV > 80% ($100–$350/month; cancellable once you reach 20% equity). Total PITI on a $400,000 home at 7% with 10% down is typically $3,200–$3,800/month. Budget for this full number, not just the base P&I.",
      },
    ],
  },

  "mortgage-refinance-calculator": {
    intro:
      "Refinancing replaces your existing mortgage with a new loan — ideally at a lower rate, shorter term, or to cash out equity. The break-even point is how long it takes for monthly savings to offset closing costs (typically 2–5% of the loan amount). With $5,000 in closing costs saving $150/month, break-even is 33 months. If you plan to stay in the home longer than the break-even period, refinancing likely makes financial sense.",
    faq: [
      {
        q: "How do you calculate the break-even point for a mortgage refinance?",
        a: "Break-even months = closing costs ÷ monthly payment reduction. Closing costs on a refinance: typically 2–5% of loan amount ($6,000–$15,000 on a $300,000 balance). Monthly savings = old P&I payment − new P&I payment. Example: $300,000 balance, refinancing from 7.5% to 6.5% (30-year): old payment $2,097; new payment $1,896; savings $201/month. Closing costs $9,000 ÷ $201 = 44.8 months (just under 4 years). If you stay 5+ years, refinancing saves money; if you'll move in 3 years, don't refinance.",
      },
      {
        q: "When does refinancing to a shorter term make sense?",
        a: "Refinancing from a 30-year to a 15-year mortgage increases the monthly payment but dramatically reduces total interest. On a $300,000 mortgage: 30-year at 7% = $1,996/month, $418,600 total interest. 15-year at 6.5% = $2,613/month, $170,000 total interest. Savings: $248,600 in interest — but you pay $617 more per month. The 15-year makes sense if: (1) the payment fits your budget; (2) you have an emergency fund and no higher-rate debt; (3) you plan to stay long-term. The extra payment effectively earns a guaranteed 6.5% return, beating low-risk alternatives.",
      },
      {
        q: "Is a no-closing-cost refinance ever a good deal?",
        a: "No-closing-cost refinances are not cost-free — the closing costs are rolled into the loan balance or paid via a higher interest rate (typically 0.125–0.25% rate increase). This structure makes sense when: (1) you plan to move or refinance again within 3 years; (2) you don't have liquid cash for closing costs. Over longer horizons, paying closing costs upfront and securing the lower rate is almost always cheaper. A 0.25% rate penalty on a $300,000 30-year loan costs approximately $15,000 in additional interest — often exceeding what a traditional closing-cost refinance would cost.",
      },
    ],
  },

  "moving-cost-calculator": {
    intro:
      "The average cost to move a 2–3 bedroom home locally (under 100 miles) is $1,250–$2,500; long-distance moves (1,000+ miles) average $4,000–$10,000 with a professional moving company. But the true cost of moving includes deposits, first/last month rent, utility setup fees, new furniture purchases, and lost productivity — often pushing the real total to $15,000–$30,000. The table shows cost ranges by move distance and household size.",
    faq: [
      {
        q: "What does it actually cost to hire professional movers?",
        a: "Local moves: movers charge $100–$200/hour for a 2-man crew + truck. A 2-bedroom move takes 4–8 hours = $400–$1,600 total. Long-distance moves: priced by weight and distance. A 7,500 lb household (3 bedrooms) moved 1,500 miles: $5,500–$8,500. Get at least 3 quotes — prices vary by 30–50% between companies. Key additional costs: packing services ($300–$1,500 depending on how much they pack); storage if there's a gap between move-out and move-in ($200–$500/month); tip for movers (15–20% of total bill is standard for professional service).",
      },
      {
        q: "What hidden costs do people forget when budgeting for a move?",
        a: "Overlooked moving costs: (1) Security deposit on new rental — typically 1–2 months' rent ($2,000–$4,000); (2) Overlap in rent/mortgage if you can't time the transition perfectly; (3) Car registration and license fee change if moving to a new state ($100–$500); (4) Utility deposits and connection fees ($200–$600); (5) New items that don't fit or aren't worth moving (furniture, window treatments, appliances); (6) Time off work — most people underestimate the 3–5 days needed for a full move including unpacking; (7) Pet deposits if renting with pets ($200–$500).",
      },
      {
        q: "How can I reduce the cost of moving significantly?",
        a: "Best cost-reduction strategies: (1) Move mid-month, mid-week — rates are 15–30% lower than weekends or month-end; (2) DIY with a rental truck: $200–$600 for a 26-ft truck rental (Budget/U-Haul) for a local move — saves $800–$1,200 but requires 2–4 helpers; (3) Sell rather than move heavy, low-value items (IKEA furniture, old appliances) — moving 200 lbs long-distance costs ~$100, often exceeding replacement value; (4) Pack yourself — professional packing is the largest optional expense; (5) Book 4–6 weeks in advance in peak season (May–September) to avoid surge pricing.",
      },
    ],
  },

  "net-worth-calculator": {
    intro:
      "Net worth is the single most important financial health metric: total assets minus total liabilities. The median US household net worth is $192,700 (Federal Reserve 2022 SCF); the mean is $1,059,470 — skewed dramatically upward by the ultra-wealthy. Real progress is measured by trajectory, not benchmarks. Consistently growing net worth by 10–15% per year, whether from $5,000 or $500,000, is the goal.",
    faq: [
      {
        q: "What should I include when calculating my net worth?",
        a: "Assets (everything you own of value): checking + savings account balances; investment and retirement accounts (401k, IRA, brokerage) at current market value; home equity (current market value minus remaining mortgage); vehicle(s) at current resale value (Kelley Blue Book); business equity; other real property; valuable personal property (jewellery, art, collectibles with verifiable market value). Liabilities (everything you owe): mortgage balance; auto loans; student loans; credit card balances; personal loans; any other debt. Net worth = total assets − total liabilities. Include retirement accounts even though they're illiquid — they're your wealth.",
      },
      {
        q: "What is considered a good net worth by age?",
        a: "Thomas Stanley's rule: multiply your age by your pre-tax income and divide by 10 to get your 'expected' net worth. A 40-year-old earning $80,000 should aim for $320,000. By age: 30 → $100,000–$150,000 for strong starters; 40 → $300,000–$500,000; 50 → $650,000–$1,000,000; 60 → $1,200,000–$1,800,000. These are population benchmarks — real context matters more. $200,000 in net worth at 35 in a high cost-of-living city with strong income trajectory is healthier than $400,000 at 55 with no retirement savings.",
      },
      {
        q: "Should I include home equity in my net worth?",
        a: "Yes — home equity is real wealth. However, treat it differently from liquid assets in planning: you can't eat your home equity in retirement without selling or borrowing against it. The relevant distinction is liquid net worth (cash + investments) vs total net worth (includes home equity). For retirement planning, focus on liquid/investable net worth — this is what generates income in retirement. If 80% of your net worth is in home equity with minimal investable assets, you may be 'house rich, cash poor' — a precarious position in retirement without a clear drawdown or downsizing plan.",
      },
    ],
  },

  "overtime-pay-calculator": {
    intro:
      "Under the Fair Labor Standards Act (FLSA), non-exempt employees must receive 1.5× their regular rate for hours worked over 40 in a workweek — known as time-and-a-half. Some states (California, Alaska, Nevada) require daily overtime for hours over 8 in a single day. Double time (2× rate) is required in California for hours over 12/day or over 8 on the seventh consecutive day. The table shows overtime earnings at common hourly rates.",
    faq: [
      {
        q: "How do you calculate overtime pay correctly?",
        a: "Federal formula: regular rate = total compensation ÷ total hours worked in the workweek (including non-discretionary bonuses). Overtime rate = regular rate × 1.5. Example: $20/hour, 48 hours worked, $200 non-discretionary production bonus. Regular rate = ($20 × 48 + $200) ÷ 48 = $24.17. Overtime pay for 8 OT hours: (24.17 × 0.5) × 8 = $96.68 (half-time premium on top of regular pay already earned for OT hours). Many employers incorrectly exclude bonuses from the regular rate — this is a common FLSA violation.",
      },
      {
        q: "Who is exempt from overtime pay requirements?",
        a: "FLSA exemptions require meeting both a salary test AND a duties test: (1) Salary basis: earning at least $684/week ($35,568/year — the 2024 threshold; proposed update to $1,128/week pending). (2) Duties test: executive (managing 2+ employees); administrative (primary duty is office/non-manual work related to management); professional (advanced knowledge in a field requiring specialised study); computer employees; outside sales. Misclassification of employees as exempt is one of the most litigated wage-and-hour violations — 'manager' title alone does not create exemption.",
      },
      {
        q: "Can an employer force you to work overtime, and can they refuse to pay it?",
        a: "In most US states: yes, employers can require mandatory overtime. They cannot, however, fail to pay for it. Key protections: (1) All overtime worked by non-exempt employees must be compensated at 1.5× regardless of whether it was approved in advance; (2) Employers cannot require employees to waive overtime rights; (3) Retaliating against an employee for complaining about overtime violations is illegal under FLSA. If you believe you're owed back overtime pay, claims can be filed with the Department of Labour Wage and Hour Division — statute of limitations is 2 years (3 years for wilful violations).",
      },
    ],
  },

  "overtime-pay-calculator-uk": {
    intro:
      "UK workers have no statutory right to overtime pay — employers must pay at least the National Minimum Wage for all hours worked but are not legally required to pay a premium for overtime. However, most employment contracts specify overtime rates (time-and-a-half, double time, or TOIL — time off in lieu). Workers averaging below the NMW (£12.21/hour in 2025) across total hours including overtime can claim underpayment.",
    faq: [
      {
        q: "Is overtime pay legally required in the UK?",
        a: "There is no UK legal requirement to pay a premium rate for overtime. Employers must pay at least the National Living Wage (£12.21/hour for 21+, April 2025) for every hour worked — including overtime hours. If an employer pays £12.21/hour for regular hours but unpaid overtime brings the effective average below the NLW, they're in breach of the NMW regulations. Employment contracts set the actual overtime terms — time-and-a-half, double time, or TOIL are all contractually valid. Check your written contract or statement of particulars for your specific entitlement.",
      },
      {
        q: "How does TOIL (time off in lieu) work as an overtime alternative?",
        a: "TOIL means earning time off instead of extra pay for overtime worked. It must be agreed in your contract or by mutual agreement — employers cannot unilaterally impose TOIL instead of contractual overtime pay. TOIL is most common in public sector, education, and professional services roles. The ratio matters: 1:1 TOIL (1 hour off per overtime hour) is less valuable than pay if your marginal tax rate is high; 1.5:1 TOIL can be more valuable than time-and-a-half pay depending on circumstances. Unused TOIL accumulated before resignation or dismissal must typically be paid out.",
      },
      {
        q: "What is the maximum number of hours UK employees can be required to work?",
        a: "The Working Time Regulations 1998 cap the average working week at 48 hours, measured over a 17-week reference period. This includes overtime. Workers can opt out of the 48-hour limit in writing (the opt-out is common in professional and financial services). Additional protections: minimum 11 hours' rest between working days; minimum 24 hours off per week (or 48 hours per fortnight); 20 minutes' rest break for shifts over 6 hours; 5.6 weeks' paid annual leave. Young workers (under 18) cannot work more than 8 hours/day or 40 hours/week with no opt-out option.",
      },
    ],
  },

  "paint-coverage-calculator": {
    intro:
      "A standard gallon of paint covers approximately 350–400 square feet with one coat on a smooth, primed surface. Rough or porous surfaces, dark colour changes, or unprepared walls can reduce coverage to 250–300 sq ft per gallon and require an additional coat. Buying the right amount matters: buying too little means a mid-project trip to the hardware store risking dye lot mismatches; buying too much wastes $35–$70 per unused gallon.",
    faq: [
      {
        q: "How do you calculate how much paint you need for a room?",
        a: "1. Calculate wall area: (room perimeter × ceiling height) − (windows × 15 sq ft) − (doors × 20 sq ft). For a 12×14 room with 8ft ceilings, 2 windows, 1 door: perimeter = 52ft × 8ft = 416 sq ft − 30 − 20 = 366 sq ft. 2. Divide by coverage rate per coat (350 sq ft/gallon standard): 366 ÷ 350 = 1.05 gallons per coat. 3. Multiply by number of coats (typically 2 for full coverage, especially colour changes): 1.05 × 2 = 2.1 gallons. Round up to the nearest quart or gallon: buy 2.25 or 2.5 gallons.",
      },
      {
        q: "How many coats of paint does a typical room need?",
        a: "New drywall (after primer): 2 coats. Repainting same or similar colour: 1–2 coats depending on application quality. Dark to light colour change: 2–3 coats (the dark undercolour bleeds through lighter paints). Light to dark: 2 coats usually sufficient. Repairing patched areas: always 2 coats — patches absorb more paint and look uneven with single coats. High-quality paint in the $50–$70/gallon range (Benjamin Moore Aura, Sherwin-Williams Emerald) is formulated for better one-coat coverage — the premium price often pays off in labour savings for professional painters.",
      },
      {
        q: "Should I use primer, and does it reduce how much paint I need?",
        a: "Primer is essential for: new drywall (required — paint soaks directly into unprimed drywall); dark-to-light colour changes (tinted primer in a mid-tone dramatically reduces topcoat count); stain-blocking (water stains, smoke, marker); and when switching between paint types (oil to latex). Properly primed surfaces typically require one fewer topcoat, saving $35–$70 in paint and 1–2 hours in application. Primer costs $25–$40/gallon but its coverage rate is similar to paint. For standard repaints of previously painted walls in similar colours, skip primer and apply 2 quality topcoats.",
      },
    ],
  },

  "passive-income-calculator": {
    intro:
      "Passive income is earnings generated with minimal ongoing active effort — dividends, rental income, interest, royalties, and business income from systems you've built. The '4% rule' — the safe withdrawal rate from a diversified investment portfolio — implies you need 25× your annual expenses to fund full financial independence passively. At $40,000/year in expenses, that's a $1,000,000 portfolio. The table shows passive monthly income at different portfolio sizes and yield rates.",
    faq: [
      {
        q: "What are the most reliable sources of passive income?",
        a: "By reliability and risk level: (1) Dividend stocks/ETFs: 1.5–4% yield, market-dependent; Vanguard High Dividend Yield ETF (VYM) yields ~3%. (2) REITs: 4–6% dividend yield with inflation hedging; publicly traded REITs are liquid. (3) I Bonds/TIPS: inflation-adjusted, government-backed, yield tied to CPI. (4) High-yield savings/CDs: 4.5–5.2% in 2025, risk-free up to FDIC limits. (5) Rental property: 5–8% cash-on-cash return in many markets, requires active management or property manager. (6) Index fund dividends: S&P 500 yields ~1.4% but total return with growth far exceeds dividend-only strategies.",
      },
      {
        q: "How much money do you need invested to earn $1,000/month in passive income?",
        a: "Required capital = monthly income × 12 ÷ annual yield. At a 5% annual yield: $1,000 × 12 ÷ 0.05 = $240,000. At 4%: $300,000. At 6%: $200,000. At 3% (S&P 500 dividend yield): $400,000. Key caveat: higher yield often means higher risk or lower growth. A dividend-heavy portfolio yielding 5% may grow more slowly than a growth-oriented portfolio yielding 1.5% but appreciating 8–10%/year. Total return (yield + appreciation) is the correct metric for long-term wealth building; pure yield optimisation can sacrifice capital growth.",
      },
      {
        q: "What is the difference between passive income and semi-passive income?",
        a: "Truly passive income requires essentially no ongoing work: dividend payments, bond interest, REIT distributions, index fund distributions. Semi-passive income requires periodic effort: rental properties (maintenance decisions, tenant issues, even with a property manager), content royalties (require upfront creation; YouTube, book sales, courses), peer-to-peer lending (portfolio management), angel investing (due diligence, follow-ons). Most 'passive income' marketed online is semi-passive at best and requires significant upfront capital or sweat equity. The correct question isn't 'is it passive?' but 'what is the hourly effective rate when I account for all time invested?'",
      },
    ],
  },

  "passive-income-calculator-uk": {
    intro:
      "Passive income in the UK is taxed differently from employment income: dividends have a separate annual allowance (£500 in 2024/25, down from £2,000 in 2022/23) and a lower tax rate; rental income is taxed as regular income but with a 20% tax credit on mortgage interest. ISAs (stocks and shares ISAs) shelter up to £20,000/year of investment from all UK tax — income and capital gains — making them the most efficient passive income vehicle for UK investors.",
    faq: [
      {
        q: "How is passive income taxed in the UK?",
        a: "Dividends: first £500/year is tax-free (2024/25). Above £500: basic rate (8.75%), higher rate (33.75%), additional rate (39.35%). Rental income: taxed as regular income after deductible expenses (maintenance, letting agent fees, insurance — but not mortgage capital repayments; mortgage interest gets only a 20% basic rate tax credit). Savings interest: Personal Savings Allowance — £1,000 for basic rate, £500 for higher rate, £0 for additional rate. Capital gains: Annual Exempt Amount £3,000 (2024/25) — reduced from £12,300 in 2022/23. All of these are eliminated inside a Stocks and Shares ISA or SIPP.",
      },
      {
        q: "What is the most tax-efficient passive income strategy in the UK?",
        a: "(1) Max your ISA allowance (£20,000/year): all income and gains inside an ISA are completely tax-free, permanently. Prioritise this above all else. (2) SIPP contributions: receive 20–45% immediate tax relief on contributions; income taxed in retirement at lower rates. (3) Dividends inside ISA: high-dividend UK ETFs (FTSE All-World High Dividend) yield 3–4% tax-free. (4) Property: rental income is less efficient due to income tax + reduced mortgage interest relief, but real estate appreciation and leverage can produce strong total returns. (5) Premium Bonds: £1M per person, prize-fund equivalent of ~4.4% in 2025, fully tax-free.",
      },
      {
        q: "What passive income rate should a UK investor target for financial independence?",
        a: "The 4% rule (SWR) applies in the UK as in the US: portfolio size = annual expenses × 25. With UK-specific adjustments: State Pension (full new State Pension = £11,502/year in 2025/26) reduces the private portfolio requirement. If State Pension covers £11,502 of £40,000 annual expenses: you only need to fund £28,498 passively → portfolio required = £712,450 rather than £1,000,000. Building ISA and SIPP wealth aggressively in your 30s and 40s, combined with the State Pension, makes UK financial independence more achievable than the headline numbers suggest.",
      },
    ],
  },

  "pay-raise-calculator": {
    intro:
      "The average US pay raise in 2025 is 3.8% (Conference Board). At 4% inflation, that's a 0.2% real wage gain. To genuinely advance financially, raises need to outpace inflation by a meaningful margin — and the most reliable way to achieve above-market raises is a job change rather than a merit review. Median raise for job-changers is 10–15%; for internal promotions, 5–10%; for annual merit reviews, 2–5%.",
    faq: [
      {
        q: "How do you calculate the dollar impact of a percentage raise?",
        a: "New salary = current salary × (1 + raise%). Dollar increase = current salary × raise%. Compounded over multiple years: salary after n years = current salary × (1 + annual raise%)^n. A $70,000 salary with 4% raises compounded annually: Year 1: $72,800; Year 3: $78,732; Year 5: $85,167; Year 10: $103,517. The compounding effect makes consistently negotiating even 1–2% above the standard raise significantly meaningful over a career — the difference between 3% and 5% annual raises on $70,000 is $38,000 in Year 10 salary.",
      },
      {
        q: "When and how should I ask for a raise?",
        a: "Timing: 4–6 weeks before your formal review cycle begins (to influence the budget allocation), or following a significant achievement. Preparation: (1) Research market rate on Glassdoor, Levels.fyi, LinkedIn Salary, and Bureau of Labour Statistics OES data; (2) Quantify your contributions with specific metrics (revenue added, costs saved, projects delivered); (3) Prepare for the conversation, not just the ask. Negotiation approach: anchor with a specific number (not a range — ranges are negotiated down to the bottom); state your case positively; be prepared for 'not now' and ask what would make a raise possible in 6 months.",
      },
      {
        q: "Is it better to negotiate a raise internally or switch jobs for more pay?",
        a: "Data consistently shows job-changers outperform internal negotiators: median salary increase for job changers is 10–15% (Federal Reserve Bank of Atlanta); internal merit raises average 2–5%; promotions 5–10%. The compounding effect is significant: if staying gets you 4%/year and switching gets you 12% every 3 years, after 9 years at the starting salary of $70,000: internal path = $99,700; switching path = $98,500 — almost equal, but the switcher also resets their market anchor. Switching every 3–4 years when meaningful advancement isn't available internally is a sound strategy for the first 10–15 career years.",
      },
    ],
  },

  "payroll-calculator": {
    intro:
      "Payroll calculations convert gross pay to net take-home pay after withholding federal income tax, FICA taxes (Social Security 6.2% + Medicare 1.45%), state income tax, and voluntary deductions (401k, health insurance, HSA). A $75,000 salary in a state with no income tax takes home approximately $58,200/year ($4,850/month). Adding a 6% 401k contribution reduces take-home to $54,300 but provides $4,500 in tax-advantaged savings.",
    faq: [
      {
        q: "What taxes are withheld from a US paycheck?",
        a: "Federal income tax: withheld based on W-4 elections and tax brackets (10–37%). Social Security tax: 6.2% on wages up to $176,100 (2025 wage base). Medicare tax: 1.45% on all wages, plus 0.9% Additional Medicare Tax on wages above $200,000 (single) or $250,000 (married). State income tax: 0% (TX, FL, WA, NV, WY, SD, AK) to 13.3% (CA). Local/city income tax: applicable in NYC, Philadelphia, and a handful of other municipalities. Total FICA taxes (Social Security + Medicare): 7.65% for employees; employers pay an additional 7.65% match.",
      },
      {
        q: "How do pre-tax deductions reduce payroll taxes?",
        a: "Pre-tax deductions reduce your taxable gross before federal and state income tax is calculated (though not FICA). Common pre-tax deductions: 401k traditional contributions ($23,500 limit in 2025); HSA contributions ($4,300 individual/$8,550 family in 2025); FSA ($3,300 in 2025); employer-sponsored health insurance premiums (usually pre-tax under Section 125). Example: $75,000 salary, $4,500 401k contribution (6%), $3,600 health insurance. Taxable income for federal purposes: $75,000 − $4,500 − $3,600 = $66,900. This reduces federal and state income tax withholding by $800–$1,800/year depending on tax bracket.",
      },
      {
        q: "What is the difference between gross pay and net pay?",
        a: "Gross pay is your total earnings before any deductions: base salary + overtime + bonuses + commissions. Net pay (take-home pay) is what's deposited in your bank: gross pay minus all taxes (federal income, FICA, state, local) and deductions (retirement contributions, health insurance, other voluntary deductions). The gap is typically 22–35% for most full-time US workers. As income rises, the gap widens: a $50,000 salary in a no-income-tax state: ~78% take-home. A $200,000 salary in California: ~62% take-home. Accurate net pay calculation requires knowing your specific W-4 elections, state, and deductions.",
      },
    ],
  },

  "pay-stub-calculator": {
    intro:
      "A pay stub shows your gross earnings, every tax withheld, all deductions, and net pay for the period — plus year-to-date totals. Understanding each line item helps you verify accuracy, identify errors (underpaid overtime, incorrect tax withholding), and optimise deductions. Payroll errors affect 82 million Americans each year according to the American Payroll Association — most are never caught because employees don't read their stubs.",
    faq: [
      {
        q: "What are the key components of a pay stub?",
        a: "Gross pay: total earnings for the period before any deductions (salary + overtime + bonus + commission). Withholdings section: Federal income tax; State income tax; Social Security (6.2%); Medicare (1.45%); local/city tax if applicable. Pre-tax deductions: 401k/403b, health insurance, HSA, FSA — these reduce taxable income. Post-tax deductions: Roth 401k contributions, garnishments, union dues, life insurance above IRS limits. Net pay: gross minus all withholdings and deductions. Year-to-date (YTD) totals: show cumulative earnings and withholdings for the current tax year — useful for verifying W-2 accuracy in January.",
      },
      {
        q: "How do I check if my tax withholding is correct?",
        a: "Compare your annualised withholding (YTD federal tax ÷ pay periods elapsed × total pay periods/year) against your estimated tax liability on the IRS Tax Withholding Estimator. A significant over-withholding means you're giving the IRS an interest-free loan; significant under-withholding means a tax bill plus potential underpayment penalty (applies if you owe more than $1,000 and paid less than 90% of current year tax). Life events requiring W-4 updates: marriage, divorce, new child, buying a home, significant pay changes, starting a side business.",
      },
      {
        q: "What should I do if I find an error on my pay stub?",
        a: "Document the error with your pay stub, timesheets, and employment contract. Report it in writing to HR/payroll — email creates a paper trail. Common fixable errors: overtime not paid at 1.5× rate; incorrect hours recorded; 401k match not applied; incorrect state tax (especially relevant if you work remotely in a different state than where your employer is based). For FLSA violations (unpaid overtime), the statute of limitations is 2 years (3 for wilful). If internal resolution fails: file a complaint with the Wage and Hour Division (DOL) for federal violations or your state labour board for state violations.",
      },
    ],
  },

  "percentage-increase-calculator": {
    intro:
      "Percentage change is one of the most commonly misused metrics — people routinely confuse percentage points with percentages, and frequently make errors on percentage decreases. A price rising from $80 to $100 is a 25% increase (not 20%). The same price falling from $100 back to $80 is a 20% decrease (not 25%). Symmetry doesn't hold: a 25% increase followed by a 20% decrease returns to the original value — not a net 5% gain.",
    faq: [
      {
        q: "How do you calculate percentage increase or decrease correctly?",
        a: "Percentage change = [(New value − Old value) ÷ Old value] × 100. Increase: old = 200, new = 250 → [(250 − 200) ÷ 200] × 100 = 25% increase. Decrease: old = 250, new = 200 → [(200 − 250) ÷ 250] × 100 = −20% decrease. Common error: using the wrong base. 'Sales rose from 40 to 60 units — a 50% increase' is correct (20 ÷ 40). But 'sales fell from 60 back to 40 — a 50% decrease' is wrong — it's a 33.3% decrease (20 ÷ 60). The base changes based on the starting point of each comparison.",
      },
      {
        q: "What is the difference between percentage points and percentages?",
        a: "Percentage points measure absolute difference between two percentages. Percentages measure relative change. If an interest rate rises from 2% to 3%: it rose by 1 percentage point (absolute) OR by 50% (relative — because 1 ÷ 2 = 0.5). Both statements are mathematically correct but describe different things. This distinction is crucial in: election results ('the party's support rose from 40% to 44% — a 4 percentage point gain' vs a '10% increase in support'); investment returns ('fees increased from 0.5% to 1% — a 0.5 percentage point increase' = a 100% increase in fee cost).",
      },
      {
        q: "How do you calculate percentage change for compound growth?",
        a: "For multi-period compound growth: CAGR = [(Ending value ÷ Starting value)^(1/years) − 1] × 100. A portfolio growing from $10,000 to $18,000 over 6 years: CAGR = (18,000/10,000)^(1/6) − 1 = 1.8^0.1667 − 1 = 0.1032 = 10.32%/year. This is the annualised growth rate. Simply dividing total percentage change (80%) by years (6) = 13.3%/year — this arithmetic average is wrong for compound growth because it doesn't account for the compounding effect. Always use CAGR for measuring investment performance over multiple periods.",
      },
    ],
  },

  "percentage-of-calculator": {
    intro:
      "Percentage calculations appear constantly in daily life: tip calculation, discount evaluation, tax estimation, grade calculation, nutritional labels. Despite this, surveys show ~60% of adults make at least one type of percentage calculation error regularly. The three core percentage calculations — finding a percentage of a number, finding what percentage one number is of another, and finding the original number given a percentage — each require a different formula.",
    faq: [
      {
        q: "What are the three main types of percentage calculations?",
        a: "Type 1 — Find the percentage of a number: P% of X = X × (P ÷ 100). 15% of 80 = 80 × 0.15 = 12. Type 2 — Find what percentage A is of B: (A ÷ B) × 100. 12 is what % of 80? → (12 ÷ 80) × 100 = 15%. Type 3 — Find the original number: X = A ÷ (P ÷ 100). 12 is 15% of what number? → 12 ÷ 0.15 = 80. Every percentage word problem is one of these three types. Identifying which type you're facing — 'find the part', 'find the rate', or 'find the whole' — immediately tells you which formula to apply.",
      },
      {
        q: "How do you quickly calculate percentages mentally?",
        a: "10% = move decimal point one place left. 1% = move decimal two places left. 5% = half of 10%. 20% = 10% × 2. 25% = divide by 4. 50% = divide by 2. 15% of $85: 10% = $8.50, 5% = $4.25, sum = $12.75. 18% tip on $62: 10% = $6.20, 8% = 5% ($3.10) + 3% ($1.86) = $4.96, total = $11.16. These decomposition shortcuts produce answers within 5 seconds without a calculator. Tipping, discounts, and sales tax are the most common real-world applications and can all be handled with 10%/5%/1% building blocks.",
      },
      {
        q: "Why do discounts compound when applied sequentially?",
        a: "Two successive discounts are not additive. A 20% discount followed by a 10% discount does not equal 30% off. It equals: 1 − (0.80 × 0.90) = 1 − 0.72 = 28% off. The second discount applies to the already-reduced price, making the combined saving less than the sum. Retailers use this to make discounts appear larger: '20% off, then an extra 10% off' sounds like 30% but is only 28%. Reverse calculation: if final price after 30% discount is $140, original price = $140 ÷ 0.70 = $200. Never subtract the discount percentage from the final price to find the original — always divide by (1 − discount%).",
      },
    ],
  },

  "pet-cost-calculator": {
    intro:
      "Pet ownership costs are routinely underestimated. The ASPCA estimates annual costs for a dog at $1,400–$4,300; a cat at $1,200–$2,500. These exclude unexpected veterinary costs, which average $1,000–$3,000 per incident for common emergencies (swallowed object, broken bone, urinary blockage in cats). Over a 12-year dog lifespan, total ownership cost commonly exceeds $20,000–$30,000 — and for large breeds with medical issues, $50,000+.",
    faq: [
      {
        q: "What are the biggest ongoing costs of owning a dog vs a cat?",
        a: "Dog annual costs: food ($400–$800 depending on size/quality); veterinary wellness visits ($200–$400); grooming ($360–$1,800/year for regular professional grooming); dog walking/daycare if working full-time ($1,200–$3,600/year); pet insurance ($500–$1,200/year); flea/tick/heartworm prevention ($120–$300/year). Total average: $2,000–$5,000/year. Cat annual costs: food ($250–$500); veterinary ($150–$300); litter ($200–$400); insurance ($300–$700). Total average: $1,000–$2,000/year. Cats are significantly cheaper to own, primarily because they don't require professional grooming or walkers.",
      },
      {
        q: "Is pet insurance worth the cost?",
        a: "Pet insurance is most valuable for: accident and illness coverage on younger pets (more likely to need emergency care); breeds with known health issues (French Bulldogs, Cavaliers, Pugs); owners who couldn't comfortably self-fund a $3,000–$5,000 emergency. Average pet insurance: dogs $600–$1,200/year; cats $300–$700/year. A study by Consumers Checkbook found most policyholders paid more in premiums than they received in claims over 5–7 years — but the minority who faced major surgeries or chronic conditions saved thousands. The correct framing: pet insurance is catastrophic protection, not a savings account. Consider it if unexpected $5,000+ vet bills would cause financial hardship.",
      },
      {
        q: "What hidden costs do first-time pet owners often miss?",
        a: "Setup costs for a new dog: adoption fee ($50–$500); spay/neuter if not already done ($200–$500); initial vaccinations ($100–$200); microchipping ($50); crate, bed, bowls, leash, collar, toys ($300–$600); puppy training classes ($150–$400). Ongoing overlooked costs: pet deposits/fees when renting ($200–$500 upfront plus $25–$75/month pet rent); boarding or pet-sitting during travel ($40–$100/night for dogs); dental cleanings under anaesthesia ($300–$800/year — critical for preventing periodontal disease and cardiac issues); prescription food for health conditions ($50–$150/month extra).",
      },
    ],
  },

  "phone-addiction-calculator": {
    intro:
      "The average US adult spends 4 hours 37 minutes on their smartphone daily (Statista 2025). That's 1,688 hours per year — equivalent to 70 full days, or 42% of all waking hours. Time isn't the only cost: research shows smartphone interruptions increase task completion time by 23 minutes per interruption. In a knowledge-worker context, high phone use correlates directly with reduced deep work capacity and measurably lower productivity.",
    faq: [
      {
        q: "How much time do people actually spend on their phones each day?",
        a: "Average daily smartphone usage (Statista/App Annie 2025): US adults 4h 37m; UK adults 3h 47m; global average 3h 46m. Breakdown: social media 2h 27m; video streaming 1h 02m; gaming 32m; messaging 24m; all other 12m. Younger demographics (18–24) average 6+ hours daily. Self-reported estimates are typically 30–50% lower than actual usage measured by Screen Time or Digital Wellbeing apps. If you've never checked your Screen Time data, the actual number is almost certainly higher than your intuition suggests.",
      },
      {
        q: "What is the productivity and cognitive cost of smartphone overuse?",
        a: "Research findings: (1) University of Texas (2017): merely having your phone visible on a desk — even face-down and silent — reduces working memory and fluid intelligence by a measurable amount (the 'brain drain' effect). (2) UC Irvine: average worker takes 23 minutes to return to full task focus after a single interruption. (3) American Journal of Preventive Medicine: 2+ hours/day on social media associated with 2× higher rates of perceived social isolation. (4) Microsoft Workplace study: context switching (multitasking between apps) reduces effective IQ by up to 10 points — comparable to losing a night's sleep.",
      },
      {
        q: "What are the most effective strategies to reduce phone usage?",
        a: "Evidence-based approaches: (1) Grayscale mode — turning your screen black and white reduces dopamine-triggering visual stimulation; most users report 20–30% reduction in compulsive checking. (2) Phone-free bedroom — charging outside the bedroom eliminates the first/last 30-minute phone habit and typically improves sleep onset by 15–20 minutes. (3) App time limits in Screen Time/Digital Wellbeing for the highest-use apps. (4) Notification audit: disable all non-essential notifications; use batch-check windows for social media (e.g., twice daily) rather than real-time alerts. (5) Physical distance: leaving the phone in another room during focused work produces measurable cognitive performance improvements versus silent-on-desk.",
      },
    ],
  },

  "pomodoro-calculator": {
    intro:
      "The Pomodoro Technique — developed by Francesco Cirillo in the late 1980s — structures work into 25-minute focused sessions (pomodoros) separated by 5-minute breaks, with a longer 15–30 minute break after every 4 sessions. It's one of the most research-supported productivity methods for knowledge workers, exploiting the brain's ultradian rhythm (90-minute cycles of high/low focus) and the Zeigarnik effect (incomplete tasks create motivation to continue).",
    faq: [
      {
        q: "How does the Pomodoro Technique work and why is it effective?",
        a: "Standard format: 25 minutes of focused work, 5 minutes' break, repeat × 4, then a 25–30 minute long break. The scientific basis: (1) Working memory degrades after 20–30 minutes of sustained focus — scheduled breaks restore performance rather than causing it. (2) The 25-minute timer creates a commitment device that reduces task-switching temptation. (3) Tracking completed pomodoros provides concrete productivity feedback and reduces perfectionism paralysis ('just one more pomodoro' is a lower-barrier starting commitment). (4) Regular breaks prevent the mental fatigue accumulation that causes errors and reduced output quality in longer uninterrupted sessions.",
      },
      {
        q: "How many Pomodoros can you realistically complete in a workday?",
        a: "Cirillo's research and practitioner reports converge on 8–12 pomodoros as a realistic maximum for focused knowledge work in a standard 8-hour workday. This implies 3–5 hours of genuine focused work, with the remainder in breaks, transitions, admin, and meetings. Many practitioners report 4–6 pomodoros as their realistic productive output on complex cognitive tasks. The calculator helps quantify this: if you complete 8 pomodoros × 25 minutes = 200 minutes (3h 20m) of focused work, that's an excellent knowledge-work day — most people achieve far less in actual focused output despite being 'at work' for 8 hours.",
      },
      {
        q: "Should I adjust the pomodoro timer length for different types of work?",
        a: "Yes — the standard 25 minutes is optimised for tasks that can be chunked in short intervals (writing, email, administrative tasks). For deep creative work or complex programming: extended pomodoros (45–50 minutes + 10-minute break) often produce better results because context-loading time is high. Cal Newport (Deep Work) advocates 90-minute deep work blocks aligned with ultradian rhythms. For simple repetitive tasks: shorter 15-minute sessions prevent boredom and maintain accuracy. The principle — alternating focused work with real breaks — matters more than the specific duration. Experiment with 25, 45, and 90-minute blocks to find your personal optimal.",
      },
    ],
  },

  "procrastination-cost": {
    intro:
      "Procrastination has direct, quantifiable financial costs beyond lost time. Delayed retirement contributions cost compound growth (delaying $500/month by 5 years costs approximately $143,000 in final balance at 7%). Late bill payments cost penalty fees and interest rate increases. Delayed health screenings cost early-detection opportunities. The table below quantifies the financial impact of common procrastination scenarios to attach concrete dollar figures to the abstract 'cost of waiting'.",
    faq: [
      {
        q: "What is the financial cost of delaying retirement savings by 5 years?",
        a: "Delaying starting $500/month at 7% real return: starting at 25 vs 30 → final balance at 65 difference: $525,000 vs $367,000 = $158,000 less. Starting at 25 vs 35 → $525,000 vs $254,000 = $271,000 less. The first 5 years of compounding are architecturally critical because those dollars compound the longest. Every year of delay starting at 25 costs approximately $30,000–$40,000 in final balance. This is the most expensive procrastination in personal finance — the cost is invisible in the short term and catastrophic over a career.",
      },
      {
        q: "What does it cost to procrastinate on paying off high-interest debt?",
        a: "Interest accrues daily on credit card balances. A $5,000 balance at 22% APR: monthly interest charge ≈ $91.67. Each month of minimum payment behaviour barely reduces the principal — minimum payment of $100 on $5,000 at 22% APR takes over 8 years to pay off and costs $2,600+ in total interest. Contrast with paying $300/month: paid off in 19 months, $500 in interest. The procrastination cost of paying minimum vs accelerated: $2,100 in extra interest plus 80 additional months of financial stress. For every $1,000 in credit card debt at 22%, each month of delay costs approximately $18 in net-new interest.",
      },
      {
        q: "How does procrastination affect psychological productivity, not just money?",
        a: "Research by Pychyl and Sirois shows that procrastinators experience higher stress, poorer sleep, and more illness compared to non-procrastinators — primarily because tasks remain in working memory as 'open loops' (the Zeigarnik effect). The task of worrying about something unfinished consumes cognitive resources even when you're not working on it. Paradoxically, starting a task — even partially — closes the open loop and reduces cognitive load. The 2-minute rule (if it takes less than 2 minutes, do it now), implementation intentions ('I will do X at 9am on Tuesday in my office'), and commitment devices (accountability partners, deadlines) all address the root psychological mechanism.",
      },
    ],
  },

  "profit-margin-calculator": {
    intro:
      "Profit margin is the percentage of revenue that remains as profit after costs. Gross margin excludes only direct costs of goods sold. Operating margin also deducts sales, general, and administrative expenses. Net margin deducts everything including interest and tax. A business with 60% gross margin and 5% net margin is spending most of its revenue on overhead and operations — a business with 60% gross and 35% net has lean operations and strong pricing power.",
    faq: [
      {
        q: "What is the difference between gross, operating, and net profit margin?",
        a: "Gross profit margin = (Revenue − COGS) ÷ Revenue × 100. Measures production efficiency. Operating profit margin = (Revenue − COGS − Operating expenses) ÷ Revenue × 100. Measures operational efficiency including overheads. Net profit margin = Net income ÷ Revenue × 100. The bottom line after all costs, interest, and taxes. Example: $1M revenue, $400K COGS, $350K operating expenses, $100K interest and tax. Gross margin = 60%; Operating margin = 25%; Net margin = 15%. Investors analyse all three — gross margin reveals pricing power; operating margin reveals management efficiency; net margin reveals the actual shareholder return.",
      },
      {
        q: "What is a good profit margin for a small business?",
        a: "Gross margin benchmarks: service businesses (consulting, coaching, software): 60–80%; professional services: 70–85%; e-commerce: 35–50%; food/beverage retail: 60–70% (but 3–9% net after labour and overhead); manufacturing: 25–40%. Net profit margin for small businesses: 10–20% is typically considered healthy; under 5% is marginal; above 20% indicates strong pricing power and operational efficiency. Most small businesses should be targeting gross margins above 50% to leave enough room for overhead expenses and still generate meaningful net income. Low gross margins are very difficult to overcome with volume alone.",
      },
      {
        q: "How do I improve my business profit margin without raising prices?",
        a: "Direct cost reduction (improving gross margin): negotiate better supplier pricing (volume commitments typically yield 10–20% discounts); reduce waste and spoilage; improve procurement to eliminate premium prices on rushed orders; switch to more cost-effective ingredients/materials of equivalent quality. Operating expense reduction (improving operating margin): audit subscriptions and recurring software ($2,000–$5,000/month in unused SaaS tools is common for small businesses); reduce contractor overhead in slow periods; transition to performance-based compensation where feasible. Revenue mix optimisation: analyse gross margin by product/service line — shift marketing and sales focus toward highest-margin offerings.",
      },
    ],
  },


  "protein-intake-calculator": {
    intro:
      "Protein is the most important macronutrient for body composition — it builds and repairs muscle tissue, is the most satiating nutrient per calorie, and has the highest thermic effect of food (20–30% of its calories are burned in digestion). The RDA of 0.36g per pound (0.8g/kg) is a minimum for health, not an optimum for performance. Research consistently shows 0.7–1.0g per pound of body weight as the target range for active adults seeking to build or preserve muscle.",
    faq: [
      {
        q: "How much protein do I need per day to build muscle?",
        a: "The research consensus (International Society of Sports Nutrition, 2017): 0.7–1.0g per pound of body weight (1.6–2.2g/kg) per day for individuals resistance training and seeking to maximise muscle protein synthesis. A 175lb person needs 122–175g of protein daily. Going beyond 1.0g/lb provides no additional muscle-building benefit in most studies. Protein needs are higher during calorie deficits (when muscle preservation is at risk) and for older adults (who require more protein for equivalent MPS stimulation due to anabolic resistance).",
      },
      {
        q: "What are the best high-protein foods per calorie?",
        a: "Protein density (g protein per 100 calories): egg whites (12g/100 cal); chicken breast (18g/100 cal); non-fat Greek yogurt (17g/100 cal); canned tuna (22g/100 cal); shrimp (20g/100 cal); tofu (11g/100 cal); lentils (8g/100 cal); cottage cheese (14g/100 cal). Least efficient: peanut butter (4g/100 cal); cheese (6g/100 cal); whole milk (5g/100 cal). Protein shakes (20–25g per 100–120 cal) are the most efficient supplement for hitting targets — not necessary if you can reach your protein goal through food, but practical for people with high targets (150g+/day) or low appetite.",
      },
      {
        q: "Does it matter when you eat protein throughout the day?",
        a: "Research on protein timing: (1) Total daily intake matters most — hitting your daily target is more important than timing. (2) Spreading protein across 3–4 meals (30–50g per meal) is more effective than consuming it in 1–2 large doses — muscle protein synthesis is limited per session. (3) Pre-sleep protein: 30–40g of casein protein before bed increases overnight muscle repair (van Loon research). (4) Post-workout window: the 'anabolic window' is longer than once thought — consuming protein within 2 hours post-workout is sufficient; the immediate post-workout urgency is overstated for people who ate a pre-workout meal.",
      },
    ],
  },

  "pto-calculator": {
    intro:
      "The US is the only developed nation with no federal mandate for paid time off. Despite this, 79% of private-sector employees receive paid vacation (BLS 2024). The average private-sector employee receives 10 days after 1 year, growing to 15 days after 5 years and 20 days after 20 years. Unused PTO has an implicit dollar value — a $75,000 salary worker carries $288/day in unused PTO. Many employers have use-it-or-lose-it policies; others pay out unused leave upon separation.",
    faq: [
      {
        q: "How do you calculate the dollar value of unused PTO?",
        a: "Daily PTO value = annual salary ÷ working days per year (typically 260). $80,000 ÷ 260 = $307.69/day. Five unused PTO days = $1,538. This calculation matters for: (1) negotiating PTO as part of a job offer — a salary negotiation that ignores PTO differences misses real compensation value; (2) understanding forfeiture risk under use-it-or-lose-it policies; (3) calculating PTO payout value upon separation (in states that require it). California, Illinois, and Montana prohibit use-it-or-lose-it PTO policies — all accrued PTO must be paid out at termination.",
      },
      {
        q: "How does PTO accrual work and what is a typical accrual rate?",
        a: "Accrual methods: (1) Lump sum — full year's PTO granted on a specific date (Jan 1 or hire anniversary). (2) Per pay period — PTO earned gradually: 15 days/year ÷ 26 biweekly periods = 0.577 days per period. (3) Hours-based — common in hourly work: 1 hour of PTO for every 30 hours worked. (4) Unlimited PTO — no accrual; studies show employees typically take less leave under unlimited policies than under structured accrual. Accrual policies matter for timing: under per-period accrual, a new employee who uses PTO before fully accruing it may have a negative balance if they leave early.",
      },
      {
        q: "How much PTO do I need to negotiate for in a job offer?",
        a: "Context benchmarks: entry level (0–3 years experience): 10–15 days typical. Mid-career (5–10 years): 15–20 days. Senior/executive: 20–25+ days. European-headquartered companies operating in the US often offer 20–25 days as a baseline. Tech industry: unlimited or 20+ days increasingly standard. PTO gap negotiation: if Company A offers $80,000 + 10 PTO days, and Company B offers $75,000 + 20 PTO days, the PTO difference is worth $1,538 ($307/day × 5 extra days) — Company B's true compensation gap is only $3,462, not $5,000. PTO is highly negotiable when salary flexibility is limited.",
      },
    ],
  },

  "quit-smoking-calculator": {
    intro:
      "The average US smoker spends $3,000–$5,000 per year on cigarettes (1 pack/day at $9–$14/pack depending on state). Over 20 years invested at 7%, that's $160,000–$270,000 in foregone wealth — for one pack per day. The health benefits are even more significant: within 1 year of quitting, excess cardiac risk is halved; within 10 years, lung cancer risk is half that of a continuing smoker; within 15 years, cardiovascular risk approaches that of a lifelong non-smoker.",
    faq: [
      {
        q: "How much money does the average smoker spend on cigarettes per year?",
        a: "Average cigarette cost by state ranges from $6.11/pack (Missouri) to $12.85/pack (New York including taxes, 2025). At 1 pack/day: $2,230–$4,690/year. At 1.5 packs/day: $3,345–$7,035/year. Additional smoking-related costs: life insurance premium surcharges (smokers pay 2–4× the rate of non-smokers — a $500,000 20-year term policy costs $50–$80/month for a non-smoking 35-year-old vs $150–$250/month for a smoker = $1,200–$2,040/year extra). Health insurance surcharges (ACA allows up to 50% higher premiums for smokers). Increased dental/medical costs. Total annual cost of smoking is commonly $5,000–$10,000+ when all factors are included.",
      },
      {
        q: "What are the health benefits timeline after quitting smoking?",
        a: "20 minutes: heart rate and blood pressure drop. 12 hours: carbon monoxide levels in blood normalise. 2 weeks–3 months: circulation improves, lung function increases by up to 30%. 1–9 months: coughing and shortness of breath decrease; cilia regrow, reducing infection risk. 1 year: excess coronary heart disease risk is cut in half vs continuing smoker. 5 years: stroke risk equals that of a non-smoker in many studies. 10 years: lung cancer death rate about half of a continuing smoker's; precancerous cells replaced by normal cells. 15 years: risk of coronary heart disease equals that of a non-smoker.",
      },
      {
        q: "What smoking cessation methods are most effective?",
        a: "Efficacy by intervention (6-month quit rates): unaided cold turkey: 3–5%; nicotine replacement therapy (patches, gum, lozenge): 10–16%; prescription medication (varenicline/Chantix): 20–35%; combination NRT (e.g., patch + fast-acting): 15–25%; behavioural counselling alone: 10–12%; medication + counselling: 30–40% — the most effective combination. Apps and texting programmes add 3–6% success rate when combined with other methods. Cost of cessation aids is typically covered by insurance under the ACA preventive care mandate. The average successful quitter attempts to quit 8–10 times before succeeding — each attempt increases knowledge of personal triggers and effective strategies.",
      },
    ],
  },

  "relationship-cost-calculator": {
    intro:
      "The average American wedding costs $33,900 (The Knot 2024). Dating costs an estimated $5,000–$8,000 per year for active daters. A committed relationship adds $3,000–$6,000/year in joint activities, gifts, and holidays. Over a 40-year marriage, the combined cost of shared financial decisions, vacation spending, and lifestyle inflation can differ by $500,000–$1,000,000 between couples with aligned vs misaligned financial values. The single most important financial decision most people make is who they choose to partner with.",
    faq: [
      {
        q: "How much does dating cost on average per year?",
        a: "Cost components for active dating (US 2025): dating app subscriptions ($120–$540/year for premium tiers); dates (average first-date spend $50–$150; frequent daters going on 2 dates/month: $1,200–$3,600/year on dates); grooming and presentation upgrades ($500–$1,500 for active daters); social activities $500–$1,000/year. Total for active dating: $2,500–$7,000/year. Lower end for selective daters using free apps; higher end for premium-app, frequent-date urban daters. These are personal discretionary costs — the more relevant financial question is the long-term cost of partnership compatibility.",
      },
      {
        q: "What is the financial impact of financial incompatibility in a relationship?",
        a: "Couples with different financial values — particularly around spending, risk tolerance, and saving priorities — experience: higher rates of financial conflict (the #1 predictor of divorce, per Journal of Family and Economic Issues); joint financial decisions pulled toward the less financially disciplined partner's habits; potential liability exposure from a partner's irresponsible debt. The 'financial drag' effect: a saver partnered with a spender can realistically fall $100,000–$300,000 short of financial independence goals compared to two aligned savers, purely from lifestyle inflation and reduced savings rates. Discussing financial values and credit scores is among the most important pre-commitment conversations.",
      },
      {
        q: "Does marriage have a financial benefit, and is there a marriage penalty in taxes?",
        a: "Marriage benefits: (1) Joint assets and combined income can increase mortgage qualification and improve savings rate through shared fixed costs; (2) Survivor benefits on Social Security; (3) Estate and gift tax exclusions for married couples; (4) Health insurance sharing. Marriage penalties: (1) Tax code: couples where both partners earn similar high incomes are pushed into higher marginal brackets — two $80,000 earners filing jointly are taxed as a $160,000 household, sometimes hitting higher brackets than filing separately; (2) Student loan IDR plans: spousal income can significantly increase monthly payments; (3) Some government benefit programmes have married-couple thresholds. For most couples, the financial benefits of marriage outweigh the penalties.",
      },
    ],
  },

  "rent-vs-buy-calculator": {
    intro:
      "Renting is not throwing money away, and buying is not always wealth-building — both claims are oversimplifications. The correct comparison is the opportunity cost of the down payment + the cost of ownership vs the total cost of renting with the capital difference invested. At today's 7% mortgage rates, buying often takes 5–8 years to break even against renting in most US markets. In high-cost cities (NYC, SF), break-even can extend to 10–15+ years.",
    faq: [
      {
        q: "How do you calculate the true cost of buying vs renting?",
        a: "Buying true annual cost: mortgage P&I + property tax (1–2% of value) + insurance ($100–$200/month) + maintenance (1–2% of value/year) + PMI if applicable − mortgage interest deduction (if itemising) − home appreciation. Renting true annual cost: rent + renter's insurance ($150–$300/year) − investment return on down payment capital (if invested in stocks). The 'price-to-rent ratio' provides a quick benchmark: home price ÷ annual rent. Ratio under 15 = buying favoured; 15–20 = neutral; over 20 = renting likely favourable. Manhattan averages 40–50; Austin ~22; Cleveland ~10.",
      },
      {
        q: "What is the break-even point for buying vs renting?",
        a: "Break-even is where total cost of owning falls below total cost of renting (including opportunity cost of down payment). Key variables: closing costs (2–5% of purchase price) must be amortised; home appreciation rate vs stock market return; mortgage rate; local rent growth rate. At 7% mortgage rate with 20% down: in a market with 3% annual appreciation and 3% rent growth, break-even is typically 5–7 years. In a market with flat appreciation and 5% rent growth, break-even may be 3–4 years. New York Times' interactive rent-vs-buy calculator is the most comprehensive publicly available tool for this analysis.",
      },
      {
        q: "When does renting make more financial sense than buying?",
        a: "Renting is financially superior when: (1) You expect to move within 3–5 years — transaction costs (6–10% round-trip) aren't recovered in short holds; (2) Price-to-rent ratio is above 20 in your market — the capital is more efficiently deployed in the stock market; (3) You have high-interest debt — the guaranteed return of debt payoff beats uncertain home appreciation; (4) You're in a declining or flat real estate market; (5) You can invest the down payment + monthly ownership-vs-rent savings difference in a diversified portfolio. The emotional and social benefits of homeownership are real and valid — but they're not financial arguments.",
      },
    ],
  },

  "retirement-calculator": {
    intro:
      "Retirement planning requires estimating three things: how much you'll accumulate, how long you'll live, and how much you'll spend. The 4% safe withdrawal rate rule means you need 25× your annual expenses. At $60,000/year in retirement expenses, that's $1.5M. Social Security offsets this — the average benefit is $1,907/month (2025), covering $22,884/year. The private portfolio then only needs to fund $37,116/year — requiring $928,000, not $1.5M.",
    faq: [
      {
        q: "How do you calculate how much you need to retire?",
        a: "Step 1: Estimate annual retirement spending (typically 70–85% of pre-retirement income, though varies widely). Step 2: Subtract guaranteed income: Social Security (estimate at ssa.gov/estimator) + any pension. Step 3: Remaining gap × 25 = required portfolio (at 4% SWR). Example: $80,000 pre-retirement income → $64,000/year needed; Social Security provides $24,000; gap = $40,000. Required portfolio = $40,000 × 25 = $1,000,000. Step 4: Use a retirement calculator to model whether your current savings rate will hit this target by your target retirement age.",
      },
      {
        q: "What is the 4% rule and is it still valid in 2025?",
        a: "The 4% rule (Bengen, 1994; Trinity Study, 1998) states that a retiree can withdraw 4% of their initial portfolio value in year 1, then adjust for inflation annually, and have a 95%+ probability of the portfolio lasting 30 years in a diversified 60/40 stock/bond portfolio. Modern critiques: (1) Lower expected bond returns in 2025 than historical periods; (2) Longer retirement horizons (retiring at 55, not 65, requires 35–40 years); (3) Sequence of returns risk is severe in early retirement. Many planners now recommend 3.3–3.5% for early retirees, or use dynamic withdrawal strategies that reduce spending in down markets.",
      },
      {
        q: "What are the best retirement savings account types in order of priority?",
        a: "(1) 401k up to employer match: 100% immediate return from free match money. (2) HSA if eligible: triple tax advantage (deductible, grows tax-free, withdrawn tax-free for medical). (3) Roth IRA ($7,000 limit, 2025): tax-free growth and withdrawals; best for those expecting higher income in retirement. (4) Traditional IRA ($7,000 limit): deductible if below income thresholds; useful when you expect lower tax rates in retirement. (5) Return to 401k up to annual limit ($23,500 in 2025; $31,000 if 50+). (6) Taxable brokerage after tax-advantaged accounts are maxed. This order maximises tax efficiency — the compound benefit of tax-free growth over 30+ years is worth more than most people realise.",
      },
    ],
  },

  "road-trip-cost": {
    intro:
      "The average road trip costs $150–$400/day for a family of four including fuel, food, accommodation, and activities — comparable to flying for trips under 500 miles but increasingly cheaper than flying for longer distances once you factor in the flexibility, luggage fees, and group size. Fuel is typically only 20–35% of total road trip cost; accommodation and meals are the dominant expenses.",
    faq: [
      {
        q: "How do you calculate road trip fuel cost?",
        a: "Fuel cost = (total miles ÷ car MPG) × fuel price per gallon. A 1,200-mile round trip in a car averaging 30 MPG with gas at $3.40/gallon: (1,200 ÷ 30) × $3.40 = $136 total fuel cost. For an SUV at 22 MPG: $185. For a truck at 18 MPG: $227. EV equivalent: (miles ÷ miles/kWh) × electricity cost/kWh. At 3.5 miles/kWh and $0.15/kWh: same 1,200-mile trip = $51. The US Department of Energy's fueleconomy.gov calculator provides real-world MPG data for any vehicle make and model.",
      },
      {
        q: "What are the biggest costs on a road trip beyond fuel?",
        a: "Accommodation: $100–$200/night budget hotel; $150–$350 mid-range; camping $30–$80/site. For a 7-day trip: $700–$2,450 depending on choice. Food: $50–$100/day for a couple (mix of grocery stops, diners, fast food); $100–$200/day if eating at restaurants. Activities and attractions: $50–$200/day depending on destination. Tolls: highly variable; a New York to Florida route can include $40–$80 in tolls. Breakdown/emergency fund: budget $100–$200 for unexpected costs. Total for a 7-day couple's road trip: $1,200–$4,000 depending on accommodation and activity choices.",
      },
      {
        q: "When is driving cheaper than flying for a trip?",
        a: "Driving vs flying comparison: driving wins when: (1) group size is 3+ people (flight costs multiply per person; car cost stays mostly fixed); (2) trip is 300–600 miles where driving is 5–8 hours (competitive with airport time + flight); (3) you need the car at the destination (saves rental car costs of $50–$150/day). Flying wins when: (1) solo travel over 600 miles; (2) your time has a high value (long-haul drives cost 8–20 hours of productivity); (3) you can find sub-$100 fares and don't need a rental car. The hidden wildcard: driving allows flexibility, spontaneous stops, luggage with no fees, and pet travel — factors that often tip the decision.",
      },
    ],
  },

  "roi-calculator": {
    intro:
      "Return on Investment (ROI) measures the profitability of an investment relative to its cost. ROI = (Net return ÷ Cost of investment) × 100. It's deliberately simple — and that simplicity is both its strength and its limitation. ROI ignores time horizon, so a 50% return over 10 years is far less impressive than a 50% return in 1 year. For time-adjusted comparisons, use annualised ROI or IRR (Internal Rate of Return).",
    faq: [
      {
        q: "How do you calculate ROI correctly?",
        a: "Basic ROI = (Final value − Initial cost) ÷ Initial cost × 100. Invested $5,000, now worth $7,500: ROI = ($7,500 − $5,000) ÷ $5,000 × 100 = 50%. For multi-period investments or comparing across different time horizons, use Annualised ROI (CAGR): Annualised ROI = [(Final value ÷ Initial cost)^(1/years) − 1] × 100. That 50% ROI over 5 years: (1.50)^(1/5) − 1 = 8.45%/year. Over 2 years: (1.50)^(1/2) − 1 = 22.5%/year — a dramatically better return despite the same nominal 50%.",
      },
      {
        q: "What is a good ROI and how does it compare across asset classes?",
        a: "Historical annualised returns (real, inflation-adjusted): US large-cap stocks (S&P 500): ~7%; global diversified equity: ~5–6%; bonds: 1–2%; real estate (residential): 3–4% price appreciation + 3–5% rental yield = 6–8% total; gold: ~0.7% real; cash/savings: typically negative in real terms. A 'good' ROI is context-dependent — 7% annualised from an index fund is excellent; 7% from a startup investment in year 10 represents significant under-performance given the risk. Always compare ROI to the relevant benchmark and adjust for risk level.",
      },
      {
        q: "What is the difference between ROI and IRR?",
        a: "ROI measures total percentage gain without regard to timing of cash flows. IRR (Internal Rate of Return) finds the discount rate that makes the net present value of all cash flows equal to zero — it's the true annualised return accounting for when money was invested and returned. ROI is best for simple single-investment comparisons. IRR is essential for: investments with multiple cash flows at different times (rental property with ongoing rent income + eventual sale); evaluating real estate deals; comparing private equity or business investments. Excel's IRR() function calculates it from a series of cash flows. For simple investment growth with no interim cash flows, annualised ROI (CAGR) and IRR produce identical results.",
      },
    ],
  },

  "running-pace-calculator": {
    intro:
      "Running pace, speed, and distance are interrelated: pace (min/mile) × distance = total time; speed (mph) = 60 ÷ pace. A 10-minute/mile pace equals 6 mph. Most recreational runners target 9–12 min/mile; competitive amateur runners 7–9 min/mile; sub-elite runners 6–7 min/mile. For race goal planning, accurate pace-to-finish-time conversion is essential — 26.2 miles at 10:00/mile = 4:22 marathon finish.",
    faq: [
      {
        q: "How do you calculate running pace, speed, and finish time?",
        a: "Pace (min/mile) = total time (minutes) ÷ distance (miles). Speed (mph) = distance (miles) ÷ time (hours). Finish time = pace × distance. Examples: 5K in 28:00 → pace = 28 ÷ 3.107 = 9:01/mile; speed = 3.107 ÷ 0.4667 = 6.66 mph. For a marathon (26.2 miles) goal of sub-4 hours: required pace = 240 minutes ÷ 26.2 = 9:09/mile. Metric conversions: 1 mile = 1.609km; pace in min/km = pace in min/mile ÷ 1.609. A 5:00/km pace = 8:03/mile.",
      },
      {
        q: "How do I set realistic race finish time goals based on training pace?",
        a: "Common race pace predictors: 5K time is the strongest predictor of potential at longer distances. Pete Riegel's formula: T2 = T1 × (D2/D1)^1.06. From a 25:00 5K (T1=25, D1=3.107 miles): 10K time = 25 × (6.214/3.107)^1.06 = 51:55; half marathon = 25 × (13.1/3.107)^1.06 = 1:55:11; marathon = 25 × (26.2/3.107)^1.06 = 4:00:43. McMillan Running Calculator uses more sophisticated models. For race-day performance, expect 10–15% slower pace for the full marathon vs half marathon, not simply double the half time.",
      },
      {
        q: "How many calories does running burn per mile?",
        a: "Calories burned per mile ≈ body weight in pounds × 0.63 (walking) or 0.63 (running — nearly the same per mile, though running does so faster). A 150lb runner burns approximately 94 calories per mile, or ~680 calories for a 10K, ~1,785 calories for a marathon. Exact figures vary ±15% based on terrain, pace, and individual metabolism. Running speed above 8 mph (7:30/mile) creates additional aerobic demand that increases per-mile calorie burn slightly. The commonly cited 100 calories/mile is a reasonable population-average estimate — use body weight × 0.63 for greater accuracy.",
      },
    ],
  },

  "salary-breakdown-calculator": {
    intro:
      "A $75,000 annual salary translates to: $6,250 gross monthly; $2,884 gross biweekly; $1,442 gross weekly; $36.06 gross hourly (at 40hr/week). After federal income tax, FICA (7.65%), and state tax, a $75,000 salary in a no-income-tax state takes home approximately $57,200/year ($4,767/month). Understanding every step of this conversion — annual to hourly, gross to net — is essential for budgeting and job offer evaluation.",
    faq: [
      {
        q: "How do you convert annual salary to hourly, monthly, and biweekly?",
        a: "Annual to hourly: salary ÷ 2,080 (40hr/week × 52 weeks). $75,000 ÷ 2,080 = $36.06/hour. Annual to monthly gross: salary ÷ 12 = $6,250. Annual to biweekly gross: salary ÷ 26 = $2,884.62. Annual to semi-monthly (24 periods): salary ÷ 24 = $3,125. Annual to weekly: salary ÷ 52 = $1,442.31. Note: biweekly (every 2 weeks = 26 payments/year) and semi-monthly (twice per month = 24 payments/year) are different — biweekly produces two months per year with 3 paychecks, while semi-monthly is always exactly 2 per month.",
      },
      {
        q: "What is the take-home pay on a $75,000 salary?",
        a: "At $75,000 gross, single filer, no state income tax (e.g., Texas/Florida/Washington): Federal income tax: ~$10,294 (2025 tax brackets with standard deduction of $14,600 → taxable income $60,400); FICA: $5,738 (7.65%); Total deductions: ~$16,032. Net take-home: ~$58,968/year ($4,914/month). With a state income tax of 5% on taxable income: add ~$3,020; take-home drops to ~$55,948 ($4,662/month). Adding a 6% 401k contribution ($4,500): reduces taxable income and federal tax by ~$990, net take-home becomes ~$55,458 — but you've also saved $4,500 pre-tax.",
      },
      {
        q: "How does take-home pay change with different pre-tax deductions?",
        a: "Pre-tax deductions reduce federal and state income tax (but not FICA). The tax savings from each dollar contributed pre-tax equals your marginal tax rate. At $75,000 (22% federal bracket): each $1,000 in 401k contribution saves $220 in federal tax. A $6,000 401k contribution costs only $4,681 in reduced take-home pay, while the full $6,000 goes to your retirement account — an immediate 28% return from tax savings alone. Similarly: $3,600 employer health insurance (pre-tax under Section 125) saves approximately $792 in federal income tax, making the true out-of-pocket cost $2,808, not $3,600.",
      },
    ],
  },

  "salary-breakdown-calculator-uk": {
    intro:
      "A £50,000 annual salary in the UK breaks down to: £4,167 gross monthly; £961.54 gross weekly; £24.04 gross hourly. After income tax (20% on earnings above £12,570) and employee National Insurance (8% between £12,570–£50,270), take-home pay is approximately £37,200/year (£3,100/month) in 2025/26 — approximately 74.4% of gross. This is the salary most commonly cited at the 40% higher-rate threshold boundary.",
    faq: [
      {
        q: "How do you convert annual salary to monthly, weekly, and hourly in the UK?",
        a: "Annual to monthly gross: salary ÷ 12. £45,000 ÷ 12 = £3,750. Annual to weekly: salary ÷ 52 = £865.38. Annual to hourly (37.5hr/week): salary ÷ (37.5 × 52) = salary ÷ 1,950. £45,000 ÷ 1,950 = £23.08/hour. For 40hr/week: divide by 2,080. Daily rate: salary ÷ 260 working days. For contractor day rate comparison: permanent salary ÷ 220 (accounting for holiday, sick pay, employer NI saving) is a common conversion for equivalent total value.",
      },
      {
        q: "What is the take-home pay on a £50,000 salary in the UK (2025/26)?",
        a: "£50,000 gross, 2025/26 tax year: Personal allowance: £12,570 (no tax). Basic rate band: 20% on £12,571–£50,270 = 20% × £37,700 = £7,540 income tax. Amount above basic rate threshold (£50,271–£50,000): none in this example. Employee NI: 8% on £12,571–£50,270 = 8% × £37,700 = £3,016. Total deductions: £10,556. Net take-home: £39,444/year (£3,287/month). Adding a 5% pension contribution (£2,500): reduces take-home by ~£2,000 but puts £2,500 into pension (£500 employer match or government top-up may apply).",
      },
      {
        q: "When does the 40% higher rate income tax kick in for UK earners?",
        a: "The 40% higher rate applies to income above £50,270 (2025/26 — frozen until at least 2028 by the previous government). On earnings between £50,271 and £125,140: 40% income tax. On earnings above £125,140: 45% additional rate. The personal allowance of £12,570 is tapered away for incomes above £100,000: you lose £1 of allowance for every £2 earned above £100,000 — creating an effective 60% marginal tax rate between £100,000 and £125,140. Making pension contributions above £100,000 is highly tax-efficient: each £2 contributed restores £1 of personal allowance, effectively earning a 60% tax relief on those contributions.",
      },
    ],
  },

  "salary-increase-calculator": {
    intro:
      "A salary increase calculator converts a percentage raise into dollar terms, projects compounded salary growth over time, and shows the lifetime earning impact of different raise trajectories. The difference between 3% and 5% annual raises starting at $65,000 is $6,300/year in year 10, $11,900/year in year 20, and over $500,000 in cumulative earnings difference over a 30-year career — compounding works on salaries just as it does on investments.",
    faq: [
      {
        q: "How much does a 5% vs 3% raise difference accumulate over a career?",
        a: "Starting at $65,000: with 3% annual raises, salary reaches $87,500 at year 10, $118,000 at year 20, $159,000 at year 30. With 5% annual raises: $105,900 at year 10, $172,500 at year 20, $281,000 at year 30. Cumulative earnings difference over 30 years: approximately $1,100,000. The critical insight: the gap starts small ($1,300/year in year 1) but compounds. Consistently negotiating 2% above the standard raise — through job changes, merit negotiations, or promotions — produces a dramatically different career earnings trajectory.",
      },
      {
        q: "What percentage raise should I ask for in a negotiation?",
        a: "Benchmark your ask against: (1) Market rate data (Glassdoor, LinkedIn Salary, Levels.fyi, BLS OES) — if underpaid vs market by 15%, request 12–18% with supporting data; (2) Your contributions since last raise — quantified metrics (revenue added, costs saved, projects delivered); (3) Inflation rate — at minimum, expect a real-terms raise above CPI; (4) Company performance — publicly traded companies report revenue growth; private companies signal raises through budget announcements. A well-prepared candidate requesting 8–12% with clear market justification will typically land 5–8%. Without data, expect 2–4%.",
      },
      {
        q: "Is it better to negotiate raises annually or change jobs for salary growth?",
        a: "Federal Reserve data (Atlanta Wage Tracker, 2025): median wage growth for job-switchers: 8–10%; for job-stayers: 3–5%. Over a 10-year period, an employee who switches jobs strategically every 3–4 years (capturing 10–12% salary bumps) typically out-earns a comparable employee who stays and negotiates internally by $50,000–$100,000 cumulative. The exception: companies with strong promotion pipelines and transparent compensation bands — in these cultures, internal advancement can match market switching. Research your employer's actual promotion track record before deciding whether loyalty or mobility serves your income growth better.",
      },
    ],
  },

  "salary-negotiation-calculator": {
    intro:
      "Salary negotiation is the highest-return financial activity available to most workers — a single 10-minute conversation can generate $5,000–$20,000 in additional annual income, compounding over the entire career. Yet 58% of workers accept the first offer without negotiating (LinkedIn, 2023), and 84% of employers report that their initial offer is not their best offer. The calculator quantifies the lifetime value of negotiating vs accepting, making the cost of not negotiating concrete.",
    faq: [
      {
        q: "How much lifetime money does failing to negotiate a starting salary cost?",
        a: "Example: Job offer at $70,000. Negotiating to $75,000 ($5,000 increase). With 3% annual raises and a 35-year career: the $5,000 difference in year 1 becomes $5,000 × (1.03)^35 = $14,100 salary difference in year 35. Cumulative additional lifetime earnings: approximately $250,000. The multiplier effect exists because raises (percentage-based) are calculated on a higher base, bonuses are percentage-based, and 401k employer matches track salary percentage. Every negotiation is a compounding decision, not a one-time transaction.",
      },
      {
        q: "What is the most effective technique for salary negotiation?",
        a: "(1) Research first: get three market data points (Glassdoor, LinkedIn Salary, competitor job postings) before stating a number. (2) Let them move first if possible — ask 'What is the salary range for this role?' before revealing your number. (3) Anchor high with a specific number: $85,000 rather than '$80,000–$90,000' (ranges are negotiated to the bottom). (4) Justify with evidence: 'Based on my research showing market rate of $83,000–$90,000 for this role and my 6 years of direct experience in X, I'm targeting $88,000.' (5) Silence is a tool: after stating your number, stop talking. The next person to speak loses leverage.",
      },
      {
        q: "What should I negotiate beyond base salary?",
        a: "Total compensation negotiation targets: signing bonus (often easier to approve than base salary — hits different budget lines); annual bonus target percentage; equity/RSU grant (especially valuable in public companies); remote work arrangement ($6,000–$10,000 annual value for full-remote vs full-office); PTO days ($307/day at $80,000 salary — 5 extra days = $1,538); professional development budget ($1,000–$5,000/year); title (affects future salary anchors at next job); start date flexibility. Companies that are firm on base salary often have flexibility on signing bonuses and equity. Negotiate all components before accepting any single component.",
      },
    ],
  },

  "salary-to-hourly-calculator": {
    intro:
      "Converting an annual salary to an effective hourly rate reveals the true value of your time — and often surprises people. A $60,000 salary at 40hr/week = $28.85/hour gross. But a $60,000 salaried employee working 50hr/week earns $23.08/effective hour — less than someone making $24/hour who strictly works 40hr. Understanding this conversion is essential for comparing job offers, evaluating consulting rates, and setting freelance pricing.",
    faq: [
      {
        q: "How do you convert annual salary to hourly rate?",
        a: "Standard hourly rate = annual salary ÷ 2,080 (40hr/week × 52 weeks). $60,000 ÷ 2,080 = $28.85/hour. Quick estimate: divide salary by 2,000 for a close approximation. Actual hourly rate depends on true hours worked: $60,000 at 45hr/week: $60,000 ÷ (45 × 52) = $25.64/hour; at 50hr/week: $23.08/hour; at 55hr/week: $20.98/hour. Tracking your actual hours for one month and calculating your true hourly rate can be a revealing exercise — many salaried workers discover their effective rate is lower than adjacent hourly positions they'd consider beneath them.",
      },
      {
        q: "What hourly rate should a freelancer or contractor charge to replace a salary?",
        a: "Freelance equivalent rate must account for: no employer-paid benefits (health insurance $500–$800/month = $6,000–$9,600/year); self-employment tax (15.3% FICA vs 7.65% for employees); no paid time off (20 days off = ~8% of working time unpaid); no employer 401k match; business expenses (software, equipment, accounting = $2,000–$5,000/year). Conversion formula: target freelance rate = (salary + benefits value + SE tax differential + PTO value + business expenses) ÷ billable hours. To net-equivalent a $70,000 salary with standard benefits, a freelancer typically needs $110,000–$130,000 gross revenue = $55–$65/hour at 2,000 billable hours.",
      },
      {
        q: "Is hourly pay or a salary better for a night-shift or variable-schedule worker?",
        a: "Hourly pay is generally better for variable schedule workers because: (1) FLSA guarantees 1.5× overtime for non-exempt hourly workers over 40hr/week; (2) Night shift and weekend differentials are more commonly offered as hourly premiums ($1–$5/hour above base); (3) Hours are directly compensated — working an extra shift adds pay. Salaried workers in the same roles get no additional compensation for extra shifts or off-hours work. Exception: if the salaried position comes with significantly better benefits (health insurance, retirement matching) and more job security, the total compensation comparison can favour salary. Always calculate total compensation, not just base rate.",
      },
    ],
  },

  "sales-tax-calculator": {
    intro:
      "Sales tax in the US varies from 0% (Oregon, Montana, New Hampshire, Delaware, Alaska) to 9.55% state rate (Tennessee) — and local taxes can add another 0–5.5%. Combined rates range from 0% in tax-free states to 11.5% in parts of Louisiana and Alabama. Unlike most countries that display VAT-inclusive pricing, US retailers typically display pre-tax prices, making the sales tax calculator essential for accurate budgeting.",
    faq: [
      {
        q: "How do you calculate sales tax and find the total price after tax?",
        a: "Sales tax amount = pre-tax price × (tax rate ÷ 100). Total price = pre-tax price × (1 + tax rate ÷ 100). A $250 item in Tennessee (9.75% combined rate): tax = $250 × 0.0975 = $24.38; total = $274.38. Reverse calculation (find pre-tax price from tax-inclusive total): pre-tax = total price ÷ (1 + tax rate). If you paid $274.38 in Tennessee: $274.38 ÷ 1.0975 = $250. Never subtract the percentage from the total to find the pre-tax price — this is a common error that underestimates the original price.",
      },
      {
        q: "Which states have the highest and lowest combined sales tax rates?",
        a: "Highest combined state + average local rates (2025): Louisiana 9.56%; Tennessee 9.55%; Arkansas 9.46%; Washington 9.38%; Alabama 9.29%. Zero state sales tax: Oregon, Montana, New Hampshire, Delaware. Alaska has no state tax but allows local taxes up to ~7.5%. For large purchases (cars, appliances, electronics), sales tax can be a meaningful cost difference when shopping across state lines — buying a $30,000 car in Oregon vs Tennessee saves $2,865 in sales tax, though registering out-of-state and use taxes can complicate this strategy.",
      },
      {
        q: "What items are typically exempt from sales tax?",
        a: "Common exemptions (vary significantly by state): groceries (exempt in 32 states; taxed at reduced rates in others); prescription drugs (exempt in most states); over-the-counter medicines (mixed — exempt in some states); clothing (exempt in Pennsylvania, New Jersey, Minnesota, and New York under $110/item); agricultural equipment (most states); manufacturing equipment (most states). Sales tax holidays: many states have temporary exemption periods for school supplies, hurricane preparedness items, and energy-efficient appliances — typically 3-day weekends. Florida and Texas have multiple annual sales tax holidays. Understanding your state's exemptions can save $200–$500/year for a typical household.",
      },
    ],
  },

  "savings-calculator": {
    intro:
      "Savings growth is driven by three factors: initial deposit, regular contributions, and interest rate. The power of compound interest makes time the most valuable variable — $5,000 invested at 5% for 40 years grows to $35,200; the same investment for 20 years only reaches $13,270. Regular contributions amplify this: adding $200/month to that $5,000 at 5% for 40 years produces $306,000 — 87 times the original deposit.",
    faq: [
      {
        q: "How does compound interest work and how do you calculate it?",
        a: "Compound interest earns interest on previously earned interest. Formula: A = P(1 + r/n)^(nt) where P = principal, r = annual rate, n = compounding periods per year, t = years. $10,000 at 5% compounded monthly for 10 years: A = $10,000(1 + 0.05/12)^(12×10) = $10,000 × (1.004167)^120 = $16,470. Compounding frequency matters at high rates: daily vs annual compounding on $10,000 at 5% for 10 years: $16,487 vs $16,289 — a modest $198 difference. At longer horizons and higher rates, the frequency gap widens. For savings accounts, most banks compound daily and credit monthly.",
      },
      {
        q: "What is the best type of savings account in 2025?",
        a: "High-yield savings accounts (HYSAs): currently offering 4.5–5.2% APY (2025) at online banks (Marcus, Ally, SoFi, Marcus by Goldman Sachs). Completely liquid, FDIC insured up to $250,000. Superior to: traditional bank savings accounts (0.01–0.10% APY — effectively zero). CDs (Certificates of Deposit): 4.5–5.5% for 12-month terms — higher than most HYSAs but with early withdrawal penalties. Treasury bills (directly purchased via TreasuryDirect.gov): yielding ~4.3–4.7% 4-week to 1-year terms, state-tax-free interest. Money market funds: 4.5–5.0%, accessible through brokerage accounts, slightly better liquidity than CDs.",
      },
      {
        q: "How much should I have in savings vs invested?",
        a: "Standard framework: (1) Emergency fund: 3–6 months of essential expenses in an HYSA — completely liquid, no market risk. This is non-negotiable before investing. (2) Short-term goals (under 3 years): HYSA, CDs, or Treasury bills — no stock market exposure because markets can decline 30–40% in any 3-year period. (3) Medium-term goals (3–10 years): diversified mix — 60–70% equities appropriate for 7+ year horizons. (4) Long-term / retirement (10+ years): equity-heavy allocation (80–100% stocks) for maximum compound growth. The rule: only money you can afford to leave untouched for 7+ years should be in equities.",
      },
    ],
  },

  "savings-goal-calculator": {
    intro:
      "A savings goal calculator works backwards from a target: given a goal amount, timeline, and interest rate, it calculates the required monthly contribution. To save $20,000 for a house down payment in 3 years with 5% APY: monthly contribution required = $503. To reach the same goal in 2 years: $788/month. The shorter the timeline, the higher the required monthly savings — and the less time compound interest can contribute.",
    faq: [
      {
        q: "How do you calculate the monthly savings needed to reach a goal?",
        a: "Monthly payment = FV × r ÷ [(1+r)^n − 1], where FV = goal amount, r = monthly interest rate (APY ÷ 12), n = months. Save $30,000 in 4 years (48 months) at 5% APY: r = 0.4167%; PMT = $30,000 × 0.004167 ÷ [(1.004167)^48 − 1] = $125 ÷ 0.2220 = $563/month. If you already have $5,000 saved: future value of current savings = $5,000 × (1.004167)^48 = $6,105. Remaining needed: $30,000 − $6,105 = $23,895. New monthly savings = $23,895 × 0.004167 ÷ 0.2220 = $448/month.",
      },
      {
        q: "What accounts should I use for different savings goals?",
        a: "Match the account to the timeline: Emergency fund (0–6 months): HYSA — 4.5–5.2% APY, fully liquid. Short-term goals 1–3 years (vacation, car, small purchase): HYSA or short-term CDs. Medium-term goals 3–7 years (house down payment, sabbatical fund): CDs, Treasury bonds, or a conservative portfolio with 20–40% equities. Long-term goals 7+ years (college fund, investment property): 529 plans for education (tax-advantaged); brokerage account with equity ETFs for other goals. Rule of thumb: never invest money in equities that you'll need within 5–7 years — the market can take that long to recover from a significant correction.",
      },
      {
        q: "How do I stay motivated and on track for a long-term savings goal?",
        a: "Psychological research on savings behaviour: (1) Progress visualisation: tracking a savings thermometer or progress bar increases goal completion rates by 20–30% vs no tracking; (2) Automation: auto-transfers on payday remove friction and willpower requirements — people who automate save 2–3× more than those who manually transfer; (3) Goal labelling: naming accounts ('House 2027', 'Japan Trip') increases the pain of withdrawal from them — most banks support custom account names; (4) Sub-goals: breaking a £30,000 goal into six £5,000 milestones provides more frequent positive reinforcement; (5) Implementation intentions: 'On the 1st of each month I will transfer £X from checking to [goal account]' outperforms vague intentions by 2–3× in completion rates.",
      },
    ],
  },

  "screen-time-impact": {
    intro:
      "The average American adult spends 7 hours 4 minutes per day on screens across all devices (TV, smartphone, computer) — that's 2,581 hours per year, or 107 days. Passive screen consumption (social media scrolling, streaming) has a well-documented negative correlation with sleep quality, physical activity levels, and self-reported wellbeing. The question is not whether screens are bad, but whether your current allocation reflects your actual priorities.",
    faq: [
      {
        q: "What does the research say about screen time and mental health?",
        a: "Key findings: (1) Amy Orben and Andrew Przybylski (2019): recreational screen time has a small negative effect on adolescent wellbeing — comparable in magnitude to wearing glasses or eating potatoes. Earlier claims of 'epidemic' levels of harm were overstated. (2) Jean Twenge's work links smartphone adoption timing to declining teen mental health, particularly for girls; effect sizes are modest but consistent. (3) Social media use above 2 hours/day is associated with 2× higher perceived loneliness — but causality is disputed (lonely people may use social media more). (4) Passive consumption (scrolling, watching) is more harmful than active use (creating, messaging close friends). The content and context of screen use matters more than raw hours.",
      },
      {
        q: "How much sleep is lost to evening screen use?",
        a: "Blue light from screens (400–490nm wavelength) suppresses melatonin production — the hormone that initiates sleep onset. Studies show: using a smartphone for 2 hours before bed delays sleep onset by 30–60 minutes and reduces REM sleep duration by 10–20 minutes. Over a week: 3.5–7 hours of lost sleep. Annual: 180–365 hours. Harvard Medical School research: f.lux or Night Shift screen settings (reducing blue light) diminish but don't eliminate the suppression effect. The most effective intervention is stopping all screen use 60–90 minutes before bed — not blue light filters. Sleep is the highest-leverage health and cognitive performance lever available at zero cost.",
      },
      {
        q: "What are the most effective tools for managing screen time?",
        a: "iOS Screen Time and Android Digital Wellbeing provide free built-in tracking and app limits. Third-party options: Opal (iOS, blocks distracting apps with friction); Freedom (cross-platform, scheduled blocking); One Sec (iOS, adds a pause before opening distracting apps — reduces usage by 57% in studies). Most effective interventions in order of evidence: (1) Physical phone removal from bedroom (strongest effect on sleep); (2) App deletion (friction-free not-using); (3) Scheduled check windows for social media (2× daily vs always-on); (4) Grayscale mode; (5) Notification reduction to calendar, messages, and calls only. The most effective tool is the one you'll actually use consistently.",
      },
    ],
  },

  "self-employed-tax": {
    intro:
      "Self-employed individuals pay both the employer and employee portions of FICA — a 15.3% self-employment tax (12.4% Social Security + 2.9% Medicare) on net self-employment income, in addition to regular income tax. On $80,000 net self-employment income, the SE tax alone is $11,304 before any federal income tax. The SE tax deduction (50% of SE tax is deductible) and QBI deduction (up to 20% of qualified business income) significantly reduce the final tax burden.",
    faq: [
      {
        q: "How is self-employment tax calculated?",
        a: "Step 1: Net self-employment income = revenue − business expenses. Step 2: SE tax base = net SE income × 0.9235 (this adjustment accounts for the employer deduction). Step 3: SE tax = SE base × 0.153 (15.3%). Example: $80,000 net SE income → base = $73,880 → SE tax = $11,304. Step 4: SE tax deduction = $11,304 ÷ 2 = $5,652 (deducted from gross income, not just SE income). Step 5: Calculate income tax on (AGI − SE deduction − QBI deduction − standard deduction). On $80,000 net with all deductions, total federal tax bill is approximately $15,000–$18,000 depending on filing status and QBI eligibility.",
      },
      {
        q: "What business deductions can self-employed workers claim to reduce taxes?",
        a: "Commonly claimed deductions: home office (direct method: actual expenses × business-use percentage; simplified: $5/sq ft up to 300 sq ft = $1,500 max); vehicle (standard mileage: 70 cents/mile in 2025; or actual expenses + depreciation); health insurance premiums (100% deductible from income tax, not SE tax); retirement contributions (SEP-IRA up to 25% of net SE income/$69,000 max; Solo 401k up to $69,000); business equipment (Section 179 immediate expensing or bonus depreciation); professional services (accounting, legal); education/professional development; software subscriptions; internet (business-use percentage). A well-documented business reduces effective tax rate by 10–20 percentage points.",
      },
      {
        q: "Do self-employed workers need to pay quarterly estimated taxes?",
        a: "Yes — the IRS requires quarterly estimated tax payments if you expect to owe at least $1,000 in taxes for the year. Quarterly deadlines: April 15, June 15, September 15, January 15 of the following year. Underpayment penalty applies if you pay less than 90% of current year tax or 100% of prior year tax (110% for high earners). Calculation: estimate annual net SE income; calculate total tax (SE + income); divide by 4. Tip: set aside 25–30% of every payment received into a dedicated tax savings account — this ensures funds are available when quarterly payments are due and prevents the end-of-year tax shock that catches many first-year freelancers.",
      },
    ],
  },

  "side-hustle-calculator": {
    intro:
      "The average side hustler earns $1,122/month (Zapier, 2023). Side hustle income is taxable as self-employment income — meaning 15.3% SE tax plus regular income tax on top of your W-2 salary. A $12,000/year side hustle for someone in the 22% federal bracket generates approximately $12,000 − $1,836 (SE tax) − $2,640 (income tax at 22%) = $7,524 take-home, or 62.7% retention after taxes.",
    faq: [
      {
        q: "How much of side hustle income do you keep after taxes?",
        a: "Side hustle income is taxed as self-employment income on top of your regular salary. For someone already in the 22% federal bracket: SE tax = 14.1% effective (after the SE deduction adjustment); income tax = 22%. Combined federal effective rate = approximately 33–36%. With a state income tax of 5%: effective total = 38–41%. On $10,000 gross side hustle income, expect to keep $5,900–$6,200 after all federal and state taxes, before deducting legitimate business expenses. Tracking deductible expenses (equipment, software, home office, mileage) can meaningfully reduce taxable income and improve retention.",
      },
      {
        q: "What are the highest-earning side hustles in 2025?",
        a: "Highest hourly rate: consulting/freelancing in your primary field ($50–$200+/hour for skilled professionals); tutoring and instruction ($30–$100/hour); bookkeeping/accounting ($40–$75/hour); copywriting and content creation ($40–$120/hour); web development ($50–$150/hour). Highest passive income potential: digital products (courses, templates, e-books — after setup cost); dividend/real estate investment; licensing creative work. Lowest barrier to entry: gig economy (Uber, DoorDash, TaskRabbit) — lower hourly rate ($15–$25 after expenses) but immediate start. The highest-ROI approach: convert existing job skills into freelance work — no new skill acquisition required, maximum hourly rate from day one.",
      },
      {
        q: "At what income level should a side hustler form an LLC or S-corp?",
        a: "General thresholds: Sole proprietor (no entity): appropriate up to $30,000–$40,000 net SE income. Simple tax filing, minimal compliance cost. LLC: provides liability protection but no tax advantage by default — taxed identically to sole proprietor. Useful when client contracts require it or personal asset risk is real. S-Corporation election: becomes tax-advantaged above approximately $40,000–$50,000 net SE income. An S-corp owner pays themselves a 'reasonable salary' (subject to SE tax) and takes additional income as a distribution (not subject to SE tax). At $80,000 net SE income with a $50,000 salary: saves SE tax on $30,000 = approximately $4,590/year. S-corp compliance costs (payroll, extra accounting): $1,500–$3,000/year. Net benefit begins at ~$40,000–$50,000 net SE income.",
      },
    ],
  },


  "sleep-cycle-optimizer": {
    intro:
      "Sleep occurs in 90-minute cycles: light sleep → deep (slow-wave) sleep → REM sleep → repeat. Waking mid-cycle — particularly during deep sleep — causes sleep inertia: the grogginess that can last 30–90 minutes. Waking at the end of a complete cycle feels dramatically different. An alarm set 7.5 hours (5 cycles) or 9 hours (6 cycles) after sleep onset optimises wake timing. The table shows optimal wake-up times based on when you fall asleep.",
    faq: [
      {
        q: "How many sleep cycles do you need per night?",
        a: "Most adults complete 4–6 sleep cycles of approximately 90 minutes each. 4 cycles = 6 hours; 5 cycles = 7.5 hours; 6 cycles = 9 hours. The composition shifts throughout the night: early cycles are dominated by deep slow-wave sleep (physically restorative); late cycles contain more REM sleep (cognitively restorative — memory consolidation, emotional processing). Cutting sleep short truncates REM-heavy cycles in the final third of the night. This is why 6 hours of sleep is not equivalent to 8 hours with 2 hours removed from the end — the lost REM disproportionately impacts cognitive function.",
      },
      {
        q: "What is sleep inertia and how can you minimise it?",
        a: "Sleep inertia is the impaired alertness and cognitive performance immediately after waking — caused by elevated adenosine (a sleep-promoting chemical) and residual slow-wave brain activity. It typically lasts 15–60 minutes but can extend to 2–4 hours if you wake during deep sleep. Strategies to minimise: (1) Use a sleep cycle calculator to set your alarm for cycle-end timing; (2) Smart alarm apps (Sleep Cycle, AutoSleep) use accelerometer data to detect lighter sleep phases and wake you within a 30-minute window; (3) Light exposure immediately upon waking suppresses melatonin and accelerates cortisol rise; (4) Keep a consistent wake time — circadian rhythm preparation reduces inertia severity.",
      },
      {
        q: "How does sleep deprivation affect performance and health?",
        a: "17 hours without sleep produces cognitive impairment equivalent to a 0.05% blood alcohol level — legally drunk in many jurisdictions. 24 hours without sleep: equivalent to 0.10% BAC. Chronic insufficient sleep (under 7 hours): 3× higher risk of catching a cold (Carnegie Mellon study); 2× higher risk of cardiovascular disease over 10 years; significant increases in cortisol, insulin resistance, and inflammatory markers. Matthew Walker (Why We Sleep): 'The shorter your sleep, the shorter your life.' From a performance standpoint: reaction time, emotional regulation, creative problem-solving, and complex decision-making show measurable degradation after even one night under 7 hours.",
      },
    ],
  },

  "social-media-time-calculator": {
    intro:
      "The average global social media user spends 2 hours 27 minutes per day across all platforms (DataReportal 2025). Over a year that's 895 hours — 37 full days. Over a 50-year adult life: 4,475 hours, or nearly 6 full months of waking life. Social media platforms are engineered to maximise time-on-app through infinite scroll, variable-reward notifications, and algorithmically-tuned content — the design intent is engagement, not user wellbeing.",
    faq: [
      {
        q: "How much time does the average person spend on each social media platform?",
        a: "Average daily time per platform (DataReportal/Statista 2025): TikTok: 53 minutes; YouTube: 48 minutes; Facebook: 33 minutes; Instagram: 32 minutes; Snapchat: 28 minutes; X (Twitter): 30 minutes; LinkedIn: 10 minutes. These are global averages — heavy users (18–24 year olds) typically spend 3–5× these averages. The most important insight from platform research: users consistently underestimate their own usage by 30–50%. Checking your Screen Time data before assigning yourself to an average category is strongly recommended.",
      },
      {
        q: "What is the opportunity cost of social media time?",
        a: "895 hours/year (2h27m/day average) could alternatively represent: 45 college course credits of study time (20 hours/credit); learning a new language to conversational proficiency (approximately 600 hours for a language similar to English); writing a book (300–500 hours for first drafts); completing a professional certification (200–400 hours); running 4,000+ miles. The opportunity cost calculation is personal — it depends entirely on what you would actually do with recovered time. Research suggests most people substitute recovered screen time with other leisure, not productive activity, unless a specific replacement habit is pre-planned.",
      },
      {
        q: "Does social media cause depression, or do depressed people use social media more?",
        a: "Both directions of causality exist — the relationship is bidirectional. Longitudinal studies (Hunt 2018, University of Pennsylvania) show experimentally reducing social media use to 30 minutes/day significantly reduced depression and loneliness scores vs control group after 3 weeks — providing causal evidence. However, depressed individuals also demonstrably use social media more as a coping mechanism, creating a reinforcing cycle. The consensus: passive consumption (scrolling, comparing, lurking) drives the negative effects; active use (messaging close friends, creating content) is largely neutral or positive. The type of use matters as much as the duration.",
      },
    ],
  },

  "solar-roi": {
    intro:
      "The average US solar installation (6kW system) costs $16,000–$22,000 before incentives and $11,000–$15,000 after the 30% federal solar tax credit (ITC). Average payback period: 6–12 years depending on electricity rates, sun exposure, and net metering policy. Over a 25-year system lifespan, most homeowners save $20,000–$50,000 net of installation costs in electricity savings. Solar ROI is strongest in high-electricity-rate states (California, Hawaii, Massachusetts) and weakest in low-rate states with poor net metering (Louisiana, Florida before 2023 policy changes).",
    faq: [
      {
        q: "How do you calculate the payback period for a solar panel system?",
        a: "Payback period = net installation cost ÷ annual electricity savings. Net cost = total installation cost − federal ITC (30%) − state/local incentives. Annual savings = annual kWh production × electricity rate per kWh. Example: $18,000 system, 30% ITC = $5,400; net cost = $12,600. Annual production: 7,200 kWh (6kW × 1,200 peak sun hours). Electricity rate: $0.15/kWh. Annual savings: $1,080. Payback: $12,600 ÷ $1,080 = 11.7 years. At $0.22/kWh (California): annual savings = $1,584; payback = 8 years. As electricity rates rise with inflation, payback period improves over time.",
      },
      {
        q: "What is the federal solar tax credit and how does it work?",
        a: "The federal Investment Tax Credit (ITC) provides a 30% tax credit on the total cost of a residential solar installation through 2032, stepping down to 26% in 2033 and 22% in 2034. It's a dollar-for-dollar reduction in your federal income tax bill — not a deduction. On a $20,000 system: the credit is $6,000 directly off your taxes owed. If your tax liability is less than $6,000, the unused portion carries forward to future tax years. Important: you must own the system (not lease) to claim the credit. Leased solar provides no federal ITC benefit to the homeowner.",
      },
      {
        q: "Is solar worth it in every US state?",
        a: "Solar ROI varies significantly by state: Best markets: Massachusetts ($0.24/kWh + SREC market + net metering); California ($0.25/kWh historically + NEM 3.0 reduces but doesn't eliminate value); Hawaii ($0.40/kWh — fastest payback in the US); New York (NYSERDA incentives + NYC consolidated grid). Marginal markets: Louisiana ($0.10/kWh — low electricity rates extend payback to 15+ years); Washington state ($0.10/kWh + abundant hydro = less incentive). Florida: improved payback despite policy changes due to high AC loads. Key factors: your current electricity rate, sun hours (1,000–2,000/year across US), net metering policy, and whether you have a suitable roof orientation (south-facing, 15–40° pitch is optimal).",
      },
    ],
  },

  "steps-to-calories-calculator": {
    intro:
      "The widely cited 10,000 steps per day goal was originated in a 1965 Japanese marketing campaign — not scientific research. A 2019 JAMA Internal Medicine study found that mortality benefits plateau around 7,500 steps for older adults. Calorie burn from walking is primarily a function of body weight and distance — speed matters less than total steps. A 150lb person burns approximately 80–100 calories per mile, regardless of whether they walk or jog.",
    faq: [
      {
        q: "How many calories do 10,000 steps burn?",
        a: "Steps-to-miles conversion: average stride length is approximately 2.5 feet → 10,000 steps ≈ 4.7 miles. Calories burned = body weight (lbs) × 0.57 per mile (walking at moderate pace). At 150 lbs: 150 × 0.57 × 4.7 = 402 calories. At 200 lbs: 200 × 0.57 × 4.7 = 537 calories. At 120 lbs: 274 calories. Running burns similar calories per mile but covers the distance faster. Using the formula: 10,000 steps at a typical 2,000 steps/mile = 5 miles. Calories ≈ 80–100 × weight in kg per hour of brisk walking.",
      },
      {
        q: "How many steps per day do you actually need for health benefits?",
        a: "Research findings on daily step count and health: (1) Lee et al. (JAMA, 2019): 7,500 steps associated with 65% lower mortality rate vs 2,700 steps in older women; no additional benefit above 7,500. (2) Paluch et al. (Lancet, 2022): each 1,000 additional steps/day reduces cardiovascular disease risk by 15%; optimal range 6,000–8,000 steps for adults over 60; 8,000–10,000 for adults under 60. (3) Any increase from a sedentary baseline (under 4,000 steps) provides meaningful health benefit. The 10,000 step target is reasonable but not uniquely optimal — 6,000–8,000 brisk steps provides most of the health benefit.",
      },
      {
        q: "How accurate are step counters and fitness trackers?",
        a: "Accuracy varies significantly by device and activity: smartphone pedometers: ±10–20% accuracy for walking on level ground; less accurate in pockets or bags. Dedicated wrist-based fitness trackers (Fitbit, Apple Watch): ±3–10% for step counting during regular walking; less accurate for slow shuffling, pushing a cart, or cycling. Waist-clip pedometers: generally most accurate (±5%) for walking but don't capture other activities. GPS-based distance measurement is more accurate than step counting for calorie calculation during outdoor exercise. For calorie tracking, the more meaningful number is consistent relative comparison day-to-day rather than absolute accuracy.",
      },
    ],
  },

  "streaming-time-calculator": {
    intro:
      "Netflix's 270 million subscribers watch an average of 2+ hours per day on the platform alone. Combined with other streaming services, the average American watches 3–4 hours of streaming video daily. At $0.10/hour for the typical streaming bundle cost, the financial cost is modest — the opportunity cost in time is the more meaningful metric. The calculator converts binge-watch hours into books that could have been read, skills that could have been learned, or exercise sessions that could have been completed.",
    faq: [
      {
        q: "How much does the average American spend on streaming subscriptions per month?",
        a: "Average US household subscribes to 4.5 streaming services (Deloitte 2024). Cost breakdown: Netflix $15.49–$22.99/month; Disney+ $7.99–$13.99; Max $9.99–$15.99; Hulu $7.99–$17.99; Prime Video $8.99; Apple TV+ $9.99; Peacock $5.99–$13.99; Paramount+ $5.99–$11.99. Average total: $50–$80/month for a typical multi-service household = $600–$960/year. The 'subscription creep' phenomenon: many households pay for 2–3 services they actively use and 1–2 they've forgotten. A quarterly streaming audit is the highest-ROI 15 minutes in household budgeting.",
      },
      {
        q: "How many hours of content have I watched vs books I could have read?",
        a: "Conversion benchmarks: average non-fiction book requires 5–8 hours to read; fiction 6–12 hours. At 2 hours of streaming per day: 730 hours/year = 73–120 books equivalent. Average American reads 12 books/year (Pew Research). The conversion isn't a moral argument — it's a reflection tool. Many people report wanting to 'read more' while consuming 2+ hours of video daily; this calculator makes the trade-off concrete. Average TV episode: 45 minutes. Movie: 1h 55m. A 10-episode Netflix season ≈ 7.5 hours = 1 non-fiction book equivalent.",
      },
      {
        q: "Is streaming time harmful, and does it matter what you watch?",
        a: "Research findings: (1) Binge-watching (3+ episodes consecutively) is associated with poorer sleep quality — not from content but from late-night viewing habit and pre-sleep arousal. (2) Passive, solitary streaming of low-engagement content correlates with lower wellbeing vs active, social, or high-engagement viewing. (3) Documentary and educational content produces better mood outcomes than equivalent hours of reality TV (University of California research). The 'quality vs quantity' framing is more useful than 'streaming is bad': 2 hours of an engaging documentary with a partner is categorically different from 4 hours of auto-played content alone at midnight. The platform's autoplay feature is specifically designed to exploit passive continuation — turning it off is the single most effective feature-level change.",
      },
    ],
  },

  "student-loan-calculator": {
    intro:
      "The average federal student loan debt at graduation is $37,693 for bachelor's degree holders (2024). At the standard 10-year repayment plan for a $37,000 balance at 6.5% (graduate unsubsidised rate): monthly payment = $420; total paid = $50,400; total interest = $13,400. Income-driven repayment plans (IBR, SAVE) cap payments at 5–10% of discretionary income but extend repayment to 20–25 years, significantly increasing total interest paid.",
    faq: [
      {
        q: "How is the monthly student loan payment calculated?",
        a: "Standard repayment uses the same amortisation formula as any instalment loan: M = P × [r(1+r)^n] ÷ [(1+r)^n − 1]. For $37,000 at 6.5% over 120 months: r = 0.5417%/month; M = $37,000 × [0.005417 × (1.005417)^120] ÷ [(1.005417)^120 − 1] = $419.85/month. Total paid = $50,382; total interest = $13,382. Federal loan interest rates for 2024–25: subsidised undergraduate 6.53%; unsubsidised undergraduate 6.53%; graduate unsubsidised 8.08%; PLUS loans 9.08%. Rates reset annually in July.",
      },
      {
        q: "What are the federal income-driven repayment options?",
        a: "Main IDR plans (2025): SAVE (Saving on a Valuable Education — replacement for REPAYE): 5% of discretionary income for undergraduate loans; 10% for graduate; forgiveness after 10 years for balances under $12,000. IBR (Income-Based Repayment): 10–15% of discretionary income; 20–25 year forgiveness. PAYE (Pay As You Earn): 10% of discretionary income; 20-year forgiveness. Eligibility requirements vary. Forgiven amounts under IDR are currently non-taxable through 2025 (previously treated as income). PSLF (Public Service Loan Forgiveness): complete forgiveness after 120 qualifying payments under IDR while working for a qualifying employer — tax-free.",
      },
      {
        q: "Should I pay off student loans aggressively or invest instead?",
        a: "The mathematical comparison: if your loan interest rate is below 5–6%, investing extra money in the stock market (expected 7% real return) mathematically outperforms accelerated loan payoff. If your rate is above 7%, aggressive payoff beats investing. At 6.5% (current federal undergraduate rate): the decision is close — but the 'guaranteed return' of loan payoff has appeal when stock market returns are uncertain. The hybrid approach: capture full 401k match first (100% return on matched dollars), then split extra payments 50/50 between loans and investment. Psychological benefit of debt elimination is real and valid — even if sub-optimal mathematically.",
      },
    ],
  },

  "subscription-auditor": {
    intro:
      "The average American household pays for 4.5 streaming services and spends $219/year on subscriptions they've forgotten about (C+R Research, 2022). Total average subscription spend — including streaming, software, news, fitness, and delivery services — is $219/month ($2,628/year). Conducting a subscription audit takes 30 minutes and commonly saves $50–$150/month for households that haven't reviewed their recurring charges recently.",
    faq: [
      {
        q: "How do I find all my subscriptions to audit them?",
        a: "Best methods to surface hidden subscriptions: (1) Search email inbox for 'receipt', 'subscription', 'renewal', 'invoice' — most services send annual renewal emails; (2) Review credit card and bank statements for the past 3 months, looking for recurring charges; (3) Check Apple App Store (Settings → [Apple ID] → Subscriptions) and Google Play (Menu → Subscriptions) for in-app subscriptions; (4) Review PayPal for active billing agreements; (5) Use Rocket Money, Trim, or TrackMySubs apps — these connect to bank accounts and automatically identify recurring charges. Most audits surface 3–5 forgotten subscriptions representing $30–$80/month.",
      },
      {
        q: "What subscriptions do people most commonly forget they're paying for?",
        a: "Most commonly forgotten: (1) Free trials that converted — gym apps, news sites, productivity tools; (2) Annual plans renewed automatically after the first year (Adobe, Duolingo, antivirus software); (3) Amazon Prime (if using Amazon less than expected); (4) Niche streaming services subscribed for one show then unused (Paramount+, Peacock, Apple TV+); (5) Domain registrations and website hosting for abandoned projects; (6) Cloud storage upgrades (iCloud, Google One, Dropbox Plus) from years ago; (7) VPN services; (8) Premium LinkedIn, Tinder, or professional network upgrades. Annual subscriptions are the biggest risk — they're easy to forget between renewals.",
      },
      {
        q: "What is the most cost-effective streaming stack?",
        a: "2025 minimum-spend stack covering 90% of popular content: Netflix Standard with ads ($7.99/month) + Disney+ with ads ($7.99/month) + Amazon Prime Video ($8.99/month, typically already paid for shipping). Total: $24.97/month = $300/year — covering Netflix Originals, Disney/Marvel/Star Wars/Pixar, and Prime Originals. Rotate seasonal subscriptions rather than maintaining all year-round: subscribe to Max in summer for HBO shows, cancel and add Peacock in winter for sports. Buying a Plex lifetime licence ($120 once) and serving personal media eliminates the need for additional services. The 'full stack' (Netflix + Disney+ + Max + Hulu + Prime) now costs $85+/month = $1,020/year.",
      },
    ],
  },

  "take-home-pay-calculator": {
    intro:
      "Take-home pay is what you actually deposit after federal income tax, FICA (Social Security 6.2% + Medicare 1.45%), state income tax, and any pre-tax deductions. For most Americans, take-home pay is 70–80% of gross pay. A $60,000 salary in Texas (no state income tax) nets approximately $47,400/year ($3,950/month). The same salary in California nets approximately $43,800 ($3,650/month) due to California's state income tax.",
    faq: [
      {
        q: "How is take-home pay calculated from gross salary?",
        a: "Step 1: Subtract pre-tax deductions (401k, health insurance, HSA) from gross to get federal taxable income. Step 2: Apply 2025 federal income tax brackets to taxable income (after $14,600 standard deduction for single filers). Step 3: Subtract Social Security (6.2% on wages up to $176,100) and Medicare (1.45% on all wages). Step 4: Subtract state income tax (0–13.3% depending on state). Step 5: Subtract any post-tax deductions. What remains is net take-home. A $70,000 salary single filer in a 5% state income tax state: approximately $52,500/year ($4,375/month) take-home after all taxes.",
      },
      {
        q: "Which states have the highest and lowest take-home pay for the same salary?",
        a: "Highest take-home (no state income tax): Wyoming, South Dakota, Nevada, Washington, Florida, Texas, Alaska (though Alaska has no sales tax either). Tennessee and New Hampshire tax only investment income, not wages. Lowest take-home: California (1–13.3% bracket), Hawaii (1–11%), New Jersey (1.4–10.75%), Oregon (4.75–9.9%), Minnesota (5.35–9.85%). On a $100,000 salary: California resident takes home approximately $71,500; Texas resident approximately $78,800. The $7,300 annual difference compounds to $146,000+ over a 20-year career if invested.",
      },
      {
        q: "How do 401k contributions affect take-home pay?",
        a: "Traditional 401k contributions reduce your federal and state taxable income, decreasing income tax withholding. The net effect: a $1,000 monthly 401k contribution reduces take-home pay by approximately $680–$780 (depending on your marginal tax rate) — not the full $1,000. At a 22% federal + 5% state marginal rate: $1,000 contribution → $270 in tax savings → net take-home reduction of only $730. This makes 401k contributions the most efficient savings vehicle: you invest $1,000 but only feel $730 in reduced take-home. The $270 in tax savings is essentially free money compounding in your account.",
      },
    ],
  },

  "take-home-pay-calculator-uk": {
    intro:
      "UK take-home pay is calculated by deducting income tax (20–45%), employee National Insurance (8% between £12,570 and £50,270 in 2025/26), and any pension contributions from gross salary. A £40,000 gross salary takes home approximately £30,800/year (£2,567/month) after income tax and NI. The personal allowance of £12,570 means the first £12,570 of earnings is tax-free for most workers.",
    faq: [
      {
        q: "How do you calculate UK take-home pay step by step?",
        a: "Step 1: Apply personal allowance — £12,570 of income is tax-free (2025/26, income under £100,000). Step 2: Calculate income tax — 20% on earnings between £12,571 and £50,270; 40% on £50,271–£125,140; 45% above £125,140. Step 3: Calculate employee NI — 8% on earnings between £12,571 and £50,270; 2% above £50,270. Step 4: Subtract any pension contributions (if contributing to a workplace pension — usually auto-enrolled at minimum 5% employee, 3% employer from April 2019). Example: £35,000 gross → income tax = £4,486; NI = £1,794; total = £6,280 → take-home = £28,720 (£2,393/month).",
      },
      {
        q: "How much does an auto-enrolled pension affect UK take-home pay?",
        a: "Auto-enrolment minimum contributions: employer 3% + employee 5% = 8% total on qualifying earnings (£6,240–£50,270 in 2025/26). A £30,000 salary: qualifying band = £30,000 − £6,240 = £23,760. Employee 5% = £1,188/year (£99/month). However, pension contributions are pre-tax: the net take-home reduction is approximately £950/year (£79/month) after income tax relief. For every £1 you contribute, the government adds 20p in basic rate relief directly into your pension (or through tax code adjustment). Higher-rate taxpayers can claim additional 20% relief via self-assessment, making pension contributions exceptionally efficient.",
      },
      {
        q: "What changes to UK tax will affect take-home pay in 2025/26?",
        a: "Key 2025/26 changes: (1) Personal allowance remains frozen at £12,570 through 2027/28 — fiscal drag means inflation pushes more workers into higher bands each year; (2) Higher rate threshold frozen at £50,270; (3) Employee NI rate reduced to 8% (was 12% prior to Jan 2024 cuts); (4) Employer NI increased to 15% from April 2025 (up from 13.8%) — affects employer cost but not employee take-home directly; (5) The secondary NI threshold dropped to £5,000, making it more expensive for employers to hire part-time workers. Net effect for employees: the NI cuts since 2024 have partially offset the fiscal drag impact for most workers.",
      },
    ],
  },

  "tax-bracket-calculator": {
    intro:
      "The US federal income tax system uses progressive marginal brackets — a common misconception is that earning more money can result in taking home less after jumping into a higher bracket. This is impossible: only the income above each threshold is taxed at the higher rate. A $100,000 earner does not pay 22% on all $100,000 — they pay 10% on the first bracket, 12% on the next, and 22% only on income above $47,150 (single filer, 2025).",
    faq: [
      {
        q: "How do the 2025 federal income tax brackets work?",
        a: "2025 federal income tax brackets (single filers): 10% on $0–$11,925; 12% on $11,926–$48,475; 22% on $48,476–$103,350; 24% on $103,351–$197,300; 32% on $197,301–$250,525; 35% on $250,526–$626,350; 37% on income above $626,350. Standard deduction for single filers: $14,600 (2025). A $70,000 salary − $14,600 standard deduction = $55,400 taxable income. Tax: 10% × $11,925 = $1,193; 12% × ($48,475 − $11,925) = $4,386; 22% × ($55,400 − $48,475) = $1,524. Total: $7,103. Effective rate: $7,103 ÷ $70,000 = 10.1%.",
      },
      {
        q: "What is the difference between marginal tax rate and effective tax rate?",
        a: "Marginal rate is the rate applied to the last dollar of income — the top bracket you reach. Effective rate is the actual average rate paid across all income. At $70,000 gross with $14,600 standard deduction (example above): marginal rate = 22% (the bracket the final dollars of taxable income fall in). Effective rate = $7,103 ÷ $70,000 = 10.1%. The effective rate is always lower than the marginal rate in a progressive system. Knowing your marginal rate matters for decisions like: traditional vs Roth 401k (contribute traditional at 22%, withdraw in retirement at lower rate); tax-loss harvesting; timing of deductions.",
      },
      {
        q: "How do deductions and credits differ in reducing your tax bill?",
        a: "Deductions reduce taxable income — their value depends on your marginal rate. A $1,000 deduction at 22% saves $220 in tax; the same deduction at 32% saves $320. Credits reduce your tax bill dollar-for-dollar regardless of income level — a $1,000 tax credit saves exactly $1,000. Credits are generally more valuable. Key 2025 credits: Child Tax Credit ($2,000 per qualifying child); Earned Income Tax Credit ($7,830 max for 3+ children); American Opportunity Credit ($2,500/year, first 4 years of college); Saver's Credit (10–50% of retirement contributions up to $2,000, income-limited); Residential Clean Energy Credit (30% of solar/heat pump installation cost).",
      },
    ],
  },

  "tdee-calculator": {
    intro:
      "Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns per day across all activities — the baseline for any weight goal. Eating at TDEE maintains weight; below TDEE creates a deficit for fat loss; above TDEE creates a surplus for muscle gain. TDEE is calculated as BMR (basal metabolic rate) × an activity multiplier: sedentary (×1.2), lightly active (×1.375), moderately active (×1.55), very active (×1.725), extra active (×1.9).",
    faq: [
      {
        q: "How is TDEE calculated and what is a reasonable calorie deficit for fat loss?",
        a: "Step 1: Calculate BMR using the Mifflin-St Jeor equation (most accurate for most people): Men: (10 × kg) + (6.25 × cm) − (5 × age) + 5. Women: (10 × kg) + (6.25 × cm) − (5 × age) − 161. Step 2: Multiply by activity factor. Example: 30-year-old woman, 65kg, 165cm, moderately active: BMR = (650 + 1,031 − 150 − 161) = 1,370. TDEE = 1,370 × 1.55 = 2,124 cal/day. Deficit for fat loss: 500 cal/day below TDEE = approximately 1 lb/week fat loss (3,500 cal per pound of fat). Aggressive deficit (750–1,000 cal below TDEE) risks muscle loss — keep protein at 0.7–1g/lb body weight.",
      },
      {
        q: "How accurate are TDEE calculators, and why might my results differ?",
        a: "TDEE formulas are population averages with ±10–15% individual variation. Factors that make actual TDEE differ from calculated: (1) Metabolic adaptation — prolonged calorie restriction suppresses BMR by 5–15% (adaptive thermogenesis); (2) NEAT (non-exercise activity thermogenesis) — fidgeting, walking between tasks, unconscious movement varies by 300–500 calories/day between individuals; (3) Sleep — chronic under-sleep raises cortisol and reduces metabolic rate; (4) Thyroid function — hypo/hyperthyroidism significantly affects BMR; (5) Muscle mass vs estimated. The most accurate approach: use calculator for an estimate, then track calories and weight for 3–4 weeks and adjust based on actual results.",
      },
      {
        q: "Why do I stop losing weight even when eating at a calorie deficit?",
        a: "Weight loss plateaus are caused by several mechanisms: (1) Metabolic adaptation (adaptive thermogenesis): the body reduces BMR in response to sustained calorie restriction — a 25% calorie deficit triggers approximately 15% metabolic rate reduction over 12–16 weeks. (2) Water retention masking fat loss: sodium, stress (cortisol), and hormonal cycles cause water weight fluctuations of 2–5 lbs that can mask fat loss for weeks. (3) Calorie creep: portion sizes and food logging accuracy typically worsen over time. (4) Changed body composition: as you lose weight, your TDEE decreases — you need to recalculate periodically. Solutions: diet breaks (1–2 weeks at maintenance), refeed days, resistance training to maintain muscle, and re-tracking food portions.",
      },
    ],
  },

  "tile-calculator": {
    intro:
      "Calculating tile quantities requires accounting for the room's square footage plus a 10% waste allowance for cuts, breakage, and pattern matching. A 12×12ft bathroom floor (144 sq ft + 14.4 sq ft waste = 158.4 sq ft) needs 18 boxes if tiles come in 10 sq ft per box. The most common tiling mistake is buying exactly the right amount — 10% extra prevents expensive mid-project trips that risk dye lot mismatches.",
    faq: [
      {
        q: "How do you calculate how many tiles you need for a floor or wall?",
        a: "Step 1: Measure the area in square feet (length × width for rectangular rooms; break complex shapes into rectangles). Step 2: Add 10% for waste: area × 1.10. For diagonal layouts or complex patterns, increase to 15% waste. Step 3: Divide by tile coverage per box (typically listed on box; calculate as tile size in sq ft × tiles per box). Example: 150 sq ft room, 12×24 inch tiles (2 sq ft each), 7 tiles per box = 14 sq ft/box. Required: 150 × 1.10 = 165 sq ft ÷ 14 sq ft/box = 11.8 → buy 12 boxes. Always round up to the next full box.",
      },
      {
        q: "How much does tile installation cost in the US?",
        a: "Material costs (2025): ceramic floor tile: $1–$4/sq ft; porcelain floor tile: $3–$8/sq ft; natural stone (travertine, marble): $5–$20/sq ft; subway wall tile: $1–$5/sq ft. Labour: basic floor installation $5–$10/sq ft; wall tile $8–$14/sq ft; complex patterns (herringbone, mosaic) $12–$20/sq ft. Additional costs: tile backer board ($0.50/sq ft materials + labour); grout and adhesive ($0.50–$1.50/sq ft); tile removal if replacing: $2–$4/sq ft. Total installed cost for a 150 sq ft bathroom floor in porcelain: $1,200–$2,700 including all materials and labour.",
      },
      {
        q: "What is the best tile size for a small bathroom?",
        a: "Conventional wisdom that large tiles make small rooms look smaller is largely a myth. Large format tiles (24×24 or 24×48 inches) create fewer grout lines, making small spaces appear more expansive and easier to clean. Recommended for small bathrooms: 12×24 or 18×18 floor tiles; 4×16 or 3×12 subway wall tiles. True small tiles (1×1 mosaic) read as busy in small spaces unless very carefully designed. Large format tiles have higher material and labour costs due to weight, precision required, and larger underlayment preparation requirements. The most important factor for small bathrooms is maintaining a consistent colour tone between floor and walls — this visually expands the space more than tile size.",
      },
    ],
  },

  "time-between-dates-calculator": {
    intro:
      "Calculating the exact number of days, weeks, months, and years between two dates matters for legal deadlines, contract terms, interest calculations, age verification, and project planning. The calculation is complicated by leap years (366-day years), variable month lengths (28–31 days), and whether to count the start date, end date, or both. The ISO 8601 standard defines date arithmetic consistently — most programming and spreadsheet tools follow it.",
    faq: [
      {
        q: "How do you calculate the number of days between two dates?",
        a: "Straightforward method: convert both dates to day-of-year serial numbers and subtract. In Excel/Google Sheets: =DAYS(end_date, start_date) or simply =end_date − start_date (with cells formatted as numbers). Example: Jan 1 to Dec 31 in a non-leap year = 364 days (not 365 — the start date is not counted). To include both start and end dates: add 1 to the result. For legal/financial calculations: 'number of days from Jan 1 to Feb 1' = 31 days (31 calendar days elapsed). Leap year check: a year is a leap year if divisible by 4, except century years which must be divisible by 400 (2000 was a leap year; 1900 was not).",
      },
      {
        q: "What is the difference between calendar days and business days?",
        a: "Calendar days: every day including weekends and holidays. Business days: Monday–Friday excluding federal (or bank) holidays. Common financial and legal contexts use business days: SEC filings (T+1 settlement = next business day); contract notice periods ('10 business days notice'); most international wire transfer timelines (1–3 business days). To count business days: subtract weekends first (approximately 2/7 of all days), then subtract applicable holidays. A 30-calendar-day deadline from a Monday falls on Wednesday 4 weeks later; 30 business days from Monday falls approximately 6 weeks later (42 calendar days).",
      },
      {
        q: "How do you calculate someone's age accurately in years, months, and days?",
        a: "Age in complete years: count the number of times the birthday has passed. Born March 15, 1990, measured on May 17, 2025: complete years = 35 (birthday has passed in 2025); remaining months = 2 (March 15 to May 15); remaining days = 2 (May 15 to May 17). In Excel: =DATEDIF(birth_date, today_date, 'Y') for full years; =DATEDIF(birth_date, today_date, 'YM') for remaining months; =DATEDIF(birth_date, today_date, 'MD') for remaining days. The DATEDIF function, though undocumented in newer Excel versions, remains functional and is the standard tool for this calculation.",
      },
    ],
  },

  "time-clock-calculator": {
    intro:
      "Time clock calculations convert clock-in and clock-out times into total hours worked, calculate overtime, and determine gross pay. The primary conversion challenge is that time uses base-60 arithmetic (60 minutes per hour) while payroll uses decimal hours. 7 hours 45 minutes = 7.75 hours (not 7.45). Payroll systems typically round to the nearest 6 minutes (0.1 hour) or 15 minutes (0.25 hour) — rounding rules must comply with FLSA requirements.",
    faq: [
      {
        q: "How do you convert hours and minutes to decimal hours for payroll?",
        a: "Decimal hours = whole hours + (minutes ÷ 60). 8 hours 30 minutes = 8 + (30/60) = 8.50 hours. 7 hours 45 minutes = 7.75 hours. 6 hours 20 minutes = 6.333 hours. Common conversions: 15 min = 0.25; 30 min = 0.50; 45 min = 0.75. For payroll: gross pay = decimal hours × hourly rate. 8.5 hours at $18/hour = $153.00. For weekly totals: sum all daily decimal hours, then calculate overtime on any total above 40 hours. Overtime pay for hours 40.1+: hourly rate × 1.5 × overtime hours.",
      },
      {
        q: "What are the FLSA rules on rounding employee time?",
        a: "The FLSA permits time-rounding practices if: (1) rounding is to the nearest 5 minutes, 1/10th of an hour, or 15 minutes; (2) over time, the rounding averages out — it cannot systematically under-pay employees. The 7/8 minute rule for 15-minute rounding: clock-ins from :01–:07 round down to the hour; :08–:14 round up to the next quarter-hour. The safest approach: track exact minutes and pay exact hours — rounding creates FLSA compliance risk and is less necessary with modern digital time-tracking systems. Employers who round must be able to demonstrate neutral rounding outcomes over time if audited.",
      },
      {
        q: "How does time tracking affect overtime calculations for non-standard schedules?",
        a: "FLSA overtime is calculated weekly (Sunday–Saturday or any fixed 7-day workweek defined by the employer) — not daily (except California, Alaska, and Nevada). A worker scheduled 4×10-hour days works 40 hours with no FLSA overtime; if they also work one extra 2-hour shift, overtime applies to those 2 hours. Key point: approved advance overtime and unapproved overtime both legally require overtime pay — an employer cannot refuse to pay for overtime they didn't approve in advance if the work was performed. Comp time (time off in lieu of overtime pay) is generally not permitted for private-sector non-exempt employees under FLSA.",
      },
    ],
  },

  "time-to-retirement-calculator": {
    intro:
      "The traditional retirement age of 65 was set when US life expectancy was 63. Today, a 65-year-old has a 50% probability of living to 85 — and must fund 20+ years of retirement. Financial independence — having enough invested to live off returns indefinitely — depends on savings rate, not income. Someone saving 50% of income reaches financial independence in approximately 17 years from a zero start, regardless of salary level.",
    faq: [
      {
        q: "How does savings rate determine time to retirement?",
        a: "The key insight from early retirement research (Mr Money Mustache, Trinity Study): the time to financial independence depends almost entirely on your savings rate — not your income level. Savings rate → years to FI (assuming 7% return, 4% SWR, starting from zero): 10% savings rate = 43 years; 20% = 31 years; 30% = 24 years; 40% = 19 years; 50% = 17 years; 60% = 14 years; 75% = 10 years. This explains why a $50,000 earner saving 50% can retire in the same time as a $200,000 earner saving 12.5% — they both reach 25× their expenses at similar speeds.",
      },
      {
        q: "What is the 4% safe withdrawal rate and how is it used to determine retirement readiness?",
        a: "The 4% rule: a retiree can withdraw 4% of their portfolio in year 1, then adjust annually for inflation, with 95%+ probability of the portfolio lasting 30 years (Bengen 1994, Trinity Study). This implies: retirement number = annual expenses × 25. At $50,000/year spending: need $1,250,000. At $40,000: need $1,000,000. At $30,000: need $750,000. For early retirement (40–50 years of potential retirement): many planners use 3.3–3.5% to account for the longer horizon. A portfolio of $1,000,000 with 3.5% SWR supports $35,000/year — potentially combined with future Social Security.",
      },
      {
        q: "What are the biggest risks to a retirement plan?",
        a: "Sequence of returns risk: a major market downturn in the first 5 years of retirement is far more damaging than one later — because you're selling depreciated assets for income, reducing the shares available to recover. Mitigation: keep 2–3 years of expenses in cash/bonds to avoid selling equities in a downturn. Longevity risk: outliving savings — a 65-year-old couple has a 50% chance of at least one spouse reaching 92. Healthcare cost inflation: medical inflation historically outpaces CPI; Medicare covers Part A/B but not long-term care. Inflation: purchasing power erosion over 30+ years. The most robust plans account for all four risks with diversified income sources: portfolio withdrawals + Social Security + annuity income for longevity protection.",
      },
    ],
  },

  "tip-calculator": {
    intro:
      "Tipping norms in the US have shifted upward significantly since 2020 — the average restaurant tip rose from 18.5% pre-pandemic to 19.9% in 2024 (Square data). Tip prompts now appear on digital terminals for counter service, takeout, and services where tipping was historically rare. Understanding what to tip where — and how to calculate it quickly — prevents both under-tipping (affecting servers who depend on tips as wages) and 'tip creep' on services where gratuity isn't customary.",
    faq: [
      {
        q: "What is the standard tip percentage for different services?",
        a: "Current US tipping norms (2025): sit-down restaurant: 18–22% on pre-tax bill; fine dining: 20–25%; bar tab: $1–2/drink or 15–20%; food delivery: 15–20% of order total, minimum $3–5; ride-share: 15–20%, most common 10–15%; hotel housekeeping: $3–5/night; hair/salon: 15–20%; spa services: 15–20%; takeout/counter service: optional, typically 0–10%; self-checkout: no obligation. The distinction for counter/fast-casual tipping: these workers are generally paid at least minimum wage (unlike servers in states with tipped minimum wage of $2.13/hour), so tipping is appreciated but not compensating for wage gaps.",
      },
      {
        q: "How do you calculate a tip quickly without a calculator?",
        a: "Method 1 — Double the tax: if your bill is $65 and sales tax is 9%: tax = $5.85; double it = $11.70 tip ≈ 18% (works well in states with 8–10% tax). Method 2 — 10% + half: 10% of $65 = $6.50; half of that = $3.25; sum = $9.75 for 15% tip. Add $6.50 more for 25% tip. Method 3 — Multiply and round: $65 × 0.20 = $13.00 exactly — move the decimal one place left and double. For splitting with a tip: total with 20% tip = bill × 1.20; divide by number of people. $65 × 1.20 = $78 ÷ 4 people = $19.50 each.",
      },
      {
        q: "Should you tip on the pre-tax or post-tax amount?",
        a: "The conventional standard is to tip on the pre-tax bill — the tip is for service, not for the government's share. On a $100 meal with 8.875% sales tax (New York): post-tax total = $108.88. Tipping 20% on pre-tax = $20.00; on post-tax = $21.78. The $1.78 difference is negligible in most cases, and most diners simply tip on the total shown rather than mentally subtracting tax. In practice, tipping on pre-tax is the technically correct norm but tipping on post-tax is now common enough that servers and guides cite both. The larger tip (post-tax) is never wrong.",
      },
    ],
  },

  "true-hourly-wage": {
    intro:
      "Your true hourly wage is lower than your nominal rate once you account for the time and money spent earning it — commuting, work clothing, professional lunches, childcare, and job decompression time all subtract from the equation. A $65,000 salaried worker who commutes 90 minutes daily, spends $400/month on work costs, and works 50-hour weeks may have a true hourly rate of $18–$22/hour — comparable to many hourly workers who earn less on paper but have significantly lower 'work costs' and time commitment.",
    faq: [
      {
        q: "How do you calculate your true hourly wage?",
        a: "True hourly rate = (annual gross pay − annual work-related costs) ÷ annual work-related hours. Work-related costs: commuting ($0.70/mile IRS rate or transit costs); work clothes and dry-cleaning; professional lunches/coffee; childcare attributable to working; tax preparation (marginal cost). Work-related hours: actual hours worked (including unpaid overtime); commuting time; decompression time (unwinding after stressful work); work errand time. Example: $70,000 salary; 50hr/week actual work; 1hr/day commute (5hr/week); $400/month work costs ($4,800/year). True rate = ($70,000 − $4,800) ÷ ((55hr × 52 weeks)) = $65,200 ÷ 2,860 = $22.80/hour.",
      },
      {
        q: "Why does knowing your true hourly rate matter for spending decisions?",
        a: "Vicki Robin and Joe Dominguez (Your Money or Your Life) propose converting every purchase price into 'life energy' — hours of your life required to earn that purchase after accounting for true wage. If your true hourly wage is $20: a $400 appliance = 20 hours of life energy; a $1,200 holiday = 60 hours. This reframing changes the emotional register of spending decisions — 'is this worth 60 hours of my working life?' is a more visceral question than 'do I have $1,200?' It doesn't mean refusing all discretionary spending; it means making the implicit trade-off explicit so purchases reflect actual values.",
      },
      {
        q: "What job changes most improve your true hourly wage?",
        a: "Factors that increase true hourly rate without raising nominal pay: (1) Eliminating commute through remote work (adding back 5–10 hours/week and $3,000–$8,000/year in commuting costs) can increase true hourly rate by 20–30%; (2) Reducing actual weekly hours by negotiating part-time or flexible hours while keeping pro-rated salary; (3) Eliminating mandatory work wardrobe (save $500–$2,000/year); (4) Reducing work-related childcare needs. Factors that lower true rate despite salary increases: significantly longer commute; corporate culture requiring substantial unpaid overtime; higher-cost city requiring expensive professional presentation. A 10% pay raise accompanied by 10 extra hours/week is often a pay cut in true hourly rate terms.",
      },
    ],
  },

  "vaping-cost-calculator": {
    intro:
      "Vaping costs vary significantly by device type: disposable vapes ($8–$15 each, lasting 1–3 days for heavy users) can cost $2,000–$5,000/year; a pod system with refill pods ($4–$8/pod, lasting 1–2 days): $700–$2,000/year; an advanced mod with e-liquid ($20–$40/30ml bottle lasting 1–2 weeks): $500–$1,200/year. Compared to cigarettes, vaping is generally cheaper — but not cheap. And the long-term health costs of vaping remain under active research.",
    faq: [
      {
        q: "How much does vaping cost per year compared to smoking?",
        a: "Disposable vapes (Elf Bar, Lost Mary): $10–$15 each, lasting heavy users 1–2 days. 1.5 days average: $10 × 243 = $2,430/year at the low end. Pod systems (JUUL, Vuse): device $30–$40; pods $4–$8 each, lasting 1–3 days. Average: 2 pods/week × $6 = $624/year in pods + $40 device. Mod/open system: 3ml e-liquid/day × 365 = 1,095ml/year. At $20/30ml bottle: ~$730/year. Cigarette comparison: 1 pack/day at $10 = $3,650/year. Vaping can be 3–6× cheaper than smoking — but disposable heavy users often exceed cigarette costs due to device convenience and higher consumption rates.",
      },
      {
        q: "What are the known health risks of vaping in 2025?",
        a: "What the evidence shows: (1) Vaping is significantly less harmful than cigarettes for established smokers — the NHS and Public Health England estimate 95% reduced harm relative to smoking (though this figure is disputed); (2) EVALI (e-cigarette or vaping-associated lung injury): primarily linked to vitamin E acetate in black-market THC cartridges, not nicotine products; (3) Nicotine addiction and cardiovascular effects are similar to smoking — nicotine is not a neutral substance; (4) Popcorn lung (diacetyl exposure): not found in most reputable UK/EU products but historically present in some US flavours. Long-term data (20-year studies) simply doesn't exist yet — the technology is too new. For non-smokers: no safe level of vaping has been established.",
      },
      {
        q: "What is the cheapest way to quit both smoking and vaping?",
        a: "Most cost-effective cessation strategies: (1) Nicotine Replacement Therapy (NRT) — patches, gum, lozenges: $30–$60/month during cessation; often covered by insurance under ACA preventive care. (2) Prescription varenicline (Chantix): most effective pharmaceutical ($200–$400 course; covered by most insurance). (3) Allen Carr's Easyway method: book ($15) or seminar ($400) — high success rate anecdotally, no randomised trials. (4) NHS Stop Smoking Services (UK): free support including NRT. Combining NRT with counselling doubles success rates vs unaided attempts. The financial case is straightforward: $300 in cessation aids to end a $2,000/year habit has a 6.7× ROI in year one alone.",
      },
    ],
  },

  "water-intake-calculator": {
    intro:
      "The '8 glasses a day' recommendation has no scientific basis — it's a misinterpretation of a 1945 US Food and Nutrition Board recommendation that also noted most water needs are met through food. The National Academy of Medicine's evidence-based guidance: approximately 3.7 litres (125oz) total water per day for men; 2.7 litres (91oz) for women — from all food and beverage sources combined. Roughly 20% comes from food; 80% from beverages.",
    faq: [
      {
        q: "How much water should I actually drink per day?",
        a: "Evidence-based general targets: men 3.0–3.7 litres/day total fluid intake; women 2.2–2.7 litres/day. Factors that increase needs: exercise (add 500ml–1L per hour of vigorous activity); hot/humid weather (add 500ml–1L); high-protein diets (more water needed for urea processing); pregnancy (+300ml); breastfeeding (+700ml). Practical indicator: urine colour is the best real-time guide. Pale yellow (straw-coloured) = well hydrated. Dark yellow = mildly dehydrated. Clear colourless = over-hydrated (electrolyte dilution risk with excessive intake). The kidneys can process approximately 0.8–1 litre of water per hour maximum — drinking far beyond needs is neither beneficial nor harmless in extreme quantities.",
      },
      {
        q: "Does coffee count towards daily water intake?",
        a: "Yes — the mild diuretic effect of caffeine in coffee does not outweigh its contribution to hydration. Research (Armstrong et al., 2012): moderate coffee consumption (3–4 cups/day) has the same hydration effect as equivalent water. A cup of coffee is approximately 98% water — it contributes to hydration despite the caffeine. The net effect of caffeine's diuresis is small and temporary, compensated by the large water volume. Tea, herbal teas, juice, and milk also count fully toward daily fluid intake. However, alcohol is genuinely dehydrating and should not be counted positively — it suppresses ADH (antidiuretic hormone), causing more water loss than the beverage contains.",
      },
      {
        q: "Can you drink too much water, and what are the signs?",
        a: "Overhydration (hyponatraemia) occurs when excessive water intake dilutes blood sodium below safe levels. Risk groups: endurance athletes who over-drink during long events; people with certain kidney conditions; occasionally children given too much water. Symptoms of mild hyponatraemia: nausea, headache, confusion, fatigue — easily mistaken for dehydration and treated with more water (dangerous). Severe hyponatraemia: seizures, coma, death in extreme cases. For typical healthy adults, the kidneys regulate excess fluid effectively up to about 1 litre per hour — casual over-drinking (extra 1–2 litres) is harmless. The concept of 'drink as much water as possible' for health is not supported by evidence and can be harmful for at-risk individuals.",
      },
    ],
  },

  "wedding-cost-calculator": {
    intro:
      "The average US wedding cost $33,900 in 2024 (The Knot). The venue is typically the largest expense at 30–35% of total budget ($10,000–$16,000). Photography/videography: 10–15%. Catering per head: $75–$250. A 100-guest wedding at $180/head catering alone = $18,000. The average couple spends 18–24 months planning — and the financial decisions made in the first 3 months (venue, date, guest count) determine 80% of total cost.",
    faq: [
      {
        q: "How do you budget for a wedding by category?",
        a: "Typical wedding budget allocation (100-guest wedding, $35,000 total): Venue: 30% ($10,500); Catering + bar: 35% ($12,250); Photography/video: 12% ($4,200); Flowers/décor: 8% ($2,800); Music/entertainment: 5% ($1,750); Attire (both partners): 5% ($1,750); Officiant + ceremony: 2% ($700); Stationery: 1.5% ($525); Hair/makeup: 1.5% ($525); Wedding cake: 2% ($700); Miscellaneous/contingency: 3% ($1,050). The most common budget overrun areas: bar tab (open bars are unpredictable), floral (easily expanded), and photography (hard to compromise on retrospectively).",
      },
      {
        q: "What are the most effective ways to reduce wedding costs without sacrificing quality?",
        a: "High-impact cost reductions: (1) Reduce guest count — this is the single most powerful lever; cutting from 150 to 100 guests saves $7,500+ in catering alone; (2) Off-peak date (November–March, Monday–Thursday) saves 20–35% on venue and catering; (3) Brunch or lunch reception vs dinner — equivalent food costs 30–40% less; (4) Hire an emerging photographer (2–3 years experience): $2,500–$4,000 vs established $5,000–$10,000; (5) Digital invitations for save-the-dates; (6) Flowers in season and local — peonies in June vs imported in December is a 50–100% price difference; (7) Cash bar or beer/wine only vs full open bar saves $1,500–$4,000.",
      },
      {
        q: "Should I take on debt or dip into savings to pay for a wedding?",
        a: "Financially, no — starting a marriage with wedding debt is one of the leading financial stressors for newly married couples. Average wedding credit card debt: $3,000–$11,000. At 22% APR paying $200/month: $5,000 in debt takes 33 months and $1,600 in interest to clear. The wedding has already ended; the debt continues. Better approaches: set a firm budget equal to what you can pay from savings and contributions from family; adjust guest count and scope to fit the budget (not the reverse); save 12–18 months in advance with a dedicated wedding fund earning 4–5% in a HYSA. The first 5 years of marriage have higher divorce risk — financial stress amplifies conflict. Spending within means is a genuine act of relationship protection.",
      },
    ],
  },

  "wfh-savings-calculator": {
    intro:
      "Working from home saves the average employee $6,000–$12,000 per year compared to office work. The largest components: eliminated commuting costs ($2,000–$5,000/year for gas, transit, parking, or vehicle wear); food savings ($2,000–$4,000 if you previously bought lunch and coffee); work wardrobe savings ($500–$2,000); childcare flexibility ($1,000–$5,000 for parents with some schedule flexibility). For many workers, a remote job paying $5,000–$10,000 less is financially equivalent to an on-site role.",
    faq: [
      {
        q: "How much does the average remote worker save compared to commuting?",
        a: "Commuting cost breakdown: IRS mileage rate 70¢/mile (2025) — a 30-mile round trip = $21/day = $4,200/year (200 working days). Public transit: $150–$250/month = $1,800–$3,000/year. Parking: $100–$400/month in most cities = $1,200–$4,800/year. Added together: driving commuters with parking pay $3,000–$9,000/year just in direct transportation costs. Add vehicle wear, oil changes, and depreciation attributable to work mileage: true commuting cost is commonly $5,000–$12,000/year — making a $10,000 pay cut to work remotely a break-even at the high end and a pay raise at the low end.",
      },
      {
        q: "What home office tax deductions are available for remote workers?",
        a: "W-2 employees: Since the 2017 Tax Cuts and Jobs Act, W-2 employees cannot deduct home office expenses on federal returns (the miscellaneous itemised deduction was eliminated). Some states (California, New York, Pennsylvania) allow home office deductions for employees — check your state. Self-employed workers and freelancers: can deduct home office (simplified: $5/sq ft up to 300 sq ft = $1,500 max; or actual expenses × business use percentage); internet service (business use %); office equipment; phone (business use %); office supplies. Remote W-2 workers should ask their employer about reimbursement for home office expenses — many companies have policies that provide $50–$150/month for home office setup and internet.",
      },
      {
        q: "How do I calculate whether a remote job with lower pay is worth taking?",
        a: "True compensation comparison: Remote job salary + (commuting cost savings) + (food savings) + (wardrobe savings) + (childcare savings if applicable) − (increased home utility costs) − (home office setup costs amortised). Example: Office job at $75,000 vs remote job at $68,000. Savings from remote: commuting $4,500 + food $2,500 + wardrobe $800 = $7,800. Increased costs: utilities +$600, internet upgrade +$200 = $800. Net benefit of remote: $7,800 − $800 = $7,000. Adjusted comparison: remote $68,000 + $7,000 savings = $75,000 equivalent. The jobs are financially equal — and the remote position offers additional quality-of-life benefits in time recovered (commute hours eliminated).",
      },
    ],
  },

  "work-hours-calculator": {
    intro:
      "The standard US full-time workweek is 40 hours, though knowledge workers average 47 hours (Gallup) and senior executives report 55–65 hours. Beyond approximately 50 hours per week, productivity per hour drops sharply — research shows output from a 70-hour week is little better than a 55-hour week. The work hours calculator converts clock times, breaks, and schedules into total hours, overtime, and gross pay for any pay period.",
    faq: [
      {
        q: "How do you calculate total hours worked in a week including breaks?",
        a: "Total hours = (Clock-out time − Clock-in time) − unpaid break time. Example: Clock in 8:30am, lunch break 12:00–12:45pm, clock out 5:30pm. Total time: 8:30am to 5:30pm = 9 hours. Minus 45-minute lunch break = 8.25 hours. Convert to decimal: 8h 15min = 8.25 hours. For weekly total: sum all daily decimal hours. If the weekly total exceeds 40 hours, overtime pay applies to the excess at 1.5× the regular rate (for non-exempt employees under FLSA). FLSA mandates a 30-minute unpaid meal break only in certain contexts; individual state laws may require meal and rest breaks.",
      },
      {
        q: "How many hours per year does a full-time employee work?",
        a: "Standard calculation: 40 hours/week × 52 weeks = 2,080 hours/year. Adjusted for typical PTO and holidays: 2,080 − (10 vacation days + 10 federal holidays) × 8 hours = 2,080 − 160 = 1,920 actual working hours/year. For hourly-rate-to-salary comparison, use the gross 2,080 figure. For productivity capacity planning, use 1,920 or lower. For professional services billing rate calculation: actual billable hours are typically 1,200–1,600 for most client-facing roles (accounting for meetings, admin, non-billable work). A consultant billing 1,400 hours/year at $150/hour generates $210,000 in revenue.",
      },
      {
        q: "Is working more hours actually more productive?",
        a: "Research on working hours and productivity: (1) John Pencavel (Stanford, 2014): output per hour begins declining significantly above 49 hours/week; at 55 hours, the additional output is negligible; by 70 hours, output is barely higher than 55 hours. (2) Microsoft Japan (2019): a 4-day work week (32 hours) increased productivity by 40%. (3) Perpetual Guardian (New Zealand, 2018): same result — 4-day week, productivity maintained or improved, sick days and stress down significantly. The implication: the relationship between hours and output is nonlinear, and knowledge work productivity is driven more by recovery, focus quality, and intrinsic motivation than by time spent at desk.",
      },
    ],
  },

  "working-days-calculator": {
    intro:
      "The standard US work year contains 260 working days (52 weeks × 5 days). After subtracting 10 federal holidays and average 10–15 PTO days, actual working days per year are typically 235–240. This figure matters for: daily rate calculation (annual salary ÷ 260 working days = daily rate); project deadline estimation; payroll for part-time and contract workers; and understanding how many productive days separate two dates on a calendar.",
    faq: [
      {
        q: "How do you calculate the number of working days between two dates?",
        a: "Step 1: Count total calendar days between dates. Step 2: Subtract weekend days (Saturday and Sunday). Step 3: Subtract public holidays that fall on weekdays within the period. In Excel/Google Sheets: =NETWORKDAYS(start_date, end_date) calculates business days including both start and end dates; =NETWORKDAYS(start_date, end_date, holidays) excludes specified holidays. Python: from datetime import date; business_days = sum(1 for day in range((end-start).days) if (start + timedelta(day)).weekday() < 5). The result excludes weekends but you must manually specify which public holidays to exclude.",
      },
      {
        q: "How many working days are in each month of the year?",
        a: "Approximate working days per month (US 2025, excluding federal holidays): January: 21 days (MLK day); February: 19 days (Presidents' Day); March: 21 days; April: 22 days; May: 21 days (Memorial Day); June: 21 days; July: 22 days (Independence Day falls Wed); August: 21 days; September: 21 days (Labor Day); October: 23 days; November: 19 days (Veterans Day + Thanksgiving); December: 21 days (Christmas). Highest working day months: October and April. Lowest: November and February. These counts matter for monthly revenue projections, billing rate calculations, and scheduling project deadlines.",
      },
      {
        q: "What is a contractor or freelancer's daily rate based on annual salary?",
        a: "Daily rate = annual salary equivalent ÷ working days per year. The correct divisor depends on how many days you want to be paid for: (1) 260 days (all working days including holidays): maximum billing opportunity; (2) 253 days (260 − 10 federal holidays): if you take public holidays off; (3) 233 days (253 − 20 PTO days): if you include 4 weeks' holiday. A $100,000 equivalent salary: 260 days = $385/day; 253 days = $395/day; 233 days = $429/day. Contractors should use 253–233 days as their divisor, then add 30–40% to cover self-employment taxes, benefits, and non-billable admin time. True equivalent daily rate for $100k permanent salary: $560–$630/day.",
      },
    ],
  },

};
