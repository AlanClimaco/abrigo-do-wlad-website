import assert from "node:assert/strict";
import test from "node:test";

import { getAdoptionApplicationId } from "./submission";

test("reads the application ID from the API data envelope", async () => {
  const response = Response.json(
    { message: "Created", data: { id: "application-123" } },
    { status: 201 },
  );

  assert.deepEqual(await getAdoptionApplicationId(response), {
    applicationId: "application-123",
  });
});

test("preserves a notification warning without turning persistence into failure", async () => {
  const response = Response.json(
    {
      message: "Created",
      data: { id: "application-123", notificationEmailSent: false },
      warning: "A candidatura foi salva, mas a notificação falhou.",
    },
    { status: 201 },
  );

  assert.deepEqual(await getAdoptionApplicationId(response), {
    applicationId: "application-123",
    warning: "A candidatura foi salva, mas a notificação falhou.",
  });
});

test("surfaces the API error message when submission fails", async () => {
  const response = Response.json(
    { message: "Too many requests. Please try again later." },
    { status: 429 },
  );

  await assert.rejects(
    () => getAdoptionApplicationId(response),
    /Too many requests/,
  );
});

test("rejects a successful response without an application ID", async () => {
  const response = Response.json({ message: "Created" }, { status: 201 });

  await assert.rejects(
    () => getAdoptionApplicationId(response),
    /não retornou o ID/,
  );
});
