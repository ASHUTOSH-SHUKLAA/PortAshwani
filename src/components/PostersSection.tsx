import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import { POSTERS_ARCHIVE, PosterItem } from '../data/config';

export default function PostersSection() {
  const [selectedPoster, setSelectedPoster] = useState<PosterItem | null>(null);
  const [hoveredPoster, setHoveredPoster] = useState<PosterItem | null>(null);
  const backdrop = hoveredPoster?.title.toLowerCase().includes('batman') ? hoveredPoster.image : null;

  return <>
    <section id="experiments" className="relative overflow-hidden bg-[#0d0b0b]" aria-label="Poster design archive" onMouseLeave={() => setHoveredPoster(null)}>
      <div className="absolute inset-x-0 top-0 h-[76vh] min-h-[520px] overflow-hidden bg-[radial-gradient(ellipse_at_50%_38%,rgba(179,18,27,.34),transparent_34%),radial-gradient(ellipse_at_50%_78%,rgba(201,164,92,.08),transparent_44%),linear-gradient(180deg,#0d0b0b_0%,#170d0e_48%,#0d0b0b_100%)]">
        {backdrop && <img key={backdrop} src={backdrop} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-25 transition-opacity duration-700" />}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_46%,transparent_12%,rgba(13,11,11,.22)_70%,#0d0b0b_100%)]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto min-h-[68vh] px-5 lg:px-20 flex items-end pb-16 md:pb-24 overflow-hidden">
        <span className="absolute left-5 lg:left-20 top-[15%] label-meta text-[#f1eee6]/75">PERSONAL KEY ART / POSTER COLLECTION</span>
        <h2 className="relative z-10 font-display text-[clamp(2.2rem,8vw,8rem)] leading-[.82] tracking-[-.075em] font-bold text-[#f1eee6]">PEAKY BLINDERS</h2>
        <img src="/images/peaky-figure-cutout.png" alt="" aria-hidden="true" className="absolute z-20 bottom-0 left-[29%] h-[88%] max-h-[680px] w-[44%] max-w-[600px] object-contain object-bottom pointer-events-none drop-shadow-[0_12px_40px_rgba(0,0,0,.5)]" />
        <div className="absolute z-30 bottom-7 right-5 lg:right-20 label-meta text-[#c9a45c]">PEAKY BLINDERS / BATMAN / EDITORIAL</div>
      </div>

      <div className="relative z-30 mx-auto max-w-[1440px] bg-[#0d0b0b] px-5 py-12 text-[#f1eee6] md:px-10 md:py-16 lg:px-16">
        <div className="mb-8 flex flex-col justify-between gap-6 border-b border-white/15 pb-7 md:mb-10 md:flex-row md:items-end">
          <div><span className="label-meta mb-3 block text-[#c9a45c]">POSTER ARCHIVE</span><h3 className="heading-project text-[clamp(2rem,4vw,3.5rem)]">Key art &amp; poster design</h3></div>
          <p className="max-w-md text-sm leading-relaxed text-[#cbc4b5] md:text-right">Film tributes, character posters and independent visual explorations. Hover Batman artwork to shift the chapter backdrop.</p>
        </div>
        <div className="columns-2 gap-2 sm:columns-3 lg:columns-4 lg:gap-3">
          {POSTERS_ARCHIVE.map((item, index) => <motion.article key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .45, delay: index * .035 }} onMouseEnter={() => setHoveredPoster(item)} onClick={() => setSelectedPoster(item)} className="group relative mb-2 block cursor-pointer break-inside-avoid overflow-hidden bg-[#171414] lg:mb-3" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPoster(item); } }} aria-label={`View poster: ${item.title}`}>
              <img src={item.image} alt={item.title} loading="lazy" className="block h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.015]" />
              <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-2 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-3 pt-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 sm:p-4 sm:pt-16">
                <div><span className="block text-[9px] font-mono uppercase tracking-[.14em] text-[#c9a45c]">{item.category} · {item.year}</span><h4 className="mt-1 font-display text-sm font-semibold leading-tight text-white sm:text-base">{item.title}</h4></div>
                <Maximize2 size={15} className="mb-0.5 shrink-0 text-[#c8ff4d]" />
              </div>
          </motion.article>)}
        </div>
      </div>
    </section>

    <AnimatePresence>
      {selectedPoster && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] flex items-center justify-center bg-[#070606] p-3 sm:p-6 md:p-8" onClick={(e) => { if (e.target === e.currentTarget) setSelectedPoster(null); }} role="dialog" aria-modal="true" aria-label={selectedPoster.title}>
        <button onClick={() => setSelectedPoster(null)} className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 rounded-full bg-[#f1eee6] p-3 text-[#0d0b0b] shadow-xl hover:bg-[#c8ff4d] transition-colors" aria-label="Close poster"><X size={18}/></button>
        <div className="relative flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_340px] max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-sm border border-white/10 bg-[#120f0f] shadow-2xl">
          <div className="flex min-h-[280px] max-h-[55vh] md:max-h-[85vh] items-center justify-center bg-black p-4"><img src={selectedPoster.image} alt={selectedPoster.title} className="max-h-full max-w-full object-contain drop-shadow-2xl" /></div>
          <div className="flex flex-col justify-between p-6 sm:p-7 md:p-8 bg-[#161212] border-t md:border-t-0 md:border-l border-white/10 text-[#f1eee6]">
            <div>
              <span className="label-meta text-[#c9a45c]">{selectedPoster.tag} / {selectedPoster.year}</span>
              <h3 className="heading-project mt-3 text-[#f1eee6]">{selectedPoster.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#cbc4b5]">{selectedPoster.description}</p>
            </div>
            <div className="mt-6 border-t border-white/15 pt-4">
              <span className="block text-[10px] font-mono tracking-wider text-[#8a8a84] mb-1">TOOLS USED</span>
              <p className="text-xs font-mono text-[#f1eee6]">{selectedPoster.tools.join(' · ')}</p>
            </div>
          </div>
        </div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
