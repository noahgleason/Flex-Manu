import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);

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
      <div className="wrap" style={{ maxWidth: 700, paddingTop: "clamp(64px,9vw,120px)", paddingBottom: "clamp(64px,9vw,120px)" }}>
        <span className="fx-kick">Dashboard</span>
        <h1 className="fx-display" style={{ maxWidth: "16ch" }}>Logged in as {user.email}</h1>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ marginTop: 28 }}
          onClick={() => window.netlifyIdentity && window.netlifyIdentity.logout()}
        >
          Log out
        </button>
      </div>
    </>
  );
}
