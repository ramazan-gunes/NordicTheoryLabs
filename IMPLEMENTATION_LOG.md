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

## Driving Licence Process Topic 5

Created the multilingual draft set for "Swedish driving test for category B" and regenerated static blog pages.

Draft markdown files:

- `content/blog/en/posts/swedish-driving-test-category-b.md`
- `content/blog/sv/posts/korprov-b-korkort.md`
- `content/blog/tr/posts/isvecte-direksiyon-sinavi-korprov.md`
- `content/blog/ar/posts/swedish-driving-test-category-b.md`
- `content/blog/fa/posts/swedish-driving-test-category-b.md`
- `content/blog/so/posts/swedish-driving-test-category-b.md`
- `content/blog/ku/posts/swedish-driving-test-category-b.md`
- `content/blog/pl/posts/egzamin-praktyczny-prawo-jazdy-szwecja.md`
- `content/blog/fi/posts/ajokoe-b-ajokortti-ruotsi.md`
- `content/blog/bs/posts/prakticni-ispit-vozacka-svedska.md`
- `content/blog/es/posts/examen-practico-carnet-suecia.md`
- `content/blog/ru/posts/prakticheskiy-ekzamen-v-shvetsii.md`

Generated HTML routes:

- `blog/swedish-driving-test-category-b.html`
- `blog/sv/korprov-b-korkort.html`
- `blog/tr/isvecte-direksiyon-sinavi-korprov.html`
- `blog/ar/swedish-driving-test-category-b.html`
- `blog/fa/swedish-driving-test-category-b.html`
- `blog/so/swedish-driving-test-category-b.html`
- `blog/ku/swedish-driving-test-category-b.html`
- `blog/pl/egzamin-praktyczny-prawo-jazdy-szwecja.html`
- `blog/fi/ajokoe-b-ajokortti-ruotsi.html`
- `blog/bs/prakticni-ispit-vozacka-svedska.html`
- `blog/es/examen-practico-carnet-suecia.html`
- `blog/ru/prakticheskiy-ekzamen-v-shvetsii.html`

Official driving test guidance was checked on 2026-05-21 against Trafikverket public pages. The English blog archive now includes a card for this topic.

## Driving Licence Process Topic 6

Created the multilingual draft set for "Learner's permit and eye test in Sweden" and regenerated static blog pages.

Draft markdown files:

- `content/blog/en/posts/learner-permit-eye-test-sweden.md`
- `content/blog/sv/posts/korkortstillstand-syntest.md`
- `content/blog/tr/posts/isvecte-korkortstillstand-goz-testi.md`
- `content/blog/ar/posts/learner-permit-eye-test-sweden.md`
- `content/blog/fa/posts/learner-permit-eye-test-sweden.md`
- `content/blog/so/posts/learner-permit-eye-test-sweden.md`
- `content/blog/ku/posts/learner-permit-eye-test-sweden.md`
- `content/blog/pl/posts/pozwolenie-na-nauke-jazdy-badanie-wzroku-szwecja.md`
- `content/blog/fi/posts/opetuslupa-nakotesti-ruotsi.md`
- `content/blog/bs/posts/dozvola-za-vjezbanje-vida-svedska.md`
- `content/blog/es/posts/permiso-aprendizaje-examen-vista-suecia.md`
- `content/blog/ru/posts/uchenicheskoe-razreshenie-proverka-zreniya-shvetsiya.md`

Generated HTML routes:

- `blog/learner-permit-eye-test-sweden.html`
- `blog/sv/korkortstillstand-syntest.html`
- `blog/tr/isvecte-korkortstillstand-goz-testi.html`
- `blog/ar/learner-permit-eye-test-sweden.html`
- `blog/fa/learner-permit-eye-test-sweden.html`
- `blog/so/learner-permit-eye-test-sweden.html`
- `blog/ku/learner-permit-eye-test-sweden.html`
- `blog/pl/pozwolenie-na-nauke-jazdy-badanie-wzroku-szwecja.html`
- `blog/fi/opetuslupa-nakotesti-ruotsi.html`
- `blog/bs/dozvola-za-vjezbanje-vida-svedska.html`
- `blog/es/permiso-aprendizaje-examen-vista-suecia.html`
- `blog/ru/uchenicheskoe-razreshenie-proverka-zreniya-shvetsiya.html`

