import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play } from 'lucide-react';
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
    <section id="work" className="bg-[#0d0b0b] py-20 md:py-28" aria-label="Video archive">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-20">
        <div className="mb-8 flex flex-col justify-between gap-5 border-b border-white/10 pb-7 md:mb-10 md:flex-row md:items-end">
          <div>
            <span className="label-meta mb-4 block text-[#c9a45c]">REEL ARCHIVE</span>
            <h2 className="heading-section text-[#f1eee6]">REELS,<br/><span className="serif-editorial font-normal text-[#c9a45c]">in motion.</span></h2>
          </div>
          <p className="body-regular max-w-md text-sm md:text-right">Short films, edits and visual studies. Select a frame to watch the full reel.</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .3 }}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
              {VIDEO_ARCHIVE.map((project) => {
                const isHovered = hoveredId === project.id;
                return <article key={project.id} onClick={() => setSelectedProject(project)} onMouseEnter={() => handleHover(project.id)} onMouseLeave={() => handleHover(null)} className="group relative aspect-[4/5] cursor-pointer overflow-hidden border border-white/10 bg-[#171414]" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProject(project); } }} aria-label={`Watch video: ${project.title}`}>
                  <div className="absolute inset-0 overflow-hidden bg-[#100e0e]">
                    <img src={project.thumbnail} alt="" loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${previewReadyId === project.id ? 'opacity-0' : 'opacity-100'}`} />
                    <video ref={(el) => { if (el) videoRefs.current.set(project.id, el); else videoRefs.current.delete(project.id); }} src={project.videoUrl} muted loop playsInline preload="none" onPlaying={() => setPreviewReadyId(project.id)} className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${isHovered ? 'scale-[1.035]' : ''} ${previewReadyId === project.id ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/20 opacity-80 transition-opacity group-hover:opacity-100" />
                    <span className="absolute inset-0 flex items-center justify-center"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-black/25 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-[#c8ff4d] group-hover:bg-[#c8ff4d] group-hover:text-[#0d0b0b]"><Play size={15} fill="currentColor" className="ml-0.5"/></span></span>
                    <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4"><span className="mb-1 block text-[9px] font-mono uppercase tracking-[.16em] text-[#c9a45c]">{project.category}</span><h3 className="line-clamp-1 font-display text-sm font-semibold leading-tight sm:text-base">{project.title}</h3><p className="mt-1 hidden text-[9px] font-mono text-white/65 sm:block">{project.client} · {project.year}</p></div>
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
