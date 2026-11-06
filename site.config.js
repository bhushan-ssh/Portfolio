import { email, socials, education } from "./src/data/content.js";

export const SITE_URL = "https://portfolio-plum-beta-63.vercel.app";

export const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bhushan Sonawane",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/profile.webp`,
  email: `mailto:${email}`,
  jobTitle: "Full-Stack Developer · Data Science Student",
  description: "B.S. Data Science student at IIT Madras (expected 2027) and B.E. Information Technology student at SND College (expected 2028).",
  alumniOf: education.map(({ institution }) => ({
    "@type": "CollegeOrUniversity",
    name: institution,
  })),
  sameAs: socials.filter(({ href }) => href.startsWith("https://")).map(({ href }) => href),
};

export const crawlerFiles = {
  "robots.txt": `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  "sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE_URL}/</loc></url>
</urlset>
`,
};
