# Maintenance Playbook

Generated: 2026-05-22

## Weekly Checks

- Search Console indexing and coverage for recent sitemap URLs.
- Bing Webmaster + IndexNow submission status.
- Ranking trend report: `node tools/ranking-intelligence.mjs`.
- Broken link audit: `node tools/final-ops-audit.mjs`.
- Review top internal search failures from local QA sessions.

## Monthly Checks

- Review CTR tests and update `ctr-test-framework.json` winners.
- Refresh `/latest-content/`.
- Check authority PDF download links.
- Review stale pages older than 90 days.
- Run Lighthouse on homepage, `/teoriprov/`, `/gratis-teoriprov/`, `/sok/`.

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
