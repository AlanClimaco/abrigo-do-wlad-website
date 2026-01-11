import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardIcon,
  CardTitle,
} from "../../components/ui/Card";
import HeroSmall from "../../components/HeroSmall";
import { Button } from "../../components/ui/Button";
import * as Lucide from "lucide-react";
import styles from "./Recycle.module.css";

export default function Recycle() {
  return (
    <>
      <HeroSmall
        image="https://images.unsplash.com/photo-1642631171488-23d631eba638?auto=format&fit=crop&w=1920&q=80"
        badgeText="Reciclagem Solidária"
        title="Sua tampinha vale vidas"
        description="Transformamos plástico em ração e medicamentos. Descubra como um gesto simples pode salvar nossos animais."
      />
      <section className="container">
        <div className={styles.recycleContainer}>
          <div className={styles.recycleTextContainer}>
            <h2 className="section-title">O que doar?</h2>
            <p>
              Aceitamos qualquer tampinha de{" "}
              <strong>plástico duro e lacres de alumínio</strong>. O material é
              vendido para reciclagem e 100% do valor é revertido para o abrigo.
            </p>

            <ul className={styles.checklist}>
              <li>
                <Lucide.CheckCircle className={styles.checklistIcon} />
                <span>Tampas de garrafa PET (água/refri)</span>
              </li>
              <li>
                <Lucide.CheckCircle className={styles.checklistIcon} />
                <span>Tampas de Shampoo, Detergente, Amaciante</span>
              </li>
              <li>
                <Lucide.CheckCircle className={styles.checklistIcon} />
                <span>Tampas de Caneta, Creme, Maionese</span>
              </li>
              <li>
                <Lucide.CheckCircle className={styles.checklistIcon} />
                <span>Lacres de Latinha de Alumínio</span>
              </li>
            </ul>

            <Card
              style={{ marginTop: "25px" }}
              color="primary"
              size="sm"
              variant="quote"
            >
              <CardHeader>
                <CardIcon>
                  <Lucide.CircleAlert />
                </CardIcon>
                <CardTitle>Dica Importante</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Por favor, se possível, entregue as tampinhas lavadas e
                  separadas por cor. Isso agiliza muito nosso trabalho!
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardIcon>
                <Lucide.MapPin size={48} />
              </CardIcon>
              <CardTitle>Pontos de Coleta</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Encontre o local mais próximo de você:</p>
            </CardContent>
            <CardFooter style={{ textAlign: "center" }}>
              <Button size="lg">
                <span>Combinar Entrega Grande</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