Official learner permit and practice guidance was checked on 2026-05-21 against Transportstyrelsen public pages. The English blog archive now includes a card for this topic.

## Driving Licence Process Topic 7

Created the multilingual draft set for "Private driving practice in Sweden" and regenerated static blog pages.

Draft markdown files:

- `content/blog/en/posts/private-practice-supervisor-sweden.md`
- `content/blog/sv/posts/privat-ovningskorning-handledare.md`
- `content/blog/tr/posts/isvecte-ozel-direksiyon-calismasi-handledare.md`
- `content/blog/ar/posts/private-practice-supervisor-sweden.md`
- `content/blog/fa/posts/private-practice-supervisor-sweden.md`
- `content/blog/so/posts/private-practice-supervisor-sweden.md`
- `content/blog/ku/posts/private-practice-supervisor-sweden.md`
- `content/blog/pl/posts/jazdy-prywatne-opiekun-szwecja.md`
- `content/blog/fi/posts/yksityinen-ajoharjoittelu-ohjaaja-ruotsi.md`
- `content/blog/bs/posts/privatna-voznja-handledare-svedska.md`
- `content/blog/es/posts/practica-privada-supervisor-suecia.md`
- `content/blog/ru/posts/chastnaya-praktika-vozhdeniya-shvetsiya.md`

Generated HTML routes:

- `blog/private-practice-supervisor-sweden.html`
- `blog/sv/privat-ovningskorning-handledare.html`
- `blog/tr/isvecte-ozel-direksiyon-calismasi-handledare.html`
- `blog/ar/private-practice-supervisor-sweden.html`
- `blog/fa/private-practice-supervisor-sweden.html`
- `blog/so/private-practice-supervisor-sweden.html`
- `blog/ku/private-practice-supervisor-sweden.html`
- `blog/pl/jazdy-prywatne-opiekun-szwecja.html`
- `blog/fi/yksityinen-ajoharjoittelu-ohjaaja-ruotsi.html`
- `blog/bs/privatna-voznja-handledare-svedska.html`
- `blog/es/practica-privada-supervisor-suecia.html`
- `blog/ru/chastnaya-praktika-vozhdeniya-shvetsiya.html`

Official private practice and introduction course guidance was checked on 2026-05-21 against Transportstyrelsen public pages. The English blog archive now includes a card for this topic.

## Driving Licence Process Topic 8

Created the multilingual draft set for "Foreign driving licence in Sweden" and regenerated static blog pages.

Draft markdown files:

- `content/blog/en/posts/foreign-driving-licence-sweden.md`
- `content/blog/sv/posts/utlandskt-korkort-i-sverige.md`
- `content/blog/tr/posts/isvecte-yabanci-ehliyet.md`
- `content/blog/ar/posts/foreign-driving-licence-sweden.md`
- `content/blog/fa/posts/foreign-driving-licence-sweden.md`
- `content/blog/so/posts/foreign-driving-licence-sweden.md`
- `content/blog/ku/posts/foreign-driving-licence-sweden.md`
- `content/blog/pl/posts/zagraniczne-prawo-jazdy-w-szwecji.md`
- `content/blog/fi/posts/ulkomainen-ajokortti-ruotsissa.md`
- `content/blog/bs/posts/strana-vozacka-dozvola-u-svedskoj.md`
- `content/blog/es/posts/carnet-extranjero-en-suecia.md`
- `content/blog/ru/posts/inostrannye-voditelskie-prava-v-shvetsii.md`

Generated HTML routes:

- `blog/foreign-driving-licence-sweden.html`
- `blog/sv/utlandskt-korkort-i-sverige.html`
- `blog/tr/isvecte-yabanci-ehliyet.html`
- `blog/ar/foreign-driving-licence-sweden.html`
- `blog/fa/foreign-driving-licence-sweden.html`
- `blog/so/foreign-driving-licence-sweden.html`
- `blog/ku/foreign-driving-licence-sweden.html`
- `blog/pl/zagraniczne-prawo-jazdy-w-szwecji.html`
- `blog/fi/ulkomainen-ajokortti-ruotsissa.html`
- `blog/bs/strana-vozacka-dozvola-u-svedskoj.html`
- `blog/es/carnet-extranjero-en-suecia.html`
- `blog/ru/inostrannye-voditelskie-prava-v-shvetsii.html`

