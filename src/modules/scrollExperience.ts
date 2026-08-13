import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Options {
  isMobile: boolean;
  reduceMotion: boolean;
}

/**
 * THE core interaction prototype for this build.
 *
 * Maps scroll progress inside a pinned section directly to a video's
 * playback time (scroll → video.currentTime), instead of letting the
 * video play on its own timeline. This turns the clip into something
 * the user "drives" with the scrollbar rather than watches passively.
 *
 * Three things make this feel good and actually work reliably:
 *  1. The scrub value is *smoothed* (lerped) on a rAF loop, rather than
 *     slamming currentTime on every scroll tick — raw scroll deltas are
 *     noisy and cause visible stutter when applied 1:1 to a video.
 *  2. Preloading is triggered with a muted play()/pause() rather than
 *     relying on the declarative `preload="auto"` hint or a bare
 *     `.load()` call — several browser/embedding contexts silently defer
 *     fetching an off-screen video until playback is actually requested,
 *     which would otherwise leave the element stuck with no data.
 *  3. That same play()/pause() doubles as the iOS "unlock" a video needs
 *     before it will accept programmatic seeks.
 */
export function initScrollExperience({ isMobile, reduceMotion }: Options): void {
  const section = document.querySelector<HTMLElement>(".scroll-exp");
  const pin = document.querySelector<HTMLElement>(".scroll-exp__pin");
  const video = document.getElementById("scrub-video") as HTMLVideoElement | null;
  const progressFill = document.getElementById("scrub-progress-fill");
  const steps = gsap.utils.toArray<HTMLElement>(".scroll-exp__step");

  if (!section || !pin || !video) return;

  let duration = 0;
  let ready = false;
  let targetTime = 0;
  let displayedTime = 0;

  const onMeta = () => {
    duration = video.duration || 0;
    ready = duration > 0 && Number.isFinite(duration);
  };

  if (video.readyState >= 1 && video.duration) {
    onMeta();
  } else {
    video.addEventListener("loadedmetadata", onMeta, { once: true });
  }

  // Kick off real fetching + iOS seek-unlock once the section is roughly
  // a viewport away, so it's ready well before the user scrubs it — but
  // not at boot, keeping later videos out of the initial page load.
  const preloadObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        video
          .play()
          .then(() => video.pause())
          .catch(() => {
            /* autoplay may be blocked in some contexts — safe to ignore */
          });
        preloadObserver.disconnect();
      });
    },
    { rootMargin: "100% 0px" }
  );
  preloadObserver.observe(section);

  // Smoothing loop: ease the displayed frame toward the scroll-driven target.
  // The video.currentTime assignment is a real seek, not a cheap property
  // write — the browser has to decode from the nearest keyframe forward.
  // Firing that on every rAF tick (up to 60/sec) is far finer than the
  // source's own frame rate can show, so it's throttled to roughly one
  // video frame's worth of change (~1/24s) instead of a near-zero delta.
  const MIN_SEEK_DELTA = 1 / 24;
  gsap.ticker.add(() => {
    if (!ready) return;
    const lerpFactor = reduceMotion ? 1 : 0.18;
    displayedTime += (targetTime - displayedTime) * lerpFactor;
    if (Math.abs(displayedTime - video.currentTime) > MIN_SEEK_DELTA) {
      video.currentTime = displayedTime;
    }
  });

  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "bottom bottom",
    pin,
    scrub: isMobile ? true : 0.4,
    onUpdate: (self) => {
      const progress = self.progress;
      if (ready) targetTime = progress * duration;
      if (progressFill) progressFill.style.height = `${progress * 100}%`;

      const stepIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      steps.forEach((el, i) => el.classList.toggle("is-active", i === stepIndex));
    },
  });
}
