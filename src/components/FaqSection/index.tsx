import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";

import * as Lucide from "lucide-react";
import styles from "./FaqSection.module.css";
import { ExternalLink } from "../common/ExternalLink";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

import * as CardComponent from "../ui/Card";
import * as React from "react";

export function FaqSection() {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
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
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={sectionRef}>
      <div className={`${styles.titleFaq} ${isVisible ? styles.visible : ""}`}>
        <h2 className="section-title">Você pode estar se perguntando...</h2>
        <p>Algumas respostas para perguntas frequentes.</p>
      </div>
      <Accordion
        type="single"
        collapsible
        style={{ width: "100%" }}
        className={`${styles.accordionWrapper} ${isVisible ? styles.visible : ""}`}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Vocês fazem Resgate de Animais?</AccordionTrigger>
          <AccordionContent>
            <div className={styles.faqContainer}>
              <p>
                A responsabilidade pelo resgate é do{" "}
                <strong>Poder Público</strong>. O{" "}
                <strong>Abrigo do Wlad</strong>, como a maioria das ONGs, está
                lotado e sem condições de receber novos animais. Mas você pode
                ajudar: leve o animal ao veterinário, vacine, vermifugue, castre
                (ou busque castração social), tire boas fotos, divulgue para
                adoção em redes sociais e eventos da região, e crie vakinhas ou
                rifas para cobrir os custos — assim você dá ao animal a mesma
                chance que damos aos nossos resgatados!
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Posso Visitar o Abrigo?</AccordionTrigger>
          <AccordionContent>
            <div className={styles.faqContainer}>
              <p>Sim! As visitas devem ser agendadas com antecedência.</p>

              <CardComponent.Card size="sm" color="secondary">
                <CardComponent.CardBody>
                  <CardComponent.CardHeader>
                    <CardComponent.CardIcon>
                      <Lucide.Calendar />
                    </CardComponent.CardIcon>
                    <CardComponent.CardTitle>
                      Agendar Visita
                    </CardComponent.CardTitle>
                  </CardComponent.CardHeader>
                  <CardComponent.CardContent>
                    <div
                      style={{
                        marginTop: "-0.5rem",
                        marginBottom: "1rem",
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <Badge variant="outline">
                        Segunda à Sábado (exceto feriados)
                      </Badge>
                      <Badge variant="outline">14h às 17h</Badge>
                    </div>
                    <p>
                      As visitas são abertas para{" "}
                      <strong>conhecer o espaço</strong> e{" "}
                      <strong>trazer doações</strong>. Para adoção, é necessário{" "}
                      <ExternalLink href={"/formulario"}>
                        preencher o questionário
                      </ExternalLink>{" "}
                      previamente; o agendamento será feito apenas se o perfil
                      do candidato for compatível com o do cãozinho.
                    </p>
                  </CardComponent.CardContent>
                </CardComponent.CardBody>
                <CardComponent.CardFooter>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <ExternalLink href="mailto:abrigodowlad@gmail.com">
                      <Button
                        size="sm"
                        variant="secondary"
                        leftIcon={<Lucide.Mail size={18} />}
                      >
                        E-mail
                      </Button>
                    </ExternalLink>
                    <ExternalLink href="https://www.instagram.com/abrigodowlad/">
                      <Button
                        size="sm"
                        variant="secondary"
                        leftIcon={<Lucide.Instagram size={18} />}
                      >
                        Instagram
                      </Button>
                    </ExternalLink>
                  </div>
                </CardComponent.CardFooter>
              </CardComponent.Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            Como funciona o processo de adoção?
          </AccordionTrigger>
          <AccordionContent>
            <div className={styles.faqContainer}>
              <p>
                Buscamos o cãozinho que combina com sua rotina e família, não
                apenas pelo visual — isso evita frustrações e devoluções. O
                processo começa com um <strong>questionário</strong> (avaliamos
                perfil, experiência e disponibilidade), seguido de{" "}
                <strong>entrevista via WhatsApp</strong> e, por fim,{" "}
                <strong>visita presencial</strong> ao abrigo para conhecer o
                animal.
              </p>

              <p>
                <strong>Importante:</strong> Há taxa de adoção. Não reservamos
                animais nem fazemos adoção por terceiros. Resposta em até 3 dias
                úteis.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