Official foreign licence guidance was checked on 2026-05-22 against Transportstyrelsen public pages. The English blog archive now includes a card for this topic.

## Driving Licence Process Topic 9

Created the multilingual draft set for "Automatic or manual driving test in Sweden" and regenerated static blog pages.

Draft markdown files:

- `content/blog/en/posts/automatic-vs-manual-licence-sweden.md`
- `content/blog/sv/posts/automat-eller-manuell-korkort.md`
- `content/blog/tr/posts/isvecte-otomatik-mi-manuel-mi.md`
- `content/blog/ar/posts/automatic-vs-manual-licence-sweden.md`
- `content/blog/fa/posts/automatic-vs-manual-licence-sweden.md`
- `content/blog/so/posts/automatic-vs-manual-licence-sweden.md`
- `content/blog/ku/posts/automatic-vs-manual-licence-sweden.md`
- `content/blog/pl/posts/automat-czy-manual-prawo-jazdy-szwecja.md`
- `content/blog/fi/posts/automaatti-vai-manuaali-ajokortti-ruotsi.md`
- `content/blog/bs/posts/automatik-ili-manual-vozacka-svedska.md`
- `content/blog/es/posts/automatico-o-manual-carnet-suecia.md`
- `content/blog/ru/posts/avtomat-ili-mekhanika-prava-shvetsiya.md`

Generated HTML routes include `blog/automatic-vs-manual-licence-sweden.html` plus localized routes under `blog/<lang>/`. Official code 78 guidance was checked on 2026-05-22 against Trafikverket public pages.

## Driving Licence Process Topic 10

Created the multilingual draft set for "Booking theory and driving tests in Sweden" and regenerated static blog pages.

Draft markdown files:

- `content/blog/en/posts/book-theory-driving-test-sweden.md`
- `content/blog/sv/posts/boka-kunskapsprov-korprov.md`
- `content/blog/tr/posts/trafikverket-teori-direksiyon-randevusu.md`
- `content/blog/ar/posts/book-theory-driving-test-sweden.md`
- `content/blog/fa/posts/book-theory-driving-test-sweden.md`
- `content/blog/so/posts/book-theory-driving-test-sweden.md`
- `content/blog/ku/posts/book-theory-driving-test-sweden.md`
- `content/blog/pl/posts/rezerwacja-egzaminu-teoretycznego-praktycznego-szwecja.md`
- `content/blog/fi/posts/teoria-ajokoe-varaus-ruotsi.md`
- `content/blog/bs/posts/rezervacija-teorijskog-prakticnog-ispita-svedska.md`
- `content/blog/es/posts/reservar-examen-teorico-practico-suecia.md`
- `content/blog/ru/posts/zapis-na-teoriyu-i-vozhdenie-shvetsiya.md`

Generated HTML routes include `blog/book-theory-driving-test-sweden.html` plus localized routes under `blog/<lang>/`. Official theory and driving test planning guidance was checked on 2026-05-22 against Trafikverket public pages.

## Driving Licence Process Topic 11

Created the multilingual draft set for "Failed the theory or driving test in Sweden" and regenerated static blog pages.

Draft markdown files include:

- `content/blog/en/posts/what-to-do-if-you-fail-driving-test-sweden.md`
- `content/blog/sv/posts/underkand-pa-teoriprov-eller-korprov.md`
- `content/blog/tr/posts/isvecte-sinavdan-kalinca-ne-yapilir.md`
- localized equivalents under `content/blog/<lang>/posts/`

Generated HTML routes include `blog/what-to-do-if-you-fail-driving-test-sweden.html` plus localized routes under `blog/<lang>/`. Official retake/timing guidance was checked on 2026-05-22 against Trafikverket public pages.

## Driving Licence Process Topic 12

Created the multilingual draft set for "Common mistakes on the Swedish theory test" and regenerated static blog pages.

Draft markdown files include:

- `content/blog/en/posts/theory-test-common-mistakes-sweden.md`
- `content/blog/sv/posts/vanliga-misstag-pa-kunskapsprovet.md`
- `content/blog/tr/posts/isvec-teori-sinavi-sik-hatalar.md`
- localized equivalents under `content/blog/<lang>/posts/`

