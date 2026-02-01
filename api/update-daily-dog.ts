import { kv } from "@vercel/kv";
import {
  collection,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { IncomingMessage, ServerResponse } from "http";

import { db } from "./_lib/firebase.js";

const DOGS_COLLECTION = "dogs";

async function getRandomDogFromServer() {
  const docRef = collection(db, DOGS_COLLECTION);

  const countSnapshot = await getCountFromServer(docRef);
  const count = countSnapshot.data().count;

  if (count === 0) {
    return null;
  }

  const randomKey = doc(docRef).id;

  let q = query(docRef, where("__name__", ">=", randomKey), limit(1));

  let snapshot = await getDocs(q);

  // fallback if the query returns nothing (e.g., randomKey is past the last doc)
  if (snapshot.empty) {
    q = query(docRef, where("__name__", ">=", randomKey), limit(1));
    snapshot = await getDocs(q);
  }

  if (snapshot.empty) {
    return null;
  }

  const randomDoc = snapshot.docs[0];

  return { id: randomDoc.id, ...randomDoc.data() };
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: "Unauthorized" }));
    return;
  }

  try {
    const currentDog: any = await kv.get("daily-dog");
    let newDog;
    let attempts = 0;

    do {
      newDog = await getRandomDogFromServer();
      attempts++;
    } while (newDog && currentDog && newDog.id === currentDog.id && attempts < 3);

    if (newDog) {
      await kv.set("daily-dog", newDog);
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Daily dog updated!", dog: newDog }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "No dog found" }));
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "Error updating daily dog" }));
  }
}
