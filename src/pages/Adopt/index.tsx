import * as React from "react";
import * as Lucide from "lucide-react";
import * as SelectComponent from "../../components/ui/Select";
import { DogCard } from "../../components/DogCard";
import HeroSmall from "../../components/HeroSmall";
import { DogModal } from "../../components/DogModal";
import styles from "./Adopt.module.css";

import { DOGS_DATA, CORES_MAP, type DogProps } from "../../data/dogs";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

const ITEMS_PER_PAGE = 9;

export default function Adopt() {
  const [filterAge, setFilterAge] = React.useState("all");
  const [filterBehavior, setFilterBehavior] = React.useState("all");
  const [filterColor, setFilterColor] = React.useState("all");

  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedDog, setSelectedDog] = React.useState<DogProps | null>(null);

  // Filtragem
  const filteredDogs = DOGS_DATA.filter((dog) => {
    const matchAge = filterAge === "all" || dog.cateIdade === filterAge;
    const matchBehavior =
      filterBehavior === "all" || dog.tags.includes(filterBehavior);
    const matchColor = filterColor === "all" || dog.cor === filterColor;

    return matchAge && matchBehavior && matchColor;
  });

  // Resetar página ao mudar filtros
  React.useEffect(() => {
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
        <div className={styles.filterContainer}>
          <div className={styles.filterItemContainer}>
            <SelectComponent.Select
              value={filterBehavior}
              onValueChange={setFilterBehavior}
            >
              <SelectComponent.SelectTrigger className={styles.selectTrigger}>
                <SelectComponent.SelectValue placeholder="Qualquer Temperamento" />
              </SelectComponent.SelectTrigger>
              <SelectComponent.SelectContent>
                <SelectComponent.SelectItem value="all">
                  Qualquer Temperamento
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="Tranquilo">
                  Tranquilo / Calmo
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="Ativo">
                  Ativo / Energético
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="Dócil">
                  Dócil / Amoroso
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="Sociável">
                  Sociável
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="Resiliente">
                  Guerreiro / Resiliente
                </SelectComponent.SelectItem>
              </SelectComponent.SelectContent>
            </SelectComponent.Select>

            <SelectComponent.Select
              value={filterAge}
              onValueChange={setFilterAge}
            >
              <SelectComponent.SelectTrigger className={styles.selectTrigger}>
                <SelectComponent.SelectValue placeholder="Todas as Idades" />
              </SelectComponent.SelectTrigger>
              <SelectComponent.SelectContent>
                <SelectComponent.SelectItem value="all">
                  Todas as Idades
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="filhote">
                  Filhote (até 1 ano)
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="adulto">
                  Adulto (2 a 7 anos)
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="idoso">
                  Idoso (+8 anos)
                </SelectComponent.SelectItem>
              </SelectComponent.SelectContent>
            </SelectComponent.Select>

            <SelectComponent.Select
              value={filterColor}
              onValueChange={setFilterColor}
            >
              <SelectComponent.SelectTrigger className={styles.selectTrigger}>
                <SelectComponent.SelectValue placeholder="Todas as Cores" />
              </SelectComponent.SelectTrigger>
              <SelectComponent.SelectContent>
                <SelectComponent.SelectItem value="all">
                  Todas as Cores
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="caramelo">
                  Caramelo (Patrimônio Nacional)
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="pretinho">
                  Pretinho (Nada Básico)
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="fiapoManga">
                  Fiapo de Manga (Arrepiados)
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="peludinhos">
                  Peludinhos
                </SelectComponent.SelectItem>
                <SelectComponent.SelectItem value="BrasilEgito">
                  Mistura do Brasil com Egito
                </SelectComponent.SelectItem>
              </SelectComponent.SelectContent>
            </SelectComponent.Select>
          </div>
          <Badge
            leftIcon={<Lucide.PawPrint size={16} />}
            variant="secondary"
            size="sm"
          >
            {totalItems}+ doguinhos
          </Badge>
        </div>

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
              <Lucide.Frown size={48} />
              <p>
                Nenhum doguinho encontrado com essas características no momento.
              </p>
            </div>
          )}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <Button
              size="icon"
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Lucide.ChevronLeft size={20} />
            </Button>

            <span className={styles.pageInfo}>
              Página {currentPage} de {totalPages}
            </span>

            <Button
              size="icon"
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Lucide.ChevronRight size={20} />
            </Button>
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
