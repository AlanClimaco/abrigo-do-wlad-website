import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: `"Abrigo do Wlad" <${process.env.GMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    console.log(`Email enviado para ${options.to}`);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw new Error("Falha ao enviar email");
  }
}

export function generateAdoptionApplicationEmail(
  applicationData: Record<string, unknown>,
  applicationId: string,
): { html: string; text: string } {
  const nome = applicationData.nome_adotante || "Candidato";
  const animal = applicationData.animal_especifico || "não especificado";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
          }
          .header {
            background-color: #f5f5f5;
            padding: 20px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
          }
          .content {
            margin-bottom: 20px;
            padding: 15px;
            background-color: #fafafa;
            border-left: 4px solid #3498db;
          }
          .info-box {
            background-color: #e8f4f8;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
          }
          .info-box strong {
            color: #2c3e50;
          }
          .cta-button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 15px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Nova Solicitação de Pré-adoção</h2>
          </div>

          <div class="content">
            <p>Olá,</p>
            <p>Uma nova solicitação de pré-adoção foi recebida e está aguardando análise.</p>
          </div>

          <div class="info-box">
            <p><strong>Candidato:</strong> ${nome}</p>
            <p><strong>Animal:</strong> ${animal}</p>
            <p><strong>ID da Solicitação:</strong> ${applicationId}</p>
          </div>

          <p>Por favor, acesse o painel de administração para revisar os detalhes completos desta solicitação.</p>

          <a href="${process.env.ADMIN_PANEL_URL}" class="cta-button">
            Acessar Painel de Administração
          </a>

          <div class="footer">
            <p>Esta é uma mensagem automática. Por favor, não responda a este email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const text = `
Nova Solicitação de Pré-adoção

Candidato: ${nome}
Animal: ${animal}
ID da Solicitação: ${applicationId}

Por favor, acesse o painel de administração para revisar os detalhes completos desta solicitação.

---
Esta é uma mensagem automática. Por favor, não responda a este email.
  `;

  return { html, text };
}
