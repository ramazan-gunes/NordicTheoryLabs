import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const siteUrl = "https://nordictheorylabs.com";
const imageUrl = `${siteUrl}/images/kh-app-icon.png`;

const navLinks = [
  ["Körkortsteori", "korkortsteori/"],
  ["Gratis teoriprov", "gratis-teoriprov/"],
  ["Vägmärken", "vagmarken/"],
  ["FAQ", "faq/"],
  ["App", "apps/korkort-hero/"],
];

const sharedLinks = [
  ["Körkortsteori", "korkortsteori/"],
  ["Teoriprov B", "teoriprov/"],
  ["Gratis teoriprov", "gratis-teoriprov/"],
  ["Körkort kostnad kalkylator", "korkort-kostnad-kalkylator/"],
  ["Körkort tidsplan", "korkort-tidsplan/"],
  ["Vägmärken", "vagmarken/"],
  ["FAQ om körkort", "faq/"],
  ["Körkort Hero", "apps/korkort-hero/"],
];

const pages = [
  {
    path: "korkortsteori/index.html",
    title: "Körkortsteori 2026 - plugga smart inför teoriprovet",
    description: "Körkortsteori för B-körkort i Sverige: regler, vägmärken, riskutbildning, provstrategi och gratis övning inför teoriprovet.",
    kicker: "Körkort · Teori · 2026",
    h1: "Körkortsteori för dig som vill klara teoriprovet.",
    lede: "En svensk, rak och praktisk guide till körkortsteori: vad du ska läsa, hur du tränar frågor och hur du bygger säker förståelse inför Trafikverkets kunskapsprov.",
    cta: ["Öva gratis teoriprov", "gratis-teoriprov/"],
    secondaryCta: ["Läs om vägmärken", "vagmarken/"],
    trust: ["B-körkort", "Svenska provord", "Vägmärken", "Riskettan + risktvåan"],
    sections: [
      {
        h2: "Vad ingår i körkortsteori?",
        p: "Körkortsteori handlar inte bara om att memorera svar. Du behöver förstå trafikregler, risker, vägmärken, miljökörning, säkerhetsmarginaler och hur du fattar beslut när situationen ändras snabbt.",
        bullets: ["Trafikregler och högerregeln", "Vägmärken och vägmarkeringar", "Hastighet, avstånd och bromssträcka", "Alkohol, trötthet och riskbeteenden"],
      },
      {
        h2: "Studieplan för teoriprovet",
        p: "Börja brett, gå sedan över till svaga områden. Avsluta varje vecka med blandade provfrågor och en kort genomgång av felen.",
        bullets: ["Vecka 1-2: grundregler och vägmärken", "Vecka 3-4: risk, miljö och säkerhet", "Vecka 5: blandade prov och repetition", "Sista dagarna: lugn repetition, inte panikläsning"],
      },
    ],
    faqs: [
      ["Hur pluggar man körkortsteori snabbast?", "Kombinera korta teoripass med övningsfrågor varje dag. Gå igenom fel direkt och repetera samma område efter 24-48 timmar."],
      ["Räcker det att bara göra teoriprov online?", "Nej. Övningsprov är bäst när du också läser förklaringar och förstår varför rätt svar är rätt."],
      ["Vilka områden missar flest elever?", "Väjningsregler, hastighetsanpassning, riskbeteenden, miljökörning och vägmärken blandas ofta ihop."],
    ],
  },
  {
    path: "teoriprov/index.html",
    title: "Teoriprov B - frågor, regler och övning inför kunskapsprovet",
    description: "Allt om teoriprov B i Sverige: hur kunskapsprovet fungerar, vilka ämnen som testas och hur du tränar med rätt provstrategi.",
    kicker: "Kunskapsprov · B-körkort",
    h1: "Teoriprov B: träna som om provet vore på riktigt.",
    lede: "Teoriprovet mäter om du kan använda reglerna i verkliga trafiksituationer. Den här sidan samlar provstruktur, ämnen, vanliga misstag och länkar till gratis övning.",
    cta: ["Starta gratis prov", "gratis-teoriprov/"],
    secondaryCta: ["Bygg en tidsplan", "korkort-tidsplan/"],
    trust: ["Provstrategi", "Vanliga misstag", "Svenska termer", "Mobilvänlig övning"],
    sections: [
      {
        h2: "Så tränar du inför kunskapsprovet",
        p: "Träningen ska växla mellan ämnespass och blandade prov. Ämnespass bygger förståelse. Blandade prov tränar tidspress och läsförståelse.",
        bullets: ["Läs frågan två gånger innan du svarar", "Markera ord som alltid, endast och måste", "Träna svaga ämnen separat", "Spara mock-prov till slutet av veckan"],
      },
      {
        h2: "Vanliga orsaker till underkänt",
        p: "Många kan reglerna men tappar poäng när frågan beskriver en ny situation. Träna därför på varför ett svar är fel, inte bara vilket svar som är rätt.",
        bullets: ["För snabb läsning", "Brist på väjningsregler", "Missförstånd kring risker", "För få blandade prov"],
      },
    ],
    faqs: [
      ["Hur många rätt krävs på teoriprovet?", "Trafikverket anger godkänd gräns i provinformationen. Träna alltid för marginal, inte exakt miniminivå."],
      ["Hur nära provet ska jag göra övningsprov?", "Gör blandade prov under sista veckan, men undvik sena panikpass kvällen före."],
      ["Är teoriprovet samma som app-frågor?", "Nej. App-frågor ska lära samma kunskapsområden och provlogik, men Trafikverkets faktiska frågor är inte publika."],
    ],
  },
  {
    path: "gratis-teoriprov/index.html",
    title: "Gratis teoriprov online - öva körkortsfrågor för B-körkort",
    description: "Testa gratis teoriprov online med svenska körkortsfrågor om väjningsregler, risk, hastighet, vägmärken och säker körning.",
    kicker: "Gratis verktyg · Teoriprov",
    h1: "Gratis teoriprov för B-körkort.",
    lede: "Öva på provkänsla direkt i webbläsaren. Frågorna är korta exempel som visar hur du ska tänka kring regler, risk och vägmärken.",
    cta: ["Ladda ner Körkort Hero", "apps/korkort-hero/"],
    secondaryCta: ["Läs provguiden", "teoriprov/"],
    trust: ["Ingen inloggning", "Mobilanpassat", "Svenska frågor", "Direkt resultat"],
    tool: "quiz",
    sections: [
      {
        h2: "Så använder du gratisprovet",
        p: "Svara på frågorna, läs resultatet och gå vidare till ämnet där du är osäker. För full träning behövs fler frågor, förklaringar och repetition över flera dagar.",
        bullets: ["Gör provet utan att pausa", "Skriv ned osäkra ämnen", "Repetera vägmärken separat", "Avsluta med blandade frågor"],
      },
    ],
    faqs: [
      ["Är gratisprovet exakt som Trafikverkets prov?", "Nej. Det är ett pedagogiskt övningsprov med samma ämnestänk, inte Trafikverkets faktiska frågor."],
      ["Kan jag öva på mobilen?", "Ja. Sidan är byggd mobil-first och fungerar utan inloggning."],
      ["Vad gör jag efter gratisprovet?", "Gå vidare till en strukturerad studieplan och fortsätt med fler blandade frågor i Körkort Hero."],
    ],
  },
  {
    path: "korkort-kostnad-kalkylator/index.html",
    title: "Körkort kostnad kalkylator - räkna pris för B-körkort",
    description: "Räkna ut ungefärlig kostnad för körkort i Sverige med lektioner, riskettan, risktvåan, provavgifter, syntest och privat övningskörning.",
    kicker: "Gratis verktyg · Kostnad",
    h1: "Körkort kostnad kalkylator.",
    lede: "Fyll i antal körlektioner, lektionspris och fasta avgifter för att få en realistisk uppskattning av vad B-körkortet kan kosta.",
    cta: ["Räkna tidsplan också", "korkort-tidsplan/"],
    secondaryCta: ["Läs kostnadsguiden", "blog/sv/vad-kostar-korkort-i-sverige.html"],
    trust: ["SEK", "Körlektioner", "Riskutbildning", "Provavgifter"],
    tool: "cost",
    sections: [
      {
        h2: "Vad påverkar priset mest?",
        p: "Den största skillnaden är ofta antal körlektioner. Privat övningskörning med handledare kan minska kostnaden, men bara om träningen är strukturerad.",
        bullets: ["Antal körlektioner", "Pris per lektion", "Riskettan och risktvåan", "Omkostnader vid omprov"],
      },
    ],
    faqs: [
      ["Vad kostar körkort i Sverige?", "Många hamnar någonstans mellan cirka 15 000 och 35 000 kronor, beroende på körvana, stad, trafikskola och antal prov."],
      ["Är privat övningskörning billigare?", "Ja, ofta. Men handledare och elev behöver planera träningen så att den kompletterar trafikskolan."],
      ["Ingår syntest och tillstånd i kalkylen?", "Kalkylen lägger till en baspost för syntest och administrativa kostnader, men lokala priser varierar."],
    ],
  },
  {
    path: "korkort-tidsplan/index.html",
    title: "Körkort tidsplan - planera vägen till teoriprov och körprov",
    description: "Skapa en enkel tidsplan för B-körkort: körkortstillstånd, teori, riskutbildning, övningskörning, teoriprov och körprov.",
    kicker: "Gratis verktyg · Planering",
    h1: "Körkort tidsplan från start till prov.",
    lede: "Planera hur många veckor du behöver utifrån nuvarande nivå, studietid per vecka och önskat provdatum.",
    cta: ["Starta teoriprov", "gratis-teoriprov/"],
    secondaryCta: ["Läs om körkortstillstånd", "blog/sv/korkortstillstand-syntest.html"],
    trust: ["Veckoplan", "Teori + körning", "Riskutbildning", "Provdatum"],
    tool: "timeline",
    sections: [
      {
        h2: "Ordningen som minskar stress",
        p: "Körkortstillstånd och syntest ska ligga tidigt. Teori och körning bör gå parallellt så att reglerna kopplas till verkliga trafiksituationer.",
        bullets: ["Körkortstillstånd och syntest", "Grundteori och vägmärken", "Privat övningskörning eller trafikskola", "Riskettan, risktvåan och provbokning"],
      },
    ],
    faqs: [
      ["Hur lång tid tar det att ta körkort?", "För många tar det 2-6 månader, men intensiv uppläggning kan gå snabbare om teori, körning och provtider klaffar."],
      ["När ska jag boka teoriprovet?", "Boka när du klarar blandade övningsprov stabilt och kan förklara varför fel svar är fel."],
      ["När ska riskettan och risktvåan göras?", "Riskettan kan göras tidigt. Risktvåan fungerar bäst när du har god kontroll på bilen."],
    ],
  },
  {
    path: "faq/index.html",
    title: "Körkort FAQ - vanliga frågor om teoriprov, körprov och B-körkort",
    description: "Svar på vanliga frågor om körkort i Sverige: teoriprov, körkortstillstånd, syntest, handledare, riskettan, risktvåan och vägmärken.",
    kicker: "FAQ · Körkort i Sverige",
    h1: "Vanliga frågor om körkort, teori och prov.",
    lede: "Snabba, tydliga svar för dig som planerar B-körkort i Sverige och vill veta vad som krävs innan teoriprov och körprov.",
    cta: ["Öva gratis teoriprov", "gratis-teoriprov/"],
    secondaryCta: ["Planera kostnaden", "korkort-kostnad-kalkylator/"],
    trust: ["Körkortstillstånd", "Handledare", "Teoriprov", "Riskutbildning"],
    sections: [
      {
        h2: "FAQ-hub för högintenta frågor",
        p: "Den här sidan samlar frågor som ofta dyker upp sent i beslutsresan: när eleven redan vill boka, börja öva eller välja app.",
        bullets: ["Länkar vidare till djupguider", "Svarar med korta stycken", "Bygger internlänkar till verktyg", "Matchar svenska sökfraser"],
      },
    ],
    faqs: [
      ["Hur ansöker jag om körkortstillstånd?", "Du ansöker digitalt hos Transportstyrelsen och gör syntest hos optiker eller trafikskola innan tillståndet kan beviljas."],
      ["Måste jag gå riskettan och risktvåan?", "Ja, båda riskutbildningarna krävs för B-körkort och måste vara giltiga när du gör prov."],
      ["Kan jag övningsköra privat?", "Ja, om eleven har körkortstillstånd och handledaren är godkänd. Bilen behöver också uppfylla kraven för övningskörning."],
      ["Hur pluggar jag bäst till teoriprovet?", "Varva teori, frågor och felgenomgång. Lägg extra tid på väjningsregler, vägmärken och riskfrågor."],
      ["Vad kostar B-körkort?", "Priset beror främst på antal körlektioner och om du kan övningsköra privat. Använd kalkylatorn för en egen uppskattning."],
    ],
  },
  {
    path: "vagmarken/index.html",
    title: "Vägmärken 2026 - lär dig svenska trafikskyltar inför teoriprovet",
    description: "Guide till svenska vägmärken och vägmarkeringar: varningsmärken, förbudsmärken, påbudsmärken, anvisningsmärken och väjningsregler.",
    kicker: "Vägmärken · Trafikskyltar",
    h1: "Vägmärken för teoriprovet och verklig körning.",
    lede: "Lär dig hur svenska trafikskyltar fungerar i grupper. Fokusera på form, färg och situation så blir vägmärken lättare att tolka i provfrågor.",
    cta: ["Öva vägmärken i prov", "gratis-teoriprov/"],
    secondaryCta: ["Läs väjningsregler", "vagmarken/vajningsregler/"],
    trust: ["Varningsmärken", "Förbudsmärken", "Påbudsmärken", "Väjningsregler"],
    signs: [
      ["Varningsmärken", "Triangel med röd kant varnar för fara längre fram.", "vagmarken/varningsmarken/", "!"],
      ["Förbudsmärken", "Rund skylt med röd kant visar vad som är förbjudet.", "vagmarken/forbudsmarken/", "P"],
      ["Påbudsmärken", "Blå rund skylt visar vad du måste göra.", "vagmarken/pabudsmarken/", "→"],
      ["Väjningsregler", "Skyltar och regler som avgör vem som kör först.", "vagmarken/vajningsregler/", "↓"],
    ],
    sections: [
      {
        h2: "Så känner du igen skyltgrupperna",
        p: "Form och färg ger ofta svaret innan du läser symbolen. Det är därför provfrågor ofta visar en trafiksituation där skylten bara är en del av beslutet.",
        bullets: ["Triangel betyder oftast varning", "Röd ring betyder ofta förbud", "Blå rund skylt betyder påbud", "Tilläggstavlor ändrar betydelsen"],
      },
    ],
    faqs: [
      ["Hur lär man sig vägmärken snabbast?", "Sortera dem i grupper efter form och färg innan du pluggar enskilda symboler."],
      ["Kommer vägmärken på teoriprovet?", "Ja. Vägmärken, vägmarkeringar och hur de påverkar ditt beslut i trafiken är centrala delar av provet."],
      ["Är tilläggstavlor viktiga?", "Ja. En tilläggstavla kan begränsa tid, fordonstyp, riktning eller avstånd och ändrar hur du ska tolka huvudmärket."],
    ],
  },
  {
    path: "vagmarken/varningsmarken/index.html",
    title: "Varningsmärken - svenska varningsskyltar inför teoriprovet",
    description: "Lär dig svenska varningsmärken: farlig kurva, övergångsställe, barn, vägarbete, vilt, halt väglag och andra risker.",
    kicker: "Vägmärken · Varningsmärken",
    h1: "Varningsmärken: upptäck faran innan den kommer.",
    lede: "Varningsmärken hjälper dig att sänka tempot, söka risker och planera placering innan situationen blir svår.",
    cta: ["Till alla vägmärken", "vagmarken/"],
    secondaryCta: ["Öva gratis prov", "gratis-teoriprov/"],
    trust: ["Triangel", "Röd kant", "Risk framåt", "Anpassa hastighet"],
    sections: [
      {
        h2: "Vanliga varningsmärken i provfrågor",
        p: "Provfrågor testar ofta om du förstår vilken risk som följer efter märket, inte bara vad symbolen heter.",
        bullets: ["Varning för barn kräver låg fart och bred uppmärksamhet", "Viltvarning betyder risk även om vägen är tom", "Vägarbete kan innebära personal, grus och smala körfält", "Halt väglag kräver längre avstånd"],
      },
    ],
    faqs: [
      ["Vad betyder ett triangelformat vägmärke?", "Det är normalt ett varningsmärke som berättar att en risk eller fara kommer längre fram."],
      ["Måste jag alltid bromsa vid varningsmärke?", "Du ska anpassa hastigheten efter risken, sikten och trafiksituationen. Ibland räcker det att släppa gasen och öka beredskapen."],
    ],
  },
  {
    path: "vagmarken/forbudsmarken/index.html",
    title: "Förbudsmärken - svenska förbudsskyltar och regler",
    description: "Förbudsmärken inför teoriprovet: infart förbjuden, omkörningsförbud, parkeringsförbud, hastighetsgränser och fordonsspecifika förbud.",
    kicker: "Vägmärken · Förbud",
    h1: "Förbudsmärken: vad du inte får göra.",
    lede: "Förbudsmärken är ofta runda med röd kant och berättar vilket beteende som inte är tillåtet på platsen.",
    cta: ["Öva teorifrågor", "gratis-teoriprov/"],
    secondaryCta: ["Till vägmärkesguiden", "vagmarken/"],
    trust: ["Röd ring", "Förbud", "Tilläggstavlor", "Hastighet"],
    sections: [
      {
        h2: "Så tolkar du förbudsmärken",
        p: "Titta alltid efter tilläggstavlor. De kan ange tid, riktning, fordonstyp eller sträcka där förbudet gäller.",
        bullets: ["Röd ring anger ofta förbud", "Hastighetsmärken är också förbudsmärken", "Parkeringsförbud kan styras av tider", "Omkörningsförbud gäller tills det upphör"],
      },
    ],
    faqs: [
      ["Är hastighetsbegränsning ett förbudsmärke?", "Ja, hastighetsgränsen anger högsta tillåtna hastighet och räknas som ett förbudsmärke."],
      ["Vad gör en tilläggstavla?", "Den förtydligar eller begränsar huvudmärket, till exempel tid, avstånd eller fordonstyp."],
    ],
  },
  {
    path: "vagmarken/pabudsmarken/index.html",
    title: "Påbudsmärken - blå skyltar du måste följa",
    description: "Lär dig svenska påbudsmärken inför teoriprovet: körriktning, gångbana, cykelbana, rondell och obligatoriska körfält.",
    kicker: "Vägmärken · Påbud",
    h1: "Påbudsmärken: vad du måste göra.",
    lede: "Påbudsmärken är oftast blå och runda. De visar en obligatorisk riktning, bana eller åtgärd.",
    cta: ["Öva gratis teoriprov", "gratis-teoriprov/"],
    secondaryCta: ["Till vägmärken", "vagmarken/"],
    trust: ["Blå rund skylt", "Obligatoriskt", "Körriktning", "Cykel och gång"],
    sections: [
      {
        h2: "Påbud i verklig trafik",
        p: "Påbudsmärken påverkar placering och planering. Missar du skylten kan du hamna i fel körfält eller bryta mot körriktningen.",
        bullets: ["Följ angiven körriktning", "Respektera gång- och cykelbanor", "Läs skyltar före korsningar", "Planera filval tidigt"],
      },
    ],
    faqs: [
      ["Vilken färg har påbudsmärken?", "De är normalt blå med vit symbol."],
      ["Är påbudsmärken frivilliga rekommendationer?", "Nej. Påbud visar vad du måste göra."],
    ],
  },
  {
    path: "vagmarken/vajningsregler/index.html",
    title: "Väjningsregler - högerregeln, huvudled och lämna företräde",
    description: "Lär dig väjningsregler inför teoriprovet: högerregeln, huvudled, väjningsplikt, stopplikt, cirkulationsplats och utfartsregeln.",
    kicker: "Teoriprov · Väjningsregler",
    h1: "Väjningsregler som avgör vem som kör först.",
    lede: "Väjningsregler är ett av de viktigaste områdena i teoriprovet. Lär dig skyltar, huvudled och situationer där högerregeln gäller.",
    cta: ["Öva provfrågor", "gratis-teoriprov/"],
    secondaryCta: ["Läs om teoriprovet", "teoriprov/"],
    trust: ["Högerregeln", "Huvudled", "Stopplikt", "Cirkulationsplats"],
    sections: [
      {
        h2: "Grundreglerna",
        p: "Börja alltid med skyltar och vägmarkeringar. Om det inte finns skyltar som styr situationen kan högerregeln eller andra grundregler avgöra.",
        bullets: ["Lämna företräde vid väjningsplikt", "Stanna helt vid stopplikt", "Högerregeln gäller i många oskyltade korsningar", "Utfartsregeln gäller när du kör ut från vissa platser"],
      },
    ],
    faqs: [
      ["När gäller högerregeln?", "Högerregeln gäller ofta i oskyltade korsningar där inga andra regler eller skyltar anger företräde."],
      ["Vad betyder väjningsplikt?", "Du ska tydligt visa att du tänker lämna företräde och bara köra vidare om det kan ske utan fara eller hinder."],
      ["Måste man stanna vid stopplikt även om vägen är tom?", "Ja. Vid stopplikt måste du stanna helt."],
    ],
  },
];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function prefixFor(relativePath) {
  const depth = relativePath.split("/").length - 1;
  return "../".repeat(depth);
}

