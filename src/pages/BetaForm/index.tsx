import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, Instagram, Mail, TestTube2 } from "lucide-react";

import HeroSmall from "@/components/HeroSmall";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { getThirdPartyImage } from "@/utils/common";
import { WizardForm } from "./components/WizardForm";
import { ExternalLink } from "@/components/common/ExternalLink";

import styles from "./Form.module.css";

const FALLBACK_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSdA_l2KNzT5NflkGgCCOik0wCoCxlVuLRsEStacvWDaV4_hMA/viewform";

export default function BetaForm() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [successId, setSuccessId] = useState<string>("");
  const heroImage = getThirdPartyImage("form")?.url;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <Dialog
        open={showSuccessDialog}
        onOpenChange={(open) => {
          if (!open) navigate("/");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <CheckCircle size={25} color="var(--success)" />
              Formulário Enviado com Sucesso!
            </DialogTitle>
            <DialogDescription>
              {successId && (
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.8em",
                  }}
                >
                  ID da sua candidatura: {successId}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className={styles.modalContent}>
            <p>
              A equipe de voluntários do Abrigo do Wlad vai analisar seu perfil
              com carinho. Entraremos em contato caso o perfil seja compatível.
            </p>
          </div>
          <DialogFooter>
            <div>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                Em caso de dúvidas
              </span>
              <p>Estamos disponíveis em</p>
            </div>
            <div
              style={{ display: "flex", gap: "0.8rem" }}
              className={styles.modalContact}
            >
              <ExternalLink href="https://www.instagram.com/abrigodowlad/">
                <Button
                  size="md"
                  variant="secondary"
                  leftIcon={<Instagram size={16} />}
                >
                  Instagram
                </Button>
              </ExternalLink>
              <ExternalLink href="mailto:abrigodowlad@gmail.com">
                <Button
                  size="md"
                  variant="secondary"
                  leftIcon={<Mail size={16} />}
                >
                  E-mail
                </Button>
              </ExternalLink>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <HeroSmall
        image={heroImage as string}
        badge="Questionário"
        title="Intenção de Adoção"
        description="Por favor, responda com sinceridade. Adoção é um ato de amor e responsabilidade."
      />
      <div className="container">
        <WizardForm
          onSubmitSuccess={(applicationId) => {
            setSuccessId(applicationId);
            setShowSuccessDialog(true);
          }}
        />
      </div>
      <div className={styles.betaDisclaimer}>
        <div>
          <Badge variant="outline" size="sm" leftIcon={<TestTube2 />}>
            Funcionalidade em Beta
          </Badge>
        </div>
        <p>
          Em caso de falha, utilize{" "}
          <ExternalLink href={FALLBACK_FORM}>este formulário</ExternalLink>
        </p>
      </div>
    </main>
  );
}
