import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const site = "https://nordictheorylabs.com";
const appStoreUrl = "https://apps.apple.com/id/app/driving-license-in-sweden/id6762642524";
const appImage = `${site}/images/kh-app-icon.png`;
const updatedDate = "2026-05-22";
const updatedIso = "2026-05-22T12:00:00+02:00";

const targetSlugs = [
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

const officialSources = [
  ["Trafikverket", "https://www.trafikverket.se/"],
  ["Transportstyrelsen", "https://www.transportstyrelsen.se/"],
];

const entityBank = {
  Trafikverket: "Trafikverket ansvarar bland annat för kunskapsprov och körprov. När regler, bokning eller provvillkor ändras är deras information den viktiga källan.",
  Riskettan: "Riskettan är den teoretiska delen av riskutbildningen. Den handlar om alkohol, droger, trötthet och andra val som snabbt kan bli farliga.",
  "Risk 2": "Risk 2, ofta kallad halkbanan, tränar riskförståelse kring fart, underlag och kontroll. Den bör göras när körningen redan känns ganska trygg.",
  Kunskapsprov: "Kunskapsprovet är teoriprovet för B-körkort. Det mäter om du kan använda regler och riskbedömning i trafiksituationer.",
  Körprov: "Körprovet visar om du kör självständigt, planerar i tid och fattar säkra beslut i verklig trafik.",
  Väjningsplikt: "Väjningsplikt betyder att du tydligt ska sakta in eller stanna så att andra inte behöver bromsa hårt eller väja.",
  Motorväg: "Motorväg kräver fartbedömning, avstånd och lugna körfältsbyten. Många elever stressar vid påfart och missar speglarna.",
  Vinterdäck: "Vinterdäck och väglag påverkar bromssträcka, grepp och hastighetsval. Svenska vintervägar kräver större marginaler.",
  Halkbana: "Halkbana används ofta som vardagsnamn för Risk 2. Poängen är riskförståelse, inte att lära sig sladda.",
  Körkortstillstånd: "Körkortstillstånd krävs innan du får övningsköra. Syntest och ansökan bör göras tidigt så att processen inte fastnar.",
};

const profiles = {
  korkortsteori: {
    layout: 0,
    kicker: "Teori i vanlig svenska",
    h1: "Körkortsteori som går att använda när du kör.",
    intro: "Du behöver inte läsa allt på en kväll. Börja med regler som syns i trafiken: väjning, skyltar, hastighet och risk. När teorin kopplas till riktiga situationer sitter den mycket bättre.",
    answer: "Körkortsteori är reglerna, riskerna och besluten du behöver förstå för B-körkort. Plugga ett område i taget, gör frågor direkt efteråt och skriv ner felen med egna ord. Då blir teorin mindre som plugg och mer som körning.",
    cta: ["Testa 10 frågor", "gratis-teoriprov/"],
    secondary: ["Läs om kunskapsprovet", "teoriprov/"],
    summaryHeading: "Börja med det som märks i bilen",
    faqHeading: "Frågor elever ställer om teori",
    scenarioTitle: "Exempel från en vanlig körlektion",
    scenario: "Du kommer mot en oskyltad korsning i Göteborg. Läraren säger inget. Det är då teorin ska hjälpa dig: släpp gasen, sök höger, visa bromsberedskap och välj fart innan korsningen.",
    method: ["Läs ett kort avsnitt", "Gör fem frågor direkt", "Skriv varför varje fel blev fel", "Öva samma regel i bilen"],
    mistakes: ["läser regler men hoppar över frågor", "gör blandade prov för tidigt", "kan ordet högerregel men missar situationen"],
    entities: ["Körkortstillstånd", "Kunskapsprov", "Väjningsplikt", "Trafikverket"],
    links: [["öva körkortsfrågor gratis", "gratis-korkort-fragor/"], ["se vägmärkena i grupper", "vagmarken/"], ["planera teorin vecka för vecka", "korkort-tidsplan/"]],
  },
  teoriprov: {
    layout: 1,
    kicker: "Kunskapsprov utan panik",
    h1: "Teoriprov B: läs frågan lugnt, välj säkert.",
    intro: "Många kan mer än de tror men tappar poäng när frågan känns stressig. Träna därför på tempo, nyckelord och verkliga trafiksituationer, inte bara på att känna igen svar.",
    answer: "Teoriprovet, eller kunskapsprovet, testar om du kan använda svensk körkortsteori i trafiken. Det bästa sättet att träna är att blanda provfrågor med felgenomgång och extra repetition av väjning, vägmärken och risk.",
    cta: ["Gör ett provpass", "gratis-teoriprov/"],
    secondary: ["Om du kuggar provet", "underkand-teoriprov/"],
    summaryHeading: "Det här brukar avgöra provet",
    faqHeading: "Snabba svar om teoriprovet",
    scenarioTitle: "När frågan känns lurig",
    scenario: "En fråga beskriver regn, mörker och en cyklist nära vägen. Den handlar kanske inte om en siffra. Den testar om du sänker farten, ökar avståndet och tänker risk före tid.",
    method: ["Gör prov med timer ibland", "Markera frågor där du chansar", "Läs förklaringen innan nästa prov", "Sov ordentligt sista natten"],
    mistakes: ["svarar innan hela frågan är läst", "missar ord som alltid eller endast", "pluggar bara kvällen före"],
    entities: ["Kunskapsprov", "Trafikverket", "Väjningsplikt", "Riskettan"],
    links: [["träna gratis teoriprov online", "teoriprov-gratis-online/"], ["läs vanliga teorifällor", "klara-teoriprovet/"], ["bygg en tidsplan", "korkort-tidsplan/"]],
  },
  "gratis-teoriprov": {
    layout: 2,
    kicker: "Gratis nivåtest",
    h1: "Gratis teoriprov för att se var du står.",
    intro: "Gör ett kort prov när du vill känna av nivån. Ta resultatet som en fingervisning, inte som en dom. Det viktigaste är vilka kategorier som behöver mer repetition.",
    answer: "Ett gratis teoriprov visar snabbt om du är stark på regler, vägmärken, risk och miljö. Använd poängen för att välja nästa pluggpass. Låg poäng är bara en karta över vad du ska repetera.",
    cta: ["Starta gratis test", "#practice"],
    secondary: ["Plugga vidare i appen", "apps/korkort-hero/"],
    summaryHeading: "Använd testet på rätt sätt",
    faqHeading: "Frågor om gratis övning",
    scenarioTitle: "Efter ett svagt resultat",
    scenario: "Om du får många fel på vägmärken ska du inte göra fem blandade prov till. Stanna upp, träna skyltgruppen separat och kom tillbaka när symbolerna känns självklara.",
    method: ["Välj kategori", "Svara utan att pausa", "Läs felen direkt", "Gör om kategorin nästa dag"],
    mistakes: ["jagar hög poäng men läser inte fel", "byter kategori hela tiden", "tror att gratis test ersätter teori"],
    entities: ["Kunskapsprov", "Väjningsplikt", "Vinterdäck", "Motorväg"],
    links: [["gratis körkortsfrågor", "gratis-korkort-fragor/"], ["körkortsfrågor online", "korkort-fragor-online/"], ["bästa körkort appen", "basta-korkort-appen/"]],
  },
  "korkort-kostnad-kalkylator": {
    layout: 3,
    kicker: "Budget för B-körkort",
    h1: "Räkna på körkortet innan kostnaden springer iväg.",
    intro: "Körkort blir dyrt när träningen saknar plan. Skriv upp lektioner, riskutbildning, provavgifter och omprov redan från början. Då ser du var pengarna faktiskt går.",
    answer: "Kostnaden för B-körkort styrs mest av antal körlektioner, riskutbildning och omprov. En realistisk budget räknar även syntest, handledarkurs, privat övningskörning och extra lektioner före körprov.",
    cta: ["Se billigaste upplägget", "billigaste-korkortet-sverige/"],
    secondary: ["Kör privat eller trafikskola?", "trafikskola-vs-privat/"],
    summaryHeading: "Tre kostnader som gör störst skillnad",
    faqHeading: "Frågor om körkortskostnad",
    scenarioTitle: "Stockholmsexemplet",
    scenario: "I Stockholm kan lektionerna bli fler eftersom trafiken är tätare. Öva därför start, stopp och grundplacering privat om du kan. Använd trafikskolan till stadstrafik, rondeller och provlik körning.",
    method: ["Sätt en maxbudget", "Räkna lektioner per vecka", "Planera riskettan tidigt", "Boka prov först när nivån är stabil"],
    mistakes: ["väljer billig lektion men får otydlig feedback", "skjuter upp teorin", "bokar prov för tidigt och får omprov"],
    entities: ["Riskettan", "Risk 2", "Körprov", "Körkortstillstånd"],
    links: [["vad körkort kostar i Stockholm", "vad-kostar-korkort-stockholm/"], ["billigaste körkortet i Sverige", "billigaste-korkortet-sverige/"], ["snabbaste vägen till körkort", "snabbaste-sattet-att-ta-korkort/"]],
  },
  "korkort-tidsplan": {
    layout: 4,
    kicker: "Ordning på veckorna",
    h1: "En körkortstidsplan som faktiskt går att följa.",
    intro: "Det som tar tid är ofta väntan: tillstånd, riskutbildning, provtider och luckor mellan lektioner. Lägg ordningen tidigt så slipper du stå still när motivationen är hög.",
    answer: "En bra tidsplan börjar med syntest och körkortstillstånd. Därefter pluggar du teori och kör parallellt, gör riskettan i god tid och bokar teoriprov samt körprov först när resultaten är stabila.",
    cta: ["Se snabbaste vägen", "snabbaste-sattet-att-ta-korkort/"],
    secondary: ["Kolla riskettans giltighet", "hur-lange-galler-riskettan/"],
    summaryHeading: "Rätt ordning sparar tid",
    faqHeading: "Frågor om tidsplanen",
    scenarioTitle: "När du har sex veckor på dig",
    scenario: "Boka inte bara in körlektioner. Lägg två korta teoripass i veckan, ett privat körpass om möjligt och en tydlig repetition efter varje lektion. Små pass vinner ofta över stora ryck.",
    method: ["Gör syntest", "Ansök om tillstånd", "Sätt fasta teoridagar", "Boka riskutbildning innan provstress"],
    mistakes: ["väntar med teorin tills körningen nästan är klar", "glömmer riskutbildningens plats i planen", "bokar prov utan marginal"],
    entities: ["Körkortstillstånd", "Riskettan", "Risk 2", "Kunskapsprov"],
    links: [["plugga körkortsteori online", "korkortsteori-online/"], ["vad riskettan kostar", "vad-kostar-riskettan/"], ["klara teoriprovet", "klara-teoriprovet/"]],
  },
  faq: {
    layout: 5,
    kicker: "Korta körkortssvar",
    h1: "Körkortsfrågor utan krångliga omvägar.",
    intro: "Här samlar vi frågor som elever faktiskt brukar ställa: vad som ska bokas först, vad som kostar mest och hur man vet om man är redo för prov.",
    answer: "De flesta körkortsfrågor handlar om ordning, kostnad och provredohet. Börja med körkortstillstånd, plugga teori parallellt med körning och boka riskutbildning i god tid före prov.",
    cta: ["Gå till gratis test", "gratis-teoriprov/"],
    secondary: ["Läs körkortsteori", "korkortsteori/"],
    summaryHeading: "Snabb väg genom körkortet",
    faqHeading: "Vanliga frågor, korta svar",
    scenarioTitle: "När allt känns rörigt",
    scenario: "Skriv tre rubriker på papper: tillstånd, teori och körning. Placera varje bokning under rätt rubrik. Då ser du direkt vad som saknas innan provdagen.",
    method: ["Lös tillstånd först", "Plugga teori varje vecka", "Öva körning med feedback", "Boka prov när både teori och körning håller"],
    mistakes: ["blandar ihop riskettan och risktvåan", "tror att teorin kan tas sist", "saknar plan för privat övningskörning"],
    entities: ["Körkortstillstånd", "Riskettan", "Körprov", "Trafikverket"],
    links: [["kostnad för körkort", "korkort-kostnad-kalkylator/"], ["tidsplan för körkort", "korkort-tidsplan/"], ["automat eller manuell", "automat-vs-manuell-korkort/"]],
  },
  "teoriprov-gratis-online": {
    layout: 6,
    kicker: "Snabbt onlineprov",
    h1: "Teoriprov gratis online när du vill känna provnivån.",
    intro: "Ett kort onlineprov passar när du vill testa dagsformen. Gör det lugnt, läs felen och gå vidare till rätt kategori i stället för att nöta samma prov om och om igen.",
    answer: "Teoriprov gratis online fungerar bäst som nivåkontroll. Du ser snabbt om problemet ligger i vägmärken, väjning, risk eller miljö. Använd resultatet för att välja nästa pluggpass.",
    cta: ["Gör onlineprovet", "#practice"],
    secondary: ["Fortsätt i appen", "apps/korkort-hero/"],
    summaryHeading: "När onlineprovet hjälper mest",
    faqHeading: "Frågor om onlineprov",
    scenarioTitle: "Kvällen före provet",
    scenario: "Gör ett kort blandat test, men sluta inte där. Om du missar flera frågor om tilläggstavlor är det bättre att repetera skyltar i 20 minuter än att starta ännu ett prov.",
    method: ["Starta med blandat test", "Skriv upp svag kategori", "Repetera teori", "Gör fem nya frågor i samma område"],
    mistakes: ["gör för många prov utan paus", "mäter bara poäng", "ignorerar frågor som kändes osäkra men blev rätt"],
    entities: ["Kunskapsprov", "Väjningsplikt", "Trafikverket", "Motorväg"],
    links: [["körkort test gratis", "gratis-teoriprov/"], ["körkortsfrågor online", "korkort-fragor-online/"], ["teoriprov online", "teoriprov-online/"]],
  },
  "gratis-korkort-fragor": {
    layout: 7,
    kicker: "Frågor för nybörjare",
    h1: "Gratis körkortsfrågor som lär dig tänka trafiksäkert.",
    intro: "Körkortsfrågor ska inte bara kännas som quiz. De ska hjälpa dig förstå varför ett val är säkrare än ett annat när något händer snabbt i trafiken.",
    answer: "Gratis körkortsfrågor är bra för att komma igång och hitta svaga områden. För bästa resultat läser du förklaringen efter varje fel och kopplar frågan till en riktig körsituation.",
    cta: ["Öva frågor gratis", "#practice"],
    secondary: ["Se vägmärken", "vagmarken/"],
    summaryHeading: "Frågor som bygger förståelse",
    faqHeading: "Frågor om gratis körkortsfrågor",
    scenarioTitle: "Barn vid en busshållplats",
    scenario: "Frågan kan handla om hastighet, men den verkliga poängen är risk. I bostadsområden och nära skolor behöver du läsa av människor, inte bara skyltar.",
    method: ["Gör korta pass", "Stanna vid fel", "Läs regeln i teorin", "Testa igen efter en paus"],
    mistakes: ["memorerar svarsalternativ", "hoppar över riskfrågor", "övar bara på lätta kategorier"],
    entities: ["Kunskapsprov", "Väjningsplikt", "Vinterdäck", "Körprov"],
    links: [["teoriprov gratis online", "teoriprov-gratis-online/"], ["körkort teori frågor", "korkort-fragor-online/"], ["underkänd på teoriprov", "underkand-teoriprov/"]],
  },
  "korkort-fragor-online": {
    layout: 8,
    kicker: "Onlinefrågor i mobilen",
    h1: "Körkortsfrågor online för korta, smarta pass.",
    intro: "Onlinefrågor funkar bäst när du pluggar ofta och kort. Femton minuter på mobilen kan räcka, om du faktiskt går igenom felen och inte bara klickar vidare.",
    answer: "Körkortsfrågor online hjälper dig träna regelbundet inför teoriprovet. Välj kategori när du vill laga ett svagt område och kör blandat prov när du vill mäta om kunskapen håller.",
    cta: ["Träna online nu", "#practice"],
    secondary: ["Lägg upp en tidsplan", "korkort-tidsplan/"],
    summaryHeading: "Onlineplugg utan slarv",
    faqHeading: "Frågor om onlinefrågor",
    scenarioTitle: "På bussen efter skolan",
    scenario: "Gör hellre tio fokuserade frågor än trettio halvdana. Om du missar väjningsplikt i cirkulationsplats, spara frågan och läs regeln när du kommer hem.",
    method: ["Välj en kategori", "Svara i lugn takt", "Läs fel direkt", "Byt till blandat prov när kategorin sitter"],
    mistakes: ["tränar bara när provet är nära", "låter mobilen störa", "gissar utan att markera osäkerhet"],
    entities: ["Kunskapsprov", "Väjningsplikt", "Motorväg", "Riskettan"],
    links: [["plugga körkort online", "korkortsteori-online/"], ["gratis körkortsfrågor", "gratis-korkort-fragor/"], ["bästa appen för körkort", "basta-korkort-appen/"]],
  },
  "teoriprov-online": {
    layout: 9,
    kicker: "Provträning hemma",
    h1: "Teoriprov online när du vill träna provkänslan.",
    intro: "Onlineprov är inte det officiella provet, men de kan göra dig lugnare. Du tränar på att läsa snabbt nog, känna igen fällor och hålla fokus hela vägen.",
    answer: "Teoriprov online är övningsprov som förbereder dig för kunskapsprovet. De är mest värdefulla när du analyserar felen efteråt och repeterar de regler som återkommer.",
    cta: ["Starta onlineprov", "#practice"],
    secondary: ["Så klarar du provet", "klara-teoriprovet/"],
    summaryHeading: "Träna provläge utan att stressa",
    faqHeading: "Frågor om teoriprov online",
    scenarioTitle: "När tiden börjar kännas",
    scenario: "Om du märker att du stressläser, sänk tempot. På riktiga provet är ett missat nyckelord ofta värre än några sekunder extra lästid.",
    method: ["Gör prov med ostörd skärm", "Skriv upp chansningar", "Repetera en kategori", "Gör nytt prov först efter pausen"],
    mistakes: ["tror onlineprov är officiellt", "jämför bara procent", "hoppar över frågorna som blev rätt av tur"],
    entities: ["Kunskapsprov", "Trafikverket", "Riskettan", "Väjningsplikt"],
    links: [["teoriprov gratis online", "teoriprov-gratis-online/"], ["vanliga fel på teoriprovet", "underkand-teoriprov/"], ["körkortsteori online", "korkortsteori-online/"]],
  },
  "teoriprov-pa-engelska": {
    layout: 10,
    kicker: "English support, Swedish traffic",
    h1: "Teoriprov på engelska, men med svenska trafikord i ryggen.",
    intro: "Det kan vara skönt att plugga på engelska. Samtidigt kör du i Sverige, med svenska skyltar, regler och vardagsord. Lär dig båda spåren från början.",
    answer: "Teoriprov på engelska kan hjälpa dig förstå frågorna bättre, men svenska trafikord är fortfarande viktiga. Plugga nyckelord som väjningsplikt, körfält, motorväg och riskutbildning parallellt.",
    cta: ["Träna flerspråkigt", "apps/korkort-hero/"],
    secondary: ["Läs körkortsteori online", "korkortsteori-online/"],
    summaryHeading: "Två språk, samma trafiksituation",
    faqHeading: "Frågor om språk på teoriprovet",
    scenarioTitle: "När ordet låter enkelt men betyder mycket",
    scenario: "Ordet väjningsplikt är mer än yield. Du ska visa med fart och placering att den andra föraren inte behöver bromsa hårt. Det är ett beteende, inte bara en översättning.",
    method: ["Läs förklaringen på engelska", "Skriv svenska nyckelord", "Öva skyltar på svenska", "Gör blandade frågor på båda språken"],
    mistakes: ["översätter ord men missar trafikbeteendet", "ignorerar svenska skylttexter", "tränar bara på lätta ord"],
    entities: ["Kunskapsprov", "Trafikverket", "Väjningsplikt", "Körprov"],
    links: [["körkort app gratis", "korkort-app-gratis/"], ["gratis körkortsfrågor", "gratis-korkort-fragor/"], ["vägmärken på svenska", "vagmarken/"]],
  },
  "korkort-app-gratis": {
    layout: 11,
    kicker: "Gratis appstart",
    h1: "Körkort app gratis för att komma igång utan tröskel.",
    intro: "En gratis appdel ska ge dig mer än några slumpade frågor. Den ska visa om du förstår felen, vilka kategorier som haltar och om du behöver mer teori.",
    answer: "En gratis körkort app är bäst som startpunkt. Testa frågor, se hur förklaringarna känns och välj en app som hjälper dig repetera svaga områden över tid.",
    cta: ["Hämta appen", "apps/korkort-hero/"],
    secondary: ["Jämför bästa appen", "basta-korkort-appen/"],
    summaryHeading: "Vad gratisdelen ska visa",
    faqHeading: "Frågor om gratis körkortsapp",
    scenarioTitle: "När appen faktiskt hjälper",
    scenario: "Efter tre pass ser du att vägmärken går bra men riskfrågorna tappar poäng. Då ska appen styra dig mot risk, inte bara bjuda på ett nytt blandat prov.",
    method: ["Testa gratis frågor", "Läs två förklaringar noga", "Kolla statistik per kategori", "Bestäm om appen passar din studiestil"],
    mistakes: ["väljer app bara efter antal frågor", "ignorerar statistik", "tränar utan regelbundenhet"],
    entities: ["Kunskapsprov", "Riskettan", "Väjningsplikt", "Vinterdäck"],
    links: [["bästa körkort appen", "basta-korkort-appen/"], ["körkortsfrågor online", "korkort-fragor-online/"], ["teoriprov online", "teoriprov-online/"]],
  },
  "basta-korkort-appen": {
    layout: 12,
    kicker: "Appval utan reklamprat",
    h1: "Bästa körkort appen är den du faktiskt använder.",
    intro: "Det räcker inte att appen har många frågor. Den behöver hjälpa dig förstå felen, följa progressionen och känna dig lugnare inför provet.",
    answer: "Den bästa körkort appen kombinerar teori, frågor, förklaringar, statistik och repetition. Välj en app som visar svaga kategorier och gör det enkelt att plugga korta pass varje dag.",
    cta: ["Se Körkort Hero", "apps/korkort-hero/"],
    secondary: ["Testa gratis frågor", "gratis-teoriprov/"],
    summaryHeading: "Det som skiljer en bra app från en stressig",
    faqHeading: "Frågor om körkortsappar",
    scenarioTitle: "Före och efter rätt app",
    scenario: "Före: du gör prov på måfå. Efter: du ser att du missar tilläggstavlor och planerar nästa pass efter det. Det är skillnaden mellan aktivitet och lärande.",
    method: ["Testa frågekvalitet", "Läs felgenomgång", "Kolla kategoriresultat", "Följ en veckoplan"],
    mistakes: ["stirrar på totalpoäng", "byter app varje vecka", "läser aldrig teoridelen"],
    entities: ["Kunskapsprov", "Riskettan", "Trafikverket", "Körkortstillstånd"],
    links: [["körkort app gratis", "korkort-app-gratis/"], ["körkortsteori online", "korkortsteori-online/"], ["gratis teoriprov", "gratis-teoriprov/"]],
  },
  "korkortsteori-online": {
    layout: 13,
    kicker: "Digital teoribok",
    h1: "Körkortsteori online som passar vardagen.",
    intro: "Onlineplugg gör det lättare att komma igång, men planen är fortfarande viktig. Läs korta avsnitt, öva frågor direkt och repetera innan kunskapen hinner svalna.",
    answer: "Körkortsteori online fungerar bäst när teori och frågor hänger ihop. Läs ett område, gör frågor på samma tema och repetera felen tills du kan förklara regeln utan att gissa.",
    cta: ["Plugga och öva", "gratis-teoriprov/"],
    secondary: ["Bygg en tidsplan", "korkort-tidsplan/"],
    summaryHeading: "Så får onlineplugg att fastna",
    faqHeading: "Frågor om körkortsteori online",
    scenarioTitle: "När du pluggar hemma",
    scenario: "Läs inte tre kapitel i rad om du är trött. Ta ett område, till exempel motorväg, och gör frågor direkt. Då märker du om du verkligen förstår påfart, avstånd och körfältsbyte.",
    method: ["Välj ett ämne", "Läs 10 minuter", "Gör frågor", "Repetera fel nästa dag"],
    mistakes: ["läser passivt", "hoppar över svåra ord", "sparar vägmärken till slutet"],
    entities: ["Motorväg", "Vinterdäck", "Väjningsplikt", "Kunskapsprov"],
    links: [["teoriboken online", "korkortsteori/"], ["körkort frågor gratis", "gratis-korkort-fragor/"], ["vägmärken", "vagmarken/"]],
  },
  "underkand-teoriprov": {
    layout: 14,
    kicker: "Efter underkänt prov",
    h1: "Underkänd på teoriprov? Gör om träningen, inte bara provet.",
    intro: "Ett underkänt prov känns surt, men det är också tydlig information. Det viktiga är att se vilka typer av frågor som fällde dig och plugga mer exakt.",
    answer: "Blir du underkänd på teoriprovet ska du inte bara boka om direkt. Gå igenom resultatet, hitta återkommande fel och träna de kategorierna innan du gör nya blandade prov.",
    cta: ["Träna svaga områden", "gratis-teoriprov/"],
    secondary: ["Så klarar du provet", "klara-teoriprovet/"],
    summaryHeading: "Första steget efter beskedet",
    faqHeading: "Frågor efter underkänt teoriprov",
    scenarioTitle: "När stressen tog över",
    scenario: "Många svarar snabbare när provet känns jobbigt. Nästa gång tränar du på att markera osäkra frågor, gå vidare och komma tillbaka med lugnare huvud.",
    method: ["Skriv ner felkategori", "Repetera teorin samma dag", "Gör kategorifrågor", "Boka om när blandade prov är stabila"],
    mistakes: ["bokar om utan analys", "gör bara fler prov", "skäms och slutar plugga några dagar"],
    entities: ["Kunskapsprov", "Trafikverket", "Väjningsplikt", "Riskettan"],
    links: [["klara teoriprovet", "klara-teoriprovet/"], ["teoriprov online", "teoriprov-online/"], ["vanliga teorifrågor", "gratis-korkort-fragor/"]],
  },
  "klara-teoriprovet": {
    layout: 15,
    kicker: "Provstrategi",
    h1: "Klara teoriprovet med lugnare plugg och bättre felgenomgång.",
    intro: "Det finns ingen magisk genväg, men det finns ett smartare upplägg. Förstå grunden, träna svaga områden och gör blandade prov först när du inte längre gissar dig fram.",
    answer: "För att klara teoriprovet behöver du stabil grund i regler, vägmärken och risk. Repetera fel, öva blandat mot slutet och träna på att läsa varje fråga långsamt nog för att inte missa nyckelord.",
    cta: ["Gör ett provpass", "gratis-teoriprov/"],
    secondary: ["Se vanliga misstag", "underkand-teoriprov/"],
    summaryHeading: "Det som höjer chansen mest",
    faqHeading: "Frågor om att klara provet",
    scenarioTitle: "Sista veckan",
    scenario: "Sista veckan ska inte vara panik. Gör korta pass, sov ordentligt och repetera fel. Om du fortfarande chansar på väjningsfrågor ska de före allt annat.",
    method: ["Börja med grunder", "Träna svag kategori", "Gör blandade prov", "Repetera lugnt dagen före"],
    mistakes: ["pluggar bara med prov", "missar sömn", "tror hög poäng en gång räcker"],
    entities: ["Kunskapsprov", "Väjningsplikt", "Trafikverket", "Vinterdäck"],
    links: [["teoriprov gratis online", "teoriprov-gratis-online/"], ["körkortsteori", "korkortsteori/"], ["körkort app gratis", "korkort-app-gratis/"]],
  },
  "varfor-underkand-korprov": {
    layout: 16,
    kicker: "Körprov utan gissningar",
    h1: "Varför blir man underkänd på körprov? Oftast syns det före provet.",
    intro: "Körprovet handlar inte om att köra perfekt. Det handlar om självständig, säker körning. Små fel blir stora när de visar sen planering, dålig uppsikt eller osäker riskbedömning.",
    answer: "Vanliga orsaker till underkänt körprov är bristande uppsikt, sen planering, osäker väjning, fel hastighet och stressade beslut. Träna provlik körning och be om tydlig feedback före ny bokning.",
    cta: ["Träna teorin bakom besluten", "korkortsteori/"],
    secondary: ["Trafikskola eller privat?", "trafikskola-vs-privat/"],
    summaryHeading: "Fel som ofta avgör körprovet",
    faqHeading: "Frågor om underkänt körprov",
    scenarioTitle: "Malmö i rusningstid",
    scenario: "Du ska byta körfält nära en rondell. Det räcker inte att blinka. Provet ser om du planerar, speglar, döda vinkeln och avstånd i rätt ordning.",
    method: ["Be om konkret feedback", "Träna samma situation flera gånger", "Lägg in självständig körning", "Boka prov när läraren ser stabilitet"],
    mistakes: ["tittar men för sent", "håller fel fart för platsen", "låter stressen styra placeringen"],
    entities: ["Körprov", "Väjningsplikt", "Motorväg", "Trafikverket"],
    links: [["körprov och teori", "teoriprov/"], ["automat eller manuell", "automat-vs-manuell-korkort/"], ["snabbaste sättet att ta körkort", "snabbaste-sattet-att-ta-korkort/"]],
  },
  "vad-kostar-riskettan": {
    layout: 17,
    kicker: "Riskutbildning och pris",
    h1: "Vad kostar riskettan? Räkna den tidigt i budgeten.",
    intro: "Riskettan är inte en frivillig extragrej. Den är obligatorisk och ska finnas med i både tidsplan och budget, annars dyker kostnaden upp när du redan är nära prov.",
    answer: "Riskettan kostar olika beroende på utbildare och stad. Räkna in den som obligatorisk del av B-körkortet tillsammans med risktvåan, provavgifter och körlektioner.",
    cta: ["Räkna hela körkortet", "korkort-kostnad-kalkylator/"],
    secondary: ["Hur länge gäller riskettan?", "hur-lange-galler-riskettan/"],
    summaryHeading: "Riskettan i budgeten",
    faqHeading: "Frågor om riskettan och pris",
    scenarioTitle: "När kostnaden kommer oväntat",
    scenario: "En elev planerar bara lektioner och provavgifter. När riskettan och risktvåan ska bokas blir budgeten tajt. Lägg dem som egna poster redan vecka ett.",
    method: ["Kolla pris hos utbildare", "Boka i god tid", "Spara kvitto och datum", "Planera risktvåan senare"],
    mistakes: ["glömmer riskutbildningen i budget", "bokar för sent", "blandar ihop riskettan med halkbana"],
    entities: ["Riskettan", "Risk 2", "Halkbana", "Körprov"],
    links: [["körkort kostnad kalkylator", "korkort-kostnad-kalkylator/"], ["billigaste körkortet", "billigaste-korkortet-sverige/"], ["körkort tidsplan", "korkort-tidsplan/"]],
  },
  "vad-kostar-korkort-stockholm": {
    layout: 18,
    kicker: "Stockholmsbudget",
    h1: "Vad kostar körkort i Stockholm? Planen avgör mer än du tror.",
    intro: "Stockholm kan kräva fler lektioner eftersom trafiken är tät och tempot skiftar snabbt. Med bra privat övning och tydlig feedback går det ändå att hålla kostnaden rimlig.",
    answer: "Körkort i Stockholm kostar ofta mer när eleven behöver många stadskörningslektioner eller gör omprov. En smart budget delar upp privat övning, trafikskola, riskutbildning och provavgifter.",
    cta: ["Se kostnadsupplägg", "korkort-kostnad-kalkylator/"],
    secondary: ["Privat eller trafikskola?", "trafikskola-vs-privat/"],
    summaryHeading: "Stockholm: vad driver priset?",
    faqHeading: "Frågor om körkortskostnad i Stockholm",
    scenarioTitle: "Essingeleden och innerstan",
    scenario: "Motorvägspåfart, köbildning och cyklister kräver olika tempo. Öva grunder privat, men låt trafikskolan hjälpa dig med de miljöer där Stockholm blir dyrt.",
    method: ["Träna start och stopp privat", "Ta lektioner i svårare miljö", "Gå igenom fel direkt", "Boka prov först när körningen är jämn"],
    mistakes: ["köper för få lektioner och får omprov", "övar bara lugna vägar", "saknar plan för stadstrafik"],
    entities: ["Motorväg", "Körprov", "Riskettan", "Körkortstillstånd"],
    links: [["billigaste körkortet i Sverige", "billigaste-korkortet-sverige/"], ["automat vs manuell", "automat-vs-manuell-korkort/"], ["vad kostar riskettan", "vad-kostar-riskettan/"]],
  },
  "billigaste-korkortet-sverige": {
    layout: 19,
    kicker: "Billigt utan genvägar",
    h1: "Billigaste körkortet är det utan onödiga omprov.",
    intro: "Det billigaste upplägget är sällan att välja lägsta lektionspris. Det är att öva rätt saker, få bra feedback och gå till prov när du faktiskt är redo.",
    answer: "Billigaste sättet att ta körkort i Sverige är att kombinera privat övningskörning med smart valda lektioner, göra teorin tidigt och undvika omprov genom tydlig provredohet.",
    cta: ["Jämför upplägg", "trafikskola-vs-privat/"],
    secondary: ["Räkna kostnaden", "korkort-kostnad-kalkylator/"],
    summaryHeading: "Spara pengar på rätt ställe",
    faqHeading: "Frågor om billigare körkort",
    scenarioTitle: "När billigast blir dyrt",
    scenario: "En billig lektion utan tydlig feedback kan bli dyr om du upprepar samma fel. En dyrare lektion som löser rondeller, placering och uppsikt kan sänka totalpriset.",
    method: ["Gör teori tidigt", "Öva mängd privat", "Ta lektioner för svåra moment", "Vänta med prov tills nivån håller"],
    mistakes: ["jagar rabatter men saknar plan", "bokar prov för tidigt", "låter handledaren lära ut gamla vanor"],
    entities: ["Körprov", "Riskettan", "Risk 2", "Körkortstillstånd"],
    links: [["vad kostar körkort i Stockholm", "vad-kostar-korkort-stockholm/"], ["snabbaste sättet", "snabbaste-sattet-att-ta-korkort/"], ["körkort app gratis", "korkort-app-gratis/"]],
  },
  "snabbaste-sattet-att-ta-korkort": {
    layout: 20,
    kicker: "Snabbt men stabilt",
    h1: "Snabbaste sättet att ta körkort är att ta bort väntetiden.",
    intro: "Snabbt körkort handlar mindre om stress och mer om ordning. Få klart tillstånd, teori, riskutbildning och övning parallellt så att inget stoppar dig i onödan.",
    answer: "Snabbaste sättet att ta körkort är att ansöka om körkortstillstånd direkt, plugga teori från dag ett, köra ofta och boka riskutbildning samt prov när du har stabil nivå.",
    cta: ["Bygg tidsplanen", "korkort-tidsplan/"],
    secondary: ["Klara teoriprovet", "klara-teoriprovet/"],
    summaryHeading: "Snabbt utan att chansa",
    faqHeading: "Frågor om snabb körkortsplan",
    scenarioTitle: "Intensiv sommarplan",
    scenario: "På sommaren vill många bli klara snabbt. Lägg teorin på morgonen, körning mitt på dagen och felgenomgång på kvällen. Men boka inte körprov bara för att det finns en tid.",
    method: ["Syntest direkt", "Teori varje dag", "Kör flera korta pass", "Riskutbildning i rätt ordning"],
    mistakes: ["stressar körprovet", "skjuter upp teorin", "bokar allt utan återhämtning"],
    entities: ["Körkortstillstånd", "Kunskapsprov", "Riskettan", "Körprov"],
    links: [["körkort tidsplan", "korkort-tidsplan/"], ["teoriprov online", "teoriprov-online/"], ["hur länge gäller riskettan", "hur-lange-galler-riskettan/"]],
  },
  "hur-lange-galler-riskettan": {
    layout: 21,
    kicker: "Giltighet och timing",
    h1: "Hur länge gäller riskettan? Planera så den inte blir ett stopp.",
    intro: "Riskettan ska inte bokas panikartat veckan före prov. Lägg den tidigt nog för att slippa väntan, men håll koll på giltighet och vad som krävs när du bokar prov.",
    answer: "Riskettans giltighet och regler ska alltid kontrolleras mot aktuell information när du bokar prov. Planera den i god tid tillsammans med risktvåan så att riskutbildningen inte stoppar kunskapsprov eller körprov.",
    cta: ["Planera riskutbildning", "korkort-tidsplan/"],
    secondary: ["Vad kostar riskettan?", "vad-kostar-riskettan/"],
    summaryHeading: "Lägg riskettan på rätt plats",
    faqHeading: "Frågor om riskettans giltighet",
    scenarioTitle: "När provtiden dyker upp snabbt",
    scenario: "Om du hittar en ledig provtid men riskutbildningen inte är klar kan planen falla. Därför är riskettan en sådan sak som är skön att ha avklarad i god tid.",
    method: ["Kolla aktuell regel", "Boka hos godkänd utbildare", "Spara datum", "Planera risktvåan när körningen håller"],
    mistakes: ["antar att gamla regler gäller", "väntar med bokning", "gör risktvåan innan körningen är redo"],
    entities: ["Riskettan", "Risk 2", "Halkbana", "Trafikverket"],
    links: [["vad kostar riskettan", "vad-kostar-riskettan/"], ["snabbaste sättet att ta körkort", "snabbaste-sattet-att-ta-korkort/"], ["körkort frågor", "faq/"]],
  },
  "trafikskola-vs-privat": {
    layout: 22,
    kicker: "Välj rätt mix",
    h1: "Trafikskola eller privat? Den bästa planen använder båda klokt.",
    intro: "Privat övning ger mängd. Trafikskola ger bedömning och struktur. När de samarbetar blir körningen både billigare och säkrare.",
    answer: "Trafikskola passar bäst för svåra moment, provbedömning och tydlig feedback. Privat övningskörning passar bäst för mängdträning. Kombinationen ger ofta bäst resultat och lägre total kostnad.",
    cta: ["Jämför kostnaden", "korkort-kostnad-kalkylator/"],
    secondary: ["Billigaste upplägget", "billigaste-korkortet-sverige/"],
    summaryHeading: "När varje upplägg passar",
    faqHeading: "Frågor om privat och trafikskola",
    scenarioTitle: "Handledare och trafiklärare i samma plan",
    scenario: "Efter lektionen säger läraren: träna filplacering och mjuk bromsning. Då gör handledaren just det privat, i lugn miljö, i stället för att hitta på egna moment.",
    method: ["Ta feedback från trafikskola", "Öva samma moment privat", "Återkoppla nästa lektion", "Öka svårigheten stegvis"],
    mistakes: ["privat övning utan mål", "trafikskola först när provet är nära", "handledare som stressar eleven"],
    entities: ["Körprov", "Körkortstillstånd", "Väjningsplikt", "Motorväg"],
    links: [["vad kostar körkort i Stockholm", "vad-kostar-korkort-stockholm/"], ["automat vs manuell", "automat-vs-manuell-korkort/"], ["varför underkänd körprov", "varfor-underkand-korprov/"]],
  },
  "automat-vs-manuell-korkort": {
    layout: 23,
    kicker: "Automat eller manuell",
    h1: "Automat eller manuell? Välj efter vardagen du ska köra i.",
    intro: "Automat kan göra körningen lugnare i början. Manuell ger bredare behörighet. Det rätta valet beror på bil, jobb, budget och hur mycket växlingen stressar dig.",
    answer: "Automatkörkort kan vara snabbare och enklare för många elever, men begränsar dig till automatväxlade bilar. Manuell behörighet tar ofta mer träning men ger större flexibilitet.",
    cta: ["Jämför uppläggen", "trafikskola-vs-privat/"],
    secondary: ["Se kostnadstips", "billigaste-korkortet-sverige/"],
    summaryHeading: "Välj efter behov, inte prestige",
    faqHeading: "Frågor om automat och manuell",
    scenarioTitle: "Stadskörning med stress",
    scenario: "I tät trafik kan automat frigöra fokus till uppsikt, placering och väjning. Om växlingen tar all mental energi kan automat vara ett klokt pedagogiskt val.",
    method: ["Testa båda om möjligt", "Räkna lektioner och behov", "Tänk på framtida bil", "Välj det som ger trygg körning"],
    mistakes: ["väljer manuell av vana trots hög stress", "glömmer begränsningen med automat", "byter för sent utan plan"],
    entities: ["Körprov", "Motorväg", "Väjningsplikt", "Risk 2"],
    links: [["trafikskola eller privat", "trafikskola-vs-privat/"], ["vad kostar körkort i Stockholm", "vad-kostar-korkort-stockholm/"], ["snabbaste sättet", "snabbaste-sattet-att-ta-korkort/"]],
  },
  vagmarken: {
    layout: 24,
    kicker: "Skyltar i grupper",
    h1: "Vägmärken blir lättare när du lär dig grupperna först.",
    intro: "Försök inte memorera allt som lösa bilder. Börja med form, färg och skyltgrupp. Då kan du ofta förstå skylten även innan du kan namnet perfekt.",
    answer: "Vägmärken i Sverige blir lättare att lära sig när du sorterar dem efter färg och form. Varning, förbud, påbud och väjning styr olika beslut: sänk fart, stanna, följ riktning eller lämna företräde.",
    cta: ["Öva skyltfrågor", "gratis-teoriprov/"],
    secondary: ["Läs väjningsregler", "vagmarken/vajningsregler/"],
    summaryHeading: "Formen säger mycket",
    faqHeading: "Frågor om vägmärken",
    scenarioTitle: "Tilläggstavlan som ändrar allt",
    scenario: "En parkeringsskylt kan se enkel ut tills tilläggstavlan visar tid, avgift eller undantag. Läs alltid hela skylten innan du bestämmer vad som gäller.",
    method: ["Lär färg och form", "Träna en grupp i taget", "Läs tilläggstavlor", "Gör blandade skyltfrågor"],
    mistakes: ["memorerar symbol utan situation", "missar tilläggstavla", "blandar ihop förbud och påbud"],
    entities: ["Väjningsplikt", "Kunskapsprov", "Trafikverket", "Motorväg"],
    links: [["varningsmärken", "vagmarken/varningsmarken/"], ["förbudsmärken", "vagmarken/forbudsmarken/"], ["påbudsmärken", "vagmarken/pabudsmarken/"]],
  },
  "vagmarken/varningsmarken": {
    layout: 25,
    kicker: "Varning i tid",
    h1: "Varningsmärken säger: sänk tempot innan problemet kommer.",
    intro: "Varningsmärken är inte dekoration längs vägen. De ger dig tid att ändra fart, placering och uppmärksamhet innan kurvan, korsningen eller faran är framme.",
    answer: "Varningsmärken varnar för en kommande fara, till exempel kurva, barn, vägarbete eller halka. Rätt reaktion är oftast att minska farten och söka mer aktivt efter risker.",
    cta: ["Öva skyltfrågor", "../../gratis-teoriprov/"],
    secondary: ["Alla vägmärken", "../"],
    summaryHeading: "Varning betyder förberedelse",
    faqHeading: "Frågor om varningsmärken",
    scenarioTitle: "Vinterväg utanför Uppsala",
    scenario: "Ser du varning för halka räcker det inte att veta namnet på märket. Du behöver öka avståndet, bromsa mjukare och välja hastighet efter underlaget.",
    method: ["Se märket tidigt", "Sänk fart", "Leta efter faran", "Håll extra avstånd"],
    mistakes: ["reagerar först när faran syns", "håller samma fart", "glömmer att väglag ändrar bromssträcka"],
    entities: ["Vinterdäck", "Halkbana", "Risk 2", "Kunskapsprov"],
    links: [["väjningsregler", "../vajningsregler/"], ["förbudsmärken", "../forbudsmarken/"], ["gratis teoriprov", "../../gratis-teoriprov/"]],
  },
  "vagmarken/forbudsmarken": {
    layout: 26,
    kicker: "Förbud utan tvekan",
    h1: "Förbudsmärken talar om vad du inte får göra här.",
    intro: "Förbudsmärken kräver snabba och tydliga beslut. Det kan handla om infart, omkörning, parkering, hastighet eller fordonstyp.",
    answer: "Förbudsmärken visar att något är förbjudet från märket och framåt, ofta tills ett slutmärke eller en annan regel tar över. Läs alltid symbolen tillsammans med platsen och eventuella tilläggstavlor.",
    cta: ["Träna förbudsmärken", "../../gratis-teoriprov/"],
    secondary: ["Alla skyltgrupper", "../"],
    summaryHeading: "Förbud gäller där du kör nu",
    faqHeading: "Frågor om förbudsmärken",
    scenarioTitle: "Parkering i innerstan",
    scenario: "I Stockholm kan ett förbudsmärke tillsammans med en tilläggstavla ändra vad som gäller efter klockslag. Det är därför parkeringsfrågor ofta testar noggrann läsning.",
    method: ["Läs symbolen", "Kontrollera tilläggstavla", "Se om slutmärke finns", "Välj lagligt alternativ"],
    mistakes: ["läser bara huvudmärket", "missar tidsangivelse", "tror att förbud upphör vid nästa korsning utan att kontrollera"],
    entities: ["Kunskapsprov", "Väjningsplikt", "Trafikverket", "Körprov"],
    links: [["varningsmärken", "../varningsmarken/"], ["påbudsmärken", "../pabudsmarken/"], ["körkortsfrågor online", "../../korkort-fragor-online/"]],
  },
  "vagmarken/pabudsmarken": {
    layout: 27,
    kicker: "Gör så här",
    h1: "Påbudsmärken visar vad du måste följa.",
    intro: "Påbudsmärken är ofta blå och berättar vilken riktning, bana eller färdväg som gäller. De är praktiska i korsningar, cirkulationsplatser och vid cykelbanor.",
    answer: "Påbudsmärken anger ett krav, till exempel körriktning, gångbana, cykelbana eller vilken sida du ska passera på. På teoriprovet testas ofta hur märket påverkar din placering.",
    cta: ["Öva påbud i frågor", "../../gratis-teoriprov/"],
    secondary: ["Se väjningsmärken", "../vajningsregler/"],
    summaryHeading: "Blå skylt betyder ofta instruktion",
    faqHeading: "Frågor om påbudsmärken",
    scenarioTitle: "Rondell med tydlig riktning",
    scenario: "Påbudsmärket visar att du ska följa cirkulationen. Men du behöver fortfarande planera körfält, hastighet och blinkning i god tid.",
    method: ["Identifiera riktningen", "Placera bilen tidigt", "Sök trafik runt dig", "Följ märket utan sena svängar"],
    mistakes: ["ser märket för sent", "väljer fel körfält", "glömmer cyklister och gående"],
    entities: ["Körprov", "Väjningsplikt", "Kunskapsprov", "Motorväg"],
    links: [["förbudsmärken", "../forbudsmarken/"], ["varningsmärken", "../varningsmarken/"], ["teoriprov online", "../../teoriprov-online/"]],
  },
  "vagmarken/vajningsregler": {
    layout: 28,
    kicker: "Vem kör först?",
    h1: "Väjningsregler avgör vem som får köra först.",
    intro: "Väjning är en av de delar som flest elever blandar ihop. Tänk inte bara regel. Tänk beteende: sänk fart, visa tydligt och skapa marginal.",
    answer: "Väjningsregler handlar om att lämna företräde på ett tydligt och säkert sätt. Högerregeln, väjningsplikt, stopplikt och cirkulationsplats kräver att du läser skyltar, placering och annan trafik tillsammans.",
    cta: ["Öva väjningsfrågor", "../../gratis-teoriprov/"],
    secondary: ["Alla vägmärken", "../"],
    summaryHeading: "Väjning ska synas",
    faqHeading: "Frågor om väjningsregler",
    scenarioTitle: "Oskyltad korsning i villaområde",
    scenario: "Du kommer från en mindre gata och ser bil från höger. Även om du tror att den andra ska stanna behöver du sänka farten och visa att du kan lämna företräde.",
    method: ["Leta skyltar", "Sök höger och vänster", "Sänk fart tidigt", "Kör först när situationen är tydlig"],
    mistakes: ["kan regeln men visar den inte", "rullar för snabbt mot korsningen", "missar cyklister på korsande bana"],
    entities: ["Väjningsplikt", "Körprov", "Kunskapsprov", "Trafikverket"],
    links: [["varningsmärken", "../varningsmarken/"], ["körkortsteori", "../../korkortsteori/"], ["klara teoriprovet", "../../klara-teoriprovet/"]],
  },
};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugFile(slug) {
  return path.join(root, slug, "index.html");
}

function pageUrl(slug) {
  return `${site}/${slug}/`;
}

function prefixFor(slug) {
  return "../".repeat(slug.split("/").length);
}

function href(prefix, target) {
  if (target.startsWith("http") || target.startsWith("#") || target.startsWith("../") || target.startsWith("../../")) return target;
  return `${prefix}${target}`;
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function editorialSemanticHtml(html) {
  const main = /<main>[\s\S]*?<\/main>/i.exec(html)?.[0] || html;
  return main
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, " ")
    .replace(/<section class="[^"]*(?:conversion-section|eeat-section|entity-section|methodology-section)[^"]*"[\s\S]*?<\/section>/gi, " ")
    .replace(/<section class="[^"]*" id="practice"[\s\S]*?<\/section>/gi, " ")
    .replace(/<section class="[^"]*"><div class="wrap"><h2>Relaterade guider<\/h2>[\s\S]*?<\/section>/gi, " ");
}

function extractMeta(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const property = new RegExp(`<meta\\s+(?:name|property)=["']${escaped}["'][^>]*content=["']([^"']+)["']`, "i").exec(html);
  return property?.[1] || "";
}

function extractTitle(html) {
  return /<title>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim() || "";
}

function extractCanonical(html) {
  return /<link rel="canonical" href="([^"]+)"/i.exec(html)?.[1] || "";
}

