import * as Lucide from "lucide-react";
import {
  Card,
  CardBody,
  CardButton,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Badge } from "../ui/Badge";
import { getOptimizedImageUrl } from "../../utils/cdn";
import { type Dog } from "../../types/dogs";
import styles from "./DogCard.module.css";

const getSexBadgeStyle = (sexo: string) => {
  return `${styles.sexBadge} ${sexo === "Macho" ? styles.male : styles.female}`;
};

interface DogCardProps {
  data: Dog;
  onClick: () => void;
  isLoading?: boolean;
}

export function DogCard({ data, onClick, isLoading }: DogCardProps) {
  const dogImage = data.fotos?.[0] ?? null;

  const dogImageUrl = getOptimizedImageUrl(dogImage, {
    crop: "fill",
    width: 200,
    height: 350,
    quality: 100,
  });

  return (
    <Card
      imageSrc={dogImageUrl}
      // Desabilita o click se estiver carregando
      onClick={isLoading ? undefined : onClick}
      style={{ 
        cursor: isLoading ? "wait" : "pointer", 
        position: "relative" 
      }}
    >
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <Lucide.LoaderCircle className={styles.spinner} size={48} />
        </div>
      )}

      <CardBody imageSrc={dogImageUrl}>
        
        {/* --- Insígnia de Sexo --- */}
        <div className={getSexBadgeStyle(data.sexo)} title={data.sexo}>
          {data.sexo === "Macho" ? (
            <Lucide.Mars size={20} strokeWidth={2.5} />
          ) : (
            <Lucide.Venus size={20} strokeWidth={2.5} />
          )}
        </div>

        <CardHeader>
          <CardTitle>{data.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.cardContainer}>
            <div className={styles.badgeContainer}>
              <Badge
                size="sm"
                blur={true}
                leftIcon={<Lucide.Calendar size={14} />}
                variant="outline"
                style={{ color: "var(--white)" }}
              >
                {data.idade}
              </Badge>

              <Badge
                size="sm"
                blur={true}
                leftIcon={<Lucide.BriefcaseMedical size={14} />}
                variant="outline"
                style={{ color: "var(--white)" }}
              >
                {data.status}
              </Badge>
            </div>
            <p>{data.temperamento}</p>
          </div>
        </CardContent>
      </CardBody>
      <CardFooter>
        <CardButton>
          Conhecer Mais
          <Lucide.ChevronUp />
        </CardButton>
      </CardFooter>
    </Card>
  );
}