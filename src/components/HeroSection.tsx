import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { EDITOR_INFO } from '../data/config';

export default function HeroSection() {
  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-[#0d0b0b] bg-grid-pattern pt-20 sm:pt-24 pb-8 sm:pb-12"
        aria-label="Introduction hero"
      >
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_76%_42%,rgba(179,18,27,.42),transparent_42%),linear-gradient(115deg,#0d0b0b_8%,#211011_56%,#0d0b0b_100%)]" />

        {/* Centerpiece Hero Cutout — Fully Visible on BOTH Mobile and Desktop */}
        <div className="absolute z-[2] bottom-0 right-[-8%] sm:right-[2%] lg:right-[8%] h-[50vh] sm:h-[62vh] md:h-[78vh] max-h-[820px] w-[86vw] sm:w-[65vw] md:w-[48vw] max-w-[650px] pointer-events-none">
          <img
            src="/images/ashwani-hero-cutout.png"
            alt="Ashwani — Creative Director & Visual Storyteller"
            className="h-full w-full object-contain object-bottom drop-shadow-[0_15px_50px_rgba(0,0,0,.65)] opacity-85 sm:opacity-95 md:opacity-100"
          />
        </div>

        {/* Subtle mobile gradient shield so text is always 100% crystal clear */}
        <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-t from-[#0d0b0b] via-[#0d0b0b]/60 to-transparent sm:hidden" />

        {/* Top Spacer / Boundary */}
        <div className="max-w-[1280px] w-full mx-auto px-5 lg:px-20 relative z-10 pt-6 sm:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2c2927] pb-4 sm:pb-6"
          >
            <div className="flex items-center gap-3">
              <span className="label-meta text-[#8a8a84] text-[10px] sm:text-xs">INDEPENDENT CREATIVE / INDIA</span>
              <span className="w-6 sm:w-8 h-px bg-[#2c2927]" aria-hidden="true" />
              <span className="label-meta text-[#c9a45c] font-semibold text-[10px] sm:text-xs">AVAILABLE FOR Freelance</span>
            </div>
            <div className="label-meta text-[#8a8a84] text-[10px] sm:text-xs hidden sm:block">PORTFOLIO / 2026</div>
          </motion.div>
        </div>

        {/* Main Center Content */}
        <div className="max-w-[1280px] w-full mx-auto px-5 lg:px-20 relative z-10 py-8 sm:py-12 md:py-16">
          <div className="max-w-3xl relative z-10">
            {/* Oversized Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="heading-hero text-[#f1eee6] mb-5 sm:mb-8"
            >
              Ashwani
              <br />
              <span className="text-[#c9a45c]">{EDITOR_INFO.headlineAccent}</span>
            </motion.h1>

            {/* Body Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="body-lead max-w-xl mb-8 sm:mb-12 text-sm sm:text-base md:text-lg leading-relaxed text-[#cbc4b5]"
            >
              {EDITOR_INFO.bioShort}
            </motion.p>
          </div>
        </div>

        {/* Bottom Status & Scroll Indicator */}
        <div className="max-w-[1280px] w-full mx-auto px-5 lg:px-20 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-end justify-between border-t border-[#2c2927] pt-4 sm:pt-6"
          >
            <div className="flex items-center gap-3">
              <span className="label-meta text-[#8a8a84] text-[10px] sm:text-xs">01 — INTRODUCTION</span>
              <span className="hidden sm:inline-block w-4 h-px bg-[#2c2927]" />
              <span className="label-meta text-[#8a8a84] text-[10px] sm:text-xs hidden sm:inline-block">GRAPHIC DESIGN · MOTION · FILM</span>
            </div>

            <button
              onClick={scrollToWork}
              className="flex items-center gap-2 label-meta text-[#8a8a84] hover:text-[#c8ff4d] transition-colors group cursor-pointer text-[10px] sm:text-xs"
              aria-label="Scroll to explore projects"
            >
              <span>SCROLL TO EXPLORE</span>
              <ArrowDown size={14} className="animate-scroll-down text-[#c9a45c]" />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
