import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";

export default function About() {
  return (
    <>
      <Seo
        title="Family-Owned Custom Gear Machining Since 1960 | Flex Mfg"
        description="Flex Manufacturing is a family-owned custom gear and precision machining sourcing house serving metro Detroit since 1960, now in its second generation."
        path="/about"
      />

      {/* Full-bleed light wrapper — see the matching comment in
          Capabilities.jsx for why data-theme + background live on a
          non-.wrap element rather than on .wrap itself. */}
      <div data-theme="light" className="fx-gridtex" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
          <Reveal as="figure" className="duotone-2" style={{ margin: 0, aspectRatio: "4/5", borderRadius: "var(--radius-md)" }}>
            <picture>
              <source srcSet="/assets/photos/raw-material-staging-area.webp" type="image/webp" />
              <img src="/assets/photos/raw-material-staging-area.jpg" alt="Raw bar stock staged in the shop before machining" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-md)" }} loading="lazy" />
            </picture>
          </Reveal>
          <Reveal delay={80}>
            <span className="fx-kick">About Flex Manufacturing</span>
            <h1 className="fx-display" style={{ maxWidth: "16ch" }}>Family-owned and machining since 1960</h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, margin: "24px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
              Flex Manufacturing, Inc. has been a custom gear and precision machining sourcing house for 66 years in the trade. Founded in 1960 and still family-owned, we serve manufacturers across metro Detroit and beyond &mdash; the plants, mills and shops that keep aging equipment running.
            </p>
          </Reveal>
        </div>

        <div style={{ maxWidth: "72ch", marginTop: "clamp(28px,4vw,40px)" }}>
          <p style={{ fontSize: 18, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
            Customers send us a print, a drawing, or a photo of a worn or broken part. We coordinate manufacturing through a deep network of trusted metro Detroit shops &mdash; matching each job to the right machine and craftsman for gears, splines, grinding, turning and milling, at any quantity.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.6, margin: "20px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
            Now into its second generation, the business is being revitalized by the founder's grandson &mdash; same reputation for getting hard parts made right, backed by six decades of relationships.
          </p>
        </div>

        <Reveal style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 1, background: "var(--color-divider)", border: "1px solid var(--color-divider)", marginTop: 40, borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          {[
            { value: "1960", label: "Established" },
            { value: "60+", label: "Years in business" },
            { value: "2nd", label: "Generation, family-owned" },
            { value: "USA", label: "Veteran-Owned, U.S.-Based" },
          ].map(({ value, label }) => (
            <div key={label} style={{ background: "var(--color-bg)", padding: 22 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 30, lineHeight: 1, fontVariantNumeric: "tabular-nums", color: "var(--color-text)" }}>{value}</div>
              <div style={{ fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", color: "color-mix(in srgb,var(--color-text) 72%,transparent)", marginTop: 8 }}>{label}</div>
            </div>
          ))}
        </Reveal>

        <div style={{ marginTop: 44 }}>
          <span className="fx-kick">Industries We Serve</span>
          <hr className="fx-rule" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              "Nuclear Power", "Pharmaceutical", "Packaging", "Filling", "Aerospace",
              "Mining", "Power Transmission", "Wind & Solar", "Steel, Paper & Plastic", "Military",
            ].map((industry, i) => (
              <span
                key={industry}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: 13,
                  letterSpacing: ".04em",
                  textTransform: "uppercase",
                  padding: "9px 16px",
                  border: `1px solid color-mix(in srgb,${i % 2 === 0 ? "var(--color-oxide)" : "var(--color-accent-2)"} 45%,var(--color-divider))`,
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

        <p style={{ fontSize: 13, lineHeight: 1.6, maxWidth: "70ch", margin: "44px 0 0", paddingTop: 24, borderTop: "1px solid var(--color-divider)", color: "color-mix(in srgb,var(--color-text) 72%,transparent)" }}>
          Flex Manufacturing, Inc. is an Equal Opportunity Employer. We do not discriminate on the basis of race, color, religion, sex, national origin, age, disability, veteran status, or any other status protected by applicable federal, state, or local law, in employment or in the provision of services.
        </p>
      </div>
      </div>
    </>
  );
}
