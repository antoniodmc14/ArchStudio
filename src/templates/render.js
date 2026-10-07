/* ==========================================================================
   FILE: src/templates/render.js — Build-time HTML templates
   ========================================================================== */

/* --- Template utilities --- */

const { iconSets } = require("../data/projects");

const COLUMN_COPYRIGHT_CLASSES =
  "column-copyright mx-4 flex shrink-0 items-center border-t border-[#DADADA] py-2 font-mono text-[10px] font-light leading-[1.2] tracking-tight text-[#121212] sm:mx-6";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

/* --- PROJECT GRID: icons, info panels, gallery, article --- */

function renderProjectIcon(icon) {
  return `<img src="assets/icons/${escapeHtml(icon)}.svg" alt="" width="16" height="16" class="h-4 w-4 shrink-0 [image-rendering:pixelated] lg:h-3 lg:w-3" />`;
}

function renderProjectIcons(project) {
  return `<div class="mt-4 flex items-center gap-1 overflow-x-auto no-scrollbar" aria-label="Project icons">${iconSets[project.iconSet].map(renderProjectIcon).join("")}</div>`;
}

function renderInfoPanel(project) {
  const id = escapeHtml(project.id);
  const paragraphs = project.description
    .map(
      (paragraph, index) =>
        `<p${index < project.description.length - 1 ? ' class="mb-3"' : ""}>${escapeHtml(paragraph)}</p>`,
    )
    .join("");

  return `<div id="${id}-info-panel" class="project-info-panel" role="region" aria-labelledby="${id}-info-toggle" aria-hidden="true"><div class="min-h-0"><div class="max-w-prose pb-2 pt-4 text-[14px] font-light leading-[1.4] tracking-[0.01em] text-[#121212] md:max-w-[60ch] lg:text-[12px] lg:leading-[1.3]">${paragraphs}</div></div></div>`;
}

function renderGalleryFigure(project, image, index, isLcp) {
  const position = index + 1;
  const label = `${escapeHtml(project.altPrefix)} project view ${position}`;
  const src = escapeHtml(image.src);
  const width = escapeHtml(image.width);
  const height = escapeHtml(image.height);
  const loading = isLcp
    ? 'loading="eager" fetchpriority="high"'
    : 'loading="lazy" decoding="async"';
  return `<figure class="m-0 w-[117px] shrink-0 md:w-[calc(33.333%-0.35rem)] md:min-w-[calc(33.333%-0.35rem)]"><img src="${src}" width="${width}" height="${height}" style="aspect-ratio: ${width} / ${height}" alt="${label}" role="button" tabindex="0" aria-label="Open ${label}" class="block h-auto w-full cursor-pointer rounded-none" ${loading} /><span class="mt-1 block text-right font-mono text-[12px] text-[#121212] lg:text-[10px] lg:leading-none">${position}/${project.images.length}</span></figure>`;
}

function renderGallery(project, isFirstProject = false, isLastProject = false) {
  const scroll = `<div class="project-gallery__scroll" aria-label="Project gallery">${project.images.map((image, index) => renderGalleryFigure(project, image, index, isFirstProject && index === 0)).join("")}</div>`;
  const fade = '<div class="project-gallery__fade" aria-hidden="true"></div>';
  const edge = isLastProject ? " border-b-0" : "";

  return `<div class="project-gallery${edge}">${project.fadeAfterScroll ? `${scroll}${fade}` : `${fade}${scroll}`}</div>`;
}

function renderProject(project, isFirstProject = false, isLastProject = false) {
  const id = escapeHtml(project.id);
  const title = `<div class="flex items-start justify-between gap-4"><div><h2 id="project-${id}-title" class="m-0 font-light text-[14px] leading-[1.2] tracking-[0.01em] text-[#121212] lg:text-[12px] lg:leading-[1.3]">${escapeHtml(project.title)}</h2><p class="m-0 mt-1 font-light text-[14px] leading-[1.2] tracking-[0.01em] text-[#121212] lg:text-[12px] lg:leading-[1.3]">${escapeHtml(project.meta)}</p></div><button type="button" id="${id}-info-toggle" class="shrink-0 cursor-pointer border-0 bg-transparent p-0 font-light text-[14px] leading-[1.2] tracking-[0.01em] text-[#FB9836] transition-opacity hover:opacity-70 lg:text-[12px] lg:leading-[1.3]" aria-expanded="false" aria-controls="${id}-info-panel">(info)</button></div>`;
  const info = renderInfoPanel(project);
  const icons = renderProjectIcons(project);

  return `<article id="${id}" class="min-w-0 max-w-full" aria-labelledby="project-${id}-title">
<div class="mx-4 mt-8 min-w-0 max-w-full sm:mx-6">
${title}
${project.iconsBeforeInfo ? `${icons}\n${info}` : `${info}\n${icons}`}
${renderGallery(project, isFirstProject, isLastProject)}
</div>
</article>`;
}

