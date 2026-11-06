/**
 * Expand/collapse for the full Bases Balc case. The panel animates with a
 * CSS grid-rows transition (0fr -> 1fr); bars grow when it opens.
 */
export function initResults(): void {
  const detail = document.querySelector<HTMLElement>("[data-results-detail]");
  const toggles = document.querySelectorAll<HTMLButtonElement>("[data-results-toggle]");
  if (!detail || toggles.length === 0) return;

  const setOpen = (open: boolean) => {
    detail.classList.toggle("is-open", open);
    toggles.forEach((btn) => btn.setAttribute("aria-expanded", String(open)));
    if (!open) detail.closest(".proof")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => setOpen(!detail.classList.contains("is-open")));
  });
}
