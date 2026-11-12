import { EDITOR_INFO, TOOLKIT } from '../data/config';

export default function AboutSection() {
  return <section id="about" className="border-t border-white/10 bg-[#0d0b0b] py-20 text-[#f1eee6] md:py-28" aria-label="About Ashwani">
    <div className="mx-auto max-w-[1280px] px-5 lg:px-20">
      <div className="max-w-4xl">
        <span className="label-meta mb-4 block text-[#c9a45c]">IDENTITY &amp; PERSPECTIVE</span>
        <h2 className="heading-section mb-7">I’m fluent in <span className="serif-editorial font-normal text-[#c9a45c]">silence.</span></h2>
        <div className="space-y-5 text-base leading-relaxed text-[#cbc4b5]">
          {EDITOR_INFO.bioFull.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>

      <div id="toolkit" className="mt-16 border-t border-white/10 pt-8 md:mt-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div><span className="label-meta text-[#c9a45c]">SOFTWARE</span><h3 className="mt-2 font-display text-2xl font-semibold">Tools I work with</h3></div>
          <p className="max-w-sm text-sm text-[#8a8175]">A few of the tools behind the work.</p>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
          {TOOLKIT.map((tool) => <div key={tool.name} className="group flex flex-col items-center gap-3 border border-white/10 bg-white/[.025] px-2 py-4 transition-colors hover:border-[#c9a45c]/60 sm:py-5" title={tool.name}>
            <img src={tool.icon} alt={`${tool.name} icon`} loading="lazy" className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14" />
            <span className="text-center text-[10px] font-mono text-[#cbc4b5] sm:text-xs">{tool.name}</span>
          </div>)}
        </div>
      </div>
    </div>
  </section>;
}
