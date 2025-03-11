
export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailService {
  sendEmail(options: EmailOptions): Promise<boolean>;
  sendVerificationEmail(email: string, verificationToken: string): Promise<boolean>;
  sendWelcomeEmail(email: string, name: string): Promise<boolean>;
}

export interface EmailTransporter {
  sendMail(options: EmailOptions): Promise<any>;
}