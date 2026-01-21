import * as Lucide from "lucide-react";
import * as CardComponent from "../ui/Card";
import type { DogProps } from "../../data/dogs";
import { Badge } from "../ui/Badge";
import { getOptimizedImageUrl } from "../../utils/cdn";

import styles from "./DogCard.module.css";

interface DogCardProps {
  data: DogProps;
  onClick: () => void;
  isLoading?: boolean;
}

export function DogCard({ data, onClick, isLoading }: DogCardProps) {
  const dogImage = data.fotos[0] ?? null;

  const dogImageUrl = getOptimizedImageUrl(dogImage, {
    crop: "fill",
    width: 200,
    height: 350,
    quality: 100,
  });

  return (
    <CardComponent.Card
      imageSrc={dogImageUrl}
      onClick={isLoading ? undefined : onClick}
      style={{ cursor: isLoading ? "wait" : "pointer", position: "relative" }}
    >
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <Lucide.LoaderCircle className={styles.spinner} size={48} />
        </div>
      )}
      <CardComponent.CardBody imageSrc={dogImageUrl}>
        <CardComponent.CardHeader>
          <CardComponent.CardTitle>{data.nome}</CardComponent.CardTitle>
        </CardComponent.CardHeader>
        <CardComponent.CardContent>
          <div className={styles.cardContainer}>
            <div className={styles.badgeContainer}>
              <Badge
                size="sm"
                blur={true}
                leftIcon={<Lucide.Calendar size={14} />}
                variant="outline"
                style={{
                  color: "var(--white)",
                }}
              >
                {data.idade}
              </Badge>
              <Badge
                size="sm"
                blur={true}
                leftIcon={<Lucide.BriefcaseMedical size={14} />}
                variant="outline"
                style={{
                  color: "var(--white)",
                }}
              >
                {data.status}
              </Badge>
            </div>
            <p>{data.temperamento}</p>
          </div>
        </CardComponent.CardContent>
      </CardComponent.CardBody>
      <CardComponent.CardFooter>
        <CardComponent.CardButton>
          Conhecer Mais
          <Lucide.ChevronUp />
        </CardComponent.CardButton>
      </CardComponent.CardFooter>
    </CardComponent.Card>
  );
}
