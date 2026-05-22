import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const key = "8f2a7c5d1e9b4a63b7c0d2e5f8a9b1c4d6e7f0a2b3c5d8e1f4a6b9c2d5e8f1a4";
const host = "nordictheorylabs.com";
const keyLocation = "https://nordictheorylabs.com/8f2a7c5d1e9b4a63b7c0d2e5f8a9b1c4d6e7f0a2b3c5d8e1f4a6b9c2d5e8f1a4.txt";
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
