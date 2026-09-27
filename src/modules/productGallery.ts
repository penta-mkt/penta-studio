/**
 * Product gallery: a simple horizontal-scroll track of editorial photo
 * tiles, advanced by arrow buttons or by the user dragging/swiping the
 * track directly. Deliberately not GSAP-pinned like the other
 * scroll-driven sections — this one reads as a browsable strip of
 * images, not a scrubbed animation.
 */
export function initProductGallery(): void {
  const track = document.getElementById("gallery-track");
  const prevBtn = document.getElementById("gallery-prev") as HTMLButtonElement | null;
  const nextBtn = document.getElementById("gallery-next") as HTMLButtonElement | null;
  if (!track || !prevBtn || !nextBtn) return;

  // Advance by roughly one screen's worth of tiles at a time rather than
  // tying the step to a specific tile's width — keeps working regardless
  // of how many tiles exist or how wide any one of them is.
  const step = () => track.clientWidth * 0.85;

  const updateButtons = () => {
    const max = track.scrollWidth - track.clientWidth;
    prevBtn.disabled = track.scrollLeft <= 4;
    nextBtn.disabled = track.scrollLeft >= max - 4;
  };

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -step(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: step(), behavior: "smooth" });
  });

  track.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();
}
