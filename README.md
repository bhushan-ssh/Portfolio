# Bhushan Sonawane — Portfolio

A white-and-sage portfolio for developer internships and opportunities, built with React 19 and Vite. Features real project screenshots, a featured HackVerse-winning project, an education timeline, 21 verified certificate records, and a configurable contact form.

## Getting started

Use Node.js 22.12+ (or a newer supported LTS) and npm.

```sh
npm install
npm run dev
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run lint` | Run Oxlint |
| `npm run build` | Build and prerender the production site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `python scripts/prepare-assets.py` | Optional: regenerate image variants, certificate thumbnails, social card, and raster icons |

Runtime dependencies are React, React DOM, and lucide-react. Animations use CSS, IntersectionObserver, and requestAnimationFrame; no animation framework is required. Native HTML dialogs provide modal semantics, with explicit keyboard focus wrapping, Escape handling, scroll locking, and focus restoration.

## Contact form configuration

Copy `.env.example` to `.env`, create a Formspree form, and set its public submission endpoint:

```dotenv
VITE_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

Restart Vite after changing environment variables. For production, set the variable in the hosting provider's build environment and redeploy. The variable is embedded in the client bundle and must never contain a secret API key.

The form sends `name`, `email`, `subject`, `message`, and `_gotcha` using FormData with `Accept: application/json`. It includes browser validation, whitespace checks, a honeypot, duplicate-submit prevention, a 15-second timeout, loading/success/error feedback, and preserved input after failure. Enable your provider's spam protection too. See [Formspree's AJAX example](https://formspree.io/blog/formspree-ajax/).

Without an endpoint, the submit button is disabled and the site clearly offers the working email link. Browser checks intercept a local test endpoint; no test emails were sent. **Real delivery still needs your endpoint and a live delivery test.**

## Structure

```text
src/
  App.jsx                 Page composition and scroll reveals
  entry-server.jsx        Build-time HTML rendering (no server at runtime)
  components/             Individual sections and their CSS
  data/                   Projects, skills, education, certificates, achievements, socials
  styles/tokens.css       Palette, typography, spacing, radii, shadows
  index.css               Shared layout, controls, accessibility, responsive rules
public/
  profile*.webp           Optimized responsive portrait variants
  projects/               Original screenshots and WebP variants
  certs/                  Original PDFs with normalized filenames
    thumbs/               Small WebP previews of each PDF's first page
  resume.pdf              Original resume, served directly
  og-image.png            1200 × 630 social preview
scripts/
  prepare-assets.py       Optional asset generation (Pillow + pypdfium2)
  build.mjs               Vite client build plus static React prerendering
  check-browser.cjs       Optional Playwright interaction checks
docs/
  asset-audit.md           Inventory, metadata provenance, discrepancies, rename mapping
  verification.md         Browser and Lighthouse results
