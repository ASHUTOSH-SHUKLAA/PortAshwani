import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, 'public');
const mediaDir = path.join(publicDir, 'media');
const require = createRequire(import.meta.url);
const ffmpeg = require('ffmpeg-static');
const manifestPath = path.join(root, 'src', 'data', 'portfolio.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const mediaUrl = (...parts) => '/' + parts.map((part) => part.split(path.sep).map(encodeURIComponent).join('/')).join('/');
const imagePattern = /\.(png|jpe?g|webp)$/i;

for (const folder of ['photography', 'posters', 'reels', 'videos', 'video-thumbnails', 'optimized']) {
  fs.mkdirSync(path.join(mediaDir, folder), { recursive: true });
}

function uniqueImages(directory) {
  const seen = new Set();
  return fs.readdirSync(directory).filter((name) => imagePattern.test(name)).sort((a, b) => a.localeCompare(b)).filter((name) => {
    const digest = createHash('sha256').update(fs.readFileSync(path.join(directory, name))).digest('hex');
    if (seen.has(digest)) {
      console.log(`Skipped duplicate artwork: ${name}`);
      return false;
    }
    seen.add(digest);
    return true;
  });
}

function makeWebp(input, output) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  if (fs.existsSync(output) && fs.statSync(output).mtimeMs >= fs.statSync(input).mtimeMs) return;
  const result = spawnSync(ffmpeg, ['-y', '-i', input, '-frames:v', '1', '-vf', 'scale=2400:2400:force_original_aspect_ratio=decrease:force_divisible_by=2', '-map_metadata', '-1', '-c:v', 'libwebp', '-quality', '86', '-compression_level', '6', output], { stdio: 'ignore' });
  if (result.status !== 0) throw new Error(`Could not optimize image: ${input}`);
}

const videosDir = path.join(mediaDir, 'videos');
// Remove any raw files exceeding GitHub 100MB limit (safety guard)
for (const file of fs.readdirSync(videosDir)) {
  const fp = path.join(videosDir, file);
  try {
    if (fs.statSync(fp).size > 98 * 1024 * 1024) {
      fs.unlinkSync(fp);
      console.log(`Deleted oversized raw file (>98MB): ${file}`);
    }
  } catch (e) {}
}
const videoSources = fs.readdirSync(videosDir).filter((name) => /\.mp4$/i.test(name) && !/^portfolio-video-\d+\.mp4$/i.test(name)).sort((a, b) => a.localeCompare(b));
const videoAliases = new Map([
  [0, 'portfolio-video-01.mp4'],
  [1, 'portfolio-video-02.mp4'],
  [9, 'portfolio-video-10.mp4'],
  [10, 'portfolio-video-11.mp4'],
  [12, 'portfolio-video-13.mp4']
]);
const videoTitles = [
  'The Mark, in Motion', 'One Shot a Day', 'What Held the Business Back', 'A Creator at Work',
  'Refused to Be Dismissed', 'The Value of a Note', 'One More Thing', 'The Businessman',
  'Art of Gifting, India', 'Your Next Customer', 'Coming Up Next', 'Dear, La', 'Qutub Minar After Dark',
];
const thumbnailDir = path.join(mediaDir, 'video-thumbnails');
for (const [index, name] of videoSources.entries()) {
  const alias = videoAliases.get(index);
  const aliasPath = alias && path.join(videosDir, alias);
  if (alias && !fs.existsSync(aliasPath)) {
    if (index === 1 || index === 9) {
      const converted = spawnSync(ffmpeg, ['-y', '-i', path.join(videosDir, name), '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', aliasPath], { stdio: 'ignore' });
      if (converted.status !== 0) throw new Error(`Could not convert video ${index + 1} to browser-compatible H.264.`);
    } else fs.copyFileSync(path.join(videosDir, name), aliasPath);
  }
  const thumbnail = path.join(thumbnailDir, `video-${String(index + 1).padStart(2, '0')}.jpg`);
  if (!fs.existsSync(thumbnail)) {
    const input = alias && fs.existsSync(aliasPath) ? aliasPath : path.join(videosDir, name);
    const frame = spawnSync(ffmpeg, ['-y', '-ss', '1', '-i', input, '-frames:v', '1', '-vf', 'scale=640:-2', '-q:v', '4', thumbnail], { stdio: 'ignore' });
    if (frame.status !== 0) throw new Error(`Could not create video thumbnail ${index + 1}.`);
  }
}
manifest.videos = videoSources.map((name, index) => {
  const alias = videoAliases.get(index);
  return {
    id: `video-${index + 1}`,
    title: videoTitles[index] || path.basename(name, path.extname(name)), category: 'Video',
    client: 'Personal study', year: '2026', role: 'Editing · Motion · Sound', tools: ['Premiere Pro'],
    description: videoTitles[index] ? `A short-form visual piece: ${videoTitles[index]}.` : 'A short-form edit from the visual archive.',
    concept: '', aspect: 'portrait', featured: false, size: 'medium',
    videoUrl: mediaUrl('media', 'videos', alias && fs.existsSync(path.join(videosDir, alias)) ? alias : name),
    thumbnail: mediaUrl('media', 'video-thumbnails', `video-${String(index + 1).padStart(2, '0')}.jpg`),
  };
});

