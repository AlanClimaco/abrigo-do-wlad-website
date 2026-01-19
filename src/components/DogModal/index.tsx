import { useState, useEffect } from "react";
import * as Lucide from "lucide-react";
import { Link } from "react-router";
import type { DogProps } from "../../data/dogs";
import styles from "./DogModal.module.css";
import { Button } from "../ui/Button";
import { Dialog, DialogContent } from "../ui/Dialog";

interface ModalProps {
  dog: DogProps | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DogModal({ dog, isOpen, onClose }: ModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // reseta o índice da img quando é fechado ou o cão muda
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setCurrentImageIndex(0), 150);
    }
  }, [isOpen]);

  if (!dog) return null;

  const hasMultipleImages = dog.fotos && dog.fotos.length > 1;

  const nextImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => (prev + 1) % dog.fotos.length);
  };

  const prevImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex(
      (prev) => (prev - 1 + dog.fotos.length) % dog.fotos.length,
    );
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className={styles.modalContent}>
        <div className={styles.contentGrid}>
          <div className={styles.carousel}>
            <img
              src={dog.fotos[currentImageIndex]}
              alt={dog.nome}
              className={styles.mainImage}
            />
            {hasMultipleImages && (
              <div className={styles.carouselNav}>
                <button onClick={prevImage} className={styles.navButton}>
                  <Lucide.ChevronLeft size={24} color="#333" />
                </button>
                <button onClick={nextImage} className={styles.navButton}>
                  <Lucide.ChevronRight size={24} color="#333" />
                </button>
              </div>
            )}
          </div>

          <div className={styles.details}>
            <span className={styles.categoryTag}>{dog.cor}</span>

            <h2>{dog.nome}</h2>

            <div className={styles.tags}>
              <span className={styles.tag}>{dog.idade}</span>
              <span className={styles.tag}>{dog.status}</span>
            </div>

            <p className={styles.description}>
              {dog.descricaoCompleta ||
                `O ${dog.nome} é um cãozinho incrível que está esperando por um lar. ${dog.temperamento}.`}
            </p>

            <div className={styles.footer}>
              <div className={styles.footerBtn}>
                {dog.instaLink && (
                  <a
                    href={dog.instaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" variant="instagram">
                      <Lucide.Instagram />
                      Ver vídeo no Instagram
                    </Button>
                  </a>
                )}
                <Link to={`/formulario?pet=${encodeURIComponent(dog.nome)}`}>
                  <Button size="lg" variant="primary">
                    Tenho Interesse em Adotar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
