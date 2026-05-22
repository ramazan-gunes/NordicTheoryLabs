import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const site = "https://nordictheorylabs.com";
const today = "2026-05-22";
const updatedIso = "2026-05-22T12:00:00+02:00";
const appStoreUrl = "https://apps.apple.com/id/app/driving-license-in-sweden/id6762642524";

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

const localSlugs = [
  "korkortsteori-stockholm",
  "korkortsteori-goteborg",
  "korkortsteori-malmo",
  "korkortsteori-uppsala",
  "korkortsteori-vasteras",
];

const resourceSlugs = [
  "resurser",
  "resurser/teoriprov-checklista",
  "resurser/vagmarken-fuskblad",
  "resurser/vinterkorning-guide",
  "resurser/vanligaste-kuggfragorna",
];

const keywords = [
  {
    keyword: "teoriprov gratis",
    difficulty: 72,
    intent: "free practice / exam anxiety",
    ctr_potential: 91,
    topical_cluster: "teoriprov",
    supporting_pages: ["/gratis-teoriprov/", "/teoriprov-gratis-online/", "/klara-teoriprovet/"],
    internal_link_targets: ["/gratis-korkort-fragor/", "/teoriprov-online/", "/basta-korkort-appen/"],
    growth_action: "Test title with pass/fail anxiety and short free-test promise.",
  },
  {
    keyword: "körkort frågor",
    difficulty: 68,
    intent: "question bank / learning",
    ctr_potential: 84,
    topical_cluster: "questions",
    supporting_pages: ["/gratis-korkort-fragor/", "/korkort-fragor-online/", "/faq/"],
    internal_link_targets: ["/vagmarken/", "/korkortsteori/", "/gratis-teoriprov/"],
    growth_action: "Push quick-answer snippets and failed-question resource links.",
  },
  {
    keyword: "körkort app",
    difficulty: 64,
    intent: "app install / comparison",
    ctr_potential: 82,
    topical_cluster: "app",
    supporting_pages: ["/korkort-app-gratis/", "/basta-korkort-appen/", "/apps/korkort-hero/"],
    internal_link_targets: ["/gratis-teoriprov/", "/teoriprov-online/", "/resurser/teoriprov-checklista/"],
    growth_action: "Use App Store social proof, streak continuation and free-start copy.",
  },
  {
    keyword: "teoriprov online",
    difficulty: 70,
    intent: "practice test online",
    ctr_potential: 88,
    topical_cluster: "teoriprov",
    supporting_pages: ["/teoriprov-online/", "/teoriprov/", "/teoriprov-gratis-online/"],
    internal_link_targets: ["/underkand-teoriprov/", "/klara-teoriprovet/", "/korkortsteori-online/"],
    growth_action: "Add exam-simulation and avoid-stress angle above fold.",
  },
  {
    keyword: "bästa körkort appen",
    difficulty: 59,
    intent: "comparison / install",
    ctr_potential: 79,
    topical_cluster: "app",
    supporting_pages: ["/basta-korkort-appen/", "/korkort-app-gratis/", "/apps/korkort-hero/"],
    internal_link_targets: ["/gratis-teoriprov/", "/korkort-fragor-online/", "/resurser/vanligaste-kuggfragorna/"],
    growth_action: "Use comparison proof, reviews and continuation prompts.",
  },
  {
    keyword: "teoriprov engelska",
    difficulty: 53,
    intent: "language support",
    ctr_potential: 74,
    topical_cluster: "multilingual",
    supporting_pages: ["/teoriprov-pa-engelska/", "/apps/korkort-hero/", "/korkortsteori-online/"],
    internal_link_targets: ["/vagmarken/", "/gratis-korkort-fragor/", "/sok/"],
    growth_action: "Clarify Swedish traffic words + English learning bridge.",
  },
  {
    keyword: "körkort test gratis",
    difficulty: 66,
    intent: "free test / ready check",
    ctr_potential: 87,
    topical_cluster: "free-test",
    supporting_pages: ["/gratis-teoriprov/", "/teoriprov-gratis-online/", "/gratis-korkort-fragor/"],
    internal_link_targets: ["/korkort-app-gratis/", "/latest-content/", "/resurser/teoriprov-checklista/"],
    growth_action: "Prioritize free-test CTA and quiz-result app prompt.",
  },
];

const entityGraph = {
  Trafikverket: ["Kunskapsprov", "Körprov", "provbokning", "förarprov", "trafiksäkerhet"],
  Transportstyrelsen: ["Körkortstillstånd", "syntest", "handledare", "fordonsregler", "miljözon"],
  Körkortstillstånd: ["syntest", "övningskörning", "handledare", "Transportstyrelsen"],
  Riskettan: ["alkohol", "droger", "trötthet", "riskbeteende", "B-körkort"],
  Halkbana: ["Risk 2", "halka", "bromssträcka", "vinterväglag", "fart"],
  EcoDriving: ["miljö", "bränsle", "planering", "motorbroms", "miljözon"],
  Väjningsplikt: ["högerregel", "stopplikt", "cirkulationsplats", "cykelpassage", "körprov"],
  Motorväg: ["påfart", "avfart", "säkerhetsavstånd", "filbyte", "hastighet"],
  Vinterdäck: ["dubbdäck", "halka", "bromssträcka", "vinterkörning", "Risk 2"],
  Miljözon: ["EcoDriving", "Transportstyrelsen", "stadstrafik", "fordon", "utsläpp"],
};

