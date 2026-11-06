import gsap from "gsap";

/**
 * The hero keeps the intro's gesture alive: every few seconds the final dot
 * of "sell." leaves its spot, jumps back to the start of the headline and
 * hops word by word until it drops into place again.
 * Pauses while the hero is off-screen; never runs with reduced motion.
 */
export function initHeroHop(): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const hero = document.getElementById("hero");
  const title = document.getElementById("hero-title");
  const dot = document.getElementById("hero-dot");
  const runner = document.getElementById("hero-runner");
  if (!hero || !title || !dot || !runner) return;

  const words = Array.from(title.querySelectorAll<HTMLElement>(".hw"));
  let timer: number | undefined;
  let tl: gsap.core.Timeline | null = null;
  let visible = true;

  const rest = () => {
    tl?.kill();
    tl = null;
    runner.style.visibility = "hidden";
    dot.style.visibility = "visible";
    words.forEach((w) => gsap.set(w, { clearProps: "transform" }));
  };

  const schedule = (ms: number) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, ms);
  };

  function run() {
    if (!visible) return;
    const tr = title!.getBoundingClientRect();
    const dr = dot!.getBoundingClientRect();
    const D = dr.width;
    const local = (x: number, y: number) => ({ x: x - tr.left, y: y - tr.top });
    const fs = parseFloat(getComputedStyle(title!).fontSize);

    const start = local(dr.left + D / 2, dr.top + D / 2);
    gsap.set(runner, {
      width: D,
      height: D,
      x: start.x,
      y: start.y,
      xPercent: -50,
      yPercent: -50,
      scaleX: 1,
      scaleY: 1,
      visibility: "visible",
    });
    dot!.style.visibility = "hidden";

    tl = gsap.timeline({
      onComplete: () => {
        rest();
        schedule(4200);
      },
    });

    // Anticipation.
    tl.to(runner, { scaleX: 1.3, scaleY: 0.7, duration: 0.14, ease: "power2.inOut" }).to(runner, {
      scaleX: 0.9,
      scaleY: 1.15,
      duration: 0.08,
    });

    let curY = start.y;
    const hop = (toX: number, toY: number, dur: number, height: number, onLand?: () => void) => {
      const peak = Math.min(curY, toY) - height;
      const t = tl!.duration();
      tl!
        .to(runner, { x: toX, scaleX: 1, scaleY: 1, duration: dur, ease: "none" }, t)
        .to(runner, { y: peak, duration: dur * 0.5, ease: "power2.out" }, t)
        .to(runner, { y: toY, duration: dur * 0.5, ease: "power2.in" }, t + dur * 0.5);
      if (onLand) tl!.add(onLand, t + dur);
      tl!
        .to(runner, { scaleX: 1.32, scaleY: 0.66, duration: 0.05, ease: "power1.out" }, t + dur)
        .to(runner, { scaleX: 1, scaleY: 1, duration: 0.14, ease: "back.out(3)" });
      curY = toY;
    };

    words.forEach((word, i) => {
      const r = word.getBoundingClientRect();
      const p = local(r.left + r.width / 2, r.top + fs * 0.12 - D / 2 - 4);
      hop(p.x, p.y, i === 0 ? 0.9 : i === 2 ? 0.42 : 0.3, i === 0 ? fs * 0.9 : fs * 0.4, () => {
        gsap.fromTo(word, { y: 0 }, { y: fs * 0.035, duration: 0.07, yoyo: true, repeat: 1, ease: "power1.out" });
      });
    });

    // Back home: the period of "sell.".
    const home = local(dr.left + D / 2, dr.top + D / 2);
    hop(home.x, home.y, 0.4, fs * 0.45);
  }

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (!visible) {
        window.clearTimeout(timer);
        rest();
      } else {
        schedule(1500);
      }
    },
    { threshold: 0.35 }
  );
  io.observe(hero);

  schedule(2200);
}
