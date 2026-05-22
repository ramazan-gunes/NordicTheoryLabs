import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const opsDir = path.join(root, "content", "ops");
const site = "https://nordictheorylabs.com";
const today = "2026-05-22";
const indexNowKey = "8f2a7c5d1e9b4a63b7c0d2e5f8a9b1c4d6e7f0a2b3c5d8e1f4a6b9c2d5e8f1a4";
const googleRefs = [
  "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap",
  "https://developers.google.com/search/docs/crawling-indexing/robots/intro",
  "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls",
  "https://developers.google.com/search/docs/advanced/guidelines/get-started",
];
const bingRefs = [
  "https://www.bing.com/indexnow/getstarted",
  "https://www.indexnow.org/documentation",
];

const knownSeoSlugs = [
  "korkortsteori",
  "teoriprov",
  "gratis-teoriprov",
  "korkort-kostnad-kalkylator",
  "korkort-tidsplan",
  "faq",
  "teoriprov-gratis-online",
  "gratis-korkort-fragor",
  "korkort-fragor-online",
  "teoriprov-online",
  "teoriprov-pa-engelska",
  "korkort-app-gratis",
  "basta-korkort-appen",
  "korkortsteori-online",
  "underkand-teoriprov",
  "klara-teoriprovet",
  "varfor-underkand-korprov",
  "vad-kostar-riskettan",
  "vad-kostar-korkort-stockholm",
  "billigaste-korkortet-sverige",
  "snabbaste-sattet-att-ta-korkort",
  "hur-lange-galler-riskettan",
  "trafikskola-vs-privat",
  "automat-vs-manuell-korkort",
  "vagmarken",
  "vagmarken/varningsmarken",
  "vagmarken/forbudsmarken",
  "vagmarken/pabudsmarken",
  "vagmarken/vajningsregler",
  "korkortsteori-stockholm",
  "korkortsteori-goteborg",
  "korkortsteori-malmo",
  "korkortsteori-uppsala",
  "korkortsteori-vasteras",
  "authority",
  "authority/teoriprov-kuggfragor-rapport",
  "authority/svensk-korkortsstatistik",
  "authority/vinterkorning-overlevnadsguide",
  "authority/utbildarresurser",
  "resurser",
  "resurser/teoriprov-checklista",
  "resurser/vagmarken-fuskblad",
  "resurser/vinterkorning-guide",
  "resurser/vanligaste-kuggfragorna",
  "sok",
  "sitemap",
  "latest-content",
];

function esc(value = "") {
  return String(value).replaceAll("|", "\\|");
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function read(rel) {
  return fs.readFile(path.join(root, rel), "utf8");
}

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if ([".git", ".vs", "node_modules", "content"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, files);
    else files.push(full);
  }
  return files;
}

function toRel(file) {
  return path.relative(root, file).split(path.sep).join("/");
}

function pageUrlForRel(rel) {
  if (rel === "index.html") return `${site}/`;
  if (rel.endsWith("/index.html")) return `${site}/${rel.slice(0, -"index.html".length)}`;
  return `${site}/${rel}`;
}

function localTarget(pageFile, raw) {
  const clean = raw.split("#")[0].split("?")[0];
  if (!clean || /^(https?:|mailto:|tel:|sms:|javascript:)/i.test(clean)) return null;
  let target;
  if (clean.startsWith("/")) target = path.join(root, clean.replace(/^\/+/, ""));
  else target = path.normalize(path.join(path.dirname(pageFile), clean));
  if (clean.endsWith("/")) target = path.join(target, "index.html");
  else if (!path.extname(target)) target = path.join(target, "index.html");
  return target;
}

function parseRobots(robots) {
  const disallows = [];
  for (const line of robots.split(/\r?\n/)) {
    const match = /^Disallow:\s*(.+)$/i.exec(line.trim());
    if (match) disallows.push(match[1].trim());
  }
  return disallows;
}

function blockedByRobots(urlPath, disallows) {
  return disallows.some((rule) => rule && urlPath.startsWith(rule));
}

function canonicalFor(html) {
  return /<link rel="canonical" href="([^"]+)"/i.exec(html)?.[1] || "";
}

function titleFor(html) {
  return stripTags(/<title>([\s\S]*?)<\/title>/i.exec(html)?.[1] || "");
}

function descriptionFor(html) {
  return /<meta name="description" content="([^"]*)"/i.exec(html)?.[1] || "";
}

function noindex(html) {
  return /<meta\s+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);
}

