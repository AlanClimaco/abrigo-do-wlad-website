import { db } from "./_lib/firebase";
import { 
  collection, 
  getDocs
} from "firebase/firestore";
import type { RecyclePoint } from "../types/recycle";

const RECYCLE_COLLECTION = "recycle_points";

// LISTAR: Busca todos os pontos
export async function getRecyclePoints(): Promise<RecyclePoint[]> {
  try {
    const querySnapshot = await getDocs(collection(db, RECYCLE_COLLECTION));
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as RecyclePoint[];
  } catch (error) {
    console.error("Erro ao buscar pontos de coleta:", error);
    return [];
  }
}