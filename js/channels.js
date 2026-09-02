/* ==========================================================================
   Pagrin — Customer channels section
   Design: Figma frame 11968:3355, component set 12360:9721

   Geometry is in the Figma stage's own units, a 1344 x 464 box. Each asset
   is placed by the CENTRE of its rendered bounding box, because two of them
   are rotated and Figma reports x/y for the un-rotated origin. Centres come
   from absoluteBoundingBox on the Default, whatsapp and gmail variants.
   `rot` is in Figma degrees, which run anticlockwise, so the code negates it
   for CSS.

   Copy lives in CHANNELS. Only WhatsApp and Gmail are specified in the
   Figma file; the other three are drafted and marked so.
   ========================================================================== */

(function () {
  'use strict';

  var STAGE_W = 1344;
  var STAGE_H = 464;
  var CARD_W  = 304;
  var CARD_Y  = -69;      // every card sits at the same height in the design

  /* ------------------------------------------------------------------ *
   * Icons                                                               *
   * ------------------------------------------------------------------ */

  var IC = {
    check: '<svg viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2.7 6.8l2.5 2.5 5.1-5.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrow: '<svg viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M3.4 7.5h8.2M8 3.9l3.6 3.6L8 11.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    x:     '<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4.6 4.6l8.8 8.8M13.4 4.6l-8.8 8.8" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>'
  };

  /* ------------------------------------------------------------------ *
   * Channels                                                            *
   * ------------------------------------------------------------------ */

  var CHANNELS = [
    {
      key: 'whatsapp',
      name: 'WhatsApp',
      accent: '#2b50e8',
      shadow: 'rgba(18,36,128,.5)',
      api: 'API · WhatsApp Business',
      // from the Figma file
      body: 'Rewards run natively inside WhatsApp via the Business API. Points, offers and instant cashback appear right in the chat thread.',
      points: ['98% message open rate', 'Redeem in two taps, in-thread', 'No new app, login or install'],
      href: '#',
      art: 'whatsapp',
      img:    { w: 338.9, h: 406.3, dx: 0, dy: 0,    rot: 0 },
      rest:   { cx: 169.5, cy: 297.7, w: 338.9, h: 406.3, rot: 0,     z: 3 },
      active: { cx: 620.1, cy: 124.0, rot: 0 },
      cardX: 812
    },
    {
      key: 'gmail',
      name: 'Gmail',
      accent: '#d93025',
      shadow: 'rgba(128,20,15,.5)',
      api: 'API · Gmail',
      // from the Figma file
      body: 'Rewards are delivered natively inside Gmail via email campaigns - points, offers, and instant cashback appear right in the inbox.',
      points: ['99% email deliverability', 'One-click redeem from inbox', 'No new app, login or install'],
      href: '#',
      art: 'photo',
      label: 'Envelope',
      img:    { w: 840.9, h: 722.3, dx: 0, dy: 0,    rot: -7.4 },
      rest:   { cx: 289.1, cy: 310.8, w: 766.1, h: 628.5, rot: 0,     z: 2 },
      active: { cx: 581.9, cy: 171.5, rot: -8 },
      cardX: 933
    },
    {
      key: 'imessage',
      name: 'iMessage',
      accent: '#1da851',
      shadow: 'rgba(8,74,38,.5)',
      api: 'API · Apple Messages for Business',
      // drafted — not specified in the Figma file
      body: 'Rewards arrive as rich Apple Messages, so balances, offers and receipts sit in the thread your customer already uses.',
      points: ['Rich cards, tap to redeem', 'Verified business sender', 'Apple Pay checkout inline'],
      href: '#',
      art: 'imessage',
      img:    { w: 507.4, h: 574.8, dx: 0, dy: 33.7, rot: 0 },
      rest:   { cx: 748.8, cy: 279.9, w: 338.9, h: 406.3, rot: 0,     z: 1 },
      active: { cx: 620.1, cy: 124.0, rot: 0 },
      cardX: 812
    },
    {
      key: 'teams',
      name: 'Microsoft Teams',
      accent: '#4b53bc',
      shadow: 'rgba(28,32,96,.5)',
      api: 'API · Microsoft Graph',
      // drafted — not specified in the Figma file
      body: 'A Pagrin app inside Teams lets agents read a customer balance and issue rewards without leaving the conversation.',
      points: ['Agent-side reward issuing', 'Balances in the chat', 'Single sign-on with your tenant'],
      href: '#',
      art: 'photo',
      label: 'Teams badge',
      img:    { w: 386.6, h: 408.2, dx: 0, dy: 0,    rot: 0 },
      rest:   { cx: 981.9, cy: 200.6, w: 386.6, h: 408.2, rot: 0,     z: 5 },
      active: { cx: 620.0, cy: 150.0, rot: 0 },
      cardX: 880
    },
    {
      key: 'slack',
      name: 'Slack',
      accent: '#611f69',
      shadow: 'rgba(48,12,54,.5)',
      api: 'API · Slack Apps',
      // drafted — not specified in the Figma file
      body: 'Reward workflows run as a Slack app, so approvals, balances and issuing all happen in the channel your team lives in.',
      points: ['Approvals in-channel', 'Slash command issuing', 'Audit trail on every action'],
      href: '#',
      art: 'slack',
      img:    { w: 383.8, h: 386.2, dx: 0, dy: 0,    rot: 0 },
      rest:   { cx: 1143.6, cy: 358.6, w: 383.8, h: 386.2, rot: 100.7, z: 4 },
      active: { cx: 620.0, cy: 190.0, rot: 0 },
      cardX: 880
    }
  ];

  /* ------------------------------------------------------------------ *
   * Artwork                                                             *
   *                                                                     *
   * The two chat mockups are real text layers in Figma, so they are     *
   * rebuilt here as markup rather than flattened to images. They stay   *
   * sharp at any size and the copy stays editable.                      *
   * ------------------------------------------------------------------ */

  function whatsappArt() {
    return '' +
      '<div class="wa">' +
        '<div class="wa__head">' +
          '<span class="wa__back">&#8592;</span>' +
          '<span class="wa__avatar"></span>' +
          '<span class="wa__who"><b>Customer Rep</b><i>online</i></span>' +
          '<span class="wa__icons">&#9742; &#9723;</span>' +
        '</div>' +
        '<div class="wa__body">' +
          '<div class="wa__day">Today</div>' +
          '<div class="wa__b wa__b--out">Hey! Just tried your rewards app 🎉</div>' +
          '<div class="wa__b wa__b--in">So glad you’re loving it! What’s your favourite part?</div>' +
          '<div class="wa__b wa__b--in">The instant cashback is incredible — got $50 back on my flight! 🔥</div>' +
        '</div>' +
        '<div class="wa__input"><span>Type a message</span><i class="wa__mic"></i></div>' +
      '</div>';
  }

  function imessageArt() {
    return '' +
      '<div class="im">' +
        '<div class="im__head">' +
          '<span class="im__back">&#8249;</span>' +
          '<span class="im__avatar"></span>' +
          '<span class="im__who">Customer Rep</span>' +
        '</div>' +
        '<div class="im__body">' +
          '<div class="im__day">Today</div>' +
          '<div class="im__b im__b--in">So glad you’re loving it! What’s your favourite part?</div>' +
          '<div class="im__b im__b--out">Hey! Just tried your rewards app 🎉</div>' +
          '<div class="im__b im__b--out">The instant cashback is incredible - got $50 back on my flight! 🔥</div>' +
        '</div>' +
        '<div class="im__input"><span>Message</span><i class="im__send"></i></div>' +
      '</div>';
  }

  // Slack's mark is a logo, so it belongs as a vector rather than a photo.
  function slackArt() {
    return '' +
      '<div class="sl"><svg viewBox="0 0 122 122" aria-hidden="true">' +
        '<path d="M26 77a12 12 0 1 1-12-12h12v12Z" fill="#e01e5a"/>' +
        '<path d="M32 77a12 12 0 0 1 24 0v30a12 12 0 0 1-24 0V77Z" fill="#e01e5a"/>' +
        '<path d="M44 26a12 12 0 1 1 12-12v12H44Z" fill="#36c5f0"/>' +
        '<path d="M44 32a12 12 0 0 1 0 24H14a12 12 0 0 1 0-24h30Z" fill="#36c5f0"/>' +
        '<path d="M95 44a12 12 0 1 1 12 12H95V44Z" fill="#2eb67d"/>' +
        '<path d="M89 44a12 12 0 0 1-24 0V14a12 12 0 0 1 24 0v30Z" fill="#2eb67d"/>' +
        '<path d="M77 95a12 12 0 1 1-12 12V95h12Z" fill="#ecb22e"/>' +
        '<path d="M77 89a12 12 0 0 1 0-24h30a12 12 0 0 1 0 24H77Z" fill="#ecb22e"/>' +
      '</svg></div>';
  }

  function outlineArt(label) {
    return '<span class="ch-photo__fallback">' + label + '</span>';
  }

  /* Artwork resolution.
     Each asset first tries its exported PNG at assets/channels/<key>.png.
     `img` describes that export relative to the asset's node box, because a
     Figma export is not always the same as the node:
       - iMessage carries its drop shadow, so the file is 507x575 around a
         339x406 card, sitting 33.7 units lower than the box centre.
       - the envelope was exported with a -7.4 degree rotation baked in, which
         the section does not want, so it is cancelled here.
     Everything else maps one to one.
     If that file is not there the image is dropped and the fallback below it
     shows instead: the built chat mockup for WhatsApp and iMessage, the Slack
     vector, or a plain outline that holds the correct aspect ratio.
     Dropping the five exports into assets/channels/ therefore needs no code
     change at all. */
  function artFor(ch) {
    var fallback =
      ch.art === 'whatsapp' ? whatsappArt() :
      ch.art === 'imessage' ? imessageArt() :
      ch.art === 'slack'    ? slackArt()    :
      outlineArt(ch.label || ch.name);

    var m = ch.img || { w: ch.rest.w, h: ch.rest.h, dx: 0, dy: 0, rot: 0 };
    var style =
      'width:'  + (m.w / ch.rest.w * 100) + '%;' +
      'left:'   + (50 + m.dx / ch.rest.w * 100) + '%;' +
      'top:'    + (50 + m.dy / ch.rest.h * 100) + '%;' +
      '--img-rot:' + (m.rot || 0) + 'deg';

    return '<span class="ch-art" style="--ph-w:' + ch.rest.w + ';--ph-h:' + ch.rest.h + '">' +
             '<img class="ch-art__img" style="' + style + '" ' +
                  'src="assets/channels/' + ch.key + '.png" alt="" loading="lazy">' +
             '<span class="ch-art__fallback">' + fallback + '</span>' +
           '</span>';
  }

  /* ------------------------------------------------------------------ */

  function pct(v, total) { return (v / total * 100) + '%'; }

  function cardMarkup(ch, index, total) {
    return '' +
      '<div class="ch-card__body">' +
        '<div class="ch-card__row">' +
          '<span class="ch-card__dot"></span>' +
          '<span class="ch-card__label">LIVE CHANNEL</span>' +
          '<span class="sp"></span>' +
          '<span class="ch-card__count">' + pad(index + 1) + ' / ' + pad(total) + '</span>' +
        '</div>' +
        '<h3 class="ch-card__title"></h3>' +
        '<p class="ch-card__body-text"></p>' +
        '<div class="ch-card__rule"></div>' +
        '<div class="ch-card__kicker">WHY IT WORKS</div>' +
        '<ul class="ch-card__points"></ul>' +
        '<div class="ch-card__rule"></div>' +
        '<div class="ch-card__row">' +
          '<span class="ch-card__api"></span>' +
          '<span class="sp"></span>' +
          '<span class="ch-card__dot ch-card__dot--sm"></span>' +
          '<span class="ch-card__live">LIVE</span>' +
        '</div>' +
      '</div>' +
      '<div class="ch-card__actions">' +
        '<a class="ch-more" href="#"><span>Read more</span>' + IC.arrow + '</a>' +
        '<button class="ch-close" type="button" aria-label="Close">' + IC.x + '</button>' +
      '</div>';
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ------------------------------------------------------------------ */

  function init(root) {
    var gsap    = window.gsap;
    var hasGsap = !!gsap;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var stage  = root.querySelector('.ch-stage');
    var raised = root.querySelector('.ch__raised');
    var card   = root.querySelector('.ch-card');
    var rail   = root.querySelector('.ch__rail');
    if (!stage || !raised || !card) return;

    var active = null;          // key of the raised channel, or null
    var scale  = 1;             // px per stage unit
    var assets = {};

    /* -- build the collage ------------------------------------------ */

    CHANNELS.forEach(function (ch) {
      var el = document.createElement('button');
      el.type = 'button';
      el.className = 'ch-asset';
      el.dataset.ch = ch.key;
      el.setAttribute('aria-label', 'Show ' + ch.name + ' detail');
      el.style.left    = pct(ch.rest.cx - ch.rest.w / 2, STAGE_W);
      el.style.top     = pct(ch.rest.cy - ch.rest.h / 2, STAGE_H);
      el.style.width   = pct(ch.rest.w, STAGE_W);
      el.style.zIndex  = String(ch.z || ch.rest.z || 1);
      el.innerHTML = '<span class="ch-asset__inner">' + artFor(ch) + '</span>';
      dropMissingImages(el);
      stage.appendChild(el);
      assets[ch.key] = el;

      el.addEventListener('click', function () {
        if (active === ch.key) close(); else open(ch.key);
      });
    });

    card.innerHTML = cardMarkup(CHANNELS[0], 0, CHANNELS.length);
    card.hidden = true;

    /* -- the mobile rail -------------------------------------------- */

    if (rail) {
      CHANNELS.forEach(function (ch, i) {
        var item = document.createElement('article');
        item.className = 'ch-railcard';
        item.style.setProperty('--accent', ch.accent);
        item.innerHTML =
          '<div class="ch-railcard__art">' + artFor(ch) + '</div>' +
          '<div class="ch-railcard__inner">' +
            '<div class="ch-railcard__head">' +
              '<h3></h3><span class="sp"></span>' +
              '<span class="ch-card__dot ch-card__dot--sm"></span>' +
              '<span class="ch-card__live" style="font-size:10px">LIVE</span>' +
            '</div>' +
            '<p class="ch-railcard__body"></p>' +
            '<ul class="ch-card__points"></ul>' +
          '</div>';
        dropMissingImages(item);
        item.querySelector('h3').textContent = ch.name;
        item.querySelector('.ch-railcard__body').textContent = ch.body;
        fillPoints(item.querySelector('.ch-card__points'), ch.points);
        rail.appendChild(item);
      });
    }

    // A photo that has not been added yet leaves its slot showing the outline
    // placeholder rather than a broken-image icon.
    function dropMissingImages(scope) {
      Array.prototype.slice.call(scope.querySelectorAll('.ch-art__img')).forEach(function (img) {
        img.addEventListener('error', function () { img.remove(); });
      });
    }

    function fillPoints(ul, points) {
      ul.innerHTML = '';
      points.forEach(function (p) {
        var li = document.createElement('li');
        li.innerHTML = IC.check;
        var s = document.createElement('span');
        s.textContent = p;
        li.appendChild(s);
        ul.appendChild(li);
      });
    }

    /* -- geometry ---------------------------------------------------- */

    function measure() {
      var w = stage.getBoundingClientRect().width;
      scale = w > 0 ? w / STAGE_W : 1;
    }

    // Figma degrees run anticlockwise; CSS runs clockwise, hence the minus.
    function restTransform(ch) {
      return { x: 0, y: 0, rotation: -(ch.rest.rot || 0) };
    }

    function activeTransform(ch) {
      return {
        x: (ch.active.cx - ch.rest.cx) * scale,
        y: (ch.active.cy - ch.rest.cy) * scale,
        rotation: -(ch.active.rot || 0)
      };
    }

    function place(el, t, animate) {
      if (hasGsap) {
        var vars = { x: t.x, y: t.y, rotation: t.rotation, overwrite: 'auto' };
        if (animate && !reduced) {
          vars.duration = 0.85;
          vars.ease = 'power3.inOut';
          gsap.to(el, vars);
        } else {
          gsap.set(el, vars);
        }
      } else {
        el.style.transition = animate ? 'transform .85s cubic-bezier(.65,0,.35,1)' : 'none';
        el.style.transform = 'translate(' + t.x + 'px,' + t.y + 'px) rotate(' + t.rotation + 'deg)';
      }
    }

    function layout() {
      measure();
      CHANNELS.forEach(function (ch) {
        var el = assets[ch.key];
        place(el, ch.key === active ? activeTransform(ch) : restTransform(ch), false);
      });
      if (active) positionCard(byKey(active));
    }

    function byKey(k) {
      for (var i = 0; i < CHANNELS.length; i++) if (CHANNELS[i].key === k) return CHANNELS[i];
      return null;
    }

    function positionCard(ch) {
      var w = stage.getBoundingClientRect().width;
      // keep the card inside the stage on narrower desktops
      var left = Math.min(ch.cardX * scale, Math.max(0, w - CARD_W));
      card.style.left = left + 'px';
      card.style.top  = (CARD_Y * scale) + 'px';
    }

    /* -- open / close ------------------------------------------------ */

    /* Send an asset back to its resting place, restore its resting depth, and
       drop it under the clip once it has landed. The guard means a re-select
       during the return leaves it where it is. */
    function settle(ch) {
      var el = assets[ch.key];
      place(el, restTransform(ch), true);
      el.style.zIndex = String(ch.rest.z || 1);

      var back = function () {
        if (active !== ch.key && el.parentNode !== stage) stage.appendChild(el);
      };
      if (hasGsap && !reduced) gsap.delayedCall(0.85, back); else back();
    }

    function open(key) {
      var ch = byKey(key);
      if (!ch || active === key) return;

      // Release whatever is currently raised first. Without this, switching
      // straight from one asset to another leaves the old one in the raised
      // layer, where its depth would cover the new selection.
      var prev = active ? byKey(active) : null;
      active = key;
      if (prev) settle(prev);

      var el = assets[key];
      if (el.parentNode !== raised) raised.appendChild(el);
      el.style.zIndex = '40';        // outranks every other asset while raised

      CHANNELS.forEach(function (c) {
        assets[c.key].setAttribute('data-dim', String(c.key !== key));
        assets[c.key].setAttribute('aria-expanded', String(c.key === key));
      });

      place(el, activeTransform(ch), true);
      showCard(ch);
    }

    function close() {
      if (!active) return;
      var ch = byKey(active);
      active = null;

      CHANNELS.forEach(function (c) {
        assets[c.key].setAttribute('data-dim', 'false');
        assets[c.key].setAttribute('aria-expanded', 'false');
      });

      hideCard();
      settle(ch);
    }

    function showCard(ch) {
      var i = CHANNELS.indexOf(ch);
      card.innerHTML = cardMarkup(ch, i, CHANNELS.length);
      card.style.setProperty('--accent', ch.accent);
      card.style.setProperty('--accent-shadow', ch.shadow);
      card.querySelector('.ch-card__title').textContent = ch.name;
      card.querySelector('.ch-card__body-text').textContent = ch.body;
      card.querySelector('.ch-card__api').textContent = ch.api;
      card.querySelector('.ch-more').href = ch.href;
      fillPoints(card.querySelector('.ch-card__points'), ch.points);
      card.querySelector('.ch-close').addEventListener('click', close);

      card.hidden = false;
      positionCard(ch);
      if (hasGsap && !reduced) {
        gsap.fromTo(card, { opacity: 0, y: 14, scale: 0.98 },
                          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' });
      }
    }

    function hideCard() {
      if (hasGsap && !reduced) {
        gsap.to(card, { opacity: 0, y: 10, duration: 0.22, ease: 'power2.in',
          onComplete: function () { card.hidden = true; } });
      } else {
        card.hidden = true;
      }
    }

    /* -- entrance ---------------------------------------------------- */

    var revealed = false;
    function reveal() {
      if (revealed) return;
      revealed = true;
      if (!hasGsap || reduced) return;
      // deliberately small: the collage lifts a little and settles
      gsap.from(CHANNELS.map(function (c) { return assets[c.key]; }), {
        y: 28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out'
      });
    }

    /* -- wiring ------------------------------------------------------ */

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && active) close();
    });

    var t;
    function onResize() { clearTimeout(t); t = setTimeout(layout, 80); }
    if (window.ResizeObserver) new ResizeObserver(onResize).observe(stage);
    else window.addEventListener('resize', onResize);

    measure();
    layout();

    if ('IntersectionObserver' in window && hasGsap && !reduced) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { reveal(); io.disconnect(); } });
      }, { threshold: 0.15 });
      io.observe(stage);
    } else {
      reveal();
    }
  }

  function boot() {
    Array.prototype.slice.call(document.querySelectorAll('.channels')).forEach(init);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