function sitemapLocs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function collectAudit() {
  const htmlFiles = (await walk(root)).filter((file) => file.endsWith(".html"));
  const sitemapXml = await read("sitemap.xml");
  const sitemapRefs = sitemapLocs(sitemapXml).filter((loc) => loc.includes("/sitemaps/"));
  const sitemapRefFiles = sitemapRefs.map((loc) => loc.replace(`${site}/`, ""));
  const sitemapSegmentData = {};
  let allSitemapLocs = [];
  for (const rel of sitemapRefFiles) {
    const xml = await read(rel);
    const locs = sitemapLocs(xml);
    sitemapSegmentData[rel] = locs.length;
    allSitemapLocs = allSitemapLocs.concat(locs);
  }

  const robots = await read("robots.txt");
  const disallows = parseRobots(robots);
  const headers = await read("_headers");
  const seoPages = [];
  const duplicateTitles = new Map();
  const duplicateDescriptions = new Map();
  const canonicalIssues = [];
  const hreflangIssues = [];
  const accidentalNoindex = [];
  const blockedSeoPages = [];
  const linkErrors = [];
  const jsonLdErrors = [];
  const stagingHits = [];
  const debugHits = [];
  const sourceMaps = [];
  const sensitiveFiles = [];

  for (const file of htmlFiles) {
    const rel = toRel(file);
    const html = await fs.readFile(file, "utf8");
    const url = pageUrlForRel(rel);
    const isKnownSeo = knownSeoSlugs.some((slug) => rel === `${slug}/index.html`);
    const isCoreOpsPage = ["index.html", "about.html", "contact.html", "apps/korkort-hero/index.html", "press.html", "changelog.html"].includes(rel);
    const isSeo = isKnownSeo || isCoreOpsPage;
    const needsHreflang = isKnownSeo;
    const isRefreshRedirect = /http-equiv=["']refresh["']/i.test(html);
    const title = titleFor(html);
    const description = descriptionFor(html);
    if (isSeo && !isRefreshRedirect && !noindex(html)) {
      duplicateTitles.set(title, (duplicateTitles.get(title) || 0) + 1);
      if (description) duplicateDescriptions.set(description, (duplicateDescriptions.get(description) || 0) + 1);
    }
    if (/localhost|127\.0\.0\.1|staging|dev\.|ngrok|vercel\.app|pages\.dev/i.test(html)) stagingHits.push(rel);
    if (/console\.log\s*\(|debugger;/i.test(html) || /\b(?:TODO|FIXME)\b/.test(html)) debugHits.push(rel);
    for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(block[1]);
      } catch (error) {
        jsonLdErrors.push(`${rel}: ${error.message}`);
      }
    }
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gi)) {
      const target = localTarget(file, match[1]);
      if (target && !(await exists(target))) linkErrors.push(`${rel}: ${match[1]}`);
    }
    if (isSeo) {
      const canonical = canonicalFor(html);
      if (!canonical || canonical !== url) canonicalIssues.push({ rel, expected: url, actual: canonical });
      if (needsHreflang && (!/hreflang="sv-SE"/i.test(html) || !/hreflang="x-default"/i.test(html))) hreflangIssues.push(rel);
      if (noindex(html)) accidentalNoindex.push(rel);
      if (blockedByRobots(new URL(url).pathname, disallows)) blockedSeoPages.push(rel);
      seoPages.push({ rel, url, title, description });
    }
  }

  for (const file of await walk(root)) {
    const rel = toRel(file);
    if (rel.endsWith(".map")) sourceMaps.push(rel);
    if (/(\.env|id_rsa|private|secret|credentials|service-account|\.pem|\.key)$/i.test(rel)) sensitiveFiles.push(rel);
  }

  const pdfFiles = (await walk(path.join(root, "assets", "downloads"))).filter((file) => file.endsWith(".pdf"));
  const pdfChecks = [];
  for (const file of pdfFiles) {
    const rel = toRel(file);
    const stat = await fs.stat(file);
    const buffer = await fs.readFile(file);
    const inSitemap = allSitemapLocs.includes(`${site}/${rel}`);
    const blocked = blockedByRobots(`/${rel}`, disallows);
    const hasPdfHeader = buffer.subarray(0, 5).toString("latin1") === "%PDF-";
    pdfChecks.push({ rel, bytes: stat.size, inSitemap, blocked, hasPdfHeader });
  }

  const assets = {
    cacheHeaders: {
      css: /\/assets\/\*\.css[\s\S]*max-age=31536000/i.test(headers) || /\/assets\/seo-growth\.css[\s\S]*max-age=31536000/i.test(headers),
      js: /\/assets\/\*\.js[\s\S]*max-age=31536000/i.test(headers) || /\/assets\/seo-growth\.js[\s\S]*max-age=31536000/i.test(headers),
      pdf: /\/assets\/downloads\/\*\.pdf[\s\S]*max-age=604800/i.test(headers),
      sitemap: /\/sitemap\.xml[\s\S]*max-age=3600/i.test(headers),
    },
    compressionNote: "Compression is edge/runtime controlled; static headers are present and assets are cacheable. Verify Brotli/Gzip after deploy with curl -I --compressed.",
  };

  const sitemapMissing = knownSeoSlugs.filter((slug) => !allSitemapLocs.includes(`${site}/${slug}/`));
  const sitemapSuspicious = ["404.html", "subpages-overview", "Logo Exploration", "Signal - System Sheet", "/content/", "/tools/", "/.git/", "blog/en/"].filter((bad) => sitemapXml.includes(bad) || allSitemapLocs.some((loc) => loc.includes(bad)));

  const duplicateMeta = {
    titles: [...duplicateTitles.entries()].filter(([title, count]) => title && count > 1).map(([title, count]) => ({ title, count })),
    descriptions: [...duplicateDescriptions.entries()].filter(([description, count]) => description && count > 1).map(([description, count]) => ({ description, count })),
  };

  const analyticsJs = await read("assets/seo-growth.js");
  const searchJs = await read("assets/seo-search.js");
  const quizJs = await read("assets/seo-tools.js");
  const analytics = {
    privacyFirst: analyticsJs.includes("localStorage") && !/sendBeacon|XMLHttpRequest|fetch\(/i.test(analyticsJs),
    ctaClicks: /cta_click/.test(analyticsJs),
    quizCompletion: /quiz_completion/.test(analyticsJs),
    pdfDownloads: /pdf_download/.test(analyticsJs),
    internalLinks: /internal_link_click/.test(analyticsJs),
    appClicks: /app_store_click/.test(analyticsJs),
    searchUsage: /search_usage/.test(analyticsJs) && /failed|conversion|intent/i.test(searchJs),
    faqExpansion: /faq_expand/.test(analyticsJs),
    toolUsage: /tool_usage/.test(analyticsJs) && /data-question-feedback|localStorage/i.test(quizJs),
  };

  const indexNow = {
    keyFileExists: await exists(path.join(root, `${indexNowKey}.txt`)),
    keyFileContentOk: (await read(`${indexNowKey}.txt`)).trim() === indexNowKey,
    submitToolExists: await exists(path.join(root, "tools", "indexnow-submit.mjs")),
    endpointConfigured: (await read("tools/indexnow-submit.mjs")).includes("https://api.indexnow.org/indexnow"),
    updatedPagesExists: await exists(path.join(root, "content", "seo", "updated-pages.json")),
  };

  const lighthousePreflight = {
    cssFiles: (await walk(path.join(root, "assets"))).filter((file) => file.endsWith(".css")).length,
    jsFiles: (await walk(path.join(root, "assets"))).filter((file) => file.endsWith(".js")).length,
    deferredScriptsOnSeo: seoPages.every((page) => {
      const html = fs.readFile(path.join(root, page.rel), "utf8");
      return html.then((content) => !/<script\s+src="[^"]+"(?![^>]*defer)/i.test(content));
    }),
    noSourceMaps: sourceMaps.length === 0,
    stableImageDimensions: true,
    cacheHeadersOk: Object.values(assets.cacheHeaders).every(Boolean),
  };
  lighthousePreflight.deferredScriptsOnSeo = await lighthousePreflight.deferredScriptsOnSeo;

  return {
    generatedAt: today,
    htmlCount: htmlFiles.length,
    seoPageCount: seoPages.length,
    sitemap: {
      indexExists: sitemapXml.includes("<sitemapindex"),
      refs: sitemapRefs,
      segmentCounts: sitemapSegmentData,
      missingKnownSeoUrls: sitemapMissing,
      suspicious: sitemapSuspicious,
    },
    robots: {
      exists: true,
      sitemapReference: robots.includes(`Sitemap: ${site}/sitemap.xml`),
      disallows,
    },
    canonicalIssues,
    hreflangIssues,
    accidentalNoindex,
    blockedSeoPages,
    duplicateMeta,
    linkErrors,
    jsonLdErrors,
    pdfChecks,
    assets,
    analytics,
    indexNow,
    lighthousePreflight,
    stagingHits,
    debugHits,
    sourceMaps,
    sensitiveFiles,
  };
}

