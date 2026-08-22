// Full per-phase content ported programmatically from
// assets/html references/PDE-OS_Part1_Foundation.html's `phases`/`spine`
// arrays (extracted via a one-off Node script that evaluated the literal JS
// array, not hand-transcribed, to avoid transcription errors across this much
// content). KaTeX formula placeholder divs were replaced with plain
// '.pdeos-formula' text at extraction time since this project doesn't ship
// KaTeX. 'whyMatters' (research call-out asides -- DORA/PMI/Kohavi stats etc.)
// is ported in full, same as the flow content; rendering/theming for it is a
// separate, deliberately deferred pass.
export interface PdeosFlowArtifact {
  t: 'artifact';
  tag: string;
  html: string;
  wide?: boolean;
  matchStepWidth?: boolean;
}
export interface PdeosFlowStep {
  t: 'step';
  label: string;
  sub: string;
  collapsible?: boolean;
  nested?: boolean;
  highlight?: boolean;
}
export interface PdeosFlowCase {
  t: 'case';
  label: string;
  sub: string;
  highlight?: boolean;
  matchStepWidth?: boolean;
}
export interface PdeosFlowLoop {
  t: 'loop';
  label: string;
  sub: string;
}
export interface PdeosFlowDecision {
  t: 'decision';
  label: string;
  branches: { tone: 'go' | 'stop'; tag: string; text: string }[];
}
export type PdeosFlowNode = PdeosFlowArtifact | PdeosFlowStep | PdeosFlowCase | PdeosFlowLoop | PdeosFlowDecision;

export interface PdeosPhaseDetail {
  n: number;
  name: string;
  short: string;
  exq: string;
  purpose: string;
  outcome: string;
  goal: string;
  practices: string;
  roles: string[];
  roleNote?: string;
  spineTags: string[];
  flow: PdeosFlowNode[];
  whyMatters?: string;
}

export interface SpineLeak {
  name: string;
  d: string;
}
export interface SpineDimension {
  name: string;
  def: string;
  leaks?: SpineLeak[];
}