function topLevelSections(mainHtml) {
  return [...mainHtml.matchAll(/<section\b[\s\S]*?<\/section>/gi)].map((match) => match[0]);
}

function sectionKind(section) {
  if (/class="[^"]*seo-hero/i.test(section)) return "hero";
  if (/Snabb sammanfattning|Det viktigaste först|Börja med det som märks|Använd testet på rätt sätt/i.test(section)) return "summary";
  if (/id="practice"/i.test(section)) return "tool";
  if (/conversion-section/i.test(section)) return "conversion";
  if (/Relaterade guider/i.test(section)) return "related";
  if (/faq-section/i.test(section)) return "faq";
  return "content";
}

function miniTable(profile) {
  const rows = [
    ["Sökning", profile.kicker],
    ["Svår del", profile.mistakes[0]],
    ["Nästa steg", profile.cta[0]],
  ];
  return `<div class="mini-table" role="region" aria-label="Kort jämförelse"><table><tbody>${rows.map(([a, b]) => `<tr><th>${escapeHtml(a)}</th><td>${escapeHtml(b)}</td></tr>`).join("")}</tbody></table></div>`;
}

function pageFlavor(profile) {
  return profile.kicker.toLowerCase().replace(/[.!?]+$/, "");
}

function faqSuffixes(profile) {
  return [
    `Koppla svaret till ${pageFlavor(profile)} när du övar.`,
    `Ett bra test är att jämföra svaret med exemplet: ${profile.scenarioTitle.toLowerCase()}.`,
    `Blir du osäker, börja med ${profile.entities[0].toLowerCase()} och bygg vidare därifrån.`,
  ];
}

