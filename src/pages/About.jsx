import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function About() {
  return (
    <>
      <Seo
        title="About — Family-Owned Custom Gear Machining Since 1960 | Flex Manufacturing"
        description="Flex Manufacturing, Inc. is a family-owned custom gear and precision machining sourcing house serving metro Detroit and beyond since 1960. Now in its second generation."
        path="/about"
      />

      <div className="wrap" style={{ maxWidth: 900, paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <span className="fx-kick">About Flex Manufacturing</span>
        <h1 className="fx-display" style={{ maxWidth: "16ch" }}>Family-owned and machining since 1960</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, margin: "24px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
          Flex Manufacturing, Inc. has been a custom gear and precision machining sourcing house for 66 years in the trade. Founded in 1960 and still family-owned, we serve manufacturers across metro Detroit and beyond &mdash; the plants, mills and shops that keep aging equipment running.
        </p>
        <p style={{ fontSize: 18, lineHeight: 1.6, margin: "20px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
          Customers send us a print, a drawing, or a photo of a worn or broken part. We coordinate manufacturing through a deep network of trusted metro Detroit shops &mdash; matching each job to the right machine and craftsman for gears, splines, grinding, turning and milling, at any quantity.
        </p>
        <p style={{ fontSize: 18, lineHeight: 1.6, margin: "20px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
          Now into its second generation, the business is being revitalized by the founder's grandson &mdash; same reputation for getting hard parts made right, backed by six decades of relationships.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 1, background: "var(--color-divider)", border: "1px solid var(--color-divider)", marginTop: 40 }}>
          {[
            { value: "1960", label: "Established" },
            { value: "60+", label: "Years in business" },
            { value: "2nd", label: "Generation, family-owned" },
            { value: "USA", label: "Veteran-Owned, U.S.-Based" },
          ].map(({ value, label }) => (
            <div key={label} style={{ background: "var(--color-bg)", padding: 22 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 36, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", color: "color-mix(in srgb,var(--color-text) 65%,transparent)", marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 44 }}>
          <span className="fx-kick">Industries We Serve</span>
          <hr className="fx-rule" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              "Nuclear Power", "Pharmaceutical", "Packaging", "Filling", "Aerospace",
              "Mining", "Power Transmission", "Wind & Solar", "Steel, Paper & Plastic", "Military",
            ].map((industry) => (
              <span
                key={industry}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 13,
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                  padding: "9px 16px",
                  border: "1px solid var(--color-divider)",
                  color: "color-mix(in srgb,var(--color-text) 82%,transparent)",
                }}
              >
                {industry}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Request a Quote</Link>
          <a href="tel:+15867918060" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Call (586) 791-8060</a>
        </div>

        <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: "70ch", margin: "44px 0 0", paddingTop: 24, borderTop: "1px solid var(--color-divider)", color: "color-mix(in srgb,var(--color-text) 65%,transparent)" }}>
          Flex Manufacturing, Inc. is an Equal Opportunity Employer. We do not discriminate on the basis of race, color, religion, sex, national origin, age, disability, veteran status, or any other status protected by applicable federal, state, or local law, in employment or in the provision of services.
        </p>
      </div>
    </>
  );
}
