import "./styles/main.css";

import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initSmoothScroll } from "./modules/smoothScroll";
import { initNav } from "./modules/nav";
import { initReveals } from "./modules/reveals";
import { initStrips } from "./modules/strips";
import { initResults } from "./modules/results";
import { initLazyVideos } from "./modules/lazyVideo";
import { initLanguageToggle } from "./modules/i18n";
import { initIntro } from "./modules/intro";
import { initScrollMotion } from "./modules/scrollMotion";
import { initHeroHop } from "./modules/heroHop";
import { initTrafo3D } from "./modules/t3dPin";
import { initBokeh } from "./modules/bokeh";
import { initMagnetic, initHeroParallax } from "./modules/magnetic";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Apply the saved/default language first so nothing flashes in the wrong one.
initLanguageToggle();

const lenis = initSmoothScroll();
initNav(lenis);
initReveals();
initStrips();
initResults();
initLazyVideos();
initScrollMotion(reduce);
initTrafo3D(reduce);
initBokeh(reduce);
initMagnetic();
initHeroParallax();

// Opening motion graphic, then the hero keeps hopping the dot.
initIntro(lenis).then(() => initHeroHop());

// Pinned scenes depend on final layout: fonts and images.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener("load", () => ScrollTrigger.refresh());
