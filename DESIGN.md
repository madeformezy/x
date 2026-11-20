---
name: Madeform
description: Hospitality archive box-stack design system for Madeform, an independent web design studio in Hyderabad, India.
colors:
  kraft-board: "#d07a3a"
  kraft-face: "#d78243"
  kraft-deep: "#c67234"
  kraft-well: "#9e521e"
  ink-black: "#0e0d0b"
  ink-umber: "#1e1107"
  tissue-white: "#f6f4ef"
  tissue-fold: "#eae5da"
  tissue-umber: "#433930"
  case-dark: "#141210"
  case-panel: "#1d1a17"
  case-muted: "#dec8b4"
  chip-forest: "#4c6c44"
  chip-steel: "#446685"
  chip-violet: "#684b8c"
  chip-brick: "#b13a2e"
typography:
  display:
    fontFamily: "Anton, Barlow Condensed, sans-serif"
    fontSize: "clamp(2.55rem, 4.35vw, 4.7rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Anton, Barlow Condensed, sans-serif"
    fontSize: "clamp(2.4rem, 4.5vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Barlow Condensed, Barlow, sans-serif"
    fontSize: "clamp(1.22rem, 1.55vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "0.02em"
  body:
    fontFamily: "Barlow, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Chivo Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.74rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
    fontFeature: "tnum"
rounded:
  sharp: "2px"
  fold: "4px"
  notch: "19.2px"
spacing:
  xs: "0.4rem"
  sm: "0.75rem"
  md: "1.15rem"
  lg: "1.5rem"
  xl: "2.25rem"
  section: "clamp(3.5rem, 6vw, 5.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.tissue-white}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "11.5px 21.6px"
    height: "47.2px"
  button-primary-hover:
    backgroundColor: "#231e19"
    textColor: "{colors.tissue-white}"
  button-secondary:
    backgroundColor: "{colors.kraft-board}"
    textColor: "{colors.ink-black}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "11.5px 21.6px"
    height: "47.2px"
  button-secondary-hover:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.tissue-white}"
  button-tissue:
    backgroundColor: "{colors.tissue-white}"
    textColor: "{colors.ink-black}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "11.5px 21.6px"
    height: "47.2px"
  stack-box:
    backgroundColor: "{colors.kraft-board}"
    textColor: "{colors.ink-black}"
    rounded: "0px"
    padding: "18.4px 12px 12.8px 16px"
  stack-box-selected:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.tissue-white}"
  input-field:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-black}"
    typography: "{typography.body}"
    rounded: "{rounded.sharp}"
    padding: "10px 12.5px"
    height: "47.2px"
---

# Design System: Madeform

## Overview

**Creative North Star: "The Hospitality Archive Wall"**

Madeform's visual identity rejects the soft pastel agency template and the cold frosted-glass SaaS shell in favor of tactile hospitality packaging craft. The surface behaves like a floor-to-ceiling wall of burnt-orange archive boxes in a specialty roastery or bakery backroom: every offering, rupee figure, and live concept is indexed on the end of a cardboard box by tall compressed grotesque capitals, a horizontal ruled spec line, a technical stamp glyph, and a four-swatch colorway strip. When a visitor inspects an item, the drawer physically slides out of its recessed dark cubby cavity, exposing a three-dimensional cardboard side wall and multi-faceted folded white tissue paper cradling the real work inside.

Density is architectural and rule-governed. Rather than floating cards over empty neutral margins, containers share continuous `1.5px` ink rules across a committed burnt-orange kraft ground (`#d07a3a`). Pacing alternates between the dense indexed box wall of the opening viewport, a dark carbon-lined exhibition case (`#141210`) that gives café photography dramatic contrast, unboxed tissue-lined package slabs (`#f6f4ef`) with an interactive rupee calculator, a calm unboxed editorial ledger for studio principles, and a tissue-paper project dispatch form.

