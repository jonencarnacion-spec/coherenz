export interface PdeosStage {
  name: string;
  color: string;
  sub: string;
}

// Ported from ../../js/main.js — same colors/copy as the live vanilla wheel.
export const pdeosStages: PdeosStage[] = [
  { name: 'Discover', color: '#EF4142', sub: 'Price the opportunity' },
  { name: 'Validate', color: '#EF7A3E', sub: "Prove it's real" },
  { name: 'Plan', color: '#F0C040', sub: 'Design the blueprint' },
  { name: 'Deliver', color: '#174E40', sub: 'Build it right' },
  { name: 'Release', color: '#2E5077', sub: 'Ship & confirm adoption' },
  { name: 'Measure', color: '#2E5077', sub: 'Check the return' },
  { name: 'Learn', color: '#1A2744', sub: 'Feed it forward' },
];

/** Ellipse-positioning math ported from CoherenzWheel in ../../js/main.js. */
export function ellipsePoint(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
