# Search Console Discovered Not Indexed Report

Generated: 2026-06-04

## Issue

Search Console status: `Keşfedildi - şu anda dizine eklenmiş değil`.

Observed count in the supplied screenshot: `509`.

This means Google knows the URLs exist but has not crawled/indexed them yet. For a large batch of newly deployed URLs, this is common during the first indexing wave. It becomes a real production issue when priority HTML pages stay in this state after repeated sitemap fetches and internal links.

## Implemented Cleanup

| Area | Implementation | Status |
|---|---|---|
| Download asset URLs | Removed from XML sitemaps | PASS |
| Download asset files | Removed from repository | PASS |
| Resource landing pages | Kept `/resurser/...` pages in `sitemap-assets.xml` | PASS |
| Canonical sitemap HTML | `0` canonical mismatches | PASS |
| Noindex in sitemap | `0` noindex HTML URLs in sitemap | PASS |
| Refresh redirects in sitemap | `0` refresh redirect URLs in sitemap | PASS |
| Redirect cleanup | Old blog URL variants redirect to canonical URLs | PASS |

## Why Download Asset URLs Were Changed

The screenshot included old download asset URLs. These files were download assets, not the preferred search landing pages. The files have been removed. The indexable targets are now the HTML pages that explain the resource:

- `/resurser/teoriprov-checklista/`
- `/resurser/vagmarken-fuskblad/`
- `/resurser/vanligaste-kuggfragorna/`
- `/resurser/vinterkorning-guide/`
- `/authority/teoriprov-kuggfragor-rapport/`
- `/authority/svensk-korkortsstatistik/`
- `/authority/vinterkorning-overlevnadsguide/`
- `/authority/utbildarresurser/`

## Post-Deploy Search Console Workflow

1. Deploy the updated `_headers`, `_redirects`, and sitemap files.
2. Open Search Console > Site Haritaları.
3. Resubmit `https://nordictheorylabs.com/sitemap.xml`.
4. Inspect these priority URLs first:
   - `https://nordictheorylabs.com/`
   - `https://nordictheorylabs.com/teoriprov/`
   - `https://nordictheorylabs.com/gratis-teoriprov/`
   - `https://nordictheorylabs.com/resurser/teoriprov-checklista/`
   - `https://nordictheorylabs.com/authority/teoriprov-kuggfragor-rapport/`
5. Request indexing for the HTML pages only.
6. Do not request indexing for removed download asset URLs; those files are no longer part of the site.
7. After deployment is live and sitemap is fetched, click `Düzeltmeyi doğrula`.

## Expected Result

- Old download URLs move out of the "discovered, not indexed" backlog because they are no longer submitted as indexable sitemap URLs and no longer exist as site assets.
- Important HTML pages remain in sitemap and continue receiving internal links.
- Google may still take days or weeks to crawl all 500+ discovered blog URLs; this is normal for a newly expanded static site.

## Remaining External Requirement

Configure Cloudflare dashboard redirect:

- `http://nordictheorylabs.com/*` -> `https://nordictheorylabs.com/$1`
- status: `301`
- preserve path and query string: `yes`

This is not fully enforceable through repository files because host-level HTTP-to-HTTPS canonicalization is handled by Cloudflare edge configuration.