/* --- ABOUT SECTION: metadata groups and close control --- */

const ABOUT_ICON_SIZE =
  "h-3 w-3 lg:h-[10px] lg:w-[10px] min-[1600px]:h-3 min-[1600px]:w-3 min-[1920px]:h-[13px] min-[1920px]:w-[13px]";

function renderAboutListItem(item) {
  return `<li class="mb-1 flex items-start gap-1.5 leading-[1.35] last:mb-0 lg:mb-px min-[1600px]:mb-[clamp(0.0625rem,0.2vh,0.1875rem)]"><img src="assets/icons/puntos.svg" alt="" width="12" height="12" class="mt-[3px] ${ABOUT_ICON_SIZE} shrink-0 [image-rendering:pixelated] lg:mt-[2px] min-[1600px]:mt-[3px]" /><span class="block min-w-0 break-words">${escapeHtml(item)}</span></li>`;
}

function renderAboutGroup(group, isLast = false) {
  const padBottom = isLast
    ? " pb-6 lg:pb-0 min-[1600px]:pb-0"
    : " lg:pb-0.5 min-[1600px]:pb-[clamp(0.125rem,0.35vh,0.375rem)]";
  return `<div class="mt-6 grid grid-cols-[125px_1fr] items-start gap-x-2 border-t border-[#DADADA] pt-4 md:grid-cols-2 lg:mt-0 lg:grid-cols-[minmax(9rem,max-content)_minmax(0,1fr)] lg:gap-x-1.5 lg:gap-y-1 lg:pt-3 min-[1600px]:gap-x-2 min-[1600px]:gap-y-[clamp(0.25rem,0.5vh,0.5rem)] min-[1600px]:pt-[clamp(0.875rem,0.85vh,1.25rem)] min-[1920px]:pt-[clamp(1rem,1vh,1.5rem)]${padBottom}"><div class="flex min-w-0 items-center gap-1.5 font-normal"><img src="assets/icons/${escapeHtml(group.icon)}.svg" alt="" width="12" height="12" class="${ABOUT_ICON_SIZE} shrink-0 [image-rendering:pixelated]" /><span class="min-w-0">${escapeHtml(group.title)}</span></div><ul class="m-0 min-w-0 list-none p-0">${group.items.map(renderAboutListItem).join("")}</ul></div>`;
}

function renderCloseButton() {
  return `<button type="button" class="about-close-trigger shrink-0 cursor-pointer border-0 bg-transparent p-0 font-mono text-[10px] leading-[1.2] tracking-tight font-light text-[#FB9836] transition-opacity hover:opacity-70 md:hidden">(close)</button>`;
}

function renderGridColumnCopyright(about) {
  return `<!-- ==================================================================== -->
<!-- SECTION: GRID COLUMN COPYRIGHT                                      -->
<!-- ==================================================================== -->
<div id="grid-column-copyright" class="${COLUMN_COPYRIGHT_CLASSES} view-panel lg:mt-auto min-[1600px]:pb-[clamp(0.25rem,0.5vh,0.5rem)] min-[1600px]:pt-[clamp(0.375rem,0.75vh,0.75rem)]" role="contentinfo" aria-label="Copyright"><p class="m-0">${escapeHtml(about.copyright)}</p></div>`;
}

