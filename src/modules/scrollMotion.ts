import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Everything that moves with the scroll:
 *  - section titles that rise line by line from a mask
 *  - "Foco" story: a pinned scene where the blur gathers into one sharp dot
 *  - "Beyond the screen": the video opens from a window to full-bleed
 *  - a ribbon of words that slides with the scroll
 *  - number count-up for the featured case
 *  - a progress rail with a dot
 */
export function initScrollMotion(reduce: boolean): void {
  initTitles(reduce);
  initStory(reduce);
  initBeyond(reduce);
  if (!reduce) {
    initRibbon();
    initCounters();
  }
  initRail();
}

/* ------------------------------------------------------------------ */

function initTitles(reduce: boolean): void {
  document.querySelectorAll<HTMLElement>("[data-mask]").forEach((title) => {
    const blocks = Array.from(title.children).filter(
      (c): c is HTMLElement => c.tagName === "SPAN" || c.tagName === "EM"
    );
    blocks.forEach((block) => {
      const mask = document.createElement("span");
      mask.className = "mask";
      block.before(mask);
      mask.appendChild(block);
    });
    if (reduce) return;

    gsap.set(blocks, { yPercent: 112 });
    ScrollTrigger.create({
      trigger: title,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(blocks, { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12 }),
    });
  });
}

/* ------------------------------------------------------------------ */

function initStory(reduce: boolean): void {
  const root = document.querySelector<HTMLElement>("[data-story]");
  const pin = document.querySelector<HTMLElement>("[data-story-pin]");
  if (!root || !pin) return;

  if (reduce) {
    root.classList.add("is-static");
    return;
  }

  const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
  const cloud = root.querySelector<HTMLElement>("[data-story-cloud]")!;
  const blobs = Array.from(cloud.querySelectorAll<HTMLElement>("i"));
  const dot = root.querySelector<HTMLElement>("[data-story-dot]")!;
  const rings = Array.from(root.querySelectorAll<HTMLElement>(".story__ring"));
  const bar = root.querySelector<HTMLElement>("[data-story-bar]")!;
  const N = steps.length;

  gsap.set(steps.slice(1), { opacity: 0, y: 34 });
  gsap.set(steps[0], { opacity: 1, y: 0 });
  gsap.set(rings, { scale: 1, opacity: 0 });
  gsap.set(dot, { scale: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: pin,
      start: "top top",
      end: () => "+=" + Math.round(window.innerHeight * N * 0.85),
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // Copy: every step leaves upward as the next one rises in.
  for (let i = 1; i < N; i++) {
    tl.to(steps[i - 1], { opacity: 0, y: -34, duration: 0.3 }, i - 0.38);
    tl.to(steps[i], { opacity: 1, y: 0, duration: 0.38 }, i - 0.08);
  }

  // Scene: the diffuse light gathers, tightens and turns into a sharp dot.
  tl.fromTo(cloud, { filter: "blur(46px)" }, { filter: "blur(9px)", duration: 3.3 }, 0.6);
  tl.to(blobs, { x: 0, y: 0, duration: 2.6, ease: "power1.inOut" }, 0.8);
  tl.to(cloud, { scale: 0.55, rotation: 140, duration: 3.1 }, 0.8);
  tl.to(cloud, { scale: 0.12, opacity: 0, duration: 0.9, ease: "power2.in" }, 3.9);
  tl.to(dot, { scale: 1, duration: 0.7, ease: "back.out(2.6)" }, 4.0);
  tl.fromTo(
    rings,
    { scale: 1, opacity: 0.85 },
    { scale: 5.5, opacity: 0, duration: 0.9, stagger: 0.18, ease: "power1.out", immediateRender: false },
    4.3
  );
  tl.to(bar, { scaleX: 1, duration: N, ease: "none" }, 0);
}

/* ------------------------------------------------------------------ */

function initBeyond(reduce: boolean): void {
  const root = document.querySelector<HTMLElement>("[data-beyond]");
  const pin = document.querySelector<HTMLElement>("[data-beyond-pin]");
  const frame = document.querySelector<HTMLElement>("[data-beyond-frame]");
  const card = document.querySelector<HTMLElement>("[data-beyond-card]");
  const label = document.querySelector<HTMLElement>("[data-beyond-label]");
  const video = document.querySelector<HTMLVideoElement>("[data-big-video]");
  if (!root || !pin || !frame || !card || !video) return;

  // Lazy source: phone gets the lighter file.
  const isPhone = window.matchMedia("(max-width: 720px)").matches;
  const src = isPhone ? video.dataset.srcMobile : video.dataset.srcDesktop;
  let loaded = false;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!loaded && src) {
            video.src = src;
            video.load();
            loaded = true;
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: "300px 0px" }
  );
  io.observe(pin);

  if (reduce) {
    root.classList.add("is-static");
    return;
  }

  const from = getComputedStyle(frame).clipPath;
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: pin,
      start: "top top",
      end: () => "+=" + Math.round(window.innerHeight * 1.9),
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  tl.fromTo(
    frame,
    { clipPath: from && from !== "none" ? from : "inset(24% 30% round 40px)" },
    { clipPath: "inset(0% 0% round 0px)", duration: 1, ease: "power2.inOut" },
    0
  )
    .fromTo(video, { scale: 1.12 }, { scale: 1, duration: 1.4 }, 0);
  if (label) tl.to(label, { opacity: 0, y: -18, duration: 0.3 }, 0.05);
  tl.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.95);
  tl.to({}, { duration: 0.5 });
}

/* ------------------------------------------------------------------ */

function initRibbon(): void {
  // Two rows in opposite directions that never stop; scrolling pushes them faster.
  const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-ribbon]"));
  const tweens = rows.map((row) => {
    const dir = Number(row.dataset.ribbon) || 1;
    const speed = row.classList.contains("ribbon__row--serif") ? 46 : 38; // seconds per loop
    return {
      tween: gsap.fromTo(
        row,
        { xPercent: dir < 0 ? 0 : -50 },
        { xPercent: dir < 0 ? -50 : 0, duration: speed, ease: "none", repeat: -1 }
      ),
    };
  });
  const host = rows[0]?.parentElement;
  if (!host) return;
  let boost = 0;
  ScrollTrigger.create({
    trigger: host,
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      boost = gsap.utils.clamp(-6, 6, self.getVelocity() / 260);
    },
  });
  gsap.ticker.add(() => {
    boost *= 0.92;
    tweens.forEach(({ tween }) => tween.timeScale(1 + Math.abs(boost) * 1.2));
  });
}

/* ------------------------------------------------------------------ */

function initCounters(): void {
  const els = document.querySelectorAll<HTMLElement>("[data-count]");
  if (!els.length) return;
  const trigger = document.querySelector(".proof");
  if (!trigger) return;

  els.forEach((el) => (el.textContent = "0"));
  ScrollTrigger.create({
    trigger,
    start: "top 72%",
    once: true,
    onEnter: () => {
      els.forEach((el) => {
        const target = Number(el.dataset.count) || 0;
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => (el.textContent = String(Math.round(state.v))),
        });
      });
    },
  });
}

/* ------------------------------------------------------------------ */

function initRail(): void {
  const rail = document.querySelector<HTMLElement>(".rail");
  if (!rail) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    rail.style.setProperty("--p", String(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0));
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}
