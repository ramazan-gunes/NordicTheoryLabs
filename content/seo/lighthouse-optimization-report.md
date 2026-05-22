# Lighthouse Optimization Report

Implemented:

- deferred quiz script
- font preconnect and style preload
- app-store dns-prefetch and preconnect
- fixed image dimensions for editorial/app trust images
- lazy decoding on non-critical trust image
- stable grids for FAQ, entity, method and related sections
- static cache hints in /_headers
- no backend calls on SEO pages
- no layout-shifting quiz containers

Target: mobile Lighthouse 95+ after CDN cache warm-up.
