import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { Button } from "../ui/Button";
import * as Lucide from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Detecta Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função para abrir/fechar o menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para fechar o menu ao clicar em um link (importante para UX mobile)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? `${styles.navLink} ${styles.activeLink}`
      : styles.navLink;
  };

  return (
    <header
      className={`${styles.headerContainer} ${
        isScrolled ? styles.headerScrolled : ""
      }`}
    >
      <div className={styles.logo}>
        <Link to="/" onClick={closeMenu}>
          <img
            src={logo}
            alt="Abrigo do Wlad"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.parentElement) {
                e.currentTarget.parentElement.innerText = "ABRIGO DO WLAD";
                e.currentTarget.parentElement.style.fontWeight = "800";
                e.currentTarget.parentElement.style.color = "var(--secondary)";
              }
            }}
          />
        </Link>
      </div>

      {/* BOTÃO HAMBURGER (MOBILE) */}
      <button 
        className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`} 
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      {/* 3. NAVEGAÇÃO */}
      <nav className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
        <Link to="/" className={getLinkClass("/")} onClick={closeMenu}>
          Início
        </Link>
        
        <Link to="/adotar" className={getLinkClass("/adotar")} onClick={closeMenu}>
          Adotar
        </Link>
        
        <Link to="/historia" className={getLinkClass("/historia")} onClick={closeMenu}>
          História
        </Link>
        
        <Link to="/tampinhas" className={getLinkClass("/tampinhas")} onClick={closeMenu}>
          Tampinhas
        </Link>

        {/* Botão de Ação */}
        <Link to="/formulario" onClick={closeMenu}>
          <Button size="md" variant="secondary">
            <Lucide.HeartHandshake size={20} style={{ marginRight: '8px' }}/>
            <span>Quero Ajudar</span>
          </Button>
        </Link>
      </nav>
    </header>
  );
}