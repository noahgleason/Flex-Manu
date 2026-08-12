import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import MinimalLayout from "./components/MinimalLayout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import Capabilities from "./pages/Capabilities.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Quote from "./pages/Quote.jsx";
import PartnerRFQ from "./pages/PartnerRFQ.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import DashboardOverview from "./pages/dashboard/DashboardOverview.jsx";
import DashboardStatusView from "./pages/dashboard/DashboardStatusView.jsx";
import AddQuote from "./pages/dashboard/AddQuote.jsx";
import { STATUS_LEVELS } from "./pages/dashboard/constants.js";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="capabilities" element={<Capabilities />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="all" element={<DashboardStatusView status={null} />} />
            {STATUS_LEVELS.map(({ label, slug }) => (
              <Route key={slug} path={slug} element={<DashboardStatusView status={label} />} />
            ))}
            <Route path="add" element={<AddQuote />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<MinimalLayout />}>
          <Route path="quote" element={<Quote />} />
          <Route path="partner-rfq" element={<PartnerRFQ />} />
          <Route path="thank-you" element={<ThankYou />} />
        </Route>
      </Routes>
    </>
  );
}
