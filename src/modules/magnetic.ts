import gsap from "gsap";

/** Buttons lean slightly toward the pointer (mouse only). */
export function initMagnetic(): void {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      gsap.to(btn, { x: dx * 0.22, y: dy * 0.3, duration: 0.35, ease: "power3.out" });
    });
    btn.addEventListener("pointerleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
    });
  });
}

/** Soft pointer parallax for the hero's diffuse light. */
export function initHeroParallax(): void {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const hero = document.getElementById("hero");
  const cloud = hero?.querySelector<HTMLElement>(".cloud--hero");
  if (!hero || !cloud) return;

  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  let raf = 0;

  const tick = () => {
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    cloud.style.setProperty("--px", cx.toFixed(2));
    cloud.style.setProperty("--py", cy.toFixed(2));
    raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(tick) : 0;
  };

  hero.addEventListener("pointermove", (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 60;
    ty = (e.clientY / window.innerHeight - 0.5) * 40;
    if (!raf) raf = requestAnimationFrame(tick);
  });
}
