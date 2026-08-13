/**
 * Progressive media loading: showcase and final-CTA videos only fetch
 * their source and start playing once they're about to enter the
 * viewport, and pause (freeing decode work) once they leave it. This is
 * what keeps the hero as the only video loaded at first paint.
 */
export function initLazyVideos(): void {
  const videos = document.querySelectorAll<HTMLVideoElement>("[data-lazy-video]");
  if (!videos.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          const sources = video.querySelectorAll<HTMLSourceElement>("source[data-src]");
          let needsLoad = false;
          sources.forEach((source) => {
            if (!source.src && source.dataset.src) {
              source.src = source.dataset.src;
              needsLoad = true;
            }
          });
          if (needsLoad) video.load();
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { rootMargin: "200px 0px", threshold: 0.15 }
  );

  videos.forEach((v) => io.observe(v));
}