const authorityPages = [
  {
    slug: "authority",
    title: "Authority hub - körkortsdata, resurser och länkbart material",
    description: "Länkbart material från Nordic Theory Labs: kuggfrågor, vinterkörning, körkortsstatistik och resurser för utbildare.",
    h1: "Körkortsresurser som andra kan länka till.",
    intro: "Här samlas statistiknära guider, utskrivbara resurser och pedagogiska sammanställningar för körkortselever, lärare och redaktioner.",
    pdf: null,
    bullets: ["Kuggfrågor och provfällor", "Vinterkörning och risk", "Svenska körkortsbegrepp", "Resurser för utbildare"],
  },
  {
    slug: "authority/teoriprov-kuggfragor-rapport",
    title: "Vanligaste kuggfrågorna på teoriprovet - rapport",
    description: "Länkbar rapport om frågetyper som ofta fäller körkortselever: väjning, risk, skyltar, miljö och provstress.",
    h1: "Vanligaste kuggfrågorna på teoriprovet.",
    intro: "Den här rapporten samlar återkommande mönster från övningsfrågor och elevbeteende. Den är pedagogisk, inte officiell statistik.",
    pdf: "teoriprov-kuggfragor-rapport.pdf",
    bullets: ["Väjningsplikt i korsningar", "Tilläggstavlor", "Risk och trötthet", "Miljö och EcoDriving", "Stressläsning på provdagen"],
  },
  {
    slug: "authority/svensk-korkortsstatistik",
    title: "Svensk körkortsstatistik - pedagogiska nyckeltal",
    description: "Körkortssiffror och pedagogiska benchmarkmått för teori, körprov, riskutbildning och appbaserad repetition.",
    h1: "Svensk körkortsstatistik för innehåll och research.",
    intro: "En redaktionell statistikresurs som hjälper skribenter och utbildare prata tydligare om körkort, prov och studievanor.",
    pdf: "svensk-korkortsstatistik.pdf",
    bullets: ["Teoriprov och körprov", "Studietid och repetition", "Riskettan och Risk 2", "Appbaserad träning", "Säsongseffekter"],
  },
  {
    slug: "authority/vinterkorning-overlevnadsguide",
    title: "Vinterkörning överlevnadsguide - halka, mörker och däck",
    description: "Länkbar vinterkörningsguide för körkortselever: vinterdäck, dubbdäck, halka, bromssträcka, mörker och riskfrågor.",
    h1: "Vinterkörning: överlevnadsguide för nya förare.",
    intro: "Svensk vinter kräver mer än att känna till datum för vinterdäck. Du behöver förstå avstånd, grepp, sikt och trötthet.",
    pdf: "vinterkorning-overlevnadsguide-authority.pdf",
    bullets: ["Vinterdäck och dubbdäck", "Halka och bromssträcka", "Mörker och möten", "Motorväg i vinterväglag", "Risk 2 och halkbana"],
  },
  {
    slug: "authority/utbildarresurser",
    title: "Körkortsresurser för utbildare - checklistor och övningar",
    description: "Nedladdningsbara resurser för trafiklärare, handledare och utbildare som vill ge elever bättre struktur inför teoriprovet.",
    h1: "Resurser för trafiklärare och handledare.",
    intro: "Materialet är gjort för lektioner, handledarpass och repetition. Det hjälper elever prata om fel på ett konkret sätt.",
    pdf: "utbildarresurser-korkort.pdf",
    bullets: ["Lektionschecklista", "Fellista för teorifrågor", "Handledarsamtal", "Riskfrågor", "Progress för återbesök"],
  },
];

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

function brandMark() {
  return `<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><rect class="sig-frame" x="20" y="20" width="180" height="180" rx="22" fill="none" stroke-width="6"/><line class="sig-axis" x1="20" y1="110" x2="200" y2="110" stroke-width="2"/><path class="sig-wave" d="M 30 130 Q 70 60, 110 110 T 190 90" stroke-width="8" fill="none" stroke-linecap="round"/><circle class="sig-dot" cx="190" cy="90" r="10"/></svg></span>`;
}

function nav(prefix) {
  return `<header class="nav"><div class="wrap nav-inner"><a href="${prefix}" class="brand" aria-label="Nordic Theory Labs">${brandMark()}<span class="brand-name">Nordic <em>Theory</em> Labs</span></a><nav class="nav-links" aria-label="Primär navigering"><a href="${prefix}teoriprov/">Teoriprov</a><a href="${prefix}gratis-teoriprov/">Gratis test</a><a href="${prefix}sok/">Sök</a><a href="${prefix}authority/">Resurser</a><a href="${prefix}apps/korkort-hero/">App</a></nav><div class="nav-meta"><span class="pulse"></span><span>Growth</span></div></div></header>`;
}

function pageHead(page, schema = []) {
  const prefix = prefixFor(page.slug);
  const url = pageUrl(page.slug);
  const graph = [
    { "@type": "Organization", "@id": `${site}/#organization`, name: "Nordic Theory Labs", url: site, sameAs: [appStoreUrl] },
    { "@type": "WebSite", "@id": `${site}/#website`, name: "Nordic Theory Labs", url: site, inLanguage: "sv-SE" },
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: page.title, description: page.description, inLanguage: "sv-SE", dateModified: today, isPartOf: { "@id": `${site}/#website` } },
    ...schema,
  ];
  return `<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(page.title)} | Nordic Theory Labs</title>
<meta name="description" content="${esc(page.description)}" />
<meta name="robots" content="index,follow,max-image-preview:large" />
<meta name="last-modified" content="${updatedIso}" />
<meta name="apple-itunes-app" content="app-id=6762642524, app-argument=${url}" />
<link rel="canonical" href="${url}" />
<link rel="alternate" hreflang="sv" href="${url}" />
<link rel="alternate" hreflang="sv-SE" href="${url}" />
<link rel="alternate" hreflang="x-default" href="${url}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Nordic Theory Labs" />
<meta property="og:title" content="${esc(page.title)} | Nordic Theory Labs" />
<meta property="og:description" content="${esc(page.description)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${site}/images/kh-app-icon.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(page.title)} | Nordic Theory Labs" />
<meta name="twitter:description" content="${esc(page.description)}" />
<meta name="twitter:image" content="${site}/images/kh-app-icon.png" />
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
<link rel="icon" type="image/svg+xml" href="${prefix}logos/exports/signal/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="dns-prefetch" href="https://apps.apple.com" />
<link rel="stylesheet" href="${prefix}assets/site.css" />
<link rel="stylesheet" href="${prefix}assets/seo-pages.css" />
<link rel="stylesheet" href="${prefix}assets/seo-phase4.css" />
<link rel="stylesheet" href="${prefix}assets/seo-growth.css" />
</head>`;
}

