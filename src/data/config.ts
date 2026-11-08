// ============================================================
import portfolio from './portfolio.json';

// ASHWANI® — PERSONAL CREATIVE PORTFOLIO
// Design System 001 · Art Direction & Master Configuration
// Minimal luxury × Experimental editorial × Contemporary visual culture
// ============================================================

export const EDITOR_INFO = {
  brand: 'ASHWANI®',
  name: 'Ashwani',
  title: 'Graphic Design · Visual Storytelling · Motion · Film',
  tagline: 'INDEPENDENT VISUAL CREATIVE · INDIA',
  location: 'India',
  email: 'ashwanishukla16jan@gmail.com',
  whatsapp: '+91 9770483109',
  instagram: 'https://www.instagram.com/chaiwithashwanii/',
  linkedin: 'https://linkedin.com/',
  heroLabelTop: '',
  heroAvailability: '',
  headlineLead: 'Ashwani',
  headlineAccent: 'A way of seeing.',
  bioShort: 'I create considered images, identities, and films — work shaped by strong composition, clear ideas, and a cinematic eye.',
  bioFull: "I'm Ashwani shukla, someone who can never stay too far from a screen whether it's my phone, laptop, or my beloved cameras. I love creating things, be it designing visuals, editing videos, or capturing moments that tell a story.",
  experience: 'Specializing in graphic identity, high-impact motion reels, narrative filmmaking, and cinematic color grading.',
  profileImage: '/images/personal/photo-10-casual-portrait.jpg',
  heroVideoUrl: '/media/videos/portfolio-video-01.mp4', // Looping video showreel
  heroVideoPoster: '/images/hero-poster.jpg', // Midnight architectural stairs portrait
  showreelUrl: '/media/videos/portfolio-video-01.mp4',
  availability: true,
};

// ============================================================
// 01. SELECTED WORKS (Curated Video Reels)
// ============================================================

export type ProjectCategory =
  | 'All Reels'
  | 'Commercials & Ads'
  | 'Social Media Reels'
  | 'Cinematic Films'
  | 'Motion Graphics';

export interface Project {
  id: string;
  projectNumber: string;
  title: string;
  category: ProjectCategory;
  client: string;
  year: string;
  role: string;
  tools: string[];
  description: string;
  concept: string;
  thumbnail?: string;
  videoUrl: string;
  aspect: 'landscape' | 'portrait' | 'square';
  featured: boolean;
  size: 'large' | 'medium' | 'small';
}

export const PROJECTS = portfolio.projects as Project[];
// Contrast Light Theme Section (Soft Ivory #f1eee6)
// ============================================================

export interface PosterItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tag: string;
  year: string;
  tools: string[];
  image: string;
  description: string;
}

export const POSTERS_ARCHIVE = portfolio.posters as PosterItem[];
// ============================================================

export interface PersonalPhoto {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  tag: string;
}

export const PERSONAL_GALLERY = portfolio.photography as PersonalPhoto[];
export const VIDEO_ARCHIVE = portfolio.videos as Project[];
export const FASHION_GALLERY = portfolio.fashionPhotography as PersonalPhoto[];
export const PORTRAIT_GALLERY = (portfolio.portraitPhotography || []) as PersonalPhoto[];
export const PRODUCT_GALLERY = (portfolio.productPhotography || []) as PersonalPhoto[];
export const LOGO_GALLERY = portfolio.logos as Array<{ id: string; url: string; title: string }>;
export const SIRSHA_SLIDES = portfolio.sirshaSlides as Array<{ id: string; title: string; url: string; year: string; tag: string; tools: string[] }>;
export const POSTER_BACKDROP = portfolio.posterBackdrop as string;
// ============================================================

export const BEFORE_AFTER = {
  label: '04 — TRANSFORMATION',
  title: 'FROM RAW TO REFINED.',
  description: 'Demonstrating the leap from flat digital camera capture to deep, atmospheric 35mm film emulation.',
  beforeLabel: 'RAW CAPTURE',
  afterLabel: 'FINAL GRADE',
  beforeImage: '/images/before-after/raw.jpg',
  afterImage: '/images/before-after/graded.jpg',
  breakdown: [
    { num: '01', title: 'Tonal Curve & Density', desc: 'Highlights rolled off gracefully while deepening shadow density for film punch.' },
    { num: '02', title: 'Skin Tone Isolation', desc: 'Protected natural skin tone vectors using qualifying hue/sat masks in DaVinci Resolve.' },
    { num: '03', title: 'Film Halation & Grain', desc: 'Emulated 35mm optical print stock with warm edge halation and organic grain texture.' },
    { num: '04', title: 'Atmospheric Contrast', desc: 'Separated subject from background through selective vignettes and tonal balance.' },
  ],
};

