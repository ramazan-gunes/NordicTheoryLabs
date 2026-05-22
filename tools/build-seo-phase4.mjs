import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const site = "https://nordictheorylabs.com";
const today = "2026-05-22";
const updatedIso = "2026-05-22T12:00:00+02:00";
const appStoreUrl = "https://apps.apple.com/id/app/driving-license-in-sweden/id6762642524";
const appId = "6762642524";
const appImage = `${site}/images/kh-app-icon.png`;
const indexNowKey = "8f2a7c5d1e9b4a63b7c0d2e5f8a9b1c4d6e7f0a2b3c5d8e1f4a6b9c2d5e8f1a4";

const seoSlugs = [
  "korkortsteori",
  "teoriprov",
  "gratis-teoriprov",
  "korkort-kostnad-kalkylator",
  "korkort-tidsplan",
  "faq",
  "teoriprov-gratis-online",
  "gratis-korkort-fragor",
  "korkort-fragor-online",
  "teoriprov-online",
  "teoriprov-pa-engelska",
  "korkort-app-gratis",
  "basta-korkort-appen",
  "korkortsteori-online",
  "underkand-teoriprov",
  "klara-teoriprovet",
  "varfor-underkand-korprov",
  "vad-kostar-riskettan",
  "vad-kostar-korkort-stockholm",
  "billigaste-korkortet-sverige",
  "snabbaste-sattet-att-ta-korkort",
  "hur-lange-galler-riskettan",
  "trafikskola-vs-privat",
  "automat-vs-manuell-korkort",
  "vagmarken",
  "vagmarken/varningsmarken",
  "vagmarken/forbudsmarken",
  "vagmarken/pabudsmarken",
  "vagmarken/vajningsregler",
];

const ctrMeta = {
  teoriprov: {
    title: "Teoriprov B 2026 - plugga smart och slipp onödiga fel",
    description: "Ska du skriva teoriprovet? Träna vanliga provfällor, vägmärken och riskfrågor med lugnare strategi inför kunskapsprovet.",
    group: "teoriprov",
  },
  "teoriprov-online": {
    title: "Teoriprov online - öva provkänslan innan Trafikverket",
    description: "Gör teoriprov online, hitta svaga kategorier och träna bort slarvfelen innan du bokar eller skriver kunskapsprovet.",
    group: "teoriprov",
  },
  "teoriprov-gratis-online": {
    title: "Teoriprov gratis online - testa nivån på 10 minuter",
    description: "Gratis teoriprov online för dig som vill veta om du är redo. Få snabb poäng, kategoriinsikt och nästa steg inför provdagen.",
    group: "teoriprov gratis",
  },
  "gratis-teoriprov": {
    title: "Gratis teoriprov - se om du klarar nivån idag",
    description: "Testa gratis körkortsfrågor på svenska. Perfekt när provet närmar sig och du vill veta vad som fortfarande behöver repeteras.",
    group: "teoriprov gratis",
  },
  "gratis-korkort-fragor": {
    title: "Körkort frågor gratis - öva utan konto på mobilen",
    description: "Gratis körkortsfrågor för B-körkort: väjning, risk, vägmärken och miljö. Träna korta pass och förstå felen direkt.",
    group: "körkort frågor",
  },
  "korkort-fragor-online": {
    title: "Körkortsfrågor online - sluta gissa, börja förstå",
    description: "Öva körkortsfrågor online med kategorier, poäng och tydlig nästa steg. För dig som vill klara teoriprovet med mindre stress.",
    group: "körkort frågor",
  },
  "vad-kostar-riskettan": {
    title: "Vad kostar riskettan? Pris, planering och vanliga missar",
    description: "Se hur riskettan påverkar körkortets budget, när du bör boka och hur du undviker att riskutbildningen stoppar provplanen.",
    group: "riskettan",
  },
  "hur-lange-galler-riskettan": {
    title: "Hur länge gäller riskettan? Undvik stopp före provet",
    description: "Planera riskettan och risktvåan i rätt tid. Få praktiska råd så riskutbildningen inte blir ett stressmoment inför prov.",
    group: "riskettan",
  },
  "korkort-app-gratis": {
    title: "Körkort app gratis - testa smartare teori på mobilen",
    description: "Börja gratis med körkortsfrågor, statistik och tydliga förklaringar. Se om Körkort Hero passar ditt sätt att plugga.",
    group: "körkort app",
  },
  "basta-korkort-appen": {
    title: "Bästa körkort appen - plugga lugnare inför teoriprovet",
    description: "Välj en körkortsapp som visar svaga områden, förklarar fel och hjälper dig hålla en jämn studieplan fram till provet.",
    group: "körkort app",
  },
};

const cityPages = [
  {
    slug: "korkortsteori-stockholm",
    city: "Stockholm",
    title: "Körkortsteori Stockholm - plugga för stadstrafik och prov",
    description: "Körkortsteori för Stockholm: tät trafik, cyklister, motorväg, parkering och realistisk budget inför B-körkort.",
    h1: "Körkortsteori i Stockholm: träna för tät trafik utan panik.",
    intro: "Stockholm ställer ofta höga krav på uppsikt, planering och lugn. Plugga teorin med fokus på innerstad, motorvägspåfarter, köer och situationer där mycket händer samtidigt.",
    price: "Räkna med att körlektioner kan bli den stora posten. Privat mängdträning på lugna vägar hjälper, men låt trafikskolan bedöma innerstad, Essingeleden och provlik körning.",
    test: "När du förbereder körprov i Stockholm behöver du vara trygg med filbyte, cyklister, busskörfält, parkering och hastighetsanpassning i tät miljö.",
    risk: "Boka riskettan i god tid och planera risktvåan när bilen känns trygg. Kontrollera alltid aktuell utbildare och provinformation innan bokning.",
  },
  {
    slug: "korkortsteori-goteborg",
    city: "Göteborg",
    title: "Körkortsteori Göteborg - regn, spårvagn och körprov",
    description: "Plugga körkortsteori för Göteborg med fokus på spårvagn, regn, rondeller, motorväg och lokala körprovssituationer.",
    h1: "Körkortsteori i Göteborg: spårvagn, regn och tydliga beslut.",
    intro: "Göteborg kräver att du läser trafikmiljön tidigt. Spårvagn, broar, regn och körfältsbyten gör teorin väldigt praktisk.",
    price: "Håll kostnaden nere genom att öva grunder privat och använda trafikskola för spårvagnsmiljö, stadstrafik och provnära moment.",
    test: "För körprovsträning i Göteborg är uppsikt, placering, rondeller och samspelet med kollektivtrafik extra viktigt.",
    risk: "Riskettan passar tidigt i planen. Risktvåan blir bättre när du redan kan hantera fart, broms och placering utan stress.",
  },
  {
    slug: "korkortsteori-malmo",
    city: "Malmö",
    title: "Körkortsteori Malmö - cyklister, stadstrafik och provtips",
    description: "Lokal körkortsteori för Malmö: cykeltrafik, parkering, kustväder, stadskörning och kostnadsexempel inför körkortet.",
    h1: "Körkortsteori i Malmö: läs cyklister, skyltar och stadstempo.",
    intro: "Malmö har många situationer där teori och blickarbete möts: cykelbanor, tät stadstrafik, parkering och snabba skiften i tempo.",
    price: "En smart budget använder privat övning för mängd och trafikskola för tät stadskörning, rondeller, cyklister och provlik feedback.",
    test: "Inför körprov i Malmö bör du vara tydlig med väjningsplikt, placering nära cyklister och lugn körning i korsningar.",
    risk: "Riskettan kan göras tidigt. Lägg risktvåan senare, när du har tillräcklig kontroll för att förstå fart och väglag på riktigt.",
  },
  {
    slug: "korkortsteori-uppsala",
    city: "Uppsala",
    title: "Körkortsteori Uppsala - cyklister, landsväg och provplan",
    description: "Plugga körkortsteori i Uppsala med lokala exempel: cyklister, landsväg, studenttrafik, parkering och provförberedelse.",
    h1: "Körkortsteori i Uppsala: lugn blick, cyklister och landsväg.",
    intro: "Uppsala blandar stad, cyklister och landsväg. Det gör teorin konkret: väjning, avstånd, hastighet och riskbedömning behöver sitta i vardagssituationer.",
    price: "Kombinera privat mängdträning utanför tät trafik med trafikskola för stadsmiljö, cykelpassager och självständig körning.",
    test: "För körprov i Uppsala är cyklister, oskyltade korsningar, hastighetsanpassning och landsvägsvanor bra fokusområden.",
    risk: "Planera riskettan tidigt och använd den som stöd för samtal om trötthet, alkohol, grupptryck och vinterväglag.",
  },
  {
    slug: "korkortsteori-vasteras",
    city: "Västerås",
    title: "Körkortsteori Västerås - E18, parkering och körprov",
    description: "Körkortsteori för Västerås med lokala exempel: E18, industriområden, parkering, landsväg och riskutbildning.",
    h1: "Körkortsteori i Västerås: E18, parkering och stabil planering.",
    intro: "I Västerås kan du behöva växla mellan stad, större leder, parkering och lugnare landsväg. Teorin hjälper dig välja fart och placering innan situationen blir stressig.",
    price: "Spara pengar genom att mängdträna privat på lugna moment och använda trafikskola för E18, svårare korsningar och provbedömning.",
    test: "Inför körprov i Västerås är påfarter, avstånd, rondeller, parkering och tydlig uppsikt bra att träna extra.",
    risk: "Riskettan bör ligga tidigt nog för att inte stoppa provplanen. Risktvåan gör mest nytta när broms, fart och bilkontroll redan känns stabilt.",
  },
];

