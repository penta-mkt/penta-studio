import type Lenis from "lenis";

/** Smooth in-page anchor navigation through Lenis. */
export function initNav(lenis: Lenis): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.4 });
    });
  });
}
