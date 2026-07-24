import Seo from "../components/Seo.jsx";

export default function PartnerRFQ() {
  return (
    <>
      <Seo
        title="Partner RFQ | Flex Manufacturing, Inc."
        description="Request for quote form for existing Flex Manufacturing customers."
        path="/partner-rfq"
        noindex
      />

      <div className="wrap" style={{ maxWidth: 1100, paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <span className="fx-kick">Partner RFQ</span>
        <h1 className="fx-display" style={{ maxWidth: "18ch" }}>Request for Quote &mdash; Existing Customers</h1>
        <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: "58ch", margin: "22px 0 0", color: "color-mix(in srgb,var(--color-text) 84%,transparent)" }}>
          For current Flex Manufacturing customers. Enter part details below and attach a print, CAD file, or photo. Response time is typically same or next business day. Phone:{" "}
          <a href="tel:+15867918060" style={{ color: "var(--color-accent-700)", fontWeight: 500 }}>(586) 791-8060</a>.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "clamp(28px,4vw,48px)", marginTop: 36, alignItems: "start" }}>
          <form
            name="partner-rfq"
            method="POST"
            action="/thank-you"
            data-netlify="true"
            netlify-honeypot="bot-field"
            encType="multipart/form-data"
            className="blueprint"
            style={{ padding: "clamp(24px,3vw,36px)", display: "flex", flexDirection: "column", gap: 18 }}
          >
            <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
            <input type="hidden" name="form-name" value="partner-rfq" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 18 }}>
              <div className="field">
                <label htmlFor="fx-name">Name</label>
                <input className="input" id="fx-name" name="name" type="text" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="fx-company">Company</label>
                <input className="input" id="fx-company" name="company" type="text" autoComplete="organization" />
              </div>
              <div className="field">
                <label htmlFor="fx-email">Email</label>
                <input className="input" id="fx-email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="fx-phone">Phone</label>
                <input className="input" id="fx-phone" name="phone" type="tel" autoComplete="tel" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="fx-qty">Quantity</label>
              <input className="input" id="fx-qty" name="quantity" type="text" placeholder="e.g. 1, 12, 500, production run" />
            </div>
            <div className="field">
              <label htmlFor="fx-desc">Part description &mdash; what do you need?</label>
              <textarea className="input" id="fx-desc" name="description" required placeholder="Gear type, dimensions, material, application, timeline&hellip;" style={{ minHeight: 120 }}></textarea>
            </div>
            <div className="field">
              <label htmlFor="fx-file">Attach your print or a photo</label>
              <input className="input" id="fx-file" name="attachment" type="file" accept=".pdf,.step,.stp,.dwg,.dxf,.iges,.igs,.jpg,.jpeg,.png" style={{ padding: "8px 10px", cursor: "pointer" }} />
              <p style={{ fontSize: 12, margin: "7px 0 0", color: "color-mix(in srgb,var(--color-text) 62%,transparent)" }}>
                Accepts PDF, STEP, DWG, DXF, IGES, JPG/PNG. A photo of the part works too.
              </p>
            </div>
            <input type="text" name="bot-field" tabIndex="-1" autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true" />
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 4 }}>
              <button type="submit" className="btn btn-primary" style={{ fontSize: 15, padding: "13px 26px" }}>
                Send Request{" "}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
              </button>
              <span style={{ fontSize: 13, color: "color-mix(in srgb,var(--color-text) 62%,transparent)" }}>We reply with a quote &mdash; usually same or next business day.</span>
            </div>
          </form>
          <aside style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="blueprint" style={{ padding: 24 }}>
              <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 19, textTransform: "uppercase", margin: "0 0 14px" }}>Rather call?</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="tel:+15867918060" style={{ fontFamily: "var(--font-heading)", fontSize: 21, color: "var(--color-accent-700)", textDecoration: "none", letterSpacing: ".01em" }}>Dave: (586) 791-8060</a>
                <a href="tel:+16166907648" style={{ fontFamily: "var(--font-heading)", fontSize: 21, color: "var(--color-accent-700)", textDecoration: "none", letterSpacing: ".01em" }}>Noah: (616) 690-7648</a>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: "14px 0 0", color: "color-mix(in srgb,var(--color-text) 78%,transparent)" }}>
                Flex Manufacturing, Inc.<br />44805 Trinity Dr<br />Clinton Township, MI 48038
              </p>
            </div>
            <div className="blueprint" style={{ padding: 24, background: "color-mix(in srgb,var(--color-accent) 8%,transparent)" }}>
              <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
              <p style={{ fontSize: 14, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb,var(--color-text) 82%,transparent)" }}>
                <strong style={{ fontFamily: "var(--font-heading)", textTransform: "uppercase", letterSpacing: ".04em" }}>Note:</strong><br />
                This form is for existing accounts only. Include as much part detail as possible for the fastest turnaround.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
