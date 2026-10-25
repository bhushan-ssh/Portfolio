# Asset audit — 25 October 2026

Baseline: npm install (0 vulnerabilities), npm run build, and npm run lint passed.
All 22 PDFs (resume + 21 certificates) render correctly. All three project screenshots
and the portrait decode correctly. PDFs were text-extracted and visually inspected;
many are image scans, so the readable visual text is the source of metadata.

## Content discrepancies and missing fields
- CareerLink: resume says connecting 500+ students; original site says designed to connect 500+. Original site wording retained.
- QuizMaster: resume says supporting 100+ concurrent users; original site says built to support 100+. Original site wording retained.
- TECHFUSION: resume says “Winner, Micro Project Poster Presentation”; poster PDF has a dash in the position field, and micro-project PDF says second place. Certificate cards follow the PDFs; resume is unchanged.
- SND Project Competition 2024 runner-up is listed in the resume, but no corresponding 2024 certificate was supplied. No new certificate invented.
- JavaScript appears in the existing site but not the resume's programming language list. Retained existing skill. React powers this portfolio; no invented proficiency rating.
- IIT Madras advanced ML/Data Science certificate is supplied but absent from resume's milestone list. Both degree names and expected graduation years match the resume.
- “SDE Intern Certificate” is HackerRank's Software Engineer Intern role certification, not a job or internship record.
- No printed dates on either IITM advanced certificate or the four Paradox certificates (LLM, Chart Deconstruction, Testing Big Data, RopeWalker). Date fields omitted, rather than inferred from event name.
- Technofest has blank event/position fields. General symposium title and printed event date used; no rank claimed.
- HackVerse confirms first position on 24–25 April 2026. Uptime's 85% accuracy and team size are supplied resume claims, not independently benchmarked here.
- Uptime screenshot is a project preview, as stated in the image; it is not evidence of a deployed live demo. No live URLs were supplied for any project.
- HSC/SSC are school certificates, separated from professional certifications in the gallery. Original files are preserved, including personal information already present in the supplied public assets.

## Asset inventory
- public/profile.jpg: 1192 × 2120; optimized profile.webp generated.
- public/projects/careerlink.png: 1917 × 907.
- public/projects/quizmaster.png: 1919 × 911.
- public/projects/uptime.png: 1117 × 613.
- public/resume.pdf: one page; unchanged.
- 21 one-page certificates; originals unchanged apart from filenames.
- WebP certificate previews generated, with sideways event scans rotated in previews only.

## Certificate renames
The folder was already public/certs, so no directory move was necessary.
Untracked originals were staged then renamed with git mv.

| Original | New filename |
| --- | --- |
| Advance Certificate ML&DS.pdf | advance-certificate-ml-ds.pdf |
| Advance Certificate P&AD.pdf | advance-certificate-p-ad.pdf |
| Build Your Own LLM Certificate.pdf | build-your-own-llm-certificate.pdf |
| Chart Deconstruction Certificate.pdf | chart-deconstruction-certificate.pdf |
| Foundation Certificate.pdf | foundation-certificate.pdf |
| Hackverse 2026 Certificate.pdf | hackverse-2026-certificate.pdf |
| HSC Certificate.pdf | hsc-certificate.pdf |
| Intro to Cloud Computing Certificate.pdf | intro-to-cloud-computing-certificate.pdf |
| Java Basic Certificate.pdf | java-basic-certificate.pdf |
| Ropewalker Digital Certificate.pdf | ropewalker-digital-certificate.pdf |
| SDE Intern Certificate.pdf | sde-intern-certificate.pdf |
| Spark 2025 Certificate.pdf | spark-2025-certificate.pdf |
| SQL Advanced Certificate.pdf | sql-advanced-certificate.pdf |
| SQL Basic Certificate.pdf | sql-basic-certificate.pdf |
| SQL Intermediate Certificate.pdf | sql-intermediate-certificate.pdf |
| SSC Certificate.pdf | ssc-certificate.pdf |
| Sunhacks Certificate.pdf | sunhacks-certificate.pdf |
| Techfusion 2025 Certificate 1.pdf | techfusion-2025-certificate-1.pdf |
| Techfusion 2025 Certificate 2.pdf | techfusion-2025-certificate-2.pdf |
| Technofest 2026 Certificate.pdf | technofest-2026-certificate.pdf |
| Testing Big Data And Applications Certificate.pdf | testing-big-data-and-applications-certificate.pdf |
