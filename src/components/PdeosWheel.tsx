import { base } from '../lib/base';
import PdeosOrbitalComparison from './PdeosOrbitalComparison';

export default function PdeosWheel() {
  return (
    <section id="pdeos-wheel-section" className="bg-wash-blue py-12 sm:py-16">
      <div className="mx-auto max-w-[1536px] px-6 sm:px-8 lg:px-10 xl:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.375em] text-orange">Coherenz PDE-OS™</p>
          <h2 className="mt-3 font-serif text-4xl text-navy sm:text-5xl">The Product Delivery Economics Framework</h2>
          <p className="mt-3 text-foreground/70">
            One continuous cycle for turning delivery into measurable value.
            <br />
            Seven stages, one economic thread — from first idea to the lesson that sharpens the next bet.
          </p>
          <a href={`${base}approach`} className="mt-7 inline-block rounded-full border-2 border-orange px-6 py-3 text-sm font-bold text-orange">
            See the full framework →
          </a>
        </div>
      </div>

      <PdeosOrbitalComparison />
    </section>
  );
}
