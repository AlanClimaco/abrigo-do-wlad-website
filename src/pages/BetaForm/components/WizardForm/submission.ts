interface AdoptionSubmissionPayload {
  message?: unknown;
  warning?: unknown;
  data?: {
    id?: unknown;
    notificationEmailSent?: unknown;
  };
}

export interface AdoptionSubmissionResult {
  applicationId: string;
  warning?: string;
}

async function readPayload(
  response: Response,
): Promise<AdoptionSubmissionPayload> {
  try {
    return (await response.json()) as AdoptionSubmissionPayload;
  } catch {
    return {};
  }
}

export async function getAdoptionApplicationId(
  response: Response,
): Promise<AdoptionSubmissionResult> {
  const payload = await readPayload(response);

  if (!response.ok) {
    throw new Error(
      typeof payload.message === "string" && payload.message.trim()
        ? payload.message
        : "Erro ao enviar formulário. Tente novamente.",
    );
  }

  const applicationId = payload.data?.id;
  if (typeof applicationId !== "string" || !applicationId.trim()) {
    throw new Error("A API não retornou o ID da candidatura.");
  }

  const warning =
    typeof payload.warning === "string" && payload.warning.trim()
      ? payload.warning
      : undefined;

  return {
    applicationId,
    ...(warning ? { warning } : {}),
  };
}
