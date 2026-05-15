import type { IncomingMessage, ServerResponse } from "http";
import { db } from "./_lib/firebase";
import { encryptData } from "./_lib/encryption";
import { Timestamp, FieldValue } from "firebase-admin/firestore";
import { sendEmail, generateAdoptionApplicationEmail } from "./_lib/email";
import { fullFormSchema } from "../src/pages/BetaForm/components/WizardForm/schema";
import { z } from "zod";
import { validateRequest } from "./_lib/validation";
import { verifyRecaptcha } from "./_lib/security";
import { sendSuccess, sendError } from "./_lib/response";
import { ADOPTION_EXPIRATION_DAYS, HTTP_STATUS } from "./_lib/constants";

type AdoptionApplicationData = z.infer<typeof fullFormSchema>;

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
      to: process.env.ADOPTION_EMAIL_RECIPIENT as string,
      subject: `Nova Candidatura de Adoção: ${applicationData.animal_especifico || "Geral"}`,
      html,
      text,
    });
  } catch (err) {
    console.error("Error sending adoption application email:", err);
  }
}

const SENSITIVE_FIELDS = [
  "nome_adotante",
  "telefone",
  "email",
  "endereco",
  "redes_sociais",
  "renda_mensal",
  "empresa",
  "profissao",
  "idade",
];

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  // Validar requisição
  const isValid = await validateRequest(req, res, {
    expectedMethod: "POST",
  });

  if (!isValid) {
    return;
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const data = JSON.parse(body) as AdoptionApplicationData;

      // Validar reCAPTCHA
      const captchaValid = await verifyRecaptcha(data.captchaToken);
      if (!captchaValid) {
        sendError(res, HTTP_STATUS.BAD_REQUEST, "reCAPTCHA validation failed");
        return;
      }

      const validationResult = fullFormSchema.safeParse(data);

      if (!validationResult.success) {
        sendError(
          res,
          HTTP_STATUS.BAD_REQUEST,
          "Validation failed",
          z.treeifyError(validationResult.error),
        );
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { captchaToken, ...applicationData } = validationResult.data;

      const sensitiveData: Record<string, unknown> = {};
      const publicData: Record<string, unknown> = {};

      for (const [key, value] of Object.entries(applicationData)) {
        if (SENSITIVE_FIELDS.includes(key)) {
          sensitiveData[key] = value;
        } else {
          publicData[key] = value;
        }
      }

      const { encryptedData, keyVersion } = await encryptData(sensitiveData);

      // Calcular data de expiração (30 dias)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + ADOPTION_EXPIRATION_DAYS);

      // Adicionar timestamp e dados de submissão
      const documentData = {
        ...publicData,
        sensitive: encryptedData,
        keyVersion,
        submittedAt: FieldValue.serverTimestamp(),
        expiresAt: Timestamp.fromDate(expiresAt),
        status: "pending",
      };

      // Salvar na collection adoption_application
      const docRef = await db.collection("adoption_application").add(documentData);

      // Enviar email de notificação
      await sendAdoptionApplicationEmail(applicationData, docRef.id);

      sendSuccess(
        res,
        "Application submitted successfully",
        { id: docRef.id },
        HTTP_STATUS.CREATED,
      );
    } catch (err) {
      console.error("Error creating adoption application:", err);

      if (err instanceof SyntaxError) {
        sendError(res, HTTP_STATUS.BAD_REQUEST, "Invalid JSON");
      } else {
        sendError(
          res,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Error creating adoption application",
        );
      }
    }
  });
}
