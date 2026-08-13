import gsap from "gsap";

interface Options {
  reduceMotion: boolean;
}

interface LayerOffset {
  z: number;
  y: number;
  rot: number;
}

const OFFSETS: LayerOffset[] = [
  { z: -240, y: 100, rot: -7 },
  { z: -120, y: 46, rot: -3 },
  { z: 0, y: 0, rot: 0 },
  { z: 140, y: -56, rot: 3 },
  { z: 280, y: -110, rot: 7 },
];

/**
 * Product / object breakdown: assemble → explode → hold → rebuild.
 * Built with plain layered divs (clearly labelled placeholders) so the
 * scroll-driven choreography can be validated now and the visuals swapped
 * for a real 3D render or captured sequence later without touching the logic.
 */
export function initBreakdown({ reduceMotion }: Options): void {
  const section = document.querySelector<HTMLElement>(".breakdown");
  const pin = document.querySelector<HTMLElement>(".breakdown__pin");
  const layers = gsap.utils.toArray<HTMLElement>(".breakdown__layer");
  if (!section || !pin || !layers.length) return;

  gsap.set(layers, { transformPerspective: 1400, transformStyle: "preserve-3d" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin,
      scrub: reduceMotion ? true : 0.5,
    },
  });

  // Explode.
  tl.to(
    layers,
    {
      z: (i: number) => OFFSETS[i % OFFSETS.length].z,
      y: (i: number) => OFFSETS[i % OFFSETS.length].y,
      rotateX: (i: number) => OFFSETS[i % OFFSETS.length].rot,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.04,
    },
    0
  );

  // Hold exploded state.
  tl.to({}, { duration: 0.6 });

  // Rebuild.
  tl.to(
    layers,
    {
      z: 0,
      y: 0,
      rotateX: 0,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.04,
    },
    1.6
  );
}
