# Pagrin website

The Pagrin marketing site, built from the Figma file
[Pagrin – Designs from Weng](https://www.figma.com/design/9kcWBcbwieXTCQj1hYwRdp/Pagrin---Designs-from-Weng?node-id=11094-68243).

Open `index.html` in a browser. There is no build step and no dependencies to
install. The only external file is GSAP, which is loaded from a CDN by the home
page and the Agentic OS page.

## The pages

The starting point was the footer in the Figma file. It links to nine places,
and every one of them is reachable. Case studies is the exception: it is a
section of the Media page rather than a page of its own.

| Page | File | Figma frame |
| --- | --- | --- |
| Agentic OS | `agentic-os.html` | `11998:40377` |
| Agentic Commerce | `agentic-commerce.html` | `11998:40955` |
| Infinite Campaigns | `infinite-campaigns.html` | `11998:42096` |
| Secure Layer | `secure-layer.html` | `11998:42258` |
| About | `about.html` | `12331:3347` |
| Media (blog and case studies) | `blog.html` | `13653:9` |
| Trust and Security | `trust-security.html` | not in the file |
| Terms and Conditions | `terms.html` | not in the file |
| Contact | `contact.html` | not in the file |

Five of the nine are drawn in Figma, and those five follow the design closely.
All of their words come from the Figma text layers.

The other four are not drawn in the original design. They were built in the
same design language, using the type scale, the colours and the components
taken from the frames that do exist, and then drawn back into Figma on a page
called "From code — built site". Their words are new and need a review before
the site goes live. The Terms page says so at the top, and the Media page says
so under each collection.

There is one extra page, `docs.html`. Nothing in the footer points to it, but
the nav bar and the closing panel both have a link to the developer docs, and
this keeps those links from going nowhere.

## The shared parts

The nav bar, the closing panel and the footer are the same on every page, so
they are written once in `js/site.js` instead of being copied into eleven
files. A page asks for them with an empty element:

```html
<div data-pg-nav></div>
<div data-pg-cta></div>
<div data-pg-footer></div>
```

The script replaces each one. It reads `<body data-page="...">` to work out
which page you are on, and marks that link with `aria-current` in both the nav
bar and the footer, which is what turns it purple.

Because these three parts are drawn by a script, they do not appear if
JavaScript is turned off. If that matters later, the same functions can be run
once to print the markup into each file.

## The design tokens

`css/site.css` holds the colours, the type scale and the spacing. The values
come from the published variables in the Figma file.

| Token | Value | Where it comes from |
| --- | --- | --- |
| `--pg-ink` | `#0e0e0e` | Grey/900, used for headings |
| `--pg-body` | `#484848` | Grey/500, used for body text |
| `--pg-link` | `#333338` | footer links |
| `--pg-muted` | `#99999e` | small labels and the legal line |
| `--pg-purple` | `#6f45f3` | Purple/500, the only accent |
| `--pg-dot` | `#ff5715` | the small square in front of a section label |

The type scale is Title-1 at 72 over 88, H2 at 48 over 58, H4 at 32 over 38,
and body sizes of 18, 16, 14 and 12. Each one is wrapped in `clamp()` so it
scales down on smaller screens. The design uses SF Pro Text, and the font stack
asks for the system font first, so SF Pro Text is used on Apple devices and the
local system font is used everywhere else.

## The stylesheets

| File | What it covers |
| --- | --- |
| `css/site.css` | tokens, base styles, buttons, nav bar, hero, closing panel, footer |
| `css/product.css` | the module cards on the Agentic OS page, and the why panels |
| `css/pages.css` | dashboards, chat screens, the bento grid, articles, prose, forms |
| `css/icons.css` | icon sizing, tinted tiles, the contents card, the gates diagram |
| `css/media.css` | the Media page: gradient blocks, the rail, the index, case studies |
| `css/legal.css` | the long document pages: hero, summary card, sticky contents |
| `css/agentic-os.css` | the layer explorer section |
| `css/channels.css` | the customer channels section |

Every class name starts with `pg`, apart from the two older sections, which use
`ao` and `ch`. Nothing clashes.

## The module illustrations

The eight cards in the module rows on the Agentic OS page are rebuilt from the
symbols in the Figma file. Each one is real markup rather than a picture, so
the copy inside it stays readable, selectable and translatable, and it stays
sharp on any screen.

| Card | Figma node | Background in the design |
| --- | --- | --- |
| LLM and TFM | `12192:2` | soft gradient |
| Agentic Harness | `12194:2` | soft gradient |
| Data and Integrations | `12195:2` | photograph |
| Context and Knowledge | `12195:82` | photograph |
| Loyalty and Reward | `12196:2` | photograph |
| Promotions Engine | `12196:66` | photograph |
| Product and Interfaces | `12197:2` | photograph |
| Security and Governance | `12197:48` | photograph |

Everything inside a panel is sized in `cqw`, which is a share of the panel's
own width, so the mock keeps the exact proportions it has on the Figma canvas
whatever width the column ends up being. The conversion from the design is the
design pixel value divided by 5.3, because the panel is 530 wide in Figma.

Six of the eight panels sit on a photograph, and a photograph cannot be
rebuilt in CSS. Those six currently show a soft wash in the same tones, which
reads as a deliberate background rather than a missing one. To put the real
picture back, set `--shot` on the panel and nothing else needs to change:

```html
<div class="pg-mod__panel pg-mod--studio"
     style="--shot:url(assets/figma/loyalty-reward.jpg)">
```

The wash is drawn on a pseudo element below the panel's own background layer,
so a picture on the panel covers it automatically.

## Spacing

The vertical rhythm is set by two things: the padding a section carries, and
what happens where two sections meet. Measured at a 1440 wide window:

| Boundary | Gap | Where |
| --- | --- | --- |
| Between standard sections | 180px | 90 bottom plus 90 top |
| Hero to first section | 148px | pages whose first section is standard |
| Hero to first section | 118px | pages whose first section is tight |
| Between tight sections | 120px | the document and media pages |
| Last section to the closing panel | 165px | every page |

Inside a long document the rhythm is: 56px above a section heading, then its
rule, then 28px, then the heading, then 16px to the first paragraph. Paragraphs
sit 20px apart, lists 20px from the text around them, and a sub heading takes
34px above and 12px below.

`audit.js` in the scratchpad measures all of this. It walks the direct children
of `main` on every page, reports each block's height and padding, and flags any
boundary wider than 190px or narrower than 60px. One flag it raises is a false
positive: the Agentic OS page wraps a reused section in a bare div, so the
padding sits one level down and the real gap is 148px.

## Icons

`js/icons.js` injects one inline SVG sprite at the top of the body, so any page
can draw an icon without another request:

```html
<svg class="pg-icon" aria-hidden="true"><use href="#i-shield"></use></svg>
```

There are 32 icons, all 24 by 24, drawn with a 1.6 stroke and `currentColor`,
so they take the colour of whatever they sit in. `css/icons.css` holds the
sizes and the tinted tile they usually sit in, plus three pieces built on top
of them: the contents card at the head of a long document, the marker beside
each section heading, and the four gates diagram.

Long pages use these to break up the text. The Terms page opens with a
contents card listing all 10 sections and puts an icon beside every heading.
The Trust page has a four cell strip under the posture figures, icons on the
six control cards, and the four checks drawn as a row of gates.

## The contact form

The fields on `contact.html` have no boxes. Each one is a single rule with a
label that starts on the baseline, where a placeholder would be, and rises to a
small line above the rule once the field has a value or the cursor is in it.

That float is done in CSS with `:placeholder-shown`, which means two things
about the markup. Every input and the textarea carry `placeholder=" "` — a
single space, so the browser treats them as having a placeholder — and the
control is written **before** its label, because the rule uses a sibling
selector:

```html
<div class="pg-field">
  <input id="c-name" name="name" type="text" placeholder=" " required>
  <label for="c-name">Full name</label>
</div>
```

A select always has a value, so its label is floated from the start. The select
also draws its own chevron, since removing the border removed the native one.

## The Media page

`blog.html` holds both collections. It opens with a centred title, then a rail
of recent work that runs off both edges of the screen, then an index: a sticky
column on the left naming the two collections, and the collections themselves
on the right. The layout follows rulebase.co/media, fitted to Pagrin's own type
scale and colours.

The rail is a horizontally scrolling row. Each item sets three custom
properties inline, which is what makes the row look hand placed rather than
generated:

```html
<div class="pg-rail__item" style="--w:1.34;--h:1;--drop:96">
```

`--w` and `--h` are multiples of `--rail-h`, the row's base height, and `--drop`
is how many pixels the item hangs below the top line. `js/media.js` scrolls the
rail part way in on load so it is cut off at the left edge, and adds drag and
arrow key scrolling. None of that is required: with the script off the rail is
still an ordinary scrolling row.

The same script marks whichever collection you are reading in the left column.
Clicking a link is a plain anchor jump, so it works either way.

There is no photography in the project, so every image slot is a gradient
block. Six colourways are defined in `css/media.css` and set per card with a
`data-tone` attribute, which keeps the page looking like one designed set. To
put a real picture in, place an `<img>` inside the `.pg-shot` element and the
gradient is covered.

The case studies are invented. The institutions, the quotes and the figures are
made up to show the shape of the page, and the page says so in a banner. They
need replacing with real, approved case studies before launch.

Case studies appear in the nav under Company, pointing at `blog.html#case-studies`.
They are not in the footer, because the footer's Company column is fixed at four
links by the Figma design.

## The two hosts that are blocked

The network policy in the environment this was built in refuses two hosts, and
that shaped two decisions.

The first is `www.figma.com`. The Figma connection itself works, and it will
hand over the address of any asset in the file. Downloading from that address
is an ordinary web request, and the policy refuses it, so no export could be
saved. This affects the six photographs above, the brand mark and the footer
wordmark. The brand mark is drawn as an SVG in `js/site.js` and matches the
gradient and the diagonal strokes in the design, but it is a rebuild and not
the real file. To fix this, allow `www.figma.com` in the environment's network
policy, or export the frames by hand and put them in `assets/figma/`.

The second is `intercom.com`, which was the reference for the design language.
The Figma file already follows that language closely, so the file itself was
used as the source instead.

## Checking it still works

The pages were checked in Chromium at 1440 and 390 pixels wide. Every page has
one `h1`, has a nav bar and a footer, has no errors in the console, does not
scroll sideways, and every link points at a file that exists.

## The Agentic OS section

The home page embeds this section. It was built from
[frame 11651:2397](https://www.figma.com/design/9kcWBcbwieXTCQj1hYwRdp/Pagrin---Designs-from-Weng?node-id=11651-2397),
and the Agentic OS page reuses it as the architecture explorer.

### What it does

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

### Pausing

The timer is held while a visitor is reading. It stops in any of these cases:

- The pointer is over the tabs or over the illustration.
- Keyboard focus is inside the section. Clicking a tab with the mouse does not count, so the cycle carries on after a click.
- The section is scrolled out of view.
- The browser tab is in the background.

The timer starts again from where it stopped once none of these are true.

### Files

- `index.html` is the markup, including the five slab vectors.
- `css/agentic-os.css` is the styling.
- `js/agentic-os.js` is the behaviour and the tab text.

### Changing the timing

The 8 seconds are set once, in the `--ao-dwell` custom property near the top of
`css/agentic-os.css`. Change that one value and both the fill and the gap
between layers follow it. The script does not hold a copy of the number.

### Changing the text

All copy for the four tabs is in the `CONFIG.layers` array at the top of
`js/agentic-os.js`. Each entry is a list of cards, and each card has a `title`
and a `body`. Edit those strings and nothing else needs to change.

The text for the first tab comes from the Figma file. The text for the other
three tabs is a draft, because the Figma file only specifies the first one.
Please replace it with the real copy.

### Dropping it into the site

Copy the `<section class="agentic-os">` block from `index.html`, then include
the stylesheet and the script. All the styles are scoped to the section, and
every class name starts with `ao`, so the names will not clash with yours.

The script uses GSAP. It is loaded from a CDN in `index.html`. If your site
already loads GSAP, remove that script tag and keep your own. If GSAP does not
load at all, the section still works. It uses CSS transitions instead, and the
only thing lost is the up and down motion. The dwell timer is a CSS animation,
so it runs either way.

### Accessibility

The tabs are a standard tab list. You can move between them with the left and
right arrow keys. Press Home or End to go to the first or last tab.

Moving keyboard focus into the section stops the timer, so a visitor who is not
using a mouse still has a way to stop the content changing under them. This is
what WCAG success criterion 2.2.2 asks for.

If a visitor has asked their system to reduce motion, three things change. The
section does not advance on its own. The up and down motion is turned off. All
the transitions are instant. The rule under the selected tab is drawn at full
width, which is how the Figma frame shows it.

### How the positions were worked out

The five slabs sit at fixed positions measured from the Figma file. The values
are in `REST` in `js/agentic-os.js`, and they are in the same units as the SVG
view box. When you select a layer, the script adds a fixed amount, `OPEN`, to
every slab below it.

With the first layer selected, the positions are 0, 113.881, 176.836, 240.732
and 355.378, which matches the Figma frame exactly. The top slab and the base
slab are in the same place whichever tab you pick, so the height of the section
is always the same.

### Re-exporting the artwork

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

### A note on the font

The design uses SF Pro Text. The stylesheet lists the system font first, so
SF Pro Text is used on Apple devices and the local system font is used
elsewhere. Line breaks in the paragraph will differ slightly on Windows and
Linux, because those fonts are a little wider.
