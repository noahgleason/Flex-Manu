import { useEffect } from "react";

const FADE_DISTANCE = 900; // px of scroll over which the blue fully fades to the grid

function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

// Drives body's own background-color directly (rather than a separate
// overlay layer) so it's unambiguously "the page background" — an overlay
// competing via z-index only shows through gaps between content, and gets
// masked by the sticky header's own near-opaque background at the top.
export default function ScrollVeil() {
  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const from = hexToRgb(style.getPropertyValue("--color-accent-2").trim() || "#3f6e63");
    const to = hexToRgb(style.getPropertyValue("--color-bg").trim() || "#17191a");

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let ticking = false;
    function update() {
      const y = window.scrollY || window.pageYOffset || 0;
      const t = Math.min(1, Math.max(0, y / FADE_DISTANCE));
      const r = lerp(from[0], to[0], t);
      const g = lerp(from[1], to[1], t);
      const b = lerp(from[2], to[2], t);
      document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.style.backgroundColor = "";
    };
  }, []);

  return null;
}