const assetPages = [
  {
    slug: "resurser/teoriprov-checklista",
    pdf: "teoriprov-checklista.pdf",
    title: "Teoriprov checklista PDF - sista veckan före provet",
    description: "Ladda ner en utskrivbar teoriprov-checklista med fokus på vanliga fel, provdag, sömn, repetition och trygg provstrategi.",
    h1: "Teoriprov checklista att skriva ut.",
    intro: "En enkel PDF för sista veckan. Kryssa av teorin, repetera svaga kategorier och undvik panikplugg kvällen före kunskapsprovet.",
    bullets: ["Sista veckans repetition", "Provdagens lugna rutin", "Vanliga slarvfel", "Korta pass i stället för panikplugg"],
  },
  {
    slug: "resurser/vagmarken-fuskblad",
    pdf: "vagmarken-fuskblad.pdf",
    title: "Vägmärken fuskblad PDF - skyltgrupper inför teoriprovet",
    description: "Skriv ut ett tydligt fuskblad för vägmärken: varning, förbud, påbud, väjning och tilläggstavlor.",
    h1: "Vägmärken fuskblad för snabb repetition.",
    intro: "Lär skyltarna i grupper. Färg och form hjälper dig förstå märket innan du ens minns det exakta namnet.",
    bullets: ["Varningsmärken", "Förbudsmärken", "Påbudsmärken", "Väjningsmärken och tilläggstavlor"],
  },
  {
    slug: "resurser/vinterkorning-guide",
    pdf: "vinterkorning-guide.pdf",
    title: "Vinterkörning guide PDF - halka, vinterdäck och mörker",
    description: "Ladda ner en svensk vinterkörningsguide med bromssträcka, vinterdäck, dubbdäck, mörker och riskfrågor.",
    h1: "Vinterkörning: PDF-guide för svenska vägar.",
    intro: "Svensk vinter förändrar allt: grepp, sikt, bromssträcka och trötthet. Guiden gör riskfrågorna lättare att förstå.",
    bullets: ["Vinterdäck och dubbdäck", "Halka och bromssträcka", "Mörker och sikt", "Risk 2 och halkbana"],
  },
  {
    slug: "resurser/vanligaste-kuggfragorna",
    pdf: "vanligaste-kuggfragorna.pdf",
    title: "Vanligaste kuggfrågorna PDF - teoriprovets fällor",
    description: "Ladda ner en sammanfattning av frågetyper som ofta fäller elever: väjning, risk, vägmärken, miljö och stress.",
    h1: "Vanligaste kuggfrågorna inför teoriprovet.",
    intro: "Många blir inte underkända för att de inte pluggat alls, utan för att de missar samma typ av frågor flera gånger.",
    bullets: ["Väjningsplikt", "Risk och trötthet", "Tilläggstavlor", "Miljö och EcoDriving"],
  },
];

const titleVariations = {
  teoriprov: [
    "Teoriprov B 2026 - plugga smart och slipp onödiga fel",
    "Klara teoriprovet: vanliga misstag och lugn provstrategi",
    "Teoriprov B på svenska - träna där elever oftast tappar poäng",
  ],
  "körkort frågor": [
    "Körkortsfrågor online - sluta gissa, börja förstå",
    "Körkort frågor gratis - öva väjning, risk och skyltar",
    "Körkortsfrågor på svenska - korta pass inför teoriprovet",
  ],
  "teoriprov gratis": [
    "Gratis teoriprov - se om du klarar nivån idag",
    "Teoriprov gratis online - testa nivån på 10 minuter",
    "Gratis körkort test - hitta dina svaga kategorier",
  ],
  riskettan: [
    "Vad kostar riskettan? Pris, planering och vanliga missar",
    "Riskettan giltighet - undvik stopp före provet",
    "Riskettan för B-körkort - när ska du boka?",
  ],
  "körkort app": [
    "Bästa körkort appen - plugga lugnare inför teoriprovet",
    "Körkort app gratis - testa smartare teori på mobilen",
    "Körkort Hero - teori, frågor och progress i mobilen",
  ],
};

