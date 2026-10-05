/* ==========================================================================
   FILE: src/templates/render.js — Build-time HTML templates
   ========================================================================== */

/* --- Template utilities --- */

const { iconSets } = require("../data/projects");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/* --- PROJECT GRID: icons, info panels, gallery, article --- */

function renderProjectIcon(icon) {
  return `<img src="assets/icons/${icon}.svg" alt="" width="16" height="16" class="h-4 w-4 shrink-0 [image-rendering:pixelated]" />`;
}

function renderProjectIcons(project) {
  return `<div class="mt-4 flex items-center gap-1 overflow-x-auto no-scrollbar" aria-label="Project icons">${iconSets[project.iconSet].map(renderProjectIcon).join("")}</div>`;
}

function renderInfoPanel(project) {
  const paragraphs = project.description
    .map(
      (paragraph, index) =>
        `<p${index < project.description.length - 1 ? ' class="mb-3"' : ""}>${escapeHtml(paragraph)}</p>`,
    )
    .join("");

  return `<div id="${project.id}-info-panel" class="project-info-panel" role="region" aria-labelledby="${project.id}-info-toggle" aria-hidden="true"><div class="min-h-0"><div class="max-w-prose pb-2 pt-4 text-[14px] font-light leading-[1.4] tracking-[0.01em] text-[#121212]">${paragraphs}</div></div></div>`;
}

function renderGalleryFigure(project, image, index) {
  const position = index + 1;
  return `<figure class="m-0 w-[117px] shrink-0"><img src="${image}" alt="${escapeHtml(project.altPrefix)} project view ${position}" class="block h-auto w-full cursor-pointer rounded-none" loading="lazy" /><span class="mt-1 block text-right font-mono text-[12px] text-[#121212]">${position}/${project.images.length}</span></figure>`;
}

function renderGallery(project) {
  const scroll = `<div class="project-gallery__scroll" aria-label="Project gallery">${project.images.map((image, index) => renderGalleryFigure(project, image, index)).join("")}</div>`;
  const fade = '<div class="project-gallery__fade" aria-hidden="true"></div>';

  return `<div class="project-gallery">${project.fadeAfterScroll ? `${scroll}${fade}` : `${fade}${scroll}`}</div>`;
}

function renderProject(project) {
  const title = `<div class="flex items-start justify-between gap-4"><div><h2 id="project-${project.id}-title" class="m-0 font-light text-[14px] leading-[1.2] tracking-[0.01em] text-[#121212]">${escapeHtml(project.title)}</h2><p class="m-0 mt-1 font-light text-[14px] leading-[1.2] tracking-[0.01em] text-[#121212]">${escapeHtml(project.meta)}</p></div><button type="button" id="${project.id}-info-toggle" class="shrink-0 cursor-pointer border-0 bg-transparent p-0 font-light text-[14px] leading-[1.2] tracking-[0.01em] text-[#FB9836] transition-opacity hover:opacity-70" aria-expanded="false" aria-controls="${project.id}-info-panel">(info)</button></div>`;
  const info = renderInfoPanel(project);
  const icons = renderProjectIcons(project);

  return `<article id="${project.id}" aria-labelledby="project-${project.id}-title">
<div class="mx-4 mt-8 sm:mx-6">
${title}
${project.iconsBeforeInfo ? `${icons}\n${info}` : `${info}\n${icons}`}
${renderGallery(project)}
</div>
</article>`;
}

/* --- ABOUT SECTION: metadata groups and close control --- */

function renderAboutListItem(item) {
  return `<li class="mb-1 flex items-start gap-1.5 leading-[1.35] last:mb-0"><img src="assets/icons/puntos.svg" alt="" width="12" height="12" class="mt-[3px] h-3 w-3 shrink-0 [image-rendering:pixelated]" /><span class="block min-w-0">${escapeHtml(item)}</span></li>`;
}

function renderAboutGroup(group, isLast = false) {
  const spacing = isLast ? " pb-6" : "";
  return `<div class="mt-6 grid grid-cols-[125px_1fr] items-start gap-x-2 border-t border-[#DADADA] pt-4${spacing}"><div class="flex items-center gap-1.5 font-normal"><img src="assets/icons/${group.icon}.svg" alt="" width="12" height="12" class="h-3 w-3 shrink-0 [image-rendering:pixelated]" /><span>${escapeHtml(group.title)}</span></div><ul class="m-0 min-w-0 list-none p-0">${group.items.map(renderAboutListItem).join("")}</ul></div>`;
}

