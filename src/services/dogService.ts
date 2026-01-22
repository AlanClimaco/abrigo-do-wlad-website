import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query 
} from "firebase/firestore";

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

export async function saveDog(dog: Omit<Dog, "id">, id?: string) {
  if (id) {
    const docRef = doc(db, DOGS_COLLECTION, id);
    await updateDoc(docRef, { ...dog });
    return id;
  } else {
    const dogsRef = collection(db, DOGS_COLLECTION);
    const docRef = await addDoc(dogsRef, dog);
    return docRef.id;
  }
}

export async function deleteDog(id: string) {
  const docRef = doc(db, DOGS_COLLECTION, id);
  await deleteDoc(docRef);
}