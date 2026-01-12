import styles from './HeroSmall.module.css';

interface HeroSmallProps {
    title: string;
    description?: string;
    badge?: string;
    image?: string;
}

export function HeroSmall({ title, description, badge, image }: HeroSmallProps) {
    return (
        <section 
            className={styles.heroSmall}
            style={image ? { backgroundImage: `url('${image}')` } : undefined}
        >
            <div className={styles.heroOverlay}>
                <div className={styles.heroContent}>
                    {badge && <span className={styles.badge}>{badge}</span>}
                    <h1>{title}</h1>
                    {description && <p>{description}</p>}
                </div>
            </div>
        </section>
    );
}