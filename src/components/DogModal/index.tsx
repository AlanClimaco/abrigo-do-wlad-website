import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Instagram, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { DogProps } from '../../pages/Adopt';
import styles from './DogModal.module.css';

interface ModalProps {
    dog: DogProps | null;
    isOpen: boolean;
    onClose: () => void;
}

export function DogModal({ dog, isOpen, onClose }: ModalProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Trava o scroll da página de trás
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    // Reseta para a primeira foto quando abre
    useEffect(() => {
        if (dog) {
            setCurrentImageIndex(0);
        }
    }, [dog]);

    if (!isOpen || !dog) return null;

    const hasMultipleImages = dog.fotos && dog.fotos.length > 1;

    const nextImage = () => {
        if (!hasMultipleImages) return;
        setCurrentImageIndex((prev) => (prev + 1) % dog.fotos.length);
    };

    const prevImage = () => {
        if (!hasMultipleImages) return;
        setCurrentImageIndex((prev) => (prev - 1 + dog.fotos.length) % dog.fotos.length);
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <X size={24} />
                </button>

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
                                    <ChevronLeft size={24} color="#333" />
                                </button>
                                <button onClick={nextImage} className={styles.navButton}>
                                    <ChevronRight size={24} color="#333" />
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
                            {dog.descricaoCompleta || `O ${dog.nome} é um cãozinho incrível que está esperando por um lar. ${dog.temperamento}.`}
                        </p>

                        {dog.instaLink && (
                            <a href={dog.instaLink} target="_blank" rel="noopener noreferrer" className={styles.instaButton}>
                                <Instagram size={24} />
                                Ver vídeo no Instagram
                                <ArrowRight size={16} style={{marginLeft: 'auto'}}/>
                            </a>
                        )}

                        <Link 
                            to={`/formulario?pet=${encodeURIComponent(dog.nome)}`} 
                            className={styles.adoptButton}
                        >
                            Quero Adotar o {dog.nome}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}