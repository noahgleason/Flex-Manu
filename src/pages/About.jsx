import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function About() {
  return (
    <>
      <Seo
        title="About — Family-Owned Custom Gear Machining Since 1974 | Flex Manufacturing"
        description="Flex Manufacturing, Inc. is a family-owned custom gear and precision machining sourcing house serving metro Detroit and beyond since 1974. Now in its second generation."
        path="/about"
      />

      <div className="wrap" style={{ maxWidth: 900, paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <span className="fx-kick">About Flex Manufacturing</span>
        <h1 className="fx-display" style={{ maxWidth: "16ch" }}>Family-owned and machining since 1974</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, margin: "24px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
          Flex Manufacturing, Inc. has been a custom gear and precision machining sourcing house for over 50 years. Founded in 1974 and still family-owned, we serve manufacturers across metro Detroit and beyond &mdash; the plants, mills and shops that keep aging equipment running.
        </p>
        <p style={{ fontSize: 18, lineHeight: 1.6, margin: "20px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
          Customers send us a print, a drawing, or a photo of a worn or broken part. We coordinate manufacturing through a deep network of trusted metro Detroit shops &mdash; matching each job to the right machine and craftsman for gears, splines, grinding, turning, milling and reverse engineering, at any quantity.
        </p>
        <p style={{ fontSize: 18, lineHeight: 1.6, margin: "20px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
          Now into its second generation, the business is being revitalized by the founder's grandson &mdash; same reputation for getting hard parts made right, backed by five decades of relationships.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 1, background: "var(--color-divider)", border: "1px solid var(--color-divider)", marginTop: 40 }}>
          {[
            { value: "1974", label: "Established" },
            { value: "50+", label: "Years in business" },
            { value: "2nd", label: "Generation, family-owned" },
          ].map(({ value, label }) => (
            <div key={label} style={{ background: "var(--color-bg)", padding: 22 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 36, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", color: "color-mix(in srgb,var(--color-text) 65%,transparent)", marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Request a Quote</Link>
          <a href="tel:+15864691076" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Call (586) 469-1076</a>
        </div>
      </div>
    </>
  );
}
