// Spouští se po `vite build`: vyrenderuje stránky do statického HTML, aby vyhledávače
// (hlavně Seznam) dostaly hotový obsah a každá stránka měla vlastní titulek, popis a canonical.
import { build } from "vite";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const ssrOut = path.join(root, "dist-ssr");

await build({
  logLevel: "warn",
  build: { ssr: "src/entry-server.tsx", outDir: ssrOut, emptyOutDir: true, copyPublicDir: false },
});

const { render, pages, headTags, openItems } = await import(pathToFileURL(path.join(ssrOut, "entry-server.js")).href);
// Nehotové právní texty se nesmí dostat na web. Pro lokální náhled: ALLOW_DRAFT=1 npm run build
if (openItems.length && !process.env.ALLOW_DRAFT) {
  await fs.rm(ssrOut, { recursive: true, force: true });
  throw new Error(`V src/data/legal.ts zbývá potvrdit:\n- ${openItems.join("\n- ")}`);
}

const template = await fs.readFile(path.join(dist, "index.html"), "utf8");

for (const page of pages) {
  const appHtml = render(page.path);
  const html = template
    .replace(/<title>[\s\S]*?<\/title>\s*/, "")
    .replace(/<meta name="description"[^>]*>\s*/, "")
    .replace(/<link rel="canonical"[^>]*>\s*/, "")
    .replace("</head>", `  ${headTags(page)}\n  </head>`)
    // email_off: Cloudflare jinak přepíše e-maily na „[email protected]“ a HTML nesedí s tím, co čeká React
    .replace('<div id="root"></div>', () => `<!--email_off--><div id="root">${appHtml}</div><!--/email_off-->`);
  if (!html.includes(appHtml)) throw new Error(`Prerender: chybí #root v šabloně (${page.path})`);
  await fs.writeFile(path.join(dist, page.file), html);
  console.log(`prerender: ${page.path} → dist/${page.file} (${Math.round(html.length / 1024)} kB)`);
}

await fs.rm(ssrOut, { recursive: true, force: true });
