/**
 * Preloader waits (up to a fallback timeout) for the hero video to be
 * playable, animates a progress bar, then fades out and reveals the nav.
 * Resolves once the intro is fully dismissed so main.ts can refresh
 * ScrollTrigger measurements against the final, visible layout.
 */
export function initPreloader(): Promise<void> {
  return new Promise((resolve) => {
    const preloader = document.getElementById("preloader");
    const fill = document.getElementById("preloader-fill");
    const heroVideo = document.getElementById("hero-video") as HTMLVideoElement | null;
    const nav = document.querySelector(".nav");

    let progress = 0;
    let done = false;
    let rafId = 0;

    const tick = () => {
      if (done) return;
      progress = Math.min(progress + (100 - progress) * 0.06 + 0.4, 96);
      if (fill) fill.style.width = `${progress}%`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(rafId);
      if (fill) fill.style.width = "100%";

      window.setTimeout(() => {
        if (preloader) {
          preloader.style.transition = "opacity 0.7s ease";
          preloader.style.opacity = "0";
          preloader.style.pointerEvents = "none";
        }
        nav?.classList.add("is-visible");
        resolve();
      }, 220);
    };

    const fallback = window.setTimeout(finish, 3200);

    if (heroVideo) {
      if (heroVideo.readyState >= 3) {
        window.clearTimeout(fallback);
        finish();
      } else {
        heroVideo.addEventListener(
          "canplay",
          () => {
            window.clearTimeout(fallback);
            finish();
          },
          { once: true }
        );
      }
    } else {
      window.clearTimeout(fallback);
      finish();
    }
  });
}
