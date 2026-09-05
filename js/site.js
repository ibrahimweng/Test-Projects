/* ==========================================================================
   Pagrin — shared page chrome
   Design: Figma "Pagrin – Designs from Weng"
     Nav bar  12202:364209 · CTA band 11998:40946 · Footer 12202:362479

   The nav, the closing CTA band and the footer are identical on every page,
   so they live here once instead of being pasted into nine files. Drop a
   placeholder in the markup and this fills it in:

     <div data-pg-nav></div>
     <div data-pg-cta></div>
     <div data-pg-footer></div>

   The current page is read from <body data-page="..."> and marked with
   aria-current in both the nav and the footer.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------- data */

  var PLATFORM = [
    ['agentic-os',        'agentic-os.html',        'Agentic OS',        'A workforce of specialised agents on your brand.'],
    ['agentic-commerce',  'agentic-commerce.html',  'Agentic Commerce',  'Checkout, travel and payments inside any chat.'],
    ['infinite-campaigns','infinite-campaigns.html','Infinite Campaigns','A campaign for every customer, always on.'],
    ['secure-layer',      'secure-layer.html',      'Secure Layer',      'Scopes, consent and audit on every action.']
  ];

  /* The footer's Company column is fixed by the Figma design at four links,
     so Case studies lives in the nav menu only. Both collections sit on the
     Media page, so that entry is an anchor into it rather than a page. */
  var COMPANY = [
    ['about',  'about.html',           'About',              'Why we are building the rewards layer.'],
    ['blog',   'blog.html',            'Blogs',              'Writing, research and customer stories.'],
    ['trust',  'trust-security.html',  'Trust & Security',   'How we protect institutions and their customers.'],
    ['terms',  'terms.html',           'Terms & Conditions', 'The agreement that covers using Pagrin.']
  ];

  var COMPANY_NAV = [
    COMPANY[0],
    COMPANY[1],
    ['blog', 'blog.html#case-studies', 'Case studies', 'What changed once the agents went live.'],
    COMPANY[2],
    COMPANY[3]
  ];

  var CONNECT = [
    ['contact', 'contact.html', 'Contact'],
    [null, 'https://www.linkedin.com/company/pagrin', 'LinkedIn'],
    [null, 'https://x.com/pagrin', 'X / Twitter'],
    ['contact', 'contact.html#demo', 'Book a demo']
  ];

  var MAIL = 'Hello@pagrin.com';

  /* --------------------------------------------------------------- utils */

  var page = document.body.getAttribute('data-page') || '';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function current(id) {
    return id && id === page ? ' aria-current="page"' : '';
  }

  /* The brand mark: diagonal strokes running warm at the top-right and cool
     at the bottom-left, matching the gradient in the Figma logo. */
  function mark(id, size) {
    var g = 'pgGrad-' + id;
    var bars = '';
    for (var i = 0; i < 10; i++) {
      bars += '<rect x="' + (-10 + i * 5.1) + '" y="-12" width="3.2" height="60" rx="1.6"/>';
    }
    return '' +
      '<svg class="pg-logo__mark" width="' + size + '" height="' + size + '" viewBox="0 0 36 36" ' +
      'role="img" aria-label="Pagrin" focusable="false">' +
        '<defs>' +
          '<linearGradient id="' + g + '" x1="0" y1="1" x2="1" y2="0">' +
            '<stop offset="0"   stop-color="#6F45F3"/>' +
            '<stop offset=".45" stop-color="#E7469B"/>' +
            '<stop offset=".78" stop-color="#FF6A3D"/>' +
            '<stop offset="1"   stop-color="#FFA928"/>' +
          '</linearGradient>' +
          '<clipPath id="' + g + '-clip"><rect x="1" y="1" width="34" height="34" rx="7"/></clipPath>' +
        '</defs>' +
        '<g clip-path="url(#' + g + '-clip)" fill="url(#' + g + ')" ' +
           'transform="rotate(21 18 18)">' + bars + '</g>' +
      '</svg>';
  }

  function caret() {
    return '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
      '<path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" stroke-width="1.4" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function menu(name, items) {
    var id = 'pg-menu-' + name.toLowerCase();
    var html = '<div class="pg-menu" data-pg-menu>' +
      '<button class="pg-menu__btn" type="button" aria-expanded="false" aria-controls="' + id + '">' +
        esc(name) + caret() +
      '</button>' +
      '<div class="pg-menu__panel" id="' + id + '">';
    items.forEach(function (it) {
      html += '<a class="pg-menu__item" href="' + it[1] + '"' + current(it[0]) + '>' +
        '<strong>' + esc(it[2]) + '</strong><span>' + esc(it[3]) + '</span></a>';
    });
    return html + '</div></div>';
  }

  /* ----------------------------------------------------------------- nav */

  function navHTML() {
    return '' +
    '<header class="pg-nav" data-pg-navroot>' +
      '<div class="pg-nav__inner">' +
        '<a class="pg-logo" href="index.html" aria-label="Pagrin — home">' +
          mark('nav', 26) +
          '<span class="pg-logo__word">Pagrin</span>' +
        '</a>' +
        '<button class="pg-burger" type="button" aria-expanded="false" ' +
                'aria-controls="pg-navlinks" aria-label="Menu"><span></span></button>' +
        '<nav class="pg-nav__links" id="pg-navlinks" aria-label="Primary">' +
          menu('Platform', PLATFORM) +
          menu('Company', COMPANY_NAV) +
          '<a class="pg-nav__link" href="docs.html">View docs</a>' +
        '</nav>' +
        '<div class="pg-nav__cta">' +
          '<a class="pg-btn pg-btn--ghost" href="docs.html">View Developer Docs</a>' +
          '<a class="pg-btn pg-btn--primary" href="contact.html#demo">Talk to Our Team</a>' +
        '</div>' +
      '</div>' +
    '</header>';
  }

  /* ----------------------------------------------------------------- cta */

  function ctaHTML() {
    return '' +
    '<section class="pg-cta" aria-labelledby="pg-cta-title">' +
      '<div class="pg-shell">' +
        '<div class="pg-cta__panel">' +
          '<div class="pg-cta__inner">' +
            '<h2 class="pg-h2 pg-cta__title" id="pg-cta-title">' +
              'Increase customer spend, Grow lifetime value</h2>' +
            '<div class="pg-btnrow pg-btnrow--center">' +
              '<a class="pg-btn pg-btn--primary pg-btn--lg" href="contact.html#demo">Schedule a Demo ↗</a>' +
              '<a class="pg-btn pg-btn--quiet pg-btn--lg" href="docs.html">View API Docs</a>' +
            '</div>' +
            '<p class="pg-cta__note">Launch a complete rewards programme that drives measurable ' +
              'revenue growth. One API. Your brand. Twelve modules. Intelligence that compounds.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>';
  }

  /* -------------------------------------------------------------- footer */

  function col(label, items, withBlurb) {
    var html = '<div class="pg-footer__col">' +
      '<span class="pg-footer__label">' + esc(label) + '</span>' +
      '<div class="pg-footer__list">';
    items.forEach(function (it) {
      var ext = /^https?:/.test(it[1]) ? ' target="_blank" rel="noopener"' : '';
      html += '<a href="' + it[1] + '"' + current(it[0]) + ext + '>' +
        esc(withBlurb ? it[2] : it[2]) + '</a>';
    });
    return html + '</div></div>';
  }

  function footerHTML() {
    return '' +
    '<footer class="pg-footer">' +
      '<div class="pg-shell">' +
        '<div class="pg-footer__top">' +
          mark('foot', 36).replace('pg-logo__mark', 'pg-footer__mark') +
          '<h2 class="pg-h2 pg-footer__title">An AI workforce, inside your own app.<br>' +
            'Ready to see it live on your brand?</h2>' +
          '<div class="pg-footer__contact">' +
            '<a href="contact.html#demo">Book a demo</a>' +
            '<a class="pg-footer__mail" href="mailto:' + MAIL + '">' + MAIL + '</a>' +
          '</div>' +
        '</div>' +
        '<hr class="pg-rule" style="margin-top:36px">' +
        '<div class="pg-footer__cols">' +
          '<div class="pg-footer__nav">' +
            col('Platforms', PLATFORM) +
            col('Company', COMPANY) +
            col('Connect', CONNECT) +
          '</div>' +
          '<div class="pg-footer__legal">' +
            '<p>© 2026 Pagrin. All rights reserved.</p>' +
            '<p>Architected for SOC 2 · PCI-DSS · data residency</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="pg-footer__wordmark" aria-hidden="true">' +
        '<svg viewBox="0 0 1477 452" preserveAspectRatio="xMidYMin meet">' +
          '<text x="738" y="404" text-anchor="middle" fill="#F3F3F5" ' +
          'font-family="-apple-system, BlinkMacSystemFont, \'SF Pro Text\', ' +
          '\'Segoe UI\', Roboto, Helvetica, Arial, sans-serif" ' +
          'font-size="530" font-weight="500" letter-spacing="-16">Pagrin</text>' +
        '</svg>' +
      '</div>' +
    '</footer>';
  }

  /* ------------------------------------------------------------- wire up */

  function fill(attr, html) {
    var host = document.querySelector('[' + attr + ']');
    if (host) host.outerHTML = html;
  }

  fill('data-pg-nav', navHTML());
  fill('data-pg-cta', ctaHTML());
  fill('data-pg-footer', footerHTML());

  var nav = document.querySelector('[data-pg-navroot]');
  if (!nav) return;

  /* hairline appears once the page has scrolled under the bar */
  var onScroll = function () {
    nav.setAttribute('data-stuck', window.scrollY > 4 ? 'true' : 'false');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* dropdowns — click to open, hover on pointer devices, Escape to close */
  var menus = Array.prototype.slice.call(nav.querySelectorAll('[data-pg-menu]'));
  var fine  = window.matchMedia('(hover: hover) and (min-width: 1041px)');

  function close(m) {
    m.setAttribute('data-open', 'false');
    m.querySelector('.pg-menu__btn').setAttribute('aria-expanded', 'false');
  }
  function open(m) {
    menus.forEach(function (o) { if (o !== m) close(o); });
    m.setAttribute('data-open', 'true');
    m.querySelector('.pg-menu__btn').setAttribute('aria-expanded', 'true');
  }

  menus.forEach(function (m) {
    var btn = m.querySelector('.pg-menu__btn');
    btn.addEventListener('click', function () {
      m.getAttribute('data-open') === 'true' ? close(m) : open(m);
    });
    m.addEventListener('mouseenter', function () { if (fine.matches) open(m); });
    m.addEventListener('mouseleave', function () { if (fine.matches) close(m); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') menus.forEach(close);
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-pg-menu]')) menus.forEach(close);
  });

  /* mobile menu */
  var burger = nav.querySelector('.pg-burger');
  burger.addEventListener('click', function () {
    var isOpen = nav.getAttribute('data-open') === 'true';
    nav.setAttribute('data-open', isOpen ? 'false' : 'true');
    burger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    if (isOpen) menus.forEach(close);
  });
}());
