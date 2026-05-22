(function () {
  const appHref = "https://apps.apple.com/id/app/driving-license-in-sweden/id6762642524";
  const storageKey = "ntl_theory_practice_v2";

  const questions = [
    { category: "rules", q: "Du kommer till en oskyltad korsning. En bil närmar sig från höger. Vad gäller?", a: ["Du ska normalt lämna företräde", "Du har alltid företräde om du kör rakt fram", "Bilen från höger måste stanna"], correct: 0, explain: "Högerregeln gäller ofta i oskyltade korsningar när inget annat styr." },
    { category: "rules", q: "Vad betyder väjningsplikt?", a: ["Du ska visa att du tänker lämna företräde", "Du måste alltid stanna helt", "Du får bara köra om bilen bakom blinkar"], correct: 0, explain: "Vid väjningsplikt ska du anpassa fart och tydligt lämna företräde." },
    { category: "rules", q: "Vad måste du göra vid stopplikt?", a: ["Stanna helt", "Rulla långsamt om det är tomt", "Bara sakta ner om sikten är bra"], correct: 0, explain: "Stopplikt kräver fullständigt stopp, även när vägen verkar tom." },
    { category: "signs", q: "Vilken form har de flesta varningsmärken?", a: ["Triangel med röd kant", "Blå fyrkant", "Gul rektangel"], correct: 0, explain: "Varningsmärken är normalt triangelformade med röd kant." },
    { category: "signs", q: "Vad visar en blå rund skylt oftast?", a: ["Påbud, alltså något du måste göra", "Förbud", "Rekommenderad rastplats"], correct: 0, explain: "Blå runda skyltar är påbudsmärken." },
    { category: "signs", q: "Varför är tilläggstavlor viktiga?", a: ["De kan ändra när eller för vem märket gäller", "De är bara extra dekoration", "De gäller bara lastbilar"], correct: 0, explain: "Tilläggstavlor kan ange tid, sträcka, fordonstyp eller riktning." },
    { category: "risk", q: "Vad är bäst vid risk för vattenplaning?", a: ["Släpp gasen och styr mjukt", "Bromsa hårt", "Gasa igenom vattnet"], correct: 0, explain: "Mjuka rörelser och lägre fart minskar risken när däcken tappar kontakt." },
    { category: "risk", q: "Vad tränar risktvåan framför allt?", a: ["Halka, fart och säkerhetsmarginaler", "Parkering i garage", "Att läsa vägskyltar"], correct: 0, explain: "Risktvåan handlar praktiskt om risker med fart, underlag och kontroll." },
    { category: "risk", q: "Du är trött men ska köra långt. Vad är säkrast?", a: ["Vila innan du kör", "Dricka kaffe och köra ändå", "Öka tempot för att komma fram snabbare"], correct: 0, explain: "Trötthet försämrar reaktion och uppmärksamhet. Vila är säkrast." },
    { category: "eco", q: "Vad är sparsam körning?", a: ["Planerad körning med jämn fart och få onödiga stopp", "Att alltid köra långsamt", "Att accelerera hårt och rulla långt"], correct: 0, explain: "Sparsam körning handlar om planering, jämnhet och lägre onödig förbrukning." },
    { category: "eco", q: "När använder bilen ofta mer bränsle?", a: ["Vid hårda accelerationer och ryckig körning", "Vid jämn fart", "När du planerar långt fram"], correct: 0, explain: "Ryckig körning och hårda accelerationer ökar förbrukningen." },
    { category: "rules", q: "Vad är viktigt vid körfältsbyte?", a: ["Spegel, döda vinkeln, blinkers och mjuk placering", "Bara blinkers", "Att byta snabbt så ingen hinner reagera"], correct: 0, explain: "Ett säkert filbyte kräver uppsikt, signal och tydlig placering." },
  ];

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || { attempts: 0, best: 0, last: 0 };
    } catch {
      return { attempts: 0, best: 0, last: 0 };
    }
  }

  function saveState(state) {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function initTheorySystem(root) {
    const category = root.querySelector("[data-question-category]");
    const count = root.querySelector("[data-question-count]");
    const bar = root.querySelector("[data-progress-bar]");
    const progress = root.querySelector("[data-question-progress]");
    const title = root.querySelector("[data-question-text]");
    const options = root.querySelector("[data-question-options]");
    const feedback = root.querySelector("[data-question-feedback]");
    const next = root.querySelector("[data-next-question]");
    const appCta = root.querySelector("[data-app-cta]");
    let state = loadState();
    let set = [];
    let index = 0;
    let score = 0;
    let answered = false;

    function buildSet() {
      const pool = category.value === "all" ? questions : questions.filter((q) => q.category === category.value);
      set = shuffle(pool).slice(0, Number(count.value));
      if (set.length < Number(count.value)) set = shuffle([...pool, ...questions]).slice(0, Number(count.value));
      index = 0;
      score = 0;
      answered = false;
      render();
    }

    function finish() {
      state.attempts += 1;
      state.last = score;
      state.best = Math.max(state.best, score);
      saveState(state);
      const pct = Math.round((score / set.length) * 100);
      title.textContent = `Resultat: ${score} av ${set.length} rätt`;
      progress.textContent = `Senaste: ${state.last}/${set.length}. Bästa passet: ${state.best}.`;
      bar.style.width = "100%";
      options.innerHTML = "";
      feedback.className = `quiz-feedback ${pct >= 80 ? "good" : "bad"}`;
      feedback.textContent = pct >= 80
        ? "Bra nivå. Fortsätt med blandade prov och repetera enskilda fel i appen."
        : "Fortsätt öva. Välj kategorin där du missade mest och gör ett nytt pass.";
      appCta.href = appHref;
      next.textContent = "Börja om";
      answered = true;
    }

    function render() {
      const item = set[index];
      answered = false;
      feedback.className = "quiz-feedback";
      feedback.textContent = "";
      title.textContent = item.q;
      progress.textContent = `Fråga ${index + 1} av ${set.length} · ${score} rätt hittills`;
      bar.style.width = `${(index / set.length) * 100}%`;
      options.innerHTML = "";
      item.a.forEach((answer, answerIndex) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "quiz-option";
        button.textContent = answer;
        button.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const correct = answerIndex === item.correct;
          if (correct) score += 1;
          button.classList.add(correct ? "correct" : "wrong");
          feedback.className = `quiz-feedback ${correct ? "good" : "bad"}`;
          feedback.textContent = `${correct ? "Rätt." : "Inte riktigt."} ${item.explain}`;
          bar.style.width = `${((index + 1) / set.length) * 100}%`;
        });
        options.append(button);
      });
      next.textContent = index === set.length - 1 ? "Visa resultat" : "Nästa fråga";
    }

    next.addEventListener("click", () => {
      if (index >= set.length - 1 && answered) {
        finish();
        return;
      }
      if (next.textContent === "Börja om") {
        buildSet();
        return;
      }
      if (!answered) return;
      index += 1;
      render();
    });
    category.addEventListener("change", buildSet);
    count.addEventListener("change", buildSet);
    buildSet();
  }

  function initInstallBars() {
    document.querySelectorAll("[data-close-install]").forEach((button) => {
      button.addEventListener("click", () => {
        const bar = button.closest(".install-bar");
        if (bar) bar.classList.add("is-hidden");
      });
    });
  }

  document.querySelectorAll("[data-theory-system]").forEach(initTheorySystem);
  initInstallBars();
})();
