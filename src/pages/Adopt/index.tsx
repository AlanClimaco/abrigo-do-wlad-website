import { useState } from "react";
import { Filter, Frown } from "lucide-react";
import { DogCard } from "../../components/DogCard";
import HeroSmall from "../../components/HeroSmall";
import { DogModal } from "../../components/DogModal";
import styles from "./Adopt.module.css";

import { DOGS_DATA, CORES_MAP, type DogProps } from "../../data/dogs";

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
            <option value="Ativo">Ativo / Energético</option>
            <option value="Dócil">Dócil / Amoroso</option>
            <option value="Sociável">Sociável</option>
            <option value="Resiliente">Guerreiro / Resiliente</option>
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