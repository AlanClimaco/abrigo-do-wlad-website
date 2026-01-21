import { useState, useEffect } from "react";
import * as Lucide from "lucide-react";
import { Link } from "react-router";
import type { DogProps } from "../../data/dogs";
import styles from "./DogModal.module.css";
import { Button } from "../ui/Button";
import { Dialog, DialogContent } from "../ui/Dialog";
import { Badge } from "../ui/Badge";
import { TextLink } from "../common/Link";
import { useMediaQuery } from "@uidotdev/usehooks";

interface ModalProps {
  dog: DogProps | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DogModal({ dog, isOpen, onClose }: ModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setCurrentImageIndex(0), 150);
      return () => clearTimeout(timer);
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

            <div className={styles.carouselButtons}>
              <div>
                <Button
                  blur={true}
                  variant="outline"
                  size="icon"
                  onClick={handleClose}
                >
                  <Lucide.X size={24} />
                </Button>
              </div>
              {hasMultipleImages && (
                <div className={styles.carouselNav}>
                  <Button variant="outline" size="icon" onClick={prevImage}>
                    <Lucide.ChevronLeft size={24} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextImage}>
                    <Lucide.ChevronRight size={24} />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className={styles.details}>
            <div>
              <Badge>{dog.cor}</Badge>
            </div>

            <h2 className={styles.title}>{dog.nome}</h2>

            <div className={styles.badges}>
              <Badge variant="secondary">{dog.idade}</Badge>
              <Badge variant="secondary">{dog.status}</Badge>
            </div>

            <p className={styles.description}>
              {dog.descricaoCompleta ||
                `O ${dog.nome} é um cãozinho incrível que está esperando por um lar. ${dog.temperamento}.`}
            </p>

            <div className={styles.footer}>
              <div className={styles.footerBtn}>
                {dog.instaLink && (
                  <TextLink href={dog.instaLink as string}>
                    <Button
                      leftIcon={<Lucide.Instagram />}
                      size={`${isDesktop ? "md" : "lg"}`}
                      variant="instagram"
                    >
                      Ver vídeo no Instagram
                    </Button>
                  </TextLink>
                )}

                <Link to={`/formulario?pet=${encodeURIComponent(dog.nome)}`}>
                  <Button
                    leftIcon={<Lucide.Heart />}
                    size={`${isDesktop ? "md" : "lg"}`}
                    variant="primary"
                  >
                    Tenho Interesse
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