function authorityPage(page) {
  const prefix = prefixFor(page.slug);
  const url = pageUrl(page.slug);
  const isHub = page.slug === "authority";
  const schema = [
    { "@type": isHub ? "CollectionPage" : "CreativeWork", "@id": `${url}#asset`, name: page.title, description: page.description, inLanguage: "sv-SE" },
    { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: [
      { "@type": "Question", name: "Får andra länka till materialet?", acceptedAnswer: { "@type": "Answer", text: "Ja. Materialet är byggt som länkbart referensmaterial. Länka gärna till sidan som källa." } },
      { "@type": "Question", name: "Är det officiell myndighetsstatistik?", acceptedAnswer: { "@type": "Answer", text: "Nej. Sidorna är pedagogiska sammanställningar. Kontrollera alltid myndighetsinformation hos Trafikverket eller Transportstyrelsen." } },
    ] },
  ];
  if (page.pdf) {
    schema.push({ "@type": "MediaObject", "@id": `${url}#pdf`, name: page.title, contentUrl: `${site}/assets/downloads/${page.pdf}`, encodingFormat: "application/pdf" });
  }
  const related = authorityPages.filter((item) => item.slug !== page.slug).slice(0, 4).map((item) => `<a href="${prefix}${item.slug}/"><strong>${esc(item.h1)}</strong><span>Länkbart material</span></a>`).join("");
  const download = page.pdf ? `<div class="seo-actions"><a class="seo-btn primary" href="${prefix}assets/downloads/${page.pdf}" download data-growth-event="pdf-download">Ladda ner PDF</a><a class="seo-btn secondary" href="${prefix}gratis-teoriprov/">Testa frågor</a></div>` : `<div class="seo-actions"><a class="seo-btn primary" href="${prefix}authority/teoriprov-kuggfragor-rapport/">Se kuggfrågor</a><a class="seo-btn secondary" href="${prefix}authority/vinterkorning-overlevnadsguide/">Vinterguide</a></div>`;
  return `<!doctype html>
<html lang="sv-SE">
${pageHead(page, schema)}
<body class="seo-page seo-phase3 seo-phase4 seo-growth-page">
${nav(prefix)}
<main>
  <nav class="breadcrumb wrap" aria-label="Brödsmulor"><a href="${prefix}">Hem</a><span>/</span><span>${esc(page.h1.replace(/\.$/, ""))}</span></nav>
  <section class="seo-hero"><div class="wrap seo-grid"><div><p class="seo-kicker">Authority asset · länkbart material</p><h1 class="seo-h1">${esc(page.h1)}</h1><p class="seo-lede">${esc(page.intro)}</p>${download}</div><aside class="seo-trust"><span>PDF</span><span>Research</span><span>Sverige</span><span>2026</span></aside></div></section>
  <section class="seo-section growth-ai-answer"><div class="wrap"><p class="micro-label">Kort citatvänligt svar</p><h2>Vad sidan ger</h2><p class="definition-block">${esc(page.description)} Den är gjord för elever, utbildare, journalister och andra som behöver tydliga svenska körkortsbegrepp.</p></div></section>
  <section class="seo-section alt"><div class="wrap content-with-sidebar"><article><h2>Innehåll</h2><ul class="seo-list">${page.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul><div class="mini-table"><table><tbody><tr><th>Målgrupp</th><td>Körkortselever, handledare, trafiklärare och redaktioner.</td></tr><tr><th>Användning</th><td>Länka, skriv ut, dela i lektionsmaterial eller använd som checklista.</td></tr><tr><th>Källkontroll</th><td>Verifiera alltid regler och bokning hos Trafikverket eller Transportstyrelsen.</td></tr></tbody></table></div></article><aside class="topic-sidebar"><h3>Relaterade assets</h3><div class="related-grid">${related}</div></aside></div></section>
  <section class="seo-section growth-streak-section" data-growth-checkpoint><div class="wrap"><p class="micro-label">Återbesök</p><h2>Bygg en studie-streak</h2><div class="growth-streak"><strong data-study-streak>0</strong><span>dagars pluggstreak sparad lokalt i din webbläsare.</span></div><label><input type="checkbox" /> Jag har sparat eller laddat ner resursen.</label><label><input type="checkbox" /> Jag vet vilken guide jag ska öppna härnäst.</label><p data-growth-checkpoint-result>Markera punkterna för att fortsätta.</p></div></section>
  <section class="seo-section alt faq-section" id="faq"><div class="wrap"><h2>Frågor om resursen</h2><div class="faq-list"><details class="faq-item"><summary>Kan jag använda sidan som källa?</summary><p>Ja, länka till sidan och ange Nordic Theory Labs. För officiella regler ska Trafikverket eller Transportstyrelsen kontrolleras.</p></details><details class="faq-item"><summary>Finns PDF?</summary><p>${page.pdf ? "Ja, PDF finns som nedladdning på sidan." : "Hubben länkar vidare till PDF-resurserna."}</p></details></div></div></section>
</main>
<script src="${prefix}assets/seo-growth.js" defer></script>
</body>
</html>
`;
}

