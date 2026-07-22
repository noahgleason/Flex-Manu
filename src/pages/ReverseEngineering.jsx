import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const STEPS = [
  { n: "01", title: "Send the part or a photo", body: "Ship us the worn or broken gear, or upload photos with a ruler for scale. No CAD, no print, no problem." },
  { n: "02", title: "We measure & reverse engineer", body: "We determine tooth count, pitch, pressure angle, helix, material and tolerances, and produce a manufacturing drawing." },
  { n: "03", title: "We manufacture the replacement", body: "A new part built to match the original — any quantity, from a single obsolete gear replacement to a production run." },
];

export default function ReverseEngineering() {
  return (
    <>
      <Seo
        title="Gear Reverse Engineering — Obsolete & Broken Gear Replacement | Flex Manufacturing"
        description="Broken or obsolete gear with no drawings and no OEM? Send the part or a photo — we measure, reverse engineer, and manufacture a replacement. Metro Detroit gear reverse engineering."
        path="/reverse-engineering"
      />

      <div className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <span className="fx-kick">Gear Reverse Engineering</span>
        <h1 className="fx-display" style={{ maxWidth: "16ch" }}>No drawings. No OEM. We rebuild it.</h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, maxWidth: "58ch", margin: "22px 0 0", color: "color-mix(in srgb,var(--color-text) 84%,transparent)" }}>
          A worn or broken gear with no prints, and an OEM that&rsquo;s gone or won&rsquo;t answer, can shut down a whole line. Send us the part &mdash; or just a photo &mdash; and we measure it, reverse engineer it, and manufacture an exact replacement.
        </p>
        <div style={{ marginTop: 30 }}>
          <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Send your part &rarr;</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(20px,2.5vw,32px)", marginTop: "clamp(40px,5vw,64px)" }}>
          {STEPS.map(({ n, title, body }) => (
            <div key={n} className="blueprint" style={{ padding: 26 }}>
              <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: 34, color: "var(--color-accent)", lineHeight: 1 }}>{n}</div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 21, textTransform: "uppercase", margin: "14px 0 8px" }}>{title}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, color: "color-mix(in srgb,var(--color-text) 80%,transparent)" }}>{body}</p>
            </div>
          ))}
        </div>
        <div className="blueprint" style={{ marginTop: "clamp(40px,5vw,64px)", padding: "clamp(28px,4vw,48px)", background: "var(--color-accent-900)", color: "var(--color-text)", borderColor: "var(--color-accent-900)" }}>
          <i className="corner tl" style={{ color: "color-mix(in srgb,var(--color-text) 55%,transparent)" }}></i>
          <i className="corner tr" style={{ color: "color-mix(in srgb,var(--color-text) 55%,transparent)" }}></i>
          <i className="corner bl" style={{ color: "color-mix(in srgb,var(--color-text) 55%,transparent)" }}></i>
          <i className="corner br" style={{ color: "color-mix(in srgb,var(--color-text) 55%,transparent)" }}></i>
          <h2 style={{ fontSize: "clamp(26px,3vw,38px)", textTransform: "uppercase", margin: 0, maxWidth: "20ch" }}>Line down? Start the quote now.</h2>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 22 }}>
            <Link to="/quote" className="btn" style={{ textDecoration: "none", background: "var(--color-text)", color: "var(--color-bg)", borderColor: "var(--color-text)", fontSize: 15, padding: "12px 22px" }}>Request a Quote</Link>
            <a href="tel:+15867918060" className="btn" style={{ textDecoration: "none", background: "transparent", color: "var(--color-text)", borderColor: "color-mix(in srgb,var(--color-text) 55%,transparent)", fontSize: 15, padding: "12px 22px" }}>Call (586) 791-8060</a>
          </div>
        </div>
      </div>
    </>
  );
}
