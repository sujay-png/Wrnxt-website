import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAboutAnimations() {
  if (typeof window.__saloAboutCleanup === 'function') {
    window.__saloAboutCleanup();
  }

  const cleanupTasks = [];

  setupMarquee(cleanupTasks);
  setupHeadingSplitReveals(cleanupTasks);
  setupBlurReveals(cleanupTasks);
  setupDividers(cleanupTasks);
  setupPhotoReveals(cleanupTasks);
  setupGalleryParallax(cleanupTasks);
  setupHeroGalleryPin(cleanupTasks);

  ScrollTrigger.refresh();

  // Layout.astro locks scroll (overflow:hidden) until a page's animation setup releases it —
  // the homepage does this at the end of its own initAnimations(). This page has no hero pin to
  // wait on, so release it as soon as setup is done; without this the page would be permanently
  // unscrollable.
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  window.__lenis?.start();

  const cleanup = () => {
    cleanupTasks.splice(0).forEach((task) => task());
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    delete window.__saloAboutCleanup;
  };

  window.__saloAboutCleanup = cleanup;
  return cleanup;
}

// Marquee setup mirrors the homepage's implementation in case any marquee elements are present
// (none currently are on this page, but kept for consistency if reused later).
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
      for (let i = 0; i < cloneCount; i += 1) {
        const clone = content.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
      }
      timeline?.kill();
      timeline = gsap.fromTo(
        track,
        { x: 0 },
        { x: () => -content.getBoundingClientRect().width, ease: 'none', duration: speed, repeat: -1 }
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

// Same word-by-word split used on the homepage hero (see splitIntoWords in animations.js) —
// each word slides up out of an overflow-hidden wrapper, staggered, instead of the whole line
// just fading. This is the single biggest contributor to the homepage's distinct "reveal" feel,
// so headings across the About page get the same treatment, scroll-triggered instead of on load.
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

function setupHeadingSplitReveals(cleanupTasks) {
  const headings = gsap.utils.toArray('.AboutHero h1, .AboutStory h2, .AboutVideo h2, .AboutCulture h2');
  headings.forEach((heading) => {
    splitIntoWords(heading);
    const words = heading.querySelectorAll('.word-inner');
    gsap.set(words, { y: '110%' });

    const tween = gsap.to(words, {
      y: '0%',
      duration: 0.75,
      ease: 'power3.out',
      stagger: 0.042,
      scrollTrigger: {
        trigger: heading,
        start: 'top 88%',
        once: true,
      },
    });
    cleanupTasks.push(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  });
}

// Matches the homepage's data-reveal="blur" entrance treatment (opacity + lift + a soft
// blur-to-focus pull) rather than a plain fade-up — this is the signature reveal used for prose,
// eyebrows, buttons and other supporting content throughout the site.
function setupBlurReveals(cleanupTasks) {
  const revealSelectors = [
    '.AboutHero .eyebrow',
    '.AboutHero .prose',
    '.AboutHero .actions',
    '.AboutStory__content > *:not(h2)',
    '.AboutVideo__content > *:not(h2)',
    '.AboutCulture .eyebrow, .AboutCulture .prose',
    '.AboutTeamGrid__card',
    '.AboutTeamGrid__spotlight > *',
  ];

  revealSelectors.forEach((selector) => {
    const elements = gsap.utils.toArray(selector);
    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, y: 24, filter: 'blur(14px)' });

    const trigger = ScrollTrigger.batch(elements, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          ease: 'power2.out',
          stagger: 0.08,
        });
      },
    });

    cleanupTasks.push(() => {
      (Array.isArray(trigger) ? trigger : [trigger]).forEach((t) => t?.kill?.());
    });
  });
}

