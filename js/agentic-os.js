/* ==========================================================================
   Pagrin — Agentic OS section
   Source of truth for the stack geometry is the Figma frame 11651:2397.
   The five slabs are exported vectors; everything below only moves them.

   Copy lives in CONFIG.layers — swap the strings, nothing else needs to change.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * Content                                                             *
   * ------------------------------------------------------------------ */

  var CONFIG = {
    layers: [
      {
        key: 'ai',
        // Copy below is straight from the Figma design.
        cards: [
          {
            title: 'Agentic Harness',
            body: 'Orchestrates autonomous agents to automate complex reward workflows end-to-end.'
          },
          {
            title: 'LLM & TFM',
            body: 'Foundation models fine-tuned for loyalty, fraud detection, and personalised recommendations.'
          }
        ]
      },
      {
        key: 'data',
        // Drafted — the Figma only specifies the first tab. Replace freely.
        cards: [
          {
            title: 'Transaction Enrichment',
            body: 'Cleans, categorises and enriches raw card and account data into merchant-level intelligence.'
          },
          {
            title: 'Knowledge Graph',
            body: 'Connects customers, merchants and offers so every reward decision carries full context.'
          }
        ]
      },
      {
        key: 'core',
        cards: [
          {
            title: 'Rewards Engine',
            body: 'Defines, prices and fulfils points, cashback and offers across every product line.'
          },
          {
            title: 'Loyalty Ledger',
            body: 'Tracks balances, accruals and redemptions with a complete, auditable history.'
          }
        ]
      },
      {
        key: 'platform',
        cards: [
          {
            title: 'Integration Fabric',
            body: 'Connects core banking, card processors and partner networks through one API surface.'
          },
          {
            title: 'Controls & Observability',
            body: 'Real-time monitoring, approvals and reporting that keep every layer audit-ready.'
          }
        ]
      }
    ]
  };

  /* ------------------------------------------------------------------ *
   * Geometry — all values in Figma viewBox units                        *
   *                                                                     *
   * REST holds each slab's y when no gap is open. Selecting layer k adds *
   * OPEN to everything below it, which is exactly how the Figma frame is *
   * built: with layer 1 selected the numbers resolve to 0 / 113.881 /    *
   * 176.836 / 240.732 / 355.378, matching the design to the decimal.     *
   * Index 4 is the base slab; it is always below the selection, so it    *
   * always carries OPEN and therefore never moves.                       *
   * ------------------------------------------------------------------ */

  var UNIT_H = 855.374;
  var REST   = [0, 63.4255, 126.3805, 190.2765, 304.9225];
  var OPEN   = 50.4555;

  /* Ambient drift, also in viewBox units. Deliberately small — the slabs
     should breathe, not bounce. */
  var FLOAT = [
    { amp: 5.4, dur: 4.6, delay: 0.00 },
    { amp: 4.2, dur: 5.4, delay: 0.35 },
    { amp: 4.8, dur: 6.1, delay: 0.80 },
    { amp: 3.9, dur: 5.0, delay: 0.25 },
    { amp: 1.8, dur: 7.2, delay: 0.60 }
  ];

  var EASE_MOVE = 'power3.inOut';

  /* Pointer tilt, gentler here than in the channels section because the
     slabs are drawn in isometric projection and lean less convincingly. */
  var TILT_POS = 3.2;
  var TILT_VEL = 2.2;
  var TILT_MAX = 5;

  /* ------------------------------------------------------------------ */

  function init(root) {
    var gsap    = window.gsap;
    var hasGsap = !!gsap;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var stage   = root.querySelector('.ao-stage');
    var layers  = Array.prototype.slice.call(root.querySelectorAll('.ao-layer'));
    var floats  = layers.map(function (l) { return l.querySelector('.ao-layer__float'); });
    var tabs    = Array.prototype.slice.call(root.querySelectorAll('.ao-tab'));
    var tabsEl  = root.querySelector('.ao__tabs');
    var cardsEl = root.querySelector('.ao__cards');
    var panel   = root.querySelector('.ao__panel');

    if (!stage || layers.length !== 5 || !tabs.length || !cardsEl) return;

    root.setAttribute('data-gsap', String(hasGsap));

    var active   = 0;
    var scale    = 1;
    var floatTws = [];
    var revealed = false;

    /* autoplay pause state — any one of these holds the dwell timer */
    var hovers   = 0;
    var onScreen = true;
    var hasFocus = false;

    /* -- helpers ---------------------------------------------------- */

    function unitsToPx(u) { return u * scale; }

    function offsetFor(i, sel) {
      return REST[i] + (i > sel ? OPEN : 0);
    }

    function measure() {
      var h = stage.getBoundingClientRect().height;
      scale = h > 0 ? h / UNIT_H : 1;
    }

    /* Position every slab for the given selection. */
    function place(sel, animate) {
      layers.forEach(function (el, i) {
        var y = unitsToPx(offsetFor(i, sel));
        var o = i < sel ? 0.4 : 1;
        if (hasGsap && revealed) {
          gsap.to(el, { opacity: o, duration: reduced ? 0.001 : 0.5, ease: 'power2.out', overwrite: 'auto' });
        }
        if (hasGsap) {
          if (animate) {
            gsap.to(el, {
              y: y,
              duration: reduced ? 0.001 : 0.85,
              ease: EASE_MOVE,
              overwrite: 'auto',
              // slabs nearest the selection lead, the rest follow
              delay: reduced ? 0 : Math.abs(i - sel) * 0.045
            });
          } else {
            gsap.set(el, { y: y });
          }
        } else {
          el.style.transform = 'translate3d(0,' + y + 'px,0)';
        }
      });
    }

    /* Ambient drift. Rebuilt on resize so amplitudes track the stage size. */
    function startFloat() {
      stopFloat();
      if (!hasGsap || reduced) return;
      floats.forEach(function (el, i) {
        var f = FLOAT[i];
        var amp = unitsToPx(f.amp) * (i === active ? 1.35 : 1);
        gsap.set(el, { y: 0 });
        floatTws.push(
          gsap.to(el, {
            y: -amp,
            duration: f.dur,
            delay: f.delay,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
          })
        );
      });
    }

    function stopFloat() {
      floatTws.forEach(function (t) { t.kill(); });
      floatTws = [];
      if (hasGsap) floats.forEach(function (el) { gsap.set(el, { y: 0 }); });
    }

    /* -- pointer tilt -------------------------------------------------- *
     * Position sets where the slab leans, movement adds a little on top.
     * ------------------------------------------------------------------ */

    var hovered = null;
    var tilt = { px: 0, py: 0, vx: 0, vy: 0, cx: 0, cy: 0, last: null };
    function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

    function onTilt() {
      if (hovered === null) return;
      tilt.vx *= 0.86;
      tilt.vy *= 0.86;
      var tx = clamp(tilt.px * TILT_POS + clamp(tilt.vx, -TILT_VEL, TILT_VEL), -TILT_MAX, TILT_MAX);
      var ty = clamp(tilt.py * TILT_POS + clamp(tilt.vy, -TILT_VEL, TILT_VEL), -TILT_MAX, TILT_MAX);
      tilt.cx += (tx - tilt.cx) * 0.18;
      tilt.cy += (ty - tilt.cy) * 0.18;
      gsap.set(floats[hovered], {
        transformPerspective: 1100,
        rotationY: tilt.cx,
        rotationX: -tilt.cy
      });
    }

    /* -- dwell timer -------------------------------------------------- *
     * The fill is a CSS animation, so its length lives in --ao-dwell and    *
     * nothing here needs to know it. Restarting means clearing the          *
     * animation, forcing one reflow, then handing it back to the sheet.     *
     * ------------------------------------------------------------------ */

    function restartProgress() {
      var bars = tabs.map(function (t) { return t.querySelector('.ao-tab__progress'); });
      bars.forEach(function (b) { if (b) b.style.animation = 'none'; });
      void root.offsetWidth;
      bars.forEach(function (b) { if (b) b.style.animation = ''; });
    }

    function syncPaused() {
      var paused = hovers > 0 || hasFocus || !onScreen || document.hidden;
      root.setAttribute('data-paused', String(paused));
    }

    /* -- cards ------------------------------------------------------- */

    function paintCards(idx) {
      var cards = CONFIG.layers[idx].cards;
      cardsEl.innerHTML = '';
      cards.forEach(function (c) {
        var article = document.createElement('article');
        article.className = 'ao-card';

        var h = document.createElement('h3');
        h.className = 'ao-card__title';
        h.textContent = c.title;

        var p = document.createElement('p');
        p.className = 'ao-card__body';
        p.textContent = c.body;

        article.appendChild(h);
        article.appendChild(p);
        cardsEl.appendChild(article);
      });
      return Array.prototype.slice.call(cardsEl.children);
    }

    function swapCards(idx, animate) {
      if (!hasGsap || !animate || reduced) { paintCards(idx); return; }
      var outgoing = Array.prototype.slice.call(cardsEl.children);
      gsap.to(outgoing, {
        opacity: 0,
        y: -12,
        duration: 0.22,
        stagger: 0.05,
        ease: 'power2.in',
        onComplete: function () {
          var incoming = paintCards(idx);
          gsap.fromTo(
            incoming,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
          );
        }
      });
    }

    /* -- selection --------------------------------------------------- */

    function select(idx, animate) {
      if (idx === active && animate) return;
      active = idx;

      tabs.forEach(function (t, i) {
        var on = i === idx;
        t.setAttribute('aria-selected', String(on));
        t.setAttribute('tabindex', on ? '0' : '-1');
      });

      layers.forEach(function (el, i) {
        el.setAttribute('data-active', String(i === idx));
        el.setAttribute('data-above', String(i < idx));
      });

      if (panel && tabs[idx].id) panel.setAttribute('aria-labelledby', tabs[idx].id);

      place(idx, animate);
      restartProgress();
      swapCards(idx, animate);
      if (animate) startFloat();   // refresh the active slab's amplitude
    }

    /* -- reveal ------------------------------------------------------ */

    function reveal() {
      if (revealed) return;
      revealed = true;

      if (!hasGsap || reduced) {
        // never hidden in this path — hand opacity back to the stylesheet
        layers.forEach(function (el) { el.style.opacity = ''; });
        startFloat();
        return;
      }

      // A tab can be clicked before the stack scrolls into view, which would
      // leave a position tween in flight. Re-assert the current layout first so
      // the reveal always resolves to the right place.
      place(active, false);

      gsap.to(
        layers.slice().reverse(),   // base first, hero last
        {
          opacity: function (i, target) { return layers.indexOf(target) < active ? 0.4 : 1; },
          duration: 0.55,
          stagger: 0.09,
          ease: 'power2.out'
        }
      );
      gsap.from(
        layers.slice().reverse(),
        {
          // deliberately small, and matched to the channels section below
          y: '+=' + unitsToPx(24),
          duration: 0.95,
          stagger: 0.09,
          ease: 'power3.out',
          onComplete: startFloat
        }
      );
      gsap.from(cardsEl.children, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.25,
        ease: 'power3.out'
      });
    }

    /* -- wiring ------------------------------------------------------ */

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, true); });

      tab.addEventListener('mouseenter', function () {
        if (i !== active) layers[i].setAttribute('data-preview', 'true');
      });
      tab.addEventListener('mouseleave', function () {
        layers[i].removeAttribute('data-preview');
      });

      // roving focus across the tablist
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        if (next === null) return;
        e.preventDefault();
        select(next, true);
        tabs[next].focus();
      });
    });

    // the slabs themselves are a legitimate way in
    layers.forEach(function (el, i) {
      if (i > 3) return;                       // the base is not selectable
      el.addEventListener('click', function () { select(i, true); tabs[i].focus(); });
      el.addEventListener('mouseenter', function () {
        if (i !== active) el.setAttribute('data-preview', 'true');
      });
      el.addEventListener('mouseleave', function () { el.removeAttribute('data-preview'); });

      if (!hasGsap || reduced) return;
      el.addEventListener('pointerenter', function () {
        hovered = i;
        tilt.px = tilt.py = tilt.vx = tilt.vy = 0;
        tilt.last = null;
      });
      el.addEventListener('pointermove', function (e) {
        if (hovered !== i) return;
        var r = el.getBoundingClientRect();
        tilt.px = ((e.clientX - r.left) / r.width - 0.5) * 2;
        tilt.py = ((e.clientY - r.top) / r.height - 0.5) * 2;
        if (tilt.last) {
          tilt.vx += (e.clientX - tilt.last.x) * 0.30;
          tilt.vy += (e.clientY - tilt.last.y) * 0.30;
        }
        tilt.last = { x: e.clientX, y: e.clientY };
      });
      el.addEventListener('pointerleave', function () {
        if (hovered !== i) return;
        hovered = null;
        tilt.cx = tilt.cy = 0;
        gsap.to(floats[i], { rotationX: 0, rotationY: 0, duration: 0.55, ease: 'power3.out' });
      });
    });

    /* -- autoplay ----------------------------------------------------- */

    // when the selected tab's rule finishes filling, the next layer takes over
    tabs.forEach(function (tab, i) {
      var bar = tab.querySelector('.ao-tab__progress');
      if (!bar) return;
      bar.addEventListener('animationend', function (e) {
        if (reduced || e.animationName !== 'ao-tab-fill' || i !== active) return;
        select((i + 1) % tabs.length, true);
      });
    });

    /* Resting on the tabs holds the timer, because that is where someone
       reading the labels puts the cursor. The illustration deliberately does
       not pause: hovering a slab tilts it, so pausing there would freeze the
       rule for as long as anyone played with the tilt, and it would look as
       though the timer had stopped working. */
    [tabsEl].forEach(function (el) {
      if (!el) return;
      el.addEventListener('mouseenter', function () { hovers++; syncPaused(); });
      el.addEventListener('mouseleave', function () { hovers = Math.max(0, hovers - 1); syncPaused(); });
    });

    /* Keyboard focus holds the timer too, which is what WCAG 2.2.2 asks for.
       It has to be keyboard focus specifically: clicking a tab also focuses it,
       and pausing on that would stop the cycle the moment anyone picked a tab
       with the mouse. */
    function keyboardFocusInside() {
      var el = document.activeElement;
      if (!el || !root.contains(el)) return false;
      try { return el.matches(':focus-visible'); } catch (err) { return true; }
    }

    function readFocus() { hasFocus = keyboardFocusInside(); syncPaused(); }

    root.addEventListener('focusin', readFocus);
    root.addEventListener('focusout', function () { setTimeout(readFocus, 0); });

    document.addEventListener('visibilitychange', syncPaused);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { onScreen = en.isIntersecting; });
        syncPaused();
      }, { threshold: 0.1 }).observe(panel || stage);
    }

    /* -- resize ------------------------------------------------------ */

    var resizeTimer;
    function onResize() {
      measure();
      place(active, false);
      if (revealed) startFloat();
    }

    if (window.ResizeObserver) {
      new ResizeObserver(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(onResize, 60);
      }).observe(stage);
    } else {
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(onResize, 120);
      });
    }

    /* -- boot -------------------------------------------------------- */

    if (hasGsap && !reduced) gsap.ticker.add(onTilt);

    measure();
    syncPaused();

    if (hasGsap && !reduced) gsap.set(layers, { opacity: 0 });
    select(0, false);

    if ('IntersectionObserver' in window && hasGsap && !reduced) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { reveal(); io.disconnect(); }
        });
      }, { threshold: 0.18 });
      io.observe(stage);
    } else {
      reveal();
    }
  }

  function boot() {
    Array.prototype.slice
      .call(document.querySelectorAll('.agentic-os'))
      .forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
