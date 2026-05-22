# Bing Webmaster + IndexNow Setup

Generated: 2026-05-22

References:

- https://www.bing.com/indexnow/getstarted
- https://www.indexnow.org/documentation

## Validation

| Check | Status |
|---|---|
| IndexNow key file exists | PASS |
| Key file content matches | PASS |
| Submit tool exists | PASS |
| Endpoint configured | PASS |
| Updated-page list exists | PASS |

## Setup

1. Add site to Bing Webmaster Tools.
2. Submit `https://nordictheorylabs.com/sitemap.xml`.
3. Verify IndexNow key at `https://nordictheorylabs.com/8f2a7c5d1e9b4a63b7c0d2e5f8a9b1c4d6e7f0a2b3c5d8e1f4a6b9c2d5e8f1a4.txt`.
4. Dry run: `node tools/indexnow-submit.mjs`.
5. Submit only after production deploy: `node tools/indexnow-submit.mjs --submit`.

## Safe Submission Rules

- Submit only changed URLs from `content/seo/updated-pages.json`.
- Keep batches under the generated list size unless doing a full relaunch.
- Retry 429/5xx later; do not loop submissions.
- Submit after deploy verification, never before.
