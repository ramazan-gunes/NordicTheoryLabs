# Production Verification Checklist

Generated: 2026-05-22

## Local Build Verification

- HTML files scanned: 618
- SEO/crawlable pages checked: 53
- Sitemap segments: sitemaps/sitemap-core.xml: 9, sitemaps/sitemap-seo.xml: 29, sitemaps/sitemap-local.xml: 5, sitemaps/sitemap-authority.xml: 5, sitemaps/sitemap-assets.xml: 13, sitemaps/sitemap-blog.xml: 481, sitemaps/sitemap-legal.xml: 25, sitemaps/sitemap-recent.xml: 61
- Canonical issues: 0
- hreflang issues: 0
- Accidental noindex: 0
- Blocked SEO pages: 0
- Broken local links: 0
- JSON-LD parse errors: 0
- PDF checks: 8

## Live Verification Commands

```powershell
curl.exe -I https://nordictheorylabs.com/
curl.exe -I https://nordictheorylabs.com/robots.txt
curl.exe -I https://nordictheorylabs.com/sitemap.xml
curl.exe -I https://nordictheorylabs.com/sitemaps/sitemap-seo.xml
curl.exe -I https://nordictheorylabs.com/assets/downloads/teoriprov-checklista.pdf
curl.exe -I --compressed https://nordictheorylabs.com/assets/seo-growth.js
```
