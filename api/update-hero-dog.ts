import { kv } from "./_lib/kv";
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
import { validateRequest } from "./_lib/validation";
import { validateAuthHeader } from "./_lib/security";
import { sendError, sendSuccess } from "./_lib/response";
import { HTTP_STATUS } from "./_lib/constants";

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
  const isValid = await validateRequest(req, res, {
    expectedMethod: "GET",
    skipRateLimit: true,
    validateOrigin: false,
    validateContentType: false,
    validateRequestSize: false,
  });

  if (!isValid) {
    return;
  }

  const authHeader = req.headers.authorization;
  if (!validateAuthHeader(authHeader, process.env.CRON_SECRET || "")) {
    sendError(res, HTTP_STATUS.UNAUTHORIZED, "Unauthorized");
    return;
  }

  try {
    const currentDog: any = await kv.get("hero-dog");
    let newDog;
    let attempts = 0;

    do {
      newDog = await getRandomDogFromServer();
      attempts++;
    } while (newDog && currentDog && newDog.id === currentDog.id && attempts < 3);

    if (newDog) {
      await kv.set("hero-dog", newDog);
      sendSuccess(res, "Hero dog updated!", { dog: newDog });
    } else {
      sendError(res, HTTP_STATUS.NOT_FOUND, "No dog found");
    }
  } catch (err) {
    console.error(err);
    sendError(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      "Error updating hero dog",
    );
  }
}
