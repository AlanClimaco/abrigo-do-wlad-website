import type { Dog } from "../types/dogs";

/**
 * Retorna um cachorro aleatório de uma lista fornecida.
 * @param list Array de cachorros (vindo do Firebase)
 * @returns {Dog | null} Um objeto de dog ou null se a lista estiver vazia.
 */
export function getRandomDog(list: Dog[]): Dog | null {
  if (!list || list.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

/**
 * Pré-carrega imagens para o cache do navegador para evitar piscadas.
 * @param fotos Array de URLs das fotos
 * @returns Promise que resolve quando todas carregarem
 */
export const preloadDogImages = (fotos: string[]): Promise<void[]> => {
  const imagePromises = fotos.map((src) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    });
  });
  return Promise.all(imagePromises);
};