**Key Characteristics:**
- Committed burnt-orange kraft boxboard ground (`#d07a3a`) ruled edge-to-edge by `1.5px` ink hairlines (`#141210`).
- Pulled-open 3D cardboard tray inside a recessed dark cubby well with skewed cardboard return walls, top finger-notch cutouts, and multi-fold white tissue paper planes (`#f6f4ef`).
- Four-swatch vertical colorway strips (Forest `#4c6c44`, Steel Blue `#446685`, Violet `#684b8c`, Brick `#b13a2e`) indexing every package and concept box.
- Tall compressed uppercase display typography (`Anton`) paired with condensed box-end headers (`Barlow Condensed`), tabular monospace pricing specs (`Chivo Mono`), and clean humanist reading copy (`Barlow`).
- Persistent left index rail on desktop (`7.35rem` wide) that collapses cleanly to a ruled sticky top bar on tablet and mobile (`<=900px`).

## Colors

The palette pairs warm, saturated corrugated kraft board and stark carbon ink with crisp white tissue interiors and four archival colorway index pigments.

### Primary
- **Burnt Kraft Board** (`#d07a3a`): Primary page surface and default archive box face, owning 50–65% of the viewport as an unbroken material ground.
- **Sunlit Kraft Face** (`#d78243`): Slightly warmer front-lit drawer lip, package box lids, and process cells.
- **Recessed Kraft Stack** (`#c67234`): Deeper tonal step for scrollbar tracks and recessed boxboard details.
- **Cardboard Return Well** (`#9e521e`): Shaded 3D side-wall return on pulled cardboard drawers.

### Secondary
- **Forest Spec Chip** (`#4c6c44`): Colorway identity for Digital Menus (`₹2,999`), included-feature checkmarks, and WhatsApp dispatch accents.
- **Steel Blue Spec Chip** (`#446685`): Colorway identity for Business Websites (`From ₹7,999`) and active form input focus borders.

### Tertiary
- **Violet Spec Chip** (`#684b8c`): Colorway identity for Custom Quotes and tailored hospitality briefs.
- **Brick Seal Chip** (`#b13a2e`): Colorway identity for the live Aster Coffee studio concept, form text carets, and high-emphasis link hover states on tissue.

### Neutral
- **Archival Carbon Ink** (`#0e0d0b`): Primary display headlines, body text on kraft and tissue, primary button fills, active box slots, and `1.5px` structural rules (6.05:1 contrast on `#d07a3a`; 17.6:1 on `#f6f4ef`).
- **Roasted Umber Ink** (`#1e1107`): Secondary metadata and supporting prose on kraft surfaces, tinted directly from the board hue rather than neutral gray (>5.3:1 contrast on `#d07a3a`).
- **Folded Tissue White** (`#f6f4ef`): Interior lining of pulled archive drawers, open package spec sheets, comparison tables, and the project enquiry form.
- **Tissue Crease Warmth** (`#eae5da`): Secondary paper-fold facets, calculator wells, and table headers inside tissue-lined containers.
- **Tissue Umber Muted** (`#433930`): Supporting captions and field hints inside tissue-white interiors.
- **Exhibition Case Charcoal** (`#141210`): Full-bleed dark presentation case for the Aster Coffee showcase and recessed cubby cavity shadow wells.
- **Exhibition Panel Slate** (`#1d1a17`): Secondary inner container surface inside the dark exhibition case.
- **Warm Bone Muted** (`#dec8b4`): Supporting body copy and metadata inside dark `#141210` surfaces.

### Named Rules
**The Tinted Umber Rule.** Never place neutral gray text on burnt-orange kraft board; all secondary text on kraft uses deep roasted umber (`#1e1107`) so shadows and captions belong to the cardboard material and exceed 4.5:1 AA contrast.

**The Tissue Interior Rule.** Pure white and off-white (`#f6f4ef`) never appear as outer page backgrounds; they are reserved strictly for the interior lining of opened boxes, specimen frames, and dispatch slips resting on the kraft ground.

**The Colorway Strip Rule.** The four accent hues (`#4c6c44`, `#446685`, `#684b8c`, `#b13a2e`) travel together as a vertical four-part colorway bar on box ends, with a `1.5px` white inner inset box-shadow marking which variant owns that box.

## Typography

