import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// gtag's own 'config' call (index.html) already sends the page_view for the
// very first load, so this only needs to cover subsequent SPA navigations —
// React Router swaps routes client-side without a real page load, so
// gtag never sees them otherwise. /dashboard is Noah's internal quote
// tracker, not public site content, so it's excluded from tracking.
export default function useAnalytics() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (location.pathname.startsWith("/dashboard")) return;
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);
}
