import { DOGS_DATA, type DogProps } from "../data/dogs";

/**
 * Retorna um cachorro aleaatório da lista
 * @returns {DogProps} Um objeto de dog.
 */
export function getRandomDog(): DogProps {
  const randomIndex = Math.floor(Math.random() * DOGS_DATA.length);
  return DOGS_DATA[randomIndex];
}

/**
 * 
 * @param fotos 
 * @returns 
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