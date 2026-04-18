import * as React from "react";
import * as Lucide from "lucide-react";

import { useForm } from "@formspree/react";
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

/**
 * TODO:
 * feedback de erro
 * descartar formspree
 * guardar na db e enviar umm trigger ao email
 */

export function WizardForm() {
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);
  const [searchParams] = useSearchParams();
  const petName = searchParams.get("pet") || "";
  const isDesktop = useIsDesktop();

  const [captchaToken, setCaptchaToken] = React.useState<string>("");
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

    // montar FormData para envio
    const formDataToSend = new FormData();
    formDataToSend.append(
      "_subject",
      `Nova Entrevista de Adoção: ${formData.animal_especifico || "Geral"}`,
    );

    const fieldMapping: Record<string, string> = {
      nome_adotante: "1.1_nome_adotante",
      idade: "1.2_idade",
      estado_civil: "1.3_estado_civil",
      profissao: "1.4_profissao",
      empresa: "1.5_empresa",
      endereco: "1.6_endereco",
      telefone: "1.7_telefone",
      email: "1.8_email_contato",
      redes_sociais: "1.9_redes_sociais",
      qtd_adultos: "2.1_qtd_adultos",
      criancas: "2.2_criancas",
      renda_mensal: "2.3_renda_mensal",
      acordo: "2.4_acordo",
      alergia: "2.5_alergia",
      motivo: "3.1_motivo",
      animal_especifico: "3.2_animal_especifico",
      porte: "3.3.1_porte",
      sexo: "3.3.2_sexo",
      idade_animal: "3.3.3_idade",
      personalidade: "3.3.4_personalidade",
      atividade: "3.3.5_atividade",
      responsavel: "4.1_responsavel",
      horas_sozinho: "4.2_horas_sozinho",
      passeios: "4.3_passeios",
      tipo_moradia: "4.4_tipo_moradia",
      proprietario_permite: "4.5_proprietario",
      detalhes_moradia: "4.6_detalhes_moradia",
      moradores: "4.7_moradores",
      areas_frequentar: "4.8_areas_frequentar",
      periodos: "4.9_periodos",
      dormir: "4.10_dormir",
      acesso: "4.11_acesso",
      outros_animais: "5.1_outros_animais",
      castrados: "5.2_castrados",
      ja_teve: "5.3_ja_teve",
      destino_antigos: "5.4_destino_antigos",
      veterinario: "5.5_veterinario",
      racao: "5.6_racao",
      coleira: "6.1_coleira",
      ciencia_adaptacao: "6.2_ciencia_adaptacao",
      tempo_adaptacao: "6.3_tempo_adaptacao",
      adestrador: "6.4_adestrador",
      motivo_nao_adestrar: "6.5_motivo_nao_adestrar",
      carro: "6.6_carro",
      financeiro_vet: "6.7_financeiro_vet",
      vacinas: "6.8_vacinas",
      gasto_mensal: "6.9_gasto_mensal",
      divulgacao: "7.1_divulgacao",
      noticias: "7.2_noticias",
      visitas: "7.3_visitas",
      fotos_adocao: "7.4_fotos_adocao",
      contribuicao: "7.5_contribuicao",
      compromisso_vida: "7.6_compromisso_vida",
      gravidez: "8.1_gravidez",
      viagem: "8.2_viagem",
      mudanca_menor: "8.3_mudanca_menor",
      mudanca_longe: "8.4_mudanca_longe",
      separacao: "8.5_separacao",
      falecimento: "8.6_falecimento",
      perder: "9.1_perder",
      doenca: "9.2_doenca",
      morder: "9.3_morder",
      destruicao: "9.4_destruicao",
      xixi_errado: "9.5_xixi_errado",
      enxoval: "10.1_enxoval",
      devolucao: "10.2_devolucao",
      termo_nao_repassar: "10.3_termo_nao_repassar",
      obs: "10.4_obs",
    };

    Object.entries(formData).forEach(([key, value]) => {
      const mappedKey = fieldMapping[key] || key;
      if (value !== undefined && value !== null) {
        formDataToSend.append(mappedKey, String(value));
      }
    });

    formDataToSend.append("g-recaptcha-response", captchaToken);

    await handleSubmit(formDataToSend);
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
              disabled={state.submitting || !captchaToken}
              rightIcon={<Lucide.Send size={22} />}
            >
              {state.submitting ? "Enviando..." : "Enviar Respostas"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