function renderCloseButton(compact = false) {
  const typography = compact
    ? "text-[10px] leading-[1.2] tracking-tight"
    : "text-[12px] leading-[1.35]";
  return `<button type="button" class="about-close-trigger shrink-0 cursor-pointer border-0 bg-transparent p-0 font-mono ${typography} font-light text-[#FB9836] transition-opacity hover:opacity-70">(close)</button>`;
}

function renderAbout(about) {
  return `<!-- ==================================================================== -->
<!-- SECTION: ABOUT VIEW                                                 -->
<!-- ==================================================================== -->
<section id="about-section" class="view-panel view-panel--about is-hidden flex min-h-dvh flex-col pt-12 font-mono text-[12px] font-light leading-[1.35] text-[#121212]" aria-labelledby="about-intro" aria-hidden="true">
<div class="mx-4 flex-1 pt-8 sm:mx-6">
<p id="about-intro" class="m-0 max-w-prose">${escapeHtml(about.intro)}</p>
<div class="mt-6 max-w-prose">
<a href="mailto:${about.email}" class="block text-[#121212] no-underline transition-opacity hover:opacity-70">${escapeHtml(about.email)}</a>
${about.socialLabels
  .map(
    (label) =>
      `<button type="button" class="mt-2 block cursor-default border-0 bg-transparent p-0 text-left font-mono font-light text-[#121212]">${escapeHtml(label)}</button>`,
  )
  .join("\n")}
</div>
${about.groups
  .map((group, index) => renderAboutGroup(group, index === about.groups.length - 1))
  .join("\n")}
</div>
<div class="mx-4 flex items-center justify-between border-t border-[#DADADA] py-2 font-mono text-[10px] font-light leading-[1.2] tracking-tight text-[#121212] sm:mx-6">
<p class="m-0">${escapeHtml(about.copyright)}</p>
${renderCloseButton(true)}
</div>
</section>`;
}

/* --- FOOTER & LIGHTBOX MODAL --- */

function renderGridFooter() {
  return `<!-- ==================================================================== -->
<!-- SECTION: FIXED GRID FOOTER                                          -->
<!-- ==================================================================== -->
<footer class="fixed bottom-0 left-0 right-0 z-10 bg-white font-mono text-[10px] font-light leading-[1.2] tracking-tight text-[#121212]" aria-label="Site footer">
<div class="mx-4 border-t border-[#DADADA] py-2 sm:mx-6">
<div class="flex flex-row items-center gap-1.5 whitespace-nowrap"><img src="assets/icons/copy.svg" alt="" width="10" height="10" class="h-2.5 w-2.5 shrink-0 [image-rendering:pixelated]" /><span>2026 Dante Beltrán Studio. All Rights Reserved.</span></div>
</div>
</footer>`;
}

function renderImageViewer() {
  return `<!-- ==================================================================== -->
<!-- SECTION: LIGHTBOX MODAL (full-screen image viewer)                  -->
<!-- ==================================================================== -->
<div id="image-viewer" class="image-viewer fixed bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full flex-col bg-white/95 font-mono backdrop-blur-sm transition-opacity duration-300 ease-out" role="dialog" aria-modal="true" aria-label="Image viewer" aria-hidden="true">
<button type="button" id="image-viewer-close" class="fixed right-4 top-4 z-50 border-0 bg-transparent p-0 text-[14px] font-light leading-[1.2] tracking-[0.01em] text-[#FB9836] transition-opacity hover:opacity-70" aria-label="Close image viewer">(x)</button>
<button type="button" id="image-viewer-prev" class="font-pixel fixed left-4 top-1/2 z-50 -translate-y-1/2 border-0 bg-transparent p-2 text-[24px] leading-none text-[#121212] transition-opacity hover:opacity-70 sm:text-[32px]" aria-label="Previous image">&lt;</button>
<button type="button" id="image-viewer-next" class="font-pixel fixed right-4 top-1/2 z-50 -translate-y-1/2 border-0 bg-transparent p-2 text-[24px] leading-none text-[#121212] transition-opacity hover:opacity-70 sm:text-[32px]" aria-label="Next image">&gt;</button>
<p id="image-viewer-counter" class="pointer-events-auto fixed bottom-6 left-1/2 z-50 m-0 -translate-x-1/2 font-mono text-[12px] font-light leading-[1.35] text-[#121212]" aria-live="polite"></p>
<div id="image-viewer-stage" class="relative z-10 h-full w-full min-h-0 flex-1">
<div id="image-viewer-track" class="flex h-full w-full snap-x snap-mandatory scroll-smooth overflow-x-auto no-scrollbar"></div>
</div>
</div>`;
}

