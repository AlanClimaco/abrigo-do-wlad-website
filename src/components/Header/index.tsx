import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import styles from "./Header.module.css";

import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-dark-mode.png";

import { Button } from "../ui/Button";
import * as Lucide from "lucide-react";
import * as Dialog from "../ui/Dialog";
import PixModal from "../PixModal";
import { ThemeToggle } from "../ThemeToggle";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // scroll detect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? `${styles.navLink} ${styles.activeLink}`
      : styles.navLink;
  };

  const headerClasses = `${styles.headerContainer} ${
    isScrolled && !menuOpen ? styles.headerScrolled : ""
  }`;

  // Função auxiliar de erro para não repetir código
  const handleImageError = (e: any) => {
    e.currentTarget.style.display = "none";
    // Apenas coloca o texto se nenhum texto alternativo estiver visível ainda
    const parent = e.currentTarget.parentElement;
    if (parent && !parent.innerText.includes("ABRIGO")) {
        const span = document.createElement("span");
        span.innerText = "ABRIGO DO WLAD";
        span.style.fontWeight = "800";
        span.style.color = "var(--secondary)";
        parent.appendChild(span);
    }
  };

  return (
    <header className={headerClasses}>
      <div className={styles.logo}>
        <NavLink to="/" onClick={closeMenu}>
          
          {/* OGO MODO CLARO */}
          <img
            src={logo}
            alt="Abrigo do Wlad"
            className={styles.logoLight} 
            onError={handleImageError}
          />

          {/* LOGO MODO ESCURO */}
          <img
            src={logoDark}
            alt="Abrigo do Wlad"
            className={styles.logoDark}
            onError={handleImageError}
          />

        </NavLink>
      </div>

      {/* NAVEGAÇÃO */}
      <nav className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
        <NavLink to="/" className={getLinkClass("/")} onClick={closeMenu}>
          Início
        </NavLink>

        <NavLink
          to="/adotar"
          className={getLinkClass("/adotar")}
          onClick={closeMenu}
        >
          Adotar
        </NavLink>

        <NavLink
          to="/sobre"
          className={getLinkClass("/sobre")}
          onClick={closeMenu}
        >
          Sobre Nós
        </NavLink>

        <NavLink
          to="/tampinhas"
          className={getLinkClass("/tampinhas")}
          onClick={closeMenu}
        >
          Tampinhas
        </NavLink>

        {/* Botão de Doação */}
        <Dialog.Dialog>
          <Dialog.DialogTrigger asChild>
            <Button
              className={styles.mainBtn}
              size="md"
              variant="secondary"
            >
              <Lucide.HeartHandshake size={20} />
              <span>Quero Ajudar</span>
            </Button>
          </Dialog.DialogTrigger>
          <PixModal />
        </Dialog.Dialog>
      </nav>

      {/* AÇÕES */}
      <div className={styles.actionsContainer}>
        <ThemeToggle />

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </div>
    </header>
  );
}