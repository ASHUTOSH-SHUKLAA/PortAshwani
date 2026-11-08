import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { EDITOR_INFO } from '../data/config';

const NAV_LINKS = [
  { label: 'Videos', href: '#work' },
  { label: 'Posters', href: '#experiments' },
  { label: 'Fashion', href: '#fashion' },
  { label: 'Logos', href: '#logos' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0d0b0b]/90 backdrop-blur-md border-b border-[#2c2927]'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-[1280px] mx-auto px-5 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Brand Identity Wordmark */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-display font-bold text-lg md:text-xl tracking-tight text-[#f1eee6] hover:text-[#c8ff4d] transition-colors duration-200"
                aria-label="Ashwani — Back to top"
              >
                {EDITOR_INFO.brand}
              </button>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#c8ff4d] animate-blink" aria-hidden="true" />
            </div>

            {/* Centre: Minimal Navigation Links */}
            <nav className="hidden md:flex 2xl:hidden items-center gap-8 lg:gap-10" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`label-meta hover-underline transition-colors duration-200 relative ${
                    isActive ? 'text-lime' : 'text-[#8a8a84] hover:text-[#f1eee6]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Compact mobile navigation control */}
            <div className="flex items-center gap-4">
              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-[#8a8a84] hover:text-[#f1eee6] transition-colors"
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0d0b0b]/98 backdrop-blur-xl flex flex-col justify-between px-6 pt-24 pb-12 md:hidden"
            role="dialog"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col gap-6">
              <span className="label-meta text-[#8a8a84]">INDEX</span>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-display font-bold text-3xl text-left text-[#f1eee6] hover:text-[#c8ff4d] transition-colors py-2 border-b border-[#2c2927]"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-[#2c2927] pt-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff4d] animate-blink" />
              <span className="label-meta text-[#8a8a84]">{EDITOR_INFO.heroAvailability}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
