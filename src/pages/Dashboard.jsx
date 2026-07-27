import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";

const ID_COLUMN = "RFQ #";
const STATUS_OPTIONS = ["New", "Quoted", "Awaiting PO", "In Production", "Shipped"];
const FUNCTIONS_BASE = "/.netlify/functions";

async function authedFetch(path, options = {}) {
  const widget = window.netlifyIdentity;
  const currentUser = widget && widget.currentUser();
  if (!currentUser) {
    const err = new Error("Not authenticated");
    err.status = 401;
    throw err;
  }

  const token = await currentUser.jwt();
  const res = await fetch(`${FUNCTIONS_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data && data.error) message = data.error;
    } catch {
      // response wasn't JSON — fall back to the generic message
    }
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  return res.status === 204 ? null : res.json();
}

function sessionExpiredMessage(err) {
  return err.status === 401
    ? "Your session has expired. Please log in again."
    : err.message || "Something went wrong.";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

  const [quotes, setQuotes] = useState([]);
  const [quotesLoading, setQuotesLoading] = useState(false);
  const [quotesError, setQuotesError] = useState(null);
  const [savingIds, setSavingIds] = useState(() => new Set());

  useEffect(() => {
    const widget = window.netlifyIdentity;
    if (!widget) return;

    const hash = window.location.hash || "";
    const hasAuthToken = hash.indexOf("invite_token=") !== -1 || hash.indexOf("confirmation_token=") !== -1;

    const existingUser = widget.currentUser();
    if (existingUser) {
      setUser(existingUser);
      setChecked(true);
    } else if (!hasAuthToken) {
      // If an invite/confirmation token is in the hash, index.html's own
      // handler already opens the widget on the correct panel — opening
      // "login" here would stomp on that with a plain sign-in form.
      widget.open("login");
    }

    const handleLogin = (loggedInUser) => {
      setUser(loggedInUser);
      setChecked(true);
      widget.close();
    };

    const handleClose = () => {
      setChecked(true);
      if (!widget.currentUser()) {
        navigate("/", { replace: true });
      }
    };

    const handleLogout = () => {
      setUser(null);
      navigate("/", { replace: true });
    };

    widget.on("login", handleLogin);
    widget.on("close", handleClose);
    widget.on("logout", handleLogout);

    return () => {
      widget.off("login", handleLogin);
      widget.off("close", handleClose);
      widget.off("logout", handleLogout);
    };
  }, [navigate]);

  const loadQuotes = useCallback(async () => {
    setQuotesLoading(true);
    setQuotesError(null);
    try {
      const data = await authedFetch("/get-quotes");
      setQuotes(data.quotes || []);
    } catch (err) {
      setQuotesError(sessionExpiredMessage(err));
      if (err.status === 401 && window.netlifyIdentity) {
        window.netlifyIdentity.open("login");
      }
    } finally {
      setQuotesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) loadQuotes();
  }, [user, loadQuotes]);

  const markSaving = (id, isSaving) => {
    setSavingIds((prev) => {
      const next = new Set(prev);
      if (isSaving) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleStatusChange = async (quote, newStatus) => {
    const id = quote[ID_COLUMN];
    const previousStatus = quote.Status;

    markSaving(id, true);
    setQuotes((qs) => qs.map((q) => (q[ID_COLUMN] === id ? { ...q, Status: newStatus } : q)));

    try {
      await authedFetch("/update-quote", {
        method: "POST",
        body: JSON.stringify({ id, fields: { Status: newStatus } }),
      });
    } catch (err) {
      setQuotes((qs) => qs.map((q) => (q[ID_COLUMN] === id ? { ...q, Status: previousStatus } : q)));
      setQuotesError(sessionExpiredMessage(err));
      if (err.status === 401 && window.netlifyIdentity) {
        window.netlifyIdentity.open("login");
      }
    } finally {
      markSaving(id, false);
    }
  };

  const handleDelete = async (quote) => {
    const id = quote[ID_COLUMN];
    const who = quote["Customer Name"] ? ` for ${quote["Customer Name"]}` : "";
    if (!window.confirm(`Delete quote ${id}${who}? This can't be undone.`)) return;

    markSaving(id, true);
    try {
      await authedFetch("/delete-quote", {
        method: "POST",
        body: JSON.stringify({ id }),
      });
      setQuotes((qs) => qs.filter((q) => q[ID_COLUMN] !== id));
    } catch (err) {
      setQuotesError(sessionExpiredMessage(err));
      if (err.status === 401 && window.netlifyIdentity) {
        window.netlifyIdentity.open("login");
      }
    } finally {
      markSaving(id, false);
    }
  };

  if (!user) {
    return (
      <>
        <Seo title="Dashboard | Flex Manufacturing, Inc." path="/dashboard" noindex />
        <div className="wrap" style={{ maxWidth: 700, paddingTop: "clamp(64px,9vw,120px)", paddingBottom: "clamp(64px,9vw,120px)" }}>
          <p style={{ fontSize: 16, color: "color-mix(in srgb,var(--color-text) 70%,transparent)" }}>
            {checked ? "You need to log in to view this page." : "Checking login status…"}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo title="Dashboard | Flex Manufacturing, Inc." path="/dashboard" noindex />
      <div className="wrap" style={{ maxWidth: 1200, paddingTop: "clamp(40px,5vw,72px)", paddingBottom: "clamp(64px,9vw,120px)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="fx-kick">Dashboard</span>
            <h1 className="fx-display" style={{ maxWidth: "20ch", fontSize: "clamp(28px,4vw,44px)" }}>Logged in as {user.email}</h1>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => window.netlifyIdentity && window.netlifyIdentity.logout()}
          >
            Log out
          </button>
        </div>

        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 19, textTransform: "uppercase", margin: "0 0 16px" }}>Quotes</h2>

          {quotesError && (
            <p style={{ fontSize: 14, color: "var(--color-accent-700)", margin: "0 0 16px" }}>{quotesError}</p>
          )}

          {quotesLoading ? (
            <p style={{ fontSize: 15, color: "color-mix(in srgb,var(--color-text) 70%,transparent)" }}>Loading quotes…</p>
          ) : quotes.length === 0 ? (
            <p style={{ fontSize: 15, color: "color-mix(in srgb,var(--color-text) 70%,transparent)" }}>No quotes found.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
              {quotes.map((quote) => {
                const id = quote[ID_COLUMN];
                const isSaving = savingIds.has(id);
                const statusValue = quote.Status || "";

                return (
                  <div key={id} className="blueprint card" style={{ padding: 20 }}>
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
                        onChange={(e) => handleStatusChange(quote, e.target.value)}
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
                        onClick={() => handleDelete(quote)}
                        style={{ color: "#e0554f", borderColor: "#e0554f" }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
