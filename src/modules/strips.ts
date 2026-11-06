/**
 * Horizontal strips (photos, videos): native scroll-snap + arrow buttons
 * + mouse drag. Each strip lives in a [data-strip-wrap] with optional
 * [data-strip-prev] / [data-strip-next] buttons.
 */
export function initStrips(): void {
  document.querySelectorAll<HTMLElement>("[data-strip-wrap]").forEach((wrap) => {
    const strip = wrap.querySelector<HTMLElement>("[data-strip]");
    if (!strip) return;
    const prev = wrap.querySelector<HTMLButtonElement>("[data-strip-prev]");
    const next = wrap.querySelector<HTMLButtonElement>("[data-strip-next]");

    const step = () => strip.clientWidth * 0.8;
    const update = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      if (prev) prev.disabled = strip.scrollLeft <= 4;
      if (next) next.disabled = strip.scrollLeft >= max - 4;
    };

    prev?.addEventListener("click", () => strip.scrollBy({ left: -step(), behavior: "smooth" }));
    next?.addEventListener("click", () => strip.scrollBy({ left: step(), behavior: "smooth" }));
    strip.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();

    // Mouse drag (touch already scrolls natively).
    let down = false;
    let startX = 0;
    let startLeft = 0;
    strip.addEventListener("pointerdown", (e) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      startX = e.clientX;
      startLeft = strip.scrollLeft;
    });
    window.addEventListener("pointermove", (e) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) strip.classList.add("is-dragging");
      strip.scrollLeft = startLeft - dx;
    });
    window.addEventListener("pointerup", () => {
      if (!down) return;
      down = false;
      strip.classList.remove("is-dragging");
    });
  });
}
