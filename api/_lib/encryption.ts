import crypto from "crypto";
import { db } from "./firebase";

export async function encryptData(
  data: Record<string, unknown>,
): Promise<{ encryptedData: string; keyVersion: string }> {
  // get encryption key
  const keyDocSnap = await db.collection("system").doc("keys").get();
  if (!keyDocSnap.exists) {
    throw new Error(
      "Chaves de criptografia não encontradas no banco de dados.",
    );
  }

  const { active_key_id, keys } = keyDocSnap.data() as {
    active_key_id: string;
    keys: Record<string, { id: string; key: string; version: string; createdAt: string }>;
  };
  const currentKey = keys[active_key_id]?.key;

  if (!currentKey) {
    throw new Error("Chave de criptografia ativa inválida ou não encontrada.");
  }

  const algorithm = "aes-256-gcm";
  const iv = crypto.randomBytes(16);
  // (32 bytes/aes-256)
  const cipherKey = crypto
    .createHash("sha256")
    .update(String(currentKey))
    .digest();
  const cipher = crypto.createCipheriv(algorithm, cipherKey, iv);

  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  const encryptedData = `${iv.toString("hex")}:${authTag}:${encrypted}`;

  return { encryptedData, keyVersion: active_key_id };
}
