import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function ThankYou() {
  return (
    <>
      <Seo title="Thank You | Flex Manufacturing, Inc." path="/thank-you" noindex />

      <div className="wrap" style={{ maxWidth: 700, paddingTop: "clamp(64px,9vw,120px)", paddingBottom: "clamp(64px,9vw,120px)" }}>
        <span className="fx-kick">Request Received</span>
        <h1 className="fx-display" style={{ maxWidth: "16ch" }}>Thanks &mdash; we&rsquo;ve got your request</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: "56ch", margin: "22px 0 0", color: "color-mix(in srgb,var(--color-text) 84%,transparent)" }}>
          We reply with a quote &mdash; usually same or next business day. If it&rsquo;s urgent, call us directly at{" "}
          <a href="tel:+15864691076" style={{ color: "var(--color-accent-700)", fontWeight: 500 }}>(586) 469-1076</a>.
        </p>
        <div style={{ marginTop: 32 }}>
          <Link to="/" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Back to Home</Link>
        </div>
      </div>
    </>
  );
}
