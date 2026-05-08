import type { IncomingMessage, ServerResponse } from "http";
import { sendEmail, generateAdoptionApplicationEmail } from "../_lib/email";
import { sendSuccess, sendError } from "../_lib/response";
import { HTTP_STATUS } from "../_lib/constants";

export default async function handler(
  _req: IncomingMessage,
  res: ServerResponse,
) {
  if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
    return sendError(res, HTTP_STATUS.FORBIDDEN, "Not available in production");
  }

  try {
    const mockApplicationData = {
      nome_adotante: "José da Silva Teste",
      animal_especifico: "Rex (Debug Mode)",
    };

    const mockApplicationId = "test-id-123456789";

    const { html, text } = generateAdoptionApplicationEmail(
      mockApplicationData,
      mockApplicationId,
    );

    const debugRecipient =
      process.env.DEBUG_EMAIL_RECIPIENT ||
      process.env.ADOPTION_EMAIL_RECIPIENT ||
      process.env.GMAIL_USER;

    if (!debugRecipient) {
      throw new Error("No recipient email configured for debug");
    }

    await sendEmail({
      to: debugRecipient as string,
      subject: `[TESTE DEBUG] Nova Candidatura de Adoção: ${mockApplicationData.animal_especifico}`,
      html,
      text,
    });

    sendSuccess(
      res,
      "Debug email sent successfully",
      { sentTo: debugRecipient },
      HTTP_STATUS.OK,
    );
  } catch (err) {
    console.error("Error sending debug email:", err);
    const message = err instanceof Error ? err.message : "Default error";
    sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, message);
  }
}