/* --- PAGE COMPOSITION: document shell and view assembly --- */

function renderPage(projects, about) {
  return `<!DOCTYPE html>
<!-- Generated by "npm run build:html". Edit src/data and src/templates instead. -->
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Dante Beltrán Studio</title>
<link rel="stylesheet" href="dist/css/main.css" />
<style>
  /* Desktop split (≥1024px). Mobile + tablet unchanged — no build required. */
  .about-column-heading {
    display: none;
  }

  @media (min-width: 1024px) {
    #header-nav-default {
      display: none !important;
    }

    #grid-audio-toggle-wrap {
      height: 0 !important;
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: visible !important;
      border: none !important;
    }

    #audio-toggle {
      position: fixed;
      z-index: 25;
      top: 0.625rem;
      right: 1rem;
      font-size: 12px !important;
      line-height: 1.3 !important;
    }

    .about-column-heading {
      display: block;
      margin: 0 0 0.375rem;
      padding: 0;
      font-size: 10px !important;
      line-height: 1.4 !important;
    }

    #desktop-split {
      box-sizing: border-box;
      display: grid;
      grid-template-columns: minmax(0, 65fr) minmax(0, 35fr);
      align-items: start;
      gap: 2rem;
      width: 100%;
      max-width: 100%;
      margin-top: 3rem;
    }

    #grid-column {
      min-width: 0;
      max-width: 100%;
      overflow-x: hidden;
    }

    #grid-column,
    #grid-column h1,
    #grid-column h2,
    #grid-column h3,
    #grid-column p,
    #grid-column span,
    #grid-column a,
    #grid-column button,
    #grid-column .project-info-panel {
      font-size: 12px !important;
      line-height: 1.3 !important;
    }

    #grid-column .project-icon,
    #grid-column [data-project-icons] img,
    #grid-column [data-project-icons] svg,
    #grid-column [aria-label="Project icons"] img {
      width: 12px !important;
      height: 12px !important;
    }

    #grid-column .project-gallery figure figcaption,
    #grid-column .project-gallery [data-counter],
    #grid-column .project-gallery .image-counter,
    #grid-column .project-gallery figure > span {
      font-size: 10px !important;
      line-height: 1 !important;
    }

    #about-column {
      min-width: 0;
      max-width: 100%;
      position: sticky;
      top: 3rem;
      height: calc(100vh - 3rem);
      align-self: start;
      border-left: 1px solid #DADADA;
      padding-left: 1.5rem;
      box-sizing: border-box;
    }

    #about-column,
    #about-column *,
    #about-section,
    #about-section * {
      overflow: hidden !important;
      overflow-y: hidden !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }

    #about-column::-webkit-scrollbar,
    #about-column *::-webkit-scrollbar,
    #about-section::-webkit-scrollbar,
    #about-section *::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }

    #about-column,
    #about-column p,
    #about-column a,
    #about-column li,
    #about-column span,
    #about-column div {
      font-size: 10px !important;
      line-height: 1.4 !important;
    }

    #grid-section,
    #grid-section > article,
    #grid-section > article > div {
      min-width: 0;
      max-width: 100%;
    }

    #grid-section.view-panel,
    #grid-section.view-panel.is-hidden {
      display: block !important;
      opacity: 1 !important;
      padding-top: 1.5rem !important;
    }

    #about-section.view-panel,
    #about-section.view-panel.is-hidden {
      display: flex !important;
      flex-direction: column;
      min-height: 0;
      height: 100%;
      opacity: 1 !important;
      padding-top: 0.375rem;
    }

    #about-column #about-section > div.flex-1 {
      padding-top: 0.125rem;
      min-height: 0;
    }

    #about-column #about-section .max-w-prose {
      max-width: none;
    }

    #about-column #about-section > div.flex-1 > .mt-6 {
      margin-top: 1.25rem;
    }

    #about-column #about-section > div.flex-1 > div.mt-6.grid {
      padding-top: 1rem;
      grid-template-columns: 6.25rem minmax(0, 1fr);
      gap-x: 0.375rem;
    }

    #about-column #about-section > div.flex-1 > div.mt-6.grid.pb-6 {
      padding-bottom: 0.125rem;
    }

    #about-column #about-section li.mb-1 {
      margin-bottom: 0.0625rem;
    }

    #about-column #about-section > div.flex-1 > div.mt-6.max-w-prose .mt-2 {
      margin-top: 0.0625rem;
    }

    #about-column #about-section > div.flex-1 img.h-3 {
      width: 10px;
      height: 10px;
    }

    #about-column #about-section > div.flex-1 img.mt-\[3px\] {
      margin-top: 2px;
    }

    #about-column #about-section > div.border-t:last-of-type {
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
    }

    #grid-section .project-gallery__scroll {
      scroll-snap-type: none !important;
      scroll-behavior: auto !important;
    }

    #grid-section footer[aria-label="Site footer"] {
      position: static;
    }
  }
</style>
</head>
<body class="bg-white text-[#121212]">
<!-- ==================================================================== -->
<!-- SECTION: FIXED HEADER NAVIGATION                                    -->
<!-- ==================================================================== -->
<header id="site-header" class="fixed top-0 left-0 right-0 z-20 bg-white font-light text-[14px] leading-tight tracking-[0.01em] text-[#121212]">
<div class="mx-4 flex items-center justify-between border-b border-[#DADADA] py-2.5 sm:mx-6">
<div class="min-w-0">
<h1 id="header-title-default" class="m-0 text-[14px] font-light leading-tight tracking-[0.01em]"><a href="/" class="text-[#121212] no-underline transition-opacity hover:opacity-70">Dante Beltrán Studio</a></h1>
</div>
<nav id="header-nav-default" class="shrink-0" aria-label="Main Navigation">
<ul class="m-0 flex list-none items-center gap-6 p-0 sm:gap-8">
<li><a href="#grid-section" id="nav-grid" class="nav-view-link text-[#FB9836] no-underline transition-opacity hover:opacity-70">Grid</a></li>
<li><a href="#about-section" id="nav-about" class="nav-view-link text-[#121212] no-underline transition-opacity hover:opacity-70">About</a></li>
</ul>
</nav>
</div>
</header>
<!-- ==================================================================== -->
<!-- SECTION: PROJECT GRID                                               -->
<!-- ==================================================================== -->
<div id="desktop-split" class="w-full max-w-full overflow-x-hidden">
<div id="grid-column" class="min-w-0">
<div id="grid-section" class="view-panel pb-16 pt-12">
<div id="grid-audio-toggle-wrap" class="mx-4 mb-4 sm:mx-6">
<button id="audio-toggle" type="button" class="cursor-pointer border-0 bg-transparent p-0 font-light text-[14px] leading-[1.2] tracking-[0.01em] text-[#121212] transition-opacity hover:opacity-70">Sound (off)</button>
</div>
${projects.map(renderProject).join("\n")}
${renderGridFooter()}
</div>
</div>
<div id="about-column" class="min-w-0">
<p class="about-column-heading m-0 font-mono font-light text-[#121212]">About</p>
${renderAbout(about)}
</div>
</div>
${renderImageViewer()}
<audio id="bg-audio" loop preload="none">
<source src="assets/audio/ambient.mp3" type="audio/mpeg" />
</audio>
<!-- ==================================================================== -->
<!-- SECTION: RUNTIME SCRIPTS                                            -->
<!-- ==================================================================== -->
<script src="src/js/main.js" defer></script>
</body>
</html>
`;
}

module.exports = {
  renderAboutGroup,
  renderAboutListItem,
  renderGallery,
  renderGalleryFigure,
  renderGridFooter,
  renderPage,
  renderProject,
};