const posterTitles = new Map([
  ['IMG_0766.PNG', ['DEVI / DEMOCRACY', 'Cultural key art']],
  ['IMG_20260822_130513_174.jpg', ['PEAKY BLINDERS — BY ORDER', 'Film poster']],
  ['IMG_20260822_135529_076.jpg', ['PEAKY BLINDERS — THE FAMILY', 'Film poster']],
  ['IMG_20260828_115241_575.jpg', ['UDAAN — POEM SUNOGE?', 'Film tribute']],
  ['IMG_20261031_153844_767.jpg', ['THE BATMAN — DARK KNIGHT', 'Character poster']],
  ['IMG_20261031_153859_012.jpg', ['THE BATMAN — PART II', 'Character poster']],
  ['IMG_20261031_153910_456.jpg', ['BATMAN — NEON CITY', 'Character poster']],
  ['Peaky blinder poster_20261004_021732_0000.jpg', ['OCTOBER', 'Cinematic poster']],
]);
const postersDir = path.join(mediaDir, 'posters');
manifest.posters = uniqueImages(postersDir).map((name, index) => {
  const [title, category] = posterTitles.get(name) || [path.basename(name, path.extname(name)).replace(/[-_]+/g, ' '), 'Poster design'];
  const output = `poster-${String(index + 1).padStart(2, '0')}.webp`;
  makeWebp(path.join(postersDir, name), path.join(mediaDir, 'optimized', 'posters', output));
  return { id: `poster-${index + 1}`, title, category, tag: 'Personal study', year: '2026', tools: ['Photoshop', 'Illustrator'], image: mediaUrl('media', 'optimized', 'posters', output), description: `${category} developed as a personal visual exploration.` };
});
manifest.posterBackdrop = manifest.posters.find((poster) => poster.title === 'PEAKY BLINDERS — THE FAMILY')?.image || manifest.posters.find((poster) => poster.title.startsWith('PEAKY BLINDERS'))?.image || manifest.posters[0]?.image || '';

const fashionDir = path.join(mediaDir, 'photography', 'Fashion photography');
const fashionOrder = ['IMG_0820.PNG', 'IMG_0821.PNG', 'IMG_0822.PNG', 'IMG_0824.PNG', 'IMG_0823.PNG', 'IMG_0825.PNG', 'IMG_0826.PNG', 'IMG_0827.PNG', 'IMG_0828.PNG', 'IMG_0829.PNG', 'IMG_0830.PNG'];
const fashionTitles = ['Red Curtain — Portrait', 'Crimson Drapery', 'The Dark Look', 'Couture in Red', 'On the Velvet Floor', 'Night Portrait', 'Street Duo', 'First Flame', 'Smoke & Saffron', 'Firelight', 'Last Light'];
manifest.fashionPhotography = fashionOrder.filter((name) => fs.existsSync(path.join(fashionDir, name))).map((name, index) => {
  const output = `fashion-${String(index + 1).padStart(2, '0')}.webp`;
  makeWebp(path.join(fashionDir, name), path.join(mediaDir, 'optimized', 'fashion', output));
  return { id: `fashion-${index + 1}`, title: fashionTitles[index], url: mediaUrl('media', 'optimized', 'fashion', output), subtitle: 'Fashion photography · 2026', tag: 'Personal study', year: '2026' };
});