**Display Font:** `Anton` (self-hosted WOFF, with `Barlow Condensed`, `sans-serif` fallback)
**Body Font:** `Barlow` (self-hosted WOFF2 weights 400, 500, 600, with system sans fallback)
**Label/Mono Font:** `Barlow Condensed` (self-hosted WOFF2 weights 600, 700) for box-end titles; `Chivo Mono` (self-hosted WOFF2 weights 400, 500, 600) for tabular rupee specs, size runs, and UI controls

**Character:** Monumental, industrial stencil-poster compression in the display headlines contrasts with utilitarian typewriter precision in the tabular rupee specs and warm, unpretentious clarity in the body prose.

### Hierarchy
- **Display** (`400`, `clamp(2.55rem, 4.35vw, 4.7rem)`, `0.92` line-height, `-0.015em` tracking, uppercase): Hero thesis statement (`SMALL BUSINESS. BIG PERSONALITY.`), locked to a two-line poster block on desktop viewports.
- **Headline** (`400`, `clamp(2.4rem, 4.5vw, 4.25rem)`, `0.96–1.01` line-height, `-0.015em` tracking, uppercase): Major section headers (`ASTER COFFEE`, `SERVICES & PRICING`, `HOW WE WORK`, `LET’S MAKE SOMETHING WORTH VISITING.`).
- **Title** (`700` `Barlow Condensed`, `clamp(1.22rem, 1.55vw, 1.5rem)`, `0.98–1.15` line-height, `0.02em` tracking, uppercase): Archive box end-label headers, principle titles, and process step headings.
- **Body** (`400` `Barlow`, `1rem`, `1.55–1.65` line-height, max measure `44ch–66ch`): Descriptive paragraphs, feature checklists, form inputs, and `privacy.html` legal prose.
- **Label** (`500–600` `Chivo Mono`, `0.72rem–0.84rem`, `0.03em–0.06em` tracking, uppercase, `tabular-nums`): Box-end metadata rows, size runs (`10 20 30 40 50 +₹50/EA`), button labels, rail navigation links, and ledger headers. Never drops below the `11.5px` (`0.72rem`) functional legibility floor.

### Named Rules
**The No-Eyebrow Rule.** Headings never carry a small kicker, badge, or eyebrow label above them; section titles and process headings stand on their own weight, and sequential indices (`01`–`04`) occupy a separate structural grid column beside the heading.

**The Tabular Rupee Rule.** Every price (`₹2,999`, `From ₹7,999`, `+₹50`), item count, and phone number (`+91 63014 38905`) sets `font-variant-numeric: tabular-nums` so figures align across box ends, calculators, and comparison rows.

## Layout

The desktop shell (`>900px`) is a two-column CSS Grid (`7.35rem minmax(0, 1fr)`) pairing a sticky full-height left index rail (`.site-rail`, capped at `min(100svh, 58rem)`) with the main stage (`.site-stage`). Content sections center within an `82rem` max-width container padded by `clamp(1.25rem, 3.6vw, 3.25rem)` horizontal gutters and `clamp(3.5rem, 6vw, 5.5rem)` vertical section spacing, while full-bleed structural `1.5px` borders run edge-to-edge across the stage.

The opening viewport (`.hero-archive`) splits into a `0.92fr : 1.08fr` asymmetric stage above a four-column ruled ledger bar (`.hero-ledger`). The left lead column stacks the two-line display headline, a top-ruled monospace introduction, primary and secondary CTA buttons, and a bottom top-ruled three-card package index row (`Digital Menu`, `Business Site`, `Custom Quote`). The right half stacks a 2×2 interactive box-end grid (`.archive-wall`) directly above a recessed dark cubby cavity (`.archive-cubby`) that houses the pulled-open 3D drawer (`.pulled-drawer`, projecting `-1.65rem` across the center vertical rule on viewports `>1120px`).

