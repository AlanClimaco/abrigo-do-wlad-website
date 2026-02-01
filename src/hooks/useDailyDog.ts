import * as React from "react";
import { type Dog } from "../types/dogs";

export function useDailyDog() {
  const [dog, setDog] = React.useState<Dog | null>(null);

  React.useEffect(() => {
    async function fetchDailyDog() {
      try {
        const response = await fetch("/api/get-daily-dog");
        if (response.ok) {
          const dailyDog = await response.json();
          setDog(dailyDog);
        }
      } catch (error) {
        console.error("Erro ao carregar o daily dog:", error);
      }
    }
    fetchDailyDog();
  }, []);

  return dog;
}
