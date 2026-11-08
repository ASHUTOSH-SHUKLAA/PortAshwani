import { EDITOR_INFO, TOOLKIT } from '../data/config';

export default function AboutSection() {
  return <section id="about" className="border-t border-white/10 bg-[#0d0b0b] py-20 text-[#f1eee6] md:py-28" aria-label="About Ashwani">
    <div className="mx-auto max-w-[1280px] px-5 lg:px-20">
      <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-16">
        <div className="md:col-span-4"><img src={EDITOR_INFO.profileImage} alt="Ashwani" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div>
        <div className="md:col-span-8">
          <span className="label-meta mb-4 block text-[#c9a45c]">IDENTITY &amp; PERSPECTIVE</span>
          <h2 className="heading-section mb-6">A way of <span className="serif-editorial font-normal text-[#c9a45c]">seeing.</span></h2>
          <p className="max-w-2xl text-base leading-relaxed text-[#cbc4b5]">{EDITOR_INFO.bioFull}</p>
          <p className="mt-4 text-sm text-[#8a8175]">Based in {EDITOR_INFO.location} · Available for selected projects</p>
        </div>
      </div>
      <div id="toolkit" className="mt-20 border-t border-white/10 pt-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><span className="label-meta text-[#c9a45c]">SOFTWARE</span><h3 className="mt-2 font-display text-2xl font-semibold">Tools I work with</h3></div><p className="max-w-sm text-sm text-[#8a8175]">A focused set for editing, design, and visual development.</p></div>
        <div className="flex flex-wrap gap-2">{TOOLKIT.map((tool) => <span key={tool.name} className="border border-white/15 px-4 py-3 text-sm text-[#cbc4b5]">{tool.name}</span>)}</div>
      </div>
    </div>
  </section>;
}