At `<=1120px`, `.hero-split` stacks into a single column with a 4-column box tab bar above the recessed cubby and a 2×2 hero ledger. At `<=900px`, the left index rail transforms into a `3.75rem` sticky horizontal top bar with a direct `Let’s talk` action and square menu toggle. At `<=720px`, `.archive-wall` reflows to a compact 2×2 grid (hiding `.box-mark` technical stamps so labels have full column width) and `.hero-index-row` hides to keep the interactive box tabs and pulled tissue drawer visible in the first mobile viewport.

## Elevation & Depth

Surfaces are flat and rule-bound by default (`1.5px solid #141210`), declaring elevation either through border or through physical projection—never both as a decorative ghost card. Real three-dimensional depth is reserved for the signature pulled archive drawer emerging from its recessed shelf cavity.

### Shadow Vocabulary
- **Recessed Cubby Cavity** (`box-shadow: inset 0 16px 32px rgb(0 0 0 / 0.62), inset 14px 0 24px rgb(0 0 0 / 0.42)`): Deep interior shelf shadow inside `.archive-cubby` behind the pulled drawer.
- **Pulled 3D Drawer Projection** (`box-shadow: -18px 22px 38px rgb(8 4 1 / 0.52)`): Directional drop shadow cast downward and leftward by the protruding cardboard drawer tray over the cubby and center seam.

### Named Rules
**The One-Drawer Depth Rule.** Only the pulled-open archive drawer (`.pulled-drawer`) projects in 3D space with skewed cardboard side walls and a cast drop shadow; all shelved boxes, package slabs, and form containers sit flat in the ruled `1.5px` grid and respond to hover with a crisp `-1px` to `-3px` vertical lift.

## Shapes

Corners follow cut paperboard geometry: sharp `2px` radii (`--radius-sharp`) on buttons, inputs, slips, and drawers, and `0px` flush corners on grid-locked archive wall cells, ledger strips, and process steps. Pill radii are never used for buttons or cards; the only curved cutout in the system is the semicircular die-cut **finger-pull notch** (`border-radius: 0 0 1.2rem 1.2rem`, `2.35rem × 0.66rem` on shelved boxes; `3rem × 0.78rem` on `.drawer-front`) centered along the top edge of every box face. Every box face and package slip also includes a `1px` horizontal ruled divider separating its title/subtitle block from its bottom tabular spec row.

## Components

### Buttons
- **Shape:** Sharp paperboard rectangle (`2px` radius, `1.5px solid #141210` border, `2.95rem` min-height).
- **Primary (`.btn-primary`):** Solid carbon ink fill (`#0e0d0b`) with tissue-white monospace label (`#f6f4ef`, `0.84rem`, uppercase, `0.06em` tracking) and square-stroke SVG arrow. Lifts `translateY(-1px)` on hover (`#231e19`).
- **Secondary (`.btn-secondary`):** Transparent kraft fill with `1.5px solid #141210` border and `#0e0d0b` label; inverts to `#0e0d0b` fill with `#f6f4ef` text on hover.
- **Tissue Variant (`.btn-tissue`):** Used inside the dark `#141210` exhibition case; `#f6f4ef` fill with `#0e0d0b` text, shifting to `#d78243` sunlit kraft on hover.
- **Focus:** `2px solid #0e0d0b` outline with `2px` offset and `0 0 0 4px #f6f4ef` high-contrast double ring (inverted to `#f6f4ef` outline + `#d07a3a` ring inside dark sections).

### Chips
- **Style (`.size-chip`, `.preset-chip`):** Compact tabular monospace buttons (`0.72rem–0.78rem`, `1px–1.5px solid #141210`, `2px` radius) inside the Digital Menu item-count calculator.
- **State:** Unselected chips sit on transparent or `#f6f4ef` tissue ground; active selection (`.is-selected`, `aria-pressed="true"`) inverts to solid `#0e0d0b` ink with `#f6f4ef` numerals.

### Cards / Containers
- **Package Slabs (`.pkg-box`):** Unboxed two-part archive containers (`1.5px solid #141210`, `0px` outer radius) pairing a sunlit kraft box-lid header (`.pkg-box-lid`, with top finger notch and right colorway strip) over a `#f6f4ef` tissue-white specification interior (`.pkg-tissue`, `1.45rem` padding).
- **Exhibition Specimen Frame (`.specimen-frame`, `.qr-specimen`):** Crisp `#f6f4ef` tissue mat (`0.65rem–0.85rem` padding, `1.5px solid #d78243` border) mounting real photography or scannable QR plates inside the `#141210` dark exhibition case.

