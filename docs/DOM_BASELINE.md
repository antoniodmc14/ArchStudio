# DOM baseline before template extraction

Captured from `index.html` before the Phase 2/3 refactor.

## Structural inventory

- One `#site-header`.
- One `#grid-section.view-panel`, visible by default.
- Six project `article` elements in this order:
  1. `#daniel`
  2. `#piaule`
  3. `#holzrausch`
  4. `#relicario`
  5. `#papayas`
  6. `#forest-edge`
- One `#about-section.view-panel.view-panel--about.is-hidden`.
- 45 gallery `figure` elements across the projects: 8, 6, 7, 7, 9, 8.
- Four About metadata groups containing 17 bullet rows: 6, 5, 3, 3.

## Project ID and ARIA contract

For every project slug `{id}`:

- Article: `id="{id}"`, `aria-labelledby="project-{id}-title"`.
- Heading: `id="project-{id}-title"`.
- Toggle: `id="{id}-info-toggle"`, `aria-expanded="false"`,
  `aria-controls="{id}-info-panel"`.
- Panel: `id="{id}-info-panel"`, `class="project-info-panel"`,
  `role="region"`, `aria-labelledby="{id}-info-toggle"`,
  `aria-hidden="true"`.
- Icon strip: `aria-label="Project icons"`.
- Gallery scroller: `aria-label="Project gallery"`.
- Gallery fade: `aria-hidden="true"`.

The runtime script depends on all six toggle/panel ID pairs exactly as listed.

## View-toggle contract

- Navigation IDs: `#nav-grid`, `#nav-about`.
- Legacy header control retained: `#about-close`.
- Internal About close controls: `.about-close-trigger` (two elements).
- About heading relationship:
  `#about-section[aria-labelledby="about-page-title"]` →
  `#about-page-title`.
- Initial state:
  - Grid `aria-hidden="false"` implicitly through the visible view.
  - About has `is-hidden` and `aria-hidden="true"`.
- Runtime state classes remain `is-hidden` and `is-open`.

## Ordering exceptions that must be preserved

- `#daniel`: title → icon strip → info panel → gallery.
- Other projects: title → info panel → icon strip → gallery.
- `#daniel` gallery: scroller precedes fade.
- Other galleries: fade precedes scroller.

## Styling contract

- Project wrapper: `mx-4 mt-8 sm:mx-6`.
- Gallery classes: `.project-gallery`, `.project-gallery__scroll`,
  `.project-gallery__fade`.
- Figure width: `w-[117px]`; images preserve natural aspect ratio using
  `block h-auto w-full rounded-none`.
- All gallery images retain `loading="lazy"`.
- Project icon images remain 16×16 with
  `[image-rendering:pixelated]`.
- About remains 12px Söhne Mono with `leading-[1.35]`.
- About metadata remains
  `grid-cols-[125px_1fr] items-start gap-x-2`.
- About bullet images remain 12×12 with `mt-[3px]` and `shrink-0`.

## Content and asset baseline

- Project metadata, descriptions, image order, alt text, and counters are
  copied unchanged into structured data.
- Icon set A:
  `luna`, `casa`, `cafe`, `corazon`, `circulo`, `flechas`, `flor`, `sol`.
- Icon set B:
  `hoja`, `arco`, `bird`, `trebol`, `reloj`, `estrella`, `meteoro`, `paz`.
- Project/icon-set assignments:
  - A: `daniel`, `holzrausch`, `papayas`
  - B: `piaule`, `relicario`, `forest-edge`

## Baseline verification targets

- Articles: 6
- Toggle buttons: 6
- Info panels: 6
- Gallery scrollers: 6
- Gallery fades: 6
- Gallery figures/images/counters: 45 each
- Project icons: 48
- About bullet icons/items: 17
- About close triggers: 2

No image-modal markup or image-modal JavaScript exists in the baseline.
