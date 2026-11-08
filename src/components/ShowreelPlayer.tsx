import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function ShowreelPlayer({ videoUrl, isOpen, onClose, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout>>();

  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const isVimeo = videoUrl.includes('vimeo.com');
  const isEmbed = isYouTube || isVimeo;

  const getEmbedUrl = () => {
    if (isYouTube) {
      const videoId = videoUrl.includes('youtu.be/')
        ? videoUrl.split('youtu.be/')[1].split('?')[0]
        : new URLSearchParams(videoUrl.split('?')[1]).get('v');
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (isVimeo) {
      const videoId = videoUrl.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return videoUrl;
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (!isEmbed && videoRef.current) {
        videoRef.current.play();
        setPlaying(true);
      }
    } else {
      document.body.style.overflow = '';
      if (videoRef.current) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen, isEmbed]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && !isEmbed) { e.preventDefault(); togglePlay(); }
      if (e.key === 'm' && !isEmbed) toggleMute();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isEmbed]);

  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(hideControlsTimer.current);
    hideControlsTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  }, [playing]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
    resetHideTimer();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(p || 0);
    setCurrentTime(videoRef.current.currentTime || 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const val = Number(e.target.value);
    videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
    setProgress(val);
  };

  const handleFullscreen = () => {
    const container = document.getElementById('showreel-container');
    if (container?.requestFullscreen) container.requestFullscreen();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 modal-backdrop"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label="Showreel player"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            id="showreel-container"
            className="relative w-full max-w-6xl mx-4 aspect-video bg-black"
            onMouseMove={resetHideTimer}
            onMouseLeave={() => { if (playing) setShowControls(false); }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
              aria-label="Close player"
            >
              <X size={18} />
            </button>

            {isEmbed ? (
              <iframe
                src={getEmbedUrl()}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={title || 'Showreel'}
              />
            ) : videoUrl ? (
              <>
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                  onClick={togglePlay}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  playsInline
                />

                {/* Controls */}
                <AnimatePresence>
                  {showControls && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-black/20"
                    >
                      {/* Play/Pause Center */}
                      {!playing && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={togglePlay}
                            className="w-16 h-16 rounded-full bg-[#c8ff4d] flex items-center justify-center hover:scale-105 transition-transform"
                            aria-label="Play"
                          >
                            <Play size={24} className="text-[#0d0b0b] ml-1" />
                          </button>
                        </div>
                      )}

                      {/* Bottom Controls */}
                      <div className="p-4 space-y-2">
                        <input
                          ref={progressRef}
                          type="range"
                          min="0"
                          max="100"
                          value={progress}
                          onChange={handleSeek}
                          className="w-full"
                          style={{ background: `linear-gradient(to right, #c8ff4d ${progress}%, #2c2927 ${progress}%)` }}
                          aria-label="Video progress"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button onClick={togglePlay} className="text-white hover:text-accent-lime transition-colors" aria-label={playing ? 'Pause' : 'Play'}>
                              {playing ? <Pause size={18} /> : <Play size={18} />}
                            </button>
                            <button onClick={toggleMute} className="text-white hover:text-accent-lime transition-colors" aria-label={muted ? 'Unmute' : 'Mute'}>
                              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            </button>
                            <span className="text-white/60 label-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
                          </div>
                          <button onClick={handleFullscreen} className="text-white hover:text-accent-lime transition-colors" aria-label="Fullscreen">
                            <Maximize2 size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              /* Placeholder when no video URL provided */
              <div className="w-full h-full flex flex-col items-center justify-center bg-bg-secondary border border-white/5">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border-2 border-accent-lime/30 flex items-center justify-center mx-auto">
                    <Play size={24} className="text-accent-lime ml-1" />
                  </div>
                  <p className="label-sm text-text-muted">SHOWREEL PLACEHOLDER</p>
                  <p className="text-text-muted text-sm max-w-xs text-center">
                    Replace <code className="text-accent-lime text-xs">SHOWREEL_URL</code> in <code className="text-accent-lime text-xs">src/data/config.ts</code> with your actual showreel link.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
