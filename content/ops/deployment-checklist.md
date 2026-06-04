# Deployment Checklist

Generated: 2026-05-22

## Pre-Deploy Gates

| Check | Status |
|---|---|
| Sitemap index exists | PASS |
| robots.txt references sitemap | PASS |
| Known SEO URLs in sitemap | PASS |
| No suspicious sitemap URLs | PASS |
| Canonicals correct | PASS |
| hreflang present | PASS |
| No accidental noindex | PASS |
| No blocked SEO pages | PASS |
| No guide download assets submitted | PASS |
| Cache headers present | PASS |

## Deploy Steps

1. Build locally: `node tools/build-seo-phase2.mjs && node tools/build-seo-phase3.mjs && node tools/build-seo-phase4.mjs && node tools/build-seo-phase5.mjs && node tools/final-ops-audit.mjs`.
2. Review `content/ops/production-freeze-report.md`.
3. Commit all production files.
4. Deploy to production.
5. Verify `https://nordictheorylabs.com/robots.txt`, `https://nordictheorylabs.com/sitemap.xml`, `https://nordictheorylabs.com/sitemaps/sitemap-recent.xml`, `https://nordictheorylabs.com/sok/`.
6. Submit sitemap index in Search Console and Bing Webmaster Tools.
7. Run IndexNow dry run, then submit only if deployment URL is live.
