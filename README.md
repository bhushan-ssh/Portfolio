# Bhushan Sonawane — Portfolio

A static portfolio built with React 19 and Vite. It includes project filters, screenshot and case study dialogs, an education timeline, a certificate gallery, and links to contact and social accounts.

## Run locally

Use Node.js 22.12+ and npm.

```sh
npm install
npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Check the source with Oxlint |
| `npm run build` | Build and prerender the static site in `dist/` |
| `npm run preview` | Serve the production build locally |

The production build prerenders HTML and hydrates it in the browser. Text and links remain available without JavaScript; filters and dialogs need JavaScript. There is no runtime server or contact form endpoint.

## Project structure

```text
src/
  App.jsx                 Page composition and scroll reveals
  components/             Sections, shared UI components, and their CSS
  data/                   Projects, skills, education, certificates, and links
  styles/tokens.css       Design tokens
  index.css               Shared layout and accessibility styles
  entry-server.jsx        Build-time HTML rendering
public/
  projects/               Project screenshots and optimized variants
  certs/                  Certificate PDFs and WebP thumbnails
  profile*.webp           Optimized portrait variants
  resume.pdf              Downloadable resume
scripts/
  build.mjs               Client build and static prerendering
  prepare-assets.py       Optional asset regeneration
  check-browser.cjs       Optional browser checks
docs/
  asset-audit.md           Source asset inventory and content notes
```

Edit the files in `src/data/` to update content. Projects are filtered by category; if you add a category, add its button in `src/components/Projects.jsx`. Each project may include a `demo` URL, and projects with a `caseStudy` object show a case study button. The certificate gallery shows three records initially and reveals the full list on request.

The original images and PDFs are retained. Optimized image variants are committed, so a normal build needs no Python packages. After replacing source images or certificate PDFs, regenerate variants with:

```sh
python -m pip install pillow pypdfium2
python scripts/prepare-assets.py
```

## Deployment

Vercel uses the settings in `vercel.json`: build command `npm run build`, output directory `dist`. Other static hosts can use the same command and directory.

For a GitHub Pages project path, build with:

```sh
npm run build -- --base=/portfolio/
```

You can also set `VITE_BASE_PATH` in the build process environment. Before publishing, replace `https://example.com` in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with the final public URL. The site uses fragment navigation and does not need an SPA rewrite.

## Optional browser checks

`scripts/check-browser.cjs` checks navigation, project filters and dialogs, certificate PDFs, the resume, common viewport widths, and JavaScript errors. It requires Playwright and Google Chrome outside the app dependencies. Build the site, start `npm run preview`, then run `node scripts/check-browser.cjs`. Set `PREVIEW_URL` if preview runs on another address, or `PLAYWRIGHT_MODULE` if Playwright is installed at a custom path. Results are written to the ignored `artifacts/` directory.
