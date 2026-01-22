import styles from "./Hero.module.css";
import { Button } from "../ui/Button";
import * as Lucide from "lucide-react";
import { useState, useEffect } from "react";
import type { Dog } from "../../types/dogs";
import { getDogs } from "../../services/dogService";
import { Badge } from "../ui/Badge";
import { Skeleton } from "../ui/Skeleton";
import { getOptimizedImageUrl, getThumbnaillUrl } from "../../utils/cdn";
import { getRandomDog } from "../../utils/getDog";
import { Link } from "react-router";

export function Hero() {
  const [dog, setDog] = useState<Dog | null>(null);

  useEffect(() => {
    async function fetchRandomDog() {
      try {
        const allDogs = await getDogs();
        if (allDogs.length > 0) {
          setDog(getRandomDog(allDogs));
        }
      } catch (error) {
        console.error("Erro ao carregar dog do Hero:", error);
      }
    }
    fetchRandomDog();
  }, []);

  const mainImage = dog?.fotos?.[0] ?? null;
  const secondaryImage = dog?.fotos?.[1] ?? null;

  const heroImageUrl = mainImage
    ? getOptimizedImageUrl(mainImage, {
        crop: "fill",
        gravity: "auto",
        width: 600,
        height: 500,
      })
    : "";

  const thumbnailImageUrl = secondaryImage
    ? getThumbnaillUrl(secondaryImage, 128, 200)
    : "";

  return (
    <section className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          Transformando abandono em finais felizes.
        </h1>

        <p className={styles.description}>
          O <strong>Abrigo do Wlad</strong> é refúgio, cura e esperança para
          centenas de cães que só conheciam a dor. Adote, doe, faça parte.
        </p>

        <div className={styles.btnGroup}>
          <Link to="/adotar" className="btn-primary">
            <Button size="lg">Conheça Nossos Cães</Button>
          </Link>

          <a href="#historia" className="btn-secondary">
            <Button size="lg" variant="text">
              Nossa História
              <Lucide.ChevronRight size={25} />
            </Button>
          </a>
        </div>
      </div>

      {/* image */}
      <div className={styles.heroOverlay}>
        {heroImageUrl ? (
          <img
            className={styles.heroImage}
            src={heroImageUrl}
            alt={dog ? `Foto de ${dog.nome}` : "Cachorro para adoção"}
          />
        ) : (
          <Skeleton className={styles.heroImage} />
        )}

        {mainImage && secondaryImage && thumbnailImageUrl && (
          <img
            className={styles.heroThumbnail}
            src={thumbnailImageUrl}
            alt={dog ? `Foto de ${dog.nome}` : "Cachorro para adoção"}
          />
        )}
        {dog && dog.nome && (
          <Badge
            variant="primary"
            size="sm"
            leftIcon={<Lucide.Dog size={16} />}
            style={{
              position: "absolute",
              bottom: "-0.5rem",
              right: "-0.5rem",
              zIndex: 10,
              pointerEvents: "none",
              border: "3px solid var(--bg-body)",
            }}
          >
            {dog.nome}
          </Badge>
        )}
      </div>
    </section>
  );
}