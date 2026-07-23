import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Capabilities from "./pages/Capabilities.jsx";
import ReverseEngineering from "./pages/ReverseEngineering.jsx";
import About from "./pages/About.jsx";
import Quote from "./pages/Quote.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="capabilities" element={<Capabilities />} />
        <Route path="reverse-engineering" element={<ReverseEngineering />} />
        <Route path="about" element={<About />} />
        <Route path="quote" element={<Quote />} />
        <Route path="thank-you" element={<ThankYou />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
