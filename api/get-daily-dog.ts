import { kv } from "@vercel/kv";
import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    const dog = await kv.get("daily-dog");

    // 23h cache
    res.setHeader(
      "Cache-Control",
      "s-maxage=82800, stale-while-revalidate=3600",
    );
    res.setHeader("Content-Type", "application/json");

    if (dog) {
      res.statusCode = 200;
      res.end(JSON.stringify(dog));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Daily dog not found." }));
    }
  } catch (err) {
    console.error(err);
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 500;
    res.end(JSON.stringify({ message: "Error fetching daily dog." }));
  }
}
