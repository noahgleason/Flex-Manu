import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import Reveal from "../components/Reveal.jsx";

const SECTIONS = [
  {
    title: "01 — Gears & Splines · Internal & External",
    cell: "1″–240″ dia",
    specs: [
      ["Quantity", "Any — one-offs through production runs."],
      ["Capacity", "1″ through 240″ diameter (max)."],
      ["Materials", "Steel, cast iron, brass, aluminium, plastic (Micarta)."],
      ["Gear teeth", "Spur, helical, bevel, spiral bevel, worm, rack, herringbone."],
      ["Splines", "Involute and straight-sided."],
      ["Operations", "Hobbing, shaping, slotting, broaching, shaving, tooth rounding, tooth grinding, gear grinding, gear racks, ID–OD spline grinding, EDM."],
    ],
    links: [
      { to: "/large-diameter-gear-manufacturing-michigan", label: "Large-diameter gear manufacturing" },
      { to: "/custom-spline-manufacturing-michigan", label: "Custom spline manufacturing" },
    ],
  },
  {
    title: "02 — Grinding, Polishing & Honing · All Surfaces",
    cell: "¼″–48″ × 13′",
    specs: [
      ["Quantity", "Any."],
      ["Capacity", "¼″ through 48″ diameter × 13′ long."],
      ["Materials", "Steel, cast iron, brass, aluminium."],
      ["OD grinding", "CNC cylindrical, centerless (to 20′), large roll grinding, contour, taper, thread, gear tooth."],
      ["ID grinding", "Honing, taper, jig."],
      ["Surface grinding", "Spline (internal & external), Blanchard, rotary, teeth."],
    ],
  },
  {
    title: "03 — Turning",
    cell: "to 156″ dia",
    specs: [
      ["Quantity", "Any."],
      ["Capacity", "156″ diameter × 96″ swing (VTL); 42″ diameter × 160″ long; ¼″ minimum."],
      ["Materials", "Steel, cast iron, brass, plastic, aluminum, etc."],
      ["Types of parts", "Large roll turning, spindles, axles, shafts, gear blanks."],
      ["Operations", "CNC, single or multiple spindle, bevel or contour, threading, screw machine, gun drilling."],
    ],
  },
  {
    title: "04 — Milling, Boring & Drilling",
    cell: "to 6′ cube",
    specs: [
      ["Quantity", "Any."],
      ["Capacity", "Small ¼″–5″; medium thru 18″; large thru 6′ square cube."],
      ["Materials", "Steel, cast iron, brass, aluminium, plastics, etc."],
      ["Types of parts", "Weldments, castings, forgings, extrusions, bar stock, flat stock."],
      ["Operations", "Five-axis CNC, single or multiple, drilling, tapping, reaming, Bridgeport, boring mill, clutch teeth, camslots & helix slots."],
    ],
  },
];

export default function Capabilities() {
  return (
    <>
      <Seo
        title="Gear, Spline & Precision Machining Capabilities | Flex Mfg"
        description={'Gears & splines to 240" diameter, grinding & honing, turning to 156", five-axis milling. Steel, cast iron, brass, aluminum, Micarta. Metro Detroit.'}
        path="/capabilities"
      />

      <div className="print-letterhead wrap" style={{ paddingTop: 32 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #111", paddingBottom: 16, marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 22, textTransform: "uppercase" }}>Flex Manufacturing, Inc.</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Custom Gear &amp; Precision Machining &mdash; Capability Sheet</div>
          </div>
          <div style={{ textAlign: "right", fontSize: 13, lineHeight: 1.5 }}>
            44805 Trinity Dr, Clinton Township, MI 48038<br />
            (586) 791-8060
          </div>
        </div>
      </div>

      {/* Full-bleed light wrapper: data-theme + an explicit background on
          a non-.wrap element, so the whole section paints paper edge to
          edge — a .wrap div alone has no background of its own and would
          only color the individual children that set one, leaving the
          canvas around them dark. */}
      <div data-theme="light" className="fx-gridtex" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
          <span className="fx-kick">Capabilities</span>
          <h1 className="fx-display" style={{ maxWidth: "18ch" }}>Precision machining, sourced across metro Detroit</h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: "60ch", margin: "22px 0 0", color: "color-mix(in srgb,var(--color-text) 84%,transparent)" }}>
            Four disciplines, one point of contact. Send a print and we coordinate manufacturing through a deep network of shops &mdash; any quantity, one-offs to production runs.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(28px,3vw,44px)", marginTop: "clamp(32px,4vw,52px)" }}>
            {SECTIONS.map(({ title, cell, specs, links }, i) => {
              // Same title string as always ("01 — Gears & Splines · ...") —
              // just split at render time so the index number can read as its
              // own large editorial marker instead of one line of small text.
              const match = title.match(/^(\d+)\s*—\s*(.+)$/);
              const num = match ? match[1] : null;
              const label = match ? match[2] : title;
              return (
                <Reveal as="section" key={title} delay={i * 80} className="fx-plate">
                  <header className="fx-tb">
                    {num && <span className="fx-tb-num">{num}</span>}
                    <span className="fx-tb-title">{label}</span>
                    <span className="fx-tb-cell">{cell}</span>
                  </header>
                  <dl className="fx-speclist">
                    {specs.map(([dt, dd]) => (
                      <div className="fx-specrow" key={dt}>
                        <dt>{dt}</dt>
                        <dd>{dd}</dd>
                      </div>
                    ))}
                  </dl>
                  {links && (
                    <div style={{ display: "flex", gap: 18, flexWrap: "wrap", padding: "14px 18px", borderTop: "1px solid var(--color-divider)" }}>
                      {links.map((l) => (
                        <Link key={l.to} to={l.to} className="fx-link-fade" style={{ fontSize: 13.5, fontWeight: 500, color: "var(--color-accent-700)", textDecoration: "none" }}>
                          {l.label} &rarr;
                        </Link>
                      ))}
                    </div>
                  )}
                </Reveal>
              );
            })}
          </div>
          <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Request a Quote</Link>
            <a href="tel:+15867918060" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Call (586) 791-8060</a>
            <a href="/assets/flex-manufacturing-capabilities-sheet.pdf" download className="btn btn-ghost" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v13m0 0-4-4m4 4 4-4M4 20h16"></path></svg>
              Download our full capabilities sheet (PDF)
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