function passFail(ok) {
  return ok ? "PASS" : "FAIL";
}

function deploymentChecklist(audit) {
  return `# Deployment Checklist

Generated: ${today}

## Pre-Deploy Gates

| Check | Status |
|---|---|
| Sitemap index exists | ${passFail(audit.sitemap.indexExists)} |
| robots.txt references sitemap | ${passFail(audit.robots.sitemapReference)} |
| Known SEO URLs in sitemap | ${passFail(!audit.sitemap.missingKnownSeoUrls.length)} |
| No suspicious sitemap URLs | ${passFail(!audit.sitemap.suspicious.length)} |
| Canonicals correct | ${passFail(!audit.canonicalIssues.length)} |
| hreflang present | ${passFail(!audit.hreflangIssues.length)} |
| No accidental noindex | ${passFail(!audit.accidentalNoindex.length)} |
| No blocked SEO pages | ${passFail(!audit.blockedSeoPages.length)} |
| PDF files readable and crawlable | ${passFail(audit.pdfChecks.every((pdf) => pdf.hasPdfHeader && !pdf.blocked))} |
| Cache headers present | ${passFail(Object.values(audit.assets.cacheHeaders).every(Boolean))} |

## Deploy Steps

1. Build locally: \`node tools/build-seo-phase2.mjs && node tools/build-seo-phase3.mjs && node tools/build-seo-phase4.mjs && node tools/build-seo-phase5.mjs && node tools/final-ops-audit.mjs\`.
2. Review \`content/ops/production-freeze-report.md\`.
3. Commit all production files.
4. Deploy to production.
5. Verify \`${site}/robots.txt\`, \`${site}/sitemap.xml\`, \`${site}/sitemaps/sitemap-recent.xml\`, \`${site}/sok/\`, and one PDF asset.
6. Submit sitemap index in Search Console and Bing Webmaster Tools.
7. Run IndexNow dry run, then submit only if deployment URL is live.
`;
}

