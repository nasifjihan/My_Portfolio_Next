# Nasif Jihan — Portfolio

Personal portfolio site for **Nasif Jihan**, MERN Stack Developer — rebuilt from the original
Create React App project as a static-first **Next.js 16 App Router** application.

The goal was visual parity with the legacy site, with the runtime cost removed: no Bootstrap, no
jQuery, no FontAwesome Kit, no third-party carousel, no client-side rendering for static content.

---

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16.4.2 (App Router, Turbopack, `cacheComponents`) |
| UI runtime | React 19.3.1 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4 — CSS-first config via `@theme` tokens in `globals.css` |
| Class merging | `clsx` + `tailwind-merge` through the `cn()` helper |
| Icons | `react-icons` (tree-shaken SVG imports only) |
| Fonts | `next/font/google` — Poppins, self-hosted and preloaded |
| Animation | CSS keyframes + scroll-driven animations (`animation-timeline: view()`) |
| Dialogs | Radix UI Dialog (mobile nav drawer, project modal) |
| Forms | Zod 4 validation + Formspree POST |
| Package manager | npm |

Removed from the legacy app: `bootstrap`, `react-bootstrap`, `jquery`, `aos`, `slick-carousel`,
`axios`, `@fortawesome/*`, `react-table`, `react-scripts`.

---

## Features

- **Sticky header** with an `IntersectionObserver` scroll-spy that highlights the active section
  (`aria-current` included) and a Radix drawer for mobile navigation.
- **Hero** with a looping blob image, an animated inner ring, and a reduced-motion-aware typewriter
  cycling through roles.
- **What I Do** — six service cards, three per row on desktop, with a lift-and-tint hover.
- **Skills** — four grouped columns (Frontend, Backend, Tools, Design) with proficiency levels.
- **Portfolio** — six projects in a responsive grid; each card opens a Radix dialog with the full
  description, tech list, and features.
- **Resume** — dual-column timeline (Education / Job Experience) with a fixed-offset rail and
  markers that tint on hover.
- **Certifications** — twelve entries as linked rows with issuer logos.
- **References** — autoplaying testimonial carousel that pauses on hover/focus and is disabled
  entirely under `prefers-reduced-motion`.
- **Contact** — Zod-validated form (name, phone, email, subject, message) posting JSON to
  Formspree, with per-field errors and an `aria-live` status region.
- **Scroll-to-top** progress ring, rAF-throttled, with a real focusable button state.

---

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, viewport, Person JSON-LD, shell (Header/Footer/ScrollToTop)
    page.tsx          # composes the sections in the original order
    globals.css       # @theme design tokens, base layer, scroll-driven utilities
    favicon.ico       # metadata file convention
    manifest.ts       # MetadataRoute.Manifest
    robots.ts         # MetadataRoute.Robots
    sitemap.ts        # MetadataRoute.Sitemap
  components/         # one file per page section
    ui/               # reusable primitives: Container, Section, SectionHeading, Grid,
                      # NeoCard, NeoButton, NeoLink
  content/            # typed data modules — no JSX
  lib/
    cn.ts             # clsx + tailwind-merge
public/
  image/              # hero, portfolio, reference, certification assets
  favicon.png
  resume.pdf
```

Content lives in `src/content/*.ts` as typed arrays, so copy edits never require touching component
code, and a wrong image path or missing field fails the build instead of the browser.

### Server vs Client components

Server Components are the default; `"use client"` is opt-in and limited to components that genuinely
need a browser API.

| Server (HTML only)                                                             | Client (hydrated island)                      |
| ------------------------------------------------------------------------------ | --------------------------------------------- |
| `Hero`, `Features`, `Skills`, `Resume`, `Certification`, `Footer`, `SectionHeading` | `Header`, `Portfolio`, `Reference`, `Contact`, `ScrollToTop` |

---

## Getting started

Requires **Node.js >= 20.9.0**.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

### Scripts

| Script                 | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack)                   |
| `npm run build`        | Production build, fully prerendered                |
| `npm run start`        | Serve the production build                         |
| `npm run lint`         | ESLint (flat config, `eslint-config-next`)         |
| `npm run format`       | Prettier + Tailwind class sorting                  |
| `npm run format:check` | Prettier check without writing                     |

---

## Configuration

**`src/content/site.ts` is the single source of truth** — name, role, taglines, URL, email, phone,
resume path, employer details, the Formspree endpoint, navigation links, and social profiles. The
layout metadata, JSON-LD, header, hero, and contact section all read from it.

To make the contact form live, point `site.formEndpoint` at your own Formspree form ID:

```ts
formEndpoint: "https://formspree.io/f/<your-form-id>",
```

No environment variables are required; the project builds and runs with zero configuration.

Design tokens (palette, shadows, fonts, animation names) are declared once in the Tailwind v4
`@theme` block at the top of `src/app/globals.css` and referenced as CSS variables everywhere else,
so the neumorphic theme can be re-skinned from one place.

---

## SEO, PWA & metadata

- `metadata` and `viewport` exports in `src/app/layout.tsx`: title template, description, keywords,
  canonical URL, Open Graph, Twitter `summary_large_image`, icons, robots directives.
- **Person JSON-LD** structured data built from `site.ts` and the profile links.
- `sitemap.xml`, `robots.txt`, and a web manifest generated by `MetadataRoute` conventions.
- `next/image` with AVIF + WebP output, explicit `sizes`, and `priority` on the hero only.

---

## Accessibility & performance notes

- Reduced motion is honoured by the typewriter, the carousel, the reveal animations, and smooth
  scrolling.
- Focus states use `:focus-visible`; hover styling on interactive cards is mirrored with
  `group-focus-visible` so keyboard users get the same affordances.
- The off-screen social rail slides in on `focus-within`, never trapping focus.
- Page content is capped at a 1400px container so layouts stay intact on ultra-wide displays.
- Scroll and pointer listeners are passive, cleaned up on unmount, and rAF-throttled where needed.

---

## Known limitations

- The Open Graph image is the portrait hero (`1065×1156`), while `summary_large_image` expects a
  landscape ~`1200×630` asset — some scrapers will centre-crop it.
- Unused assets remain in `public/`: the scaffold SVGs (`file.svg`, `globe.svg`, `next.svg`,
  `vercel.svg`, `window.svg`) and a few duplicate certificate images.
- Dependency majors intentionally held back for now: `eslint` 9 → 10, `typescript` 5 → 7,
  `@types/node` 20 → 26.

See [`DEVELOPMENT_JOURNAL.md`](./DEVELOPMENT_JOURNAL.md) for the full migration rationale,
per-section decisions, and the issues hit along the way.
