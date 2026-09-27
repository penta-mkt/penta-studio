import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dictionary, DEFAULT_LANG, STORAGE_KEY, type Lang } from "../i18n/dictionary";

/**
 * Minimal i18n layer: a flat key → string dictionary applied directly to
 * the DOM via textContent, with no templating/build-step dependency.
 *
 * Safety rule this file is built around: every [data-i18n] target is a
 * LEAF element (or an element whose only children are things we also
 * fully own, like the hero title lines). We only ever touch textContent,
 * never innerHTML, and we never remove/replace the elements themselves —
 * so any other module holding a reference to one of these nodes (GSAP
 * targets in hero.ts, scrollExperience.ts, capabilities.ts, the
 * [data-reveal] set in reveals.ts) keeps working untouched after a
 * language switch.
 */

function getStoredLang(): Lang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "es" || stored === "en" ? stored : null;
  } catch {
    return null;
  }
}

function storeLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* private browsing / storage disabled — language just won't persist */
  }
}

let currentLang: Lang = DEFAULT_LANG;

export function getCurrentLang(): Lang {
  return currentLang;
}

export function applyLanguage(lang: Lang): void {
  const dict = dictionary[lang];
  currentLang = lang;

  document.documentElement.lang = lang;

  const title = dict["meta.title"];
  if (title) document.title = title;

  const description = dict["meta.description"];
  if (description) {
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    const value = dict[key];
    if (value === undefined) return;
    el.textContent = value;
  });

  document.querySelectorAll<HTMLElement>("[data-lang-current]").forEach((el) => {
    el.textContent = lang === "es" ? "EN" : "ES";
  });

  document.querySelectorAll<HTMLElement>("[data-lang-toggle]").forEach((el) => {
    el.setAttribute("aria-label", lang === "es" ? "Switch to English" : "Cambiar a español");
  });

  // Copy length changes between languages, which can change wrapped-text
  // heights inside pinned sections (showcase, scroll-exp) — re-measure
  // once layout settles so scrub distances stay accurate.
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

export function initLanguageToggle(): void {
  const initial = getStoredLang() ?? DEFAULT_LANG;
  applyLanguage(initial);

  document.querySelectorAll<HTMLButtonElement>("[data-lang-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next: Lang = currentLang === "es" ? "en" : "es";
      applyLanguage(next);
      storeLang(next);
    });
  });
}
