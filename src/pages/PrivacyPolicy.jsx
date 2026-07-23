import Seo from "../components/Seo.jsx";

const SECTIONS = [
  {
    title: "Information We Collect",
    body: 'When you submit a Request for Quote or contact form, we collect the information you provide, which may include your name, company name, email address, phone number, and any files you upload (such as drawings, prints, or photos of parts).',
  },
  {
    title: "How We Use Your Information",
    body: "We use this information solely to respond to your inquiry, prepare quotes, and communicate with you about your project. We do not sell, rent, or share your information with third parties for marketing purposes.",
  },
  {
    title: "File Uploads",
    body: "Files submitted through our Request a Quote form (drawings, specifications, photos) are used only to evaluate and quote your request. We treat all submitted materials as confidential business information.",
  },
  {
    title: "Data Storage",
    body: "Form submissions are processed through a third-party form service and are stored securely. We retain inquiry information only as long as necessary to respond to your request and maintain business records.",
  },
  {
    title: "Cookies and Analytics",
    body: "This site may use standard analytics tools (such as Google Analytics) to understand site traffic. These tools do not collect personally identifiable information beyond what you voluntarily submit through our forms.",
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title="Privacy Policy | Flex Manufacturing, Inc."
        description="How Flex Manufacturing, Inc. collects, uses, and protects information submitted through this website."
        path="/privacy-policy"
      />

      <div className="wrap" style={{ maxWidth: 760, paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(40px,5vw,72px)" }}>
        <span className="fx-kick">Privacy Policy</span>
        <h1 className="fx-display" style={{ maxWidth: "18ch", fontSize: "clamp(32px,5vw,56px)" }}>Privacy Policy</h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, margin: "24px 0 0", color: "color-mix(in srgb,var(--color-text) 84%,transparent)" }}>
          Flex Manufacturing, Inc. (&ldquo;Flex,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your privacy. This policy explains what information we collect through this website and how we use it.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 36 }}>
          {SECTIONS.map(({ title, body }) => (
            <div key={title}>
              <h2 style={{ fontSize: 19, textTransform: "uppercase", margin: "0 0 8px" }}>{title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb,var(--color-text) 82%,transparent)" }}>{body}</p>
            </div>
          ))}

          <div>
            <h2 style={{ fontSize: 19, textTransform: "uppercase", margin: "0 0 8px" }}>Contact Us</h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0, color: "color-mix(in srgb,var(--color-text) 82%,transparent)" }}>
              If you have questions about this privacy policy or how your information is handled, contact us at{" "}
              <a href="tel:+15867918060" style={{ color: "var(--color-accent-700)", fontWeight: 500 }}>(586) 791-8060</a> or through our{" "}
              <a href="/quote" style={{ color: "var(--color-accent-700)", fontWeight: 500 }}>Request a Quote</a> page.
            </p>
          </div>
        </div>

        <p style={{ fontSize: 13, margin: "40px 0 0", paddingTop: 20, borderTop: "1px solid var(--color-divider)", color: "color-mix(in srgb,var(--color-text) 60%,transparent)" }}>
          Last updated: July 2026
        </p>
      </div>
    </>
  );
}
