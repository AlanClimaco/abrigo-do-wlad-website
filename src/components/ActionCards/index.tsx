import { useState } from "react";
import { Button } from "../ui/Button";
import * as Lucide from "lucide-react";
import styles from "./ActionCards.module.css";
import { Link } from "react-router";

export function ActionCards() {
  const [copied, setCopied] = useState(false);
  const pixKey = "abrigodowlad@gmail.com";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <section className={`container ${styles.cardsContainer}`}>
      {/* Card 1: Adoção */}
      <div className={styles.card}>
        <div className={styles.cardIcon}>
          <Lucide.Heart size={48} strokeWidth={1.5} />
        </div>
        <h3>Adoção Responsável</h3>
        <p>
          Nossos animais são entregues castrados e vacinados. Adotar é um
          compromisso de amor para a vida toda.
        </p>
        <Link to="/adotar" className="btn-text">
          Conheça Nossos Cães <Lucide.ArrowRight size={20} />
        </Link>
      </div>

      {/* Card 2: Doações */}
      <div className={styles.card}>
        <div className={styles.cardIcon}>
          <Lucide.QrCode size={48} strokeWidth={1.5} />
        </div>
        <h3>Faça uma Doação</h3>
        <p>
          Mantemos o abrigo 100% com doações. Sua ajuda garante ração e
          remédios.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
          <Button
            onClick={handleCopyPix}
            variant="pix"
            size="sm"
            className={copied ? styles.copied : ""}
            title="Clique para copiar a chave PIX"
            style={{ width: "100%" }}
          >
            {copied ? (
              <>
                <Lucide.Check size={20} />
                PIX Copiado!
              </>
            ) : (
              <>
                <Lucide.Copy size={20} />
                abrigodowlad@gmail.com
              </>
            )}
          </Button>
          <Button size="sm" variant="secondary">
            <Lucide.QrCode size={20} />
            <span>Gerar Código QR</span>
          </Button>
        </div>
      </div>

      {/* Card 3: Tampinhas */}
      <div className={styles.card}>
        <div className={styles.cardIcon}>
          <Lucide.Recycle size={48} strokeWidth={1.5} />
        </div>
        <h3>Projeto Tampinhas</h3>
        <p>
          Não jogue fora! Suas tampinhas de plástico financiam a ração e os
          medicamentos dos nossos resgatados.
        </p>
        <Link to="/tampinhas" className="btn-text">
          Ver Pontos de Coleta <Lucide.ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
