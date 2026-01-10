import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

export function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className={styles.heroVisual}>
            <div className={styles.heroOverlay}>
                <div className={`${styles.heroContent} ${isVisible ? styles.heroContentActive : ''}`}>
                    
                    <span className={styles.badge}>Desde 2012</span>
                    
                    <h1 className={styles.title}>
                        Transformando abandono em finais felizes.
                    </h1>
                    
                    <p className={styles.description}>
                        O Abrigo do Wlad é refúgio, cura e esperança para centenas de cães 
                        que só conheciam a dor. Adote, doe, faça parte.
                    </p>
                    
                    <div className={styles.btnGroup}>

                        <Link to="/adotar" className="btn-primary">
                            Ver Cães para Adoção
                        </Link>
                        
                        <a href="#historia" className="btn-secondary">
                            Nossa História
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}