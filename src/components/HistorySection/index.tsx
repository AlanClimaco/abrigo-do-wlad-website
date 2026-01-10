import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import styles from "./HistorySection.module.css";
import dogImage from "../../assets/cao.png";
import { Button } from "../ui/Button";

export function HistorySection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="historia"
      className={`container ${styles.contentSection}`}
      ref={sectionRef}
    >
      <div className={styles.gridContainer}>
        <div
          className={`${styles.imageWrapper} ${
            isVisible ? styles.visible : ""
          }`}
        >
          <img src={dogImage} alt="Cão Idoso do Abrigo" />
        </div>

        <div
          className={`${styles.textSide} ${isVisible ? styles.visible : ""}`}
        >
          <h2 className={styles.sectionTitle}>Nossa História</h2>

          <p>
            Há mais de 12 anos, <strong>Wladimir Cruz</strong> decidiu deixar um
            emprego estável e bem remunerado para seguir a paixão herdada de seu
            pai, Sr. Bene, que sempre ajudou pessoas e animais. Sr. Bene
            costumava acolher cães abandonados e até abriu espaço em sua casa
            para oferecer lar temporário aos resgatados.
          </p>

          <p>
            Inspirado pelo exemplo do pai e pelo amor à causa animal, Wladimir
            começou a resgatar cães e transformar o amplo quintal da família em
            um abrigo para animais abandonados. Assim nasceu o Abrigo do Wlad,
            um espaço dedicado a oferecer cuidado e esperança para cães que
            precisam de um novo lar.
          </p>

          <br />

          <Link to="/historia">
            <Button variant="text">
              Ler história completa <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
