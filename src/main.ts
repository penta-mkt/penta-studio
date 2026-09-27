import "./styles/main.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { initSmoothScroll } from "./modules/smoothScroll";
import { initPreloader } from "./modules/preloader";
import { initNav } from "./modules/nav";
import { initHero } from "./modules/hero";
import { initReveals } from "./modules/reveals";
import { initScrollExperience } from "./modules/scrollExperience";
import { initProductGallery } from "./modules/productGallery";
import { initShowcase } from "./modules/showcase";
import { initCapabilities } from "./modules/capabilities";
import { initResults } from "./modules/results";
import { initLazyVideos } from "./modules/lazyVideo";
import { initLanguageToggle } from "./modules/i18n";

gsap.registerPlugin(ScrollTrigger);

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 720px)").matches;

async function boot() {
  // Apply the saved/default language before anything else measures or
  // reveals text, so there's no visible flash of the wrong language.
  initLanguageToggle();

  const lenis = initSmoothScroll();

  initNav(lenis);
  initReveals();
  initHero({ reduceMotion });
  initScrollExperience({ isMobile, reduceMotion });
  initProductGallery();
  initShowcase({ isMobile });
  initCapabilities();
  initResults();
  initLazyVideos();

  await initPreloader();

  // Layout can shift once the preloader is gone (nav appears, fonts
  // settle) — refresh so every pinned section measures correctly.
  ScrollTrigger.refresh();

  window.addEventListener("resize", () => ScrollTrigger.refresh());
}

boot();
