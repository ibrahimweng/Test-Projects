/* ==========================================================================
   Pagrin — reading aids for the long document pages

   Used by terms.html and trust-security.html. It does four things:

     1. Builds the table of contents from the headings in the document, so
        the list and the document can never drift apart.
     2. Marks the section you are reading as you scroll.
     3. Draws a thin progress bar across the top of the window.
     4. Shows a back to top button once you are past the first screen.

   Everything here is an enhancement. With the script switched off the page
   still reads correctly, and the headings still have working ids.
   ========================================================================== */

(function () {
  'use strict';

  var prose = document.querySelector('[data-pg-prose]');
  if (!prose) return;

  var heads = Array.prototype.slice.call(prose.querySelectorAll('h2[id]'));
  if (!heads.length) return;

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------- 1 · table of contents */

  var tocHost = document.querySelector('[data-pg-toc]');
  var links = [];

  if (tocHost) {
    var list = document.createElement('div');
    list.className = 'pg-toc__list';

    heads.forEach(function (h) {
      var a = document.createElement('a');
      a.className = 'pg-toc__link';
      a.href = '#' + h.id;

      /* a leading "12." in the heading becomes its own muted span so the
         numbers line up down the left edge of the list */
      var text = h.textContent.trim();
      var m = text.match(/^(\d+\.)\s*(.*)$/);
      if (m) {
        var num = document.createElement('span');
        num.className = 'pg-toc__num';
        num.textContent = m[1] + ' ';
        a.appendChild(num);
        a.appendChild(document.createTextNode(m[2]));
      } else {
        a.textContent = text;
      }

      list.appendChild(a);
      links.push(a);
    });

    tocHost.appendChild(list);
  }

  /* a link back to each heading, revealed on hover */
  heads.forEach(function (h) {
    var a = document.createElement('a');
    a.className = 'pg-anchor';
    a.href = '#' + h.id;
    a.textContent = '#';
    a.setAttribute('aria-label', 'Link to this section');
    h.appendChild(a);
  });

  /* ------------------------------------------------------- 2 · scroll spy */

  if (links.length) {
    var active = -1;

    var spy = function () {
      /* the section whose top has most recently passed under the nav bar */
      var line = window.scrollY + 140;
      var i = 0;
      for (var n = 0; n < heads.length; n++) {
        if (heads[n].getBoundingClientRect().top + window.scrollY <= line) i = n;
        else break;
      }
      /* once the page is scrolled to the very bottom, the last section wins
         even if it is too short to reach the line */
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        i = heads.length - 1;
      }
      if (i === active) return;
      if (active > -1) links[active].removeAttribute('aria-current');
      links[i].setAttribute('aria-current', 'true');
      active = i;
    };

    /* --------------------------------------------------- 3 · progress bar */

    var bar = document.querySelector('[data-pg-progress] i');

    var progress = function () {
      if (!bar) return;
      var box = prose.getBoundingClientRect();
      var start = box.top + window.scrollY - 120;
      var span = box.height - window.innerHeight + 240;
      var pct = span <= 0 ? 100 : ((window.scrollY - start) / span) * 100;
      bar.style.width = Math.max(0, Math.min(100, pct)) + '%';
    };

    /* --------------------------------------------------- 4 · back to top */

    var top = document.querySelector('[data-pg-top]');

    var toTop = function () {
      if (top) top.setAttribute('data-show', window.scrollY > 700 ? 'true' : 'false');
    };

    if (top) {
      top.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      });
    }

    /* one scroll handler, throttled to the frame rate */
    var queued = false;
    var onScroll = function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        spy();
        progress();
        toTop();
      });
    };

    spy();
    progress();
    toTop();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }
}());
