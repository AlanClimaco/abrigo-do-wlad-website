import { useState, useEffect } from "react";
import * as CardComponent from "@/components/ui/Card";
import HeroSmall from "@/components/HeroSmall";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/ScrollArea";

import { getThirdPartyImage } from "@/utils/common";
import * as Lucide from "lucide-react";

// Adicionamos as importações do Firebase e do Tipo
import { getRecyclePoints } from "../../services/recycleService";
import type { RecyclePoint } from "../../types/recycle";

import styles from "./Recycle.module.css";

/* ARRAY ORIGINAL APAGADO/COMENTADO 
  A gente vai construir isso dinamicamente agora!
*/

// Precisamos dessa interface para tipar como a sua tela agrupa os dados
interface GroupedPoints {
  zone: string;
  locations: RecyclePoint[];
}

export default function Recycle() {
  const heroImage = getThirdPartyImage("recycle")?.url;
  
  // Nossos novos estados
  const [collectionPoints, setCollectionPoints] = useState<GroupedPoints[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca os dados do Firebase quando a página carrega
  useEffect(() => {
    async function fetchPoints() {
      try {
        const rawPoints = await getRecyclePoints();

        // Agrupa a lista que vem reta do banco pelo campo "zone"
        const grouped = rawPoints.reduce((acc, point) => {
          const existingZone = acc.find(item => item.zone === point.zone);
          if (existingZone) {
            existingZone.locations.push(point);
          } else {
            acc.push({ zone: point.zone, locations: [point] });
          }
          return acc;
        }, [] as GroupedPoints[]);

        // Ordena as zonas em ordem alfabética
        grouped.sort((a, b) => a.zone.localeCompare(b.zone));
        
        // Ordena os bairros dentro de cada zona em ordem alfabética
        grouped.forEach(group => {
          group.locations.sort((a, b) => a.neighborhood.localeCompare(b.neighborhood));
        });

        setCollectionPoints(grouped);
      } catch (error) {
        console.error("Erro ao buscar pontos do Firebase", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPoints();
  }, []);

  return (
    <>
      <HeroSmall
        image={heroImage as string}
        badge="Reciclagem Solidária"
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

            <CardComponent.Card
              style={{ marginTop: "25px" }}
              color="primary"
              size="sm"
              variant="quote"
            >
              <CardComponent.CardBody>
                <CardComponent.CardHeader>
                  <CardComponent.CardIcon>
                    <Lucide.CircleAlert />
                  </CardComponent.CardIcon>
                  <CardComponent.CardTitle>
                    Dica Importante
                  </CardComponent.CardTitle>
                </CardComponent.CardHeader>
                <CardComponent.CardContent>
                  <p>
                    Por favor, se possível, entregue as tampinhas lavadas e
                    separadas por cor. Isso agiliza muito nosso trabalho!
                  </p>
                </CardComponent.CardContent>
              </CardComponent.CardBody>
            </CardComponent.Card>
          </div>
          <CardComponent.Card>
            <CardComponent.CardBody>
              <CardComponent.CardHeader>
                <CardComponent.CardIcon>
                  <Lucide.MapPinned size={48} />
                </CardComponent.CardIcon>
                <CardComponent.CardTitle>
                  Pontos de Coleta
                </CardComponent.CardTitle>
              </CardComponent.CardHeader>
              <CardComponent.CardContent>
                <div>
                  <p>Encontre o local mais próximo de você</p>
                </div>
                <ScrollArea style={{ height: "300px", padding: "10px" }}>
                  
                  {loading ? (
                    <p style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                      Carregando pontos...
                    </p>
                  ) : collectionPoints.length === 0 ? (
                    <p style={{ textAlign: "center", padding: "2rem", color: "#6b7280" }}>
                      Nenhum ponto de coleta cadastrado no momento.
                    </p>
                  ) : (
                    collectionPoints.map((point) => (
                      <div
                        key={point.zone}
                        className={styles.collectionContainer}
                      >
                        <h4>{point.zone}</h4>
                        {point.locations.map(
                          (location, index, locationsArray) => {
                            const showNeighborhood =
                              index === 0 ||
                              location.neighborhood !==
                                locationsArray[index - 1].neighborhood;

                            return (
                              <div key={location.id || index}>
                                {showNeighborhood && (
                                  <h5>{location.neighborhood}</h5>
                                )}
                                {location.name && (
                                  <p>
                                    <strong>{location.name}</strong>
                                  </p>
                                )}
                                <p>{location.address}</p>
                              </div>
                            );
                          },
                        )}
                      </div>
                    ))
                  )}

                </ScrollArea>
              </CardComponent.CardContent>
            </CardComponent.CardBody>
            <CardComponent.CardFooter style={{ textAlign: "center" }}>
              <Button size="lg">
                <span>Combinar Entrega Grande</span>
              </Button>
            </CardComponent.CardFooter>
          </CardComponent.Card>
        </div>
      </section>
    </>
  );
}