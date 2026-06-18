/**
 * kh-cta.js — Körkort Hero reusable CTA component
 * Usage: <div class="kh-cta" data-variant="top|mid|bottom"></div>
 * The script finds all such elements and replaces them with styled HTML.
 */
(function () {
  'use strict';

  var APPSTORE_URL = 'https://apps.apple.com/app/korkort-hero/id6747370937';

  var strings = {
    sv: {
      tagline:  'Öva körkortsteorin gratis',
      headline: 'Ta körkortet med rätt förberedelse',
      sub:      'Samma frågeformat som Trafikverkets kunskapsprov — offline, på svenska eller ditt eget språk.',
      feat1:    '1 287 officiella övningsfrågor',
      feat2:    '154 teorikakitel med bilder',
      feat3:    '12 språk — öva på ditt modersmål',
      appstore: 'Hämta gratis på App Store',
      coming:   'Google Play — kommer snart',
      bottom_h: 'Redo att klara kunskapsprovet?',
      bottom_s: 'Ladda ner Körkort Hero gratis och börja öva idag.',
    },
    en: {
      tagline:  'Practice for free',
      headline: 'The calm way to pass your theory test',
      sub:      'Official-format questions, 154 theory chapters, available in 12 languages. Works offline.',
      feat1:    '1,287 practice questions',
      feat2:    '154 illustrated theory chapters',
      feat3:    '12 languages — study in your own',
      appstore: 'Download free on App Store',
      coming:   'Google Play — coming soon',
      bottom_h: 'Ready to pass your theory test?',
      bottom_s: 'Download Körkort Hero free and start studying today.',
    }
  };

  function detectLang() {
    var m = window.location.search.match(/[?&]lang=([a-z]{2})/);
    if (m) return m[1];
    try { var s = localStorage.getItem('kh_lang'); if (s) return s; } catch (e) {}
    var nav = (navigator.language || '').slice(0, 2).toLowerCase();
    return (nav === 'sv') ? 'sv' : 'en';
  }

  function fire(name, params) {
    if (window.KHAnalytics) { window.KHAnalytics.fire(name, params); return; }
    if (typeof gtag === 'function') { gtag('event', name, params || {}); return; }
    console.log('[KH CTA]', name, params || {});
  }

  function appleIcon() {
    return '<svg width="20" height="20" viewBox="0 0 814 1000" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.5-148.2-103C27.3 790.6 0 687.3 0 588.6c0-191.5 124.7-292.6 247.2-292.6 65.8 0 120.4 43.2 162.2 43.2 39.9 0 103.5-46.1 178.4-46.1 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>';
  }

  function renderTop(s, lang) {
    return '<div class="kh-cta-top">' +
      '<span class="kh-cta-top-text">' + s.tagline + ' → <strong>Körkort Hero</strong></span>' +
      '<a class="kh-cta-top-btn" href="' + APPSTORE_URL + '" target="_blank" rel="noopener">' +
        appleIcon() + ' ' + s.appstore +
      '</a>' +
    '</div>';
  }

  function renderMid(s, lang) {
    return '<div class="kh-cta-mid">' +
      '<img class="kh-cta-mid-icon" src="/images/kh-app-icon.png" alt="Körkort Hero" width="72" height="72" />' +
      '<div class="kh-cta-mid-body">' +
        '<h3 class="kh-cta-mid-title">Körkort Hero</h3>' +
        '<ul class="kh-cta-mid-feats">' +
          '<li>' + s.feat1 + '</li>' +
          '<li>' + s.feat2 + '</li>' +
          '<li>' + s.feat3 + '</li>' +
        '</ul>' +
        '<a class="kh-cta-mid-btn" href="' + APPSTORE_URL + '" target="_blank" rel="noopener">' +
          appleIcon() + ' ' + s.appstore +
        '</a>' +
      '</div>' +
    '</div>';
  }

  function renderBottom(s, lang) {
    return '<div class="kh-cta-bottom">' +
      '<div class="kh-cta-bottom-inner">' +
        '<h2 class="kh-cta-bottom-h">' + s.bottom_h + '</h2>' +
        '<p class="kh-cta-bottom-s">' + s.bottom_s + '</p>' +
        '<div class="kh-cta-bottom-btns">' +
          '<a class="kh-cta-btn-primary" href="' + APPSTORE_URL + '" target="_blank" rel="noopener">' +
            appleIcon() + ' ' + s.appstore +
          '</a>' +
          '<span class="kh-cta-btn-secondary">' + s.coming + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  var css =
    /* TOP */
    '.kh-cta-top{display:flex;align-items:center;justify-content:space-between;gap:16px;' +
      'background:#F1EEE6;border:1px solid rgba(14,22,32,0.1);border-radius:12px;' +
      'padding:14px 20px;margin:32px 0;flex-wrap:wrap;}' +
    '.kh-cta-top-text{font-family:"Manrope",sans-serif;font-size:15px;color:#0E1620;}' +
    '.kh-cta-top-text strong{font-weight:700;}' +
    '.kh-cta-top-btn{display:inline-flex;align-items:center;gap:8px;' +
      'background:#0E1620;color:#F1EEE6;padding:9px 18px;border-radius:8px;' +
      'font-family:"Manrope",sans-serif;font-size:14px;font-weight:600;text-decoration:none;' +
      'transition:opacity 0.15s;white-space:nowrap;}' +
    '.kh-cta-top-btn:hover{opacity:0.8;}' +
    /* MID */
    '.kh-cta-mid{display:flex;align-items:flex-start;gap:20px;' +
      'background:#F1EEE6;border:1px solid rgba(14,22,32,0.1);border-radius:16px;' +
      'padding:24px;margin:40px 0;}' +
    '.kh-cta-mid-icon{border-radius:16px;flex-shrink:0;}' +
    '.kh-cta-mid-body{flex:1;}' +
    '.kh-cta-mid-title{font-family:"Manrope",sans-serif;font-size:18px;font-weight:700;' +
      'color:#0E1620;margin:0 0 10px;}' +
    '.kh-cta-mid-feats{list-style:none;padding:0;margin:0 0 16px;}' +
    '.kh-cta-mid-feats li{font-family:"Manrope",sans-serif;font-size:14px;color:#0E1620;' +
      'padding:3px 0;opacity:0.85;}' +
    '.kh-cta-mid-feats li::before{content:"✓ ";color:oklch(0.55 0.13 220);font-weight:700;}' +
    '.kh-cta-mid-btn{display:inline-flex;align-items:center;gap:8px;' +
      'background:#0E1620;color:#F1EEE6;padding:10px 20px;border-radius:9px;' +
      'font-family:"Manrope",sans-serif;font-size:14px;font-weight:600;text-decoration:none;' +
      'transition:opacity 0.15s;}' +
    '.kh-cta-mid-btn:hover{opacity:0.8;}' +
    /* BOTTOM */
    '.kh-cta-bottom{background:#0E1620;color:#F1EEE6;padding:80px 24px;text-align:center;margin:60px 0;}' +
    '.kh-cta-bottom-inner{max-width:600px;margin:0 auto;}' +
    '.kh-cta-bottom-h{font-family:"Instrument Serif",serif;font-size:clamp(32px,5vw,56px);' +
      'font-weight:400;color:#F1EEE6;margin:0 0 16px;line-height:1.1;}' +
    '.kh-cta-bottom-s{font-family:"Manrope",sans-serif;font-size:17px;opacity:0.75;margin:0 0 36px;}' +
    '.kh-cta-bottom-btns{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;}' +
    '.kh-cta-btn-primary{display:inline-flex;align-items:center;gap:10px;' +
      'background:#F1EEE6;color:#0E1620;padding:14px 28px;border-radius:12px;' +
      'font-family:"Manrope",sans-serif;font-size:15px;font-weight:700;text-decoration:none;' +
      'transition:opacity 0.15s;}' +
    '.kh-cta-btn-primary:hover{opacity:0.85;}' +
    '.kh-cta-btn-secondary{display:inline-flex;align-items:center;gap:10px;' +
      'border:2px solid rgba(241,238,230,0.25);color:rgba(241,238,230,0.55);' +
      'padding:14px 28px;border-radius:12px;' +
      'font-family:"Manrope",sans-serif;font-size:15px;font-weight:600;cursor:not-allowed;}' +
    '@media(max-width:480px){.kh-cta-mid{flex-direction:column;}.kh-cta-top{flex-direction:column;align-items:flex-start;}}';

  function inject() {
    var lang = detectLang();
    var s = strings[lang] || strings.sv;

    // Inject CSS once
    if (!document.getElementById('kh-cta-styles')) {
      var styleEl = document.createElement('style');
      styleEl.id = 'kh-cta-styles';
      styleEl.textContent = css;
      document.head.appendChild(styleEl);
    }

    document.querySelectorAll('.kh-cta').forEach(function (el) {
      var variant = el.getAttribute('data-variant') || 'mid';
      var html;
      if (variant === 'top')    html = renderTop(s, lang);
      else if (variant === 'bottom') html = renderBottom(s, lang);
      else                           html = renderMid(s, lang);

      el.innerHTML = html;

      // Track clicks
      el.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          fire('kh_cta_click', { variant: variant, lang: lang, page: window.location.pathname });
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
