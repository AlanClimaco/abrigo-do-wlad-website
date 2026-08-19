import { createFirestoreClient } from "../_lib/firestore";
import { encryptData } from "../_lib/encryption";
import { sendEmail, generateAdoptionApplicationEmail } from "../_lib/email";
import { fullFormSchema } from "../../../../src/pages/BetaForm/components/WizardForm/schema";
import { z } from "zod";
import { sanitizeFormFields, verifyRecaptcha } from "../_lib/security";
import {
  ADOPTION_EXPIRATION_DAYS,
  HTTP_STATUS,
} from "../_lib/constants";
import {
  jsonResponse,
  getEnvValue,
  type CloudflareEnv,
} from "../_lib/env";
import { validateRequest } from "../_lib/validation";
import { ADOPTION_RECAPTCHA_ACTION } from "../../../../src/pages/BetaForm/components/WizardForm/recaptcha";

type AdoptionApplicationData = z.infer<typeof fullFormSchema>;

async function sendAdoptionApplicationEmail(
  applicationData: Record<string, unknown>,
  applicationId: string,
  env: CloudflareEnv,
): Promise<boolean> {
  try {
    const { html, text } = generateAdoptionApplicationEmail(
      applicationData,
      applicationId,
      env,
    );

    const recipient = getEnvValue(env, "ADOPTION_EMAIL_RECIPIENT");

    await sendEmail(
      {
        to: recipient as string,
        subject: `Nova Candidatura de Adoção: ${applicationData.animal_especifico || "Geral"}`,
        html,
        text,
      },
      env,
    );
    return true;
  } catch (err) {
    console.error("Error sending adoption application email:", err);
    return false;
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

export async function onRequest({
  request,
  env,
}: {
  request: Request;
  env: CloudflareEnv;
}) {
  const validationError = await validateRequest(
    request,
    { expectedMethod: "POST" },
    env,
  );
  if (validationError) {
    return validationError;
  }

  try {
    const data = (await request.json()) as AdoptionApplicationData;

    const recaptchaSecret = getEnvValue(env, "RECAPTCHA_SECRET_KEY");
    if (!recaptchaSecret) {
      return jsonResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
        message: "reCAPTCHA secret is not configured.",
      });
    }

    const captchaValid = await verifyRecaptcha(data.captchaToken, env, {
      expectedAction: ADOPTION_RECAPTCHA_ACTION,
      expectedHostname: new URL(request.url).hostname,
    });
    if (!captchaValid) {
      return jsonResponse(HTTP_STATUS.BAD_REQUEST, {
        message: "reCAPTCHA validation failed",
      });
    }

    const validationResult = fullFormSchema.safeParse(data);

    if (!validationResult.success) {
      return jsonResponse(HTTP_STATUS.BAD_REQUEST, {
        message: "Validation failed",
        errors: z.treeifyError(validationResult.error),
      });
    }

    const rawApplicationData = Object.fromEntries(
      Object.entries(validationResult.data).filter(
        ([key]) => key !== "captchaToken",
      ),
    );
    const applicationData = sanitizeFormFields(rawApplicationData);
    const sensitiveData: Record<string, unknown> = {};
    const publicData: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(applicationData)) {
      if (SENSITIVE_FIELDS.includes(key)) {
        sensitiveData[key] = value;
      } else {
        publicData[key] = value;
      }
    }

    const { encryptedData, keyVersion } = await encryptData(sensitiveData, env);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + ADOPTION_EXPIRATION_DAYS);

    const documentData = {
      ...publicData,
      sensitive: encryptedData,
      keyVersion,
      expiresAt,
      status: "pending",
    };

    const firestore = createFirestoreClient(env);
    const { id: applicationId } = await firestore.createDocument(
      "adoption_application",
      documentData,
      { serverTimestampFields: ["submittedAt"] },
    );

    const notificationEmailSent = await sendAdoptionApplicationEmail(
      applicationData,
      applicationId,
      env,
    );

    return jsonResponse(HTTP_STATUS.CREATED, {
      message: "Application submitted successfully",
      data: { id: applicationId, notificationEmailSent },
      ...(!notificationEmailSent
        ? {
            warning:
              "A candidatura foi salva, mas a notificação automática falhou. Guarde o ID e entre em contato com o abrigo.",
          }
        : {}),
    });
  } catch (err) {
    console.error("Error creating adoption application:", err);

    if (err instanceof SyntaxError) {
      return jsonResponse(HTTP_STATUS.BAD_REQUEST, {
        message: "Invalid JSON",
      });
    }

    return jsonResponse(HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      message: "Error creating adoption application",
    });
  }
}
