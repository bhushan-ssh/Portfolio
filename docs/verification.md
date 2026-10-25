# Verification — 25 October 2026

## Build and source checks

- Baseline `npm install`: successful, 0 reported vulnerabilities.
- Baseline build and lint: passed.
- Final `npm run lint`: no errors or warnings.
- Final `npm run build`: client build and static prerender passed without warnings.
- `git diff --check`: passed (Git only emitted its configured LF/CRLF normalization notices).
- `.env` is ignored; `.env.example` is tracked.
- GitHub Pages build using `npm run build -- --base=/portfolio/`: passed. Browser verified the prefixed page, portrait, resume link, hydration, and certificate expansion. Final `dist/` was rebuilt with the default `/` base.

## Browser checks

22 assertions/groups passed in `scripts/check-browser.cjs` using installed Chrome through Playwright:

- Keyboard skip link and main-content focus.
- No horizontal overflow at 360, 768, 1024, or 1440 pixels.
- All internal fragment links resolve.
- All / Web / Machine Learning filters show the correct projects.
- Screenshot lightbox, forward/backward focus wrapping, Escape closure, and focus restoration.
- Mobile menu, focus wrapping, Escape, link closure, and sticky-header scroll offset.
- All 21 certificate cards expand and all linked files return valid PDF content.
- Resume link has the meaningful download filename and returns a valid PDF.
- Copy-email button places the expected address on the clipboard.
- Missing endpoint produces an explicitly disabled submit button and email fallback.
- Back-to-top returns to document top.
- Reduced-motion content is visible.
- Required-field and email-format validation prevent invalid submissions.
- Form loading state and successful JSON response reset the form.
- HTTP errors preserve the user's message; network errors show failure feedback.
- Honeypot prevents a request.
- No JavaScript or hydration errors.

Additional browser checks passed: missing screenshot fallback, role rotation, and stopping rotation under reduced-motion preference. Visual review covered desktop and mobile hero, education, projects, skills, certificate cards, and contact form. A certificate-preview sizing issue found during review was corrected.

Contact responses were intercepted locally, including HTTP success and error responses. No email was sent. Actual Formspree delivery cannot be verified until the owner supplies and configures the endpoint.

## Lighthouse

Lighthouse 13.5.0, production preview at localhost, mobile preset with simulated throttling, 25 October 2026. Final four-category audit:

| Category | Score |
| --- | ---: |
| Performance | 99 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

- First contentful paint: 1.4 seconds
- Largest contentful paint: 2.1 seconds
- Total blocking time: 10 milliseconds
- Cumulative layout shift: 0.002
- Speed index: 1.4 seconds

Build-time HTML rendering, nonblocking Google Fonts, batched layout reads, and responsive WebP images improved the initial render. Raw local reports/screenshots are in ignored `artifacts/`. Scores describe this local audit and are not a guarantee for the final host; repeat the audit after configuring the domain and deployment.

## Remaining configuration

- `VITE_FORM_ENDPOINT`: real Formspree submission endpoint and delivery test.
- `https://example.com`: final domain in HTML SEO/schema, robots.txt, and sitemap.xml.
- Optional `demo` properties: no live demo URLs were supplied, so no demo buttons are shown.
- Owner clarification of the content discrepancies recorded in `asset-audit.md`.

No deployment or push was performed. The original resume and certificate PDF contents are unchanged.
