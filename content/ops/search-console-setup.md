# Search Console Setup

Generated: 2026-05-22

References:

- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/crawling-indexing/robots/intro
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/advanced/guidelines/get-started

## Property Setup

1. Use the domain property for `nordictheorylabs.com`.
2. Confirm the preferred production host is `https://nordictheorylabs.com`.
3. Verify only HTTPS canonical URLs are in the sitemap index.

## Sitemap Submission Order

1. Submit `https://nordictheorylabs.com/sitemap.xml`.
2. After it is discovered, inspect segmented child sitemaps:
   - `https://nordictheorylabs.com/sitemaps/sitemap-core.xml`
   - `https://nordictheorylabs.com/sitemaps/sitemap-seo.xml`
   - `https://nordictheorylabs.com/sitemaps/sitemap-local.xml`
   - `https://nordictheorylabs.com/sitemaps/sitemap-authority.xml`
   - `https://nordictheorylabs.com/sitemaps/sitemap-assets.xml`
   - `https://nordictheorylabs.com/sitemaps/sitemap-recent.xml`
3. Do not submit legacy one-off sitemap URLs unless debugging a segment.

## URL Inspection Workflow

1. Inspect homepage.
2. Inspect `/teoriprov/`.
3. Inspect `/gratis-teoriprov/`.
4. Inspect `/sok/`.
5. Inspect one authority page and one PDF.
6. Request indexing only for freshly deployed priority URLs, not every URL.

## Coverage Issue Workflow

1. Check whether URL is in sitemap.
2. Check canonical shown by Google.
3. Check robots.txt and accidental noindex.
4. Check duplicate or alternate status.
5. Fix locally, deploy, then validate fix.

## Performance Report Tracking

- Track query groups from `content/seo/keyword-priority-map.json`.
- Review CTR weekly for high-impression low-CTR pages.
- Review average position only with query intent and landing page together.
