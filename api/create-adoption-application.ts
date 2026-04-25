import { db } from "./_lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { sendEmail, generateAdoptionApplicationEmail } from "./_lib/email";
import { kv } from "@vercel/kv";

import type { IncomingMessage, ServerResponse } from "http";
import { fullFormSchema } from "../src/pages/BetaForm/components/WizardForm/schema";
import { z } from "zod";

interface AdoptionApplicationData {
  nome_adotante: string;
  idade: number;
  estado_civil: string;
  email: string;
  telefone: string;
  [key: string]: unknown;
}

const DEBUG_EMAIL_RECIPIENT = "";
const MAX_REQUEST_SIZE = 50 * 1024; // 50KB
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 min
const MAX_REQUESTS_PER_WINDOW = 5;

function getClientIp(req: IncomingMessage): string {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
    req.socket.remoteAddress ||
    "unknown"
  );
}

async function checkRateLimit(clientIp: string): Promise<boolean> {
  const key = `rate-limit:${clientIp}`;

  try {
    const current = await kv.incr(key);

    if (current === 1) {
      await kv.expire(key, RATE_LIMIT_WINDOW);
    }

    return current <= MAX_REQUESTS_PER_WINDOW;
  } catch (err) {
    console.error("Error checking rate limit:", err);
    // Em caso de erro, permitir a requisição (fail-open)
    return true;
  }
}

function validateOrigin(req: IncomingMessage): boolean {
  const origin = req.headers.origin || req.headers.referer;
  const allowedOrigins = [
    process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  ];

  if (!origin) return false;

  return allowedOrigins.some((allowed) => origin.startsWith(allowed));
}

function validateContentType(req: IncomingMessage): boolean {
  const contentType = req.headers["content-type"];
  return contentType?.includes("application/json") ?? false;
}

function validateRequestSize(contentLength: string | undefined): boolean {
  if (!contentLength) return false;
  return parseInt(contentLength, 10) <= MAX_REQUEST_SIZE;
}

async function sendAdoptionApplicationEmail(
  applicationData: Record<string, unknown>,
  applicationId: string,
): Promise<void> {
  try {
    const { html, text } = generateAdoptionApplicationEmail(
      applicationData,
      applicationId,
    );

    await sendEmail({
      to:
        DEBUG_EMAIL_RECIPIENT ||
        (process.env.ADOPTION_EMAIL_RECIPIENT as string),
      subject: `Nova Candidatura de Adoção: ${applicationData.animal_especifico || "Geral"}`,
      html,
      text,
    });
  } catch (err) {
    console.error("Error sending adoption application email:", err);
    // Não lançar erro para não interromper o fluxo
  }
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      },
    );

    const data = (await response.json()) as {
      success: boolean;
      score?: number;
      action?: string;
      challenge_ts?: string;
      hostname?: string;
    };

    if (data.score !== undefined) {
      return data.success && data.score > 0.5; // v3
    }

    return data.success; //v2
  } catch (err) {
    console.error("Error verifying reCAPTCHA:", err);
    return false;
  }
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  // Validar método HTTP
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Method not allowed" }));
    return;
  }

  const clientIp = getClientIp(req);

  // Rate limiting
  if (!(await checkRateLimit(clientIp))) {
    res.statusCode = 429;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({ message: "Too many requests. Please try again later." }),
    );
    return;
  }

  // Validar tamanho da requisição
  const contentLengthHeader = req.headers["content-length"];
  const contentLength = Array.isArray(contentLengthHeader)
    ? contentLengthHeader[0]
    : contentLengthHeader;

  if (contentLength !== undefined && !validateRequestSize(contentLength)) {
    res.statusCode = 413;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Request entity too large" }));
    return;
  }

  // Validar origem (CORS)
  if (!validateOrigin(req)) {
    res.statusCode = 403;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Forbidden: Invalid origin" }));
    return;
  }

  // Validar Content-Type
  if (!validateContentType(req)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Invalid Content-Type" }));
    return;
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const data = JSON.parse(body) as AdoptionApplicationData & {
        captchaToken: string;
      };

      // Validar reCAPTCHA
      const captchaValid = await verifyRecaptcha(data.captchaToken);
      if (!captchaValid) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            message: "reCAPTCHA validation failed",
          }),
        );
        return;
      }

      const validationResult = fullFormSchema.safeParse(data);

      if (!validationResult.success) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            message: "Validation failed",
            errors: z.treeifyError(validationResult.error),
          }),
        );
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { captchaToken, ...applicationData } = validationResult.data;

      // Calcular data de expiração (30 dias)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      // Adicionar timestamp e dados de submissão
      const documentData = {
        ...applicationData,
        submittedAt: Timestamp.now(),
        expiresAt: Timestamp.fromDate(expiresAt),
        status: "pending",
      };

      // Salvar na collection adoption_application
      const docRef = await addDoc(
        collection(db, "adoption_application"),
        documentData,
      );

      // Enviar email de notificação
      await sendAdoptionApplicationEmail(applicationData, docRef.id);

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "Application submitted successfully",
          id: docRef.id,
        }),
      );
    } catch (err) {
      console.error("Error creating adoption application:", err);

      if (err instanceof SyntaxError) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            message: "Invalid JSON",
          }),
        );
      } else {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            message: "Error creating adoption application",
          }),
        );
      }
    }
  });
}
