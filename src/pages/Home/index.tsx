import { Hero } from "@/components/Hero";
import { useDailyDog } from "@/hooks/useDailyDog";
import { ScrollIndicators } from "@/components/ScrollIndicators";

import { ActionCards } from "./components/ActionCards";
import { HistorySection } from "./components/HistorySection";
import { FaqSection } from "./components/FaqSection";

import styles from "./Home.module.css";
import { useRef } from "react";

export default function Home() {
  const dog = useDailyDog();
  const containerRef = useRef<HTMLDivElement>(null!);

  const sectionLabels = ["Destaque", "Ações", "História", "Dúvidas"];

  return (
    <main>
      <ScrollIndicators containerRef={containerRef} sectionCount={4} labels={sectionLabels} />
      <div className={`container ${styles.homeContainer}`} ref={containerRef}>
        <Hero dog={dog} />
        <ActionCards />
        <HistorySection />
        <FaqSection />
      </div>
    </main>
  );
}
