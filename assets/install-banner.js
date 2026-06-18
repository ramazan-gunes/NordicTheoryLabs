/**
 * install-banner.js — Körkort Hero app install prompt
 * Bottom banner with 7-day dismissal, language detection, analytics.
 */
(function () {
  'use strict';

  var APPSTORE_URL = 'https://apps.apple.com/app/korkort-hero/id6747370937';
  var STORAGE_KEY  = 'kh_banner_dismissed';
  var DISMISS_TTL  = 7 * 24 * 60 * 60 * 1000; // 7 days

  // ── Dismissal guard ───────────────────────────────────────────────
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      var ts = parseInt(stored, 10);
      if (Date.now() - ts < DISMISS_TTL) return;
    }
  } catch (e) { /* private browsing — proceed */ }

  // ── Language detection ────────────────────────────────────────────
  var strings = {
    sv: { text: 'Öva teoriprov med Körkort Hero', btn: 'Hämta på App Store' },
    en: { text: 'Pass your driving theory exam with Körkort Hero', btn: 'Download on App Store' },
    ar: { text: 'استعد لاختبار نظرية القيادة مع Körkort Hero', btn: 'تنزيل من App Store' },
    tr: { text: 'Ehliyet teorisini Körkort Hero ile çalış', btn: "App Store'dan İndir" },
    fa: { text: 'با Körkort Hero برای آزمون تئوری رانندگی تمرین کن', btn: 'دانلود از App Store' },
    so: { text: 'U xidid imtixaanka aragtida wadashaqeynta ee Körkort Hero', btn: 'Soo dejiso App Store' },
    pl: { text: 'Przygotuj się do egzaminu teoretycznego z Körkort Hero', btn: 'Pobierz z App Store' },
    ru: { text: 'Готовьтесь к теоретическому экзамену с Körkort Hero', btn: 'Скачать в App Store' },
    bs: { text: 'Pripremi se za teorijski ispit s Körkort Hero', btn: 'Preuzmi na App Store' },
    fi: { text: 'Harjoittele teoriakoketta Körkort Hero -sovelluksella', btn: 'Lataa App Storesta' },
    es: { text: 'Prepara tu examen de teoría de conducción con Körkort Hero', btn: 'Descargar en App Store' },
    ku: { text: 'Ji bo azmûna teoriya ajotinan bi Körkort Hero amadebibe', btn: 'Ji App Store dakêşe' }
  };

  function detectLang() {
    // 1. URL param ?lang=
    var m = window.location.search.match(/[?&]lang=([a-z]{2})/);
    if (m && strings[m[1]]) return m[1];
    // 2. localStorage (site's own setting)
    try {
      var saved = localStorage.getItem('kh_lang');
      if (saved && strings[saved]) return saved;
    } catch (e) {}
    // 3. navigator.language
    var nav = (navigator.language || '').slice(0, 2).toLowerCase();
    if (strings[nav]) return nav;
    // 4. URL path hint (/blog/sv/, /blog/pl/, etc.)
    var pathMatch = window.location.pathname.match(/\/([a-z]{2})\//);
    if (pathMatch && strings[pathMatch[1]]) return pathMatch[1];
    return 'sv'; // Sweden-first default
  }

  function fire(name, params) {
    if (window.KHAnalytics) { window.KHAnalytics.fire(name, params); return; }
    if (typeof gtag === 'function') { gtag('event', name, params || {}); return; }
    console.log('[KH Banner]', name, params || {});
  }

  // ── Build banner DOM ──────────────────────────────────────────────
  var lang = detectLang();
  var s    = strings[lang] || strings.sv;
  var rtl  = ['ar', 'fa'].indexOf(lang) !== -1;

  var banner = document.createElement('div');
  banner.id  = 'kh-install-banner';
  banner.setAttribute('role', 'complementary');
  banner.setAttribute('aria-label', 'App install prompt');
  if (rtl) banner.setAttribute('dir', 'rtl');

  banner.innerHTML =
    '<div class="kh-banner-inner">' +
      '<img class="kh-banner-icon" src="/images/kh-app-icon.png" alt="Körkort Hero" width="48" height="48" />' +
      '<div class="kh-banner-text">' +
        '<strong>Körkort Hero</strong>' +
        '<span>' + s.text + '</span>' +
      '</div>' +
      '<a class="kh-banner-btn" href="' + APPSTORE_URL + '" target="_blank" rel="noopener">' +
        s.btn +
      '</a>' +
      '<button class="kh-banner-close" aria-label="Stäng">&times;</button>' +
    '</div>';

  // ── Styles ────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent =
    '#kh-install-banner{' +
      'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
      'background:#0E1620;color:#F1EEE6;' +
      'box-shadow:0 -4px 24px rgba(0,0,0,0.35);' +
      'font-family:"Manrope","Helvetica Neue",system-ui,sans-serif;' +
      'font-size:14px;line-height:1.4;' +
      'animation:kh-slide-up 0.35s cubic-bezier(0.22,1,0.36,1);' +
    '}' +
    '.kh-banner-inner{' +
      'display:flex;align-items:center;gap:12px;' +
      'max-width:1200px;margin:0 auto;padding:12px 16px;' +
    '}' +
    '.kh-banner-icon{border-radius:12px;flex-shrink:0;}' +
    '.kh-banner-text{flex:1;min-width:0;}' +
    '.kh-banner-text strong{display:block;font-weight:700;font-size:15px;color:#F1EEE6;}' +
    '.kh-banner-text span{display:block;opacity:0.75;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}' +
    '.kh-banner-btn{' +
      'flex-shrink:0;display:inline-block;' +
      'background:oklch(0.55 0.13 220);color:#fff;' +
      'padding:8px 16px;border-radius:8px;font-weight:600;font-size:13px;' +
      'text-decoration:none;white-space:nowrap;' +
      'transition:opacity 0.15s;' +
    '}' +
    '.kh-banner-btn:hover{opacity:0.85;}' +
    '.kh-banner-close{' +
      'flex-shrink:0;background:none;border:none;cursor:pointer;' +
      'color:rgba(241,238,230,0.6);font-size:24px;line-height:1;padding:4px 8px;' +
      'transition:color 0.15s;' +
    '}' +
    '.kh-banner-close:hover{color:#F1EEE6;}' +
    '@media(min-width:640px){' +
      '#kh-install-banner{left:auto;right:20px;bottom:20px;width:380px;border-radius:16px;}' +
    '}' +
    '@keyframes kh-slide-up{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}';

  // ── Mount ─────────────────────────────────────────────────────────
  function mount() {
    document.head.appendChild(style);
    document.body.appendChild(banner);

    fire('kh_banner_impression', { lang: lang });

    // Dismiss
    banner.querySelector('.kh-banner-close').addEventListener('click', function () {
      fire('kh_banner_dismiss', { lang: lang });
      try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch (e) {}
      banner.style.transition = 'opacity 0.2s,transform 0.2s';
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      setTimeout(function () { banner.remove(); }, 250);
    });

    // App Store click
    banner.querySelector('.kh-banner-btn').addEventListener('click', function () {
      fire('kh_banner_click_appstore', { lang: lang });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
