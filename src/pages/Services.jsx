import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const SERVICES = [
  {
    title: "Gearbox Repair",
    body: "Teardown, inspection, and rebuild of industrial gearboxes — worn gears, shafts, and bearings repaired or replaced to get equipment back in service.",
  },
  {
    title: "Coatings",
    body: "Plating and protective coatings applied to finished parts to extend wear life and corrosion resistance.",
  },
  {
    title: "Assemblies",
    body: "Complete sub-assemblies, not just loose components — parts fit, matched, and assembled before they ship.",
  },
  {
    title: "Heat Treat",
    body: "Hardening and tempering coordinated as part of the manufacturing process, to print and to spec.",
  },
  {
    title: "Cryogenics",
    body: "Cryogenically heat-treated gears for improved wear resistance and dimensional stability — a capability few shops offer.",
    featured: true,
  },
  {
    title: "Engineering Services",
    body: "Print review, tolerancing, and application support to make sure a part is manufacturable before it hits the shop floor.",
  },
];

export default function Services() {
  return (
    <>
      <Seo
        title="Additional Services — Gearbox Repair, Heat Treat & Cryogenics | Flex Manufacturing"
        description="Gearbox repair, coatings, assemblies, heat treat, cryogenic treatment, and engineering services — coordinated alongside our custom gear and precision machining work. Metro Detroit."
        path="/services"
      />

      <div className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <span className="fx-kick">Additional Services</span>
        <h1 className="fx-display" style={{ maxWidth: "18ch" }}>Beyond the machine work</h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: "60ch", margin: "22px 0 0", color: "color-mix(in srgb,var(--color-text) 84%,transparent)" }}>
          Alongside gears, splines, turning, grinding, and milling, we coordinate the services that get a part the rest of the way to installed and running.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(20px,2.5vw,32px)", marginTop: "clamp(32px,4vw,48px)" }}>
          {SERVICES.map(({ title, body, featured }) => (
            <div key={title} className="blueprint" style={{ padding: 24, ...(featured ? { borderColor: "var(--color-oxide-300)" } : {}) }}>
              <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
              {featured && (
                <span style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--color-oxide-300)", border: "1px solid var(--color-oxide-300)", padding: "3px 8px", marginBottom: 12 }}>
                  Differentiator
                </span>
              )}
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 20, textTransform: "uppercase", margin: "0 0 10px" }}>{title}</h2>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb,var(--color-text) 80%,transparent)" }}>{body}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Request a Quote</Link>
          <a href="tel:+15867918060" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Call (586) 791-8060</a>
          <Link to="/capabilities" className="btn btn-ghost" style={{ textDecoration: "none", fontSize: 15 }}>See machining capabilities &amp; specs &rarr;</Link>
        </div>
      </div>
    </>
  );
}
