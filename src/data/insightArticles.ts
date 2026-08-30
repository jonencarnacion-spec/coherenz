// Content model + copy for the /insights/[slug] article template.
//
// Rebuilt per Jon's direct feedback on the first pass: the doc's full
// section-by-section template ("insights article page flow.docx")
// fragmented the actual written articles into short labeled blocks (a
// separate Hook, a separate Executive Takeaway with bullets, a separate
// Conventional Belief/Paradox restatement) before the real argument ever
// appeared -- three section-transitions that all said "busy isn't value"
// in different packaging. That reads as templated, not like a real
// article, and buries the actual prose (already researched, fact-checked,
// and written in full -- see src/data/insights-articles/*.md, the source
// of truth this file transcribes from verbatim).
//
// This version makes the real article body (`lede` + `body[]`) the main
// content of the page -- the same prose as the .md drafts, broken only
// into heading/paragraph blocks the way any long-form article is, plus
// exactly one signature-visual diagram and one pull quote per article for
// visual rhythm (the doc's "visual impact" idea, kept, but as punctuation
// inside the article rather than a replacement for it). The doc's
// after-the-argument guidance sections -- Ask Yourself, The Coherenz
// Perspective, What Changes, the CTA, Related Insights -- stay, per Jon's
// "keep the bottom sections to guide readers what to do."
//
// Layout: every section now uses the site's standard container
// (max-w-[1536px] + the same px-6/sm:px-8/lg:px-10/xl:px-14 gutter escalation
// every other page uses -- Nav, Footer, programs/[slug].astro, etc.)
// instead of a page-wide narrow column. The narrower reading measure
// (~720px) is scoped to the actual prose/heading text inside that standard
// container -- matching how long-form editorial sites (McKinsey, HBR)
// keep a comfortable line length for body copy while the page shell,
// hero, and exhibits use the full page width.

export interface InsightMechanismStep {
  number: string;
  title: string;
  body: string;
}

export type InsightBodyBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'pullquote'; text: string }
  | { type: 'visual'; steps: string[]; caption: string }
  | { type: 'chart'; title: string; unit: string; bars: { label: string; value: number; highlight?: boolean }[]; caption: string; source: string }
  | { type: 'stat'; value: string; label: string; source: string };

export interface InsightArticle {
  slug: string;
  eyebrow: string;
  title: string;
  subhead: string;
  readTime: string;
  publishedDate: string;
  tag: string;
  heroImage?: string;
  heroImageAlt?: string;

  lede: string;
  summary: string[];
  body: InsightBodyBlock[];

  diagnostic: {
    label: string;
    prompt: string;
    questions: string[];
  };

  perspective: {
    label: string;
    statement: string;
    framework: string;
  };

  action: {
    heading: string;
    insteadOf: string;
    ask: string;
    steps: InsightMechanismStep[];
  };

  closing: string;

  cta: {
    headline: string;
    description: string;
    programSlug: string;
    programName: string;
    ctaLabel: string;
  };

  relatedSlugs: string[];

  sources: string[];
}

