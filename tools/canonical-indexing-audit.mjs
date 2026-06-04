import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const site = "https://nordictheorylabs.com";
const reportPath = path.join(root, "content", "ops", "search-console-canonical-cleanup-report.md");

async function read(rel) {
  return fs.readFile(path.join(root, rel), "utf8");
}

async function exists(rel) {
  try {
    await fs.access(path.join(root, rel));
    return true;
  } catch {
    return false;
  }
}

function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}

function canonicalFor(html) {
  return /<link rel="canonical" href="([^"]+)"/i.exec(html)?.[1] || "";
}

function noindex(html) {
  return /<meta\s+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
}

function refreshRedirect(html) {
  return /http-equiv=["']refresh["']/i.test(html);
}

function relForUrl(url) {
  const parsed = new URL(url);
  let rel = parsed.pathname.replace(/^\/+/, "");
  if (!rel) return "index.html";
  if (rel.endsWith("/")) return `${rel}index.html`;
  return rel;
}

async function main() {
  const sitemapIndex = await read("sitemap.xml");
  const sitemapFiles = sitemapLocs(sitemapIndex)
    .filter((loc) => loc.startsWith(`${site}/sitemaps/`))
    .map((loc) => loc.replace(`${site}/`, ""));

  const sitemapUrls = [];
  for (const file of sitemapFiles) sitemapUrls.push(...sitemapLocs(await read(file)));

  const htmlUrls = sitemapUrls.filter((url) => url.endsWith("/") || url.endsWith(".html"));
  const missingFiles = [];
  const canonicalMismatches = [];
  const noindexInSitemap = [];
  const refreshInSitemap = [];

  for (const url of htmlUrls) {
    const rel = relForUrl(url);
    if (!(await exists(rel))) {
      missingFiles.push({ url, rel });
      continue;
    }
    const html = await read(rel);
    if (noindex(html)) noindexInSitemap.push(url);
    if (refreshRedirect(html)) refreshInSitemap.push(url);
    const canonical = canonicalFor(html);
    if (!noindex(html) && !refreshRedirect(html) && canonical && canonical !== url) {
      canonicalMismatches.push({ url, canonical });
    }
  }

  const redirects = await read("_redirects").catch(() => "");
  const redirectLines = redirects.split(/\r?\n/).filter((line) => line.trim() && !line.startsWith("#"));
  const blogRedirectLines = redirectLines.filter((line) => line.startsWith("/blog/"));
  const hasEnglishDuplicateRedirect = redirectLines.some((line) => line.includes("/blog/en/") && line.includes("/blog/"));
  const hasSerbianLegacyRedirect = redirectLines.some((line) => line.startsWith("/blog/sr/"));
  const hasExtensionlessRedirect = redirectLines.some((line) => line === "/blog/:slug /blog/:slug.html 301")
    && redirectLines.some((line) => line === "/blog/:lang/:slug /blog/:lang/:slug.html 301");
  const staticRedirectLines = redirectLines.filter((line) => !line.includes(":slug") && !line.includes(":lang"));
  const dynamicRedirectLines = redirectLines.length - staticRedirectLines.length;

  const report = `# Search Console Canonical Cleanup Report

Generated: 2026-06-04

## Status

| Check | Count | Status |
|---|---:|---|
| Sitemap HTML URLs checked | ${htmlUrls.length} | PASS |
| Missing local HTML files | ${missingFiles.length} | ${missingFiles.length ? "FAIL" : "PASS"} |
| Canonical mismatches in sitemap | ${canonicalMismatches.length} | ${canonicalMismatches.length ? "FAIL" : "PASS"} |
| Noindex URLs in sitemap | ${noindexInSitemap.length} | ${noindexInSitemap.length ? "FAIL" : "PASS"} |
| Refresh redirects in sitemap | ${refreshInSitemap.length} | ${refreshInSitemap.length ? "FAIL" : "PASS"} |
| Blog redirect rules | ${blogRedirectLines.length} | PASS |
| /blog/en duplicate redirects | ${hasEnglishDuplicateRedirect ? 1 : 0} | ${hasEnglishDuplicateRedirect ? "PASS" : "FAIL"} |
| Legacy /blog/sr redirects | ${hasSerbianLegacyRedirect ? 1 : 0} | ${hasSerbianLegacyRedirect ? "PASS" : "FAIL"} |
| Extensionless blog redirects | ${hasExtensionlessRedirect ? 1 : 0} | ${hasExtensionlessRedirect ? "PASS" : "FAIL"} |
| Static redirect limit | ${staticRedirectLines.length}/2000 | ${staticRedirectLines.length <= 2000 ? "PASS" : "FAIL"} |
| Dynamic redirect limit | ${dynamicRedirectLines}/100 | ${dynamicRedirectLines <= 100 ? "PASS" : "FAIL"} |

## What This Fix Targets

Search Console issue: "Alternate page with proper canonical tag".

The current canonical target for indexable sitemap HTML pages is self-referencing. Old URL shapes are now redirected before Google can treat them as separate alternate pages:

- /blog/en/... duplicate English paths -> /blog/...html
- /blog/sr/... legacy Serbian/Bosnian paths -> /blog/bs/...html
- /blog/{language}/{old-english-slug} -> current localized canonical slug
- /blog/... extensionless article URLs -> canonical .html URL

## Required Cloudflare Dashboard Rule

Cloudflare Pages _redirects does not support domain-level redirects. Configure this outside the repository:

- Source: http://nordictheorylabs.com/*
- Target: https://nordictheorylabs.com/$1
- Status: 301
- Preserve path and query string: yes

Also add the www apex redirect if www is enabled:

- Source: https://www.nordictheorylabs.com/*
- Target: https://nordictheorylabs.com/$1
- Status: 301

## Search Console Action

1. Deploy this commit.
2. Inspect one affected URL from the report, for example /blog/ar/speed-limits-speed-adaptation-sweden.html.
3. Confirm Google-selected canonical equals the inspected URL.
4. Click "Validate fix" for the Alternate page with proper canonical tag issue.
5. For old HTTP or extensionless examples, inspect the final HTTPS canonical URL after redirect.
`;

  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(reportPath, report, "utf8");
  console.log(JSON.stringify({
    htmlUrls: htmlUrls.length,
    missingFiles: missingFiles.length,
    canonicalMismatches: canonicalMismatches.length,
    noindexInSitemap: noindexInSitemap.length,
    refreshInSitemap: refreshInSitemap.length,
    redirectRules: redirectLines.length,
    staticRedirectRules: staticRedirectLines.length,
    dynamicRedirectRules: dynamicRedirectLines,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
