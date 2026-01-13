import { Link } from "react-router";
import * as Lucide from "lucide-react";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footerModern}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Coluna 1: Info */}
        <div className={styles.footerInfo}>
          <div className={styles.footerBrand}>
            <Lucide.PawPrint size={32} />
            <span>ABRIGO DO WLAD</span>
          </div>
          <p>
            Resgatando vidas e transformando histórias desde 2012. Somos uma
            organização sem fins lucrativos dedicada ao amor e respeito animal.
          </p>
        </div>

        {/* Coluna 2: Navegação */}
        <div className={styles.footerLinks}>
          <h4 className={styles.columnTitle}>Navegação</h4>
          <Link to="/" className={styles.linkItem}>
            <Lucide.ChevronRight /> Início
          </Link>
          <Link to="/adotar" className={styles.linkItem}>
            <Lucide.ChevronRight /> Quero Ajudar
          </Link>
          <Link to="/historia" className={styles.linkItem}>
            <Lucide.ChevronRight /> Nossa história
          </Link>
          <Link to="/tampinhas" className={styles.linkItem}>
            <Lucide.ChevronRight /> Projeto Tampinhas
          </Link>
          <Link to="/formulario" className={styles.linkItem}>
            <Lucide.ChevronRight /> Formulário de Interesse
          </Link>
        </div>

        {/* Coluna 3: Contato */}
        <div className={styles.footerSocial}>
          <h4 className={styles.columnTitle}>Fale Conosco</h4>

          <a
            href="https://instagram.com/abrigodowlad"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.contactItem}
          >
            <div className={styles.iconBox}>
              <Lucide.Instagram size={20} />
            </div>
            <span>@abrigodowlad</span>
          </a>

          <a
            href="mailto:abrigodowlad@gmail.com"
            className={styles.contactItem}
          >
            <div className={styles.iconBox}>
              <Lucide.Mail size={20} />
            </div>
            <span>abrigodowlad@gmail.com</span>
          </a>

          <div className={styles.contactItem}>
            <div className={styles.iconBox}>
              <Lucide.MapPin size={20} />
            </div>
            <span>Morumbi - SP</span>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Abrigo do Wlad</p>
        <p
          style={{
            display: "inline-flex",
            alignItems: "center",
            fontSize: "0.8rem",
            marginTop: "5px",
            opacity: 0.6,
          }}
        >
          Desenvolvido com <Lucide.Dog size={16} style={{ margin: "0px 3px" }} /> por
          Alan e Luis.
        </p>
      </div>
    </footer>
  );
}
