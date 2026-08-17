import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";

const SPECS = [
  ["Process", "Deep cryogenic processing for tooling, gears, and precision components."],
  ["Benefit", "Improved wear resistance and dimensional stability beyond conventional heat treat alone."],
  ["Availability", "Offered as a standalone service or bundled with gear manufacturing, gearbox repair, and machining work."],
  ["Coverage", "Metro Detroit and Michigan."],
];

export default function CryogenicTreatmentMichigan() {
  return (
    <>
      <Seo
        title="Cryogenic Treatment Services in Michigan | Flex Mfg"
        description="Deep cryogenic treatment for gears, tooling & precision components — improved wear resistance and dimensional stability. Metro Detroit, Michigan."
        path="/cryogenic-treatment-michigan"
      />

      {/* Full-bleed light wrapper — see the matching comment in
          Capabilities.jsx for why data-theme + background live on a
          non-.wrap element rather than on .wrap itself. */}
      <div data-theme="light" className="fx-gridtex" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
            <Reveal as="figure" className="duotone-2" style={{ margin: 0, aspectRatio: "4/5", borderRadius: "var(--radius-md)" }}>
              <picture>
                <source srcSet="/assets/photos/finished-parts-inventory.webp" type="image/webp" />
                <img src="/assets/photos/finished-parts-inventory.jpg" alt="Finished precision parts staged in inventory" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-md)" }} loading="lazy" />
              </picture>
            </Reveal>
            <Reveal delay={80}>
              <span className="fx-kick">Cryogenic Treatment · Michigan</span>
              <h1 className="fx-display" style={{ maxWidth: "20ch" }}>Cryogenic treatment in Michigan</h1>
              <p style={{ fontSize: 18, lineHeight: 1.6, margin: "24px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
                Cryogenic treatment is one of those services most shops don&rsquo;t offer at all &mdash; Flex Manufacturing does, alongside our gear and precision machining work. Deep cryogenic processing improves wear resistance and dimensional stability in tooling, gears, and precision components.
              </p>
            </Reveal>
          </div>

          <div style={{ maxWidth: "72ch", marginTop: "clamp(28px,4vw,40px)" }}>
            <p style={{ fontSize: 18, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
              Extending service life beyond what conventional heat treat alone provides &mdash; offered as a standalone service or bundled with gear manufacturing, gearbox repair, and machining work for customers across metro Detroit and Michigan.
            </p>
          </div>

          <div style={{ marginTop: "clamp(32px,4vw,48px)" }}>
            <Reveal as="section" className="fx-plate">
              <header className="fx-tb">
                <span className="fx-tb-title">Cryogenic Treatment Capability</span>
                <span className="fx-tb-cell">Standalone or Bundled</span>
              </header>
              <dl className="fx-speclist">
                {SPECS.map(([dt, dd]) => (
                  <div className="fx-specrow" key={dt}>
                    <dt>{dt}</dt>
                    <dd>{dd}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: "60ch", margin: "clamp(28px,4vw,40px) 0 0", color: "color-mix(in srgb,var(--color-text) 84%,transparent)" }}>
            Ask about adding cryogenic treatment to your next gear or machining order.
          </p>

          <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Request a Quote</Link>
            <a href="tel:+15867918060" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Call (586) 791-8060</a>
            <Link to="/services" className="btn btn-ghost" style={{ textDecoration: "none", fontSize: 15 }}>See all services &rarr;</Link>
          </div>
        </div>
      </div>
    </>
  );
}
