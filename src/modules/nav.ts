import type Lenis from "lenis";

/** Smooth in-page anchors through Lenis + a subtle state change once the page scrolls. */
export function initNav(lenis: Lenis): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.3, offset: href === "#hero" ? 0 : -12 });
    });
  });

  const nav = document.querySelector<HTMLElement>("[data-nav]");
  if (!nav) return;
  const update = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
  window.addEventListener("scroll", update, { passive: true });
  update();
}
