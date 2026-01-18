import { Link } from "react-router";
import * as Lucide from "lucide-react";
import styles from "./Footer.module.css";

import logo from "../../assets/logo.png";
import { TextLink } from "../common/Link";

export function Footer() {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Info */}
        <div className={styles.footerInfo}>
          <div className={styles.footerBrand}>
            <img src={logo} alt="logotipo do Abrigo do Wlad" />
            <span>ABRIGO DO WLAD</span>
          </div>
          <p>
            Resgatando vidas e transformando histórias desde 2012. Somos uma
            organização sem fins lucrativos dedicada ao amor e respeito animal.
          </p>
          <div className={styles.footerLocal}>
            <Lucide.MapPin size={16} />
            <span>Atuamos em Morumbi, SP</span>
          </div>
        </div>

        {/* Navigation */}
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

        {/* Contact */}
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
        </div>
      </div>

      <div className={`container ${styles.footerBottom}`}>
        <div className={styles.footerBottomGroup}>
          <p style={{ opacity: 0.8 }}>
            &copy; {new Date().getFullYear()} Abrigo do Wlad. Todos os Direitos
            Reservados
          </p>
        </div>
        <div className={styles.footerBottomGroup}>
          <TextLink href="#">Política de Privacidade</TextLink>
          <TextLink href="#">Termos de Uso</TextLink>
          <p className={styles.credits}>
            Por <TextLink href="https://github.com/AlanClimaco">Alan</TextLink>&{" "}
            <TextLink href="https://github.com/spantalho">Luis</TextLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
