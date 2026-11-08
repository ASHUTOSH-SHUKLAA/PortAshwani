import { useEffect, useState } from 'react';

const chapters = [
  { time: '00:00', title: 'Intro', id: 'hero', thumb: '/images/ashwani-hero-cutout.png' },
  { time: '00:01', title: 'Videos', id: 'work', thumb: '/media/video-thumbnails/video-02.jpg' },
  { time: '00:02', title: 'Posters', id: 'experiments', thumb: '/media/optimized/posters/poster-03.webp' },
  { time: '00:03', title: 'Fashion', id: 'fashion', thumb: '/media/optimized/fashion/fashion-01.webp' },
  { time: '00:04', title: 'Logos', id: 'logos', thumb: '/media/optimized/sirsha/sirsha-01.webp' },
  { time: '00:05', title: 'Portraits', id: 'portraits', thumb: '/media/optimized/portraits/portrait-01.webp' },
  { time: '00:06', title: 'Products', id: 'products', thumb: '/media/optimized/products/product-01.webp' },
  { time: '00:07', title: 'About', id: 'about', thumb: '/images/profile.jpg' },
  { time: '00:08', title: 'Toolkit', id: 'toolkit', thumb: '/images/profile.jpg' },
  { time: '00:09', title: 'Contact', id: 'contact', thumb: '/images/profile.jpg' },
];

export default function ChapterIndex() {
  const [active, setActive] = useState('hero');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nodes = chapters.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => !!node);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); }), { threshold: 0.48 });
    nodes.forEach((node) => observer.observe(node));
    const updateProgress = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(range > 0 ? window.scrollY / range : 0);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', updateProgress); };
  }, []);

  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return <>
    <aside className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 2xl:block" aria-label="Chapter index">
      <div className="relative pl-5">
        <div className="absolute bottom-1 left-1 top-1 w-px bg-white/15" />
        <div className="absolute left-1 top-1 w-px origin-top bg-[#c8ff4d] transition-transform" style={{ height: 'calc(100% - 8px)', transform: `scaleY(${progress})` }} />
        <nav className="flex flex-col gap-3">
          {chapters.map((chapter) => <button key={chapter.id} onClick={() => jump(chapter.id)} onKeyDown={(e) => { if (e.key === 'Enter') jump(chapter.id); }} className={`group relative flex items-center gap-2 text-left text-[10px] font-mono transition-colors ${active === chapter.id ? 'text-[#f1eee6] opacity-100' : 'text-[#f1eee6]/45 hover:text-[#f1eee6]/85'}`} aria-current={active === chapter.id ? 'location' : undefined}>
            <span className={`w-[5px] h-[5px] rounded-full ${active === chapter.id ? 'bg-[#c8ff4d]' : 'bg-[#f1eee6]/25'}`} />
            <span className="w-10 text-[9px] text-[#c9a45c]/70">{chapter.time}</span><span className="whitespace-nowrap">{chapter.title}</span>
            <span className="pointer-events-none absolute left-full ml-3 h-20 w-16 overflow-hidden border border-white/20 bg-[#0d0b0b] opacity-0 transition-opacity group-hover:opacity-100"><img src={chapter.thumb} alt="" className="h-full w-full object-cover" /></span>
          </button>)}
        </nav>
      </div>
    </aside>

    <nav className="fixed inset-x-0 bottom-0 z-40 flex gap-4 overflow-x-auto border-t border-white/10 bg-[#0d0b0b]/95 px-4 py-3 backdrop-blur-md md:hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden touch-pan-x" aria-label="Chapter scrubber">
      {chapters.map((chapter) => <button key={chapter.id} onClick={() => jump(chapter.id)} className={`shrink-0 text-[9px] font-mono uppercase tracking-wider ${active === chapter.id ? 'text-[#c8ff4d]' : 'text-[#f1eee6]/50'}`} aria-current={active === chapter.id ? 'location' : undefined}>{chapter.time} &nbsp;{chapter.title}</button>)}
    </nav>
  </>;
}
