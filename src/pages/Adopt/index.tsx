import { useState } from "react";
import { Filter, Frown } from "lucide-react";
import { DogCard } from "../../components/DogCard";
import HeroSmall from "../../components/HeroSmall";
import { DogModal } from "../../components/DogModal";
import styles from "./Adopt.module.css";

const CORES_MAP: Record<string, string> = {
  caramelo: "Caramelo (Patrimônio Nacional)",
  pretinho: "Pretinho (Nada Básico)",
  fiapoManga: "Fiapo de Manga (Arrepiados)",
  peludinhos: "Peludinhos",
  BrasilEgito: "Mistura do Brasil com Egito",
};

// Definição dos Tipos
export interface DogProps {
  id: number;
  nome: string;
  idade: string;
  cateIdade: "filhote" | "adulto" | "idoso";
  temperamento: string;
  tags: string[];
  status: string;
  fotos: string[];
  cor: string;
  instaLink?: string;
  descricaoCompleta?: string;
  porte: string;
}

// Dados Mockados
const DOGS_DATA: DogProps[] = [
  {
    id: 1,
    nome: "Manu",
    idade: "1 ano e meio",
    cateIdade: "adulto",
    porte: "Médio",
    temperamento: "Dócil, Amorosa",
    tags: ["Dócil", "Amoroso"],
    status: "Vacinado e Castrado",
    fotos: ["/dogs/manu1.png", "/dogs/manu2.png", "/dogs/manu3.png"],
    cor: "caramelo",
    instaLink: "https://www.instagram.com/reels/DTS7xAmEfxb/",
    descricaoCompleta:
      "A Manu é a prova viva de que o amor cura qualquer ferida. Resgatada de um sítio em estado de pura tristeza e magreza, ela renasceu. Hoje, é uma caramela radiante, cheia de vida e que carrega uma energia boa por onde passa. Apesar de tanta beleza e docilidade, ela ainda espera pelo coração especial que vai notar o quanto ela é incrível e alegre.",
  },
  {
    id: 2,
    nome: "Teka",
    idade: "1 ano e meio",
    cateIdade: "adulto",
    porte: "Grande",
    temperamento: "Doce, Energética",
    tags: ["Dócil", "Energética"],
    status: "Vacinado e Castrado",
    fotos: ["/dogs/teka1.png", "/dogs/teka2.png", "/dogs/teka3.png"],
    cor: "caramelo",
    instaLink: "https://www.instagram.com/reels/DTTFu6PkbFb/",
    descricaoCompleta:
      "É difícil quando um cãozinho sabe o que é ter um lar e, de repente, perde tudo. A Teka tinha uma família, mas o destino levou sua tutora. Ela não é um cão que nasceu na rua; é um cão de casa que ficou órfã. Doce, querida e com uma energia contagiante, Teka vê o tempo passar no abrigo esperando alguém para preencher esse vazio e retribuir todo o amor que ela tem guardado.",
  },
  {
    id: 3,
    nome: "Flocos",
    idade: "5 - 6 anos",
    cateIdade: "adulto",
    porte: "Pequeno",
    temperamento: "Tranquilo, Amoroso",
    tags: ["Tranquilo", "Amoroso"],
    status: "Vacinado e Castrado",
    fotos: ["/dogs/flocos1.png", "/dogs/flocos2.png", "/dogs/flocos3.png"],
    cor: "BrasilEgito",
    instaLink: "https://www.instagram.com/reels/DSIUEXyEaZc/",
    descricaoCompleta:
      "Como explicar que o Flocos espera há 4 anos? Ele é simplesmente perfeito. Um lorde que adora tomar banho, receber massagem e ganha todo mundo na doçura. O maior diferencial? Ele é super sociável, convive bem com outros cães e é tão tranquilo que se dá bem até com gatos! É um doce (creme com chocolate) que só precisa de uma chance para mostrar que é o companheiro da vida toda.",
  },
  {
    id: 4,
    nome: "Romeu",
    idade: "3 - 4 anos",
    cateIdade: "adulto",
    porte: "Pequeno",
    temperamento: "Tranquilo, Dócil",
    tags: ["Tranquilo", "Dócil"],
    status: "Vacinado e Castrado",
    fotos: ["/dogs/romeu1.png", "/dogs/romeu2.png", "/dogs/romeu3.png"],
    cor: "BrasilEgito",
    instaLink: "https://www.instagram.com/reels/DTTW2DbCVJy/",
    descricaoCompleta:
      "Romeu carrega nos olhos a profundidade de quem já sofreu muito — atropelamento, fome e abandono — mas escolheu continuar amando. Ele é calmo, delicado e tem um jeito que derrete qualquer alma boa. Enquanto tantos são adotados, ele continua invisível. Romeu não pede luxo, apenas um cantinho seguro, um colo e alguém que o faça sentir que finalmente pertence a um lar de verdade.",
  },
];

