import { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";

const EASE_OUT_CUBIC = (t) => 1 - Math.pow(1 - t, 3);
const SCROLL_DURATION_MS = 350;

export default function PhotoCarousel({ photos }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const slidesRef = useRef([]);
  const positionRef = useRef(0);
  const animRef = useRef(null);
  const [active, setActive] = useState(0);
  // With several slides visible per view, the track's scroll position is
  // clamped so it never overshoots past the last slide's right edge —
  // which means the last few indices all clamp to that same position.
  // Without accounting for that, dots/next-clicks near the end stop
  // moving the carousel several steps before reaching the last dot, so
  // the carousel visually "finishes" before the controls do. maxIndex is
  // the first index that hits the clamp — the true last reachable stop —
  // and navigation is capped there instead of at photos.length - 1.
  const [maxIndex, setMaxIndex] = useState(Math.max(0, (photos?.length || 1) - 1));

  // Animates the track's transform ourselves (rAF + easing) rather than
  // making the track a native scroll container. A native overflow-x
  // container is also a scroll target for the mouse wheel/trackpad, and
  // browsers commonly redirect vertical wheel input into horizontal
  // scroll on an element like that when the cursor happens to be over
  // it — which is exactly what made the carousel appear to "grab" page
  // scroll and zoom/scroll itself. Driving position with transform on a
  // non-scrollable element removes that surface entirely: the only way
  // to move is the prev/next/dot controls, one slide per click.
  const moveToIndex = useCallback((index, animate = true) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const slide = slidesRef.current[index];
    if (!viewport || !track || !slide) return;
    const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
    const target = Math.min(slide.offsetLeft, maxOffset);

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!animate || reduceMotion) {
      positionRef.current = target;
      track.style.transform = `translateX(${-target}px)`;
      return;
    }

    const start = positionRef.current;
    const distance = target - start;
    const startTime = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - startTime) / SCROLL_DURATION_MS);
      const pos = start + distance * EASE_OUT_CUBIC(t);
      positionRef.current = pos;
      track.style.transform = `translateX(${-pos}px)`;
      animRef.current = t < 1 ? requestAnimationFrame(step) : null;
    };
    animRef.current = requestAnimationFrame(step);
  }, []);

  const goToIndex = (index) => {
    setActive(index);
    moveToIndex(index);
  };

  const go = (delta) => {
    setActive((prev) => {
      const next = Math.max(0, Math.min(maxIndex, prev + delta));
      moveToIndex(next);
      return next;
    });
  };

  const measureMaxIndex = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const slides = slidesRef.current;
    if (!viewport || !track || slides.length === 0) return photos.length - 1;
    const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
    const clampedIndex = slides.findIndex((slide) => slide && slide.offsetLeft >= maxOffset);
    return clampedIndex === -1 ? slides.length - 1 : clampedIndex;
  }, [photos.length]);

  // Measured before paint so the dot count is right from the first
  // render rather than briefly showing (and then shrinking from)
  // one-dot-per-photo.
  useLayoutEffect(() => {
    const next = measureMaxIndex();
    setMaxIndex(next);
    setActive((prev) => Math.min(prev, next));
  }, [measureMaxIndex, photos]);

  // Slide widths are responsive (clamp()), so a viewport resize can leave
  // both the reachable-stop count and the current slide's pixel offset
  // stale — recompute both and snap back into place instantly.
  useEffect(() => {
    const onResize = () => {
      const next = measureMaxIndex();
      setMaxIndex(next);
      setActive((prev) => {
        const clamped = Math.min(prev, next);
        moveToIndex(clamped, false);
        return clamped;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureMaxIndex, moveToIndex]);

  useEffect(() => () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
  }, []);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="fx-carousel">
      <div className="fx-carousel-viewport" ref={viewportRef}>
        <div className="fx-carousel-track" ref={trackRef}>
          {photos.map(({ src, alt }, i) => (
            <figure
              className={`blueprint ${i % 2 === 0 ? "duotone" : "duotone-2"} fx-carousel-slide`}
              key={src}
              ref={(el) => { slidesRef.current[i] = el; }}
            >
              <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
              <picture>
                <source srcSet={src.replace(/\.jpg$/, ".webp")} type="image/webp" />
                <img src={src} alt={alt} loading="lazy" />
              </picture>
            </figure>
          ))}
        </div>
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
            {photos.slice(0, maxIndex + 1).map((photo, i) => (
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
            disabled={active === maxIndex}
            aria-label="Next photo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"></path></svg>
          </button>
        </div>
      )}
    </div>
  );
}
