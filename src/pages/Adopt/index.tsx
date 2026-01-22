import * as React from "react";
import * as Lucide from "lucide-react";
import * as SelectComponent from "../../components/ui/Select";
import { DogCard } from "../../components/DogCard";
import HeroSmall from "../../components/HeroSmall";
import { DogModal } from "../../components/DogModal";
import styles from "./Adopt.module.css";

import { CORES_MAP, TAGS_MAP, type Dog } from "../../types/dogs";
import type { DocumentData } from "firebase/firestore";

import { getDogsWithFilters } from "../../services/dogService";
import { preloadDogImages } from "../../utils/getDog";
import { getOptimizedImageUrl } from "../../utils/cdn";

import { Badge } from "../../components/ui/Badge";
import { Skeleton } from "../../components/ui/Skeleton";
import { Button } from "../../components/ui/Button";

const ITEMS_PER_PAGE: number = 6;

function DogCardSkeleton() {
  return <Skeleton style={{ height: "500px", width: "100%" }} />;
}

export default function Adopt() {
  // --- ESTADOS ---
  // Dados do Firebase
  const [dogs, setDogs] = React.useState<Dog[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [totalItems, setTotalItems] = React.useState<number>(0);

  const pageDocsRef = React.useRef<{ [key: number]: DocumentData }>({});

  type AgeFilter = "all" | "filhote" | "adulto" | "idoso";
  type BehaviorFilter = "all" | keyof typeof TAGS_MAP;
  type ColorFilter = "all" | keyof typeof CORES_MAP;

  // Filtros
  const [filterAge, setFilterAge] = React.useState<AgeFilter>("all");
  const [filterBehavior, setFilterBehavior] =
    React.useState<BehaviorFilter>("all");
  const [filterColor, setFilterColor] = React.useState<ColorFilter>("all");

  // Paginação e Modal
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [selectedDog, setSelectedDog] = React.useState<Dog | null>(null);
  const [loadingDogId, setLoadingDogId] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const docForPage = pageDocsRef.current[currentPage - 1];

        const {
          dogs: newDogs,
          totalItems: newTotal,
          lastVisibleDoc: newLastVisible,
        } = await getDogsWithFilters(
          { cateIdade: filterAge, tags: filterBehavior, cor: filterColor },
          currentPage,
          ITEMS_PER_PAGE,
          docForPage,
        );

        setDogs(newDogs);
        setTotalItems(newTotal);

        // salva o último doc da página atual para a próxima
        if (newLastVisible) {
          pageDocsRef.current[currentPage] = newLastVisible;
        }
      } catch (error) {
        console.error("Erro ao carregar cachorros:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentPage, filterAge, filterBehavior, filterColor]);

  // Resetar página ao mudar filtros
  React.useEffect(() => {
    setCurrentPage(1);
    pageDocsRef.current = {};
  }, [filterAge, filterBehavior, filterColor]);

  // --- PAGINAÇÃO ---
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentDogs = dogs;

  // pré-carregamento per-page (melhora desempenho e uso de banda).
  React.useEffect(() => {
    const imagesToPreload = currentDogs
      .map((dog) => {
        const originalUrl = dog.fotos?.[0];

        return getOptimizedImageUrl(originalUrl, {
          width: 400,
          height: 600,
          quality: 75,
          crop: "fill",
          gravity: "auto",
        });
      })
      .filter((url): url is string => !!url);

    if (imagesToPreload.length > 0) {
      preloadDogImages(imagesToPreload);
    }
  }, [currentDogs]);

  // leva ao topo quando muda de página
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleDogClick = async (dog: Dog) => {
    setLoadingDogId(dog.id);

    try {
      // pré-carregamento de todas as fotos do cão
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

  // renderiza skeleton da página
  if (loading) {
    return (
      <main>
        <HeroSmall
          image="https://www.petz.com.br/blog/wp-content/uploads/2025/11/vira-lata1.jpg"
          title="Nossos Doguinhos"
          badge="Amigos Fiéis"
          description="Cada um tem uma história e uma personalidade única. Utilize os filtros abaixo para encontrar quem combina com seu estilo de vida."
        />
        <div className="container">
          <div className={styles.filterContainer}>
            <div className={styles.filterItemContainer}>
              <Skeleton style={{ height: "35px", width: "220px" }} />
              <Skeleton style={{ height: "35px", width: "220px" }} />
              <Skeleton style={{ height: "35px", width: "220px" }} />
            </div>
            <Skeleton style={{ height: "32px", width: "150px" }} />
          </div>

          <div className={styles.dogGrid}>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <DogCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <HeroSmall
        image="https://www.petz.com.br/blog/wp-content/uploads/2025/11/vira-lata1.jpg"
        title="Nossos Doguinhos"
        badge="Amigos Fiéis"
        description="Cada um tem uma história e uma personalidade única. Utilize os filtros abaixo para encontrar quem combina com seu estilo de vida."
      />

      <div className="container">
        {/* Filtros */}
        <div className={styles.filterContainer}>
          <div className={styles.filterItemContainer}>
            <SelectComponent.Select
              value={filterBehavior}
              onValueChange={(value) =>
                setFilterBehavior(value as BehaviorFilter)
              }
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
              value={filterAge}
              onValueChange={(value) => setFilterAge(value as AgeFilter)}
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
              onValueChange={(value) => setFilterColor(value as ColorFilter)}
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
          <Badge
            leftIcon={<Lucide.PawPrint size={16} />}
            variant="secondary"
            size="sm"
          >
            {totalItems} doguinhos
          </Badge>
        </div>

        {/* Grid de Resultados */}
        <div className={styles.dogGrid}>
          {currentDogs.length > 0 ? (
            currentDogs.map((dog) => (
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
