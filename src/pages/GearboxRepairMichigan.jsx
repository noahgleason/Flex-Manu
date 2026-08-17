import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";

const SPECS = [
  ["Work Performed", "Gear and spline reproduction, shaft grinding and turning, housing bore repair, reassembly coordination."],
  ["Industries Served", "Nuclear power, steel and paper processing, mining, power transmission, heavy industrial."],
  ["Process", "Send a print, a drawing, or a photo of the damaged part — we match gears, shafts, and bearings to precision specs."],
  ["Track Record", "Sourcing and machining replacement gear components since 1960."],
];

export default function GearboxRepairMichigan() {
  return (
    <>
      <Seo
        title="Gearbox Repair & Rebuilding in Michigan | Flex Mfg"
        description="Industrial gearbox repair and rebuilding for Michigan manufacturers — gears, shafts & bearings matched to precision specs. Metro Detroit, since 1960."
        path="/gearbox-repair-michigan"
      />

      {/* Full-bleed light wrapper — see the matching comment in
          Capabilities.jsx for why data-theme + background live on a
          non-.wrap element rather than on .wrap itself. */}
      <div data-theme="light" className="fx-gridtex" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
            <Reveal as="figure" className="duotone-2" style={{ margin: 0, aspectRatio: "4/5", borderRadius: "var(--radius-md)" }}>
              <picture>
                <source srcSet="/assets/photos/shop-floor-overhead-crane.webp" type="image/webp" />
                <img src="/assets/photos/shop-floor-overhead-crane.jpg" alt="Overhead crane moving heavy gearbox components in the shop" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-md)" }} loading="lazy" />
              </picture>
            </Reveal>
            <Reveal delay={80}>
              <span className="fx-kick">Gearbox Repair · Michigan</span>
              <h1 className="fx-display" style={{ maxWidth: "20ch" }}>Gearbox repair &amp; rebuilding in Michigan</h1>
              <p style={{ fontSize: 18, lineHeight: 1.6, margin: "24px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
                Gearboxes fail on their own schedule, not yours. Flex Manufacturing repairs and rebuilds industrial gearboxes for manufacturers across Michigan &mdash; matching your unit&rsquo;s gears, shafts, and bearings to precision specs instead of forcing a full replacement.
              </p>
            </Reveal>
          </div>

          <div style={{ maxWidth: "72ch", marginTop: "clamp(28px,4vw,40px)" }}>
            <p style={{ fontSize: 18, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
              We&rsquo;ve been sourcing and machining replacement gear components since 1960, so when a gearbox comes in worn or broken, we can often reproduce the exact part from a print, a drawing, or a photo of the damaged piece.
            </p>
          </div>

          <div style={{ marginTop: "clamp(32px,4vw,48px)" }}>
            <Reveal as="section" className="fx-plate">
              <header className="fx-tb">
                <span className="fx-tb-title">Gearbox Repair &amp; Rebuild Capability</span>
                <span className="fx-tb-cell">Any Size</span>
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
            Send us a photo or print of the damaged part and we&rsquo;ll tell you what it&rsquo;ll take to get it running again.
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
