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

    body: [
      {
        type: 'paragraph',
        text: 'Most leadership teams treat "everyone is busy" as evidence the organization is running well. It usually means the opposite. Full utilization and full value creation are not the same thing, and confusing them is one of the most expensive mistakes a delivery organization can make.',
      },
      { type: 'heading', text: 'The Math Behind the Paradox' },
      {
        type: 'paragraph',
        text: "The relationship between how busy a system is and how fast work moves through it is not a straight line—it is a curve, and it bends sharply. This isn't opinion; it's queueing theory, and it governs any system where work arrives, waits, and gets processed—a call center, a hospital, a product delivery pipeline.",
      },
      {
        type: 'paragraph',
        text: 'The foundational result is Little\'s Law: the average number of items in a system equals the rate at which work arrives, multiplied by the average time each item spends in that system. It is a simple relationship, but it has a sharp implication. As a system\'s utilization climbs toward 100%, wait time does not increase proportionally—it increases non-linearly, accelerating fastest right when the system looks most "efficient" on paper. Practitioners commonly point to a rough danger zone starting around 70–80% utilization, where the risk of runaway delay increases sharply. There is no exact universal number—it depends on how variable the work is—but the direction is consistent: the closer a system runs to full capacity, the more violently a small disruption inflates wait times.',
      },
      {
        type: 'paragraph',
        text: "Donald Reinertsen made this the central argument of The Principles of Product Development Flow: running a product development process near full utilization is not a sign of discipline—it is, in his words, economically damaging. High utilization inflates queues and the cost of delay attached to everything sitting in them. He goes further, arguing that organizations that chase utilization as a goal in itself create their own instability—a self-inflicted wound, not an external constraint. His illustration of why this matters is simple: the same fixed delay costs far more when it hits a long queue of waiting work than when it hits a short one. A team with a deep backlog isn't protected by that backlog—it's more exposed to every disruption that touches it.",
      },
      {
        type: 'visual',
        steps: ['More utilization', 'More concurrent work', 'More coordination & waiting', 'Longer cycle times', 'Slower value realization'],
        caption: 'Why pushing utilization higher tends to push value realization later, not sooner.',
      },
      { type: 'heading', text: 'Busy Is a Local Measure. Value Is a System Measure.' },
      {
        type: 'paragraph',
        text: "This is also the core insight of Eliyahu Goldratt's Theory of Constraints: a system's throughput is governed by its constraint, not by how hard any individual part of it is working. Goldratt's phrase for this is blunt—local optimum is not global optimum. Pushing every team, every station, every resource to maximum utilization doesn't make the system faster. It can make it slower, because effort gets absorbed everywhere except at the point that actually determines how fast value moves through the organization.",
      },
      {
        type: 'pullquote',
        text: 'Utilization tells you how occupied your capacity is. It tells you nothing about whether that capacity is pointed at the right work.',
      },
      {
        type: 'paragraph',
        text: 'DORA\'s research on software delivery performance backs this up from the flow side: work-in-process limits—paired with visible tracking and real feedback loops—are consistently associated with better delivery performance. Not because teams work harder, but because limiting how much is "in flight" at once forces the organization to finish things instead of starting them.',
      },
      {
        type: 'paragraph',
        text: 'And most organizations are further from finishing than they realize. In Kanban and flow-metrics literature, "flow efficiency"—the share of a work item\'s total elapsed time that is spent actually being worked on, versus waiting—is widely cited at roughly 15–40% for typical teams. High-performing teams reach 40–60%. Even exceptional teams rarely exceed 60–70%. In other words: for most delivery organizations, the majority of the time a piece of work takes from start to finish, no one is touching it. It is waiting—for a decision, a handoff, a reviewer, a dependency. That is not a people problem. It is a systems problem, and it exists whether or not everyone is fully booked.',
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
        text: 'Product leadership runs into the identical trap under different vocabulary. Marty Cagan draws a hard line between "feature teams," which are handed output targets—ship this, ship that—and empowered product teams, which are held to outcome targets: the business results those features are supposed to produce. Feature teams can be extraordinarily busy. Empowered teams are judged by whether the busyness converted into anything the business actually needed.',
      },
      {
        type: 'paragraph',
        text: 'John Cutler gave this failure mode a name that stuck: the feature factory—an organization that measures and rewards shipped output while staying disconnected from whether any of it moved a real business or user outcome. A feature factory is not lazy. It is often the opposite: relentlessly busy, consistently shipping, and quietly investing its scarcest resource in work that was never going to matter.',
      },
      { type: 'heading', text: 'Proof That Fixing It Works' },
      {
        type: 'paragraph',
        text: 'This isn\'t theoretical. Siemens Health Services documented what happened when they stopped managing to utilization and started managing to flow. After adopting flow metrics—work-in-process limits, cycle time, throughput—their 85th-percentile story cycle time dropped from 71 days before the change to 43 days in their first release under the new approach, then to 40 days in the release after that: a roughly 42% reduction. Quality moved in the same direction, not the opposite one—first-pass yield rose from 75% to 86% to 95% across those same releases. Throughput increased too: the second release completed 33% more stories than the one before it. The first release also finished on schedule and more than 10% under budget.',
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
        text: 'None of that came from asking people to be busier. It came from managing the system differently—limiting work in progress, watching where it queued, and protecting the constraint instead of maximizing everywhere at once.',
      },
      { type: 'heading', text: 'The Real Question' },
      {
        type: 'paragraph',
        text: 'The question worth asking in a leadership review is not "how full is our capacity?" It is "where is our capacity actually going, and is that where the value is?" Those are different questions with different answers, and the gap between them is where most delivery economics get lost—not in a single bad decision, but in the ordinary, well-intentioned pursuit of keeping everyone busy.',
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

    body: [
      {
        type: 'paragraph',
        text: 'Past a certain point, it can be the opposite—each additional feature adds a small amount of potential upside and a compounding amount of guaranteed cost, and most organizations never do the math to notice which side of that trade they are actually on.',
      },
      { type: 'heading', text: 'What Actually Happens to the Features You Ship' },
      {
        type: 'paragraph',
        text: "Start with what happens to a feature after it ships. Pendo's 2019 Feature Adoption Report—based on aggregated usage data from 615 customer subscriptions active for at least a year—found that 80% of features in the average software product are rarely or never used. That is not a claim about any one bad product. It is a pattern across hundreds of real, shipped products with real usage data attached to them.",
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
        text: "Every one of those unused features still had to be scoped, built, tested, documented, and shipped. And it doesn't stop there. Once it exists, it still has to be maintained—kept compatible with everything shipped after it, patched when it breaks, considered every time someone touches the surrounding code.",
      },
      {
        type: 'paragraph',
        text: 'That rent has a name: technical debt. Sonar\'s research, based on analysis of over 200 real-world projects totaling roughly 11 million lines of code, puts the ongoing cost at around $306,000 per year for every million lines of code—compounding to roughly $1.5 million, or 27,500 developer hours, over five years. Deloitte\'s 2026 Global Technology Leadership Study puts the aggregate effect at the organizational level: technical debt now accounts for 21% to 40% of total IT spending. Put those two together and the picture is blunt—a meaningful share of what looks like "building the product" is actually the product\'s own accumulated weight, paying for decisions—including features—that were made and shipped but never earned their keep.',
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
        text: 'None of this happens because teams are careless. It happens because the metrics most delivery organizations track make it invisible.',
      },
      {
        type: 'paragraph',
        text: 'Velocity and story-point throughput measure how much a team shipped. They say nothing about whether any of it mattered. A team can hit every sprint target, ship consistently, and still be pouring capacity into work that adds cost without adding value—because the measurement stops at "delivered," and delivered is not the same question as "worth delivering."',
      },
      {
        type: 'paragraph',
        text: 'This is the exact failure mode Marty Cagan draws a line around: feature teams are handed output targets—ship this, ship that—while empowered product teams are held to outcome targets, the actual business results those features are supposed to produce. John Cutler\'s term for the organization that optimizes for the first and never checks the second is the feature factory: consistently shipping, and consistently disconnected from whether any of it worked.',
      },
      { type: 'heading', text: 'What to Optimize Instead' },
      {
        type: 'paragraph',
        text: 'The fix is not "ship less" as a blanket policy—shipping less for its own sake is just as blind as shipping more for its own sake. The fix is asking a harder question before capacity is committed, not after: what does this feature need to do, for whom, to be worth the cost of building and carrying it indefinitely? That question has to be answered before the work starts, because Pendo\'s data suggests it is very often not being answered at all—four out of five shipped features, on average, never find out.',
      },
      {
        type: 'paragraph',
        text: 'In practice, that means treating "what we build" with the same rigor delivery teams already apply to "how we build it." A feature that will sit at low usage isn\'t neutral—it\'s a liability with a delivery-capacity price tag attached, competing every year for the same maintenance budget as the 20% of the product that customers actually rely on.',
      },
      { type: 'heading', text: 'The Real Measure' },
      {
        type: 'paragraph',
        text: "Output is easy to count and easy to celebrate: a burndown chart, a release note, a roadmap slide with more rows checked off than last quarter. Value is harder to see and slower to show up, which is exactly why it gets deprioritized in favor of the metric that's already on the dashboard.",
      },
      {
        type: 'paragraph',
        text: 'But the two are not proxies for each other. An organization can be shipping more than it ever has and still be creating less value than it did a year ago—not because anyone stopped working hard, but because "more" and "worth it" were never the same question, and only one of them was being measured.',
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

    body: [
      {
        type: 'paragraph',
        text: "That second cost is just as real as the first. It's just harder to see, because it never shows up as a line item—it shows up as revenue, market position, and opportunity that quietly never happened.",
      },
      { type: 'heading', text: 'Cost of Delay: Putting a Number on Waiting' },
      {
        type: 'paragraph',
        text: 'Donald Reinertsen calls this quantity Cost of Delay—the economic value of finishing something sooner rather than later, expressed in the same units as everything else that matters to the business: dollars per unit of time. He has described it as close to a master key for product economics, because once delay has a dollar figure attached to it, every other tradeoff—queue size, batch size, sequencing, staffing—can be evaluated in the same terms instead of argued about in the abstract.',
      },
      {
        type: 'paragraph',
        text: 'That number gets turned into a sequencing decision through CD3: Cost of Delay divided by Duration. It answers a specific, practical question—given two initiatives, which one is more economically urgent to do first? The idea has since become the core mechanism behind Weighted Shortest Job First (WSJF), the prioritization formula used in the Scaled Agile Framework, where Cost of Delay (business value, time criticality, and risk reduction combined) is divided by job size to decide what gets sequenced next. Whatever the specific formula, the underlying move is the same: turn urgency into a number instead of an opinion, so it can compete on equal footing with every other number in the backlog.',
      },
      {
        type: 'visual',
        steps: ['Value sits ready to build', 'It waits in a queue behind other work', 'Each week of waiting has a real dollar cost', 'The cost compounds the longer it waits', 'By the time it ships, real value has already been lost'],
        caption: 'Why an orderly-looking backlog can still be quietly bleeding value every week.',
      },
      { type: 'heading', text: '"We Don\'t Have the Data" Isn\'t a Good Reason to Skip This' },
      {
        type: 'paragraph',
        text: "The most common objection to Cost of Delay is that it's hard to estimate precisely. Reinertsen's answer to that is direct: an imprecise economic estimate still beats no economic estimate. He points out that the typical gap between the best and worst items in a backlog, once you actually estimate their economic value, tends to run somewhere on the order of 50 to 1—meaning even a rough estimate is usually more than accurate enough to tell you which end of the backlog something belongs on. Waiting for a perfect number before you're willing to use one is not caution. It's a way of letting every item default to equal priority, which is itself a very expensive decision that nobody chose on purpose.",
      },
      { type: 'heading', text: "What This Looks Like When It's Real" },
      {
        type: 'paragraph',
        text: "This isn't just a framework on a whiteboard. Joshua Arnold and Özlem Yüce, who developed much of the practical Cost of Delay methodology now known as Black Swan Farming, documented its application at Maersk Line, one of the world's largest shipping companies, across a large enterprise product portfolio. One example from that work: a single feature had a Cost of Delay exceeding $200,000 per week. It sat in queue for 38 weeks. That queue time alone—work that wasn't being actively opposed or deprioritized, just waiting its turn behind other work—corresponded to nearly $8 million in lost revenue.",
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
        text: "That is the core problem with cost of delay left unmeasured: it doesn't announce itself. It accumulates silently in exactly the items nobody is currently discussing, because attention naturally goes to what's active, not to what's waiting.",
      },
      { type: 'heading', text: "Why the Brain Doesn't Catch This on Its Own" },
      {
        type: 'paragraph',
        text: "There's a reason this particular blind spot is so persistent, and it isn't a discipline problem. Research on decision-making under delay has found that people are reasonably good at recognizing the opportunity cost of a large, distant decision—but systematically pay less attention to the same kind of cost when it's attached to something smaller or nearer-term. A backlog is made of exactly that: dozens of individually small, individually reasonable-looking delays, none of which trigger the mental alarm that a single big, obvious cost would. The $8 million at Maersk didn't arrive as one decision. It arrived as 38 individually unremarkable weeks.",
      },
      { type: 'heading', text: 'Make the Invisible Cost Visible' },
      {
        type: 'paragraph',
        text: "None of this requires abandoning the frameworks an organization already uses. It requires adding one question to whatever process already exists: what does a week of delay on this actually cost, even roughly? Not a perfect number—a defensible one. Reinertsen's own point stands: the gap between your best guess and no estimate at all is far larger than the gap between your best guess and a perfect one.",
      },
      {
        type: 'paragraph',
        text: "The value of what you build is only half the prioritization equation. The other half is what it costs you, every week, to not have built it yet—and that half doesn't stop accruing just because nobody put it on a slide.",
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

    body: [
      { type: 'heading', text: 'What Happens When You Actually Check' },
      {
        type: 'paragraph',
        text: "Most organizations assume their product ideas are good ideas, more or less by default. The evidence says that assumption is wrong more often than it's right.",
      },
      {
        type: 'paragraph',
        text: 'Ronny Kohavi, who built and ran large-scale controlled-experimentation platforms at Microsoft, Bing, and later Airbnb, has published some of the most extensively reviewed data available on this question—what actually happens when a shipped idea is tested against a real, randomized control group instead of just being assumed to work. The pattern holds with remarkable consistency across very different companies: at Microsoft, roughly two-thirds of tested ideas failed to improve the metric they were built to improve. At Bing, the failure rate ran higher still, around 85%. At Airbnb, roughly 92%. Booking.com, running more concurrent experiments than almost any company in the world, has reported a similar result—the large majority of ideas its own product teams believed would help did not, when actually measured.',
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
        text: 'These are not companies with weak product instincts. They are among the most sophisticated, data-driven product organizations in the industry, and their own numbers say the same thing: most ideas that look good enough to build turn out not to earn their cost once someone checks.',
      },
      {
        type: 'pullquote',
        text: 'The ideas that survive contact with a controlled test are the exception, not the rule—for everyone, not just for teams that are getting it wrong.',
      },
      { type: 'heading', text: '"It Seemed Like a Good Idea" Isn\'t a Business Case' },
      {
        type: 'paragraph',
        text: "If even the best product organizations in the world are wrong most of the time about which ideas will work, the honest conclusion isn't that those organizations are bad at their jobs. It's that intuition alone was never going to be a reliable filter—and every organization that skips validation and commits delivery capacity straight from \"this seems like a good idea\" is making the same bet those companies' own data shows usually doesn't pay off.",
      },
      {
        type: 'paragraph',
        text: 'Melissa Perri calls the organizational pattern that results from skipping this step the build trap: equating more shipped output with more success, and losing track of whether any particular thing that got shipped actually created value. Her proposed fix reframes the whole problem as a capital allocation question—fund product work the way a venture investor funds a portfolio, putting a small amount of capacity against many unproven ideas, and only committing serious capacity once an idea has evidence behind it.',
      },
      {
        type: 'paragraph',
        text: "That's also the core discipline behind Eric Ries's build-measure-learn loop: treat what you ship as a test of an assumption, not a finished commitment, until the data says otherwise. The goal isn't to move slower. It's to spend the smallest amount of capacity necessary to find out whether an idea is one of the roughly one-in-three that works—before spending the much larger amount of capacity it takes to fully build, harden, and maintain it.",
      },
      { type: 'heading', text: 'The Economics of Checking First' },
      {
        type: 'paragraph',
        text: 'This connects directly to the same economic logic that should govern any prioritization decision: capacity is finite, and every dollar of it committed to an unvalidated feature is a dollar not available for the smaller share of ideas that would have actually earned their investment.',
      },
      {
        type: 'paragraph',
        text: "The fix costs far less than the mistake. A validation step—a small experiment, a narrow release, a real test against real usage—costs a fraction of what building, shipping, and then indefinitely maintaining the wrong thing costs. The organizations with the best data on this question aren't the ones that guess less often. They're the ones that built the discipline to find out before they commit.",
      },
      { type: 'heading', text: 'The Real Question, Asked Earlier' },
      {
        type: 'paragraph',
        text: "Not every feature deserves to be built—not because most product ideas are bad ones, but because most ideas, even from strong teams, don't turn out to be worth what they'd cost until someone actually checks.",
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
];

export function getInsightArticle(slug: string): InsightArticle | undefined {
  return insightArticles.find((a) => a.slug === slug);
}