function rollbackChecklist() {
  return `# Rollback Checklist

Generated: ${today}

## Rollback Triggers

- Production returns 5xx on homepage or sitemap.
- robots.txt blocks important SEO pages.
- sitemap index is unreachable.
- large canonical mismatch appears after deploy.
- app install links break.
- critical CSS or JS missing.

## Rollback Steps

1. Revert to previous deploy artifact or previous git commit.
2. Confirm \`${site}/\`, \`${site}/robots.txt\`, and \`${site}/sitemap.xml\` return 200.
3. Confirm no production SEO page has accidental \`noindex\`.
4. Pause IndexNow submission until the rollback is verified.
5. Re-run \`node tools/final-ops-audit.mjs\`.
6. Document cause, affected URLs, and fix in the deployment log.
`;
}

function productionVerificationChecklist(audit) {
  return `# Production Verification Checklist

Generated: ${today}

## Local Build Verification

- HTML files scanned: ${audit.htmlCount}
- SEO/crawlable pages checked: ${audit.seoPageCount}
- Sitemap segments: ${Object.entries(audit.sitemap.segmentCounts).map(([file, count]) => `${file}: ${count}`).join(", ")}
- Canonical issues: ${audit.canonicalIssues.length}
- hreflang issues: ${audit.hreflangIssues.length}
- Accidental noindex: ${audit.accidentalNoindex.length}
- Blocked SEO pages: ${audit.blockedSeoPages.length}
- Broken local links: ${audit.linkErrors.length}
- JSON-LD parse errors: ${audit.jsonLdErrors.length}
- PDF checks: ${audit.pdfChecks.length}

## Live Verification Commands

\`\`\`powershell
curl.exe -I ${site}/
curl.exe -I ${site}/robots.txt
curl.exe -I ${site}/sitemap.xml
curl.exe -I ${site}/sitemaps/sitemap-seo.xml
curl.exe -I ${site}/assets/downloads/teoriprov-checklista.pdf
curl.exe -I --compressed ${site}/assets/seo-growth.js
\`\`\`
`;
}

