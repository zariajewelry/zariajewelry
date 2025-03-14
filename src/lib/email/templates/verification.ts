import Handlebars from 'handlebars';
import { EmailTemplate } from '../types';
import config from '@/config/env';

interface VerificationTemplateData {
  name: string;
  verificationUrl: string;
  companyName: string;
  supportEmail: string;
}

const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifica tu correo electrónico</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { color: #000; margin: 0; }
    .content { background-color: #f9f9f9; padding: 30px; border-radius: 5px; }
    .button { display: inline-block; background-color: #81D8D0; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; }
    .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>{{companyName}}</h1>
    </div>
    <div class="content">
      <p>Hola {{name}},</p>
      <p>Gracias por registrarte en {{companyName}}. Para completar tu registro y verificar tu cuenta, haz clic en el siguiente botón:</p>
      <p style="text-align: center;">
        <a href="{{verificationUrl}}" class="button">Verificar mi cuenta</a>
      </p>
      <p>O copia y pega el siguiente enlace en tu navegador:</p>
      <p>{{verificationUrl}}</p>
      <p>Este enlace caducará en 24 horas.</p>
      <p>Si no has solicitado esta cuenta, puedes ignorar este mensaje.</p>
    </div>
    <div class="footer">
      <p>&copy; {{companyName}}. Todos los derechos reservados.</p>
      <p>Si tienes alguna pregunta, contacta con nosotros en <a href="mailto:{{supportEmail}}">{{supportEmail}}</a></p>
    </div>
  </div>
</body>
</html>
`;

const textTemplate = `
Hola {{name}},

Gracias por registrarte en {{companyName}}. Para completar tu registro y verificar tu cuenta, visita el siguiente enlace:

{{verificationUrl}}

Este enlace caducará en 24 horas.

Si no has solicitado esta cuenta, puedes ignorar este mensaje.

© {{companyName}}. Todos los derechos reservados.
Si tienes alguna pregunta, contacta con nosotros en {{supportEmail}}
`;

const compiledHtmlTemplate = Handlebars.compile(htmlTemplate);
const compiledTextTemplate = Handlebars.compile(textTemplate);

export function createVerificationTemplate(
  name: string,
  verificationToken: string
): EmailTemplate {
  const verificationUrl = `${config.app.clientUrl}/api/auth/verify?token=${verificationToken}`;
  
  const templateData: VerificationTemplateData = {
    name,
    verificationUrl,
    companyName: 'ZARIA Jewelry',
    supportEmail: config.app.supportEmail,
  };
  
  return {
    subject: 'Verifica tu cuenta de ZARIA Jewelry',
    html: compiledHtmlTemplate(templateData),
    text: compiledTextTemplate(templateData),
  };
}