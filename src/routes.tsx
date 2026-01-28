import { BrowserRouter, Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import History from "./pages/History";
import Recycle from "./pages/Recycle";
import Adopt from "./pages/Adopt";
import Form from "./pages/Form";
import ScrollToTop from "./components/common/ScrollToTop";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<History />} />
        <Route path="/tampinhas" element={<Recycle />} />
        <Route path="/adotar" element={<Adopt />} />
        <Route path="/formulario" element={<Form />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