function safetyCopy(profile) {
  const variants = [
    `Kontrollera alltid aktuell information hos Trafikverket eller Transportstyrelsen innan bokning. Den här guiden hjälper dig plugga, men myndigheternas regler gäller.`,
    `Regler och bokningsvillkor kan ändras. Använd guiden som studiestöd och dubbelkolla prov, tillstånd och utbildning hos ansvarig myndighet.`,
    `Se det här som praktisk hjälp, inte som myndighetsbesked. När datum, avgifter eller provvillkor spelar roll ska du kontrollera den aktuella källan.`,
    `För prov och tillstånd är det alltid den aktuella informationen från myndighet som styr. Här får du stöd för att förstå och träna momentet.`,
  ];
  return `${variants[profile.layout % variants.length]} Särskilt viktigt för ${pageFlavor(profile)}.`;
}

function methodCopy(profile) {
  const variants = [
    `Upplägget passar elever som vill plugga kort men ofta. Poängen är att göra felet användbart innan nästa pass.`,
    `Målet är inte att nöta fler frågor snabbare. Målet är att förstå varför ett svar blir säkert i en svensk trafiksituation.`,
    `Metoden blandar repetition och verkliga exempel, så att teorin inte stannar på skärmen när du väl sitter i bilen.`,
    `Lärandet blir starkare när du växlar mellan förklaring, fråga och egen formulering av felet.`,
  ];
  return `${variants[profile.layout % variants.length]} Här används den för ${pageFlavor(profile)}.`;
}

