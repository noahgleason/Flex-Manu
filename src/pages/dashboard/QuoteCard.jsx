import { useEffect, useState } from "react";
import { ID_COLUMN, STATUS_OPTIONS, CUSTOMER_STATUS_OPTIONS } from "./constants.js";

const DETAIL_FIELDS = [
  { key: "Quote Link", label: "Quote Link", type: "text", showLinkWhenSet: true },
  { key: "Quoted Price", label: "Quoted Price ($)", type: "number" },
  { key: "Quote Sent Date", label: "Quote Sent Date", type: "date" },
  { key: "PO Received Date", label: "PO Received Date", type: "date" },
  { key: "Completion Date", label: "Completion Date", type: "date" },
  { key: "Notes", label: "Notes", type: "textarea" },
];

function EditableField({ id, label, type, value, isSaving, showLinkWhenSet, onCommit }) {
  const [draft, setDraft] = useState(value || "");

  useEffect(() => {
    setDraft(value || "");
  }, [value]);

  const commit = () => {
    if (draft !== (value || "")) onCommit(draft);
  };

  if (type === "textarea") {
    return (
      <div className="field">
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          className="input"
          value={draft}
          disabled={isSaving}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          style={{ minHeight: 80 }}
        />
      </div>
    );
  }

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="input"
        type={type}
        step={type === "number" ? "0.01" : undefined}
        value={draft}
        disabled={isSaving}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
      />
      {showLinkWhenSet && value && (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: 12, marginTop: 6, display: "inline-block", color: "var(--color-accent-700)" }}
        >
          Open link &#8599;
        </a>
      )}
    </div>
  );
}

export default function QuoteCard({ quote, isSaving, onStatusChange, onFieldChange, onDelete }) {
  const id = quote[ID_COLUMN];
  const statusValue = quote.Status || "";
  const customerStatusValue = quote["Customer Status"] || "";
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="blueprint card" style={{ padding: 20 }}>
      <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
      <span className="card-kicker">RFQ {id}</span>
      <h3 className="card-title">{quote["Customer Name"] || "—"}</h3>
      {quote.Company && <p className="card-meta" style={{ margin: 0 }}>{quote.Company}</p>}
      <p className="card-body">{quote["Part #/Description"] || "—"}</p>
      <p className="card-meta" style={{ margin: 0 }}>Qty: {quote.Quantity || "—"}</p>

      <div className="field" style={{ marginTop: 8 }}>
        <label htmlFor={`status-${id}`}>Status</label>
        <select
          id={`status-${id}`}
          className="input"
          value={statusValue}
          disabled={isSaving}
          onChange={(e) => onStatusChange(quote, e.target.value)}
        >
          {!statusValue && <option value="" disabled>Select status…</option>}
          {!STATUS_OPTIONS.includes(statusValue) && statusValue && (
            <option value={statusValue}>{statusValue}</option>
          )}
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => setDetailsOpen((open) => !open)}
        style={{ background: "none", border: "none", padding: 0, marginTop: 12, cursor: "pointer", fontSize: 13, fontWeight: 500, color: "var(--color-accent-700)", textAlign: "left" }}
      >
        {detailsOpen ? "▾ Details" : "▸ Details"}
      </button>

      {detailsOpen && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 12, paddingTop: 14, borderTop: "1px solid var(--color-divider)" }}>
          <div className="field">
            <label htmlFor={`customer-status-${id}`}>Customer Status</label>
            <select
              id={`customer-status-${id}`}
              className="input"
              value={customerStatusValue}
              disabled={isSaving}
              onChange={(e) => onFieldChange(quote, "Customer Status", e.target.value)}
            >
              {!customerStatusValue && <option value="" disabled>Select…</option>}
              {!CUSTOMER_STATUS_OPTIONS.includes(customerStatusValue) && customerStatusValue && (
                <option value={customerStatusValue}>{customerStatusValue}</option>
              )}
              {CUSTOMER_STATUS_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          {DETAIL_FIELDS.map(({ key, label, type, showLinkWhenSet }) => (
            <EditableField
              key={key}
              id={`${key.replace(/\s+/g, "-").toLowerCase()}-${id}`}
              label={label}
              type={type}
              value={quote[key]}
              isSaving={isSaving}
              showLinkWhenSet={showLinkWhenSet}
              onCommit={(newValue) => onFieldChange(quote, key, newValue)}
            />
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <a
          className="btn btn-secondary"
          href={quote.mailto || undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!quote.mailto}
          style={!quote.mailto ? { opacity: 0.45, pointerEvents: "none" } : undefined}
        >
          Forward
        </a>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={isSaving}
          onClick={() => onDelete(quote)}
          style={{ color: "#e0554f", borderColor: "#e0554f" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
