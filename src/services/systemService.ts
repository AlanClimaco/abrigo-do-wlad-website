import { doc, getDoc } from "firebase/firestore";
import { db } from "./_lib/firebase";

export interface SystemSettings {
  acceptingApplications: boolean;
}

const CACHE_KEY = "aw_system_settings";
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

interface CachedData {
  settings: SystemSettings;
  timestamp: number;
}

export async function getSystemSettings(): Promise<SystemSettings> {
  // Check sessionStorage cache first to minimize Firebase reads
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedData = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        return parsed.settings;
      }
    }
  } catch (err) {
    // Ignore cache read errors
  }

  const defaultSettings: SystemSettings = {
    acceptingApplications: true, // Default if not found in db
  };

  try {
    const docRef = doc(db, "system", "settings");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const settings: SystemSettings = {
        acceptingApplications: data.acceptingApplications ?? true,
      };

      // Save to cache
      try {
        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            settings,
            timestamp: Date.now(),
          })
        );
      } catch (e) {
        // Ignore cache write errors
      }

      return settings;
    }
  } catch (error) {
    console.error("Error fetching system settings:", error);
  }

  return defaultSettings;
}
