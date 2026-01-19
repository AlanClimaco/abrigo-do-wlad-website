import { Link } from "react-router";
import styles from "./Hero.module.css";
import { Button } from "../ui/Button";
import * as Lucide from "lucide-react";

export function Hero() {
  return (
    <section className={`container ${styles.heroContainer}`}>
      <div className={`${styles.heroContent}`}>
        <h1 className={styles.title}>
          Transformando abandono em finais felizes.
        </h1>

        <p className={styles.description}>
          O <strong>Abrigo do Wlad</strong> é refúgio, cura e esperança para centenas de cães que
          só conheciam a dor. Adote, doe, faça parte.
        </p>

        <div className={styles.btnGroup}>
          <Link to="/adotar" className="btn-primary">
            <Button size="lg">Conheça Nossos Cães</Button>
          </Link>

          <a href="#historia" className="btn-secondary">
            <Button size="lg" variant="text">
              Nossa História
              <Lucide.ChevronRight size={25} />
            </Button>
          </a>
        </div>
      </div>

      {/* image */}
      <div className={styles.heroOverlay}>
        <img className={styles.heroImage} src="https://res.cloudinary.com/dx2hevcud/image/upload/v1768489291/romeu1_e0r4ni.png" alt="" />
        <img className={styles.heroSecondaryImage} src="https://res.cloudinary.com/dx2hevcud/image/upload/v1768489292/romeu2_hjdrdw.png" alt="" />
      </div>
    </section>
  );
}
