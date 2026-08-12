import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import PhotoCarousel from "../components/PhotoCarousel.jsx";
import Reveal from "../components/Reveal.jsx";

const SHOP_PHOTOS = [
  { src: "/assets/photos/raw-material-staging-area.jpg", alt: "Raw bar stock staged in the shop before machining" },
  { src: "/assets/photos/cnc-machining-workstation.jpg", alt: "CNC machining workstations on the shop floor" },
  { src: "/assets/photos/shop-floor-wide-view.jpg", alt: "Wide view of the shop floor with staged material and parts" },
  { src: "/assets/photos/shop-floor-overhead-crane.jpg", alt: "Shop floor with overhead crane moving a large machined part" },
  { src: "/assets/photos/finished-parts-inventory.jpg", alt: "Finished ground shafts and parts staged on racks" },
  { src: "/assets/photos/parts-staging-flanged-housing.jpg", alt: "Machined flanged housing and parts staged for shipment" },
  { src: "/assets/photos/finished-rollers-packaged.jpg", alt: "Finished large rollers wrapped and staged for shipment" },
  { src: "/assets/photos/shop-loading-dock.jpg", alt: "Finished parts staged at the shop loading dock" },
];

const WHAT_WE_MAKE = [
  { title: "Gears & Splines", body: "Internal & external, 1″–240″ diameter. Spur, helical, bevel, worm, rack, herringbone; involute & straight-sided splines.", img: "custom-spline-gear-closeup.jpg", pos: "50% 50%" },
  { title: "Grinding & Honing", body: "All surfaces, ¼″–48″ dia × 13′ long. OD, ID, surface & jig; centerless to 20′, Blanchard, gear-tooth & spline grinding.", img: "cylindrical-shaft-grinding.jpg", pos: "50% 50%" },
  // Same photo as the hero (it's the only real turning/lathe shot in the
  // library) — cropped tight on the chuck/workpiece rather than the hero's
  // wide framing, plus the duotone grade, so the two don't read as a
  // repeated image at a glance.
  { title: "Turning", body: "To 156″ dia × 96″ swing (VTL) and 42″ × 160″ long. CNC, screw machine, gun drilling; rolls, spindles, axles, shafts.", img: "machinist-large-lathe.jpg", pos: "18% 62%" },
  { title: "Milling, Boring & Drilling", body: "To 6′ square cube. Five-axis CNC, boring mill, clutch teeth, camslots & helix slots on weldments, castings & forgings.", img: "machinist-vertical-boring-mill.jpg", pos: "50% 50%" },
];

