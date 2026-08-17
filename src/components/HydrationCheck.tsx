import { useState } from 'react';

/** Scaffolding smoke test only — proves a React island hydrates client-side. Not product content. */
export default function HydrationCheck() {
  const [count, setCount] = useState(0);

  return (
    <button
      onClick={() => setCount((c) => c + 1)}
      className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-orange/90"
    >
      React island hydrated — clicked {count}×
    </button>
  );
}