### Inputs / Fields
- **Style:** Pure white `#ffffff` field surface inside the `#f6f4ef` tissue dispatch form, bordered by `1.5px solid #141210` (`2px` radius, `2.95rem` min-height), paired with uppercase `Chivo Mono` labels (`0.76rem`, `600` weight) above each control and `#5a4f46` high-contrast placeholders.
- **Focus:** Border shifts to Steel Blue (`#446685`) with the system double focus ring and Brick (`#b13a2e`) text caret.
- **Status Banner (`.form-status`):** Ruled `1.5px` feedback box (`#eae5da` background; `#4c6c44` border for success, `#b13a2e` border for error).

### Navigation
- **Desktop Index Rail (`.site-rail`):** Sticky `7.35rem` left column on `#d07a3a` kraft with `1.5px` right border. Holds stacked `MADEFORM` display wordmark + vermilion mark at top, vertical monospace links (`0.72rem`, uppercase) with `15px` geometric icons in the middle, and pinned `WhatsApp` + inverted `Let’s talk` actions at bottom. Active section link (`.is-active`) inverts to solid `#0e0d0b` fill with `#f6f4ef` text.
- **Mobile Bar (`<=900px`):** `3.75rem` sticky top bar with horizontal wordmark, `Let’s talk` pill-free ink button, and `2.55rem` square hamburger toggle opening a full-screen `#d07a3a` kraft drawer with large `Anton` display links.

### Archive Box & Pulled Tissue Drawer
- **Shelved Box Tab (`button.stack-box`):** Interactive grid cell in `.archive-wall` (`#d07a3a` default, `#0e0d0b` when `.is-selected` / `aria-selected="true"` with a kraft `OPEN` badge at top-right). Contains top-center semicircular `.box-notch`, condensed `.box-title`, monospace `.box-sub`, top-ruled `.box-run`, `2.65rem` geometric `.box-mark`, and right-edge `.colorway-strip`. Switches state instantaneously with no background-color CSS transition so 3D neighbor compositing never lags.
- **Pulled 3D Drawer (`.pulled-drawer`):** Sits inside `.archive-cubby`, projecting `-1.65rem` left on wide screens, with skewed `::before` top rim and `::after` right cardboard side wall (`#984e1c` to `#753910`). Upper `.drawer-tissue` compartment renders multi-fold geometric paper-crease facets (`132deg` hard-stop linear gradient + `.tissue-crest` top paper lip); lower `.drawer-front` renders the orange cardboard box lip with a tissue-backed semicircular finger notch cutting into the bottom edge of the tissue bed.

## Do's and Don'ts

### Do:
- **Do** keep `#d07a3a` burnt-orange kraft as the dominant page ground and use `1.5px solid #141210` rules to divide regions edge-to-edge.
- **Do** include the semicircular top finger-notch (`.box-notch`), the horizontal dividing rule above the bottom tabular spec row, and the four-part `.colorway-strip` on every archive box face.
- **Do** self-host all four font voices (`Anton`, `Barlow Condensed`, `Chivo Mono`, `Barlow`) in `./fonts/` to preserve zero third-party font requests and zero tracking cookies.
- **Do** keep all functional UI text and monospace labels at or above `0.72rem` (`11.5px`).

### Don't:
- **Don't** place eyebrow badges, kickers, or `STEP 01` pills above headings; integrate sequential numbers into a dedicated structural grid column (`.step-index`).
- **Don't** add `transition: background-color` to `button.stack-box` tabs adjacent to the 3D drawer, or float `.pulled-drawer` with `position: absolute` over static background boxes where icons or notches get partially clipped.
- **Don't** introduce rounded SaaS pills (`999px`), frosted-glass blur (`backdrop-filter`), gradient text, hard brutalist `4px 4px 0` offset shadows, or hand-sketched doodle SVGs.
