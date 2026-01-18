import { useState } from "react";
import * as Lucide from "lucide-react";
import styles from "./ActionCards.module.css";
import { Link } from "react-router";

import { Button } from "../ui/Button";
import * as Card from "../ui/Card";
import * as Dialog from "../ui/Dialog";
import { useCopyToClipboard } from "@uidotdev/usehooks";

import qrCodePix from "../../assets/qr-code-example.png";

export function ActionCards() {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const pixKey = "abrigodowlad@gmail.com";

  const handleCopyClick = () => {
    copyToClipboard(pixKey);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

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

      {/* donations & pix modal */}
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
          <div>
            <Dialog.Dialog>
              <Dialog.DialogTrigger asChild>
                <Button size="sm" variant="primary">
                  <Lucide.QrCode size={20} />
                  <span>Doação via PIX</span>
                </Button>
              </Dialog.DialogTrigger>
              <Dialog.DialogContent>
                <Dialog.DialogTitle>Faça uma doação via PIX</Dialog.DialogTitle>
                <Dialog.DialogDescription>
                  Para doar, escaneie o QR Code com o app do seu banco ou copie
                  a chave PIX abaixo.
                </Dialog.DialogDescription>
                <div className={styles.pixModalContainer}>
                  {/* qr code image */}
                  <div className={styles.qrCodeWrapper}>
                    <img src={qrCodePix} alt="Código QR para doação via PIX" />
                  </div>
                  {/* clipboard pix key */}
                  <div className={styles.pixCard}>
                    <div>
                      <p>Ou copie a chave PIX</p>
                      <span>Clique para copiar</span>
                    </div>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={handleCopyClick}
                      disabled={isCopied}
                    >
                      {isCopied ? (
                        <>
                          <Lucide.Check size={20} />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Lucide.Copy size={20} />
                          {pixKey}
                        </>
                      )}
                    </Button>
                  </div>

                  {/* beneficiary data */}
                  <div>
                    <ul className={styles.beneficiaryData}>
                      <li>
                        <strong>Beneficiário:</strong> WLADMIR MARTINS DA CRUZ
                      </li>
                      <li>
                        <strong>CPF:</strong> 137.451.868-93
                      </li>
                      <li>
                        <strong>Banco:</strong> 237 - Bradesco
                      </li>
                      <li>
                        <strong>Agência:</strong> 0118
                      </li>
                      <li>
                        <strong>Conta Corrente:</strong> 0136878-8
                      </li>
                    </ul>
                  </div>
                </div>
              </Dialog.DialogContent>
            </Dialog.Dialog>
          </div>
        </Card.CardFooter>
      </Card.Card>

      {/* tampinhas */}
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
