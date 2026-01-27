import type { ThirdPartyImagesData } from "../types/third-party-images";
import thirdPartyImages from "../assets/third-party-images.json";

const imagesData: ThirdPartyImagesData = thirdPartyImages;

/**
 * Gets the data for a third-party image and formats the Unsplash URL.
 * @param name The name of the image (key in the JSON).
 * @param options Unsplash formatting options.
 * @returns An object with the image URL and credit data, or null if not found.
 */
export const getThirdPartyImage = (
  name: string,
  options: { w?: number; q?: number } = { w: 1920, q: 80 },
) => {
  const imageInfo = imagesData[name];

  if (!imageInfo) {
    console.error(`Third-Party image "${name}" not found.`);
    return null;
  }

  const imageUrl = `https://images.unsplash.com/photo-${imageInfo.photoId}?auto=format&fit=crop&w=${options.w}&q=${options.q}`;

  return {
    url: imageUrl,
    ...imageInfo,
  };
};

/**
 * Preloads images into the browser cache to prevent flickering.
 * @param fotos Array of photo URLs
 * @returns A promise that resolves when all images have loaded
 */
export const preloadDogImages = (media: string[]): Promise<void[]> => {
  const imagePromises = media.map((src) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    });
  });
  return Promise.all(imagePromises);
};
