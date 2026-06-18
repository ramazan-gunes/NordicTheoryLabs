/**
 * schema.js — Auto-inject JSON-LD structured data
 * Detects page type from URL and injects appropriate schemas.
 */
(function () {
  'use strict';

  var BASE = 'https://nordictheorylabs.com';
  var path = window.location.pathname;

  function injectSchema(obj) {
    var el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(obj);
    document.head.appendChild(el);
  }

  // ── Organization (always) ─────────────────────────────────────────
  injectSchema({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Nordic Theory Labs',
    'url': BASE,
    'logo': BASE + '/images/korkort-hero-icon.png',
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer support',
      'email': 'support@nordictheorylabs.com'
    },
    'sameAs': []
  });

  // ── SoftwareApplication — on /apps/korkort-hero/ ─────────────────
  if (/\/apps\/korkort-hero\/?/.test(path)) {
    injectSchema({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Körkort Hero',
      'applicationCategory': 'EducationApplication',
      'operatingSystem': 'iOS',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'SEK'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'ratingCount': '1200'
      },
      'description': "Sweden's calmest driving theory app. 1,287 official-format questions, 154 theory chapters, 12 languages.",
      'url': 'https://apps.apple.com/app/korkort-hero/id6747370937',
      'screenshot': BASE + '/images/kh-app-icon.png',
      'inLanguage': ['sv', 'en', 'ar', 'so', 'fa', 'tr', 'pl', 'es', 'ku', 'ru', 'bs', 'fi'],
      'publisher': {
        '@type': 'Organization',
        'name': 'Nordic Theory Labs'
      }
    });
  }

  // ── Article + BreadcrumbList — on blog pages ──────────────────────
  if (/\/blog\//.test(path)) {
    var title  = document.title || 'Körkort Hero Blog';
    var desc   = (document.querySelector('meta[name="description"]') || {}).content || '';
    var canonical = (document.querySelector('link[rel="canonical"]') || {}).href || (BASE + path);
    var dateEl = document.querySelector('time[datetime]');
    var pubDate = dateEl ? dateEl.getAttribute('datetime') : '2026-01-01';

    injectSchema({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': title,
      'description': desc,
      'url': canonical,
      'datePublished': pubDate,
      'dateModified': pubDate,
      'publisher': {
        '@type': 'Organization',
        'name': 'Nordic Theory Labs',
        'logo': {
          '@type': 'ImageObject',
          'url': BASE + '/images/korkort-hero-icon.png'
        }
      },
      'author': {
        '@type': 'Organization',
        'name': 'Nordic Theory Labs'
      }
    });

    // Breadcrumb
    var crumbs = [{ name: 'Hem', url: BASE }];
    var langMatch = path.match(/\/blog\/([a-z]{2})\//);
    if (langMatch) {
      crumbs.push({ name: 'Blog', url: BASE + '/blog/' });
      crumbs.push({ name: langMatch[1].toUpperCase(), url: BASE + '/blog/' + langMatch[1] + '/' });
    } else {
      crumbs.push({ name: 'Blog', url: BASE + '/blog/' });
    }
    crumbs.push({ name: title.split('—')[0].trim(), url: canonical });

    injectSchema({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': crumbs.map(function (c, i) {
        return {
          '@type': 'ListItem',
          'position': i + 1,
          'name': c.name,
          'item': c.url
        };
      })
    });
  }

  // ── FAQPage — city pages and hub pages ───────────────────────────
  // These pages already have inline JSON-LD for FAQPage;
  // this block is a safety net for any page that has .faq-item elements
  // but no existing script[type="application/ld+json"].
  var cityMatch = path.match(/\/korkortsteori-([^/]+)\//);
  var hubMatch  = /\/(korkort-app|teoriprov-app|korkortsteori-online)\//.test(path);

  if ((cityMatch || hubMatch) && !document.querySelector('script[type="application/ld+json"]')) {
    var faqs = document.querySelectorAll('.faq-item');
    if (faqs.length) {
      var entities = [];
      faqs.forEach(function (item) {
        var q = item.querySelector('.faq-q');
        var a = item.querySelector('.faq-a');
        if (q && a) {
          entities.push({
            '@type': 'Question',
            'name': q.textContent.trim(),
            'acceptedAnswer': { '@type': 'Answer', 'text': a.textContent.trim() }
          });
        }
      });
      if (entities.length) {
        injectSchema({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': entities
        });
      }
    }
  }
})();
