import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteUrl = "https://nordictheorylabs.com";
const lastmod = "2026-05-22";

const excluded = new Set([
  "404.html",
  "subpages-overview.html",
]);

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === ".vs" || entry.name === "node_modules" || entry.name === "content") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

function toPosix(relativePath) {
  return relativePath.split(path.sep).join("/");
}

function pageUrl(relativePath) {
  if (relativePath === "index.html") return `${siteUrl}/`;
  if (relativePath.endsWith("/index.html")) return `${siteUrl}/${relativePath.slice(0, -"index.html".length)}`;
  return `${siteUrl}/${relativePath}`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function metaFor(relativePath) {
  if (relativePath === "index.html") return { changefreq: "weekly", priority: "1.0" };
  if (relativePath === "apps/korkort-hero/index.html") return { changefreq: "weekly", priority: "0.9" };
  if (relativePath === "blog/index.html") return { changefreq: "weekly", priority: "0.8" };
  if (relativePath.startsWith("blog/") && relativePath.endsWith("/index.html")) return { changefreq: "weekly", priority: "0.7" };
  if (relativePath.startsWith("blog/")) return { changefreq: "monthly", priority: "0.7" };
  if (relativePath.startsWith("privacy/") || relativePath.startsWith("terms/")) return { changefreq: "yearly", priority: "0.3" };
  if (relativePath === "about.html") return { changefreq: "monthly", priority: "0.7" };
  if (relativePath === "contact.html" || relativePath === "changelog.html") return { changefreq: "monthly", priority: "0.6" };
  return { changefreq: "monthly", priority: "0.5" };
}

async function shouldInclude(relativePath) {
  if (excluded.has(relativePath)) return false;
  if (relativePath.startsWith("blog/en/")) return false;
  const html = await fs.readFile(path.join(root, relativePath), "utf8");
  if (/http-equiv=["']refresh["']/i.test(html)) return false;
  if (/<meta\s+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) return false;
  return true;
}

const htmlFiles = await walk(root);
const relativePaths = [];

for (const file of htmlFiles) {
  const relativePath = toPosix(path.relative(root, file));
  if (await shouldInclude(relativePath)) relativePaths.push(relativePath);
}

const urls = relativePaths
  .sort((a, b) => pageUrl(a).localeCompare(pageUrl(b), "en"))
  .map((relativePath) => {
    const { changefreq, priority } = metaFor(relativePath);
    return `  <url>
    <loc>${escapeXml(pageUrl(relativePath))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

await fs.writeFile(path.join(root, "sitemap.xml"), sitemap, "utf8");
console.log(`Built sitemap with ${urls.length} URLs.`);