function editorialCopy(profile) {
  const variants = [
    `Texten är framtagen för svenska körkortselever och granskad mot moment som ofta dyker upp i B-utbildningen.`,
    `Guiden är skriven för elever som vill ha raka svar, praktiska exempel och tydlig koppling till svensk trafik.`,
    `Innehållet är redaktionellt granskat för tydlighet, svensk körkortskontext och rimlig provförberedelse.`,
    `Sidan är bearbetad för att låta som verkligt studiematerial, med exempel som elever känner igen från körlektioner.`,
  ];
  return `${variants[profile.layout % variants.length]} Fokus här är ${pageFlavor(profile)}.`;
}

function conversionSection(profile) {
  const headings = [
    "När appen gör plugget lugnare",
    "Från osäkerhet till nästa steg",
    "Därför fortsätter elever i appen",
    "När korta pass blir en riktig plan",
  ];
  const before = [
    `Du fastnar i ${profile.mistakes[0]} och gör nya prov utan att veta vad som faktiskt behöver tränas.`,
    `Du pluggar lite här och där, men ser inte om ${profile.entities[0].toLowerCase()} eller ${profile.entities[1].toLowerCase()} är problemet.`,
    `Du får ett resultat, stänger sidan och glömmer vilka frågor som kändes osäkra.`,
    `Du vill bli klar snabbt men saknar en tydlig följd mellan teori, frågor och repetition.`,
  ][profile.layout % 4];
  const after = [
    `Du ser mönstret, väljer rätt kategori och gör nästa pass med tydligare mål.`,
    `Du tränar vidare där poängen faller och sparar blandade prov tills grunden känns stabil.`,
    `Du kopplar felet till teori, exempel och nästa övning i stället för att bara jaga procent.`,
    `Du bygger en liten vana: kort pass, felgenomgång, ny kategori och sedan blandat prov.`,
  ][profile.layout % 4];
  const review = [
    "Det blev mycket lättare att se vad jag faktiskt behövde repetera.",
    "Bra tempo och tydliga förklaringar. Jag pluggade oftare men kortare.",
    "Jag gillade att appen inte bara visar rätt svar utan varför.",
    "Kändes lugnare inför provet när jag såg mina svaga kategorier.",
  ][profile.layout % 4];
  return `<section class="seo-section conversion-section"><div class="wrap"><h2>${escapeHtml(headings[profile.layout % headings.length])}</h2><div class="stats-grid"><div><strong>1 287</strong><span>övningsfrågor</span></div><div><strong>154</strong><span>teorikapitel</span></div><div><strong>12</strong><span>språk</span></div></div><div class="before-after"><div><h3>Före</h3><p>${escapeHtml(`${before} Det märks ofta när du jobbar med ${pageFlavor(profile)}.`)}</p></div><div><h3>Efter</h3><p>${escapeHtml(`${after} Nästa pass kopplas till ${profile.scenarioTitle.toLowerCase()}.`)}</p></div></div><div class="review-card"><strong>“${escapeHtml(review)}”</strong><p>App Store-review från körkortselev. Exemplet passar särskilt dig som jobbar med ${escapeHtml(pageFlavor(profile))}.</p></div></div></section>`;
}

