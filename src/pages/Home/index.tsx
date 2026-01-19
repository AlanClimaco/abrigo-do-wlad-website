import { Hero } from "../../components/Hero";
import { ActionCards } from "../../components/ActionCards";
import { HistorySection } from "../../components/HistorySection";
import FaqSection from "../../components/FaqSection";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main>
      <div className={`container ${styles.homeContainer}`}>
        <Hero />
        <ActionCards />
        <HistorySection />
        <FaqSection />
      </div>
    </main>
  );
}
