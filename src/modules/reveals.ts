import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Generic fade/slide-up reveal for any [data-reveal] element outside the hero. */
export function initReveals(): void {
  const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
    (el) => !el.closest(".hero")
  );

  els.forEach((el) => {
    gsap.set(el, { autoAlpha: 0, y: 24 });
    ScrollTrigger.create({
      trigger: el,
      start: "top 82%",
      onEnter: () => gsap.to(el, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" }),
    });
  });
}