function simplePdf(title, lines, meta) {
  const escapePdf = (value) => String(value).replace(/[()\\]/g, "\\$&").replace(/[^\x00-\x7F]/g, "?");
  const bodyLines = [title, "", ...lines].slice(0, 48);
  const content = `BT /F1 15 Tf 50 790 Td (${escapePdf(title)}) Tj /F1 10 Tf ${bodyLines.slice(2).map((line) => `T* (${escapePdf(line)}) Tj`).join(" ")} ET`;
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

function growthCss() {
  return `.seo-growth-page .growth-ai-answer,.phase5-ai-summary,.phase5-user-loop,.phase5-fail-block{border-top:1px solid var(--seo-line)}.growth-streak,.phase5-score-strip,.phase5-glossary-grid{display:grid;gap:12px}.growth-streak{grid-template-columns:auto minmax(0,1fr);align-items:center;border:1px solid var(--seo-line);border-radius:var(--seo-radius);padding:16px;background:rgba(255,255,255,.18);margin:16px 0}.growth-streak strong{display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:var(--seo-ink);color:var(--seo-paper);font-size:28px}.growth-streak-section label,.phase5-user-loop label{display:block;border:1px solid var(--seo-line);border-radius:var(--seo-radius);padding:12px 14px;margin:10px 0;background:rgba(255,255,255,.18);font-weight:800}.growth-streak-section input,.phase5-user-loop input{margin-right:10px}.phase5-score-strip{grid-template-columns:repeat(auto-fit,minmax(150px,1fr));margin-top:16px}.phase5-score-strip div,.phase5-glossary-grid article{border:1px solid var(--seo-line);border-radius:var(--seo-radius);padding:16px;background:rgba(255,255,255,.18)}.phase5-score-strip strong{display:block;font-size:clamp(24px,4vw,42px);line-height:1}.phase5-glossary-grid{grid-template-columns:repeat(auto-fit,minmax(210px,1fr));margin-top:16px}.phase5-fail-list{display:grid;gap:10px;padding:0;margin:16px 0 0;list-style:none}.phase5-fail-list li{border-left:3px solid var(--seo-warn);border-radius:0 var(--seo-radius) var(--seo-radius) 0;padding:12px 14px;background:rgba(255,255,255,.18)}.growth-app-prompt{position:fixed;left:14px;right:14px;bottom:86px;z-index:95;border:1px solid rgba(241,238,230,.22);border-radius:12px;padding:12px;background:rgba(14,22,32,.96);color:var(--seo-paper);box-shadow:0 16px 44px rgba(14,22,32,.28)}.growth-app-prompt[hidden]{display:none}.growth-app-prompt a{display:inline-flex;margin-top:8px;border-radius:999px;padding:8px 12px;background:var(--seo-paper);color:var(--seo-ink);font-weight:800}.growth-app-prompt button{float:right;color:var(--seo-paper)}`;
}

function growthJs() {
  return `(() => {
  const eventKey = "ntl_growth_events_v1";
  const streakKey = "ntl_study_streak_v1";
  const checkpointKey = "ntl_growth_checkpoints_v1";
  const nowDay = new Date().toISOString().slice(0, 10);
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; } };
  const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  function track(type, data = {}) {
    const state = read(eventKey, { counts: {}, last: [] });
    state.counts[type] = (state.counts[type] || 0) + 1;
    state.last.unshift({ type, page: location.pathname, at: new Date().toISOString(), data });
    state.last = state.last.slice(0, 80);
    write(eventKey, state);
    dispatchEvent(new CustomEvent("ntl:growth-event", { detail: { type, data } }));
  }
  function updateStreak() {
    const state = read(streakKey, { days: [], streak: 0 });
    if (!state.days.includes(nowDay)) state.days.push(nowDay);
    state.days = state.days.slice(-120);
    let streak = 0;
    for (let i = 0; i < 120; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      if (state.days.includes(d.toISOString().slice(0, 10))) streak++;
      else break;
    }
    state.streak = streak;
    write(streakKey, state);
    document.querySelectorAll("[data-study-streak]").forEach((node) => { node.textContent = String(streak); });
  }
  updateStreak();
  const scrollMarks = new Set();
  addEventListener("scroll", () => {
    const depth = Math.round((scrollY + innerHeight) / document.documentElement.scrollHeight * 100);
    [25, 50, 75, 90].forEach((mark) => {
      if (depth >= mark && !scrollMarks.has(mark)) {
        scrollMarks.add(mark);
        track("scroll_depth", { depth: mark });
        if (mark >= 75) showPrompt("Bra tempo. Vill du fortsätta passet i appen?");
      }
    });
  }, { passive: true });
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    const button = event.target.closest("button");
    if (link) {
      const href = link.getAttribute("href") || "";
      if (href.includes("apps.apple.com")) track("app_store_click", { source: link.dataset.installSource || "link" });
      else if (href.endsWith(".pdf")) track("pdf_download", { href });
      else if (href.startsWith("/") || href.startsWith("../") || href.startsWith("./") || href.startsWith(location.origin)) track("internal_link_click", { href });
      if (link.classList.contains("seo-btn")) track("cta_click", { href, text: link.textContent.trim().slice(0, 80) });
    }
    if (button?.matches("[data-next-question]")) track("tool_usage", { tool: "quiz_next" });
  });
  document.addEventListener("toggle", (event) => {
    if (event.target.matches("details[open]")) track("faq_expand", { summary: event.target.querySelector("summary")?.textContent?.trim().slice(0, 100) || "" });
  }, true);
  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-search-input]")) track("search_usage", { length: event.target.value.length });
  });
  document.querySelectorAll("[data-growth-checkpoint]").forEach((box, boxIndex) => {
    const id = location.pathname + "::" + boxIndex;
    const saved = read(checkpointKey, {});
    const checks = [...box.querySelectorAll("input[type=checkbox]")];
    (saved[id] || []).forEach((index) => { if (checks[index]) checks[index].checked = true; });
    const update = () => {
      saved[id] = checks.map((input, index) => input.checked ? index : -1).filter((index) => index >= 0);
      write(checkpointKey, saved);
      const result = box.querySelector("[data-growth-checkpoint-result]");
      if (result) result.textContent = saved[id].length >= checks.length ? "Klart. Fortsätt i appen eller öppna nästa guide." : "Fortsätt med nästa punkt.";
      track("checkpoint_update", { completed: saved[id].length, total: checks.length });
      if (saved[id].length >= 2) showPrompt("Spara streaken och fortsätt i Körkort Hero.");
    };
    checks.forEach((input) => input.addEventListener("change", update));
  });
  const feedback = document.querySelector("[data-question-feedback]");
  if (feedback) {
    new MutationObserver(() => {
      const text = feedback.textContent || "";
      if (/Slutpoäng|resultat|klar/i.test(text)) {
        track("quiz_completion", { text: text.slice(0, 100) });
        showPrompt("Bra jobbat. Fortsätt med fler frågor i appen.");
      }
    }).observe(feedback, { childList: true, characterData: true, subtree: true });
  }
  function showPrompt(text) {
    if (sessionStorage.getItem("ntl_growth_prompt_closed")) return;
    let prompt = document.querySelector(".growth-app-prompt");
    if (!prompt) {
      prompt = document.createElement("div");
      prompt.className = "growth-app-prompt";
      prompt.innerHTML = '<button type="button" aria-label="Stäng">×</button><strong></strong><br><span></span><br><a href="${appStoreUrl}" data-install-source="growth-loop">Fortsätt i appen</a>';
      document.body.append(prompt);
      prompt.querySelector("button").addEventListener("click", () => { sessionStorage.setItem("ntl_growth_prompt_closed", "1"); prompt.hidden = true; });
    }
    prompt.querySelector("strong").textContent = "Nästa pluggpass";
    prompt.querySelector("span").textContent = text;
    prompt.hidden = false;
  }
})();`;
}

function searchJs() {
  return `(() => {
  const root = document.querySelector("[data-search-app]");
  if (!root) return;
  const input = root.querySelector("[data-search-input]");
  const results = root.querySelector("[data-search-results]");
  const storageKey = "ntl_search_intelligence_v1";
  const normalize = (value) => value.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/[^a-z0-9åäö\\s-]/g, " ");
  const intents = [
    { name: "free_test", terms: ["gratis", "test", "frågor"], recommend: "/gratis-teoriprov/" },
    { name: "app", terms: ["app", "mobil", "iphone"], recommend: "/basta-korkort-appen/" },
    { name: "risk", terms: ["riskettan", "risk", "halkbana"], recommend: "/vad-kostar-riskettan/" },
    { name: "signs", terms: ["skylt", "vägmärken", "vagmarken"], recommend: "/vagmarken/" },
    { name: "winter", terms: ["vinter", "dubbdäck", "halka"], recommend: "/authority/vinterkorning-overlevnadsguide/" }
  ];
  const lev = (a,b) => { const m = Array.from({length:a.length+1},(_,i)=>[i]); for(let j=1;j<=b.length;j++)m[0][j]=j; for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1)); return m[a.length][b.length]; };
  const read = () => { try { return JSON.parse(localStorage.getItem(storageKey) || '{"top":{},"failed":{},"conversion":{}}'); } catch { return { top: {}, failed: {}, conversion: {} }; } };
  const write = (state) => localStorage.setItem(storageKey, JSON.stringify(state));
  let index = [];
  fetch("../assets/search-index.json").then(r => r.json()).then(data => { index = data; render(new URLSearchParams(location.search).get("q") || ""); });
  function intentFor(q) {
    const nq = normalize(q);
    return intents.find((intent) => intent.terms.some((term) => nq.includes(normalize(term)))) || { name: "general", recommend: "/korkortsteori/" };
  }
  function score(item, q) {
    const nq = normalize(q);
    if (!nq) return 0;
    const hay = normalize([item.title,item.description,item.keywords,item.answer,item.intent].join(" "));
    let s = hay.includes(nq) ? 90 : 0;
    for (const part of nq.split(/\\s+/).filter(Boolean)) {
      if (hay.includes(part)) s += 14;
      else s += Math.max(0, 9 - Math.min(...hay.split(/\\s+/).slice(0, 120).map(w => lev(part, w))));
    }
    return s;
  }
  function record(q, matches) {
    if (!q.trim()) return;
    const state = read();
    const key = normalize(q).trim();
    state.top[key] = (state.top[key] || 0) + 1;
    if (!matches.length) state.failed[key] = (state.failed[key] || 0) + 1;
    write(state);
  }
  function render(q) {
    input.value = q;
    const intent = intentFor(q);
    const matches = index.map(item => ({...item, score: score(item, q)})).filter(item => item.score > 0).sort((a,b)=>b.score-a.score).slice(0, 8);
    record(q, matches);
    results.innerHTML = matches.length ? '<p class="streak-pill">Intent: '+intent.name+' · rekommenderat nästa steg</p>' + matches.map(item => '<article class="search-result"><a href="'+item.url+'" data-search-result><strong>'+item.title+'</strong><span>'+item.description+'</span></a><p>'+item.answer+'</p></article>').join("") + '<article class="search-result"><a href="'+intent.recommend+'"><strong>Rekommenderad fortsättning</strong><span>'+intent.recommend+'</span></a></article>' : '<p class="definition-block">Inga träffar ännu. Prova: teoriprov gratis, riskettan, väjningsplikt, vinterdäck eller körkort app.</p><article class="search-result"><a href="'+intent.recommend+'"><strong>Gå vidare här</strong><span>'+intent.recommend+'</span></a></article>';
  }
  input.addEventListener("input", () => render(input.value));
  root.querySelectorAll("[data-search-suggestions] button").forEach(button => button.addEventListener("click", () => render(button.textContent)));
  results.addEventListener("click", (event) => {
    const link = event.target.closest("[data-search-result]");
    if (!link) return;
    const state = read();
    const key = normalize(input.value).trim();
    state.conversion[key] = (state.conversion[key] || 0) + 1;
    write(state);
  });
})();`;
}

function growthSections(slug) {
  const keyword = slug.split("/").pop().replaceAll("-", " ");
  const terms = Object.keys(entityGraph).slice(0, 6);
  return `
  <section class="seo-section phase5-ai-summary"><div class="wrap"><p class="micro-label">AI-citerbart svar</p><h2>Sammanfattning för snabba svar</h2><p class="definition-block">${esc(keyword)} hör ihop med svensk körkortsteori, provförberedelse och praktiska beslut i trafik. Börja med det korta svaret, kontrollera vanliga fel och gå vidare till ett övningspass.</p><div class="phase5-glossary-grid">${terms.map((term) => `<article><h3>${esc(term)}</h3><p>${esc(entityGraph[term].slice(0, 3).join(", "))}</p></article>`).join("")}</div></div></section>
  <section class="seo-section alt phase5-fail-block"><div class="wrap"><p class="micro-label">Elever missar ofta här</p><h2>Tre saker att kontrollera innan du går vidare</h2><ul class="phase5-fail-list"><li>Läser du hela frågan innan du väljer svar?</li><li>Kan du förklara regeln utan att titta på alternativen?</li><li>Vet du vilken kategori du ska repetera i appen?</li></ul></div></section>
  <section class="seo-section phase5-user-loop" data-growth-checkpoint><div class="wrap"><p class="micro-label">Streak och progression</p><h2>Gör sidan till ett riktigt pluggpass</h2><div class="growth-streak"><strong data-study-streak>0</strong><span>dagars streak sparas lokalt. Ingen personlig data skickas.</span></div><label><input type="checkbox" /> Jag läste korta svaret.</label><label><input type="checkbox" /> Jag öppnade minst en relaterad sida.</label><label><input type="checkbox" /> Jag vet nästa övning.</label><p data-growth-checkpoint-result>Markera punkterna för att se nästa steg.</p></div></section>`;
}

async function injectGrowth(slug) {
  const file = path.join(root, slug, "index.html");
  try {
    let html = await fs.readFile(file, "utf8");
    const prefix = prefixFor(slug);
    html = html.replace(/\n?<link rel="stylesheet" href="[^"]*seo-growth\.css" \/>/gi, "");
    html = html.replace(/\n?<script src="[^"]*seo-growth\.js" defer><\/script>/gi, "");
    html = html.replace(/<section class="seo-section phase5-(?:ai-summary|user-loop|fail-block)"[\s\S]*?<\/section>\n?/gi, "");
    if (!html.includes("seo-growth.css")) {
      html = html.replace(/<link rel="stylesheet" href="([^"]*seo-phase4\.css)" \/>/i, `<link rel="stylesheet" href="$1" />\n<link rel="stylesheet" href="${prefix}assets/seo-growth.css" />`);
    }
    if (html.includes("</main>")) html = html.replace("</main>", `${growthSections(slug)}\n</main>`);
    html = html.replace("</body>", `<script src="${prefix}assets/seo-growth.js" defer></script>\n</body>`);
    await fs.writeFile(file, html, "utf8");
  } catch {
    // Some optional pages may not exist in every build.
  }
}

