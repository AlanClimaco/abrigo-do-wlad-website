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
    const randomDog = await getRandomDogFromServer();
    if (randomDog) {
      await kv.set("hero-dog", randomDog);
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Hero dog updated!", dog: randomDog }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "No dog found" }));
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "Error updating hero dog" }));
  }
}
