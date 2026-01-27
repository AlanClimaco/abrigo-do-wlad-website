import { useState, useEffect } from "react";
import * as Lucide from "lucide-react";
import { type Dog, CORES_MAP } from "../../types/dogs";
import styles from "./DogModal.module.css";
import { Button } from "../ui/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/Dialog";
import { Badge } from "../ui/Badge";
import { TextLink } from "../common/Link";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Link } from "react-router";

interface ModalProps {
  dog: Dog | null;
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

  const photos = dog.fotos || [];
  const hasMultipleImages = photos.length > 1;

  const nextImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => (prev + 1) % photos.length);
  };

  const prevImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className={styles.modalContent}>
        <div
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: 0,
          }}
        >
          <DialogTitle>{dog.nome}</DialogTitle>
          <DialogDescription>
            Detalhes do cachorro {dog.nome}, {dog.idade}, {dog.sexo}.
          </DialogDescription>
        </div>

        <div className={styles.contentGrid}>
          {/* --- CARROSSEL DE IMAGENS --- */}
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
                  <div className={styles.carouselNavButtons}>
                    <Button variant="outline" size="icon" onClick={prevImage}>
                      <Lucide.ChevronLeft size={24} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextImage}>
                      <Lucide.ChevronRight size={24} />
                    </Button>
                  </div>

                  <div className={styles.carouselNavDots}>
                    {dog.fotos.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.dot} ${
                          currentImageIndex === index ? styles.dotActive : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Ir para imagem ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* --- DETALHES DO DOG --- */}
          <div className={styles.details}>
            <div>
              <Badge>{CORES_MAP[dog.cor] || dog.cor}</Badge>
            </div>

            <h2 className={styles.title}>{dog.nome}</h2>

            <div className={styles.badges}>
              <Badge
                className={styles.badgeContent}
                variant="secondary"
                leftIcon={<Lucide.Calendar size={14} />}
              >
                {dog.idade}
              </Badge>

              <Badge
                className={styles.badgeContent}
                variant="secondary"
                leftIcon={
                  dog.sexo === "Macho" ? (
                    <Lucide.Mars size={14} />
                  ) : (
                    <Lucide.Venus size={14} />
                  )
                }
              >
                {dog.sexo}
              </Badge>

              <Badge
                className={styles.badgeContent}
                variant="secondary"
                leftIcon={<Lucide.BriefcaseMedical size={14} />}
              >
                {dog.status}
              </Badge>
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
