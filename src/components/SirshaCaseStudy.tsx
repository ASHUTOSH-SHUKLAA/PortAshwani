import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SIRSHA_SLIDES } from '../data/config';

interface SirshaCaseStudyProps {
  onBack?: () => void;
  onContact?: () => void;
}

export default function SirshaCaseStudy({ onBack, onContact }: SirshaCaseStudyProps) {
  const [active, setActive] = useState(() => {
    const requested = Number(new URLSearchParams(window.location.search).get('slide'));
    return Number.isInteger(requested) && requested > 0 && requested <= SIRSHA_SLIDES.length ? requested - 1 : 0;
  });

  const slide = SIRSHA_SLIDES[active];
  const previous = () => setActive((n) => (n + SIRSHA_SLIDES.length - 1) % SIRSHA_SLIDES.length);
  const next = () => setActive((n) => (n + 1) % SIRSHA_SLIDES.length);

  // Sync slide change with URL without triggering reloads
  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('slide', String(active + 1));
    window.history.replaceState({}, '', currentUrl.toString());
  }, [active]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'Escape') onBack?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onBack]);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBack) {
      onBack();
    } else if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/#logos';
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContact) {
      onContact();
    } else {
      window.location.href = '/#contact';
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0b0b] text-[#f1eee6]">
      <header className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#0d0b0b]/80 px-5 backdrop-blur-md md:px-10">
        <button
          type="button"
          onClick={handleBackClick}
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider text-[#f1eee6] hover:text-[#c8ff4d] transition-colors cursor-pointer"
          aria-label="Back to portfolio"
        >
          <ArrowLeft size={15} /> Back to portfolio
        </button>
        <button
          type="button"
          onClick={handleContactClick}
          className="text-[10px] font-mono uppercase tracking-wider text-[#f1eee6]/75 transition-colors hover:text-[#c8ff4d] cursor-pointer"
        >
          Contact
        </button>
        <span className="hidden text-[10px] font-mono uppercase tracking-[.2em] text-[#c9a45c] sm:block">
          ASHWANI® / IDENTITY CASE STUDY
        </span>
      </header>

      <section className="mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 items-center gap-8 px-5 pb-24 pt-24 md:grid-cols-12 md:px-10 lg:px-20">
        <div className="relative z-10 md:col-span-4">
          <span className="label-meta text-[#c9a45c]">SIRSHA / FASHION IDENTITY</span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[.95] tracking-[-.06em] md:text-7xl">
            A mark<br />with <span className="serif-editorial font-normal text-[#b3121b]">grace.</span>
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#cbc4b5]">
            An identity system for a contemporary fashion label. The visual language pairs a fine-line monogram with composed typography, deep teal, soft blush and tactile applications.
          </p>
          <div className="mt-7 grid max-w-sm grid-cols-2 gap-y-4 border-y border-white/15 py-5 text-xs">
            <span className="text-[#8a8a84]">DELIVERABLE</span>
            <span className="text-right">Brand identity</span>
            <span className="text-[#8a8a84]">ROLE</span>
            <span className="text-right">Identity design</span>
            <span className="text-[#8a8a84]">YEAR</span>
            <span className="text-right">2026</span>
            <span className="text-[#8a8a84]">TOOLS</span>
            <span className="text-right">Illustrator · Photoshop</span>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={previous}
              className="rounded-full border border-white/20 p-3 hover:border-[#c8ff4d] transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              onClick={next}
              className="rounded-full bg-[#c8ff4d] p-3 text-[#0d0b0b] hover:bg-[#d6ff73] transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ArrowRight size={17} />
            </button>
            <span className="ml-2 text-[10px] font-mono uppercase tracking-widest text-[#8a8a84]">
              Use ← → to explore
            </span>
          </div>
        </div>

        <div className="relative md:col-span-8">
          <AnimatePresence mode="wait">
            <motion.figure
              key={slide.id}
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -22 }}
              transition={{ duration: 0.35 }}
              className="relative flex min-h-[52vh] items-center justify-center overflow-hidden bg-[#112b30] p-4 md:min-h-[72vh] md:p-10"
            >
              <img
                src={slide.url}
                alt={`${slide.title} — Sirsha case study`}
                className="max-h-[68vh] w-full object-contain"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#0d0b0b]/90 to-transparent px-5 pb-5 pt-16 md:px-8 md:pb-8">
                <div>
                  <span className="label-meta text-[#c9a45c]">{slide.tag} / {slide.year}</span>
                  <h2 className="mt-1 text-lg font-display font-semibold md:text-2xl">{slide.title}</h2>
                </div>
                <span className="flex items-center gap-2 text-xs font-mono text-[#f1eee6]/75">
                  SIRSHA <ArrowUpRight size={14} />
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
          <div className="mt-4 grid grid-cols-8 gap-2">
            {SIRSHA_SLIDES.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                aria-label={`Go to slide ${index + 1}: ${item.title}`}
                aria-current={active === index}
                className={`h-1.5 transition-colors cursor-pointer ${
                  active === index ? 'bg-[#c8ff4d]' : 'bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
