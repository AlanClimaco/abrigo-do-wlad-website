import { Calendar, CheckCircle } from "lucide-react";
import type { DogProps } from "../../pages/Adopt";
import styles from "./DogCard.module.css";

interface DogCardProps {
  data: DogProps;
  onClick: () => void;
}

export function DogCard({ data, onClick }: DogCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div
        className={styles.imagePlaceholder}
        style={{ backgroundImage: `url('${data.fotos[0]}')` }}
      />

      <div className={styles.info}>
        <div className={styles.header}>
          <h3>{data.nome}</h3>
        </div>

        <p className={styles.meta}>
          <Calendar size={14} /> {data.idade}
        </p>

        <p className={styles.temperament}>{data.temperamento}</p>

        <div className={styles.status}>
          <CheckCircle size={14} /> {data.status}
        </div>
      </div>

      <button className={styles.adoptBtn}>Conhecer Mais</button>
    </div>
  );
}
