import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import HowToHelp from './pages/HowToHelp';
import History from './pages/History';
import Adopt from './pages/Adopt';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/como-ajudar" element={<HowToHelp />}/>
        <Route path="/historia" element={<History />}/>
        <Route path="/adotar" element={<Adopt />}/>
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}