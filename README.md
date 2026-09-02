# Pagrin — Agentic OS section

An animated website section built from the Figma design
[Pagrin – Designs from Weng, frame 11651:2397](https://www.figma.com/design/9kcWBcbwieXTCQj1hYwRdp/Pagrin---Designs-from-Weng?node-id=11651-2397).

Open `index.html` in a browser to see it. There is no build step.

## What it does

The section shows five stacked slabs drawn in isometric projection. The bottom
slab is the base, and it stays in one place. The four slabs above it are the
layers of the Agentic OS, and each one matches a tab at the top of the section.

The section plays by itself. The purple rule under the selected tab fills from
left to right over 8 seconds, which is roughly the time it takes to read the two
cards on the right. When the rule is full, the next tab is selected and its rule
starts filling. After the fourth tab it wraps back round to the first and keeps
going.

When you pick a tab, four things happen at the same time:

- The gap below the chosen slab becomes larger, so that slab is separated from the stack.
- The chosen slab is drawn with the purple outline and the tinted top surface.
- Any slabs above the chosen one are faded to 40 percent, so they no longer cover it.
- The two cards on the right are replaced with the text for the new layer.

The 8 seconds also restart whenever you click a tab yourself.

Every slab is also animated up and down on its own slow loop. The amounts are
small, between about 2 and 5 units, and each slab has a different speed and
start time, so they never move together.

You can also click a slab directly instead of using the tab above it. When you
hover a tab, the matching slab is tinted but does not move.

## Pausing

The timer is held while a visitor is reading. It stops in any of these cases:

- The pointer is over the tabs or over the illustration.
- Keyboard focus is inside the section. Clicking a tab with the mouse does not count, so the cycle carries on after a click.
- The section is scrolled out of view.
- The browser tab is in the background.

The timer starts again from where it stopped once none of these are true.

## Files

- `index.html` is the markup, including the five slab vectors.
- `css/agentic-os.css` is the styling.
- `js/agentic-os.js` is the behaviour and the tab text.

## Changing the timing

The 8 seconds are set once, in the `--ao-dwell` custom property near the top of
`css/agentic-os.css`. Change that one value and both the fill and the gap
between layers follow it. The script does not hold a copy of the number.

## Changing the text

All copy for the four tabs is in the `CONFIG.layers` array at the top of
`js/agentic-os.js`. Each entry is a list of cards, and each card has a `title`
and a `body`. Edit those strings and nothing else needs to change.

The text for the first tab comes from the Figma file. The text for the other
three tabs is a draft, because the Figma file only specifies the first one.
Please replace it with the real copy.

## Dropping it into the site

Copy the `<section class="agentic-os">` block from `index.html`, then include
the stylesheet and the script. All the styles are scoped to the section, and
every class name starts with `ao`, so the names will not clash with yours.

The script uses GSAP. It is loaded from a CDN in `index.html`. If your site
already loads GSAP, remove that script tag and keep your own. If GSAP does not
load at all, the section still works. It uses CSS transitions instead, and the
only thing lost is the up and down motion. The dwell timer is a CSS animation,
so it runs either way.

## Accessibility

The tabs are a standard tab list. You can move between them with the left and
right arrow keys. Press Home or End to go to the first or last tab.

Moving keyboard focus into the section stops the timer, so a visitor who is not
using a mouse still has a way to stop the content changing under them. This is
what WCAG success criterion 2.2.2 asks for.

If a visitor has asked their system to reduce motion, three things change. The
section does not advance on its own. The up and down motion is turned off. All
the transitions are instant. The rule under the selected tab is drawn at full
width, which is how the Figma frame shows it.

## How the positions were worked out

The five slabs sit at fixed positions measured from the Figma file. The values
are in `REST` in `js/agentic-os.js`, and they are in the same units as the SVG
view box. When you select a layer, the script adds a fixed amount, `OPEN`, to
every slab below it.

With the first layer selected, the positions are 0, 113.881, 176.836, 240.732
and 355.378, which matches the Figma frame exactly. The top slab and the base
slab are in the same place whichever tab you pick, so the height of the section
is always the same.

## Re-exporting the artwork

The slab vectors were exported from these Figma nodes:

- Layer 1 is `11651:2796`.
- Layer 2 is `11651:2787`.
- Layer 3 is `11651:2646`.
- Layer 4 is `11651:2462`.
- The base is `11651:2430`.

Each export was rounded to one decimal place, and the shared stroke settings
were moved onto the wrapping `<g>` element. The fill colours were replaced with
the custom properties `--sl-face`, `--sl-under`, `--sl-accent` and `--sl-line`.
That is what lets any slab render in either the selected or the resting colours.

## A note on the font

The design uses SF Pro Text. The stylesheet lists the system font first, so
SF Pro Text is used on Apple devices and the local system font is used
elsewhere. Line breaks in the paragraph will differ slightly on Windows and
Linux, because those fonts are a little wider.
