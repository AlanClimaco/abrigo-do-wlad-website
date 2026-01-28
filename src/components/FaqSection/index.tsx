import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";

import * as Lucide from "lucide-react";
import styles from "./FaqSection.module.css";

export function FaqSection() {
  return (
    <section id="faq">
      <Accordion type="single" collapsible style={{ width: "100%" }}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Vocês fazem Resgate de Animais?</AccordionTrigger>
          <AccordionContent>
            <div className={styles.resgateFaq}>
              <p>
                Quem tem a responsabilidade primária pelo resgate e cuidado de
                animais abandonados no Brasil é o <strong>Poder Público</strong>
                , especificamente das prefeituras municipais. Protetores e ONGs:
                não têm obrigação legal de resgatar todos os animais
                abandonados. Embora atuem na proteção, sua capacidade é limitada
                e eles não substituem o poder público.
              </p>

              <p>
                A grande maioria — <strong>incluindo Abrigo do Wlad</strong> —
                está lotada, sem espaço físico e com dívidas constantes,
                cuidando de muitos animais já resgatados de abandono,
                maus-tratos e situações de risco. Por isso, infelizmente, não
                temos como assumir novos animais no momento.
              </p>

              <p>
                Mas isso não significa que o cãozinho ficará sem chances! Aqui
                vão algumas orientações importantes para você ajudar de forma
                responsável — exatamente como nós fazemos.
              </p>

              <div>
                <ul className={styles.resgateFaqList}>
                  <li>
                    <Lucide.Check /> Levar ao veterinário para uma avaliação
                    básica
                  </li>
                  <li>
                    <Lucide.Check />
                    Castrar (ou buscar castração social no seu município)
                  </li>
                  <li>
                    <Lucide.Check />
                    Vacinar e vermifugar
                  </li>
                  <li>
                    <Lucide.Check />
                    Tirar boas fotos e preparar um texto de adoção
                  </li>
                  <li>
                    <Lucide.Check />
                    Divulgar nas redes sociais, grupos de bairro, protetores
                    locais e conhecidos
                  </li>
                  <li>
                    <Lucide.Check />
                    Levar em eventos de adoção da região (muitos permitem
                    participação de terceiros)
                  </li>
                  <li>
                    <Lucide.Check /> Criar uma vakinha para cobrir despesas
                    básicas
                  </li>
                  <li>
                    <Lucide.Check /> Fazer rifas solidárias para ajudar nos
                    custos
                  </li>
                  <li>
                    <Lucide.Check />
                    Pedir ajuda aos amigos, familiares e vizinhos para ajudar na
                    divulgação
                  </li>
                </ul>
              </div>
              <p>
                Ao seguir esses passos, você está dando ao cãozinho a mesma
                chance que nós damos aos nossos resgatados — e faz toda a
                diferença para que ele encontre uma família amorosa.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Posso Visitar o Abrigo?</AccordionTrigger>
          <AccordionContent>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quo
            repudiandae, ut, temporibus earum quisquam reiciendis quia
            consequuntur quas voluptatibus autem quam. Saepe necessitatibus
            laborum esse officia quas minima cupiditate!
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            Como funciona o processo de adoção?
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore quo
            repudiandae, ut, temporibus earum quisquam reiciendis quia
            consequuntur quas voluptatibus autem quam. Saepe necessitatibus
            laborum esse officia quas minima cupiditate!
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
