import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  getCountFromServer,
  startAfter,
  limit,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

import type { Dog, DogFilters } from "../types/dogs";

const DOGS_COLLECTION = "dogs";

export async function getDogs(): Promise<Dog[]> {
  const dogsRef = collection(db, DOGS_COLLECTION);
  const q = query(dogsRef);

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Dog[];
}

export async function getDogById(id: string): Promise<Dog | null> {
  const docRef = doc(db, DOGS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Dog;
  } else {
    return null;
  }
}

/**
 * Fetches a paginated and filtered list of dogs from Firestore.
 * @param {DogFilters} filters - An object containing the filter criteria. Filters are applied if their value is not 'all'.
 * @param {number} page - The current page number, used to determine if pagination logic should be applied.
 * @param {number} itemsPerPage - The maximum number of dogs to return per page.
 * @param {any} [lastVisibleDoc] - The last visible document from the previous page, used as a cursor for pagination.
 * @returns {Promise<{dogs: Dog[], totalItems: number, lastVisibleDoc: any}>} An object containing the list of dogs for the current page, the total count of dogs matching the filters, and the last document of the current page for the next query.
 */
export async function getDogsWithFilters(
  filters: DogFilters,
  page: number,
  itemsPerPage: number,
  lastVisibleDoc?: any,
) {
  const docRef = collection(db, DOGS_COLLECTION);
  let q = query(docRef);

  // apply filters
  if (filters.cateIdade && filters.cateIdade !== "all") {
    q = query(q, where("cateIdade", "==", filters.cateIdade));
  }
  if (filters.cor && filters.cor !== "all") {
    q = query(q, where("cor", "==", filters.cor));
  }
  if (filters.tags && filters.tags !== "all") {
    q = query(q, where("tags", "array-contains", filters.tags));
  }

  const countQuery = q;
  const snapshotCount = await getCountFromServer(countQuery);
  const totalItems = snapshotCount.data().count;

  if (page > 1 && lastVisibleDoc) {
    q = query(q, startAfter(lastVisibleDoc));
  }
  q = query(q, limit(itemsPerPage));

  const snapshot = await getDocs(q);

  const dogs = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Dog[];

  const newLastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];

  return { dogs, totalItems, lastVisibleDoc: newLastVisibleDoc };
}
