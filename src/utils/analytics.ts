export const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID || '';

declare global {
  interface Window {
    gtag?: (command: string, action: string, parameters?: Record<string, unknown>) => void;
  }
}

export type PageVote = "positive" | "meh" | "negative";

export const logPageFeedback = (path: string, vote: PageVote) => {
  const rating = vote;
  const value = vote === "positive" ? 2 : vote === "meh" ? 1 : 0;

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_feedback', {
      page_path: path,
      rating,
      value
    });
  } else {
    // Para fallback em desenvolvimento ou se o GA for bloqueado
    console.info(`[Analytics] Page Feedback em '${path}': ${rating} (${value})`);
  }
};
