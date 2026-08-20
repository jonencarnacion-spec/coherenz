export interface PromiseSlide {
  number: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  accent: string;
  image: string;
  imageAlt: string;
}

// Copy and image pairing are both from Jon's own
// "assets/image options/our promise/" folder (text file + 1.jpg-5.jpg, in
// that order) -- not generated. CTAs all point at /services, matching how
// FourProblems.astro links its own per-topic cards (no dedicated sub-pages
// exist yet for these individual topics).
export const promiseSlides: PromiseSlide[] = [
  {
    number: '01',
    title: 'Better Decisions. Stronger Outcomes.',
    description:
      'Timely, practical thinking on the economics of product delivery — helping you close the gap between strategy, investment, and results.',
    ctaLabel: 'Explore Product Delivery Economics',
    ctaHref: 'approach',
    accent: '#E8A030',
    image: 'promise-1.jpg',
    imageAlt: 'Streaks of colored light converging, representing focused delivery economics',
  },
  {
    number: '02',
    title: 'Make Every Investment Count.',
    description:
      'Direct money, people, and capacity toward the opportunities that create the greatest business value.',
    ctaLabel: 'Explore Product & Portfolio Strategy',
    ctaHref: 'services',
    accent: '#2E5077',
    image: 'promise-2.jpg',
    imageAlt: 'Grid of architectural glass panels converging to a vanishing point',
  },
  {
    number: '03',
    title: 'Build Smarter. Lead Better.',
    description:
      'Navigate AI-assisted product and software delivery while maintaining the product judgment, quality, and management discipline that makes technology valuable.',
    ctaLabel: 'Explore our perspectives on AI-assisted delivery',
    ctaHref: 'insights',
    accent: '#D14A3E',
    image: 'promise-3.jpg',
    imageAlt: 'Faceted sphere breaking apart, representing systems under structural stress',
  },
  {
    number: '04',
    title: 'Restore Delivery Confidence.',
    description:
      'Stabilize struggling delivery systems, remove the constraints that matter, and restore flow, predictability, and leadership visibility.',
    ctaLabel: 'Explore Delivery Stabilization',
    ctaHref: 'services',
    accent: '#B08900',
    image: 'promise-4.jpg',
    imageAlt: 'Rows of glowing dots receding into the distance, evoking restored rhythm and flow',
  },
  {
    number: '05',
    title: 'Unlock More From the Capacity You Have.',
    description:
      'Reduce wasted capacity, rework, coordination drag, and delivery friction — so more effort goes toward work that matters.',
    ctaLabel: 'Explore Delivery Economics',
    ctaHref: 'services',
    accent: '#174E40',
    image: 'promise-5.jpg',
    imageAlt: 'Burst of blue and orange particles, representing capacity unlocked into value',
  },
];
