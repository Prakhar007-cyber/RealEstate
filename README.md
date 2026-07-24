# AURELIS RESIDENCES

**Elevated Living. Timeless Design.**

A premium, highly-animated marketing site for a fictional luxury residential
development in Gurugram. Built as a portfolio piece to demonstrate cinematic
UI/UX, scroll-driven animation and thoughtful micro-interactions.

> This is a fictional project. All imagery is from [Unsplash](https://unsplash.com)
> and all data is invented — no real developer branding is used.

---

## Tech stack

| Concern            | Library                                             |
| ------------------ | --------------------------------------------------- |
| Framework          | Next.js 16 (App Router) + React 19 + TypeScript     |
| Styling            | Tailwind CSS v4 (CSS-first `@theme` design tokens)  |
| Animation          | Framer Motion (primary) + GSAP / ScrollTrigger      |
| Smooth scroll      | Lenis (`lenis/react`, driven by the GSAP ticker)    |
| Icons              | Lucide React (+ a few inline brand SVGs)            |
| Premium components | React Bits (copied into `components/reactbits/`)    |

### About React Bits

React Bits is distributed as **copy-in source** — you paste each component into
your own project. The components under `src/components/reactbits/` are that
source (attributed in each file): `SplitText`, `BlurText`, `ShinyText`,
`CountUp`, `Magnet`, `ClickSpark` and `AnimatedContent`.

---

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (all pages prerender statically)
npm run start    # serve the production build
npm run lint     # eslint
```

Remote images are served from `images.unsplash.com` (allow-listed in
`next.config.ts`).

---

## Project structure

```
src/
  app/
    layout.tsx        # fonts (Cormorant + Inter), metadata
    providers.tsx     # Lenis smooth scroll + GSAP sync, cursor, scroll bar
    template.tsx      # route-change curtain transition
    page.tsx          # homepage (assembles every section)
    signin/ signup/   # cinematic auth routes
    globals.css       # Tailwind v4 tokens + base styles
  components/
    sections/         # Hero, Intro, Stats, Residences, Architecture,
                      # Amenities, Lifestyle, Gallery, Location,
                      # Testimonial, SiteVisit
    layout/           # Preloader, Navbar, Footer, FloatingActions
    auth/             # AuthExperience (signin <-> signup morph) + forms
    reactbits/        # React Bits components (copied source)
    animations/       # Parallax, Reveal, TextReveal
    ui/               # Button, CustomCursor, ScrollProgress, icons
  data/site.ts        # all project content (residences, amenities, gallery…)
  lib/utils.ts        # cn(), prefersReducedMotion()
```

---

## Highlights

- **Cinematic preloader** that counts to 100 then lifts to reveal the hero
  (shown once per session).
- **Hero** with load-in image scale, scroll + mouse parallax and clipped
  headline reveals.
- **Scroll-linked story copy** where words brighten as you scroll.
- **Animated statistics** that count up on entry.
- **Interactive Residences** — selecting a home cross-fades the image and opens
  an SVG floor-plan modal.
- **Immersive architecture section** — a pinned, scaling full-bleed visual.
- **Amenities** where hovering a name swaps the full background image.
- **Filterable gallery** with layout animations and a keyboard-navigable
  lightbox.
- **Stylised location map** (no paid map API).
- **Validated site-visit form** with an animated success state.
- **Sign In ↔ Sign Up** morph — the image panel slides across and the form
  cross-fades without a page reload.
- Custom cursor, magnetic buttons, scroll progress bar and floating quick
  actions — all disabled sensibly for touch / `prefers-reduced-motion`.

Fully responsive, no horizontal overflow, `npm run build` passes with no
TypeScript or lint errors.
