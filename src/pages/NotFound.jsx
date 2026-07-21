import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | Flex Manufacturing, Inc." path="/404" noindex />

      <div className="wrap" style={{ maxWidth: 700, paddingTop: "clamp(64px,9vw,120px)", paddingBottom: "clamp(64px,9vw,120px)" }}>
        <span className="fx-kick">404</span>
        <h1 className="fx-display" style={{ maxWidth: "16ch" }}>Page not found</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: "56ch", margin: "22px 0 0", color: "color-mix(in srgb,var(--color-text) 84%,transparent)" }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Try one of the links below, or call us directly at{" "}
          <a href="tel:+15864691076" style={{ color: "var(--color-accent-700)", fontWeight: 500 }}>(586) 469-1076</a>.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 32 }}>
          <Link to="/" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Back to Home</Link>
          <Link to="/capabilities" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Capabilities</Link>
          <Link to="/quote" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Request a Quote</Link>
        </div>
      </div>
    </>
  );
}
