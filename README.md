# ASHWANI® — The Cutting Room

An editorial portfolio for video, poster art, fashion photography and identity design. Built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.

## Art direction

| Colour | Hex | Use |
| --- | --- | --- |
| Ink | `#0d0b0b` | Main canvas |
| Deep red | `#b3121b` | Cinematic chapter panels |
| Warm gold | `#c9a45c` | Editorial text and details |
| Paper | `#f1eee6` | Calm content panels |
| Lime | `#c8ff4d` | UI controls, focus and active navigation |

The lime/red contrast ratio is 5.92:1. Lime is used sparingly for controls and navigation; editorial labels use warm gold.

## Work chapters

- **Videos** — video-frame thumbnails, hover previews and a full player.
- **Posters** — Peaky Blinders art anchors the chapter; Batman art replaces the backdrop while its poster is hovered. Identical source files are deduplicated when the manifest is refreshed.
- **Fashion** — horizontal photo sequence from the red-curtain portraits through street images to the firelight set.
- **Identity** — the Sirsha brand case study is available at `/work/sirsha` as eight sequenced slides.

## Managing media

Put originals in `public/media/videos`, `public/media/posters`, and `public/media/photography/Fashion photography`. Sirsha source slides are in `public/Logo Design`. Run `npm run setup:media` to refresh the portfolio manifest, create 2400px WebP display copies, deduplicate identical gallery files and generate video stills. Edit `src/data/portfolio.json` to refine titles, tags, dates, descriptions and tools. Originals stay in the source folders.

## Local development

```bash
npm install
npm run setup:media
npm run dev
```

Create a production build with `npm run build`.
