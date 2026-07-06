import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const LOGO_PATH_DATA =
  'M108.965 17.6077C195.9 -23.0772 299.303 14.4975 339.931 101.558C380.419 188.316 343.285 291.435 256.993 332.413L249.775 316.941L249.351 316.033L248.445 316.458C161.509 357.143 58.1065 319.568 17.478 232.507C-23.0092 145.749 14.1253 42.6205 100.417 1.64188L107.635 17.1243L108.058 18.0315L108.965 17.6077ZM130.992 64.805C79.1277 89.08 56.7283 150.857 80.9683 202.802C105.068 254.434 166.181 276.905 217.865 253.313L225.088 268.788L225.511 269.696L226.418 269.271C278.283 244.995 300.681 183.219 276.442 131.274C252.342 79.6413 191.228 57.169 139.544 80.762L132.322 65.2874L131.898 64.3802L130.992 64.805Z';

const LOGO_WIDTH = 358;
const LOGO_HEIGHT = 334;
const LOGO_CENTER_X = 179;
const LOGO_CENTER_Y = 167;
const HERO_SCALE_TARGET = 0.14;
const HERO_CONTENT_SCROLL = 0.75;
const HERO_LOGO_FADE_DURATION = 0.45;
const HERO_LOGO_TRANSITION = 0.75;

