import { Hero } from "../../components/Hero";
import { ActionCards } from "../../components/ActionCards";
import { HistorySection } from "../../components/HistorySection";
import FaqSection from "../../components/FaqSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="container">
        <ActionCards />
        <HistorySection />
        <FaqSection />
      </div>
    </main>
  );
}
