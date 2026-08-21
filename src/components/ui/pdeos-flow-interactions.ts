// Ported from PDE-OS_Part1_Foundation.html's `sortCD3`/`buildImpactTable`/`toggleQBP`
// functions (the CD3 ranking table and FIFO-vs-CoD-vs-CD3 impact table embedded in
// Discover's "flow", plus the generic click-to-expand practice cards used across
// several phases). The reference wires these up as onclick="" attributes baked into
// the artifact HTML strings (see PdeosFlow's dangerouslySetInnerHTML) -- rather than
// rewrite that markup, this defines the same functions on `window` so those
// attributes keep working unmodified, exactly like the reference page does.
interface Cd3Feature {
  name: string;
  cod: number;
  dur: number;
  cd3: number;
}

const features: Cd3Feature[] = [
  { name: 'Faster Checkout', cod: 60000, dur: 1.5, cd3: 0 },
  { name: 'Enterprise Reporting', cod: 200000, dur: 6, cd3: 0 },
  { name: 'Legacy Migration', cod: 80000, dur: 4, cd3: 0 },
  { name: 'Minor UI Polish', cod: 8000, dur: 0.5, cd3: 0 },
];
features.forEach((f) => (f.cd3 = f.cod / f.dur));
const byName = Object.fromEntries(features.map((f) => [f.name, f]));

const fifoOrder = ['Minor UI Polish', 'Legacy Migration', 'Enterprise Reporting', 'Faster Checkout'];
const cd3Order = ['Faster Checkout', 'Enterprise Reporting', 'Legacy Migration', 'Minor UI Polish'];
const codOrder = [...features].sort((a, b) => b.cod - a.cod).map((f) => f.name);

