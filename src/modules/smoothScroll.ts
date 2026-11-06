import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Smooth scroll (Lenis) driven by GSAP's ticker so every ScrollTrigger
 * (pinned story, expanding video, ribbon) stays in sync with the
 * smoothed scroll position. Touch devices keep native scrolling.
 */
export function initSmoothScroll(): Lenis {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}