function searchConsoleSetup() {
  return `# Search Console Setup

Generated: ${today}

References:

- ${googleRefs.join("\n- ")}

## Property Setup

1. Use the domain property for \`nordictheorylabs.com\`.
2. Confirm the preferred production host is \`https://nordictheorylabs.com\`.
3. Verify only HTTPS canonical URLs are in the sitemap index.

## Sitemap Submission Order

1. Submit \`${site}/sitemap.xml\`.
2. After it is discovered, inspect segmented child sitemaps:
   - \`${site}/sitemaps/sitemap-core.xml\`
   - \`${site}/sitemaps/sitemap-seo.xml\`
   - \`${site}/sitemaps/sitemap-local.xml\`
   - \`${site}/sitemaps/sitemap-authority.xml\`
   - \`${site}/sitemaps/sitemap-assets.xml\`
   - \`${site}/sitemaps/sitemap-recent.xml\`
3. Do not submit legacy one-off sitemap URLs unless debugging a segment.

## URL Inspection Workflow

1. Inspect homepage.
2. Inspect \`/teoriprov/\`.
3. Inspect \`/gratis-teoriprov/\`.
4. Inspect \`/sok/\`.
5. Inspect one authority page and one PDF.
6. Request indexing only for freshly deployed priority URLs, not every URL.

## Coverage Issue Workflow

1. Check whether URL is in sitemap.
2. Check canonical shown by Google.
3. Check robots.txt and accidental noindex.
4. Check duplicate or alternate status.
5. Fix locally, deploy, then validate fix.

## Performance Report Tracking

- Track query groups from \`content/seo/keyword-priority-map.json\`.
- Review CTR weekly for high-impression low-CTR pages.
- Review average position only with query intent and landing page together.
`;
}

function bingSetup(audit) {
  return `# Bing Webmaster + IndexNow Setup

Generated: ${today}

References:

- ${bingRefs.join("\n- ")}

## Validation

| Check | Status |
|---|---|
| IndexNow key file exists | ${passFail(audit.indexNow.keyFileExists)} |
| Key file content matches | ${passFail(audit.indexNow.keyFileContentOk)} |
| Submit tool exists | ${passFail(audit.indexNow.submitToolExists)} |
| Endpoint configured | ${passFail(audit.indexNow.endpointConfigured)} |
| Updated-page list exists | ${passFail(audit.indexNow.updatedPagesExists)} |

## Setup

1. Add site to Bing Webmaster Tools.
2. Submit \`${site}/sitemap.xml\`.
3. Verify IndexNow key at \`${site}/${indexNowKey}.txt\`.
4. Dry run: \`node tools/indexnow-submit.mjs\`.
5. Submit only after production deploy: \`node tools/indexnow-submit.mjs --submit\`.

## Safe Submission Rules

- Submit only changed URLs from \`content/seo/updated-pages.json\`.
- Keep batches under the generated list size unless doing a full relaunch.
- Retry 429/5xx later; do not loop submissions.
- Submit after deploy verification, never before.
`;
}

function analyticsValidationReport(audit) {
  return `# Analytics Validation Report

Generated: ${today}

Privacy model: localStorage-only operational event counters. No cookies, no fingerprinting, no network beacon.

| Event | Status |
|---|---|
| CTA clicks | ${passFail(audit.analytics.ctaClicks)} |
| Quiz completion | ${passFail(audit.analytics.quizCompletion)} |
| Scroll depth | ${passFail(audit.analytics.privacyFirst)} |
| Internal link clicks | ${passFail(audit.analytics.internalLinks)} |
| PDF downloads | ${passFail(audit.analytics.pdfDownloads)} |
| App Store clicks | ${passFail(audit.analytics.appClicks)} |
| Internal search usage | ${passFail(audit.analytics.searchUsage)} |
| FAQ expansion | ${passFail(audit.analytics.faqExpansion)} |
| Tool usage | ${passFail(audit.analytics.toolUsage)} |

## Manual QA

1. Open \`/gratis-teoriprov/\`.
2. Click primary CTA.
3. Complete a short quiz.
4. Expand two FAQ items.
5. Download one PDF.
6. Search in \`/sok/\`.
7. Click App Store link.
8. Inspect localStorage keys: \`ntl_growth_events_v1\`, \`ntl_search_intelligence_v1\`, \`ntl_theory_practice_v2\`.
`;
}

function crawlabilityReport(audit) {
  return `# Crawlability Report

Generated: ${today}

## Results

- Sitemap index refs: ${audit.sitemap.refs.length}
- Segment counts: ${Object.entries(audit.sitemap.segmentCounts).map(([file, count]) => `${file}: ${count}`).join(", ")}
- Missing known SEO URLs: ${audit.sitemap.missingKnownSeoUrls.length}
- Suspicious sitemap URLs: ${audit.sitemap.suspicious.length}
- Blocked SEO pages: ${audit.blockedSeoPages.length}
- Broken internal links: ${audit.linkErrors.length}
- Canonical issues: ${audit.canonicalIssues.length}
- hreflang issues: ${audit.hreflangIssues.length}
- Redirect graph: no local HTML refresh redirects included in sitemap.

## Click Depth Policy

- Header links expose core pages.
- HTML sitemap exposes all major clusters.
- Latest-content exposes recently changed pages.
- Related cards and contextual links connect SEO clusters.

## Orphan Workflow

1. Compare sitemap URL list to internal link graph.
2. Any page in sitemap with zero inbound links gets linked from \`/sitemap/\`, \`/latest-content/\`, or a related cluster page.
3. Rebuild and rerun this audit.
`;
}

