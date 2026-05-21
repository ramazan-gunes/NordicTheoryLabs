# Implementation Log

Date: 2026-05-21
Workspace: `C:\rgproject\NordicTheoryLabs`
Source bundle: `C:\Users\RGUEHA\Downloads\Nordic Theory Labs (5) (1)\_subpages-bundle`

## Design Bundle Check

Checked the supplied subpage bundle against the current static site:

- `assets/site.css`
- `about.html`
- `press.html`
- `contact.html`
- `changelog.html`
- `404.html`
- `subpages-overview.html`
- `blog/index.html`
- `blog/swedish-driving-theory-test-guide.html`

The visual subpage design was already present in the repository. The bundle's only content changes on several pages pointed app links to `apps/korkort-hero.html`, but this project uses `apps/korkort-hero/`, so those route-breaking link changes were not kept.

Kept a targeted blog update: the main blog archive now includes a language archive row that points to the new localized route placeholders.

## Blog Language Structure

Added public placeholder routes for localized blog archives:

- `blog/sv/`
- `blog/tr/`
- `blog/ar/`
- `blog/fa/`
- `blog/so/`
- `blog/ku/`
- `blog/pl/`
- `blog/fi/`
- `blog/bs/`
- `blog/es/`
- `blog/ru/`

English remains canonical at `blog/`, with `blog/en/` added as a redirect for folder consistency. The main blog archive now includes a language archive row.

## Markdown Content Workspace

Created a content workspace for the next phase:

- `content/README.md`
- `content/blog/_post-template.md`
- `content/blog/<lang>/README.md`
- `content/blog/<lang>/posts/.gitkeep`
- `content/pages/<lang>/README.md`

## Next Content Pass

Created the first multilingual draft set for the topic "getting a category B driving licence in Sweden".

Drafts added:

- `content/blog/en/posts/getting-a-driving-licence-in-sweden.md`
- `content/blog/sv/posts/ta-korkort-i-sverige.md`
- `content/blog/tr/posts/isvecte-ehliyet-alma-sureci.md`
- `content/blog/ar/posts/getting-a-driving-licence-in-sweden.md`
- `content/blog/fa/posts/getting-a-driving-licence-in-sweden.md`
- `content/blog/so/posts/getting-a-driving-licence-in-sweden.md`
- `content/blog/ku/posts/getting-a-driving-licence-in-sweden.md`
- `content/blog/pl/posts/prawo-jazdy-w-szwecji.md`
- `content/blog/fi/posts/ajokortin-hankkiminen-ruotsissa.md`
- `content/blog/bs/posts/polaganje-vozacke-dozvole-u-svedskoj.md`
- `content/blog/es/posts/sacar-el-carnet-de-conducir-en-suecia.md`
- `content/blog/ru/posts/poluchenie-voditelskikh-prav-v-shvetsii.md`

The drafts are based on the current public guidance checked on 2026-05-21 from Transportstyrelsen and Trafikverket. Next step is editorial review, then conversion from markdown drafts into static HTML article pages using the blog design.

## Markdown to HTML Conversion

Added `tools/build-blog.mjs` and generated static pages from the multilingual markdown drafts.

Generated article routes:

- `blog/getting-a-driving-licence-in-sweden.html`
- `blog/sv/ta-korkort-i-sverige.html`
- `blog/tr/isvecte-ehliyet-alma-sureci.html`
- `blog/ar/getting-a-driving-licence-in-sweden.html`
- `blog/fa/getting-a-driving-licence-in-sweden.html`
- `blog/so/getting-a-driving-licence-in-sweden.html`
- `blog/ku/getting-a-driving-licence-in-sweden.html`
- `blog/pl/prawo-jazdy-w-szwecji.html`
- `blog/fi/ajokortin-hankkiminen-ruotsissa.html`
- `blog/bs/polaganje-vozacke-dozvole-u-svedskoj.html`
- `blog/es/sacar-el-carnet-de-conducir-en-suecia.html`
- `blog/ru/poluchenie-voditelskikh-prav-v-shvetsii.html`