export default function Adopt() {
  const [filterAge, setFilterAge] = useState("all");
  const [filterBehavior, setFilterBehavior] = useState("all");
  const [filterColor, setFilterColor] = useState("all");

  const [selectedDog, setSelectedDog] = useState<DogProps | null>(null);

  const filteredDogs = DOGS_DATA.filter((dog) => {
    const matchAge = filterAge === "all" || dog.cateIdade === filterAge;
    const matchBehavior =
      filterBehavior === "all" || dog.tags.includes(filterBehavior);
    const matchColor = filterColor === "all" || dog.cor === filterColor;

    return matchAge && matchBehavior && matchColor;
  });

  return (
    <main>
      <HeroSmall
        image="https://www.petz.com.br/blog/wp-content/uploads/2025/11/vira-lata1.jpg"
        title="Nossos Doguinhos"
        badge="Amigos Fiéis"
        description="Cada um tem uma história e uma personalidade única. Utilize os filtros abaixo para encontrar quem combina com seu estilo de vida."
      />

      <div className="container">
        {/* Barra de Filtros */}
        <section className={styles.filtersContainer}>
          <div className={styles.filterLabel}>
            <Filter size={20} color="var(--primary)" />
            <strong>Filtrar busca:</strong>
          </div>

          <select
            className={styles.selectInput}
            value={filterAge}
            onChange={(e) => setFilterAge(e.target.value)}
          >
            <option value="all">Todas as Idades</option>
            <option value="filhote">Filhote (até 1 ano)</option>
            <option value="adulto">Adulto (2 a 7 anos)</option>
            <option value="idoso">Idoso (+8 anos)</option>
          </select>

          <select
            className={styles.selectInput}
            value={filterBehavior}
            onChange={(e) => setFilterBehavior(e.target.value)}
          >
            <option value="all">Qualquer Temperamento</option>
            <option value="Tranquilo">Tranquilo / Calmo</option>
            <option value="Ativo">Ativo / Para Correr</option>
            <option value="Brincalhão">Brincalhão</option>
            <option value="Carinhoso">Carinhoso / Doce</option>
            <option value="Tímido">Tímido / Medroso</option>
          </select>

          <select
            className={styles.selectInput}
            value={filterColor}
            onChange={(e) => setFilterColor(e.target.value)}
          >
            <option value="all">Todas as Cores</option>
            <option value="caramelo">Caramelo (Patrimônio Nacional)</option>
            <option value="pretinho">Pretinho (Nada Básico)</option>
            <option value="fiapoManga">Fiapo de Manga (Arrepiados)</option>
            <option value="peludinhos">Peludinhos</option>
            <option value="BrasilEgito">Mistura do Brasil com Egito</option>
          </select>
        </section>

        {/* Grid de Resultados */}
        <div className={styles.dogGrid}>
          {filteredDogs.length > 0 ? (
            filteredDogs.map((dog) => (
              <DogCard
                key={dog.id}
                data={dog}
                onClick={() => setSelectedDog(dog)}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <Frown size={48} />
              <p>
                Nenhum doguinho encontrado com essas características no momento.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Componente Modal com TRADUÇÃO DA COR */}
      <DogModal
        dog={
          selectedDog
            ? {
                ...selectedDog,
                // Se houver uma tradução no MAP, usa ela. Senão, usa a chave original.
                cor: CORES_MAP[selectedDog.cor] || selectedDog.cor,
              }
            : null
        }
        isOpen={!!selectedDog}
        onClose={() => setSelectedDog(null)}
      />
    </main>
  );
}
