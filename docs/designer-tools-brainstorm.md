# Tools worth building for designers

A brainstorm of tools that would take mechanical work out of a designer's week,
ranked by how much time each one gives back.

The target was more than 50 percent off the design process. No single tool does
that, and any tool that claims it is overselling you. You get there by taking
apart the week and removing the parts that are mechanical.

## Where the week actually goes

Before you build anything, look at what a designer spends the week on. Most
people assume the day is spent designing. It is not. The drawing is the small
part, and everything around it is file work, waiting and checking.

| Task | Hours a week | A tool could take |
|---|---:|---:|
| Drawing and thinking about the design | 10.0 | 0.0 |
| Naming layers, organising files, clearing up | 6.0 | 5.0 |
| Filling in content, making states and breakpoints | 6.0 | 4.5 |
| Collecting feedback and making the revisions | 6.0 | 3.0 |
| Handoff, specs, answering developer questions | 5.0 | 4.0 |
| Checking the built product against the design | 3.0 | 2.5 |
| Exporting and delivering assets | 2.0 | 1.8 |
| Looking for past work and references | 2.0 | 1.5 |
| **Total** | **40.0** | **22.3** |

That is 56 percent of the week. Only 10 of the 40 hours is drawing and thinking.

These hours are an estimate, not a measurement. Run the same list against your
own week for two weeks before you build anything. The order will change, and the
order is what decides what you build first.

## The five with the most leverage

Ranked by how much time they give back, not by how easy they are to build. The
build order at the end of this document accounts for effort as well.

### 1. Design QA bot

It takes the Figma frame and a screenshot of the built page at the same width,
lines them up, and lists every difference with real numbers.

Instead of a person squinting at two windows, the bot says that the button
padding is 14 pixels and the design says 16. It runs on every pull request and
posts the list as a comment, so the drift is caught before anyone asks a
designer to look.

This is the slowest loop you have. A review round needs a person to look, write
comments, wait for a fix, then look again. Each round costs a day of waiting
even when the fix itself takes ten minutes.

It fits this repository directly. The site is built by hand from Figma nodes, so
the build can drift from the design on any commit and nobody sees it until a
person checks.

The hard part is doing more than a pixel comparison. A pixel comparison only
tells you that something is different. To be useful the tool has to read the
computed styles from the page and compare them to the values on the Figma node,
so it can name the property and the number.

- Build: 2 to 3 weeks.
- Saves: 2.5 hours of design QA a week, plus revision rounds.
- Needs: the Figma REST API, Playwright, and the GitHub API.

### 2. Real content and edge case filler

It fills your components with real data from a sheet or an API instead of
placeholder text, then it fills them again with the worst case so you see the
layout break in Figma.

Most revision work comes from content that does not fit. You draw the card with
a short name and ship it to a person whose name is three times longer. The edge
case mode fills every text layer with the longest value in your data, then an
empty value, then a number with four digits, then a word with no spaces.

You find the break while you are still in the file. That removes an entire class
of revision rounds, because the developer never has to come back and tell you
the layout falls apart.

- Build: 1 week, plus a day for each data source.
- Saves: whole revision rounds.
- Needs: the Figma plugin API and a data connector.

### 3. Token linter that fixes what it finds

It scans a file for every value that is not bound to a variable, then changes
each one to the nearest correct token in a single action.

It finds four things: a color that is close to a token but not the same, spacing
that is off your scale, a component that has been detached, and text that is not
on a style.

Reporting the problems is the easy half, and several free plugins already do it.
Fixing them is the half nobody built, and it is the half that saves the time.
Teams do this audit by hand, so they skip it, so the design system falls apart
over a few months.

- Build: 1 to 2 weeks.
- Saves: an audit that takes hours now takes minutes.
- Needs: the Figma variables API.

### 4. State and breakpoint generator

You draw the default desktop version. It writes the other states and the smaller
layouts from rules you set once per component.

The states are hover, focus, active, disabled, loading, error and empty. The
layouts are tablet and mobile, made by rules such as stacking these two columns
and hiding that element.

This is mechanical work with a known answer, which is exactly what a tool should
do. Right now designers skip the states because there are seven of them per
component. Then developers invent the missing states, then the designer rejects
what the developer invented. That round trip is expensive and none of it needed
to happen.

A first version will get it about 80 percent right. That is still far faster
than starting each state from nothing.

- Build: 2 weeks.
- Saves: most of the 4.5 hours a week that goes on variant work.
- Needs: the Figma plugin API and a rules file per component.

### 5. Token pipeline into your code

It watches your Figma variables. When one changes it opens a pull request that
updates the custom properties in your CSS.

