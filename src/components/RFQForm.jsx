import { useRef, useState } from "react";

// The Dashboard/Sheet backend tracks one row per submission (one
// "description" + one "quantity" — see netlify/functions/add-quote.js and
// src/pages/dashboard/QuoteCard.jsx). There's no per-line-item tracking
// there yet, so multiple parts are folded into those two existing fields
// at submit time rather than posted as separate part_N_* fields — this
// keeps the multi-part UI without requiring any backend/Apps Script change.
export const RFQ_MAX_LINE_ITEMS = 10;

const FILE_ACCEPT = ".pdf,.step,.stp,.dwg,.dxf,.iges,.igs,.jpg,.jpeg,.png";

let nextLineItemId = 1;
function makeLineItem() {
  return {
    id: nextLineItemId++,
    name: "",
    material: "",
    qty: "",
    specifications: "",
  };
}

function validateLineItem(item) {
  const errors = {};
  if (!item.name.trim()) errors.name = "Required";
  if (!item.material.trim()) errors.material = "Required";
  if (!item.qty.trim()) errors.qty = "Required";
  if (!item.specifications.trim()) errors.specifications = "Required";
  return errors;
}

function validateRequest(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Required";
  if (!fields.email.trim()) errors.email = "Required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Enter a valid email";
  return errors;
}

function buildDescription(lineItems) {
  return lineItems
    .map((item, i) => {
      const lines = [
        `PART ${i + 1} OF ${lineItems.length}`,
        `Description: ${item.name.trim()}`,
        `Material: ${item.material.trim()}`,
        `Quantity: ${item.qty.trim()}`,
        `Specifications: ${item.specifications.trim()}`,
      ];
      return lines.join("\n");
    })
    .join("\n" + "-".repeat(32) + "\n");
}

function buildQuantitySummary(lineItems) {
  const n = lineItems.length;
  return n > 1 ? `${n} parts — qty per part in description` : lineItems[0].qty.trim();
}

function ErrorText({ children }) {
  if (!children) return null;
  return <span className="fx-error-text">{children}</span>;
}

function LineItemCard({
  item, index, total, showError, fieldRef,
  onChange, onBlur, onRemove, onMoveUp, onMoveDown, canRemove, canMoveUp, canMoveDown,
}) {
  const base = `${item.id}`;
  return (
    <div className="fx-line-item">
      <div className="fx-line-item-head">
        <span className="fx-line-item-title">Part {index + 1} of {total}</span>
        <div className="fx-line-item-actions">
          <button type="button" className="btn btn-ghost btn-icon" onClick={onMoveUp} disabled={!canMoveUp} aria-label={`Move part ${index + 1} up`} title="Move up">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"></path></svg>
          </button>
          <button type="button" className="btn btn-ghost btn-icon" onClick={onMoveDown} disabled={!canMoveDown} aria-label={`Move part ${index + 1} down`} title="Move down">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7"></path></svg>
          </button>
          <button type="button" className="btn btn-ghost" onClick={onRemove} disabled={!canRemove} style={{ fontSize: 13 }}>
            Remove
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 14 }}>
        <div className="field">
          <label htmlFor={`fx-part-${base}-name`}>Part name / description</label>
          <input
            ref={fieldRef("name")}
            className={`input${showError("name") ? " fx-input-error" : ""}`}
            id={`fx-part-${base}-name`}
            type="text"
            value={item.name}
            onChange={(e) => onChange("name", e.target.value)}
            onBlur={() => onBlur("name")}
            placeholder="e.g. 24T spur gear"
          />
          <ErrorText>{showError("name")}</ErrorText>
        </div>
        <div className="field">
          <label htmlFor={`fx-part-${base}-material`}>Material</label>
          <input
            ref={fieldRef("material")}
            className={`input${showError("material") ? " fx-input-error" : ""}`}
            id={`fx-part-${base}-material`}
            type="text"
            value={item.material}
            onChange={(e) => onChange("material", e.target.value)}
            onBlur={() => onBlur("material")}
            placeholder="e.g. 4140 steel, Q&amp;T"
          />
          <ErrorText>{showError("material")}</ErrorText>
        </div>
        <div className="field">
          <label htmlFor={`fx-part-${base}-qty`}>Quantity</label>
          <input
            ref={fieldRef("qty")}
            className={`input${showError("qty") ? " fx-input-error" : ""}`}
            id={`fx-part-${base}-qty`}
            type="text"
            value={item.qty}
            onChange={(e) => onChange("qty", e.target.value)}
            onBlur={() => onBlur("qty")}
            placeholder="e.g. 1, 12, 500, production run"
          />
          <ErrorText>{showError("qty")}</ErrorText>
        </div>
      </div>

      <div className="field" style={{ marginBottom: 0 }}>
        <label htmlFor={`fx-part-${base}-specs`}>Specifications / dimensions</label>
        <textarea
          ref={fieldRef("specifications")}
          className={`input${showError("specifications") ? " fx-input-error" : ""}`}
          id={`fx-part-${base}-specs`}
          value={item.specifications}
          onChange={(e) => onChange("specifications", e.target.value)}
          onBlur={() => onBlur("specifications")}
          placeholder="Module or DP, pitch diameter, bore, tolerance, finish, or any other print callouts"
          style={{ minHeight: 80 }}
        ></textarea>
        <ErrorText>{showError("specifications")}</ErrorText>
      </div>
    </div>
  );
}

