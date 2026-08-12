import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ScrollVeil from "./ScrollVeil.jsx";

export default function Layout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* No background here — ScrollVeil drives body's own background-color
          directly, and this wrapper needs to stay transparent for it to show. */}
      <ScrollVeil />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