export function initAnimations() {
  if (typeof window.__saloAnimationCleanup === 'function') {
    window.__saloAnimationCleanup();
  }

  const cleanupTasks = [];
  const canvas = document.getElementById('background-canvas');
  const hero = document.querySelector('.HomeHero');
  const background = document.getElementById('background');

  if (!canvas || !hero) return;

  const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
  if (!ctx) return;

  const path = new Path2D(LOGO_PATH_DATA);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rings = [
    { scale: 1, rotate: 0, opacity: 1 },
    { scale: 1.05, rotate: 3, opacity: 0.3 },
    { scale: 1.1025, rotate: 6, opacity: 0.2 },
    { scale: 1.157625, rotate: 9, opacity: 0.1 },
  ];
  const initialRings = rings.map((ring) => ({ ...ring }));
  const canvasState = { globalRotation: 0 };
  let rafId = null;
  let drawQueued = false;

  function getLogoScale() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const targetSize = width <= 1023 ? width * 1.2 : Math.min(height * 0.75, width * 0.85);
    return targetSize / Math.max(LOGO_WIDTH, LOGO_HEIGHT);
  }

  function resizeCanvas() {
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    syncLogoDimensions();
    queueDraw();
  }

  function syncLogoDimensions() {
    const scale = getLogoScale() * rings[0].scale;
    document.body.style.setProperty('--logo-width', `${LOGO_WIDTH * scale}px`);
    document.body.style.setProperty('--logo-height', `${LOGO_HEIGHT * scale}px`);
  }

  function drawCanvas() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate((canvasState.globalRotation * Math.PI) / 180);

    const logoScale = getLogoScale();
    for (let index = rings.length - 1; index >= 0; index -= 1) {
      const ring = rings[index];
      if (ring.opacity < 0.001) continue;

      const scale = ring.scale * logoScale;
      ctx.save();
      ctx.globalAlpha = ring.opacity;
      ctx.rotate((ring.rotate * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.translate(-LOGO_CENTER_X, -LOGO_CENTER_Y);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1 / scale;
      ctx.stroke(path);
      ctx.restore();
    }

    ctx.restore();
  }

  function queueDraw() {
    if (drawQueued) return;
    drawQueued = true;
    rafId = requestAnimationFrame(() => {
      drawCanvas();
      drawQueued = false;
      rafId = null;
    });
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  cleanupTasks.push(() => window.removeEventListener('resize', resizeCanvas));

  let mouseTween = null;
  let lastMouseX = window.innerWidth / 2;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function handleHeroMouseMove(event) {
    lastMouseX = event.clientX;
    const mouseProgress = (lastMouseX / window.innerWidth - 0.5) * 2;
    mouseTween = gsap.to(rings, {
      rotate: (index) => initialRings[index].rotate + mouseProgress * 15,
      duration: 0.3,
      ease: 'power1.out',
      stagger: { each: 0.02, from: 'start' },
      overwrite: 'auto',
      onUpdate: queueDraw,
    });
  }

  if (canHover) {
    hero.addEventListener('mousemove', handleHeroMouseMove);
    cleanupTasks.push(() => hero.removeEventListener('mousemove', handleHeroMouseMove));
  }

  const heroHeight = hero.getBoundingClientRect().height;
  const transitionDistance = window.innerHeight * HERO_LOGO_TRANSITION;
  const heroTimelineDistance = heroHeight + transitionDistance;

  const heroContentTween = gsap.to('#HomeHero__content', {
    scrollTrigger: {
      trigger: '.HomeHero',
      start: 'top top',
      end: `+=${window.innerHeight * HERO_CONTENT_SCROLL}`,
      scrub: 1,
    },
    y: '-200',
    opacity: 0,
    filter: 'blur(30px)',
    ease: 'power2.inOut',
  });
  cleanupTasks.push(() => {
    heroContentTween.scrollTrigger?.kill();
    heroContentTween.kill();
  });

  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.HomeHero',
      start: 'top top',
      end: `+=${heroTimelineDistance}`,
      scrub: true,
      id: 'home-hero-timeline',
      onEnter: () => {
        mouseTween?.kill();
        if (canHover) hero.removeEventListener('mousemove', handleHeroMouseMove);
        heroTimeline.invalidate();
      },
      onLeaveBack: () => {
        if (canHover) hero.addEventListener('mousemove', handleHeroMouseMove);
        initialRings.forEach((ring, index) => {
          rings[index].scale = ring.scale;
          rings[index].opacity = ring.opacity;
          rings[index].rotate = ring.rotate;
        });
        syncLogoDimensions();
        queueDraw();

        if (canHover) {
          const mouseProgress = (lastMouseX / window.innerWidth - 0.5) * 2;
          mouseTween = gsap.to(rings, {
            rotate: (index) => initialRings[index].rotate + mouseProgress * 20,
            duration: 0.5,
            ease: 'power2.out',
            stagger: { each: 0.02, from: 'end' },
            overwrite: 'auto',
            onUpdate: queueDraw,
          });
        }
        heroTimeline.invalidate();
      },
    },
  });

  const logoTransitionStart = heroHeight / heroTimelineDistance;
  const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

  if (isDesktop) {
    heroTimeline.to(rings, { rotate: 0, duration: HERO_LOGO_FADE_DURATION, ease: 'power1.out', onUpdate: queueDraw }, 0);
    rings.forEach((ring, index) => {
      heroTimeline.fromTo(
        ring,
        { scale: initialRings[index].scale },
        {
          scale: HERO_SCALE_TARGET,
          // Measuring the live site's --logo-width at matched scroll positions shows the ring shrinks
          // at a constant rate relative to scroll, not eased — power2.inOut made it lag at first then
          // overshoot smaller through the middle of the scroll range. Linear matches the real curve.
          ease: 'none',
          duration: heroHeight / heroTimelineDistance,
          onUpdate: () => {
            syncLogoDimensions();
            queueDraw();
          },
        },
        0
      );
    });
  }

  [1, 2, 3].forEach((index) => {
    heroTimeline.fromTo(
      rings[index],
      { opacity: initialRings[index].opacity },
      // These fainter outer rings used to fade out on a fixed short duration (0.45), finishing well
      // before the scale-shrink/handoff did — so for most of the transition only the single solid
      // ring[0] layer was left, which reads as a thin/incomplete shape. The live site keeps multiple
      // layers visible together (a bolder, doubled ring) right up to the handoff. Fade them out over
      // the same span as the handoff itself so they stay layered with ring[0] the whole time.
      { opacity: 0, duration: logoTransitionStart, ease: 'power2.inOut', onUpdate: queueDraw },
      0
    );
  });

  heroTimeline.fromTo(rings[0], { opacity: 1 }, { opacity: 0, duration: 0.001, ease: 'none', onUpdate: queueDraw }, logoTransitionStart);
  heroTimeline.to('#HomeQuadrants__logo', { opacity: 1, duration: 0.001, ease: 'none' }, logoTransitionStart);
  heroTimeline.to('#HomeQuadrants__logoMask', { opacity: 1, duration: 0.001, ease: 'none' }, logoTransitionStart);
  heroTimeline.to('#HomeQuadrants__logo', { rotate: '+=180', duration: transitionDistance / heroTimelineDistance, ease: 'power2.out' }, logoTransitionStart);

  cleanupTasks.push(() => {
    heroTimeline.scrollTrigger?.kill();
    heroTimeline.kill();
  });

  setupMarquee(cleanupTasks);
  setupHeroEntrance(cleanupTasks);
  setupQuadrants(cleanupTasks, transitionDistance);
  setupShowcase(cleanupTasks);
  setupPartnerAndWheel(cleanupTasks, rings, canvasState, queueDraw, syncLogoDimensions, initialRings);

  ScrollTrigger.refresh();
  if (background) gsap.set(background, { visibility: 'visible' });
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  window.__lenis?.start();

  const cleanup = () => {
    cleanupTasks.splice(0).forEach((task) => task());
    if (rafId !== null) cancelAnimationFrame(rafId);
    mouseTween?.kill();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    document.body.style.removeProperty('--logo-width');
    document.body.style.removeProperty('--logo-height');
    delete window.__saloAnimationCleanup;
  };

  window.__saloAnimationCleanup = cleanup;
  return cleanup;
}

