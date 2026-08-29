import { useState, useEffect, useRef, useCallback } from 'react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { base } from '../../lib/base';
import { promiseSlides, type PromiseSlide } from '../../data/promiseCarousel';
import './elegant-carousel.css';

// Adapted from a pasted 21st.dev "elegant-carousel" component. Source used
// generic fashion-brand copy/images and its own index.css -- both replaced
// with real Coherenz copy + Jon's own photos (promiseCarousel.ts) and a
// reskinned stylesheet (elegant-carousel.css). Icons swapped from
// lucide-react to @tabler/icons-react per DESIGN.md §4.
// `slides` defaults to the homepage's promiseSlides so Perspectives.astro's
// existing usage needs no changes; the approach page's "Core Idea" section
// passes its own coreIdeaSlides to reuse this same carousel treatment.
interface ElegantCarouselProps {
  slides?: PromiseSlide[];
  /** Overrides the progress-bar strip's background (defaults to the CSS wash-green, matching Perspectives.astro's usage). */
  progressBarBg?: string;
  /** Overrides the main panel's background (defaults to the CSS cream). */
  wrapperBg?: string;
}

export default function ElegantCarousel({ slides = promiseSlides, progressBarBg, wrapperBg }: ElegantCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const SLIDE_DURATION = 6000;
  const TRANSITION_DURATION = 800;

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return;
      setIsTransitioning(true);
      setProgress(0);

      setTimeout(() => {
        setCurrentIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, TRANSITION_DURATION / 2);
    },
    [isTransitioning, currentIndex]
  );

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % slides.length);
  }, [currentIndex, goToSlide, slides.length]);

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }, [currentIndex, goToSlide, slides.length]);

  useEffect(() => {
    if (isPaused) return;

    progressRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 100 / (SLIDE_DURATION / 50)));
    }, 50);

    intervalRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const slide = slides[currentIndex];

  return (
    <div
      className="carousel-wrapper"
      style={wrapperBg ? { background: wrapperBg } : undefined}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="carousel-bg-wash"
        style={{ background: `radial-gradient(ellipse at 70% 50%, ${slide.accent}18 0%, transparent 70%)` }}
      />

      <div className="carousel-inner">
        <div className="carousel-content">
          <div className="carousel-content-inner">
            <div className={`carousel-collection-num ${isTransitioning ? 'transitioning' : ''}`}>
              <span className="carousel-num-line" />
              <span className="carousel-num-text">
                {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
            </div>

            <h3 className={`carousel-title ${isTransitioning ? 'transitioning' : ''}`}>{slide.title}</h3>

            <p className={`carousel-description ${isTransitioning ? 'transitioning' : ''}`}>{slide.description}</p>

            {slide.detail && (
              <p className={`carousel-detail ${isTransitioning ? 'transitioning' : ''}`}>{slide.detail}</p>
            )}

            <a
              href={`${base}${slide.ctaHref}`}
              className={`carousel-cta ${isTransitioning ? 'transitioning' : ''}`}
              style={{ color: slide.accent }}
            >
              {slide.ctaLabel} →
            </a>

            <div className="carousel-nav-arrows">
              <button onClick={goPrev} className="carousel-arrow-btn" aria-label="Previous slide">
                <IconArrowLeft size={20} />
              </button>
              <button onClick={goNext} className="carousel-arrow-btn" aria-label="Next slide">
                <IconArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="carousel-image-container">
          <div className={`carousel-image-frame ${isTransitioning ? 'transitioning' : ''}`}>
            <img src={`${base}img/photography/${slide.image}`} alt={slide.imageAlt} className="carousel-image" />
            <div
              className="carousel-image-overlay"
              style={{ background: `linear-gradient(135deg, ${slide.accent}22 0%, transparent 50%)` }}
            />
          </div>
          <div className="carousel-frame-corner carousel-frame-corner--tl" style={{ borderColor: slide.accent }} />
          <div className="carousel-frame-corner carousel-frame-corner--br" style={{ borderColor: slide.accent }} />
        </div>
      </div>

      <div className="carousel-progress-bar" style={progressBarBg ? { background: progressBarBg } : undefined}>
        {slides.map((s, index) => (
          <button
            key={s.number}
            onClick={() => goToSlide(index)}
            className={`carousel-progress-item ${index === currentIndex ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <div className="carousel-progress-track">
              <div
                className="carousel-progress-fill"
                style={{
                  transform: `scaleX(${index === currentIndex ? progress / 100 : index < currentIndex ? 1 : 0})`,
                  backgroundColor: index === currentIndex ? s.accent : undefined,
                }}
              />
            </div>
            <span className="carousel-progress-label">{s.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
