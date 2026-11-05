import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";
import { SITE_URL, person, crawlerFiles } from "./site.config.js";

// https://vite.dev/config/
export default defineConfig({
  // For GitHub project Pages: VITE_BASE_PATH=/portfolio/ (or --base=/portfolio/).
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    rolldownOptions: {
      input: { main: resolve("index.html"), notFound: resolve("404.html") },
    },
  },
  plugins: [
    react(),
    {
      name: "portfolio-metadata",
      transformIndexHtml: {
        order: "pre",
        handler: (html) => html
          .replaceAll("%SITE_URL%", SITE_URL)
          .replace("<!-- PERSON_SCHEMA -->", `<script type="application/ld+json">${JSON.stringify(person).replaceAll("<", "\\u003c")}</script>`),
      },
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const file = req.url?.split("?")[0]?.slice(1);
          if (!Object.hasOwn(crawlerFiles, file)) return next();
          res.setHeader("Content-Type", file.endsWith(".xml") ? "application/xml" : "text/plain");
          res.end(crawlerFiles[file]);
        });
      },
      generateBundle() {
        for (const [fileName, source] of Object.entries(crawlerFiles)) {
          this.emitFile({ type: "asset", fileName, source });
        }
      },
    },
  ],
});
