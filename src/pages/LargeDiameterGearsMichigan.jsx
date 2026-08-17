import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";

const SPECS = [
  ["Capacity", "1 inch up to 240 inches in diameter."],
  ["Gear Types", "Spur, helical, bevel, worm, rack, herringbone."],
  ["Operations", "Hobbing, shaping, slotting, broaching, shaving, tooth rounding, gear and spline grinding, EDM."],
  ["Materials", "Steel, cast iron, brass, aluminum, plastic (Micarta)."],
  ["Sourcing", "Coordinated across a trusted network of Michigan-area vendor shops."],
];

export default function LargeDiameterGearsMichigan() {
  return (
    <>
      <Seo
        title="Large Diameter Gear Manufacturing in Michigan | Flex Mfg"
        description={'Custom gears from 1" to 240" diameter — spur, helical, bevel, worm, rack, herringbone — sourced and machined for Michigan heavy industry.'}
        path="/large-diameter-gear-manufacturing-michigan"
      />

      {/* Full-bleed light wrapper — see the matching comment in
          Capabilities.jsx for why data-theme + background live on a
          non-.wrap element rather than on .wrap itself. */}
      <div data-theme="light" className="fx-gridtex" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
            <Reveal as="figure" className="duotone-2" style={{ margin: 0, aspectRatio: "4/5", borderRadius: "var(--radius-md)" }}>
              <picture>
                <source srcSet="/assets/photos/machinist-large-lathe.webp" type="image/webp" />
                <img src="/assets/photos/machinist-large-lathe.jpg" alt="Machinist operating a large lathe for big-diameter turning" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-md)" }} loading="lazy" />
              </picture>
            </Reveal>
            <Reveal delay={80}>
              <span className="fx-kick">Large-Diameter Gears · Michigan</span>
              <h1 className="fx-display" style={{ maxWidth: "20ch" }}>Large diameter gear manufacturing in Michigan</h1>
              <p style={{ fontSize: 18, lineHeight: 1.6, margin: "24px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
                Most gear shops top out well under what heavy industry actually needs. Flex Manufacturing sources and machines gears from 1 inch up to 240 inches in diameter &mdash; for customers who&rsquo;ve been told &ldquo;too big&rdquo; everywhere else.
              </p>
            </Reveal>
          </div>

          <div style={{ maxWidth: "72ch", marginTop: "clamp(28px,4vw,40px)" }}>
            <p style={{ fontSize: 18, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
              We coordinate hobbing, shaping, slotting, broaching, shaving, tooth rounding, gear and spline grinding, and EDM work across a trusted network of Michigan-area vendor shops, so large-diameter jobs don&rsquo;t get stuck waiting on a single shop&rsquo;s equipment limits.
            </p>
          </div>

          <div style={{ marginTop: "clamp(32px,4vw,48px)" }}>
            <Reveal as="section" className="fx-plate">
              <header className="fx-tb">
                <span className="fx-tb-title">Large-Diameter Gear Capability</span>
                <span className="fx-tb-cell">1″–240″ dia</span>
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
            If your print calls for something bigger than your usual supplier can handle, send it to us.
          </p>

          <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Request a Quote</Link>
            <a href="tel:+15867918060" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Call (586) 791-8060</a>
            <Link to="/capabilities" className="btn btn-ghost" style={{ textDecoration: "none", fontSize: 15 }}>See machining capabilities &amp; specs &rarr;</Link>
          </div>
        </div>
      </div>
    </>
  );
}
