import { Hero } from '../../components/Hero';
import { ActionCards } from '../../components/ActionCards';
import { HistorySection } from '../../components/HistorySection';

export function Home() {
    return (
        <main>
            <Hero />
            <ActionCards />
            <HistorySection />
        </main>
    );
}