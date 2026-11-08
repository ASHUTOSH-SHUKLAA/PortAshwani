import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { FASHION_GALLERY, PORTRAIT_GALLERY, PRODUCT_GALLERY, SIRSHA_SLIDES } from '../data/config';

export default function VisualGalleries() {
  const rail = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<{ url: string; title: string } | null>(null);
  const stepRail = (direction: number) => rail.current?.scrollBy({ left: direction * rail.current.clientWidth * .82, behavior: 'smooth' });

  return <>
    <section id="fashion" className="overflow-hidden border-t border-white/10 bg-[#0d0b0b] py-24 md:py-32 text-[#f1eee6]">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-20">
        <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><span className="label-meta mb-3 block text-[#c9a45c]">CHAPTER 03 / FASHION FILM</span><h2 className="heading-section">FASHION,<br/><span className="serif-editorial font-normal text-[#c9a45c]">in frame.</span></h2></div>
          <div className="flex max-w-md items-end justify-between gap-6"><p className="text-sm leading-relaxed text-[#cbc4b5]">A sequence from the red-curtain set through the night streets, ending in firelight.</p><div className="hidden shrink-0 gap-2 md:flex"><button onClick={() => stepRail(-1)} className="rounded-full border border-white/20 p-3 hover:border-[#c8ff4d]" aria-label="Previous fashion photo"><ArrowLeft size={16}/></button><button onClick={() => stepRail(1)} className="rounded-full border border-white/20 p-3 hover:border-[#c8ff4d]" aria-label="Next fashion photo"><ArrowRight size={16}/></button></div></div>
        </div>
      </div>
      <div ref={rail} className="fashion-rail flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-7 md:gap-6 md:px-[max(5rem,calc((100vw-1280px)/2))]">
        {FASHION_GALLERY.map((photo, index) => <article key={photo.id} className="fashion-frame group relative h-[65vh] min-h-[420px] max-h-[780px] w-[86vw] max-w-[1080px] shrink-0 snap-center overflow-hidden bg-[#211b19] md:w-[78vw]">
          <img src={photo.url} alt={photo.title} loading={index < 2 ? 'eager' : 'lazy'} className="absolute inset-0 h-full w-full object-contain p-3 md:p-6 brightness-[1.06] contrast-[.9] saturate-[.88] sepia-[.12]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b0b]/65 via-[#0d0b0b]/10 to-[#0d0b0b]/20" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 md:p-10"><div><span className="label-meta mb-2 block text-[#c9a45c]">{String(index + 1).padStart(2, '0')} / {photo.tag}</span><h3 className="font-display text-2xl font-semibold md:text-4xl">{photo.title}</h3><p className="mt-2 text-xs text-[#cbc4b5]">{photo.year} · Fashion photography</p></div><span className="hidden text-right text-[10px] font-mono uppercase tracking-[.16em] text-[#f1eee6]/75 md:block">RED CURTAIN <span className="text-[#c9a45c]">/</span> STREET <span className="text-[#c9a45c]">/</span> FIRELIGHT</span></div>
        </article>)}
        <button onClick={() => setShowAll(true)} className="flex h-[65vh] min-h-[420px] w-[58vw] max-w-[560px] shrink-0 snap-center flex-col items-start justify-between bg-[#b3121b] p-7 text-left text-[#f1eee6] transition-colors hover:bg-[#941018] md:p-10"><span className="label-meta">FASHION ARCHIVE / {FASHION_GALLERY.length} FRAMES</span><span className="font-display text-5xl font-semibold tracking-tight md:text-7xl">See<br/>everything<span className="text-[#c9a45c]">.</span></span><span className="flex items-center gap-3 text-xs font-mono uppercase tracking-[.18em]">Open the gallery <ArrowUpRight size={16}/></span></button>
      </div>
    </section>

    {[{ id: 'portraits', title: 'Portrait photography', items: PORTRAIT_GALLERY }, { id: 'products', title: 'Product photography', items: PRODUCT_GALLERY }].filter((group) => group.items.length > 0).map((group) => <section key={group.id} id={group.id} className="border-t border-white/10 bg-[#141111] py-16 text-[#f1eee6] md:py-20">
      <div className="mx-auto max-w-[1280px] px-5 lg:px-20">
        <div className="mb-8 flex items-end justify-between gap-4"><div><span className="label-meta mb-2 block text-[#c9a45c]">PHOTOGRAPHY / {group.items.length} FRAMES</span><h2 className="heading-project">{group.title}</h2></div></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{group.items.map((photo) => <button key={photo.id} onClick={() => setSelected(photo)} className="group relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-[#0d0b0b] p-2" aria-label={`View ${photo.title}`}><img src={photo.url} alt={photo.title} loading="lazy" className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"/><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8 text-left text-xs text-white">{photo.title}</span></button>)}</div>
      </div>
    </section>)}

    <section id="logos" className="border-t border-[#d9d2c4] bg-[#f1eee6] py-24 text-[#0d0b0b] md:py-32">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 md:grid-cols-12 md:items-center lg:px-20">
        <div className="md:col-span-5"><span className="label-meta mb-4 block text-[#b3121b]">CHAPTER 04 / IDENTITY</span><h2 className="heading-section">One identity.<br/><span className="serif-editorial font-normal text-[#b3121b]">Eight frames.</span></h2><p className="mt-6 max-w-md text-sm leading-relaxed text-[#625b51]">Sirsha is a fashion identity shaped through its mark, typography, colour system, applications and merchandise.</p><div className="mt-6 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-wider text-[#4c463f]"><span className="rounded-full border border-black/15 px-3 py-2">Client work</span><span className="rounded-full border border-black/15 px-3 py-2">2026</span><span className="rounded-full border border-black/15 px-3 py-2">Illustrator · Photoshop</span></div></div>
        <div className="md:col-span-7">
          <div className="columns-2 gap-3 md:columns-2 lg:columns-3">
            {SIRSHA_SLIDES.map((slide, index) => {
              const slideUrl = `/work/sirsha?slide=${index + 1}`;
              return (
                <a
                  key={slide.id}
                  href={slideUrl}
                  onClick={(e) => {
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                      e.preventDefault();
                      window.history.pushState({}, '', slideUrl);
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }
                  }}
                  className="group relative mb-3 block break-inside-avoid overflow-hidden bg-[#102c32] p-2 md:p-3 cursor-pointer"
                  aria-label={`Open Sirsha case study at ${slide.title}`}
                >
                  <img
                    src={slide.url}
                    alt={slide.title}
                    loading="lazy"
                    className="block h-auto max-h-[70vh] w-full object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#0d0b0b]/90 to-transparent px-3 pb-3 pt-10 text-left text-[11px] text-[#f1eee6] md:px-4 md:pb-4">
                    <span>
                      <span className="mb-1 block font-mono text-[9px] text-[#c9a45c]">{String(index + 1).padStart(2, '0')} / {slide.tag}</span>
                      {slide.title}
                    </span>
                    <ArrowUpRight size={14} className="shrink-0 text-[#c9a45c]" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>

    <AnimatePresence>
      {showAll && (
        <motion.div
          className="fixed inset-0 z-[150] overflow-y-auto bg-[#070606] p-5 pt-20 md:p-10 md:pt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Fashion photography archive"
        >
          <button
            onClick={() => setShowAll(false)}
            className="fixed right-5 top-5 z-20 rounded-full bg-[#f1eee6] p-3 text-[#0d0b0b] shadow-xl hover:bg-[#c8ff4d] transition-colors"
            aria-label="Close fashion archive"
          >
            <X size={20}/>
          </button>
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {FASHION_GALLERY.map((photo) => (
              <button
                key={photo.id}
                onClick={() => setSelected(photo)}
                className="group relative flex min-h-64 items-center justify-center overflow-hidden bg-[#171414] p-2 text-left"
              >
                <img src={photo.url} alt={photo.title} loading="lazy" className="max-h-[70vh] max-w-full object-contain brightness-[.94]"/>
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-3 pt-8 text-left text-xs text-white">
                  {photo.title}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {selected && (
        <motion.div
          className="fixed inset-0 z-[170] flex flex-col items-center justify-center bg-[#070606] p-3 sm:p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 z-20 rounded-full bg-[#f1eee6] p-3 text-[#0d0b0b] shadow-xl hover:bg-[#c8ff4d] transition-colors"
            aria-label="Close image"
          >
            <X size={20}/>
          </button>
          
          <div className="relative flex flex-col items-center max-w-5xl max-h-[92vh] w-full rounded-sm overflow-hidden bg-[#120f0f] border border-white/10 shadow-2xl p-2 sm:p-4">
            <div className="flex items-center justify-center w-full max-h-[78vh] overflow-hidden bg-black rounded-sm p-1 sm:p-2">
              <img
                src={selected.url}
                alt={selected.title}
                className="max-h-[74vh] w-auto max-w-full object-contain drop-shadow-2xl"
              />
            </div>
            {selected.title && (
              <div className="w-full pt-3 pb-1 px-3 flex items-center justify-between text-xs font-mono text-[#cbc4b5]">
                <span className="font-sans font-medium text-sm text-[#f1eee6]">{selected.title}</span>
                <span className="text-[#c9a45c]">ASHWANI® ARCHIVE</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </>;
}
