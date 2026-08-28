// "Planet" glow, ported from the Hero orbital animation's glowSprite() -- a
// bright white-hot core blending into the body's own hue, plus a soft wide
// halo behind it (same gradient-stop shape as glowSprite's radial gradient,
// translated from a canvas sprite into a CSS radial-gradient + box-shadow
// pair). Shared between GapDiagram and the PDE-OS wheel (radial-orbital-timeline)
// so both diagrams' nodes render with the same glow treatment.
export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Blends a hue 78% toward white for a pastel fill. */
export function pastel(hex: string): string {
  const [r, g, b] = hexToRgb(hex);
  const mix = (c: number) => Math.round(c + (255 - c) * 0.78);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

export function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function glowStyle(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return {
    background: `radial-gradient(circle at 35% 30%, #ffffff 0%, rgba(${r},${g},${b},0.95) 15%, rgba(${r},${g},${b},0.9) 40%, ${hex} 100%)`,
    boxShadow: `0 0 10.91px 2.98px rgba(${r},${g},${b},0.75), 0 0 25.79px 8.92px rgba(${r},${g},${b},0.49), 0 0 50.59px 17.86px rgba(${r},${g},${b},0.26)`,
  };
}
