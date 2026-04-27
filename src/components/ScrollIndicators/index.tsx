import { useEffect, useState } from "react";
import styles from "./ScrollIndicators.module.css";

interface ScrollIndicatorsProps {
  containerRef: React.RefObject<HTMLDivElement>;
  sectionCount: number;
  labels?: string[];
}

export function ScrollIndicators({
  containerRef,
  sectionCount,
  labels = [],
}: ScrollIndicatorsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = Array.from(
      containerRef.current.children as HTMLCollection,
    ) as HTMLElement[];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportCenter = scrollY + viewportHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = scrollY + rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - sectionCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [containerRef, sectionCount]);

  const handleDotClick = (index: number) => {
    if (!containerRef.current) return;

    const sections = Array.from(
      containerRef.current.children as HTMLCollection,
    ) as HTMLElement[];

    if (sections[index]) {
      const rect = sections[index].getBoundingClientRect();
      const headerHeight = 120;
      const targetScroll = window.scrollY + rect.top - headerHeight;

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={styles.indicators}>
      <div className={styles.indicatorWrapper}>
        <div className={styles.dotsContainer}>
          {Array.from({ length: sectionCount }).map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === activeIndex ? styles.active : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Ir para ${labels[index] || `seção ${index + 1}`}`}
            />
          ))}
        </div>
        <div className={styles.rowsContainer}>
          {Array.from({ length: sectionCount }).map((_, index) => (
            <div key={index} className={styles.indicatorRow}>
              <span
                className={`${styles.label} ${index === activeIndex ? styles.activeLabel : ""}`}
              >
                {labels[index] || ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

