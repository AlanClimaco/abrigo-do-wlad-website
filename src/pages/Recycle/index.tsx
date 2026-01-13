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
import { ScrollArea } from "../../components/ui/ScrollArea";
import * as Lucide from "lucide-react";
import styles from "./Recycle.module.css";

const collectionPoints = [
  {
    zone: "ZONA SUL",
    locations: [
      {
        neighborhood: "Campo Belo",
        name: "PetShop Latmia",
        address: "Rua Antônio de Macedo Soares, 1350",
      },
      {
        neighborhood: "Moema",
        name: "29º Tabelionado",
        address: "Av. Açocê, 308",
      },
      {
        neighborhood: "Brooklin",
        address: "Av. Portugal, 1351 (Seg a Sex das 8h às 20h)",
      },
      {
        neighborhood: "Morumbi",
        name: "Crazy for Pet",
        address: "Rua Dr Fonseca Brasil, 320",
      },
      {
        neighborhood: "Morumbi",
        name: "Au Life",
        address: "R Nelson da Gama de Oliveira, 918",
      },
      {
        neighborhood: "Vila Mascote",
        name: "PetShop Puppies & Cia",
        address: "Av. Damaceno Vieira, 823",
      },
      {
        neighborhood: "Planalto Paulista",
        name: "Padaria Pães e Doces Sol",
        address: "Al dos Guainumbis, 50",
      },
      {
        neighborhood: "Ipiranga",
        name: "MV Pet",
        address: "Rua Antônio Marcondes, 211",
      },
    ],
  },
  {
    zone: "ZONA OESTE",
    locations: [
      {
        neighborhood: "Butantã",
        address: "Av. Nossa Senhora da Assunção, 317",
      },
      {
        neighborhood: "Vila Sônia",
        name: "Silvano Festas",
        address: "Av Guilherme Dummont Vilares, 888 (Seg a Sáb 8h-17h)",
      },
      {
        neighborhood: "Jardim Bonfiglioli",
        name: "Associação Brasil Tupinambá",
        address: "Av. Comendador Alberto Bonfiglioli, 726",
      },
      {
        neighborhood: "Vila Madalena",
        name: "AnimAU Station",
        address: "Rua Mourato Coelho, 1326",
      },
    ],
  },
];

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
              <ScrollArea style={{ backgroundColor: "#ff6b3527", height: "300px", padding: "10px" }}>
                {collectionPoints.map((point) => (
                  <div key={point.zone} className={styles.collectionContainer}>
                    <h4>{point.zone}</h4>
                    {point.locations.map((location, index, locationsArray) => {
                      const showNeighborhood =
                        index === 0 ||
                        location.neighborhood !==
                          locationsArray[index - 1].neighborhood;

                      return (
                        <div key={index}>
                          {showNeighborhood && <h5>{location.neighborhood}</h5>}
                          {location.name && (
                            <p>
                              <strong>{location.name}</strong>
                            </p>
                          )}
                          <p>{location.address}</p>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </ScrollArea>
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
