import styles from "./HeroSmall.module.css";

type HeroSmallProps = {
  image?: string;
  badge: string;
  title: string;
  description: string;
};

/**
 * Hero utilizado em páginas fora da Home
 */
export default function HeroSmall({
  image,
  badge,
  title,
  description,
}: HeroSmallProps) {
  return (
    <section
      className={styles.heroSmall}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.heroOverlay} />
      <div className={`${styles.heroSmallContent}`}>
        <span className={styles.badge}>{badge}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
