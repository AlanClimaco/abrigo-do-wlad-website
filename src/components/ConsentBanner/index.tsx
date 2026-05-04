import { useState } from "react";
import { Link } from "react-router";
import * as Lucide from "lucide-react";
import { Button } from "@/components/ui/Button";
import { STORAGE_KEYS } from "@/lib/storage";
import styles from "./ConsentBanner.module.css";

function getInitialVisibility() {
  if (typeof window === "undefined") return false;
  const hasConsented = localStorage.getItem(STORAGE_KEYS.CONSENT.ANALYTICS);
  return !hasConsented;
}

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(getInitialVisibility);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEYS.CONSENT.ANALYTICS, "true");
    
    // Enable Umami script
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://cloud.umami.is/script.js";
    script.setAttribute("data-website-id", "40988ad1-8134-4273-b18b-8d126fec7706");
    document.body.appendChild(script);
    
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEYS.CONSENT.ANALYTICS, "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <div className={styles.header}>
            <Lucide.BarChart3 size={20} />
            <h3>Melhorando sua experiência</h3>
          </div>
          <p>
            Usamos métricas <strong>anônimas e sem cookies</strong> para entender como você usa o site e melhorar nossos sistemas. Leia nossa <Link to="/politica-de-privacidade" className={styles.privacyLink}>política de privacidade</Link>.
          </p>
        </div>

        <div className={styles.actions}>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReject}
          >
            Rejeitar
          </Button>
          <Button
            size="sm"
            onClick={handleAccept}
          >
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
