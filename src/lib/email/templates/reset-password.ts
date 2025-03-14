import Handlebars from 'handlebars';
import { EmailTemplate } from '../types';
import config from '@/config/env';

interface PasswordResetTemplateData {
  name: string;
  resetUrl: string;
  companyName: string;
  supportEmail: string;
  expiryHours: number;
}

const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Restablece tu contraseña</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { color: #000; margin: 0; font-family: serif; }
    .content { background-color: #f9f9f9; padding: 30px; border-radius: 5px; }
    .button { display: inline-block; background-color: #000; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; }
    .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #888; }
    .note { font-size: 13px; color: #666; margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>{{companyName}}</h1>
    </div>
    <div class="content">
      <p>Hola {{name}},</p>
      <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Para crear una nueva contraseña, haz clic en el siguiente botón:</p>
      <p style="text-align: center;">
        <a href="{{resetUrl}}" class="button">Restablecer contraseña</a>
      </p>
      <p>O copia y pega el siguiente enlace en tu navegador:</p>
      <p>{{resetUrl}}</p>
      <p>Este enlace caducará en {{expiryHours}} hora(s) por razones de seguridad.</p>
      <div class="note">
        <p>Si no has solicitado restablecer tu contraseña, puedes ignorar este mensaje. Tu contraseña permanecerá igual.</p>
      </div>
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

Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en {{companyName}}. Para crear una nueva contraseña, visita el siguiente enlace:

{{resetUrl}}

Este enlace caducará en {{expiryHours}} hora(s) por razones de seguridad.

Si no has solicitado restablecer tu contraseña, puedes ignorar este mensaje. Tu contraseña permanecerá igual.

© {{companyName}}. Todos los derechos reservados.
Si tienes alguna pregunta, contacta con nosotros en {{supportEmail}}
`;

const compiledHtmlTemplate = Handlebars.compile(htmlTemplate);
const compiledTextTemplate = Handlebars.compile(textTemplate);

export function createPasswordResetTemplate(
  name: string,
  resetToken: string
): EmailTemplate {
 
  const resetUrl = `${config.app.clientUrl}/auth/reset-password?token=${resetToken}`;
  
  const templateData: PasswordResetTemplateData = {
    name,
    resetUrl,
    companyName: 'ZARIA Jewelry',
    supportEmail: config.app.supportEmail,
    expiryHours: 1 
  };
  
  return {
    subject: 'Restablece tu contraseña - ZARIA Jewelry',
    html: compiledHtmlTemplate(templateData),
    text: compiledTextTemplate(templateData),
  };
}