// Reactive dividers grow from 0 width (not a scaleX trick) and fade in together, matching the
// exact technique used for the homepage Quadrants dividers.
function setupDividers(cleanupTasks) {
  document.querySelectorAll('.reactive-divider.horizontal').forEach((divider) => {
    const line = divider.querySelector('.divider-line');
    if (!line) return;

    gsap.set(divider, { opacity: 0 });
    gsap.set(line, { width: 0 });

    const tween = gsap.timeline({
      scrollTrigger: {
        trigger: divider,
        start: 'top 90%',
        once: true,
      },
    });
    tween
      .to(line, { width: '100%', duration: 0.9, ease: 'power1.inOut' }, 0)
      .to(divider, { opacity: 1, duration: 0.6, ease: 'power3.out' }, 0);

    cleanupTasks.push(() => {
      tween.scrollTrigger?.kill();
      tween.kill();
    });
  });
}

// Gallery / profile / spotlight photos get the same blur-to-focus pull as the text content, plus
// a touch of scale, so photography and copy share one consistent reveal language on this page.
function setupPhotoReveals(cleanupTasks) {
  const photoSelectors = ['.AboutHero__galleryItem', '.AboutTeamGrid__spotlightPhoto'];
  photoSelectors.forEach((selector) => {
    const elements = gsap.utils.toArray(selector);
    if (!elements.length) return;

    gsap.set(elements, { opacity: 0, scale: 0.94, filter: 'blur(10px)' });

    const trigger = ScrollTrigger.batch(elements, {
      start: 'top 92%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.06,
        });
      },
    });

    cleanupTasks.push(() => {
      (Array.isArray(trigger) ? trigger : [trigger]).forEach((t) => t?.kill?.());
    });
  });

  // The Culture "photo wall" is deliberately excluded from the loop above: each of those photos
  // carries its own resting rotation via a CSS custom property (--rotate, set in
  // AboutCulture.astro). GSAP's CSSPlugin writes one combined `transform` string the moment a
  // tween touches scale/x/y/rotation, which would silently wipe that rotation out. So this
  // reveal only ever animates opacity/filter, leaving `transform` (and the rotation it carries)
  // completely alone.
  const cultureItems = gsap.utils.toArray('.AboutCulture__item');
  if (cultureItems.length) {
    gsap.set(cultureItems, { opacity: 0, filter: 'blur(10px)' });

    const cultureTrigger = ScrollTrigger.batch(cultureItems, {
      start: 'top 92%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.06,
        });
      },
    });

    cleanupTasks.push(() => {
      (Array.isArray(cultureTrigger) ? cultureTrigger : [cultureTrigger]).forEach((t) => t?.kill?.());
    });
  }
}

// Hero gallery items no longer get individual y-parallax — the whole gallery column scrolls
// as one unit inside the pinned section card (see setupHeroGalleryPin). Keeping this stub
// in case non-hero gallery parallax is added later.
function setupGalleryParallax(_cleanupTasks) {
  // intentionally empty — superseded by setupHeroGalleryPin
}

// Animates the AboutHero gallery columns so the mobile/card frames scroll smoothly upward
// within the section card as the user scrolls down the page ("slight scroll kinda thing").
function setupHeroGalleryPin(cleanupTasks) {
  if (!window.matchMedia('(min-width: 1024px)').matches) return;

  const section = document.querySelector('.AboutHero');
  if (!section) return;

  const col1 = section.querySelector('.AboutHero__galleryCol--1');
  const col2 = section.querySelector('.AboutHero__galleryCol--2');
  if (!col1 && !col2) return;

  // Animate column 1 upward smoothly as the user scrolls past the section
  if (col1) {
    const tween1 = gsap.to(col1, {
      y: -150,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top+=120',
        end: 'bottom top',
        scrub: true,
      },
    });
    cleanupTasks.push(() => {
      tween1.scrollTrigger?.kill();
      tween1.kill();
      gsap.set(col1, { clearProps: 'y' });
    });
  }

  // Animate column 2 with a slightly deeper upward movement for layered parallax
  if (col2) {
    const tween2 = gsap.to(col2, {
      y: -240,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top+=120',
        end: 'bottom top',
        scrub: true,
      },
    });
    cleanupTasks.push(() => {
      tween2.scrollTrigger?.kill();
      tween2.kill();
      gsap.set(col2, { clearProps: 'y' });
    });
  }
}