Generated HTML routes include `blog/theory-test-common-mistakes-sweden.html` plus localized routes under `blog/<lang>/`. Content is based on the Trafikverket category B test format and practical study guidance.

## Driving Licence Process Topic 13

Created the multilingual draft set for "Common mistakes on the Swedish driving test" and regenerated static blog pages.

Draft markdown files include:

- `content/blog/en/posts/driving-test-common-mistakes-sweden.md`
- `content/blog/sv/posts/vanliga-misstag-pa-korprovet.md`
- `content/blog/tr/posts/isvec-direksiyon-sinavi-sik-hatalar.md`
- localized equivalents under `content/blog/<lang>/posts/`

Generated HTML routes include `blog/driving-test-common-mistakes-sweden.html` plus localized routes under `blog/<lang>/`. Content is based on the Trafikverket category B driving test structure and assessment themes.

## Driving Licence Process Topic 14

Created the multilingual draft set for "Winter driving in Sweden" and regenerated static blog pages.

Draft markdown files include:

- `content/blog/en/posts/winter-driving-sweden.md`
- `content/blog/sv/posts/vinterkorning-for-korkort.md`
- `content/blog/tr/posts/isvecte-kis-surusu.md`
- localized equivalents under `content/blog/<lang>/posts/`

Generated HTML routes include `blog/winter-driving-sweden.html` plus localized routes under `blog/<lang>/`. Official winter tyre and seasonal safety guidance was checked on 2026-05-22 against Transportstyrelsen and Trafikverket public pages.

## Driving Licence Process Topic 15

Created the multilingual draft set for "Driving school or private practice in Sweden" and regenerated static blog pages.

Draft markdown files include:

- `content/blog/en/posts/driving-school-private-practice-balance-sweden.md`
- `content/blog/sv/posts/trafikskola-eller-privat-ovningskorning.md`
- `content/blog/tr/posts/surucu-kursu-mu-ozel-pratik-mi.md`
- localized equivalents under `content/blog/<lang>/posts/`

Generated HTML routes include `blog/driving-school-private-practice-balance-sweden.html` plus localized routes under `blog/<lang>/`. Official learner permit, supervisor and practice guidance was checked on 2026-05-22 against Transportstyrelsen public pages.

## Driving Licence Process Topic 16

Created the multilingual draft set for "Eco-driving in Sweden" and regenerated static blog pages.

Draft markdown files include:

- `content/blog/en/posts/eco-driving-sweden.md`
- `content/blog/sv/posts/sparsam-korning-korkort.md`
- `content/blog/tr/posts/isvecte-eco-driving.md`
- localized equivalents under `content/blog/<lang>/posts/`

Generated HTML routes include `blog/eco-driving-sweden.html` plus localized routes under `blog/<lang>/`. Content follows Trafikverket-style safe, planned and environmentally aware driving themes.

## Driving Licence Process Topic 17

Created the multilingual draft set for "Priority rules in Sweden" and regenerated static blog pages.

Draft markdown files include:

- `content/blog/en/posts/priority-rules-sweden.md`
- `content/blog/sv/posts/vajninsregler-hogerregeln.md`
- `content/blog/tr/posts/isvec-oncelik-kurallari.md`
- localized equivalents under `content/blog/<lang>/posts/`

Generated HTML routes include `blog/priority-rules-sweden.html` plus localized routes under `blog/<lang>/`. Content covers give-way signs, stop signs, signals, the right-hand rule and junction planning.

## Driving Licence Process Topic 18

Created the multilingual draft set for "Pedestrians and cyclists in Sweden" and regenerated static blog pages.

Draft markdown files include:

- `content/blog/en/posts/pedestrians-cyclists-sweden.md`
- `content/blog/sv/posts/gaende-och-cyklister-korkort.md`
- `content/blog/tr/posts/isvecte-yayalar-bisikletliler.md`
- localized equivalents under `content/blog/<lang>/posts/`

Generated HTML routes include `blog/pedestrians-cyclists-sweden.html` plus localized routes under `blog/<lang>/`. Content focuses on vulnerable road users, crossings, residential areas, darkness, parked vehicles and city driving observation.

## Driving Licence Process Topics 20-39

