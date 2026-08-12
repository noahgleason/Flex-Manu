import { useEffect, useState } from "react";
import Seo from "../components/Seo.jsx";
import RFQForm from "../components/RFQForm.jsx";

const VISIT_COUNT_KEY = "fx_quote_visit_count";

export default function Quote() {
  const [customerStatus, setCustomerStatus] = useState("New Customer");

  useEffect(() => {
    try {
      const prevVisits = parseInt(window.localStorage.getItem(VISIT_COUNT_KEY) || "0", 10);
      window.localStorage.setItem(VISIT_COUNT_KEY, String(prevVisits + 1));
      setCustomerStatus(prevVisits >= 1 ? "Returning Customer" : "New Customer");
    } catch {
      // localStorage unavailable (e.g. private browsing) — default to New Customer stands.
    }
  }, []);

  return (
    <>
      <Seo
        title="Request a Quote | Flex Manufacturing — Metro Detroit"
        description="Request a quote for custom gears, splines, grinding, turning, or milling — single parts or a full multi-part order. Attach a print. Family-owned since 1960."
        path="/quote"
      />

      <div className="wrap" style={{ maxWidth: 820, paddingTop: "clamp(28px,4vw,48px)", paddingBottom: "clamp(56px,7vw,96px)" }}>
        <div style={{ borderBottom: "1px solid var(--color-divider)", paddingBottom: 24, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, color: "var(--color-accent-700)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1.5v3M12 19.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1.5 12h3M19.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"></path>
            </svg>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 15, letterSpacing: ".06em", textTransform: "uppercase" }}>Flex Manufacturing, Inc.</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".01em", fontSize: "clamp(28px,4vw,38px)", margin: "0 0 12px" }}>
            Request for Quote
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, maxWidth: "62ch", margin: 0, color: "color-mix(in srgb,var(--color-text) 82%,transparent)" }}>
            Complete the form below with as much detail as you have — one part or a full multi-part order. We respond with pricing and lead time, usually same or next business day.
          </p>
        </div>

        <RFQForm formName="quote" customerStatus={customerStatus} />

        <div style={{ marginTop: 30, paddingTop: 24, borderTop: "1px solid var(--color-divider)", display: "flex", flexWrap: "wrap", gap: "10px 32px", fontSize: 14, color: "color-mix(in srgb,var(--color-text) 78%,transparent)" }}>
          <span>
            Prefer to call?{" "}
            <a href="tel:+15867918060" className="fx-link-fade" style={{ color: "var(--color-accent-700)", fontWeight: 500 }}>Dave: (586) 791-8060</a>
            {" "}&middot;{" "}
            <a href="tel:+16166907648" className="fx-link-fade" style={{ color: "var(--color-accent-700)", fontWeight: 500 }}>Noah: (616) 690-7648</a>
          </span>
          <a href="mailto:flexmfg@sbcglobal.net" className="fx-link-fade" style={{ color: "var(--color-accent-700)", fontWeight: 500, textDecoration: "none" }}>flexmfg@sbcglobal.net</a>
        </div>
      </div>
    </>
  );
}
