import { useEffect, useMemo, useRef, useState } from 'react';
import { IconChevronDown, IconCircleCheck, IconCircleX, IconRefresh } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import type { PdeosFlowNode } from '../../data/pdeosPhaseDetails';
import { installPdeosFlowGlobals, initDiscoverTables } from './pdeos-flow-interactions';
import './pdeos-flow.css';

// Renders a phase's `flow` array (the "What happens inside this phase" content
// ported from PDE-OS_Part1_Foundation.html). Mirrors that file's buildGroup/
// buildLeafArtifacts grouping logic in React state instead of manual DOM-class
// toggling: a top-level collapsible `step` owns every node that follows it up to
// the next top-level collapsible step -- consecutive `artifact`s render directly,
// and a nested collapsible `step` (BUILD/TEST-style sub-steps) owns its own run
// of trailing artifacts one level deeper.
type Block =
  | { kind: 'toggle'; index: number; step: Extract<PdeosFlowNode, { t: 'step' }>; children: Block[] }
  | { kind: 'leaf'; index: number; node: PdeosFlowNode };

function buildLeafArtifacts(flow: PdeosFlowNode[], start: number, end: number) {
  const blocks: Block[] = [];
  let i = start;
  while (i < end && flow[i].t === 'artifact') {
    blocks.push({ kind: 'leaf', index: i, node: flow[i] });
    i++;
  }
  return { blocks, nextIndex: i };
}

function buildChildBlocks(flow: PdeosFlowNode[], start: number, end: number) {
  const blocks: Block[] = [];
  let i = start;
  while (i < end) {
    const node = flow[i];
    if (node.t === 'artifact') {
      blocks.push({ kind: 'leaf', index: i, node });
      i++;
      continue;
    }
    if (node.t === 'step' && node.collapsible && node.nested) {
      const sub = buildLeafArtifacts(flow, i + 1, end);
      blocks.push({ kind: 'toggle', index: i, step: node, children: sub.blocks });
      i = sub.nextIndex;
      continue;
    }
    break;
  }
  return { blocks, nextIndex: i };
}

function buildBlocks(flow: PdeosFlowNode[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;
  while (i < flow.length) {
    const node = flow[i];
    if (node.t === 'step' && node.collapsible) {
      const { blocks: children, nextIndex } = buildChildBlocks(flow, i + 1, flow.length);
      blocks.push({ kind: 'toggle', index: i, step: node, children });
      i = nextIndex;
      continue;
    }
    blocks.push({ kind: 'leaf', index: i, node });
    i++;
  }
  return blocks;
}

function Connector() {
  return <div className="my-2 text-center text-sm text-navy/25">↓</div>;
}

function Artifact({ node }: { node: Extract<PdeosFlowNode, { t: 'artifact' }> }) {
  return (
    <div className={cn('rounded-xl border border-dashed border-orange/40 bg-white p-5', node.wide ? '' : 'mx-auto max-w-[560px]')}>
      <p className="text-center text-xs font-bold uppercase tracking-wide text-orange">{node.tag}</p>
      <div className="mt-2 text-sm text-navy" dangerouslySetInnerHTML={{ __html: node.html }} />
    </div>
  );
}

function CaseBox({ node }: { node: Extract<PdeosFlowNode, { t: 'case' }> }) {
  return (
    <div className="rounded-xl border border-orange/40 bg-orange/5 p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-orange">{node.label}</p>
      <p className="mt-1.5 text-sm text-navy">{node.sub}</p>
    </div>
  );
}

function LoopBox({ node }: { node: Extract<PdeosFlowNode, { t: 'loop' }> }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-navy p-5">
      <IconRefresh size={20} className="mt-0.5 shrink-0 text-orange" />
      <div>
        <p className="text-sm font-bold text-white">{node.label}</p>
        <p className="mt-1 text-sm text-white/70">{node.sub}</p>
      </div>
    </div>
  );
}

