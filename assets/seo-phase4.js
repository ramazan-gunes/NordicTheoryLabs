(() => {
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
      prompt.innerHTML = '<button type="button" aria-label="Stäng">×</button><strong>Fortsätt i Körkort Hero</strong><br><span>Spara nästa pass i appen när du ändå är igång.</span><br><a href="https://apps.apple.com/id/app/driving-license-in-sweden/id6762642524" data-install-source="phase4-deferred">Öppna App Store</a>';
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
})();