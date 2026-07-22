import { useRef, useState, useEffect, useCallback } from "react";

export default function PhotoCarousel({ photos }) {
  const trackRef = useRef(null);
  const targetRef = useRef(0);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[index];
    if (!slide) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: slide.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  const goToIndex = (index) => {
    targetRef.current = index;
    setActive(index);
    scrollToIndex(index);
  };

  // Reads targetRef (not the `active` state) so rapid clicks each advance
  // from the last requested slide instead of collapsing into one step when
  // several clicks land before a re-render commits the new `active`.
  const go = (delta) => {
    const next = Math.max(0, Math.min(photos.length - 1, targetRef.current + delta));
    goToIndex(next);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Debounced until scrolling actually settles — during an in-flight
    // smooth scroll this fires on every frame with a transient position;
    // updating targetRef from those would let a rapid second click read a
    // stale, not-yet-arrived target and undercount again.
    let settleTimer = null;
    const onScroll = () => {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        settleTimer = null;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
        if (atEnd) {
          const last = track.children.length - 1;
          targetRef.current = last;
          setActive(last);
          return;
        }
        const children = Array.from(track.children);
        let closest = 0;
        let closestDist = Infinity;
        children.forEach((child, i) => {
          const dist = Math.abs(child.offsetLeft - track.scrollLeft);
          if (dist < closestDist) { closestDist = dist; closest = i; }
        });
        targetRef.current = closest;
        setActive(closest);
      }, 100);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (settleTimer) clearTimeout(settleTimer);
    };
  }, [photos]);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="fx-carousel">
      <div className="fx-carousel-track" ref={trackRef}>
        {photos.map(({ src, alt }, i) => (
          <figure className="blueprint duotone fx-carousel-slide" key={src} data-index={i}>
            <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
            <img src={src} alt={alt} loading="lazy" />
          </figure>
        ))}
      </div>

      {photos.length > 1 && (
        <div className="fx-carousel-controls">
          <button
            type="button"
            className="btn btn-secondary btn-icon"
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="Previous photo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"></path></svg>
          </button>

          <div className="fx-carousel-dots" role="tablist" aria-label="Photo carousel navigation">
            {photos.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to photo ${i + 1}`}
                className={`fx-carousel-dot${i === active ? " is-active" : ""}`}
                onClick={() => goToIndex(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-icon"
            onClick={() => go(1)}
            disabled={active === photos.length - 1}
            aria-label="Next photo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"></path></svg>
          </button>
        </div>
      )}
    </div>
  );
}
