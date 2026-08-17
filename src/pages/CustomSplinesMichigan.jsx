import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";

const SPECS = [
  ["Capacity", "1 inch to 240 inches in diameter."],
  ["Spline Types", "Involute and straight-sided."],
  ["Grinding & Honing", "¼ inch up to 48 inches in diameter, up to 13 feet long."],
  ["Matched To", "Your print, an original part, or a worn sample."],
  ["Industries Served", "Aerospace, power transmission, heavy manufacturing — since 1960."],
];

export default function CustomSplinesMichigan() {
  return (
    <>
      <Seo
        title="Custom Spline Manufacturing in Michigan | Flex Mfg"
        description={'Custom involute and straight-sided splines, 1" to 240" diameter, matched to print or sample. Serving Michigan aerospace & heavy industry since 1960.'}
        path="/custom-spline-manufacturing-michigan"
      />

      {/* Full-bleed light wrapper — see the matching comment in
          Capabilities.jsx for why data-theme + background live on a
          non-.wrap element rather than on .wrap itself. */}
      <div data-theme="light" className="fx-gridtex" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
            <Reveal as="figure" className="duotone-2" style={{ margin: 0, aspectRatio: "4/5", borderRadius: "var(--radius-md)" }}>
              <picture>
                <source srcSet="/assets/photos/custom-spline-gear-closeup.webp" type="image/webp" />
                <img src="/assets/photos/custom-spline-gear-closeup.jpg" alt="Close-up of a custom-machined spline gear" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-md)" }} loading="lazy" />
              </picture>
            </Reveal>
            <Reveal delay={80}>
              <span className="fx-kick">Custom Splines · Michigan</span>
              <h1 className="fx-display" style={{ maxWidth: "20ch" }}>Custom spline manufacturing in Michigan</h1>
              <p style={{ fontSize: 18, lineHeight: 1.6, margin: "24px 0 0", color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
                Splines have to fit right the first time &mdash; there&rsquo;s no adjusting a mismatched tooth profile after assembly. Flex Manufacturing produces custom involute and straight-sided splines from 1 inch to 240 inches in diameter, matched exactly to your print, an original part, or a worn sample you send us.
              </p>
            </Reveal>
          </div>

          <div style={{ maxWidth: "72ch", marginTop: "clamp(28px,4vw,40px)" }}>
            <p style={{ fontSize: 18, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>
              Grinding and honing down to &frac14; inch, up to 48 inches in diameter and 13 feet long, gives us the reach for both small precision components and long industrial shafting. Serving aerospace, power transmission, and heavy manufacturing customers across Michigan since 1960.
            </p>
          </div>

          <div style={{ marginTop: "clamp(32px,4vw,48px)" }}>
            <Reveal as="section" className="fx-plate">
              <header className="fx-tb">
                <span className="fx-tb-title">Custom Spline Capability</span>
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
            Send your print, an original part, or a worn sample and we&rsquo;ll quote your spline job.
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