function setupMarquee(cleanupTasks) {
  document.querySelectorAll('.marquee').forEach((marquee) => {
    const track = marquee.querySelector('.marquee__track');
    const content = marquee.querySelector('.marquee__content');
    if (!track || !content) return;

    const speed = Number.parseFloat(marquee.getAttribute('data-marquee-speed') ?? '24') || 24;
    let timeline = null;

    function rebuild() {
      while (track.children.length > 1) {
        track.removeChild(track.lastElementChild);
      }

      const contentWidth = content.getBoundingClientRect().width;
      if (!contentWidth) return;

      const targetWidth = window.innerWidth * 2 + contentWidth;
      const cloneCount = Math.ceil(targetWidth / contentWidth);

      for (let index = 0; index < cloneCount; index += 1) {
        const clone = content.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      }

      timeline?.kill();
      timeline = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -content.getBoundingClientRect().width,
          ease: 'none',
          duration: speed,
          repeat: -1,
        }
      );
    }

    rebuild();
    window.addEventListener('resize', rebuild);
    cleanupTasks.push(() => {
      window.removeEventListener('resize', rebuild);
      timeline?.kill();
    });
  });
}

function setupQuadrants(cleanupTasks, transitionDistance) {
  const section = document.querySelector('.HomeQuadrants');
  if (!section) return;

  const isTabletUp = window.matchMedia('(min-width: 768px)').matches;
  const hoverTimelines = [];
  let gridReady = section.getAttribute('data-ready') === 'true';

  gsap.set('#HomeQuadrants__logo, #HomeQuadrants__logoMask', { opacity: 0 });

  // Ambient idle spin: a continuous, time-based rotation on the wrapper around the
  // logo, independent of scroll. This runs on its own GSAP "rotate" channel so it
  // composes with (rather than fights) the scroll-scrubbed +180 flip tween applied
  // to the inner SVG further down in this file.
  const logoSpinEl = document.getElementById('HomeQuadrants__logoSpin');
  if (logoSpinEl) {
    const logoIdleSpin = gsap.to(logoSpinEl, {
      rotate: '+=360',
      duration: 5,
      ease: 'none',
      repeat: -1,
    });
    cleanupTasks.push(() => logoIdleSpin.kill());
  }

  if (isTabletUp) {
    gsap.set('.HomeQuadrants .reactive-divider', { opacity: 0 });
    gsap.set(['.HomeQuadrants .divider__left', '.HomeQuadrants .divider__right'], { width: 0 });
    gsap.set(['.HomeQuadrants .divider__top', '.HomeQuadrants .divider__bottom'], { height: 0 });
    gsap.set('.quadrant__heading', { opacity: 0, filter: 'blur(10px)' });

    const pinTrigger = ScrollTrigger.create({
      trigger: '.HomeQuadrants',
      start: 'top top',
      end: `+=${transitionDistance * 0.9}`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      id: 'pin-grid',
      onEnter: () => window.dispatchEvent(new CustomEvent('grid-ready')),
      onLeaveBack: () => window.dispatchEvent(new CustomEvent('grid-not-ready')),
    });
    cleanupTasks.push(() => pinTrigger.kill());
  }

  function playOnly(targetTimeline) {
    hoverTimelines.forEach((timeline) => {
      if (timeline !== targetTimeline && timeline.progress() > 0) {
        timeline.timeScale(2.2).reverse();
      }
    });
    targetTimeline.timeScale(1).play();
  }

  function markGridReady() {
    gridReady = true;
    section.setAttribute('data-ready', 'true');
    const hovered = document.querySelector('.quadrant:hover');
    if (hovered) {
      const index = Array.from(document.querySelectorAll('.quadrant')).indexOf(hovered);
      if (hoverTimelines[index]) playOnly(hoverTimelines[index]);
    }
  }

  function markGridNotReady() {
    gridReady = false;
    section.setAttribute('data-ready', 'false');
    hoverTimelines.forEach((timeline) => {
      if (timeline.progress() > 0) timeline.timeScale(2).reverse();
    });
  }

  window.addEventListener('grid-ready', markGridReady);
  window.addEventListener('grid-not-ready', markGridNotReady);
  cleanupTasks.push(() => {
    window.removeEventListener('grid-ready', markGridReady);
    window.removeEventListener('grid-not-ready', markGridNotReady);
  });

  document.querySelectorAll('.quadrant').forEach((quadrant) => {
    const hiddenContent = quadrant.querySelector('.hidden-content');
    const background = quadrant.querySelector('.background');
    const paragraph = hiddenContent?.querySelector('p');
    const actions = hiddenContent?.querySelector('.actions');
    const images = quadrant.querySelectorAll('.quadrant__image');

    gsap.set(background, { opacity: 0 });
    gsap.set(hiddenContent, { height: 0 });
    gsap.set(paragraph, { opacity: 0, y: 20 });
    gsap.set(actions, { opacity: 0, y: 15 });
    gsap.set(images, { opacity: 0, scale: 0.9 });

    const timeline = gsap.timeline({ paused: true });
    hoverTimelines.push(timeline);
    timeline
      .to(background, { opacity: 0.6, duration: 0.8, ease: 'power2.out' }, 0)
      .to(hiddenContent, { height: 'auto', duration: 0.75, ease: 'power2.out' }, 0)
      .to(paragraph, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.2)
      .to(actions, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 0.4)
      .to(images, { opacity: 1, scale: 1, duration: 0.75, ease: 'power2.inOut' }, 0);

    const onEnter = () => {
      if (gridReady) playOnly(timeline);
    };
    const onLeave = () => {
      if (gridReady) timeline.timeScale(1.5).reverse();
    };

    quadrant.addEventListener('mouseenter', onEnter);
    quadrant.addEventListener('mouseleave', onLeave);
    cleanupTasks.push(() => {
      quadrant.removeEventListener('mouseenter', onEnter);
      quadrant.removeEventListener('mouseleave', onLeave);
      timeline.kill();
    });
  });

  if (isTabletUp) {
    const dividerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.HomeQuadrants',
        start: 'top 60%',
        end: 'top top',
        scrub: true,
        id: 'dividers + quadrants',
      },
    });

    dividerTimeline
      .to(['.HomeQuadrants .divider__left', '.HomeQuadrants .divider__right'], { width: '100%', duration: 1, ease: 'power1.inOut' }, 0)
      .to(['.HomeQuadrants .divider__left', '.HomeQuadrants .divider__right'], { opacity: 1, duration: 1, ease: 'power3.out' }, 0)
      .to(['.HomeQuadrants .divider__top', '.HomeQuadrants .divider__bottom'], { height: '100%', duration: 1.1, ease: 'power1.out' }, 1.1)
      .to(['.HomeQuadrants .divider__top', '.HomeQuadrants .divider__bottom'], { opacity: 1, duration: 0.75, ease: 'power3.out' }, 0.8)
      .to('.quadrant__heading', { opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power1.out', stagger: 0.4 }, 0.25);

    cleanupTasks.push(() => {
      dividerTimeline.scrollTrigger?.kill();
      dividerTimeline.kill();
    });
  }
}