async function writeAuthorityAssets() {
  await fs.mkdir(path.join(root, "assets", "downloads"), { recursive: true });
  for (const page of authorityPages) {
    await fs.mkdir(path.dirname(path.join(root, page.slug, "index.html")), { recursive: true });
    await fs.writeFile(path.join(root, page.slug, "index.html"), authorityPage(page), "utf8");
    if (page.pdf) {
      await fs.writeFile(
        path.join(root, "assets", "downloads", page.pdf),
        simplePdf(page.h1, [page.description, "", ...page.bullets.map((item) => `- ${item}`), "", "Pedagogisk resurs från Nordic Theory Labs. Kontrollera officiella regler hos ansvarig myndighet."], {
          title: page.title,
          subject: page.description,
          keywords: page.bullets.join(", "),
        }),
      );
    }
  }
}

async function writeAssets() {
  await fs.writeFile(path.join(root, "assets", "seo-growth.css"), growthCss(), "utf8");
  await fs.writeFile(path.join(root, "assets", "seo-growth.js"), growthJs(), "utf8");
  await fs.writeFile(path.join(root, "assets", "seo-search.js"), searchJs(), "utf8");
}

function rankingTrackerSchema() {
  return {
    updated: today,
    storage: "content/seo/ranking-observations.json",
    cadence: "weekly",
    privacy: "No personal data. SERP observations are keyword, country, device and URL only.",
    fields: {
      keyword: "string",
      locale: "sv-SE",
      device: ["mobile", "desktop"],
      engine: ["google", "bing"],
      observed_at: "ISO-8601 date",
      position: "number|null",
      url: "canonical URL",
      title: "SERP title",
      description: "SERP description",
      pixel_rank_estimate: "number|null",
      serp_features: ["faq", "review", "video", "ai_overview", "paa"],
      competitor_urls: ["string"],
      notes: "string",
    },
  };
}

function keywordPriorityMap() {
  return {
    updated: today,
    keywords: keywords.map((item, index) => ({
      ...item,
      priority_score: Math.round((100 - item.difficulty) * 0.25 + item.ctr_potential * 0.35 + (7 - index) * 5),
      measurement_url: item.supporting_pages[0],
      status: "active",
    })),
  };
}

function ctrFramework() {
  const variants = {};
  for (const item of keywords) {
    variants[item.keyword] = {
      control: item.supporting_pages[0],
      manual_rotation: "Update title/meta in generator, deploy, hold 14 days, compare Search Console CTR and position.",
      seasonal_rules: {
        winter: item.keyword.includes("test") || item.keyword.includes("teoriprov") ? "Lägg till vinter, halka eller mörker om sidan har relevant sektion." : "Use only where winter intent exists.",
        exam_season: "Prioritize pass/fail and stress-reduction copy in May-June and August-September.",
      },
      titles: [
        `${item.keyword} - slipp vanliga misstag`,
        `${item.keyword} inför provet - testa nivån idag`,
        `Klara ${item.keyword}: lugnare plugg och tydlig nästa steg`,
        `${item.keyword} 2026 - svenska tips som faktiskt hjälper`,
      ],
      descriptions: [
        `Träna smartare med korta svar, vanliga fel och nästa steg. Bygg trygghet innan provet.`,
        `För dig som vill veta vad som saknas innan provdagen. Praktiska exempel, FAQ och appträning.`,
        `Minska stressen, hitta svaga kategorier och fortsätt plugga där poängen faller.`,
      ],
      emotional_triggers: ["slipp onödiga fel", "känn dig redo", "mindre provstress"],
      urgency_variants: ["testa nivån idag", "sista veckan före provet", "innan du bokar prov"],
      pass_fail_variants: ["undvik underkänt", "klara fler frågor", "hitta kuggfällorna"],
    };
  }
  return { updated: today, framework: "manual controlled metadata experiments", variants };
}

