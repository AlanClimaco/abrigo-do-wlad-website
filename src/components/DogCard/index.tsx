import { BriefcaseMedical, Calendar, ChevronUp } from "lucide-react";
import type { DogProps } from "../../data/dogs";
import styles from "./DogCard.module.css";
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

interface DogCardProps {
  data: DogProps;
  onClick: () => void;
}

export function DogCard({ data, onClick }: DogCardProps) {
  const dogImage = data.fotos[0] ?? null;
  
  const dogImageUrl = getOptimizedImageUrl(dogImage, {
    crop: "fill",
    width: 200,
    height: 350,
    quality: 100,
  });

  return (
    <Card
      imageSrc={dogImageUrl}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <CardBody imageSrc={dogImageUrl}>
        <CardHeader>
          <CardTitle>{data.nome}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.cardContainer}>
            <div className={styles.badgeContainer}>
              <Badge
                size="sm"
                blur={true}
                leftIcon={<Calendar size={14} />}
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
                leftIcon={<BriefcaseMedical size={14} />}
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
        </CardContent>
      </CardBody>
      <CardFooter>
        <CardButton>
          Conhecer Mais
          <ChevronUp />
        </CardButton>
      </CardFooter>
    </Card>
  );
}
