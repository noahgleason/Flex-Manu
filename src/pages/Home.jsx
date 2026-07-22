import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import PhotoCarousel from "../components/PhotoCarousel.jsx";

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

export default function Home() {
  return (
    <>
      <Seo
        title="Custom Gear Manufacturer | Flex Manufacturing, Inc. — Metro Detroit"
        description={'Custom gears, splines & precision machining, 1" to 240" diameter, any quantity. Family-owned custom gear manufacturer in metro Detroit since 1974. Send your print, get a quote fast.'}
        path="/"
      />

      <section className="wrap" style={{ paddingTop: "clamp(48px,7vw,104px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <span className="fx-kick">Custom Gear Manufacturer &middot; Metro Detroit</span>
        <h1 className="fx-display" style={{ maxWidth: "16ch" }}>Custom gears, splines &amp; precision machining</h1>
        <p style={{ fontSize: "clamp(17px,1.5vw,21px)", lineHeight: 1.5, maxWidth: "56ch", margin: "26px 0 0", color: "color-mix(in srgb,var(--color-text) 84%,transparent)" }}>
          Any quantity, 1&Prime; to 240&Prime; diameter. Send us your print, drawing, or a photo of a worn or broken part &mdash; get a quote back fast.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }}>
          <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>
            Request a Quote{" "}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
          </Link>
          <a href="tel:+15864691076" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Call (586) 469-1076</a>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 36px", marginTop: 44, paddingTop: 26, borderTop: "1px solid var(--color-divider)", fontFamily: "var(--font-heading)", fontSize: 15, letterSpacing: ".06em", textTransform: "uppercase", color: "color-mix(in srgb,var(--color-text) 72%,transparent)" }}>
          <span>Family-owned</span><span style={{ color: "var(--color-accent)" }}>&bull;</span><span>Est. 1974</span><span style={{ color: "var(--color-accent)" }}>&bull;</span><span>Metro Detroit</span>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: "clamp(24px,3vw,40px)", paddingBottom: "clamp(40px,5vw,64px)" }}>
        <span className="fx-kick">01 &middot; What we make</span>
        <hr className="fx-rule" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "clamp(20px,2.5vw,32px)" }}>
          {[
            { title: "Gears & Splines", body: "Internal & external, 1″–240″ diameter. Spur, helical, bevel, worm, rack, herringbone; involute & straight-sided splines.", img: "custom-spline-gear-closeup.jpg" },
            { title: "Grinding & Honing", body: "All surfaces, ¼″–48″ dia × 13′ long. OD, ID, surface & jig; centerless to 20′, Blanchard, gear-tooth & spline grinding.", img: "cylindrical-shaft-grinding.jpg" },
            { title: "Turning", body: "To 156″ dia × 96″ swing (VTL) and 42″ × 160″ long. CNC, screw machine, gun drilling; rolls, spindles, axles, shafts.", img: "machinist-large-lathe.jpg" },
            { title: "Milling, Boring & Drilling", body: "To 6′ square cube. Five-axis CNC, boring mill, clutch teeth, camslots & helix slots on weldments, castings & forgings.", img: "machinist-vertical-boring-mill.jpg" },
          ].map(({ title, body, img }) => (
            <div key={title} className="blueprint" style={{ padding: 24 }}>
              <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
              {img && (
                <figure className="blueprint duotone" style={{ margin: "0 0 16px", aspectRatio: "4/3" }}>
                  <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
                  <img src={`/assets/photos/${img}`} alt={`${title} example`} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                </figure>
              )}
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 22, textTransform: "uppercase", margin: "0 0 10px" }}>{title}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, color: "color-mix(in srgb,var(--color-text) 80%,transparent)" }}>{body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <Link to="/capabilities" className="btn btn-ghost" style={{ textDecoration: "none", fontSize: 15 }}>See full capabilities &amp; specs &rarr;</Link>
        </div>
      </section>

      {SHOP_PHOTOS.length > 0 && (
        <section className="wrap" style={{ paddingTop: "clamp(8px,1vw,16px)", paddingBottom: "clamp(40px,5vw,64px)" }}>
          <span className="fx-kick">02 &middot; In the shop</span>
          <hr className="fx-rule" />
          <PhotoCarousel photos={SHOP_PHOTOS} />
        </section>
      )}

      <section className="wrap" style={{ paddingBottom: "clamp(40px,5vw,72px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(28px,4vw,64px)", alignItems: "center" }}>
        <figure className="blueprint duotone" style={{ margin: 0, aspectRatio: "4/3" }}>
          <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
          <img src="/assets/photos/custom-flanged-cylinder-part.jpg" alt="Large custom flanged cylinder part, machined and staged on the shop floor" style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
        </figure>
        <div>
          <span className="fx-kick">By the numbers</span>
          <hr className="fx-rule" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--color-divider)", border: "1px solid var(--color-divider)" }}>
            {[
              { value: "1974", label: "Family-owned since" },
              { value: "50+", label: "Years serving Detroit" },
              { value: "1″–240″", label: "Gear diameter range" },
              { value: "Any", label: "Quantity, one-off to run" },
            ].map(({ value, label }) => (
              <div key={label} style={{ background: "var(--color-bg)", padding: 20 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: 40, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 13, letterSpacing: ".06em", textTransform: "uppercase", color: "color-mix(in srgb,var(--color-text) 65%,transparent)", marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-accent-900)", color: "var(--color-text)" }}>
        <div className="wrap" style={{ paddingTop: "clamp(44px,5vw,72px)", paddingBottom: "clamp(44px,5vw,72px)", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 28, alignItems: "center" }}>
          <div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--color-accent-300)" }}>Reverse Engineering</span>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", textTransform: "uppercase", margin: "12px 0 0", lineHeight: 1.05 }}>Broken or obsolete gear? No drawing?</h2>
            <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: "52ch", margin: "16px 0 0", color: "color-mix(in srgb,var(--color-text) 85%,transparent)" }}>
              Send us the part or a photo. We measure it, reverse engineer it, and manufacture a replacement &mdash; even when the OEM is gone.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link to="/reverse-engineering" className="btn" style={{ textDecoration: "none", background: "var(--color-text)", color: "var(--color-bg)", borderColor: "var(--color-text)", fontSize: 15, padding: "12px 22px" }}>How it works &rarr;</Link>
            <Link to="/quote" className="btn" style={{ textDecoration: "none", background: "transparent", color: "var(--color-text)", borderColor: "color-mix(in srgb,var(--color-text) 55%,transparent)", fontSize: 15, padding: "12px 22px" }}>Send your part</Link>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: "clamp(48px,6vw,88px)", paddingBottom: "clamp(48px,6vw,88px)" }}>
        <div className="blueprint" style={{ padding: "clamp(28px,4vw,52px)" }}>
          <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", textTransform: "uppercase", margin: 0, maxWidth: "20ch" }}>Have a print? Get a quote back fast.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.55, maxWidth: "54ch", margin: "16px 0 0", color: "color-mix(in srgb,var(--color-text) 80%,transparent)" }}>
            Upload a PDF, STEP, DWG &mdash; or just a photo of the part. No CAD file? A photo or hand sketch is fine.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 26 }}>
            <Link to="/quote" className="btn btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Request a Quote</Link>
            <a href="tel:+15864691076" className="btn btn-secondary" style={{ textDecoration: "none", fontSize: 15, padding: "12px 22px" }}>Call (586) 469-1076</a>
          </div>
        </div>
      </section>
    </>
  );
}
