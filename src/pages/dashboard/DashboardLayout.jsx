import { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Seo from "../../components/Seo.jsx";
import { authedFetch, sessionExpiredMessage } from "./api.js";
import { ID_COLUMN, STATUS_LEVELS } from "./constants.js";

export default function DashboardLayout() {
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

  const handleFieldChange = async (quote, fieldKey, newValue) => {
    const id = quote[ID_COLUMN];
    const previousValue = quote[fieldKey];

    markSaving(id, true);
    setQuotes((qs) => qs.map((q) => (q[ID_COLUMN] === id ? { ...q, [fieldKey]: newValue } : q)));

    try {
      await authedFetch("/update-quote", {
        method: "POST",
        body: JSON.stringify({ id, fields: { [fieldKey]: newValue } }),
      });
    } catch (err) {
      setQuotes((qs) => qs.map((q) => (q[ID_COLUMN] === id ? { ...q, [fieldKey]: previousValue } : q)));
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

        <nav style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 32, borderBottom: "1px solid var(--color-divider)", paddingBottom: 16 }}>
          <NavLink to="/dashboard" end className={({ isActive }) => `btn ${isActive ? "btn-primary" : "btn-secondary"}`}>
            Overview
          </NavLink>
          <NavLink to="/dashboard/all" className={({ isActive }) => `btn ${isActive ? "btn-primary" : "btn-secondary"}`}>
            All
          </NavLink>
          {STATUS_LEVELS.map(({ label, slug }) => (
            <NavLink key={slug} to={`/dashboard/${slug}`} className={({ isActive }) => `btn ${isActive ? "btn-primary" : "btn-secondary"}`}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/dashboard/add" className={({ isActive }) => `btn ${isActive ? "btn-primary" : "btn-secondary"}`}>
            + Add Quote
          </NavLink>
        </nav>

        {quotesError && (
          <p style={{ fontSize: 14, color: "var(--color-accent-700)", margin: "20px 0 0" }}>{quotesError}</p>
        )}

        <div style={{ marginTop: 28 }}>
          {quotesLoading ? (
            <p style={{ fontSize: 15, color: "color-mix(in srgb,var(--color-text) 70%,transparent)" }}>Loading quotes…</p>
          ) : (
            <Outlet
              context={{
                quotes,
                savingIds,
                onStatusChange: (quote, newStatus) => handleFieldChange(quote, "Status", newStatus),
                onFieldChange: handleFieldChange,
                onDelete: handleDelete,
                refreshQuotes: loadQuotes,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
