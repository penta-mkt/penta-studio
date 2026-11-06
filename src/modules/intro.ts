import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

/**
 * Opening motion graphic.
 *
 *  1. The "penta" wordmark rises in and floats; the final dot pops in last.
 *  2. The dot detaches and hops over the tagline — Everything · creative ·
 *     Built · to · sell — lighting each word as it lands, shrinking a bit
 *     with every bounce, and finally drops in as the period of "sell.".
 *  3. The overlay dissolves while the hero headline rises, and the dot
 *     jumps to its final spot: the sharp focus point of the hero.
 *
 * Click, key press or the Skip button end it at any time.
 * With prefers-reduced-motion the intro never runs (see the inline script in <head>).
 */
export function initIntro(lenis: Lenis): Promise<void> {
  let resolveDone: () => void = () => {};
  const done = new Promise<void>((r) => (resolveDone = r));
  void run(lenis, () => resolveDone());
  return done;
}

async function run(lenis: Lenis, resolveDone: () => void): Promise<void> {
  const root = document.documentElement;
  const overlayEl = document.getElementById("intro");

  if (!overlayEl || !root.classList.contains("intro")) {
    overlayEl?.remove();
    resolveDone();
    return;
  }
  const overlay: HTMLElement = overlayEl;

  const logo = document.getElementById("intro-logo") as HTMLElement;
  const homeDot = document.getElementById("intro-home-dot") as HTMLElement;
  const fly = document.getElementById("intro-fly-dot") as HTMLElement;
  const slogan = document.getElementById("intro-slogan") as HTMLElement;
  const period = document.getElementById("intro-period") as HTMLElement;
  const heroDot = document.getElementById("hero-dot") as HTMLElement;
  const skip = document.getElementById("intro-skip") as HTMLButtonElement;
  const words = Array.from(overlay.querySelectorAll<HTMLElement>("[data-word]"));
  const heroLines = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-line]"));
  const heroFades = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-fade]"));

  lenis.stop();
  window.scrollTo(0, 0);

  let finished = false;
  let main: gsap.core.Timeline | null = null;
  let hops: gsap.core.Timeline | null = null;
  let floatTween: gsap.core.Tween | null = null;

  const finish = () => {
    if (finished) return;
    finished = true;
    main?.kill();
    hops?.kill();
    floatTween?.kill();
    gsap.killTweensOf([overlay, fly, ...heroLines, ...heroFades]);
    fly.remove();
    overlay.remove();
    gsap.set([...heroLines, ...heroFades], { clearProps: "all" });
    root.classList.remove("intro");
    lenis.start();
    ScrollTrigger.refresh();
    resolveDone();
    window.removeEventListener("keydown", finish);
    window.removeEventListener("resize", finish);
  };

  skip.addEventListener("click", finish);
  overlay.addEventListener("click", finish);
  window.addEventListener("keydown", finish);
  window.addEventListener("resize", finish);

  // Measure text only after the brand fonts are in.
  try {
    await document.fonts.ready;
  } catch {
    /* ignore */
  }
  if (finished) return;

  gsap.set(logo, { opacity: 0, y: 34, scale: 0.96 });
  gsap.set(homeDot, { scale: 0 });
  gsap.set(heroLines, { yPercent: 112 });

  main = gsap.timeline();
  main
    .to(logo, { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "power3.out" }, 0.1)
    .to(homeDot, { scale: 1, duration: 0.5, ease: "back.out(3.2)" }, 0.6)
    .add(() => {
      floatTween = gsap.to(logo, { y: -10, rotation: -1.2, duration: 1.7, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, 0.9)
    .add(runHops, 1.45);

  function runHops() {
    floatTween?.pause();

    const dotRect = homeDot.getBoundingClientRect();
    const D0 = dotRect.width;
    const cx = dotRect.left + D0 / 2;
    const cy = dotRect.top + D0 / 2;

    // Take the dot out of the overlay so it survives the overlay's fade-out.
    document.body.appendChild(fly);
    gsap.set(fly, {
      width: D0,
      height: D0,
      x: cx,
      y: cy,
      xPercent: -50,
      yPercent: -50,
      scale: 1,
      zIndex: 210,
      visibility: "visible",
    });
    homeDot.style.visibility = "hidden";

    const fs = parseFloat(getComputedStyle(slogan).fontSize);
    const endScale = 0.5;
    const stops = words.length + 1; // every word + the final period
    const scaleAt = (i: number) => 1 - (1 - endScale) * ((i + 1) / stops);

    hops = gsap.timeline({ onComplete: finale });

    // Anticipation: squash down, stretch, go.
    hops
      .to(fly, { scaleX: 1.3, scaleY: 0.7, duration: 0.14, ease: "power2.inOut" })
      .to(fly, { scaleX: 0.88, scaleY: 1.18, duration: 0.08, ease: "power2.out" });

    let curY = cy;

    const hop = (toX: number, toY: number, s: number, dur: number, height: number, onLand: () => void) => {
      const peak = Math.min(curY, toY) - height;
      const t = hops!.duration();
      hops!
        .to(fly, { x: toX, scaleX: s, scaleY: s, duration: dur, ease: "none" }, t)
        .to(fly, { y: peak, duration: dur * 0.5, ease: "power2.out" }, t)
        .to(fly, { y: toY, duration: dur * 0.5, ease: "power2.in" }, t + dur * 0.5)
        .add(onLand, t + dur)
        .to(fly, { scaleX: s * 1.32, scaleY: s * 0.66, duration: 0.05, ease: "power1.out" }, t + dur)
        .to(fly, { scaleX: s, scaleY: s, duration: 0.14, ease: "back.out(3)" });
      curY = toY;
    };

    words.forEach((word, i) => {
      const r = word.getBoundingClientRect();
      const s = scaleAt(i);
      const dia = D0 * s;
      const landX = r.left + r.width / 2;
      const landY = r.top + fs * 0.1 - dia / 2 - 3;
      const dur = i === 0 ? 0.52 : i === 2 ? 0.4 : 0.3;
      const height = i === 0 ? 130 : i === 2 ? 80 : 56;
      hop(landX, landY, s, dur, height, () => {
        word.classList.add("is-lit");
        gsap.fromTo(word, { y: 0 }, { y: fs * 0.07, duration: 0.07, yoyo: true, repeat: 1, ease: "power1.out" });
      });
    });

    // Last hop: drop into the period of "sell."
    const p = period.getBoundingClientRect();
    const sEnd = (0.16 * fs) / D0;
    hop(p.left + p.width / 2, p.bottom - (0.16 * fs) / 2 - 0.02 * fs, sEnd, 0.34, 60, () => {});
  }

  function finale() {
    if (finished) return;

    // Hold a beat on the finished tagline, then let the hero take over.
    const out = gsap.timeline({ onComplete: finish });
    main = out;

    out
      .addLabel("reveal", 0.3) // a beat on the finished tagline
      .to(overlay, { opacity: 0, duration: 0.9, ease: "power2.inOut" }, "reveal")
      .fromTo(
        heroLines,
        { yPercent: 112 },
        { yPercent: 0, duration: 1.05, ease: "power4.out", stagger: 0.12 },
        "reveal+=0.1"
      )
      .fromTo(
        heroFades,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 },
        "reveal+=0.55"
      )
      .add(() => {
        // Hero text is in place now: its dot position is final.
        const hr = heroDot.getBoundingClientRect();
        const D0 = parseFloat(String(gsap.getProperty(fly, "width")));
        const toScale = hr.width / D0;
        const toX = hr.left + hr.width / 2;
        const toY = hr.top + hr.height / 2;
        const curY = Number(gsap.getProperty(fly, "y"));
        const peak = Math.min(curY, toY) - 120;
        const flight = gsap.timeline({
          onComplete: () => {
            heroDot.style.visibility = "visible";
            gsap.fromTo(heroDot, { scale: 0.2 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
            fly.style.visibility = "hidden";
            window.setTimeout(finish, 450);
          },
        });
        flight
          .to(fly, { x: toX, scaleX: toScale, scaleY: toScale, duration: 0.7, ease: "none" }, 0)
          .to(fly, { y: peak, duration: 0.35, ease: "power2.out" }, 0)
          .to(fly, { y: toY, duration: 0.35, ease: "power2.in" }, 0.35);
        main = flight;
      }, "reveal+=0.95");
  }
}
