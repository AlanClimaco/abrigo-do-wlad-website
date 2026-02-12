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
import { ExternalLink } from "../common/ExternalLink";
import { useCopyToClipboard, useMediaQuery } from "@uidotdev/usehooks";
import * as CardComponent from "../ui/Card";
import { Link } from "react-router";

import { AnimatePresence, motion } from "motion/react";

interface ModalProps {
  dog: Dog | null;
  isOpen: boolean;
  onClose: () => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
  }),
};

export function DogModal({ dog, isOpen, onClose }: ModalProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setPage([0, 0]), 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!dog) return null;

  const photos = dog.fotos || [];
  const hasMultipleImages = photos.length > 1;
  const currentImageIndex =
    ((page % photos.length) + photos.length) % photos.length;

  const paginate = (newDirection: number) => {
    if (!hasMultipleImages) return;
    setPage([page + newDirection, newDirection]);
  };

  const handleClose = () => {
    onClose();
  };

  const handleCopyClick = (toCopy: string) => {
    copyToClipboard(toCopy);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
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
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={page}
                src={dog.fotos[currentImageIndex]}
                alt={dog.nome}
                className={styles.mainImage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                }}
              />
            </AnimatePresence>
            <div className={styles.carouselButtons}>
              {!isDesktop && (
                <div>
                  <Button
                    blur={true}
                    variant="outline"
                    onClick={handleClose}
                    size="icon"
                  >
                    <Lucide.X size={22} />
                  </Button>
                </div>
              )}
              {hasMultipleImages && (
                <div className={styles.carouselNavContainer}>
                  <div className={styles.carouselNav}>
                    <div className={styles.carouselNavButtons}>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => paginate(-1)}
                      >
                        <Lucide.ChevronLeft size={24} />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => paginate(1)}
                      >
                        <Lucide.ChevronRight size={24} />
                      </Button>
                    </div>
                  </div>
                  <div className={styles.carouselNavDots}>
                    {dog.fotos.map((_, index) => (
                      <button
                        key={index}
                        className={`${styles.dot} ${
                          currentImageIndex === index ? styles.dotActive : ""
                        }`}
                        onClick={() =>
                          setPage([index, index > currentImageIndex ? 1 : -1])
                        }
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
            <div className={styles.detailsHeader}>
              {isDesktop && (
                <div className={styles.closeButton}>
                  <Button variant="ghost" onClick={handleClose} size="icon">
                    <Lucide.X size={22} />
                  </Button>
                </div>
              )}
              <div>
                <Badge>{CORES_MAP[dog.cor] || dog.cor}</Badge>
              </div>

              <h2 className={styles.title}>{dog.nome}</h2>

              <p className={styles.description}>
                {dog.descricaoCompleta ||
                  `O ${dog.nome} é um cãozinho incrível que está esperando por um lar. ${dog.temperamento}.`}
              </p>

              <div className={styles.badges}>
                <Badge
                  variant="secondary"
                  leftIcon={<Lucide.Calendar size={14} />}
                >
                  {dog.idade}
                </Badge>

                <Badge
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
                  variant="secondary"
                  leftIcon={<Lucide.BriefcaseMedical size={14} />}
                >
                  {dog.status}
                </Badge>

                {dog.instaLink && (
                  <ExternalLink href={dog.instaLink as string}>
                    <Badge
                      className={styles.badgeInstagram}
                      variant="secondary"
                      leftIcon={<Lucide.Instagram size={14} />}
                      rightIcon={<Lucide.ArrowRight size={14} />}
                    >
                      Ver Vídeo
                    </Badge>
                  </ExternalLink>
                )}
              </div>
            </div>

            <div>
              <CardComponent.Card size="sm" color="secondary" variant="quote">
                <CardComponent.CardBody>
                  <CardComponent.CardHeader>
                    <CardComponent.CardIcon>
                      <Lucide.PawPrint size={22} />
                    </CardComponent.CardIcon>
                    <CardComponent.CardTitle>
                      Temperamento
                    </CardComponent.CardTitle>
                  </CardComponent.CardHeader>
                  <CardComponent.CardContent>
                    <p>
                      {dog.nome} tem um temperamento{" "}
                      <strong>{dog.temperamento?.toLowerCase()}</strong>. Para
                      uma convivência harmoniosa, é ideal que o tutor tenha um
                      estilo de vida compatível com essa energia.
                    </p>
                  </CardComponent.CardContent>
                </CardComponent.CardBody>
              </CardComponent.Card>
            </div>

            <div className={styles.footer}>
              <div className={styles.footerBtn}>
                <Button
                  disabled
                  onClick={() =>
                    handleCopyClick(
                      `${window.location.href}?dog=${encodeURIComponent(dog.nome)}`,
                    )
                  }
                  size={`${isDesktop ? "icon" : "lg"}`}
                  variant={isCopied ? "primary" : "outline"}
                >
                  <Lucide.Copy />
                  {!isDesktop ? "Compartilhar" : ""}
                </Button>
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