function buildPhotographyCollection(folder, outputFolder, prefix, label) {
  const directory = path.join(mediaDir, 'photography', folder);
  const titles = uniqueImages(directory);
  const collectionNames = {
    'IMG_0831.PNG': 'Street portrait', 'IMG_0832.PNG': 'Market portrait', 'IMG_0833.PNG': 'Craft portrait',
    '20260112_140651 (2).jpg': 'A moment in the fabric market',
    'DOC-20260522-WA0032.jpg': 'A pause in the old lanes',
    'DSC00588.jpg': 'Under the canvas',
    'DSC00933 (1) (3).jpg': 'Rickshaw portrait',
    'DSC04234 (1).jpg': 'At the workbench',
    'DSC04339.jpg': 'The barber at the window',
    'DSC08492 (1).jpg': 'Durga in warm light',
    'DSC08582 (1).jpg': 'Durga in blue light',
    'DSC08599.jpg': 'The artisan’s gaze',
    'DSC08639.jpg': 'A portrait in colour',
    'DSC08865.jpg': 'The maker at work',
    'IMG_1795 (1).jpg': 'Between customers',
    'IMG36001.png': 'A view from the driver’s seat',
    'DOC-20260408-WA0066.jpg': 'Market colours', 'DOC-20260415-WA0053.jpg': 'Red on the street',
    'IMG_20251127_005650_068.JPG': 'A quiet pause', 'IMG-20260602-WA0036 (3).jpg': 'City in the mirror',
    'IMG_5652 2.HEIC (1).jpg': 'Colourful bottle arrangement', 'IMG_5818 2.HEIC (1).jpg': 'Window light study',
    'IMG_5828.HEIC.jpg': 'Product display', 'IMG_5949.HEIC.jpg': 'Blue bottle still life',
    'IMG_5967.HEIC (1).jpg': 'Water and colour', 'IMG_5988.HEIC.jpg': 'Colour lineup',
    'IMG_6003.HEIC (4).jpg': 'Warm tabletop study', 'IMG-20261107-WA0014.jpg': 'Studio still life',
  };
  return titles.map((name, index) => {
    const output = prefix === 'portrait' && name === 'DOC-20260522-WA0032.jpg'
      ? 'portrait-old-lanes.webp'
      : `${prefix}-${String(index + 1).padStart(2, '0')}.webp`;
    makeWebp(path.join(directory, name), path.join(mediaDir, 'optimized', outputFolder, output));
    const title = collectionNames[name] || label;
    return { id: `${prefix}-${index + 1}`, title: title || `${label} ${index + 1}`, url: mediaUrl('media', 'optimized', outputFolder, output), subtitle: `${label} · 2026`, tag: 'Personal study', year: '2026' };
  });
}
manifest.portraitPhotography = buildPhotographyCollection('Potraits photography', 'portraits', 'portrait', 'Portrait photography');
manifest.productPhotography = buildPhotographyCollection('Product photography', 'products', 'product', 'Product photography');
manifest.streetPhotography = buildPhotographyCollection('Street photography', 'street', 'street', 'Street photography');

const logoDir = path.join(publicDir, 'Logo Design');
const sirshaOrder = [
  'WhatsApp Image 2026-11-08 at 12.14.42 PM.jpeg', 'WhatsApp Image 2026-11-08 at 12.14.43 PM.jpeg',
  'WhatsApp Image 2026-11-08 at 12.14.45 PM.jpeg', 'WhatsApp Image 2026-11-08 at 12.14.47 PM.jpeg',
  'WhatsApp Image 2026-11-08 at 12.14.49 PM.jpeg', 'WhatsApp Image 2026-11-08 at 12.14.54 PM.jpeg',
  'WhatsApp Image 2026-11-08 at 12.14.55 PM.jpeg', 'WhatsApp Image 2026-11-08 at 12.14.56 PM.jpeg',
];
const sirshaTitles = ['SIRSHA — Identity', 'Brand concept', 'Construction grid', 'Typography', 'Colour palette', 'Logo variations', 'Brand applications', 'Merchandise'];
manifest.sirshaSlides = sirshaOrder.filter((name) => fs.existsSync(path.join(logoDir, name))).map((name) => {
  const index = sirshaOrder.indexOf(name);
  const output = `sirsha-${String(index + 1).padStart(2, '0')}.webp`;
  makeWebp(path.join(logoDir, name), path.join(mediaDir, 'optimized', 'sirsha', output));
  return { id: `sirsha-${index + 1}`, title: sirshaTitles[index], url: mediaUrl('media', 'optimized', 'sirsha', output), year: '2026', tag: 'Client work', tools: ['Illustrator', 'Photoshop'] };
});
manifest.logos = manifest.sirshaSlides;
manifest.projects = (manifest.projects || []).map((project) => {
  const cleaned = { ...project };
  delete cleaned.projectNumber;
  return cleaned;
});

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Updated manifest: ${manifest.videos.length} videos, ${manifest.posters.length} unique posters, ${manifest.fashionPhotography.length} fashion images, ${manifest.portraitPhotography.length} portraits, ${manifest.productPhotography.length} product photos and ${manifest.sirshaSlides.length} Sirsha slides.`);
