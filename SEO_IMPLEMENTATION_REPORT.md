# 1. SEO audit report

Implemented Swedish high-intent SEO layer for `https://nordictheorylabs.com` with production HTML, metadata, JSON-LD, internal links, free tools, FAQ hub, traffic-signs cluster, sitemap rebuild and robots improvements.

Implemented files:

```text
assets/seo-pages.css
assets/seo-tools.js
content/seo/swedish-keyword-map.json
tools/build-seo-pages.mjs
tools/build-sitemap.mjs
SEO_IMPLEMENTATION_REPORT.md
```

Generated production URLs:

| URL | SEO title | Meta description | Canonical | hreflang example | JSON-LD | CTA placement | FAQ schema |
|---|---|---|---|---|---|---|---|
| `/korkortsteori/` | Körkortsteori 2026 - plugga smart inför teoriprovet | Körkortsteori för B-körkort i Sverige: regler, vägmärken, riskutbildning, provstrategi och gratis övning inför teoriprovet. | `https://nordictheorylabs.com/korkortsteori/` | `sv`, `sv-SE`, `x-default` | WebPage, BreadcrumbList, FAQPage | Hero + footer CTA | 3 frågor |
| `/teoriprov/` | Teoriprov B - frågor, regler och övning inför kunskapsprovet | Allt om teoriprov B i Sverige: hur kunskapsprovet fungerar, vilka ämnen som testas och hur du tränar med rätt provstrategi. | `https://nordictheorylabs.com/teoriprov/` | `sv`, `sv-SE`, `x-default` | WebPage, BreadcrumbList, FAQPage | Hero + footer CTA | 3 frågor |
| `/gratis-teoriprov/` | Gratis teoriprov online - öva körkortsfrågor för B-körkort | Testa gratis teoriprov online med svenska körkortsfrågor om väjningsregler, risk, hastighet, vägmärken och säker körning. | `https://nordictheorylabs.com/gratis-teoriprov/` | `sv`, `sv-SE`, `x-default` | WebPage, SoftwareApplication, FAQPage | Tool result + app CTA | 3 frågor |
| `/korkort-kostnad-kalkylator/` | Körkort kostnad kalkylator - räkna pris för B-körkort | Räkna ut ungefärlig kostnad för körkort i Sverige med lektioner, riskettan, risktvåan, provavgifter, syntest och privat övningskörning. | `https://nordictheorylabs.com/korkort-kostnad-kalkylator/` | `sv`, `sv-SE`, `x-default` | WebPage, SoftwareApplication, FAQPage | Calculator + cost guide CTA | 3 frågor |
| `/korkort-tidsplan/` | Körkort tidsplan - planera vägen till teoriprov och körprov | Skapa en enkel tidsplan för B-körkort: körkortstillstånd, teori, riskutbildning, övningskörning, teoriprov och körprov. | `https://nordictheorylabs.com/korkort-tidsplan/` | `sv`, `sv-SE`, `x-default` | WebPage, SoftwareApplication, FAQPage | Planner + theory CTA | 3 frågor |
| `/faq/` | Körkort FAQ - vanliga frågor om teoriprov, körprov och B-körkort | Svar på vanliga frågor om körkort i Sverige: teoriprov, körkortstillstånd, syntest, handledare, riskettan, risktvåan och vägmärken. | `https://nordictheorylabs.com/faq/` | `sv`, `sv-SE`, `x-default` | WebPage, BreadcrumbList, FAQPage | FAQ hub + tool CTAs | 5 frågor |
| `/vagmarken/` | Vägmärken 2026 - lär dig svenska trafikskyltar inför teoriprovet | Guide till svenska vägmärken och vägmarkeringar: varningsmärken, förbudsmärken, påbudsmärken, anvisningsmärken och väjningsregler. | `https://nordictheorylabs.com/vagmarken/` | `sv`, `sv-SE`, `x-default` | WebPage, ItemList, FAQPage | Cluster cards + quiz CTA | 3 frågor |
| `/vagmarken/varningsmarken/` | Varningsmärken - svenska varningsskyltar inför teoriprovet | Lär dig svenska varningsmärken: farlig kurva, övergångsställe, barn, vägarbete, vilt, halt väglag och andra risker. | `https://nordictheorylabs.com/vagmarken/varningsmarken/` | `sv`, `sv-SE`, `x-default` | WebPage, BreadcrumbList, FAQPage | Cluster + quiz CTA | 2 frågor |
| `/vagmarken/forbudsmarken/` | Förbudsmärken - svenska förbudsskyltar och regler | Förbudsmärken inför teoriprovet: infart förbjuden, omkörningsförbud, parkeringsförbud, hastighetsgränser och fordonsspecifika förbud. | `https://nordictheorylabs.com/vagmarken/forbudsmarken/` | `sv`, `sv-SE`, `x-default` | WebPage, BreadcrumbList, FAQPage | Cluster + quiz CTA | 2 frågor |
| `/vagmarken/pabudsmarken/` | Påbudsmärken - blå skyltar du måste följa | Lär dig svenska påbudsmärken inför teoriprovet: körriktning, gångbana, cykelbana, rondell och obligatoriska körfält. | `https://nordictheorylabs.com/vagmarken/pabudsmarken/` | `sv`, `sv-SE`, `x-default` | WebPage, BreadcrumbList, FAQPage | Cluster + quiz CTA | 2 frågor |
| `/vagmarken/vajningsregler/` | Väjningsregler - högerregeln, huvudled och lämna företräde | Lär dig väjningsregler inför teoriprovet: högerregeln, huvudled, väjningsplikt, stopplikt, cirkulationsplats och utfartsregeln. | `https://nordictheorylabs.com/vagmarken/vajningsregler/` | `sv`, `sv-SE`, `x-default` | WebPage, BreadcrumbList, FAQPage | Cluster + quiz CTA | 3 frågor |

