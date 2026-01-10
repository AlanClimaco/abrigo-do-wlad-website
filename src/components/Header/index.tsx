import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <Link to="/">
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

      <nav className={styles.navMenu}>
        <Link to="/" className={getLinkClass("/")}>
          Início
        </Link>
        <Link to="/adotar" className={getLinkClass("/adotar")}>
          Adotar
        </Link>
        <Link to="/historia" className={getLinkClass("/historia")}>
          História
        </Link>
        <Link to="/tampinhas" className={getLinkClass("/tampinhas")}>
          Tampinhas
        </Link>

        <Link to="/formulario" className={styles.btnCta}>
          Quero Adotar
        </Link>
      </nav>
    </header>
  );
}