export default function RFQForm({ formName, customerStatus }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [lineItems, setLineItems] = useState(() => [makeLineItem()]);
  const [touched, setTouched] = useState({});
  const [request, setRequest] = useState({
    company: "", name: "", email: "", phone: "", leadTime: "", poReference: "", notes: "",
  });
  const [attachmentName, setAttachmentName] = useState("");

  const descriptionRef = useRef(null);
  const quantityRef = useRef(null);
  const fieldRefs = useRef({});

  const lineItemErrors = lineItems.map(validateLineItem);
  const requestErrors = validateRequest(request);

  function setRequestField(key, value) {
    setRequest((r) => ({ ...r, [key]: value }));
  }

  function markTouched(key) {
    setTouched((t) => (t[key] ? t : { ...t, [key]: true }));
  }

  function showError(key, err) {
    return (submitAttempted || touched[key]) && err ? err : null;
  }

  function setLineItemField(id, key, value) {
    setLineItems((items) => items.map((it) => (it.id === id ? { ...it, [key]: value } : it)));
  }

  function addLineItem() {
    setLineItems((items) => (items.length >= RFQ_MAX_LINE_ITEMS ? items : [...items, makeLineItem()]));
  }

  function removeLineItem(id) {
    setLineItems((items) => (items.length <= 1 ? items : items.filter((it) => it.id !== id)));
    setTouched((t) => {
      const next = { ...t };
      delete next[`${id}.name`];
      delete next[`${id}.material`];
      delete next[`${id}.qty`];
      delete next[`${id}.specifications`];
      return next;
    });
  }

  function moveLineItem(id, dir) {
    setLineItems((items) => {
      const idx = items.findIndex((it) => it.id === id);
      const swapWith = idx + dir;
      if (idx === -1 || swapWith < 0 || swapWith >= items.length) return items;
      const next = items.slice();
      [next[idx], next[swapWith]] = [next[swapWith], next[idx]];
      return next;
    });
  }

  function focusFirstInvalid() {
    let key = null;
    if (requestErrors.name) key = "request.name";
    else if (requestErrors.email) key = "request.email";
    if (!key) {
      const idx = lineItemErrors.findIndex((e) => Object.keys(e).length > 0);
      if (idx !== -1) {
        const item = lineItems[idx];
        const field = Object.keys(lineItemErrors[idx])[0];
        key = `${item.id}.${field}`;
      }
    }
    const el = key && fieldRefs.current[key];
    if (el) {
      el.focus();
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function handleSubmit(e) {
    if (submitting) {
      e.preventDefault();
      return;
    }
    setSubmitAttempted(true);
    const hasErrors =
      Object.keys(requestErrors).length > 0 ||
      lineItemErrors.some((errs) => Object.keys(errs).length > 0);
    if (hasErrors) {
      e.preventDefault();
      focusFirstInvalid();
      return;
    }
    if (descriptionRef.current) descriptionRef.current.value = buildDescription(lineItems);
    if (quantityRef.current) quantityRef.current.value = buildQuantitySummary(lineItems);
    setSubmitting(true);
  }

  return (
    <form
      name={formName}
      method="POST"
      action="/thank-you"
      data-netlify="true"
      netlify-honeypot="bot-field"
      encType="multipart/form-data"
      className="blueprint"
      style={{ padding: "clamp(24px,3vw,36px)", display: "flex", flexDirection: "column", gap: 22 }}
      onSubmit={handleSubmit}
      noValidate
    >
      <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="customer_status" value={customerStatus} />
      <input type="hidden" name="quantity" ref={quantityRef} />
      <textarea name="description" ref={descriptionRef} hidden defaultValue=""></textarea>

      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 15, textTransform: "uppercase", letterSpacing: ".04em", margin: "0 0 14px", color: "color-mix(in srgb,var(--color-text) 80%,transparent)" }}>
          Your information
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 18 }}>
          <div className="field">
            <label htmlFor="fx-company">Company name</label>
            <input className="input" id="fx-company" name="company" type="text" autoComplete="organization"
              value={request.company} onChange={(e) => setRequestField("company", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="fx-name">Contact name</label>
            <input
              ref={(el) => (fieldRefs.current["request.name"] = el)}
              className={`input${showError("request.name", requestErrors.name) ? " fx-input-error" : ""}`}
              id="fx-name" name="name" type="text" autoComplete="name"
              value={request.name}
              onChange={(e) => setRequestField("name", e.target.value)}
              onBlur={() => markTouched("request.name")}
            />
            <ErrorText>{showError("request.name", requestErrors.name)}</ErrorText>
          </div>
          <div className="field">
            <label htmlFor="fx-email">Email</label>
            <input
              ref={(el) => (fieldRefs.current["request.email"] = el)}
              className={`input${showError("request.email", requestErrors.email) ? " fx-input-error" : ""}`}
              id="fx-email" name="email" type="email" autoComplete="email"
              value={request.email}
              onChange={(e) => setRequestField("email", e.target.value)}
              onBlur={() => markTouched("request.email")}
            />
            <ErrorText>{showError("request.email", requestErrors.email)}</ErrorText>
          </div>
          <div className="field">
            <label htmlFor="fx-phone">Phone</label>
            <input className="input" id="fx-phone" name="phone" type="tel" autoComplete="tel"
              value={request.phone} onChange={(e) => setRequestField("phone", e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="fx-lead-time">Ideal lead time</label>
            <input className="input" id="fx-lead-time" name="lead_time" type="text"
              value={request.leadTime} onChange={(e) => setRequestField("leadTime", e.target.value)}
              placeholder="e.g. 2–4 weeks, ASAP, flexible" />
          </div>
          <div className="field">
            <label htmlFor="fx-po">Project / PO reference (optional)</label>
            <input className="input" id="fx-po" name="po_reference" type="text"
              value={request.poReference} onChange={(e) => setRequestField("poReference", e.target.value)} />
          </div>
        </div>
        <div className="field" style={{ marginTop: 18 }}>
          <label htmlFor="fx-notes">General notes (optional)</label>
          <textarea className="input" id="fx-notes" name="notes"
            value={request.notes} onChange={(e) => setRequestField("notes", e.target.value)}
            placeholder="Anything that applies to the whole order — timeline, delivery, packaging, etc."
            style={{ minHeight: 70 }}
          ></textarea>
        </div>
        <div className="field" style={{ marginTop: 18 }}>
          <label htmlFor="fx-attachment">Attach your print or a photo</label>
          <input
            className="input" id="fx-attachment" name="attachment" type="file"
            accept={FILE_ACCEPT}
            onChange={(e) => setAttachmentName(e.target.files?.[0]?.name || "")}
            style={{ padding: "8px 10px", cursor: "pointer" }}
          />
          <p style={{ fontSize: 12, margin: "7px 0 0", color: "color-mix(in srgb,var(--color-text) 62%,transparent)" }}>
            {attachmentName
              ? `Selected: ${attachmentName}`
              : "Accepts PDF, STEP, DWG, DXF, IGES, JPG/PNG. For multiple parts, one combined print or zip works best — note in Specifications which part each drawing covers."}
          </p>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: 15, textTransform: "uppercase", letterSpacing: ".04em", margin: 0, color: "color-mix(in srgb,var(--color-text) 80%,transparent)" }}>
            Parts
          </h2>
          <span style={{ fontSize: 13, color: "color-mix(in srgb,var(--color-text) 62%,transparent)" }}>
            {lineItems.length} part{lineItems.length > 1 ? "s" : ""} added
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {lineItems.map((item, index) => (
            <LineItemCard
              key={item.id}
              item={item}
              index={index}
              total={lineItems.length}
              fieldRef={(field) => (el) => (fieldRefs.current[`${item.id}.${field}`] = el)}
              showError={(field) => showError(`${item.id}.${field}`, lineItemErrors[index][field])}
              onChange={(field, value) => setLineItemField(item.id, field, value)}
              onBlur={(field) => markTouched(`${item.id}.${field}`)}
              onRemove={() => removeLineItem(item.id)}
              onMoveUp={() => moveLineItem(item.id, -1)}
              onMoveDown={() => moveLineItem(item.id, 1)}
              canRemove={lineItems.length > 1}
              canMoveUp={index > 0}
              canMoveDown={index < lineItems.length - 1}
            />
          ))}
        </div>

        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <button type="button" className="btn btn-secondary" onClick={addLineItem} disabled={lineItems.length >= RFQ_MAX_LINE_ITEMS}>
            + Add another part
          </button>
          {lineItems.length >= RFQ_MAX_LINE_ITEMS && (
            <span style={{ fontSize: 13, color: "color-mix(in srgb,var(--color-text) 62%,transparent)" }}>
              Max {RFQ_MAX_LINE_ITEMS} parts per request — call or email us for larger orders.
            </span>
          )}
        </div>
      </div>

      <input type="text" name="bot-field" tabIndex="-1" autoComplete="off" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true" />

      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 4 }}>
        <button type="submit" className="btn btn-primary" disabled={submitting} style={{ fontSize: 15, padding: "13px 26px", opacity: submitting ? 0.6 : 1, cursor: submitting ? "default" : "pointer" }}>
          {submitting ? "Sending…" : (
            <>
              Send Request{" "}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
            </>
          )}
        </button>
        <span style={{ fontSize: 13, color: "color-mix(in srgb,var(--color-text) 62%,transparent)" }}>We reply with a quote &mdash; usually same or next business day.</span>
      </div>
    </form>
  );
}
