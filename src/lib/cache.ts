import { getDocs, getDocsFromCache, Query, QuerySnapshot } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { STORAGE_KEYS } from './storage';

const DEFAULT_TTL_MS = 15 * 60 * 1000; // 15 minutos

type CacheKey = string;

export async function fetchWithCache<T = DocumentData>(
  query: Query<T, DocumentData>,
  cacheKey: CacheKey,
  ttlMs: number = DEFAULT_TTL_MS
): Promise<QuerySnapshot<T, DocumentData>> {
  const now = Date.now();
  const storageKey = STORAGE_KEYS.CACHE.TTL(cacheKey);
  const lastFetchStr = localStorage.getItem(storageKey);
  const lastFetch = lastFetchStr ? parseInt(lastFetchStr, 10) : 0;

  const isCacheValid = (now - lastFetch) < ttlMs;

  if (isCacheValid) {
    try {
      // Try retrieving the cached data from Firebase IndexedDB
      const snapshot = await getDocsFromCache(query);
      if (!snapshot.empty) {
        return snapshot;
      }
    } catch (e) {
      console.warn('Falha ao obter do cache local, realizando fetch remoto:', e);
    }
  }

  // Failed to read the cache, or it has expired/is empty. Searching the network.
  const snapshot = await getDocs(query);
  
  // Updates the time of the last refresh
  localStorage.setItem(storageKey, now.toString());
  
  return snapshot;
}
