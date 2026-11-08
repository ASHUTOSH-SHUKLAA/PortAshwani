import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BEFORE_AFTER } from '../data/config';

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  }, [isDragging, updatePosition]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  }, [isDragging, updatePosition]);

  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(5, p - 5));
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(95, p + 5));
  };

  return (
    <section id="refined" className="py-24 md:py-32 bg-[#0d0b0b] border-t border-[#2c2927] relative" aria-label="Before and after color grading">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
        {/* Header */}
        <div className="mb-14 border-b border-[#2c2927] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="label-meta text-[#c9a45c]">{BEFORE_AFTER.label}</span>
              <span className="w-8 h-px bg-[#2c2927]" />
              <span className="label-meta text-[#8a8a84]">COLOR SCIENCE</span>
            </div>
            <h2 className="heading-section text-[#f1eee6]">
              {BEFORE_AFTER.title}
            </h2>
          </div>
          <p className="body-regular max-w-md md:text-right">
            {BEFORE_AFTER.description}
          </p>
        </div>

        {/* Interactive Comparison Slider */}
        <div
          ref={containerRef}
          className="relative w-full aspect-video overflow-hidden bg-[#2c2927] border border-[#2c2927] cursor-col-resize select-none before-after-container"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="slider"
          aria-label="Before and after color comparison slider"
          aria-valuenow={Math.round(position)}
          aria-valuemin={5}
          aria-valuemax={95}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* AFTER (Full background) */}
          <div className="absolute inset-0">
            {BEFORE_AFTER.afterImage ? (
              <img
                src={BEFORE_AFTER.afterImage}
                alt="Final edit — after 35mm film emulation grading"
                className="w-full h-full object-cover"
                draggable={false}
              />
            ) : (
              <PlaceholderPanel label="FINAL GRADE" color="#c8ff4d" side="right" />
            )}
            <div className="absolute top-4 right-4 px-3 py-1 bg-[#0d0b0b]/80 backdrop-blur-md border border-[#2c2927] text-[#c9a45c] label-meta font-bold">
              {BEFORE_AFTER.afterLabel}
            </div>
          </div>

          {/* BEFORE (Clipped layer) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            {BEFORE_AFTER.beforeImage ? (
              <img
                src={BEFORE_AFTER.beforeImage}
                alt="Raw footage — uncorrected camera profile"
                className="w-full h-full object-cover"
                style={{ width: `${10000 / position}%`, maxWidth: 'none' }}
                draggable={false}
              />
            ) : (
              <div style={{ width: `${10000 / position}%` }} className="h-full">
                <PlaceholderPanel label="RAW CAPTURE" color="#8a8a84" side="left" />
              </div>
            )}
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#0d0b0b]/80 backdrop-blur-md border border-[#2c2927] text-[#8a8a84] label-meta">
              {BEFORE_AFTER.beforeLabel}
            </div>
          </div>

          {/* Divider line & handle */}
          <div
            className="absolute top-0 bottom-0 z-10 flex items-center justify-center pointer-events-none"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          >
            <div className="w-px h-full bg-[#f1eee6]" />
            <div
              className={`w-9 h-9 rounded-full bg-[#f1eee6] text-[#0d0b0b] flex items-center justify-center shadow-2xl transition-transform duration-150 ${
                isDragging ? 'scale-110 bg-[#c8ff4d]' : 'scale-100'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7 5L2 10L7 15" stroke="#0d0b0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 5L18 10L13 15" stroke="#0d0b0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Technical Breakdown Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BEFORE_AFTER.breakdown.map((item) => (
            <div
              key={item.num}
              className="p-6 bg-[#171414] border border-[#2c2927] hover:border-[#c8ff4d]/40 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#c9a45c] font-mono text-xs font-bold">{item.num}</span>
                <div className="w-5 h-px bg-[#c8ff4d]/30" />
              </div>
              <h3 className="font-display font-semibold text-[#f1eee6] text-base mb-2">{item.title}</h3>
              <p className="text-[#8a8a84] text-xs leading-relaxed font-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlaceholderPanel({ label, color, side }: { label: string; color: string; side: 'left' | 'right' }) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{ background: side === 'right' ? '#171414' : '#0d0b0b' }}
    >
      <div className="text-center space-y-2">
        <div className="w-10 h-10 mx-auto mb-3 rounded-full border flex items-center justify-center" style={{ borderColor: color }}>
          <span className="text-[10px] font-mono font-bold" style={{ color }}>
            {side === 'left' ? 'RAW' : 'GRADE'}
          </span>
        </div>
        <p className="label-meta" style={{ color }}>{label}</p>
      </div>
    </div>
  );
}
