import { build } from "vite";
import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const baseFlag = process.argv.find((arg) => arg.startsWith("--base="));
const baseIndex = process.argv.indexOf("--base");
const base =
  baseFlag?.slice(7) ||
  (baseIndex >= 0 ? process.argv[baseIndex + 1] : undefined) ||
  process.env.VITE_BASE_PATH ||
  "/";
await build({ base });
await build({
  base,
  build: { ssr: "src/entry-server.jsx", outDir: "tmp/ssr", emptyOutDir: true },
});
const { render } = await import(
  pathToFileURL(resolve("tmp/ssr/entry-server.js")).href
);
const path = resolve("dist/index.html");
const template = await readFile(path, "utf8");
if (!template.includes('<div id="root"></div>'))
  throw new Error("Missing root for prerendering");
await writeFile(
  path,
  template.replace('<div id="root"></div>', `<div id="root">${render()}</div>`),
);
console.log(
  "Prerendered portfolio HTML for fast first paint and static indexing.",
);
