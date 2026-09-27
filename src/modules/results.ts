import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Expand/collapse for the full Bases Balc case detail inside the Results
 * section. Uses a CSS grid-rows transition (0fr -> 1fr) so the height
 * animates without any JS measuring. Because expanding pushes every
 * section below it further down the page, we refresh ScrollTrigger once
 * the transition settles so pinned/triggered sections keep measuring
 * against the right positions.
 */
export function initResults(): void {
  const detail = document.querySelector<HTMLElement>("[data-results-detail]");
  const toggles = document.querySelectorAll<HTMLButtonElement>("[data-results-toggle]");

  if (!detail || toggles.length === 0) return;

  const setOpen = (open: boolean) => {
    detail.classList.toggle("is-open", open);
    toggles.forEach((btn) => btn.setAttribute("aria-expanded", String(open)));

    if (!open) {
      // Scroll the closing panel back into view if the user had scrolled
      // deep into it, so collapsing never leaves them stranded lower on
      // the page than the section itself.
      const feature = detail.closest(".results__feature");
      feature?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = detail.classList.contains("is-open");
      setOpen(!isOpen);
    });
  });

  detail.addEventListener("transitionend", (e) => {
    if (e.target === detail && e.propertyName === "grid-template-rows") {
      ScrollTrigger.refresh();
    }
  });
}
