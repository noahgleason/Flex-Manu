import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const NEXT_STEPS = [
  ["01", "We review your print", "A machinist looks over your drawing, photo, or sketch and matches it to the right process and shop."],
  ["02", "We send a quote", "Usually same or next business day — pricing, lead time, and any questions we have about the job."],
  ["03", "You approve, we get started", "Once you're ready, we schedule the work and keep you posted through delivery."],
];

export default function ThankYou() {
  return (
    <>
      <Seo title="Thank You | Flex Manufacturing, Inc." path="/thank-you" noindex />

      <div className="wrap" style={{ maxWidth: 900, paddingTop: "clamp(64px,9vw,120px)", paddingBottom: "clamp(64px,9vw,120px)" }}>
        <span className="fx-kick">Request Received</span>
        <h1 className="fx-display" style={{ maxWidth: "16ch" }}>Thanks &mdash; we&rsquo;ve got your request</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: "56ch", margin: "22px 0 0", color: "color-mix(in srgb,var(--color-text) 84%,transparent)" }}>
          We reply with a quote &mdash; usually same or next business day. Here&rsquo;s what happens next.
        </p>

        <dl className="fx-speclist" style={{ marginTop: 40, border: "1px solid var(--color-divider)" }}>
          {NEXT_STEPS.map(([num, title, body]) => (
            <div className="fx-specrow" key={num}>
              <dt>{num} &middot; {title}</dt>
              <dd>{body}</dd>
            </div>
          ))}
        </dl>

        <div className="blueprint" style={{ padding: 24, marginTop: 32, maxWidth: 420 }}>
          <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 17, textTransform: "uppercase", margin: "0 0 14px" }}>Need it faster? Call us.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <a href="tel:+15867918060" style={{ fontFamily: "var(--font-heading)", fontSize: 19, color: "var(--color-accent-700)", textDecoration: "none" }}>Dave: (586) 791-8060</a>
            <a href="tel:+16166907648" style={{ fontFamily: "var(--font-heading)", fontSize: 19, color: "var(--color-accent-700)", textDecoration: "none" }}>Noah: (616) 690-7648</a>
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <Link to="/" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Back to Home</Link>
        </div>
      </div>
    </>
  );
}
