import { useState } from "react";
import { Link } from "react-router";
import styles from "./Hero.module.css";
import { Button } from "../ui/Button";

export function Hero() {
  const [isVisible] = useState(true);

  return (
    <section className={styles.heroVisual}>
      <div className={styles.heroOverlay}>
        <div
          className={`${styles.heroContent} ${
            isVisible ? styles.heroContentActive : ""
          }`}
        >
          <span className={styles.badge}>Desde 2012</span>

          <h1 className={styles.title}>
            Transformando abandono em finais felizes.
          </h1>

          <p className={styles.description}>
            O Abrigo do Wlad é refúgio, cura e esperança para centenas de cães
            que só conheciam a dor. Adote, doe, faça parte.
          </p>

          <div className={styles.btnGroup}>
            <Link to="/adotar" className="btn-primary">
              <Button size="lg">Conheça Nossos Cães</Button>
            </Link>

            <a href="#historia" className="btn-secondary">
              <Button size="lg" variant="ghost">
                Nossa História
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