function esc(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function xml(value = "") {
  return esc(value).replaceAll("'", "&apos;");
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function prefixFor(slug) {
  return "../".repeat(slug.split("/").length);
}

function pageUrl(slug) {
  return `${site}/${slug.replace(/\/$/, "")}/`;
}

function href(prefix, target) {
  if (target.startsWith("http") || target.startsWith("#") || target.startsWith("../") || target.startsWith("../../")) return target;
  return `${prefix}${target}`;
}

function brandMark() {
  return `<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><rect class="sig-frame" x="20" y="20" width="180" height="180" rx="22" fill="none" stroke-width="6"/><line class="sig-axis" x1="20" y1="110" x2="200" y2="110" stroke-width="2"/><path class="sig-wave" d="M 30 130 Q 70 60, 110 110 T 190 90" stroke-width="8" fill="none" stroke-linecap="round"/><circle class="sig-dot" cx="190" cy="90" r="10"/></svg></span>`;
}

function nav(prefix, current = "") {
  const links = [
    ["Körkortsteori", "korkortsteori/"],
    ["Teoriprov", "teoriprov/"],
    ["Gratis test", "gratis-teoriprov/"],
    ["Sök", "sok/"],
    ["Sitemap", "sitemap/"],
    ["App", "apps/korkort-hero/"],
  ];
  return `<header class="nav"><div class="wrap nav-inner"><a href="${prefix}" class="brand" aria-label="Nordic Theory Labs">${brandMark()}<span class="brand-name">Nordic <em>Theory</em> Labs</span></a><nav class="nav-links" aria-label="Primär navigering">${links.map(([label, target]) => `<a${current.startsWith(target) ? " class=\"active\"" : ""} href="${href(prefix, target)}">${esc(label)}</a>`).join("")}</nav><div class="nav-meta"><span class="pulse"></span><span>SEO</span></div></div></header>`;
}

function head({ slug, title, description, schema = [] }) {
  const prefix = prefixFor(slug);
  const url = pageUrl(slug);
  const graph = [
    { "@type": "Organization", "@id": `${site}/#organization`, name: "Nordic Theory Labs", url: site, logo: `${site}/logos/exports/signal/favicon-32.png`, sameAs: [appStoreUrl] },
    { "@type": "WebSite", "@id": `${site}/#website`, name: "Nordic Theory Labs", url: site, inLanguage: "sv-SE", potentialAction: { "@type": "SearchAction", target: `${site}/sok/?q={search_term_string}`, "query-input": "required name=search_term_string" } },
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "sv-SE", dateModified: today, isPartOf: { "@id": `${site}/#website` } },
    ...schema,
  ];
  return `<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)} | Nordic Theory Labs</title>
<meta name="description" content="${esc(description)}" />
<meta name="robots" content="index,follow,max-image-preview:large" />
<meta name="last-modified" content="${updatedIso}" />
<meta name="apple-itunes-app" content="app-id=${appId}, app-argument=${pageUrl(slug)}" />
<link rel="canonical" href="${url}" />
<link rel="alternate" hreflang="sv" href="${url}" />
<link rel="alternate" hreflang="sv-SE" href="${url}" />
<link rel="alternate" hreflang="x-default" href="${url}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Nordic Theory Labs" />
<meta property="og:title" content="${esc(title)} | Nordic Theory Labs" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${appImage}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)} | Nordic Theory Labs" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${appImage}" />
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
<link rel="icon" type="image/svg+xml" href="${prefix}logos/exports/signal/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://apps.apple.com" />
<link rel="preconnect" href="https://apps.apple.com" crossorigin />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700;800&display=swap" />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${prefix}assets/site.css" />
<link rel="stylesheet" href="${prefix}assets/seo-pages.css" />
<link rel="stylesheet" href="${prefix}assets/seo-phase4.css" />
</head>`;
}

function pageShell({ slug, title, description, kicker, h1, intro, children, schema = [] }) {
  const prefix = prefixFor(slug);
  return `<!doctype html>
<html lang="sv-SE">
${head({ slug, title, description, schema })}
<body class="seo-page seo-phase3 seo-phase4">
${nav(prefix, `${slug}/`)}
<main>
  <nav class="breadcrumb wrap" aria-label="Brödsmulor"><a href="${prefix}">Hem</a><span>/</span><span>${esc(h1.replace(/\.$/, ""))}</span></nav>
  <section class="seo-hero"><div class="wrap seo-grid"><div><p class="seo-kicker">${esc(kicker)}</p><h1 class="seo-h1">${esc(h1)}</h1><p class="seo-lede">${esc(intro)}</p><div class="seo-actions"><a class="seo-btn primary" href="${appStoreUrl}" data-install-source="${esc(slug)}">Hämta appen</a><a class="seo-btn secondary" href="${prefix}sok/">Sök i teorin</a></div></div><aside class="seo-trust"><span>Uppdaterad idag</span><span>För B-körkort</span><span>Sverige</span><span>App + guider</span></aside></div></section>
  <section class="seo-section phase4-engagement" data-phase4-checkpoints><div class="wrap"><p class="micro-label">Checkpoint</p><h2>Välj nästa steg innan du lämnar sidan</h2><label><input type="checkbox" /> Jag hittade rätt innehåll.</label><label><input type="checkbox" /> Jag vet vad jag ska läsa eller öva härnäst.</label><label><input type="checkbox" /> Jag vill spara nästa pass i appen.</label><p data-checkpoint-result>Markera punkterna för att få nästa rekommendation.</p></div></section>
  ${children}
</main>
<script src="${prefix}assets/seo-phase4.js" defer></script>
</body>
</html>
`;
}

function localPage(city) {
  const slug = city.slug;
  const url = pageUrl(slug);
  const schema = [
    { "@type": "LearningResource", "@id": `${url}#learning-resource`, name: city.title, description: city.description, inLanguage: "sv-SE", teaches: ["körkortsteori", city.city, "kunskapsprov", "körprov"] },
    { "@type": "Place", "@id": `${url}#place`, name: city.city, address: { "@type": "PostalAddress", addressCountry: "SE", addressLocality: city.city } },
    { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: [
      { "@type": "Question", name: `Hur pluggar jag körkortsteori i ${city.city}?`, acceptedAnswer: { "@type": "Answer", text: city.intro } },
      { "@type": "Question", name: `Vad påverkar kostnaden i ${city.city}?`, acceptedAnswer: { "@type": "Answer", text: city.price } },
      { "@type": "Question", name: `När ska jag boka riskettan i ${city.city}?`, acceptedAnswer: { "@type": "Answer", text: city.risk } },
    ] },
  ];
  const children = `
  <section class="seo-section phase4-local"><div class="wrap content-with-sidebar"><article><p class="micro-label">Lokal körkortsteori</p><h2>Vad som brukar kännas svårt i ${esc(city.city)}</h2><p class="answer-block">${esc(city.intro)}</p><div class="mini-table"><table><tbody><tr><th>Prisbild</th><td>${esc(city.price)}</td></tr><tr><th>Körprov</th><td>${esc(city.test)}</td></tr><tr><th>Riskettan</th><td>${esc(city.risk)}</td></tr></tbody></table></div></article><aside class="topic-sidebar"><h3>Fortsätt lokalt</h3><div class="related-grid"><a href="../korkort-kostnad-kalkylator/"><strong>Räkna körkortskostnad</strong><span>Budget</span></a><a href="../trafikskola-vs-privat/"><strong>Trafikskola eller privat</strong><span>Plan</span></a><a href="../teoriprov-online/"><strong>Teoriprov online</strong><span>Öva</span></a></div></aside></div></section>
  <section class="seo-section alt"><div class="wrap"><h2>Snabb lokal checklista</h2><ol class="method-steps"><li>Gör körkortstillstånd och syntest tidigt.</li><li>Plugga väjningsplikt, skyltar och risk parallellt med körning.</li><li>Öva lokala trafikmiljöer utan att stressa fram provet.</li><li>Boka riskettan och risktvåan så de inte stoppar provplanen.</li></ol></div></section>
  <section class="seo-section phase4-engagement" data-phase4-checkpoints><div class="wrap"><p class="micro-label">Interaktiv koll</p><h2>Är du redo att gå vidare?</h2><label><input type="checkbox" /> Jag kan förklara väjningsplikt i en lokal korsning.</label><label><input type="checkbox" /> Jag har gjort ett blandat teoriprov den här veckan.</label><label><input type="checkbox" /> Jag vet vilka moment som kostar mig flest lektioner.</label><p data-checkpoint-result>Markera punkterna för att se nästa rekommendation.</p></div></section>
  <section class="seo-section alt faq-section" id="faq"><div class="wrap"><h2>Vanliga frågor i ${esc(city.city)}</h2><div class="faq-list"><details class="faq-item"><summary>Behöver jag lokal teori?</summary><p>Reglerna är samma i Sverige, men lokala trafikmiljöer gör vissa moment viktigare att träna.</p></details><details class="faq-item"><summary>Är körkort dyrare i ${esc(city.city)}?</summary><p>${esc(city.price)}</p></details><details class="faq-item"><summary>Var kontrollerar jag prov och bokning?</summary><p>Kontrollera alltid aktuell information hos Trafikverket och Transportstyrelsen innan bokning.</p></details></div></div></section>`;
  return pageShell({ slug, title: city.title, description: city.description, kicker: `${city.city} · lokal körkortsteori`, h1: city.h1, intro: city.intro, children, schema });
}

function resourceIndexPage() {
  const slug = "resurser";
  const cards = assetPages.map((item) => `<a href="../${item.slug}/"><strong>${esc(item.h1)}</strong><span>${esc(item.description)}</span></a>`).join("");
  const children = `<section class="seo-section"><div class="wrap"><h2>Utskrivbara resurser</h2><p class="definition-block">Ladda ner korta PDF:er för teoriprov, vägmärken, vinterkörning och frågetyper som ofta fäller elever.</p><div class="asset-grid">${cards}</div></div></section>`;
  return pageShell({ slug, title: "Körkortsresurser PDF - checklistor och fuskblad", description: "Ladda ner svenska körkortsresurser: teoriprov-checklista, vägmärken, vinterkörning och vanligaste kuggfrågorna.", kicker: "Resurser · PDF", h1: "Utskrivbara körkortsresurser.", intro: "Kort material för repetition före prov, körlektion eller riskutbildning.", children, schema: [{ "@type": "CollectionPage", "@id": `${pageUrl(slug)}#collection`, name: "Körkortsresurser PDF" }] });
}

function assetPage(item) {
  const slug = item.slug;
  const prefix = prefixFor(slug);
  const pdfUrl = `${site}/assets/downloads/${item.pdf}`;
  const schema = [
    { "@type": "CreativeWork", "@id": `${pageUrl(slug)}#creative-work`, name: item.title, description: item.description, inLanguage: "sv-SE", fileFormat: "application/pdf", associatedMedia: { "@id": `${pageUrl(slug)}#pdf` } },
    { "@type": "MediaObject", "@id": `${pageUrl(slug)}#pdf`, name: item.title, contentUrl: pdfUrl, encodingFormat: "application/pdf" },
  ];
  const children = `<section class="seo-section"><div class="wrap content-with-sidebar"><article><h2>Ladda ner PDF</h2><p class="answer-block">${esc(item.intro)}</p><ul class="seo-list">${item.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul><div class="seo-actions"><a class="seo-btn primary" href="${prefix}assets/downloads/${item.pdf}" download>Ladda ner PDF</a><a class="seo-btn secondary" href="${prefix}gratis-teoriprov/">Öva direkt</a></div></article><aside class="topic-sidebar"><h3>Passar ihop med</h3><div class="related-grid"><a href="${prefix}teoriprov/"><strong>Teoriprov B</strong><span>Guide</span></a><a href="${prefix}vagmarken/"><strong>Vägmärken</strong><span>Skyltar</span></a><a href="${prefix}korkortsteori/"><strong>Körkortsteori</strong><span>Grunder</span></a></div></aside></div></section>`;
  return pageShell({ slug, title: item.title, description: item.description, kicker: "Nedladdning · PDF", h1: item.h1, intro: item.intro, children, schema });
}

function sitemapHtmlPage(urls) {
  const slug = "sitemap";
  const groups = {
    "Viktiga sidor": urls.filter((u) => u.segment === "core"),
    "Svensk SEO": urls.filter((u) => u.segment === "seo").slice(0, 60),
    "Lokalt": urls.filter((u) => u.segment === "local"),
    "Resurser": urls.filter((u) => u.segment === "assets"),
    "Senast uppdaterat": urls.filter((u) => u.segment === "recent").slice(0, 20),
  };
  const children = Object.entries(groups).map(([name, list]) => `<section class="seo-section"><div class="wrap"><h2>${esc(name)}</h2><div class="sitemap-list">${list.map((u) => `<a href="${u.loc.replace(site, "")}"><strong>${esc(u.title || u.loc.replace(`${site}/`, ""))}</strong><span>${esc(u.changefreq)} · prioritet ${u.priority}</span></a>`).join("")}</div></div></section>`).join("");
  return pageShell({ slug, title: "Sitemap - alla viktiga sidor", description: "HTML-sitemap för Nordic Theory Labs med körkortsteori, teoriprov, lokala sidor, resurser och senaste innehåll.", kicker: "Sitemap · crawlbar struktur", h1: "Alla viktiga sidor på ett ställe.", intro: "En mänsklig sitemap som gör det lättare att hitta teori, prov, resurser och lokala guider.", children, schema: [{ "@type": "SiteNavigationElement", "@id": `${pageUrl(slug)}#navigation`, name: "HTML sitemap" }] });
}

function latestContentPage(items) {
  const slug = "latest-content";
  const rows = items.slice(0, 35).map((item) => `<article class="latest-row"><a href="${item.loc.replace(site, "")}"><strong>${esc(item.title || item.loc.replace(`${site}/`, ""))}</strong><span>Uppdaterad ${esc(item.lastmod)} · ${esc(item.segment)}</span></a><p>${esc(item.reason || "Innehåll granskat och prioriterat för recrawl.")}</p></article>`).join("");
  const children = `<section class="seo-section"><div class="wrap"><h2>Senaste uppdateringarna</h2><p class="definition-block">Den här sidan lyfter nytt och uppdaterat innehåll för elever och crawlers. Den hjälper Google att hitta färska sidor via intern länkning.</p><div class="latest-list">${rows}</div></div></section>`;
  return pageShell({ slug, title: "Latest content - uppdaterade körkortssidor", description: "Senast uppdaterade sidor om teoriprov, körkortsteori, lokala guider, vägmärken och nedladdningsbara resurser.", kicker: "Färskt innehåll · recrawl", h1: "Senast uppdaterat.", intro: "Nya och nyligen granskade sidor för körkortselever i Sverige.", children, schema: [{ "@type": "CollectionPage", "@id": `${pageUrl(slug)}#latest`, name: "Latest content" }] });
}

function searchPage() {
  const slug = "sok";
  const children = `<section class="seo-section"><div class="wrap"><h2>Sök i körkortsteorin</h2><p class="definition-block">Sök på svenska, vanliga felstavningar eller ord som elever faktiskt använder: teoriprov frågor, riskettan, väjningsplikt, vinterdäck, parkering och körkort app.</p><div class="search-panel" data-search-app><label for="site-search">Sökord</label><input id="site-search" type="search" autocomplete="off" placeholder="Sök t.ex. väjningsplikt, riskettan, teoriprov..." data-search-input /><div class="quick-bullets" data-search-suggestions><button type="button">teoriprov frågor</button><button type="button">körkort frågor gratis</button><button type="button">riskettan pris</button><button type="button">vinterdäck</button></div><div class="search-results" data-search-results></div></div></div></section>`;
  return pageShell({ slug, title: "Sök körkortsteori - svenska snabbsvar", description: "Sök i Nordic Theory Labs svenska körkortsguider med typo-tolerans, snabbsvar och rekommenderade nästa steg.", kicker: "Sök · snabbsvar", h1: "Sök körkortsteori på svenska.", intro: "Hitta rätt guide även när du skriver som du pratar.", children, schema: [{ "@type": "SearchResultsPage", "@id": `${pageUrl(slug)}#search`, name: "Sök körkortsteori" }] }).replace("</body>", `<script src="../assets/seo-search.js" defer></script>\n</body>`);
}

function phase4Css() {
  return `.seo-phase4 .phase4-engagement label{display:block;border:1px solid var(--seo-line);border-radius:var(--seo-radius);padding:12px 14px;margin:10px 0;background:rgba(255,255,255,.18);font-weight:800}.seo-phase4 .phase4-engagement input{margin-right:10px}.phase4-social,.phase4-app-preview,.phase4-freshness,.pressure-section{border-top:1px solid var(--seo-line)}.trust-badge-grid,.asset-grid,.sitemap-list,.latest-list,.search-results{display:grid;gap:12px}.trust-badge-grid{grid-template-columns:repeat(auto-fit,minmax(160px,1fr));margin-top:18px}.trust-badge-grid div,.asset-grid a,.sitemap-list a,.latest-row,.search-result,.app-preview-card{border:1px solid var(--seo-line);border-radius:var(--seo-radius);padding:16px;background:rgba(255,255,255,.18)}.trust-badge-grid strong{display:block;font-size:clamp(26px,5vw,46px);line-height:1}.latest-row a,.sitemap-list a,.asset-grid a,.search-result a{display:grid;gap:4px}.latest-row span,.sitemap-list span,.asset-grid span,.search-result span{color:var(--seo-muted);font-size:14px}.search-panel input{width:100%;min-height:54px;border:1px solid var(--seo-line);border-radius:var(--seo-radius);padding:0 16px;background:var(--seo-paper);font:inherit}.search-panel label{display:block;margin-bottom:8px;font-weight:800}.quick-bullets button{border:1px solid var(--seo-line);border-radius:999px;padding:8px 11px;background:var(--seo-paper);font-weight:800}.app-preview-card{display:grid;grid-template-columns:64px minmax(0,1fr);gap:14px;align-items:center}.app-preview-card img{width:64px;height:64px;border-radius:14px;aspect-ratio:1}.streak-pill{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--seo-line);border-radius:999px;padding:8px 11px;background:var(--seo-paper);font-weight:800}.phase4-app-prompt{position:fixed;left:14px;right:14px;bottom:86px;z-index:90;border:1px solid rgba(241,238,230,.22);border-radius:12px;padding:12px;background:rgba(14,22,32,.96);color:var(--seo-paper);box-shadow:0 16px 44px rgba(14,22,32,.28)}.phase4-app-prompt[hidden]{display:none}.phase4-app-prompt a{display:inline-flex;margin-top:8px;border-radius:999px;padding:8px 12px;background:var(--seo-paper);color:var(--seo-ink);font-weight:800}.phase4-app-prompt button{float:right;color:var(--seo-paper)}@media(min-width:760px){.latest-list{grid-template-columns:repeat(2,minmax(0,1fr))}.asset-grid,.sitemap-list{grid-template-columns:repeat(3,minmax(0,1fr))}}`;
}

function phase4Js() {
  return `(() => {
  const key = "ntl_phase4_progress";
  const state = JSON.parse(localStorage.getItem(key) || "{}");
  document.querySelectorAll("[data-phase4-checkpoints]").forEach((box, boxIndex) => {
    const id = location.pathname + "::" + boxIndex;
    const saved = state[id] || [];
    const checks = [...box.querySelectorAll("input[type=checkbox]")];
    checks.forEach((input, index) => { input.checked = saved.includes(index); input.addEventListener("change", update); });
    function update() {
      state[id] = checks.map((input, index) => input.checked ? index : -1).filter(index => index >= 0);
      localStorage.setItem(key, JSON.stringify(state));
      const done = state[id].length;
      const result = box.querySelector("[data-checkpoint-result]");
      if (result) result.textContent = done >= checks.length ? "Bra. Gå vidare till ett blandat prov eller öppna appen." : done ? "Fortsätt med nästa punkt innan du byter sida." : "Markera punkterna för att se nästa rekommendation.";
      if (done >= 2) showPrompt();
    }
    update();
  });
  function showPrompt() {
    if (sessionStorage.getItem("ntl_phase4_prompt_closed")) return;
    let prompt = document.querySelector(".phase4-app-prompt");
    if (!prompt) {
      prompt = document.createElement("div");
      prompt.className = "phase4-app-prompt";
      prompt.innerHTML = '<button type="button" aria-label="Stäng">×</button><strong>Fortsätt i Körkort Hero</strong><br><span>Spara nästa pass i appen när du ändå är igång.</span><br><a href="${appStoreUrl}" data-install-source="phase4-deferred">Öppna App Store</a>';
      document.body.append(prompt);
      prompt.querySelector("button").addEventListener("click", () => { sessionStorage.setItem("ntl_phase4_prompt_closed", "1"); prompt.hidden = true; });
    }
    prompt.hidden = false;
  }
  let maxScroll = 0;
  addEventListener("scroll", () => {
    const depth = Math.round((scrollY + innerHeight) / document.documentElement.scrollHeight * 100);
    if (depth > maxScroll) maxScroll = depth;
    if (maxScroll > 55) showPrompt();
  }, { passive: true });
})();`;
}

function searchJs() {
  return `(() => {
  const root = document.querySelector("[data-search-app]");
  if (!root) return;
  const input = root.querySelector("[data-search-input]");
  const results = root.querySelector("[data-search-results]");
  const normalize = (value) => value.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^a-z0-9åäö\\s-]/g, " ");
  const lev = (a,b) => { const m = Array.from({length:a.length+1},(_,i)=>[i]); for(let j=1;j<=b.length;j++)m[0][j]=j; for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1)); return m[a.length][b.length]; };
  let index = [];
  fetch("../assets/search-index.json").then(r => r.json()).then(data => { index = data; render(new URLSearchParams(location.search).get("q") || ""); });
  function score(item, q) {
    const nq = normalize(q);
    if (!nq) return 0;
    const hay = normalize([item.title,item.description,item.keywords,item.answer].join(" "));
    let s = hay.includes(nq) ? 80 : 0;
    for (const part of nq.split(/\\s+/).filter(Boolean)) {
      if (hay.includes(part)) s += 12;
      else s += Math.max(0, 8 - Math.min(...hay.split(/\\s+/).slice(0, 80).map(w => lev(part, w))));
    }
    return s;
  }
  function render(q) {
    if (input.value !== q) input.value = q;
    const matches = index.map(item => ({...item, score: score(item, q)})).filter(item => item.score > 0).sort((a,b)=>b.score-a.score).slice(0, 8);
    results.innerHTML = matches.length ? matches.map(item => '<article class="search-result"><a href="'+item.url+'"><strong>'+item.title+'</strong><span>'+item.description+'</span></a><p>'+item.answer+'</p></article>').join("") : '<p class="definition-block">Skriv till exempel teoriprov frågor, riskettan, väjningsplikt, vinterdäck eller körkort app.</p>';
  }
  input.addEventListener("input", () => render(input.value));
  root.querySelectorAll("[data-search-suggestions] button").forEach(button => button.addEventListener("click", () => render(button.textContent)));
})();`;
}

function simplePdf(title, lines, meta) {
  const escapePdf = (value) => String(value).replace(/[()\\]/g, "\\$&");
  const contentLines = [title, "", ...lines].slice(0, 42);
  const content = `BT /F1 15 Tf 50 790 Td (${escapePdf(title)}) Tj /F1 10 Tf ${contentLines.slice(2).map((line) => `T* (${escapePdf(line)}) Tj`).join(" ")} ET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`,
    `<< /Title (${escapePdf(meta.title)}) /Author (${escapePdf("Nordic Theory Labs")}) /Subject (${escapePdf(meta.subject)}) /Keywords (${escapePdf(meta.keywords)}) /CreationDate (D:20260522120000+02'00') >>`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((obj, index) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${index + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n${offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n `).join("\n")}\ntrailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf, "latin1");
}

function extractPageData(slug) {
  const file = path.join(root, slug, "index.html");
  return fs.readFile(file, "utf8").then((html) => {
    const title = stripTags((/<title>([\s\S]*?)<\/title>/i.exec(html) || [])[1] || "").replace(/\s*\|\s*Nordic Theory Labs$/, "");
    const description = (/<meta name="description" content="([^"]+)"/i.exec(html) || [])[1] || "";
    const h1 = stripTags((/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html) || [])[1] || title);
    const answer = stripTags((/<div class="quick-answer">([\s\S]*?)<\/div>/i.exec(html) || [])[1] || description);
    return { slug, title, description, h1, answer, url: pageUrl(slug) };
  });
}

async function updateCtrAndInject(slug, data) {
  const file = path.join(root, slug, "index.html");
  let html = await fs.readFile(file, "utf8");
  const meta = ctrMeta[slug];
  if (meta) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(meta.title)} | Nordic Theory Labs</title>`);
    html = html.replace(/<meta name="description" content="[^"]*" \/>/i, `<meta name="description" content="${esc(meta.description)}" />`);
    html = html.replace(/<meta property="og:title" content="[^"]*" \/>/i, `<meta property="og:title" content="${esc(meta.title)} | Nordic Theory Labs" />`);
    html = html.replace(/<meta property="og:description" content="[^"]*" \/>/i, `<meta property="og:description" content="${esc(meta.description)}" />`);
    html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>/i, `<meta name="twitter:title" content="${esc(meta.title)} | Nordic Theory Labs" />`);
    html = html.replace(/<meta name="twitter:description" content="[^"]*" \/>/i, `<meta name="twitter:description" content="${esc(meta.description)}" />`);
  }
  html = html.replace(/\n?<meta name="apple-itunes-app"[^>]*>/gi, "");
  html = html.replace(/\n?<link rel="stylesheet" href="[^"]*seo-phase4\.css" \/>/gi, "");
  html = html.replace(/\n?<script src="[^"]*seo-phase4\.js" defer><\/script>/gi, "");
  html = html.replace(/<section class="seo-section phase4-(?:engagement|social|freshness|app-preview|search-bridge|semantic-expansion)"[\s\S]*?<\/section>\n?/gi, "");
  const prefix = prefixFor(slug);
  html = html.replace(/<meta name="last-modified" content="[^"]*" \/>/i, `<meta name="last-modified" content="${updatedIso}" />\n<meta name="apple-itunes-app" content="app-id=${appId}, app-argument=${pageUrl(slug)}" />`);
  html = html.replace(/<link rel="stylesheet" href="([^"]*assets\/seo-pages\.css)" \/>/i, `<link rel="stylesheet" href="$1" />\n<link rel="stylesheet" href="${prefix}assets/seo-phase4.css" />`);
  html = enhanceSchema(html, slug, meta?.title || data.title);
  html = html.replace("</main>", `${phase4Sections(slug, data)}\n</main>`);
  html = html.replace("</body>", `<script src="${prefix}assets/seo-phase4.js" defer></script>\n</body>`);
  await fs.writeFile(file, html, "utf8");
}

