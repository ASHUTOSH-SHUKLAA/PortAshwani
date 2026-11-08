import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Maximize2, X } from 'lucide-react';
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
        <span className="absolute left-5 lg:left-20 top-[15%] label-meta text-[#f1eee6]/75">CHAPTER 02 / PERSONAL KEY ART</span>
        <h2 className="relative z-10 font-display text-[clamp(2.2rem,8vw,8rem)] leading-[.82] tracking-[-.075em] font-bold text-[#f1eee6]">PEAKY BLINDERS</h2>
        <img src="/images/peaky-figure-cutout.png" alt="" aria-hidden="true" className="absolute z-20 bottom-0 left-[29%] h-[88%] max-h-[680px] w-[44%] max-w-[600px] object-contain object-bottom pointer-events-none drop-shadow-[0_12px_40px_rgba(0,0,0,.5)]" />
        <div className="absolute z-30 bottom-7 right-5 lg:right-20 label-meta text-[#c9a45c]">PEAKY BLINDERS / BATMAN / EDITORIAL</div>
      </div>

      <div className="relative z-30 max-w-[1440px] mx-auto bg-[#f1eee6] text-[#0d0b0b] px-5 lg:px-16 py-14 md:py-20 shadow-[0_-24px_80px_rgba(0,0,0,.28)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-[#0d0b0b]/15 pb-7">
          <div><span className="label-meta text-[#b3121b] block mb-3">SELECTED WORK / 02</span><h3 className="heading-project text-[clamp(2rem,4vw,3.5rem)]">Key art &amp; poster design</h3></div>
          <p className="max-w-md text-sm leading-relaxed text-[#5d5750] md:text-right">Film tributes, character posters and independent visual explorations. Hover Batman artwork to shift the chapter backdrop.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {POSTERS_ARCHIVE.map((item, index) => <motion.article key={item.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: .45, delay: index * .04 }} onMouseEnter={() => setHoveredPoster(item)} onClick={() => setSelectedPoster(item)} className="group bg-[#faf8f0] p-3 cursor-pointer shadow-[0_12px_32px_rgba(22,15,10,.09)] hover:shadow-[0_18px_38px_rgba(22,15,10,.16)] transition-shadow" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedPoster(item); } }} aria-label={`View poster: ${item.title}`}>
            <div className="relative aspect-[3/4] overflow-hidden bg-[#171414]">
              <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute top-3 left-3 rounded-full bg-[#0d0b0b]/85 px-3 py-1 text-[9px] font-mono tracking-wider text-[#f1eee6]">{item.tag}</span>
              <span className="absolute right-3 bottom-3 w-9 h-9 rounded-full bg-[#f1eee6] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 size={15}/></span>
            </div>
            <div className="px-2 pt-4 pb-2">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[.14em] text-[#776f63]"><span>{item.category}</span><span>{item.year}</span></div>
              <h4 className="mt-2 text-lg font-display font-semibold leading-tight">{item.title}</h4>
              <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3"><div className="flex gap-2 text-[10px] font-mono text-[#6e675d]">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div><ArrowUpRight size={14} className="text-[#b3121b]" /></div>
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
