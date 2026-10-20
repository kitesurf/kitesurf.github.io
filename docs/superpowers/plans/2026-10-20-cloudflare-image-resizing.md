# Cloudflare Edge Image Resizing & Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement automated, zero-extra-cost edge image resizing and AVIF/WebP conversion for `kite-mallorca.com` using Cloudflare Workers Paid, targeting a 1200px benchmark for Google PageSpeed and responsive sizes across all languages.

**Architecture:** A Cloudflare Worker at `workers/image-resizer/` intercepts `/cdn-cgi/image/*` requests and uses Cloudflare's `cf.image` engine to dynamically scale and convert images into AVIF/WebP based on browser support. Jekyll templates are updated with a centralized helper (`_includes/cf-img.html`) and optimized breakpoints for hero sliders, galleries, and review avatars with seamless local development fallback.

**Tech Stack:** Cloudflare Workers (JavaScript ES Modules, `fetch` with `cf.image`), Jekyll / Liquid templates, HTML5 `<img>` / `<picture>` with responsive `srcset` and `sizes`.

---

### File Structure & Responsibilities

- **`workers/image-resizer/wrangler.toml`**: Worker configuration (name, main entry, compatibility date, routes).
- **`workers/image-resizer/index.js`**: Edge worker script that parses `/cdn-cgi/image/OPTIONS/PATH`, validates origin, and applies Cloudflare `cf.image` transformations (`format: auto`, `fit: scale-down`, `quality: 85`).
- **`_includes/cf-img.html`**: Reusable Jekyll component generating responsive `<img>` tags with Cloudflare edge transformation URLs and localhost development fallback.
- **`_includes/swiper.html`**: Hero slider markup updated to use Cloudflare edge URLs with exact breakpoints (480w, 800w, 1200w, 1600w).
- **`_layouts/default.html`**: LCP image preloads synchronized with the 1200px desktop PageSpeed target and 480px mobile target.
- **`_includes/gallery-thumbs.html`**: Photo gallery updated to generate 320px thumbnails and 1600px lightbox images directly from master files.
- **`_includes/carousel.html`**: Review avatar images updated to 200px Retina edge transformations.

---

### Task 1: Create Cloudflare Worker Project (`workers/image-resizer/`)

- [ ] **Step 1.1:** Create directory `workers/image-resizer/`
- [ ] **Step 1.2:** Create `workers/image-resizer/wrangler.toml` with:
  - `name = "kite-mallorca-images"`
  - `main = "index.js"`
  - `compatibility_date = "2024-04-01"`
  - `routes = [{ pattern = "kite-mallorca.com/cdn-cgi/image/*", zone_name = "kite-mallorca.com" }]`
- [ ] **Step 1.3:** Create `workers/image-resizer/index.js` implementing:
  - Parse request URL path: `/cdn-cgi/image/<options>/<source-path>`
  - Parse comma-separated options: `width`, `height`, `quality`, `format`, `fit`
  - Restrict source fetching strictly to origin `https://kite-mallorca.com` (prevent open proxy)
  - Execute `fetch(sourceUrl, { cf: { image: { width, height, quality: quality || 85, format: 'auto', fit: fit || 'scale-down' } } })`
  - Set cache headers (`Cache-Control: public, max-age=31536000, immutable`)
  - Error fallback: pass through origin asset if transformation fails or options are missing
- [ ] **Step 1.4:** Create `workers/image-resizer/README.md` with instructions on deployment (`npx wrangler deploy` or Cloudflare Dashboard copy-paste)
- [ ] **Step 1.5:** Commit Worker files to Git

---

### Task 2: Create Reusable Jekyll Image Helper (`_includes/cf-img.html`)

- [ ] **Step 2.1:** Create `_includes/cf-img.html` accepting parameters:
  - `src` (required): Image path (e.g. `/images/flying-friends/foto.jpg`)
  - `alt` (required): Alt text for accessibility and SEO
  - `widths`: Comma-separated list of pixel widths (default: `480,800,1200,1600`)
  - `default_width`: Fallback `src` width (default: `1200`)
  - `quality`: Image quality (default: `85`)
  - `sizes`: CSS sizes string (default: `(max-width: 600px) 480px, (max-width: 1200px) 800px, 1200px`)
  - `class`: Optional CSS classes
  - `loading`: `lazy` or `eager` (default: `lazy`)
  - `fetchpriority`: Optional (`high` or `low`)
  - `width` & `height`: Intrinsic dimensions for CLS prevention