# 2. Critical issues

Implemented fixes:

```diff
+ Added crawlable Swedish high-intent landing pages.
+ Added real semantic HTML templates.
+ Added FAQPage, BreadcrumbList, ItemList and SoftwareApplication JSON-LD.
+ Added sitemap generation from live HTML files.
+ Added robots controls for source folders.
+ Added internal links from /blog/ to Swedish hubs.
+ Added mobile-first CSS and interactive tool JS.
```

Current technical fixes:

```txt
robots.txt
Disallow: /content/
Disallow: /tools/
Disallow: /.git/
Disallow: /.vs/
Sitemap: https://nordictheorylabs.com/sitemap.xml
```

# 3. Missing high-intent pages

Implemented missing high-intent Swedish pages:

```text
korkortsteori/index.html
teoriprov/index.html
gratis-teoriprov/index.html
korkort-kostnad-kalkylator/index.html
korkort-tidsplan/index.html
faq/index.html
vagmarken/index.html
vagmarken/varningsmarken/index.html
vagmarken/forbudsmarken/index.html
vagmarken/pabudsmarken/index.html
vagmarken/vajningsregler/index.html
```

Real Swedish SEO copy examples now deployed:

```html
<h1 class="seo-h1">Körkortsteori för dig som vill klara teoriprovet.</h1>
<p class="seo-lede">En svensk, rak och praktisk guide till körkortsteori: vad du ska läsa, hur du tränar frågor och hur du bygger säker förståelse inför Trafikverkets kunskapsprov.</p>
```

# 4. Complete URL architecture

Implemented architecture:

```text
/
/apps/korkort-hero/
/blog/
/blog/sv/
/korkortsteori/
/teoriprov/
/gratis-teoriprov/
/korkort-kostnad-kalkylator/
/korkort-tidsplan/
/faq/
/vagmarken/
/vagmarken/varningsmarken/
/vagmarken/forbudsmarken/
/vagmarken/pabudsmarken/
/vagmarken/vajningsregler/
```

# 5. Internal linking architecture

Implemented internal links:

```html
<div class="language-row" aria-label="Swedish SEO hubs">
  <span class="lbl">Swedish hubs:</span>
  <a href="../korkortsteori/">Körkortsteori</a>
  <a href="../teoriprov/">Teoriprov B</a>
  <a href="../gratis-teoriprov/">Gratis teoriprov</a>
  <a href="../korkort-kostnad-kalkylator/">Körkort kostnad</a>
  <a href="../vagmarken/">Vägmärken</a>
  <a href="../faq/">FAQ</a>
</div>
```

