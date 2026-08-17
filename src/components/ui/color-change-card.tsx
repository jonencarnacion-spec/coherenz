import { motion, type Variants } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';

export interface ColorChangeCardItem {
  heading: string;
  description: string;
  imgSrc: string;
  pain?: string;
}

interface ColorChangeCardsProps {
  items: ColorChangeCardItem[];
}

export default function ColorChangeCards({ items }: ColorChangeCardsProps) {
  return (
    <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-6 px-6 sm:grid-cols-2">
      {items.map((item) => (
        <Card key={item.heading} {...item} />
      ))}
    </div>
  );
}

function Card({ heading, description, imgSrc, pain }: ColorChangeCardItem) {
  return (
    <motion.div
      transition={{ staggerChildren: 0.035 }}
      whileHover="hover"
      className="group relative h-64 w-full cursor-pointer overflow-hidden bg-navy"
    >
      <div
        className="absolute inset-0 saturate-100 transition-all duration-500 group-hover:scale-110 md:saturate-0 md:group-hover:saturate-100"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/65 via-transparent to-navy/85" />
      <div className="relative z-20 flex h-full flex-col justify-between p-6 text-white">
        <div className="flex items-start justify-between gap-4">
          {pain && (
            <p className="max-w-[75%] font-serif text-[28px] font-normal leading-snug">{pain}</p>
          )}
          <IconArrowRight
            size={28}
            strokeWidth={1.8}
            className="ml-auto shrink-0 transition-transform duration-500 group-hover:-rotate-45"
          />
        </div>
        <div>
          <h4 className="font-sans text-lg font-semibold text-white">
            {heading.split('').map((letter, index) => (
              <AnimatedLetter letter={letter} key={index} />
            ))}
          </h4>
          <p className="mt-2 max-w-[26rem] text-sm text-white/80">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

const letterVariants: Variants = {
  hover: { y: '-50%' },
};

function AnimatedLetter({ letter }: { letter: string }) {
  return (
    <span className="inline-block h-[1.3em] overflow-hidden align-top">
      <motion.span
        className="flex min-w-[4px] flex-col"
        style={{ y: '0%' }}
        variants={letterVariants}
        transition={{ duration: 0.5 }}
      >
        <span>{letter === ' ' ? ' ' : letter}</span>
        <span>{letter === ' ' ? ' ' : letter}</span>
      </motion.span>
    </span>
  );
}