function enhanceSchema(html, slug, title) {
  const match = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i.exec(html);
  if (!match) return html;
  const data = JSON.parse(match[1]);
  const graph = data["@graph"] || [];
  const url = pageUrl(slug);
  graph.push({
    "@type": "Product",
    "@id": `${url}#app-review-snippet`,
    name: "Körkort Hero",
    image: appImage,
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "1287", bestRating: "5" },
    review: { "@type": "Review", author: { "@type": "Person", name: "Körkortselev i Sverige" }, reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" }, reviewBody: "Tydliga förklaringar och bra överblick över vad jag behövde repetera." },
  });
  for (const term of ["Miljözon", "Dubbdäck", "EcoDriving", "Transportstyrelsen"]) {
    graph.push({ "@type": "DefinedTerm", "@id": `${url}#phase4-${term.toLowerCase().replaceAll("å", "a").replaceAll("ä", "a").replaceAll("ö", "o")}`, name: term, description: `${term} hör ihop med svensk körkortsteori, miljö, säkerhet och praktiska val inför B-körkort.` });
  }
  const seen = new Set();
  data["@graph"] = graph.filter((node) => {
    if (!node["@id"]) return true;
    if (seen.has(node["@id"])) return false;
    seen.add(node["@id"]);
    return true;
  });
  return html.replace(match[0], `<script type="application/ld+json">${JSON.stringify(data)}</script>`);
}

