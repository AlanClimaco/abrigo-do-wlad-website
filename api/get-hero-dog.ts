import { kv } from "@vercel/kv";
import type { IncomingMessage, ServerResponse } from "http";
import { validateRequest } from "./_lib/validation";
import { sendError, sendSuccess } from "./_lib/response";
import { HTTP_STATUS } from "./_lib/constants";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  const isValid = await validateRequest(req, res, {
    expectedMethod: "GET",
    validateOrigin: false,
    validateContentType: false,
    validateRequestSize: false,
  });

  if (!isValid) {
    return;
  }

  try {
    const dog = await kv.get("hero-dog");

    if (dog) {
      sendSuccess(res, "Hero dog fetched successfully.", dog);
    } else {
      sendError(res, HTTP_STATUS.NOT_FOUND, "Hero dog not found.");
    }
  } catch (err) {
    console.error(err);
    sendError(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      "Error fetching hero dog.",
    );
  }
}
