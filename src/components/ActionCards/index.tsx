import * as Lucide from "lucide-react";
import styles from "./ActionCards.module.css";
import { Link } from "react-router";

import * as Card from "../ui/Card";
import * as Dialog from "../ui/Dialog";
import PixModal from "../PixModal";

export function ActionCards() {

  return (
    <section className={`${styles.cardsContainer}`}>
      {/* adoption */}
      <Card.Card color="red">
        <Card.CardBody>
          <Card.CardHeader>
            <Card.CardIcon>
              <Lucide.Heart size={38} strokeWidth={1.5} />
            </Card.CardIcon>
            <Card.CardTitle>Adoção Responsável</Card.CardTitle>
          </Card.CardHeader>
          <Card.CardContent>
            <p>
              Nossos animais são entregues{" "}
              <strong>castrados e vacinados</strong>. Adotar é um compromisso de
              amor para a vida toda.
            </p>
          </Card.CardContent>
        </Card.CardBody>
        <Card.CardFooter>
          <Link to="/adotar">
            <Card.CardButton>
              Conheça Nossos Cães <Lucide.ChevronRight size={20} />
            </Card.CardButton>
          </Link>
        </Card.CardFooter>
      </Card.Card>

      {/* donations & pix modal */}
      <Card.Card>
        <Card.CardBody>
          <Card.CardHeader>
            <Card.CardIcon>
              <Lucide.QrCode size={38} strokeWidth={1.5} />
            </Card.CardIcon>
            <Card.CardTitle>Faça uma Doação</Card.CardTitle>
          </Card.CardHeader>
          <Card.CardContent>
            <p>
              Mantemos o abrigo <strong>100% com doações</strong>. Sua ajuda
              garante ração e remédios.
            </p>
          </Card.CardContent>
        </Card.CardBody>
        <Card.CardFooter>
          <Dialog.Dialog>
            <Dialog.DialogTrigger asChild>
              <Card.CardButton>
                Doação via PIX
                <Lucide.ChevronUp size={20} />
              </Card.CardButton>
            </Dialog.DialogTrigger>
            <PixModal />
          </Dialog.Dialog>
        </Card.CardFooter>
      </Card.Card>

      {/* tampinhas */}
      <Card.Card color="green">
        <Card.CardBody>
          <Card.CardHeader>
            <Card.CardIcon>
              <Lucide.Recycle size={38} strokeWidth={1.5} />
            </Card.CardIcon>
            <Card.CardTitle>Projeto Tampinhas</Card.CardTitle>
          </Card.CardHeader>
          <Card.CardContent>
            <p>
              <strong>Não jogue fora!</strong> Suas tampinhas de plástico
              financiam a ração e os medicamentos dos nossos resgatados.
            </p>
          </Card.CardContent>
        </Card.CardBody>
        <Card.CardFooter>
          <Link to="/tampinhas">
            <Card.CardButton>
              Ver Pontos de Coleta <Lucide.ChevronRight size={20} />
            </Card.CardButton>
          </Link>
        </Card.CardFooter>
      </Card.Card>
    </section>
  );
}