Today a person copies hex codes across by hand and eventually gets one wrong.
Nobody notices until a customer does. With the pipeline there is one source of
truth and the code follows it.

This repository already uses custom properties for exactly this, such as
`--sl-face` and `--ao-dwell`, so the naming work is done. You only need the part
that reads Figma and writes the file.

- Build: 3 days.
- Saves: a small amount of time, but it removes a class of bugs.
- Needs: the Figma variables API and the GitHub API.

## The rest of the list

These are grouped by the part of the process they attack. They are worth less
each than the five above, but several of them take only a day or two to build.

### File and cleanup work

- **Layer janitor.** It renames layers from the content inside them, deletes
  hidden empty layers, flattens a group that holds only one thing, and sorts the
  layer list so it matches what you see on the canvas.
- **Visual diff for Figma.** It shows what actually changed between two versions
  of a frame, side by side, with a written list of the changes. Figma keeps a
  version history, but it will not tell you what moved.
- **Design search.** Search across every frame you have ever made using plain
  language, e.g., "show me every empty state we have designed". It stops you
  redrawing something that already exists in an old file.

### Handoff

- **Spec sheet generator.** It makes an annotated copy of the frame showing
  spacing, sizes, token names, component names and states. It writes the same
  information as markdown so it can go straight into the ticket.
- **SVG export cleaner.** It takes a raw Figma export and gives back an
  optimized SVG with the fill colors swapped for your custom properties and the
  shared stroke settings moved onto the wrapping group. The README in this
  repository describes doing this by hand today, which makes it a script you
  have already written in your head.
- **Interaction recorder.** You click through the prototype once and it writes
  the interaction notes for you, including the timings and the easing values.

### Feedback

- **Feedback inbox.** It pulls every comment about one design out of Figma,
  Slack, email and the ticket tracker into a single list. It groups the comments
  that say the same thing, tracks which are resolved, and posts your reply back
  to wherever the comment came from.
- **Client review page.** A link where a client sees the design at real size,
  comments on it in plain language, and approves it. It replaces the loop of
  exporting a PDF and waiting for an email full of screenshots.

### Quality

- **Accessibility checker.** It checks the contrast of every text and background
  pair, including text that sits over an image or a gradient. It also checks tap
  target sizes and heading order. When something fails it offers the nearest
  token that passes, so the fix is one click rather than a hunt.
- **Critique bot.** It runs a frame against your own written design principles
  and returns the obvious problems before you take the work to a person. It
  saves one review round, which is usually a day.

### Starting a piece of work

- **Brief to wireframe.** You paste a requirements document or a Slack thread
  and it draws three rough directions in your design system. The output is not
  finished work. It removes the empty canvas, which is where a lot of the first
  morning goes.
- **Copy that fits.** It rewrites interface text to fit a set pixel width in
  your brand voice and gives you several options. It solves the problem of
  needing a headline that is four characters shorter than the one you have.
- **Screenshot to layers.** Someone sends you a screenshot of a competitor or of
  a bug. It turns that screenshot into editable layers using your own tokens, so
  you can work on it instead of redrawing it.

## What not to build

Do not build the generic version of any of these. A plain lint plugin, a
placeholder text filler and a contrast checker already exist in the Figma
community, they are free, and you will not win on price.

The ones worth your time are the ones that need information only you have. That
is what makes them hard to copy.

- **Your codebase**, so the tool knows which component in your code matches
  which component in the file.
- **Your tokens**, so it can fix a wrong value instead of only reporting it.
- **Your past work**, so it can find the thing you already designed last year.
- **Your real data**, so it can fill a screen with content a customer would
  actually see.

Nobody can ship that as a generic plugin, because it has to be wired into your
systems first. The wiring is the product.

## What to build first

This order puts the two cheap wins first, so you have something working in week
one, then spends the real time on the tool with the largest payoff.

- **Week 1. Token pipeline and SVG export cleaner.** Both are small scripts, and
  you feel the pain of both in this repository today. Finishing them proves the
  approach to yourself before you spend a month on anything.
- **Weeks 2 to 4. Design QA bot.** The largest single win. Start with the pixel
  comparison so you have something running, then add the part that reads
  computed styles, which is what makes the output useful.
- **Weeks 5 to 6. Real content and edge case filler.** Build the edge case mode
  first. It is simpler than the data connectors and it catches more problems.
- **Weeks 7 to 9. Token linter, then the state generator.** By this point you
  will know your own file conventions well enough to write the rules these two
  need.

Build every one of them for yourself first. Each is worth far more as a product
after you have used it on real client work for a month, because that month tells
you which parts of your idea were wrong. Designers can tell within a minute
whether a tool was made by someone who does the work.
