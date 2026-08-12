import { Link, Outlet } from "react-router-dom";

export default function MinimalLayout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="wrap" style={{ paddingTop: 26, paddingBottom: 6 }}>
        <Link
          to="/"
          className="fx-link-fade"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
            fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: ".04em", textTransform: "uppercase",
            color: "color-mix(in srgb,var(--color-text) 70%,transparent)",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"></path></svg>
          Flex Manufacturing, Inc.
        </Link>
      </div>
      <main id="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <div style={{ borderTop: "1px solid var(--color-divider)" }}>
        <div className="wrap" style={{ paddingTop: 18, paddingBottom: 18, fontSize: 12, textAlign: "center", color: "color-mix(in srgb,var(--color-text) 55%,transparent)" }}>
          &copy; 1974&ndash;2026 Flex Manufacturing, Inc. &nbsp;&middot;&nbsp; 44805 Trinity Dr, Clinton Township, MI 48038
        </div>
      </div>
    </div>
  );
}
