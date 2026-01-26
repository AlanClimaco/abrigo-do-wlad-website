import * as React from "react";

import { Hero } from "../../components/Hero";
import { ActionCards } from "../../components/ActionCards";
import { HistorySection } from "../../components/HistorySection";
import { FaqSection } from "../../components/FaqSection";

import styles from "./Home.module.css";

import { type Dog } from "../../types/dogs";

export default function Home() {
  const [dog, setDog] = React.useState<Dog | null>(null);

  React.useEffect(() => {
    async function fetchHeroDog() {
      try {
        const response = await fetch("/api/get-hero-dog");
        if (response.ok) {
          const heroDog = await response.json();
          setDog(heroDog);
        }
      } catch (error) {
        console.error("Erro ao carregar dog do Hero:", error);
      }
    }
    fetchHeroDog();
  }, []);

  return (
    <main>
      <div className={`container ${styles.homeContainer}`}>
        <Hero dog={dog} />
        <ActionCards />
        <HistorySection />
        <FaqSection />
      </div>
    </main>
  );
}