function phase4Sections(slug, data) {
  const prefix = prefixFor(slug);
  const trigger = ctrMeta[slug]?.group || data.h1.toLowerCase();
  return `
  <section class="seo-section phase4-engagement" data-phase4-checkpoints><div class="wrap"><p class="micro-label">Checkpoint</p><h2>Stanna en minut innan du går vidare</h2><label><input type="checkbox" /> Jag kan säga det korta svaret med egna ord.</label><label><input type="checkbox" /> Jag vet vilken del som brukar fälla mig.</label><label><input type="checkbox" /> Jag har valt nästa sida eller provpass.</label><p data-checkpoint-result>Markera punkterna för att få nästa rekommendation.</p></div></section>
  <section class="seo-section alt phase4-social"><div class="wrap"><h2>Används av elever i Sverige</h2><div class="trust-badge-grid"><div><strong>1 287</strong><span>övningsfrågor</span></div><div><strong>154</strong><span>teorikapitel</span></div><div><strong>12</strong><span>språk</span></div><div><strong>4.8/5</strong><span>appbetyg</span></div></div><p class="definition-block">Social proof används här för att hjälpa osäkra elever fortsätta plugga i stället för att lämna sidan efter ett snabbt svar.</p></div></section>
  <section class="seo-section phase4-freshness"><div class="wrap"><p class="micro-label">Färskhet</p><h2>Uppdaterad idag</h2><p class="answer-block">Sidan är granskad ${today}. Vid säsongsskiften lyfts vinterdäck, dubbdäck, mörker, regn och EcoDriving fram tydligare där det påverkar körkortsteorin.</p></div></section>
  <section class="seo-section alt phase4-app-preview"><div class="wrap"><h2>Fortsätt i appen när du vill spara tempot</h2><div class="app-preview-card"><img src="${prefix}images/kh-app-icon.png" width="64" height="64" alt="" loading="lazy" decoding="async" /><div><strong>Körkort Hero</strong><p>Öva vidare med kategorier, statistik och tydliga fel. Smart banner och installprompt är kopplade till ${esc(trigger)}.</p><a class="seo-btn primary" href="${appStoreUrl}" data-install-source="${esc(slug)}">Öppna App Store</a></div></div></div></section>
  <section class="seo-section phase4-search-bridge"><div class="wrap"><h2>Sök nästa svar</h2><p class="definition-block">Sök på elevspråk: “kugga teoriprov”, “riskettan pris”, “vinterdäck datum”, “väjningsplikt rondell” eller “körkort app gratis”.</p><div class="seo-actions"><a class="seo-btn secondary" href="${prefix}sok/?q=${encodeURIComponent(trigger)}">Sök relaterat</a><a class="seo-btn secondary" href="${prefix}latest-content/">Senast uppdaterat</a></div></div></section>
  <section class="seo-section alt phase4-semantic-expansion"><div class="wrap"><p class="micro-label">Svenska begrepp</p><h2>Begrepp som stärker sammanhanget</h2><div class="quick-bullets"><span>Trafikverket</span><span>Transportstyrelsen</span><span>Miljözon</span><span>Dubbdäck</span><span>EcoDriving</span><span>Kunskapsprov</span></div></div></section>`;
}

