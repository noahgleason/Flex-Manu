import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { authedFetch, sessionExpiredMessage } from "./api.js";

const EMPTY_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  description: "",
  quantity: "",
  file_link: "",
};

export default function AddQuote() {
  const { refreshQuotes } = useOutletContext();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await authedFetch("/add-quote", {
        method: "POST",
        body: JSON.stringify(form),
      });
      await refreshQuotes();
      navigate("/dashboard/all");
    } catch (err) {
      setError(sessionExpiredMessage(err));
      if (err.status === 401 && window.netlifyIdentity) {
        window.netlifyIdentity.open("login");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="blueprint" style={{ padding: "clamp(24px,3vw,36px)", maxWidth: 560 }}>
      <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
      <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 20, textTransform: "uppercase", margin: "0 0 6px" }}>Log a Manual Quote</h2>
      <p style={{ fontSize: 14, lineHeight: 1.5, margin: "0 0 20px", color: "color-mix(in srgb,var(--color-text) 70%,transparent)" }}>
        For phone or walk-in RFQs that didn't come through the website form.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="field">
          <label htmlFor="aq-name">Customer Name</label>
          <input className="input" id="aq-name" type="text" required value={form.name} onChange={setField("name")} />
        </div>
        <div className="field">
          <label htmlFor="aq-company">Company</label>
          <input className="input" id="aq-company" type="text" value={form.company} onChange={setField("company")} />
        </div>
        <div className="field">
          <label htmlFor="aq-email">Email</label>
          <input className="input" id="aq-email" type="email" required value={form.email} onChange={setField("email")} />
        </div>
        <div className="field">
          <label htmlFor="aq-phone">Phone</label>
          <input className="input" id="aq-phone" type="tel" value={form.phone} onChange={setField("phone")} />
        </div>
        <div className="field">
          <label htmlFor="aq-desc">Part #/Description</label>
          <textarea className="input" id="aq-desc" required value={form.description} onChange={setField("description")} style={{ minHeight: 100 }} />
        </div>
        <div className="field">
          <label htmlFor="aq-qty">Quantity</label>
          <input className="input" id="aq-qty" type="number" min="1" step="1" value={form.quantity} onChange={setField("quantity")} />
        </div>
        <div className="field">
          <label htmlFor="aq-file-link">File Link (optional)</label>
          <input className="input" id="aq-file-link" type="text" placeholder="https://…" value={form.file_link} onChange={setField("file_link")} />
        </div>

        {error && <p style={{ fontSize: 14, color: "var(--color-accent-700)", margin: 0 }}>{error}</p>}

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Adding…" : "Add Quote"}
          </button>
          <button type="button" className="btn btn-secondary" disabled={submitting} onClick={() => navigate("/dashboard/all")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
