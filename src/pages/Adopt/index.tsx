import * as React from "react";
import * as Lucide from "lucide-react";
import * as SelectComponent from "../../components/ui/Select";
import { DogCard } from "../../components/DogCard";
import HeroSmall from "../../components/HeroSmall";
import { DogModal } from "../../components/DogModal";
import styles from "./Adopt.module.css";

import {
  CORES_MAP,
  TAGS_MAP,
  type Dog,
  type DogFilters,
} from "../../types/dogs";

import { Badge } from "../../components/ui/Badge";
import { Skeleton } from "../../components/ui/Skeleton";
import { Button } from "../../components/ui/Button";
import * as TooltipComponent from "../../components/ui/Tooltip";
import { useDogSearch } from "../../hooks/useDogSearch";
import { getOptimizedImageUrl } from "../../utils/cdn";
import { preloadDogImages } from "../../utils/common";

interface DogFiltersProps {
  filters: DogFilters;
  onFilterChange: (filters: DogFilters) => void;
  totalItems: number;
}

function DogCardSkeleton() {
  return <Skeleton style={{ height: "500px", width: "100%" }} />;
}

function DogFiltersComponent({
  filters,
  onFilterChange,
  totalItems,
}: DogFiltersProps) {
  const handleFilterChange = (filterName: keyof DogFilters, value: string) => {
    onFilterChange({ ...filters, [filterName]: value });
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterItemContainer}>
        <SelectComponent.Select
          value={filters.tags}
          onValueChange={(value) => handleFilterChange("tags", value)}
        >
          <SelectComponent.SelectTrigger className={styles.selectTrigger}>
            <SelectComponent.SelectValue placeholder="Qualquer Temperamento" />
          </SelectComponent.SelectTrigger>
          <SelectComponent.SelectContent>
            <SelectComponent.SelectItem value="all">
              Qualquer Temperamento
            </SelectComponent.SelectItem>
            {Object.entries(TAGS_MAP).map(([key, label]) => (
              <SelectComponent.SelectItem key={key} value={label}>
                {label}
              </SelectComponent.SelectItem>
            ))}
          </SelectComponent.SelectContent>
        </SelectComponent.Select>

        <SelectComponent.Select
          value={filters.cateIdade}
          onValueChange={(value) => handleFilterChange("cateIdade", value)}
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
          value={filters.cor}
          onValueChange={(value) => handleFilterChange("cor", value)}
        >
          <SelectComponent.SelectTrigger className={styles.selectTrigger}>
            <SelectComponent.SelectValue placeholder="Todas as Cores" />
          </SelectComponent.SelectTrigger>
          <SelectComponent.SelectContent>
            <SelectComponent.SelectItem value="all">
              Todas as Cores
            </SelectComponent.SelectItem>
            {Object.entries(CORES_MAP).map(([key, label]) => (
              <SelectComponent.SelectItem key={key} value={key}>
                {label}
              </SelectComponent.SelectItem>
            ))}
          </SelectComponent.SelectContent>
        </SelectComponent.Select>
      </div>
      <div className={styles.filterItemContainer}>
        <Badge
          leftIcon={<Lucide.PawPrint size={16} />}
          variant="secondary"
          size="sm"
        >
          {totalItems} doguinhos
        </Badge>
        <TooltipComponent.TooltipProvider>
          <TooltipComponent.Tooltip>
            <TooltipComponent.TooltipTrigger asChild>
              <Badge
                leftIcon={<Lucide.CircleQuestionMark size={16} />}
                variant="outline"
                size="sm"
              >
                Classificação
              </Badge>
            </TooltipComponent.TooltipTrigger>
            <TooltipComponent.TooltipContent>
              <p>
                <strong>A ordem desta lista é rotativa.</strong>
              </p>
              <p>
                Essa medida ajuda a distribuir a visibilidade de forma mais
                justa entre todos os cães.
              </p>
            </TooltipComponent.TooltipContent>
          </TooltipComponent.Tooltip>
        </TooltipComponent.TooltipProvider>
      </div>
    </div>
  );
}

export default function Adopt() {
  const {
    dogs,
    loading,
    totalItems,
    currentPage,
    totalPages,
    filters,
    setFilters,
    setCurrentPage,
    ITEMS_PER_PAGE,
  } = useDogSearch();

  const [selectedDog, setSelectedDog] = React.useState<Dog | null>(null);
  const [loadingDogId, setLoadingDogId] = React.useState<string | null>(null);

  // Pré-carregamento de imagens da página atual
  React.useEffect(() => {
    const imagesToPreload = dogs
      .map((dog) =>
        getOptimizedImageUrl(dog.fotos?.[0], {
          width: 400,
          height: 600,
          quality: 75,
          crop: "fill",
          gravity: "auto",
        }),
      )
      .filter((url): url is string => !!url);

    if (imagesToPreload.length > 0) {
      preloadDogImages(imagesToPreload);
    }
  }, [dogs]);

  // Scroll para o topo da grid ao mudar de página
  React.useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, loading]);

  const handleDogClick = async (dog: Dog) => {
    setLoadingDogId(dog.id);
    try {
      if (dog.fotos && dog.fotos.length > 0) {
        await preloadDogImages(dog.fotos);
      }
      setSelectedDog(dog);
    } catch (error) {
      console.error("Erro no preload:", error);
      setSelectedDog(dog);
    } finally {
      setLoadingDogId(null);
    }
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
        <DogFiltersComponent
          filters={filters}
          onFilterChange={setFilters}
          totalItems={totalItems}
        />

        {loading ? (
          <div className={styles.dogGrid}>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <DogCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className={styles.dogGrid}>
              {dogs.length > 0 ? (
                dogs.map((dog) => (
                  <DogCard
                    key={dog.id}
                    data={dog}
                    onClick={() => handleDogClick(dog)}
                    isLoading={loadingDogId === dog.id}
                  />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <Lucide.Frown size={48} />
                  <p>
                    Nenhum doguinho encontrado com essas características no
                    momento.
                  </p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className={styles.pagination}>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
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
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <Lucide.ChevronRight size={20} />
                </Button>
              </div>
            )}
          </>
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