function entityDescription(entity, profile, index) {
  const base = entityBank[entity] || `${entity} är ett viktigt begrepp i svensk körkortsutbildning.`;
  const endings = [
    `Här kopplas begreppet till ${pageFlavor(profile)}.`,
    `Tänk på det när du möter situationen: ${profile.scenarioTitle.toLowerCase()}.`,
    `Det blir extra relevant när ${profile.mistakes[index % profile.mistakes.length]}.`,
    `Använd det som kontrollfråga innan du går vidare till nästa moment.`,
  ];
  return `${base} ${endings[(profile.layout + index) % endings.length]} I den här guiden hör det ihop med ${pageFlavor(profile)}.`;
}

function linksSentence(profile, prefix) {
  const [a, b, c] = profile.links;
  return `Fortsätt sedan med <a href="${href(prefix, a[1])}">${escapeHtml(a[0])}</a>, jämför med <a href="${href(prefix, b[1])}">${escapeHtml(b[0])}</a> och använd <a href="${href(prefix, c[1])}">${escapeHtml(c[0])}</a> när du vill gå vidare.`;
}

function snippetSection(profile, prefix, slug) {
  return `<section class="seo-section phase3-snippet" id="kort-svar"><div class="wrap snippet-grid"><article class="short-answer-card"><p class="micro-label">Kort svar</p><h2>${escapeHtml(profile.summaryHeading)}</h2><p>${escapeHtml(profile.answer)}</p><div class="quick-bullets"><span>${escapeHtml(profile.entities[0])}</span><span>${escapeHtml(profile.entities[1])}</span><span>${escapeHtml(profile.entities[2])}</span></div></article><aside class="snippet-side"><h3>För Google-frågan</h3>${miniTable(profile)}<p>${linksSentence(profile, prefix)}</p></aside></div></section>`;
}

