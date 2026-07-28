import { useOutletContext } from "react-router-dom";
import QuoteCard from "./QuoteCard.jsx";
import { ID_COLUMN } from "./constants.js";

export default function DashboardStatusView({ status }) {
  const { quotes, savingIds, onStatusChange, onFieldChange, onDelete } = useOutletContext();

  const filtered = status ? quotes.filter((q) => (q.Status || "New") === status) : quotes;

  if (filtered.length === 0) {
    return (
      <p style={{ fontSize: 15, color: "color-mix(in srgb,var(--color-text) 70%,transparent)" }}>
        No quotes {status ? `in "${status}"` : "found"}.
      </p>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
      {filtered.map((quote) => (
        <QuoteCard
          key={quote[ID_COLUMN]}
          quote={quote}
          isSaving={savingIds.has(quote[ID_COLUMN])}
          onStatusChange={onStatusChange}
          onFieldChange={onFieldChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
