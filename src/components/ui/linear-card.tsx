// Expandable-card-to-modal component, adapted from a pasted third-party
// reference into this project's actual conventions rather than copied
// verbatim:
// - lucide-react's XIcon/Plus swapped for the already-used @tabler/icons-react
//   equivalents (DESIGN.md §4: "Don't mix Tabler with other icon libraries").
// - dark: variants and off-palette gray/zinc classes removed -- this site
//   has no dark mode, and DESIGN.md §1 locks the palette to six named
//   tokens; the resting/expanded surfaces now use --cream/--navy/--orange.
// - `motion` and `cn` are both already project dependencies (see
//   floating-dock.tsx for the same import pattern), so no new packages.
// - Wrapper grid changed from the reference's bare `flex gap-4` (which
//   never wraps on narrow screens) to the same `grid-cols-1 lg:grid-cols-3`
//   layout every other card row on this page already uses.
'use client';
import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from 'react';
import { motion, AnimatePresence, MotionConfig, type Transition, type Variant } from 'motion/react';
import { cn } from '@/lib/utils';
import { IconX, IconPlus } from '@tabler/icons-react';

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const DialogContext = React.createContext<DialogContextType | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

type DialogProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function DialogProvider({ children, transition }: DialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(() => ({ isOpen, setIsOpen, uniqueId, triggerRef }), [isOpen, uniqueId]);

  return (
    <DialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogContext.Provider>
  );
}

type DialogProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function Dialog({ children, transition }: DialogProps) {
  return (
    <DialogProvider>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogProvider>
  );
}

type DialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogTrigger({ children, className, style }: DialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('relative cursor-pointer', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`dialog-content-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogContent({ children, className, style }: DialogContentProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstFocusableElement, setFirstFocusableElement] = useState<HTMLElement | null>(null);
  const [lastFocusableElement, setLastFocusableElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
      if (event.key === 'Tab') {
        if (!firstFocusableElement || !lastFocusableElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen, firstFocusableElement, lastFocusableElement]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        setFirstFocusableElement(focusableElements[0] as HTMLElement);
        setLastFocusableElement(focusableElements[focusableElements.length - 1] as HTMLElement);
        (focusableElements[0] as HTMLElement).focus();
      }
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  return (
    <motion.div
      ref={containerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('overflow-hidden', className)}
      style={style}
      // Swipe left/right to dismiss -- the X button is easy to miss
      // against a full-bleed photo, and this is the more natural mobile
      // gesture anyway. drag="x" only captures horizontal movement (sets
      // touch-action: pan-y under the hood), so it doesn't fight the
      // vertical overflow-y-auto scrolling this same element already
      // does for longer descriptions. dragElastic gives the drag a soft
      // rubber-band feel that snaps back if it doesn't clear the
      // threshold, rather than 1:1 tracking the finger.
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(_event, info) => {
        if (Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 500) {
          setIsOpen(false);
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`dialog-title-${uniqueId}`}
      aria-describedby={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type DialogContainerProps = {
  children: React.ReactNode;
  className?: string;
};

function DialogContainer({ children, className }: DialogContainerProps) {
  const { isOpen, setIsOpen, uniqueId } = useDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
    }
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  return (
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 z-50 h-full w-full bg-navy/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <div className={cn('fixed inset-0 z-50 mx-auto w-fit', className)}>{children}</div>
        </>
      )}
    </AnimatePresence>
  );
}

type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
};

function DialogTitle({ children, className }: DialogTitleProps) {
  const { uniqueId } = useDialog();
  return (
    <motion.div layoutId={`dialog-title-container-${uniqueId}`} className={className} layout>
      {children}
    </motion.div>
  );
}

type DialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function DialogDescription({ children, className, variants, disableLayoutAnimation }: DialogDescriptionProps) {
  const { uniqueId } = useDialog();
  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      layoutId={disableLayoutAnimation ? undefined : `dialog-description-content-${uniqueId}`}
      variants={variants}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type DialogImageProps = {
  src: string;
  alt: string;
  className?: string;
};

function DialogImage({ src, alt, className }: DialogImageProps) {
  const { uniqueId } = useDialog();
  return <motion.img src={src} alt={alt} className={cn(className)} layoutId={`dialog-img-${uniqueId}`} />;
}

type DialogCloseProps = {
  className?: string;
};

function DialogClose({ className }: DialogCloseProps) {
  const { setIsOpen, uniqueId } = useDialog();
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <motion.button
      onClick={handleClose}
      type="button"
      aria-label="Close"
      key={`dialog-close-${uniqueId}`}
      className={cn('absolute right-6 top-6', className)}
    >
      <IconX size={22} stroke={2} />
    </motion.button>
  );
}

export interface LinearCardItem {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  /** Longer version shown in the expanded modal; falls back to `description` if omitted. */
  descriptionLong?: string;
}

interface LinearCardProps {
  items: LinearCardItem[];
}

const LinearCard = forwardRef<HTMLDivElement, LinearCardProps>(({ items }, ref) => {
  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {items.map((item) => (
        <Dialog key={item.id} transition={{ type: 'spring', bounce: 0.05, duration: 0.5 }}>
          <DialogTrigger className="flex w-full flex-col overflow-hidden border border-line border-t-4 border-t-orange bg-cream hover:bg-cream/70">
            <DialogImage src={item.image} alt="" className="h-56 w-full object-cover" />
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-navy/60">{item.eyebrow}</p>
              <DialogTitle className="mt-2 font-serif text-xl text-navy">{item.title}</DialogTitle>
              <p className="mt-3 text-sm text-foreground/70">{item.description}</p>
            </div>
            <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-orange/10 text-orange">
              <IconPlus size={18} stroke={2} />
            </span>
          </DialogTrigger>
          <DialogContainer className="pt-20">
            <DialogContent className="relative mx-auto flex h-[75vh] w-[90%] flex-col overflow-y-auto border border-line bg-cream lg:w-[860px]">
              <DialogImage src={item.image} alt="" className="mx-auto h-[45%] w-full object-cover" />
              <div className="p-8 sm:p-10">
                <p className="text-xs font-bold uppercase tracking-wide text-navy/60">{item.eyebrow}</p>
                <DialogTitle className="mt-2 font-serif text-3xl text-navy sm:text-4xl">{item.title}</DialogTitle>
                <DialogDescription
                  disableLayoutAnimation
                  variants={{
                    initial: { opacity: 0, y: -20 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -20 },
                  }}
                >
                  <p className="mt-4 text-foreground/70">{item.descriptionLong ?? item.description}</p>
                </DialogDescription>
              </div>
              <DialogClose className="bg-orange/10 p-3 text-orange hover:bg-orange/20" />
            </DialogContent>
          </DialogContainer>
        </Dialog>
      ))}
    </div>
  );
});

LinearCard.displayName = 'LinearCard';

export default LinearCard;
