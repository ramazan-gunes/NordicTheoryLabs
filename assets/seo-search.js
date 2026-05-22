(() => {
  const root = document.querySelector("[data-search-app]");
  if (!root) return;
  const input = root.querySelector("[data-search-input]");
  const results = root.querySelector("[data-search-results]");
  const storageKey = "ntl_search_intelligence_v1";
  const normalize = (value) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9åäö\s-]/g, " ");
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
    for (const part of nq.split(/\s+/).filter(Boolean)) {
      if (hay.includes(part)) s += 14;
      else s += Math.max(0, 9 - Math.min(...hay.split(/\s+/).slice(0, 120).map(w => lev(part, w))));
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
})();