- [ ] **Step 2.2:** Add localhost fallback in `cf-img.html`:
  - If `site.url` contains `localhost` or `127.0.0.1`, output `src="{{ include.src }}"` directly without `/cdn-cgi/image/...` prefix
- [ ] **Step 2.3:** Test rendering via local Jekyll build to ensure clean HTML output
- [ ] **Step 2.4:** Commit `_includes/cf-img.html` to Git

---

### Task 3: Update Hero Swiper & LCP Preload

- [ ] **Step 3.1:** Inspect `_includes/swiper.html` and `_layouts/default.html`
- [ ] **Step 3.2:** Update `_includes/swiper.html`:
  - For Slide 1 (LCP element):
    - Replace hardcoded `.webp` / `.jpeg` files with Cloudflare `/cdn-cgi/image/...` paths
    - Add responsive sources:
      - Media `(max-width: 599px)`: `width=480,quality=85,format=auto`
      - Media `(min-width: 600px) and (max-width: 1023px)`: `width=800,quality=85,format=auto`
      - Media `(min-width: 1024px) and (max-width: 1440px)`: `width=1200,quality=85,format=auto` (PageSpeed target)
      - Media `(min-width: 1441px)`: `width=1600,quality=85,format=auto`
    - Update `<img>` attributes to `width="1200" height="800"` with `fetchpriority="high"`
  - For Slides 2–5:
    - Update `data-srcset` to use the Cloudflare edge URLs with `lazyload`
- [ ] **Step 3.3:** Update `_layouts/default.html` LCP preloads:
  - Desktop preload: `<link rel="preload" as="image" href="/cdn-cgi/image/width=1200,quality=85,format=auto{{ first_slide.image }}" media="(min-width: 600px)" fetchpriority="high">`
  - Mobile preload: `<link rel="preload" as="image" href="/cdn-cgi/image/width=480,quality=85,format=auto{{ first_slide.image }}" media="(max-width: 599px)" fetchpriority="high">`
- [ ] **Step 3.4:** Run `bundle exec jekyll build` and inspect `_site/de/index.html` and `_site/pt/index.html` to verify generated HTML markup
- [ ] **Step 3.5:** Commit changes to Git

---

### Task 4: Update Review Avatars & Gallery Thumbs

- [ ] **Step 4.1:** Update `_includes/carousel.html` (Testimonials):
  - Change avatar background image from `{{ item.avatar_img }}` to:
    `/cdn-cgi/image/width=200,quality=85,format=auto{{ item.avatar_img }}` (Retina 2x for 100x100 circle)
  - In AMP block: update `<amp-img>` to use the 200px edge URL
- [ ] **Step 4.2:** Update `_includes/gallery-thumbs.html` (Flying Friends Gallery):
  - In PhotoSwipe gallery loop:
    - Thumbnail: `/cdn-cgi/image/width=320,quality=85,format=auto/images/flying-friends/{{ image.image }}`
    - Fullsize lightbox: `/cdn-cgi/image/width=1600,quality=85,format=auto/images/flying-friends/{{ image.image }}`
  - In AMP block: update `<amp-img>` to `/cdn-cgi/image/width=640,quality=85,format=auto/images/flying-friends/{{ image.image }}`
- [ ] **Step 4.3:** Run `bundle exec jekyll build` and verify `_site/de/flying-friends/index.html` and `_site/pt/flying-friends/index.html`
- [ ] **Step 4.4:** Commit changes to Git

---

### Task 5: Verification & Deployment Guidance

- [ ] **Step 5.1:** Perform a complete `bundle exec jekyll build` verification
- [ ] **Step 5.2:** Verify no broken images or invalid URLs across all languages (`de`, `en`, `es`, `it`, `fr`, `pl`, `pt`)
- [ ] **Step 5.3:** Document deployment steps for Daniel (Wrangler vs. Cloudflare Dashboard)
- [ ] **Step 5.4:** Send confirmation via `mgr-telegram.sh`
