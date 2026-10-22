# Development Journal — Portfolio Rebuild (2026)

Migration of the legacy Create React App portfolio into a modern **Next.js 16 App Router** project.

- **Old project (preserved, untouched):** `../my-portfolio` — CRA + `react-scripts`
- **New project:** `./my-portfolio-next`
- **Goal:** identical visual language, drastically smaller bundle, static-first rendering, 2026 standards.

---

## 1. Why the old app was slow

| Problem | Root cause | Impact |
| --- | --- | --- |
| Large payload | Bootstrap + FontAwesome Kit + devicon CDN + jQuery + AOS loaded globally | ~1 MB+ of CSS/JS for a single page |
| Client-only rendering | CRA SPA ships an empty `<div id="root">` | Nothing paints until JS parses; poor LCP/FCP |
| Render-blocking third parties | FontAwesome Kit + Google Fonts CSS + devicon CSS | Chained network waterfall before first paint |
| Effect-driven UI | `window.onscroll` handlers, `setInterval` carousels, jQuery `.animate()` | Layout thrash, no cleanup, jank on low-end devices |
| Redundant deps | `axios` used for one form POST; `slick-carousel` for a 5-item slider | Dependency surface far larger than the feature set |
| Unoptimized images | Raw JPEG/PNG served at source size, no `srcset` | `portfolio8.jpg` alone was 935 KB |
| No SEO surface | Title/description set imperatively; no sitemap, robots, or structured data | Weak indexing and social previews |

---

## 2. Stack decisions

| Concern | Choice | Reasoning |
| --- | --- | --- |
| Framework | **Next.js 16.4.2 App Router** | Server Components let the whole page prerender to static HTML; zero client JS for static sections. |
| Rendering model | **Static prerender + `cacheComponents`** | Page is fully static; only the interactive islands hydrate. |
| Language | **TypeScript 5 (strict)** | Content files are typed, so a bad image path or missing field fails the build instead of the browser. |
| Styling | **Tailwind v4 (`@theme`) + the original class vocabulary** | Design tokens centralized; existing class names (`container`, `d_flex`, `btn_shadow`) kept so the design stays recognizable. |
| Icons | **`react-icons` (tree-shaken SVG)** | Replaces FontAwesome Kit, devicon CDN, and Table Icons. Only the ~60 icons actually imported ship. |
| Fonts | **`next/font/google` Poppins** | Self-hosted, preloaded, `display: swap`, no external font CSS request. |
| Animation | **CSS scroll-driven animations** | Replaces AOS + jQuery. Runs on the compositor, no JS. |
| Dialogs | **Radix UI Dialog** | Replaces hand-rolled modal state; gives focus trap, ESC, and `aria-modal` for free. |
| Forms | **Zod only** | `react-hook-form` + `@hookform/resolvers` were dropped after a peer-dependency conflict; Zod alone covers validation cleanly. |
| Bundler | **Turbopack** | Default in Next.js 16; no extra config. |

Dependencies deliberately **removed** from the old app: `bootstrap`, `react-bootstrap`, `jquery`, `aos`, `slick-carousel`, `axios`, `@fortawesome/*`, `react-table`, `react-scripts`, `web-vitals`, `reportWebVitals`.

---

## 3. Architecture

```
src/
  app/
    layout.tsx        # fonts, metadata, viewport, JSON-LD, Header/Footer/ScrollToTop
    page.tsx          # composes the 9 sections in original order
    globals.css       # @theme tokens + all component styles
    sitemap.ts robots.ts manifest.ts   # MetadataRoute generators
  components/         # one file per section
  content/            # typed data, no JSX
```

**Server vs Client split** — the default is a Server Component; `"use client"` is opt-in and only where a browser API is genuinely required:

| Server (renders to HTML, 0 JS) | Client (hydrated island) |
| --- | --- |
| `Hero`, `Features`, `Skills`, `Resume`, `Certification`, `Footer`, `SectionHeading` | `Header`, `Portfolio`, `Reference`, `Contact`, `ScrollToTop` |

Result: the four below-the-fold sections plus the hero ship **no JavaScript at all**.

Content was extracted from JSX into typed data modules (`content/portfolio.ts`, `content/skills.ts`, …) so copy edits never touch component code.

---

## 4. Performance work

