import type { IncomingMessage, ServerResponse } from "http";
import CryptoJS from "crypto-js";
import { db } from "./_lib/firebase";
import { collection, addDoc, Timestamp, doc, getDoc } from "firebase/firestore";
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
    // Não lançar erro para não interromper o fluxo
  }
}

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

      // Buscar chave de criptografia
      const keyDocSnap = await getDoc(doc(db, "system", "keys"));
      if (!keyDocSnap.exists()) {
        throw new Error("Chaves de criptografia não encontradas no banco de dados.");
      }
      
      const { active_key_id, keys } = keyDocSnap.data();
      const currentKey = keys[active_key_id];

      // Criptografar os dados da aplicação
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(applicationData),
        currentKey
      ).toString();

      // Calcular data de expiração (30 dias)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + ADOPTION_EXPIRATION_DAYS);

      // Adicionar timestamp e dados de submissão
      const documentData = {
        data: encryptedData,
        keyVersion: active_key_id,
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
