import { useEffect, useState, useRef } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SelectedWorks from './components/SelectedWorks';
import PostersSection from './components/PostersSection';
import VisualGalleries from './components/VisualGalleries';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import SirshaCaseStudy from './components/SirshaCaseStudy';
import ChapterIndex from './components/ChapterIndex';
import Footer from './components/Footer';

// Ultra-fast, hardware-accelerated cursor (zero input lag, zero React state overhead on move)
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || window.innerWidth < 1024) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instant 0ms GPU transform for center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }

      // Detect clickable / interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, [role="button"], input, select, textarea, video, .cursor-pointer') !== null;
      setIsHovered(isInteractive);
    };

    // Fast, responsive spring for outer ring (0.35 factor = super agile, zero sluggish lag)
    const renderLoop = () => {
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;

      if (ringRef.current) {
        const offset = isHovered ? 20 : 14;
        ringRef.current.style.transform = `translate3d(${ringX - offset}px, ${ringY - offset}px, 0)`;
      }

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isHovered]);

  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

  return (
    <>
      {/* Center Precision Dot — 0ms Instant Response */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[300] w-2 h-2 rounded-full bg-[#c8ff4d] will-change-transform mix-blend-difference"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
        aria-hidden="true"
      />

      {/* Agile Outer Ring — Snappy & Nimble */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[300] rounded-full border will-change-transform transition-all duration-150 ease-out flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 border-[#c8ff4d] bg-[#c8ff4d]/10 scale-110'
            : 'w-7 h-7 border-[#c8ff4d]/40 scale-100'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
        aria-hidden="true"
      />
    </>
  );
}

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname.replace(/\/+$/, '') || '/');
  const [loaded, setLoaded] = useState(false);
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (prefersReduced) {
      setLoaded(true);
      return;
    }
    const timer = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(timer);
  }, [prefersReduced]);

  // Reactive SPA route change listener
  useEffect(() => {
    const handleRouteChange = () => {
      setPathname(window.location.pathname.replace(/\/+$/, '') || '/');
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const handleBackFromSirsha = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.history.pushState({}, '', '/#logos');
      setPathname('/');
      setTimeout(() => {
        document.getElementById('logos')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const handleContactFromSirsha = () => {
    window.history.pushState({}, '', '/#contact');
    setPathname('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      {/* Subtle Restrained Film Grain */}
      <div className="film-grain fixed inset-0 z-[9998] pointer-events-none" aria-hidden="true" />

      {/* Loading sequence */}
      {!prefersReduced && !loaded && <LoadingScreen />}

      {/* Fast, Hardware-Accelerated Desktop Pointer */}
      {!prefersReduced && <CustomCursor />}

      {/* Master Layout — Always preserved in memory and scroll position */}
      <div className="min-h-screen bg-[#0d0b0b] pb-14 text-[#f1eee6] overflow-x-hidden selection:bg-[#c8ff4d] selection:text-[#0d0b0b] md:pb-0">
        <Navbar />
        <ChapterIndex />
        <main id="main-content">
          <HeroSection />
          <SelectedWorks />
          <PostersSection />
          <VisualGalleries />
          <AboutSection />
          <ContactSection />
          <Footer />
        </main>
      </div>

      {/* Sirsha Case Study View — Seamlessly rendered without full page reload */}
      {pathname === '/work/sirsha' && (
        <div className="fixed inset-0 z-[9990] overflow-y-auto bg-[#0d0b0b]">
          <SirshaCaseStudy onBack={handleBackFromSirsha} onContact={handleContactFromSirsha} />
        </div>
      )}
    </>
  );
}