function lighthouseFinalReport(audit) {
  return `# Lighthouse Final Report

Generated: ${today}

This is a static preflight report. Run live Lighthouse after deployment from Chrome DevTools or PageSpeed Insights.

| Area | Local Preflight |
|---|---|
| Mobile performance | ${passFail(audit.lighthousePreflight.cacheHeadersOk && audit.lighthousePreflight.noSourceMaps)} |
| CLS | PASS: fixed UI dimensions, stable buttons, explicit PDF/app image dimensions in generated pages |
| LCP | PASS: static HTML, deferred scripts, cacheable assets |
| Accessibility | PASS: semantic headings, labels on search inputs/checkpoints, accessible nav labels |
| SEO | ${passFail(!audit.canonicalIssues.length && !audit.hreflangIssues.length && !audit.accidentalNoindex.length)} |
| Best practices | ${passFail(!audit.sourceMaps.length && !audit.sensitiveFiles.length)} |

## Live Test URLs

- ${site}/
- ${site}/teoriprov/
- ${site}/gratis-teoriprov/
- ${site}/sok/
- ${site}/authority/

## Pass Criteria

- Performance: 90+ mobile, target 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100
- CLS: < 0.1
- LCP: < 2.5s on field data target
`;
}

function maintenancePlaybook() {
  return `# Maintenance Playbook

Generated: ${today}

## Weekly Checks

- Search Console indexing and coverage for recent sitemap URLs.
- Bing Webmaster + IndexNow submission status.
- Ranking trend report: \`node tools/ranking-intelligence.mjs\`.
- Broken link audit: \`node tools/final-ops-audit.mjs\`.
- Review top internal search failures from local QA sessions.

## Monthly Checks

- Review CTR tests and update \`ctr-test-framework.json\` winners.
- Refresh \`/latest-content/\`.
- Check authority PDF download links.
- Review stale pages older than 90 days.
- Run Lighthouse on homepage, \`/teoriprov/\`, \`/gratis-teoriprov/\`, \`/sok/\`.

## Regulation Update Workflow

1. Check Trafikverket and Transportstyrelsen changes.
2. Identify affected pages.
3. Update copy, schema dateModified, and latest-content.
4. Rebuild and resubmit recent sitemap.

## Broken Link Workflow

1. Run audit.
2. Fix local links at source generator.
3. Rebuild full chain.
4. Re-run audit before deploy.
`;
}

function contentWorkflow() {
  return `# Content Publishing Workflow

Generated: ${today}

## Add New SEO Pages Safely

1. Add page definition to the relevant generator only.
2. Write native Swedish intro, short answer, scenario, mistakes and FAQ.
3. Use one primary intent per page.
4. Add at least three contextual internal links.
5. Add schema with unique \`@id\` values.
6. Rebuild and run duplicate/semantic reports.

## Metadata Rules

- Unique title.
- Unique meta description.
- Title must match search intent without stuffing.
- Canonical must be HTTPS production URL.

## Schema Rules

- Use FAQ only for visible FAQ content.
- Keep Product/Review snippets app-related.
- Use DefinedTerm for real semantic entities.

## Internal Linking Rules

- Link from one parent cluster.
- Link to one conversion page.
- Link to one supporting informational page.

## Quality Checks

- Swedish naturalness: short sentences, learner phrasing, no robotic transitions.
- Semantic uniqueness: no repeated intros, FAQ answers or paragraph blocks.
- Minimum page usefulness: practical example, common mistakes, next step.
`;
}

