import assert from "node:assert/strict";
import test from "node:test";

import { onRequest } from "./create";

test("applies the shared rate limit before processing an application", async () => {
  const response = await onRequest({
    request: new Request("https://abrigo.test/api/adoption/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://abrigo.test",
        "X-Forwarded-For": "203.0.113.42",
      },
      body: "{}",
    }),
    env: {
      ALLOWED_ORIGIN: "https://abrigo.test",
      NODE_ENV: "production",
      KV: {
        async get(): Promise<string> {
          return "5";
        },
        async put(): Promise<void> {},
      },
    },
  });

  assert.equal(response.status, 429);
  assert.deepEqual(await response.json(), {
    message: "Too many requests. Please try again later.",
  });
});