function fmtMoney(n: number) {
  return '$' + n.toLocaleString('en-US');
}
function fmtDur(d: number) {
  return d < 1 ? d * 4 + ' week' + (d * 4 > 1 ? 's' : '') : d + ' month' + (d > 1 ? 's' : '');
}
function fmtK(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function computeDelayCost(order: string[]) {
  const rows: { feature: string; dur: number; rateSum: number; cost: number }[] = [];
  let total = 0;
  for (let i = 0; i < order.length; i++) {
    const cur = byName[order[i]];
    const stillPending = order.slice(i).map((n) => byName[n]);
    const rateSum = stillPending.reduce((s, f) => s + f.cod, 0);
    const cost = rateSum * cur.dur;
    total += cost;
    rows.push({ feature: cur.name, dur: cur.dur, rateSum, cost });
  }
  return { rows, total };
}

const cd3Heads: Record<string, string> = {
  fifo: '<tr><th>Order</th><th>Feature</th><th>Monthly CoD</th><th>Duration</th><th class="num-head">Delay cost incurred</th></tr>',
  cod: '<tr><th>Rank</th><th>Feature</th><th>Monthly CoD</th><th>Duration</th><th class="num-head">Delay cost incurred</th></tr>',
  cd3: '<tr><th>Rank</th><th>Feature</th><th>Monthly CoD</th><th>Duration</th><th class="num-head">CD3 score (relative)</th><th class="num-head">Delay cost incurred</th></tr>',
};

function sortCD3(mode: 'fifo' | 'cod' | 'cd3', btn: HTMLElement | null) {
  document.querySelectorAll('.cd3-btn').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const sorted = mode === 'fifo' ? fifoOrder.map((n) => byName[n]) : [...features].sort((a, b) => (mode === 'cd3' ? b.cd3 - a.cd3 : b.cod - a.cod));
  const head = document.getElementById('cd3-head');
  if (head) head.innerHTML = cd3Heads[mode];
  const delay = computeDelayCost(sorted.map((f) => f.name));
  const colspan = mode === 'cd3' ? 5 : 4;
  const body = document.getElementById('cd3-body');
  if (!body) return;
  body.innerHTML =
    sorted
      .map(
        (f, i) => `
    <tr class="${i === 0 ? 'rank-1' : ''}">
      <td><span class="rank-pill">${i + 1}</span></td>
      <td>${f.name}</td>
      <td>${fmtMoney(f.cod)}/mo</td>
      <td>${fmtDur(f.dur)}</td>
      ${mode === 'cd3' ? `<td class="num-cell"><span class="cd3-score">${Math.round(f.cd3).toLocaleString('en-US')}</span></td>` : ''}
      <td class="delay-cost-cell">${fmtK(delay.rows[i].cost)}</td>
    </tr>
  `
      )
      .join('') +
    `
    <tr class="cd3-total-row"><td colspan="${colspan}">Total delay cost incurred</td><td class="impact-total num-cell">${fmtK(delay.total)}</td></tr>
  `;
  const insight = document.getElementById('cd3-insight');
  if (!insight) return;
  if (mode === 'cd3') {
    insight.innerHTML =
      "Faster Checkout has the smallest footprint of the four, but it ships in six weeks — so it clears the queue and starts returning value fastest. CD3 pushes it to <strong>#1</strong>. That's Guiding Principle 3: flow beats utilization.";
  } else if (mode === 'cod') {
    insight.innerHTML =
      'Ranked by raw Cost of Delay, Faster Checkout drops to <strong>#3</strong> — buried behind two initiatives that take four to six months to ship. This is exactly the trap CD3 exists to correct.';
  } else {
    insight.innerHTML =
      "This is what no prioritization framework looks like: items are worked in the order they arrived. Minor UI Polish — the lowest-CD3 item — goes first, while Faster Checkout, the <strong>highest-CD3</strong> item, waits until last. That sequencing is what gets priced out in the impact table below.";
  }
}

function buildImpactTable() {
  const fifo = computeDelayCost(fifoOrder);
  const cod = computeDelayCost(codOrder);
  const cd3 = computeDelayCost(cd3Order);
  const codVsFifoPct = Math.round(((fifo.total - cod.total) / fifo.total) * 100);
  const cd3VsFifoPct = Math.round(((fifo.total - cd3.total) / fifo.total) * 100);
  const cd3VsFifoSavings = fifo.total - cd3.total;
  const codVsCd3Gap = cod.total - cd3.total;

  const tbody = document.getElementById('impact-body');
  if (!tbody) return;
  tbody.innerHTML = `
    <tr>
      <td><strong>First-In, First-Out</strong><div class="impact-sub">Arrival order</div></td>
      <td>${fifoOrder.join(' → ')}</td>
      <td class="impact-total">${fmtK(fifo.total)}</td>
      <td>Baseline cost incurred by serving requests strictly in the order they arrived.</td>
    </tr>
    <tr>
      <td><strong>Raw CoD</strong><div class="impact-sub">Highest CoD first</div></td>
      <td>${codOrder.join(' → ')}</td>
      <td class="impact-total">${fmtK(cod.total)}</td>
      <td><strong>${codVsFifoPct}% reduction</strong> vs. FIFO — but still ${fmtK(codVsCd3Gap)} more than CD3, since duration isn't factored in.</td>
    </tr>
    <tr class="impact-highlight">
      <td><strong>CD3 Priority</strong><div class="impact-sub">Highest CD3 first</div></td>
      <td>${cd3Order.join(' → ')}</td>
      <td class="impact-total">${fmtK(cd3.total)}</td>
      <td><strong>${cd3VsFifoPct}% reduction</strong> (${fmtK(cd3VsFifoSavings)} saved) in total delay cost incurred, by shipping the highest-CD3 item first.</td>
    </tr>
  `;
}

function toggleQBP(el: HTMLElement, id: string) {
  const panel = document.getElementById(id);
  const wasOpen = panel?.classList.contains('open');
  document.querySelectorAll('.qbp-card').forEach((c) => c.classList.remove('active'));
  document.querySelectorAll('.qbp-detail').forEach((d) => d.classList.remove('open'));
  if (!wasOpen && panel) {
    panel.classList.add('open');
    el.classList.add('active');
  }
}

let installed = false;

/** Defines window.sortCD3/toggleQBP once, so the ported artifact HTML's inline
 * onclick="" attributes (baked into the static content) work unmodified. */
export function installPdeosFlowGlobals() {
  if (installed) return;
  installed = true;
  (window as any).sortCD3 = sortCD3;
  (window as any).toggleQBP = toggleQBP;
}

/** Re-run whenever the Discover phase's flow content mounts, since its CD3/impact
 * tables need their tbody populated the same way the reference does on first paint. */
export function initDiscoverTables(container: HTMLElement) {
  const cd3Btn = container.querySelector<HTMLButtonElement>('.cd3-btn.active') ?? container.querySelector<HTMLButtonElement>('.cd3-btn');
  if (container.querySelector('#cd3-body')) sortCD3('cd3', cd3Btn ?? null);
  if (container.querySelector('#impact-body')) buildImpactTable();
}

// `.wo-toggle` (`this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')`)
// and `.insight-teaser` (`this.classList.toggle('open')`) both ship as self-contained
// inline onclick="" attributes baked into the ported HTML strings -- no external
// function reference needed, so (unlike sortCD3/toggleQBP) nothing further has to be
// wired up here. An earlier version of this file added a React-level delegated
// handler for these too, which double-toggled: the native inline attribute already
// fires on click, and the extra React handler fired a second, cancelling toggle on
// the same element. Removed rather than deduplicated, since the native attribute
// alone is sufficient.