export const insightArticles: InsightArticle[] = [
  {
    slug: 'busy-doesnt-mean-valuable',
    eyebrow: 'INSIGHT · PRODUCT DELIVERY ECONOMICS™',
    title: "Busy Doesn't Mean Valuable.",
    subhead:
      'The delivery capacity paradox: why maximizing utilization can actually reduce the value your organization creates.',
    readTime: '5–8 min read · August 2026',
    publishedDate: 'August 2026',
    tag: 'Coherenz Perspective',
    heroImage: 'insight-top.jpg',
    heroImageAlt: 'Motion-blurred figure moving quickly across a crosswalk, evoking constant busyness',

    lede: 'A team can be fully occupied and still be investing its most expensive resource—delivery capacity—in the wrong places.',

    summary: [
      '**Full utilization and full value creation are not the same thing**—queueing theory shows wait times climb non-linearly as utilization approaches 100%.',
      'Pushing every team to maximum busyness doesn\'t speed up the system; **it can slow it down**, since throughput is governed by the constraint, not by local effort (Goldratt).',
      '**Most work spends the majority of its life waiting**, not being worked on—flow efficiency runs roughly 15–70% even for strong teams.',
      'Siemens Health Services **cut cycle time by ~42%**, with quality and throughput improving at the same time, by managing flow instead of utilization.',
    ],

    body: [
      {
        type: 'paragraph',
        text: 'Most leadership teams treat "everyone is busy" as evidence the organization is running well. It usually means the opposite. **Full utilization and full value creation are not the same thing**, and confusing them is one of the most expensive mistakes a delivery organization can make.',
      },
      { type: 'heading', text: 'The Math Behind the Paradox' },
      {
        type: 'paragraph',
        text: "The relationship between how busy a system is and how fast work moves through it is not a straight line—it is a curve, and it bends sharply. This isn't opinion; it's **queueing theory**, and it governs any system where work arrives, waits, and gets processed—a call center, a hospital, a product delivery pipeline.",
      },
      {
        type: 'paragraph',
        text: 'The foundational result is **Little\'s Law**: the average number of items in a system equals the rate at which work arrives, multiplied by the average time each item spends in that system. It is a simple relationship, but it has a sharp implication. As a system\'s utilization climbs toward 100%, wait time does not increase proportionally—it increases non-linearly, accelerating fastest right when the system looks most "efficient" on paper. Practitioners commonly point to a rough danger zone starting around **70–80% utilization**, where the risk of runaway delay increases sharply. There is no exact universal number—it depends on how variable the work is—but the direction is consistent: the closer a system runs to full capacity, the more violently a small disruption inflates wait times.',
      },
      {
        type: 'paragraph',
        text: "Donald Reinertsen made this the central argument of The Principles of Product Development Flow: running a product development process near full utilization is not a sign of discipline—it is, in his words, **economically damaging**. High utilization inflates queues and the cost of delay attached to everything sitting in them. He goes further, arguing that organizations that chase utilization as a goal in itself create their own instability—a **self-inflicted wound**, not an external constraint. His illustration of why this matters is simple: the same fixed delay costs far more when it hits a long queue of waiting work than when it hits a short one. A team with a deep backlog isn't protected by that backlog—it's more exposed to every disruption that touches it.",
      },
      {
        type: 'visual',
        steps: ['More utilization', 'More concurrent work', 'More coordination & waiting', 'Longer cycle times', 'Slower value realization'],
        caption: 'Why pushing utilization higher tends to push value realization later, not sooner.',
      },
      { type: 'heading', text: 'Busy Is a Local Measure. Value Is a System Measure.' },
      {
        type: 'paragraph',
        text: "This is also the core insight of Eliyahu Goldratt's Theory of Constraints: a system's throughput is governed by its constraint, not by how hard any individual part of it is working. Goldratt's phrase for this is blunt—**local optimum is not global optimum**. Pushing every team, every station, every resource to maximum utilization doesn't make the system faster. It can make it slower, because effort gets absorbed everywhere except at the point that actually determines how fast value moves through the organization.",
      },
      {
        type: 'pullquote',
        text: 'Utilization tells you how occupied your capacity is. It tells you nothing about whether that capacity is pointed at the right work.',
      },
      {
        type: 'paragraph',
        text: 'DORA\'s research on software delivery performance backs this up from the flow side: **work-in-process limits**—paired with visible tracking and real feedback loops—are consistently associated with better delivery performance. Not because teams work harder, but because limiting how much is "in flight" at once forces the organization to finish things instead of starting them.',
      },
      {
        type: 'paragraph',
        text: 'And most organizations are further from finishing than they realize. In Kanban and flow-metrics literature, "flow efficiency"—the share of a work item\'s total elapsed time that is spent actually being worked on, versus waiting—is widely cited at roughly 15–40% for typical teams. High-performing teams reach 40–60%. Even exceptional teams rarely exceed 60–70%. In other words: for most delivery organizations, **the majority of the time a piece of work takes from start to finish, no one is touching it**. It is waiting—for a decision, a handoff, a reviewer, a dependency. That is not a people problem. It is a systems problem, and it exists whether or not everyone is fully booked.',
      },
      {
        type: 'chart',
        title: 'How much of a work item\'s elapsed time is actually spent being worked on',
        unit: '%',
        bars: [
          { label: 'Typical teams', value: 40 },
          { label: 'High-performing teams', value: 60 },
          { label: 'Exceptional teams', value: 70, highlight: true },
        ],
        caption: 'Upper bound of each commonly cited flow-efficiency range — even exceptional teams rarely exceed 60–70%.',
        source: 'Widely cited flow-efficiency benchmarks, Kanban/flow-metrics literature.',
      },
      { type: 'heading', text: 'The Same Trap, Wearing a Different Name' },
      {
        type: 'paragraph',
        text: 'Product leadership runs into the identical trap under different vocabulary. Marty Cagan draws a hard line between "feature teams," which are handed **output targets**—ship this, ship that—and empowered product teams, which are held to **outcome targets**: the business results those features are supposed to produce. Feature teams can be extraordinarily busy. Empowered teams are judged by whether the busyness converted into anything the business actually needed.',
      },
      {
        type: 'paragraph',
        text: 'John Cutler gave this failure mode a name that stuck: the **feature factory**—an organization that measures and rewards shipped output while staying disconnected from whether any of it moved a real business or user outcome. A feature factory is not lazy. It is often the opposite: relentlessly busy, consistently shipping, and quietly investing its scarcest resource in work that was never going to matter.',
      },
      { type: 'heading', text: 'Proof That Fixing It Works' },
      {
        type: 'paragraph',
        text: 'This isn\'t theoretical. Siemens Health Services documented what happened when they stopped managing to utilization and started managing to flow. After adopting flow metrics—work-in-process limits, cycle time, throughput—their 85th-percentile story cycle time dropped from 71 days before the change to 43 days in their first release under the new approach, then to 40 days in the release after that: **a roughly 42% reduction**. Quality moved in the same direction, not the opposite one—first-pass yield rose from 75% to 86% to 95% across those same releases. Throughput increased too: the second release completed 33% more stories than the one before it. The first release also finished on schedule and more than 10% under budget.',
      },
      {
        type: 'chart',
        title: '85th-percentile story cycle time, Siemens Health Services',
        unit: ' days',
        bars: [
          { label: 'Before managing to flow', value: 71 },
          { label: 'First release after', value: 43 },
          { label: 'Second release after', value: 40, highlight: true },
        ],
        caption: 'A ~42% reduction in cycle time — with quality and throughput moving up, not down, at the same time.',
        source: 'Arnold, J. / Agile Alliance, "Actionable Metrics — Siemens Health Services."',
      },
      {
        type: 'paragraph',
        text: 'None of that came from asking people to be busier. It came from **managing the system differently**—limiting work in progress, watching where it queued, and protecting the constraint instead of maximizing everywhere at once.',
      },
      { type: 'heading', text: 'The Real Question' },
      {
        type: 'paragraph',
        text: 'The question worth asking in a leadership review is not "how full is our capacity?" It is **"where is our capacity actually going, and is that where the value is?"** Those are different questions with different answers, and the gap between them is where most delivery economics get lost—not in a single bad decision, but in the ordinary, well-intentioned pursuit of keeping everyone busy.',
      },
    ],

    diagnostic: {
      label: 'ASK YOURSELF',
      prompt: 'Is your organization optimizing utilization—or value creation?',
      questions: [
        'Are teams measured primarily on how busy they are?',
        'How much work is currently in progress?',
        'How often do priorities change after work begins?',
        'How much capacity is consumed by dependencies and coordination?',
        'How long does it take valuable work to reach an outcome?',
      ],
    },

    perspective: {
      label: 'THE COHERENZ PERSPECTIVE',
      statement:
        'Capacity is not valuable because it is utilized. It is valuable because it is allocated to the right opportunities and converted into outcomes.',
      framework: 'VALUE → CAPACITY → FLOW → OUTCOME',
    },

    action: {
      heading: 'What changes?',
      insteadOf: 'How do we keep our teams busy?',
      ask: 'Where should our next unit of capacity create the most economic value?',
      steps: [
        { number: '01', title: 'Quantify the opportunity', body: 'Understand the economic value and cost of delay.' },
        { number: '02', title: 'Prioritize the portfolio', body: 'Concentrate constrained capacity on the highest-value opportunities.' },
        { number: '03', title: 'Improve flow', body: 'Reduce WIP, dependencies, waiting, and coordination drag.' },
      ],
    },

    closing:
      "The healthiest product organizations aren't the ones where everyone is busy. They're the ones where limited capacity is consistently flowing toward the work that matters most. Capacity is not free just because it's occupied.",

    cta: {
      headline: 'Is your delivery system optimized for busy, or for value?',
      description:
        'Coherenz helps product and technology leaders stabilize delivery systems where too much work in progress is slowing everything down.',
      programSlug: '6-week-delivery-stabilization',
      programName: '6-Week Delivery Stabilization Program',
      ctaLabel: 'Explore the 6-Week Program',
    },

    relatedSlugs: ['more-delivery-doesnt-mean-more-value', 'not-every-feature-deserves-to-be-built'],

    sources: [
      'Little, J.D.C. — foundational queueing-theory result on system throughput and wait time ("Little’s Law").',
      'Reinertsen, D.G. — The Principles of Product Development Flow: Second Generation Lean Product Development (Celeritas Publishing, 2009).',
      'DORA / Google Cloud — research on Work-in-Process limits and software delivery performance, dora.dev.',
      'Goldratt, E.M. — Theory of Constraints ("local optimum is not global optimum").',
      'Cagan, M. — Silicon Valley Product Group, svpg.com (feature teams vs. empowered product teams).',
      'Cutler, J. — originator of the "feature factory" concept.',
      'Flow-efficiency benchmarks widely cited in Kanban/flow-metrics literature (15–40% typical, 40–60% high-performing, 60–70%+ exceptional).',
      'Arnold, J. / Agile Alliance — "Actionable Metrics — Siemens Health Services," Agile Alliance Experience Report, agilealliance.org.',
    ],
  },

  {
    slug: 'more-delivery-doesnt-mean-more-value',
    eyebrow: 'INSIGHT · PRODUCT DELIVERY ECONOMICS™',
    title: "More Delivery Doesn't Mean More Value.",
    subhead: 'Why increasing output can make a product organization less effective—and what to optimize instead.',
    readTime: '5–7 min read · August 2026',
    publishedDate: 'August 2026',
    tag: 'Product Economics',
    heroImage: 'insight-2.jpg',
    heroImageAlt: 'Layered street posters and flyers papering a wall, evoking accumulated output',

    lede: 'Shipping more is not the same as creating more value.',

    summary: [
      '**80% of shipped features are rarely or never used**, but every one of them still had to be built, tested, documented, and maintained (Pendo).',
      'That upkeep has a name—technical debt—and it now **accounts for 21–40% of total IT spending** (Deloitte).',
      'Velocity and story-point throughput measure what shipped, not whether it mattered—the **"feature factory" trap**.',
      'The fix isn\'t shipping less across the board; it\'s **validating usage and pricing in maintenance cost** before capacity gets committed.',
    ],

    body: [
      {
        type: 'paragraph',
        text: 'Past a certain point, it can be the opposite—each additional feature adds **a small amount of potential upside and a compounding amount of guaranteed cost**, and most organizations never do the math to notice which side of that trade they are actually on.',
      },
      { type: 'heading', text: 'What Actually Happens to the Features You Ship' },
      {
        type: 'paragraph',
        text: "Start with what happens to a feature after it ships. Pendo's 2019 Feature Adoption Report—based on aggregated usage data from 615 customer subscriptions active for at least a year—found that **80% of features in the average software product are rarely or never used**. That is not a claim about any one bad product. It is a pattern across hundreds of real, shipped products with real usage data attached to them.",
      },
      {
        type: 'chart',
        title: 'How often shipped features actually get used, on average',
        unit: '%',
        bars: [
          { label: 'Rarely or never used', value: 80, highlight: true },
          { label: 'Actively used', value: 20 },
        ],
        caption: 'Aggregated usage data across 615 customer subscriptions active for at least a year.',
        source: 'Pendo, "The 2019 Feature Adoption Report."',
      },
      {
        type: 'pullquote',
        text: 'A feature nobody uses does not sit quietly. It keeps charging rent.',
      },
      {
        type: 'paragraph',
        text: "Every one of those unused features still had to be scoped, built, tested, documented, and shipped. And it doesn't stop there. Once it exists, **it still has to be maintained**—kept compatible with everything shipped after it, patched when it breaks, considered every time someone touches the surrounding code.",
      },
      {
        type: 'paragraph',
        text: 'That rent has a name: **technical debt**. Sonar\'s research, based on analysis of over 200 real-world projects totaling roughly 11 million lines of code, puts the ongoing cost at around $306,000 per year for every million lines of code—compounding to roughly $1.5 million, or 27,500 developer hours, over five years. Deloitte\'s 2026 Global Technology Leadership Study puts the aggregate effect at the organizational level: **technical debt now accounts for 21% to 40% of total IT spending**. Put those two together and the picture is blunt—a meaningful share of what looks like "building the product" is actually the product\'s own accumulated weight, paying for decisions—including features—that were made and shipped but never earned their keep.',
      },
      {
        type: 'stat',
        value: '21–40%',
        label: 'of total IT spending now goes to servicing technical debt — much of it from features that were built but never earned their keep.',
        source: 'Deloitte, 2026 Global Technology Leadership Study.',
      },
      {
        type: 'visual',
        steps: ['More features shipped', 'More surface area to maintain', 'Technical debt accumulates', 'Less capacity for new value', 'Slower overall value creation'],
        caption: 'Why an ever-longer feature list can leave less capacity for the work that actually moves the business.',
      },
      { type: 'heading', text: 'Why This Trap Is Easy to Fall Into' },
      {
        type: 'paragraph',
        text: 'None of this happens because teams are careless. It happens because **the metrics most delivery organizations track make it invisible**.',
      },
      {
        type: 'paragraph',
        text: 'Velocity and story-point throughput measure how much a team shipped. They say nothing about whether any of it mattered. A team can hit every sprint target, ship consistently, and still be pouring capacity into **work that adds cost without adding value**—because the measurement stops at "delivered," and delivered is not the same question as "worth delivering."',
      },
      {
        type: 'paragraph',
        text: 'This is the exact failure mode Marty Cagan draws a line around: feature teams are handed output targets—ship this, ship that—while empowered product teams are held to outcome targets, the actual business results those features are supposed to produce. John Cutler\'s term for the organization that optimizes for the first and never checks the second is the **feature factory**: consistently shipping, and consistently disconnected from whether any of it worked.',
      },
      { type: 'heading', text: 'What to Optimize Instead' },
      {
        type: 'paragraph',
        text: 'The fix is not "ship less" as a blanket policy—shipping less for its own sake is just as blind as shipping more for its own sake. The fix is asking a harder question before capacity is committed, not after: **what does this feature need to do, for whom, to be worth the cost of building and carrying it indefinitely?** That question has to be answered before the work starts, because Pendo\'s data suggests it is very often not being answered at all—four out of five shipped features, on average, never find out.',
      },
      {
        type: 'paragraph',
        text: 'In practice, that means treating "what we build" with the same rigor delivery teams already apply to "how we build it." A feature that will sit at low usage isn\'t neutral—it\'s **a liability with a delivery-capacity price tag attached**, competing every year for the same maintenance budget as the 20% of the product that customers actually rely on.',
      },
      { type: 'heading', text: 'The Real Measure' },
      {
        type: 'paragraph',
        text: "Output is easy to count and easy to celebrate: a burndown chart, a release note, a roadmap slide with more rows checked off than last quarter. **Value is harder to see and slower to show up**, which is exactly why it gets deprioritized in favor of the metric that's already on the dashboard.",
      },
      {
        type: 'paragraph',
        text: 'But the two are not proxies for each other. An organization can be shipping more than it ever has and still be creating less value than it did a year ago—not because anyone stopped working hard, but because **"more" and "worth it" were never the same question**, and only one of them was being measured.',
      },
    ],

    diagnostic: {
      label: 'ASK YOURSELF',
      prompt: 'Is your roadmap optimizing for shipped output—or realized value?',
      questions: [
        'How much of what we shipped last year is still actively used?',
        'Are teams measured on velocity, or on outcomes?',
        'How much of our current capacity goes to maintaining past decisions instead of creating new value?',
        'Do we validate usage before or after we commit to building?',
        "What would we stop maintaining if we were honest about what earns its keep?",
      ],
    },

    perspective: {
      label: 'THE COHERENZ PERSPECTIVE',
      statement:
        'Output is not valuable because it shipped. It is valuable because someone needed it enough to keep using it.',
      framework: 'VALUE → CAPACITY → FLOW → OUTCOME',
    },

    action: {
      heading: 'What changes?',
      insteadOf: 'How much can we ship this quarter?',
      ask: 'What should we stop building, and what should we validate before committing capacity?',
      steps: [
        { number: '01', title: 'Quantify usage, not just output', body: 'Track what customers actually use, not just what launched.' },
        { number: '02', title: 'Price in the maintenance cost', body: 'Every feature is a future line item, not a one-time cost.' },
        { number: '03', title: 'Validate before committing capacity', body: 'A small test costs far less than an unused feature carried for years.' },
      ],
    },

    closing:
      "The healthiest product organizations aren't the ones with the longest release notes. They're the ones where what got built keeps earning its place.",

    cta: {
      headline: "Want to know how much of your roadmap is creating value—and how much is just accumulating cost?",
      description:
        'Coherenz helps product and technology leaders find where value and capacity are leaking across the delivery system.',
      programSlug: 'product-delivery-economics-assessment',
      programName: 'Product Delivery Economics Assessment',
      ctaLabel: 'Explore the Assessment',
    },

    relatedSlugs: ['busy-doesnt-mean-valuable', 'the-cost-of-doing-nothing-is-often-hidden'],

    sources: [
      "Pendo — “The 2019 Feature Adoption Report,” pendo.io (aggregated usage data across 615 customer subscriptions).",
      'Sonar — "Estimating the Cost Attributable to Code-Level Technical Debt" research (200+ real-world projects, ~11M LOC analyzed), sonarsource.com.',
      'Deloitte — 2026 Global Technology Leadership Study, "Technical Debt’s Impact," deloitte.com.',
      'Cagan, M. — Silicon Valley Product Group, svpg.com (feature teams vs. empowered product teams).',
      'Cutler, J. — originator of the "feature factory" concept.',
    ],
  },

  {
    slug: 'the-cost-of-doing-nothing-is-often-hidden',
    eyebrow: 'INSIGHT · PRODUCT DELIVERY ECONOMICS™',
    title: 'The Cost of Doing Nothing Is Often Hidden.',
    subhead: 'Why prioritization should account for the economic cost of delay—not just the value of what gets built.',
    readTime: '5–7 min read · August 2026',
    publishedDate: 'August 2026',
    tag: 'Portfolio Strategy',
    heroImage: 'insight-3.jpg',
    heroImageAlt: 'Silhouetted figure on a wet beach at sunset with a crowd in the distance',

    lede:
      'Most prioritization conversations ask one question: what is this worth if we build it? They rarely ask the other half of the same question: what is it costing us, every week, that we haven\'t built it yet.',

    summary: [
      '**Cost of Delay puts a dollar figure on waiting**, so sequencing decisions can be argued in the same economic terms as everything else (Reinertsen).',
      'CD3 and WSJF **turn urgency into a number**—Cost of Delay divided by duration—instead of an opinion.',
      '**An imprecise estimate still beats no estimate**; the gap between backlog items is usually large enough that a rough number is enough to sequence correctly.',
      'At Maersk, one feature sat 38 weeks in queue at a $200,000-per-week Cost of Delay—**roughly $8M in lost revenue** nobody had actually decided to spend.',
    ],

    body: [
      {
        type: 'paragraph',
        text: "That second cost is just as real as the first. It's just harder to see, because **it never shows up as a line item**—it shows up as revenue, market position, and opportunity that quietly never happened.",
      },
      { type: 'heading', text: 'Cost of Delay: Putting a Number on Waiting' },
      {
        type: 'paragraph',
        text: 'Donald Reinertsen calls this quantity **Cost of Delay**—the economic value of finishing something sooner rather than later, expressed in the same units as everything else that matters to the business: dollars per unit of time. He has described it as close to a master key for product economics, because once delay has a dollar figure attached to it, every other tradeoff—queue size, batch size, sequencing, staffing—can be evaluated in the same terms instead of argued about in the abstract.',
      },
      {
        type: 'paragraph',
        text: 'That number gets turned into a sequencing decision through CD3: Cost of Delay divided by Duration. It answers a specific, practical question—given two initiatives, which one is more economically urgent to do first? The idea has since become the core mechanism behind Weighted Shortest Job First (WSJF), the prioritization formula used in the Scaled Agile Framework, where Cost of Delay (business value, time criticality, and risk reduction combined) is divided by job size to decide what gets sequenced next. Whatever the specific formula, the underlying move is the same: **turn urgency into a number instead of an opinion**, so it can compete on equal footing with every other number in the backlog.',
      },
      {
        type: 'visual',
        steps: ['Value sits ready to build', 'It waits in a queue behind other work', 'Each week of waiting has a real dollar cost', 'The cost compounds the longer it waits', 'By the time it ships, real value has already been lost'],
        caption: 'Why an orderly-looking backlog can still be quietly bleeding value every week.',
      },
      { type: 'heading', text: '"We Don\'t Have the Data" Isn\'t a Good Reason to Skip This' },
      {
        type: 'paragraph',
        text: "The most common objection to Cost of Delay is that it's hard to estimate precisely. Reinertsen's answer to that is direct: **an imprecise economic estimate still beats no economic estimate**. He points out that the typical gap between the best and worst items in a backlog, once you actually estimate their economic value, tends to run somewhere on the order of 50 to 1—meaning even a rough estimate is usually more than accurate enough to tell you which end of the backlog something belongs on. Waiting for a perfect number before you're willing to use one is not caution. It's a way of letting every item default to equal priority, which is itself a very expensive decision that nobody chose on purpose.",
      },
      { type: 'heading', text: "What This Looks Like When It's Real" },
      {
        type: 'paragraph',
        text: "This isn't just a framework on a whiteboard. Joshua Arnold and Özlem Yüce, who developed much of the practical Cost of Delay methodology now known as Black Swan Farming, documented its application at Maersk Line, one of the world's largest shipping companies, across a large enterprise product portfolio. One example from that work: **a single feature had a Cost of Delay exceeding $200,000 per week**. It sat in queue for 38 weeks. That queue time alone—work that wasn't being actively opposed or deprioritized, just waiting its turn behind other work—corresponded to nearly $8 million in lost revenue.",
      },
      {
        type: 'stat',
        value: '~$8M',
        label: 'in lost revenue — from a single feature sitting 38 weeks in queue at a $200,000-per-week Cost of Delay.',
        source: 'Arnold, J. & Yüce, Ö., Black Swan Farming — Maersk Line case detail.',
      },
      {
        type: 'pullquote',
        text: 'Nobody made an $8 million decision on that item. It simply sat in a queue, and the organization absorbed the cost without ever seeing it as a decision at all.',
      },
      {
        type: 'paragraph',
        text: "That is the core problem with cost of delay left unmeasured: **it doesn't announce itself**. It accumulates silently in exactly the items nobody is currently discussing, because attention naturally goes to what's active, not to what's waiting.",
      },
      { type: 'heading', text: "Why the Brain Doesn't Catch This on Its Own" },
      {
        type: 'paragraph',
        text: "There's a reason this particular blind spot is so persistent, and it isn't a discipline problem. Research on decision-making under delay has found that people are reasonably good at recognizing the opportunity cost of a large, distant decision—but systematically pay less attention to the same kind of cost when it's attached to something smaller or nearer-term. A backlog is made of exactly that: dozens of individually small, individually reasonable-looking delays, none of which trigger the mental alarm that a single big, obvious cost would. The $8 million at Maersk didn't arrive as one decision. **It arrived as 38 individually unremarkable weeks.**",
      },
      { type: 'heading', text: 'Make the Invisible Cost Visible' },
      {
        type: 'paragraph',
        text: "None of this requires abandoning the frameworks an organization already uses. It requires adding one question to whatever process already exists: **what does a week of delay on this actually cost, even roughly?** Not a perfect number—a defensible one. Reinertsen's own point stands: the gap between your best guess and no estimate at all is far larger than the gap between your best guess and a perfect one.",
      },
      {
        type: 'paragraph',
        text: "The value of what you build is only half the prioritization equation. **The other half is what it costs you, every week, to not have built it yet**—and that half doesn't stop accruing just because nobody put it on a slide.",
      },
    ],

    diagnostic: {
      label: 'ASK YOURSELF',
      prompt: 'Are we prioritizing by value alone, or by value against the cost of waiting?',
      questions: [
        'Do we know the rough weekly cost of delay for our top initiatives?',
        'How long does validated, ready-to-build work typically sit in queue?',
        'Do we sequence work by size, by politics, or by economic urgency?',
        'When priorities shift, do we recalculate what the old priority is now costing us?',
        'Would we make the same sequencing decision if the cost of delay were on the slide?',
      ],
    },

    perspective: {
      label: 'THE COHERENZ PERSPECTIVE',
      statement:
        "A backlog is not a list of what's important. It's a queue of what's currently costing you the least to leave waiting—whether anyone intended that or not.",
      framework: 'VALUE → CAPACITY → FLOW → OUTCOME',
    },

    action: {
      heading: 'What changes?',
      insteadOf: "What's next on the roadmap?",
      ask: 'What is waiting costing us, and does our sequence reflect that?',
      steps: [
        { number: '01', title: 'Estimate cost of delay, even roughly', body: 'A defensible estimate beats no estimate.' },
        { number: '02', title: 'Sequence by CD3 or WSJF, not size alone', body: 'Divide economic urgency by duration to find what should go first.' },
        { number: '03', title: 'Make the invisible cost visible', body: "Put a dollar figure next to what's waiting, not just what's shipping." },
      ],
    },

    closing:
      'The value of what you build is only half the equation. The other half is what it costs you, every week, to not have built it yet.',

    cta: {
      headline: 'Want your leadership team working from the same economic language when prioritization decisions get made?',
      description:
        'Coherenz helps executive teams build a shared, numbers-based approach to sequencing investment, capacity, and delay.',
      programSlug: 'executive-product-economics-workshop',
      programName: 'Executive Product Economics Workshop',
      ctaLabel: 'Explore the Workshop',
    },

    relatedSlugs: ['not-every-feature-deserves-to-be-built', 'more-delivery-doesnt-mean-more-value'],

    sources: [
      'Reinertsen, D.G. — The Principles of Product Development Flow (Cost of Delay, CD3).',
      'Scaled Agile Framework — "WSJF (Weighted Shortest Job First)," framework.scaledagile.com.',
      'Arnold, J. & Yüce, Ö. — Black Swan Farming Using Cost of Delay methodology; Maersk Line case detail via blackswanfarming.com.',
    ],
  },

  {
    slug: 'not-every-feature-deserves-to-be-built',
    eyebrow: 'INSIGHT · PRODUCT DELIVERY ECONOMICS™',
    title: 'Not Every Feature Deserves to Be Built.',
    subhead: 'Why product investment decisions need more economic rigor before delivery capacity is committed.',
    readTime: '5–7 min read · August 2026',
    publishedDate: 'August 2026',
    tag: 'Delivery Stabilization',

    lede:
      "The most consequential decision in product delivery isn't how well something gets built. It's whether it should have been built at all—and that decision usually gets made with far less scrutiny than the build itself receives.",

    summary: [
      'At Microsoft, Bing, and Airbnb, **66–92% of tested product ideas failed** to move the metric they were built to improve (Kohavi et al.).',
      'These are among the most data-driven product organizations in the industry—the pattern isn\'t a sign of weak instincts, **it\'s the base rate**.',
      '"It seemed like a good idea" isn\'t a business case; **intuition alone was never a reliable filter** for which ideas will work.',
      'The fix: **fund a portfolio of small, validated bets** before committing full delivery capacity to any one of them.',
    ],

    body: [
      { type: 'heading', text: 'What Happens When You Actually Check' },
      {
        type: 'paragraph',
        text: "Most organizations assume their product ideas are good ideas, more or less by default. The evidence says **that assumption is wrong more often than it's right**.",
      },
      {
        type: 'paragraph',
        text: 'Ronny Kohavi, who built and ran large-scale controlled-experimentation platforms at Microsoft, Bing, and later Airbnb, has published some of the most extensively reviewed data available on this question—what actually happens when a shipped idea is tested against a real, randomized control group instead of just being assumed to work. The pattern holds with remarkable consistency across very different companies: at Microsoft, roughly two-thirds of tested ideas failed to improve the metric they were built to improve. At Bing, the failure rate ran higher still, around 85%. At Airbnb, roughly 92%. Booking.com, running more concurrent experiments than almost any company in the world, has reported a similar result—**the large majority of ideas its own product teams believed would help did not, when actually measured**.',
      },
      {
        type: 'chart',
        title: 'Share of tested product ideas that failed to move the metric they were built for',
        unit: '%',
        bars: [
          { label: 'Microsoft', value: 66 },
          { label: 'Bing', value: 85 },
          { label: 'Airbnb', value: 92, highlight: true },
        ],
        caption: 'Measured against a real, randomized control group — at three of the most data-driven product organizations in the industry.',
        source: 'Kohavi, R. et al., Trustworthy Online Controlled Experiments; exp-platform.com.',
      },
      {
        type: 'visual',
        steps: ['An idea seems obviously good', 'Full delivery capacity gets committed', 'It ships as planned, on schedule', "It's tested against real usage—or not tested at all", "Most of the time, it doesn't move the metric it was built for"],
        caption: 'Why shipping on schedule and shipping something that works are two different outcomes.',
      },
      {
        type: 'paragraph',
        text: 'These are not companies with weak product instincts. They are among the most sophisticated, data-driven product organizations in the industry, and their own numbers say the same thing: **most ideas that look good enough to build turn out not to earn their cost once someone checks**.',
      },
      {
        type: 'pullquote',
        text: 'The ideas that survive contact with a controlled test are the exception, not the rule—for everyone, not just for teams that are getting it wrong.',
      },
      { type: 'heading', text: '"It Seemed Like a Good Idea" Isn\'t a Business Case' },
      {
        type: 'paragraph',
        text: "If even the best product organizations in the world are wrong most of the time about which ideas will work, the honest conclusion isn't that those organizations are bad at their jobs. It's that **intuition alone was never going to be a reliable filter**—and every organization that skips validation and commits delivery capacity straight from \"this seems like a good idea\" is making the same bet those companies' own data shows usually doesn't pay off.",
      },
      {
        type: 'paragraph',
        text: 'Melissa Perri calls the organizational pattern that results from skipping this step **the build trap**: equating more shipped output with more success, and losing track of whether any particular thing that got shipped actually created value. Her proposed fix reframes the whole problem as a capital allocation question—**fund product work the way a venture investor funds a portfolio**, putting a small amount of capacity against many unproven ideas, and only committing serious capacity once an idea has evidence behind it.',
      },
      {
        type: 'paragraph',
        text: "That's also the core discipline behind Eric Ries's **build-measure-learn** loop: treat what you ship as a test of an assumption, not a finished commitment, until the data says otherwise. The goal isn't to move slower. It's to spend the smallest amount of capacity necessary to find out whether an idea is one of the roughly one-in-three that works—before spending the much larger amount of capacity it takes to fully build, harden, and maintain it.",
      },
      { type: 'heading', text: 'The Economics of Checking First' },
      {
        type: 'paragraph',
        text: 'This connects directly to the same economic logic that should govern any prioritization decision: capacity is finite, and **every dollar of it committed to an unvalidated feature is a dollar not available** for the smaller share of ideas that would have actually earned their investment.',
      },
      {
        type: 'paragraph',
        text: "**The fix costs far less than the mistake.** A validation step—a small experiment, a narrow release, a real test against real usage—costs a fraction of what building, shipping, and then indefinitely maintaining the wrong thing costs. The organizations with the best data on this question aren't the ones that guess less often. They're the ones that built the discipline to find out before they commit.",
      },
      { type: 'heading', text: 'The Real Question, Asked Earlier' },
      {
        type: 'paragraph',
        text: "Not every feature deserves to be built—not because most product ideas are bad ones, but because **most ideas, even from strong teams, don't turn out to be worth what they'd cost until someone actually checks**.",
      },
    ],

    diagnostic: {
      label: 'ASK YOURSELF',
      prompt: 'Are we funding ideas, or funding evidence?',
      questions: [
        'How many of our last ten shipped features were validated before full build, not just after?',
        "What's our actual hit rate once something ships—do we even measure it?",
        'How much capacity would a small validation step cost compared to building the wrong thing fully?',
        'Do strong opinions or real evidence carry more weight in our prioritization conversations?',
        "If we're honest, what's the base rate we should expect our own ideas to beat?",
      ],
    },

    perspective: {
      label: 'THE COHERENZ PERSPECTIVE',
      statement:
        "Capacity committed to an unvalidated idea isn't confidence. Given what the data shows across company after company, it's a coin flip weighted against you—with your most expensive resource on the table.",
      framework: 'VALUE → CAPACITY → FLOW → OUTCOME',
    },

    action: {
      heading: 'What changes?',
      insteadOf: 'Does this seem like a good idea?',
      ask: "What's the smallest, cheapest way to find out if this idea is one of the ones that works?",
      steps: [
        { number: '01', title: 'Fund a portfolio, not a single bet', body: 'Put small capacity against many ideas before committing large capacity to one.' },
        { number: '02', title: 'Validate before you build fully', body: 'A narrow test costs a fraction of what shipping, hardening, and maintaining the wrong thing costs.' },
        { number: '03', title: 'Treat capacity like capital', body: 'Every unit committed to an unvalidated idea is a unit not available to the ones that would have earned it.' },
      ],
    },

    closing:
      "The organizations that treat validation as optional aren't moving faster. They're spending delivery capacity on the same odds everyone else is working against, just without bothering to look at them first.",

    cta: {
      headline: 'Want to know how much of your current roadmap has actually been validated—and how much is running on conviction?',
      description:
        'Coherenz helps product and technology leaders bring economic rigor to investment decisions before capacity gets committed.',
      programSlug: 'product-delivery-economics-assessment',
      programName: 'Product Delivery Economics Assessment',
      ctaLabel: 'Explore the Assessment',
    },

    relatedSlugs: ['the-cost-of-doing-nothing-is-often-hidden', 'busy-doesnt-mean-valuable'],

    sources: [
      'Kohavi, R., Tang, D., Xu, Y. — Trustworthy Online Controlled Experiments (Cambridge University Press, 2020); Microsoft/Bing experimentation-platform findings, exp-platform.com.',
      'Reported experimentation failure rates at Airbnb and Booking.com — industry interviews/case discussion (e.g., abtasty.com "1,000 Experiments Club" interview with Ronny Kohavi).',
      "Perri, M. — Escaping the Build Trap: How Effective Product Management Creates Real Value (O’Reilly, 2018).",
      'Ries, E. — The Lean Startup (Crown Business, 2011) — validated learning, build-measure-learn.',
    ],
  },

  {
    slug: 'your-delivery-problem-may-not-be-a-capacity-problem',
    eyebrow: 'INSIGHT · PRODUCT DELIVERY ECONOMICS™',
    title: 'Your Delivery Problem May Not Be a Capacity Problem.',
    subhead: 'Why adding people rarely fixes the underlying economics of a constrained delivery system.',
    readTime: '6–9 min read · August 2026',
    publishedDate: 'August 2026',
    tag: 'Delivery Economics',
    heroImage: 'insight-4.jpg',
    heroImageAlt: "A Rubik's cube mid-toss above an open hand",

    lede: 'When delivery slips, the reflex is to hire — but the arithmetic of coordination usually says that will make things worse, not better.',

    summary: [
      "**Adding people to a late project tends to make it later, not sooner** — a finding Fred Brooks published in 1975 that empirical project data keeps reconfirming.",
      '**Communication overhead grows combinatorially, not linearly** — a team of 10 has 45 possible communication pathways; double it to 20 and you get 190.',
      "QSM's research across roughly 2,500 completed software projects found the best-performing teams running **several times smaller** than the worst-performing ones, while delivering faster and with far fewer defects.",
      'In one QSM analysis, **an eightfold increase in team size bought about one week** of schedule reduction — while cost rose roughly sevenfold and defects rose fivefold.',
    ],

    body: [
      { type: 'paragraph', text: "When a delivery date is at risk, the instinct in most leadership rooms is the same: add people. It's an understandable reflex — it worked in manufacturing, where more hands on a line generally means more output. But a delivery system built on knowledge work doesn't behave like an assembly line, and **treating headcount as a proxy for capacity is one of the most expensive mistakes a leadership team can make.**" },

      { type: 'heading', text: 'The Fifty-Year-Old Finding Everyone Rediscovers' },
      { type: 'paragraph', text: "Fred Brooks ran IBM's OS/360 project in the 1960s, watched it fall behind, added engineers to catch it up, and watched it fall further behind. He wrote up what he learned in *The Mythical Man-Month* in 1975, and the core observation — now known as **Brooks's Law** — has held up for fifty years: adding manpower to a late software project makes it later. Brooks identified three reasons. New people need time to become productive before they contribute anything (ramp-up time). Existing team members have to stop and train them, which is a real cost paid immediately in exchange for a benefit that arrives later, if at all. And some work simply can't be split among more people no matter how badly you'd like it to be — a task with sequential dependencies doesn't go faster because nine people are staring at it instead of one." },

      { type: 'heading', text: 'Why the Math Turns Against You' },
      { type: 'paragraph', text: "The mechanism behind Brooks's Law is arithmetic, not opinion. Brooks showed that the number of communication pathways in a team grows by the formula **n(n−1)/2**, where n is team size. A team of 5 has 10 possible pairs who might need to coordinate. Grow it to 10 and that number is 45. Grow it to 20 and it's 190. Team size doubles; the coordination burden roughly quadruples. Every new hire doesn't just add their own output — they add a growing number of new relationships, handoffs, and status updates that someone has to maintain, and none of that shows up in a capacity plan." },

      {
        type: 'visual',
        steps: [
          'New hire joins the team',
          'Ramp-up and onboarding drag begins',
          'New communication pathways open across the team',
          'Existing team members re-explain context instead of delivering',
          'Coordination time crowds out delivery time',
          'Net throughput gain arrives months later — if it arrives at all',
        ],
        caption: 'Why headcount and throughput move on different timelines.',
      },

      { type: 'pullquote', text: "Capacity is not a headcount. It's a system's ability to convert people into finished, valuable work — and that system has its own physics." },

      { type: 'heading', text: 'What the Data Actually Shows' },
      { type: 'paragraph', text: "This isn't just a 1970s anecdote. Quantitative Software Management (QSM), which maintains a database of thousands of completed software projects, has published a series of studies spanning 1997 to 2018 — by researchers Doug Putnam, Don Beckett, and Kate Armel — covering roughly 2,500 projects between them. The pattern repeats across every study: **smaller teams consistently outperform larger ones on the same class of work.** In one dataset, best-in-class projects delivered five times faster and used fifteen times less total effort than worst-in-class projects, with teams running over four times smaller on average. In another, large teams (nine or more people) delivered projects only 30% faster in calendar time than small teams (under four people). They paid for that speed with 350% higher cost and 500% more defects that then had to be found and fixed." },

      {
        type: 'chart',
        title: 'Cost of staffing the same 100,000-line project two different ways',
        unit: '$ thousands',
        bars: [
          { label: '4-person team', value: 294 },
          { label: '32-person team', value: 2100, highlight: true },
        ],
        caption: "QSM's analysis found the eightfold staffing increase bought roughly one calendar week of schedule reduction and produced over five times as many defects.",
        source: 'QSM, "Overstaffing for Schedule Compression in Software Development," qsm.com.',
      },

      { type: 'heading', text: 'Task Divisibility Is the Hidden Variable' },
      { type: 'paragraph', text: "The reason more staff buys so little schedule is that most delivery work isn't a pile of identical, independent tasks — it's a network of dependencies, where some pieces can run in parallel and others can't start until earlier ones finish. Brooks's original observation was that the number of months a project takes depends on its **sequential constraints**, while the number of people you can usefully add depends on how many independent subtasks exist. You cannot substitute one for the other. Software estimation has a name for the part this leaves out: the \"ninety-ninety rule,\" attributed to Tom Cargill of Bell Labs and popularized in Jon Bentley's 1985 *Communications of the ACM* column, holds that the first 90% of a system takes 90% of the time — and the remaining 10% takes another 90%. The hardest, most sequential, least divisible part of the work is usually what's left when the deadline is closest, which is exactly when more headcount helps least." },

      { type: 'heading', text: "Amazon's Counter-Model: Split, Don't Stack" },
      { type: 'paragraph', text: "Amazon's well-known \"two-pizza team\" rule — teams kept small enough to be fed by two pizzas, generally cited around five to eight people — is a structural answer to the same physics Brooks described. Rather than growing a single team past the point where coordination overhead outpaces added output, Amazon's approach is to **split into a new, independently accountable team** once a group outgrows that size. The lesson isn't that ten or fifteen people can never work together productively — it's that beyond a certain size, more capacity has to come from adding coordinated units, not from stacking more people onto one already-strained team and hoping the org chart absorbs the difference." },

      { type: 'heading', text: "Ramp-Up Isn't Instant, Either" },
      { type: 'paragraph', text: "Even when new headcount is genuinely warranted, it isn't available on day one. Industry survey data — including a Swimm survey of more than 80 engineers and engineering managers across company sizes — puts full ramp-up to productive contribution at roughly **three to nine months**, depending on the complexity of the system a new hire is joining. A hiring decision made to hit a deadline six weeks out won't show up as capacity until well after that deadline has passed — and in the meantime, the existing team is paying the training cost Brooks described, out of the same limited capacity that's already under pressure." },

      { type: 'heading', text: 'The Better Question' },
      { type: 'paragraph', text: "None of this means capacity is never the constraint — sometimes it genuinely is, and the fix genuinely is more people, structured well. The failure mode is treating \"add headcount\" as the default answer to any delivery slip, without first asking whether the system is capacity-constrained or coordination-constrained. Those require opposite interventions. One is solved by hiring. The other is made worse by it." },
    ],

    diagnostic: {
      label: 'ASK YOURSELF',
      prompt: 'Is your delivery system capacity-constrained, or coordination-constrained?',
      questions: [
        'How many of your last five hires reached full contribution within 90 days?',
        'Can the delayed work actually be split across more people, or is it sequential by nature?',
        'How many people does a typical decision or handoff have to pass through before work resumes?',
        'The last time you added headcount to a struggling team, did the delivery date move — and in which direction?',
        'Where does work currently sit waiting on someone, rather than being actively worked on?',
      ],
    },

    perspective: {
      label: 'THE COHERENZ PERSPECTIVE',
      statement: "More people is a staffing decision. Faster delivery is a systems decision. Confusing the two is how organizations spend their way into a slower delivery system.",
      framework: 'VALUE → CAPACITY → FLOW → OUTCOME',
    },

    action: {
      heading: 'What changes?',
      insteadOf: 'How many more people do we need to hit the date?',
      ask: 'Where in the system is work actually queuing, and would another person shorten that queue or lengthen it?',
      steps: [
        { number: '01', title: 'Identify the real constraint', body: 'Map where work actually queues in the delivery system before assuming the fix is more hands.' },
        { number: '02', title: 'Test task divisibility', body: "Determine how much of the delayed work can genuinely be parallelized without creating new coordination cost." },
        { number: '03', title: 'Resize deliberately, not reactively', body: 'When capacity is genuinely short, add it in small, cohesive units — not as headcount injected into an already-strained team.' },
      ],
    },

    closing: "The instinct to hire your way out of a delivery problem comes from a good place — it feels like decisive action when a date is at risk. But the math Brooks documented fifty years ago, and the project data QSM keeps publishing since, both point the same direction: **more people is not the same lever as more capacity.** Before the next headcount request goes in, it's worth finding out which problem you actually have.",

    cta: {
      headline: 'Is your delivery bottleneck really about headcount?',
      description: 'Coherenz helps leadership teams diagnose whether a delivery problem is structural, not staffing — before the next hiring plan locks in the wrong fix.',
      programSlug: 'product-delivery-economics-assessment',
      programName: 'Product Delivery Economics Assessment',
      ctaLabel: 'Start the Assessment',
    },

    relatedSlugs: ['busy-doesnt-mean-valuable', 'complexity-has-an-operating-cost'],

    sources: [
      'Brooks, F.P. — The Mythical Man-Month: Essays on Software Engineering, Anniversary Edition (Addison-Wesley, 1995; originally published 1975) — origin of Brooks\'s Law and the n(n-1)/2 communication-pathway analysis.',
      'QSM (Quantitative Software Management) — "4 Key Studies on Team Size," compiling research by Doug Putnam (1997, 2018), Don Beckett (2006), and Kate Armel (2012) across roughly 2,500 completed projects, qsm.com/blog/2019/4-key-studies-team-size.',
      'QSM — "Overstaffing for Schedule Compression in Software Development," analysis of a 100,000-line project staffed at 4 vs. 32 people, qsm.com/risk_02.html.',
      'Amazon / AWS Executive Insights — "Amazon\'s Two Pizza Teams," aws.amazon.com/executive-insights/content/amazon-two-pizza-team/.',
      'Cargill, T. (concept), popularized by Jon Bentley in "Bumper-Sticker Computer Science," Communications of the ACM, September 1985 — the Ninety-Ninety Rule.',
      'Swimm — survey of 80+ engineers and engineering managers on developer ramp-up time, reported via HackerNoon, "Engineer Onboarding: The Ugly Truth About Ramp-Up Time."',
    ],
  },

  {
    slug: 'everything-cant-be-a-priority',
    eyebrow: 'INSIGHT · PRODUCT DELIVERY ECONOMICS™',
    title: "Everything Can't Be a Priority.",
    subhead: 'Why too many priorities create the illusion of progress while slowing down everything that matters.',
    readTime: '6–8 min read · August 2026',
    publishedDate: 'August 2026',
    tag: 'Product Leadership',

    lede: "A priority list with thirty items on it isn't a strategy — it's an admission that no one was willing to choose.",

    summary: [
      "**Task-switching costs are not zero** — a landmark cognitive-psychology study found rapid alternation between tasks can cost as much as **40% of someone's productive time** (Rubinstein, Meyer & Evans, 2001).",
      '**Unfinished tasks leave "attention residue" behind** that measurably degrades performance on whatever comes next, even after you\'ve consciously moved on (Leroy, 2009).',
      "Gerald Weinberg's widely cited context-switching estimate shows effort **lost, not redistributed** — split across two concurrent projects, a person contributes roughly 40% to each, not 50%.",
      'Michael Porter\'s definition of strategy is built on **trade-offs — "choosing what not to do"** — which means a priority list that excludes nothing hasn\'t actually been prioritized.',
    ],

    body: [
      { type: 'paragraph', text: 'Ask a leadership team to name their top three priorities and you\'ll often get twelve. It feels safer that way — no one has to be the person who told a sponsor their initiative doesn\'t matter this quarter. But **declining to choose doesn\'t remove the constraint on capacity; it just hides it**, and it moves the cost from an uncomfortable conversation in a planning meeting to a much larger, quieter cost paid every week after, in the form of everything taking longer than it should.' },

      { type: 'heading', text: 'The Arithmetic of Attention' },
      { type: 'paragraph', text: 'In *Quality Software Management: Systems Thinking* (1992), Gerald Weinberg published a widely cited estimate of what happens to a person\'s effective output as the number of concurrent projects they\'re assigned to increases. On one project, someone contributes something close to 100% of their capacity. Split across two, Weinberg\'s estimate isn\'t 50/50 — it\'s roughly **40% to each, with about 20% lost outright** to the overhead of switching between them. Add a third project and it drops further, to around 20% each. Weinberg was explicit that these were heuristic estimates rather than laboratory measurements, but they remain some of the most cited figures in the field precisely because nothing more rigorous has displaced them — and because they match what most delivery leaders observe when they actually track where time goes.' },

      { type: 'heading', text: 'What Cognitive Psychology Actually Measured' },
      { type: 'paragraph', text: "Weinberg's estimate has independent support from experimental research. In a set of controlled experiments published in the *Journal of Experimental Psychology: Human Perception and Performance*, researchers Joshua Rubinstein, David Meyer, and Jeffrey Evans had participants alternate between tasks of varying complexity and measured the time cost of each switch. **The switching cost wasn't trivial, and it grew with the complexity of the tasks involved.** Summarizing this line of research, the American Psychological Association has noted that the mental blocks created by task-switching can cost as much as 40% of someone's productive time — a figure that lines up closely with Weinberg's independently derived estimate from a completely different field two decades earlier." },

      {
        type: 'visual',
        steps: [
          'Priority A is in progress',
          'Priority B interrupts to claim the same capacity',
          "Mental context for A has to be reloaded later, from scratch",
          'Attention residue from A drags down performance on B',
          'Both A and B take longer than if either had run uninterrupted',
        ],
        caption: 'Why parallel priorities create serial delay.',
      },

      { type: 'pullquote', text: 'A list where everything is priority one is a list where nothing has actually been decided.' },

      { type: 'heading', text: 'The Residue Effect' },
      { type: 'paragraph', text: 'Organizational behavior researcher Sophie Leroy documented a related and specifically damaging effect in a 2009 study published in *Organizational Behavior and Human Decision Processes*. When people are interrupted before finishing one task and moved to an unrelated one, part of their attention **stays stuck on the unfinished task** — what Leroy termed "attention residue" — and measurably degrades their performance on the new task, especially when the interrupted work was time-pressured or incomplete. This is the mechanism behind a familiar organizational pattern: an initiative gets 70% built, gets deprioritized for something more urgent, and when it finally resurfaces, the team working on the "urgent" thing is quietly worse at it than if the first initiative had simply been finished or formally shelved instead of left hanging.' },

      { type: 'stat', value: '40%', label: "of someone's productive time that cognitive-psychology research shows can be lost to task-switching alone", source: 'Rubinstein, Meyer & Evans (2001), Journal of Experimental Psychology: Human Perception and Performance; American Psychological Association research summary.' },

      { type: 'heading', text: 'Strategy Is a Subtraction Exercise' },
      { type: 'paragraph', text: 'Michael Porter\'s 1996 *Harvard Business Review* article "What Is Strategy?" made the case that operational effectiveness — doing more things, doing them well — is not the same as strategy, and is not sufficient for competitive advantage because it\'s easy for competitors to copy. **Real strategic positioning requires trade-offs: choosing what not to do is as important as choosing what to do.** A prioritized portfolio works the same way. If your list of priorities doesn\'t exclude anything, it isn\'t a set of priorities — it\'s an inventory of hopes, and the organization will unconsciously ration capacity across all of them, in exactly the diluted, switching-cost-heavy way Weinberg and Rubinstein\'s research describes.' },

      { type: 'heading', text: 'Why More Priorities Feels Like Progress' },
      { type: 'paragraph', text: 'Part of why this keeps happening is that starting something new feels like momentum, while saying no to a sponsor feels like conflict. A kickoff meeting is visible and exciting; a deliberate "not now" is neither. So organizations default to accumulation — every credible initiative gets a slot on the roadmap, and capacity gets sliced thinner with each addition, without anyone ever making an explicit trade-off decision. The result is a portfolio that looks busy and feels responsive, while the switching costs described above quietly consume a large share of the very capacity everyone is fighting over.' },

      { type: 'heading', text: 'What Actually Changes' },
      { type: 'paragraph', text: "Fixing this isn't about working harder or multitasking better — the research above suggests that's close to a contradiction in terms. It's about making the trade-off explicit instead of implicit: deciding, in the open, what capacity is protected for the top priority and what everything else has to wait for, instead of letting every initiative silently compete for the same finite attention." },
    ],

    diagnostic: {
      label: 'ASK YOURSELF',
      prompt: 'Does your organization have priorities, or just a list of things everyone hopes to get to?',
      questions: [
        'If you asked five leaders to name the single top priority, would you get five different answers?',
        'How many initiatives are officially "in flight" right now?',
        'What was the last initiative your organization explicitly stopped funding?',
        'How often do individual contributors get pulled between competing priorities in the same week?',
        'Can your top priority absorb the next unit of available capacity without a debate?',
      ],
    },

    perspective: {
      label: 'THE COHERENZ PERSPECTIVE',
      statement: "Prioritization isn't a ranking exercise. It's a decision about what an organization is willing to say no to — and until something is explicitly excluded, nothing has actually been prioritized.",
      framework: 'VALUE → CAPACITY → FLOW → OUTCOME',
    },

    action: {
      heading: 'What changes?',
      insteadOf: 'How do we get to all of it?',
      ask: 'What are we willing to stop, delay, or explicitly not do so the top priority can actually move?',
      steps: [
        { number: '01', title: 'Force a rank, not a list', body: 'Name the single most valuable initiative competing for capacity, and require every other item to justify coming before or after it.' },
        { number: '02', title: 'Make the trade-off visible', body: 'Show leadership what saying yes to a new priority displaces, not just what it adds.' },
        { number: '03', title: 'Protect the constraint', body: "Once a priority is set, shield the capacity assigned to it from mid-stream interruption — that's where the switching cost gets paid." },
      ],
    },

    closing: "None of the research above says multitasking is impossible or that organizations should only ever do one thing. It says something more specific: every additional concurrent priority has a real, measurable cost, paid in switching time and attention residue, and that cost is invisible on a roadmap. **The organizations that move fastest aren't the ones juggling the most initiatives — they're the ones that decided, on purpose, what to put down.**",

    cta: {
      headline: 'Are your priorities actually prioritized?',
      description: "Coherenz helps leadership teams design a portfolio operating model where trade-offs are made explicitly, before capacity gets silently split across too many initiatives.",
      programSlug: 'product-operating-model-design',
      programName: 'Product Operating Model Design',
      ctaLabel: 'Explore Operating Model Design',
    },

    relatedSlugs: ['busy-doesnt-mean-valuable', 'not-every-feature-deserves-to-be-built'],

    sources: [
      'Weinberg, G.M. — Quality Software Management, Vol. 1: Systems Thinking (Dorset House, 1992) — context-switching / concurrent-project productivity estimate.',
      'Rubinstein, J.S., Meyer, D.E., & Evans, J.E. — "Executive Control of Cognitive Processes in Task Switching," Journal of Experimental Psychology: Human Perception and Performance, 27(4), 763–797 (2001).',
      'American Psychological Association — "Multitasking: Switching Costs," research summary citing David Meyer\'s work, apa.org/topics/research/multitasking.',
      'Leroy, S. — "Why Is It So Hard to Do My Work? The Challenge of Attention Residue When Switching Between Work Tasks," Organizational Behavior and Human Decision Processes, 109(2), 168–181 (2009).',
      'Porter, M.E. — "What Is Strategy?" Harvard Business Review, November–December 1996.',
    ],
  },

  {
    slug: 'the-most-expensive-work-is-work-you-dont-finish',
    eyebrow: 'INSIGHT · PRODUCT DELIVERY ECONOMICS™',
    title: "The Most Expensive Work Is Work You Don't Finish.",
    subhead: "Why work in progress is quietly consuming your organization's capacity, attention, and economic value.",
    readTime: '6–9 min read · August 2026',
    publishedDate: 'August 2026',
    tag: 'Delivery Economics',

    lede: "Work that's 80% finished delivers 0% of its value — and it keeps costing you the entire time it sits there.",

    summary: [
      "Toyota's production system treats **work-in-process as a form of inventory** — a cost to be minimized, not a sign of activity (Ohno).",
      "Supply-chain research puts the **annual carrying cost of held inventory at roughly 20–30% of its value**; unfinished delivery work carries an analogous, less visible version of that same cost.",
      "An empirical study of **more than 8,000 work items across five teams** found that work-in-progress directly correlates with lead time — the more unfinished work in a system, the longer everything in it takes to finish (Sjøberg, 2018).",
      '**The sunk-cost effect** means organizations often keep funding partially finished work well past the point it\'s economically rational to — inertia, not economics, decides what stays open (Arkes & Blumer, 1985).',
    ],

    body: [
      { type: 'paragraph', text: "Most portfolio reviews are full of work that's mostly done: the migration that's 70% complete, the feature that's in final QA, the initiative that's \"almost there.\" It reads as progress. **It's actually inventory** — capital that's been spent, sitting on a shelf, earning nothing until it ships, and it has been quietly costing the organization money the entire time it's been sitting there." },

      { type: 'heading', text: 'Unfinished Work Is Inventory' },
      { type: 'paragraph', text: 'Taiichi Ohno, the engineer who built the Toyota Production System, identified **work-in-process as one of the core categories of waste (muda)** in a manufacturing system — alongside waiting, overproduction, and defects. His insight wasn\'t that work-in-process is inherently bad; it\'s that it doesn\'t create value until it becomes a finished good in a customer\'s hands, and everything sitting between "started" and "delivered" is a cost the system is absorbing without any return. Delivery organizations tend not to think of half-built features or in-flight initiatives the same way they think of a warehouse full of unsold parts — but the underlying economics are the same.' },

      { type: 'heading', text: 'Inventory Has a Carrying Cost — So Does Unfinished Work' },
      { type: 'paragraph', text: 'In physical supply chains, this cost is well quantified. Industry benchmarks from supply-chain associations (ASCM/APICS) and the Council of Supply Chain Management Professionals put the **all-in annual cost of carrying inventory at roughly 20–30% of its value** — capital tied up, storage, insurance, and the risk that it becomes obsolete before it\'s used. Unfinished delivery work carries a direct analogue to every one of those components: capital already spent on people\'s time, the ongoing cost of context being held in people\'s heads instead of shipped, and the very real risk that requirements or market conditions shift while the work sits, making it stale by the time anyone returns to it.' },

      { type: 'heading', text: "The Cost You Don't See Is Still a Cost" },
      { type: 'paragraph', text: 'Physical inventory shows up on a balance sheet, so someone eventually has to account for it. Unfinished delivery work doesn\'t — there\'s no line item for "half-built features currently depreciating." Don Reinertsen\'s concept of **Cost of Delay**, developed to quantify exactly this kind of invisible cost, defines it as the dollar impact of time on the outcomes an organization is trying to achieve. Without putting a number on it, queued and unfinished work is effectively invisible to the people deciding what to fund next — which is precisely why it keeps accumulating instead of getting finished.' },

      {
        type: 'visual',
        steps: [
          'Work item is started',
          'Work item is paused for a higher-priority item',
          'Requirements, context, and market conditions keep moving while it waits',
          'The paused work goes stale',
          'Resuming it costs more than finishing it the first time would have',
          'Work ships late, ships wrong, or never ships at all',
        ],
        caption: 'How unfinished work accumulates cost the longer it sits.',
      },

      { type: 'pullquote', text: "A feature that's 80% built and not shipped isn't 80% of the value. It's 100% of the cost and none of the return." },

      { type: 'heading', text: 'What the Data Shows About WIP and Speed' },
      { type: 'paragraph', text: 'This isn\'t just a manufacturing analogy transplanted onto software. A 2018 empirical study presented at the ACM/IEEE International Symposium on Empirical Software Engineering and Measurement analyzed more than 8,000 work items completed by five teams over four years at a single software company. The researcher, Dag Sjøberg, found a direct relationship: **higher work-in-progress correlated with longer lead times** — the more unfinished items a team was carrying simultaneously, the longer each individual item took to actually get done, independent of how much total work the team was capable of completing.' },

      {
        type: 'chart',
        title: 'What it costs annually to hold unfinished inventory, as a share of its value',
        unit: '%',
        bars: [
          { label: 'Low end of benchmark range', value: 20 },
          { label: 'High end of benchmark range', value: 30, highlight: true },
        ],
        caption: 'Supply-chain carrying-cost benchmarks (capital, storage, obsolescence, and shrinkage combined). Unfinished delivery work carries an analogous, less visible version of the same cost structure.',
        source: 'ASCM/APICS and Council of Supply Chain Management Professionals (CSCMP) inventory carrying-cost benchmarks.',
      },

      { type: 'stat', value: '8,000+', label: 'work items across five teams and four years — the dataset in which higher WIP was found to directly correlate with longer lead times', source: 'Sjøberg, D.I.K. — "An Empirical Study of WIP in Kanban Teams," ESEM 2018 (ACM/IEEE).' },

      { type: 'heading', text: 'Why Organizations Keep Funding Work That Should Stop' },
      { type: 'paragraph', text: 'If the economics are this clear, why does unfinished work keep piling up instead of getting killed or finished? Part of the answer is the **sunk-cost effect**, documented by Hal Arkes and Catherine Blumer in a 1985 study published in *Organizational Behavior and Human Decision Processes*. They found that people are more likely to continue an initiative simply because resources have already been invested in it, even when those resources are unrecoverable and continuing is no longer the rational choice. Arkes and Blumer traced this partly to a desire not to appear wasteful — killing a 70%-funded initiative feels like admitting the first 70% was a mistake, even when the honest economic question is only ever about the value of finishing the remaining 30%.' },

      { type: 'heading', text: 'Finishing Is a Different Discipline Than Starting' },
      { type: 'paragraph', text: "Most delivery organizations are structurally set up to reward starting, not finishing. A kickoff is visible, gets a name, and shows up in a steering committee deck. Finishing the unglamorous last stretch of an existing initiative competes for attention against the next shiny kickoff — and loses, because starting something new looks like momentum in a way that quietly closing out old work never does. The result is a portfolio that accumulates open work faster than it retires it, which, per the Sjøberg findings above, makes every single item in that portfolio slower to complete." },

      { type: 'heading', text: 'The Better Question' },
      { type: 'paragraph', text: "None of this argues for finishing everything regardless of merit — some in-flight work genuinely should be killed once its economics no longer justify it. The argument is narrower: unfinished work isn't a neutral, no-cost state while an organization decides what to do with it. It's actively costing capital, clarity, and speed every day it stays open, exactly the way physical inventory does — and that cost belongs in the decision, not outside it." },
    ],

    diagnostic: {
      label: 'ASK YOURSELF',
      prompt: 'Is your organization funding unfinished work longer than the economics justify?',
      questions: [
        'How many initiatives in your current portfolio are more than 50% complete but not yet shipped?',
        'If you were starting your top five initiatives today, with today\'s information, would you fund all five again?',
        'How long, on average, does work sit paused or waiting versus actively being worked on?',
        'What would it actually take to kill or pause an initiative that has already absorbed significant investment?',
        'Who on your team is accountable for finishing work, as distinct from who gets credit for starting it?',
      ],
    },

    perspective: {
      label: 'THE COHERENZ PERSPECTIVE',
      statement: "Work in progress isn't evidence of momentum. It's inventory — capital tied up, aging, and earning nothing until it ships. The economic goal was never more work started; it's more work finished.",
      framework: 'VALUE → CAPACITY → FLOW → OUTCOME',
    },

    action: {
      heading: 'What changes?',
      insteadOf: 'How do we get more initiatives moving?',
      ask: "What's already in progress that we should finish — or stop — before we start anything new?",
      steps: [
        { number: '01', title: 'Inventory what\'s actually in flight', body: 'Make all unfinished work visible, including the initiatives nobody wants to be the one to pause.' },
        { number: '02', title: 'Apply a finish-before-start discipline', body: 'Limit new starts until existing work-in-progress clears — the same logic that governs physical inventory.' },
        { number: '03', title: 'Kill deliberately, not by neglect', body: 'Give partially completed work an explicit stop/continue decision on a regular cadence, instead of letting sunk cost decide by default.' },
      ],
    },

    closing: "The most expensive item in most delivery portfolios isn't the work that failed outright — it's the work that's still technically alive, still absorbing attention and capital, and still not shipped. **Treating unfinished work as inventory, with a real carrying cost, changes the question from \"what should we start next\" to \"what should we finish first\"** — and that shift alone recovers capacity most organizations didn't know they were losing.",

    cta: {
      headline: 'How much unfinished work is your organization quietly carrying?',
      description: "Coherenz's 6-Week Delivery Stabilization Program helps leadership teams surface work-in-progress, apply finish-before-start discipline, and convert stalled initiatives into shipped value.",
      programSlug: '6-week-delivery-stabilization',
      programName: '6-Week Delivery Stabilization Program',
      ctaLabel: 'Explore the 6-Week Program',
    },

    relatedSlugs: ['everything-cant-be-a-priority', 'the-cost-of-doing-nothing-is-often-hidden'],

    sources: [
      'Ohno, T. — Toyota Production System: Beyond Large-Scale Production (Productivity Press, 1988; originally published 1978) — work-in-process as one of the core categories of waste (muda).',
      'ASCM/APICS and Council of Supply Chain Management Professionals (CSCMP) — supply-chain inventory carrying-cost benchmarks, commonly cited at 20–30% of inventory value annually.',
      'Reinertsen, D.G. — The Principles of Product Development Flow: Second Generation Lean Product Development (Celeritas Publishing, 2009) — Cost of Delay as the economic cost of unfinished or delayed work.',
      'Sjøberg, D.I.K. — "An Empirical Study of WIP in Kanban Teams," Proceedings of the 12th ACM/IEEE International Symposium on Empirical Software Engineering and Measurement (ESEM 2018), Oulu, Finland.',
      'Arkes, H.R., & Blumer, C. — "The Psychology of Sunk Cost," Organizational Behavior and Human Decision Processes, 35(1), 124–140 (1985).',
    ],
  },

  {
    slug: 'speed-is-a-system-property',
    eyebrow: 'INSIGHT · PRODUCT DELIVERY ECONOMICS™',
    title: 'Speed Is a System Property.',
    subhead: 'Why asking teams to work faster rarely fixes slow delivery.',
    readTime: '6–9 min read · August 2026',
    publishedDate: 'August 2026',
    tag: 'Delivery Economics',
    lede: "When delivery is slow, the instinctive fix is to ask individual teams to move faster — but speed is almost never a property of the people doing the work. It's a property of the system they're working inside.",
    summary: [
      "**Throughput is set by the system's constraint**, not by average effort — pushing non-constraint teams to work harder just builds a bigger queue somewhere else (Goldratt's Theory of Constraints).",
      'DORA\'s research shows elite delivery organizations ship a change in **under a day**, while low performers can take **one to six months** for a comparable change.',
      'Donella Meadows ranked "push harder within the current numbers" as the **weakest of twelve leverage points** for changing a system — structure and rules outrank effort every time.',
      "Elite performers also fail far less often than low performers — proof that **speed and stability move together**, not against each other, once the system itself is redesigned.",
    ],
    body: [
      { type: 'paragraph', text: "Ask a room full of executives why delivery is slow and the answers cluster fast: the team isn't working hard enough, there's too much scope, we need more engineers. All three point at effort or headcount. Almost none of them point at the system the work is moving through — and that's usually where the real answer is sitting." },
      { type: 'heading', text: 'The Constraint Sets the Pace, Not the Average' },
      { type: 'paragraph', text: "Eliyahu Goldratt's **Theory of Constraints** starts from an observation that's almost embarrassing once you see it: in any chain of dependent steps, the system can never produce faster than its slowest step. Every other step can be fully staffed, motivated, and executing flawlessly — the system's total output is still capped by the one step that's actually the bottleneck. Goldratt built a discipline, **throughput accounting**, on top of this: instead of tracking local efficiency at every station, track three numbers — throughput (the rate the system turns work into finished value), inventory (everything invested in work not yet delivered), and operating expense (everything spent converting inventory into throughput). A team running at 100% utilization that isn't the constraint isn't adding throughput. It's adding inventory — unfinished work sitting in a queue, waiting for the one resource that actually paces the system." },
      { type: 'paragraph', text: "That's why \"work faster\" fails as an instruction more often than it succeeds. If the team you're pushing isn't the constraint, you haven't sped up the system — you've sped up the rate work piles up in front of whatever *is* the constraint. Goldratt's **Five Focusing Steps** — identify the constraint, exploit it, subordinate everything else to that decision, elevate the constraint, then repeat — exist because most organizations never do step one. They optimize everywhere at once, which guarantees they're optimizing in the wrong place most of the time." },
      { type: 'paragraph', text: "In a product organization, this usually translates into something uncomfortable: the constraint is rarely the team that looks busiest. It might be a single architecture review board, a shared QA environment, a data platform team everyone depends on but nobody funds properly, or one overloaded technical approver. **Exploiting** the constraint means making sure that resource is never idle, never blocked by upstream noise, and never spending attention on anything that isn't strictly necessary. **Elevating** it — adding capacity, automating around it, redesigning the process it sits inside — is the expensive step, and Goldratt's ordering matters: elevate before you've exploited and subordinated everything else to it, and you've just paid to build a bigger version of the same bottleneck." },
      { type: 'visual', steps: ['Every team pushed to work faster', 'Non-constraint teams produce more output', 'Output queues up in front of the real constraint', 'Queue length grows, not throughput', 'System delivery speed is unchanged'], caption: "Effort applied anywhere except the constraint doesn't disappear — it becomes a longer line in front of the step that was already setting the pace." },
      { type: 'heading', text: 'What Elite Delivery Organizations Actually Do Differently' },
      { type: 'paragraph', text: "DORA — the research program behind Google Cloud's long-running Accelerate State of DevOps research — has spent close to a decade measuring what separates elite software delivery organizations from everyone else, across tens of thousands of respondents. The gap isn't subtle. Elite performers deploy on demand, multiple times a day, with a lead time for changes of under a day. Low performers can take one to six months to get a single comparable change into production. That's not a 20% difference you'd get from people simply moving with more urgency — it's a difference in kind, and DORA's research consistently traces it to system-level factors: loosely coupled architecture that lets teams ship independently, continuous integration, and fast, effective code review — not to how hard any individual engineer is working." },
      { type: 'stat', value: '1 day vs. 6 months', label: 'Typical lead time for a comparable change: elite delivery performers vs. low performers', source: 'DORA — Accelerate State of DevOps Report, Google Cloud (2023–2024 editions), dora.dev.' },
      { type: 'paragraph', text: "The part that should really get a CEO's attention is what happens to quality at the same time. If speed and stability were a trade-off — the assumption behind \"let's slow down and be careful\" — elite performers should be breaking things constantly. Across DORA's reported ranges, they don't: elite performers post change failure rates in the low double digits or better, while low performers post rates running several multiples higher. Speed, in the organizations that have actually redesigned their systems for it, comes bundled with fewer failures, not more." },
      { type: 'chart', title: 'Change failure rate: elite vs. low-performing delivery organizations', unit: '%', bars: [{ label: 'Low performers', value: 60 }, { label: 'Elite performers', value: 15, highlight: true }], caption: "Approximate upper bounds of the ranges DORA has reported across recent State of DevOps editions. Elite performers ship far more often and fail less — evidence that speed comes from how the system is built, not from cutting corners.", source: 'DORA — Accelerate State of DevOps Report, Google Cloud (2023–2024 editions), dora.dev.' },
      { type: 'pullquote', text: "A team working at its personal best can still be the reason the system is slow. If it isn't the constraint, its effort just builds a longer queue." },
      { type: 'heading', text: 'Why "Try Harder" Is the Weakest Lever You Have' },
      { type: 'paragraph', text: 'Systems scientist Donella Meadows spent her career cataloguing where you can intervene in a complex system to change its behavior, ranked from weakest to most powerful. Dead last on her list of twelve leverage points: **constants and parameters** — the numbers you can turn up or down without touching how the system is built. Headcount, hours, quotas, targets. She called interventions at this level "diddling with the details, arranging the deck chairs on the Titanic." Asking a team to work faster is a parameter change. It doesn\'t touch the structure of stocks and flows that actually governs how work moves through the organization — the buffers, the delays, the rules for who can start what, and when. Meadows ranked structural changes — the rules of the system, who has access to information, the power to redesign structure itself — many levels higher, because they change what the system produces, not just how hard it\'s pushed.' },
      { type: 'paragraph', text: "Put Goldratt and Meadows side by side and two different disciplines arrive at the same message: speed is architecture, not adrenaline. If the constraint hasn't been identified and the flow around it hasn't been redesigned, no amount of individual urgency changes the system's actual output. It just moves the queue." },
      { type: 'paragraph', text: "That has a direct implication for what a leadership team should actually review. A weekly operating rhythm built around team-by-team velocity is measuring parameters — Meadows's weakest leverage point, applied to a status meeting. A rhythm built around the queue in front of the constraint, and whether last week's changes shortened or lengthened it, is measuring the thing that determines whether the organization ships faster next quarter or merely feels busier." },
    ],
    diagnostic: {
      label: 'ASK YOURSELF',
      prompt: "Do you know where your delivery system's real constraint is — or are you pushing everyone equally?",
      questions: [
        'Can you name the single step or team that paces your delivery system end to end?',
        'When leadership asks for more speed, which teams actually absorb the pressure?',
        "Is work piling up in a queue somewhere you're not measuring?",
        'Have you changed a target — a date, a headcount, a quota — recently without changing how work flows?',
        'If the constraint moved tomorrow, would you notice?',
      ],
    },
    perspective: {
      label: 'THE COHERENZ PERSPECTIVE',
      statement: "Speed isn't something you demand from people. It's something you design into the system — by finding the real constraint, protecting it, and building the flow of work around it.",
      framework: 'VALUE → CAPACITY → FLOW → OUTCOME',
    },
    action: {
      heading: 'What changes?',
      insteadOf: 'How do we get everyone to move faster?',
      ask: 'Where is the constraint that actually paces our delivery system?',
      steps: [
        { number: '01', title: 'Find the real constraint', body: 'Map the path work takes end to end and identify the one step that sets the pace for everything downstream.' },
        { number: '02', title: 'Subordinate everything else to it', body: "Stop optimizing teams that aren't the constraint — direct their capacity toward keeping the constraint fed and unblocked." },
        { number: '03', title: 'Redesign the structure, not the effort', body: 'Change the rules, buffers, and handoffs around the constraint. Elevate it only after exploiting what it can already do.' },
      ],
    },
    closing: "Every delivery organization has a constraint, whether anyone has named it or not. The ones that win aren't the ones pushing hardest — they're the ones that found the constraint, protected it, and built the rest of the system to serve it. That isn't a motivational problem. It's a design problem, and it has a design answer.",
    cta: {
      headline: "Do you know what's actually setting the pace of your delivery system?",
      description: 'Coherenz helps leadership teams find the real constraint in their delivery system — and redesign the flow of work around it instead of pushing harder in the wrong places.',
      programSlug: 'product-delivery-economics-assessment',
      programName: 'Product Delivery Economics Assessment',
      ctaLabel: 'Explore the Assessment',
    },
    relatedSlugs: ['your-delivery-problem-may-not-be-a-capacity-problem', 'the-most-expensive-work-is-work-you-dont-finish'],
    sources: [
      'Goldratt, E.M. — The Goal: A Process of Ongoing Improvement (North River Press, 1984; rev. 2004) — origin of the Theory of Constraints and the Five Focusing Steps.',
      'Goldratt, E.M. — Theory of Constraints (North River Press, 1990) — throughput accounting (throughput, inventory, operating expense) as an alternative to local-efficiency cost accounting.',
      "Meadows, D.H. — Thinking in Systems: A Primer (Chelsea Green Publishing, 2008); \"Leverage Points: Places to Intervene in a System,\" The Donella Meadows Project, donellameadows.org.",
      'DORA (DevOps Research and Assessment) — Accelerate State of DevOps Report, Google Cloud, 2023 and 2024 editions, dora.dev/research.',
    ],
  },

  {
    slug: 'efficiency-can-make-you-less-effective',
    eyebrow: 'INSIGHT · PRODUCT DELIVERY ECONOMICS™',
    title: 'Efficiency Can Make You Less Effective.',
    subhead: 'Why optimizing individual teams can damage the performance of the product system as a whole.',
    readTime: '6–9 min read · August 2026',
    publishedDate: 'August 2026',
    tag: 'Product Leadership',
    lede: "Every team in your organization can hit its efficiency targets, and the product can still ship late — because the thing being measured and the thing being delivered aren't the same object.",
    summary: [
      '**Resource efficiency and flow efficiency are different metrics that often move in opposite directions** — maximizing one can actively damage the other (Modig & Åhlström).',
      "A patient moving through five individually well-run specialist visits took **42 days** to get a routine diagnosis — because each department optimized its own utilization, not her path through the system.",
      '**Conway\'s Law and team-topology research show organizational structure becomes product structure** — teams organized around technical convenience produce products with the same seams, and pay for it at every handoff.',
      'Time spent on cross-team collaboration has **grown by 50% or more over two decades**, and roughly a fifth to a third of that value concentrates on **just 3–5% of employees** (Cross, Rebele & Grant, HBR).',
    ],
    body: [
      { type: 'paragraph', text: "Most performance dashboards measure the wrong thing, and they measure it very precisely. Utilization, velocity per team, capacity booked — these are all **resource efficiency** metrics: how busy is the resource. None of them measure whether the thing the customer is actually waiting for is moving any faster. It's entirely possible — common, in fact — for every team in a value stream to run at high, well-managed efficiency while the end-to-end product takes longer to ship than it used to." },
      { type: 'heading', text: 'Two Kinds of Efficiency, and One Wins by Default' },
      { type: 'paragraph', text: 'Swedish researchers Niklas Modig and Pär Åhlström built an entire framework, in their book **This Is Lean**, around a distinction most organizations never make explicit: **resource efficiency** (how well you use the resources doing the work) versus **flow efficiency** (how quickly a unit of value — a feature, a patient, an order — moves through the whole system from request to delivery). Organizations default to optimizing the first because it\'s what\'s visible on an org chart: a manager owns a team, a team has a capacity number, and that number is easy to push toward 100%. Flow efficiency has no natural owner — it belongs to the *path*, not to any single department, which is exactly why it\'s the metric that gets ignored.' },
      { type: 'paragraph', text: 'Modig and Åhlström illustrate the gap with a healthcare example that translates directly to product delivery. A patient — the book calls her Alison — needed a straightforward diagnostic workup. Each department she passed through (referral, imaging, lab work, specialist review, follow-up) was individually well run and efficiently staffed. The full process took **42 days across five separate visits**. The actual clinical work — the time someone spent looking at her case — was a small fraction of that elapsed time. Every station was efficient. The path between the stations was not. That\'s the same shape as a feature that touches five teams, each of which closes its ticket inside its own SLA, while the feature itself takes two quarters to ship.' },
      { type: 'stat', value: '42 days, 5 visits', label: 'Elapsed time for a routine diagnosis moving through individually efficient specialist departments — each stage well run, the path between them owned by no one', source: 'Modig, N. & Åhlström, P. — This Is Lean: Resolving the Efficiency Paradox (Rheologica Publishing, 2012).' },
      { type: 'heading', text: 'Org Structure Becomes Product Structure' },
      { type: 'paragraph', text: "There's a reason locally efficient teams so reliably produce a globally slow system, and it has a name: **Conway's Law**, computer scientist Melvin Conway's 1968 observation that organizations design systems which mirror their own communication structure. Organize teams around technical layers or specialties — a frontend team, a backend team, a data team, each individually well optimized — and the product inherits exactly those seams. Every feature that crosses them pays a coordination tax at each boundary. Matthew Skelton and Manuel Pais built **Team Topologies** directly on this observation: most organizations size and shape teams around technical convenience rather than the flow of value, then wonder why fast flow never arrives even though every team is delivering on its own sprint commitments. Their concept of **cognitive load** makes the mechanism explicit — push a team past what it can hold in its head, and it stops behaving like a team capable of independent, fast delivery and starts behaving like a group of individuals waiting on each other." },
      { type: 'paragraph', text: "Skelton and Pais go further than diagnosis: they describe teams as needing an explicit **\"team API\"** — a clear, documented interface for how other teams are meant to engage with them — and they name distinct interaction modes, from tight collaboration to a clean, self-service handoff, so the amount of coordination two teams need is a deliberate choice rather than an accident. Most organizations never make that choice explicitly. Every team defaults to the heaviest, most collaborative mode with every team it touches, because no one decided otherwise — and heavy collaboration is the most expensive interaction available, chosen by default instead of by design." },
      { type: 'visual', steps: ['Teams organized around technical specialty, each optimized locally', 'A feature needs work from four specialized teams', 'Each team is efficient inside its own queue', 'The feature waits at every handoff between teams', "End-to-end delivery time is set by the handoffs, not by any team's efficiency"], caption: "Local efficiency at every station doesn't prevent a slow system — it can be the reason the system is slow, because nobody owns the space between the stations." },
      { type: 'heading', text: 'The Coordination Tax Nobody Puts on a Roadmap' },
      { type: 'paragraph', text: 'Matrix and cross-team structures compound the problem, because they turn coordination into a standing cost rather than an occasional one. Research by Rob Cross, Reb Rebele, and Adam Grant, published in Harvard Business Review, found that the time managers and employees spend in collaborative activity — meetings, email, calls — has **grown by 50% or more over the past two decades**, and that at a typical organization, **20% to 35% of value-adding collaboration comes from just 3% to 5% of employees**. None of that shows up as a resource-efficiency problem on any single team\'s dashboard. It shows up as slower cycle time everywhere, and as burnout concentrated on the handful of people every team depends on to unblock it.' },
      { type: 'chart', title: 'Growth in time spent on cross-team collaboration', unit: 'index (baseline = 100)', bars: [{ label: 'Two decades ago', value: 100 }, { label: 'Today', value: 150, highlight: true }], caption: "Indexed to the reported increase of 50% or more in time spent on meetings, email, and calls — a cost that sits between teams, not inside any one of them.", source: 'Cross, R., Rebele, R., & Grant, A. — "Collaborative Overload," Harvard Business Review (January–February 2016).' },
      { type: 'pullquote', text: 'Efficiency is a measurement you can take inside one team. Effectiveness is only visible from outside all of them, looking at the path the work actually took.' },
      { type: 'paragraph', text: "None of this is an argument against efficiency. It's an argument against measuring only the kind that's easy to see on an org chart. The fix isn't to make each team less disciplined — it's to give someone ownership of the flow *between* teams, and measure that path with the same rigor currently reserved for each team's own utilization." },
      { type: 'paragraph', text: "It's also worth naming why this is hard to fix once it exists: every incentive in a matrixed organization points a manager toward defending their own team's efficiency number, because that's the number they're evaluated on. Nobody is evaluated on the queue between teams, so nobody owns it, and it grows precisely because it's rational for every individual manager to leave it alone." },
    ],
    diagnostic: {
      label: 'ASK YOURSELF',
      prompt: 'Are you optimizing your teams, or your system?',
      questions: [
        'Can every team hit its efficiency targets while your average feature still ships late?',
        'Who owns the time a piece of work spends waiting between teams?',
        'How many teams does a typical feature pass through before it ships?',
        'Is your org structure drawn around technical convenience or around how value actually flows to customers?',
        'Does the same small group of people show up as a dependency on almost everything?',
      ],
    },
    perspective: {
      label: 'THE COHERENZ PERSPECTIVE',
      statement: "A team's efficiency and your system's effectiveness are not the same measurement, and optimizing the first can quietly damage the second. The path work takes between teams deserves as much ownership as the work each team does alone.",
      framework: 'VALUE → CAPACITY → FLOW → OUTCOME',
    },
    action: {
      heading: 'What changes?',
      insteadOf: 'How do we make each team more efficient?',
      ask: 'How quickly does value actually move through the whole system, start to finish?',
      steps: [
        { number: '01', title: 'Measure the path, not just the stations', body: 'Track end-to-end flow time for real units of value, not just utilization inside each team.' },
        { number: '02', title: 'Redraw team boundaries around flow', body: 'Shape teams around the value they deliver end to end, not technical convenience — reduce the handoffs a feature has to survive.' },
        { number: '03', title: 'Give the space between teams an owner', body: "Assign explicit accountability for coordination and handoff time — it's currently everyone's cost and no one's job." },
      ],
    },
    closing: "A system built from individually efficient teams is not the same thing as an efficient system. Every handoff, every queue between departments, every unowned coordination cost is a tax the org chart collects quietly, one delayed feature at a time. Effectiveness lives in the path, not in any single station along it.",
    cta: {
      headline: 'Is every team efficient while your delivery is still slow?',
      description: 'Coherenz helps delivery organizations find and remove the coordination and handoff costs hiding between individually efficient teams.',
      programSlug: '6-week-delivery-stabilization',
      programName: '6-Week Delivery Stabilization Program',
      ctaLabel: 'Explore the 6-Week Program',
    },
    relatedSlugs: ['speed-is-a-system-property', 'the-most-expensive-work-is-work-you-dont-finish'],
    sources: [
      "Modig, N. & Åhlström, P. — This Is Lean: Resolving the Efficiency Paradox (Rheologica Publishing, 2012) — resource efficiency vs. flow efficiency, including the \"Alison\" patient-flow example.",
      'Conway, M.E. — "How Do Committees Invent?," Datamation (1968) — the original statement of Conway\'s Law.',
      'Skelton, M. & Pais, M. — Team Topologies: Organizing Business and Technology Teams for Fast Flow (IT Revolution Press, 2019).',
      'Cross, R., Rebele, R., & Grant, A. — "Collaborative Overload," Harvard Business Review (January–February 2016).',
    ],
  },

  {
    slug: 'complexity-has-an-operating-cost',
    eyebrow: 'INSIGHT · PRODUCT DELIVERY ECONOMICS™',
    title: 'Complexity Has an Operating Cost.',
    subhead: 'Why scaling a product organization without redesigning how decisions and work flow eventually makes delivery slower and more expensive.',
    readTime: '6–9 min read · August 2026',
    publishedDate: 'August 2026',
    tag: 'Transformation',
    lede: "Every layer, committee, and approval step an organization adds to gain control quietly adds to a bill that never appears on the P&L — until decisions start taking weeks instead of days.",
    summary: [
      '**External business complexity has grown roughly sixfold** over the past six decades — but internal organizational "complicatedness" has grown **more than 35 times over**, far outpacing the environment it was meant to manage (BCG).',
      'In the most complicated organizations, managers can spend **40% of their time writing reports and 30% in coordination meetings** — leaving only **30% of the week for actually managing**.',
      'Companies in the **top quintile of decision effectiveness** generate total shareholder returns nearly **6 percentage points higher** than the rest — decision speed and quality are measurable, not soft (Bain).',
      "Haier didn't add another layer of governance to fix its speed problem — it **removed layers**, restructuring into thousands of self-managing, market-facing units (Hamel & Zanini).",
    ],
    body: [
      { type: 'paragraph', text: "Complexity is usually treated as an unavoidable cost of growth — more products, more markets, more regulation, more people. Some of that is real and can't be designed away. But most organizations respond to real complexity by manufacturing a second, avoidable kind on top of it: more approval layers, more standing committees, more reporting lines, more sign-offs. Each addition is defended, individually, as reasonable risk management. Collectively, they form something nobody actually designed. That second kind has a name, a body of research behind it, and a bill that gets paid in decision speed." },
      { type: 'heading', text: 'Complexity Is Not the Same Thing as Complicatedness' },
      { type: 'paragraph', text: "BCG's Yves Morieux, in the research behind his book **Six Simple Rules** (with Peter Tollman), draws a sharp line between the two. **Complexity** is external and largely real — the number of products, customer segments, technologies, and regulatory regimes a company actually operates across. **Complicatedness** is the internal response: the structures, procedures, coordination bodies, and approval chains organizations build to manage that complexity. Morieux's research, drawn from a survey of more than 100 U.S. and European listed companies, found that external business complexity grew roughly **sixfold over six decades** — while internal organizational complicatedness grew more than **35 times over** in the same period. The response outgrew the problem by an order of magnitude." },
      { type: 'paragraph', text: "That imbalance shows up directly in how managers spend their time. Inside the most complicated organizations Morieux studied, managers reported spending **40% of their time writing reports** and **30% in coordination meetings** — leaving roughly **30% of the week for the actual work of managing**. Over 15 years, the same research found the procedures, layers, interfaces, and approval steps firms use to manage complexity increased anywhere from **50% to 350%**." },
      { type: 'chart', title: "How complicated organizations' managers actually spend their week", unit: '%', bars: [{ label: 'Writing reports', value: 40 }, { label: 'Coordination meetings', value: 30 }, { label: 'Left for actually managing', value: 30, highlight: true }], caption: 'In the most complicated organizations, seven-tenths of a manager\'s week goes to maintaining the complicatedness itself.', source: 'Morieux, Y. & Tollman, P. — Six Simple Rules: How to Manage Complexity without Getting Complicated (Harvard Business Review Press, 2014).' },
      { type: 'paragraph', text: "For a product and technology organization specifically, this complicatedness usually shows up as an approval chain that has quietly grown a step every year: a new security review, a new architecture sign-off, a new cross-functional steering committee added after a past incident, none of them ever removed once the crisis that justified them has passed. Each step was locally reasonable when it was added. The chain they form together was never designed as a whole — and it's the chain, not any single step in it, that decides how long it takes the organization to ship a decision." },
      { type: 'heading', text: 'Every New Layer Adds a Decision Node' },
      { type: 'paragraph', text: "The mechanism is straightforward. Add a product line, a region, a matrixed reporting relationship, and you don't just add one new path through the organization — you multiply the number of places a decision has to pass through to get made. Bain & Company's decade-long research program behind **Decide & Deliver** treated this as directly measurable rather than a matter of culture: across more than 1,000 companies, they found decision effectiveness correlates with financial performance — revenue growth, return on capital, and total shareholder return — at a 95% confidence level, and that companies in the top quintile on decision effectiveness produce total shareholder returns nearly **six percentage points higher** than everyone else. Decision speed isn't a soft complaint about bureaucracy. It's a line that shows up in the return." },
      { type: 'stat', value: '+6 pts', label: 'Higher total shareholder return for companies in the top quintile of decision effectiveness, compared with the rest', source: 'Blenko, M.W., Mankins, M.C., & Rogers, P. — Decide & Deliver: Five Steps to Breakthrough Performance in Your Organization (Bain & Company / Harvard Business Review Press, 2010).' },
      { type: 'visual', steps: ['A new product line, region, or reporting layer is added', 'The number of decision nodes grows faster than the org chart suggests', 'Each decision now needs more approvals to clear', 'Approval chains lengthen and queue', 'Decisions — and the delivery that depends on them — slow down'], caption: 'Complicatedness compounds geometrically, not linearly, as new structural dimensions are added.' },
      { type: 'pullquote', text: "Complexity doesn't show up as a line item. It shows up as the extra week every decision takes to clear the org chart." },
      { type: 'heading', text: 'What Removing the Cost Actually Looks Like' },
      { type: 'paragraph', text: "The instinctive response to a complexity problem is to add a new mechanism to manage it — a steering committee, a PMO, another review gate. That's the exact reflex behind BCG's 35x complicatedness against 6x real complexity. Management researchers Gary Hamel and Michele Zanini, documenting Haier's transformation in **Humanocracy**, describe the opposite move: rather than adding a coordinating layer, Haier restructured itself into thousands of small, self-managing, market-facing units, each with direct accountability to a customer outcome rather than to a layer of management above it. The redesign didn't add oversight. It removed the layers oversight used to travel through, and pushed decision rights down to where the information already was." },
      { type: 'paragraph', text: "That's the pattern worth taking seriously: the fix for a complexity problem is almost never a new structure sitting on top of the old one. It's fewer, clearer decision rights, held closer to the work — a redesign of the operating model, not an addition to it." },
      { type: 'paragraph', text: "There's a reason complicatedness tends to outlast the org chart that produced it. Melvin Conway's 1968 observation that systems mirror the communication structure of the teams that build them applies just as directly to decision-making as it does to software architecture: a company that has quietly tripled in size while keeping the reporting lines and approval habits of a much smaller one will keep making decisions the way it always has, just with three times as many people now expected to weigh in. The structure wasn't redesigned when the business was. It just got more crowded." },
    ],
    diagnostic: {
      label: 'ASK YOURSELF',
      prompt: 'Is your complexity real, or is it self-inflicted?',
      questions: [
        'How many approvals does a typical decision need to clear before it\'s final?',
        "How much of your leadership team's week goes to coordination meetings versus deciding?",
        'When you added your last new product line, market, or reporting layer, did you remove anything to compensate?',
        'Can a frontline team make a customer-facing decision without escalating it?',
        'Has decision speed gotten faster or slower as headcount has grown?',
      ],
    },
    perspective: {
      label: 'THE COHERENZ PERSPECTIVE',
      statement: "Complexity you can't avoid should be met with fewer, clearer decision rights held closer to the work — not another layer of oversight. Complicatedness is a choice organizations keep making by default.",
      framework: 'VALUE → CAPACITY → FLOW → OUTCOME',
    },
    action: {
      heading: 'What changes?',
      insteadOf: 'What new structure or committee do we need to manage this?',
      ask: 'What decision rights can we push closer to the work, and what layer can we remove?',
      steps: [
        { number: '01', title: 'Map the decision, not the org chart', body: 'Trace how many approvals a real decision actually needs to clear, end to end — not how many the org chart implies.' },
        { number: '02', title: 'Separate real complexity from self-inflicted complicatedness', body: 'Distinguish what your market genuinely requires from what your structure has added on top of it.' },
        { number: '03', title: "Redesign the operating model, don't add to it", body: 'Push decision rights down to where the information already lives, and remove the layer they used to travel through.' },
      ],
    },
    closing: "Complexity that comes from serving real markets is a cost of doing business. Complicatedness that comes from how you chose to organize around that complexity is a cost of design — and unlike the first kind, it's one you get to redesign. Most organizations never separate the two, which is exactly why the second kind keeps growing faster than the first, quietly, one reasonable-sounding layer at a time, until the organization built to move fast can no longer make a simple decision without a meeting.",
    cta: {
      headline: "Is your organization's complexity real, or self-inflicted?",
      description: 'Coherenz helps leadership teams redesign operating models so decision rights sit where the information already is — instead of adding another layer to manage the layers that came before it.',
      programSlug: 'product-operating-model-design',
      programName: 'Product Operating Model Design',
      ctaLabel: 'Explore Product Operating Model Design',
    },
    relatedSlugs: ['efficiency-can-make-you-less-effective', 'everything-cant-be-a-priority'],
    sources: [
      'Morieux, Y. & Tollman, P. — Six Simple Rules: How to Manage Complexity without Getting Complicated (Harvard Business Review Press, 2014); Morieux, Y. — "Smart Rules: Six Ways to Get People to Solve Problems Without You," Harvard Business Review (September 2011).',
      'Blenko, M.W., Mankins, M.C., & Rogers, P. — Decide & Deliver: Five Steps to Breakthrough Performance in Your Organization (Bain & Company / Harvard Business Review Press, 2010).',
      'Hamel, G. & Zanini, M. — Humanocracy: Creating Organizations as Amazing as the People Inside Them (Harvard Business Review Press, 2020); "The End of Bureaucracy," Harvard Business Review (November–December 2018).',
      'Conway, M.E. — "How Do Committees Invent?," Datamation (1968) — cited for the structural link between organizational form and system output.',
    ],
  },
];

export function getInsightArticle(slug: string): InsightArticle | undefined {
  return insightArticles.find((a) => a.slug === slug);
}