Each generated SEO page includes:

```html
<div class="internal-link-grid">
  <a href="../korkortsteori/">Körkortsteori <span>→</span></a>
  <a href="../teoriprov/">Teoriprov B <span>→</span></a>
  <a href="../gratis-teoriprov/">Gratis teoriprov <span>→</span></a>
  <a href="../vagmarken/">Vägmärken <span>→</span></a>
</div>
```

# 6. Production-ready page templates

Implemented reusable template in `tools/build-seo-pages.mjs`:

```html
<main>
  <section class="seo-hero">
    <div class="wrap seo-grid">
      <div>
        <p class="seo-kicker">Körkort · Teori · 2026</p>
        <h1 class="seo-h1">Körkortsteori för dig som vill klara teoriprovet.</h1>
        <p class="seo-lede">En svensk, rak och praktisk guide...</p>
        <div class="seo-actions">
          <a class="seo-btn primary" href="../gratis-teoriprov/">Öva gratis teoriprov</a>
          <a class="seo-btn secondary" href="../vagmarken/">Läs om vägmärken</a>
        </div>
      </div>
      <aside class="seo-trust" aria-label="Sidans innehåll"></aside>
    </div>
  </section>
  <section class="seo-section"></section>
  <section class="seo-section alt" id="faq"></section>
</main>
```

# 7. JSON-LD implementations

Implemented JSON-LD graph per generated page:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://nordictheorylabs.com/#organization" },
    { "@type": "WebSite", "@id": "https://nordictheorylabs.com/#website" },
    { "@type": "WebPage", "@id": "https://nordictheorylabs.com/korkortsteori/#webpage" },
    { "@type": "BreadcrumbList", "@id": "https://nordictheorylabs.com/korkortsteori/#breadcrumb" },
    { "@type": "FAQPage", "@id": "https://nordictheorylabs.com/korkortsteori/#faq" }
  ]
}
```

Tool pages also include:

```json
{
  "@type": "SoftwareApplication",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "SEK" }
}
```

# 8. hreflang implementation examples

Implemented on each Swedish SEO page:

```html
<link rel="alternate" hreflang="sv" href="https://nordictheorylabs.com/korkortsteori/" />
<link rel="alternate" hreflang="sv-SE" href="https://nordictheorylabs.com/korkortsteori/" />
<link rel="alternate" hreflang="x-default" href="https://nordictheorylabs.com/korkortsteori/" />
```

# 9. sitemap restructuring

Implemented generated sitemap:

```bash
node tools/build-sitemap.mjs
```

Current sitemap status:

```text
sitemap.xml generated with 523 crawlable URLs
new SEO pages included
redirect pages excluded
source folders excluded
logo exploration HTML excluded
```

# 10. robots.txt improvements

Implemented:

```txt
User-agent: *
Allow: /
Disallow: /content/
Disallow: /tools/
Disallow: /.git/
Disallow: /.vs/

