/* ==========================================================================
   FILE: src/js/main.js — Grid, About navigation, and Lightbox runtime
   ========================================================================== */

/* ==========================================================================
   01. STATE & CONFIGURATION
   ========================================================================== */

function initProjectInfoToggle(toggleId, panelId) {
  const toggle = document.getElementById(toggleId);
  const panel = document.getElementById(panelId);

  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.toggle("is-open");
    toggle.textContent = isOpen ? "(X)" : "(info)";
    toggle.setAttribute("aria-expanded", String(isOpen));
    panel.setAttribute("aria-hidden", String(!isOpen));
  });
}

/* ==========================================================================
   02. NAVIGATION & HEADER CONTROLLER
   ========================================================================== */

function initAboutView() {
  const gridSection = document.getElementById("grid-section");
  const aboutSection = document.getElementById("about-section");
  const navAbout = document.getElementById("nav-about");
  const navGrid = document.getElementById("nav-grid");
  const aboutCloseTriggers = document.querySelectorAll(".about-close-trigger");
  const gridCopyright = document.getElementById("grid-column-copyright");
  const desktopQuery = window.matchMedia("(min-width: 1024px)");

  if (!gridSection || !aboutSection) return;

  const isDesktop = () => desktopQuery.matches;

  const setNavActive = (isAbout) => {
    if (navGrid) {
      navGrid.classList.toggle("text-[#FB9836]", !isAbout);
      navGrid.classList.toggle("text-[#121212]", isAbout);
      if (!isAbout) {
        navGrid.setAttribute("aria-current", "page");
      } else {
        navGrid.removeAttribute("aria-current");
      }
    }
    if (navAbout) {
      navAbout.classList.toggle("text-[#FB9836]", isAbout);
      navAbout.classList.toggle("text-[#121212]", !isAbout);
      if (isAbout) {
        navAbout.setAttribute("aria-current", "page");
      } else {
        navAbout.removeAttribute("aria-current");
      }
    }
  };

  const setGridCopyrightVisible = (shown) => {
    if (!gridCopyright) return;
    gridCopyright.classList.toggle("is-hidden", !shown);
    gridCopyright.setAttribute("aria-hidden", String(!shown));
  };

  const showBothDesktop = () => {
    gridSection.classList.remove("is-hidden");
    aboutSection.classList.remove("is-hidden");
    gridSection.setAttribute("aria-hidden", "false");
    aboutSection.setAttribute("aria-hidden", "false");
    setGridCopyrightVisible(true);
  };

  const showGrid = () => {
    if (isDesktop()) {
      showBothDesktop();
      setNavActive(false);
      history.replaceState(null, "", "#grid-section");
      document.getElementById("grid-column")?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    gridSection.classList.remove("is-hidden");
    aboutSection.classList.add("is-hidden");
    gridSection.setAttribute("aria-hidden", "false");
    aboutSection.setAttribute("aria-hidden", "true");
    setGridCopyrightVisible(true);
    setNavActive(false);
    history.replaceState(null, "", "#grid-section");
  };

  const showAbout = () => {
    if (isDesktop()) {
      showBothDesktop();
      setNavActive(true);
      history.replaceState(null, "", "#about-section");
      document.querySelector("#about-section > div.flex-1")?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    aboutSection.classList.remove("is-hidden");
    gridSection.classList.add("is-hidden");
    aboutSection.setAttribute("aria-hidden", "false");
    gridSection.setAttribute("aria-hidden", "true");
    setGridCopyrightVisible(false);
    setNavActive(true);
    history.replaceState(null, "", "#about-section");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const syncLayoutFromHash = () => {
    if (isDesktop()) {
      showBothDesktop();
      if (window.location.hash === "#about-section") {
        setNavActive(true);
      } else {
        setNavActive(false);
      }
      return;
    }

    if (window.location.hash === "#about-section") {
      showAbout();
    } else {
      showGrid();
    }
  };

  navAbout?.addEventListener("click", (event) => {
    event.preventDefault();
    showAbout();
  });

  navGrid?.addEventListener("click", (event) => {
    event.preventDefault();
    showGrid();
  });

  aboutCloseTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      showGrid();
    });
  });

  const onDesktopChange = () => syncLayoutFromHash();
  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", onDesktopChange);
  } else if (typeof desktopQuery.addListener === "function") {
    desktopQuery.addListener(onDesktopChange);
  }

  syncLayoutFromHash();
}

