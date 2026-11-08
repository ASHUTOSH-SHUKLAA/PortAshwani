# Portfolio media workflow

Keep original files in these input folders:

- `videos/` — `.mp4` files; each appears in the video chapter.
- `posters/` — poster artwork.
- `photography/Fashion photography/` — fashion frames.
- `../Logo Design/` — Sirsha identity source slides.

Run `npm run setup:media` after adding or removing assets. It refreshes `src/data/portfolio.json`, removes byte-identical duplicates from the gallery manifest, creates 2400px WebP display copies in `optimized/`, and updates video stills. Originals are preserved. Titles, descriptions, tags, years and tools can be edited in the JSON manifest.

The fashion sequence is explicitly ordered in `setup-media.js`. The Sirsha page uses eight selected frames at `/work/sirsha`. To replace a source image, keep its current filename or update the ordered list in the script, then rerun setup.
