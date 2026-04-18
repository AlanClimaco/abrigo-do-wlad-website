import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Recycle from "./pages/Recycle";
import Adopt from "./pages/Adopt";
// import Form from "./pages/Form";
import ScrollToTop from "./components/common/ScrollToTop";
import BetaForm from "./pages/BetaForm";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/tampinhas" element={<Recycle />} />
        <Route path="/adotar" element={<Adopt />} />
        <Route
          path="/beta/formulario"
          element={<Navigate to="/beta/formulario/step/1" replace />}
        />
        <Route path="/beta/formulario/step/:step" element={<BetaForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
