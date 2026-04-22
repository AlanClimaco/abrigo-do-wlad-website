import { db } from "./_lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { sendEmail, generateAdoptionApplicationEmail } from "./_lib/email";
import type { IncomingMessage, ServerResponse } from "http";

interface AdoptionApplicationData {
  nome_adotante: string;
  idade: number;
  estado_civil: string;
  email: string;
  telefone: string;
  [key: string]: unknown;
}

const DEBUG_EMAIL_RECIPIENT = ""

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
      to: process.env.ADOPTION_EMAIL_RECIPIENT || DEBUG_EMAIL_RECIPIENT,
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
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score > 0.5;
  } catch (err) {
    console.error("Error verifying reCAPTCHA:", err);
    return false;
  }
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Method not allowed" }));
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { captchaToken, ...applicationData } = data;

      // Calcular data de expiração (14 dias)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 14);

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
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          message: "Error creating adoption application",
        }),
      );
    }
  });
}