export default function Home() {
  return (
    <>
      <Seo
        title="Custom Gear Manufacturer | Flex Manufacturing — Metro Detroit"
        description={'Custom gears, splines & precision machining, 1" to 240" diameter, any quantity. Family-owned in metro Detroit since 1960 — send your print, get a quote fast.'}
        path="/"
      />

      <section className="fx-hero">
        <div className="fx-hero-media">
          <picture>
            <source srcSet="/assets/photos/machinist-large-lathe.webp" type="image/webp" />
            <img
              src="/assets/photos/machinist-large-lathe.jpg"
              alt="Machinist running a large CNC lathe, turning a heavy steel shaft"
              style={{ objectPosition: "62% 42%" }}
            />
          </picture>
        </div>
        <div className="fx-hero-scrim" aria-hidden="true"></div>
        <div className="wrap fx-hero-content">
          <span className="fx-kick">Custom Gear Manufacturer &middot; Metro Detroit</span>
          <h1 className="fx-display" style={{ maxWidth: "16ch" }}>Custom gears, splines &amp; precision machining</h1>
          <p style={{ fontSize: "clamp(17px,1.5vw,21px)", lineHeight: 1.5, maxWidth: "56ch", margin: "26px 0 0", color: "color-mix(in srgb,var(--color-text) 88%,transparent)" }}>
            Any quantity, 1&Prime; to 240&Prime; diameter. Send us your print, drawing, or a photo of a worn or broken part &mdash; get a quote back fast.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
            <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>
              Request a Quote{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
            </Link>
            <a href="tel:+15867918060" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Call (586) 791-8060</a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 36px", marginTop: 44, paddingTop: 26, borderTop: "1px solid var(--color-divider)", fontFamily: "var(--font-heading)", fontSize: 15, letterSpacing: ".06em", textTransform: "uppercase", color: "color-mix(in srgb,var(--color-text) 78%,transparent)" }}>
            <span>Family-owned</span><span style={{ color: "var(--color-oxide-300)" }}>&bull;</span><span>Est. 1960</span><span style={{ color: "var(--color-accent-2)" }}>&bull;</span><span>Metro Detroit</span><span style={{ color: "var(--color-oxide-300)" }}>&bull;</span><span>Veteran-Owned</span><span style={{ color: "var(--color-accent-2)" }}>&bull;</span><span>U.S.-Based</span>
          </div>
        </div>
        <span className="fx-hero-tag">Clinton Township, MI &middot; Est. 1960</span>
      </section>

      {/* Full-bleed light wrapper: data-theme + backgroundColor on the
          .wrap-less outer element, .wrap itself only handles max-width/
          padding — a .wrap div has no background of its own, so putting
          the theme there would only color whichever children set their
          own background, leaving the canvas around them dark.
          backgroundColor (not the `background` shorthand) so it composes
          with .fx-gridtex's own background-image instead of clobbering it —
          same drafting-grid texture as the dark sections, just re-themed
          via the locally-scoped --color-text this section already sets. */}
      <section data-theme="light" className="fx-gridtex" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingTop: "clamp(56px,7vw,88px)", paddingBottom: "clamp(48px,6vw,72px)" }}>
          <span className="fx-kick">01 &middot; What we make</span>
          <hr className="fx-rule" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(20px,2.5vw,32px)" }}>
            {WHAT_WE_MAKE.map(({ title, body, img, pos }, i) => (
              <Reveal key={title} delay={i * 90} className="fx-hover-lift" style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-md)", padding: 24 }}>
                {img && (
                  <figure className={`fx-media-zoom ${i % 2 === 0 ? "duotone" : "duotone-2"}`} style={{ margin: "0 0 16px", aspectRatio: "4/3", borderRadius: "var(--radius-md)" }}>
                    <picture>
                      <source srcSet={`/assets/photos/${img.replace(/\.jpg$/, ".webp")}`} type="image/webp" />
                      <img src={`/assets/photos/${img}`} alt={`${title} example`} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: pos }} loading="lazy" />
                    </picture>
                  </figure>
                )}
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 22, textTransform: "uppercase", margin: "0 0 10px" }}>{title}</h2>
                <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, color: "color-mix(in srgb,var(--color-text) 78%,transparent)" }}>{body}</p>
              </Reveal>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link to="/capabilities" className="btn btn-ghost" style={{ textDecoration: "none", fontSize: 15 }}>See full capabilities &amp; specs &rarr;</Link>
          </div>
        </div>
      </section>

      {SHOP_PHOTOS.length > 0 && (
        <section className="fx-gridtex" style={{ backgroundColor: "var(--color-bg)" }}>
          <div className="wrap" style={{ paddingTop: "clamp(24px,3vw,40px)", paddingBottom: "clamp(48px,6vw,72px)" }}>
            <span className="fx-kick">02 &middot; In the shop</span>
            <hr className="fx-rule" />
            <PhotoCarousel photos={SHOP_PHOTOS} />
          </div>
        </section>
      )}

      <section data-theme="light" className="fx-gridtex" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingBottom: "clamp(48px,6vw,80px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(28px,4vw,64px)", alignItems: "center" }}>
          <Reveal as="figure" className="duotone" style={{ margin: 0, aspectRatio: "4/3", position: "relative", borderRadius: "var(--radius-md)" }}>
            <picture>
              <source srcSet="/assets/photos/custom-flanged-cylinder-part.webp" type="image/webp" />
              <img src="/assets/photos/custom-flanged-cylinder-part.jpg" alt="Large custom flanged cylinder part, machined and staged on the shop floor" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "var(--radius-md)" }} loading="lazy" />
            </picture>
            <div className="fx-callout" style={{ left: "44%", top: "14%" }}>FLANGE &mdash; MACHINED TO PRINT</div>
            <div className="fx-leader" style={{ left: "38%", top: "20%", width: 1, height: 64 }}></div>
            <div className="fx-callout" style={{ left: "8%", top: "62%" }}>BORE &mdash; TURNED ID</div>
            <div className="fx-leader" style={{ left: "22%", top: "52%", width: 1, height: 60 }}></div>
          </Reveal>
          <Reveal delay={100}>
            <span className="fx-kick">By the numbers</span>
            <hr className="fx-rule" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--color-divider)", border: "1px solid var(--color-divider)" }}>
              {/* Values here (1960 / 60+ / range / "Any") are short, label-like
                  figures, not the kind of large running totals a count-up
                  animation reads well on — a plain reveal fits better. */}
              {[
                { value: "1960", label: "Family-owned since" },
                { value: "60+", label: "Years serving Detroit" },
                { value: "1″–240″", label: "Gear diameter range" },
                { value: "Any", label: "Quantity, one-off to run" },
              ].map(({ value, label }) => (
                <div key={label} style={{ background: "var(--color-bg)", padding: 20 }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 34, lineHeight: 1, fontVariantNumeric: "tabular-nums", color: "var(--color-text)" }}>{value}</div>
                  <div style={{ fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", color: "color-mix(in srgb,var(--color-text) 72%,transparent)", marginTop: 8 }}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="fx-gridtex" style={{ backgroundColor: "var(--color-accent-2-900)", color: "var(--color-text)" }}>
        <Reveal className="wrap" style={{ paddingTop: "clamp(44px,5vw,72px)", paddingBottom: "clamp(44px,5vw,72px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 28, alignItems: "center" }}>
          <div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--color-accent-2-300)" }}>Full-Spectrum Capabilities</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", textTransform: "uppercase", margin: "12px 0 0", lineHeight: 1.05 }}>Gears, splines, worm shafts &amp; special machine components &mdash; up to 240&Prime; diameter</h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: "52ch", margin: "16px 0 0", color: "color-mix(in srgb,var(--color-text) 85%,transparent)" }}>
              Turning, milling, boring, drilling, grinding, slotting, honing, polishing, hobbing, shaping, broaching, shaving, tooth rounding, EDM, threading, tapping &amp; reaming &mdash; in steel, cast iron, brass, plastic &amp; aluminum.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link to="/capabilities" className="btn" style={{ textDecoration: "none", background: "var(--color-text)", color: "var(--color-bg)", borderColor: "var(--color-text)", fontSize: 15, padding: "12px 22px" }}>See full capabilities &amp; specs &rarr;</Link>
            <Link to="/quote" className="btn" style={{ textDecoration: "none", background: "transparent", color: "var(--color-text)", borderColor: "color-mix(in srgb,var(--color-text) 55%,transparent)", fontSize: 15, padding: "12px 22px" }}>Request a Quote</Link>
          </div>
        </Reveal>
      </section>

      <section data-theme="light" className="fx-gridtex" style={{ backgroundColor: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingTop: "clamp(48px,6vw,88px)", paddingBottom: "clamp(48px,6vw,88px)" }}>
          <Reveal style={{ background: "var(--color-surface)", border: "1px solid var(--color-divider)", borderRadius: "var(--radius-lg)", padding: "clamp(28px,4vw,52px)" }}>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", textTransform: "uppercase", margin: 0, maxWidth: "20ch" }}>Have a print? Get a quote back fast.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.55, maxWidth: "54ch", margin: "16px 0 0", color: "color-mix(in srgb,var(--color-text) 78%,transparent)" }}>
              Upload a PDF, STEP, DWG &mdash; or just a photo of the part.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 26 }}>
              <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Request a Quote</Link>
              <a href="tel:+15867918060" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Call (586) 791-8060</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