function setupShowcase(cleanupTasks) {
  const section = document.querySelector('.HomeShowcase');
  const inner = document.querySelector('.HomeShowcase__inner');
  const outerFrame = document.querySelector('.HomeShowcase__outerFrame');
  if (!section || !inner || !outerFrame || !window.matchMedia('(min-width: 1024px)').matches) return;

  const inset = window.innerWidth < 1024 ? 24 : 40;
  const radius = 16;
  const openDuration = 0.25;
  const closeDuration = 0.25;
  const maxScroll = () => -1 * Math.max(0, inner.scrollWidth - window.innerWidth);
  const travelScreens = () => Math.max(1, Math.abs(maxScroll()) / window.innerWidth);

  gsap.set(outerFrame, { clipPath: `inset(${inset}px round ${radius}px)` });
  gsap.set(section, {
    '--border-opacity': 1,
    '--border-inset': `${inset}px`,
    '--border-radius': `${radius}px`,
  });
  gsap.set(inner, { x: 0 });

  const timeline = gsap.timeline({ paused: true });
  timeline
    .to(outerFrame, { clipPath: 'inset(0px round 0px)', ease: 'none', duration: openDuration })
    .to(section, { '--border-inset': '0px', '--border-radius': '0px', ease: 'none', duration: openDuration }, '<')
    .to(section, { '--border-opacity': 0, ease: 'none', duration: 0.3 }, '<0.2')
    .to(inner, { x: maxScroll, ease: 'power1.out', duration: travelScreens })
    .to(outerFrame, { clipPath: `inset(${inset}px round ${radius}px)`, ease: 'none', duration: closeDuration }, '-=0.1')
    .to(section, { '--border-inset': `${inset}px`, '--border-radius': `${radius}px`, '--border-opacity': 1, ease: 'none', duration: closeDuration }, '<');

  const trigger = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${timeline.duration() * window.innerHeight}`,
    scrub: true,
    pin: true,
    pinSpacing: true,
    id: 'homeShowcase',
    animation: timeline,
    onEnter: () => window.dispatchEvent(new CustomEvent('showcase-pinned')),
    onLeave: () => window.dispatchEvent(new CustomEvent('showcase-unpinned')),
    onEnterBack: () => window.dispatchEvent(new CustomEvent('showcase-pinned')),
    onLeaveBack: () => window.dispatchEvent(new CustomEvent('showcase-unpinned')),
  });

  cleanupTasks.push(() => {
    trigger.kill();
    timeline.kill();
  });
}

function setupPartnerAndWheel(cleanupTasks, rings, canvasState, queueDraw, syncLogoDimensions, initialRings) {
  const partnerSection = document.querySelector('.HomePartner');
  if (partnerSection) {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: partnerSection,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    const image = partnerSection.querySelector('.HomePartner__image');
    const content = partnerSection.querySelector('.HomePartner__content');
    if (image) timeline.fromTo(image, { y: 50 }, { y: -50, ease: 'none' }, 0);
    if (content) timeline.fromTo(content, { y: -30 }, { y: 30, ease: 'none' }, 0);

    cleanupTasks.push(() => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    });
  }

  const wheelSection = document.querySelector('.HomeWheel');
  const isDesktopViewport = window.matchMedia('(min-width: 1024px)').matches;
  const background = document.getElementById('background');

  // Ambient logo backdrop: this reuses the SAME hero canvas/rings (confirmed by inspecting the live
  // site directly — getComputedStyle on #background-canvas showed it's the real mechanism, not a
  // separate element). It fades back in (opacity only, still tiny) as the Partner section scrolls
  // into view, then grows to full size and shifts up by half a viewport height right as the Wheel
  // section's pin engages — which is what puts it cropped near the top of the screen instead of
  // dead-centre — and shrinks/fades back out again before the pin releases.
  if (partnerSection && initialRings) {
    const onRingUpdate = () => {
      syncLogoDimensions();
      queueDraw();
    };

    const partnerFadeTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: partnerSection,
        start: 'top bottom',
        end: 'top 55%',
        scrub: true,
      },
    });
    partnerFadeTimeline.to(rings, {
      opacity: (index) => initialRings[index].opacity,
      duration: 1,
      ease: 'none',
      onUpdate: onRingUpdate,
    });

    cleanupTasks.push(() => {
      partnerFadeTimeline.scrollTrigger?.kill();
      partnerFadeTimeline.kill();
    });
  }

  if (!wheelSection || !isDesktopViewport) return;

  const blocks = document.querySelectorAll('.HomeWheel__contentBlock');
  const path = document.querySelector('.HomeWheel__motionPath');
  if (!blocks.length || !path) return;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: wheelSection,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: true,
    },
  });

  if (initialRings && background) {
    const onRingUpdate = () => {
      syncLogoDimensions();
      queueDraw();
    };

    // Grow the (already-faded-in, still tiny) rings back to full hero size right as the pin
    // engages, and shift the fixed canvas wrapper up by half a viewport height so the rings end
    // up cropped near the top of the screen instead of dead-centre.
    timeline.to(
      rings,
      { scale: (index) => initialRings[index].scale, duration: 0.4, ease: 'power2.out', onUpdate: onRingUpdate },
      0
    );
    timeline.to(background, { y: () => -window.innerHeight / 2, duration: 0.4, ease: 'power2.out' }, 0);
    timeline.to(canvasState, { globalRotation: 180, duration: 1, ease: 'none', onUpdate: queueDraw }, 0);

    // Shrink and fade back out, and put the canvas wrapper back to its normal position, before the
    // pin releases into the CTA section below.
    timeline.to(
      rings,
      { scale: 0.1, opacity: 0, duration: 0.2, ease: 'power1.in', onUpdate: onRingUpdate },
      1.3
    );
    timeline.to(background, { y: 0, duration: 0.2, ease: 'power1.in' }, 1.3);
  }

  const motionBase = { path, align: path, alignOrigin: [0.5, 0.5] };

  if (blocks[0]) {
    timeline.fromTo(
      blocks[0],
      { opacity: 1, scale: 1, motionPath: { ...motionBase, start: 0.5, end: 0.85 } },
      { opacity: 0, scale: 0.85, motionPath: { ...motionBase, start: 0.5, end: 0.85 }, ease: 'power1.inOut' },
      0
    );
  }
  if (blocks[1]) {
    // Continuous glide along the full path segment for this block's entire lifespan (enter through exit),
    // so its position never stops updating mid-scroll. Opacity/scale are tweened separately and only at the
    // edges, so the block still fades in/out while always sliding — no more frozen middle stretch.
    timeline.fromTo(
      blocks[1],
      { motionPath: { ...motionBase, start: 0.15, end: 0.85 } },
      { motionPath: { ...motionBase, start: 0.15, end: 0.85 }, ease: 'none', duration: 1.5 },
      0
    );
    timeline.fromTo(blocks[1], { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, ease: 'power1.inOut' }, 0);
    timeline.to(blocks[1], { opacity: 0, scale: 0.85, ease: 'power1.inOut' }, 1);
  }
  if (blocks[2]) {
    timeline.fromTo(
      blocks[2],
      { opacity: 0, scale: 0.85, motionPath: { ...motionBase, start: 0.15, end: 0.5 } },
      { opacity: 1, scale: 1, motionPath: { ...motionBase, start: 0.15, end: 0.5 }, ease: 'power1.inOut' },
      1
    );
  }

  cleanupTasks.push(() => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  });
}

function splitIntoWords(el) {
  const text = el.textContent || '';
  const words = text.trim().split(/\s+/);
  el.setAttribute('aria-label', text.trim());
  el.innerHTML = words
    .map(
      (w) =>
        `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="word-inner" style="display:inline-block;">${w}</span></span>`
    )
    .join(' ');
}

function setupHeroEntrance(cleanupTasks) {
  const hero = document.querySelector('.HomeHero');
  if (!hero) return;

  // --- Word reveal on h1 ---
  const heading = hero.querySelector('[data-word-reveal="true"]');
  if (heading) {
    splitIntoWords(heading);
    const words = heading.querySelectorAll('.word-inner');
    gsap.set(words, { y: '110%' });
    const t = gsap.to(words, {
      y: '0%',
      duration: 0.75,
      ease: 'power3.out',
      stagger: 0.042,
      delay: 0.4,
    });
    cleanupTasks.push(() => t.kill());
  }

  // --- Line reveals (tagline etc.) ---
  hero.querySelectorAll('[data-line-reveal="true"]').forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-line-reveal-delay') || '0');
    gsap.set(el, { opacity: 0, y: 18 });
    const t = gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay });
    cleanupTasks.push(() => t.kill());
  });

  // --- Generic reveals (buttons, eyebrow, marquee blur) ---
  hero.querySelectorAll('[data-reveal]').forEach((el) => {
    const type = el.getAttribute('data-reveal');
    const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0');
    if (type === 'blur') {
      gsap.set(el, { opacity: 0, y: 24, filter: 'blur(14px)' });
      const t = gsap.to(el, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power2.out', delay });
      cleanupTasks.push(() => t.kill());
    } else {
      gsap.set(el, { opacity: 0, y: 18 });
      const t = gsap.to(el, { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay });
      cleanupTasks.push(() => t.kill());
    }
  });

  // --- Ambient cursors: entrance + float ---
  const ambientCursors = hero.querySelectorAll('[data-ambient-cursor]');
  gsap.set(ambientCursors, { opacity: 0, scale: 0.5 });
  ambientCursors.forEach((cursor, index) => {
    const enterT = gsap.to(cursor, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: 1.6 + index * 0.35,
    });
    cleanupTasks.push(() => enterT.kill());

    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    if (index === 0) {
      floatTl
        .to(cursor, { x: 14, y: -10, duration: 2.4, ease: 'sine.inOut' })
        .to(cursor, { x: -8, y: 13, duration: 2.9, ease: 'sine.inOut' })
        .to(cursor, { x: 5, y: 6, duration: 2.1, ease: 'sine.inOut' });
    } else {
      floatTl
        .to(cursor, { x: -13, y: 9, duration: 2.9, ease: 'sine.inOut' })
        .to(cursor, { x: 10, y: -8, duration: 2.3, ease: 'sine.inOut' })
        .to(cursor, { x: -4, y: -11, duration: 2.6, ease: 'sine.inOut' });
    }
    cleanupTasks.push(() => floatTl.kill());
  });
}
