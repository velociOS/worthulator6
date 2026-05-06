export interface SqFtConfig {
  title: string;
  metaTitle: string;
  metaDescription: string;
  introText: string;
  heroSubtitle: string;
  contentHeading: string;
  contentBody: string;
  defaultCostLow: number;
  defaultCostHigh: number;
  unitLabel: string;
  category: string;
  keywords: string[];
  relatedSlugs: string[];
  exampleArea: number;
  exampleAreaLabel: string;
  internalLinks: { label: string; href: string }[];
  costTable: { area: string; low: string; high: string }[];
  factors: { icon: string; title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export const sqftConfigs: Record<string, SqFtConfig> = {
  "roof-cost-per-sq-ft": {
    title: "Roof Cost Per Sq Ft Calculator",
    metaTitle: "Roof Cost Per Sq Ft Calculator – Estimate Your Roofing Cost Instantly",
    metaDescription:
      "Use our free roof cost per sq ft calculator to instantly estimate your roofing project cost. Enter your roof area and get a breakdown for asphalt, metal, and tile roofs.",
    heroSubtitle:
      "Enter your roof area and see your total roofing cost instantly — asphalt, metal, or tile.",
    introText:
      "Roofing contractors quote by the square — 100 sq ft — but homeowners think in total area. Asphalt shingles, metal, and tile all have very different price points, and pitch, valleys, and removal costs all push the final bill higher. Use the calculator above for an instant baseline before talking to a contractor.",
    contentHeading: "What affects roofing cost per square foot?",
    contentBody:
      "Asphalt shingles average $4–$7 per sq ft installed and remain the most popular choice for US homeowners. Metal roofing runs $7–$14 per sq ft and lasts 40–70 years. Tile and slate cost $10–$20+ per sq ft. Steeper pitches, valleys, skylights, and chimney flashing all increase labor costs. Always add 10–15% for waste and offcuts when ordering materials. For a full installed-cost breakdown including labor, tear-off, and decking repairs, see our roof replacement cost calculator.",
    defaultCostLow: 4,
    defaultCostHigh: 10,
    unitLabel: "sq ft",
    category: "Roofing",
    keywords: [
      "roof cost per sq ft",
      "roofing cost calculator",
      "cost per square foot roof",
      "roof replacement cost per sq ft",
      "how much does roofing cost per square foot",
    ],
    relatedSlugs: ["painting-cost-per-sq-ft", "concrete-cost-per-sq-ft"],
    exampleArea: 1500,
    exampleAreaLabel: "1,500 sq ft roof",
    internalLinks: [
      { label: "Roof Replacement Cost Calculator", href: "/tools/cost-calculators/home-improvement/roof-replacement-cost" },
      { label: "Concrete Cost Per Sq Ft", href: "/cost-calculators/concrete-cost-per-sq-ft" },
      { label: "All Construction Calculators", href: "/construction-calculators" },
    ],
    costTable: [
      { area: "500 sq ft (garage / shed roof)", low: "$2,000", high: "$5,000" },
      { area: "1,000 sq ft", low: "$4,000", high: "$10,000" },
      { area: "1,500 sq ft (average US home)", low: "$6,000", high: "$15,000" },
      { area: "2,000 sq ft", low: "$8,000", high: "$20,000" },
      { area: "2,500 sq ft (large home)", low: "$10,000", high: "$25,000" },
    ],
    factors: [
      { icon: "🏗️", title: "Material type", desc: "Asphalt shingles cost $4–$7/sq ft installed. Metal runs $7–$14/sq ft. Tile and slate reach $10–$20+/sq ft. Material alone can triple the price for the same sized roof." },
      { icon: "📐", title: "Roof pitch (steepness)", desc: "Low-slope roofs (4:12 or less) are cheaper and safer to work on. Steep pitches (8:12+) require safety equipment and take longer — adding $1–$2/sq ft to labour costs." },
      { icon: "🔨", title: "Layers to remove", desc: "Tearing off one existing layer adds $1–$1.50/sq ft. Two or more layers can add $2–$3/sq ft in disposal and labour. Many local codes limit roofs to two layers." },
      { icon: "🏠", title: "Valleys, skylights & flashings", desc: "Complex rooflines with multiple valleys, dormers, skylights, or chimneys dramatically increase labour time — easily adding $500–$2,000+ to the total cost." },
      { icon: "📍", title: "Geographic location", desc: "Roofing costs in the Northeast and West Coast run 20–40% above national averages. Rural areas may also carry delivery surcharges for materials." },
      { icon: "🛡️", title: "Underlayment & decking condition", desc: "If the roof decking (plywood) is rotten or damaged, replacing it adds $2–$3/sq ft. Synthetic underlayment costs more than felt but improves moisture protection and lifespan." },
    ],
    faqs: [
      { q: "How much does a new roof cost per square foot?", a: "A new roof costs $4–$10 per square foot installed for standard asphalt shingles. Metal roofing runs $7–$14/sq ft. Tile and slate cost $10–$20+/sq ft. Most US homeowners pay $8,000–$15,000 for a typical 1,500–2,000 sq ft roof replacement." },
      { q: "What is the cheapest roofing material per square foot?", a: "3-tab asphalt shingles are the cheapest at $3.50–$5.50/sq ft installed. Architectural (dimensional) shingles are more popular and durable at $4.50–$7/sq ft. Both are significantly cheaper than metal, tile, or slate." },
      { q: "Does roof pitch affect cost per square foot?", a: "Yes — steep roofs cost more per square foot because they require more safety equipment and take longer to work on. A steep 10:12 pitch can add $1–$2/sq ft versus a standard 4:12 pitch. Roofers also account for more waste on steep roofs." },
      { q: "How long does a roof replacement take?", a: "A standard residential roof replacement takes 1–3 days. Larger homes, complex rooflines, or adverse weather can extend this to 4–5 days. Metal and tile roofs take longer to install than asphalt shingles." },
      { q: "Is it worth getting multiple roofing quotes?", a: "Yes — roofing quotes can vary by 20–40% for the same work. Always get at least 3 quotes from licensed local contractors, verify insurance, and check reviews. The cheapest quote is not always the best — look at warranty terms and the materials specified." },
    ],
  },

  "painting-cost-per-sq-ft": {
    title: "Painting Cost Per Sq Ft Calculator",
    metaTitle: "Painting Cost Per Sq Ft Calculator – Estimate Paint Cost Instantly",
    metaDescription:
      "Use our free painting cost per sq ft calculator to instantly estimate interior or exterior painting costs. Enter your wall area and get a realistic cost range based on real contractor rates.",
    heroSubtitle:
      "Tell us your wall area and instantly estimate your painting cost — interior or exterior.",
    introText:
      "Interior and exterior painting are priced differently — and most online estimates won't tell you why. Interior walls average $2–$4/sq ft; exterior painting can reach $6+ depending on siding type and the prep work required. Use this calculator to get a realistic range before you call a contractor.",
    contentHeading: "What does painting cost per square foot?",
    contentBody:
      "Interior painting averages $2–$4 per sq ft for walls and ceilings. Exterior painting runs $2–$6 per sq ft depending on siding type and the prep work required. High ceilings, detailed trim, and multiple coats all increase the price. Always budget for primer and two finish coats on any quality job. New construction painting is generally cheaper per sq ft than repaints, as surfaces need less preparation. If your walls need patching or new drywall before painting, check our drywall cost per sq ft calculator for a combined estimate.",
    defaultCostLow: 2,
    defaultCostHigh: 6,
    unitLabel: "sq ft",
    category: "Painting",
    keywords: [
      "painting cost per sq ft",
      "paint cost calculator",
      "cost to paint per square foot",
      "house painting cost estimate",
      "interior painting cost per sq ft",
    ],
    relatedSlugs: ["flooring-cost-per-sq-ft", "drywall-cost-per-sq-ft"],
    exampleArea: 1200,
    exampleAreaLabel: "1,200 sq ft of paintable wall area",
    internalLinks: [
      { label: "Flooring Cost Per Sq Ft", href: "/cost-calculators/flooring-cost-per-sq-ft" },
      { label: "Drywall Cost Per Sq Ft", href: "/cost-calculators/drywall-cost-per-sq-ft" },
      { label: "Cost Calculators Hub", href: "/tools/cost-calculators" },
    ],
    costTable: [
      { area: "500 sq ft (small room / studio)", low: "$1,000", high: "$3,000" },
      { area: "800 sq ft", low: "$1,600", high: "$4,800" },
      { area: "1,200 sq ft (average apartment)", low: "$2,400", high: "$7,200" },
      { area: "1,500 sq ft", low: "$3,000", high: "$9,000" },
      { area: "2,000 sq ft (full house interior)", low: "$4,000", high: "$12,000" },
    ],
    factors: [
      { icon: "🏠", title: "Interior vs exterior", desc: "Interior painting averages $2–$4/sq ft for walls and ceilings. Exterior painting runs $2–$6/sq ft and is heavily affected by siding type, the amount of prep work required, and height." },
      { icon: "🖌️", title: "Number of coats", desc: "A standard 2-coat job (primer + finish) is included in most quotes. Dark colours or drastic colour changes require 3+ coats — adding $0.50–$1/sq ft to the cost." },
      { icon: "🔧", title: "Surface preparation", desc: "Walls with cracks, holes, or peeling paint need patching and sanding before painting. Heavy prep can add $0.50–$2/sq ft and is often underquoted by contractors." },
      { icon: "🎨", title: "Paint quality", desc: "Premium paints (Benjamin Moore, Sherwin-Williams) cost $50–$80/gallon vs $25–$40 for budget options. Higher quality means better coverage, fewer coats, and longer-lasting results." },
      { icon: "📐", title: "Ceiling height & access", desc: "Standard 8 ft ceilings are straightforward. Rooms with 10–12 ft ceilings or vaulted spaces require ladders and scaffolding — adding 20–30% to the labour cost." },
      { icon: "🪟", title: "Trim, doors & windows", desc: "Baseboards, door frames, crown moulding, and window casings are typically priced separately at $1–$3 per linear foot. More trim means more masking time and detail work." },
    ],
    faqs: [
      { q: "How much does it cost to paint a house per square foot?", a: "Interior painting costs $2–$4 per square foot of paintable wall area. Exterior painting runs $2–$6 per square foot depending on siding type and prep. For a 1,500 sq ft home, expect $3,000–$9,000 for a full interior repaint." },
      { q: "How do painters calculate square footage?", a: "Painters measure the total wall area (length × height for each wall) and subtract large windows and doors. They also add ceilings if included. A 12×12 ft room with 8 ft ceilings has roughly 384 sq ft of paintable wall area." },
      { q: "Is it cheaper to paint yourself or hire a painter?", a: "DIY saves on labour — which is 50–70% of the total cost — but takes significant time and requires equipment like rollers, brushes, drop cloths, and ladders. For a large home, the time investment often makes professional painting worthwhile, especially for exterior work." },
      { q: "How many square feet does a gallon of paint cover?", a: "A gallon of paint covers approximately 350–400 sq ft per coat. For a 1,500 sq ft paintable area with two coats, you need roughly 8 gallons. Always add 10% for touch-ups and waste." },
      { q: "How long does a paint job last?", a: "Interior paint lasts 5–10 years depending on traffic and usage. Bathrooms and kitchens may need repainting every 3–5 years due to moisture. Exterior paint lasts 5–10 years on wood siding and 10–15 years on stucco or brick." },
    ],
  },

  "flooring-cost-per-sq-ft": {
    title: "Flooring Cost Per Sq Ft Calculator",
    metaTitle: "Flooring Cost Per Sq Ft Calculator – Estimate Floor Installation Cost Instantly",
    metaDescription:
      "Use our free flooring cost per sq ft calculator to instantly estimate installation costs for hardwood, LVP, laminate, tile, and carpet. Enter your room size and see your total.",
    heroSubtitle:
      "Enter your room's square footage and instantly compare floor installation costs across material types.",
    introText:
      "LVP, hardwood, laminate, tile, carpet — they look similar in a showroom but differ by 3–5x in installed cost per sq ft. The right material for your budget depends on traffic, moisture exposure, and subfloor condition. Start here to understand what each option will realistically cost before you visit a supplier or hire a contractor.",
    contentHeading: "How much does flooring cost per square foot?",
    contentBody:
      "Vinyl plank (LVP) flooring costs $3–$8 per sq ft installed — one of the most popular choices for its durability and water resistance. Laminate flooring runs $3–$7 per sq ft. Engineered hardwood averages $6–$12 per sq ft installed. Ceramic tile installation costs $5–$10 per sq ft. Solid hardwood is the most premium option at $8–$15 per sq ft. Always order 10% extra material to account for cuts, breakage, and future repairs. If you're also tiling bathrooms or kitchen floors, use our tile installation cost per sq ft calculator alongside this one.",
    defaultCostLow: 3,
    defaultCostHigh: 12,
    unitLabel: "sq ft",
    category: "Flooring",
    keywords: [
      "flooring cost per sq ft",
      "floor installation cost calculator",
      "cost per square foot flooring",
      "hardwood flooring cost",
      "vinyl plank flooring cost per sq ft",
    ],
    relatedSlugs: ["tile-installation-cost-per-sq-ft", "carpet-installation-cost-per-sq-ft"],
    exampleArea: 800,
    exampleAreaLabel: "800 sq ft floor",
    internalLinks: [
      { label: "Carpet Installation Cost Per Sq Ft", href: "/cost-calculators/carpet-installation-cost-per-sq-ft" },
      { label: "Tile Installation Cost Per Sq Ft", href: "/cost-calculators/tile-installation-cost-per-sq-ft" },
      { label: "Concrete Slab Calculator", href: "/construction-calculators/concrete/concrete-slab-calculator" },
    ],
    costTable: [
      { area: "300 sq ft (bedroom)", low: "$900", high: "$4,500" },
      { area: "500 sq ft", low: "$1,500", high: "$7,500" },
      { area: "800 sq ft (open-plan living area)", low: "$2,400", high: "$12,000" },
      { area: "1,200 sq ft", low: "$3,600", high: "$18,000" },
      { area: "1,500 sq ft (whole floor)", low: "$4,500", high: "$22,500" },
    ],
    factors: [
      { icon: "🪵", title: "Material type", desc: "LVP and laminate are the most budget-friendly at $3–$8/sq ft installed. Engineered hardwood runs $6–$12/sq ft. Solid hardwood and natural stone are premium at $8–$20+/sq ft installed." },
      { icon: "🔨", title: "Subfloor condition", desc: "If the existing subfloor is uneven, damaged, or requires levelling compound, add $1–$3/sq ft before any new flooring goes down. This is one of the most common unexpected costs." },
      { icon: "🔄", title: "Old floor removal", desc: "Removing and disposing of existing carpet adds $1–$2/sq ft. Hardwood or tile removal costs $2–$4/sq ft. Always factor this in if you're replacing existing flooring." },
      { icon: "📐", title: "Room layout complexity", desc: "Straight runs in rectangular rooms are easiest. Diagonal patterns, herringbone, or rooms with lots of angles increase cuts and waste — expect 10–20% more material and additional labour time." },
      { icon: "🌊", title: "Moisture & underlayment", desc: "Basements and below-grade areas need moisture barriers. Some flooring types require specific underlayment — adding $0.50–$1.50/sq ft to the total installed cost." },
      { icon: "📍", title: "Local labour rates", desc: "Flooring installation rates vary widely by region. Major metro areas run 25–50% above national averages. Always get 2–3 local quotes before committing." },
    ],
    faqs: [
      { q: "What is the cheapest flooring per square foot installed?", a: "Laminate and basic LVP (luxury vinyl plank) are the cheapest options at $3–$5/sq ft installed. Carpet is similarly priced at $2–$5/sq ft all-in. Both look good and hold up well in moderate-traffic areas." },
      { q: "How much does LVP flooring cost per square foot?", a: "LVP (luxury vinyl plank) flooring costs $3–$8 per square foot installed, including underlayment and labour. Higher-end LVP with a 20+ mil wear layer can reach $7–$10/sq ft. It's one of the most popular flooring choices due to its water resistance and durability." },
      { q: "Is hardwood flooring worth the extra cost?", a: "Solid hardwood costs $8–$15/sq ft installed vs $3–$8 for LVP, but it can be sanded and refinished multiple times — extending its lifespan to 50+ years. In bedrooms and living areas away from moisture, hardwood adds clear resale value. Engineered hardwood is a middle ground at $6–$12/sq ft." },
      { q: "How much extra flooring should I order?", a: "Order 10% extra for standard rectangular rooms. For diagonal or herringbone patterns, order 15% extra. This accounts for cuts, breakage, and future repairs. Always buy from the same dye lot in case you need to match later." },
      { q: "Can I install flooring over existing flooring?", a: "LVP and laminate can often be installed over existing hard flooring if it's flat, firm, and in good condition — saving $1–$2/sq ft in removal costs. Carpet must always be removed first. Check manufacturer guidelines for height restrictions and warranty implications." },
    ],
  },

  "concrete-cost-per-sq-ft": {
    title: "Concrete Cost Per Sq Ft Calculator",
    metaTitle: "Concrete Cost Per Sq Ft Calculator – Estimate Slab & Driveway Cost Instantly",
    metaDescription:
      "Use our free concrete cost per sq ft calculator to instantly estimate slab, driveway, and patio costs. Enter your project area and get a low-to-high installed cost estimate.",
    heroSubtitle:
      "Enter your slab area and instantly estimate concrete cost — materials, labor, and finishing included.",
    introText:
      "Most people don't realise a 6-inch concrete slab costs roughly 50% more per sq ft than a 4-inch one — same footprint, very different price. Finishing type, reinforcement, and whether you need removal of an existing slab all move the number significantly. Use this calculator to get a solid baseline before requesting quotes.",
    contentHeading: "What does concrete cost per square foot?",
    contentBody:
      "A basic concrete slab costs $4–$8 per sq ft installed for a standard 4-inch pour. Driveways at 6 inches typically run $6–$10 per sq ft. Decorative and stamped concrete adds $3–$12 per sq ft to the base price. Ready-mix delivery fees apply for smaller pours, and removal of an existing slab adds $1–$3 per sq ft. Always get at least two quotes from local contractors before committing. For volume-based estimates, our concrete slab calculator works out cubic yards and bag counts alongside the installed cost.",
    defaultCostLow: 4,
    defaultCostHigh: 10,
    unitLabel: "sq ft",
    category: "Concrete",
    keywords: [
      "concrete cost per sq ft",
      "concrete slab cost calculator",
      "cost per square foot concrete",
      "concrete driveway cost per sq ft",
      "how much does concrete cost per square foot",
    ],
    relatedSlugs: ["tile-installation-cost-per-sq-ft", "roof-cost-per-sq-ft"],
    exampleArea: 600,
    exampleAreaLabel: "600 sq ft concrete slab",
    internalLinks: [
      { label: "Concrete Slab Calculator", href: "/construction-calculators/concrete/concrete-slab-calculator" },
      { label: "Concrete Driveway Cost", href: "/construction-calculators/concrete/concrete-driveway-cost" },
      { label: "Concrete Patio Cost", href: "/construction-calculators/concrete/concrete-patio-cost" },
    ],
    costTable: [
      { area: "200 sq ft (small patio or step)", low: "$800", high: "$2,000" },
      { area: "400 sq ft (standard driveway section)", low: "$1,600", high: "$4,000" },
      { area: "600 sq ft", low: "$2,400", high: "$6,000" },
      { area: "800 sq ft (large driveway)", low: "$3,200", high: "$8,000" },
      { area: "1,200 sq ft (shop floor / large slab)", low: "$4,800", high: "$12,000" },
    ],
    factors: [
      { icon: "📏", title: "Slab thickness", desc: "A standard 4-inch slab costs roughly 40% more concrete than a 3.5-inch pour. Driveways need 5–6 inches. Thicker slabs increase both material and forming costs significantly." },
      { icon: "🎨", title: "Finish type", desc: "Broom finish is cheapest ($4–$8/sq ft). Exposed aggregate adds $2–$4/sq ft. Stamped and coloured concrete adds $8–$15/sq ft — the biggest single cost variable after slab size." },
      { icon: "🔩", title: "Reinforcement", desc: "Wire mesh adds ~$0.25/sq ft and is standard. Rebar adds ~$1/sq ft and is recommended for driveways, heavy loads, and expansive clay soils. Fibre reinforcement is a mid-range alternative." },
      { icon: "🌱", title: "Site preparation", desc: "Grading, compaction, and sub-base work adds $1–$3/sq ft before any concrete is poured. Rocky or poorly draining sites cost significantly more to prepare." },
      { icon: "🚧", title: "Existing surface removal", desc: "Removing an old concrete slab adds $2–$5/sq ft including breaking and disposal. Paver or gravel removal is cheaper at $1–$2/sq ft. Always get a quote that separates demo from pour costs." },
      { icon: "📍", title: "Location & delivery", desc: "Ready-mix concrete delivery costs more in rural areas. Small pours under 3–4 cubic yards often trigger a short-load surcharge of $100–$200 per delivery." },
    ],
    faqs: [
      { q: "How much does a concrete slab cost per square foot?", a: "A basic concrete slab costs $4–$8 per square foot installed for a standard 4-inch broom-finish pour. Driveways at 5–6 inches run $6–$10/sq ft. Decorative stamped concrete costs $12–$20+/sq ft installed." },
      { q: "How thick should a concrete slab be?", a: "Patios and walkways: 3.5–4 inches. Driveways: 5–6 inches. Garage floors: 4–6 inches. Workshop or heavy vehicle areas: 6+ inches. Thicker slabs cost significantly more but last longer and resist cracking better under load." },
      { q: "How much concrete do I need for a 10×10 slab?", a: "A 10×10 ft (100 sq ft) slab at 4 inches thick needs approximately 1.23 cubic yards of concrete. At 6 inches, that rises to 1.85 cubic yards. Always add 10% for overpour and waste — so order 1.4 and 2.05 cubic yards respectively." },
      { q: "How long does concrete take to cure?", a: "Concrete reaches 70% strength at 7 days and full design strength (3,000–4,000 PSI) at 28 days. You can walk on it after 24–48 hours and drive on it after 7 days. Full curing for heavy vehicle loads takes the full 28 days." },
      { q: "What is the difference between concrete and cement?", a: "Cement is the powder binder — just one ingredient in concrete. Concrete is the finished mixture of cement, sand, gravel, and water. When people say 'cement cost', they usually mean concrete. Ready-mix concrete costs $120–$160 per cubic yard delivered, depending on location." },
    ],
  },

  "tile-installation-cost-per-sq-ft": {
    title: "Tile Installation Cost Per Sq Ft Calculator",
    metaTitle: "Tile Installation Cost Per Sq Ft Calculator – Estimate Tiling Cost Instantly",
    metaDescription:
      "Use our free tile installation cost per sq ft calculator to instantly estimate tiling costs for floors, walls, and bathrooms. Get a fast estimate for ceramic, porcelain, and stone tile.",
    heroSubtitle:
      "Enter your tile area and instantly estimate installation cost for any tile type or room.",
    introText:
      "Tile quotes from contractors can vary by $5–$10 per sq ft for the same job — the difference usually comes down to substrate prep, tile format, and layout pattern. Before you request quotes, use this calculator to understand what a fair number looks like for your specific project.",
    contentHeading: "How much does tile installation cost per square foot?",
    contentBody:
      "Basic ceramic tile installation averages $5–$10 per sq ft all-in. Porcelain tile costs $7–$14 per sq ft installed. Natural stone — marble, travertine, or slate — runs $10–$25 per sq ft. Large-format tiles and decorative layouts like herringbone or diagonal patterns cost more to install due to the extra cuts required. Budget 15% extra tiles for cuts and breakage. Heated floor systems add $8–$12 per sq ft on top of the tile cost. For full-room cost planning that includes hard flooring across multiple spaces, see our flooring cost per sq ft calculator.",
    defaultCostLow: 5,
    defaultCostHigh: 14,
    unitLabel: "sq ft",
    category: "Tiling",
    keywords: [
      "tile installation cost per sq ft",
      "tiling cost calculator",
      "cost to tile per square foot",
      "floor tile installation cost",
      "porcelain tile installation cost",
    ],
    relatedSlugs: ["flooring-cost-per-sq-ft", "concrete-cost-per-sq-ft"],
    exampleArea: 400,
    exampleAreaLabel: "400 sq ft bathroom and kitchen tile",
    internalLinks: [
      { label: "Flooring Cost Per Sq Ft", href: "/cost-calculators/flooring-cost-per-sq-ft" },
      { label: "Concrete Cost Per Sq Ft", href: "/cost-calculators/concrete-cost-per-sq-ft" },
      { label: "All Cost Calculators", href: "/tools/cost-calculators" },
    ],
    costTable: [
      { area: "50 sq ft (small bathroom floor)", low: "$250", high: "$700" },
      { area: "100 sq ft (bathroom floor)", low: "$500", high: "$1,400" },
      { area: "200 sq ft", low: "$1,000", high: "$2,800" },
      { area: "400 sq ft (kitchen + bathroom)", low: "$2,000", high: "$5,600" },
      { area: "600 sq ft", low: "$3,000", high: "$8,400" },
    ],
    factors: [
      { icon: "🪨", title: "Tile material", desc: "Ceramic tile is cheapest at $5–$10/sq ft installed. Porcelain runs $7–$14/sq ft and is more durable and water-resistant. Natural stone (marble, travertine, slate) costs $10–$25+/sq ft and requires periodic sealing." },
      { icon: "📐", title: "Tile size & layout pattern", desc: "Large-format tiles (24×24 in+) require more precise substrate prep and skilled installation. Herringbone, diagonal, or decorative patterns increase cuts and labour time — adding $2–$5/sq ft." },
      { icon: "🔧", title: "Substrate preparation", desc: "The substrate must be flat, stable, and properly prepared. Installing cement board in wet zones adds $1–$2/sq ft. Unlevel floors need self-levelling compound first, which adds cost and drying time." },
      { icon: "🌊", title: "Waterproofing (wet areas)", desc: "Shower walls and bathroom floors need waterproof membranes behind the tile. This adds $1–$3/sq ft but is non-negotiable — skipping it leads to water damage and mould behind walls within a few years." },
      { icon: "🧱", title: "Grout type & joint size", desc: "Standard sanded grout is cheapest. Epoxy grout (stain-resistant) adds $1–$2/sq ft. Narrow joints under 1/8 in require unsanded grout. Joint size also affects how much grout is needed." },
      { icon: "♨️", title: "Heated floor systems", desc: "Electric underfloor heating mats add $8–$12/sq ft to the tile installation cost, but use only about 12W/sq ft and add significant comfort in bathrooms and cold-floor areas." },
    ],
    faqs: [
      { q: "How much does it cost to tile a bathroom floor?", a: "Tiling a standard bathroom floor (40–80 sq ft) costs $300–$1,100 using ceramic tile. Porcelain or stone tile for the same area runs $500–$2,000 installed. A full bathroom tile job including floor and shower walls typically costs $1,500–$5,000." },
      { q: "Is ceramic or porcelain tile cheaper to install?", a: "Ceramic tile is generally cheaper — both in material ($1–$4/sq ft vs $3–$8/sq ft for porcelain) and installation, since ceramic is softer and easier to cut. Porcelain is more durable and water-resistant, making it better for high-traffic floors and wet areas." },
      { q: "How much extra tile should I order?", a: "Order 10% extra for simple rectangular rooms with straight layouts. For diagonal, herringbone, or complex patterns, order 15–20% extra. Tile is sold by the box and dye lots vary — always order all your tile at once from the same batch." },
      { q: "How long does tile installation take?", a: "A 100 sq ft bathroom floor takes 1–2 days including setting time. The grout must cure 24–72 hours before the floor is used. Large tile jobs or complex patterns take longer. A full shower tile job (walls + floor) takes 3–5 days." },
      { q: "Can I tile over existing tile?", a: "In some cases yes — if the existing tile is firmly bonded, flat, and the added height is acceptable. However most installers recommend removing old tile for wet areas to ensure a solid, flat, waterproofed substrate. Tiling over tile also adds height that can cause issues with door clearance and transitions." },
    ],
  },

  "drywall-cost-per-sq-ft": {
    title: "Drywall Cost Per Sq Ft Calculator",
    metaTitle: "Drywall Cost Per Sq Ft Calculator – Estimate Drywall Installation Cost Instantly",
    metaDescription:
      "Use our free drywall cost per sq ft calculator to instantly estimate hanging, taping, and finishing costs for walls and ceilings. Enter your room size and get your estimate.",
    heroSubtitle:
      "Enter your wall and ceiling area and instantly estimate the cost to hang, tape, mud, and finish.",
    introText:
      "Whether you're finishing a basement, drywalling a new addition, or repairing storm damage, the cost per sq ft depends heavily on the finish level required. A Level 3 finish (standard) costs roughly half of a Level 5 skim-coat finish. Use this calculator to get a realistic starting estimate before speaking to a drywall contractor.",
    contentHeading: "What does drywall installation cost per square foot?",
    contentBody:
      "Basic drywall installation — hang, tape, mud, and finish — costs $1.50–$3.50 per sq ft. With primer and paint included, expect $2.50–$5 per sq ft total. Ceiling drywall costs more to install than walls due to the overhead work involved. Fire-rated (Type X) and moisture-resistant (green board) panels cost slightly more per sheet. Always factor in 10% waste for standard rooms with windows and doors. After drywalling, painting is the next major cost — use our painting cost per sq ft calculator to estimate that step too.",
    defaultCostLow: 1.5,
    defaultCostHigh: 3.5,
    unitLabel: "sq ft",
    category: "Drywall",
    keywords: [
      "drywall cost per sq ft",
      "drywall installation cost calculator",
      "cost to drywall per square foot",
      "sheetrock installation cost",
      "how much does drywall cost per square foot",
    ],
    relatedSlugs: ["painting-cost-per-sq-ft", "flooring-cost-per-sq-ft"],
    exampleArea: 1000,
    exampleAreaLabel: "1,000 sq ft of walls and ceilings",
    internalLinks: [
      { label: "Painting Cost Per Sq Ft", href: "/cost-calculators/painting-cost-per-sq-ft" },
      { label: "Flooring Cost Per Sq Ft", href: "/cost-calculators/flooring-cost-per-sq-ft" },
      { label: "Roof Replacement Cost Calculator", href: "/tools/cost-calculators/home-improvement/roof-replacement-cost" },
    ],
    costTable: [
      { area: "500 sq ft (bedroom + hallway)", low: "$750", high: "$1,750" },
      { area: "800 sq ft", low: "$1,200", high: "$2,800" },
      { area: "1,000 sq ft", low: "$1,500", high: "$3,500" },
      { area: "1,500 sq ft (basement finish)", low: "$2,250", high: "$5,250" },
      { area: "2,000 sq ft (new construction floor)", low: "$3,000", high: "$7,000" },
    ],
    factors: [
      { icon: "🏆", title: "Finish level", desc: "Level 3 (standard smooth) is most common for walls. Level 5 (full skim coat) is a premium finish for walls with raking light — it costs $0.50–$1/sq ft more but looks significantly better under flat paint." },
      { icon: "🔼", title: "Ceiling vs wall installation", desc: "Ceiling drywall costs more to hang due to overhead work — typically $0.50–$1/sq ft more than walls. High ceilings requiring scaffolding add further costs on top." },
      { icon: "🛡️", title: "Drywall type", desc: "Standard 1/2 in drywall is cheapest. Fire-rated Type X (5/8 in) is required in garages and certain walls — slightly more per sheet. Moisture-resistant greenboard is needed in bathrooms at a small premium." },
      { icon: "🚪", title: "Number of openings", desc: "Rooms with many windows, doors, and outlets require more cuts and extra finishing work around each opening. Fewer openings means faster and cheaper installation per square foot." },
      { icon: "📦", title: "New work vs repairs", desc: "New construction drywall is faster and cheaper per sq ft than patching and repairing damaged existing drywall — where matching texture and blending seams adds significant labour time." },
      { icon: "🖌️", title: "Primer and paint inclusion", desc: "Drywall must be primed before painting. If primer and two paint coats are included, budget an additional $1–$2/sq ft. Many contractors quote hang-tape-mud-finish only and exclude paint entirely." },
    ],
    faqs: [
      { q: "How much does it cost to drywall a room?", a: "A standard 12×12 ft bedroom (about 450 sq ft of walls and ceiling) costs $675–$1,575 to drywall at $1.50–$3.50/sq ft. A full basement finish (1,000–1,500 sq ft) typically runs $1,500–$5,250. These prices are for hang, tape, mud, and finish only — not paint." },
      { q: "What is the difference between drywall and Sheetrock?", a: "Sheetrock is a brand name — drywall is the generic term. They are the same product. Sheetrock (by USG) is one of the most widely used brands in the US, which is why the terms are often used interchangeably by contractors and homeowners." },
      { q: "How many sheets of drywall do I need?", a: "Standard drywall sheets are 4×8 ft (32 sq ft). Divide your total wall and ceiling area by 32, then add 10% for waste. For a 1,000 sq ft area you need roughly 35 sheets. Larger 4×12 ft sheets are used for high walls to reduce the number of seams." },
      { q: "What are the drywall finish levels?", a: "Level 1: tape only (attics, service areas). Level 2: tape + one coat (areas to be tiled). Level 3: tape + two coats (standard textured walls). Level 4: tape + three coats (flat paint or light wallpaper). Level 5: full skim coat (premium smooth finish under raking light). Most residential walls are Level 3 or 4." },
      { q: "How long does it take to drywall a room?", a: "Hanging drywall in a 12×12 ft bedroom takes half a day. Taping and mudding requires 2–3 separate coats with drying time between each — typically 3–5 days total before it is ready to sand and prime. Rushing the drying time causes cracking and bubbling." },
    ],
  },

  "carpet-installation-cost-per-sq-ft": {
    title: "Carpet Installation Cost Per Sq Ft Calculator",
    metaTitle: "Carpet Installation Cost Per Sq Ft Calculator – Estimate Carpet Cost Instantly",
    metaDescription:
      "Use our free carpet installation cost per sq ft calculator to instantly estimate carpet, pad, and labor costs. Enter your room size and get an instant low-to-high cost range.",
    heroSubtitle:
      "Enter your room area and instantly see the total cost of carpet, padding, and installation.",
    introText:
      "Carpet showrooms quote an installed price — bundling carpet, pad, and labor into one figure — which makes it hard to know if you're getting a fair deal. This calculator breaks it down by square foot so you can see exactly what $3 vs $7 per sq ft gets you in quality and durability.",
    contentHeading: "How much does carpet installation cost per square foot?",
    contentBody:
      "Basic polyester or nylon carpet installation costs $2–$5 per sq ft all-in (carpet + pad + labor). Mid-range carpet runs $4–$7 per sq ft installed. Premium wool or cut-pile options can reach $8–$15 per sq ft. Removing old carpet typically adds $0.50–$1 per sq ft. Stairs are quoted separately — usually $3–$10 per step. Always measure and order 10% extra to cover cuts and doorway thresholds. Comparing carpet to hard flooring? Our flooring cost per sq ft calculator covers LVP, laminate, hardwood, and tile so you can see the full picture.",
    defaultCostLow: 2,
    defaultCostHigh: 7,
    unitLabel: "sq ft",
    category: "Flooring",
    keywords: [
      "carpet installation cost per sq ft",
      "carpet cost calculator",
      "cost to carpet per square foot",
      "how much does carpet cost installed",
      "carpet and installation cost per sq ft",
    ],
    relatedSlugs: ["flooring-cost-per-sq-ft", "tile-installation-cost-per-sq-ft"],
    exampleArea: 500,
    exampleAreaLabel: "500 sq ft bedroom and hallway carpet",
    internalLinks: [
      { label: "Flooring Cost Per Sq Ft", href: "/cost-calculators/flooring-cost-per-sq-ft" },
      { label: "Tile Installation Cost Per Sq Ft", href: "/cost-calculators/tile-installation-cost-per-sq-ft" },
      { label: "All Cost Calculators", href: "/tools/cost-calculators" },
    ],
    costTable: [
      { area: "150 sq ft (small bedroom)", low: "$300", high: "$1,050" },
      { area: "300 sq ft (master bedroom)", low: "$600", high: "$2,100" },
      { area: "500 sq ft", low: "$1,000", high: "$3,500" },
      { area: "800 sq ft (multiple rooms)", low: "$1,600", high: "$5,600" },
      { area: "1,200 sq ft (whole level)", low: "$2,400", high: "$8,400" },
    ],
    factors: [
      { icon: "🧶", title: "Carpet fibre type", desc: "Polyester is the most affordable at $1–$3/sq ft for material. Nylon is more durable at $2–$5/sq ft. Wool is the premium option at $5–$15/sq ft. Triexta (SmartStrand) is a popular mid-range choice with excellent stain resistance." },
      { icon: "🛏️", title: "Carpet pile type", desc: "Cut pile (plush, saxony) is soft and popular for bedrooms. Loop pile (Berber) is more durable for high-traffic areas. Cut-loop (pattern) carpets cost more to install due to directional matching requirements." },
      { icon: "📦", title: "Padding quality", desc: "Standard 6 lb density rebond pad is cheapest at $0.25–$0.50/sq ft. Higher density pads ($0.50–$1.50/sq ft) extend carpet life significantly and add noticeable comfort underfoot — worth the upgrade." },
      { icon: "🔄", title: "Old carpet removal", desc: "Removing and disposing of existing carpet and padding adds $0.50–$1/sq ft. Most professional installers offer this as an add-on. DIY removal can save money and is relatively easy for most homeowners." },
      { icon: "🪜", title: "Stairs", desc: "Stairs are quoted per step, not per square foot — typically $3–$10 per step. Waterfall installation (folded over the edge) is cheaper than Hollywood style (wrapped around each individual step)." },
      { icon: "📐", title: "Room layout & seams", desc: "Standard carpet rolls are 12 ft wide. Rooms wider than 12 ft require seams. Good installers position seams in low-traffic areas where they'll be less visible. More seams means more labour and material waste." },
    ],
    faqs: [
      { q: "How much does it cost to carpet a 12×12 room?", a: "Carpeting a 12×12 ft room (144 sq ft) costs $290–$1,010 all-in including carpet, pad, and installation at $2–$7/sq ft. Mid-range carpet and quality pad brings the typical cost to $400–$700 for this size room." },
      { q: "What is the cheapest carpet you can buy per square foot?", a: "Basic polyester carpet can be found for $0.99–$2/sq ft for material only. With standard pad and installation, the all-in cost is $2–$4/sq ft. Builder-grade carpet used in rentals and new construction is in this range — functional but not particularly durable under heavy traffic." },
      { q: "How long does carpet installation take?", a: "A professional crew can install carpet in 1–3 rooms per day. A whole house (1,000–1,500 sq ft) typically takes 1–2 days. Furniture moving, old carpet removal, and stair installation all add time to the project." },
      { q: "How long does carpet last?", a: "Budget polyester carpet lasts 5–8 years in medium traffic. Mid-range nylon carpet lasts 10–15 years. Premium nylon or wool carpet can last 15–25 years with proper care. Regular vacuuming and professional cleaning every 1–2 years significantly extends lifespan." },
      { q: "Is it worth replacing carpet with hard flooring?", a: "Hard flooring (LVP, hardwood, tile) lasts longer, is easier to clean, and is better for allergy sufferers. Carpet is warmer, softer underfoot, and better suited for bedrooms and playrooms. LVP costs $3–$8/sq ft vs $2–$7/sq ft for carpet — similar upfront, but hard flooring lasts significantly longer and typically adds more resale value." },
    ],
  },
};

export const sqftSlugs = Object.keys(sqftConfigs);