1. **Static HTML for the whole page.** Prerendered at build time; `Revalidate 15m / Expire 1y`. No server work per visit.
2. **AVIF + WebP images.** `next/image` with `formats: ["image/avif", "image/webp"]`, explicit `sizes`, `priority` on the hero, `fill` where the layout is fluid. The multi-hundred-KB portfolio JPEGs are re-encoded per viewport.
3. **Icons as tree-shaken SVGs.** Removes three CDN stylesheets from the critical path.
4. **Self-hosted font.** One preloaded woff2, no FOUT-inducing external CSS.
5. **Zero-JS animation.** `.reveal` uses `animation-timeline: view()`, wrapped in `@supports` so non-supporting browsers simply show the content statically.
6. **Passive, cleaned-up listeners.** The header scroll listener is `{ passive: true }` and removes itself on unmount; the scroll-to-top progress ring is rAF-throttled and reads scroll position inside the frame.
7. **`IntersectionObserver` scroll-spy** instead of comparing every section's `offsetTop` on scroll.
8. **Pausable carousel.** Autoplay is a single interval, suspended on hover/focus and disabled entirely under `prefers-reduced-motion`.
9. **Reduced-motion respected everywhere.** The hero typewriter, carousel, reveal animations, and smooth scrolling all branch on `prefers-reduced-motion`.
10. **Semantic + machine-readable.** Metadata API, `Viewport` export, Person JSON-LD, `sitemap.xml`, `robots.txt`, and a web manifest.

---

## 5. Styling strategy

`globals.css` opens with a Tailwind v4 `@theme` block defining the palette and shadows as tokens:

```css
--color-brand: #ff014f;
--color-brand-soft: #ff3a75;
--color-ink: #3c3e41;
--color-ink-muted: #878e99;
--color-surface: #ecf0f3;
--color-line: #d9dee2;
--shadow-neu: 4px 4px 8px #cbcbcb, -4px -4px 8px #ffffff;
```

Everything downstream references `var(--color-brand)` rather than hard-coded hex, so the neumorphic theme can be re-skinned from one place. The original legacy class names were preserved deliberately — the design is meant to read as the same site, rebuilt.

A long-standing typo in the original stylesheet (`.box_shodown`) was corrected to `.box_shadow`.

---

## 6. Issues hit and resolutions

| Issue | Resolution |
| --- | --- |
| `new Date()` during prerender | `Footer` is `async` and marked `"use cache"`, with the year hoisted before JSX. |
| `"use cache" functions must be async` | Changed the Footer signature to `async function`. |
| `react-hooks/set-state-in-effect` in the hero typewriter | Rebuilt on `useSyncExternalStore` for the media query, and moved every `setState` inside the `setTimeout` callback. |
| `FaMobileAlt` missing from `react-icons/fa6` | Swapped to `FaMobileScreen` after verifying against `node_modules` typings. |
| Several `simple-icons` names absent (`SiCss3`, `SiRecharts`, `SiAdobe*`) | Mapped to available equivalents (`SiCss`, `SiChartdotjs`, FA6 icons). |
| `@hookform/resolvers` peer conflict | Dropped `react-hook-form`; plain Zod validation. |

---

## 7. Verification

```
npm run lint     # 0 errors, 0 warnings
npm run build    # ✓ compiled, 7 static routes generated
npm run format   # prettier + prettier-plugin-tailwindcss
```

Build output confirms full static prerendering:

```
Route (app)                Revalidate  Expire
┌ ○ /                             15m      1y
├ ○ /_not-found                   15m      1y
├ ○ /manifest.webmanifest
├ ○ /robots.txt
└ ○ /sitemap.xml
```

---

## 8. Remaining work

- [ ] Visual QA pass against the old site at desktop / tablet / mobile widths.
- [ ] Lighthouse audit — target 95+ performance, 100 accessibility, 100 SEO.
- [ ] Replace the placeholder Formspree endpoint in `content/site.ts`.
- [ ] Remove unused assets: `Portfolio_image/{portfolio10.jpg,slider.png}`, `Blog_image/blog.png`, `certificationImage/{udemy2.png,coursera.png,linkedin.png}`, duplicate `image/Nasif Resume New.pdf`, and the leftover CRA scaffold SVGs in `public/`.
- [ ] Deploy to Vercel and attach the custom domain.