function renderAbout(about) {
  return `<!-- ==================================================================== -->
<!-- SECTION: ABOUT VIEW                                                 -->
<!-- ==================================================================== -->
<section id="about-section" class="about-copy view-panel view-panel--about is-hidden flex min-h-dvh flex-col pt-12 font-mono text-[12px] font-light leading-[1.35] text-[#121212] lg:h-auto lg:max-h-full lg:min-h-0 lg:flex-1 lg:pt-1.5 lg:text-[10px] min-[1600px]:pt-[clamp(0.25rem,0.5vh,0.5rem)] min-[1600px]:text-[12px] min-[1600px]:leading-[1.45] min-[1920px]:leading-[1.5]" aria-labelledby="about-intro" aria-hidden="true">
<div class="no-scrollbar mx-4 min-h-0 flex-1 pt-8 sm:mx-6 lg:flex lg:flex-col lg:gap-3 lg:overflow-x-hidden lg:overflow-y-auto lg:pt-0.5 min-[1600px]:gap-[clamp(0.875rem,1.2vh,1.25rem)] min-[1600px]:pt-[clamp(0.125rem,0.35vh,0.375rem)] min-[1920px]:gap-[clamp(1rem,1.4vh,1.5rem)]">
<p id="about-intro" class="m-0 max-w-prose md:max-w-[78ch] lg:max-w-none">${escapeHtml(about.intro)}</p>
<div class="mt-6 max-w-prose lg:max-w-none">
<a href="mailto:${escapeHtml(about.email)}" class="block text-[#121212] no-underline transition-opacity hover:opacity-70">${escapeHtml(about.email)}</a>
${about.socialLabels
  .map(
    (label) =>
      `<button type="button" class="social-button block border-0 bg-transparent p-0 text-left font-mono font-light text-[#121212] transition-opacity hover:opacity-70">${escapeHtml(label)}</button>`,
  )
  .join("\n")}
</div>
${about.groups
  .map((group, index) => renderAboutGroup(group, index === about.groups.length - 1))
  .join("\n")}
</div>
<div class="${COLUMN_COPYRIGHT_CLASSES} justify-between lg:mt-auto min-[1600px]:pb-[clamp(0.25rem,0.5vh,0.5rem)] min-[1600px]:pt-[clamp(0.375rem,0.75vh,0.75rem)]">
<p class="m-0">${escapeHtml(about.aboutColumnFooter)}</p>
${renderCloseButton()}
</div>
</section>`;
}

/* --- LIGHTBOX MODAL --- */

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
</head>
<body class="bg-white text-[#121212] lg:flex lg:h-dvh lg:flex-col lg:overflow-hidden">
<!-- ==================================================================== -->
<!-- SECTION: HEADER NAVIGATION                                           -->
<!-- ==================================================================== -->
<header id="site-header" class="fixed top-0 left-0 right-0 z-20 shrink-0 bg-white font-light text-[14px] leading-tight tracking-[0.01em] text-[#121212] lg:static">
<div class="mx-4 flex items-center justify-between border-b border-[#DADADA] py-2.5 sm:mx-6">
<div class="min-w-0">
<h1 id="header-title-default" class="m-0 text-[12px] font-light leading-[1.3] tracking-[0.01em]"><a href="/" class="text-[#121212] no-underline transition-opacity hover:opacity-70">Dante Beltrán Studio</a></h1>
</div>
<nav id="header-nav-default" class="shrink-0 lg:hidden" aria-label="Main Navigation">
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
<div id="desktop-split" class="w-full max-w-full lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,65fr)_minmax(0,35fr)] lg:items-stretch lg:gap-8 lg:overflow-hidden">
<div id="grid-column" class="min-w-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:min-h-0 lg:max-w-full lg:overflow-x-hidden lg:overflow-y-auto">
<div id="grid-section" class="view-panel min-w-0 max-w-full pb-16 pt-12 lg:pt-6">
<div id="grid-audio-toggle-wrap" class="mx-4 mb-4 sm:mx-6 lg:m-0 lg:h-0 lg:min-h-0 lg:overflow-visible lg:border-0 lg:p-0">
<button id="audio-toggle" type="button" class="cursor-pointer border-0 bg-transparent p-0 font-light text-[14px] leading-[1.2] tracking-[0.01em] text-[#121212] transition-opacity hover:opacity-70 lg:fixed lg:right-4 lg:top-2.5 lg:z-[25] lg:text-[12px] lg:leading-[1.3]" aria-pressed="false">Sound (off)</button>
</div>
${projects.map((project, index) => renderProject(project, index === 0, index === projects.length - 1)).join("\n")}
</div>
${renderGridColumnCopyright(about)}
</div>
<div id="about-column" class="min-w-0 lg:flex lg:min-h-0 lg:flex-col lg:overflow-hidden lg:border-l lg:border-[#DADADA] lg:pl-6">
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
  renderPage,
};
