import { Link } from "react-router-dom";

const SITE_LINKS = [
  { to: "/", label: "Home" },
  { to: "/capabilities", label: "Capabilities" },
  { to: "/reverse-engineering", label: "Reverse Engineering" },
  { to: "/about", label: "About" },
  { to: "/quote", label: "Request a Quote" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-neutral-900)", color: "var(--color-text)", marginTop: "auto" }}>
      <div className="wrap" style={{ paddingTop: "clamp(40px,4vw,56px)", paddingBottom: "clamp(40px,4vw,56px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ color: "var(--color-accent-300)" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1.5v3M12 19.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1.5 12h3M19.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"></path>
              </svg>
            </span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 18 }}>FLEX MANUFACTURING, INC.</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb,var(--color-text) 72%,transparent)" }}>
            Custom gears, splines &amp; precision machining. Family-owned since 1974, serving metro Detroit and beyond.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--color-accent-300)", margin: "0 0 12px" }}>Contact</h4>
          <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0, color: "color-mix(in srgb,var(--color-text) 80%,transparent)" }}>
            44805 Trinity Dr<br />Clinton Township, MI 48038<br />
            <a href="tel:+15867918060" style={{ color: "var(--color-text)", fontWeight: 500 }}>Dave Gleason: (586) 791-8060</a><br />
            <a href="tel:+16166907648" style={{ color: "var(--color-text)", fontWeight: 500 }}>Noah Gleason: (616) 690-7648</a>
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--color-accent-300)", margin: "0 0 12px" }}>Site</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
            {SITE_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} style={{ color: "color-mix(in srgb,var(--color-text) 82%,transparent)", textDecoration: "none" }}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid color-mix(in srgb,var(--color-text) 16%,transparent)" }}>
        <div className="wrap" style={{ paddingTop: 18, paddingBottom: 18, display: "flex", flexWrap: "wrap", gap: "6px 20px", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "color-mix(in srgb,var(--color-text) 60%,transparent)" }}>
          <span>&copy; 1974&ndash;2026 Flex Manufacturing, Inc. &nbsp;&middot;&nbsp; Custom gear manufacturer &mdash; large diameter gears, spline grinding &amp; gear reverse engineering &mdash; Clinton Township, Michigan.</span>
          <Link to="/privacy-policy" style={{ color: "color-mix(in srgb,var(--color-text) 60%,transparent)" }}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
