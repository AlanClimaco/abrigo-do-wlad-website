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
      // disable click if loading
      onClick={isLoading ? undefined : onClick}
      style={{
        cursor: isLoading ? "wait" : "pointer",
        position: "relative",
      }}
    >
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <Lucide.LoaderCircle className={styles.spinner} size={48} />
        </div>
      )}

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
                leftIcon={<Lucide.Calendar size={14} />}
                variant="outline"
                style={{ color: "var(--white)" }}
                className={styles.badgeContent}
              >
                {data.idade}
              </Badge>

              <Badge
                size="sm"
                blur={true}
                leftIcon={<Lucide.BriefcaseMedical size={14} />}
                variant="outline"
                style={{ color: "var(--white)" }}
                className={styles.badgeContent}
              >
                {data.status}
              </Badge>

              <Badge
                size="sm"
                blur={true}
                leftIcon={
                  data.sexo === "Macho" ? (
                    <Lucide.Mars size={14} />
                  ) : (
                    <Lucide.Venus size={14} />
                  )
                }
                variant="outline"
                style={{
                  color: `${data.sexo === "Macho" ? "#70a3f6ff" : "#eb6fadff"}`,
                  borderColor: `${data.sexo === "Macho" ? "#70a3f6ff" : "#eb6fadff"}`,
                  backgroundColor: `${data.sexo === "Macho" ? "#70a3f63a" : "#eb6fad23"}`,
                }}
                className={styles.badgeContent}
              >
                {data.sexo === "Macho" ? "Macho" : "Fêmea"}
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
