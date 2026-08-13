import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Staggered typographic reveal for the capabilities list — no cards. */
export function initCapabilities(): void {
  const items = document.querySelectorAll<HTMLElement>(".capabilities__item");
  items.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: "top 85%",
      onEnter: () => {
        window.setTimeout(() => item.classList.add("is-visible"), i * 50);
      },
    });
  });
}
