import {
  Card,
  CardContent,
  CardHeader,
  CardIcon,
  CardTitle,
} from "../../components/ui/Card";
import * as Lucide from "lucide-react";
import HeroSmall from "../../components/HeroSmall";
import styles from "./History.module.css";

export default function History() {
  return (
    <>
      <HeroSmall
        image="/images/hero-dog.jpg"
        badgeText="Nossa Trajetória"
        title="Uma história de amor e renúncia"
        description="Conheça os passos que transformaram um quintal em um refúgio de esperança."
      />
      <div className="container">
        <div
          className={styles.historyContainer}
          style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start" }}
        >
          <div className={styles.historyText}>
            <h2 className="section-title">Como tudo começou</h2>
            <p>
              Há mais de 12 anos, Wladimir Cruz deixou emprego fixo e bem
              remunerado para seguir os passos de seu pai que era uma pessoa que
              ajudava a todos e principalmente os animais. Não podia ver um
              cãozinho perdido que já trazia para casa.
            </p>
            <p>
              Com o tempo o Sr. Bene, pai do Wladimir, começou a ajudar outros
              protetores de animais abrindo um espaço da sua casa para dar lar
              temporário para os cães resgatados. Recebia uns trocados como
              agradecimento. Seu filho, também amante da causa animal, começou a
              resgatar e logo o amplo quintal passou a ser o lar temporário para
              muitos cães abandonados e ai surgiu o Abrigo do Wlad.
            </p>

            <h3>O Espaço</h3>
            <p>
              Apesar do Wladimir iniciar a prestação de serviços de lar
              temporário de forma mais consistente, os recursos sempre foram
              escassos porque os gastos com um animalzinho não se atém a ração e
              água. Empregados, luz, água, medicação, manutenção, veterinário,
              internações e outras despesas consomem o valor mensal que se
              recebe pelo serviço prestado. Além de que os cães resgatados pelo
              próprio Wladimir são custeados integralmente por ele.
            </p>

            <p>
              No entanto, são 12 anos que se passaram sem uma reforma no abrigo
              e hoje o espaço está bem deteriorado e já não atende a necessidade
              de conforto para os animais, muitos viverão para sempre lá dentro.
            </p>

            <p>
              Com a ajuda de amigos e alguns projetos implantados, em 2020
              iniciou-se uma obra no terreno ao lado do abrigo para construir os
              espaços de idosos especiais, quarentena e medicação. Em 2021
              iniciamos as obras da parte antiga que está bem deteriorada. Pisos
              com buracos, infiltrações nas paredes e pisos, adequação dos
              espaços para melhorar a distribuição dos cães, novos portões de
              segurança, telas e telhado novo.
            </p>

            <Card variant="quote">
              <CardHeader>
                <CardIcon>
                  <Lucide.Coins size={30} strokeWidth={1.5} />
                </CardIcon>
                <CardTitle>Captação de Recursos</CardTitle>
              </CardHeader>
              <CardContent>
                <p style={{ textAlign: "justify" }}>
                  Um dos projetos implantado para arrecadação de recursos para
                  financiar a obra foi a reciclagem de tampinhas plásticas.
                  Consiste na coleta de tampas plásticas ou qualquer material
                  que seja de polipropileno que é vendido para empresas que
                  transformam esse material e revendem para a indústria de
                  brinquedos, eletrodomésticos, automobilística e outras.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className={styles.historyImageContainer}>
            {/* img temporaria */}
            <img
              src="https://img.freepik.com/fotos-gratis/e6mmqmducags9ema81vqg4lssvin112lzmqib9g8jpg_181624-57371.jpg?semt=ais_hybrid&w=740&q=80"
              alt=""
            />

            <div className={styles.historyImageDescription}>
              <h4>12+ Anos de História</h4>
              <p>
                Centenas de vidas transformadas pelo amor e dedicação da família
                Cruz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
