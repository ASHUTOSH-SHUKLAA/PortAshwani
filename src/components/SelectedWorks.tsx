import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { VIDEO_ARCHIVE, Project } from '../data/config';
import ProjectModal from './ProjectModal';

export default function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewReadyId, setPreviewReadyId] = useState<string | null>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const handleHover = (id: string | null) => {
    setHoveredId(id);
    if (!id) setPreviewReadyId(null);
    videoRefs.current.forEach((video, videoId) => {
      if (videoId === id) video.play().catch(() => {});
      else video.pause();
    });
  };

  return <>
    <section id="work" className="bg-[#0d0b0b] py-24 md:py-32" aria-label="Video archive">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-20">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:mb-12 md:flex-row md:items-end">
          <div>
            <span className="label-meta mb-4 block text-[#c9a45c]">SELECTED WORK / 01</span>
            <h2 className="heading-section text-[#f1eee6]">REELS,<br/><span className="serif-editorial font-normal text-[#c9a45c]">in motion.</span></h2>
          </div>
          <p className="body-regular max-w-md text-sm md:text-right">Short films, edits and visual studies. Select a frame to watch the full reel.</p>
        </div>

        <div className="mb-0 flex items-center justify-between border-b border-[#0d0b0b]/15 bg-[#f1eee6] px-4 py-3 text-[10px] font-mono tracking-[.16em] text-[#625b51] md:px-6">
          <span>FILM / MOTION / EDIT</span><span>{String(VIDEO_ARCHIVE.length).padStart(2, '0')} REELS</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .3 }} className="bg-[#f1eee6] p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {VIDEO_ARCHIVE.map((project, index) => {
                const isHovered = hoveredId === project.id;
                return <article key={project.id} onClick={() => setSelectedProject(project)} onMouseEnter={() => handleHover(project.id)} onMouseLeave={() => handleHover(null)} className="group cursor-pointer bg-[#faf8f0] p-2 shadow-[0_8px_24px_rgba(22,15,10,.08)] transition-shadow hover:shadow-[0_16px_34px_rgba(22,15,10,.16)]" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(project); } }} aria-label={`Watch video: ${project.title}`}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#171414]">
                    <img src={project.thumbnail} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${previewReadyId === project.id ? 'opacity-0' : 'opacity-100'}`} />
                    <video ref={(el) => { if (el) videoRefs.current.set(project.id, el); else videoRefs.current.delete(project.id); }} src={project.videoUrl} muted loop playsInline preload="none" onPlaying={() => setPreviewReadyId(project.id)} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${isHovered ? 'scale-[1.035]' : ''} ${previewReadyId === project.id ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                    <span className="absolute left-3 top-3 bg-[#0d0b0b]/75 px-2 py-1 text-[9px] font-mono tracking-wider text-[#f1eee6]">{project.projectNumber || String(index + 1).padStart(2, '0')}</span>
                    <span className="absolute inset-0 flex items-center justify-center"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c8ff4d] text-[#0d0b0b] shadow-xl transition-transform duration-300 group-hover:scale-110"><Play size={16} fill="currentColor" className="ml-0.5"/></span></span>
                  </div>
                  <div className="px-2 pb-2 pt-3">
                    <div className="mb-1 flex items-center justify-between gap-2"><span className="truncate text-[9px] font-mono uppercase tracking-[.13em] text-[#b3121b]">{project.category}</span><ArrowUpRight size={13} className="shrink-0 text-[#b3121b]"/></div>
                    <h3 className="line-clamp-1 font-display text-sm font-semibold leading-snug text-[#0d0b0b] sm:text-base">{project.title}</h3>
                    <p className="mt-1 line-clamp-1 text-[9px] font-mono text-[#776f63]">{project.client} · {project.year} · {project.tools.join(' / ')}</p>
                  </div>
                </article>;
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
    <ProjectModal project={selectedProject} projects={VIDEO_ARCHIVE} onClose={() => setSelectedProject(null)} onNavigate={setSelectedProject} />
  </>;
}