Created the remaining multilingual draft sets for the Swedish category B driving licence content plan and regenerated static blog pages.

New topic sets:

- Test day documents, photo and ID
- Traffic signs and road markings
- Speed limits and speed adaptation
- Safety distance and braking distance
- Roundabouts and junctions
- Motorway driving
- Rural roads and wildlife
- Parking and reversing
- Vehicle safety check before driving
- Alcohol, drugs and fatigue in traffic
- Accidents and emergencies
- Railway crossings, buses and trams
- Overtaking and lane changes
- Darkness driving and vehicle lights
- Theory study plan
- Practice test review
- After passing the driving test
- Driving in rain and aquaplaning
- Roadworks and temporary signs
- Children, school zones and residential areas

Draft markdown files were generated for all 12 supported languages under `content/blog/<lang>/posts/`. Generated HTML routes include the English canonical pages under `blog/` and localized equivalents under `blog/<lang>/`.

Also added `CONTENT_WORKLIST.md` to track the full 39-topic content scope. Official process and traffic guidance was checked on 2026-05-22 against Trafikverket and Transportstyrelsen public pages before generating the batch.

## Multilingual Blog Quality Pass

Improved all generated markdown posts with an editorial quality layer on 2026-05-22.

Scope:

- Added a localized practical quality checklist to every post.
- Added a localized mini practice scenario to connect each topic to real driving practice.
- Added a localized official-check reminder pointing readers back to Trafikverket and/or Transportstyrelsen for current legal and process details.
- Cleaned generated double punctuation from the latest batch.
- Localized agency conjunctions in multilingual official-check text.

Result:

- `468` markdown posts contain the `<!-- quality-pass:2026-05-22 -->` marker.
- Shortest post body after the pass is approximately `197` words.
- HTML must be regenerated with `node tools/build-blog.mjs` after this pass.

## SEO Pass

Completed a full SEO pass across markdown content, generated blog HTML and non-blog static HTML on 2026-05-22.

Markdown updates:

- Rewrote `seo_description` for all `468` blog posts.
- All post meta descriptions are unique and within the 120-160 character target range.
- Replaced generated "this guide explains" style introductions with more natural opening text where present.
- Added same-language related guide links to all `468` posts using the `<!-- seo-related:2026-05-22 -->` marker.

Generator updates:

- `tools/build-blog.mjs` now renders markdown links.
- Article pages now include canonical, hreflang alternates, Open Graph, Twitter card metadata and BlogPosting JSON-LD.
- Localized blog index pages now include longer SEO descriptions, alternate hreflang links, Open Graph, Twitter card metadata and CollectionPage JSON-LD.
- Generated redirect pages now include `noindex,follow`.

Static HTML updates:

- Added or corrected title/description/canonical/social metadata for non-blog static HTML pages.
- Added `noindex,follow` to static redirect pages.
- Updated `blog/index.html` with canonical, hreflang, Open Graph, Twitter card metadata and CollectionPage JSON-LD.
- Shortened the legacy `blog/swedish-driving-theory-test-guide.html` meta description and added missing Twitter metadata.

Validation:

- `node tools/build-blog.mjs` built `468` article pages and `11` localized indexes.
- Audited `566` HTML files with `0` SEO head issues.
- Checked `521` blog HTML files with `0` missing relative link targets.
- HTTP smoke-tested homepage, blog index, English/Turkish/Swedish/Arabic articles and the legacy theory guide with SEO metadata present.

## Sitemap Pass

Updated sitemap generation on 2026-05-22 after the multilingual content and SEO pass.

Changes:

- Updated `tools/build-sitemap.mjs` to use `2026-05-22` as `lastmod`.
- Replaced the old hard-coded redirect exclusion list with HTML-aware checks.
- Sitemap generation now excludes pages that contain `http-equiv="refresh"` or `robots` `noindex`.
- Added XML escaping for sitemap locations.
- Regenerated `sitemap.xml`.
- Verified `robots.txt` still points to `https://nordictheorylabs.com/sitemap.xml`.

Validation:

- `node tools/build-sitemap.mjs` built `515` sitemap URLs.
- Sitemap has `0` duplicate URLs.
- Sitemap has `0` missing-file entries.
- Sitemap has `0` redirect or noindex entries.