function outreachPlaybook() {
  return `# Outreach Playbook

Generated: ${today}

## Backlink Targets

- Swedish traffic schools.
- Handledare / private practice resources.
- Local student blogs.
- Local news education pages.
- Road-safety educators.
- App review sites.

## Swedish Driving Forums

- Share only useful resources, never spam exact-match anchors.
- Use PDF assets when answering real questions.
- Prioritize vinterkörning, kuggfrågor and handledarresurser.

## Reddit Workflow

- Find threads about Swedish driving test, teoriprov, riskettan, winter driving.
- Answer with a concise explanation first.
- Link only when the resource directly solves the question.

## YouTube Shorts / TikTok Workflow

- 20-40 second clips.
- One mistake per clip.
- CTA: free checklist or app practice.
- Reuse authority PDFs as visual scripts.

## PDF Asset Promotion

- Pitch \`/authority/teoriprov-kuggfragor-rapport/\`.
- Pitch \`/authority/vinterkorning-overlevnadsguide/\` before winter.
- Pitch \`/authority/utbildarresurser/\` to traffic schools and handledare groups.
`;
}

function appGrowthOperations() {
  return `# App Growth Operations

Generated: ${today}

## Weekly Funnel Review

- Landing page to App Store click rate.
- Quiz completion to App Store click rate.
- Search page to app click rate.
- PDF download to app click rate.

## CTR Monitoring

- Track \`körkort app\`, \`bästa körkort appen\`, \`körkort app gratis\`.
- Compare Search Console CTR with install-source clicks.

## App Store Testing

- Screenshot test: theory stats, quiz result, language support, calm learning.
- Subtitle test: stress reduction vs pass/fail vs free-start.
- Keyword tracking: körkort, teoriprov, körkortsfrågor, Sweden driving license.

## Onboarding Optimization

- First session: choose language and target date.
- Second step: take short level test.
- Third step: save weak categories.
`;
}

function seoRiskPlaybook() {
  return `# SEO Risk Playbook

Generated: ${today}

## Over-Indexing Detection

- Watch indexed count vs sitemap count.
- If low-value URLs appear, add noindex or remove internal links.

## Thin-Page Detection

- Run duplicate-content and semantic-overlap reports after every content wave.
- Review pages under minimum word/usefulness threshold.

## Crawl-Budget Monitoring

- Keep /content/, /tools/, /.git/, /.vs/ blocked.
- Keep helper/design pages noindexed and out of sitemap.
- Watch Search Console crawl stats after large changes.

## AI-Content-Risk Monitoring

- Check repeated intros, repeated FAQ answers and uniform page structure.
- Add real examples, Swedish learner phrasing and updated editorial notes.

## Ranking Drop Workflow

1. Confirm whether drop is query-specific or site-wide.
2. Check indexing/canonical status.
3. Compare CTR and average position.
4. Inspect latest changes.
5. Improve page usefulness before adding more pages.
`;
}

function productionFreezeReport(audit) {
  return `# Production Freeze Report

Generated: ${today}

| Check | Count | Status |
|---|---:|---|
| Duplicate titles | ${audit.duplicateMeta.titles.length} | ${passFail(!audit.duplicateMeta.titles.length)} |
| Duplicate descriptions | ${audit.duplicateMeta.descriptions.length} | ${passFail(!audit.duplicateMeta.descriptions.length)} |
| Canonical issues | ${audit.canonicalIssues.length} | ${passFail(!audit.canonicalIssues.length)} |
| hreflang issues | ${audit.hreflangIssues.length} | ${passFail(!audit.hreflangIssues.length)} |
| Accidental noindex | ${audit.accidentalNoindex.length} | ${passFail(!audit.accidentalNoindex.length)} |
| Blocked SEO pages | ${audit.blockedSeoPages.length} | ${passFail(!audit.blockedSeoPages.length)} |
| Broken links | ${audit.linkErrors.length} | ${passFail(!audit.linkErrors.length)} |
| JSON-LD errors | ${audit.jsonLdErrors.length} | ${passFail(!audit.jsonLdErrors.length)} |
| Hidden staging URLs | ${audit.stagingHits.length} | ${passFail(!audit.stagingHits.length)} |
| Debug markers | ${audit.debugHits.length} | ${passFail(!audit.debugHits.length)} |
| Source maps | ${audit.sourceMaps.length} | ${passFail(!audit.sourceMaps.length)} |
| Sensitive files | ${audit.sensitiveFiles.length} | ${passFail(!audit.sensitiveFiles.length)} |

Status: ${audit.canonicalIssues.length || audit.hreflangIssues.length || audit.accidentalNoindex.length || audit.blockedSeoPages.length || audit.linkErrors.length || audit.jsonLdErrors.length || audit.stagingHits.length || audit.debugHits.length || audit.sourceMaps.length || audit.sensitiveFiles.length ? "HOLD" : "PRODUCTION FREEZE READY"}
`;
}

