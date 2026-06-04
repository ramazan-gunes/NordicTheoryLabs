(() => {
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
      prompt.innerHTML = '<button type="button" aria-label="Stäng">×</button><strong></strong><br><span></span><br><a href="https://apps.apple.com/id/app/driving-license-in-sweden/id6762642524" data-install-source="growth-loop">Fortsätt i appen</a>';
      document.body.append(prompt);
      prompt.querySelector("button").addEventListener("click", () => { sessionStorage.setItem("ntl_growth_prompt_closed", "1"); prompt.hidden = true; });
    }
    prompt.querySelector("strong").textContent = "Nästa pluggpass";
    prompt.querySelector("span").textContent = text;
    prompt.hidden = false;
  }
})();