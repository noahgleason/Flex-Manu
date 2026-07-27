import { Link, useOutletContext } from "react-router-dom";
import { STATUS_LEVELS } from "./constants.js";

export default function DashboardOverview() {
  const { quotes } = useOutletContext();

  const counts = STATUS_LEVELS.reduce((acc, { label }) => {
    acc[label] = 0;
    return acc;
  }, {});
  let unrecognized = 0;
  quotes.forEach((q) => {
    const status = q.Status || "New";
    if (Object.prototype.hasOwnProperty.call(counts, status)) {
      counts[status] += 1;
    } else {
      unrecognized += 1;
    }
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 20 }}>
      <Link to="/dashboard/all" className="blueprint card" style={{ padding: 24, textDecoration: "none" }}>
        <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
        <span className="card-kicker">Total</span>
        <span className="card-title" style={{ display: "block", fontSize: 36 }}>{quotes.length}</span>
        <span className="card-body">All quotes</span>
      </Link>
      {STATUS_LEVELS.map(({ label, slug }) => (
        <Link key={slug} to={`/dashboard/${slug}`} className="blueprint card" style={{ padding: 24, textDecoration: "none" }}>
          <i className="corner tl"></i><i className="corner tr"></i><i className="corner bl"></i><i className="corner br"></i>
          <span className="card-kicker">{label}</span>
          <span className="card-title" style={{ display: "block", fontSize: 36 }}>{counts[label]}</span>
        </Link>
      ))}
      {unrecognized > 0 && (
        <p style={{ fontSize: 13, color: "color-mix(in srgb,var(--color-text) 60%,transparent)", gridColumn: "1 / -1", margin: 0 }}>
          {unrecognized} quote{unrecognized === 1 ? "" : "s"} have a status outside the five levels above — visible on the{" "}
          <Link to="/dashboard/all" style={{ color: "var(--color-accent-700)" }}>All</Link> page.
        </p>
      )}
    </div>
  );
}
