import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth scroll powered by Lenis, wired into GSAP's ticker so every
 * ScrollTrigger-driven animation (video scrubbing, pinning, reveals)
 * stays perfectly in sync with the smoothed scroll position.
 */
export function initSmoothScroll(): Lenis {
  const lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    // Touch devices keep native scrolling — smoothing touch input
    // tends to feel laggy and fights the OS's own momentum scroll.
    syncTouch: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