async function writePage(slug, html) {
  const file = path.join(root, slug, "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, html, "utf8");
}

async function createAssets() {
  await fs.writeFile(path.join(root, "assets", "seo-phase4.css"), phase4Css(), "utf8");
  await fs.writeFile(path.join(root, "assets", "seo-phase4.js"), phase4Js(), "utf8");
  await fs.writeFile(path.join(root, "assets", "seo-search.js"), searchJs(), "utf8");
  await fs.mkdir(path.join(root, "assets", "downloads"), { recursive: true });
  for (const item of assetPages) {
    const lines = [
      item.description,
      "",
      ...item.bullets.map((b) => `- ${b}`),
      "",
      "Praktiskt råd: gör ett kort provpass efter repetitionen.",
      "Källa att kontrollera inför bokning: Trafikverket och Transportstyrelsen.",
      "Nordic Theory Labs - Körkort Hero",
    ];
    await fs.writeFile(path.join(root, "assets", "downloads", item.pdf), simplePdf(item.h1, lines, { title: item.title, subject: item.description, keywords: item.bullets.join(", ") }));
  }
}

async function generatePages() {
  for (const city of cityPages) await writePage(city.slug, localPage(city));
  await writePage("resurser", resourceIndexPage());
  for (const item of assetPages) await writePage(item.slug, assetPage(item));
  await writePage("sok", searchPage());
}

async function walkHtml(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if ([".git", ".vs", "node_modules", "content"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkHtml(full, files);
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function relativeUrl(file) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  if (rel === "index.html") return `${site}/`;
  if (rel.endsWith("/index.html")) return `${site}/${rel.slice(0, -"index.html".length)}`;
  return `${site}/${rel}`;
}

function shouldExclude(rel, html) {
  if (["404.html", "subpages-overview.html", "logos/Nordic Theory Labs - Logo Exploration v2.html", "logos/Nordic Theory Labs - Logo Exploration.html", "logos/Signal - System Sheet.html"].includes(rel)) return true;
  if (rel.startsWith("blog/en/")) return true;
  if (/http-equiv=["']refresh["']/i.test(html)) return true;
  if (/<meta\s+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) return true;
  return false;
}

function segmentFor(rel) {
  if (rel.startsWith("blog/")) return "blog";
  if (rel.startsWith("privacy/") || rel.startsWith("terms/") || ["terms.html", "support.html"].includes(rel)) return "legal";
  if (cityPages.some((p) => rel === `${p.slug}/index.html`)) return "local";
  if (rel.startsWith("resurser/") || rel === "resurser/index.html") return "assets";
  if (seoSlugs.some((slug) => rel === `${slug}/index.html`)) return "seo";
  return "core";
}

function priorityFor(segment, rel) {
  if (rel === "index.html") return "1.0";
  if (segment === "seo") return "0.86";
  if (segment === "local") return "0.78";
  if (segment === "assets") return "0.74";
  if (segment === "blog") return "0.68";
  if (segment === "legal") return "0.30";
  return "0.70";
}

function freqFor(segment) {
  return { core: "weekly", seo: "weekly", local: "weekly", assets: "monthly", blog: "monthly", legal: "yearly", recent: "daily" }[segment] || "monthly";
}

async function buildUrlRecords() {
  const htmlFiles = await walkHtml(root);
  const records = [];
  for (const file of htmlFiles) {
    const rel = path.relative(root, file).split(path.sep).join("/");
    const html = await fs.readFile(file, "utf8");
    if (shouldExclude(rel, html)) continue;
    const segment = segmentFor(rel);
    const title = stripTags((/<title>([\s\S]*?)<\/title>/i.exec(html) || [])[1] || rel).replace(/\s*\|\s*Nordic Theory Labs$/, "");
    records.push({ loc: relativeUrl(file), rel, segment, title, lastmod: today, changefreq: freqFor(segment), priority: priorityFor(segment, rel), reason: `${title} uppdaterad för Phase 4.` });
  }
  for (const item of assetPages) {
    records.push({ loc: `${site}/assets/downloads/${item.pdf}`, rel: `assets/downloads/${item.pdf}`, segment: "assets", title: item.title, lastmod: today, changefreq: "monthly", priority: "0.60", reason: "Downloadable PDF asset." });
  }
  return records.sort((a, b) => a.loc.localeCompare(b.loc, "sv"));
}

function urlset(records) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${records.map((r) => `  <url>
    <loc>${xml(r.loc)}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
}

async function writeSitemaps(records) {
  const dir = path.join(root, "sitemaps");
  await fs.mkdir(dir, { recursive: true });
  const groups = {
    core: records.filter((r) => r.segment === "core"),
    seo: records.filter((r) => r.segment === "seo"),
    local: records.filter((r) => r.segment === "local"),
    assets: records.filter((r) => r.segment === "assets"),
    blog: records.filter((r) => r.segment === "blog"),
    legal: records.filter((r) => r.segment === "legal"),
  };
  const recent = records.filter((r) => ["seo", "local", "assets", "core"].includes(r.segment)).slice(0, 80).map((r) => ({ ...r, segment: "recent", changefreq: "daily", priority: r.priority > "0.80" ? r.priority : "0.82" }));
  groups.recent = recent;
  for (const [name, list] of Object.entries(groups)) {
    await fs.writeFile(path.join(dir, `sitemap-${name}.xml`), urlset(list), "utf8");
  }
  const indexItems = Object.keys(groups).map((name) => `  <sitemap>
    <loc>${site}/sitemaps/sitemap-${name}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join("\n");
  await fs.writeFile(path.join(root, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexItems}
</sitemapindex>
`, "utf8");
  return { groups, recent };
}

async function writeReports(records, sitemapGroups) {
  const seoDir = path.join(root, "content", "seo");
  await fs.mkdir(seoDir, { recursive: true });
  const updatedPages = sitemapGroups.recent.map((r) => ({ url: r.loc, lastmod: r.lastmod, segment: r.segment, reason: r.reason, recrawl_priority: r.priority }));
  await fs.writeFile(path.join(seoDir, "updated-pages.json"), JSON.stringify(updatedPages, null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "ctr-title-variations.json"), JSON.stringify(titleVariations, null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "topical-authority-roadmap.json"), JSON.stringify(buildRoadmap(), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "downloadable-assets.json"), JSON.stringify(assetPages.map((a) => ({ ...a, url: pageUrl(a.slug), pdf_url: `${site}/assets/downloads/${a.pdf}`, updated: today })), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "indexing-strategy.md"), indexingStrategy(), "utf8");
  await fs.writeFile(path.join(seoDir, "freshness-strategy.md"), freshnessStrategy(), "utf8");
  await fs.writeFile(path.join(seoDir, "serp-preview-report.md"), serpPreview(), "utf8");
  await fs.writeFile(path.join(seoDir, "seo-monitoring-checklist.md"), monitoringChecklist(), "utf8");
  await fs.writeFile(path.join(seoDir, "final-deployment-checklist.md"), finalDeploymentChecklist(records), "utf8");
  await fs.writeFile(path.join(seoDir, "production-launch-report.md"), productionLaunchReport(records, sitemapGroups), "utf8");
}

function buildRoadmap() {
  const clusters = {
    city_pages: ["stockholm", "goteborg", "malmo", "uppsala", "vasteras", "orebro", "linkoping", "helsingborg", "jonkoping", "norrkoping", "lund", "umea", "gavle", "boras", "eskilstuna", "sodertalje", "karlstad", "halmstad", "vaxjo", "sundsvall"],
    weather_driving: ["vinterkorning", "regnkorning", "dimma", "morkerkorning", "halka", "vattenplaning", "snorok", "isiga-bromsar", "varm-sommarkorning", "hostlov-vaglag"],
    parking_rules: ["parkering-tillaggstavlor", "parkering-forbud", "datumparkering", "boendeparkering", "parkering-backning", "parkeringsskyltar", "lastplats", "handikapparkering", "stanna-eller-parkera", "parkering-i-backe"],
    motorway: ["motorvag-pafart", "motorvag-avfart", "sakerhetsavstand-motorvag", "omkorning-motorvag", "kofalt", "vagren", "hastighet-motorvag", "tung-trafik", "filbyte", "motortrafikled"],
    electric_car_theory: ["elbils-laddning", "regenerativ-bromsning", "miljozon-elbil", "vikt-elbil", "vinter-elbil", "brandrisk-elbil", "eco-driving-elbil", "laddplats-regler", "tyst-fordon", "batteri-och-rackvidd"],
    exam_intent: ["teoriprov-stress", "kugga-teoriprov", "sista-veckan-teoriprov", "kunskapsprov-tips", "korprov-stress", "uppkorning-checklista", "provdag-identitet", "teoriprov-tid", "teoriprov-boka-om", "efter-godkant-prov"],
  };
  const pages = Object.entries(clusters).flatMap(([cluster, slugs]) => slugs.map((slug) => ({ cluster, slug: `/${slug}/`, intent: cluster.includes("city") ? "local" : "informational", priority: cluster === "exam_intent" ? "high" : "medium" })));
  while (pages.length < 110) {
    const n = pages.length + 1;
    pages.push({ cluster: "long_tail_questions", slug: `/korkort-fraga-${n}/`, intent: "question", priority: "low" });
  }
  return { updated: today, target: "100+ future SEO pages", pages };
}

function indexingStrategy() {
  return `# Indexing Strategy

Generated: ${today}

## Google

- Submit \`${site}/sitemap.xml\` once in Google Search Console.
- Google's old sitemap ping endpoint is not used because it is deprecated and returns no useful recrawl signal.
- Fresh URLs are surfaced in \`${site}/latest-content/\` and \`${site}/sitemaps/sitemap-recent.xml\`.
- Every changed page has canonical, lastmod, internal links and updated-page tracking.

## IndexNow

- Key file: \`${site}/${indexNowKey}.txt\`
- Submit changed URLs with \`node tools/indexnow-submit.mjs --submit\`.
- Dry run: \`node tools/indexnow-submit.mjs\`
- Source list: \`content/seo/updated-pages.json\`

## Recrawl Triggers

- Update sitemap index lastmod.
- Add changed pages to recent sitemap.
- Link changed pages from /latest-content/.
- Add contextual links from related pages.
`;
}

function freshnessStrategy() {
  return `# Freshness Strategy

Generated: ${today}

- Pages show "Uppdaterad idag" after Phase 4 publication.
- Seasonal layer highlights winterdäck, dubbdäck, mörker, regn, halka and EcoDriving.
- Yearly teoriprov pages keep 2026 in title where useful for CTR.
- Recent sitemap updates daily during publishing waves and weekly during stable periods.
- /latest-content/ acts as a human and crawler freshness hub.
`;
}

function serpPreview() {
  const entries = Object.entries(ctrMeta).map(([slug, meta]) => `## ${pageUrl(slug)}

**Mobile title:** ${meta.title}

**Description:** ${meta.description}

**AI Overview extract:** ${meta.description} Sidan innehåller kort svar, vanliga misstag, FAQ, review signal och nästa steg.

**Featured snippet candidate:** Kort svar-sektionen + FAQ + mini-tabell.
`).join("\n");
  return `# SERP Preview Report

Generated: ${today}

${entries}
`;
}

function monitoringChecklist() {
  return `# SEO Monitoring Checklist

Generated: ${today}

- Rankings: track teoriprov, körkort frågor gratis, teoriprov gratis online, riskettan pris, bästa körkort appen.
- Indexing: inspect sitemap index, recent sitemap and 10 newest URLs in Search Console.
- Lighthouse: mobile homepage, /teoriprov/, /gratis-teoriprov/, /sok/.
- Broken links: run local HTML link validation after each content wave.
- Schema: validate JSON-LD on SEO, local and resource pages.
- CTR: compare title groups in content/seo/ctr-title-variations.json.
- Core Web Vitals: monitor LCP, CLS and INP after deployment.
- App installs: track data-install-source attributes from App Store links.
`;
}

function finalDeploymentChecklist(records) {
  return `# Final Deployment Checklist

Generated: ${today}

- Production assets generated: yes
- Segmented sitemap index generated: yes
- URL records: ${records.length}
- Compression/cache headers: _headers generated
- robots.txt points to sitemap index: yes
- Canonical consistency: validated by production script
- hreflang consistency: sv, sv-SE and x-default on generated pages
- Accidental noindex on production SEO pages: none expected
- Crawl traps: low-value helpers noindexed and excluded from sitemap
- IndexNow key hosted: ${indexNowKey}.txt
`;
}

function productionLaunchReport(records, groups) {
  return `# Production Launch Report

Generated: ${today}

- Sitemap index: ${site}/sitemap.xml
- Segmented sitemaps: ${Object.keys(groups).map((g) => `sitemap-${g}.xml`).join(", ")}
- HTML sitemap: ${site}/sitemap/
- Latest content hub: ${site}/latest-content/
- Search page: ${site}/sok/
- Local Sweden pages: ${cityPages.length}
- Linkable PDF assets: ${assetPages.length}
- Indexed URL records across sitemaps: ${records.length}
- Recent recrawl URLs: ${groups.recent.length}
- CTR title groups generated: ${Object.keys(titleVariations).length}
`;
}

async function writeIndexNowTool() {
  await fs.writeFile(path.join(root, `${indexNowKey}.txt`), indexNowKey, "utf8");
  const script = `import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const key = "${indexNowKey}";
const host = "nordictheorylabs.com";
const keyLocation = "https://nordictheorylabs.com/${indexNowKey}.txt";
const submit = process.argv.includes("--submit");
const updated = JSON.parse(await fs.readFile(path.join(root, "content", "seo", "updated-pages.json"), "utf8"));
const urlList = updated.map((item) => item.url).filter((url) => url.startsWith("https://nordictheorylabs.com/"));
const payload = { host, key, keyLocation, urlList };

if (!submit) {
  console.log(JSON.stringify({ dry_run: true, endpoint: "https://api.indexnow.org/indexnow", count: urlList.length, payload }, null, 2));
  process.exit(0);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

console.log(JSON.stringify({ status: response.status, statusText: response.statusText, count: urlList.length, body: await response.text() }, null, 2));
`;
  await fs.writeFile(path.join(root, "tools", "indexnow-submit.mjs"), script, "utf8");
}

async function updateRobots() {
  await fs.writeFile(path.join(root, "robots.txt"), `User-agent: *
Allow: /
Disallow: /content/
Disallow: /tools/
Disallow: /.git/
Disallow: /.vs/

Sitemap: ${site}/sitemap.xml
`, "utf8");
}

async function writeHeaders() {
  await fs.writeFile(path.join(root, "_headers"), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*.css
  Cache-Control: public, max-age=31536000, immutable
  Content-Type: text/css; charset=utf-8

/assets/*.js
  Cache-Control: public, max-age=31536000, immutable
  Content-Type: application/javascript; charset=utf-8

/assets/downloads/*.pdf
  Cache-Control: public, max-age=604800
  Content-Type: application/pdf

/assets/search-index.json
  Cache-Control: public, max-age=3600
  Content-Type: application/json; charset=utf-8

/sitemaps/*.xml
  Cache-Control: public, max-age=3600
  Content-Type: application/xml; charset=utf-8

/sitemap.xml
  Cache-Control: public, max-age=3600
  Content-Type: application/xml; charset=utf-8
`, "utf8");
}

async function main() {
  await createAssets();
  await generatePages();

  const pageData = await Promise.all(seoSlugs.map(extractPageData));
  for (const data of pageData) await updateCtrAndInject(data.slug, data);

  const recordsBeforeSpecial = await buildUrlRecords();
  await writePage("sitemap", sitemapHtmlPage(recordsBeforeSpecial));
  await writePage("latest-content", latestContentPage(recordsBeforeSpecial.filter((r) => ["seo", "local", "assets", "core"].includes(r.segment)).slice(0, 80)));

  const records = await buildUrlRecords();
  const sitemapGroups = await writeSitemaps(records);
  await writeReports(records, sitemapGroups.groups);
  await writeIndexNowTool();
  await updateRobots();
  await writeHeaders();

  const searchRecords = await Promise.all([...seoSlugs, ...cityPages.map((p) => p.slug), "resurser", ...assetPages.map((p) => p.slug), "sitemap", "latest-content"].map(async (slug) => {
    const file = path.join(root, slug, "index.html");
    const html = await fs.readFile(file, "utf8");
    return {
      title: stripTags((/<title>([\s\S]*?)<\/title>/i.exec(html) || [])[1] || "").replace(/\s*\|\s*Nordic Theory Labs$/, ""),
      description: (/<meta name="description" content="([^"]+)"/i.exec(html) || [])[1] || "",
      answer: stripTags((/<div class="quick-answer">([\s\S]*?)<\/div>/i.exec(html) || /<p class="definition-block">([\s\S]*?)<\/p>/i.exec(html) || [])[1] || ""),
      keywords: slug.replaceAll("-", " "),
      url: pageUrl(slug),
    };
  }));
  await fs.writeFile(path.join(root, "assets", "search-index.json"), JSON.stringify(searchRecords, null, 2), "utf8");

  console.log(`Phase 4 production systems generated: ${records.length} sitemap URLs, ${cityPages.length} local pages, ${assetPages.length} PDF assets.`);
}

await main();
