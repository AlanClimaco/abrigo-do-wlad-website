import { Hero } from "../../components/Hero";
import { ActionCards } from "../../components/ActionCards";
import { HistorySection } from "../../components/HistorySection";
import FaqSection from "../../components/FaqSection";
import styles from "./Home.module.css"

export default function Home() {
  return (
    <main>
      <Hero />
      <div className={`container ${styles.homeContainer}`}>
        <ActionCards />
        <HistorySection />
        <FaqSection />
      </div>
    </main>
  );
}
