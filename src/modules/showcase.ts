import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Options {
  isMobile: boolean;
}

/**
 * Editorial showcase: vertical scroll is translated into horizontal
 * track movement while the section is pinned, so each project reads as
 * a full-bleed visual moment rather than a card in a grid.
 */
export function initShowcase({ isMobile }: Options): void {
  const pin = document.querySelector<HTMLElement>(".showcase__pin");
  const track = document.getElementById("showcase-track");
  if (!pin || !track) return;

  const getDistance = () => Math.max(0, track.scrollWidth - track.clientWidth) + window.innerWidth * 0.4;

  ScrollTrigger.create({
    trigger: pin,
    start: "top top",
    end: () => `+=${getDistance()}`,
    pin: true,
    scrub: isMobile ? true : 0.5,
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      gsap.set(track, { x: -getDistance() * self.progress });
    },
  });
}
