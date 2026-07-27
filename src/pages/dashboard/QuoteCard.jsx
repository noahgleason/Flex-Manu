import { ID_COLUMN, STATUS_OPTIONS } from "./constants.js";

export default function QuoteCard({ quote, isSaving, onStatusChange, onDelete }) {
  const id = quote[ID_COLUMN];
  const statusValue = quote.Status || "";

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
