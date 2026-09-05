/* ==========================================================================
   Pagrin — icon sprite

   One inline SVG sprite injected at the top of <body>, so any page can draw
   an icon with:

     <svg class="pg-icon" aria-hidden="true"><use href="#i-shield"></use></svg>

   Icons are 24px on a 24 box, 1.6 stroke, round caps and joins, drawn with
   currentColor so they take the colour of whatever they sit in. Sizing and
   the tinted tile live in css/icons.css.
   ========================================================================== */

(function () {
  'use strict';

  var P = {
    /* platform */
    shield:   '<path d="M12 3l7 2.8v5.7c0 4.2-3 7.8-7 8.7-4-.9-7-4.5-7-8.7V5.8L12 3z"/>',
    'shield-check':'<path d="M12 3l7 2.8v5.7c0 4.2-3 7.8-7 8.7-4-.9-7-4.5-7-8.7V5.8L12 3z"/><path d="M9 11.8l2.2 2.2L15 10"/>',
    lock:     '<rect x="5" y="10.5" width="14" height="9.5" rx="2.2"/><path d="M8.2 10.5V7.8a3.8 3.8 0 017.6 0v2.7"/>',
    key:      '<circle cx="8" cy="14" r="3.6"/><path d="M10.8 11.6L19 3.4M16.2 6l2.2 2.2M14 8.2l2.2 2.2"/>',
    database: '<ellipse cx="12" cy="6" rx="7.2" ry="3"/><path d="M4.8 6v12c0 1.7 3.2 3 7.2 3s7.2-1.3 7.2-3V6M4.8 12c0 1.7 3.2 3 7.2 3s7.2-1.3 7.2-3"/>',
    layers:   '<path d="M12 3l8.4 4.2L12 11.4 3.6 7.2 12 3z"/><path d="M3.6 12L12 16.2 20.4 12M3.6 16.8L12 21l8.4-4.2"/>',
    bolt:     '<path d="M13 2.5L5.5 13h5.2l-.7 8.5L18.5 11h-5.2l-.3-8.5z"/>',
    sparkle:  '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"/>',
    book:     '<path d="M4 4.5h5.4A2.8 2.8 0 0112.2 7.3v12a2.2 2.2 0 00-2.2-2.2H4V4.5z"/><path d="M20 4.5h-5.4a2.8 2.8 0 00-2.8 2.8v12a2.2 2.2 0 012.2-2.2H20V4.5z"/>',
    search:   '<circle cx="10.8" cy="10.8" r="6.6"/><path d="M15.6 15.6L20.5 20.5"/>',
    user:     '<circle cx="12" cy="8.2" r="3.7"/><path d="M4.8 20a7.2 7.2 0 0114.4 0"/>',
    users:    '<circle cx="9.4" cy="8.4" r="3.4"/><path d="M3.2 19.6a6.2 6.2 0 0112.4 0"/><path d="M16.2 5.4a3.4 3.4 0 010 6.6M17.6 14.2a6.2 6.2 0 013.2 5.4"/>',
    card:     '<rect x="2.8" y="5.4" width="18.4" height="13.2" rx="2.4"/><path d="M2.8 10h18.4"/>',
    chart:    '<path d="M4 20V10M9.4 20V4.6M14.8 20v-7.6M20.2 20V8"/>',
    clock:    '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.2V12l3.2 1.9"/>',
    doc:      '<path d="M13.6 3H7.2a2 2 0 00-2 2v14a2 2 0 002 2h9.6a2 2 0 002-2V8.4L13.6 3z"/><path d="M13.6 3v5.4h5.2"/>',
    'file-text':'<path d="M13.6 3H7.2a2 2 0 00-2 2v14a2 2 0 002 2h9.6a2 2 0 002-2V8.4L13.6 3z"/><path d="M13.6 3v5.4h5.2M8.6 13h6.8M8.6 16.4h4.6"/>',
    globe:    '<circle cx="12" cy="12" r="8.6"/><path d="M3.4 12h17.2M12 3.4c2.2 2.4 3.4 5.4 3.4 8.6s-1.2 6.2-3.4 8.6c-2.2-2.4-3.4-5.4-3.4-8.6S9.8 5.8 12 3.4z"/>',
    server:   '<rect x="3" y="4" width="18" height="6.4" rx="2"/><rect x="3" y="13.6" width="18" height="6.4" rx="2"/><path d="M7 7.2h.01M7 16.8h.01"/>',
    code:     '<path d="M8.6 8L4.4 12l4.2 4M15.4 8l4.2 4-4.2 4M13.4 4.6l-2.8 14.8"/>',
    mail:     '<rect x="2.8" y="5" width="18.4" height="14" rx="2.4"/><path d="M3.6 6.6L12 13l8.4-6.4"/>',
    chat:     '<path d="M20.4 12.4a7.6 7.6 0 01-10.9 6.9L4 21l1.7-5.4A7.6 7.6 0 1120.4 12.4z"/>',
    link:     '<path d="M10.4 13.6a4 4 0 006 .4l2.6-2.6a4.2 4.2 0 00-6-6l-1.5 1.5"/><path d="M13.6 10.4a4 4 0 00-6-.4L5 12.6a4.2 4.2 0 006 6l1.5-1.5"/>',
    scale:    '<path d="M12 4v16M7 20h10M5 8h14M5 8l-2.6 5.6a3.2 3.2 0 005.2 0L5 8zM19 8l-2.6 5.6a3.2 3.2 0 005.2 0L19 8z"/>',
    building: '<path d="M4 20V6.4L12 3l8 3.4V20M4 20h16M9 20v-4.4h6V20"/><path d="M8 9.4h.01M12 9.4h.01M16 9.4h.01M8 12.8h.01M16 12.8h.01"/>',
    refresh:  '<path d="M20.2 11a8.2 8.2 0 00-14.3-4.4L3 9.4"/><path d="M3.8 13a8.2 8.2 0 0014.3 4.4L21 14.6"/><path d="M3 4.6v4.8h4.8M21 19.4v-4.8h-4.8"/>',
    alert:    '<path d="M12 3.6L21 19.4H3L12 3.6z"/><path d="M12 9.6v4.2M12 17h.01"/>',
    check:    '<path d="M4.5 12.8l4.6 4.6L19.5 7"/>',
    handshake:'<circle cx="12" cy="12" r="8.6"/><path d="M8.4 12.2l2.5 2.5 4.7-5"/>',
    eye:      '<path d="M2.4 12S5.9 5.6 12 5.6 21.6 12 21.6 12 18.1 18.4 12 18.4 2.4 12 2.4 12z"/><circle cx="12" cy="12" r="3"/>',
    gauge:    '<path d="M4 16.4a8.6 8.6 0 1116 0"/><path d="M12 16.4l4-4.6"/>',
    plug:     '<path d="M9 3v5M15 3v5"/><path d="M6.6 8h10.8v3.2a5.4 5.4 0 01-10.8 0V8zM12 16.6V21"/>'
  };

  var sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false">';
  Object.keys(P).forEach(function (k) {
    sprite += '<symbol id="i-' + k + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
              'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + P[k] + '</symbol>';
  });
  sprite += '</svg>';

  var host = document.createElement('div');
  host.hidden = true;
  host.innerHTML = sprite;
  document.body.insertBefore(host, document.body.firstChild);
}());
