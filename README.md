# Anamorphic Web — prototype

A cinematic, scroll-driven demo built to showcase Penta's anamorphic content
service. This is the first functional prototype: a narrative, full-viewport
experience rather than a conventional landing page, built to prove that
**media + scroll + depth + product + anamorphism + storytelling** can work
together as one experience — not to be the final commercial site.

## Stack

- **Vite + TypeScript** (vanilla, no framework) — small, fast, zero-config static output.
- **GSAP + ScrollTrigger** — pinning, scrubbing, and scroll-synced timelines.
- **Lenis** — smooth scroll, wired into GSAP's ticker so every ScrollTrigger stays in sync.

No backend, no build-time server dependency. The output is a static site
that works from a local folder, from GitHub Pages, or from any static host.

## Getting started

```bash
npm install
npm run dev       # local dev server with HMR
npm run build     # type-checks, then builds to dist/
npm run preview   # serves the production build locally
```

## Project structure

```
index.html                 all 7 sections, single page
src/
  main.ts                  boot sequence: smooth scroll → sections → preloader
  styles/main.css           design tokens + all section styles
  modules/
    smoothScroll.ts        Lenis + GSAP ticker integration
    preloader.ts           waits for hero video, animates the intro bar
    nav.ts                 smooth anchor navigation
    hero.ts                title reveal + pointer-driven depth parallax
    scrollExperience.ts    ⭐ core interaction — scroll → video.currentTime
    productGallery.ts       horizontal-scroll editorial photo gallery
    showcase.ts             pinned vertical→horizontal scroll gallery
    capabilities.ts        staggered typographic reveal
    reveals.ts              generic fade/slide-up for [data-reveal] elements
    lazyVideo.ts             IntersectionObserver-driven progressive video loading
public/
  media/                   pre-optimized video/poster assets (see below)
```

## The core interaction

`scrollExperience.ts` maps scroll progress inside a pinned section directly
to `video.currentTime`, so the visitor "drives" the clip with the scrollbar
instead of watching it autoplay. Two things make it hold up in practice
(found by testing against a real browser engine, not just visually):

1. **Smoothing.** Raw scroll deltas are noisy; the target time is lerped on
   a `requestAnimationFrame` loop rather than slammed onto the video every
   scroll tick, which is what removes the stutter.
2. **Explicit preload trigger.** `preload="auto"` is only a hint — several
   engines (and iOS in particular, for seeking) won't reliably start
   fetching or accept programmatic seeks on an off-screen video without an
   explicit play()/pause() call. That call is gated behind an
   `IntersectionObserver` so it fires once the section is roughly a
   viewport away, not at page load.

## Media

The only source asset available for this first pass was one abstract
looping render (`abstract-3d-morphing-wavy-geometric-shape-animation`,
1920×1080, 10s, h264). It's used for the hero, the scroll-scrubbing
sequence, and the first showcase item. Everything else that would need a
real anamorphic/product asset (the rest of the showcase, the product
breakdown geometry) is a **clearly labelled placeholder** — dashed borders
and a "PLACEHOLDER" tag — built so the visuals can be swapped without
touching any of the interaction logic.

Every video ships as both WebM (VP9) and MP4 (H.264), in that order, for
two reasons: file size, and because not every engine decodes H.264 (this
was caught by testing — a Chromium build without proprietary codec support
failed silently on MP4-only sources; Safari conversely needs the MP4
fallback since it doesn't support WebM). The browser picks whichever it can
decode.

`public/media/` — regenerate with ffmpeg if the source video changes:

| file | purpose | notes |
|---|---|---|
| `hero-desktop.mp4` / `.webm` | hero + scroll-scrub + showcase item 1 | 1920×1080, ~2–2.5MB |
| `hero-mobile.mp4` / `.webm` | final CTA background | 960×540, ~0.6–0.9MB |
| `hero-poster.jpg` | instant-paint poster for every video | shown before any video frame is ready |

## Performance notes already in place

- Only the hero video loads at page start; every other video (`[data-lazy-video]`)
  is `preload="none"` and only fetches once it's about to enter the viewport,
  and pauses again once it leaves.
- The scroll-scrub video preloads slightly ahead of when it's needed (see above),
  not at boot.
- `prefers-reduced-motion` disables the pointer-parallax and snaps scrub/scroll
  animations instead of easing them.
- Relative Vite `base: "./"` — the build works from any subpath (e.g.
  `https://<user>.github.io/<repo>/`) or a custom domain root, with no
  absolute local paths anywhere.

## Deploying

The `dist/` output from `npm run build` is a fully static site — drop it on
GitHub Pages, Netlify, Vercel, or any static host. For GitHub Pages from a
project repo (`https://<user>.github.io/<repo>/`), no extra config is
needed since `base` is already relative.

## What to do next (see the handoff notes for full detail)

- Replace the placeholder showcase items and the breakdown geometry with
  real anamorphic renders/captures once available.
- Re-encode media from final source footage at production quality once
  locked (current files are compressed from the single available asset).
- Consider adding real per-project media to the showcase (images, not just
  one shared clip).
