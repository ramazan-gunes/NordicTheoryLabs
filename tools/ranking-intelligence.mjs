import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const observationsPath = path.join(root, "content", "seo", "ranking-observations.json");
let observations = [];
try { observations = JSON.parse(await fs.readFile(observationsPath, "utf8")); } catch {}
const keywords = [
  "teoriprov gratis",
  "körkort frågor",
  "körkort app",
  "teoriprov online",
  "bästa körkort appen",
  "teoriprov engelska",
  "körkort test gratis"
];
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
await fs.writeFile(path.join(root, "content", "seo", "ranking-trend-report.json"), JSON.stringify({ updated: "2026-05-22", summary }, null, 2), "utf8");
console.log(JSON.stringify({ updated: "2026-05-22", tracked_keywords: keywords.length, observations: observations.length, summary }, null, 2));
