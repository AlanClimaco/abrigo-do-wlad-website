import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Recycle, ArrowRight, QrCode, Copy, Check } from 'lucide-react';
import styles from './ActionCards.module.css';

export function ActionCards() {
    const [copied, setCopied] = useState(false);
    const pixKey = "abrigodowlad@gmail.com";

    const handleCopyPix = () => {
        navigator.clipboard.writeText(pixKey);
        setCopied(true);
        
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    return (
        <section className={`container ${styles.cardsContainer}`}>
            
            {/* Card 1: Adoção */}
            <div className={styles.card}>
                <div className={styles.cardIcon}>
                    <Heart size={48} strokeWidth={1.5} />
                </div>
                <h3>Adoção Responsável</h3>
                <p>Nossos animais são entregues castrados e vacinados. Adotar é um compromisso de amor para a vida toda.</p>
                <Link to="/adotar" className="btn-text">
                    Conheça Nossos Cães <ArrowRight size={20} />
                </Link>
            </div>

            {/* Card 2: Doações (NOVO) */}
            <div className={styles.card}>
                <div className={styles.cardIcon}>
                    <QrCode size={48} strokeWidth={1.5} />
                </div>
                <h3>Faça uma Doação</h3>
                <p>Mantemos o abrigo 100% com doações. Sua ajuda garante ração e remédios. Chave PIX<br/>(E-mail):</p>
                
                <button 
                    onClick={handleCopyPix} 
                    className={`${styles.pixButton} ${copied ? styles.copied : ''}`}
                    title="Clique para copiar a chave PIX"
                >
                    {copied ? (
                        <>
                            <Check size={20} />
                            PIX Copiado!
                        </>
                    ) : (
                        <>
                            <Copy size={20} />
                            abrigodowlad@gmail.com
                        </>
                    )}
                </button>
            </div>

            {/* Card 3: Tampinhas */}
            <div className={styles.card}>
                <div className={styles.cardIcon}>
                    <Recycle size={48} strokeWidth={1.5} />
                </div>
                <h3>Projeto Tampinhas</h3>
                <p>Não jogue fora! Suas tampinhas de plástico financiam a ração e os medicamentos dos nossos resgatados.</p>
                <Link to="/tampinhas" className="btn-text">
                    Ver Pontos de Coleta <ArrowRight size={20} />
                </Link>
            </div>
          
        </section>
    );
}