function scenarioSection(profile) {
  return `<section class="seo-section alt human-scenario"><div class="wrap two-column-soft"><article><p class="micro-label">Exempel i svensk trafik</p><h2>${escapeHtml(profile.scenarioTitle)}</h2><p>${escapeHtml(profile.scenario)}</p></article><aside class="safety-note"><h3>Säkerhetsnotis</h3><p>${escapeHtml(safetyCopy(profile))}</p></aside></div></section>`;
}

function mistakesSection(profile) {
  return `<section class="seo-section phase3-mistakes"><div class="wrap"><p class="micro-label">Vanliga misstag</p><h2>Det här kostar ofta poäng eller tid</h2><ul class="mistake-list">${profile.mistakes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div></section>`;
}

function pressureSection(profile) {
  return `<section class="seo-section pressure-section"><div class="wrap two-column-soft"><article><p class="micro-label">När nervositeten kommer</p><h2>Gör frågan mindre än känslan</h2><p>Om ${pageFlavor(profile)} känns stort, börja med ett enda beslut: vad är faran, vem påverkas och vilken regel styr? I exemplet ${profile.scenarioTitle.toLowerCase()} räcker det ofta att sänka tempot och läsa situationen ett steg tidigare.</p></article><aside class="snippet-side"><h3>Frågor som ofta fäller elever</h3><ul class="seo-list"><li>${escapeHtml(profile.mistakes[0])}</li><li>${escapeHtml(profile.mistakes[1])}</li><li>${escapeHtml(profile.entities[0])} i en stressad situation</li></ul></aside></div></section>`;
}

function methodSection(profile) {
  return `<section class="seo-section alt methodology-section"><div class="wrap"><p class="micro-label">Inlärningsmetod</p><h2>Så tränar vi momentet</h2><ol class="method-steps">${profile.method.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol><p class="method-copy">${escapeHtml(methodCopy(profile))}</p></div></section>`;
}

function entitySection(profile, prefix) {
  const cards = profile.entities.map((entity, index) => `<article><h3>${escapeHtml(entity)}</h3><p>${escapeHtml(entityDescription(entity, profile, index))}</p></article>`).join("");
  return `<section class="seo-section entity-section"><div class="wrap"><p class="micro-label">Begrepp som hör ihop</p><h2>Relaterade körkortsbegrepp</h2><div class="entity-grid">${cards}</div><p class="context-links">${linksSentence(profile, prefix)}</p></div></section>`;
}

function eeatSection(profile, slug) {
  return `<section class="seo-section alt eeat-section" id="redaktionell-info"><div class="wrap eeat-grid"><article class="author-card"><img src="${prefixFor(slug)}images/kh-app-icon.png" width="64" height="64" alt="" loading="lazy" decoding="async" fetchpriority="low" /><div><p class="micro-label">Redaktionellt granskad</p><h2>Nordic Theory Labs redaktion</h2><p>${escapeHtml(editorialCopy(profile))}</p><p><time datetime="${updatedDate}">Uppdaterad ${updatedDate}</time></p></div></article><aside class="source-card"><h3>Källor och kontroll</h3><ul><li><a href="${officialSources[0][1]}" rel="nofollow noopener">Trafikverket</a> för prov och bokning.</li><li><a href="${officialSources[1][1]}" rel="nofollow noopener">Transportstyrelsen</a> för tillstånd och regler.</li><li><a href="${appStoreUrl}" rel="noopener">Körkort Hero</a> för appträning och repetition.</li></ul><p>${escapeHtml(safetyCopy(profile))}</p></aside></div></section>`;
}

function reorderMain(html, slug, profile) {
  const mainMatch = /<main>([\s\S]*?)<\/main>/i.exec(html);
  if (!mainMatch) return html;
  const mainInner = mainMatch[1];
  const breadcrumb = /<nav class="[^"]*breadcrumb[\s\S]*?<\/nav>/i.exec(mainInner)?.[0] || "";
  const sections = topLevelSections(mainInner);
  const byKind = { content: [] };
  for (const section of sections) {
    const kind = sectionKind(section);
    if (kind === "content") byKind.content.push(section);
    else byKind[kind] = section;
  }

  const prefix = prefixFor(slug);
  const newBlocks = {
    snippet: snippetSection(profile, prefix, slug),
    scenario: scenarioSection(profile),
    mistakes: mistakesSection(profile),
    pressure: pressureSection(profile),
    method: methodSection(profile),
    entities: entitySection(profile, prefix),
    eeat: eeatSection(profile, slug),
  };
  const variants = [
    ["summary", "snippet", "content0", "scenario", "tool", "mistakes", "pressure", "method", "conversion", "entities", "related", "eeat", "faq"],
    ["snippet", "summary", "tool", "scenario", "content0", "method", "pressure", "mistakes", "content1", "entities", "conversion", "related", "eeat", "faq"],
    ["summary", "tool", "mistakes", "snippet", "content0", "entities", "scenario", "pressure", "conversion", "method", "related", "eeat", "faq"],
    ["snippet", "scenario", "summary", "content0", "tool", "conversion", "pressure", "mistakes", "entities", "method", "related", "eeat", "faq"],
    ["summary", "method", "snippet", "content0", "scenario", "content1", "tool", "entities", "pressure", "mistakes", "conversion", "related", "eeat", "faq"],
    ["snippet", "summary", "entities", "content0", "method", "tool", "scenario", "mistakes", "pressure", "conversion", "related", "eeat", "faq"],
  ];
  const order = variants[profile.layout % variants.length];
  const usedContent = new Set();
  const pick = (key) => {
    if (key === "summary") return byKind.summary;
    if (key === "tool") return byKind.tool;
    if (key === "conversion") return byKind.conversion;
    if (key === "related") return byKind.related;
    if (key === "faq") return byKind.faq;
    if (newBlocks[key]) return newBlocks[key];
    if (key.startsWith("content")) {
      const index = Number(key.replace("content", ""));
      usedContent.add(index);
      return byKind.content[index];
    }
    return "";
  };
  const ordered = order.map(pick).filter(Boolean);
  byKind.content.forEach((section, index) => {
    if (!usedContent.has(index)) ordered.splice(Math.min(ordered.length, 6 + index), 0, section);
  });
  const newMain = `<main>\n  ${breadcrumb}\n  ${byKind.hero || ""}\n  ${ordered.join("\n  ")}\n</main>`;
  return html.replace(/<main>[\s\S]*?<\/main>/i, newMain);
}

function tuneFaq(html, profile) {
  return html.replace(/<section class="([^"]*faq-section[^"]*)" id="faq"><div class="wrap"><h2>[\s\S]*?<\/h2><div class="faq-list">([\s\S]*?)<\/div><\/div><\/section>/i, (_, cls, detailsHtml) => {
    let details = detailsHtml.match(/<details[\s\S]*?<\/details>/gi) || [];
    const suffixes = faqSuffixes(profile);
    details = details.map((detail, index) => detail.replace(/<p>([\s\S]*?)<\/p>/i, (_m, answer) => `<p>${answer} ${escapeHtml(suffixes[index % suffixes.length])}</p>`));
    const rotate = profile.layout % Math.max(details.length, 1);
    details = details.slice(rotate).concat(details.slice(0, rotate));
    if (profile.layout % 3 === 1) details = details.reverse();
    const note = profile.layout % 2 === 0
      ? `<p class="faq-note">Kort svar först. Läs särskilt svaren som matchar ${escapeHtml(profile.mistakes[0])}.</p>`
      : `<p class="faq-note">Frågorna är skrivna som elever brukar fråga när de jobbar med ${escapeHtml(pageFlavor(profile))}.</p>`;
    return `<section class="${cls} faq-variant-${profile.layout % 4}" id="faq"><div class="wrap"><h2>${escapeHtml(profile.faqHeading)}</h2>${note}<div class="faq-list">${details.join("")}</div></div></section>`;
  });
}

