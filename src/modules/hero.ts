import gsap from "gsap";

interface Options {
  reduceMotion: boolean;
}

/**
 * Hero load-in (title reveal) + subtle pointer-driven parallax between
 * the video layer and the type layer, to sell depth without any 3D engine.
 */
export function initHero({ reduceMotion }: Options): void {
  const lines = gsap.utils.toArray<HTMLElement>(".hero__title-line");
  const subcopy = document.querySelector<HTMLElement>(".hero__subcopy");
  const heroVideo = document.getElementById("hero-video") as HTMLVideoElement | null;

  heroVideo?.play().catch(() => {});

  gsap.set(lines, { yPercent: 110 });
  gsap.set(subcopy, { autoAlpha: 0, y: 16 });

  gsap
    .timeline({ delay: 0.15, defaults: { ease: "power4.out" } })
    .to(lines, { yPercent: 0, duration: 1.3, stagger: 0.12 })
    .to(subcopy, { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.7");

  if (reduceMotion) return;

  const stage = document.querySelector<HTMLElement>(".hero__stage");
  const frame = document.querySelector<HTMLElement>(".hero__frame");
  if (!stage || !window.matchMedia("(hover: hover)").matches) return;

  let targetX = 0;
  let targetY = 0;
  let curX = 0;
  let curY = 0;

  window.addEventListener("pointermove", (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  gsap.ticker.add(() => {
    curX += (targetX - curX) * 0.05;
    curY += (targetY - curY) * 0.05;
    // No extra scale here — the CSS scale(1.05) on .hero__video already
    // gives enough overscan to cover this translate range without
    // upscaling the video any further than necessary (crispness).
    gsap.set(stage, { x: curX * -14, y: curY * -10 });
    if (frame) gsap.set(frame, { x: curX * 8, y: curY * 6 });
  });
}
