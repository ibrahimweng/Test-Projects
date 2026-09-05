/* ==========================================================================
   Pagrin — category filtering for the media pages

   Used by blog.html and case-studies.html. The markup carries everything:

     <button class="pg-filter" data-filter="all" aria-pressed="true">All</button>
     <a class="pg-mcard" data-category="Engineering"> … </a>

   With the script switched off every card is visible and the buttons simply
   do nothing, which is the right fallback for an index page.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.querySelector('[data-pg-filters]');
  if (!root) return;

  var buttons = Array.prototype.slice.call(root.querySelectorAll('.pg-filter'));
  var grid    = document.querySelector('[data-pg-grid]');
  var count   = root.querySelector('[data-pg-count]');
  if (!buttons.length || !grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-category]'));

  var empty = document.createElement('p');
  empty.className = 'pg-empty';
  empty.hidden = true;
  empty.textContent = 'Nothing filed under that yet.';
  grid.appendChild(empty);

  var noun   = grid.getAttribute('data-noun') || 'post';
  var plural = grid.getAttribute('data-noun-plural') || noun + 's';

  function apply(filter) {
    var shown = 0;
    cards.forEach(function (c) {
      var match = filter === 'all' || c.getAttribute('data-category') === filter;
      c.hidden = !match;
      if (match) shown++;
    });
    empty.hidden = shown > 0;
    if (count) {
      count.textContent = shown + ' ' + (shown === 1 ? noun : plural);
    }
    buttons.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-filter') === filter ? 'true' : 'false');
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      apply(b.getAttribute('data-filter'));
    });
  });

  apply('all');
}());
