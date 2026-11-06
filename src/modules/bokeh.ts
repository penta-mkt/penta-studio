/**
 * The soft coloured lights of the final section are alive:
 * they drift on their own, slip away from the cursor and can be grabbed
 * and thrown with the mouse (or a finger).
 */
interface Orb {
  el: HTMLElement;
  hx: number; // home centre
  hy: number;
  r: number;
  x: number; // offset from home
  y: number;
  vx: number;
  vy: number;
  ph: number;
  fx: number;
  fy: number;
  ax: number;
  ay: number;
  held: boolean;
}

export function initBokeh(reduce: boolean): void {
  const section = document.querySelector<HTMLElement>(".final");
  const field = section?.querySelector<HTMLElement>(".bokeh");
  if (!section || !field) return;
  const els = Array.from(field.querySelectorAll<HTMLElement>("b"));
  if (!els.length) return;

  const orbs: Orb[] = [];
  const measure = () => {
    const box = field.getBoundingClientRect();
    els.forEach((el, i) => {
      const prev = el.style.transform;
      el.style.transform = "none";
      const r = el.getBoundingClientRect();
      el.style.transform = prev;
      const o = orbs[i] ?? (orbs[i] = { el, hx: 0, hy: 0, r: 0, x: 0, y: 0, vx: 0, vy: 0, ph: Math.random() * 6.28, fx: 0.15 + Math.random() * 0.25, fy: 0.12 + Math.random() * 0.22, ax: 30 + Math.random() * 70, ay: 24 + Math.random() * 60, held: false });
      o.hx = r.left - box.left + r.width / 2;
      o.hy = r.top - box.top + r.height / 2;
      o.r = r.width / 2;
    });
  };
  measure();
  field.classList.add("is-live");
  new ResizeObserver(measure).observe(field);

  let mx = -9999;
  let my = -9999;
  let inside = false;
  let grab: Orb | null = null;
  let lastX = 0;
  let lastY = 0;
  let visible = false;

  const local = (e: PointerEvent) => {
    const b = field.getBoundingClientRect();
    return { x: e.clientX - b.left, y: e.clientY - b.top };
  };
  const pick = (x: number, y: number): Orb | null => {
    let best: Orb | null = null;
    let bd = 1e9;
    orbs.forEach((o) => {
      const d = Math.hypot(o.hx + o.x - x, o.hy + o.y - y);
      if (d < o.r + 18 && d < bd) {
        best = o;
        bd = d;
      }
    });
    return best;
  };

  section.addEventListener("pointermove", (e) => {
    const p = local(e);
    mx = p.x;
    my = p.y;
    inside = true;
    if (!grab) section.classList.toggle("is-over-orb", !!pick(p.x, p.y) && !(e.target as HTMLElement).closest("a, button"));
  });
  section.addEventListener("pointerleave", () => {
    inside = false;
    mx = my = -9999;
    section.classList.remove("is-over-orb");
  });
  section.addEventListener("pointerdown", (e) => {
    if ((e.target as HTMLElement).closest("a, button")) return;
    const p = local(e);
    const o = pick(p.x, p.y);
    if (!o) return;
    grab = o;
    o.held = true;
    lastX = p.x;
    lastY = p.y;
    section.classList.add("is-grabbing");
    e.preventDefault();
  });
  window.addEventListener("pointermove", (e) => {
    if (!grab) return;
    const p = local(e);
    grab.vx = (p.x - lastX) * 0.9;
    grab.vy = (p.y - lastY) * 0.9;
    grab.x = p.x - grab.hx;
    grab.y = p.y - grab.hy;
    lastX = p.x;
    lastY = p.y;
  });
  const release = () => {
    if (!grab) return;
    grab.held = false;
    grab = null;
    section.classList.remove("is-grabbing");
  };
  window.addEventListener("pointerup", release);
  window.addEventListener("pointercancel", release);

  new IntersectionObserver((en) => (visible = en[0].isIntersecting), { rootMargin: "100px" }).observe(section);

  let t0 = performance.now();
  const tick = (now: number) => {
    requestAnimationFrame(tick);
    if (!visible) return;
    const t = (now - t0) / 1000;
    const damp = 0.94;
    orbs.forEach((o) => {
      if (!o.held) {
        // gentle wandering: spring towards a slow orbit around home
        const tx = reduce ? 0 : Math.sin(t * o.fx + o.ph) * o.ax;
        const ty = reduce ? 0 : Math.cos(t * o.fy + o.ph * 1.3) * o.ay;
        o.vx += (tx - o.x) * 0.0016;
        o.vy += (ty - o.y) * 0.0016;
        // slip away from the cursor
        if (inside) {
          const dx = o.hx + o.x - mx;
          const dy = o.hy + o.y - my;
          const d = Math.hypot(dx, dy) || 1;
          const reach = o.r + 150;
          if (d < reach) {
            const f = ((reach - d) / reach) ** 2 * 1.6;
            o.vx += (dx / d) * f;
            o.vy += (dy / d) * f;
          }
        }
        o.vx *= damp;
        o.vy *= damp;
        o.x += o.vx;
        o.y += o.vy;
      }
      o.el.style.transform = `translate3d(${o.x.toFixed(1)}px, ${o.y.toFixed(1)}px, 0)`;
    });
  };
  requestAnimationFrame(tick);
}