function DecisionBox({ node }: { node: Extract<PdeosFlowNode, { t: 'decision' }> }) {
  return (
    <div className="rounded-xl bg-wash-blue p-5">
      <p className="text-center text-sm font-bold text-navy">{node.label}</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {node.branches.map((b) => (
          <div
            key={b.tag}
            className={cn(
              'flex items-start gap-2 rounded-lg border bg-white p-3',
              b.tone === 'go' ? 'border-green/30' : 'border-line'
            )}
          >
            {b.tone === 'go' ? (
              <IconCircleCheck size={18} className="mt-0.5 shrink-0 text-green" />
            ) : (
              <IconCircleX size={18} className="mt-0.5 shrink-0 text-navy/40" />
            )}
            <div>
              <p className={cn('text-xs font-bold uppercase tracking-wide', b.tone === 'go' ? 'text-green' : 'text-navy/50')}>{b.tag}</p>
              <p className="mt-0.5 text-sm text-navy">{b.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StaticStep({ node }: { node: Extract<PdeosFlowNode, { t: 'step' }> }) {
  return (
    <div className="rounded-xl bg-wash-blue p-4">
      <h5 className="text-sm font-bold text-navy">{node.label}</h5>
      <p className="mt-1 text-sm text-foreground/70">{node.sub}</p>
    </div>
  );
}

function ToggleStep({
  block,
  isOpen,
  onToggle,
  nested,
  openSet,
  onToggleIndex,
}: {
  block: Extract<Block, { kind: 'toggle' }>;
  isOpen: boolean;
  onToggle: () => void;
  nested: boolean;
  openSet: Set<number>;
  onToggleIndex: (i: number) => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition-colors',
          nested ? 'border-line bg-white' : 'border-line bg-wash-blue hover:bg-wash-blue/70'
        )}
      >
        <span>
          <span className="block text-sm font-bold text-navy">{block.step.label}</span>
          <span className="mt-0.5 block text-sm text-foreground/70">{block.step.sub}</span>
        </span>
        <IconChevronDown size={18} className={cn('shrink-0 text-navy/40 transition-transform', isOpen && 'rotate-180 text-orange')} />
      </button>
      {isOpen && (
        <div className="mt-2 space-y-2 border-l-2 border-line pl-4">
          <BlockList blocks={block.children} openSet={openSet} onToggleIndex={onToggleIndex} />
        </div>
      )}
    </div>
  );
}

function BlockList({
  blocks,
  openSet,
  onToggleIndex,
}: {
  blocks: Block[];
  openSet: Set<number>;
  onToggleIndex: (i: number) => void;
}) {
  return (
    <>
      {blocks.map((b, i) => (
        <div key={b.index}>
          {i > 0 && <Connector />}
          {b.kind === 'toggle' ? (
            <ToggleStep
              block={b}
              isOpen={openSet.has(b.index)}
              onToggle={() => onToggleIndex(b.index)}
              nested
              openSet={openSet}
              onToggleIndex={onToggleIndex}
            />
          ) : b.node.t === 'artifact' ? (
            <Artifact node={b.node} />
          ) : b.node.t === 'case' ? (
            <CaseBox node={b.node} />
          ) : b.node.t === 'decision' ? (
            <DecisionBox node={b.node} />
          ) : b.node.t === 'loop' ? (
            <LoopBox node={b.node} />
          ) : (
            <StaticStep node={b.node} />
          )}
        </div>
      ))}
    </>
  );
}

export default function PdeosFlow({ flow, phaseKey }: { flow: PdeosFlowNode[]; phaseKey: number }) {
  const blocks = useMemo(() => buildBlocks(flow), [flow]);
  const firstToggleIndex = blocks.find((b) => b.kind === 'toggle')?.index ?? null;
  const [openSet, setOpenSet] = useState<Set<number>>(() => new Set(firstToggleIndex !== null ? [firstToggleIndex] : []));
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset which step is expanded whenever the active phase changes.
  useEffect(() => {
    setOpenSet(new Set(firstToggleIndex !== null ? [firstToggleIndex] : []));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phaseKey]);

  useEffect(() => {
    installPdeosFlowGlobals();
    if (containerRef.current) initDiscoverTables(containerRef.current);
  }, [phaseKey, openSet]);

  function onToggleIndex(i: number) {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div ref={containerRef} className="pdeos-detail space-y-2">
      {blocks.map((b, i) => (
        <div key={b.index}>
          {i > 0 && <Connector />}
          {b.kind === 'toggle' ? (
            <ToggleStep
              block={b}
              isOpen={openSet.has(b.index)}
              onToggle={() => onToggleIndex(b.index)}
              nested={false}
              openSet={openSet}
              onToggleIndex={onToggleIndex}
            />
          ) : b.node.t === 'artifact' ? (
            <Artifact node={b.node} />
          ) : b.node.t === 'case' ? (
            <CaseBox node={b.node} />
          ) : b.node.t === 'decision' ? (
            <DecisionBox node={b.node} />
          ) : b.node.t === 'loop' ? (
            <LoopBox node={b.node} />
          ) : (
            <StaticStep node={b.node} />
          )}
        </div>
      ))}
    </div>
  );
}
