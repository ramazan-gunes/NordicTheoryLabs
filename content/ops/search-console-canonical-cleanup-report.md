# Search Console Canonical Cleanup Report

Generated: 2026-06-04

## Status

| Check | Count | Status |
|---|---:|---|
| Sitemap HTML URLs checked | 612 | PASS |
| Missing local HTML files | 0 | PASS |
| Canonical mismatches in sitemap | 0 | PASS |
| Noindex URLs in sitemap | 0 | PASS |
| Refresh redirects in sitemap | 0 | PASS |
| Blog redirect rules | 1394 | PASS |
| /blog/en duplicate redirects | 1 | PASS |
| Legacy /blog/sr redirects | 1 | PASS |
| Extensionless blog redirects | 1 | PASS |
| Static redirect limit | 1391/2000 | PASS |
| Dynamic redirect limit | 4/100 | PASS |

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