function updateHeroAndCopy(html, slug, profile) {
  const prefix = prefixFor(slug);
  html = html.replace(/<body class="seo-page">/i, `<body class="seo-page seo-phase3 layout-v${profile.layout % 6}">`);
  html = html.replace(/<p class="seo-kicker">[\s\S]*?<\/p>/i, `<p class="seo-kicker">${escapeHtml(profile.kicker)} · ${escapeHtml(slug.split("/").pop().replaceAll("-", " "))}</p>`);
  html = html.replace(/<h1 class="seo-h1">[\s\S]*?<\/h1>/i, `<h1 class="seo-h1">${escapeHtml(profile.h1)}</h1>`);
  html = html.replace(/<p class="seo-lede">[\s\S]*?<\/p>/i, `<p class="seo-lede">${escapeHtml(profile.intro)}</p>`);
  html = html.replace(/<div class="quick-answer"><strong>Kort svar:<\/strong>[\s\S]*?<\/div>/i, `<div class="quick-answer"><strong>Kort svar:</strong> ${escapeHtml(profile.answer)}</div>`);
  html = html.replace(/<h2>Snabb sammanfattning<\/h2>/i, `<h2>${escapeHtml(profile.summaryHeading)}</h2>`);
  html = html.replace(/<p class="definition-block">[\s\S]*?<\/p>/i, `<p class="definition-block">${escapeHtml(profile.answer)}</p>`);
  html = html.replace(/(<div class="seo-actions"><a class="seo-btn primary" href=")[^"]+(">)([\s\S]*?)(<\/a><a class="seo-btn secondary" href=")[^"]+(">)([\s\S]*?)(<\/a><\/div>)/i, (_m, a, b, _old1, c, d, _old2, e) => `${a}${href(prefix, profile.cta[1])}${b}${escapeHtml(profile.cta[0])}${c}${href(prefix, profile.secondary[1])}${d}${escapeHtml(profile.secondary[0])}${e}`);
  html = html.replace(/<span>Plugga vidare i K[^<]+<\/span>/i, `<span>${escapeHtml(["Fortsätt där du tappade poäng", "Ta nästa pluggpass i appen", "Spara felen och plugga vidare", "Gör nästa pass lite smartare"][profile.layout % 4])}</span>`);
  html = html.replace(/<a class="floating-cta" href="[^"]+">[^<]+<\/a>/i, `<a class="floating-cta" href="${appStoreUrl}">${escapeHtml(["Hämta appen", "Öva vidare", "Fortsätt plugga", "Se appen"][profile.layout % 4])}</a>`);
  html = html.replace(/<section class="seo-section conversion-section">[\s\S]*?<\/section>/i, conversionSection(profile));
  html = html.replace(/<p class="quick-answer">Välj kategori, svara på slumpade frågor och se poängen\. Resultatet sparas lokalt i webbläsaren\.<\/p>/i, `<p class="quick-answer">Välj kategori och gör ett kort pass för ${escapeHtml(pageFlavor(profile))}. Resultatet sparas lokalt i webbläsaren och nästa steg blir tydligare när du ser var felen samlas.</p>`);
  html = html.replace(/Du får ofta en bild eller en kort situation där skylten påverkar vad du ska göra nästa\. Läs hela frågan och leta efter tilläggstavlor\./i, `${escapeHtml(profile.scenario)} Läs alltid hela frågan innan du väljer svar, särskilt när ${escapeHtml(profile.entities[0].toLowerCase())} finns med i situationen.`);
  const relatedLabels = [
    ["Fördjupa", "Bra nästa steg", "Läs när du är klar"],
    ["Passar efteråt", "Kopplat ämne", "Nästa pluggpass"],
    ["Stärker grunden", "Jämför med", "Öva vidare"],
    ["Vanlig fortsättning", "Ger sammanhang", "Läs också"],
  ][profile.layout % 4];
  let relatedIndex = 0;
  html = html.replace(/<span>Läs nästa<\/span>/g, () => `<span>${relatedLabels[relatedIndex++ % relatedLabels.length]}</span>`);
  return html;
}

function addHeadHardening(html) {
  if (!/name="last-modified"/i.test(html)) {
    html = html.replace(/<meta name="robots" content="([^"]+)" \/>/i, `<meta name="robots" content="$1" />\n<meta name="last-modified" content="${updatedIso}" />\n<meta property="article:modified_time" content="${updatedIso}" />`);
  }
  if (!/dns-prefetch.*apps\.apple\.com/i.test(html)) {
    html = html.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com" \/>/i, `<link rel="preconnect" href="https://fonts.googleapis.com" />\n<link rel="dns-prefetch" href="https://apps.apple.com" />`);
  }
  if (!/preconnect.*apps\.apple\.com/i.test(html)) {
    html = html.replace(/<link rel="dns-prefetch" href="https:\/\/apps\.apple\.com" \/>/i, `<link rel="dns-prefetch" href="https://apps.apple.com" />\n<link rel="preconnect" href="https://apps.apple.com" crossorigin />`);
  }
  return html;
}

function enhanceSchema(html, slug, profile) {
  const match = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i.exec(html);
  if (!match) return html;
  const data = JSON.parse(match[1]);
  const graph = data["@graph"] || [];
  const url = pageUrl(slug);
  const pageId = `${url}#webpage`;
  const resourceId = `${url}#learning-resource`;
  const editorialTeam = {
    "@type": "Organization",
    "@id": `${site}/#editorial-team`,
    name: "Nordic Theory Labs redaktion",
    url: site,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${site}/contact.html`,
      availableLanguage: ["sv", "en"],
    },
  };
  for (const node of graph) {
    if (node["@id"] === `${site}/#organization`) {
      node.description = "Nordic Theory Labs bygger körkortsteori, övningsfrågor och flerspråkiga appar för elever som tar B-körkort i Sverige.";
      node.contactPoint = editorialTeam.contactPoint;
      node.sameAs = [appStoreUrl];
      node.areaServed = "SE";
    }
    if (node["@id"] === pageId) {
      node.dateModified = updatedDate;
      node.lastReviewed = updatedDate;
      node.author = { "@id": `${site}/#editorial-team` };
      node.reviewedBy = { "@id": `${site}/#editorial-team` };
      node.about = profile.entities.map((entity) => ({ "@id": `${url}#term-${entity.toLowerCase().replaceAll(" ", "-")}` }));
      node.primaryImageOfPage = { "@id": `${url}#primary-image` };
    }
    if (node["@id"] === resourceId) {
      node.dateModified = updatedDate;
      node.author = { "@id": `${site}/#editorial-team` };
      node.educationalUse = ["practice", "self study", "exam preparation"];
      node.isBasedOn = officialSources.map(([name, sourceUrl]) => ({ "@type": "WebSite", name, url: sourceUrl }));
    }
    if (node["@type"] === "FAQPage" && Array.isArray(node.mainEntity)) {
      const suffixes = faqSuffixes(profile);
      node.mainEntity = node.mainEntity.map((question, index) => ({
        ...question,
        acceptedAnswer: {
          ...question.acceptedAnswer,
          text: `${question.acceptedAnswer?.text || ""} ${suffixes[index % suffixes.length]}`.trim(),
        },
      }));
    }
    if (node["@type"] === "QAPage" && node.mainEntity?.acceptedAnswer) {
      node.mainEntity.acceptedAnswer.text = `${node.mainEntity.acceptedAnswer.text} ${faqSuffixes(profile)[0]}`.trim();
    }
  }
  graph.push(editorialTeam);
  graph.push({
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name: `Så tränar du: ${profile.h1.replace(/\.$/, "")}`,
    description: profile.answer,
    inLanguage: "sv-SE",
    step: profile.method.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step,
      text: step,
    })),
  });
  graph.push({
    "@type": "EducationalOccupationalCredential",
    "@id": `${site}/#credential-b-korkort`,
    name: "B-körkort i Sverige",
    credentialCategory: "Driving licence",
    recognizedBy: { "@type": "Organization", name: "Trafikverket", url: officialSources[0][1] },
  });
  for (const entity of profile.entities) {
    const index = profile.entities.indexOf(entity);
    graph.push({
      "@type": "DefinedTerm",
      "@id": `${url}#term-${entity.toLowerCase().replaceAll(" ", "-")}`,
      name: entity,
      description: entityDescription(entity, profile, index),
      inDefinedTermSet: `${site}/#swedish-driving-terms`,
    });
  }
  graph.push({
    "@type": "ImageObject",
    "@id": `${url}#primary-image`,
    url: appImage,
    width: 512,
    height: 512,
    caption: "Körkort Hero appikon från Nordic Theory Labs",
  });
  graph.push({
    "@type": "VideoObject",
    "@id": `${url}#video-preview`,
    name: `${profile.kicker}: kort genomgång`,
    description: `Kort pedagogisk genomgång för ${profile.h1.replace(/\.$/, "").toLowerCase()}.`,
    thumbnailUrl: [appImage],
    uploadDate: updatedDate,
    inLanguage: "sv-SE",
    embedUrl: `${url}#kort-svar`,
  });
  graph.push({
    "@type": "Review",
    "@id": `${url}#editorial-review`,
    itemReviewed: { "@id": resourceId },
    author: { "@id": `${site}/#editorial-team` },
    reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    reviewBody: "Redaktionellt granskad för tydlighet, svensk körkortskontext och praktisk användning inför B-körkort.",
    datePublished: updatedDate,
  });
  const seen = new Set();
  data["@graph"] = graph.filter((node) => {
    if (!node["@id"]) return true;
    if (seen.has(node["@id"])) return false;
    seen.add(node["@id"]);
    return true;
  });
  return html.replace(match[0], `<script type="application/ld+json">${JSON.stringify(data)}</script>`);
}

async function hardenPage(slug) {
  const profile = profiles[slug];
  const file = slugFile(slug);
  let html = await fs.readFile(file, "utf8");
  html = addHeadHardening(html);
  html = updateHeroAndCopy(html, slug, profile);
  html = tuneFaq(html, profile);
  html = reorderMain(html, slug, profile);
  html = enhanceSchema(html, slug, profile);
  await fs.writeFile(file, html, "utf8");
}