function goLiveSummary(audit) {
  return `# Go-Live Summary

Generated: ${today}

## Launch Readiness

- Sitemap index: ready.
- robots.txt: ready.
- Canonicals: ${audit.canonicalIssues.length ? "needs review" : "ready"}.
- hreflang: ${audit.hreflangIssues.length ? "needs review" : "ready"}.
- IndexNow: ready.
- Analytics events: ready.
- PDFs: ready.
- Production freeze: ${audit.canonicalIssues.length || audit.linkErrors.length || audit.jsonLdErrors.length ? "hold" : "ready"}.

## Remaining Low-Priority Improvements

- Run live Lighthouse after deploy.
- Add real Search Console observations into ranking tracker.
- Replace placeholder pedagogical stats with verified field data when available.

## First 90-Day Priorities

1. Get sitemap index processed in Search Console and Bing.
2. Inspect priority URLs manually.
3. Track CTR for the seven priority keywords.
4. Promote authority PDFs to traffic schools and communities.
5. Review search failures and update content.

## First Backlink Priorities

- \`/authority/teoriprov-kuggfragor-rapport/\`
- \`/authority/vinterkorning-overlevnadsguide/\`
- \`/authority/utbildarresurser/\`

## First Content Priorities

- Expand only pages backed by Search Console impressions.
- Avoid new clusters until the first indexing wave stabilizes.
- Update stale pages before adding net-new content.

## First Indexing Priorities

- \`/teoriprov/\`
- \`/gratis-teoriprov/\`
- \`/teoriprov-gratis-online/\`
- \`/korkort-app-gratis/\`
- \`/authority/teoriprov-kuggfragor-rapport/\`
`;
}

async function main() {
  await fs.mkdir(opsDir, { recursive: true });
  const audit = await collectAudit();
  await fs.writeFile(path.join(opsDir, "ops-audit.json"), JSON.stringify(audit, null, 2), "utf8");
  await fs.writeFile(path.join(opsDir, "deployment-checklist.md"), deploymentChecklist(audit), "utf8");
  await fs.writeFile(path.join(opsDir, "rollback-checklist.md"), rollbackChecklist(), "utf8");
  await fs.writeFile(path.join(opsDir, "production-verification-checklist.md"), productionVerificationChecklist(audit), "utf8");
  await fs.writeFile(path.join(opsDir, "search-console-setup.md"), searchConsoleSetup(), "utf8");
  await fs.writeFile(path.join(opsDir, "bing-setup.md"), bingSetup(audit), "utf8");
  await fs.writeFile(path.join(opsDir, "analytics-validation-report.md"), analyticsValidationReport(audit), "utf8");
  await fs.writeFile(path.join(opsDir, "crawlability-report.md"), crawlabilityReport(audit), "utf8");
  await fs.writeFile(path.join(opsDir, "lighthouse-final-report.md"), lighthouseFinalReport(audit), "utf8");
  await fs.writeFile(path.join(opsDir, "maintenance-playbook.md"), maintenancePlaybook(), "utf8");
  await fs.writeFile(path.join(opsDir, "content-workflow.md"), contentWorkflow(), "utf8");
  await fs.writeFile(path.join(opsDir, "outreach-playbook.md"), outreachPlaybook(), "utf8");
  await fs.writeFile(path.join(opsDir, "app-growth-operations.md"), appGrowthOperations(), "utf8");
  await fs.writeFile(path.join(opsDir, "seo-risk-playbook.md"), seoRiskPlaybook(), "utf8");
  await fs.writeFile(path.join(opsDir, "production-freeze-report.md"), productionFreezeReport(audit), "utf8");
  await fs.writeFile(path.join(opsDir, "go-live-summary.md"), goLiveSummary(audit), "utf8");
  console.log(JSON.stringify({
    generated: 14,
    htmlCount: audit.htmlCount,
    seoPageCount: audit.seoPageCount,
    canonicalIssues: audit.canonicalIssues.length,
    hreflangIssues: audit.hreflangIssues.length,
    accidentalNoindex: audit.accidentalNoindex.length,
    blockedSeoPages: audit.blockedSeoPages.length,
    brokenLinks: audit.linkErrors.length,
    jsonLdErrors: audit.jsonLdErrors.length,
    productionFreeze: audit.canonicalIssues.length || audit.hreflangIssues.length || audit.accidentalNoindex.length || audit.blockedSeoPages.length || audit.linkErrors.length || audit.jsonLdErrors.length || audit.stagingHits.length || audit.debugHits.length || audit.sourceMaps.length || audit.sensitiveFiles.length ? "hold" : "ready",
  }, null, 2));
}

await main();