/* ==========================================================================
   04. ZOOM & PAN INTERACTION
   ========================================================================== */

function createLightboxZoomController(image, onZoomChange) {
  const ZOOM_SCALE = 2.5;
  const state = { scale: 1, tx: 0, ty: 0 };
  let pinchStartDistance = 0;
  let pinchStartScale = 1;
  let pinchActive = false;
  let panAnchor = null;
  let lastTapTime = 0;
  let isDragging = false;
  let dragMoved = false;

  const apply = () => {
    image.style.transform = `translate3d(${state.tx}px, ${state.ty}px, 0) scale(${state.scale})`;
    image.classList.toggle("cursor-zoom-in", state.scale <= 1.01);
    image.classList.toggle("cursor-zoom-out", state.scale > 1.01);
    image.classList.toggle("cursor-grab", state.scale > 1.01 && !isDragging);
    onZoomChange?.();
  };

  const reset = () => {
    state.scale = 1;
    state.tx = 0;
    state.ty = 0;
    pinchActive = false;
    pinchStartDistance = 0;
    panAnchor = null;
    isDragging = false;
    dragMoved = false;
    image.style.transformOrigin = "center center";
    image.style.transition = "transform 0.2s ease-out";
    apply();
  };

  const isZoomed = () => state.scale > 1.01;

  const clampPan = () => {
    const width = image.offsetWidth;
    const height = image.offsetHeight;
    const maxX = Math.max(0, (width * state.scale - width) / 2);
    const maxY = Math.max(0, (height * state.scale - height) / 2);
    state.tx = Math.max(-maxX, Math.min(maxX, state.tx));
    state.ty = Math.max(-maxY, Math.min(maxY, state.ty));
  };

  const toggleZoom = (clientX, clientY) => {
    image.style.transition = "transform 0.2s ease-out";
    if (state.scale > 1.01) {
      reset();
      return;
    }

    const rect = image.getBoundingClientRect();
    const originX = ((clientX - rect.left) / rect.width) * 100;
    const originY = ((clientY - rect.top) / rect.height) * 100;
    image.style.transformOrigin = `${originX}% ${originY}%`;
    state.scale = ZOOM_SCALE;
    state.tx = 0;
    state.ty = 0;
    apply();
  };

  const touchDistance = (touches) => {
    const first = touches[0];
    const second = touches[1];
    return Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
  };

  image.addEventListener("click", (event) => {
    event.stopPropagation();
    if (dragMoved) {
      dragMoved = false;
      return;
    }
    toggleZoom(event.clientX, event.clientY);
  });

  image.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length === 2) {
        pinchActive = true;
        pinchStartDistance = touchDistance(event.touches);
        pinchStartScale = state.scale;
        image.style.transition = "none";
        event.stopPropagation();
        return;
      }

      if (event.touches.length === 1 && state.scale > 1.01) {
        const touch = event.touches[0];
        panAnchor = { x: touch.clientX - state.tx, y: touch.clientY - state.ty };
        isDragging = true;
        dragMoved = false;
        image.style.transition = "none";
        event.stopPropagation();
      }
    },
    { passive: true },
  );

  image.addEventListener(
    "touchmove",
    (event) => {
      if (event.touches.length === 2 && pinchStartDistance > 0) {
        event.preventDefault();
        event.stopPropagation();
        const distance = touchDistance(event.touches);
        state.scale = Math.min(
          4,
          Math.max(1, pinchStartScale * (distance / pinchStartDistance)),
        );
        if (state.scale <= 1.01) {
          state.scale = 1;
          state.tx = 0;
          state.ty = 0;
        }
        clampPan();
        apply();
        return;
      }

      if (event.touches.length === 1 && panAnchor && state.scale > 1.01) {
        event.preventDefault();
        event.stopPropagation();
        const touch = event.touches[0];
        state.tx = touch.clientX - panAnchor.x;
        state.ty = touch.clientY - panAnchor.y;
        clampPan();
        apply();
        dragMoved = true;
      }
    },
    { passive: false },
  );

  image.addEventListener(
    "touchend",
    (event) => {
      if (event.touches.length === 0) {
        if (!pinchActive && !dragMoved && event.changedTouches.length === 1) {
          const touch = event.changedTouches[0];
          const now = Date.now();
          if (now - lastTapTime < 300) {
            toggleZoom(touch.clientX, touch.clientY);
            lastTapTime = 0;
          } else {
            lastTapTime = now;
          }
        }

        if (state.scale < 1.05) {
          reset();
        } else {
          image.style.transition = "transform 0.2s ease-out";
          apply();
        }

        pinchActive = false;
        pinchStartDistance = 0;
        panAnchor = null;
        isDragging = false;
      }
    },
    { passive: true },
  );

  image.addEventListener("mousedown", (event) => {
    if (state.scale <= 1.01) return;

    event.preventDefault();
    panAnchor = { x: event.clientX - state.tx, y: event.clientY - state.ty };
    isDragging = true;
    dragMoved = false;
    image.style.transition = "none";
    image.classList.add("cursor-grabbing");

    const onMove = (moveEvent) => {
      state.tx = moveEvent.clientX - panAnchor.x;
      state.ty = moveEvent.clientY - panAnchor.y;
      clampPan();
      apply();
      dragMoved = true;
    };

    const onUp = () => {
      isDragging = false;
      image.classList.remove("cursor-grabbing");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      image.style.transition = "transform 0.2s ease-out";
      apply();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  });

  apply();

  return { reset, isZoomed };
}

