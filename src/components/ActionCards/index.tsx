import * as Lucide from "lucide-react";
import styles from "./ActionCards.module.css";
import { Link } from "react-router";

import { Button } from "../ui/Button";
import * as Card from "../ui/Card";
import * as Dialog from "../ui/Dialog";
import { useCopyToClipboard } from "@uidotdev/usehooks";

export function ActionCards() {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const pixKey = "abrigodowlad@gmail.com";

  return (
    <section className={`${styles.cardsContainer}`}>
      {/* adoption */}
      <Card.Card>
        <Card.CardHeader>
          <Card.CardIcon>
            <Lucide.Heart size={48} strokeWidth={1.5} />
          </Card.CardIcon>
          <Card.CardTitle>Adoção Responsável</Card.CardTitle>
        </Card.CardHeader>
        <Card.CardContent>
          <p>
            Nossos animais são entregues <strong>castrados e vacinados</strong>.
            Adotar é um compromisso de amor para a vida toda.
          </p>
        </Card.CardContent>
        <Card.CardFooter>
          <Link to="/adotar" className="btn-text">
            <Button size="md" variant="text">
              Conheça Nossos Cães <Lucide.ArrowRight size={20} />
            </Button>
          </Link>
        </Card.CardFooter>
      </Card.Card>

      {/* donations */}
      <Card.Card>
        <Card.CardHeader>
          <Card.CardIcon>
            <Lucide.QrCode size={48} strokeWidth={1.5} />
          </Card.CardIcon>
          <Card.CardTitle>Faça uma Doação</Card.CardTitle>
        </Card.CardHeader>
        <Card.CardContent>
          <p>
            Mantemos o abrigo <strong>100% com doações</strong>. Sua ajuda
            garante ração e remédios.
          </p>
        </Card.CardContent>
        <Card.CardFooter>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            <Button
              onClick={() => copyToClipboard(pixKey)}
              size="sm"
              className={copiedText ? styles.copied : ""}
              title="Clique para copiar a chave PIX"
            >
              {copiedText ? (
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

            <Dialog.Dialog>
              <Dialog.DialogTrigger asChild>
                <Button size="sm" variant="secondary">
                  <Lucide.QrCode size={20} />
                  <span>Exibir Código QR</span>
                </Button>
              </Dialog.DialogTrigger>
              <Dialog.DialogContent>
                <Dialog.DialogTitle>CÓDIGO QR</Dialog.DialogTitle>
                <Dialog.DialogDescription>
                  No seu banco, escaneie para fazer a doação via PIX.
                </Dialog.DialogDescription>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {/* QR code bancário de doação */}
                  <img className={styles.qrCodeImg} src="" alt="" />
                </div>
              </Dialog.DialogContent>
            </Dialog.Dialog>

            <span style={{ fontSize: "12px", opacity: "0.8" }}>
              Doações via <strong>PIX</strong>
            </span>
          </div>
        </Card.CardFooter>
      </Card.Card>

      {/* Tampinhas */}
      <Card.Card>
        <Card.CardHeader>
          <Card.CardIcon>
            <Lucide.Recycle size={48} strokeWidth={1.5} />
          </Card.CardIcon>
          <Card.CardTitle>Projeto Tampinhas</Card.CardTitle>
        </Card.CardHeader>
        <Card.CardContent>
          <p>
            <strong>Não jogue fora!</strong> Suas tampinhas de plástico
            financiam a ração e os medicamentos dos nossos resgatados.
          </p>
        </Card.CardContent>
        <Card.CardFooter>
          <Link to="/tampinhas" className="btn-text">
            <Button size="md" variant="text">
              Ver Pontos de Coleta <Lucide.ArrowRight size={20} />
            </Button>
          </Link>
        </Card.CardFooter>
      </Card.Card>
    </section>
  );
}
