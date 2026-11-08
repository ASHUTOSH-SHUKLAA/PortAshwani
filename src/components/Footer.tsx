import { Instagram, ArrowUp } from 'lucide-react';
import { EDITOR_INFO } from '../data/config';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0d0b0b] border-t border-[#2c2927] py-10" role="contentinfo">
      <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Brand Wordmark */}
          <button
            onClick={scrollToTop}
            className="font-display font-bold text-xl text-[#f1eee6] hover:text-[#c8ff4d] transition-colors tracking-tight text-left cursor-pointer"
            aria-label="Back to top"
          >
            {EDITOR_INFO.brand}
          </button>

          {/* Controls: Instagram & Top Button */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/chaiwithashwanii/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 border border-[#2c2927] hover:border-[#c8ff4d] text-[#8a8a84] hover:text-[#c8ff4d] transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 bg-[#171414] border border-[#2c2927] hover:border-[#c8ff4d] text-[#8a8a84] hover:text-[#c8ff4d] transition-colors flex items-center justify-center cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