/* ==========================================================================
   03. LIGHTBOX & HORIZONTAL TRACK
   ========================================================================== */

function initImageViewer() {
  const viewer = document.getElementById("image-viewer");
  const viewerTrack = document.getElementById("image-viewer-track");
  const viewerStage = document.getElementById("image-viewer-stage");
  const closeButton = document.getElementById("image-viewer-close");
  const prevButton = document.getElementById("image-viewer-prev");
  const nextButton = document.getElementById("image-viewer-next");
  const counterEl = document.getElementById("image-viewer-counter");
  const gridSection = document.getElementById("grid-section");

  if (
    !viewer ||
    !viewerTrack ||
    !viewerStage ||
    !closeButton ||
    !prevButton ||
    !nextButton ||
    !counterEl ||
    !gridSection
  ) {
    return;
  }

  let isOpen = false;
  let returnFocusTo = null;
  let currentIndex = 0;
  let displayedCounterIndex = null;
  let scrollEndTimer = 0;
  let isProgrammaticScroll = false;
  let zoomControllers = [];

  /* --- Index, counter, and infinite-loop scroll helpers --- */

  const getSlideWidth = () => viewerTrack.clientWidth;

  const getRealSlideCount = () => {
    const domSlides = viewerTrack.children.length;
    if (domSlides <= 2) return domSlides;
    return domSlides - 2;
  };

  const normalizeLogicalIndex = (index, total) => {
    if (!total) return 0;
    return ((index % total) + total) % total;
  };

  const getDomIndexFromLogical = (logicalIndex) => {
    const realCount = getRealSlideCount();
    if (realCount <= 1) return 0;
    return logicalIndex + 1;
  };

  const getLogicalIndexFromDom = (domIndex) => {
    const realCount = getRealSlideCount();
    if (realCount <= 1) return 0;
    if (domIndex <= 0) return realCount - 1;
    if (domIndex >= realCount + 1) return 0;
    return domIndex - 1;
  };

  const syncFromScrollPosition = () => {
    const realCount = getRealSlideCount();
    const slideWidth = getSlideWidth();
    if (!realCount || !slideWidth) return;

    const domIndex = Math.round(viewerTrack.scrollLeft / slideWidth);

    if (realCount > 1 && domIndex === 0) {
      viewerTrack.scrollTo({ left: realCount * slideWidth, behavior: "auto" });
      applyIndex(realCount - 1);
      return;
    }

    if (realCount > 1 && domIndex === realCount + 1) {
      viewerTrack.scrollTo({ left: slideWidth, behavior: "auto" });
      applyIndex(0);
      return;
    }

    applyIndex(getLogicalIndexFromDom(domIndex));
  };

  const syncTrackScrollLock = () => {
    const locked = zoomControllers.some((controller) => controller.isZoomed());
    if (locked) {
      viewerTrack.style.overflowX = "hidden";
      viewerTrack.style.scrollSnapType = "none";
    } else {
      viewerTrack.style.overflowX = "";
      viewerTrack.style.scrollSnapType = "";
    }
  };

  const resetAllZooms = () => {
    zoomControllers.forEach((controller) => controller.reset());
    syncTrackScrollLock();
  };

  const isTrackScrollLocked = () =>
    zoomControllers.some((controller) => controller.isZoomed());

  const renderCounter = () => {
    const total = getRealSlideCount();
    if (!total || !isOpen) {
      if (displayedCounterIndex !== null) {
        counterEl.textContent = "";
        displayedCounterIndex = null;
      }
      return;
    }

    if (displayedCounterIndex === currentIndex) return;

    displayedCounterIndex = currentIndex;
    counterEl.textContent = `${currentIndex + 1}/${total}`;
  };

  const applyIndex = (index) => {
    const total = getRealSlideCount();
    if (!total) return;

    currentIndex = normalizeLogicalIndex(index, total);
    renderCounter();
  };

  const finishScrollSync = () => {
    if (!isOpen) return;

    if (isProgrammaticScroll) {
      const slideWidth = getSlideWidth();
      if (!slideWidth) return;

      const expectedLeft = getDomIndexFromLogical(currentIndex) * slideWidth;
      if (Math.abs(viewerTrack.scrollLeft - expectedLeft) > 2) {
        scheduleScrollEndSync();
        return;
      }

      isProgrammaticScroll = false;
      return;
    }

    const previousIndex = currentIndex;
    syncFromScrollPosition();
    if (previousIndex !== currentIndex) {
      resetAllZooms();
    }
  };

  const scheduleScrollEndSync = () => {
    window.clearTimeout(scrollEndTimer);
    scrollEndTimer = window.setTimeout(finishScrollSync, 150);
  };

  const scrollToIndex = (index, behavior = "smooth") => {
    const realCount = getRealSlideCount();
    if (!realCount) return;

    resetAllZooms();

    const previousIndex = currentIndex;
    const targetIndex = normalizeLogicalIndex(index, realCount);
    applyIndex(targetIndex);

    const slideWidth = getSlideWidth();
    if (!slideWidth) return;

    let domTarget = getDomIndexFromLogical(targetIndex);
    if (realCount > 1) {
      if (previousIndex === realCount - 1 && targetIndex === 0) {
        domTarget = realCount + 1;
      } else if (previousIndex === 0 && targetIndex === realCount - 1) {
        domTarget = 0;
      }
    }

    if (behavior === "smooth") {
      isProgrammaticScroll = true;
    }

    viewerTrack.scrollTo({
      left: domTarget * slideWidth,
      behavior,
    });

    if (behavior === "auto") {
      isProgrammaticScroll = false;
    } else {
      scheduleScrollEndSync();
    }
  };

  const stepGallery = (delta) => {
    if (getRealSlideCount() < 2) return;
    scrollToIndex(currentIndex + delta);
  };

  /* --- Slide DOM, open/close lifecycle --- */

  const buildSlides = (images) => {
    viewerTrack.replaceChildren();
    zoomControllers = [];

    const createSlide = (sourceImage) => {
      const slide = document.createElement("div");
      slide.className =
        "image-viewer-slide flex h-full min-w-full snap-center items-center justify-center p-4";

      const frame = document.createElement("div");
      frame.className =
        "image-viewer-zoom-frame flex max-h-[80vh] max-w-[90vw] items-center justify-center overflow-hidden";

      const image = document.createElement("img");
      const width = sourceImage.naturalWidth || Number(sourceImage.getAttribute("width"));
      const height = sourceImage.naturalHeight || Number(sourceImage.getAttribute("height"));
      image.src = sourceImage.currentSrc || sourceImage.src;
      image.alt = sourceImage.alt || "";
      if (width) image.width = width;
      if (height) image.height = height;
      image.className =
        "lightbox-image max-h-[80vh] max-w-[90vw] cursor-zoom-in select-none object-contain will-change-transform";
      image.draggable = false;

      zoomControllers.push(
        createLightboxZoomController(image, syncTrackScrollLock),
      );

      frame.appendChild(image);
      slide.appendChild(frame);
      return slide;
    };

    if (images.length <= 1) {
      if (images[0]) {
        viewerTrack.appendChild(createSlide(images[0]));
      }
    } else {
      viewerTrack.appendChild(createSlide(images[images.length - 1]));
      images.forEach((sourceImage) => {
        viewerTrack.appendChild(createSlide(sourceImage));
      });
      viewerTrack.appendChild(createSlide(images[0]));
    }

    syncTrackScrollLock();
  };

  const openViewer = (image) => {
    const gallery = image.closest(".project-gallery");
    if (!gallery) return;

    const galleryImages = Array.from(gallery.querySelectorAll("img"));
    currentIndex = galleryImages.indexOf(image);
    if (currentIndex < 0) currentIndex = 0;
    returnFocusTo = image;

    buildSlides(galleryImages);
    viewer.classList.add("is-open");
    viewer.setAttribute("aria-hidden", "false");
    document.getElementById("desktop-split")?.setAttribute("inert", "");
    document.getElementById("site-header")?.setAttribute("inert", "");
    document.body.classList.add("overflow-hidden");
    isOpen = true;

    requestAnimationFrame(() => {
      scrollToIndex(currentIndex, "auto");
      closeButton.focus();
    });
  };

  const closeViewer = () => {
    if (!isOpen) return;
    const trigger = returnFocusTo;
    returnFocusTo = null;
    viewer.classList.remove("is-open");
    viewer.setAttribute("aria-hidden", "true");
    document.getElementById("desktop-split")?.removeAttribute("inert");
    document.getElementById("site-header")?.removeAttribute("inert");
    document.body.classList.remove("overflow-hidden");
    window.clearTimeout(scrollEndTimer);
    scrollEndTimer = 0;
    isProgrammaticScroll = false;
    resetAllZooms();
    zoomControllers = [];
    viewerTrack.replaceChildren();
    viewerTrack.style.overflowX = "";
    viewerTrack.style.scrollSnapType = "";
    currentIndex = 0;
    displayedCounterIndex = null;
    isOpen = false;
    counterEl.textContent = "";
    if (trigger instanceof HTMLElement) trigger.focus();
  };

  const lightboxFocusables = () =>
    [closeButton, prevButton, nextButton].filter(
      (el) => !el.hasAttribute("disabled"),
    );

  const trapLightboxFocus = (event) => {
    if (event.key !== "Tab") return;
    const focusables = lightboxFocusables();
    if (!focusables.length) {
      event.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (event.shiftKey) {
      if (active === first || !viewer.contains(active)) {
        event.preventDefault();
        last.focus();
      }
      return;
    }
    if (active === last || !viewer.contains(active)) {
      event.preventDefault();
      first.focus();
    }
  };

  const isViewerControl = (target) =>
    target === closeButton ||
    target === prevButton ||
    target === nextButton ||
    closeButton.contains(target) ||
    prevButton.contains(target) ||
    nextButton.contains(target);

  const shouldIgnoreBackgroundClose = (target) => {
    if (isViewerControl(target)) return true;
    if (counterEl.contains(target)) return true;
    if (target.closest("#image-viewer-track img")) return true;
    return false;
  };

  /* --- Lightbox event listeners (within initImageViewer) --- */

  const openFromThumbnail = (image) => {
    if (!image) return;
    openViewer(image);
  };

  gridSection.addEventListener("click", (event) => {
    const image = event.target.closest(".project-gallery img");
    if (!image) return;
    event.preventDefault();
    openFromThumbnail(image);
  });

  gridSection.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const image = event.target.closest(".project-gallery img");
    if (!image) return;
    event.preventDefault();
    openFromThumbnail(image);
  });

  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    closeViewer();
  });

  prevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    stepGallery(-1);
  });

  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    stepGallery(1);
  });

  counterEl.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  viewer.addEventListener("click", (event) => {
    if (shouldIgnoreBackgroundClose(event.target)) return;
    closeViewer();
  });

  viewerTrack.addEventListener(
    "scroll",
    () => {
      if (!isOpen) return;
      scheduleScrollEndSync();
    },
    { passive: true },
  );

  viewerTrack.addEventListener(
    "scrollend",
    () => {
      if (!isOpen) return;
      window.clearTimeout(scrollEndTimer);

      if (isProgrammaticScroll) {
        isProgrammaticScroll = false;
        return;
      }

      const previousIndex = currentIndex;
      syncFromScrollPosition();
      if (previousIndex !== currentIndex) {
        resetAllZooms();
      }
    },
    { passive: true },
  );

  viewerTrack.addEventListener(
    "wheel",
    (event) => {
      if (!isOpen) return;
      if (isTrackScrollLocked()) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();
      viewerTrack.scrollLeft += event.deltaY;
    },
    { passive: false },
  );

  window.addEventListener("resize", () => {
    if (!isOpen) return;
    scrollToIndex(currentIndex, "auto");
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeViewer();
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepGallery(-1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepGallery(1);
      return;
    }

    trapLightboxFocus(event);
  });
}

