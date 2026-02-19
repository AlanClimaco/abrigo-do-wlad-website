import { Hero } from "@/components/Hero";
import { useDailyDog } from "@/hooks/useDailyDog";

import { ActionCards } from "./components/ActionCards";
import { HistorySection } from "./components/HistorySection";
import { FaqSection } from "./components/FaqSection";

import styles from "./Home.module.css";

export default function Home() {
  const dog = useDailyDog();

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
