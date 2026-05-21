import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const contentRoot = path.join(root, "content", "blog");
const blogRoot = path.join(root, "blog");

const languages = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "sv", name: "Svenska", dir: "ltr" },
  { code: "tr", name: "Türkçe", dir: "ltr" },
  { code: "ar", name: "العربية", dir: "rtl" },
  { code: "fa", name: "فارسی", dir: "rtl" },
  { code: "so", name: "Soomaali", dir: "ltr" },
  { code: "ku", name: "Kurdî", dir: "ltr" },
  { code: "pl", name: "Polski", dir: "ltr" },
  { code: "fi", name: "Suomi", dir: "ltr" },
  { code: "bs", name: "Bosanski", dir: "ltr" },
  { code: "es", name: "Español", dir: "ltr" },
  { code: "ru", name: "Русский", dir: "ltr" },
];

const langByCode = new Map(languages.map((lang) => [lang.code, lang]));

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value = "") {
  const escaped = escapeHtml(value);
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>');
}

function parseMarkdown(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error("Missing frontmatter");

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*"(.*)"\s*$/);
    if (pair) meta[pair[1]] = pair[2];
  }

  return { meta, body: match[2].trim() };
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let list = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    html.push("<ul>");
    for (const item of list) html.push(`<li>${inlineMarkdown(item)}</li>`);
    html.push("</ul>");
    list = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  flushList();
  return html.join("\n");
}