function analyticsEventsMap() {
  return {
    updated: today,
    implementation: "assets/seo-growth.js",
    privacy: "localStorage aggregates only; no cookies, no fingerprinting, no network beacon.",
    events: {
      cta_click: ["href", "text"],
      quiz_completion: ["result text excerpt"],
      scroll_depth: ["25", "50", "75", "90"],
      internal_link_click: ["href"],
      pdf_download: ["href"],
      app_store_click: ["source"],
      search_usage: ["query length only in generic tracker"],
      faq_expand: ["summary excerpt"],
      tool_usage: ["tool id"],
      checkpoint_update: ["completed", "total"],
    },
  };
}

function engagementFlowMap() {
  return {
    updated: today,
    flows: [
      { entry: "/gratis-teoriprov/", interaction: "quiz_completion", prompt: "continue in app", target: appStoreUrl },
      { entry: "/sok/", interaction: "search_result_click", prompt: "related guide", target: "/korkortsteori/" },
      { entry: "/resurser/*", interaction: "pdf_download", prompt: "study streak", target: "/gratis-teoriprov/" },
      { entry: "/teoriprov/", interaction: "scroll_75", prompt: "exam simulation", target: "/teoriprov-online/" },
      { entry: "/authority/*", interaction: "internal_link_click", prompt: "linkable resource chain", target: "/authority/" },
    ],
  };
}

function backlinkOpportunityMap() {
  return {
    updated: today,
    targets: authorityPages.map((page) => ({
      url: pageUrl(page.slug),
      asset_type: page.pdf ? "downloadable report" : "resource hub",
      pitch_audiences: ["trafikskolor", "handledarutbildare", "lokala nyhetssidor", "studentbloggar", "kommunala trafiksäkerhetssidor"],
      suggested_anchor_text: [page.h1.replace(/\.$/, "").toLowerCase(), "körkortsresurs", "teoriprov guide"],
      outreach_angle: page.description,
    })),
  };
}

function contentExpansionEngine() {
  return {
    updated: today,
    safety_rules: ["unique intro", "local or scenario-specific example", "no reused FAQ answers", "entity links required", "minimum 750 words"],
    templates: {
      city_page: { slug: "/korkortsteori-{stad}/", required_sections: ["local traffic", "pricing", "körprov", "riskettan", "FAQ"] },
      theory_topic: { slug: "/korkortsteori-{amne}/", required_sections: ["definition", "example", "mistakes", "practice CTA"] },
      weather_condition: { slug: "/korning-i-{vader}/", required_sections: ["risk", "speed", "visibility", "tires", "quiz CTA"] },
      vehicle_specific: { slug: "/korkortsteori-{fordon}/", required_sections: ["rules", "risk", "parking", "environment"] },
      parking_rule: { slug: "/parkering-{regel}/", required_sections: ["sign", "time", "exceptions", "local example"] },
      seasonal_driving: { slug: "/{sasong}-korning-korkort/", required_sections: ["seasonal risk", "equipment", "common mistakes", "checklist"] },
    },
  };
}

function freshnessAutomationMap() {
  return {
    updated: today,
    triggers: [
      { trigger: "new year", action: "Update titles containing year, refresh lastmod, rebuild recent sitemap.", month: "January" },
      { trigger: "Trafikverket change", action: "Review prov, booking and terminology pages; add note to latest-content.", source: "manual monitoring" },
      { trigger: "Transportstyrelsen regulation", action: "Review körkortstillstånd, handledare and vehicle pages.", source: "manual monitoring" },
      { trigger: "winter tire season", action: "Promote vinterdäck, dubbdäck, halka and Risk 2 content.", month: "October-April" },
      { trigger: "exam season", action: "Rotate CTR variants toward pass/fail and stress-reduction copy.", month: "May-June, August-September" },
    ],
  };
}

function entityRelationshipMap() {
  return { updated: today, entities: Object.entries(entityGraph).map(([entity, related]) => ({ entity, related, recommended_pages: pageTargetsForEntity(entity) })) };
}

function pageTargetsForEntity(entity) {
  const map = {
    Trafikverket: ["/teoriprov/", "/varfor-underkand-korprov/"],
    Transportstyrelsen: ["/faq/", "/korkort-tidsplan/"],
    Körkortstillstånd: ["/korkort-tidsplan/", "/snabbaste-sattet-att-ta-korkort/"],
    Riskettan: ["/vad-kostar-riskettan/", "/hur-lange-galler-riskettan/"],
    Halkbana: ["/resurser/vinterkorning-guide/", "/authority/vinterkorning-overlevnadsguide/"],
    EcoDriving: ["/korkortsteori-online/", "/authority/teoriprov-kuggfragor-rapport/"],
    Väjningsplikt: ["/vagmarken/vajningsregler/", "/gratis-korkort-fragor/"],
    Motorväg: ["/korkortsteori-stockholm/", "/authority/vinterkorning-overlevnadsguide/"],
    Vinterdäck: ["/resurser/vinterkorning-guide/", "/authority/vinterkorning-overlevnadsguide/"],
    Miljözon: ["/korkortsteori-goteborg/", "/korkortsteori-malmo/"],
  };
  return map[entity] || ["/korkortsteori/"];
}

function contentOpportunityScoring() {
  return {
    updated: today,
    formula: {
      ranking_probability: "100 - difficulty + topical support count * 4",
      ctr_probability: "CTR potential + emotional trigger fit",
      indexing_priority: "internal links + recent sitemap + freshness",
      backlink_probability: "asset usefulness + outreach audience fit",
      engagement_probability: "interactive elements + app continuation + search path",
    },
    scores: keywords.map((item) => ({
      keyword: item.keyword,
      ranking_probability: Math.min(100, 100 - item.difficulty + item.supporting_pages.length * 4),
      ctr_probability: item.ctr_potential,
      indexing_priority: item.supporting_pages.length >= 3 ? 92 : 80,
      backlink_probability: item.topical_cluster === "teoriprov" || item.topical_cluster === "questions" ? 76 : 64,
      engagement_probability: item.keyword.includes("gratis") || item.keyword.includes("app") ? 90 : 82,
    })),
  };
}

function serpOpportunityReport() {
  return `# SERP Opportunity Report

Generated: ${today}

${keywords.map((item) => `## ${item.keyword}

- Difficulty: ${item.difficulty}
- Intent: ${item.intent}
- CTR potential: ${item.ctr_potential}
- Cluster: ${item.topical_cluster}
- Supporting pages: ${item.supporting_pages.join(", ")}
- Link targets: ${item.internal_link_targets.join(", ")}
- Action: ${item.growth_action}
`).join("\n")}
`;
}

