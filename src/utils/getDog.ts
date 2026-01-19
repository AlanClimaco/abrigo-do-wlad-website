import { DOGS_DATA, type DogProps } from "../data/dogs";

/**
 * Retorna um cachorro aleaatório da lista
 * @returns {DogProps} Um objeto de dog.
 */
export function getRandomDog(): DogProps {
  const randomIndex = Math.floor(Math.random() * DOGS_DATA.length);
  return DOGS_DATA[randomIndex];
}
