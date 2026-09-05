/* ==========================================================================
   Pagrin — the Media page

   Two small behaviours, both progressive:

     1. The rail of work scrolls sideways. It starts part way in, so the row
        is cut off at both edges rather than beginning tidily at the gutter,
        and it can be dragged with a mouse as well as scrolled or tabbed.

     2. The sticky column on the left marks whichever collection you are
        reading. Clicking a link scrolls to it; scrolling updates the mark.

   Neither is required to read the page. With JavaScript off the rail is
   still a normal scrolling row and both links are still ordinary anchors.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------- rail */

  var rail = document.querySelector('[data-pg-rail]');

  if (rail) {
    /* start cut off on the left, but never so far that the end is in view */
    var start = Math.min(rail.scrollWidth * 0.08, rail.scrollWidth - rail.clientWidth);
    if (start > 0) rail.scrollLeft = start;

    /* drag to scroll — pointer events cover mouse, pen and touch alike */
    var dragging = false, startX = 0, startLeft = 0, moved = 0;

    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'touch') return;      /* let touch scroll natively */
      dragging = true; moved = 0;
      startX = e.clientX;
      startLeft = rail.scrollLeft;
      rail.setPointerCapture(e.pointerId);
    });

    rail.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      rail.scrollLeft = startLeft - dx;
    });

    ['pointerup', 'pointercancel'].forEach(function (type) {
      rail.addEventListener(type, function (e) {
        if (!dragging) return;
        dragging = false;
        if (rail.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
      });
    });

    /* a drag that ended on a link should not also follow it */
    rail.addEventListener('click', function (e) {
      if (moved > 6) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    /* arrow keys once the rail has focus */
    rail.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault();
      rail.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * rail.clientWidth * 0.6,
                      behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------- collection nav */

  var side = document.querySelector('[data-pg-side]');
  if (!side) return;

  var links = [].slice.call(side.querySelectorAll('a[href^="#"]'));
  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);

  if (sections.length !== links.length) return;

  function mark(id) {
    links.forEach(function (a) {
      a.setAttribute('aria-current', a.getAttribute('href') === '#' + id ? 'true' : 'false');
    });
  }

  /* whichever collection has crossed the top of the reading area wins */
  function onScroll() {
    var line = window.innerHeight * 0.3;
    var current = sections[0].id;
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= line) current = s.id;
    });
    mark(current);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { onScroll(); ticking = false; });
  }, { passive: true });

  onScroll();
}());
