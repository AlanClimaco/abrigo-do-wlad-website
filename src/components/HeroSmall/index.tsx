import styles from './HeroSmall.module.css';

interface HeroSmallProps {
    title: string;
    description: string;
    badge?: string;
    backgroundImage?: string;
}

export function HeroSmall({ 
    title, 
    description, 
    badge = "Abrigo do Wlad",
    backgroundImage 
}: HeroSmallProps) {
    
    // Se passar uma imagem nova via props, usa ela. Se não, usa a do CSS.
    const inlineStyle = backgroundImage 
        ? { backgroundImage: `url('${backgroundImage}')` } 
        : undefined;

    return (
        <section className={styles.heroContainer} style={inlineStyle}>
            <div className={styles.overlay} />
            
            <div className={styles.content}>
                {badge && <span className={styles.badge}>{badge}</span>}
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
            </div>
        </section>
    );
}