function absoluteUrl(relativePath) {
  if (relativePath.endsWith("/index.html")) return `${siteUrl}/${relativePath.slice(0, -"index.html".length)}`;
  return `${siteUrl}/${relativePath}`;
}

function link(prefix, href) {
  if (href.startsWith("http") || href.startsWith("#")) return href;
  return `${prefix}${href}`;
}

function brandMark() {
  return `<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><rect class="sig-frame" x="20" y="20" width="180" height="180" rx="22" fill="none" stroke-width="6"/><line class="sig-axis" x1="20" y1="110" x2="200" y2="110" stroke-width="2"/><path class="sig-wave" d="M 30 130 Q 70 60, 110 110 T 190 90" stroke-width="8" fill="none" stroke-linecap="round"/><circle class="sig-dot" cx="190" cy="90" r="10"/></svg></span>`;
}

function nav(prefix, currentPath) {
  const links = navLinks
    .map(([label, href]) => {
      const active = currentPath.startsWith(href) ? " class=\"active\"" : "";
      return `<a${active} href="${link(prefix, href)}">${escapeHtml(label)}</a>`;
    })
    .join("");
  return `<header class="nav">
  <div class="wrap nav-inner">
    <a href="${prefix}" class="brand" aria-label="Nordic Theory Labs">${brandMark()}<span class="brand-name">Nordic <em>Theory</em> Labs</span></a>
    <nav class="nav-links" aria-label="Primär navigering">${links}</nav>
    <div class="nav-meta"><span class="pulse"></span><span>SV SEO</span></div>
  </div>
</header>`;
}

