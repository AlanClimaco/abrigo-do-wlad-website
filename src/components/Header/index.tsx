import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { Button } from "../ui/Button";
import * as Lucide from "lucide-react";
import * as Dialog from "../ui/Dialog";
import PixModal from "../PixModal";

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

  // Função para abrir/fechar o menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Função para fechar o menu ao clicar em um link (importante para UX mobile)
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
  return (
    <header className={headerClasses}>
      <div className={styles.logo}>
        <NavLink to="/" onClick={closeMenu}>
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
        </NavLink>
      </div>

      {/* BOTÃO HAMBURGER (MOBILE) */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

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
              style={{ borderRadius: "var(--radius-xl)" }}
            >
              <Lucide.HeartHandshake size={20} />
              <span>Quero Ajudar</span>
            </Button>
          </Dialog.DialogTrigger>
          <PixModal />
        </Dialog.Dialog>
      </nav>
    </header>
  );
}
