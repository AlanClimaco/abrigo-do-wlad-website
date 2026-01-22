import { kv } from "@vercel/kv";
import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    const dog = await kv.get("hero-dog");

    res.setHeader("Content-Type", "application/json");

    if (dog) {
      res.statusCode = 200;
      res.end(JSON.stringify(dog));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Hero dog not found." }));
    }
  } catch (err) {
    console.error(err);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "Error fetching hero dog." }));
  }
}