Regenerated localized blog archive pages under `blog/<lang>/index.html` and added the English article card to `blog/index.html`.

## Driving Licence Process Topic 1

Created the multilingual draft set for "How long does it take to get a driving licence in Sweden?" and regenerated static blog pages.

Draft markdown files:

- `content/blog/en/posts/how-long-to-get-driving-licence-in-sweden.md`
- `content/blog/sv/posts/hur-lang-tid-tar-det-att-ta-korkort.md`
- `content/blog/tr/posts/isvecte-ehliyet-almak-ne-kadar-surer.md`
- `content/blog/ar/posts/how-long-to-get-driving-licence-in-sweden.md`
- `content/blog/fa/posts/how-long-to-get-driving-licence-in-sweden.md`
- `content/blog/so/posts/how-long-to-get-driving-licence-in-sweden.md`
- `content/blog/ku/posts/how-long-to-get-driving-licence-in-sweden.md`
- `content/blog/pl/posts/ile-trwa-zrobienie-prawa-jazdy-w-szwecji.md`
- `content/blog/fi/posts/kuinka-kauan-ajokortin-saaminen-ruotsissa-kestaa.md`
- `content/blog/bs/posts/koliko-traje-polaganje-vozacke-u-svedskoj.md`
- `content/blog/es/posts/cuanto-se-tarda-en-sacar-el-carnet-en-suecia.md`
- `content/blog/ru/posts/skolko-vremeni-poluchit-prava-v-shvetsii.md`

Generated HTML routes include `blog/how-long-to-get-driving-licence-in-sweden.html` plus localized routes under `blog/<lang>/`. The English blog archive now includes a card for this topic.

## Driving Licence Process Topic 2

Created the multilingual draft set for "Driving licence cost in Sweden" and regenerated static blog pages.

Draft markdown files:

- `content/blog/en/posts/driving-licence-cost-sweden.md`
- `content/blog/sv/posts/vad-kostar-korkort-i-sverige.md`
- `content/blog/tr/posts/isvecte-ehliyet-maliyeti.md`
- `content/blog/ar/posts/driving-licence-cost-sweden.md`
- `content/blog/fa/posts/driving-licence-cost-sweden.md`
- `content/blog/so/posts/driving-licence-cost-sweden.md`
- `content/blog/ku/posts/driving-licence-cost-sweden.md`
- `content/blog/pl/posts/koszt-prawa-jazdy-w-szwecji.md`
- `content/blog/fi/posts/ajokortin-hinta-ruotsissa.md`
- `content/blog/bs/posts/cijena-vozacke-dozvole-u-svedskoj.md`
- `content/blog/es/posts/coste-carnet-conducir-suecia.md`
- `content/blog/ru/posts/stoimost-voditelskikh-prav-v-shvetsii.md`

Generated HTML routes:

- `blog/driving-licence-cost-sweden.html`
- `blog/sv/vad-kostar-korkort-i-sverige.html`
- `blog/tr/isvecte-ehliyet-maliyeti.html`
- `blog/ar/driving-licence-cost-sweden.html`
- `blog/fa/driving-licence-cost-sweden.html`
- `blog/so/driving-licence-cost-sweden.html`
- `blog/ku/driving-licence-cost-sweden.html`
- `blog/pl/koszt-prawa-jazdy-w-szwecji.html`
- `blog/fi/ajokortin-hinta-ruotsissa.html`
- `blog/bs/cijena-vozacke-dozvole-u-svedskoj.html`
- `blog/es/coste-carnet-conducir-suecia.html`
- `blog/ru/stoimost-voditelskikh-prav-v-shvetsii.html`

Official fee values were checked on 2026-05-21 against Trafikverket and Transportstyrelsen public guidance. The English blog archive now includes a card for this topic.

## Driving Licence Process Topic 3

Created the multilingual draft set for "Risk 1 and Risk 2 in Sweden" and regenerated static blog pages.

Draft markdown files:

- `content/blog/en/posts/risk-1-risk-2-sweden.md`
- `content/blog/sv/posts/riskettan-risk-tvaan-korkort.md`
- `content/blog/tr/posts/isvecte-risk-1-risk-2-egitimi.md`
- `content/blog/ar/posts/risk-1-risk-2-sweden.md`
- `content/blog/fa/posts/risk-1-risk-2-sweden.md`
- `content/blog/so/posts/risk-1-risk-2-sweden.md`
- `content/blog/ku/posts/risk-1-risk-2-sweden.md`
- `content/blog/pl/posts/kursy-ryzyka-risk-1-risk-2-szwecja.md`
- `content/blog/fi/posts/riskikoulutus-risk-1-risk-2-ruotsi.md`
- `content/blog/bs/posts/risk-1-risk-2-obuka-svedska.md`
- `content/blog/es/posts/curso-riesgo-risk-1-risk-2-suecia.md`
- `content/blog/ru/posts/risk-1-risk-2-v-shvetsii.md`

Generated HTML routes:

- `blog/risk-1-risk-2-sweden.html`
- `blog/sv/riskettan-risk-tvaan-korkort.html`
- `blog/tr/isvecte-risk-1-risk-2-egitimi.html`
- `blog/ar/risk-1-risk-2-sweden.html`
- `blog/fa/risk-1-risk-2-sweden.html`
- `blog/so/risk-1-risk-2-sweden.html`
- `blog/ku/risk-1-risk-2-sweden.html`
- `blog/pl/kursy-ryzyka-risk-1-risk-2-szwecja.html`
- `blog/fi/riskikoulutus-risk-1-risk-2-ruotsi.html`
- `blog/bs/risk-1-risk-2-obuka-svedska.html`
- `blog/es/curso-riesgo-risk-1-risk-2-suecia.html`
- `blog/ru/risk-1-risk-2-v-shvetsii.html`

Official risk training guidance was checked on 2026-05-21 against Transportstyrelsen and Trafikverket public pages. The English blog archive now includes a card for this topic.

## Driving Licence Process Topic 4

Created the multilingual draft set for "Swedish theory test for category B" and regenerated static blog pages.

Draft markdown files:

- `content/blog/en/posts/swedish-theory-test-category-b.md`
- `content/blog/sv/posts/kunskapsprov-b-korkort.md`
- `content/blog/tr/posts/isvecte-teori-sinavi-kunskapsprov.md`
- `content/blog/ar/posts/swedish-theory-test-category-b.md`
- `content/blog/fa/posts/swedish-theory-test-category-b.md`
- `content/blog/so/posts/swedish-theory-test-category-b.md`
- `content/blog/ku/posts/swedish-theory-test-category-b.md`
- `content/blog/pl/posts/egzamin-teoretyczny-prawo-jazdy-szwecja.md`
- `content/blog/fi/posts/teoriakoe-b-ajokortti-ruotsi.md`
- `content/blog/bs/posts/teorijski-ispit-vozacka-svedska.md`
- `content/blog/es/posts/examen-teorico-carnet-suecia.md`
- `content/blog/ru/posts/teoriticheskiy-ekzamen-v-shvetsii.md`

Generated HTML routes:

- `blog/swedish-theory-test-category-b.html`
- `blog/sv/kunskapsprov-b-korkort.html`
- `blog/tr/isvecte-teori-sinavi-kunskapsprov.html`
- `blog/ar/swedish-theory-test-category-b.html`
- `blog/fa/swedish-theory-test-category-b.html`
- `blog/so/swedish-theory-test-category-b.html`
- `blog/ku/swedish-theory-test-category-b.html`
- `blog/pl/egzamin-teoretyczny-prawo-jazdy-szwecja.html`
- `blog/fi/teoriakoe-b-ajokortti-ruotsi.html`
- `blog/bs/teorijski-ispit-vozacka-svedska.html`
- `blog/es/examen-teorico-carnet-suecia.html`
- `blog/ru/teoriticheskiy-ekzamen-v-shvetsii.html`

Official theory test guidance was checked on 2026-05-21 against Trafikverket public pages. The English blog archive now includes a card for this topic.