```

Edit `src/data/` to maintain content. `certifications.js` uses text extracted from PDFs and visual transcription of scans. Dates are deliberately omitted where none are printed. Participation, school records, competitions, and skills certificates are labeled separately. Six selected certificates appear initially; the button reveals all 21.

Add an optional `demo` URL to a project only when a real live deployment exists. Project screenshots open in a keyboard-accessible lightbox. Web / Machine Learning filters use the project's `category` field. Internal public-asset paths go through `asset()` so they respect Vite's base URL.

The production build prerenders the page using React DOM server, then hydrates it in the browser. Text and links remain available without JavaScript; filtering, modals, and the form require it. There is no runtime server dependency.

## Images and PDFs

Optimized files are committed, so normal installation and builds need no Python packages. To regenerate after replacing source assets:

```sh
python -m pip install pillow pypdfium2
python scripts/prepare-assets.py
```

The script preserves source images/PDFs, makes responsive WebPs, rotates sideways event scans in thumbnails only, and generates the social card and icons. The original images remain as regeneration sources. PDFs are linked static files and never imported into JavaScript or downloaded during page load.

`profile.webp` is the uncropped optimized image used by Person metadata. The visible hero uses cropped 400/600/800-pixel variants. Screenshots have 640-pixel variants for cards and larger variants for lightboxes. All below-fold imagery is lazy-loaded; the hero is eager and high priority.

## Design and accessibility

- White/light theme only, sage accent, DM Sans and Manrope, shared design tokens.
- Sticky translucent navigation, active section indicators, scroll progress, fixed scroll offset.
- Skip link, visible focus rings, labeled inputs, accessible icon links, modal focus trap.
- Reduced-motion support for scrolling, reveals, role rotation, chips, and counters.
- Responsive layouts checked at 360, 768, 1024, and 1440 pixels.
- Copy-email button with live status feedback and graceful clipboard failure text.
- Google Fonts uses preconnect and a nonblocking stylesheet link with `display=swap`; fallback fonts remain readable if it cannot load.

## Deployment

### Vercel

1. Import this repository into Vercel. `vercel.json` specifies Vite, `npm run build`, and `dist`.
2. Add `VITE_FORM_ENDPOINT` to the production environment.
3. Replace every `https://example.com` occurrence in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with your public URL.
4. Deploy. Verify the form, resume, all certificate links, and social preview on the deployed domain.

Only hashed `/assets/` files receive immutable cache headers; editable PDFs and public images are not indefinitely cached. This is a single page with fragment navigation and does not need an SPA rewrite.

### GitHub Pages

For a user site or custom domain, keep `base: '/'`. For a project site such as `https://USERNAME.github.io/portfolio/`, build using:

```sh
npm run build -- --base=/portfolio/
```

Alternatively set `VITE_BASE_PATH=/portfolio/` in the **build process environment** (the config reads `process.env`; it does not load this option from `.env`). Deploy `dist` using a GitHub Pages workflow. Set `VITE_FORM_ENDPOINT` as a build variable. Canonical, social-image, schema, and sitemap URLs must include the correct domain and repository subpath. See [Vite's static deployment guide](https://vite.dev/guide/static-deploy).

### Other static hosts

Build command: `npm run build`. Publish directory: `dist`. Set the same build environment variable, replace domain placeholders, and serve over HTTPS for clipboard support.

## Things you need to provide

- [ ] A real Formspree endpoint and a successful delivery test after deployment.
- [ ] Final public domain/URL to replace `https://example.com` in SEO metadata, robots, sitemap, and Person schema.
- [ ] Real project demo URLs if available; the site currently shows source links only.
- [ ] Clarification of the resume's TECHFUSION winner statement: the supplied poster record has no rank and the micro-project record says second place.
- [ ] Confirmation of whether CareerLink's 500+ students and QuizMaster's 100+ users are measured usage/capacity or design targets; existing site wording was preserved.
- [ ] Dates for undated certificates only if supported by a reliable source; no date is required to display them.

See [the asset audit](docs/asset-audit.md) for every renamed certificate and all content discrepancies. The supplied resume has not been edited. No hosting deployment was performed as part of this repository upgrade.

## Optional browser checks

`scripts/check-browser.cjs` uses Playwright as an external QA tool; it is not an application dependency. Point `PLAYWRIGHT_MODULE` to an available Playwright installation, or make `playwright` resolvable in your test environment. The script uses installed Google Chrome.

1. Run `npm run build` and `npm run preview` (default port 4173).
2. In another shell, set `VITE_FORM_ENDPOINT=/test-contact` **for that process only**, then run `npm run dev -- --port 5174 --strictPort`.
3. Run `node scripts/check-browser.cjs`. Optional overrides: `PREVIEW_URL`, `FORM_PREVIEW_URL`, and `PLAYWRIGHT_MODULE`.

The test intercepts `/test-contact` locally; it never sends real messages. Results and screenshots go to ignored `artifacts/`. Do not deploy the test endpoint. Run Lighthouse against the production preview for performance, accessibility, best practices, and SEO. Hosted scores will depend on the final domain, caching, and network conditions.
