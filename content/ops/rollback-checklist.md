# Rollback Checklist

Generated: 2026-05-22

## Rollback Triggers

- Production returns 5xx on homepage or sitemap.
- robots.txt blocks important SEO pages.
- sitemap index is unreachable.
- large canonical mismatch appears after deploy.
- app install links break.
- critical CSS or JS missing.

## Rollback Steps

1. Revert to previous deploy artifact or previous git commit.
2. Confirm `https://nordictheorylabs.com/`, `https://nordictheorylabs.com/robots.txt`, and `https://nordictheorylabs.com/sitemap.xml` return 200.
3. Confirm no production SEO page has accidental `noindex`.
4. Pause IndexNow submission until the rollback is verified.
5. Re-run `node tools/final-ops-audit.mjs`.
6. Document cause, affected URLs, and fix in the deployment log.
