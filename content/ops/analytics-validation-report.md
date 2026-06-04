# Analytics Validation Report

Generated: 2026-05-22

Privacy model: localStorage-only operational event counters. No cookies, no fingerprinting, no network beacon.

| Event | Status |
|---|---|
| CTA clicks | PASS |
| Quiz completion | PASS |
| Scroll depth | PASS |
| Internal link clicks | PASS |
| App Store clicks | PASS |
| Internal search usage | PASS |
| FAQ expansion | PASS |
| Tool usage | PASS |

## Manual QA

1. Open `/gratis-teoriprov/`.
2. Click primary CTA.
3. Complete a short quiz.
4. Expand two FAQ items.
6. Search in `/sok/`.
7. Click App Store link.
8. Inspect localStorage keys: `ntl_growth_events_v1`, `ntl_search_intelligence_v1`, `ntl_theory_practice_v2`.
