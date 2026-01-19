import { useState, useEffect } from "react";
import { Filter, Frown, ChevronLeft, ChevronRight } from "lucide-react";
import { DogCard } from "../../components/DogCard";
import HeroSmall from "../../components/HeroSmall";
import { DogModal } from "../../components/DogModal";
import styles from "./Adopt.module.css";

import { DOGS_DATA, CORES_MAP, type DogProps } from "../../data/dogs";

const ITEMS_PER_PAGE = 9;

export default function Adopt() {
  const [filterAge, setFilterAge] = useState("all");
  const [filterBehavior, setFilterBehavior] = useState("all");
  const [filterColor, setFilterColor] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDog, setSelectedDog] = useState<DogProps | null>(null);

  // Filtragem
  const filteredDogs = DOGS_DATA.filter((dog) => {
    const matchAge = filterAge === "all" || dog.cateIdade === filterAge;
    const matchBehavior =
      filterBehavior === "all" || dog.tags.includes(filterBehavior);
    const matchColor = filterColor === "all" || dog.cor === filterColor;

    return matchAge && matchBehavior && matchColor;
  });

  // Resetar página ao mudar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filterAge, filterBehavior, filterColor]);

  // Lógica de Paginação
  const totalItems = filteredDogs.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDogs = filteredDogs.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
            <Filter size={20} />
            <strong>Filtrar Busca</strong>
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
          {currentDogs.length > 0 ? (
            currentDogs.map((dog) => (
              <DogCard
                key={dog.id}
                data={dog}
                onClick={() => setSelectedDog(dog)}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <Frown size={48} />
              <p>Nenhum doguinho encontrado com essas características no momento.</p>
            </div>
          )}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              <ChevronLeft size={20} />
            </button>
            
            <span className={styles.pageInfo}>
              Página {currentPage} de {totalPages}
            </span>

            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

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