export const pdeosPhaseDetails: PdeosPhaseDetail[] = [
  {
    "n": 1,
    "name": "Discover",
    "short": "Price the opportunity",
    "exq": "Are we investing in the right opportunity?",
    "purpose": "Understand it, price it, decide — before a dollar is spent.",
    "outcome": "Approved investment.",
    "goal": "Maximize portfolio ROI.",
    "practices": "Strategic alignment, opportunity assessment, portfolio prioritization, business case & investment analysis.",
    "whyMatters": "<div class=\"result-callout\"><div class=\"k\">The cost of ignoring delay</div><p>85% of PMs don't know their Cost of Delay — and gut estimates miss it by up to <strong>50:1</strong>.</p><p class=\"rc-cite\">From: The Principles of Product Development Flow, 2009 by Don Reinertsen</p></div><div class=\"shift-grid\"><div class=\"shift-card old\"><h4>Without CD3</h4><ul><li>Backlogs prioritized by opinion, not urgency</li><li>Wait time treated as free — WIP costs stay invisible</li><li>Capacity and release trade-offs made blind</li></ul></div><div class=\"shift-card new\"><h4>With CD3</h4><ul><li>WIP, batch size, and capacity trade-offs become transparent</li><li>Priority set by value ÷ duration, not gut feel or office politics</li><li>Focus shifts from cost/efficiency to speed and value</li></ul></div></div><p class=\"gk-note\">This is exactly what the ranking and impact numbers above just proved — not gut feel, arithmetic.</p>",
    "roles": [
      "Executive Sponsor",
      "Portfolio / Product Leadership",
      "Technical Advisor (Architecture / Eng Lead)",
      "Finance & Investment Committee"
    ],
    "roleNote": "The Technical Advisor's job here is a lightweight sizing check — an order-of-magnitude Duration estimate, not a blueprint. Real design work happens in Plan (Phase 3).",
    "spineTags": [
      "Investment",
      "Learning"
    ],
    "flow": [
      {
        "t": "step",
        "label": "Identify Opportunity",
        "collapsible": true,
        "sub": "The starting signal — where an investment opportunity gets named before a dollar is spent chasing it."
      },
      {
        "t": "artifact",
        "tag": "Opportunity Details - Example",
        "matchStepWidth": true,
        "html": "<p class=\"pd-detail-text\">This quarter's dashboard shows <strong>checkout conversion down 3 points quarter-over-quarter</strong> — quietly costing revenue nobody's quantified yet. A faster, simpler checkout is the leading hypothesis.</p>"
      },
      {
        "t": "step",
        "label": "Build Business Case",
        "collapsible": true,
        "sub": "What is this opportunity actually costing us by not launching it now?"
      },
      {
        "t": "artifact",
        "tag": "Cost of Delay · The Formula",
        "matchStepWidth": true,
        "html": "<p class=\"impact-intro\">Before deriving a number, here's what Cost of Delay actually measures: value lost per unit of time delayed.</p><div class=\"formula-box\"><div class=\"pdeos-formula\">CoD = ΔValue ÷ ΔTime</div></div><p class=\"gk-note\">ΔValue is what gets built up next. ΔTime is however long the delay lasts — a month, a quarter, whatever the decision window is.</p>"
      },
      {
        "t": "artifact",
        "tag": "Deriving Cost of Delay · Revenue Impact Build-Up",
        "wide": true,
        "html": "<p class=\"impact-intro\">Cost of Delay isn't guessed — it's built up from three concrete inputs. This is a common revenue-modeling technique, not a single official formula — Reinertsen's own principle is simpler: quantify it, even roughly, instead of relying on intuition.</p><div class=\"research-grid grid-3\"><div class=\"research-card\"><div class=\"rc-tag\">Volume</div><p class=\"exp-text\">25,000 monthly checkout sessions — how many transactions are exposed to the problem.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Impact Rate</div><p class=\"exp-text\">3-point conversion drop — the share of that volume now failing to convert.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Value per Unit</div><p class=\"exp-text\">$80 average order value — what one converted checkout is worth.</p></div></div><div class=\"result-callout\"><div class=\"k\">Revenue impact build-up</div><p>25,000 × 3% × $80 = <strong>$60,000/month</strong> — the ΔValue the CoD formula below runs on.</p></div><p class=\"gk-note\">This is the discipline behind the 85%/50:1 stat above: Cost of Delay gets built from named inputs — Volume × Impact Rate × Value per Unit — not eyeballed as a single number.</p>"
      },
      {
        "t": "artifact",
        "tag": "Business case · Cost of Delay",
        "html": "<div class=\"formula-box\"><div class=\"pdeos-formula\">CoD = ΔValue ÷ ΔTime = $60,000 ÷ 1 month = $60,000/month</div></div><div class=\"result-callout\"><div class=\"k\">If a dependency delays the start by 2 months</div><p>Realized loss = $60,000 × 2 = <strong>$120,000</strong> — permanently. Revenue missed in month one and two is never recaptured.</p></div>"
      },
      {
        "t": "step",
        "label": "Opportunity Prioritization",
        "collapsible": true,
        "sub": "Rank the opportunity against everything else competing for the same capacity — before committing to it."
      },
      {
        "t": "artifact",
        "tag": "CD3 · The Formula",
        "html": "<p class=\"impact-intro\">Before ranking anything, here's what CD3 actually measures: value per unit of time, so opportunities of different sizes can be compared on one scale.</p><div class=\"formula-box\"><div class=\"pdeos-formula\">CD3 = Cost of Delay ÷ Duration</div></div><p class=\"gk-note\">Cost of Delay is the numerator built up above. Duration is how long the opportunity takes to deliver — the higher the score, the more value is being lost for every unit of capacity spent waiting.</p>"
      },
      {
        "t": "artifact",
        "tag": "CD3 Ranking",
        "wide": true,
        "html": "<div class=\"cd3-toolbar\"><button class=\"cd3-btn\" onclick=\"sortCD3('fifo',this)\">Rank by FIFO</button><button class=\"cd3-btn\" onclick=\"sortCD3('cod',this)\">Rank by raw CoD</button><button class=\"cd3-btn active\" onclick=\"sortCD3('cd3',this)\">Rank by CD3</button></div><div class=\"table-scroll\"><table class=\"cd3\"><thead id=\"cd3-head\"><tr><th>Rank</th><th>Feature</th><th>Monthly CoD</th><th>Duration</th><th class=\"num-head\">CD3 score (relative)</th><th class=\"num-head\">Delay cost incurred</th></tr></thead><tbody id=\"cd3-body\"></tbody></table></div><div class=\"insight-box\"><div class=\"k\">Executive takeaway</div><p id=\"cd3-insight\"></p></div>"
      },
      {
        "t": "artifact",
        "tag": "Impact Summary · FIFO vs Raw CoD vs CD3",
        "wide": true,
        "html": "<p class=\"impact-intro\">Same four features from the ranking above — only the <strong>order</strong> changes. This is the dollar cost of sequencing by arrival, by raw value, and by CD3.</p><div class=\"table-scroll\"><table class=\"impact-table\"><thead><tr><th>Approach</th><th>Execution order</th><th class=\"num-head\">Total delay cost incurred</th><th>Financial impact / outcome</th></tr></thead><tbody id=\"impact-body\"></tbody></table></div>"
      },
      {
        "t": "decision",
        "label": "Clears the investment bar?",
        "branches": [
          {
            "tone": "go",
            "tag": "Yes — top of the queue",
            "text": "Investment approved. Moves to Validate."
          },
          {
            "tone": "stop",
            "tag": "No — CD3 too low",
            "text": "Held in backlog, revisited next planning cycle."
          }
        ]
      }
    ]
  },
  {
    "n": 2,
    "name": "Validate",
    "short": "Prove it's real",
    "exq": "Are we solving the right customer problem?",
    "purpose": "Prove the problem is real before spending engineering capacity.",
    "outcome": "Validated problem.",
    "goal": "Reduce investment risk.",
    "practices": "Customer research, experimentation, assumption mapping, and an Economic Definition of Ready — BDD acceptance criteria plus architecture fitness functions.",
    "whyMatters": "<div class=\"insight-teaser\" onclick=\"this.classList.toggle('open')\"><div class=\"it-tease\"><span>Even at Microsoft and Airbnb, most tested ideas don't work — click to see why validating first matters.</span><span class=\"it-caret\">▾</span></div><div class=\"it-detail\"><p><strong>Ronny Kohavi's experimentation research (Microsoft, Airbnb):</strong> At Microsoft's experimentation platform, only about <strong>one-third</strong> of rigorously tested ideas actually improved the target metric — the rest were flat or negative. At Airbnb, out of <strong>250 ideas tested</strong>, only <strong>20 had a positive impact</strong>.</p><p class=\"gk-note\">This is exactly why Faster Checkout was validated with an 18% click-through fake-door test before a single line of production code was written — not after. Most ideas don't survive contact with real customers; the fake-door test is what keeps that risk off the engineering budget.</p></div></div>",
    "roles": [
      "Product Manager",
      "UX Researcher",
      "Customers & End Users"
    ],
    "spineTags": [
      "Risk",
      "Value"
    ],
    "flow": [
      {
        "t": "step",
        "label": "Customer research",
        "collapsible": true,
        "sub": "Funnel analytics plus exit interviews on the checkout flow."
      },
      {
        "t": "artifact",
        "tag": "Customer research · Objective assessment (example: Hotjar)",
        "wide": true,
        "html": "<p class=\"impact-intro\">One way to turn qualitative UX research into board-ready evidence: pair heatmaps, session recordings, surveys, and funnel data before committing engineering capacity. Example below uses Hotjar — any tool covering these four capabilities works the same way.</p><div class=\"research-grid\"><div class=\"research-card\"><div class=\"rc-tag\">Heatmaps</div><ul class=\"research-list\"><li class=\"research-stat\"><strong>68%</strong> of clicks cluster on the payment step's back button.</li><li class=\"research-stat\"><strong>23%</strong> of sessions show rapid repeat-clicking on the \"Apply Promo Code\" field (rage clicks).</li><li class=\"research-stat\">Only <strong>54%</strong> of users scroll far enough to see the express-checkout option.</li></ul></div><div class=\"research-card\"><div class=\"rc-tag\">Session Recordings</div><ul class=\"research-list\"><li class=\"research-stat\"><strong>42%</strong> of abandoning sessions show card details entered twice.</li><li class=\"research-stat\"><strong>17%</strong> of sessions show users clicking non-interactive trust badges (dead clicks).</li><li class=\"research-stat\"><strong>1 in 5</strong> sessions show a user entering the payment step and immediately going back (u-turn).</li></ul></div><div class=\"research-card\"><div class=\"rc-tag\">Surveys / Feedback</div><ul class=\"research-list\"><li class=\"research-stat\"><strong>58%</strong> cite \"too many steps\" as the reason for leaving (n=214).</li><li class=\"research-stat\">Checkout-specific satisfaction sits <strong>22 points</strong> below the site average.</li><li class=\"research-stat\">\"Didn't trust it with my card\" is the <strong>#2</strong> recurring theme across 340 responses.</li></ul></div><div class=\"research-card\"><div class=\"rc-tag\">Funnels</div><ul class=\"research-list\"><li class=\"research-stat\"><strong>31%</strong> drop-off at payment vs. 8% average at prior steps.</li><li class=\"research-stat\">Median time on the payment step is <strong>3x longer</strong> than any other step.</li><li class=\"research-stat\">Mobile abandonment is <strong>14 points</strong> higher than desktop at this exact step.</li></ul></div></div>"
      },
      {
        "t": "step",
        "label": "Assumption mapping",
        "collapsible": true,
        "sub": "Why are users actually abandoning at the payment step?"
      },
      {
        "t": "artifact",
        "tag": "Assumption mapping · Impact vs. evidence",
        "wide": true,
        "html": "<p class=\"impact-intro\">Plot what you believe against how much evidence backs it up — so you test the riskiest guess first, not the loudest one.</p><div class=\"assump-grid\"><div></div><div class=\"assump-axis\">Low evidence</div><div class=\"assump-axis\">High evidence</div><div class=\"assump-axis\">High impact</div><div class=\"assump-cell priority\"><div class=\"ac-tag\">Test next</div><p>Step-count is the abandonment driver — not price or trust.</p></div><div class=\"assump-cell validated\"><div class=\"ac-tag\">Already validated</div><p>Payment step is the single biggest drop-off point.</p></div><div class=\"assump-axis\">Low impact</div><div class=\"assump-cell parked\"><div class=\"ac-tag\">Parked</div><p>Users want more payment method options.</p></div><div class=\"assump-cell noted\"><div class=\"ac-tag\">Noted, low priority</div><p>Mobile abandons slightly more than desktop.</p></div></div>"
      },
      {
        "t": "case",
        "label": "Case in point — Faster Checkout",
        "highlight": true,
        "sub": "All four signals — heatmaps, recordings, surveys, and funnel data — point to the same root cause: step count, not price or trust. That's what earns Faster Checkout a green light to prototype."
      },
      {
        "t": "step",
        "label": "Validate with a lightweight experiment",
        "collapsible": true,
        "sub": "A fake-door test on the proposed one-click flow — before a line of production code is written."
      },
      {
        "t": "artifact",
        "tag": "Experiment design · Fake-door test",
        "wide": true,
        "html": "<p class=\"impact-intro\">Lock these in before the test runs — before you see any data.</p><div class=\"research-grid\"><div class=\"research-card\"><div class=\"rc-tag\">Hypothesis</div><p class=\"exp-text\">Users will attempt one-click checkout if it's offered — confirming step-count, not price or trust, drives abandonment.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Test</div><p class=\"exp-text\">A live \"One-Click Checkout\" button is added to the real flow. Clicking opens a \"launching soon — notify me\" capture. No backend functionality is built yet.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Success metric</div><p class=\"exp-text\">% of checkout sessions that click the one-click option.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Threshold (pre-registered)</div><p class=\"exp-text\"><strong>≥15%</strong> click-through — set before the test runs, not adjusted after.</p></div></div><div class=\"result-callout\"><div class=\"k\">Two-week test result</div><p><strong>18% click-through</strong> — clears the 15% threshold. Faster Checkout is validated to move to Plan.</p></div>"
      },
      {
        "t": "decision",
        "label": "Problem validated?",
        "branches": [
          {
            "tone": "go",
            "tag": "Yes — confidence is high",
            "text": "Moves to Plan."
          },
          {
            "tone": "stop",
            "tag": "No — reframe first",
            "text": "Kill or reframe the problem before spending design capacity."
          }
        ]
      }
    ]
  },
  {
    "n": 3,
    "name": "Plan",
    "short": "Design the blueprint",
    "exq": "Are we designing the right solution?",
    "purpose": "Turn a validated problem into a buildable, de-risked blueprint.",
    "outcome": "Implementation blueprint.",
    "goal": "Reduce downstream rework.",
    "practices": "Architecture & UX design, FMEA risk scoring, NFR economic budgeting, cross-functional design review.",
    "whyMatters": "<div class=\"insight-teaser\" onclick=\"this.classList.toggle('open')\"><div class=\"it-tease\"><span>47% of failed projects fail because of bad requirements — click to see the real cost.</span><span class=\"it-caret\">▾</span></div><div class=\"it-detail\"><p><strong>PMI · Pulse of the Profession research:</strong> Inaccurate requirements management is the single largest driver of project failure PMI tracks — cited in <strong>47%</strong> of unsuccessful projects. And for every <strong>$1 billion</strong> spent on a failed project, <strong>$135 million</strong> is lost permanently.</p><p class=\"gk-note\">This is exactly what BDD acceptance criteria, NFR budgeting, and FMEA are built to prevent — getting the requirement, the risk, and the architecture right before a single sprint is spent building the wrong thing.</p></div></div>",
    "roles": [
      "Product Manager",
      "Solution Architect",
      "UX / UI Designer"
    ],
    "spineTags": [
      "Quality",
      "Risk"
    ],
    "flow": [
      {
        "t": "step",
        "label": "Define acceptance criteria (BDD)",
        "collapsible": true,
        "sub": "Given / When / Then scenarios for the new checkout flow."
      },
      {
        "t": "artifact",
        "tag": "Acceptance criteria · BDD example (Faster Checkout)",
        "wide": true,
        "html": "<div class=\"research-grid\"><div class=\"research-card\"><div class=\"rc-tag\">Behavior-Driven Development (BDD)</div><p class=\"exp-text\">Acceptance criteria written in plain, structured language before design or code begins — so product, engineering, and QA agree on \"done\" from one shared spec, not three interpretations.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Gherkin Style</div><p class=\"exp-text\">The Given / When / Then syntax used to write those scenarios — structured enough to drive automated tests, plain enough for a non-technical stakeholder to read and approve.</p></div></div><div class=\"gherkin-box\"><div class=\"gk-feature\">Feature: One-click checkout</div><div class=\"gk-scenario\">Scenario: Returning customer with a saved payment method</div><div><span class=\"gk-kw\">Given</span> a returning customer is logged in with a saved payment method</div><div><span class=\"gk-kw\">When</span> they select \"Buy with One-Click\"</div><div><span class=\"gk-kw\">Then</span> the order is confirmed immediately</div><div><span class=\"gk-kw\">And</span> a confirmation email is sent within 30 seconds</div><div><span class=\"gk-kw\">And</span> payment is routed through the existing fraud-check service</div><div class=\"gk-scenario\">Scenario: Guest checkout has no saved payment method</div><div><span class=\"gk-kw\">Given</span> a customer is browsing as a guest</div><div><span class=\"gk-kw\">When</span> they reach the checkout page</div><div><span class=\"gk-kw\">Then</span> the one-click option is hidden</div><div><span class=\"gk-kw\">And</span> they are routed to the standard multi-step flow</div></div><p class=\"gk-note\">Because the guest-checkout edge case was specified here, the architecture in the next step already accounts for it — instead of surfacing as a bug after launch.</p>"
      },
      {
        "t": "step",
        "label": "Architecture & UX design",
        "collapsible": true,
        "sub": "Blueprint for a one-click payment path."
      },
      {
        "t": "artifact",
        "tag": "NFR (Non-Functional Requirement) economic budgeting",
        "wide": true,
        "html": "<p class=\"impact-intro\">A non-functional requirement's target isn't a technical ideal — it's a business-impact threshold.</p><div class=\"research-grid grid-3\"><div class=\"research-card\"><div class=\"rc-tag\">Latency Budget</div><p class=\"exp-text\">Every 100ms of added checkout latency costs ~1% conversion. Budget: <strong>under 2 seconds</strong> page load — caps acceptable revenue risk.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Availability Budget</div><p class=\"exp-text\">This path isn't payment-critical — the cost of an extra nine of uptime outweighs the revenue at risk. Budget: <strong>99.9%</strong>, not 99.99%.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Compliance Scope Budget</div><p class=\"exp-text\">Reusing the existing fraud-check service avoids a full PCI (Payment Card Industry) re-certification. Budget: <strong>$0 incremental compliance cost</strong> vs. an estimated $150K+ to re-certify a new path.</p></div></div><div class=\"wo-toggle\" onclick=\"this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')\"><span class=\"wo-chevron\">▸</span> Why 99.9%, not 99.99% — click to expand</div><div class=\"wo-collapsible\"><div class=\"result-callout\"><div class=\"k\">What each \"nine\" actually buys</div><p>99% ≈ 3.65 days of downtime a year. 99.9% ≈ 8.76 hours a year. 99.99% ≈ 52.6 minutes a year — the \"extra nine\" chases a roughly <strong>10x tighter</strong> tolerance.</p></div><p class=\"gk-note\">That tenfold tightening usually means real infrastructure spend: redundancy, failover, tighter monitoring, on-call coverage. Worth it for the payment processing itself — not for this path, which routes through the existing fraud-check service either way. Budgeting at 99.9% puts that engineering effort where it actually protects revenue, not where it just looks more impressive on a dashboard.</p></div><p class=\"gk-note\">These aren't just architecture targets — they're the economic guardrails FMEA checks against next.</p>"
      },
      {
        "t": "artifact",
        "tag": "Build vs. Buy vs. Reuse",
        "wide": true,
        "html": "<p class=\"impact-intro\">Three ways to close the fraud-check gap flagged next in FMEA — only one was economically justified.</p><div class=\"table-scroll\"><table class=\"impact-table\"><thead><tr><th>Approach</th><th>Cost</th><th>Speed to market</th><th>Risk</th></tr></thead><tbody><tr><td><strong>Build New</strong></td><td>High — new fraud engine, ongoing maintenance</td><td>Slowest — 8–10 weeks</td><td>Highest — untested logic in a payment-critical path</td></tr><tr><td><strong>Buy (Vendor)</strong></td><td>Medium — licensing + integration fees</td><td>Medium — 3–4 weeks</td><td>Medium — vendor lock-in, still needs PCI review</td></tr><tr class=\"impact-highlight\"><td><strong>Reuse Existing</strong><div class=\"impact-sub\">Chosen</div></td><td>Lowest — $0 incremental, already PCI-certified</td><td>Fastest — ~1 week to wire in</td><td>Lowest — proven in production already</td></tr></tbody></table></div><p class=\"gk-note\">Reuse wasn't the cautious choice — it was the economically correct one. That's why the FMEA case box below treats it as a given.</p>"
      },
      {
        "t": "step",
        "label": "Risk scoring (FMEA)",
        "collapsible": true,
        "sub": "FMEA (Failure Mode and Effects Analysis): list the ways a system could fail, then score each by severity × likelihood × detectability — so costly risks surface before you build, not after."
      },
      {
        "t": "artifact",
        "tag": "Risk scoring · FMEA example (Faster Checkout)",
        "wide": true,
        "html": "<div class=\"formula-box\"><div class=\"pdeos-formula\">RPN = Severity × Likelihood × Detectability</div></div><p class=\"impact-intro\">RPN (Risk Priority Number) ranks failure modes 1–10 on each factor. Detectability is inverted — a 10 means \"we won't catch it until it's too late.\"</p><div class=\"table-scroll\"><table class=\"impact-table\"><thead><tr><th>Failure Mode</th><th class=\"num-head\">Severity</th><th class=\"num-head\">Likelihood</th><th class=\"num-head\">Detectability</th><th class=\"num-head\">RPN</th></tr></thead><tbody><tr class=\"impact-highlight\"><td><strong>One-click bypasses fraud checks</strong></td><td class=\"num-cell\">9</td><td class=\"num-cell\">4</td><td class=\"num-cell\">6</td><td class=\"num-cell impact-total\">216</td></tr><tr><td>Duplicate order from double-click</td><td class=\"num-cell\">5</td><td class=\"num-cell\">3</td><td class=\"num-cell\">3</td><td class=\"num-cell impact-total\">45</td></tr><tr><td>Saved card expires mid-session</td><td class=\"num-cell\">3</td><td class=\"num-cell\">5</td><td class=\"num-cell\">2</td><td class=\"num-cell impact-total\">30</td></tr></tbody></table></div><p class=\"gk-note\">RPN above 100 triggers a design change before the sprint. Only the fraud-check gap clears that bar — which is exactly the finding the case box below acts on.</p>"
      },
      {
        "t": "case",
        "label": "Case in point — Faster Checkout",
        "highlight": true,
        "sub": "FMEA flags \"one-click could bypass fraud checks\" as high severity. Design adds an async fraud check before confirmation — before it ever reaches a sprint."
      },
      {
        "t": "step",
        "label": "Test Strategy (TDD)",
        "collapsible": true,
        "sub": "TDD (Test-Driven Development) planning: name every test the team will need — from acceptance criteria, risk findings, and NFR budgets — before a single sprint starts. That's Quality Investment in practice, not an afterthought."
      },
      {
        "t": "artifact",
        "tag": "Test Plan · TDD Coverage (Faster Checkout)",
        "wide": true,
        "html": "<p class=\"impact-intro\">Every test TDD will write in Phase 4 is already named here — derived from what's already been decided in this phase, not invented at Build time.</p><div class=\"table-scroll\"><table class=\"impact-table\"><thead><tr><th>ID</th><th>Planned test case</th><th>Derived from</th></tr></thead><tbody><tr><td><strong>TC-1</strong></td><td><code>buyWithOneClick_confirmsImmediately_forReturningCustomer</code></td><td>BDD spec (above)</td></tr><tr><td><strong>TC-2</strong></td><td><code>oneClickOption_hidden_forGuestCheckout</code></td><td>BDD spec (above)</td></tr><tr><td><strong>TC-3</strong></td><td><code>buyWithOneClick_routesThroughFraudCheck_beforeConfirming</code></td><td>FMEA finding (above)</td></tr><tr><td><strong>TC-4</strong></td><td><code>checkoutPage_loadsUnder2Seconds</code></td><td>NFR latency budget (above)</td></tr></tbody></table></div><p class=\"gk-note\">This is what \"test-first\" really means at the initiative level: tests aren't a Build-time decision, they're a Design-time commitment — Guiding Principle 5 in practice, before a single sprint starts.</p>"
      },
      {
        "t": "step",
        "label": "Update Requirement Backlog",
        "collapsible": true,
        "sub": "Roll every business and technical requirement surfaced during Plan into one running backlog — tagged and traceable, so Sprint Planning starts from a complete list, not a partial one."
      },
      {
        "t": "artifact",
        "tag": "Requirement Backlog · Faster Checkout",
        "wide": true,
        "html": "<p class=\"impact-intro\">What Plan hands off to Deliver — every business and technical requirement generated in this phase, not yet sized, with test coverage already defined above. Sprint Planning turns this into real days next.</p><div class=\"table-scroll\"><table class=\"impact-table\"><thead><tr><th>Story</th><th>Type</th><th>Output From</th><th>Test Coverage</th></tr></thead><tbody><tr><td>One-click checkout confirmation</td><td>Requirement</td><td>BDD spec (above)</td><td>TC-1</td></tr><tr><td>Guest checkout fallback</td><td>Requirement</td><td>BDD spec (above)</td><td>TC-2</td></tr><tr><td>Async fraud-check integration</td><td>Technical / Enabler</td><td>Build vs. Buy vs. Reuse (above)</td><td>TC-3</td></tr><tr><td>NFR compliance validation</td><td>Technical / Enabler</td><td>NFR economic budgeting (above)</td><td>TC-4</td></tr></tbody></table></div><p class=\"gk-note\">Four items — two requirements, two technical enablers. The Apple Pay / Google Pay wallet deferral in the debt ledger below stays off this list; it's explicitly out of scope for this release, not a gap. This is what Sprint Planning sizes next, in full — not story by story as surprises turn up.</p>"
      },
      {
        "t": "artifact",
        "tag": "Technical debt ledger · Faster Checkout",
        "wide": true,
        "html": "<p class=\"impact-intro\">Not every gap needs to block launch — some can be consciously deferred, as long as the repayment is committed, not just implied.</p><div class=\"debt-ledger\"><div class=\"dl-row\"><div class=\"dl-label\">Debt taken</div><div class=\"dl-value\">One-click checkout ships with saved cards only — Apple Pay / Google Pay wallet support is deferred.</div></div><div class=\"dl-row\"><div class=\"dl-label\">Why</div><div class=\"dl-value\">Full wallet support adds <strong>~3 weeks</strong> to the timeline; card-only already covers <strong>80%</strong> of returning-customer volume.</div></div><div class=\"dl-row\"><div class=\"dl-label\">Repayment commitment</div><div class=\"dl-value\">Wallet support added in <strong>Sprint+2</strong>, owned by the Mobile Squad, committed date — tracked as a backlog item, not a hope.</div></div></div><p class=\"gk-note\">Debt without a committed repayment date isn't debt — it's just an unfixed bug. This is what feeds the Learning phase's loop back into the next Strategy &amp; Investment cycle. It stays off the requirement backlog above — deferred, not dropped.</p>"
      },
      {
        "t": "decision",
        "label": "Rework risk acceptable?",
        "branches": [
          {
            "tone": "go",
            "tag": "Yes — blueprint approved",
            "text": "Moves to Deliver."
          },
          {
            "tone": "stop",
            "tag": "No — redesign",
            "text": "Redesign the flagged risk area first."
          }
        ]
      }
    ]
  },
  {
    "n": 4,
    "name": "Deliver",
    "short": "Build it right",
    "exq": "Are we delivering efficiently while maintaining quality?",
    "purpose": "Build it right, on pace, without cutting corners.",
    "outcome": "Working software.",
    "goal": "Maximize throughput.",
    "practices": "Sprint Planning, Sprint Execution, WIP limits, TDD, testing, coordination-ratio tracking.",
    "whyMatters": "<div class=\"insight-teaser\" onclick=\"this.classList.toggle('open')\"><div class=\"it-tease\"><span>Elite performers are 2x more likely to hit their profitability targets — click to see the research.</span><span class=\"it-caret\">▾</span></div><div class=\"it-detail\"><p><strong>DORA (Google Cloud) · Accelerate research:</strong> Elite DevOps performers deploy code <strong>46x more frequently</strong> and run <strong>7x lower change-failure rates</strong> than low performers — and organizations with high DORA maturity are <strong>twice as likely</strong> to exceed their profitability targets.</p><p class=\"gk-note\">This is what Sprint Planning, BUILD, and TEST protect in this framework — not process for its own sake, but the discipline independently shown to correlate with hitting profitability targets, not just shipping faster.</p></div></div>",
    "roles": [
      "Engineering Team",
      "Tech Lead",
      "Delivery Lead / Scrum Master",
      "QA Engineer",
      "Executive Sponsor",
      "Portfolio / Product Leadership"
    ],
    "roleNote": "Executive Sponsor and Portfolio Leadership are secondary participants here — present for the weekly Sponsor Cadence below, not doing the building. They're Informed, but retain real decision authority to escalate or unblock.",
    "spineTags": [
      "Flow",
      "Quality"
    ],
    "flow": [
      {
        "t": "step",
        "label": "Sprint Planning",
        "collapsible": true,
        "sub": "The team sizes the full backlog from Plan — effort, queue time, and test-writing — before the sprint starts."
      },
      {
        "t": "artifact",
        "tag": "Review Backlog · Faster Checkout",
        "wide": true,
        "html": "<p class=\"impact-intro\">Before sizing, the team reviews exactly what Plan handed off — nothing added, nothing dropped.</p><div class=\"table-scroll\"><table class=\"impact-table\"><thead><tr><th>Story</th><th>Type</th><th>Output From</th><th>Test Coverage</th></tr></thead><tbody><tr><td>One-click checkout confirmation</td><td>Requirement</td><td>Phase 3 · BDD spec</td><td>TC-1</td></tr><tr><td>Guest checkout fallback</td><td>Requirement</td><td>Phase 3 · BDD spec</td><td>TC-2</td></tr><tr><td>Async fraud-check integration</td><td>Technical / Enabler</td><td>Phase 3 · Build vs. Buy vs. Reuse</td><td>TC-3</td></tr><tr><td>NFR compliance validation</td><td>Technical / Enabler</td><td>Phase 3 · NFR Economic Budgeting</td><td>TC-4</td></tr></tbody></table></div><p class=\"gk-note\">Four items reviewed and confirmed. Next: size one as a worked example, then apply the same method to the rest.</p>"
      },
      {
        "t": "artifact",
        "tag": "Derive Effort & Duration · Worked Example",
        "wide": true,
        "html": "<p class=\"impact-intro\">One requirement, sized end-to-end — the same method applies to every item in the backlog above. Touch time below already includes writing tests first (TDD), not extra work discovered later.</p><div class=\"research-grid\"><div class=\"research-card\"><div class=\"rc-tag\">Derive Effort</div><p class=\"exp-text\">Cross-functional blind voting (Planning Poker) on relative size — divergent votes reconcile into one story-point consensus.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Derive Duration</div><p class=\"exp-text\">Turns that story-point estimate into real calendar time — the formula below.</p></div></div><div class=\"formula-box\"><div class=\"pdeos-formula\">Requirement Build Duration = Hands-On Touch Time + Queue & Wait Time</div></div><div class=\"day-strip\"><div class=\"day-box touch\"><div class=\"day-num\">Day 1</div><div class=\"day-label\">Write Tests + Parallel FE / BE Setup</div><div class=\"day-tag\">Touch time</div></div><div class=\"day-box touch\"><div class=\"day-num\">Day 2</div><div class=\"day-label\">Integration &amp; API Binding</div><div class=\"day-tag\">Touch time</div></div><div class=\"day-box queue\"><div class=\"day-num\">Day 3</div><div class=\"day-label\">PR Code Review &amp; Merge</div><div class=\"day-tag\">Queue time</div></div><div class=\"day-box touch\"><div class=\"day-num\">Day 4</div><div class=\"day-label\">QA Validation &amp; Edge-Case Testing</div><div class=\"day-tag\">Touch time</div></div><div class=\"day-box touch\"><div class=\"day-num\">Day 5</div><div class=\"day-label\">Bug Fixes &amp; Staging Sign-off</div><div class=\"day-tag\">Touch time</div></div></div><p class=\"gk-note\">4 days touch time (tests included) + 1 day queue time (PR review wait) = 5-day Requirement Build Duration. Full initiative sizing — all four items — below.</p>"
      },
      {
        "t": "artifact",
        "tag": "Initiative scope · Faster Checkout",
        "wide": true,
        "html": "<p class=\"impact-intro\">All four backlog items were sized the same way — the one-click story above is the worked example. The three rows below them aren't backlog items — they're what Sprint Planning also accounts for to protect quality, not just clear the requirements backlog.</p><div class=\"table-scroll\"><table class=\"impact-table\"><thead><tr><th>Item</th><th>Type</th><th class=\"num-head\">Days</th></tr></thead><tbody><tr><td>Guest checkout fallback</td><td>Requirement</td><td class=\"num-cell impact-total days-lg\">3</td></tr><tr><td>Async fraud-check integration</td><td>Technical / Enabler</td><td class=\"num-cell impact-total days-lg\">5</td></tr><tr><td>NFR compliance validation</td><td>Technical / Enabler</td><td class=\"num-cell impact-total days-lg\">4</td></tr><tr class=\"impact-highlight\"><td><strong>One-click checkout confirmation</strong><div class=\"impact-sub\">Worked example above</div></td><td>Requirement</td><td class=\"num-cell impact-total days-lg\">5</td></tr><tr><td>Cross-story integration &amp; regression QA</td><td>Quality Practice</td><td class=\"num-cell impact-total days-lg\">5</td></tr><tr><td>Staging sign-off &amp; buffer</td><td>Quality Practice</td><td class=\"num-cell impact-total days-lg\">4</td></tr><tr><td>Ceremonies (standups, reviews, retros)</td><td>Scrum Ceremony</td><td class=\"num-cell impact-total days-lg\">4</td></tr><tr class=\"cd3-total-row\"><td colspan=\"2\">Real Duration</td><td class=\"impact-total num-cell days-lg\">30</td></tr></tbody></table></div><p class=\"gk-note\">30 days across three 10-day sprints — the Real Duration for the full initiative, not just the four requirements. Guiding Principle 3 in practice: flow beats utilization, and this is what flow actually costs, shown honestly. Build starts next, on this sizing — not a fresh guess.</p>"
      },
      {
        "t": "step",
        "label": "Sprint Execution (Scrum)",
        "collapsible": true,
        "sub": "The sprint runs day by day — Economic Guardrails, BUILD, and TEST happen here, keeping Sprint Planning's math from drifting."
      },
      {
        "t": "step",
        "label": "BUILD",
        "collapsible": true,
        "nested": true,
        "sub": "Where code gets written — the practices that keep quality in from the first line, not inspected in after."
      },
      {
        "t": "artifact",
        "tag": "Quality Build Practices",
        "wide": true,
        "html": "<div class=\"research-grid\"><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-unit')\"><div class=\"rc-tag\">Unit Testing</div><p class=\"exp-text\">Every function or component gets its own automated test, run continuously — catches breakage the moment it happens, not weeks later.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-review')\"><div class=\"rc-tag\">Code Review</div><p class=\"exp-text\">A second engineer reviews every change before it merges — catches what one person alone would miss.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-static')\"><div class=\"rc-tag\">Static Code Analysis</div><p class=\"exp-text\">Automated tools scan every commit for style, complexity, and security issues before a human ever looks at it.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-tdd')\"><div class=\"rc-tag\">TDD</div><p class=\"exp-text\">Write the test before the code — it defines \"done\" before implementation exists.</p></div></div><p class=\"pd-role-note\">Click a practice above to see it in action.</p><div id=\"qbp-unit\" class=\"wo-collapsible qbp-detail\"><div class=\"tdd-box\"><div class=\"tdd-line\">test('blocks one-click checkout when the saved card has expired')</div><div class=\"tdd-line\">  → expects buyWithOneClick(customerWithExpiredCard).status === 'failed'</div><div class=\"tdd-result pass\">✓ Passes — the FMEA-flagged edge case (saved card expires mid-session) is covered</div></div><p class=\"gk-note\">Every function gets tests like this — not just the happy path proven under TDD, but the edge cases FMEA already flagged as risks.</p></div><div id=\"qbp-review\" class=\"wo-collapsible qbp-detail\"><div class=\"debt-ledger\"><div class=\"dl-row\"><div class=\"dl-label\">Reviewer checks</div><div class=\"dl-value\">Test coverage for the new logic, no hardcoded values, error handling matches the NFR latency budget.</div></div><div class=\"dl-row\"><div class=\"dl-label\">Turnaround</div><div class=\"dl-value\">This is the 1-day queue time already counted in the Requirement Build Duration above — not free, but budgeted.</div></div></div><p class=\"gk-note\">Code Review is where the \"PR Code Review &amp; Merge\" day from Derive Effort &amp; Duration actually happens.</p></div><div id=\"qbp-static\" class=\"wo-collapsible qbp-detail\"><div class=\"tdd-box\"><div class=\"tdd-line\">Scan: checkoutHandler.js</div><div class=\"tdd-line\">0 critical issues</div><div class=\"tdd-line\">1 warning — unused variable on line 42</div><div class=\"tdd-result pass\">✓ 0 security vulnerabilities detected</div></div><p class=\"gk-note\">Runs automatically on every commit — before a human reviewer ever opens the PR.</p></div><div id=\"qbp-tdd\" class=\"wo-collapsible qbp-detail\"><div class=\"research-grid\"><div class=\"research-card\"><div class=\"rc-tag\">Red-Green-Refactor</div><p class=\"exp-text\">The three-step cycle: write a failing test (Red), write the minimum code to pass it (Green), then clean it up without breaking it (Refactor).</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Why It Matters</div><p class=\"exp-text\">A bug caught by a failing test costs a fraction of the same bug caught in QA — or in production. That's Guiding Principle 5: quality is an investment, not a cost.</p></div></div><div class=\"tdd-box\"><div class=\"tdd-stage\"><span class=\"tdd-tag red\">Red</span> write the failing test first — test #1 from Plan</div><div class=\"tdd-line\">test('one-click checkout confirms immediately for a returning customer')</div><div class=\"tdd-line\">  → expects buyWithOneClick(customer).status === 'confirmed'</div><div class=\"tdd-result fail\">✗ Fails — buyWithOneClick() doesn't exist yet</div><div class=\"tdd-stage\"><span class=\"tdd-tag green\">Green</span> minimum code to pass</div><div class=\"tdd-line\">function buyWithOneClick(customer) { return { status: 'confirmed' }; }</div><div class=\"tdd-result pass\">✓ Passes — hardcoded, not real logic yet</div><div class=\"tdd-stage\"><span class=\"tdd-tag refactor\">Refactor</span> real logic, test still green</div><div class=\"tdd-line\">function buyWithOneClick(customer) {</div><div class=\"tdd-line\">  if (!customer.savedPaymentMethod) throw new Error('No saved payment method');</div><div class=\"tdd-line\">  const charge = paymentService.charge(customer);</div><div class=\"tdd-line\">  return { status: charge.success ? 'confirmed' : 'failed' };</div><div class=\"tdd-line\">}</div><div class=\"tdd-result pass\">✓ Still passes</div></div><p class=\"gk-note\">Test #1 from Phase 3's plan, now proven in code — planned at Design time, not invented at Build time. Once green, quality gates re-run it on every commit.</p></div>"
      },
      {
        "t": "step",
        "label": "TEST",
        "collapsible": true,
        "nested": true,
        "sub": "Where quality gets proven before release — automated checks that catch what a human review alone would miss."
      },
      {
        "t": "artifact",
        "tag": "QA Testing Practices",
        "wide": true,
        "html": "<div class=\"research-grid\"><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-continuous')\"><div class=\"rc-tag\">Continuous Testing</div><p class=\"exp-text\">Regression, performance, and load checks run automatically on every commit — one continuous pass, not three separate manual efforts.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-integration')\"><div class=\"rc-tag\">Integration Testing</div><p class=\"exp-text\">Tests the pieces working together as one flow — not each story in isolation.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-security')\"><div class=\"rc-tag\">Security Testing</div><p class=\"exp-text\">Scans for vulnerabilities before release — not discovered by a customer or an attacker.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-ai')\"><div class=\"rc-tag\">AI-Assisted (Agentic) Testing</div><p class=\"exp-text\">Agents generate test cases and explore edge cases a human wouldn't think to write, and self-heal scripts when the UI changes.</p></div></div><p class=\"pd-role-note\">Click a practice above to see it in action.</p><div id=\"qbp-continuous\" class=\"wo-collapsible qbp-detail\"><div class=\"tdd-box\"><div class=\"tdd-line\">Regression: 247/247 passed</div><div class=\"tdd-line\">Performance: checkout page load 1.4s at 500 concurrent users (budget: &lt;2s)</div><div class=\"tdd-result pass\">✓ Load: 0 failures at 3x expected peak traffic</div></div><p class=\"gk-note\">One automated pass replaces what used to be three separate manual efforts — checked against the NFR latency budget from Plan.</p></div><div id=\"qbp-integration\" class=\"wo-collapsible qbp-detail\"><div class=\"tdd-box\"><div class=\"tdd-line\">One-click confirmation → fraud check → email confirmation</div><div class=\"tdd-result pass\">✓ Tested end-to-end as a single customer journey — not four separate story tests</div></div><p class=\"gk-note\">This is the Cross-story integration &amp; regression QA already sized into Sprint Planning above — not new, undiscovered work.</p></div><div id=\"qbp-security\" class=\"wo-collapsible qbp-detail\"><div class=\"tdd-box\"><div class=\"tdd-line\">Scan: checkout-service · fraud-check-integration</div><div class=\"tdd-result pass\">✓ 0 critical vulnerabilities — PCI compliance scan passed</div></div><p class=\"gk-note\">Ties back to the $0 incremental compliance cost from reusing the existing fraud-check service in Plan.</p></div><div id=\"qbp-ai\" class=\"wo-collapsible qbp-detail\"><div class=\"tdd-box\"><div class=\"tdd-line\">Agent-generated coverage: 12 additional edge-case tests</div><div class=\"tdd-result pass\">✓ Includes a session-timeout scenario nobody scoped</div></div><p class=\"gk-note\">TC-1 through TC-4 were planned by the team in Plan. This is what an agent finds beyond that plan — a supplement to planning, not a replacement for it.</p></div>"
      },
      {
        "t": "step",
        "label": "Economic Guardrails",
        "collapsible": true,
        "nested": true,
        "sub": "What keeps the sprint's economics honest while it runs — and what defeats it if nobody's watching."
      },
      {
        "t": "artifact",
        "tag": "Economic Guardrails · Sprint Execution",
        "wide": true,
        "html": "<p class=\"impact-intro\">Guardrails keep the sprint's economics honest while it runs.</p><div class=\"research-grid grid-3\"><div class=\"research-card\"><div class=\"rc-tag\">WIP Limits</div><p class=\"exp-text\">Cap concurrent stories per engineer — multitasking quietly inflates queue time and breaks the Requirement Build Duration math above. Cost shown below.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Build Duration Variance Alert</div><p class=\"exp-text\">Flag any story running past its sized duration — including time stuck in review or QA, not just missed dates. Surfaces drift immediately, not at retro.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Quality Gate Pass Rate</div><p class=\"exp-text\">Track how often gates catch issues, and how often defects still escape to staging — proof Guiding Principle 5 is holding, not just stated.</p></div></div><div class=\"wo-toggle\" onclick=\"this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')\"><span class=\"wo-chevron\">▸</span> Context-switching cost — click to expand</div><div class=\"wo-collapsible\"><div class=\"result-callout\"><div class=\"k\">Why WIP limits matter</div><p>A widely cited rule of thumb (Gerald Weinberg): every extra project in flight taxes the ones already running — time doesn't split cleanly.</p></div><div class=\"table-scroll\"><table class=\"impact-table center-table\"><thead><tr><th>Concurrent stories</th><th>Effective capacity per story</th><th>Lost to switching</th></tr></thead><tbody><tr><td>1</td><td class=\"num-cell\">100%</td><td class=\"num-cell\">0%</td></tr><tr class=\"impact-highlight\"><td>2</td><td class=\"num-cell impact-total\">40%</td><td class=\"num-cell impact-total\">20%</td></tr><tr><td>3</td><td class=\"num-cell\">20%</td><td class=\"num-cell\">40%</td></tr></tbody></table></div><p class=\"gk-note\">Applied to the one-click story above: its 4-day touch time assumed one engineer, one story. Split across two, and 4 days of work doesn't take 8 elapsed days — at 40% effective capacity, it takes roughly 10. That gap is what WIP limits protect against.</p></div><div class=\"wo-label\">Watch-outs — what defeats the guardrails</div><div class=\"debt-ledger\"><div class=\"dl-row\"><div class=\"dl-label\">Utilization theater</div><div class=\"dl-value\">Team looks fully booked, but WIP limits aren't enforced — flow degrades while the board looks green.</div></div><div class=\"dl-row\"><div class=\"dl-label\">Scope absorbed, not re-costed</div><div class=\"dl-value\">Urgent work gets pulled in mid-sprint and absorbed quietly instead of triggering a trade-off — the Sprint Planning math becomes fiction.</div></div><div class=\"dl-row\"><div class=\"dl-label\">Gates overridden under pressure</div><div class=\"dl-value\">\"Ship it, fix it after\" reverses Guiding Principle 5 — the cost isn't avoided, it's multiplied downstream.</div></div><div class=\"dl-row\"><div class=\"dl-label\">Debt without a ledger entry</div><div class=\"dl-value\">Shortcuts during Build should follow Plan's Technical Debt Ledger discipline — deferred with a committed date, not just implied.</div></div></div><p class=\"gk-note\">Track both, not just one — that's what running the sprint well actually means.</p>"
      },
      {
        "t": "step",
        "label": "Sponsor Cadence",
        "collapsible": true,
        "sub": "Weekly, not quarterly — the Sponsor sees the same numbers the team does, not a polished summary."
      },
      {
        "t": "artifact",
        "tag": "Sponsor Cadence · Weekly Reporting",
        "wide": true,
        "html": "<div class=\"research-grid\"><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-flowhealth')\"><div class=\"rc-tag\">Flow Health</div><p class=\"exp-text\">WIP status at a glance — running clean or over capacity.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-buildvariance')\"><div class=\"rc-tag\">Build Duration Variance</div><p class=\"exp-text\">Are we tracking to the Real Duration budget from Sprint Planning, or drifting.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-gatepass')\"><div class=\"rc-tag\">Quality Gate Pass Rate</div><p class=\"exp-text\">Is quality holding under the pace.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-escalation')\"><div class=\"rc-tag\">Risk & Escalation Log</div><p class=\"exp-text\">What's being watched before it's a problem, and what the Sponsor actually unblocked or decided that week.</p></div></div><p class=\"pd-role-note\">Click a metric above to see it in action.</p><div id=\"qbp-flowhealth\" class=\"wo-collapsible qbp-detail\"><div class=\"tdd-box\"><div class=\"tdd-line\">WIP this week: 6 stories / 6 engineers — 1:1, within limit</div><div class=\"tdd-result pass\">✓ No context-switching penalty active</div></div><p class=\"gk-note\">Same WIP Limit guardrail from Sprint Execution above — this is the Sponsor's view of it, not a separate number.</p></div><div id=\"qbp-buildvariance\" class=\"wo-collapsible qbp-detail\"><div class=\"table-scroll\"><table class=\"impact-table center-table\"><thead><tr><th>Week</th><th>Planned (Real Duration pace)</th><th>Actual</th><th>Variance</th></tr></thead><tbody><tr><td>1</td><td class=\"num-cell\">10 days</td><td class=\"num-cell\">10 days</td><td class=\"num-cell\">On pace</td></tr><tr><td>2</td><td class=\"num-cell\">10 days</td><td class=\"num-cell\">11 days</td><td class=\"num-cell impact-total\">+1 day</td></tr><tr class=\"impact-highlight\"><td>3</td><td class=\"num-cell\">10 days</td><td class=\"num-cell\">10 days</td><td class=\"num-cell impact-total\">Recovered</td></tr></tbody></table></div><p class=\"gk-note\">Week 2's one-day slip (PR review backlog) surfaced here before it could compound — the Sponsor saw it the same week it happened, not at the 30-day audit.</p></div><div id=\"qbp-gatepass\" class=\"wo-collapsible qbp-detail\"><div class=\"research-grid grid-3\"><div class=\"research-card\"><div class=\"rc-tag\">Gates Run</div><p class=\"exp-text\">18 this sprint.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Pass Rate</div><p class=\"exp-text\">94% first-pass.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Escaped to Staging</div><p class=\"exp-text\">0.</p></div></div><p class=\"gk-note\">Guiding Principle 5 holding under real sprint pace — not just stated in a retro.</p></div><div id=\"qbp-escalation\" class=\"wo-collapsible qbp-detail\"><div class=\"wo-label\">Risk Register — what's being watched</div><div class=\"table-scroll\"><table class=\"impact-table\"><thead><tr><th>Risk</th><th class=\"num-head\">Likelihood</th><th>Owner</th><th>Status</th></tr></thead><tbody><tr><td>PR review backlog growing</td><td class=\"num-cell\">Medium</td><td>Tech Lead</td><td>Watching</td></tr><tr><td>Wallet-support scope creep request</td><td class=\"num-cell\">Low</td><td>Product Manager</td><td>Watching</td></tr><tr><td>Fraud-check service rate limit under load</td><td class=\"num-cell\">Low</td><td>Engineering Team</td><td>Watching</td></tr></tbody></table></div><div class=\"wo-label\">Decision Log — what got escalated and resolved</div><div class=\"debt-ledger\"><div class=\"dl-row\"><div class=\"dl-label\">Week 2 — PR review backlog</div><div class=\"dl-value\">Tech Lead flagged the review bottleneck and proposed a fix; Sponsor approved a temporary second reviewer to clear the queue — avoided a second week of slippage.</div></div><div class=\"dl-row\"><div class=\"dl-label\">Week 3 — Wallet support timing</div><div class=\"dl-value\">Sponsor confirmed the Sprint+2 repayment date from the Technical Debt Ledger still holds — no change to committed scope.</div></div></div><p class=\"gk-note\">Week 2's decision traces straight back to a risk already sitting in the register above — that's proactive tracking turning into an actual call, not a surprise. This is \"Informed and Accountable\" in practice.</p></div>"
      },
      {
        "t": "step",
        "label": "Sprint Review",
        "collapsible": true,
        "sub": "The demo that closes the sprint — did we build what stakeholders actually needed, not just what was specified?"
      },
      {
        "t": "artifact",
        "tag": "Sprint Review · Faster Checkout",
        "wide": true,
        "html": "<div class=\"research-grid\"><div class=\"research-card\"><div class=\"rc-tag\">What Was Demoed</div><p class=\"exp-text\">The completed increment, live in staging: one-click confirmation and the guest checkout fallback.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Stakeholder Feedback Captured</div><p class=\"exp-text\">Product Manager and UX flag that the confirmation screen doesn't show the order total — a gap the BDD spec never caught, because it was never in front of a real screen until now.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Backlog Impact</div><p class=\"exp-text\">Logged as a new backlog item for next sprint — not a reopened defect.</p></div></div><p class=\"gk-note\">BUILD and TEST would have shipped this exactly as specified and never caught it — it wasn't wrong, it was incomplete. That's the difference between verification (did we build it right) and validation (did we build the right thing) — Sprint Review is where validation actually happens.</p>"
      },
      {
        "t": "step",
        "label": "Sprint Retro",
        "collapsible": true,
        "sub": "Not a shared feeling that the sprint was rough — a decision about what changes before the next one starts."
      },
      {
        "t": "artifact",
        "tag": "Sprint Retro Practices",
        "wide": true,
        "html": "<div class=\"research-grid grid-3\"><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-retrometrics')\"><div class=\"rc-tag\">Metrics Trend Review</div><p class=\"exp-text\">Throughput, Build Duration Variance, WIP breaches, and Quality Gate Pass Rate — as a trend, not a single-sprint snapshot.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-recal')\"><div class=\"rc-tag\">Recalibration Check</div><p class=\"exp-text\">Is the team durably faster, or was one sprint just lighter — the test before touching the reference story.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-fixlog')\"><div class=\"rc-tag\">Process Fix Log</div><p class=\"exp-text\">Friction turned into a one-time fix — not a repeated complaint.</p></div></div><p class=\"pd-role-note\">Click a practice above to see it in action.</p><div id=\"qbp-retrometrics\" class=\"wo-collapsible qbp-detail\"><div class=\"table-scroll\"><table class=\"impact-table center-table\"><thead><tr><th>Metric</th><th>Sprint 1</th><th>Sprint 2</th><th>Sprint 3</th></tr></thead><tbody><tr><td>Throughput (stories completed)</td><td class=\"num-cell\">4</td><td class=\"num-cell\">4</td><td class=\"num-cell\">5</td></tr><tr><td>Build Duration Variance</td><td class=\"num-cell\">On pace</td><td class=\"num-cell\">+1 day</td><td class=\"num-cell\">Recovered</td></tr><tr><td>WIP limit breaches</td><td class=\"num-cell\">0</td><td class=\"num-cell\">1</td><td class=\"num-cell\">0</td></tr><tr class=\"impact-highlight\"><td>Quality Gate Pass Rate</td><td class=\"num-cell impact-total\">92%</td><td class=\"num-cell impact-total\">94%</td><td class=\"num-cell impact-total\">94%</td></tr></tbody></table></div><p class=\"gk-note\">Velocity isn't on this list on purpose — it's a planning input, not a scorecard. Showing it as a headline number invites gaming.</p></div><div id=\"qbp-recal\" class=\"wo-collapsible qbp-detail\"><div class=\"research-grid\"><div class=\"research-card\"><div class=\"rc-tag\">One Good Sprint</div><p class=\"exp-text\">Don't touch the reference story. Could be a lighter backlog, not real improvement.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">3-Sprint Trend + Named Cause</div><p class=\"exp-text\">Re-baseline. The team can point to exactly why — not just that it \"felt faster.\"</p></div></div><div class=\"result-callout\"><div class=\"k\">This retro's finding</div><p>Fraud-check integration touch time is down from 2 days to 0.5 days across the last three sprints — the team no longer needs discovery time for that service. Reference story re-baselined.</p></div><p class=\"gk-note\">This is the positive mirror of Build Duration Variance — catching durable improvement early keeps future CD3 scores in Phase 1 from being deflated by outdated sizing.</p></div><div id=\"qbp-fixlog\" class=\"wo-collapsible qbp-detail\"><div class=\"debt-ledger\"><div class=\"dl-row\"><div class=\"dl-label\">PR review backlog (Sprint 2)</div><div class=\"dl-value\">Already flagged in Sponsor Cadence's Risk Register, owned by the Tech Lead. Fix: a second reviewer added to the permanent rotation, not just a one-sprint patch.</div></div></div><p class=\"gk-note\">This is what keeps every future Sprint Planning duration estimate honest — friction fixed once, not re-paid every sprint.</p></div>"
      },
      {
        "t": "case",
        "label": "Case in point — Faster Checkout",
        "highlight": true,
        "sub": "A quality gate catches a tax-calculation regression before it reaches staging — caught in minutes, not in production."
      },
      {
        "t": "decision",
        "label": "Gates passed?",
        "branches": [
          {
            "tone": "go",
            "tag": "Yes — ready to release",
            "text": "Moves to Release."
          },
          {
            "tone": "stop",
            "tag": "No — fix & re-test",
            "text": "Fix and re-run the gate before proceeding."
          }
        ]
      }
    ]
  },
  {
    "n": 5,
    "name": "Release",
    "short": "Ship & confirm adoption",
    "exq": "Are customers successfully adopting the solution?",
    "purpose": "Ship safely, then prove it's actually being used.",
    "outcome": "Customer adoption.",
    "goal": "Accelerate time-to-value.",
    "practices": "CI/CD pipeline automation, trunk-based delivery, feature-flagged canary rollouts, onboarding & change management.",
    "whyMatters": "<div class=\"insight-teaser\" onclick=\"this.classList.toggle('open')\"><div class=\"it-tease\"><span>One missed deployment step cost $440 million in 45 minutes — click to see why.</span><span class=\"it-caret\">▾</span></div><div class=\"it-detail\"><p><strong>Knight Capital, 2012:</strong> a deployment error left old, dormant trading code live on one of eight servers — no feature flag to isolate it, no staged rollout to catch it small, no automated rollback to pull it fast. In 45 minutes, the error triggered millions of unintended trades and cost the firm <strong>$440 million</strong> — enough to end the company.</p><p><strong>DORA (Google Cloud) · Accelerate research:</strong> elite performers recover from a failed release in <strong>under one hour</strong>; low performers take <strong>one week to one month</strong>.</p><p class=\"gk-note\">This is what Canary Rollout, Guardrail Metrics, and Automated Rollback are actually worth — the difference between a $440 million, company-ending failure and a five-minute blip nobody outside the team even notices.</p></div></div>",
    "roles": [
      "DevOps / SRE",
      "Product Manager",
      "Customer Success & Enablement"
    ],
    "spineTags": [
      "Flow",
      "Value"
    ],
    "flow": [
      {
        "t": "step",
        "label": "Canary Rollout",
        "collapsible": true,
        "sub": "Ship to a small slice of traffic first — prove it's safe before going wide."
      },
      {
        "t": "artifact",
        "tag": "Canary Rollout Practices",
        "wide": true,
        "html": "<div class=\"research-grid\"><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-flag')\"><div class=\"rc-tag\">Feature Flagging</div><p class=\"exp-text\">The on/off switch that makes canary possible — ship code dark, then toggle it live for a slice of traffic. No redeploy needed to turn it off.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-rampup')\"><div class=\"rc-tag\">Staged Ramp-Up</div><p class=\"exp-text\">Traffic expands in stages — 5% → 25% → 50% → 100% — each stage gated by the guardrails holding, not a single all-or-nothing jump.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-guardrail')\"><div class=\"rc-tag\">Guardrail Metrics</div><p class=\"exp-text\">The specific numbers watched during the canary window: error rate, latency, and the business KPI that actually matters.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-rollback')\"><div class=\"rc-tag\">Automated Rollback</div><p class=\"exp-text\">Pre-set thresholds revert the canary automatically the moment a guardrail is breached — no one has to notice first.</p></div></div><p class=\"pd-role-note\">Click a practice above to see it in action.</p><div id=\"qbp-flag\" class=\"wo-collapsible qbp-detail\"><div class=\"tdd-box\"><div class=\"tdd-line\">flags.oneClickCheckout.enabled(customer) → true for 5% of sessions, false for the rest</div><div class=\"tdd-result pass\">✓ Toggled live — same deployed build, different behavior per flag state</div></div><p class=\"gk-note\">The code for One-Click Checkout is already sitting in production, dark, behind this flag — deployment and release are decoupled.</p></div><div id=\"qbp-rampup\" class=\"wo-collapsible qbp-detail\"><div class=\"table-scroll\"><table class=\"impact-table center-table\"><thead><tr><th>Stage</th><th>Traffic</th><th>Gate to advance</th></tr></thead><tbody><tr><td>1</td><td class=\"num-cell\">5%</td><td>Guardrails hold for 48 hours</td></tr><tr><td>2</td><td class=\"num-cell\">25%</td><td>Conversion lift holds, error rate flat</td></tr><tr><td>3</td><td class=\"num-cell\">50%</td><td>No new incidents, support volume normal</td></tr><tr class=\"impact-highlight\"><td>4</td><td class=\"num-cell impact-total\">100%</td><td>Full rollout — monitoring continues</td></tr></tbody></table></div><p class=\"gk-note\">Faster Checkout only reaches 100% after clearing all four stages — each one a checkpoint, not a formality.</p></div><div id=\"qbp-guardrail\" class=\"wo-collapsible qbp-detail\"><div class=\"research-grid grid-3\"><div class=\"research-card\"><div class=\"rc-tag\">Error Rate</div><p class=\"exp-text\">Checkout failures per session. Threshold: no increase vs. the control group.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Latency</div><p class=\"exp-text\">Checkout page load time. Threshold: stays inside the &lt;2s NFR budget from Plan.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Conversion Rate</div><p class=\"exp-text\">The business KPI, not just a technical one. Threshold: holds or improves vs. control.</p></div></div><p class=\"gk-note\">Faster Checkout's 5% canary held all three — a 9% conversion lift with no increase in error rate or latency.</p></div><div id=\"qbp-rollback\" class=\"wo-collapsible qbp-detail\"><div class=\"research-grid\"><div class=\"research-card\"><div class=\"rc-tag\">Manual Rollback</div><p class=\"exp-text\">Someone has to be watching a dashboard, notice the breach, and pull the flag by hand. Blast radius grows with every minute of lag.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Automated Rollback</div><p class=\"exp-text\">The threshold breach itself triggers the revert — no human in the loop, no lag between detection and action.</p></div></div><div class=\"tdd-box\"><div class=\"tdd-line\">if (errorRate.canary &gt; errorRate.control * 1.05) → flags.oneClickCheckout.disable()</div><div class=\"tdd-result pass\">✓ Reverted automatically — canary traffic falls back to the existing flow within seconds</div></div><div class=\"result-callout\"><div class=\"k\">Why the automation matters</div><p>A manual rollback depends on someone watching a dashboard at the right moment. An automated one reacts the instant the threshold is crossed — the difference between a 5% blast radius and one that keeps growing while a human notices.</p></div><p class=\"gk-note\">This is Guardrail Metrics' actual enforcement mechanism — a threshold with no automated response is just a chart nobody's obligated to watch.</p></div>"
      },
      {
        "t": "case",
        "label": "Case in point — Faster Checkout",
        "highlight": true,
        "sub": "The canary shows a 9% conversion lift with no increase in error rate."
      },
      {
        "t": "decision",
        "label": "Healthy at 5%?",
        "branches": [
          {
            "tone": "go",
            "tag": "Yes — full rollout",
            "text": "Full rollout, plus an onboarding nudge for returning users."
          },
          {
            "tone": "stop",
            "tag": "No — roll back",
            "text": "Roll back instantly via the feature flag — no redeploy needed."
          }
        ]
      },
      {
        "t": "step",
        "label": "Monitor Adoption",
        "collapsible": true,
        "sub": "Now that it's live for everyone — is it actually being used?"
      },
      {
        "t": "artifact",
        "tag": "Adoption Metrics · Faster Checkout",
        "wide": true,
        "html": "<div class=\"research-grid grid-3\"><div class=\"research-card\"><div class=\"rc-tag\">Feature Adoption Rate</div><p class=\"exp-text\">% of eligible customers who use one-click checkout at least once.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Repeat Usage Rate</div><p class=\"exp-text\">% who use it again on their next order — the real signal it stuck, not just curiosity.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Onboarding Nudge CTR</div><p class=\"exp-text\">Click-through on the returning-user nudge from the rollout decision above.</p></div></div><p class=\"gk-note\">This is the number Measure checks against next — adoption, not just deployment, is what actually converts the investment into value.</p>"
      }
    ]
  },
  {
    "n": 6,
    "name": "Measure",
    "short": "Check the return",
    "exq": "Did the investment create measurable business value?",
    "purpose": "Check the investment against what it actually returned.",
    "outcome": "Verified ROI.",
    "goal": "Validate investment assumptions.",
    "practices": "Realized Cost of Delay audit at 30/60/90 days, error budgets, adoption & usage analytics.",
    "whyMatters": "<div class=\"insight-teaser\" onclick=\"this.classList.toggle('open')\"><div class=\"it-tease\"><span>The average large IT project delivers 56% less value than predicted — click to see why measuring it matters.</span><span class=\"it-caret\">▾</span></div><div class=\"it-detail\"><p><strong>McKinsey & Oxford · study of 5,400 large IT projects:</strong> the average project delivers <strong>56% less value</strong> than originally predicted — even when it launches on time and on budget. Most organizations never find out: <strong>fewer than 40%</strong> have a formal process for tracking whether a project's projected benefits actually materialize after go-live (PMI).</p><p class=\"gk-note\">Faster Checkout's 90-day audit — landing at 90% of its $60,000/month projection, with the shortfall traced to a specific, fixable cause — isn't a routine formality. It's exactly the discipline most organizations skip, and skipping it is what turns a 56% value gap into an invisible one.</p></div></div>",
    "roles": [
      "Product Manager",
      "Finance / Analytics",
      "Executive Sponsor"
    ],
    "spineTags": [
      "Value",
      "Learning"
    ],
    "flow": [
      {
        "t": "step",
        "label": "30-Day Adoption Check",
        "collapsible": true,
        "sub": "Not just live — is it landing the way the business case assumed?"
      },
      {
        "t": "artifact",
        "tag": "30-Day Adoption Check",
        "wide": true,
        "html": "<div class=\"research-grid\"><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-forecast')\"><div class=\"rc-tag\">Usage vs. Forecast</div><p class=\"exp-text\">Actual 30-day adoption rate against the rate the Phase 1 business case assumed.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-retention')\"><div class=\"rc-tag\">Retention Trend</div><p class=\"exp-text\">Is repeat usage holding at 30 days, or fading — real stickiness vs. a launch-week novelty spike.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-segment')\"><div class=\"rc-tag\">Segment Breakdown</div><p class=\"exp-text\">Where adoption is strong or weak — the same signal Phase 2's Hotjar data already flagged.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-qual')\"><div class=\"rc-tag\">Qualitative Signal Sweep</div><p class=\"exp-text\">Support ticket volume and sentiment shift — the \"why\" behind the number, not just the number itself.</p></div></div><p class=\"pd-role-note\">Click a practice above to see it in action.</p><div id=\"qbp-forecast\" class=\"wo-collapsible qbp-detail\"><div class=\"research-grid\"><div class=\"research-card\"><div class=\"rc-tag\">Business Case Assumption</div><p class=\"exp-text\">Phase 1's Cost of Delay case assumed <strong>65%</strong> of eligible returning customers would adopt one-click checkout within 30 days of full rollout.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Actual at 30 Days</div><p class=\"exp-text\">Tracking at <strong>58%</strong> — below the assumption, but still climbing week over week.</p></div></div><div class=\"result-callout\"><div class=\"k\">Reading the gap</div><p>7 points under forecast at 30 days isn't a failed bet — it's a data point. The 60/90-day Realized CoD audit below is where this either closes toward the $60,000/month projection or confirms a real shortfall worth investigating.</p></div><p class=\"gk-note\">This is exactly the number the decision at the bottom of this phase is checking against.</p></div><div id=\"qbp-retention\" class=\"wo-collapsible qbp-detail\"><div class=\"table-scroll\"><table class=\"impact-table center-table\"><thead><tr><th>Week</th><th>Repeat Usage Rate</th></tr></thead><tbody><tr><td>Week 1</td><td class=\"num-cell\">71%</td></tr><tr><td>Week 2</td><td class=\"num-cell\">64%</td></tr><tr><td>Week 3</td><td class=\"num-cell\">60%</td></tr><tr class=\"impact-highlight\"><td>Week 4</td><td class=\"num-cell impact-total\">59%</td></tr></tbody></table></div><p class=\"gk-note\">The curve flattens instead of collapsing toward zero — the signal of real stickiness, not a launch-week novelty spike.</p></div><div id=\"qbp-segment\" class=\"wo-collapsible qbp-detail\"><div class=\"table-scroll\"><table class=\"impact-table center-table\"><thead><tr><th>Segment</th><th>30-Day Adoption Rate</th></tr></thead><tbody><tr><td>Desktop</td><td class=\"num-cell impact-total\">66%</td></tr><tr class=\"impact-highlight\"><td>Mobile</td><td class=\"num-cell impact-total\">47%</td></tr></tbody></table></div><p class=\"gk-note\">Mobile lagging desktop by 19 points — the same gap Phase 2's Hotjar data flagged before a line of code was written. Worth a mobile-specific nudge before the 60-day audit, not a surprise to react to after.</p></div><div id=\"qbp-qual\" class=\"wo-collapsible qbp-detail\"><div class=\"debt-ledger\"><div class=\"dl-row\"><div class=\"dl-label\">Checkout-related tickets</div><div class=\"dl-value\">Down 12% month-over-month — fewer customers getting stuck, not more.</div></div><div class=\"dl-row\"><div class=\"dl-label\">\"Didn't trust it with my card\"</div><div class=\"dl-value\">The #2 theme from Phase 2's survey data has dropped out of the top 5 post-launch.</div></div><div class=\"dl-row\"><div class=\"dl-label\">New theme surfacing</div><div class=\"dl-value\">A small cluster of mobile users asking for Face ID confirmation on one-click orders — an input for the next iteration, not this one.</div></div></div><p class=\"gk-note\">The numbers say adoption is climbing; this is the \"why\" underneath them.</p></div>"
      },
      {
        "t": "step",
        "label": "60/90-Day Realized CoD Audit",
        "collapsible": true,
        "sub": "The number the whole investment case gets checked against."
      },
      {
        "t": "artifact",
        "tag": "60/90-Day Realized CoD Audit",
        "wide": true,
        "html": "<div class=\"research-grid\"><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-realized')\"><div class=\"rc-tag\">Realized Value vs. Cost to Deliver</div><p class=\"exp-text\">Same Cost of Delay formula from Phase 1, run backward with real 90-day data — plus what it actually cost to build.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-variance')\"><div class=\"rc-tag\">Variance Analysis</div><p class=\"exp-text\">Where the gap between projected and actual value comes from — traced, not shrugged off.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-errorbudget')\"><div class=\"rc-tag\">Error Budget Check</div><p class=\"exp-text\">Did any incidents or rollback events eat into the realized gain — reliability cost measured in dollars.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-recommendation')\"><div class=\"rc-tag\">Audit Recommendation</div><p class=\"exp-text\">The audit's formal close-out — feeds directly into the decision below.</p></div></div><p class=\"pd-role-note\">Click a practice above to see it in action.</p><div id=\"qbp-realized\" class=\"wo-collapsible qbp-detail\"><div class=\"formula-box\"><div class=\"pdeos-formula\">Realized CoD = ΔValue (actual) ÷ ΔTime = $54,000 ÷ 1 month = $54,000/month</div></div><div class=\"result-callout\"><div class=\"k\">90-day realized value</div><p><strong>$54,000/month</strong> in recovered revenue — measured from actual conversion lift × order volume, not modeled.</p></div><div class=\"wo-label\">Cost to Deliver vs. Value Realized</div><div class=\"research-grid\"><div class=\"research-card\"><div class=\"rc-tag\">Team Cost to Deliver</div><p class=\"exp-text\">30 days (Real Duration) × $1,500/day blended team rate = <strong>$45,000</strong> to build.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Payback Period</div><p class=\"exp-text\">$45,000 ÷ $54,000/month realized = <strong>under 1 month</strong> to pay back the full cost of delivery.</p></div></div><p class=\"gk-note\">This is the number every other box in this audit is checked against — and the one that answers \"was this worth it\" in a single line.</p></div><div id=\"qbp-variance\" class=\"wo-collapsible qbp-detail\"><div class=\"table-scroll\"><table class=\"impact-table center-table\"><thead><tr><th>Component</th><th>$ / month</th></tr></thead><tbody><tr><td>Projected (Phase 1 business case)</td><td class=\"num-cell impact-total\">$60,000</td></tr><tr><td>Actual (90-day realized)</td><td class=\"num-cell impact-total\">$54,000</td></tr><tr class=\"cd3-total-row\"><td>Gap</td><td class=\"num-cell impact-total\">-$6,000 (-10%)</td></tr></tbody></table></div><p class=\"gk-note\">Most of the gap traces to the mobile adoption lag flagged in the 30-Day Adoption Check — not a flaw in the original model, a slower-than-planned mobile rollout.</p></div><div id=\"qbp-errorbudget\" class=\"wo-collapsible qbp-detail\"><div class=\"research-grid grid-3\"><div class=\"research-card\"><div class=\"rc-tag\">Rollback Events</div><p class=\"exp-text\">0 triggered in 90 days post full-rollout — Guardrail Metrics held.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Error Budget Consumed</div><p class=\"exp-text\">8% of the 90-day budget — well within tolerance.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Cost to Realized Value</div><p class=\"exp-text\">$0 — no incident cost offsetting the $54,000/month gain.</p></div></div><p class=\"gk-note\">A feature can hit its adoption target and still lose money to instability. This confirms it didn't.</p></div><div id=\"qbp-recommendation\" class=\"wo-collapsible qbp-detail\"><div class=\"result-callout\"><div class=\"k\">Recommendation</div><p><strong>Close as validated, with a noted variance.</strong> 90% of projected value delivered, and the gap traces to a known, fixable cause — not a flaw in the original investment case.</p></div><p class=\"gk-note\">This is the recommendation the decision below is built on — not a separate opinion.</p></div>"
      },
      {
        "t": "case",
        "label": "Case in point — Faster Checkout",
        "highlight": true,
        "sub": "At 90 days, the change is tracked to +$54,000/month in recovered revenue — 90% of the original $60,000 projection."
      },
      {
        "t": "decision",
        "label": "Met the business case?",
        "branches": [
          {
            "tone": "go",
            "tag": "Yes — value confirmed",
            "text": "Investment thesis holds. Moves to Learn."
          },
          {
            "tone": "stop",
            "tag": "No — investigate",
            "text": "Investigate the gap before calling the investment closed."
          }
        ]
      }
    ]
  },
  {
    "n": 7,
    "name": "Learn",
    "short": "Feed it forward",
    "exq": "How do we improve the return on our next investment?",
    "purpose": "Turn this cycle's results into next cycle's sharper bet.",
    "outcome": "Organizational learning.",
    "goal": "Optimize portfolio performance.",
    "practices": "Blameless post-mortems tied to financial impact, feedback into portfolio prioritization and governance.",
    "whyMatters": "<div class=\"insight-teaser\" onclick=\"this.classList.toggle('open')\"><div class=\"it-tease\"><span>IT projects run 45% over budget on average — and most organizations pay for the same lesson twice.</span><span class=\"it-caret\">▾</span></div><div class=\"it-detail\"><p><strong>McKinsey & Oxford · same study of 5,400 large IT projects cited in Phase 6:</strong> beyond delivering 56% less value than predicted, the average project also runs <strong>45% over budget</strong>.</p><p><strong>\"Project amnesia\" (Schindler &amp; Eppler, 2003, International Journal of Project Management):</strong> the well-documented pattern of organizations repeating the same mistakes because lessons are never structurally fed forward — captured once, then forgotten.</p><p class=\"gk-note\">A fed-forward rule like the mobile-parity buffer below is exactly what keeps this organization out of that statistic — the lesson gets applied, not just archived.</p></div></div>",
    "roles": [
      "Portfolio / PMO Leadership",
      "Delivery Leadership",
      "Product Leadership"
    ],
    "spineTags": [
      "Learning",
      "Investment"
    ],
    "flow": [
      {
        "t": "step",
        "label": "Blameless Retro, Tied to Dollars",
        "collapsible": true,
        "sub": "Not \"what went wrong\" — \"what did the gap cost, and why.\""
      },
      {
        "t": "artifact",
        "tag": "Portfolio Learning Metrics",
        "wide": true,
        "html": "<div class=\"research-grid\"><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-estaccuracy')\"><div class=\"rc-tag\">Estimation Accuracy Trend</div><p class=\"exp-text\">CD3 Duration estimates vs. Real Duration actuals — tracked across initiatives, not just this one.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-valuecapture')\"><div class=\"rc-tag\">Value Capture Rate</div><p class=\"exp-text\">Realized CoD ÷ Projected CoD, portfolio average — benchmarked against the industry norm.</p></div><div class=\"research-card qbp-card\" onclick=\"toggleQBP(this,'qbp-mistakesavoided')\"><div class=\"rc-tag\">Cost of Repeated Mistakes (Avoided)</div><p class=\"exp-text\">The dollar value of a rule-of-thumb actually preventing a repeat shortfall — proof the loop has teeth.</p></div></div><p class=\"pd-role-note\">Click a metric above to see it in action.</p><div id=\"qbp-estaccuracy\" class=\"wo-collapsible qbp-detail\"><div class=\"table-scroll\"><table class=\"impact-table center-table\"><thead><tr><th>Initiative</th><th>CD3 Estimated Duration</th><th>Real Duration (Actual)</th><th>Variance</th></tr></thead><tbody><tr><td>Initiative A (2 cycles ago)</td><td class=\"num-cell\">20 days</td><td class=\"num-cell\">29 days</td><td class=\"num-cell impact-total\">+45%</td></tr><tr><td>Initiative B (1 cycle ago)</td><td class=\"num-cell\">24 days</td><td class=\"num-cell\">28 days</td><td class=\"num-cell impact-total\">+17%</td></tr><tr class=\"impact-highlight\"><td><strong>Faster Checkout</strong><div class=\"impact-sub\">This cycle</div></td><td class=\"num-cell\">30 days (1.5 months)</td><td class=\"num-cell\">30 days</td><td class=\"num-cell impact-total\">On target</td></tr></tbody></table></div><p class=\"gk-note\">Variance shrinking cycle over cycle — by Faster Checkout, the Phase 1 estimate landed exactly on the actual Real Duration. Proof each fed-forward rule is actually tightening the next estimate, not just getting logged and forgotten.</p></div><div id=\"qbp-valuecapture\" class=\"wo-collapsible qbp-detail\"><div class=\"research-grid\"><div class=\"research-card\"><div class=\"rc-tag\">Industry Average</div><p class=\"exp-text\">~44% — the McKinsey/Oxford norm (56% less value than predicted).</p></div><div class=\"research-card\"><div class=\"rc-tag\">This Portfolio</div><p class=\"exp-text\">82% — trailing four-initiative average.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Faster Checkout</div><p class=\"exp-text\">90% — this cycle, ahead of the portfolio average.</p></div></div><p class=\"gk-note\">This organization is capturing nearly double the industry average — and Faster Checkout is running ahead of even that.</p></div><div id=\"qbp-mistakesavoided\" class=\"wo-collapsible qbp-detail\"><div class=\"result-callout\"><div class=\"k\">Rule applied to the next initiative</div><p>The mobile-parity buffer, fed forward from Faster Checkout's retro, avoided a projected <strong>$18,000</strong> shortfall (3 months × $6,000/month) on the next mobile-touching initiative — the same gap, not repeated.</p></div><p class=\"gk-note\">This is the objective proof \"Feed the learning forward\" below isn't a ritual — it's a measurable save.</p></div>"
      },
      {
        "t": "case",
        "label": "Case in point — Faster Checkout",
        "highlight": true,
        "sub": "The $6,000/month shortfall traces to a slower-than-planned mobile rollout."
      },
      {
        "t": "step",
        "label": "Feed the Learning Forward",
        "collapsible": true,
        "sub": "The mechanism that prevents \"project amnesia\" — a lesson only counts if it structurally changes the next estimate."
      },
      {
        "t": "artifact",
        "tag": "Rule of Thumb Ledger · Faster Checkout",
        "wide": true,
        "html": "<div class=\"research-grid grid-3\"><div class=\"research-card\"><div class=\"rc-tag\">Rule Captured</div><p class=\"exp-text\">Mobile-parity buffer — checkout-style initiatives with a mobile component get +3 days added to the Phase 1 order-of-magnitude Duration estimate, before Sprint Planning ever sizes it.</p></div><div class=\"research-card\"><div class=\"rc-tag\">Where It Applies</div><p class=\"exp-text\">Logged in the Rule of Thumb Ledger — surfaced automatically the next time a mobile-touching initiative reaches Phase 1's CD3 ranking, not left to memory.</p></div><div class=\"research-card highlight\"><div class=\"rc-tag\">Ownership</div><p class=\"exp-text\">Portfolio / PMO Leadership owns the ledger — reviewing it is now a required step in every future CD3 ranking, not optional.</p></div></div><div class=\"result-callout\"><div class=\"k\">Applied to the next mobile-touching initiative</div><p>Starting from Faster Checkout's confirmed 30-day (1.5-month) baseline + 3 days (mobile-parity buffer) = <strong>33 days</strong> — built into the Phase 1 estimate before Sprint Planning ever sizes it, instead of surfacing as a mid-sprint surprise like it did this cycle.</p></div><p class=\"gk-note\">This is what keeps a lesson from becoming project amnesia — it's not just written down, it's structurally in the way of the next estimate.</p>"
      },
      {
        "t": "loop",
        "label": "Feeds back into Discover",
        "sub": "The loop closes — this cycle's learning becomes next cycle's input."
      }
    ]
  }
];

