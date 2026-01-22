import { collection, getDocs, getDoc, doc, query } from "firebase/firestore";

import { db } from "./firebase";

import type { Dog } from "../types/dogs";

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
