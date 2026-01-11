import { useState } from "react";
import { Button } from "../ui/Button";
import * as Lucide from "lucide-react";
import styles from "./ActionCards.module.css";
import { Link } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardIcon,
  CardTitle,
} from "../ui/Card";

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
      
      {/* Adoção */}
      <Card>
        <CardHeader>
          <CardIcon>
            <Lucide.Heart size={48} strokeWidth={1.5} />
          </CardIcon>
          <CardTitle>Adoção Responsável</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Nossos animais são entregues <strong>castrados e vacinados</strong>.
            Adotar é um compromisso de amor para a vida toda.
          </p>
        </CardContent>
        <CardFooter>
          <Link to="/adotar" className="btn-text">
            <Button size="md" variant="text">
              Conheça Nossos Cães <Lucide.ArrowRight size={20} />
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Doações */}
      <Card>
        <CardHeader>
          <CardIcon>
            <Lucide.QrCode size={48} strokeWidth={1.5} />
          </CardIcon>
          <CardTitle>Faça uma Doação</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Mantemos o abrigo <strong>100% com doações</strong>. Sua ajuda
            garante ração e remédios.
          </p>
        </CardContent>
        <CardFooter>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <Button
              onClick={handleCopyPix}
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
            <span style={{ fontSize: "12px", opacity: "0.8" }}>
              Doação via <strong>PIX</strong>
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* Tampinhas */}
      <Card>
        <CardHeader>
          <CardIcon>
            <Lucide.Recycle size={48} strokeWidth={1.5} />
          </CardIcon>
          <CardTitle>Projeto Tampinhas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Não jogue fora!</strong> Suas tampinhas de plástico
            financiam a ração e os medicamentos dos nossos resgatados.
          </p>
        </CardContent>
        <CardFooter>
          <Link to="/tampinhas" className="btn-text">
            <Button size="md" variant="text">
              Ver Pontos de Coleta <Lucide.ArrowRight size={20} />
            </Button>
          </Link>
        </CardFooter>
      </Card>

    </section>
  );
}