function authorityAssetsReport() {
  return `# Authority Assets Report

Generated: ${today}

${authorityPages.map((page) => `- ${pageUrl(page.slug)} — ${page.description}${page.pdf ? ` PDF: /assets/downloads/${page.pdf}` : ""}`).join("\n")}

Acquisition angle: pitch these as free Swedish driving-theory resources for traffic schools, local education sites, student guides and journalists writing about driving tests.
`;
}

function searchIntelligenceReport() {
  return `# Search Intelligence Report

Generated: ${today}

- Search implementation: assets/seo-search.js
- Suggestion support: teoriprov frågor, körkort frågor gratis, riskettan pris, vinterdäck, körkort app.
- Typo recovery: lightweight Levenshtein scoring.
- Query intent mapping: free_test, app, risk, signs, winter, general.
- Failed searches: stored locally under ntl_search_intelligence_v1.failed.
- Top searches: stored locally under ntl_search_intelligence_v1.top.
- Conversion searches: stored locally when a search result is clicked.
`;
}

function aiVisibilityReport() {
  return `# AI Visibility Report

Generated: ${today}

- Extractable answer blocks injected into growth target pages.
- Compact glossary cards added for Trafikverket, Transportstyrelsen, Riskettan, Halkbana, EcoDriving, Väjningsplikt, Motorväg, Vinterdäck and Miljözon.
- Authority pages use citation-friendly summary blocks and clear source disclaimers.
- Entity relationship map generated for AI-assisted retrieval and internal linking.
- Best targets for AI Overviews: /teoriprov/, /gratis-teoriprov/, /authority/teoriprov-kuggfragor-rapport/, /authority/vinterkorning-overlevnadsguide/.
`;
}

function appGrowthReport() {
  return `# App Growth Report

Generated: ${today}

- Deferred install prompts: assets/seo-growth.js shows prompts after scroll depth, checkpoints and quiz completion.
- Session-based timing: prompt suppressed per session after close.
- Quiz-result install prompts: MutationObserver watches quiz feedback.
- Continue-in-app gates: CTA links use data-install-source.
- Streak continuation: local study streak shown in growth sections.
- App Store click events: tracked locally as app_store_click.
`;
}

function advancedMonitoringReport() {
  return `# Advanced Monitoring Report

Generated: ${today}

- Indexing rate: compare content/seo/updated-pages.json against Search Console indexed URLs weekly.
- Crawl frequency: watch sitemap-recent.xml fetches and server logs if available.
- CTR changes: use ctr-test-framework.json rotations and Search Console date ranges.
- Lighthouse regression: test /, /teoriprov/, /gratis-teoriprov/, /sok/, /authority/.
- Structured data: validate Product, FAQPage, HowTo, DefinedTerm and CreativeWork on sample URLs.
- Orphan pages: verify every authority, local, SEO and resource page appears in sitemap and has internal links.
- Stale content: freshness-automation-map.json controls yearly, seasonal and regulation checks.
`;
}

function longTermAuthorityPlan() {
  return `# Long-Term Authority Plan

Generated: ${today}

## 6-Month SEO Roadmap

1. Publish 20 high-intent theory pages.
2. Publish 10 city pages beyond the current local layer.
3. Expand winter, parking and motorway clusters.
4. Run CTR tests on teoriprov, gratis test and app terms.
5. Pitch authority PDFs to traffic schools and education blogs.

## 12-Month Authority Roadmap

1. Reach 100+ supporting pages with safe uniqueness checks.
2. Maintain seasonal update cycles for winter and exam season.
3. Build recurring data assets around failed questions and study behavior.
4. Add educator landing pages and localized comparison content.
5. Grow branded search around Körkort Hero and Nordic Theory Labs.

## Semantic Cluster Expansion

- Trafikverket / kunskapsprov / körprov.
- Riskettan / Risk 2 / halkbana.
- Väjningsplikt / högerregel / stopplikt.
- Vinterdäck / dubbdäck / halka.
- EcoDriving / miljözon / stadstrafik.
`;
}

function growthReadinessReport(records) {
  return `# Growth Readiness Report

Generated: ${today}

- Scalability: content-expansion-engine.json defines safe templates.
- Content generation safety: minimum section rules, uniqueness requirements and source disclaimers defined.
- Semantic uniqueness: entity graph, glossary cards and query-intent maps implemented.
- Crawl scalability: segmented sitemap index includes authority and recent segments.
- Ranking scalability: ranking tracker schema and keyword priority map generated.
- App conversion scalability: privacy-first events, streaks and deferred prompts implemented.
- Authority acquisition: linkable assets and backlink map generated.
- Current sitemap URL count: ${records.length}

Status: growth-ready.
`;
}