function headingSlug(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function addHeadingIds(html) {
  const seen = new Map();
  const toc = [];
  const next = html.replace(/<h2>(.*?)<\/h2>/g, (_, labelHtml) => {
    const label = labelHtml.replace(/<[^>]+>/g, "");
    const base = headingSlug(label) || "section";
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    toc.push({ id, label });
    return `<h2 id="${id}">${labelHtml}</h2>`;
  });
  return { html: next, toc };
}

function outputPathFor(post) {
  if (post.meta.language === "en") return path.join(blogRoot, `${post.meta.slug}.html`);
  return path.join(blogRoot, post.meta.language, `${post.meta.slug}.html`);
}

function publicHrefFor(post, fromLang) {
  if (fromLang === "en") {
    return post.meta.language === "en"
      ? `${post.meta.slug}.html`
      : `${post.meta.language}/${post.meta.slug}.html`;
  }
  return post.meta.language === "en"
    ? `../${post.meta.slug}.html`
    : `../${post.meta.language}/${post.meta.slug}.html`;
}

function indexHrefFor(langCode, fromLang) {
  if (fromLang === "en") return langCode === "en" ? "index.html" : `${langCode}/`;
  return langCode === "en" ? "../index.html" : `../${langCode}/`;
}

function displayDate(iso, lang = "en") {
  const date = new Date(`${iso}T12:00:00Z`);
  try {
    return new Intl.DateTimeFormat(lang, { day: "2-digit", month: "short", year: "numeric" }).format(date);
  } catch {
    return iso;
  }
}

function brandMark() {
  return `<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><rect class="sig-frame" x="20" y="20" width="180" height="180" rx="22" fill="none" stroke-width="6"/><line class="sig-axis" x1="20" y1="110" x2="200" y2="110" stroke-width="2"/><path class="sig-wave" d="M 30 130 Q 70 60, 110 110 T 190 90" stroke-width="8" fill="none" stroke-linecap="round"/><circle class="sig-dot" cx="190" cy="90" r="10"/></svg></span>`;
}

function styles() {
  return `<style>
  .article-hero { padding: clamp(56px, 8vw, 96px) 0 34px; border-bottom: 1px solid var(--line); }
  .article-hero h1 { max-width: 980px; margin: 0; font-size: clamp(42px, 6.5vw, 82px); line-height: 0.98; letter-spacing: -0.03em; font-weight: 500; }
  .article-hero .summary { max-width: 760px; margin: 24px 0 0; color: var(--ink-soft); font-size: 18px; line-height: 1.58; }
  .article-meta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; color: var(--ink-mute); font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
  .article-layout { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: clamp(36px, 6vw, 72px); align-items: start; padding: 56px 0 90px; }
  .article-body { max-width: 760px; }
  .article-body h1 { display: none; }
  .article-body h2 { font-size: clamp(28px, 3.3vw, 42px); line-height: 1.08; letter-spacing: -0.02em; font-weight: 500; margin: 54px 0 14px; }
  .article-body h3 { font-size: 20px; line-height: 1.25; margin: 34px 0 10px; font-weight: 600; }
  .article-body p, .article-body li { color: var(--ink-soft); font-size: 17px; line-height: 1.72; }
  .article-body p { margin: 0 0 18px; }
  .article-body ul { margin: 0 0 24px; padding-left: 22px; }
  html[dir="rtl"] .article-body ul { padding-left: 0; padding-right: 22px; }
  .article-body a { color: var(--ink); border-bottom: 1px solid var(--line); }
  .article-aside { position: sticky; top: 96px; display: grid; gap: 16px; }
  .aside-box { border: 1px solid var(--line); border-radius: 8px; padding: 18px; background: color-mix(in oklab, var(--paper) 76%, transparent); }
  .aside-box h2, .aside-box h3 { margin: 0 0 12px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ink-mute); font-weight: 500; }
  .toc-list { display: grid; gap: 8px; }
  .toc-list a, .lang-list a { color: var(--ink-soft); font-size: 13px; line-height: 1.35; }
  .toc-list a:hover, .lang-list a:hover, .lang-list a.active { color: var(--ink); }
  .lang-list { display: flex; flex-wrap: wrap; gap: 8px; }
  .lang-list a { border: 1px solid var(--line); border-radius: 999px; padding: 6px 9px; }
  .post-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
  .post-card { background: var(--paper); padding: 30px; display: grid; gap: 12px; }
  .post-card:hover { background: var(--paper-soft); }
  .post-card h2 { margin: 0; font-size: clamp(24px, 3vw, 34px); line-height: 1.08; letter-spacing: -0.02em; font-weight: 500; }
  .post-card p { margin: 0; color: var(--ink-soft); line-height: 1.55; }
  @media (max-width: 980px) { .article-layout { grid-template-columns: 1fr; } .article-aside { position: static; } .post-grid { grid-template-columns: 1fr; } }
  </style>`;
}

function footer(prefix, langCode) {
  return `<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div class="col">
        <h4>Studio</h4>
        <p><strong>Nordic Theory Labs AB</strong><br/><em>Stockholm, Sweden</em></p>
      </div>
      <div class="col">
        <h4>Products</h4>
        <a href="${prefix}apps/korkort-hero/">Korkort Hero</a>
        <a href="${prefix}index.html#apps">All apps</a>
      </div>
      <div class="col">
        <h4>Studio</h4>
        <a href="${prefix}about.html">About</a>
        <a href="${prefix}blog/">Notes</a>
        <a href="${prefix}contact.html">Contact</a>
      </div>
      <div class="col">
        <h4>Legal</h4>
        <a href="${prefix}privacy/${langCode === "en" ? "index" : langCode}.html">Privacy</a>
        <a href="${prefix}terms/${langCode === "en" ? "index" : langCode}.html">Terms</a>
      </div>
    </div>
    <div class="foot-bottom">
      <div>2024-2026 NORDIC THEORY LABS AB</div>
      <div class="center">MADE IN STOCKHOLM</div>
      <div class="right"><a href="${prefix}index.html">Back to studio</a></div>
    </div>
  </div>
</footer>`;
}

function nav(prefix, langCode, current = "Notes") {
  return `<header class="nav">
  <div class="wrap nav-inner">
    <a href="${prefix}index.html?lang=${langCode}" class="brand" aria-label="Nordic Theory Labs">${brandMark()}<span class="brand-name">Nordic <em>Theory</em> Labs</span></a>
    <nav class="nav-links">
      <a href="${prefix}index.html?lang=${langCode}#apps">Apps</a>
      <a href="${prefix}blog/" class="active">Notes</a>
      <a href="${prefix}about.html">About</a>
      <a href="${prefix}contact.html">Contact</a>
    </nav>
    <div class="crumb"><a href="${prefix}blog/">Notes</a><span class="sep">/</span><span class="cur">${escapeHtml(current)}</span></div>
  </div>
</header>`;
}

function articlePage(post, allPosts) {
  const lang = langByCode.get(post.meta.language) || languages[0];
  const prefix = post.meta.language === "en" ? "../" : "../../";
  const rendered = addHeadingIds(markdownToHtml(post.body));
  const title = escapeHtml(post.meta.title);
  const description = escapeHtml(post.meta.seo_description || post.meta.summary);
  const related = allPosts.filter((item) => item.meta.translation_of === post.meta.translation_of);
  const languageLinks = related
    .map((item) => {
      const href = publicHrefFor(item, post.meta.language);
      const label = langByCode.get(item.meta.language)?.name || item.meta.language;
      const active = item.meta.language === post.meta.language ? " class=\"active\"" : "";
      return `<a${active} href="${href}">${escapeHtml(label)}</a>`;
    })
    .join("\n");
  const toc = rendered.toc
    .slice(0, 12)
    .map((item) => `<a href="#${item.id}">${escapeHtml(item.label)}</a>`)
    .join("\n");

  return `<!doctype html>
<html lang="${post.meta.language}" dir="${lang.dir}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${description}" />
<link rel="canonical" href="${escapeHtml(post.meta.canonical)}" />
<link rel="icon" type="image/svg+xml" href="${prefix}logos/exports/signal/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${prefix}assets/site.css" />
${styles()}
</head>
<body>
${nav(prefix, post.meta.language, post.meta.locale_name)}
<main>
  <header class="article-hero">
    <div class="wrap">
      <div class="eyebrow"><span class="bar"></span><span>${escapeHtml(post.meta.category)} - ${escapeHtml(post.meta.locale_name)}</span></div>
      <h1>${title}</h1>
      <p class="summary">${escapeHtml(post.meta.summary)}</p>
      <div class="article-meta">
        <span>${escapeHtml(displayDate(post.meta.published_at, post.meta.language))}</span>
        <span>${escapeHtml(post.meta.reading_time)}</span>
        <span>${escapeHtml(post.meta.author)}</span>
      </div>
    </div>
  </header>
  <div class="wrap article-layout">
    <article class="article-body">
${rendered.html}
    </article>
    <aside class="article-aside">
      <div class="aside-box">
        <h2>Sections</h2>
        <nav class="toc-list">${toc}</nav>
      </div>
      <div class="aside-box">
        <h2>Languages</h2>
        <nav class="lang-list">${languageLinks}</nav>
      </div>
      <div class="aside-box">
        <h2>Korkort Hero</h2>
        <p style="margin:0;color:var(--ink-soft);font-size:14px;line-height:1.5;">A calm study companion for Swedish driving theory.</p>
        <p style="margin:12px 0 0;"><a class="btn btn-ghost" href="${prefix}apps/korkort-hero/" style="padding:9px 14px;font-size:13px;">Open app page <span class="arrow">-&gt;</span></a></p>
      </div>
    </aside>
  </div>
</main>
${footer(prefix, post.meta.language)}
</body>
</html>
`;
}

function indexPage(langCode, posts) {
  const lang = langByCode.get(langCode) || languages[0];
  const prefix = "../../";
  const cards = posts
    .map((post) => `<a class="post-card" href="${post.meta.slug}.html">
      <div class="tag">${escapeHtml(post.meta.category)} - ${escapeHtml(post.meta.reading_time)}</div>
      <h2>${escapeHtml(post.meta.title)}</h2>
      <p>${escapeHtml(post.meta.summary)}</p>
    </a>`)
    .join("\n");
  const languageLinks = languages
    .map((item) => {
      const active = item.code === langCode ? " class=\"active\"" : "";
      return `<a${active} href="${indexHrefFor(item.code, langCode)}">${escapeHtml(item.name)}</a>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="${langCode}" dir="${lang.dir}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(lang.name)} Notes - Nordic Theory Labs</title>
<meta name="description" content="Localized ${escapeHtml(lang.name)} notes from Nordic Theory Labs." />
<link rel="canonical" href="https://nordictheorylabs.com/blog/${langCode}/" />
<link rel="icon" type="image/svg+xml" href="../../logos/exports/signal/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="../../assets/site.css" />
${styles()}
</head>
<body>
${nav(prefix, langCode, lang.name)}
<main>
  <section class="page-head">
    <div class="aurora" aria-hidden="true"></div>
    <div class="wrap">
      <div class="eyebrow"><span class="bar"></span><span>Blog archive - ${escapeHtml(langCode)}</span></div>
      <h1 class="page-title">${escapeHtml(lang.name)} <em>notes</em>.</h1>
      <p class="page-sub">Localized articles from Nordic Theory Labs about Swedish driving theory, study habits and building calm learning software.</p>
      <nav class="lang-list" style="margin-top:28px;">${languageLinks}</nav>
    </div>
  </section>
  <section style="padding-top:0;">
    <div class="wrap">
      <div class="post-grid">${cards}</div>
    </div>
  </section>
</main>
${footer(prefix, langCode)}
</body>
</html>
`;
}

function redirectPage(target, title = "Redirecting") {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="refresh" content="0; url=${target}" />
<script>location.replace('${target}' + location.hash);</script>
<title>${escapeHtml(title)}</title>
</head>
<body>
<p>Redirecting to <a href="${target}">${escapeHtml(title)}</a>...</p>
</body>
</html>
`;
}

async function readPosts() {
  const posts = [];
  for (const lang of languages) {
    const dir = path.join(contentRoot, lang.code, "posts");
    let files = [];
    try {
      files = await fs.readdir(dir);
    } catch {
      continue;
    }
    for (const file of files.filter((item) => item.endsWith(".md")).sort()) {
      const fullPath = path.join(dir, file);
      const parsed = parseMarkdown(await fs.readFile(fullPath, "utf8"));
      posts.push({ ...parsed, sourcePath: fullPath });
    }
  }
  return posts.sort((a, b) => String(b.meta.published_at).localeCompare(String(a.meta.published_at)));
}

async function main() {
  const posts = await readPosts();
  for (const post of posts) {
    const target = outputPathFor(post);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, articlePage(post, posts), "utf8");
    if (post.meta.language === "en") {
      const redirectTarget = path.join(blogRoot, "en", `${post.meta.slug}.html`);
      await fs.mkdir(path.dirname(redirectTarget), { recursive: true });
      await fs.writeFile(redirectTarget, redirectPage(`../${post.meta.slug}.html`, post.meta.title), "utf8");
    }
  }

  for (const lang of languages.filter((item) => item.code !== "en")) {
    const localizedPosts = posts.filter((post) => post.meta.language === lang.code);
    await fs.mkdir(path.join(blogRoot, lang.code), { recursive: true });
    await fs.writeFile(path.join(blogRoot, lang.code, "index.html"), indexPage(lang.code, localizedPosts), "utf8");
  }

  await fs.mkdir(path.join(blogRoot, "en"), { recursive: true });
  await fs.writeFile(path.join(blogRoot, "en", "index.html"), redirectPage("../index.html", "English Notes"), "utf8");

  console.log(`Built ${posts.length} article pages and ${languages.length - 1} localized indexes.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