/* ==========================================================================
   05. DESKTOP GALLERY POINTER DRAG (≥1024px)
   ========================================================================== */

function initDesktopGalleryDrag() {
  const galleries = document.querySelectorAll(
    "#grid-section .project-gallery__scroll",
  );

  if (window.innerWidth < 1024) {
    galleries.forEach((gallery) => {
      gallery.style.cursor = "";
      gallery.style.removeProperty("user-select");
    });
    return;
  }

  galleries.forEach((gallery) => {
    if (gallery.dataset.desktopDragBound === "true") return;
    gallery.dataset.desktopDragBound = "true";

    const images = gallery.querySelectorAll("img");
    images.forEach((img) => {
      img.draggable = false;
      img.addEventListener("dragstart", (event) => event.preventDefault());
    });

    let isPointerDown = false;
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let dragDistance = 0;

    gallery.style.cursor = "grab";

    gallery.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;

      isPointerDown = true;
      isDragging = false;
      startX = event.clientX;
      startScrollLeft = gallery.scrollLeft;
      dragDistance = 0;
    });

    gallery.addEventListener("pointermove", (event) => {
      if (!isPointerDown) return;

      const deltaX = event.clientX - startX;
      dragDistance = Math.abs(deltaX);

      if (dragDistance > 5) {
        isDragging = true;
        gallery.style.cursor = "grabbing";
        gallery.style.userSelect = "none";
        gallery.scrollLeft = startScrollLeft - deltaX;
      }
    });

    const stopDrag = () => {
      isPointerDown = false;
      gallery.style.cursor = "grab";
      gallery.style.removeProperty("user-select");

      setTimeout(() => {
        isDragging = false;
      }, 50);
    };

    gallery.addEventListener("pointerup", stopDrag);
    gallery.addEventListener("pointercancel", stopDrag);
    gallery.addEventListener("pointerleave", stopDrag);

    gallery.addEventListener(
      "click",
      (event) => {
        if (dragDistance > 5 || isDragging) {
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
        }
      },
      true,
    );
  });
}

