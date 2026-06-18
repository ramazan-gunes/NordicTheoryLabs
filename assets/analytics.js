/**
 * analytics.js — Körkort Hero / Nordic Theory Labs
 * Tracks key engagement and conversion events via gtag (if available),
 * falls back to console.log in development.
 *
 * GA4 SETUP: Replace GA4_MEASUREMENT_ID below with your real ID (e.g. G-XXXXXXXXXX)
 * Then uncomment the gtag loader block.
 */

// ── GA4 Auto-loader (uncomment + replace ID when ready) ──────────────────
// var GA4_ID = 'G-XXXXXXXXXX';
// if (!document.querySelector('script[src*="googletagmanager"]')) {
//   var s = document.createElement('script');
//   s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
//   s.async = true;
//   document.head.appendChild(s);
//   window.dataLayer = window.dataLayer || [];
//   window.gtag = function(){ dataLayer.push(arguments); };
//   gtag('js', new Date());
//   gtag('config', GA4_ID, { send_page_view: true });
// }

(function () {
  'use strict';

  function fire(eventName, params) {
    if (typeof gtag === 'function') {
      gtag('event', eventName, params || {});
    } else {
      console.log('[KH Analytics]', eventName, params || {});
    }
  }

  // ── Scroll depth ──────────────────────────────────────────────────
  var scrollFired = { 25: false, 50: false, 75: false, 100: false };
  function onScroll() {
    var scrolled = window.scrollY + window.innerHeight;
    var total = document.documentElement.scrollHeight;
    var pct = Math.round((scrolled / total) * 100);
    [25, 50, 75, 100].forEach(function (threshold) {
      if (!scrollFired[threshold] && pct >= threshold) {
        scrollFired[threshold] = true;
        fire('kh_scroll_' + threshold);
      }
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Time on page ──────────────────────────────────────────────────
  [30, 60, 120].forEach(function (seconds) {
    setTimeout(function () {
      fire('kh_time_on_page', { seconds: seconds });
    }, seconds * 1000);
  });

  // ── App Store clicks (any <a> pointing to App Store) ──────────────
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a');
    if (!el) return;
    var href = el.getAttribute('href') || '';
    if (href.indexOf('apps.apple.com') !== -1) {
      fire('kh_appstore_click', {
        page: window.location.pathname,
        element: el.className || el.textContent.trim().slice(0, 40)
      });
    }
  });

  // ── City page view ────────────────────────────────────────────────
  var cityMatch = window.location.pathname.match(/\/korkortsteori-([^/]+)\//);
  if (cityMatch) {
    fire('kh_city_page_view', { city: cityMatch[1] });
  }

  // ── CTA impressions (IntersectionObserver) ────────────────────────
  if ('IntersectionObserver' in window) {
    var ctaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          fire('kh_cta_impression', {
            variant: el.getAttribute('data-variant') || 'unknown',
            page: window.location.pathname
          });
          ctaObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    function observeCtas() {
      document.querySelectorAll('.kh-cta').forEach(function (el) {
        ctaObserver.observe(el);
      });
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeCtas);
    } else {
      observeCtas();
    }
  }

  // ── Expose fire() so other scripts can call KHAnalytics.fire() ───
  window.KHAnalytics = { fire: fire };
})();
