import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { t3dState } from "./t3dState";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lightweight half of the 3D scene: it reserves the pinned scroll space and
 * drives the copy, so the page layout never jumps. The heavy half (three.js
 * + the models) is only downloaded when the visitor gets close to it.
 */
export function initTrafo3D(reduce: boolean): void {
  const section = document.querySelector<HTMLElement>("[data-t3d]");
  const pin = document.querySelector<HTMLElement>("[data-t3d-pin]");
  if (!section || !pin) return;

  let mounted = false;
  const mount = () => {
    if (mounted) return;
    mounted = true;
    import("./trafo3d")
      .then((m) => m.mountTrafo3D(reduce))
      .catch(() => section.classList.add("is-nogl"));
  };
  new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) mount();
    },
    { rootMargin: "1800px 0px" }
  ).observe(section);

  const copy = Array.from(section.querySelectorAll<HTMLElement>("[data-t3d-fade]"));
  if (reduce) {
    section.classList.add("is-static", "is-touched");
    return;
  }
  gsap.set(copy, { opacity: 0, y: 26 });
  ScrollTrigger.create({
    trigger: pin,
    start: "top top",
    end: () => "+=" + Math.round(window.innerHeight * 2.4),
    pin: true,
    scrub: 0.5,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      t3dState.p = self.progress;
      section.classList.toggle("is-built", self.progress > 0.86);
    },
  });
  gsap.to(copy, {
    opacity: 1,
    y: 0,
    stagger: 0.12,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: { trigger: section, start: "top 70%", once: true },
  });
}
