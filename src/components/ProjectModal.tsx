import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../data/config';

interface ProjectModalProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onNavigate: (project: Project) => void;
}

export default function ProjectModal({ project, projects, onClose, onNavigate }: ProjectModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const isOpen = !!project;

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Autoplay as soon as modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Small timeout to ensure DOM is ready
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => setPlaying(true))
              .catch(() => {
                // Autoplay with sound might be restricted by browser policy; fallback to muted autoplay
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  setMuted(true);
                  videoRef.current.play().then(() => setPlaying(true)).catch(() => {});
                }
              });
          }
        }
      }, 50);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setPlaying(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, project?.id]);

  // Keyboard navigation & spacebar to play/pause
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prevProject) onNavigate(prevProject);
      if (e.key === 'ArrowRight' && nextProject) onNavigate(nextProject);
      if (e.key === ' ' && videoRef.current) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, prevProject, nextProject, playing]);

  // Instant single-click toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[140] bg-[#070606] overflow-y-auto"
          onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`Project: ${project.title}`}
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-20 py-8 md:py-12" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
            {/* Top Modal Bar */}
            <div className="flex items-center justify-between border-b border-[#2c2927] pb-5 mb-8">
              <div className="flex items-center gap-3">
                <span className="label-meta text-[#c9a45c]">{project.category}</span>
                <span className="w-6 h-px bg-[#2c2927]" />
                <span className="label-meta text-[#8a8a84]">{project.year}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 bg-[#171414] hover:bg-[#2c2927] text-[#f1eee6] hover:text-[#c8ff4d] border border-[#2c2927] rounded-full transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Project Title Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="heading-project text-[#f1eee6] leading-tight">
                  {project.title}
                </h2>
                <p className="body-regular text-sm text-[#8a8a84] mt-1 font-mono">
                  {project.role} · {project.client}
                </p>
              </div>

              {/* Prev / Next Quick Nav in Header */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => prevProject && onNavigate(prevProject)}
                  disabled={!prevProject}
                  className="px-3 py-1.5 bg-[#171414] border border-[#2c2927] text-xs font-mono text-[#cbc4b5] hover:text-[#c8ff4d] hover:border-[#c8ff4d]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  <ChevronLeft size={14} /> PREV
                </button>
                <button
                  onClick={() => nextProject && onNavigate(nextProject)}
                  disabled={!nextProject}
                  className="px-3 py-1.5 bg-[#171414] border border-[#2c2927] text-xs font-mono text-[#cbc4b5] hover:text-[#c8ff4d] hover:border-[#c8ff4d]/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                >
                  NEXT <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* ============================================================ */}
            {/* FULL VIEW CINEMA & REEL PLAYER CONTAINER                     */}
            {/* Sized dynamically so 9:16 vertical reels & 16:9 show in full */}
            {/* ZERO cropping of faces or subjects (object-contain)          */}
            {/* ============================================================ */}
            <div
              onClick={togglePlay}
              className="w-full h-[65vh] sm:h-[72vh] md:h-[80vh] bg-[#0d0b0b] border border-[#2c2927] mb-8 relative flex items-center justify-center overflow-hidden shadow-2xl rounded-sm cursor-pointer group"
            >
              {project.videoUrl ? (
                <>
                  <video
                    ref={videoRef}
                    src={project.videoUrl}
                    className="max-h-full max-w-full h-full w-auto object-contain mx-auto shadow-2xl"
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={() => setPlaying(false)}
                    controls={false}
                    playsInline
                    loop
                  />

                  {/* Single-Click Center Play/Pause Indicator (Smooth Fade) */}
                  <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
                    !playing ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="w-16 h-16 rounded-full bg-[#c8ff4d] text-[#0d0b0b] flex items-center justify-center shadow-2xl">
                      <Play size={24} className="ml-1 fill-current" />
                    </div>
                  </div>

                  {/* Bottom Minimal HUD Controls Bar */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-[#0d0b0b]/95 via-[#0d0b0b]/50 to-transparent flex items-center justify-between z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-full bg-[#171414] border border-[#2c2927] text-[#f1eee6] hover:text-[#c8ff4d] hover:border-[#c8ff4d] flex items-center justify-center transition-colors"
                        aria-label={playing ? 'Pause' : 'Play'}
                      >
                        {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5 fill-current" />}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="w-8 h-8 rounded-full bg-[#171414] border border-[#2c2927] text-[#f1eee6] hover:text-[#c8ff4d] hover:border-[#c8ff4d] flex items-center justify-center transition-colors"
                        aria-label={muted ? 'Unmute' : 'Mute'}
                      >
                        {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                      </button>

                      <span className="text-[11px] font-mono text-[#8a8a84] hidden sm:inline-block">
                        {muted ? 'MUTED (CLICK TO UNMUTE)' : 'PLAYING WITH AUDIO'}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-[#c9a45c]">{project.category.toUpperCase()}</span>
                      <button
                        onClick={handleFullscreen}
                        className="w-8 h-8 rounded-full bg-[#171414] border border-[#2c2927] text-[#f1eee6] hover:text-[#c8ff4d] hover:border-[#c8ff4d] flex items-center justify-center transition-colors"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 size={14} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-[#8a8a84]">Video preview unavailable.</p>
              )}
            </div>

            {/* 5-Stage Case Study Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 border-t border-[#2c2927] pt-10">
              {/* Left 8-Cols: Creative Storytelling */}
              <div className="lg:col-span-8 space-y-8">
                {/* 01 — The Brief */}
                <div>
                  <span className="label-meta text-[#c9a45c] mb-2 block">01 — THE BRIEF & OBJECTIVE</span>
                  <p className="body-regular text-[#f1eee6] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* 02 — The Concept */}
                {project.concept && <div>
                  <span className="label-meta text-[#c9a45c] mb-2 block">02 — THE CREATIVE CONCEPT</span>
                  <p className="body-regular text-[#cbc4b5] leading-relaxed">
                    {project.concept}
                  </p>
                </div>}
              </div>

              {/* Right 4-Cols: Project Metadata */}
              <div className="lg:col-span-4 bg-[#171414] border border-[#2c2927] p-6 space-y-5 self-start">
                <span className="label-meta text-[#c9a45c] block border-b border-[#2c2927] pb-2">PROJECT METADATA</span>
                <div className="space-y-3.5 text-xs font-mono">
                  <div className="flex justify-between border-b border-[#2c2927]/60 pb-2">
                    <span className="text-[#8a8a84]">CONTEXT</span>
                    <span className="text-[#f1eee6] font-semibold">{project.client}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2c2927]/60 pb-2">
                    <span className="text-[#8a8a84]">ROLE</span>
                    <span className="text-[#f1eee6] font-semibold">{project.role}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2c2927]/60 pb-2">
                    <span className="text-[#8a8a84]">YEAR</span>
                    <span className="text-[#f1eee6] font-semibold">{project.year}</span>
                  </div>
                  <div>
                    <span className="text-[#8a8a84] block mb-2">TOOLS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-[#0d0b0b] text-[#c9a45c] border border-[#2c2927] text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
