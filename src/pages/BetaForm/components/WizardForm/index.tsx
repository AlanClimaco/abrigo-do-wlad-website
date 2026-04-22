import * as React from "react";
import * as Lucide from "lucide-react";

import { useSearchParams } from "react-router";
import {
  Card,
  CardBody,
  CardContent,
  CardHeader,
  CardIcon,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

import * as Step from "./steps";
import { STEP_TITLES, useWizardForm } from "./useWizardForm";
import type { FormData } from "./schema";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { ExternalLink } from "@/components/common/ExternalLink";
import { useIsDesktop } from "@/hooks/useIsDesktop";

import styles from "./WizardForm.module.css";

interface WizardFormProps {
  onSubmitSuccess?: () => void;
}

export function WizardForm({ onSubmitSuccess }: WizardFormProps) {
  const [searchParams] = useSearchParams();
  const petName = searchParams.get("pet") || "";
  const isDesktop = useIsDesktop();

  const [captchaToken, setCaptchaToken] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [, setSubmitError] = React.useState<string | null>(null);
  const [showWarning, setShowWarning] = React.useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem("wizardShowWarning");
      return saved === null ? true : saved === "true";
    } catch {
      return true;
    }
  });

  React.useEffect(() => {
    try {
      sessionStorage.setItem("wizardShowWarning", String(showWarning));
    } catch { /* sem suporte a sessionStorage */ }
  }, [showWarning]);

  const {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    progress,
    formData,
    errors,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    validateCurrentStep,
  } = useWizardForm();

  const { label, icon: Icon } = STEP_TITLES[currentStep];

  // pré-preencher nome do pet
  const handleUpdateField = React.useCallback(
    (field: keyof FormData, value: string | number) => {
      updateField(field, value);
    },
    [updateField],
  );

  // Inicializar o nome do pet
  if (petName && !formData.animal_especifico) {
    updateField("animal_especifico", petName);
  }

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token || "");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) return;
    if (!captchaToken) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/create-adoption-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao enviar formulário");
      }

      const result = await response.json();

      // Sucesso - chamar callback
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      
      // Mostrar alerta com ID
      alert(`Obrigado! Sua candidatura foi recebida com ID: ${result.id}`);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erro ao enviar formulário. Tente novamente.";
      setSubmitError(message);
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepProps = {
    formData,
    errors,
    updateField: handleUpdateField,
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step.Step1DadosPessoais {...stepProps} />;
      case 1:
        return <Step.Step2Familia {...stepProps} />;
      case 2:
        return <Step.Step3Adocao {...stepProps} />;
      case 3:
        return <Step.Step4Moradia {...stepProps} />;
      case 4:
        return <Step.Step5Historico {...stepProps} />;
      case 5:
        return <Step.Step6Responsabilidades {...stepProps} />;
      case 6:
        return <Step.Step7Termos {...stepProps} />;
      case 7:
        return <Step.Step8Hipoteticas {...stepProps} />;
      case 8:
        return <Step.Step9Situacoes {...stepProps} />;
      case 9:
        return (
          <Step.Step10Finalizacao
            captchaToken={captchaToken}
            onCaptchaChange={handleCaptchaChange}
            {...stepProps}
          />
        );

      default:
        return null;
    }
  };

  if (showWarning) {
    return (
      <div className={styles.wizardContainer}>
        <Card variant="quote" size="lg">
          <CardBody>
            <CardHeader>
              <CardIcon>
                <Lucide.AlertTriangle size={35} />
              </CardIcon>
              <CardTitle>LEIA ANTES DE INICIAR</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                O preenchimento deste documento <strong>não garante</strong> a
                adoção. Caso aprovada, as respostas serão anexadas ao Termo de
                Responsabilidade.
              </p>
              <p>
                Resgatar animais não é uma profissão e não recebemos auxílio
                governamental. Todo trabalho é feito com recurso próprio. Desta
                forma, pedimos{" "}
                <strong>contribuição no valor de R$ 300,00</strong>. Esse valor
                auxilia na alimentação, tratamento e castração.
              </p>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                <strong>Requisitos e Considerações:</strong> Ter acima de 18
                anos. Necessário condições financeiras (custo médio R$
                300-400/mês). Pode levar meses para adaptar. Animais fazem
                sujeira e precisam de veterinário.{" "}
                <strong>Abandonar é crime!</strong>
              </p>
            </CardContent>
          </CardBody>
        </Card>

        <div className={styles.warningActions}>
          <Button
            size={isDesktop ? "lg" : "md"}
            onClick={() => setShowWarning(false)}
            rightIcon={<Lucide.ArrowRight size={18} />}
          >
            Li e quero prosseguir
          </Button>
        </div>

        <div className={styles.privacyDisclaimer}>
          <p>
            Ao clicar em "Li e quero prosseguir" você concorda com nossa{" "}
            <ExternalLink href="">política de privacidade</ExternalLink>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wizardContainer}>
      <div className={styles.wizardHeader}>
        {/* Step Title */}
        <div className={styles.currentStepTitle}>
          <Badge variant="secondary" size="lg" leftIcon={<Icon />}>
            {label}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressSection}>
          <div className={styles.progressInfo}>
            <span>
              Etapa {currentStep + 1} de {totalSteps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className={styles.stepIndicators}>
          {STEP_TITLES.map((step, index) => (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    key={index}
                    type="button"
                    size="icon"
                    variant={
                      currentStep === index
                        ? "secondary"
                        : index < currentStep
                          ? "success"
                          : "outline"
                    }
                    className={`${styles.stepIndicator} ${
                      index === currentStep ? styles.stepActive : ""
                    } ${index < currentStep ? styles.stepCompleted : ""}`}
                    onClick={() => goToStep(index)}
                    disabled={index > currentStep}
                  >
                    {index < currentStep ? (
                      <Lucide.Check size={18} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{step.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={onSubmit}>
        <div className={styles.stepWrapper}>{renderStep()}</div>

        {/* Error summary */}
        {Object.keys(errors).length > 0 && (
          <div className={styles.errorSummary}>
            <Lucide.AlertTriangle size={18} />
            <span>Preencha todos os campos obrigatórios antes de avançar.</span>
          </div>
        )}

        {/* Navigation */}
        <div className={styles.navigation}>
          {!isFirstStep && (
            <Button
              type="button"
              variant="secondary"
              size={isDesktop ? "lg" : "md"}
              onClick={prevStep}
              leftIcon={<Lucide.ArrowLeft size={22} />}
            >
              Anterior
            </Button>
          )}

          <div className={styles.navigationSpacer} />

          {!isLastStep ? (
            <Button
              type="button"
              size={isDesktop ? "lg" : "md"}
              onClick={nextStep}
              rightIcon={<Lucide.ArrowRight size={22} />}
            >
              Próximo
            </Button>
          ) : (
            <Button
              type="submit"
              size={isDesktop ? "lg" : "md"}
              disabled={isSubmitting || !captchaToken}
              rightIcon={<Lucide.Send size={22} />}
            >
              {isSubmitting ? "Enviando..." : "Enviar Respostas"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
