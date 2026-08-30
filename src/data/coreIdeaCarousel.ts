import type { PromiseSlide } from './promiseCarousel';

// Same five resources and copy as resource-bento.tsx's ResourceBento grid
// (Money/People/Capacity/Time/Attention), reshaped into the ElegantCarousel
// slide format so the approach page's "Core Idea" section can reuse that
// same carousel treatment instead of the bento grid. Images are the same
// core-idea-*.jpg photos already used by ResourceBento.
export const coreIdeaSlides: PromiseSlide[] = [
  {
    number: '01',
    title: 'Money',
    description:
      'Capital allocated to product investment is finite. Every dollar spent on one initiative is a dollar not available for another.',
    detail:
      'Every roadmap is really a budget in disguise — funding one bet always means not funding another. Treating capital allocation as an explicit, ongoing decision (not a once-a-year planning exercise) is what keeps investment aligned to where value actually is.',
    ctaLabel: 'Explore Product & Portfolio Strategy',
    ctaHref: 'services',
    accent: '#E8A030',
    image: 'core-idea-money.jpg',
    imageAlt: 'Macro detail of an engraved portrait on a banknote',
  },
  {
    number: '02',
    title: 'People',
    description:
      'Headcount and expertise are bounded. The people you have define the ceiling on what you can realistically deliver.',
    detail:
      "Adding headcount doesn't scale linearly — coordination overhead grows with team size, and specialized expertise can't be hired overnight. The real question isn't how many people you have, but whether they're pointed at the work that matters most.",
    ctaLabel: 'Explore Product Operating Model',
    ctaHref: 'services',
    accent: '#2E5077',
    image: 'core-idea-people.jpg',
    imageAlt: 'Motion-blurred crowd moving through a busy street',
  },
  {
    number: '03',
    title: 'Capacity',
    description:
      "Delivery capacity doesn't scale with ambition. It has to be protected and allocated deliberately, not assumed.",
    detail:
      'Ambition grows faster than throughput, and unmanaged capacity quietly fills with maintenance, rework, and low-value requests before strategic work ever gets a share. Protecting capacity means deciding, in advance, what it is and isn\'t for.',
    ctaLabel: 'Explore Product Delivery Economics',
    ctaHref: 'services',
    accent: '#174E40',
    image: 'core-idea-capacity.jpg',
    imageAlt: 'A monochrome spiral of interlocking looped mesh patterns converging toward a dense center, evoking finite capacity pulled in many directions at once',
  },
  {
    number: '04',
    title: 'Time',
    description:
      'Market windows close. Every cycle spent deciding is a cycle not spent delivering — and the cost of delay compounds.',
    detail:
      'Indecision has a cost even when it feels safe — a delayed launch is a competitor\'s head start, and a stalled decision is capacity sitting idle. Speed of decision-making is itself an economic lever, not just an operational preference.',
    ctaLabel: 'Explore Delivery Stabilization',
    ctaHref: 'services',
    accent: '#B08900',
    image: 'core-idea-time.jpg',
    imageAlt: 'Vintage pocket watch amid dark still-life objects',
  },
  {
    number: '05',
    title: 'Attention',
    description:
      'Leadership focus is scarce and easily fragmented. Where attention goes, priority follows — whether intended or not.',
    detail:
      "What leadership pays attention to becomes the organization's real priority list, regardless of what the official roadmap says. Fragmented attention produces fragmented execution — protecting focus is as much a resource decision as protecting budget or headcount.",
    ctaLabel: 'Explore Our Services',
    ctaHref: 'services',
    accent: '#1A2744',
    image: 'core-idea-attention.jpg',
    imageAlt: 'Rain-streaked glass with blurred red light in the distance',
  },
];