Sitemap: https://nordictheorylabs.com/sitemap.xml
```

# 11. Core Web Vitals fixes

Implemented mobile-first CSS with stable grids:

```css
.seo-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 28px; }
.seo-trust { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.tool-field input { min-height: 46px; border-radius: var(--seo-radius); }
@media (min-width: 720px) { .seo-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
```

Implemented `defer` for interactive tooling:

```html
<script src="../assets/seo-tools.js" defer></script>
```

# 12. Mobile conversion improvements

Implemented touch-ready CTAs and tools:

```html
<a class="seo-btn primary" href="../gratis-teoriprov/">Öva gratis teoriprov</a>
<a class="seo-btn secondary" href="../apps/korkort-hero/">Öppna app-sidan</a>
```

Implemented mobile controls:

```css
.seo-btn { min-height: 46px; padding: 12px 18px; border-radius: 999px; }
.tool-field input, .tool-field select { width: 100%; min-height: 46px; }
```

# 13. Free tool page implementations

Implemented:

```text
/gratis-teoriprov/              interactive quiz
/korkort-kostnad-kalkylator/    SEK cost calculator
/korkort-tidsplan/              timeline planner
```

Production JS:

```js
document.querySelectorAll("[data-cost-calculator]").forEach(initCostCalculator);
document.querySelectorAll("[data-timeline-planner]").forEach(initTimelinePlanner);
document.querySelectorAll("[data-theory-quiz]").forEach(initQuiz);
```

# 14. FAQ hub implementation

Implemented `/faq/` with FAQPage schema and internal links to:

```text
/gratis-teoriprov/
/korkort-kostnad-kalkylator/
/korkort-tidsplan/
/vagmarken/
/blog/sv/korkortstillstand-syntest.html
```

FAQ HTML:

```html
<details class="faq-item">
  <summary>Hur ansöker jag om körkortstillstånd?</summary>
  <p>Du ansöker digitalt hos Transportstyrelsen och gör syntest hos optiker eller trafikskola innan tillståndet kan beviljas.</p>
</details>
```

# 15. Traffic signs cluster implementation

Implemented:

```text
/vagmarken/
/vagmarken/varningsmarken/
/vagmarken/forbudsmarken/
/vagmarken/pabudsmarken/
/vagmarken/vajningsregler/
```

Cluster HTML:

```html
<a class="sign-card" href="../vagmarken/varningsmarken/">
  <span class="sign-symbol">!</span>
  <h3>Varningsmärken</h3>
  <p>Triangel med röd kant varnar för fara längre fram.</p>
</a>
```

# 16. Swedish keyword mapping

Implemented in `content/seo/swedish-keyword-map.json`:

```json
{
  "cluster": "Teoriprov",
  "primary_url": "https://nordictheorylabs.com/teoriprov/",
  "primary_keyword": "teoriprov",
  "secondary_keywords": ["teoriprov b", "kunskapsprov körkort", "teoriprov frågor", "övningsprov körkort"],
  "intent": "practice",
  "cta": "Starta gratis prov"
}
```

# 17. Metadata generation

Implemented generator in `tools/build-seo-pages.mjs`:

```html
<title>Körkortsteori 2026 - plugga smart inför teoriprovet | Nordic Theory Labs</title>
<meta name="description" content="Körkortsteori för B-körkort i Sverige: regler, vägmärken, riskutbildning, provstrategi och gratis övning inför teoriprovet." />
<link rel="canonical" href="https://nordictheorylabs.com/korkortsteori/" />
<meta property="og:title" content="Körkortsteori 2026 - plugga smart inför teoriprovet | Nordic Theory Labs" />
<meta name="twitter:card" content="summary_large_image" />
```

# 18. Reusable SEO components

Implemented component system:

```text
nav()
head()
jsonLd()
internalLinks()
toolMarkup()
signsMarkup()
renderPage()
```

Build command:

```bash
node tools/build-seo-pages.mjs
node tools/build-sitemap.mjs
```

# 19. AI Overview optimization

Implemented answer-first page sections with concise Swedish definitions:

```html
<h2>Vad ingår i körkortsteori?</h2>
<p>Körkortsteori handlar inte bara om att memorera svar. Du behöver förstå trafikregler, risker, vägmärken, miljökörning, säkerhetsmarginaler och hur du fattar beslut när situationen ändras snabbt.</p>
```

Implemented FAQ answers as short extractable paragraphs and JSON-LD `FAQPage` entities.

# 20. Final implementation checklist

Implemented and verified:

```text
[x] 11 Swedish SEO pages generated
[x] semantic HTML and heading hierarchy
[x] SEO titles and meta descriptions
[x] canonical tags
[x] hreflang sv, sv-SE, x-default
[x] OpenGraph tags
[x] Twitter card tags
[x] JSON-LD graph
[x] FAQPage schema
[x] SoftwareApplication schema for tools
[x] ItemList schema for traffic-signs cluster
[x] internal links from /blog/
[x] reusable SEO CSS
[x] reusable SEO JS tools
[x] keyword map JSON
[x] sitemap regenerated
[x] robots.txt updated
```

References used for implementation constraints:

```text
Google Search Central: sitemaps, canonical URLs, robots.txt, FAQPage structured data, BreadcrumbList structured data.
```
