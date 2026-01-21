import * as React from "react";
import * as Dialog from "../ui/Dialog";
import * as Lucide from "lucide-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";

import styles from "./PixModal.module.css";
import { Button } from "../ui/Button";

import qrCodePix from "../../assets/qr-code-example.png";

export default function PixModal() {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = React.useState(false);
  const pixKey = "abrigodowlad@gmail.com";

  const handleCopyClick = () => {
    copyToClipboard(pixKey);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Dialog.DialogContent>
      <Dialog.DialogHeader>
        <Dialog.DialogTitle>
          Faça uma doação via PIX. Qualquer valor é bem-vindo! :{")"}
        </Dialog.DialogTitle>
        <Dialog.DialogDescription>
          Para doar, escaneie o QR Code com o app do seu banco ou copie a chave
          PIX abaixo.
        </Dialog.DialogDescription>
      </Dialog.DialogHeader>
      <div className={styles.pixModalContainer}>
        {/* qr code image */}
        <div className={styles.qrCodeWrapper}>
          <img src={qrCodePix} alt="Código QR para doação via PIX" />
        </div>
        {/* clipboard pix key */}
        <div className={styles.pixCard}>
          <div>
            <p>Copiar chave PIX</p>
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
  );
}