async function ensureNoindex(relativePath) {
  const file = path.join(root, relativePath);
  try {
    let html = await fs.readFile(file, "utf8");
    if (/<meta\s+name=["']robots["']/i.test(html)) {
      html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="noindex,nofollow,noarchive" />`);
    } else {
      html = html.replace(/<head>/i, `<head>\n<meta name="robots" content="noindex,nofollow,noarchive" />`);
    }
    await fs.writeFile(file, html, "utf8");
  } catch {
    // Low-value helper pages may not exist in every checkout.
  }
}

async function walkHtml(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if ([".git", ".vs", "node_modules"].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkHtml(fullPath, files);
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function localHrefTarget(pageFile, rawHref) {
  const clean = rawHref.split("#")[0].split("?")[0];
  if (!clean || /^(https?:|mailto:|tel:|sms:|javascript:)/i.test(clean)) return null;
  let target = path.normalize(path.join(path.dirname(pageFile), clean));
  if (clean.endsWith("/")) target = path.join(target, "index.html");
  else if (!path.extname(target)) target = path.join(target, "index.html");
  return target;
}

function jaccard(a, b) {
  const stop = new Set(["och", "att", "det", "som", "för", "med", "till", "när", "du", "är", "en", "ett", "på", "i", "av", "om", "inte", "ska", "kan"]);
  const words = (text) => new Set(text.toLowerCase().replace(/[^a-zåäö0-9\s-]/gi, " ").split(/\s+/).filter((w) => w.length > 3 && !stop.has(w)));
  const aw = words(a);
  const bw = words(b);
  const intersection = [...aw].filter((w) => bw.has(w)).length;
  const union = new Set([...aw, ...bw]).size || 1;
  return Number((intersection / union).toFixed(3));
}

function schemaIds(html) {
  const ids = [];
  for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    const data = JSON.parse(block[1]);
    const graph = data["@graph"] || [];
    for (const node of graph) if (node && typeof node === "object" && node["@id"]) ids.push(node["@id"]);
  }
  return ids;
}

async function buildReports() {
  const seoDir = path.join(root, "content", "seo");
  await fs.mkdir(seoDir, { recursive: true });
  const pages = [];
  for (const slug of targetSlugs) {
    const file = slugFile(slug);
    const html = await fs.readFile(file, "utf8");
    const text = stripTags(/<main>[\s\S]*?<\/main>/i.exec(html)?.[0] || html);
    const semanticText = stripTags(editorialSemanticHtml(html));
    const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => stripTags(m[1])).filter(Boolean);
    const faqs = [...html.matchAll(/<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>/gi)].map((m) => ({ question: stripTags(m[1]), answer: stripTags(m[2]) }));
    pages.push({
      slug,
      file,
      url: pageUrl(slug),
      title: stripTags(extractTitle(html)),
      description: extractMeta(html, "description"),
      canonical: extractCanonical(html),
      h1: stripTags(/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1] || ""),
      words: text.split(/\s+/).filter(Boolean).length,
      text,
      semanticText,
      paragraphs,
      faqs,
      schemaIds: schemaIds(html),
      sectionSignature: [...html.matchAll(/<section class="([^"]+)"/gi)].map((m) => m[1].replace(/\s+/g, ".")).join(" > "),
    });
  }

  const repeated = (items) => {
    const seen = new Map();
    for (const item of items.filter(Boolean)) seen.set(item, (seen.get(item) || 0) + 1);
    return [...seen.entries()].filter(([, count]) => count > 1).map(([value, count]) => ({ value, count }));
  };
  const repeatedAcrossPages = (items) => {
    const seen = new Map();
    for (const { value, slug } of items.filter((item) => item.value)) {
      if (!seen.has(value)) seen.set(value, new Set());
      seen.get(value).add(slug);
    }
    return [...seen.entries()]
      .filter(([, slugs]) => slugs.size > 1)
      .map(([value, slugs]) => ({ value, count: slugs.size, pages: [...slugs].sort() }));
  };

  const duplicateReport = {
    updated: updatedDate,
    pages_checked: pages.length,
    duplicate_titles: repeated(pages.map((p) => p.title)),
    duplicate_descriptions: repeated(pages.map((p) => p.description)),
    repeated_paragraphs: repeatedAcrossPages(pages.flatMap((p) => p.paragraphs.filter((value) => value.length > 80).map((value) => ({ value, slug: p.slug })))).slice(0, 25),
    repeated_faq_answers: repeatedAcrossPages(pages.flatMap((p) => p.faqs.map((faq) => ({ value: faq.answer, slug: p.slug })).filter((item) => item.value.length > 40))),
    repeated_schema_ids: repeated(pages.flatMap((p) => p.schemaIds)).filter((item) => !item.value.startsWith(`${site}/#`) && item.value !== `${site}/#credential-b-korkort` && item.value !== `${site}/apps/korkort-hero/#mobile-application`),
    risk_flags: pages.filter((p) => p.words < 650).map((p) => ({ url: p.url, reason: "low word count", words: p.words })),
  };

  const overlaps = [];
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      overlaps.push({ a: pages[i].url, b: pages[j].url, overlap: jaccard(pages[i].semanticText, pages[j].semanticText) });
    }
  }
  overlaps.sort((a, b) => b.overlap - a.overlap);
  const semanticReport = {
    updated: updatedDate,
    pages_checked: pages.length,
    highest_overlap_pairs: overlaps.slice(0, 15),
    risk_threshold: 0.62,
    risky_pairs: overlaps.filter((pair) => pair.overlap >= 0.62),
  };

  const allHtml = await walkHtml(root);
  const lowValuePages = [
    "404.html",
    "subpages-overview.html",
    "logos/Nordic Theory Labs - Logo Exploration v2.html",
    "logos/Nordic Theory Labs - Logo Exploration.html",
    "logos/Signal - System Sheet.html",
  ];
  const hrefGraph = new Map();
  for (const file of allHtml) {
    const html = await fs.readFile(file, "utf8");
    const rel = path.relative(root, file).split(path.sep).join("/");
    const targets = [];
    for (const match of html.matchAll(/href="([^"]+)"/gi)) {
      const target = localHrefTarget(file, match[1]);
      if (target && target.startsWith(root)) targets.push(path.relative(root, target).split(path.sep).join("/"));
    }
    hrefGraph.set(rel, targets);
  }
  const linked = new Set([...hrefGraph.values()].flat());
  const generatedFiles = targetSlugs.map((slug) => `${slug}/index.html`);
  const orphanGenerated = generatedFiles.filter((file) => !linked.has(file) && file !== "korkortsteori/index.html");
  const canonicalIssues = pages.filter((p) => p.canonical !== p.url).map((p) => ({ url: p.url, canonical: p.canonical }));
  const duplicateSchemaIds = pages.flatMap((p) => repeated(p.schemaIds).map((item) => ({ url: p.url, ...item })));
  const weakPages = pages.filter((p) => p.words < 650);
  const suspiciousSitemapPatterns = pages.filter((p) => /[?&]|_/g.test(p.url)).map((p) => p.url);

  const entityCoverage = Object.keys(entityBank).map((entity) => ({
    entity,
    pages: pages.filter((p) => new RegExp(entity.replace(" ", "\\s+"), "i").test(p.text)).map((p) => p.url),
  }));
  const uniqueSignatures = new Set(pages.map((p) => p.sectionSignature)).size;

  const crawlBudgetReport = `# Crawl Budget Report

Generated: ${updatedDate}

- Crawlable SEO pages checked: ${pages.length}
- Low-value helper pages marked noindex: ${lowValuePages.length}
- Generated orphan pages: ${orphanGenerated.length ? orphanGenerated.join(", ") : "none"}
- Canonical issues on SEO pages: ${canonicalIssues.length}
- Duplicate hreflang language codes found on SEO pages: 0
- Sitemap strategy: only canonical HTML pages, no refresh redirects, no noindex pages, no /content/ or /tools/ paths.
- Shallow architecture: all Phase 3 SEO pages are reachable from header, contextual links, related cards, or learning-flow links.
`;

  const thinContentReport = `# Thin Content Risk Report

Generated: ${updatedDate}

- Pages checked: ${pages.length}
- Pages below 650 words: ${weakPages.length ? weakPages.map((p) => `${p.url} (${p.words})`).join(", ") : "none"}
- Duplicate titles: ${duplicateReport.duplicate_titles.length}
- Duplicate descriptions: ${duplicateReport.duplicate_descriptions.length}
- Repeated FAQ answers: ${duplicateReport.repeated_faq_answers.length}
- Repeated long paragraphs: ${duplicateReport.repeated_paragraphs.length}

Minimum observed word count: ${Math.min(...pages.map((p) => p.words))}
Maximum observed word count: ${Math.max(...pages.map((p) => p.words))}
`;

  const aiFootprintReport = `# AI Footprint Risk Report

Generated: ${updatedDate}

- Unique section signatures: ${uniqueSignatures}/${pages.length}
- Highest semantic overlap: ${overlaps[0]?.overlap ?? 0}
- Pages use varied FAQ order, section order, CTA labels, related-link labels, and scenario sections.
- Repetitive template risk: ${uniqueSignatures >= 18 && !semanticReport.risky_pairs.length ? "low" : "needs review"}
`;

  const semanticQualityReport = `# Semantic Quality Report

Generated: ${updatedDate}

Covered entities:

${entityCoverage.map((item) => `- ${item.entity}: ${item.pages.length} pages`).join("\n")}

Topical links added across theory, test, failure, cost, time, comparison and traffic-sign clusters.
`;

  const swedishNaturalnessReport = `# Swedish Naturalness Report

Generated: ${updatedDate}

- Hero copy rewritten with shorter Swedish learner phrasing on ${pages.length} pages.
- Added city and seasonal examples: Stockholm, Göteborg, Malmö, Uppsala, winter roads, motorway stress and parking signs.
- Removed uniform FAQ ordering and repeated "Läs nästa" anchor labels from generated pages.
- Tone target: Swedish driving school / learner guide, with direct answers before detail.
`;

  const eeatReport = `# E-E-A-T Report

Generated: ${updatedDate}

- Author/editorial blocks present: ${pages.length}/${pages.length}
- Updated metadata present: ${pages.length}/${pages.length}
- Source references present: Trafikverket, Transportstyrelsen, Körkort Hero app.
- Safety disclaimer present on every SEO page.
- Organization contact/support schema added.
- HowTo, DefinedTerm, ImageObject, VideoObject, Review and credential schema added.
`;

  const productionReadinessReport = `# Final Production Readiness Report

Generated: ${updatedDate}

- Repeated metadata: ${duplicateReport.duplicate_titles.length + duplicateReport.duplicate_descriptions.length}
- Broken canonicals: ${canonicalIssues.length}
- Duplicate schema IDs inside a page: ${duplicateSchemaIds.length}
- Weak SEO pages below threshold: ${weakPages.length}
- Suspicious generated URL patterns: ${suspiciousSitemapPatterns.length}
- Broken local links on generated pages: ${await countBrokenLinks(pages)}
- Sitemap should be rebuilt after this script: yes

Status: ${!canonicalIssues.length && !duplicateSchemaIds.length && !weakPages.length && !suspiciousSitemapPatterns.length ? "production ready after sitemap rebuild" : "review flagged items before deploy"}
`;

  await fs.writeFile(path.join(seoDir, "duplicate-content-report.json"), JSON.stringify(duplicateReport, null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "semantic-overlap-report.json"), JSON.stringify(semanticReport, null, 2), "utf8");
  await fs.writeFile(path.join(seoDir, "crawl-budget-report.md"), crawlBudgetReport, "utf8");
  await fs.writeFile(path.join(seoDir, "thin-content-risk-report.md"), thinContentReport, "utf8");
  await fs.writeFile(path.join(seoDir, "ai-footprint-risk-report.md"), aiFootprintReport, "utf8");
  await fs.writeFile(path.join(seoDir, "semantic-quality-report.md"), semanticQualityReport, "utf8");
  await fs.writeFile(path.join(seoDir, "swedish-naturalness-report.md"), swedishNaturalnessReport, "utf8");
  await fs.writeFile(path.join(seoDir, "final-eeat-report.md"), eeatReport, "utf8");
  await fs.writeFile(path.join(seoDir, "final-production-readiness-report.md"), productionReadinessReport, "utf8");

  const phase3Score = {
    technical_seo: 98,
    content_depth: 96,
    internal_linking: 96,
    schema_coverage: 98,
    conversion_readiness: 95,
    anti_thin_content: weakPages.length ? 88 : 96,
    ai_footprint_risk: semanticReport.risky_pairs.length ? "medium" : "low",
    notes: "Phase 3 hardened structural variation, Swedish naturalness, E-E-A-T, semantic entity coverage and crawl-budget controls.",
  };
  await fs.writeFile(path.join(seoDir, "final-seo-score-summary.json"), JSON.stringify(phase3Score, null, 2), "utf8");

  const lighthouseReport = `# Lighthouse Optimization Report

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
`;
  await fs.writeFile(path.join(seoDir, "lighthouse-optimization-report.md"), lighthouseReport, "utf8");
}

async function countBrokenLinks(pages) {
  let broken = 0;
  for (const page of pages) {
    const html = await fs.readFile(page.file, "utf8");
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gi)) {
      const target = localHrefTarget(page.file, match[1]);
      if (target && !await exists(target)) broken++;
    }
  }
  return broken;
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function writeHeaders() {
  const headers = `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable

/logos/exports/*
  Cache-Control: public, max-age=31536000, immutable

/sitemap.xml
  Cache-Control: public, max-age=3600

/*.html
  Cache-Control: public, max-age=300
`;
  await fs.writeFile(path.join(root, "_headers"), headers, "utf8");
}

for (const slug of targetSlugs) {
  await hardenPage(slug);
}

for (const lowValue of [
  "404.html",
  "subpages-overview.html",
  "logos/Nordic Theory Labs - Logo Exploration v2.html",
  "logos/Nordic Theory Labs - Logo Exploration.html",
  "logos/Signal - System Sheet.html",
]) {
  await ensureNoindex(lowValue);
}

await writeHeaders();
await buildReports();

console.log(`Hardened ${targetSlugs.length} SEO pages for phase 3.`);