/* ==========================================================================
   06. EVENT LISTENERS & INIT
   ========================================================================== */

function initSocialButtons() {
  document.querySelectorAll("#about-section .social-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
}

function initAmbientAudioToggle() {
  const audio = document.getElementById("bg-audio");
  const audioToggle = document.getElementById("audio-toggle");

  if (!audio || !audioToggle) return;

  audio.volume = 0.5;

  audioToggle.addEventListener("click", () => {
    if (audio.paused) {
      audio.volume = 0.5;
      audio
        .play()
        .then(() => {
          audioToggle.textContent = "Sound (on)";
          audioToggle.setAttribute("aria-pressed", "true");
        })
        .catch((err) => console.error("Audio playback error:", err));
    } else {
      audio.pause();
      audioToggle.textContent = "Sound (off)";
      audioToggle.setAttribute("aria-pressed", "false");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initAmbientAudioToggle();
  initSocialButtons();
  document.querySelectorAll("#grid-section button[aria-controls]").forEach((toggle) => {
    const panelId = toggle.getAttribute("aria-controls");
    if (!toggle.id || !panelId) return;
    initProjectInfoToggle(toggle.id, panelId);
  });
  initAboutView();
  initImageViewer();
  initDesktopGalleryDrag();
});

window.addEventListener("resize", initDesktopGalleryDrag);