// ============================================================
// 05. CREATIVE PROCESS (The 6-Stage Workflow)
// ============================================================

export interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export const PROCESS_STEPS: ProcessStepItem[] = [
  {
    number: '01',
    title: 'THE BRIEF & DISCOVERY',
    description: 'Understand the concept, objective, target audience, and emotional tone.',
    detail: 'Concept alignment, narrative direction, and initial storyboarding.',
  },
  {
    number: '02',
    title: 'FOOTAGE & ASSET CURATION',
    description: 'Log raw takes, identify visual hooks, and curate the best narrative building blocks.',
    detail: 'A-roll / B-roll selection, audio sync, and clip organization.',
  },
  {
    number: '03',
    title: 'ROUGH CUT & STORY',
    description: 'Establish scene transitions, pacing, and overall narrative architecture.',
    detail: 'Pacing structure, rhythmic cuts, and narrative sequence.',
  },
  {
    number: '04',
    title: 'FINE CUT & PACING',
    description: 'Micro-trimming, frame-accurate speed ramping, and rhythm synchronization.',
    detail: 'Precision beat matching, J/L cuts, and retention optimization.',
  },
  {
    number: '05',
    title: 'COLOR & SOUND FINISH',
    description: 'DaVinci color science, audio leveling, SFX layering, and typographic animation.',
    detail: '35mm film emulation, audio mastering, and typography polish.',
  },
  {
    number: '06',
    title: 'MASTER DELIVERY',
    description: 'High-bitrate master exports tailored for 4K web, social feeds, or cinema playback.',
    detail: 'Multi-platform aspect ratios (9:16, 16:9, 4:5) in ProRes and H.265.',
  },
];

// ============================================================
// 06. TOOLKIT (iPad + Desktop Ecosystem)
// ============================================================

export interface ToolItem {
  name: string;
  category: string;
  role: string;
  proficiency: string;
  color: string;
  description: string;
}

export const TOOLKIT: ToolItem[] = [
  { name: 'Adobe Premiere Pro', category: 'Editorial', role: 'Primary narrative editing suite', proficiency: 'Master', color: '#9999FF', description: 'Industry-standard timeline editing and assembly.' },
  { name: 'Adobe Photoshop', category: 'Design', role: 'Poster manipulation & mockups', proficiency: 'Expert', color: '#31A8FF', description: 'Key art creation, typography, and texture synthesis.' },
  { name: 'Figma', category: 'UI / Layout', role: 'Design systems & typography grid', proficiency: 'Expert', color: '#0ACF83', description: 'Layout grids, design systems, and artboards.' },
];

// ============================================================
// 07. SERVICES (Exported for legacy reference)
// ============================================================

export interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'GRAPHIC DESIGN & POSTER ART',
    tagline: 'Bold, expressive visual identity',
    description: 'High-impact key art, editorial posters, and experimental brand graphics.',
    deliverables: ['Key Art & Posters', 'Typography Systems', 'Editorial Layouts'],
    icon: 'Layers',
  },
  {
    number: '02',
    title: 'CINEMATIC VIDEO EDITING',
    tagline: 'Rhythm, narrative and retention',
    description: 'Commercials, documentary shorts, narrative edits, and high-retention social reels.',
    deliverables: ['Commercial Edits', 'Vertical Reels', 'Sound Design'],
    icon: 'Film',
  },
  {
    number: '03',
    title: 'COLOR GRADING & FINISHING',
    tagline: '35mm film density and tone',
    description: 'Precision DaVinci color grading, skin tone qualification, and film stock emulation.',
    deliverables: ['Exposure & White Balance', '35mm Film Emulation', 'Deliverable Mastering'],
    icon: 'Palette',
  },
];

export const PROJECT_TYPES = [
  'Graphic Design & Poster Art',
  'Motion Graphics & Title Sequence',
  'Short-Form Viral Reel',
  'Commercial / Brand Film',
  'Color Grading & Finishing',
  'Comprehensive Visual Identity',
];

export const BUDGET_RANGES = [
  '₹5,000 – ₹15,000 (Reel / Poster)',
  '₹15,000 – ₹35,000 (Commercial / Motion)',
  '₹35,000 – ₹75,000 (Short Film / Campaign)',
  '₹75,000+ (Comprehensive Brand Project)',
  'Open to Discussion / Retainer',
];