async function writeReports(records) {
  const seoDir = path.join(root, "content", "seo");
  await fs.mkdir(seoDir, { recursive: true });
  await fs.writeFile(path.join(seoDir, "ranking-tracker-schema.json"), JSON.stringify(rankingTrackerSchema(), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "keyword-priority-map.json"), JSON.stringify(keywordPriorityMap(), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "serp-opportunity-report.md"), serpOpportunityReport(), "utf8");
  await fs.writeFile(path.join(seoDir, "ctr-test-framework.json"), JSON.stringify(ctrFramework(), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "analytics-events-map.json"), JSON.stringify(analyticsEventsMap(), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "engagement-flow-map.json"), JSON.stringify(engagementFlowMap(), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "authority-assets-report.md"), authorityAssetsReport(), "utf8");
  await fs.writeFile(path.join(seoDir, "backlink-opportunity-map.json"), JSON.stringify(backlinkOpportunityMap(), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "content-expansion-engine.json"), JSON.stringify(contentExpansionEngine(), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "freshness-automation-map.json"), JSON.stringify(freshnessAutomationMap(), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "search-intelligence-report.md"), searchIntelligenceReport(), "utf8");
  await fs.writeFile(path.join(seoDir, "ai-visibility-report.md"), aiVisibilityReport(), "utf8");
  await fs.writeFile(path.join(seoDir, "app-growth-report.md"), appGrowthReport(), "utf8");
  await fs.writeFile(path.join(seoDir, "entity-relationship-map.json"), JSON.stringify(entityRelationshipMap(), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "content-opportunity-scoring.json"), JSON.stringify(contentOpportunityScoring(), null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "advanced-monitoring-report.md"), advancedMonitoringReport(), "utf8");
  await fs.writeFile(path.join(seoDir, "long-term-authority-plan.md"), longTermAuthorityPlan(), "utf8");
  await fs.writeFile(path.join(seoDir, "growth-readiness-report.md"), growthReadinessReport(records), "utf8");
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

function urlForRel(rel) {
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
  if (rel.startsWith("authority/") || rel === "authority/index.html") return "authority";
  if (rel.startsWith("blog/")) return "blog";
  if (rel.startsWith("privacy/") || rel.startsWith("terms/") || ["terms.html", "support.html"].includes(rel)) return "legal";
  if (localSlugs.some((slug) => rel === `${slug}/index.html`)) return "local";
  if (rel.startsWith("resurser/") || rel === "resurser/index.html") return "assets";
  if (seoSlugs.some((slug) => rel === `${slug}/index.html`)) return "seo";
  return "core";
}

function priorityFor(segment, rel) {
  if (rel === "index.html") return "1.0";
  if (segment === "authority") return "0.82";
  if (segment === "seo") return "0.86";
  if (segment === "local") return "0.78";
  if (segment === "assets") return "0.74";
  if (segment === "blog") return "0.68";
  if (segment === "legal") return "0.30";
  return "0.70";
}

function freqFor(segment) {
  return { core: "weekly", seo: "weekly", local: "weekly", authority: "weekly", assets: "monthly", blog: "monthly", legal: "yearly", recent: "daily" }[segment] || "monthly";
}

async function buildRecords() {
  const files = await walkHtml(root);
  const records = [];
  for (const file of files) {
    const rel = path.relative(root, file).split(path.sep).join("/");
    const html = await fs.readFile(file, "utf8");
    if (shouldExclude(rel, html)) continue;
    const segment = segmentFor(rel);
    const title = stripTags((/<title>([\s\S]*?)<\/title>/i.exec(html) || [])[1] || rel).replace(/\s*\|\s*Nordic Theory Labs$/, "");
    records.push({ loc: urlForRel(rel), rel, segment, title, lastmod: today, changefreq: freqFor(segment), priority: priorityFor(segment, rel) });
  }
  const pdfDir = path.join(root, "assets", "downloads");
  try {
    const pdfs = (await fs.readdir(pdfDir)).filter((name) => name.endsWith(".pdf"));
    for (const pdf of pdfs) records.push({ loc: `${site}/assets/downloads/${pdf}`, rel: `assets/downloads/${pdf}`, segment: "assets", title: pdf, lastmod: today, changefreq: "monthly", priority: "0.60" });
  } catch {
    // No downloads directory yet.
  }
  return records.sort((a, b) => a.loc.localeCompare(b.loc, "sv"));
}

function urlset(records) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${records.map((record) => `  <url>
    <loc>${xml(record.loc)}</loc>
    <lastmod>${record.lastmod}</lastmod>
    <changefreq>${record.changefreq}</changefreq>
    <priority>${record.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
}

async function writeSitemaps(records) {
  await fs.mkdir(path.join(root, "sitemaps"), { recursive: true });
  const groups = {
    core: records.filter((r) => r.segment === "core"),
    seo: records.filter((r) => r.segment === "seo"),
    local: records.filter((r) => r.segment === "local"),
    authority: records.filter((r) => r.segment === "authority"),
    assets: records.filter((r) => r.segment === "assets"),
    blog: records.filter((r) => r.segment === "blog"),
    legal: records.filter((r) => r.segment === "legal"),
  };
  groups.recent = records.filter((r) => ["core", "seo", "local", "authority", "assets"].includes(r.segment)).slice(0, 100).map((record) => ({ ...record, changefreq: "daily", priority: record.priority > "0.82" ? record.priority : "0.82" }));
  for (const [name, list] of Object.entries(groups)) {
    await fs.writeFile(path.join(root, "sitemaps", `sitemap-${name}.xml`), urlset(list), "utf8");
  }
  const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(groups).map((name) => `  <sitemap>
    <loc>${site}/sitemaps/sitemap-${name}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>
`;
  await fs.writeFile(path.join(root, "sitemap.xml"), index, "utf8");
  return groups;
}

async function updateSearchIndex() {
  const targets = [...seoSlugs, ...localSlugs, ...resourceSlugs, ...authorityPages.map((page) => page.slug), "sok", "sitemap", "latest-content"];
  const index = [];
  for (const slug of targets) {
    try {
      const html = await fs.readFile(path.join(root, slug, "index.html"), "utf8");
      index.push({
        title: stripTags((/<title>([\s\S]*?)<\/title>/i.exec(html) || [])[1] || "").replace(/\s*\|\s*Nordic Theory Labs$/, ""),
        description: (/<meta name="description" content="([^"]+)"/i.exec(html) || [])[1] || "",
        answer: stripTags((/<div class="quick-answer">([\s\S]*?)<\/div>/i.exec(html) || /<p class="definition-block">([\s\S]*?)<\/p>/i.exec(html) || [])[1] || ""),
        keywords: `${slug.replaceAll("-", " ")} ${Object.keys(entityGraph).join(" ")}`,
        intent: segmentFor(`${slug}/index.html`),
        url: pageUrl(slug),
      });
    } catch {
      // Optional page not present.
    }
  }
  await fs.writeFile(path.join(root, "assets", "search-index.json"), JSON.stringify(index, null, 2), "utf8");
}

async function writeMonitoringTool() {
  const script = `import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const observationsPath = path.join(root, "content", "seo", "ranking-observations.json");
let observations = [];
try { observations = JSON.parse(await fs.readFile(observationsPath, "utf8")); } catch {}
const keywords = ${JSON.stringify(keywords.map((item) => item.keyword), null, 2)};
const summary = keywords.map((keyword) => {
  const rows = observations.filter((row) => row.keyword === keyword).sort((a, b) => String(a.observed_at).localeCompare(String(b.observed_at)));
  const latest = rows.at(-1) || null;
  const previous = rows.at(-2) || null;
  return {
    keyword,
    observations: rows.length,
    latest_position: latest?.position ?? null,
    change: latest && previous && latest.position != null && previous.position != null ? previous.position - latest.position : null,
    latest_url: latest?.url ?? null,
  };
});
await fs.writeFile(path.join(root, "content", "seo", "ranking-trend-report.json"), JSON.stringify({ updated: "${today}", summary }, null, 2), "utf8");
console.log(JSON.stringify({ updated: "${today}", tracked_keywords: keywords.length, observations: observations.length, summary }, null, 2));
`;
  await fs.writeFile(path.join(root, "tools", "ranking-intelligence.mjs"), script, "utf8");
}

async function updateHeaders() {
  let headers = "";
  try { headers = await fs.readFile(path.join(root, "_headers"), "utf8"); } catch {}
  const additions = `

/assets/seo-growth.js
  Cache-Control: public, max-age=31536000, immutable

/assets/seo-growth.css
  Cache-Control: public, max-age=31536000, immutable

/authority/*
  Cache-Control: public, max-age=600
`;
  if (!headers.includes("/assets/seo-growth.js")) await fs.writeFile(path.join(root, "_headers"), `${headers.trim()}\n${additions}`, "utf8");
}

async function main() {
  await writeAssets();
  await writeAuthorityAssets();
  for (const slug of [...seoSlugs, ...localSlugs, ...resourceSlugs, "sok", "sitemap", "latest-content"]) await injectGrowth(slug);
  await updateSearchIndex();
  await writeMonitoringTool();
  await updateHeaders();
  const records = await buildRecords();
  await writeSitemaps(records);
  await writeReports(records);
  console.log(`Phase 5 growth systems generated: ${keywords.length} tracked keywords, ${authorityPages.length} authority pages, ${records.length} sitemap URLs.`);
}

await main();
