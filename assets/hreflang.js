/**
 * hreflang.js — Auto-inject hreflang link tags based on current URL
 */
(function () {
  'use strict';

  var BASE = 'https://nordictheorylabs.com';
  var path = window.location.pathname;

  function addHreflang(hreflang, href) {
    var link = document.createElement('link');
    link.rel = 'alternate';
    link.setAttribute('hreflang', hreflang);
    link.setAttribute('href', href);
    document.head.appendChild(link);
  }

  // Already has hreflang? Skip.
  if (document.querySelector('link[hreflang]')) return;

  // ── Blog /sv/ ─────────────────────────────────────────────────────
  if (/^\/blog\/sv\//.test(path)) {
    addHreflang('sv', BASE + path);
    addHreflang('x-default', BASE + path);
    return;
  }

  // ── Blog /pl/ ─────────────────────────────────────────────────────
  if (/^\/blog\/pl\//.test(path)) {
    addHreflang('pl', BASE + path);
    addHreflang('x-default', BASE + '/blog/');
    return;
  }

  // ── Blog /ru/ ─────────────────────────────────────────────────────
  if (/^\/blog\/ru\//.test(path)) {
    addHreflang('ru', BASE + path);
    addHreflang('x-default', BASE + '/blog/');
    return;
  }

  // ── Blog /so/ ─────────────────────────────────────────────────────
  if (/^\/blog\/so\//.test(path)) {
    addHreflang('so', BASE + path);
    addHreflang('x-default', BASE + '/blog/');
    return;
  }

  // ── Blog /ar/ ─────────────────────────────────────────────────────
  if (/^\/blog\/ar\//.test(path)) {
    addHreflang('ar', BASE + path);
    addHreflang('x-default', BASE + '/blog/');
    return;
  }

  // ── Blog /tr/ ─────────────────────────────────────────────────────
  if (/^\/blog\/tr\//.test(path)) {
    addHreflang('tr', BASE + path);
    addHreflang('x-default', BASE + '/blog/');
    return;
  }

  // ── Blog /fi/ ─────────────────────────────────────────────────────
  if (/^\/blog\/fi\//.test(path)) {
    addHreflang('fi', BASE + path);
    addHreflang('x-default', BASE + '/blog/');
    return;
  }

  // ── Blog /en/ ─────────────────────────────────────────────────────
  if (/^\/blog\/en\//.test(path)) {
    addHreflang('en', BASE + path);
    addHreflang('x-default', BASE + path);
    return;
  }

  // ── Blog root (English canonical) ────────────────────────────────
  if (/^\/blog\/?$/.test(path) || /^\/blog\/[^/]+\.html$/.test(path)) {
    addHreflang('en', BASE + path);
    addHreflang('x-default', BASE + path);
    return;
  }

  // ── Product page — all 12 langs ──────────────────────────────────
  if (/^\/apps\/korkort-hero\/?/.test(path)) {
    var langs12 = ['sv','en','ar','so','fa','tr','pl','es','ku','ru','bs','fi'];
    langs12.forEach(function (lang) {
      addHreflang(lang, BASE + '/apps/korkort-hero/?lang=' + lang);
    });
    addHreflang('x-default', BASE + '/apps/korkort-hero/');
    return;
  }

  // ── City pages ────────────────────────────────────────────────────
  if (/^\/korkortsteori-/.test(path)) {
    addHreflang('sv', BASE + path);
    addHreflang('x-default', BASE + path);
    return;
  }

  // ── Hub pages ────────────────────────────────────────────────────
  if (/^\/(korkort-app|teoriprov-app|korkortsteori-online)\//.test(path)) {
    addHreflang('sv', BASE + path);
    addHreflang('x-default', BASE + path);
    return;
  }

  // ── Homepage / root pages ─────────────────────────────────────────
  if (path === '/' || /^\/(about|contact|support|press|changelog)\.html$/.test(path)) {
    addHreflang('sv', BASE + path);
    addHreflang('en', BASE + path);
    addHreflang('x-default', BASE + path);
  }
})();
