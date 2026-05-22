# Indexing Strategy

Generated: 2026-05-22

## Google

- Submit `https://nordictheorylabs.com/sitemap.xml` once in Google Search Console.
- Google's old sitemap ping endpoint is not used because it is deprecated and returns no useful recrawl signal.
- Fresh URLs are surfaced in `https://nordictheorylabs.com/latest-content/` and `https://nordictheorylabs.com/sitemaps/sitemap-recent.xml`.
- Every changed page has canonical, lastmod, internal links and updated-page tracking.

## IndexNow

- Key file: `https://nordictheorylabs.com/8f2a7c5d1e9b4a63b7c0d2e5f8a9b1c4d6e7f0a2b3c5d8e1f4a6b9c2d5e8f1a4.txt`
- Submit changed URLs with `node tools/indexnow-submit.mjs --submit`.
- Dry run: `node tools/indexnow-submit.mjs`
- Source list: `content/seo/updated-pages.json`

## Recrawl Triggers

- Update sitemap index lastmod.
- Add changed pages to recent sitemap.
- Link changed pages from /latest-content/.
- Add contextual links from related pages.