export const economicSpine: SpineDimension[] = [
  {
    "name": "Investment",
    "def": "Are resources allocated to the highest-value opportunities available right now?"
  },
  {
    "name": "Risk",
    "def": "Is uncertainty about the problem, solution, or delivery being actively reduced before capital is committed?"
  },
  {
    "name": "Quality",
    "def": "Is enough quality being built in up front to avoid future economic waste and rework?"
  },
  {
    "name": "Flow",
    "def": "Is value moving efficiently through the system, or getting stuck behind queues, approvals, and dependencies?"
  },
  {
    "name": "Value",
    "def": "Are customers and the business realizing measurable, verifiable benefit from what shipped? Value leaks from four buckets while a feature waits:",
    "buckets": [
      {
        "name": "Increase Revenue",
        "d": "New sales or upsells left on the table while a feature waits."
      },
      {
        "name": "Protect Revenue",
        "d": "Customers churn to a competitor over a missing feature."
      },
      {
        "name": "Reduce Cost",
        "d": "Manual, inefficient work continues every week automation is delayed."
      },
      {
        "name": "Avoid Cost",
        "d": "Fines, breach risk, or compliance penalties accumulate from delay."
      }
    ]
  },
  {
    "name": "Learning",
    "def": "Are insights from this initiative being captured to improve the next investment decision?"
  }
];
