import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import HowToHelp from './pages/HowToHelp';
import History from './pages/History';
import { BrowserRouter, Route, Routes } from 'react-router';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/como-ajudar" element={<HowToHelp />}/>
        <Route path="/historia" element={<History />}/>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}