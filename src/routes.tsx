import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { VLibrasWidget } from "./components/common/VLibrasWidget";
import Home from "./pages/Home";
import About from "./pages/About";
import Recycle from "./pages/Recycle";
import Adopt from "./pages/Adopt";
import PrivacyPolicy from "./pages/Legal";
import ScrollToTop from "./components/common/ScrollToTop";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <VLibrasWidget />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/tampinhas" element={<Recycle />} />
        <Route path="/adotar" element={<Adopt />} />
        {/* redirect pra home por enquanto */}
        <Route path="/formulario" element={<Home />} />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