function breadcrumbs(page) {
  const parts = page.path.split("/").filter((part) => part !== "index.html");
  const items = [{ name: "Nordic Theory Labs", item: `${siteUrl}/` }];
  if (parts[0] === "vagmarken" && parts.length > 1) {
    items.push({ name: "Vägmärken", item: `${siteUrl}/vagmarken/` });
  }
  items.push({ name: page.title.split(" - ")[0], item: absoluteUrl(page.path) });
  return items;
}

function jsonLd(page) {
  const url = absoluteUrl(page.path);
  const crumbs = breadcrumbs(page);
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Nordic Theory Labs",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/logos/exports/signal/favicon-32.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Nordic Theory Labs",
      url: `${siteUrl}/`,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "sv-SE",
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: ["körkort", "teoriprov", "körkortsteori", "B-körkort"],
      inLanguage: "sv-SE",
      primaryImageOfPage: { "@type": "ImageObject", url: imageUrl },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: crumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    },
  ];

  if (page.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: page.faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }

  if (page.tool) {
    graph.push({
      "@type": "SoftwareApplication",
      "@id": `${url}#tool`,
      name: page.title.split(" - ")[0],
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "SEK" },
      inLanguage: "sv-SE",
      url,
    });
  }

  if (page.signs) {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#sign-cluster`,
      name: "Vägmärken kluster",
      itemListElement: page.signs.map(([name, description, href], index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/${href}`,
        name,
        description,
      })),
    });
  }

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}

function head(page, prefix) {
  const url = absoluteUrl(page.path);
  return `<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(page.title)} | Nordic Theory Labs</title>
<meta name="description" content="${escapeHtml(page.description)}" />
<meta name="robots" content="index,follow,max-image-preview:large" />
<link rel="canonical" href="${url}" />
<link rel="alternate" hreflang="sv" href="${url}" />
<link rel="alternate" hreflang="sv-SE" href="${url}" />
<link rel="alternate" hreflang="x-default" href="${url}" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Nordic Theory Labs" />
<meta property="og:title" content="${escapeHtml(page.title)} | Nordic Theory Labs" />
<meta property="og:description" content="${escapeHtml(page.description)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${imageUrl}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(page.title)} | Nordic Theory Labs" />
<meta name="twitter:description" content="${escapeHtml(page.description)}" />
<meta name="twitter:image" content="${imageUrl}" />
<script type="application/ld+json">${jsonLd(page)}</script>
<link rel="icon" type="image/svg+xml" href="${prefix}logos/exports/signal/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="${prefix}logos/exports/signal/favicon-32.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${prefix}assets/site.css" />
<link rel="stylesheet" href="${prefix}assets/seo-pages.css" />
</head>`;
}

function internalLinks(page, prefix) {
  const links = (page.links || sharedLinks).filter(([, href]) => href !== page.path.replace("index.html", ""));
  return `<div class="internal-link-grid">${links.slice(0, 8).map(([label, href]) => `<a href="${link(prefix, href)}">${escapeHtml(label)} <span>→</span></a>`).join("")}</div>`;
}

function toolMarkup(tool) {
  if (tool === "cost") {
    return `<div class="tool-panel" data-cost-calculator>
  <h3>Räkna ungefärlig körkortskostnad</h3>
  <div class="tool-grid">
    <div class="tool-field"><label for="lessons">Antal körlektioner</label><input id="lessons" data-cost-lessons type="number" min="0" value="18" /></div>
    <div class="tool-field"><label for="lessonPrice">Pris per lektion</label><input id="lessonPrice" data-cost-lesson-price type="number" min="0" value="850" /></div>
    <div class="tool-field"><label for="riskCost">Riskettan + risktvåan</label><input id="riskCost" data-cost-risk type="number" min="0" value="4200" /></div>
    <div class="tool-field"><label for="testCost">Provavgifter och bokning</label><input id="testCost" data-cost-tests type="number" min="0" value="2400" /></div>
  </div>
  <div class="tool-result"><strong data-cost-result></strong><span data-cost-detail></span></div>
</div>`;
  }
  if (tool === "timeline") {
    return `<div class="tool-panel" data-timeline-planner>
  <h3>Skapa en körkortsplan</h3>
  <div class="tool-grid">
    <div class="tool-field"><label for="level">Nuvarande nivå</label><select id="level" data-plan-level><option value="beginner">Ny förare</option><option value="some">Har övningskört lite</option><option value="ready">Nästan provredo</option></select></div>
    <div class="tool-field"><label for="hours">Studie- och körningstimmar per vecka</label><input id="hours" data-plan-hours type="number" min="1" value="5" /></div>
    <div class="tool-field"><label for="target">Önskat provdatum</label><input id="target" data-plan-target type="date" /></div>
  </div>
  <div class="tool-result"><strong data-plan-result></strong><span data-plan-detail></span></div>
</div>`;
  }
  if (tool === "quiz") {
    return `<div class="tool-panel" data-theory-quiz>
  <h3 data-quiz-question></h3>
  <p data-quiz-status></p>
  <div data-quiz-options></div>
</div>`;
  }
  return "";
}

function signsMarkup(page, prefix) {
  if (!page.signs) return "";
  return `<div class="sign-grid">${page.signs.map(([name, description, href, glyph], index) => {
    const type = index === 1 ? " red" : index === 2 ? " blue" : "";
    return `<a class="sign-card" href="${link(prefix, href)}"><span class="sign-symbol${type}">${escapeHtml(glyph)}</span><h3>${escapeHtml(name)}</h3><p>${escapeHtml(description)}</p></a>`;
  }).join("")}</div>`;
}

function renderPage(page) {
  const prefix = prefixFor(page.path);
  const sectionHtml = page.sections.map((section, index) => `<section class="seo-section${index % 2 ? " alt" : ""}">
  <div class="wrap">
    <h2>${escapeHtml(section.h2)}</h2>
    <p>${escapeHtml(section.p)}</p>
    <ul class="seo-list">${section.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  </div>
</section>`).join("\n");

  const faqHtml = page.faqs?.length ? `<section class="seo-section alt" id="faq">
  <div class="wrap">
    <h2>Vanliga frågor</h2>
    <div class="faq-list">${page.faqs.map(([question, answer]) => `<details class="faq-item"><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join("")}</div>
  </div>
</section>` : "";

  return `<!doctype html>
<html lang="sv-SE">
${head(page, prefix)}
<body class="seo-page">
${nav(prefix, page.path)}
<main>
  <section class="seo-hero">
    <div class="wrap seo-grid">
      <div>
        <p class="seo-kicker">${escapeHtml(page.kicker)}</p>
        <h1 class="seo-h1">${escapeHtml(page.h1)}</h1>
        <p class="seo-lede">${escapeHtml(page.lede)}</p>
        <div class="seo-actions">
          <a class="seo-btn primary" href="${link(prefix, page.cta[1])}">${escapeHtml(page.cta[0])}</a>
          <a class="seo-btn secondary" href="${link(prefix, page.secondaryCta[1])}">${escapeHtml(page.secondaryCta[0])}</a>
        </div>
      </div>
      <aside class="seo-trust" aria-label="Sidans innehåll">${page.trust.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</aside>
    </div>
  </section>
  <section class="seo-section">
    <div class="wrap">
      <h2>Direkt till nästa steg</h2>
      ${internalLinks(page, prefix)}
      ${toolMarkup(page.tool)}
      ${signsMarkup(page, prefix)}
    </div>
  </section>
${sectionHtml}
${faqHtml}
  <section class="seo-footer-cta">
    <div class="wrap">
      <h2>Fortsätt i Körkort Hero.</h2>
      <p>Träna teori, vägmärken och provfrågor i en lugn app byggd för svenska B-körkort.</p>
      <div class="seo-actions">
        <a class="seo-btn primary" href="${prefix}apps/korkort-hero/">Öppna app-sidan</a>
        <a class="seo-btn secondary" href="${prefix}blog/sv/">Läs svenska guider</a>
      </div>
    </div>
  </section>
</main>
${page.tool ? `<script src="${prefix}assets/seo-tools.js" defer></script>` : ""}
</body>
</html>
`;
}

for (const page of pages) {
  const target = path.join(root, page.path);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, renderPage(page), "utf8");
}

console.log(`Built ${pages.length} SEO pages.`);
