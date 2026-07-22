import { useRef, useState, useEffect, useCallback } from "react";

const EASE_OUT_CUBIC = (t) => 1 - Math.pow(1 - t, 3);
const SCROLL_DURATION_MS = 350;

export default function PhotoCarousel({ photos }) {
  const trackRef = useRef(null);
  const slidesRef = useRef([]);
  const targetRef = useRef(0);
  const animRef = useRef(null);
  const [active, setActive] = useState(0);

  // Animates scrollLeft ourselves (rAF + easing) instead of relying on the
  // browser's native `scrollTo({behavior:"smooth"})`. Retriggering a native
  // smooth scroll before the previous one settles is a known source of
  // flakiness across browsers — sometimes silently dropping the scroll
  // entirely — which is exactly what rapid clicking on the prev/next
  // buttons does. Driving it ourselves means a new target always cleanly
  // cancels and replaces the in-flight animation.
  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    const slide = slidesRef.current[index];
    if (!track || !slide) return;
    const target = Math.min(slide.offsetLeft, track.scrollWidth - track.clientWidth);

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      track.scrollLeft = target;
      return;
    }

    const start = track.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - startTime) / SCROLL_DURATION_MS);
      track.scrollLeft = start + distance * EASE_OUT_CUBIC(t);
      animRef.current = t < 1 ? requestAnimationFrame(step) : null;
    };
    animRef.current = requestAnimationFrame(step);
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
    // Debounced until scrolling actually settles — during our own in-flight
    // animation this fires on every frame with a transient position;
    // updating targetRef from those would let a rapid second click read a
    // stale, not-yet-arrived target and undercount again.
    let settleTimer = null;
    const onScroll = () => {
      if (settleTimer) clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        settleTimer = null;
        // With several slides visible per view, the browser can't scroll far
        // enough right to bring the last (visibleCount-1) slides flush to the
        // left edge, so their scroll targets all clamp to the same maximum
        // scrollLeft. Detect that clamped state directly rather than via
        // nearest-offset, which would otherwise pick an earlier slide than
        // the one actually requested.
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
        if (atEnd) {
          const last = slidesRef.current.length - 1;
          targetRef.current = last;
          setActive(last);
          return;
        }
        let closest = 0;
        let closestDist = Infinity;
        slidesRef.current.forEach((slide, i) => {
          const dist = Math.abs(slide.offsetLeft - track.scrollLeft);
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

  useEffect(() => () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="fx-carousel">
      <div className="fx-carousel-track" ref={trackRef}>
        {photos.map(({ src, alt }, i) => (
          <figure
            className="blueprint duotone fx-carousel-slide"
            key={src}
            ref={(el) => { slidesRef.current[i] = el; }}
          >
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
