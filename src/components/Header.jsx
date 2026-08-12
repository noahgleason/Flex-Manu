import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/capabilities", label: "Capabilities" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
];

// Two thresholds (not one) so the compact toggle has hysteresis: once
// compact, scrollY has to drop well below the point that triggered it
// before it un-compacts. A single shared threshold caused a feedback
// loop on some desktops — shrinking the header shifts page content up
// ~16px, browsers' scroll-anchoring nudges scrollY to compensate, and
// that nudge alone was enough to cross back over the one threshold,
// flip the class again, and repeat, which read as a visible jitter.
// The 24px gap between these two values is comfortably bigger than
// that 16px shift, so a single anchoring correction can't re-trigger it.
const SCROLL_COMPACT_ON = 32;
const SCROLL_COMPACT_OFF = 8;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const close = () => setOpen(false);

  // rAF-throttled scroll listener, same idiom as ScrollVeil.jsx — toggles
  // a class rather than driving inline styles, so the transition lives in CSS.
  useEffect(() => {
    let ticking = false;
    function update() {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > SCROLL_COMPACT_OFF : y > SCROLL_COMPACT_ON));
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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "wrap is-scrolled" : "wrap"}>
      <nav className="fx-nav" aria-label="Primary">
        <Link className="fx-brand" to="/" onClick={close}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1.5v3M12 19.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1.5 12h3M19.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"></path>
          </svg>
          <span>FLEX<span style={{ color: "var(--color-accent-2-700)", fontWeight: 400 }}> MANUFACTURING</span></span>
        </Link>
        <button
          type="button"
          className="fx-nav-toggle"
          aria-expanded={open}
          aria-controls="fx-nav-links"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg className="fx-nav-toggle-open" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M3 12h18M3 18h18"></path>
          </svg>
          <svg className="fx-nav-toggle-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6l12 12M18 6L6 18"></path>
          </svg>
        </button>
        <div className={open ? "fx-nav-links is-open" : "fx-nav-links"} id="fx-nav-links">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} onClick={close}>
              {label}
            </NavLink>
          ))}
        </div>
        <a href="tel:+15867918060" className="btn btn-secondary" style={{ textDecoration: "none", gap: 7 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z"></path>
          </svg>
          (586) 791-8060
        </a>
        <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none" }} onClick={close}>
          Get a Quote
        </Link>
      </nav>
    </header>
  );
}
